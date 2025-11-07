import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id, items, total_amount, customer_info, payment_method = 'card', payment_status = 'completed' } = await req.json();

    // Validate required fields (user_id is now optional for guest orders)
    if (!items || !Array.isArray(items) || items.length === 0 || !total_amount || !customer_info) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders_2025_11_07_14_31')
      .insert({
        user_id: user_id || null, // Allow null for guest orders
        total_amount,
        status: payment_method === 'cash' ? 'pending' : 'confirmed',
        payment_method,
        payment_status,
        customer_info: JSON.stringify(customer_info),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order', details: orderError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create order items and update stock
    const orderItems = [];
    for (const item of items) {
      // Create order item
      const { data: orderItem, error: itemError } = await supabase
        .from('order_items_2025_11_07_14_31')
        .insert({
          order_id: order.id,
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })
        .select()
        .single();

      if (itemError) {
        console.error('Order item creation error:', itemError);
        // Continue with other items, but log the error
      } else {
        orderItems.push(orderItem);
      }

      // Update product stock (only if payment is completed or cash payment)
      if (payment_status === 'completed' || payment_method === 'cash') {
        const { error: stockError } = await supabase
          .from('products_2025_11_07_14_31')
          .update({
            stock_quantity: Math.max(0, item.product.stock_quantity - item.quantity)
          })
          .eq('id', item.product.id);

        if (stockError) {
          console.error('Stock update error:', stockError);
          // Continue processing, but log the error
        }
      }
    }

    // Update user profile with customer info if provided (only for registered users)
    if (user_id && (customer_info.fullName || customer_info.phone || customer_info.address)) {
      const { error: profileError } = await supabase
        .from('profiles_2025_11_07_14_31')
        .update({
          full_name: customer_info.fullName || undefined,
          phone: customer_info.phone || undefined,
          address: customer_info.address || undefined,
        })
        .eq('id', user_id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        // Continue processing, profile update is not critical
      }
    }

    const response = {
      success: true,
      order_id: order.id,
      order_items: orderItems,
      payment_method,
      payment_status,
      is_guest_order: !user_id,
      message: payment_method === 'cash' 
        ? 'Bestellung erfolgreich erstellt. Barzahlung bei Abholung.'
        : 'Bestellung erfolgreich verarbeitet.'
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Process order error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
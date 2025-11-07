import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      payment_intent_id, 
      cart_items, 
      shipping_address, 
      total_amount 
    } = await req.json()

    if (!payment_intent_id || !cart_items || !Array.isArray(cart_items) || cart_items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user from JWT token
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Verify JWT and get user
    const jwt = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders_2025_11_07_14_31')
      .insert({
        user_id: user.id,
        total_amount: total_amount,
        status: 'confirmed',
        shipping_address: shipping_address,
        payment_intent_id: payment_intent_id
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create order items
    const orderItems = cart_items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items_2025_11_07_14_31')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      return new Response(
        JSON.stringify({ error: 'Failed to create order items' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Update product stock
    for (const item of cart_items) {
      const { error: stockError } = await supabase
        .from('products_2025_11_07_14_31')
        .update({ 
          stock_quantity: supabase.raw(`stock_quantity - ${item.quantity}`) 
        })
        .eq('id', item.product_id)

      if (stockError) {
        console.error('Error updating stock:', stockError)
      }
    }

    // Clear user's cart
    const { error: cartError } = await supabase
      .from('cart_2025_11_07_14_31')
      .delete()
      .eq('user_id', user.id)

    if (cartError) {
      console.error('Error clearing cart:', cartError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        order_id: order.id,
        message: 'Order created successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error processing order:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return new Response(
        JSON.stringify({ error: 'Order ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch order with items
    const { data: order, error: orderError } = await supabase
      .from('orders_2025_11_07_14_31')
      .select(`
        *,
        profiles_2025_11_07_14_31(full_name, email, phone, address)
      `)
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch order items
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items_2025_11_07_14_31')
      .select(`
        *,
        products_2025_11_07_14_31(name, description)
      `)
      .eq('order_id', order_id);

    if (itemsError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch order items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse customer info
    let customerInfo = {};
    try {
      customerInfo = typeof order.customer_info === 'string' 
        ? JSON.parse(order.customer_info) 
        : order.customer_info || {};
    } catch (e) {
      console.error('Error parsing customer_info:', e);
    }

    // Get customer details
    const customerName = customerInfo.fullName || order.profiles_2025_11_07_14_31?.full_name || 'Unbekannt';
    const customerEmail = customerInfo.email || order.profiles_2025_11_07_14_31?.email || 'Nicht angegeben';
    const customerPhone = customerInfo.phone || order.profiles_2025_11_07_14_31?.phone || 'Nicht angegeben';
    const customerAddress = customerInfo.address || order.profiles_2025_11_07_14_31?.address || 'Nicht angegeben';

    // Format dates
    const orderDate = new Date(order.created_at).toLocaleDateString('de-DE');
    const deliveryDate = new Date().toLocaleDateString('de-DE');

    // Generate HTML
    const html = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lieferschein - Jagdrevier Weetzen</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: #f7fafc;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
            color: white;
            padding: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .company-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .company-subtitle {
            font-size: 14px;
            opacity: 0.9;
        }
        .document-info {
            text-align: right;
        }
        .document-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .document-number {
            font-size: 12px;
            opacity: 0.8;
        }
        .content {
            padding: 30px;
        }
        .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            gap: 30px;
        }
        .customer-info, .delivery-info {
            flex: 1;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2d5016;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 15px;
        }
        .info-line {
            margin-bottom: 8px;
            font-size: 14px;
        }
        .payment-info {
            background: #e6fffa;
            border: 2px solid #38b2ac;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .items-table th {
            background: #2d5016;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
        .items-table td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        .items-table tr:last-child td {
            border-bottom: none;
        }
        .items-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #718096;
        }
        .total-section {
            background: #f0fff4;
            border: 2px solid #68d391;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #2d5016;
            text-align: center;
        }
        @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-section">
                <div class="company-name">🦌 Jagdrevier Weetzen</div>
                <div class="company-subtitle">Premium Wildfleisch & Jagdspezialitäten</div>
            </div>
            <div class="document-info">
                <div class="document-title">LIEFERSCHEIN</div>
                <div class="document-number">Nr. ${order.id.slice(0, 8).toUpperCase()}</div>
            </div>
        </div>

        <div class="content">
            <div class="info-section">
                <div class="customer-info">
                    <div class="section-title">🏠 Kunde</div>
                    <div class="info-line"><strong>Name:</strong> ${customerName}</div>
                    <div class="info-line"><strong>E-Mail:</strong> ${customerEmail}</div>
                    <div class="info-line"><strong>Telefon:</strong> ${customerPhone}</div>
                    <div class="info-line"><strong>Adresse:</strong> ${customerAddress}</div>
                </div>
                <div class="delivery-info">
                    <div class="section-title">📅 Abholung</div>
                    <div class="info-line"><strong>Bestelldatum:</strong> ${orderDate}</div>
                    <div class="info-line"><strong>Bereitstellung:</strong> ${deliveryDate}</div>
                    <div class="info-line"><strong>Zahlungsart:</strong> Barzahlung bei Abholung</div>
                    <div class="info-line"><strong>Status:</strong> ${order.status === 'confirmed' ? 'Bestätigt' : order.status === 'pending' ? 'Bereit zur Abholung' : order.status}</div>
                </div>
            </div>

            <div class="payment-info">
                <strong>💰 Zahlungshinweis:</strong> 
                Barzahlung bei Abholung der Ware. Bitte halten Sie den entsprechenden Betrag bereit.
            </div>

            <table class="items-table">
                <thead>
                    <tr>
                        <th>🥩 Artikel</th>
                        <th style="text-align: center;">📦 Menge</th>
                        <th>📝 Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderItems.map(item => `
                        <tr>
                            <td><strong>${item.products_2025_11_07_14_31?.name || 'Unbekanntes Produkt'}</strong></td>
                            <td style="text-align: center;">${item.quantity} Stück</td>
                            <td>${item.products_2025_11_07_14_31?.description || 'Keine Beschreibung verfügbar'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="total-section">
                <div class="total-amount">
                    Gesamtbetrag: €${order.total_amount.toFixed(2)}
                    <br>
                    <small style="font-size: 14px; color: #4a5568;">Barzahlung bei Abholung</small>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Jagdrevier Weetzen</strong> | Premium Wildfleisch & Jagdspezialitäten</p>
            <p>Vielen Dank für Ihr Vertrauen! | Erstellt am ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}</p>
        </div>
    </div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="Lieferschein_${order.id.slice(0, 8)}.html"`
      }
    });

  } catch (error) {
    console.error('Generate delivery note error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
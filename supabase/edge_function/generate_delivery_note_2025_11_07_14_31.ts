import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { order } = await req.json();

    if (!order) {
      return new Response(
        JSON.stringify({ error: 'Order data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const customerInfo = order.customer_info && typeof order.customer_info === 'object' 
      ? order.customer_info 
      : {};
    
    const customerName = order.profiles?.full_name || customerInfo.fullName || 'Unbekannt';
    const customerEmail = order.profiles?.email || customerInfo.email || 'Keine E-Mail';
    const customerPhone = customerInfo.phone || 'Nicht angegeben';
    const customerAddress = customerInfo.address || 'Nicht angegeben';
    
    const deliveryDate = new Date().toLocaleDateString('de-DE');
    const orderDate = new Date(order.created_at).toLocaleDateString('de-DE');

    // Create HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Lieferschein - Jagdrevier Weetzen</title>
    <style>
        @page {
            margin: 15mm;
            size: A4;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #2d3748;
            margin: 0;
            padding: 0;
            font-size: 12px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 3px solid #2d5016;
        }
        .logo-section {
            flex: 1;
        }
        .company-name {
            font-size: 22px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 3px;
        }
        .company-subtitle {
            font-size: 12px;
            color: #4a5568;
        }
        .document-info {
            text-align: right;
            flex: 1;
        }
        .document-title {
            font-size: 24px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 8px;
        }
        .document-number {
            font-size: 12px;
            color: #4a5568;
        }
        .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
        }
        .customer-info, .delivery-info {
            flex: 1;
            margin-right: 15px;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 8px;
            padding-bottom: 3px;
            border-bottom: 1px solid #e2e8f0;
        }
        .info-line {
            margin-bottom: 4px;
            font-size: 11px;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .items-table th {
            background-color: #2d5016;
            color: white;
            padding: 10px 8px;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
        }
        .items-table td {
            padding: 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        .items-table tr:nth-child(even) {
            background-color: #f7fafc;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #4a5568;
        }
        .hunting-decoration {
            text-align: center;
            margin: 15px 0;
            font-size: 14px;
            color: #2d5016;
            font-style: italic;
        }
        .payment-info {
            background-color: #f0f4f0;
            padding: 12px;
            border-left: 4px solid #2d5016;
            margin-bottom: 15px;
            font-size: 11px;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }
        .signature-box {
            width: 180px;
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #4a5568;
            margin-top: 35px;
            padding-top: 4px;
            font-size: 10px;
        }
        .hunting-icons {
            color: #2d5016;
            font-size: 16px;
        }
    </style>
</head>
<body>
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

    <div class="info-section">
        <div class="customer-info">
            <div class="section-title">🏠 Kunde</div>
            <div class="info-line"><strong>Name:</strong> ${customerName}</div>
            <div class="info-line"><strong>E-Mail:</strong> ${customerEmail}</div>
            <div class="info-line"><strong>Telefon:</strong> ${customerPhone}</div>
            <div class="info-line"><strong>Adresse:</strong> ${customerAddress}</div>
        </div>
        <div class="delivery-info">
            <div class="section-title">📅 Lieferung</div>
            <div class="info-line"><strong>Bestelldatum:</strong> ${orderDate}</div>
            <div class="info-line"><strong>Lieferdatum:</strong> ${deliveryDate}</div>
            <div class="info-line"><strong>Zahlungsart:</strong> ${order.payment_method === 'cash' ? 'Barzahlung bei Abholung' : 'Kreditkarte'}</div>
            <div class="info-line"><strong>Status:</strong> ${order.status === 'confirmed' ? 'Bestätigt' : order.status === 'pending' ? 'Ausstehend' : order.status}</div>
        </div>
    </div>

    <div class="payment-info">
        <strong>💰 Zahlungshinweis:</strong> 
        ${order.payment_method === 'cash' 
          ? 'Barzahlung bei Abholung der Ware. Bitte halten Sie den entsprechenden Betrag bereit.' 
          : 'Zahlung bereits erfolgt über Kreditkarte.'}
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
            ${order.order_items.map(item => `
                <tr>
                    <td><strong>${item.product?.name || 'Unbekanntes Produkt'}</strong></td>
                    <td style="text-align: center;">${item.quantity} Stück</td>
                    <td>Premium Wildfleisch aus nachhaltiger Jagd</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="hunting-decoration">
        🌲 Aus den Wäldern von Weetzen - Nachhaltig gejagt, frisch geliefert 🌲
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line">Übergeben von</div>
        </div>
        <div class="signature-box">
            <div class="signature-line">Erhalten von</div>
        </div>
    </div>

    <div class="footer">
        <div style="text-align: center;">
            <strong>Jagdrevier Weetzen</strong> | Nachhaltige Jagd & Premium Wildfleisch<br>
            E-Mail: info@jagd-weetzen.de | Frische Qualität aus der Region<br>
            <em>"Tradition trifft Qualität - Seit Generationen im Einklang mit der Natur"</em>
        </div>
    </div>
</body>
</html>`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        html: htmlContent,
        filename: `Lieferschein_${order.id.slice(0, 8)}_${customerName.replace(/\s+/g, '_')}.html`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Generate delivery note error:', error);
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
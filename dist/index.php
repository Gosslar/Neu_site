<?php
/**
 * Alfahosting-optimierte PHP-Fallback für React SPA
 * Behandelt Server-seitiges Routing für Single Page Applications
 */

// Error Reporting für Debugging (in Produktion ausschalten)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Security Headers
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Sicherheitscheck - blockiere Zugriff auf sensible Dateien
$blocked_extensions = ['.env', '.log', '.sql', '.config', '.ini', '.htaccess', '.md'];
$request_uri = $_SERVER['REQUEST_URI'] ?? '';

foreach ($blocked_extensions as $ext) {
    if (strpos($request_uri, $ext) !== false) {
        http_response_code(403);
        exit('Access Denied');
    }
}

// Blockiere Zugriff auf versteckte Dateien
if (strpos(basename($request_uri), '.') === 0) {
    http_response_code(403);
    exit('Access Denied');
}

// Hole den angeforderten Pfad
$path = parse_url($request_uri, PHP_URL_PATH);
$path = ltrim($path, '/');

// Definiere Document Root und Index-Datei
$document_root = __DIR__;
$index_file = $document_root . '/index.html';

// Prüfe ob die angeforderte Datei existiert
$file_path = $document_root . '/' . $path;

// Wenn es eine echte Datei ist (CSS, JS, Bilder, etc.), normal ausliefern
if (file_exists($file_path) && is_file($file_path) && !is_dir($file_path)) {
    // Setze korrekten Content-Type basierend auf Dateiendung
    $extension = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
    $mime_types = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject'
    ];
    
    if (isset($mime_types[$extension])) {
        header('Content-Type: ' . $mime_types[$extension]);
    }
    
    return false; // Lass den Server es normal behandeln
}

// SPA-Routen - liefere index.html für diese Pfade aus
$spa_routes = [
    '',
    'blog',
    'admin',
    'auth', 
    'livestream',
    'shop',
    'cart',
    'checkout',
    'profile',
    'jagdhunde',
    'rehkitzrettung',
    'stapelteiche',
    'revier',
    'praedatoren',
    'impressum',
    'datenschutz'
];

// Prüfe ob der Pfad mit einer SPA-Route beginnt
$is_spa_route = false;
foreach ($spa_routes as $route) {
    if ($path === $route || strpos($path, $route . '/') === 0) {
        $is_spa_route = true;
        break;
    }
}

// Spezielle Behandlung für Blog-Posts (blog/slug-Muster)
if (preg_match('/^blog\/[^\/]+$/', $path)) {
    $is_spa_route = true;
}

// Spezielle Behandlung für Produkt-Seiten (product/id-Muster)  
if (preg_match('/^product\/[^\/]+$/', $path)) {
    $is_spa_route = true;
}

// Wenn es eine SPA-Route ist oder die Datei nicht existiert, liefere index.html aus
if ($is_spa_route || !file_exists($file_path)) {
    if (file_exists($index_file)) {
        // Setze korrekten Content-Type
        header('Content-Type: text/html; charset=UTF-8');
        
        // Lese und gib die index.html-Datei aus
        $html_content = file_get_contents($index_file);
        
        // Ersetze relative Pfade für bessere Kompatibilität
        $html_content = str_replace('src="./assets/', 'src="/assets/', $html_content);
        $html_content = str_replace('href="./assets/', 'href="/assets/', $html_content);
        
        echo $html_content;
        exit;
    } else {
        // Index-Datei nicht gefunden - zeige Fallback-Seite
        http_response_code(404);
        ?>
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <title>404 - Seite nicht gefunden - Jagdrevier Weetzen</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px;
                    background: linear-gradient(135deg, #1e3a2e 0%, #2d5a3d 100%);
                    color: white;
                    min-height: 100vh;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                }
                h1 { color: #fff; margin-bottom: 20px; }
                p { color: #ddd; margin-bottom: 15px; }
                a { 
                    color: #4CAF50; 
                    text-decoration: none; 
                    font-weight: bold;
                }
                a:hover { text-decoration: underline; }
                .button {
                    display: inline-block;
                    background: #4CAF50;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 5px;
                    text-decoration: none;
                    margin: 10px;
                    font-weight: bold;
                }
                .button:hover {
                    background: #45a049;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🦌 Jagdrevier Weetzen</h1>
                <h2>404 - Seite nicht gefunden</h2>
                <p>Die angeforderte Seite konnte nicht gefunden werden.</p>
                <p>Möglicherweise ist die Website noch nicht vollständig hochgeladen oder es gibt ein technisches Problem.</p>
                
                <div style="margin: 30px 0;">
                    <a href="/" class="button">🏠 Zur Startseite</a>
                    <a href="/blog" class="button">📝 Blog</a>
                    <a href="/admin" class="button">🎛️ Admin</a>
                </div>
                
                <hr style="margin: 30px 0; border-color: rgba(255,255,255,0.3);">
                
                <h3>Kontakt</h3>
                <p>📧 info@jagdrevier-weetzen.de</p>
                <p>📞 Telefon verfügbar</p>
                
                <h3>Unsere Themen</h3>
                <p>Nachhaltige Jagd • Wildtiermanagement • Jagdhunde • Rehkitzrettung • Stapelteiche • Naturschutz</p>
                
                <p style="margin-top: 30px; font-size: 12px; color: #aaa;">
                    Fehlercode: 404 | Pfad: <?php echo htmlspecialchars($path); ?> | Zeit: <?php echo date('Y-m-d H:i:s'); ?>
                </p>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// Für andere Anfragen, lass den Server normal behandeln
return false;
?>
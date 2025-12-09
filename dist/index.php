<?php
/**
 * Alfahosting PHP-Fallback für React SPA mit statischer Backup-Seite
 */

// Security headers
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1; mode=block');

// Get requested path
$path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$path = ltrim($path, '/');

// Document root and files
$document_root = __DIR__;
$index_file = $document_root . '/index.html';
$static_file = $document_root . '/static.html';

// Check if real file exists
$file_path = $document_root . '/' . $path;

// Serve real files normally (CSS, JS, images, etc.)
if (file_exists($file_path) && is_file($file_path) && !is_dir($file_path)) {
    // Set correct MIME type
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
        'ico' => 'image/x-icon'
    ];
    
    if (isset($mime_types[$extension])) {
        header('Content-Type: ' . $mime_types[$extension]);
    }
    
    return false; // Let server handle it normally
}

// Special route for static fallback
if ($path === 'static' || $path === 'static.html') {
    if (file_exists($static_file)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($static_file);
        exit;
    }
}

// SPA routes that should get the React app
$spa_routes = [
    '', 'blog', 'admin', 'auth', 'livestream', 'shop', 'cart', 
    'checkout', 'profile', 'jagdhunde', 'rehkitzrettung', 
    'stapelteiche', 'revier', 'praedatoren'
];

// Check if it's a SPA route
$is_spa_route = false;
foreach ($spa_routes as $route) {
    if ($path === $route || strpos($path, $route . '/') === 0) {
        $is_spa_route = true;
        break;
    }
}

// Special patterns for blog posts and products
if (preg_match('/^blog\/[^\/]+$/', $path) || preg_match('/^product\/[^\/]+$/', $path)) {
    $is_spa_route = true;
}

// Serve appropriate content
if ($is_spa_route || !file_exists($file_path)) {
    // Try to serve React app first
    if (file_exists($index_file)) {
        header('Content-Type: text/html; charset=UTF-8');
        
        // Read and modify index.html for better compatibility
        $html_content = file_get_contents($index_file);
        
        // Add fallback script that redirects to static page if React fails
        $fallback_script = '
        <script>
        setTimeout(function() {
            if (!window.React && !document.querySelector("[data-reactroot]") && !document.querySelector("#root > div")) {
                console.log("React app failed to load, redirecting to static version");
                window.location.href = "/static.html";
            }
        }, 8000);
        </script>';
        
        $html_content = str_replace('</body>', $fallback_script . '</body>', $html_content);
        
        echo $html_content;
        exit;
    } 
    // Fallback to static page if React app not available
    else if (file_exists($static_file)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($static_file);
        exit;
    } 
    // Last resort: simple HTML page
    else {
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        ?>
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <title>Jagdrevier Weetzen - Hege und Naturschutz</title>
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
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                }
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
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🦌 Jagdrevier Weetzen</h1>
                <h2>Hege und Naturschutz im Calenberger Land</h2>
                <p>Die Website wird geladen oder es gibt ein technisches Problem.</p>
                
                <div style="margin: 30px 0;">
                    <a href="/static.html" class="button">📄 Statische Version</a>
                    <a href="/diagnose.html" class="button">🔧 Diagnose</a>
                    <a href="https://nbwiku3f4s.skywork.website" class="button">🌐 Backup-Website</a>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3>📞 Kontakt</h3>
                    <p>📧 info@jagdrevier-weetzen.de</p>
                    <p>🌐 Backup: https://nbwiku3f4s.skywork.website</p>
                </div>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// For other requests, let server handle normally
return false;
?>
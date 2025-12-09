<?php
/**
 * Alfahosting PHP-Fallback für React SPA
 */

// Security headers
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');

// Get requested path
$path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$path = ltrim($path, '/');

// Document root and index file
$document_root = __DIR__;
$index_file = $document_root . '/index.html';

// Check if file exists
$file_path = $document_root . '/' . $path;

// Serve real files normally
if (file_exists($file_path) && is_file($file_path)) {
    return false;
}

// SPA routes
$spa_routes = ['', 'blog', 'admin', 'auth', 'livestream', 'shop', 'cart', 'checkout', 'profile'];

// Check if SPA route
$is_spa_route = false;
foreach ($spa_routes as $route) {
    if ($path === $route || strpos($path, $route . '/') === 0) {
        $is_spa_route = true;
        break;
    }
}

// Serve index.html for SPA routes
if ($is_spa_route || !file_exists($file_path)) {
    if (file_exists($index_file)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($index_file);
        exit;
    } else {
        http_response_code(404);
        echo '<!DOCTYPE html>
<html><head><title>404 - Jagdrevier Weetzen</title></head>
<body style="font-family:Arial;text-align:center;padding:50px;">
<h1>🦌 Jagdrevier Weetzen</h1>
<h2>404 - Seite nicht gefunden</h2>
<p><a href="/">Zur Startseite</a> | <a href="/diagnose.html">Diagnose</a></p>
</body></html>';
        exit;
    }
}

return false;
?>
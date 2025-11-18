<?php
/**
 * Jagdrevier Weetzen - PHP Fallback for SPA Routing
 * 
 * This file serves as a fallback for servers where .htaccess 
 * URL rewriting might not work properly.
 * 
 * It ensures that all routes are handled by the React SPA.
 */

// Security: Prevent direct access to sensitive files
$request_uri = $_SERVER['REQUEST_URI'];
$parsed_url = parse_url($request_uri);
$path = $parsed_url['path'];

// Block access to sensitive files
$blocked_extensions = ['.env', '.log', '.sql', '.config'];
foreach ($blocked_extensions as $ext) {
    if (strpos($path, $ext) !== false) {
        http_response_code(403);
        exit('Access Denied');
    }
}

// Check if the requested file exists
$file_path = __DIR__ . $path;

// If it's a real file (CSS, JS, images, etc.), serve it normally
if (file_exists($file_path) && is_file($file_path)) {
    return false; // Let the server handle the file normally
}

// For all other requests (SPA routes), serve index.html
$index_file = __DIR__ . '/index.html';

if (file_exists($index_file)) {
    // Set proper content type
    header('Content-Type: text/html; charset=UTF-8');
    
    // Security headers
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Serve the SPA
    readfile($index_file);
    exit;
} else {
    // If index.html doesn't exist, show error
    http_response_code(500);
    echo '<!DOCTYPE html>
<html>
<head>
    <title>Jagdrevier Weetzen - Fehler</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .error { color: #d32f2f; }
        .info { color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <h1 class="error">Website-Fehler</h1>
    <p>Die Website-Dateien konnten nicht gefunden werden.</p>
    <p class="info">Bitte kontaktieren Sie den Administrator.</p>
    <hr>
    <p><small>Jagdrevier Weetzen - Technischer Support</small></p>
</body>
</html>';
    exit;
}
?>
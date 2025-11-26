<?php
/**
 * PHP Fallback for React SPA Routing
 * Handles server-side routing for Single Page Applications
 */

// Security check - block access to sensitive files
$blocked_extensions = ['.env', '.log', '.sql', '.config', '.ini', '.htaccess'];
$request_uri = $_SERVER['REQUEST_URI'];

foreach ($blocked_extensions as $ext) {
    if (strpos($request_uri, $ext) !== false) {
        http_response_code(403);
        exit('Access Denied');
    }
}

// Get the requested path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = ltrim($path, '/');

// Define the document root and index file
$document_root = __DIR__;
$index_file = $document_root . '/index.html';

// Check if the requested file exists
$file_path = $document_root . '/' . $path;

// If it's a real file (CSS, JS, images, etc.), serve it normally
if (file_exists($file_path) && is_file($file_path) && !is_dir($file_path)) {
    return false; // Let the server handle it normally
}

// SPA Routes - serve index.html for these paths
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

// Check if path starts with any SPA route
$is_spa_route = false;
foreach ($spa_routes as $route) {
    if ($path === $route || strpos($path, $route . '/') === 0) {
        $is_spa_route = true;
        break;
    }
}

// Special handling for blog posts (blog/slug pattern)
if (preg_match('/^blog\/[^\/]+$/', $path)) {
    $is_spa_route = true;
}

// Special handling for product pages (product/id pattern)  
if (preg_match('/^product\/[^\/]+$/', $path)) {
    $is_spa_route = true;
}

// If it's a SPA route or file doesn't exist, serve index.html
if ($is_spa_route || !file_exists($file_path)) {
    if (file_exists($index_file)) {
        // Set proper content type
        header('Content-Type: text/html; charset=UTF-8');
        
        // Read and output the index.html file
        readfile($index_file);
        exit;
    } else {
        // Index file not found
        http_response_code(404);
        echo '<!DOCTYPE html>
<html>
<head>
    <title>404 - Page Not Found</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #333; }
        p { color: #666; }
    </style>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>The requested page could not be found.</p>
    <p><a href="/">Return to Homepage</a></p>
</body>
</html>';
        exit;
    }
}

// For other requests, let the server handle normally
return false;
?>
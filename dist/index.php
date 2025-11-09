<?php
// PHP fallback for React SPA
// This ensures the React app loads even if .htaccess doesn't work

// Get the requested path
$request_uri = $_SERVER['REQUEST_URI'];
$script_name = $_SERVER['SCRIPT_NAME'];
$path_info = str_replace(dirname($script_name), '', $request_uri);

// If it's an API call or asset request, let it pass through
if (strpos($path_info, '/api/') === 0 || 
    strpos($path_info, '/assets/') === 0 || 
    strpos($path_info, '/images/') === 0 ||
    preg_match('/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/', $path_info)) {
    return false; // Let the server handle it normally
}

// For all other requests, serve the React app
?>
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jagdrevier Weetzen - Hege und Naturschutz im Calenberger Land</title>
    <meta name="description" content="Jagdrevier Weetzen - Hege und Naturschutz im Calenberger Land. Ihr Partner für nachhaltige Jagd, Wildtiermanagement und verantwortungsvollen Naturschutz." />
    <meta name="author" content="Jagdrevier Weetzen" />
    <meta name="keywords" content="Jagd, Hege, Naturschutz, Calenberger Land, Weetzen, Wildtiermanagement, Jagdhunde, Rehkitzrettung, Nachhaltigkeit" />

    <meta property="og:title" content="Jagdrevier Weetzen - Hege und Naturschutz im Calenberger Land" />
    <meta property="og:description" content="Tradition trifft Moderne - Hege und Naturschutz im Calenberger Land. Ihr Partner für nachhaltige Jagd und verantwortungsvollen Naturschutz." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="./images/hunting_equipment_1.jpeg" />
    <script type="module" crossorigin src="./assets/index-B-zpni6U.js"></script>
    <link rel="stylesheet" crossorigin href="./assets/index-BeLNIPBa.css">
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
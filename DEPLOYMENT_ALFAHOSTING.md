# Deployment-Anleitung für Alfahosting

## Für Apache-Server (Standard bei Alfahosting):

1. **Alle Dateien aus dem `dist/` Ordner hochladen**
   - index.html (Haupt-HTML-Datei)
   - index.php (PHP-Fallback)
   - .htaccess (Apache-Konfiguration)
   - assets/ (JavaScript und CSS)
   - images/ (Alle Bilder)

2. **Wichtige Dateien:**
   - `.htaccess` - Sorgt für korrektes SPA-Routing
   - `index.php` - Fallback falls .htaccess nicht funktioniert
   - Relative Pfade (`./assets/...`) für bessere Kompatibilität

## Problemlösung bei weißer Seite:

### Schritt 1: Dateien prüfen
- Sind alle Dateien hochgeladen?
- Funktioniert die .htaccess Datei?
- Werden die Assets (CSS/JS) geladen?

### Schritt 2: Browser-Entwicklertools öffnen (F12)
- **Console-Tab:** Fehlermeldungen prüfen
- **Network-Tab:** Welche Dateien werden nicht geladen?
- **Sources-Tab:** Sind die JavaScript-Dateien da?

### Schritt 3: Häufige Probleme
1. **404-Fehler bei Assets:** Pfade stimmen nicht
2. **MIME-Type Fehler:** Server erkennt .js/.css nicht
3. **Routing-Fehler:** .htaccess funktioniert nicht

### Schritt 4: Alternative Lösungen
- `index.php` als Startseite verwenden
- Subdomain oder Unterordner testen
- Support von Alfahosting kontaktieren

## Server-Konfigurationen:

### Apache (.htaccess) ✅
- Automatisches SPA-Routing
- Kompression aktiviert
- Cache-Header gesetzt

### Nginx (nginx.conf)
- Falls Nginx verwendet wird
- try_files Direktive für SPA

### IIS (web.config)
- Für Windows-Server
- URL-Rewrite Regeln

## Debugging-Tipps:

1. **Direkt index.html aufrufen:** `https://domain.de/index.html`
2. **Assets prüfen:** `https://domain.de/assets/index-B-zpni6U.js`
3. **PHP-Version testen:** `https://domain.de/index.php`

## Kontakt bei Problemen:
- Alfahosting Support
- Browser-Entwicklertools nutzen
- Fehlerlog des Servers prüfen
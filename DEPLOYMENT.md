# Deployment-Anleitung für Alfahosting

## 📋 Schritt-für-Schritt Anleitung

### 1. Dateien vorbereiten

Die Website wurde bereits kompiliert. Alle benötigten Dateien befinden sich im `/dist` Ordner:

```
dist/
├── index.html              # Haupt-HTML-Datei
├── assets/                 # CSS, JS und andere Assets
└── (weitere Dateien)
```

### 2. FTP-Upload zu Alfahosting

1. **FTP-Verbindung herstellen:**
   - Server: Ihr Alfahosting FTP-Server
   - Benutzername: Ihr FTP-Benutzername
   - Passwort: Ihr FTP-Passwort
   - Port: 21 (Standard)

2. **Dateien hochladen:**
   - Alle Dateien aus dem `/dist` Ordner
   - Zielverzeichnis: `public_html/` oder `httpdocs/`
   - Bilder aus `/public/images/` nach `public_html/images/`

### 3. .htaccess erstellen

Erstellen Sie eine `.htaccess` Datei im Hauptverzeichnis:

```apache
RewriteEngine On
RewriteBase /

# Handle Single Page Application routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### 4. Supabase-Konfiguration

Da die Website Supabase als Backend verwendet, müssen Sie:

1. **Supabase-Projekt erstellen:**
   - Gehen Sie zu [supabase.com](https://supabase.com)
   - Erstellen Sie ein neues Projekt
   - Notieren Sie sich die URL und den anon key

2. **Datenbank einrichten:**
   - Führen Sie die SQL-Migrationen aus `/supabase/migrations/` aus
   - Aktivieren Sie Row Level Security (RLS)
   - Erstellen Sie die benötigten Tabellen

3. **Edge Functions deployen:**
   - Installieren Sie die Supabase CLI
   - Deployen Sie die Functions aus `/supabase/edge_function/`

### 5. Domain-Konfiguration

1. **Domain einrichten:**
   - Verbinden Sie Ihre Domain mit dem Alfahosting-Webspace
   - Aktivieren Sie SSL (Let's Encrypt)

2. **DNS-Einstellungen:**
   - A-Record auf die Alfahosting-IP
   - CNAME für www-Subdomain

### 6. Testen

Nach dem Upload testen Sie:

1. **Frontend:**
   - Website lädt korrekt
   - Navigation funktioniert
   - Bilder werden angezeigt

2. **Shop-Funktionen:**
   - Produktkatalog lädt
   - Warenkorb funktioniert
   - Gastbestellungen möglich

3. **Admin-Bereich:**
   - Anmeldung funktioniert
   - Produktverwaltung verfügbar
   - PDF-Generierung funktioniert

## 🔧 Troubleshooting

### Häufige Probleme:

1. **404-Fehler bei Navigation:**
   - Überprüfen Sie die .htaccess-Datei
   - Stellen Sie sicher, dass mod_rewrite aktiviert ist

2. **Bilder werden nicht angezeigt:**
   - Überprüfen Sie die Pfade in `/images/`
   - Stellen Sie sicher, dass alle Bilder hochgeladen wurden

3. **Supabase-Verbindung fehlschlägt:**
   - Überprüfen Sie die API-Keys
   - Stellen Sie sicher, dass CORS korrekt konfiguriert ist

4. **Admin-Bereich nicht erreichbar:**
   - Überprüfen Sie die Supabase-Authentifizierung
   - Stellen Sie sicher, dass der Admin-User existiert

## 📞 Support

Bei Problemen:
1. Überprüfen Sie die Browser-Konsole auf Fehler
2. Kontaktieren Sie den Alfahosting-Support bei Server-Problemen
3. Überprüfen Sie die Supabase-Logs bei Backend-Problemen

## 🚀 Performance-Optimierung

Für bessere Performance:
1. Aktivieren Sie Gzip-Kompression
2. Nutzen Sie Browser-Caching
3. Optimieren Sie Bilder (WebP-Format)
4. Verwenden Sie ein CDN für statische Assets

---

**Viel Erfolg mit Ihrer Jagdrevier Weetzen Website!**
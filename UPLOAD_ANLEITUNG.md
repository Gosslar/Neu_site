# ALFAHOSTING UPLOAD-ANLEITUNG

## 📁 Diese Dateien auf Alfahosting hochladen:

### Aus dem `dist/` Ordner ALLE Dateien hochladen:

```
✅ index.html          (Haupt-HTML-Datei)
✅ .htaccess           (Apache-Konfiguration für SPA-Routing)
✅ index.php           (PHP-Fallback falls .htaccess nicht funktioniert)
✅ favicon.ico         (Website-Icon)
✅ robots.txt          (SEO-Datei)
✅ placeholder.svg     (Platzhalter-Grafik)

📁 assets/             (JavaScript und CSS Dateien)
   ✅ index-B-zpni6U.js     (Haupt-JavaScript)
   ✅ index-BeLNIPBa.css    (Alle Styles)
   ✅ html2canvas.esm-CBrSDip1.js (PDF-Generierung)
   ✅ index.es-DC4mq4gg.js  (ES Module)
   ✅ purify.es-C_uT9hQ1.js (HTML-Bereinigung)

📁 images/             (Alle Bilder - ca. 27MB)
   ✅ hunting_equipment_1.jpeg
   ✅ hunting_equipment_2.jpeg
   ✅ jagdhunde_training_1.jpeg
   ✅ rehkitzrettung_1.jpeg
   ✅ stapelteiche_1.jpeg
   ✅ weetzen_landscape_1.jpeg
   ✅ ... und alle anderen Bilder
```

## 🚀 Upload-Schritte:

### 1. FTP/SFTP-Zugang zu Alfahosting
- **Server:** Ihr Alfahosting FTP-Server
- **Benutzername:** Ihr FTP-Benutzername
- **Passwort:** Ihr FTP-Passwort
- **Zielordner:** `/` (Root) oder `/public_html/`

### 2. Alle Dateien hochladen
- **Kompletten `dist/` Ordner-Inhalt** hochladen
- **Wichtig:** Dateistruktur beibehalten!
- **Besonders wichtig:** `.htaccess` Datei (versteckte Datei!)

### 3. Testen
- **Website aufrufen:** `https://ihre-domain.de/`
- **Unterseiten testen:** `https://ihre-domain.de/shop`
- **Bei Problemen:** `https://ihre-domain.de/index.php`

## 🔧 Problemlösung:

### Weiße Seite?
1. **Browser-Entwicklertools öffnen (F12)**
2. **Console-Tab:** Fehlermeldungen prüfen
3. **Network-Tab:** Welche Dateien laden nicht?

### Häufige Probleme:
- **404-Fehler bei assets/:** Ordnerstruktur falsch
- **Routing funktioniert nicht:** .htaccess fehlt oder funktioniert nicht
- **JavaScript-Fehler:** Dateien nicht vollständig hochgeladen

### Lösungen:
- **Alle Dateien nochmal hochladen**
- **index.php als Startseite testen**
- **Alfahosting Support kontaktieren**

## 📞 Support:
- **Alfahosting Hotline:** Bei Server-Problemen
- **Browser-Entwicklertools:** Für technische Fehleranalyse
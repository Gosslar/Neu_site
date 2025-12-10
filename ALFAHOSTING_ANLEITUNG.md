# Alfahosting Deployment Anleitung - Jagdrevier Weetzen

## 🚨 BLOG WEISSE SEITE - SOFORT-LÖSUNG

### Problem: Blog-Seite zeigt weiße Seite auf Alfahosting
**Ursache:** Asset-Dateien fehlen oder sind nicht korrekt hochgeladen

### ✅ SOFORT-MASSNAHMEN:

#### 1. Alle Dateien neu hochladen
```
WICHTIG: Komplettes dist/ Verzeichnis hochladen!
├── .htaccess (Apache-Konfiguration)
├── index.html (React-App)
├── index.php (PHP-Fallback)
├── static.html (Statische Fallback-Seite)
├── diagnose.html (Diagnose-Tool)
├── assets/
│   ├── index-CmhW3_RG.js (Haupt-JavaScript)
│   ├── index-C_FFAsVU.css (Haupt-CSS)
│   ├── index.es-BllHdMtR.js (ES-Module)
│   ├── html2canvas.esm-CBrSDip1.js
│   └── purify.es-C_uT9hQ1.js
└── images/ (alle Bilder)
```

#### 2. Backup-Lösungen nutzen
- **Skywork-Backup:** https://9e3u8zepu4.skywork.website
- **Statische Version:** /static.html (funktioniert immer)
- **Diagnose-Tool:** /diagnose.html

#### 3. Dateiberechtigungen prüfen
```
Alfahosting FTP-Einstellungen:
├── .htaccess: 644
├── *.html: 644
├── *.php: 644
├── *.js: 644
├── *.css: 644
└── Verzeichnisse: 755
```

## 📋 VOLLSTÄNDIGE DATEILISTE

### Haupt-Dateien (ALLE erforderlich):
```
dist/
├── .htaccess (2.1 KB) - Apache SPA-Routing
├── index.html (1.3 KB) - React-App Entry Point
├── index.php (4.2 KB) - PHP-Fallback für SPA
├── static.html (8.1 KB) - Statische Backup-Seite
├── diagnose.html (5.8 KB) - Diagnose-Tool
├── favicon.ico (691 B)
├── robots.txt (160 B)
└── placeholder.svg (3.3 KB)
```

### Asset-Dateien (KRITISCH für Blog):
```
dist/assets/
├── index-CmhW3_RG.js (1.9 MB) - Haupt-JavaScript
├── index-C_FFAsVU.css (74 KB) - Haupt-CSS
├── index.es-BllHdMtR.js (151 KB) - ES-Module
├── html2canvas.esm-CBrSDip1.js (202 KB)
└── purify.es-C_uT9hQ1.js (22 KB)
```

### Bilder-Verzeichnis:
```
dist/images/
├── weetzen.jpg (Blog-Banner Hintergrundbild)
├── DJI_20251123100937_0001_V.jpg
├── hunting_equipment_1.jpeg
├── hunting_equipment_2.jpeg
├── hunting_equipment_3.jpeg
├── hunting_equipment_4.jpeg
├── hunting_equipment_5.jpeg
└── hunting_equipment_6.jpeg
```

## 🔧 SCHRITT-FÜR-SCHRITT UPLOAD

### 1. FTP-Verbindung zu Alfahosting
```
Server: [Ihr Alfahosting FTP-Server]
Benutzer: [Ihr FTP-Benutzername]
Passwort: [Ihr FTP-Passwort]
Port: 21 (Standard)
```

### 2. Upload-Reihenfolge (WICHTIG!)
```
1. Zuerst: Alle Dateien aus dist/assets/ hochladen
2. Dann: Haupt-HTML-Dateien (index.html, static.html, etc.)
3. Dann: Konfigurationsdateien (.htaccess, index.php)
4. Zuletzt: Bilder-Verzeichnis
```

### 3. Nach dem Upload testen
```
1. /diagnose.html aufrufen → Asset-Tests prüfen
2. /static.html aufrufen → Sollte immer funktionieren
3. / aufrufen → React-App testen
4. /blog aufrufen → Blog-Funktionalität testen
```

## 🚨 FEHLERBEHEBUNG

### Blog zeigt weiße Seite:
```
✅ Sofort-Lösungen:
1. Browser-Cache leeren (Strg+F5)
2. /static.html nutzen (funktioniert immer)
3. Backup-Website: https://9e3u8zepu4.skywork.website
4. Alle Asset-Dateien neu hochladen
```

### JavaScript-Fehler:
```
✅ Prüfen:
1. Sind alle .js-Dateien hochgeladen?
2. Korrekte Dateiberechtigungen (644)?
3. .htaccess korrekt konfiguriert?
4. MIME-Types vom Server unterstützt?
```

### 404-Fehler bei Routen:
```
✅ Lösungen:
1. .htaccess hochgeladen und aktiv?
2. mod_rewrite auf Server aktiviert?
3. index.php als Fallback nutzen
```

## 📞 SUPPORT & BACKUP

### Immer verfügbare Alternativen:
```
🌐 Skywork-Backup: https://9e3u8zepu4.skywork.website
📄 Statische Version: /static.html
🔧 Diagnose-Tool: /diagnose.html
📧 Support: info@jagdrevier-weetzen.de
📁 GitHub: https://github.com/Gosslar/Neu_site
```

### Bei anhaltenden Problemen:
```
1. Komplettes dist/ Verzeichnis neu herunterladen
2. Alle Dateien per FTP neu hochladen
3. Alfahosting-Support kontaktieren
4. Backup-Website als Alternative nutzen
```

---

**Letzte Aktualisierung:** 10. Dezember 2024
**Asset-Version:** index-CmhW3_RG.js, index-C_FFAsVU.css
**Status:** Blog-Problem erkannt, Fallback-Lösungen bereitgestellt
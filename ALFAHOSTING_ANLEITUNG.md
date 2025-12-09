# Alfahosting Deployment-Anleitung

## 🚀 Schritt-für-Schritt Anleitung für Alfahosting

### 1. Dateien herunterladen
Laden Sie alle Dateien aus dem `dist/` Verzeichnis herunter:
- index.html (Haupt-HTML-Datei)
- index.php (PHP-Fallback für Routing)
- .htaccess (Apache-Konfiguration)
- diagnose.html (Diagnose-Tool)
- assets/ (JavaScript und CSS Dateien)
- images/ (Bilder und Medien)

### 2. Upload zu Alfahosting
1. Verbinden Sie sich via FTP zu Ihrem Alfahosting-Account
2. Navigieren Sie zum Hauptverzeichnis Ihrer Domain (meist `/`)
3. Laden Sie ALLE Dateien aus dem `dist/` Verzeichnis hoch
4. Stellen Sie sicher, dass die Verzeichnisstruktur erhalten bleibt:
   ```
   /
   ├── index.html
   ├── index.php
   ├── .htaccess
   ├── diagnose.html
   ├── assets/
   │   ├── index-Dlb0yXfn.js
   │   ├── index-_Fc2wHWL.css
   │   └── weitere Asset-Dateien...
   └── images/
       ├── DJI_20251123100937_0001_V.jpg
       └── weitere Bilder...
   ```

### 3. Berechtigungen prüfen
- Stellen Sie sicher, dass alle Dateien lesbar sind (644)
- Verzeichnisse sollten ausführbar sein (755)
- Die .htaccess-Datei muss lesbar sein

### 4. Testen der Website
1. Öffnen Sie Ihre Domain im Browser
2. Falls die Seite weiß bleibt, öffnen Sie: `ihre-domain.de/diagnose.html`
3. Die Diagnose-Seite zeigt Ihnen, was funktioniert und was nicht

### 5. Häufige Probleme und Lösungen

#### Problem: Weiße Seite
**Lösung 1 - JavaScript-Dateien prüfen:**
- Öffnen Sie `ihre-domain.de/diagnose.html`
- Prüfen Sie, ob die Asset-Dateien erreichbar sind
- Falls nicht: Laden Sie die `assets/` Dateien erneut hoch

**Lösung 2 - .htaccess-Probleme:**
- Benennen Sie `.htaccess` temporär um (z.B. zu `.htaccess-backup`)
- Testen Sie die Seite erneut
- Falls es funktioniert: .htaccess-Konfiguration anpassen

**Lösung 3 - PHP-Fallback aktivieren:**
- Stellen Sie sicher, dass `index.php` hochgeladen wurde
- Testen Sie: `ihre-domain.de/index.php`

#### Problem: 404-Fehler bei Unterseiten
**Lösung:**
- Prüfen Sie, ob `.htaccess` korrekt hochgeladen wurde
- Testen Sie: `ihre-domain.de/blog` sollte funktionieren
- Falls nicht: Nutzen Sie `ihre-domain.de/index.php/blog`

#### Problem: CSS/JavaScript lädt nicht
**Lösung:**
- Prüfen Sie die Dateiberechtigungen (644 für Dateien)
- Stellen Sie sicher, dass der `assets/` Ordner vollständig hochgeladen wurde
- Leeren Sie den Browser-Cache (Strg+F5)

### 6. Alfahosting-spezifische Einstellungen

#### PHP-Version:
- Empfohlen: PHP 8.0 oder höher
- Mindestens: PHP 7.4

#### Apache-Module:
- mod_rewrite sollte aktiviert sein
- mod_headers für bessere Performance

#### Fehlerbehandlung:
- Die Website hat automatische Fallbacks
- Bei Problemen wird eine benutzerfreundliche Fehlerseite angezeigt

### 7. Backup-URLs für Tests
Falls die Hauptseite nicht funktioniert, testen Sie diese URLs:
- `ihre-domain.de/diagnose.html` (Diagnose-Tool)
- `ihre-domain.de/index.php` (PHP-Fallback)
- `ihre-domain.de/index.html` (Direkte HTML-Datei)

### 8. Support und Debugging

#### Browser-Konsole prüfen:
1. F12 drücken → Console-Tab
2. Seite neu laden
3. Fehlermeldungen notieren

#### Diagnose-Tool nutzen:
- Öffnen Sie `ihre-domain.de/diagnose.html`
- Das Tool zeigt automatisch alle Probleme an
- Folgen Sie den Lösungsvorschlägen

#### Bei anhaltenden Problemen:
- Kontaktieren Sie den Alfahosting-Support
- Senden Sie Screenshots der Diagnose-Seite
- Erwähnen Sie, dass es sich um eine React SPA handelt

### 9. Erfolgskontrolle
Die Website funktioniert korrekt, wenn:
- ✅ Startseite lädt ohne weiße Seite
- ✅ Navigation funktioniert (Blog, Admin, etc.)
- ✅ Bilder werden angezeigt
- ✅ Admin-Panel ist erreichbar unter `/admin`
- ✅ Blog-Seite ist erreichbar unter `/blog`

### 10. Wartung
- Regelmäßige Backups der Website-Dateien
- Updates durch erneuten Upload des `dist/` Verzeichnisses
- Überwachung der Diagnose-Seite bei Problemen

---

**Bei Fragen oder Problemen nutzen Sie die Diagnose-Seite oder kontaktieren Sie den Support!**
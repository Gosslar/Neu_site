# Alfahosting Deployment-Anleitung

## 🚀 Schritt-für-Schritt Anleitung für Alfahosting

### 1. Dateien herunterladen
Laden Sie alle Dateien aus dem `dist/` Verzeichnis von GitHub herunter:
- index.html (Haupt-HTML-Datei mit Fehlerbehandlung)
- index.php (PHP-Fallback für SPA-Routing)
- .htaccess (Apache-Konfiguration für Alfahosting)
- diagnose.html (System-Diagnose-Tool)
- assets/ (JavaScript und CSS Dateien)
- images/ (DJI-Drohnenbilder und Medien)

### 2. Upload zu Alfahosting
1. Verbinden Sie sich via FTP zu Ihrem Alfahosting-Account
2. Navigieren Sie zum Hauptverzeichnis Ihrer Domain (meist `/`)
3. Laden Sie ALLE Dateien aus dem `dist/` Verzeichnis hoch
4. Stellen Sie sicher, dass die Verzeichnisstruktur erhalten bleibt

### 3. Erste Diagnose
**WICHTIG**: Testen Sie zuerst: `ihre-domain.de/diagnose.html`

Das Diagnose-Tool zeigt Ihnen sofort:
- ✅ Welche Dateien korrekt geladen werden
- ❌ Welche Probleme auftreten
- 🔧 Konkrete Lösungsvorschläge

### 4. Häufige Probleme und Lösungen

#### Problem: Weiße Seite
**Sofort-Lösung:**
1. Öffnen Sie `ihre-domain.de/diagnose.html`
2. Das Tool zeigt Ihnen genau, was nicht funktioniert
3. Folgen Sie den angezeigten Lösungsvorschlägen

**Häufige Ursachen:**
- JavaScript-Dateien nicht hochgeladen → assets/ Ordner prüfen
- .htaccess-Probleme → Temporär umbenennen und testen
- Falsche Berechtigungen → 644 für Dateien, 755 für Ordner

#### Problem: Blog/Admin nicht erreichbar
**Lösung:**
- Testen Sie: `ihre-domain.de/index.php/blog`
- Falls das funktioniert: .htaccess-Problem
- Prüfen Sie mod_rewrite bei Alfahosting

### 5. Alfahosting-spezifische Einstellungen

#### Empfohlene PHP-Version:
- PHP 8.0 oder höher
- Mindestens PHP 7.4

#### Benötigte Apache-Module:
- mod_rewrite (für SPA-Routing)
- mod_headers (für Performance)

### 6. Test-URLs
Testen Sie diese URLs in folgender Reihenfolge:
1. `ihre-domain.de/diagnose.html` (Diagnose)
2. `ihre-domain.de` (Hauptseite)
3. `ihre-domain.de/blog` (Blog-Routing)
4. `ihre-domain.de/admin` (Admin-Panel)

### 7. Support
Bei Problemen:
1. Screenshot der diagnose.html-Seite machen
2. Browser-Konsole (F12) prüfen
3. Alfahosting-Support mit Diagnose-Ergebnissen kontaktieren

---

**Die Website hat umfassende Fallback-Mechanismen für Alfahosting!**
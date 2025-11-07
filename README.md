# Jagdrevier Weetzen - Website

Eine moderne Website für das Jagdrevier Weetzen mit Wildfleisch-Shop und umfassenden Informationen über nachhaltige Jagd.

## 🎯 Features

### 🛒 Wildfleisch-Shop
- **Produktkatalog** mit 5 Kategorien (Rehwild, Rotwild, Schwarzwild, Federwild, Wurstspezialitäten)
- **Gastbestellungen** ohne Anmeldung möglich
- **Barzahlung bei Abholung** als einzige Zahlungsmethode
- **Admin-Panel** für Produktverwaltung
- **PDF-Lieferscheine** automatisch generiert

### 🏞️ Revirinformationen
- **Jagdhunde im Revier** - Ausbildung und Einsatz
- **Rehkitzrettung** - Moderne Drohnen-Technologie
- **Weetzer Stapelteiche** - Gewässer und Fischbestand
- **Revierbeschreibung** - 340 Hektar Wiesen- und Feldlandschaft
- **Prädatorenmanagement** - Detaillierte Informationen zu Jagdzeiten in Niedersachsen

### 🔧 Technische Features
- **React + TypeScript** - Moderne Frontend-Technologie
- **Supabase Backend** - Datenbank und Authentifizierung
- **Responsive Design** - Optimiert für alle Geräte
- **PDF-Generierung** - Professionelle Lieferscheine
- **Admin-Bereich** - Vollständige Verwaltung

## 🚀 Deployment für Alfahosting

### Voraussetzungen
- Alfahosting-Webspace mit PHP-Unterstützung
- FTP-Zugang zum Webspace
- Domain oder Subdomain

### Installation

1. **Dateien hochladen:**
   ```bash
   # Alle Dateien aus dem /dist Ordner auf den Webspace hochladen
   # Zielverzeichnis: public_html/ oder httpdocs/
   ```

2. **Supabase-Konfiguration:**
   - Supabase-Projekt erstellen auf [supabase.com](https://supabase.com)
   - API-Keys in die Umgebungsvariablen eintragen
   - Datenbank-Migrationen ausführen

3. **Domain-Konfiguration:**
   - Domain auf den Alfahosting-Webspace zeigen lassen
   - SSL-Zertifikat aktivieren

### Dateistruktur für Webspace

```
public_html/
├── index.html              # Haupt-HTML-Datei
├── assets/                 # CSS, JS und andere Assets
│   ├── index-*.css        # Stylesheet
│   ├── index-*.js         # JavaScript-Bundle
│   └── ...
├── images/                 # Produktbilder und Fotos
│   ├── wildfleisch-*.jpg  # Wildfleisch-Produktbilder
│   ├── nature_*.jpeg      # Naturfotos
│   └── photo_*.jpg        # Revierfoto
└── .htaccess              # Apache-Konfiguration (falls nötig)
```

### Umgebungsvariablen

Für die Supabase-Integration werden folgende Variablen benötigt:
- `VITE_SUPABASE_URL` - Supabase-Projekt-URL
- `VITE_SUPABASE_ANON_KEY` - Supabase Anonymous Key

### .htaccess für Single Page Application

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^(?!.*\.).*$ /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

## 📊 Admin-Bereich

### Zugang
- **URL:** `/admin` (nach Anmeldung)
- **Admin-Account:** `info@jagd-weetzen.de`
- **Funktionen:**
  - Produktverwaltung (Erstellen, Bearbeiten, Löschen)
  - Kategorienverwaltung
  - Bestellübersicht
  - Benutzerverwaltung
  - PDF-Lieferscheine generieren

### Bestellverwaltung
- Übersicht aller Bestellungen (Gast- und Benutzerbestellungen)
- Status-Verwaltung (Pending, Confirmed)
- Kundendaten-Anzeige
- Lieferschein-Generierung als PDF

## 🛠️ Entwicklung

### Lokale Entwicklung
```bash
npm install
npm run dev
```

### Build für Produktion
```bash
npm run build
```

### Supabase-Setup
1. Projekt auf supabase.com erstellen
2. Datenbank-Migrationen aus `/supabase/migrations/` ausführen
3. Edge Functions aus `/supabase/edge_function/` deployen
4. RLS-Policies aktivieren

## 📱 Responsive Design

- **Desktop:** Vollständige Navigation mit Dropdown-Menüs
- **Tablet:** Angepasste Layouts für mittlere Bildschirme
- **Mobile:** Hamburger-Menü und Touch-optimierte Bedienung

## 🌿 Nachhaltigkeit

Die Website spiegelt die Werte des Jagdreviers wider:
- **Nachhaltige Jagd** in 340 Hektar naturbelassener Landschaft
- **Tradition und Moderne** in Einklang
- **Respekt vor der Natur** und verantwortungsvolle Hege
- **Lokale Vermarktung** von Wildfleisch

## 📞 Support

Bei Fragen zur Website oder technischen Problemen:
- **E-Mail:** info@jagd-weetzen.de
- **Dokumentation:** Siehe README-Dateien in den jeweiligen Ordnern

---

**Jagdrevier Weetzen** - Tradition, Respekt vor der Natur und verantwortungsvolle Hege seit Generationen.
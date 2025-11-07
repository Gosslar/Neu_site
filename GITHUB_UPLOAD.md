# GitHub Upload Anleitung

## 📋 Manuelle Upload-Schritte für https://github.com/Gosslar/Neu_site/

### 1. Repository vorbereiten

1. **Gehen Sie zu:** https://github.com/Gosslar/Neu_site/
2. **Löschen Sie alle vorhandenen Dateien** (falls vorhanden)
3. **Oder erstellen Sie einen neuen Branch** für die Jagdrevier-Website

### 2. Dateien hochladen

#### Option A: Drag & Drop (empfohlen)
1. **Entpacken Sie** `jagdrevier-weetzen-github.tar.gz`
2. **Ziehen Sie alle Dateien** in das GitHub-Repository
3. **Commit-Message:** "Jagdrevier Weetzen Website - Vollständige Implementation"

### 3. Wichtige Dateien für Alfahosting

Für das Alfahosting-Deployment benötigen Sie nur:
- **Alle Dateien aus `/dist/`** → Upload zu `public_html/`
- **`.htaccess`** → Für korrekte URL-Weiterleitung
- **`/images/`** → Alle Produktbilder und Fotos

### 4. Supabase-Konfiguration

Nach dem GitHub-Upload müssen Sie noch:

1. **Supabase-Projekt erstellen** auf supabase.com
2. **Datenbank-Migrationen** aus `/supabase/migrations/` ausführen
3. **Edge Functions** aus `/supabase/edge_function/` deployen
4. **API-Keys** in Ihrer Hosting-Umgebung konfigurieren

**Alle Dateien sind bereit für GitHub und Alfahosting-Deployment!** 🚀📁✅
# GitHub Pages Deployment Anleitung

## Automatische Bereitstellung über GitHub Pages

Das komplette Projekt inklusive aller Build-Dateien und Assets wurde erfolgreich zu GitHub gepusht.

### GitHub Pages Einrichtung:

1. **Repository Settings öffnen:**
   - Gehen Sie zu: https://github.com/Gosslar/Neu_site/settings/pages

2. **Source konfigurieren:**
   - Wählen Sie "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`

3. **Deployment:**
   - GitHub Pages wird automatisch die `dist/index.html` als Startseite verwenden
   - Die Website wird verfügbar unter: `https://gosslar.github.io/Neu_site/`

### Enthaltene Dateien:

#### Build-Output (dist/):
- `dist/index.html` - Hauptseite
- `dist/assets/` - Kompilierte CSS und JavaScript
- `dist/images/` - Alle Bilder und Assets

#### Spezielle Bilder:
- `bracken_training_scene_20251107_202434.png` - Jagdhunde-Ausbildung
- `fawn_rescue_drone_scene_20251107_202453.png` - Rehkitzrettung mit Drohne
- `stapelteiche_landscape_20251107_202516.png` - Stapelteiche Naturschutzgebiet
- `brandlbracke_hunting_dog_20251107_200713.png` - Brandlbracke
- `alpenlaendische_dachsbracke_20251107_200735.png` - Alpenländische Dachsbracke
- `deutsche_bracke_1.webp` - Deutsche Bracke

#### Vollständige Funktionalität:
- Alle Seiten (Homepage, Jagdhunde, Rehkitzrettung, Stapelteiche, etc.)
- Impressum und Datenschutz mit korrekten Daten
- Shop-Funktionalität
- Responsive Design
- Alle Bilder und Assets

### Nächste Schritte:

1. GitHub Pages in den Repository-Einstellungen aktivieren
2. Warten auf Deployment (ca. 5-10 Minuten)
3. Website unter der GitHub Pages URL aufrufen
4. Bei Änderungen: Neuen Build erstellen und pushen

### Lokale Entwicklung:

```bash
# Entwicklungsserver starten
npm run dev

# Production Build erstellen
npm run build

# Build-Dateien zu GitHub pushen
git add dist/
git commit -m "Update build files"
git push origin main
```

Die Website ist vollständig funktionsfähig und bereit für die Bereitstellung über GitHub Pages!
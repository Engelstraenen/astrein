# PROJEKT-MASTERFILE – ASTREIN
Gilt zusätzlich zur globalen Masterfile (~/.claude/CLAUDE.md).

## 1. Ziel und Endprodukt
Interaktive Demo-Website für einen erfundenen Tischlereibetrieb (Tischlerei ASTREIN). Musterbeispiel für Akquise an Tischler/Schreiner (nach LICHTBOGEN Elektro, WARMHERZ, FARBKANTE Maler).
Probleme, die die Seite löst: Nachwuchs/Fachkräfte (Recruiting-Doppelkapitel Film + 60-s-Bewerbung), Anfragen ohne Maße/Fotos (Anfrage per Foto + Maße), Kunde kann sich Möbel/Holz nicht vorstellen (Planer/Holzlabor), Preisdruck gegen Möbelhaus (Handwerk und Ablauf sichtbar: Aufmaß, Zuschnitt, Verbindungen, Montage), Bewertungen.

## 2. Qualitätsanspruch & Referenzen
- Aufbau wie FLUTLICHT27/FARBKANTE: Film-Kapitel (Scrollen spult Vorher → Arbeit → Ergebnis) im Wechsel mit Motion Design.
- Niveau wie FARBKANTE (live engelstraenen.github.io/farbkante/), Fotolook 4K.

## 3. Regeln für dieses Projekt
- Leitmotiv eindeutig Tischler (Aufmaß mit Laser, Formatkreissäge, CNC, Schwalbenschwanz, Hobel, Zwingen, Einbau nach Maß), nichts DIY-Artiges.
- Keine echten Firmen, keine Möbelpreise, kein Wort „KI“. Lohn/Ausbildungsvergütung dagegen transparent mit echten Tarifdaten + Quelle (Eugen 26.11.2026). Demo-Hinweis, Formulare senden nichts, `?firma=Name`.
- Bewertungen nur als markierte Beispiele (erfundene Firma).
- Alle Seiten mobil-optimiert, Prüfung in 4 Größen + Kopfzeile 1081–1600 px.

## 4. Skills, Plugins, Agenten, MCP
Keine zusätzlichen nötig (Chrome + sjinn Unlimited).

## 5. Zugänge
gh (Engelstraenen), sjinn in Chrome eingeloggt (Unlimited).

## 6. Workflow & Freigabepunkte
Storyboard-Wahl (Eugen) → First Frames 4K je Film-Kapitel → Video-Drafts kostenlos → Seite bauen → Screenshot-Vergleich → GitHub Pages.

## 7. Befehle
- Vorschau: `python3 tools/serve.py 4397` → http://localhost:4397/ (4381 ist DRSCHIWAGO)
- Prüfen: `python3 tools/check.py http://localhost:4397/ <ordner> 390x844 stamm:0,einbau:.5` · Handy komplett: `tools/mobil_check.py` (Kapitel-Liste anpassen)
- Veröffentlichen: `git subtree split --prefix site -b gh-pages && git push -f origin gh-pages` → https://engelstraenen.github.io/astrein/

## 8. Offene Fragen
- keine (A2 bestätigt). Nächste Freigabe: Startbilder ASF1–ASF7, ASS1–2.

## 9. Entschieden
- 23.11.2026: Name ASTREIN (Annahme), Storyboards TSB-1/2/3 in konzepte/ (Prompts konzepte/prompts.md).

- 23.11.2026 (Eugen): Hauptlayout = 3 „Vom Stamm zum Tisch“, dazu die Nische aus 1 als eigener Unterpunkt („beides gemixt“).
- 23.11.2026: Seitengerüst gebaut (Vanilla, statisch): Stamm-Film → Holzlabor → Einbau-Film (Laser-Aufmaß) → Anfrage (Foto/Maße/Rückruf 24 h) → Karriere-Film + Kinetik → Bewerbung 60 s → Bewertungen (Beispiel) → Footer. Repo github.com/Engelstraenen/astrein, Pages gh-pages.

- 24.11.2026 (Eugen): Storyboard A2 bestätigt (konzepte/mix-a-2.jpg) = verbindliche Vorgabe. Nische als 2. Film-Kapitel auf der Hauptseite. Holzlabor dunkel (Tischplatte schwebt über 5 Holzscheiben). Motivliste konzepte/motive.md.
- 24.11.2026: Bilder 2K kostenlos auf Dreamina (GPT Image 2.5 Sunburst, Unlimited, A2 als Referenz), Wächter `ASgo`/`AStick` in tools/dreamina_astrein.md. Dreamina-Unlimited = 1 Auftrag kontoweit.

- 26.11.2026 (Eugen): Kompletter Neubau nach V2.79. Beruf cool verkaufen, cooles Team, Karriere-Unterpunkt mit Vorteilen Azubi + Fachkraft und offenem Lohn. 3 Storyboards V3 in konzepte/v3/ (Schichtuhr, Schublade, Crew).

## 10. Ablage
Code: Dropbox/CLAUDE/Projekte/ASTREIN · Storyboards: konzepte/

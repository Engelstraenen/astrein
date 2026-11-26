# ASTREIN V3 – Drehbuch „Die Schublade“ (bestätigt 26.11.2026, Storyboard vorschau/v3/2-schublade.jpg)
Farbwelt CI: Bordeaux #2a0f14 (Raum), Creme #f0e2c8 (Schrift), Nussbaum #6b4a33 (Holz), warmes Spotlicht. Serif (Fraunces) + Grotesk (Inter Tight), Mono für Zahlen.
Navigation = die Kommode selbst (rechts schmal, 7 Schubladen-Fronten; aktive Front steht 6 px vor). Handy: Kommode oben als Leiste.

## Kapitel (= Schubladen), Übergänge
| # | Schublade | Inhalt Hauptseite | Übergang hinaus | Unterseite |
|---|---|---|---|---|
| 0 | Hero | Kommode im Bordeaux-Raum, oberste Schublade glimmt (Panel 1). „Was steckt drin?“ | Film V1: Schublade fährt auf die Kamera zu, Licht flutet → Draufsicht Schublade 1 | – |
| 1 | Holz verstehen | Draufsicht: 5 Holzproben (Panel 2). Probe antippen = Konfigurator (Sideboard in Eiche/Nussbaum/Esche/Kirsche/Ahorn × Öl/Lack/Seife), Brinell-Diagramm (echte Werte), Rechner „Holz arbeitet“, Wassertropfen-Test | Zoom ins Hirnholz der Eichenprobe (Makro 4K), Poren-Linien zeichnen sich zu Plan-Linien | holz.html |
| 2 | Planen | Schublade 2: Laser-Entfernungsmesser + Tablet (Panel 4) → Film V2 grüner Linienlaser in der Treppennische (Vorher). Anfrage per Foto: A4-Blatt als Maßstab | Plan-Linien auf dem Tablet werden zu CNC-Fräsbahnen | planung.html |
| 3 | Umsetzen | Film V3 CNC fräst entlang der Bahnen (Panel 5), Film V4 Furnierpresse, Film V5 Kantenanleimmaschine; Beispiel-Auftrag „Dein Möbel heute“ (5 Schritte); Nachher-Foto Nische fertig | gefräste Teile = Boden der nächsten Schublade | werkstatt.html |
| 4 | Team | Schublade 3: Gehörschutz, Schutzbrille, 4 Namensschilder (Panel 6) → Team-Porträt; Schilder antippen = Person | Schild „Ein Tag bei uns“ zieht die Uhr auf | tag.html (Schichtuhr) |
| 5 | Deine Vorteile | Schublade 4: Karten (Panel 7) werden zu HTML-Karten: Lohn offen (Azubi je Lehrjahr, Geselle, Meister), Arbeitszeit, Werkzeug, Weiterbildung; Lohnrechner; Bewerbung 60 s | Karte „Was du lernst“ klappt auf | karriere.html, lernen.html |
| 6 | Stimmen | Schublade 5: Postkarten (Panel 8) als HTML, jede „Beispiel“, ruhig nacheinander | letzte Karte = Kontaktkarte | – |
| 7 | Anfrage | Formular Foto + Maße + Rückruf, sendet nichts (Demo). Kommode schließt alle Schubladen = Footer | – | – |

## Fixes gegenüber Storyboard (ehrlich)
- Panel 2 Diagramm zeigt erfundene „Janka“-Zahlen → auf der Seite echte Brinell-Werte (Quelle sichtbar).
- Panel 3 Makro wirkt künstlich (Würfel mit Löchern) → echtes Hirnholz-Makro neu erzeugen, gleicher Look.
- Panel 8 Postkarten-Texte werden HTML (Beispiel-Texte), nicht aus dem Bild.

## Woran hat noch niemand gedacht?
1. A4-Blatt als Maßstab im Nischen-Foto (Breite/Höhe-Schätzung im Browser).
2. „Holz arbeitet“-Rechner (Raumfeuchte → mm Bewegung, echtes differentielles Schwindmaß).
3. „Dein Möbel heute“ – Beispiel-Auftragsverfolgung mit Foto je Schritt.
4. Lohnrechner mit echten Tarifwerten + Quelle.
5. Wassertropfen-Test Öl / Lack / Seife.
6. Die Kommode ist die Navigation: geöffnete Schublade = aktuelles Kapitel, Footer = alle Schubladen schließen sich mit Soft-Close.

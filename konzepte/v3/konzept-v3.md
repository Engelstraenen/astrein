# ASTREIN Neubau V3 – Konzept (intern, 26.11.2026)
Alte Fassung (Stamm-Film → Holzlabor → Einbau → Anfrage → Karriere → Bewerbung → Bewertungen) = Standard-Schema, verworfen.
Ausgeschlossen wegen Wiederholung: 360°-Kamerakreis (WURZELWERK/SPALTMASS), Explosionszeichnung (DREHMOMENT DMSB-2), Stamm→Tisch (alte ASTREIN).

## Inspiration (nur Technik, nie Vorlage)
| SB | Vorlage | wofür |
|---|---|---|
| 1 Schichtuhr | getlayers `relay` (ein Strom fädelt die ganze Seite, Ruler/Timeline, Mono-Zahlen tippen sich) | Uhrzeit-Bogen als durchgehende Navigation, Zeiten zählen hoch |
| 1 | getlayers `blinds` (Licht durch Lamellen wandert, click-to-inspect) | Tageslicht wandert über die Szenen, Klick auf Möbel → Detail |
| 2 Schublade | motionsites `card-stack` / `layered-depth` (Ebenen fahren in die Tiefe) | Schubladen fahren auf die Kamera zu (Vollauszug) |
| 2 | getlayers `halden` (Raum dunkel bis auf das Stück unter dem Cursor, Ecken-Shutter-Loader) | Spot auf der Schublade, Loader als Schubladenfuge |
| 3 Crew | getlayers `kimi` (Sticky-Stack, Karten landen aufeinander, Portrait reagiert aufs Licht) | Crew-Karten stapeln sich, Portrait-Relight |
| 3 | getlayers `auralis` (eine ungeschnittene Kamerafahrt) + motionsites `spin-product` | Konfigurator-Drehung des Sideboards |

## Pflicht in allen 3
- Karriere-Unterseite (Eugen 26.11.): Vorteile Azubi + Fachkraft, Lohn transparent (Tarif-Ausbildungsvergütung je Lehrjahr + Gesellenlohn, echte Tarifdaten mit Quelle/Stand), Arbeitszeit, Werkzeug, Weiterbildung (Meister), Bewerbung in 60 s.
- Anfrage per Foto + Maße, Konfigurator Holz × Oberfläche, Diagramme mit echten Holzdaten (Brinell-Härte, Rohdichte, Schwindmaß, Trocknung), Unterseite je Haltepunkt, Bewertungen nur „Beispiel“.

## Woran hat noch niemand gedacht?
1. Maßstab per A4-Blatt: Kunde legt ein A4-Blatt in die Nische, fotografiert, die Seite schätzt Breite/Höhe aus dem Blatt (läuft im Browser, sendet nichts).
2. Holz arbeitet – Rechner: Raumfeuchte-Schieber zeigt, wie viele mm eine 90-cm-Eichenplatte quer schwindet/quillt (differentielles Schwindmaß) → warum Tischler Fugen planen.
3. „Dein Möbel heute“: Beispiel-Auftragsverfolgung (Aufmaß → CNC → Furnier → Oberfläche → Montage) mit Foto je Schritt.
4. Lohnrechner Karriere: Lehrjahr/Gesellenjahr wählen → Tarifwert + was dazukommt (Werkzeug, Fahrtzeit, Weiterbildung), alles mit Quelle.
5. Wassertropfen-Test der Oberflächen: Hover lässt einen Tropfen auf Öl/Lack/Seife abperlen oder einziehen.

## Übergangs-Drehbuch (Kurzform)
SB-1: Licht an (Hallenlampen) → CNC-Spindel (Zoom auf Span) → Span fliegt aus dem Bild = Laserlinie beim Kunden → Laserlinie wird Furnierfuge → Hallentor-Licht = Mittag → Sonnenfleck wandert auf Musterwand → Muster wird Front im Einbau → Abendlicht, Tor schließt = Bewerbung.
SB-2: Schublade fährt auf Kamera zu → Kamera taucht in Holzprobe (Hirnholz-Makro) → Poren werden Plan-Linien → Plan-Linien = CNC-Fräsbahnen → Teile werden Schubladenboden der nächsten Schublade → … letzte Schublade schließt = Footer.
SB-3: Rim-Light-Portrait → Licht wandert auf Touchscreen → Maschine (Video) → Laserlinie über Fronten → Furnier klappt wie Buch auf = Seitenwechsel → Azubi → Sideboard-Slices → Kinetik-Typo fährt aus Werkstattfoto → Handy.

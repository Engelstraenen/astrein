# Dreamina-Wächter ASTREIN (24.11.2026)

Tab: dreamina.capcut.com/ai-tool/generate?workspace=22002180030212&type=image (ASTREIN-Sitzung)
Leiste: AI Image · GPT Image 2.5 Sunburst · 16:9 · 2K · Medium · 1 image · Unlimited an · Preis 0.

## Referenz ohne Zwischenablage
1. `<input type=file id=asin aria-label="ASTREIN file loader">` per javascript_tool anlegen.
2. Chrome `file_upload` mit konzepte/mix-a-2.jpg.
3. `ClipboardEvent('paste', {clipboardData: DataTransfer mit der Datei})` ins `[contenteditable=true]`. Achtung: Wird doppelt eingefügt → eine Referenz per `[aria-label^="Remove"]` entfernen.

## Prompt setzen (Erwähnungs-Token bleibt)
`ASset(text)`: alte Textknoten (>20 Zeichen) leeren, Cursor ans Ende, `execCommand('insertText', false, ' ' + text)`.

## Klick nur, wenn frei
`ASgo()`: Schalter `[role=switch]` aria-checked=true, Preis-Token direkt nach „Unlimited“ (5 Ebenen über dem Schalter) = 0, Knopf aktiv → ein Klick. Erscheint neu „run up to 1 generation at a time“ → Escape, Ergebnis BUSY (keine Credits, Karte „failed“ bleibt im Verlauf).
`AStick()`: alle 60 s nächster Versuch, nach CLICKED nächster Auftrag (`ASQ`, Prompts in `ASP`).

## Download
Detailansicht (Bild anklicken) → „Download“ oben rechts → ~/Downloads/dreamina-<Datum>-<Nr>-<Prompt-Anfang>….jpeg → nach konzepte/ bzw. assets-roh/ verschieben. Fremde Dateien im Download-Ordner nicht anfassen.

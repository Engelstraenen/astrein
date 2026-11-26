#!/usr/bin/env python3
"""Abnahme: je Storyboard-Panel das Panel (groß) + Seite Desktop (1600x900) + Handy (390x844) an derselben Stelle.
Start: python3 tools/abnahme.py [port]   → abnahme/<seite>-<n>-{storyboard,desktop,handy}.jpg + abnahme/daten.json
Vorlage KEHRWERK tools/abnahme.py, erweitert um mehrere Seiten (Hauptseite SB2, Tag SB1, Lernen L2)."""
import asyncio, json, os, sys
from playwright.async_api import async_playwright
from PIL import Image
PORT = sys.argv[1] if len(sys.argv) > 1 else '4397'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'abnahme'); os.makedirs(OUT, exist_ok=True)
SEITEN = [
  ('haupt', 'index.html', 'konzepte/v3/roh/sb2-schublade.png', [
    ('Kommode, Schublade glimmt', 'hero', .02), ('Holzproben in der Schublade', 'holz', .35), ('Hirnholz-Makro', 'makro', .25),
    ('Laser-Aufmaß', 'planen', .75), ('CNC-Fräsbahnen', 'umsetzen', .6), ('Team + Namensschilder', 'team', .3),
    ('Deine Vorteile (Karten)', 'vorteile', .7), ('Postkarten (Beispiel)', 'stimmen', .3), ('Handy-Ansicht', 'anfrage', .2)]),
  ('tag', 'tag.html', 'konzepte/v3/roh/sb1-schichtuhr.png', [
    ('07:00 Licht an', 'day', .02), ('07:30 CNC', 'day', .28), ('09:00 Raus zum Kunden', 'day', .40), ('10:30 Schleifen', 'day', .5),
    ('12:00 Mittag', 'day', .62), ('13:30 Musterwand', 'day', .73), ('14:30 Montage', 'day', .84), ('15:45 Feierabend', 'day', .97), ('Handy', 'bewerbung', .1)]),
  ('lernen', 'lernen.html', 'konzepte/v3/roh/l2-gesellenstueck.png', [
    ('Start: leere Werkbank', 'gs', .0), ('Monat 2 Anreißen', 'gs', .07), ('Monat 8 Sägen', 'gs', .23), ('Monat 14 CNC', 'gs', .39),
    ('Monat 20 Verbinden', 'gs', .56), ('Monat 28 Furnieren', 'gs', .78), ('Monat 34 Ölen', 'gs', .945), ('Monat 36 Gesellin', 'gs', 1.0), ('Handy', 'bewerbung', .1)]),
]
async def main():
    data = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for key, url, sb, panels in SEITEN:
            im = Image.open(os.path.join(ROOT, sb)).convert('RGB'); W, H = im.size; pw, ph = W / 3, H / 3
            for i in range(9):
                r, c = divmod(i, 3); im.crop((int(c * pw), int(r * ph), int((c + 1) * pw), int((r + 1) * ph))).save(f'{OUT}/{key}-{i+1}-storyboard.jpg', quality=88)
            for tag, w, h, mob in (('desktop', 1600, 900, False), ('handy', 390, 844, True)):
                pg = await b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=2 if mob else 1, is_mobile=mob, has_touch=mob)
                await pg.goto(f'http://localhost:{PORT}/{url}', wait_until='networkidle'); await pg.wait_for_timeout(1500)
                await pg.evaluate("document.querySelector('.demo')&&document.querySelector('.demo').remove()")
                for i, (name, sid, t) in enumerate(panels):
                    await pg.evaluate(f"(()=>{{const s=document.getElementById('{sid}');const st=s.classList.contains('stage');scrollTo(0,st?s.offsetTop+(s.offsetHeight-innerHeight)*{t}:s.offsetTop+s.offsetHeight*{t}-innerHeight*0.2)}})()")
                    await pg.wait_for_timeout(1400)
                    await pg.screenshot(path=f'{OUT}/{key}-{i+1}-{tag}.jpg', type='jpeg', quality=80)
                await pg.close()
            data.append({'seite': key, 'url': url, 'panels': [n for n, _, _ in panels]})
        await b.close()
    json.dump(data, open(f'{OUT}/daten.json', 'w'), ensure_ascii=False, indent=1)
    print('ok', OUT)
asyncio.run(main())

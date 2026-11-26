#!/usr/bin/env python3
"""Kopfzeile auf Laptop-Breiten 1081–1600 px prüfen: rechte Kante aller Kopfzeilen-Elemente <= Fensterbreite.
Start: python3 tools/kopf.py [port]"""
import sys
from playwright.sync_api import sync_playwright
PORT = sys.argv[1] if len(sys.argv) > 1 else '4397'
PAGES = ['index.html', 'tag.html', 'lernen.html', 'karriere.html', 'holz.html', 'planung.html', 'werkstatt.html']
bad = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in (1081, 1180, 1241, 1280, 1366, 1440, 1600):
        pg = b.new_page(viewport={'width': w, 'height': 800})
        for u in PAGES:
            pg.goto(f'http://localhost:{PORT}/{u}', wait_until='domcontentloaded'); pg.wait_for_timeout(300)
            r = pg.evaluate("""()=>{const W=innerWidth;let m=0,who='';document.querySelectorAll('#hdr *').forEach(e=>{const s=getComputedStyle(e);if(s.display==='none'||s.visibility==='hidden')return;const r=e.getBoundingClientRect();if(r.width&&r.height&&r.top<80&&r.right>m){m=r.right;who=e.tagName+' '+(e.innerText||'').slice(0,20)}});return [m,W,who]}""")
            if r[0] > r[1] + 0.5: bad.append((w, u, r))
        pg.close()
    b.close()
print('Kopfzeile OK' if not bad else bad)

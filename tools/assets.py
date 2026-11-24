#!/usr/bin/env python3
"""Rohbilder (assets-roh/2k, später 4k) -> WebP für die Seite + img.js. Cache: unveränderte Quellen werden übersprungen.
Start: python3 tools/assets.py"""
import json, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets-roh')
OUT = os.path.join(ROOT, 'site', 'assets', 'img')
CACHE = os.path.join(ROOT, 'assets-roh', '.cache.json')
# Schlüssel auf der Seite -> Rohdatei (4k bevorzugt, sonst 2k)
MAP = {
  'asf1': 'asf1-stamm', 'asf2': 'asf2-hobeln', 'asf3': 'asf3-verleimen', 'asf4': 'asf4-tisch',
  'f2-nische': 'asf5-nische-vorher', 'f2b-nische-fertig': 'asf6-nische-fertig', 'f3-karriere': 'asf7-karriere',
  'm1-tisch': 'ass1-tischplatte', 'm2-scheiben': 'ass2-scheiben',
}
os.makedirs(OUT, exist_ok=True)
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
img = {}
for key, base in MAP.items():
    src = None
    for d in ('4k', '2k'):
        for ext in ('.png', '.jpg', '.webp'):
            p = os.path.join(SRC, d, base + ext)
            if os.path.exists(p): src = p; break
        if src: break
    if not src: continue
    st = os.stat(src); sig = '%s|%d|%d' % (src, st.st_mtime, st.st_size)
    d_out, m_out = os.path.join(OUT, key + '.webp'), os.path.join(OUT, key + '-m.webp')
    if cache.get(key) != sig or not os.path.exists(d_out):
        im = Image.open(src).convert('RGB'); w, h = im.size
        im.resize((min(w, 3840), round(h * min(w, 3840) / w)), Image.LANCZOS).save(d_out, 'WEBP', quality=84, method=6)
        # Handy hochkant: mittiger Ausschnitt 3:4 in voller Höhe (nie hochskalieren)
        cw = min(w, round(h * 3 / 4)); x0 = (w - cw) // 2
        im.crop((x0, 0, x0 + cw, h)).save(m_out, 'WEBP', quality=82, method=6)
        cache[key] = sig; print('neu', key, w, 'x', h)
    img[key] = {'d': 'assets/img/' + key + '.webp', 'm': 'assets/img/' + key + '-m.webp'}
json.dump(cache, open(CACHE, 'w'))
vid = {}
for k in ('stamm', 'nische', 'karriere'):
    if os.path.exists(os.path.join(ROOT, 'site', 'assets', 'vid', k + '.mp4')):
        vid[k] = {'d': 'assets/vid/%s.mp4' % k, 'm': 'assets/vid/%s-m.mp4' % k if os.path.exists(os.path.join(ROOT, 'site', 'assets', 'vid', k + '-m.mp4')) else 'assets/vid/%s.mp4' % k}
open(os.path.join(ROOT, 'site', 'assets', 'js', 'img.js'), 'w').write('window.IMG = %s;\nwindow.VID = %s;\n' % (json.dumps(img, indent=1), json.dumps(vid)))
print('img.js:', ', '.join(img))

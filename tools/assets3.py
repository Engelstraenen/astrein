#!/usr/bin/env python3
"""V3: Rohbilder assets-roh/v3/{4k,2k}/<key>.(png|jpg) -> geschärfte WebP (Desktop max 3840 + Handy 3:4) + Videos -> site/assets/js/media.js
Schärfen: UnsharpMask(1.6, 70, 2), Originale bleiben unverändert. Cache: unveränderte Quellen werden übersprungen.
Start: python3 tools/assets3.py"""
import json, os
from PIL import Image, ImageFilter
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets-roh', 'v3'); OUT = os.path.join(ROOT, 'site', 'assets', 'img'); VOUT = os.path.join(ROOT, 'site', 'assets', 'vid')
CACHE = os.path.join(SRC, '.cache.json')
os.makedirs(OUT, exist_ok=True)
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
img = {}
keys = set()
for d in ('4k', '2k'):
    p = os.path.join(SRC, d)
    if os.path.isdir(p): keys |= {os.path.splitext(f)[0] for f in os.listdir(p) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))}
for key in sorted(keys):
    src = None
    for d in ('4k', '2k'):
        for ext in ('.png', '.jpg', '.jpeg', '.webp'):
            p = os.path.join(SRC, d, key + ext)
            if os.path.exists(p): src = p; break
        if src: break
    st = os.stat(src); sig = '%s|%d|%d' % (src, st.st_mtime, st.st_size)
    d_out, m_out = os.path.join(OUT, key + '.webp'), os.path.join(OUT, key + '-m.webp')
    if cache.get(key, {}).get('sig') != sig or not os.path.exists(d_out):
        im = Image.open(src).convert('RGB'); w, h = im.size
        im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))
        tw = min(w, 3840)
        im.resize((tw, round(h * tw / w)), Image.LANCZOS).save(d_out, 'WEBP', quality=86, method=6)
        cw = min(w, round(h * 3 / 4)); x0 = (w - cw) // 2
        im.crop((x0, 0, x0 + cw, h)).save(m_out, 'WEBP', quality=84, method=6)
        cache[key] = {'sig': sig, 'w': w, 'h': h}; print('neu', key, w, 'x', h)
    img[key] = {'d': 'assets/img/' + key + '.webp', 'm': 'assets/img/' + key + '-m.webp', 'w': cache[key]['w'], 'h': cache[key]['h']}
json.dump(cache, open(CACHE, 'w'))
vid = {}
if os.path.isdir(VOUT):
    for f in sorted(os.listdir(VOUT)):
        if f.endswith('.mp4') and not f.endswith('-m.mp4'):
            k = f[:-4]; v = '?v=%d' % int(os.path.getmtime(os.path.join(VOUT, f)))  # V2.85: Version gegen Browser-Cache
            e = {'d': 'assets/vid/' + f + v}
            if os.path.exists(os.path.join(VOUT, k + '-m.mp4')): e['m'] = 'assets/vid/' + k + '-m.mp4' + v
            if os.path.exists(os.path.join(VOUT, k + '-poster.jpg')): e['poster'] = 'assets/vid/' + k + '-poster.jpg'
            vid[k] = e
open(os.path.join(ROOT, 'site', 'assets', 'js', 'media.js'), 'w').write('window.IMG=' + json.dumps(img) + ';\nwindow.VID=' + json.dumps(vid) + ';\n')
print(len(img), 'Bilder,', len(vid), 'Videos')

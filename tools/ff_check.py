#!/usr/bin/env python3
"""Prüft, ob ein Dreamina-Clip wirklich auf seinem Startbild beginnt (Fehler V6 27.11.: Startbild ignoriert).
Start: python3 tools/ff_check.py v6 [ta9 l3 …]  → Korrelation erstes Videobild ↔ Startbild (≥ 0,6 = ok)."""
import json, os, re, subprocess, sys
import numpy as np
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
js = open(os.path.join(ROOT, 'tools', 'dreamina_video_v3.js')).read()
AVP = json.loads(re.search(r'window\.AVP = (\{.*?\});\n', js, re.S).group(1))
def gray(img): return np.asarray(img.convert('L').resize((160, 90)), dtype=float)
for n in sys.argv[1:]:
    vid = os.path.join(ROOT, 'assets-roh', 'v3', 'vid', n + '.mp4')
    ff = os.path.join(ROOT, 'konzepte', 'v3', 'ff', AVP[n.upper()]['ff'] + '.jpg')
    tmp = '/tmp/_ffc.png'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', vid, '-frames:v', '1', tmp], check=True)
    a, b = gray(Image.open(tmp)), gray(Image.open(ff))
    a, b = a - a.mean(), b - b.mean()
    r = float((a * b).sum() / np.sqrt((a * a).sum() * (b * b).sum()))
    print(n, round(r, 2), 'ok' if r >= 0.6 else 'FALSCH – Startbild nicht verwendet')

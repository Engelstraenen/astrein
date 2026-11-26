#!/usr/bin/env python3
"""Verschiebt eigene Dreamina-Downloads (Name enthält 'ASTREIN-<ID>.') aus ~/Downloads nach assets-roh/v3/2k/<id>.png.
Fremde Dateien bleiben liegen. Start: python3 tools/hol_downloads.py"""
import os, re, shutil
from PIL import Image
D = os.path.expanduser('~/Downloads'); ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets-roh', 'v3', '2k'); os.makedirs(OUT, exist_ok=True)
for f in sorted(os.listdir(D)):
    m = re.search(r'ASTREIN-([A-Z]+\d+)\.', f)
    if not m or not f.startswith('dreamina-'): continue
    k = m.group(1).lower(); ext = os.path.splitext(f)[1]
    if ext == '.mp4':
        vd = os.path.join(ROOT, 'assets-roh', 'v3', 'vid'); os.makedirs(vd, exist_ok=True); dst = os.path.join(vd, k + '.mp4'); shutil.move(os.path.join(D, f), dst); print(k, 'video'); continue
    dst = os.path.join(OUT, k + ext)
    shutil.move(os.path.join(D, f), dst); w, h = Image.open(dst).size; print(k, w, 'x', h)

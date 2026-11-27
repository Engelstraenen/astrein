#!/usr/bin/env python3
"""V3: Roh-Clip (Dreamina 720P) -> site/assets/vid/<key>.mp4 (+ <key>-m.mp4 Handy hochkant 3:4, volle Höhe).
Start: python3 tools/video3.py <roh.mp4> <key> [--scrub] [--speed 1.5]
--scrub = All-Intra (jedes Bild Keyframe) für Scroll-Spulen; sonst normale Schleife.
Immer: nachschärfen (unsharp 5:5:0.7), kein Ton, faststart, nie hochskalieren. Danach tools/assets3.py (media.js)."""
import os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'site', 'assets', 'vid'); os.makedirs(OUT, exist_ok=True)
a = sys.argv[1:]; src, key = a[0], a[1]
scrub = '--scrub' in a
speed = float(a[a.index('--speed') + 1]) if '--speed' in a else 1.0
w, h = (int(x) for x in subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', src]).decode().strip().split(',')[:2])
pts = f'setpts={1/speed:.4f}*PTS,' if speed != 1 else ''
big = w >= 3000  # 4K-Master (aus 720p hochgerechnet): Desktop volle 3840, Handy 1440x1920
sharp = 'unsharp=5:5:0.5' if big else 'unsharp=5:5:0.7'
G = a[a.index('--gop') + 1] if '--gop' in a else '1'
if big and scrub: G = '1'  # V2.85: 4K-Scroll-Filme nur All-Intra (sonst Blockfehler beim Spulen in Chrome/Mac)
gop = ['-g', G, '-keyint_min', G, '-sc_threshold', '0', '-bf', '0'] if scrub else ['-g', '48']
base = ['-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', ('26' if big else ('23' if '--gop' in a else '20')) if scrub else '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', '30'] + gop
d = os.path.join(OUT, key + '.mp4'); m = os.path.join(OUT, key + '-m.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', src, '-vf', f'{pts}{sharp}'] + base + [d], check=True)
cw = min(w, round(h * 3 / 4)) // 2 * 2
msc = ',scale=1440:1920:flags=lanczos' if big else ''
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', src, '-vf', f'{pts}crop={cw}:{h}:(iw-{cw})/2:0{msc},{sharp}'] + base + [m], check=True)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', d, '-frames:v', '1', '-q:v', '3', os.path.join(OUT, key + '-poster.jpg')], check=True)
print(key, w, 'x', h, 'scrub' if scrub else 'loop', os.path.getsize(d) // 1024, 'KB')

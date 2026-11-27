#!/usr/bin/env python3
"""720P-Clips nacheinander lokal auf 4K hochrechnen (Masterfile V2.85, Real-ESRGAN x2plus + bicubic auf 3840).
Wartet, bis kein anderer Upscale (auch aus fremden Sitzungen) auf der GPU läuft – nie zwei gleichzeitig.
Start (im Hintergrund): python3 tools/upscale_queue.py v1 v2 v3 v4b ta1 ta2
Quelle assets-roh/v3/vid/<n>.mp4 -> assets-roh/v3/vid4k/<n>.mp4 (fertige werden übersprungen)."""
import os, subprocess, sys, time
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets-roh', 'v3', 'vid'); DST = os.path.join(ROOT, 'assets-roh', 'v3', 'vid4k'); os.makedirs(DST, exist_ok=True)
C = os.path.expanduser('~/Library/Caches/video-upscale')
def gpu_busy():
    return subprocess.run(['pgrep', '-f', 'upscale_vid.py'], capture_output=True).returncode == 0
for n in sys.argv[1:]:
    src, out = os.path.join(SRC, n + '.mp4'), os.path.join(DST, n + '.mp4')
    if os.path.exists(out) or not os.path.exists(src): print(n, 'übersprungen', flush=True); continue
    while gpu_busy(): time.sleep(60)
    t = time.time(); tmp = out + '.part.mp4'
    r = subprocess.run([C + '/venv/bin/python', C + '/upscale_vid.py', '--gewichte', C + '/RealESRGAN_x2plus.pth', '--in', src, '--out', tmp, '--breite', '3840'])
    if r.returncode == 0 and os.path.exists(tmp): os.replace(tmp, out); print(n, '4K fertig', int(time.time() - t), 's', flush=True)
    else: print(n, 'FEHLER', r.returncode, flush=True)

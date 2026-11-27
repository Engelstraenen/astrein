#!/usr/bin/env python3
"""„Ein Tag bei uns“ als EIN Storytelling-Film zum Scrollen.
Je Station (AT1–AT9) 5 s: fertiger Dreamina-Clip assets-roh/v3/vid/ta<N>.mp4, sonst (Übergang) langsame Kamerafahrt
ins Startbild assets-roh/v3/2k/at<N>.png. Stationen gehen per 0,6-s-Überblendung ineinander über.
Ergebnis: site/assets/vid/tag1…tag9 (+ -m, -poster) → danach tools/assets3.py.
Seite rechnet mit SEG=5, XF=0.6 (tag.html)."""
import os, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'assets-roh', 'v3')
TMP = os.path.join(RAW, 'vid', '_tag'); os.makedirs(TMP, exist_ok=True)
SEG, XF, FPS, N = 5.0, 0.6, 30, 9
segs, echt = [], []
for i in range(1, N + 1):
    out = os.path.join(TMP, f's{i}.mp4'); clip = os.path.join(RAW, 'vid4k', f'ta{i}.mp4')
    if not os.path.exists(clip): clip = os.path.join(RAW, 'vid', f'ta{i}.mp4')
    if os.path.exists(clip):
        vf = f'scale=3840:2160:flags=lanczos:force_original_aspect_ratio=increase,crop=3840:2160,fps={FPS},trim=0:{SEG},setpts=PTS-STARTPTS'
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', clip, '-vf', vf, '-an', '-c:v', 'libx264', '-crf', '14', '-pix_fmt', 'yuv420p', out], check=True); echt.append(i)
    else:
        fr = int(SEG * FPS)
        vf = (f"scale=5760:-2,zoompan=z='1+0.07*on/{fr}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={fr}:s=3840x2160:fps={FPS}")
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-i', os.path.join(RAW, '2k', f'at{i}.png'), '-vf', vf, '-frames:v', str(fr),
                        '-c:v', 'libx264', '-crf', '14', '-pix_fmt', 'yuv420p', out], check=True)
    segs.append(out)
# Web: je Station eine eigene 4K-Datei tag1…tag9 (All-Intra), die Seite blendet zwischen ihnen über.
# Ein einzelner 45-s-4K-All-Intra-Film wäre über 200 MB (GitHub-Grenze 100 MB je Datei).
for k, seg in enumerate(segs, 1):
    subprocess.run(['python3', os.path.join(ROOT, 'tools', 'video3.py'), seg, f'tag{k}', '--scrub'], check=True)
print('tagfilm', len(echt), 'echte Clips', echt, '·', N - len(echt), 'Kamerafahrten')

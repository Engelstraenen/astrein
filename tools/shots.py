#!/usr/bin/env python3
"""Einzelne große Vorschau-Screenshots für Eugen: python3 tools/shots.py <port> <ausgabeordner> url:id:anteil:name ...
Desktop 1600x900. Beispiel: index.html:hero:.02:1-hero"""
import asyncio, os, sys
from playwright.async_api import async_playwright
PORT, OUT = sys.argv[1], sys.argv[2]; os.makedirs(OUT, exist_ok=True)
JOBS = [a.split(':') for a in sys.argv[3:]]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1600, 'height': 900})
        cur = None
        for url, sid, t, name in JOBS:
            if url != cur:
                await pg.goto(f'http://localhost:{PORT}/{url}', wait_until='networkidle'); await pg.wait_for_timeout(1500); cur = url
                await pg.evaluate("document.querySelector('.demo')&&document.querySelector('.demo').remove()")
            await pg.evaluate(f"(()=>{{const s=document.getElementById('{sid}');const st=s.classList.contains('stage');scrollTo(0,st?s.offsetTop+(s.offsetHeight-innerHeight)*{t}:s.offsetTop+s.offsetHeight*{t}-innerHeight*0.15)}})()")
            await pg.wait_for_timeout(1600)
            await pg.screenshot(path=f'{OUT}/{name}.jpg', type='jpeg', quality=86)
        await b.close()
asyncio.run(main())

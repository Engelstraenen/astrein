// ASTREIN Dreamina-Bild-Warteschlange V3 (26.11.2026). Nur BILD (AI Image, GPT Image 2.5 Sunburst, 16:9, 2K, Medium, Unlimited 0).
// Laden: input#dqjs + file_upload + (0,eval)(await dqjs.files[0].text())
// Referenz: DQ.ref(fileInput) schickt die Datei per Paste-Event ins Prompt-Feld (keine Mac-Zwischenablage).
// Regel: erst fertig, dann nächster. Klick nur, wenn Schalter an + Preis 0 + kein eigener Auftrag im Hauptbereich läuft.
window.DQ = window.DQ || {};
DQ.log = DQ.log || [];
DQ.sleep = ms => new Promise(r => setTimeout(r, ms));
DQ.pm = () => [...document.querySelectorAll('.ProseMirror')].find(e => e.offsetParent);
DQ.ref = async (inp) => { const f = inp.files[0]; const dt = new DataTransfer(); dt.items.add(f); const pm = DQ.pm(); pm.focus(); pm.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })); await DQ.sleep(4000); return DQ.mentions(); };
DQ.mentions = () => { const pm = DQ.pm(); if (!pm || !pm.editor) return -1; const c = (pm.editor.getJSON().content || [])[0]; return ((c && c.content) || []).filter(n => n.type !== 'text').length; };
DQ.set = (txt) => { const ed = DQ.pm().editor; const c = (ed.getJSON().content || [])[0]; const ms = ((c && c.content) || []).filter(n => n.type !== 'text'); ed.commands.setContent({ type: 'doc', content: [{ type: 'paragraph', content: ms.concat([{ type: 'text', text: ' ' + txt }]) }] }); return ms.length; };
DQ.bar = () => { const sw = [...document.querySelectorAll('[role=switch]')].find(e => e.offsetParent); if (!sw) return null; let c = sw; while (c && !/Sunburst/.test(c.innerText)) c = c.parentElement; if (!c) return null; const t = c.innerText.replace(/\s+/g, ' ').trim(); return { sw, c, t, price: (t.split('Unlimited')[1] || '').trim().split(' ')[0] }; };
// eigener laufender Auftrag: Karten im Hauptbereich (links > 400 px) mit Warte-/Lauf-Text
// Karten unten werden erst gerendert, wenn der Hauptbereich nach unten gescrollt ist (sonst meldet busy fälschlich frei)
DQ.toBottom = () => [...document.querySelectorAll('*')].filter(e => e.scrollHeight > e.clientHeight + 200 && getComputedStyle(e).overflowY != 'visible' && e.getBoundingClientRect().left > 300).forEach(e => e.scrollTop = e.scrollHeight);
DQ.busy = () => DQ.toBottom() || [...document.querySelectorAll('*')].some(e => e.children.length === 0 && e.getBoundingClientRect().left > 400 && (/(Generating|Waiting in queue|High demand)/i.test(e.textContent || '') || /^\d{1,2}%$/.test((e.textContent || '').trim())));
DQ.go = async () => {
  const b = DQ.bar(); if (!b) return 'NOBAR';
  if (b.sw.getAttribute('aria-checked') !== 'true') return 'SWITCH-OFF';
  if (!/2K/.test(b.t) || !/Medium/.test(b.t) || !/16:9/.test(b.t)) return 'SETTINGS ' + b.t;
  if (b.price !== '0' && b.price !== '') return 'PRICE ' + b.price; // leer = Unlimited ohne Zahl
  const g = [...b.c.querySelectorAll('button')].filter(x => x.offsetParent).pop(); if (!g || g.disabled) return 'NOBUTTON';
  const n0 = (document.body.innerText.match(/run up to 1 generation/gi) || []).length;
  g.click(); await DQ.sleep(45000);
  const n1 = (document.body.innerText.match(/run up to 1 generation/gi) || []).length;
  if (n1 > n0) { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return 'BUSY'; }
  return DQ.busy() ? 'SENT' : 'UNSURE';
};
// Gegenprobe: Ergebnis-Karte mit Bild vorhanden?
DQ.has = (id) => [...document.querySelectorAll('img')].some(i => { if (i.src.startsWith('blob') || i.naturalWidth < 900) return false; let c = i; for (let k = 0; k < 12 && c; k++) { c = c.parentElement; const mm = c && c.innerText && c.innerText.match(/ASTREIN-[A-Z0-9]+/); if (mm) return mm[0] === id; } return false; });
DQ._x = () => {
};
DQ.run = async (jobs) => {
  const run = Date.now(); DQ.runId = run;
  for (const j of jobs) {
    if (DQ.log.some(l => l.id === j.id && l.st === 'SENT')) continue;
    while (DQ.runId === run) {
      if (DQ.busy()) { await DQ.sleep(60000); continue; }
      if (DQ.mentions() < 1) { DQ.stopped = 'NOREF'; return 'NOREF'; }
      DQ.set(j.p); await DQ.sleep(1500);
      const r = await DQ.go();
      DQ.last = new Date().toLocaleTimeString() + ' ' + j.id + ' ' + r;
      if (r === 'SENT' || r === 'UNSURE') { DQ.log.push({ id: j.id, st: 'SENT', r, t: Date.now() }); break; }
      if (r === 'PRICE ' || r === 'NOBAR' || r === 'NOBUTTON') { await DQ.sleep(20000); continue; }
      if (r !== 'BUSY') { DQ.stopped = r; return r; }
      await DQ.sleep(180000);
    }
    if (DQ.runId !== run) return 'replaced';
  }
  return 'all sent';
};
// Je Auftrag eigene Referenz: jobs [{id, p, ref: 'dqref_1'}] – alte Referenz raus, neue per Paste rein, dann Prompt.
DQ.clearRef = async () => { [...document.querySelectorAll('[aria-label="Remove · Reference"]')].filter(e => e.offsetParent).forEach(e => e.click()); await DQ.sleep(1200); return DQ.mentions(); };
DQ.run2 = async (jobs) => {
  const run = Date.now(); DQ.runId = run;
  for (const j of jobs) {
    if (DQ.log.some(l => l.id === j.id && l.st === 'SENT')) continue;
    while (DQ.runId === run) {
      if (DQ.busy()) { await DQ.sleep(60000); continue; }
      await DQ.clearRef(); await DQ.ref(document.getElementById(j.ref)); await DQ.sleep(4000);
      if (DQ.mentions() !== 1) { DQ.last = j.id + ' REF ' + DQ.mentions(); await DQ.sleep(30000); continue; }
      DQ.set(j.p); await DQ.sleep(1500);
      const r = await DQ.go();
      DQ.last = new Date().toLocaleTimeString() + ' ' + j.id + ' ' + r;
      if (r === 'SENT' || r === 'UNSURE') { DQ.log.push({ id: j.id, st: 'SENT', r, t: Date.now() }); break; }
      if (r.startsWith('PRICE') || r === 'NOBAR' || r === 'NOBUTTON') { await DQ.sleep(30000); continue; }
      if (r !== 'BUSY') { DQ.stopped = r; return r; }
      await DQ.sleep(180000);
    }
    if (DQ.runId !== run) return 'replaced';
  }
  return 'all sent';
};
'DQ geladen';

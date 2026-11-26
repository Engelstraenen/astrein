// ASTREIN sjinn-Warteschlange V3 (26.11.2026). Laden: input#asjs + file_upload + (0,eval)(await asjs.files[0].text())
// Jobs ohne Referenz: SQ.run([{id, p}]) — max SQ.max eigene Aufträge gleichzeitig, prüft Unlimited · On + 0 credits vor jedem Klick.
window.SQ = window.SQ || {};
SQ.max = SQ.max || 3;
SQ.log = SQ.log || [];
SQ.sleep = ms => new Promise(r => setTimeout(r, ms));
if (!window.ASobs) { window.ASlim = 0; window.ASobs = new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) { if ((n.textContent || '').includes('maximum limit')) window.ASlim++; } }); ASobs.observe(document.body, { childList: true, subtree: true }); }
SQ.ta = () => [...document.querySelectorAll('textarea')].find(e => e.offsetParent);
SQ.setP = t => { const ta = SQ.ta(); const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; set.call(ta, ''); ta.dispatchEvent(new Event('input', { bubbles: true })); set.call(ta, t); ta.dispatchEvent(new Event('input', { bubbles: true })); return ta.value.length; };
SQ.ok = () => document.body.innerText.includes('Unlimited · On') && /(^|\n)\s*0 credits/.test(document.body.innerText);
SQ.done = (pre = 'ASTREIN-') => [...document.querySelectorAll('img')].filter(i => (i.alt || '').startsWith(pre)).map(i => [i.alt.split(' ')[0].replace(/[.:]$/, ''), i.src]);
SQ.mine = () => SQ.log.filter(l => l.st === 'sent' && !SQ.done().some(d => d[0] === l.id)).length;
SQ.submit = async (id, p) => {
  if (!SQ.ok()) return 'NOT-UNLIMITED';
  SQ.setP(p); await SQ.sleep(800);
  if (!SQ.ok()) return 'NOT-UNLIMITED';
  const l0 = window.ASlim; const g = [...document.querySelectorAll('button')].find(b => b.offsetParent && /^Generate/.test(b.innerText.trim()));
  if (!g || g.disabled) return 'NO-BUTTON';
  g.click(); await SQ.sleep(15000);
  return window.ASlim > l0 ? 'LIMIT' : 'SENT';
};
SQ.run = async (jobs) => {
  const run = Date.now(); SQ.runId = run;
  for (const j of jobs) {
    if (SQ.done().some(d => d[0] === j.id) || SQ.log.some(l => l.id === j.id && l.st === 'sent')) continue;
    while (SQ.runId === run) {
      if (SQ.mine() >= SQ.max) { await SQ.sleep(60000); continue; }
      const r = await SQ.submit(j.id, j.p);
      SQ.last = new Date().toLocaleTimeString() + ' ' + j.id + ' ' + r;
      if (r === 'SENT') { SQ.log.push({ id: j.id, st: 'sent', t: Date.now() }); break; }
      if (r === 'NOT-UNLIMITED' || r === 'NO-BUTTON') { SQ.stopped = r; return r; }
      await SQ.sleep(60000);
    }
    if (SQ.runId !== run) return 'replaced';
  }
  return 'all sent';
};
'SQ geladen';

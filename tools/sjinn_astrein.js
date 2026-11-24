// ASTREIN sjinn-Skript (23.11.2026). Einspielen per javascript_tool in https://sjinn.ai/tool-mode/nano-banana-2.1
// Dann: await SB.setup(); await SB.try1()  (ein Versuch je Aufruf, keine Dauerschleife). Ergebnisse: SB.harvest()
window.sleep = ms => new Promise(r => setTimeout(r, ms));
window.SB = window.SB || {};
SB.log = SB.log || [];
SB.btn = t => [...document.querySelectorAll('button,[role=button]')].find(b => ((b.getAttribute('aria-label') || '') + '|' + (b.title || '') + '|' + b.innerText).toLowerCase().includes(t.toLowerCase()));
SB.click = async (t, w = 700) => { const b = SB.btn(t); if (!b) return false; b.click(); await sleep(w); return true };
SB.bar = () => [...document.querySelectorAll('button')].map(b => b.innerText.trim()).filter(t => /GPT|Nano|1:1|16:9|9:16|3:4|4:3|auto|1K|2K|4K|Unlimited|credits/.test(t)).join(' | ');
SB.gen = () => (document.body.innerText.match(/Generating/g) || []).length;
SB.toasts = () => [...document.querySelectorAll('.Toastify__toast-body')].filter(e => /maximum limit/.test(e.textContent)).length;
SB.closeToasts = async () => { document.querySelectorAll('.Toastify__close-button').forEach(b => b.click()); await sleep(600); };
SB.setRes = async r => { if (!SB.bar().includes(r)) { await SB.click('Resolution'); await SB.click(r + ' resolution'); } };
SB.setup = async () => {
  if (!/Unlimited · On/.test(SB.bar())) { await SB.click('Unlimited'); const o = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.innerText && e.innerText.trim() === 'No credits consumed'); if (o) { o.click(); await sleep(700); } }
  if (!SB.bar().includes('16:9')) { await SB.click('Aspect ratio'); await SB.click('16:9'); }
  return SB.bar();
};
const S = `Website storyboard sheet: one single image, a 3x3 grid of nine 16:9 panels on a near-black background with thin gutters, a small white panel number (1-9) in the top-left corner of each panel. Every panel is a photorealistic, high-end screen state of the same award-winning website for a fictional German carpentry and joinery workshop called ASTREIN (Tischlerei). Cinematic lighting, real photography inside the web design, premium industrial Awwwards-style layout, bold condensed sans-serif typography in off-white, dark forest green and raw timber color world with a signal orange accent, a thin vertical scroll timeline with dots on the right edge. Short German headlines only, spelled exactly as given. Modern carpenters in contemporary dark forest green workwear, no clichés: no traditional journeyman outfit, no black corduroy suit, no wide-brimmed hat, no gnomes, no wood puns. `;
const E = ` Ultra sharp, consistent design across all nine panels, no real brand logos, no prices, no euro signs.`;
const R = `Panel 9: a hand holding a modern smartphone showing the mobile version: a photo of an empty room corner with orange measurement lines and a big orange button "Foto + Maße schicken", below it two counters with gold stars labelled "Google" and "Tripadvisor" and the small label "Beispiel".`;
SB.queue = [
{id:'ASS1', res:'4K', prompt:'ASS1. Photorealistic 16:9 product photograph, no text, no UI, no hand, no wood discs: a single thick live-edge solid oak table top with natural bark edges floating at a slight angle in front of a very dark charcoal background (#141412), soft studio light from above, seen from slightly above, no legs visible, the table top fills the upper two thirds of the frame, lots of dark empty space below. True colors, realistic oak grain, subtle film grain, not CGI.'},
{id:'ASS2', res:'4K', prompt:'ASS2. Photorealistic 16:9 product photograph, no text, no labels, no hand: exactly five round end-grain wood sample discs of equal size lined up in one straight horizontal row with even gaps on a very dark charcoal background (#141412), from left to right: light oak, dark walnut, pale ash, reddish cherry, golden elm, each disc showing its typical grain and growth rings, soft studio light, seen straight from the front. True colors, not CGI.'}];
try { localStorage.setItem('astrein-queue', JSON.stringify(SB.queue)); } catch (e) {}
SB.try1 = async () => { const ta = () => document.querySelector('textarea'); const out = [];
  for (const j of SB.queue) { if (j.ok) continue;
    await SB.setRes(j.res); await sleep(500); const bar = SB.bar();
    if (!/Unlimited · On/.test(bar) || !/0 credits/.test(bar) || !bar.includes('16:9') || !bar.includes(j.res)) { out.push('STOP ' + bar); break; }
    await SB.closeToasts(); const t0 = SB.toasts(), g0 = SB.gen();
    const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    set.call(ta(), ''); ta().dispatchEvent(new Event('input', { bubbles: true })); await sleep(200);
    set.call(ta(), j.prompt); ta().dispatchEvent(new Event('input', { bubbles: true })); await sleep(900);
    [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Generate').click();
    let lim = false; for (let k = 0; k < 8; k++) { await sleep(500); if (SB.toasts() > t0) { lim = true; break; } }
    j.tries = (j.tries || 0) + 1;
    if (lim) { out.push(j.id + ' limit'); await SB.closeToasts(); break; }
    await sleep(5000);
    if (SB.gen() > g0) { j.ok = true; out.push(j.id + ' ACCEPTED'); SB.log.push(j.id + ' ACCEPTED ' + new Date().toLocaleTimeString()); } else { out.push(j.id + ' unclear gen=' + SB.gen()); break; }
  } return out; };
SB.harvest = () => { const out = {}; for (const j of SB.queue) { const im = [...document.querySelectorAll('img')].find(i => i.alt && i.alt.trim().startsWith(j.id + '.')); if (im && im.src.includes('/result/')) out[j.id] = im.src.split('?')[0]; } return out };
'SB ready';

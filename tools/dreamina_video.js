// ASTREIN Dreamina-Video-Wächter (24.11.2026). Laden: input#asjs + file_upload + (0,eval)(await asjs.files[0].text())
// Vorher im Tab: AI video · Dreamina Seedance 2.5 · First and last frames · Startbild per DragEvent auf „First frame“ · 6 s · Unlimited an.
window.AVP = {
V1: "V1 Stamm. ACTION STARTS IMMEDIATELY IN THE VERY FIRST FRAME, no still moment. One continuous shot, no cuts. Morning mist drifts steadily across the timber yard from left to right while the camera makes one slow, smooth push-in toward the cut end of the massive oak log; the growth rings on the cut end grow larger in frame, a few dry leaves tumble across the wet ground, the low sunrise light slowly becomes warmer. The log, the plank stacks and the ground stay exactly the same, nothing new appears, no people. Photorealistic, true colors, subtle film grain. Avoid: cuts, text, morphing, extra logs, people.",
V2: "V2 Hobeln. ACTION STARTS IMMEDIATELY IN THE VERY FIRST FRAME, no still moment. One continuous shot, no cuts. The carpenter in the dark forest green work jacket pushes the thick live-edge oak plank steadily forward into the green thickness planer with both hands; the plank slides into the machine at an even pace, a continuous stream of fine wood shavings bursts out and sawdust swirls in the window light. Both of his hands stay on the plank the whole time, his face and clothes stay the same. The camera holds steady with a very slight push-in. Photorealistic, true colors, subtle film grain. Avoid: cuts, hands leaving the plank, morphing, extra people, text.",
V3: "V3 Verleimen. ACTION STARTS IMMEDIATELY IN THE VERY FIRST FRAME, no still moment. One continuous shot, no cuts. Slow, smooth lateral camera glide along the glue joint of the two wide oak planks on the workbench; the exactly six orange bar clamps press tighter and their wooden handles turn slightly, small beads of glue squeeze out evenly along the whole joint, warm side light glints on the wet glue. Exactly six clamps from start to end, no hands, no people, nothing new appears. Photorealistic, true colors, shallow depth of field, subtle film grain. Avoid: cuts, extra clamps, morphing, text.",
V4: "V4 Zuhause. ACTION STARTS IMMEDIATELY IN THE VERY FIRST FRAME, no still moment. One continuous shot, no cuts. One slow, smooth cinematic camera glide around the corner of the live-edge oak dining table, revealing its natural edge and oiled grain; the linen curtains move gently in a light breeze, the dried grass in the vase sways slightly, soft daylight brightens a little. Table, chairs and room stay exactly the same, no people, nothing new appears. Photorealistic, true colors, subtle film grain. Avoid: cuts, extra furniture, morphing, text."
};
window.AVset = (t) => { const ta = [...document.querySelectorAll('textarea')].find(e => e.offsetParent); if (!ta) return 'NOTA'; const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; set.call(ta, ''); ta.dispatchEvent(new Event('input', { bubbles: true })); set.call(ta, t); ta.dispatchEvent(new Event('input', { bubbles: true })); return ta.value.slice(0, 12); };
window.ASbar = () => { const sw = [...document.querySelectorAll('[role=switch]')].find(e => e.offsetParent); if (!sw) return null; let c = sw; for (let k = 0; k < 5; k++) c = c.parentElement; return { sw, c, price: String(parseInt(c.innerText.replace(/\s+/g, ' ').trim().split(' ')[1], 10)) }; };
window.ASbusyN = () => (document.body.innerText.match(/run up to 1 generation/gi) || []).length;
// Nur Hauptbereich (Seitenleiste zeigt „Generating“ fremder Sitzungen)
window.ASrunning = () => [...document.querySelectorAll('*')].some(e => e.children.length === 0 && /Waiting in queue|Generating\.\.\.|^\d{1,2}%$/.test((e.textContent || '').trim()) && e.getBoundingClientRect().left > 400);
window.ASgo = async () => { if (ASrunning()) return 'QUEUE';
  const b = ASbar(); if (!b) return 'NO SWITCH'; if (b.sw.getAttribute('aria-checked') !== 'true') return 'SWITCH OFF'; if (b.price !== '0') return 'PRICE ' + b.price;
  const g = [...b.c.querySelectorAll('button')].filter(x => x.offsetParent).pop(); if (!g || g.disabled) return 'NO BUTTON';
  const n0 = ASbusyN(); g.click();
  for (let k = 0; k < 10; k++) { await new Promise(r => setTimeout(r, 3000)); if (ASbusyN() > n0) { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return 'BUSY'; } if (ASrunning()) return 'CLICKED'; }
  return 'UNKLAR'; };
window.AVrun = window.AVrun || { cur: 'V1', done: [], tries: 0 };
window.AVtick = async () => { const my = AVrun.id; if (window.AVrunId !== my) return;
  if (!AVrun.cur) { AVrun.msg = 'idle'; return; }
  try { const hasFrame = !![...document.querySelectorAll('[aria-label="Remove · Reference"]')].find(e => e.offsetParent);
    if (hasFrame) { AVset(AVP[AVrun.cur]); await new Promise(r => setTimeout(r, 800)); const r = await ASgo(); AVrun.tries++; AVrun.last = new Date().toLocaleTimeString() + ' ' + AVrun.cur + ' ' + r;
      if (r === 'CLICKED') { AVrun.done.push(AVrun.cur + ' ' + new Date().toLocaleTimeString()); AVrun.cur = null; } }
    else AVrun.last = new Date().toLocaleTimeString() + ' KEIN STARTBILD';
  } catch (e) { AVrun.last = 'err ' + e; }
  if (AVrun.cur) setTimeout(AVtick, 180000); };
window.AVstart = (v) => { AVrun.cur = v; AVrun.id = Date.now(); window.AVrunId = AVrun.id; setTimeout(AVtick, 2000); return 'Wächter ' + v; };
'Video-Wächter geladen';

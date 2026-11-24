// ASTREIN Dreamina-Wächter (24.11.2026). Laden: input#asjs + file_upload + (0,eval)(await asjs.files[0].text())
window.ASP = {
ASF5: "ASF5. Use the referenced storyboard sheet ONLY as style and look reference (panel 6). Create ONE single full-frame photorealistic cinematic 16:9 photograph, not a grid, no text, no glowing lines, no UI: an empty awkward sloped alcove under a closed staircase in a renovated old German apartment, bare grey plaster walls, smooth concrete floor, the underside of the stairs forms a diagonal slope, a carpenter (about 30, short dark hair, dark forest green work jacket and trousers) kneels on the right and points a laser distance meter at the back wall, moody warm side light, plenty of empty wall on the left. Fixed eye-level camera, straight verticals. Full-frame camera, 24mm, true colors, subtle film grain, not CGI.",
ASF7: "ASF7. Use the referenced storyboard sheet ONLY as style and look reference (panel 8). Create ONE single full-frame photorealistic cinematic 16:9 photograph, not a grid, no text, no UI: a young carpenter apprentice in his early twenties with short brown hair, wearing a black t-shirt and dark forest green bib work trousers, places a wooden panel on the bed of a large modern CNC router in a bright modern carpentry workshop, control screen in the background, cool daylight, calm empty space in the upper half. Full-frame camera, 35mm, true colors, subtle film grain, not CGI.",
ASS1: "ASS1. Use the referenced storyboard sheet ONLY as style and look reference (panel 5). Create ONE single photorealistic 16:9 product photograph, not a grid, no text, no UI, no hand, no wood discs: a single thick live-edge solid oak table top with natural bark edges floating at a slight angle in front of a very dark charcoal background, soft studio light from above, seen from slightly above, no legs visible, the table top fills the upper two thirds of the frame. True colors, realistic wood grain, not CGI.",
ASS2: "ASS2. Use the referenced storyboard sheet ONLY as style and look reference (panel 5). Create ONE single photorealistic 16:9 product photograph, not a grid, no text, no labels, no hand: exactly five round end-grain wood sample discs of equal size lined up in one straight row with even gaps on a very dark charcoal background, from left to right: light oak, dark walnut, pale ash, reddish cherry, golden elm, each disc showing its typical grain and growth rings, soft studio light, seen straight from the front. True colors, not CGI."
};
window.ASQ = ['ASF5','ASF7','ASS1','ASS2'];
window.ASlog = window.ASlog || [];
window.ASed = () => [...document.querySelectorAll('.ProseMirror')].find(e => e.offsetParent);
// Prompt per TipTap setzen, Referenz-Erwähnung (mention) bleibt vorne erhalten
window.ASset = (txt) => { const pm = ASed(); if (!pm || !pm.editor) return 'NOEDITOR'; const ed = pm.editor; const json = ed.getJSON(); const p = (json.content && json.content[0] && json.content[0].content) || []; const mentions = p.filter(n => n.type !== 'text'); ed.commands.setContent({ type: 'doc', content: [{ type: 'paragraph', content: mentions.concat([{ type: 'text', text: ' ' + txt }]) }] }); return 'mentions=' + mentions.length; };
window.ASbar = () => { const sw = [...document.querySelectorAll('[role=switch]')].find(e => e.offsetParent); if (!sw) return null; let c = sw; for (let k = 0; k < 5; k++) c = c.parentElement; return { sw, c, price: c.innerText.replace(/\s+/g, ' ').trim().split(' ')[1] }; };
window.ASgo = async () => { const b = ASbar(); if (!b) return 'NO SWITCH'; if (b.sw.getAttribute('aria-checked') !== 'true') return 'SWITCH OFF'; if (b.price !== '0') return 'PRICE ' + b.price;
  const g = [...b.c.querySelectorAll('button')].filter(x => x.offsetParent).pop(); if (!g || g.disabled) return 'NO BUTTON';
  const n0 = (document.body.innerText.match(/run up to 1 generation|Couldn.t generate/gi) || []).length; g.click(); await new Promise(r => setTimeout(r, 6000));
  const n1 = (document.body.innerText.match(/run up to 1 generation|Couldn.t generate/gi) || []).length;
  if (n1 > n0) { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return 'BUSY'; }
  return 'CLICKED'; };
window.ASrun = { i: 0, id: Date.now(), tries: 0 };
window.AStick = async () => { const my = ASrun.id; if (window.ASrunId && window.ASrunId !== my) return; window.ASrunId = my;
  if (ASrun.i >= ASQ.length) { ASrun.msg = 'all clicked'; return; }
  const id = ASQ[ASrun.i];
  try { const s = ASset(ASP[id]); await new Promise(r => setTimeout(r, 800)); const r = await ASgo(); ASrun.tries++; ASrun.last = new Date().toLocaleTimeString() + ' ' + id + ' ' + s + ' ' + r;
    if (r === 'CLICKED') { ASlog.push(id + ' CLICKED ' + new Date().toLocaleTimeString()); ASrun.i++; }
  } catch (e) { ASrun.last = 'err ' + e; }
  setTimeout(AStick, 180000); };
'ASTREIN-Wächter geladen';

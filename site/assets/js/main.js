/* ASTREIN V3 – Die Schublade */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const IMG = window.IMG || {}, VID = window.VID || {};
const mobile = () => innerWidth < 900 && innerHeight > innerWidth;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* Firma per ?firma= */
const firma = new URLSearchParams(location.search).get('firma');
if (firma) { $$('.firma').forEach(e => e.textContent = firma.toUpperCase()); document.title = document.title.replace('ASTREIN', firma); }

/* Bilder: nur vorhandene laden, fehlende ausblenden (nie Platzhalter) */
function loadImgs() {
  $$('img[data-k]').forEach(im => {
    const e = IMG[im.dataset.k];
    if (!e) { im.hidden = true; return; }
    const src = mobile() && e.m ? e.m : e.d;
    if (im.getAttribute('src') !== src) im.src = src;
    im.hidden = false;
  });
  $$('video[data-v]').forEach(v => {
    const e = VID[v.dataset.v];
    if (!e) { v.hidden = true; return; }
    const src = mobile() && e.m ? e.m : e.d;
    if (v.dataset.src !== src) { v.dataset.src = src; v.src = src; if (e.poster) v.poster = e.poster; }
    v.hidden = false;
  });
}
loadImgs();
addEventListener('resize', () => { loadImgs(); layoutSpots(); layoutTeam(); });

/* Kopfzeile, Burger, Demo */
const hdr = $('#hdr');
$('#burger').addEventListener('click', () => document.body.classList.toggle('open'));
$$('#menu a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('open')));
$('#demoX').addEventListener('click', e => e.target.parentElement.remove());

/* Position eines Bildpunkts (in % des Originalbilds) bei object-fit: cover */
function coverXY(img, px, py) {
  const W = img.clientWidth, H = img.clientHeight, w = img.naturalWidth || 16, h = img.naturalHeight || 9;
  const s = Math.max(W / w, H / h), dw = w * s, dh = h * s;
  return [(W - dw) / 2 + px / 100 * dw, (H - dh) / 2 + py / 100 * dh];
}

/* ===== Kapitel 1: Holzproben ===== */
const WOOD = [
  { k: 'eiche', n: 'Eiche', x: 23, y: 33, hb: '34–41', rd: '≈ 690', t: 'Hart, zäh, mit lebhafter Maserung. Unser Allrounder für Tische, Treppen und Fronten.', sw: '#c9a57a' },
  { k: 'nuss', n: 'Nussbaum', x: 37, y: 33, hb: '≈ 27–56*', rd: '≈ 640', t: 'Dunkel, warm, edel. Für Fronten und Furniere, die ins Auge fallen sollen.', sw: '#5a3c28' },
  { k: 'esche', n: 'Esche', x: 50, y: 33, hb: '37–41', rd: '≈ 690', t: 'Hell, elastisch, sehr hart. Ideal für Sitzmöbel und stark genutzte Flächen.', sw: '#e3d2b4' },
  { k: 'kirsche', n: 'Kirsche', x: 63.5, y: 33, hb: '29–31', rd: '≈ 600', t: 'Rötlich und dunkelt mit den Jahren nach. Wird mit dem Alter schöner.', sw: '#b0643c' },
  { k: 'ahorn', n: 'Ahorn', x: 77, y: 33, hb: '27–30', rd: '≈ 650', t: 'Fast weiß, feinporig, ruhig. Für helle, moderne Räume.', sw: '#ecdcc0' },
];
const spots = $('#spots'), wcard = $('#wcard'), ah2 = $('img[data-k="ah2"]');
let curWood = 0;
WOOD.forEach((w, i) => { const b = document.createElement('button'); b.className = 'spot'; b.setAttribute('aria-label', w.n); b.addEventListener('click', () => showWood(i)); spots.appendChild(b); });
function layoutSpots() { if (!ah2 || ah2.hidden) return; $$('.spot', spots).forEach((b, i) => { const [x, y] = coverXY(ah2, WOOD[i].x, WOOD[i].y); b.style.left = x + 'px'; b.style.top = y + 'px'; }); }
function showWood(i) {
  curWood = i; const w = WOOD[i];
  $$('.spot', spots).forEach((b, j) => b.classList.toggle('on', j === i));
  wcard.innerHTML = `<p class="eyebrow">Probe ${i + 1} von 5</p><h3>${w.n}</h3><dl><dt>Härte</dt><dd class="mono">${w.hb} N/mm²</dd><dt>Rohdichte</dt><dd class="mono">${w.rd} kg/m³</dd></dl><p>${w.t}</p><a class="more" href="#holzlabor" data-w="${i}">Im Holzlabor ansehen</a>`;
  $('a', wcard).addEventListener('click', () => setWood(i));
}
ah2 && ah2.addEventListener('load', layoutSpots);
showWood(0);

/* Konfigurator */
const konfImg = $('#konfImg'), FIN = [
  { k: 'oel', n: 'Geölt', d: 'Offenporig, fühlt sich nach Holz an. Wasser zieht nach einer Weile ein – Flecken lassen sich ausschleifen und nachölen.', ov: 'transparent' },
  { k: 'lack', n: 'Matt lackiert', d: 'Geschlossene Oberfläche, Wasser perlt ab. Pflegeleicht für Küchen und Bäder.', ov: 'linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0))' },
  { k: 'seife', n: 'Geseift', d: 'Skandinavisch hell und samtig. Wird mit Seifenlauge gepflegt, Wasser zieht langsam ein.', ov: 'linear-gradient(180deg,rgba(255,250,240,.16),rgba(255,250,240,.10))' },
];
let curFin = 0;
const konfKeys = ['ak1', 'ak2', 'ak3', 'ak4', 'ak5'];
konfKeys.forEach((k, i) => { if (!IMG[k]) return; const im = document.createElement('img'); im.src = IMG[k].d; im.alt = 'Sideboard in ' + WOOD[i].n; im.loading = 'lazy'; im.style.opacity = i ? 0 : 1; im.dataset.i = i; konfImg.insertBefore(im, $('#konfFin')); });
if (!konfKeys.some(k => IMG[k])) konfImg.hidden = true;
WOOD.forEach((w, i) => { const b = document.createElement('button'); b.className = 'chip' + (i ? '' : ' on'); b.innerHTML = `<span class="sw" style="background:${w.sw}"></span>${w.n}`; b.addEventListener('click', () => setWood(i)); $('#konfWood').appendChild(b); });
FIN.forEach((f, i) => { const b = document.createElement('button'); b.className = 'chip' + (i ? '' : ' on'); b.textContent = f.n; b.addEventListener('click', () => setFin(i)); $('#konfFinish').appendChild(b); });
function setWood(i) { $$('img', konfImg).forEach(im => im.style.opacity = +im.dataset.i === i ? 1 : 0); $$('#konfWood .chip').forEach((b, j) => b.classList.toggle('on', j === i)); }
function setFin(i) { curFin = i; $$('#konfFinish .chip').forEach((b, j) => b.classList.toggle('on', j === i)); $('#konfFin').style.background = FIN[i].ov; $('#finTxt').textContent = FIN[i].d; dropGo(); }
const drop = $('#drop');
function dropGo() { drop.className = 'drop'; void drop.offsetWidth; drop.classList.add('go', FIN[curFin].k); $('#dropTxt').textContent = FIN[curFin].k === 'lack' ? 'perlt ab' : FIN[curFin].k === 'oel' ? 'zieht ein' : 'zieht langsam ein'; }
drop.addEventListener('click', dropGo);
setFin(0);

/* Brinell-Balken */
const HB = [['Esche', 39], ['Eiche', 37], ['Buche', 33], ['Kirsche', 30], ['Ahorn', 28], ['Kiefer', 19], ['Fichte', 12]];
$('#bars').innerHTML = HB.map(([n, v]) => `<div class="bar"><span>${n}</span><span class="t"><i data-w="${v / 42 * 100}"></i></span><span class="v">≈ ${v}</span></div>`).join('');
/* Holz-arbeitet-Rechner: 90 cm Eiche, tangential 0,34 %/% ab 8 % */
const fe = $('#feuchte');
function calc() { const u = +fe.value, mm = 900 * 0.0034 * (u - 8); $('#hfOut').textContent = u + ' %'; $('#mmOut').textContent = (mm >= 0 ? '+' : '−') + Math.abs(mm).toFixed(0) + ' mm'; $('#plank').style.width = (80 + mm / 900 * 100 * 2.2) + '%'; }
fe.addEventListener('input', calc); calc();

/* Team-Badges + Personen */
const TEAM = [
  { n: 'LINA', x: 66, y: 78, r: -3, role: 'CNC-Programmiererin', t: 'Seit 4 Jahren dabei, Gesellin, macht gerade den CNC-Fachkraft-Schein.', px: 63 },
  { n: 'JONAS', x: 80, y: 74, r: 4, role: 'Furnier & Oberfläche', t: 'Gesellenstück: Nussbaum-Kommode. Liebt gespiegelte Furniere.', px: 72 },
  { n: 'MELI', x: 64, y: 86, r: 2, role: 'Azubi, 2. Lehrjahr', t: 'Vorher Abi, dann Tischlerei statt Hörsaal. Steht gerade an der Kantenanleimmaschine.', px: 83 },
  { n: 'TIMO', x: 79, y: 84, r: -2, role: 'Montage', t: 'Baut beim Kunden ein. Seine Schattenfugen sind gleich breit. Immer.', px: 93 },
];
const teamA = $('#teamA'), teamB = $('#teamB'), badges = $('#badges'), people = $('#people');
TEAM.forEach(p => { const b = document.createElement('span'); b.className = 'badge'; b.textContent = p.n; b.style.setProperty('--r', p.r + 'deg'); badges.appendChild(b);
  const d = document.createElement('div'); d.className = 'person'; d.innerHTML = `<div class="pc"><b>${p.n[0] + p.n.slice(1).toLowerCase()}</b>${p.role}<br>${p.t}</div><button>${p.n[0] + p.n.slice(1).toLowerCase()}</button>`; $('button', d).addEventListener('click', () => { $$('.person').forEach(x => x !== d && x.classList.remove('open')); d.classList.toggle('open'); }); people.appendChild(d); });
function layoutTeam() {
  if (teamA && !teamA.hidden) $$('.badge', badges).forEach((b, i) => { const [x, y] = coverXY(teamA, TEAM[i].x, TEAM[i].y); b.style.left = x + 'px'; b.style.top = y + 'px'; });
  if (teamB && !teamB.hidden) $$('.person', people).forEach((d, i) => { const [x, y] = coverXY(teamB, TEAM[i].px, 88); d.style.left = x + 'px'; d.style.top = Math.min(y, innerHeight - 120) + 'px'; });
}
teamA && teamA.addEventListener('load', layoutTeam); teamB && teamB.addEventListener('load', layoutTeam);

/* Lohnrechner (Tarif Tischlerhandwerk Berlin ab 01.01.2026) */
const LOHN = [
  ['Azubi 1. Jahr (fest)', 0, 810], ['Azubi 2. Jahr (fest)', 0, 900], ['Azubi 3. Jahr (fest)', 0, 1050],
  ['Geselle ohne Erfahrung · EG 3.1', 14.76], ['Geselle nach 12 Monaten · EG 3.2', 16.12], ['Geselle · Eckentgelt EG 3.3', 16.97],
  ['Facharbeit mit Zusatzkenntnissen · EG 4', 18.67], ['Teamleitung · EG 5', 21.21], ['CNC-Fachkraft / Techniker · EG 6', 23.76], ['Meister mit Erfahrung · EG 7', 26.30], ['Meister mit Leitung · EG 8', 29.70],
];
const st = $('#lrStufe'), sd = $('#lrStd');
st.innerHTML = LOHN.map((l, i) => `<option value="${i}" ${i === 5 ? 'selected' : ''}>${l[0]}</option>`).join('');
const eur = v => v.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
function lohn() { const l = LOHN[+st.value]; sd.disabled = !!l[2]; $('#lrOut').textContent = l[2] ? eur(l[2]) : eur(l[1] * (+sd.value || 38.5) * 4.35); }
st.addEventListener('change', lohn); sd.addEventListener('input', lohn); lohn();

/* Formulare (senden nichts) */
$$('.seg .chip').forEach(b => b.addEventListener('click', () => { $$('.chip', b.parentElement).forEach(x => x.classList.toggle('on', x === b)); }));
$$('form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.classList.add('sent'); }));

/* Postkarten (Beispiele) */
const POST = [
  ['Das Sideboard ist genau so geworden, wie wir es uns vorgestellt haben. Jeden Tag schön.', -2],
  ['Endlich Stauraum unter der Treppe – und man sieht keine einzige Schraube.', 1.5],
  ['Von der ersten Skizze bis zur Montage: pünktlich, sauber, freundlich.', -1],
  ['Die Holzmuster zum Anfassen haben uns die Entscheidung leicht gemacht.', 2],
];
const posts = $('#posts');
POST.forEach(([t, r], i) => { const d = document.createElement('div'); d.className = 'post' + (i ? '' : ' on'); d.style.setProperty('--r', r + 'deg'); d.innerHTML = `${t}<small>Beispiel · noch keine echte Bewertung</small>`; posts.appendChild(d); });
let pi = 0; setInterval(() => { const p = $$('.post', posts); p[pi].classList.remove('on'); pi = (pi + 1) % p.length; p[pi].classList.add('on'); }, 5200);

/* A4-Maßstab-Werkzeug (läuft nur im Browser) */
const a4file = $('#a4file'), a4 = $('#a4'), a4out = $('#a4out');
a4file.addEventListener('change', () => {
  const f = a4file.files[0]; if (!f) return; const im = new Image();
  im.onload = () => {
    const cv = document.createElement('canvas'), sc = Math.min(1, 1600 / im.width); cv.width = im.width * sc; cv.height = im.height * sc;
    const cx = cv.getContext('2d'); cx.drawImage(im, 0, 0, cv.width, cv.height); a4.innerHTML = ''; a4.appendChild(cv);
    const pts = [];
    const draw = () => { cx.drawImage(im, 0, 0, cv.width, cv.height); cx.lineWidth = 4 / sc * sc * 2; pts.forEach((p, i) => { cx.fillStyle = i < 2 ? '#f3c27a' : '#7CFF6B'; cx.beginPath(); cx.arc(p[0], p[1], 10, 0, 7); cx.fill(); }); for (let i = 0; i + 1 < pts.length; i += 2) { cx.strokeStyle = i ? '#7CFF6B' : '#f3c27a'; cx.beginPath(); cx.moveTo(...pts[i]); cx.lineTo(...pts[i + 1]); cx.stroke(); } };
    cv.addEventListener('pointerdown', e => {
      const r = cv.getBoundingClientRect(); if (pts.length >= 4) pts.length = 0;
      pts.push([(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]); draw();
      const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (pts.length === 2) a4out.textContent = 'Gut. Jetzt Anfang und Ende der Nische antippen.';
      if (pts.length === 4) { const cm = d(pts[2], pts[3]) / d(pts[0], pts[1]) * 29.7; a4out.textContent = `Geschätzt: ca. ${Math.round(cm)} cm (± 10 %, je nach Blickwinkel). Wir übernehmen das ins Formular.`; $('#anfMasse').value = `ca. ${Math.round(cm)} cm breit (A4-Schätzung)`; }
    });
    a4out.textContent = 'Tippen Sie die beiden Enden der langen Kante des A4-Blatts an.';
  };
  im.src = URL.createObjectURL(f);
});

/* ===== Scroll-Motor ===== */
const prog = el => { const r = el.getBoundingClientRect(), h = el.offsetHeight - innerHeight; return h > 0 ? clamp(-r.top / h) : (r.top < innerHeight / 2 ? 1 : 0); };
const scrub = (v, p) => { if (!v || v.hidden || !v.duration) return; const t = p * (v.duration - .05); if (Math.abs(v.currentTime - t) > .03) v.currentTime = t; };

const hero = $('#hero'), heroImg = $('img', hero), heroVid = $('video', hero), glow = $('#heroGlow'), flash = $('#heroFlash'), heroCopy = $('.copy', hero);
const makro = $('#makro'), makroImg = $('#makroImg'), planPath = $('#planPath'), makroTxt = $('#makroTxt');
const planen = $('#planen'), planA = $('#planA'), planB = $('#planB'), planVid = $('video', planen);
const ums = $('#umsetzen'), umsVid = $('video', ums), toolPath = $('#toolPath');
const team = $('#team');

/* Pfade: Hirnholz-Jahrringe (Bögen) → Nischen-Zeichnung */
const N = 7;
const ringPath = t => { let d = ''; for (let i = 0; i < N; i++) { const r = 140 + i * 95; const k = t; // t=0 Bögen, t=1 Rechtecke/Schräge
  const x0 = 800 - r, x1 = 800 + r, y = 820 - i * 8; const ty = 820 - r * .9;
  const cx = 800, sy = 820 - (180 + i * 70); const slope = 380 + i * 60;
  // gemischter Pfad: Bogen ↔ Nischen-Polygon
  const ax = x0 * (1 - k) + (220 + i * 30) * k, ay = y * (1 - k) + 820 * k;
  const bx = cx * (1 - k) + (220 + i * 30) * k, by = ty * (1 - k) + sy * k;
  const cxp = x1 * (1 - k) + (1380 - i * 30) * k, cyp = y * (1 - k) + (sy + slope) * (k) + 0;
  d += `M${ax},${ay} Q${bx},${by} ${cxp},${Math.min(cyp, 820)} `; } return d; };
const toolD = (() => { let d = ''; for (let i = 0; i < 6; i++) { const x = 160 + i * 230, y = 470 + (i % 2) * 40; d += `M${x},${y} h180 v${200 - (i % 3) * 30} h-180 Z `; } return d; })();
toolPath.setAttribute('d', toolD);
const tLen = 6 * (360 + 2 * 200);
toolPath.style.strokeDasharray = tLen; toolPath.style.strokeDashoffset = tLen;

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.id === 'paycards') $$('.pay', e.target).forEach((p, i) => setTimeout(() => p.classList.add('in'), i * 120)); if (e.target.id === 'bars') $$('.bar i', e.target).forEach(i => i.style.width = i.dataset.w + '%'); if (e.target.id === 'track') { const s = $$('.step', e.target); s.forEach((x, i) => setTimeout(() => x.classList.toggle('on', i < 3), 300 + i * 250)); $('#trackFill').style.width = '40%'; } } }), { threshold: .25 });
['#paycards', '#bars', '#track'].forEach(s => $(s) && io.observe($(s)));
const vio = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (v.hidden) return; e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .3 });
$$('.vcard video').forEach(v => vio.observe(v));

const chapters = $$('[data-ch]'), komLinks = $$('#kom a');
let lastCh = -1;
function frame() {
  const y = scrollY;
  hdr.classList.toggle('solid', y > innerHeight * .5);
  /* Hero: Schublade fährt auf (Video) bzw. Zoom in die leuchtende Schublade */
  const p0 = prog(hero);
  if (heroVid && !heroVid.hidden && heroVid.duration) { if (!heroVid.dataset.auto) scrub(heroVid, clamp(p0 / .8)); heroImg.style.opacity = p0 > .02 ? 0 : 1; }
  else heroImg.style.transform = `scale(${1 + ease(clamp(p0 / .9)) * 1.6})`;
  heroImg.style.transformOrigin = '30% 26%';
  glow.style.opacity = clamp((p0 - .2) / .6);
  flash.style.opacity = clamp((p0 - .82) / .18);
  heroCopy.style.opacity = 1 - clamp(p0 / .25);
  /* Makro: Zoom ins Hirnholz, Linien ziehen sich zur Nische */
  const pm = prog(makro);
  makroImg.style.transform = `scale(${1.25 - .25 * clamp(pm / .4)})`;
  const k = ease(clamp((pm - .3) / .55));
  planPath.setAttribute('d', ringPath(k));
  planPath.style.opacity = clamp((pm - .1) / .2);
  makroImg.style.opacity = 1 - clamp((pm - .55) / .35) * .85;
  makroTxt.innerHTML = k > .5 ? 'Und jede Linie<br>wird ein Maß.' : 'Jeder Jahrring<br>wird eine Linie.';
  /* Planen: Schublade → Laser-Film */
  const pp = prog(planen);
  planB.style.opacity = clamp((pp - .25) / .15);
  if (planVid && !planVid.hidden && planVid.duration) { planVid.style.opacity = clamp((pp - .3) / .1); scrub(planVid, clamp((pp - .3) / .6)); }
  /* Umsetzen: Fräsbahn zeichnet sich, CNC-Film */
  const pu = prog(ums);
  toolPath.style.strokeDashoffset = tLen * (1 - clamp(pu / .45));
  toolPath.style.opacity = 1 - clamp((pu - .5) / .2);
  if (umsVid && !umsVid.hidden && umsVid.duration) { umsVid.style.opacity = clamp((pu - .35) / .15); scrub(umsVid, clamp((pu - .35) / .6)); }
  /* Team: Schublade mit Schildern → Porträt */
  const pt = prog(team);
  $$('.badge', badges).forEach((b, i) => b.classList.toggle('in', pt > .08 + i * .06 && pt < .5));
  teamB.style.opacity = clamp((pt - .45) / .15);
  people.style.opacity = clamp((pt - .6) / .1);
  people.style.pointerEvents = pt > .6 ? 'auto' : 'none';
  $('#teamH').textContent = pt > .5 ? 'Lina, Jonas, Meli, Timo.' : 'Vier Namen. Ein Anspruch.';
  /* aktives Kapitel → Kommode */
  let ch = 0; chapters.forEach(c => { if (c.getBoundingClientRect().top < innerHeight * .5) ch = +c.dataset.ch; });
  if (ch !== lastCh) { komLinks.forEach(a => a.classList.toggle('on', +a.dataset.n === ch)); lastCh = ch; }
  /* Footer: Schubladen schließen */
  const f = $('#foot').getBoundingClientRect(); const pf = clamp(1 - (f.top - innerHeight * .3) / (innerHeight * .6));
  $$('#fronts i').forEach((x, i) => x.style.setProperty('--o', ((1 - pf) * (40 + i * 18) * (i % 2 ? 1 : -1)).toFixed(1)));
  $('#kom').style.opacity = f.top < innerHeight * .7 ? 0 : 1;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
/* Hero-Video läuft beim Laden kurz an (Aktion ab Sekunde 1) */
if (heroVid && !heroVid.hidden) heroVid.addEventListener('loadedmetadata', () => { if (scrollY < 10) { heroVid.dataset.auto = 1; heroVid.play().catch(() => {}); setTimeout(() => { heroVid.pause(); heroVid.currentTime = 0; delete heroVid.dataset.auto; }, 1200); } }, { once: true });
})();

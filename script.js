(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
let C = {};
const readColors = () => { C = {accent:css('--accent'), vec:css('--vec'), muted:css('--muted'), line:css('--line'), ink:css('--ink'), mono:css('--f-mono')}; };
readColors();

/* ---------- knowledge base (fragmentos del CV) ---------- */
const KB = [
  {id:'exp', g:'exp', label:'experiencia', link:'#trayectoria', k:['experiencia','trabajo','trabajado','empleo','puesto','empresa','laboral','currado','practicas','donde'], a:'Tengo tres experiencias: programador web para Erasmus en Italia (2023), e-commerce product manager en Innovant (2023) y responsable de desarrollo web y base de datos en la Universidad CRNE CORE de Montenegro (2025).'},
  {id:'mne', g:'exp', label:'montenegro', link:'#trayectoria', k:['montenegro','universidad','crne','core','base','datos','bbdd','sql','database','2025','institucional'], a:'En marzo de 2025 pasé 3 meses en la Universidad CRNE CORE (Montenegro). Diseñé, programé e implementé su base de datos central y optimicé su web institucional.'},
  {id:'ita', g:'exp', label:'erasmus italia', link:'#trayectoria', k:['italia','erasmus','extranjero','fuera','internacional','web','2023','rendimiento'], a:'En marzo de 2023 trabajé como programador web para Erasmus Courses en Italia: nuevas funcionalidades, corrección de errores y mejoras de rendimiento y experiencia de usuario.'},
  {id:'inn', g:'exp', label:'innovant', link:'#trayectoria', k:['innovant','ecommerce','comercio','amazon','marketplace','productos','tienda','ventas','marketing'], a:'En Innovant (abril 2023, 2 meses) fui e-commerce product manager: publicaba y optimizaba productos en marketplaces como Amazon, con sus descripciones, imágenes y categorías.'},
  {id:'rag', g:'proj', label:'xatichat', link:'#proyectos', k:['rag','chatbot','bot','asistente','xatichat','xati','whatsapp','pgvector','vector','embedding','gpt','llm','postgres','postgresql','fastapi','php','proyecto','construido','hecho','gemini','pdf','pdfs','rbac','roles','permisos'], a:'Construí XatiChat, un asistente RAG para empresas: chat web y bot de WhatsApp que responden solo con documentación interna. Los PDFs se procesan con PyMuPDF y se vectorizan con Gemini en PostgreSQL + pgvector (índice HNSW), con roles y permisos (RBAC), panel de administración, resúmenes por IA y texto a voz.'},
  {id:'llm', g:'proj', label:'gemini y llms', link:'#habilidades', k:['gemini','llm','llms','prompt','prompts','multimodal','vision','imagen','imagenes','voz','audio','transcripcion','tts','json','api','apis','openai','modelo'], a:'Trabajo con la API de Gemini: embeddings, generación con modelos de respaldo, visión para describir imágenes de PDFs, transcripción de notas de voz de WhatsApp, texto a voz y respuestas en JSON estructurado para tickets y resúmenes.'},
  {id:'ia', g:'edu', label:'especialización ia', link:'#trayectoria', k:['ia','inteligencia','artificial','machine','learning','aprendizaje','automatico','modelos','entrenamiento','ai','ml','datos'], a:'Estoy cursando el curso de especialización en IA y aprendizaje automático. Además ya lo aplico: mi proyecto XatiChat es un asistente con RAG y búsqueda vectorial para empresas.'},
  {id:'poke', g:'proj', label:'pokésurvivor', link:'#proyectos', k:['juego','videojuego','game','pokemon','pokesurvivor','canvas','javascript','js','github','jugar','proyecto','construido','juegos'], a:'PokéSurvivor es un bullet-heaven roguelike que hice en JavaScript vanilla sobre Canvas 2D: 966 Pokémon de 9 generaciones, gacha, misiones, logros y jefes, con música sintetizada con Web Audio. Se puede jugar en jpter78.github.io/pokesurvivor.'},
  {id:'net', g:'proj', label:'multijugador', link:'#proyectos', k:['multijugador','online','cooperativo','coop','webrtc','tiempo','real','red','firebase','firestore','nube','ranking','amigos','sincronizacion','p2p'], a:'PokéSurvivor tiene cooperativo de hasta 4 jugadores: WebRTC directo entre navegadores y relé por Firebase Realtime Database si la red no deja conectar. Las cuentas y partidas van en Firebase (Auth + Firestore) y se fusionan si jugaste sin conexión. Además tiene amigos y ranking.'},
  {id:'edu', g:'edu', label:'formación', link:'#trayectoria', k:['estudios','formacion','estudiado','titulo','titulacion','dam','smx','ciclo','grado','fp','educacion','instituto'], a:'Tengo el CFGM de Sistemas Microinformáticos y Redes (SMX) y el CFGS de Desarrollo de Aplicaciones Multiplataforma (DAM). Ahora curso la especialización en IA y aprendizaje automático.'},
  {id:'lang', g:'edu', label:'idiomas', link:'#habilidades', k:['idioma','idiomas','ingles','english','valenciano','catalan','castellano','espanol','habla','nivel'], a:'Castellano y valenciano nativos. Inglés B1+, reforzado con mi experiencia Erasmus en Italia.'},
  {id:'stack', g:'edu', label:'tecnologías', link:'#habilidades', k:['tecnologias','lenguajes','stack','git','seo','programar','programa','python','php','javascript','html','css','sabe','herramientas','habilidades'], a:'Programo en JavaScript, Python y PHP, con HTML/CSS y PostgreSQL. He usado FastAPI, pgvector, la API de Gemini, Firebase, WebRTC, Web Audio y Canvas 2D, además de Git y GitHub Pages. También manejo SEO, software de diseño, edición multimedia y administración de sistemas.'},
  {id:'soft', g:'edu', label:'sobre mí', link:'#sobre-mi', k:['persona','personalidad','como','equipo','presion','proactivo','organizado','responsable','adaptable','cualidades','fortalezas','soft'], a:'Soy proactivo, organizado y responsable. Trabajo bien en equipo, decido rápido y rindo bajo presión. Me he adaptado a trabajar en Italia y Montenegro.'},
  {id:'gj', g:'edu', label:'garantía juvenil', link:'#sobre-mi', k:['garantia','juvenil','ayuda','ayudas','subvencion','bonificacion','contrato','contratar','contratacion'], a:'Soy beneficiario del Sistema Nacional de Garantía Juvenil, por lo que mi contratación puede acogerse a sus ayudas.'},
  {id:'yt', g:'proj', label:'creador de contenido', link:'#habilidades', k:['youtube','youtuber','stream','streamer','streaming','twitch','contenido','video','videos','redes','sociales','edicion','multimedia'], a:'También soy youtuber y streamer, así que sé editar vídeo, gestionar redes sociales y comunicar con una audiencia.'},
  {id:'contact', g:'edu', label:'contacto', link:'#contacto', k:['contacto','contactar','email','correo','mail','escribir','llamar','telefono','github','donde','vive','ubicacion','xativa','valencia','disponible','disponibilidad','incorporacion'], a:'Puedes escribirme a jpieratorregrosa@gmail.com. Vivo en Xàtiva (València) y estoy disponible para trabajar. Mi GitHub es github.com/JPTER78.'},
];
const STOP = new Set('que de la el en y a los las un una tiene ha has con por para del al lo le se su sus es son me mi mis tu como cual cuales sobre sabe hace hecho algo alguna algun jonathan el ella esta este eso puede tu'.split(' '));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
KB.forEach(c => c.kn = c.k.map(norm));
function retrieve(q){
  const toks = norm(q).split(/[^a-z0-9+]+/).filter(t => t.length > 1 && !STOP.has(t));
  if(!toks.length) return [];
  return KB.map(c => {
    let s = 0;
    for(const t of toks){
      let best = 0;
      for(const k of c.kn){
        if(t === k) best = Math.max(best, 1);
        else if(t.length >= 4 && k.length >= 4 && (t.startsWith(k.slice(0,5)) || k.startsWith(t.slice(0,5)))) best = Math.max(best, .7);
      }
      s += best;
    }
    const sim = s ? Math.min(.97, .35 + .62 * (s / (s + 1.2))) : 0;
    return {c, s, sim};
  }).filter(r => r.s > 0).sort((a,b) => b.s - a.s).slice(0,3);
}

/* ---------- embedding field ---------- */
const cv = document.getElementById('field'), ctx = cv.getContext('2d');
const centers = {exp:[.27,.34], proj:[.72,.36], edu:[.5,.74]};
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const pts = KB.map((c,i) => { const [cx,cy] = centers[c.g]; const a = rnd()*Math.PI*2, r = .06 + rnd()*.13; return {c, x:cx+Math.cos(a)*r*1.3, y:cy+Math.sin(a)*r, ph:rnd()*6}; });
const dust = Array.from({length:110}, () => { const keys = Object.keys(centers); const [cx,cy] = centers[keys[Math.floor(rnd()*3)]]; const a = rnd()*Math.PI*2, r = Math.pow(rnd(), .6)*.24; return {x:cx+Math.cos(a)*r*1.4, y:cy+Math.sin(a)*r, ph:rnd()*6, g:keys}; });
let hits = [], qpt = null, qT = 0, W = 0, H = 0;
function size(){ const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1; W = r.width; H = r.height; cv.width = W*d; cv.height = H*d; ctx.setTransform(d,0,0,d,0,0); }
function col(g){ return g === 'exp' ? C.accent : g === 'proj' ? C.vec : C.muted; }
function draw(t){
  if(!W) size();
  ctx.clearRect(0,0,W,H);
  const wob = reduce ? 0 : 1, line = C.line, ink = C.ink, muted = C.muted, mono = C.mono;
  const P = p => [ (p.x + Math.sin(t/2400 + p.ph)*.006*wob) * W, (p.y + Math.cos(t/2800 + p.ph)*.008*wob) * H ];
  ctx.fillStyle = line;
  for(const d of dust){ const [x,y] = P(d); ctx.beginPath(); ctx.arc(x,y,1.6,0,7); ctx.fill(); }
  const hitIds = hits.map(h => h.c.id);
  if(qpt){
    const k = reduce ? 1 : Math.min(1, (t - qT)/700);
    const [qx,qy] = [qpt.x*W, qpt.y*H];
    hits.forEach((h,i) => {
      const p = pts.find(p => p.c === h.c); const [x,y] = P(p);
      ctx.strokeStyle = i ? muted : C.accent; ctx.globalAlpha = i ? .55 : 1; ctx.lineWidth = i ? 1 : 2; ctx.setLineDash(i ? [4,4] : []);
      ctx.beginPath(); ctx.moveTo(qx,qy); ctx.lineTo(qx + (x-qx)*k, qy + (y-qy)*k); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      if(k === 1){ ctx.fillStyle = ink; ctx.font = '600 11px ' + mono; ctx.fillText(h.sim.toFixed(2), (qx+x)/2 + 6, (qy+y)/2 - 4); }
    });
    ctx.fillStyle = ink; ctx.beginPath(); ctx.arc(qx,qy,6,0,7); ctx.fill();
    ctx.font = '600 11px ' + mono; ctx.fillText('tu pregunta', qx + 10, qy + 4);
  }
  const placed = [];
  const ordered = [...pts].sort((a,b) => hitIds.includes(b.c.id) - hitIds.includes(a.c.id));
  for(const p of ordered){
    const [x,y] = P(p), on = hitIds.includes(p.c.id), top = hitIds[0] === p.c.id;
    ctx.fillStyle = col(p.c.g);
    if(top){ ctx.globalAlpha = .18 + (reduce ? 0 : .08*Math.sin(t/300)); ctx.beginPath(); ctx.arc(x,y,18,0,7); ctx.fill(); ctx.globalAlpha = 1; }
    ctx.beginPath(); ctx.arc(x,y,on ? 6 : 4.5,0,7); ctx.fill();
    ctx.fillStyle = on ? ink : muted; ctx.font = (on ? '600 ' : '400 ') + '11px ' + mono;
    const tw = ctx.measureText(p.c.label).width, bx = p.x * W, by = p.y * H, lx = Math.min(Math.max(4, bx - tw/2), W - tw - 4);
    const off = [-10, 20, -24, 34].find(o => !placed.some(r => lx < r.x + r.w + 4 && lx + tw + 4 > r.x && Math.abs(by + o - r.y) < 13));
    if(off !== undefined){ placed.push({x:lx, y:by + off, w:tw}); ctx.fillText(p.c.label, Math.min(Math.max(4, x - tw/2), W - tw - 4), y + off); }
  }
}
let fieldVisible = true;
new IntersectionObserver(e => { fieldVisible = e[0].isIntersecting; }).observe(cv);
function loop(t){ if(fieldVisible) draw(t); requestAnimationFrame(loop); }
if('ResizeObserver' in window) new ResizeObserver(() => size()).observe(cv); else addEventListener('resize', size);
size(); requestAnimationFrame(loop);

/* ---------- chat ---------- */
const atext = document.getElementById('atext'), asrc = document.getElementById('asrc'), ans = document.getElementById('answer');
const SUGG = ['¿Qué experiencia tiene?','¿Sabe de IA?','¿Qué ha construido?','¿Habla inglés?','¿Cómo le contacto?'];
const chips = document.getElementById('chips');
SUGG.forEach(s => { const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = s; b.onclick = () => { document.getElementById('qinput').value = s; ask(s); }; chips.appendChild(b); });
let typer = null;
function type(txt){
  clearInterval(typer); ans.classList.remove('done');
  if(reduce){ atext.textContent = txt; ans.classList.add('done'); return; }
  let i = 0; atext.textContent = '';
  typer = setInterval(() => { i += 2; atext.textContent = txt.slice(0,i); if(i >= txt.length){ clearInterval(typer); ans.classList.add('done'); } }, 14);
}
function ask(q){
  hits = retrieve(q); asrc.innerHTML = '';
  if(!hits.length){
    qpt = {x:.5, y:.5}; qT = performance.now();
    type('Eso no aparece en mi CV, así que prefiero no inventarlo. Prueba a preguntar por mi experiencia, mis proyectos, la IA, los idiomas o cómo contactarme.');
    return;
  }
  let sx = 0, sy = 0, sw = 0;
  hits.forEach(h => { const p = pts.find(p => p.c === h.c); sx += p.x*h.s; sy += p.y*h.s; sw += h.s; });
  qpt = {x: Math.min(.9, Math.max(.1, sx/sw + .05)), y: Math.min(.88, Math.max(.12, sy/sw + .12))}; qT = performance.now();
  type(hits[0].c.a);
  hits.forEach(h => { const a = document.createElement('a'); a.className = 'src'; a.href = h.c.link; a.innerHTML = '<b>' + h.sim.toFixed(2) + '</b> ' + h.c.label; asrc.appendChild(a); });
}
document.getElementById('qform').addEventListener('submit', e => { e.preventDefault(); const v = document.getElementById('qinput').value.trim(); if(v) ask(v); });
ask('¿Qué ha construido?');
document.getElementById('qinput').value = '';

/* ---------- lang bar (bytes reales del repo) ---------- */
const LANGS = [['JavaScript',549614,'var(--accent)'],['CSS',28685,'var(--vec)'],['Python',22884,'var(--ink)'],['HTML',19536,'var(--muted)']];
const tot = LANGS.reduce((s,l) => s + l[1], 0);
LANGS.forEach(([n,b,c]) => {
  const i = document.createElement('i'); i.style.width = (b/tot*100) + '%'; i.style.background = c; i.title = n; document.getElementById('langbar').appendChild(i);
  const s = document.createElement('span'); s.innerHTML = '<i style="background:' + c + '"></i>' + n + ' ' + (b/tot*100).toFixed(1).replace('.',',') + '%'; document.getElementById('langkey').appendChild(s);
});

/* ---------- meters ---------- */
document.querySelectorAll('.meter').forEach(m => { const n = +m.dataset.level; for(let i = 0; i < 6; i++){ const e = document.createElement('i'); if(i + 1 <= n) e.className = 'on'; else if(i < n) e.className = 'half'; m.appendChild(e); } });

/* ---------- jobs accordion ---------- */
document.querySelectorAll('.job').forEach(j => {
  j.tabIndex = 0; j.setAttribute('role','button'); j.setAttribute('aria-expanded','false');
  const t = () => { const open = j.dataset.open !== 'true'; j.dataset.open = open; j.setAttribute('aria-expanded', open); j.querySelector('.more').hidden = !open; j.querySelector('.toggle').textContent = open ? '− ocultar' : '+ ver detalle'; };
  j.addEventListener('click', t); j.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); t(); } });
});
document.querySelector('.job').click();

/* ---------- copy email ---------- */
const cb = document.getElementById('copymail');
cb.addEventListener('click', () => {
  const mail = document.getElementById('mail').textContent;
  const ok = () => { cb.textContent = 'Copiado'; setTimeout(() => cb.textContent = 'Copiar', 1800); };
  const fallback = () => { const r = document.createRange(); r.selectNodeContents(document.getElementById('mail')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); cb.textContent = 'Seleccionado, cópialo'; setTimeout(() => cb.textContent = 'Copiar', 2500); };
  try { navigator.clipboard.writeText(mail).then(ok, fallback); } catch(e){ fallback(); }
});

/* =================== EXTRAS INTERACTIVOS =================== */
const $ = id => document.getElementById(id);
const root = document.documentElement;

/* ---------- tema claro / oscuro ---------- */
const sysDark = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : sysDark.matches;
function setTheme(t){ root.dataset.theme = t; $('themeicon').textContent = t === 'dark' ? '☀' : '☾'; try { localStorage.setItem('jpt-theme', t); } catch(e){} }
try { const st = localStorage.getItem('jpt-theme'); if(st) setTheme(st); } catch(e){}
$('themeicon').textContent = isDark() ? '☀' : '☾';
$('themebtn').addEventListener('click', () => setTheme(isDark() ? 'light' : 'dark'));
sysDark.addEventListener('change', () => { if(!root.dataset.theme) $('themeicon').textContent = isDark() ? '☀' : '☾'; readColors(); });
new MutationObserver(readColors).observe(root, {attributes:true, attributeFilter:['data-theme']});

/* ---------- barra de progreso ---------- */
const prog = $('progress');
const onScroll = () => { const h = root.scrollHeight - innerHeight; prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; };
addEventListener('scroll', onScroll, {passive:true}); onScroll();

/* ---------- nombre que se descifra ---------- */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01<>/{}#*';
function scramble(el){
  if(reduce) return;
  const final = el.dataset.final || (el.dataset.final = el.textContent);
  let f = 0; clearInterval(el._t);
  el.style.height = el.offsetHeight + 'px'; el.style.overflow = 'hidden';
  const done = () => { clearInterval(el._t); el.textContent = final; el.style.height = el.style.overflow = ''; };
  el._t = setInterval(() => {
    el.textContent = final.split('').map((ch, i) => ch === ' ' ? ' ' : i < f / 2 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('');
    if(++f / 2 > final.length) done();
  }, 28);
}
document.querySelectorAll('[data-scramble]').forEach((el, i) => { setTimeout(() => scramble(el), 150 + i * 250); el.addEventListener('mouseenter', () => scramble(el)); });

/* ---------- palabra rotatoria ---------- */
const WORDS = ['webs', 'bases de datos', 'asistentes con IA', 'videojuegos', 'chatbots de WhatsApp', 'cosas que funcionan'];
let wi = 0; const rot = $('rot');
function nextWord(){
  const w = WORDS[wi = (wi + 1) % WORDS.length];
  if(reduce){ rot.textContent = w; setTimeout(nextWord, 2600); return; }
  let cur = rot.textContent;
  const del = setInterval(() => {
    cur = cur.slice(0, -1); rot.textContent = cur;
    if(!cur){ clearInterval(del); let i = 0; const add = setInterval(() => { rot.textContent = w.slice(0, ++i); if(i >= w.length){ clearInterval(add); setTimeout(nextWord, 1900); } }, 55); }
  }, 30);
}
setTimeout(nextWord, 2600);

/* ---------- foto 3D y botones magnéticos ---------- */
const fine = matchMedia('(pointer:fine)').matches;
if(fine && !reduce){
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = 'perspective(700px) rotateY(' + x * 16 + 'deg) rotateX(' + -y * 16 + 'deg) scale(1.03)'; });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
  document.querySelectorAll('.magnet').forEach(el => {
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * .25 + 'px,' + (e.clientY - r.top - r.height / 2) * .35 + 'px)'; });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}
/* foco de luz en las tarjetas */
document.querySelectorAll('.spot').forEach(el => el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', e.clientX - r.left + 'px'); el.style.setProperty('--my', e.clientY - r.top + 'px'); }));

/* ---------- aparición al hacer scroll + contadores ---------- */
if('IntersectionObserver' in window && !reduce && !location.hash){
  const targets = document.querySelectorAll('.head, .card, .job, .edu li, .sk, .lang, .about > div, .contact');
  // Solo se oculta lo que el observador confirma que está fuera de pantalla (también al entrar con #ancla).
  const seen = new WeakSet();
  const io = new IntersectionObserver(es => es.forEach(e => {
    const el = e.target, first = !seen.has(el); seen.add(el);
    if(e.isIntersecting){ if(!first) el.classList.add('in'); io.unobserve(el); }
    else if(first && e.boundingClientRect.top > 0) el.classList.add('reveal');
  }), {rootMargin:'0px 0px -8% 0px'});
  targets.forEach(el => io.observe(el));
}
const countIO = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return; countIO.unobserve(e.target);
  const el = e.target, end = +el.dataset.count; if(reduce || !end) return;
  const t0 = performance.now();
  const tick = now => { const k = Math.min(1, (now - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if(k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}), {threshold:.6});
document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

/* ---------- cinta de tecnologías ---------- */
const TECH = ['JavaScript', 'Python', 'PHP', 'PostgreSQL', 'pgvector', 'FastAPI', 'RAG', 'Gemini API', 'Firebase', 'WebRTC', 'Web Audio', 'Canvas 2D', 'HTML', 'CSS', 'WhatsApp API', 'Git', 'SEO', 'Machine Learning', 'Redes', 'Edición de vídeo'];
const mt = $('mtrack');
[...TECH, ...TECH].forEach(t => { const s = document.createElement('span'); s.textContent = t; mt.appendChild(s); });

/* ---------- simulación de XatiChat ---------- */
const SIMS = [
  {q:'¿Cuál es el horario de soporte técnico?', a:'El soporte técnico atiende de lunes a viernes de 9:00 a 18:00.', src:'manual_soporte.pdf · pág. 3'},
  {q:'¿Cómo restablezco la contraseña de un cliente?', a:'Desde el panel de administración, en Usuarios, pulsa "Restablecer" y el cliente recibe un enlace por email.', src:'guia_admin.pdf · pág. 12'},
  {q:'¿Qué incluye el plan básico?', a:'El plan básico incluye el chat web, una base de conocimiento y hasta 500 consultas al mes.', src:'tarifas.pdf · pág. 1'}
];
let simI = 0, simBusy = false;
const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
$('simbtn').addEventListener('click', async () => {
  if(simBusy) return; simBusy = true;
  const sim = SIMS[simI++ % SIMS.length], nodes = [...document.querySelectorAll('[data-step]')];
  nodes.forEach(n => n.classList.remove('lit'));
  $('simchat').hidden = false; $('sima').hidden = true; $('simq').textContent = sim.q;
  const via = Math.random() < .5 ? '0' : '0w';
  for(const step of via === '0' ? ['0', '1', '2', '3', '4'] : ['0w', '1w', '2', '3', '4']){
    nodes.filter(n => n.dataset.step === step).forEach(n => n.classList.add('lit'));
    await wait(520);
  }
  $('sima').hidden = false; $('sima').innerHTML = '';
  const txt = document.createElement('span'); $('sima').appendChild(txt);
  for(let i = 1; i <= sim.a.length; i += 2){ txt.textContent = sim.a.slice(0, i); await wait(16); }
  txt.textContent = sim.a;
  const sm = document.createElement('small'); sm.textContent = 'Fuente: ' + sim.src + ' (ejemplo)'; $('sima').appendChild(sm);
  $('simbtn').textContent = '▶ Otra consulta'; simBusy = false;
});

/* ---------- toast + lluvia de shinies ---------- */
let toastT;
function toast(msg){ const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 3600); }
const fx = $('fx'), fctx = fx.getContext('2d');
let raining = false;
function shinyRain(){
  if(raining) return;
  const msg = '✨ ¡Ha aparecido un Jonathan shiny! Probabilidad 1/4096. Contrátalo antes de que huya.';
  if(reduce){ toast(msg); return; }
  const d = devicePixelRatio || 1; fx.width = innerWidth * d; fx.height = innerHeight * d; fctx.setTransform(d, 0, 0, d, 0, 0);
  const cols = ['#FFD166', '#FF7A2E', '#4CCBC2', '#FFFFFF', '#C77DFF'];
  const ps = Array.from({length:160}, () => ({x:Math.random() * innerWidth, y:-20 - Math.random() * innerHeight, v:120 + Math.random() * 220, s:4 + Math.random() * 8, r:Math.random() * 6, vr:(Math.random() - .5) * 6, c:cols[Math.floor(Math.random() * cols.length)]}));
  raining = true; let last = performance.now(); const t0 = last;
  const star = s => { fctx.beginPath(); for(let i = 0; i < 8; i++){ const a = i * Math.PI / 4, rr = i % 2 ? s * .4 : s; fctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } fctx.closePath(); fctx.fill(); };
  (function f(now){
    const dt = (now - last) / 1000; last = now; fctx.clearRect(0, 0, innerWidth, innerHeight);
    for(const p of ps){ p.y += p.v * dt; p.r += p.vr * dt; fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.r); fctx.fillStyle = p.c; star(p.s); fctx.restore(); }
    if(now - t0 < 4500) requestAnimationFrame(f); else { fctx.clearRect(0, 0, innerWidth, innerHeight); raining = false; }
  })(last);
  toast(msg);
}
const KONAMI = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
let kp = 0;
addEventListener('keydown', e => {
  if(e.target.closest && e.target.closest('input')) return;
  const k = e.key.toLowerCase(); kp = k === KONAMI[kp] ? kp + 1 : (k === 'arrowup' ? (kp === 2 ? 2 : 1) : 0);
  if(kp === KONAMI.length){ kp = 0; shinyRain(); }
});

/* ---------- terminal ---------- */
const term = $('term'), tout = $('tout'), tin = $('tinput');
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const print = html => { const d = document.createElement('div'); d.innerHTML = html; tout.appendChild(d); tout.scrollTop = tout.scrollHeight; };
const CMDS = {
  help: () => print('<span class="m">Comandos disponibles:</span>\n  <span class="c">whoami</span>       quién soy\n  <span class="c">proyectos</span>    lo que he construido\n  <span class="c">experiencia</span>  dónde he trabajado\n  <span class="c">skills</span>       tecnologías\n  <span class="c">idiomas</span>      lenguas que hablo\n  <span class="c">contacto</span>     cómo escribirme\n  <span class="c">github</span>       abrir mi GitHub\n  <span class="c">jugar</span>        abrir PokéSurvivor\n  <span class="c">tema</span>         cambiar claro/oscuro\n  <span class="c">shiny</span>        ✨\n  <span class="c">clear</span>        limpiar\n  <span class="c">exit</span>         cerrar\n<span class="m">También puedes escribir una pregunta normal, como "¿sabe de bases de datos?"\nTab autocompleta y ↑ recupera comandos anteriores.</span>'),
  whoami: () => print('<span class="v">Jonathan Piera Torregrosa</span>\nTécnico superior en DAM · especializándome en IA\nXàtiva, València · disponible para trabajar'),
  proyectos: () => print('<span class="c">XatiChat</span>      asistente RAG para empresas (PHP, FastAPI, Gemini, PostgreSQL + pgvector, WhatsApp)\n<span class="c">PokéSurvivor</span>  bullet-heaven en JS vanilla con coop WebRTC y Firebase · <a href="https://jpter78.github.io/pokesurvivor/" target="_blank" rel="noopener">jugar</a>'),
  experiencia: () => print('<span class="m">2025</span>  Desarrollo web y BBDD · Universidad CRNE CORE (Montenegro)\n<span class="m">2023</span>  E-commerce Product Manager · Innovant\n<span class="m">2023</span>  Programador web · Erasmus Courses (Italia)'),
  skills: () => print('<span class="m">frontend</span>  JavaScript · HTML/CSS · Canvas 2D · Web Audio · Tailwind\n<span class="m">backend</span>   PHP · Python · FastAPI · APIs REST · webhooks\n<span class="m">ia</span>        RAG · embeddings · Gemini API · visión · TTS\n<span class="m">datos</span>     PostgreSQL · pgvector · Firebase · PyMuPDF\n<span class="m">red</span>       WebRTC · Git/GitHub · redes · servidores\n<span class="m">otros</span>     SEO · e-commerce · edición multimedia'),
  idiomas: () => print('Castellano <span class="v">nativo</span> · Valenciano <span class="v">nativo</span> · Inglés <span class="v">B1+</span>'),
  contacto: () => print('email   <span class="v">jpieratorregrosa@gmail.com</span>\ngithub  <a href="https://github.com/JPTER78" target="_blank" rel="noopener">github.com/JPTER78</a>'),
  github: () => { print('Abriendo github.com/JPTER78…'); window.open('https://github.com/JPTER78', '_blank', 'noopener'); },
  jugar: () => { print('Abriendo PokéSurvivor…'); window.open('https://jpter78.github.io/pokesurvivor/', '_blank', 'noopener'); },
  tema: () => { setTheme(isDark() ? 'light' : 'dark'); print('Tema cambiado a ' + (isDark() ? 'oscuro' : 'claro') + '.'); },
  shiny: () => { closeTerm(); shinyRain(); },
  clear: () => { tout.innerHTML = ''; },
  exit: () => closeTerm(),
  sudo: a => print(/contrat/.test(a) ? '<span class="v">[sudo] permiso concedido.</span> Siguiente paso: escribir a jpieratorregrosa@gmail.com 😉' : '<span class="m">Prueba con</span> sudo contratar-jonathan'),
  ls: () => print('cv.pdf  xatichat/  pokesurvivor/  ideas.txt'),
  cat: a => print(/ideas/.test(a) ? 'Hacer que la IA trabaje para la gente, no al revés.' : /cv/.test(a) ? 'Mejor léelo bonito: escribe <span class="c">whoami</span> o <span class="c">experiencia</span>.' : 'cat: ' + esc(a || '') + ': no existe'),
  rm: () => print('<span class="c">Buen intento.</span> Este portfolio está protegido contra borrados.'),
};
CMDS.ayuda = CMDS.help; CMDS.contact = CMDS.contacto; CMDS.cls = CMDS.clear; CMDS.salir = CMDS.exit;
let hist = [], hi = 0, lastFocus = null;
function openTerm(){
  lastFocus = document.activeElement; term.hidden = false;
  document.querySelector('main').inert = true; document.querySelector('header').inert = true;
  if(!tout.childElementCount) print('<span class="v">Bienvenido al portfolio de Jonathan.</span> Escribe <span class="c">help</span> para ver los comandos.');
  setTimeout(() => tin.focus(), 30);
}
function closeTerm(){ term.hidden = true; document.querySelector('main').inert = false; document.querySelector('header').inert = false; if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true}); }
$('termbtn').addEventListener('click', openTerm); $('termbtn2').addEventListener('click', openTerm);
$('tclose').addEventListener('click', closeTerm);
term.addEventListener('click', e => { if(e.target === term) closeTerm(); });
addEventListener('keydown', e => {
  if(e.key === 'Escape' && !term.hidden){ closeTerm(); return; }
  if(e.key === '/' && term.hidden && !(e.target.closest && e.target.closest('input, textarea'))){ e.preventDefault(); openTerm(); }
});
tin.addEventListener('keydown', e => {
  if(e.key === 'ArrowUp' && hist.length){ hi = Math.max(0, hi - 1); tin.value = hist[hi]; e.preventDefault(); }
  if(e.key === 'ArrowDown' && hist.length){ hi = Math.min(hist.length, hi + 1); tin.value = hist[hi] || ''; e.preventDefault(); }
  if(e.key === 'Tab'){ e.preventDefault(); const m = Object.keys(CMDS).filter(c => c.startsWith(tin.value.trim().toLowerCase())); if(m.length === 1) tin.value = m[0]; else if(m.length) print('<span class="m">' + m.join('  ') + '</span>'); }
});
$('tform').addEventListener('submit', e => {
  e.preventDefault(); const raw = tin.value.trim(); tin.value = ''; if(!raw) return;
  hist.push(raw); hi = hist.length;
  print('<span class="c">$</span> ' + esc(raw));
  const [cmd, ...rest] = raw.split(/\s+/), key = cmd.toLowerCase().replace(/^\//, '');
  if(Object.prototype.hasOwnProperty.call(CMDS, key)) return CMDS[key](rest.join(' '));
  const r = retrieve(raw);
  if(r.length) print(esc(r[0].c.a) + '\n<span class="m">fuente: ' + r[0].c.label + ' · coincidencia ' + r[0].sim.toFixed(2) + '</span>');
  else print('comando no encontrado: ' + esc(cmd) + '. Escribe <span class="c">help</span>.');
});
})();

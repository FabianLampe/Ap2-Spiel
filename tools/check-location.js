#!/usr/bin/env node
// Prüft einen 3D-Ort ohne Grafikkarte. Aufruf: node tools/check-location.js game/js/world/locations/cafe.js [--tier=2] [--office] [--all-tiers]
// Baut den Ort mit three.js im Speicher auf und prüft Struktur, Startpunkt, Erreichbarkeit und Grenzwerte.
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.resolve(__dirname, '..', 'game');
const file = process.argv[2];
if (!file) { console.error('Aufruf: node tools/check-location.js <ort.js> [--tier=N] [--office] [--all-tiers]'); process.exit(2); }
const arg = n => (process.argv.find(a => a.startsWith('--' + n + '=')) || '').split('=')[1];
const tiers = process.argv.includes('--all-tiers') ? [1, 2, 3, 4] : [Number(arg('tier') || 1)];
const R = 0.32, MAX_LIGHTS = 4, MAX_MESHES = 2500;

let failures = 0;
const out = [];
const ok = (c, msg) => { out.push((c ? '  ✔ ' : '  ✘ ') + msg); if (!c) failures++; };
const warn = msg => out.push('  ! ' + msg);

function makeContext(tier) {
  const ctx = vm.createContext({ console, Math, Object, Array, JSON, Promise, setTimeout, Date });
  ctx.window = ctx; ctx.self = ctx; ctx.global = ctx;
  ctx.document = { createElement: () => ({ getContext: () => null, width: 0, height: 0 }) };   // kein Canvas: Texturen entfallen
  ctx.State = { s: { home: tier, car: 0, office: false, day: 1, minutes: 480, money: 500, rep: 0, coffeeDay: 0, skills: {}, done: {} } };
  ctx.Economy = { home: () => ({ tier }), car: () => ({ tier: 0 }) };
  ctx.registered = [];
  ctx.World = { registerLocation: def => ctx.registered.push(def) };
  const load = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  load('vendor/three.min.js');
  ['js/world/textures.js', 'js/world/props.js', 'js/world/humans.js'].forEach(load);
  return { ctx, load };
}

function blocked(x, z, cols) {
  return cols.some(c => { const cx = Math.max(c.minX, Math.min(x, c.maxX)), cz = Math.max(c.minZ, Math.min(z, c.maxZ)); return (x - cx) ** 2 + (z - cz) ** 2 < R * R; });
}

function checkOne(tier) {
  out.push(`\n${path.relative(process.cwd(), file)}  (Wohnungsstufe ${tier})`);
  let env;
  try { env = makeContext(tier); env.load(path.relative(root, path.resolve(file))); }
  catch (e) { ok(false, 'Datei lässt sich laden: ' + e.message); return; }
  const { ctx } = env, THREE = ctx.THREE;
  ok(ctx.registered.length === 1, 'meldet genau einen Ort an (World.registerLocation)');
  const def = ctx.registered[0]; if (!def) return;
  ok(!!def.id && /^[a-z0-9-]+$/.test(def.id), `id ist kleingeschrieben: "${def.id}"`);
  ok(!!def.name, `name gesetzt: "${def.name}"`);
  let b;
  try { b = def.build({ THREE, Props: ctx.Props, Textures: ctx.Textures, Humans: ctx.Humans, State: ctx.State, Economy: ctx.Economy, api: {} }); }
  catch (e) { ok(false, 'build() läuft ohne Fehler: ' + (e.stack || e.message).split('\n').slice(0, 3).join(' | ')); return; }
  ok(true, 'build() läuft ohne Fehler');
  ok(b && b.group instanceof THREE.Group, 'build() liefert einen Props.builder()');
  if (!b || !b.group) return;

  ok(b.bounds && isFinite(b.bounds.minX), 'Grenzen gesetzt (Props.room aufrufen)');
  ok(Array.isArray(b.interactables) && b.interactables.length >= 2, `mindestens 2 Interaktionspunkte (${b.interactables.length})`);
  const door = b.interactables.find(i => i.id === 'tuer');
  ok(!!door, 'Interaktionspunkt "tuer" (zur Karte) vorhanden');
  const sp = b.spawns && b.spawns.default;
  ok(sp && isFinite(sp.x) && isFinite(sp.z), 'spawns.default gesetzt');
  if (!sp || !b.bounds) return;
  ok(b.spawns.door !== undefined || true, 'spawns.door optional');

  // Zähler
  let meshes = 0, lights = 0; b.group.traverse(o => { if (o.isMesh) meshes++; if (o.isPointLight || o.isSpotLight) lights++; });
  ok(lights <= MAX_LIGHTS, `höchstens ${MAX_LIGHTS} Punktlichter (${lights})`);
  ok(meshes <= MAX_MESHES, `höchstens ${MAX_MESHES} Meshes (${meshes})`);
  ok(meshes >= 25, `Ort ist ausgestattet (${meshes} Meshes, mindestens 25)`);

  // Startpunkt und Erreichbarkeit (Raster 0,1 m)
  const bd = b.bounds, cols = b.colliders;
  ok(!blocked(sp.x, sp.z, cols), 'Startpunkt liegt nicht in einem Hindernis');
  const step = 0.1, nx = Math.ceil((bd.maxX - bd.minX) / step), nz = Math.ceil((bd.maxZ - bd.minZ) / step);
  const idx = (i, j) => j * nx + i, seen = new Uint8Array(nx * nz);
  const cell = (i, j) => [bd.minX + (i + 0.5) * step, bd.minZ + (j + 0.5) * step];
  const si = Math.floor((sp.x - bd.minX) / step), sj = Math.floor((sp.z - bd.minZ) / step);
  const q = [[si, sj]]; seen[idx(si, sj)] = 1; let n = 0;
  while (q.length) {
    const [i, j] = q.pop(); n++;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([di, dj]) => {
      const a = i + di, c = j + dj; if (a < 0 || c < 0 || a >= nx || c >= nz || seen[idx(a, c)]) return;
      const [x, z] = cell(a, c); if (blocked(x, z, cols)) return; seen[idx(a, c)] = 1; q.push([a, c]);
    });
  }
  const free = (() => { let f = 0; for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) { const [x, z] = cell(i, j); if (!blocked(x, z, cols)) f++; } return f; })();
  ok(n / Math.max(1, free) > 0.85, `Begehbare Fläche ist zusammenhängend (${Math.round(100 * n / Math.max(1, free))} % vom Startpunkt erreichbar)`);
  b.interactables.forEach(it => {
    const inside = it.x >= bd.minX && it.x <= bd.maxX && it.z >= bd.minZ && it.z <= bd.maxZ;
    let reach = false;
    for (let j = 0; j < nz && !reach; j++) for (let i = 0; i < nx && !reach; i++) {
      if (!seen[idx(i, j)]) continue; const [x, z] = cell(i, j); if (Math.hypot(x - it.x, z - it.z) < it.radius * 0.95) reach = true;
    }
    ok(inside && reach, `"${it.id}" (${it.label}) liegt im Raum und ist erreichbar`);
    ok(typeof it.onUse === 'function', `"${it.id}" hat onUse`);
  });

  // onUse mit Attrappe aufrufen: darf nicht abstürzen
  const calls = [];
  const rec = name => (...a) => { calls.push(name); return name === 'hasCoffee' || name === 'canWork' ? true : undefined; };
  const api = { state: ctx.State, economy: ctx.Economy };
  ['openMap', 'openJobs', 'openShop', 'notify', 'sleep', 'buyCoffee', 'hasCoffee', 'canWork'].forEach(k => api[k] = rec(k));
  api.talk = o => { calls.push('talk'); ok(!!o && !!o.figure && !!o.text, 'talk() bekommt figure und text'); (o.actions || []).forEach(a => { try { a.run(api); } catch (e) { ok(false, `Aktion "${a.label}" wirft: ${e.message}`); } }); };
  b.interactables.forEach(it => { try { it.onUse(api); } catch (e) { ok(false, `onUse von "${it.id}" wirft: ${e.message}`); } });
  if (door) { const c0 = calls.length; door.onUse(api); ok(calls.slice(c0).includes('openMap'), '"tuer" ruft api.openMap() auf'); }
  ok(calls.length > 0, 'Interaktionen lösen Aktionen aus');

  // Objekte außerhalb des Raums (mehr als 1,5 m)
  let outside = 0; const outNames = []; const box = new THREE.Box3();
  b.group.children.forEach(o => { box.setFromObject(o); if (!box.isEmpty() && (box.min.x < bd.minX - 1.5 || box.max.x > bd.maxX + 1.5 || box.min.z < bd.minZ - 1.5 || box.max.z > bd.maxZ + 1.5) && box.getSize(new THREE.Vector3()).x < 30) { outside++; outNames.push(`${o.type}@[${box.min.x.toFixed(1)},${box.min.z.toFixed(1)} .. ${box.max.x.toFixed(1)},${box.max.z.toFixed(1)}]`); } });
  if (outside) warn(`${outside} Objekt(e) ragen mehr als 1,5 m über die Raumgrenzen hinaus (Absicht?): ${outNames.join(', ')}`);
  // Animatoren laufen lassen
  try { b.animators.forEach(fn => { fn(0.016, 1.0); fn(0.016, 2.0); }); ok(true, 'Animatoren laufen fehlerfrei'); } catch (e) { ok(false, 'Animator wirft: ' + e.message); }
}

tiers.forEach(checkOne);
console.log(out.join('\n'));
console.log(failures ? `\n${failures} Fehler` : '\nAlles in Ordnung');
process.exit(failures ? 1 : 0);

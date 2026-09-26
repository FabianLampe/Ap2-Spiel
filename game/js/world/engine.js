// 3D-Engine: Renderer, Licht, Steuerung (WASD + Maus), Kamera in dritter Person, Kollisionen, Interaktion, Ortswechsel.
// Orte werden mit World.registerLocation({ id, name, build(ctx) }) angemeldet (siehe CONTRACT.md).
(function () {
  var W = { ok: false, paused: false, current: null, player: null, api: {}, fps: 0 };
  var locations = {}, renderer, scene, camera, container, clock, keys = {}, loc = null, sun, hemi;
  var cam = { yaw: 0, pitch: 0.42, dist: 3.6, target: null };
  var hud = { prompt: null, name: null, fade: null };
  var walkPhase = 0, walkAmt = 0, nearest = null, markers = [], animTime = 0, running = false, fpsCount = 0, fpsT = 0;
  var PLAYER_R = 0.32, WALK = 3.0, RUN = 5.2, EYE = 1.45;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function typing() { var a = document.activeElement; return a && (a.tagName === 'TEXTAREA' || a.tagName === 'INPUT' || a.isContentEditable); }

  // ---------- Kollisionen ----------
  function resolve(x, z, cols) {
    for (var pass = 0; pass < 3; pass++) {
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i], cx = clamp(x, c.minX, c.maxX), cz = clamp(z, c.minZ, c.maxZ), dx = x - cx, dz = z - cz, d2 = dx * dx + dz * dz;
        if (d2 < PLAYER_R * PLAYER_R) {
          if (d2 > 1e-8) { var d = Math.sqrt(d2), k = (PLAYER_R - d) / d; x += dx * k; z += dz * k; }
          else { // Mittelpunkt liegt in der Box: zur nächsten Kante herausschieben
            var l = x - c.minX, r = c.maxX - x, t = z - c.minZ, bt = c.maxZ - z, m = Math.min(l, r, t, bt);
            if (m === l) x = c.minX - PLAYER_R; else if (m === r) x = c.maxX + PLAYER_R; else if (m === t) z = c.minZ - PLAYER_R; else z = c.maxZ + PLAYER_R;
          }
        }
      }
    }
    if (loc && loc.bounds) { var b = loc.bounds; x = clamp(x, b.minX + PLAYER_R * 0.5, b.maxX - PLAYER_R * 0.5); z = clamp(z, b.minZ + PLAYER_R * 0.5, b.maxZ - PLAYER_R * 0.5); }
    return { x: x, z: z };
  }
  // ---------- Aufbau ----------
  function makeHud() {
    hud.prompt = document.getElementById('hud-prompt'); hud.name = document.getElementById('hud-place'); hud.fade = document.getElementById('fade');
    if (hud.prompt) hud.prompt.addEventListener('click', function () { W.interact(); });
  }

  W.init = function (el) {
    container = el; makeHud();
    try {
      var canvas = document.createElement('canvas');
      var gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) throw new Error('kein WebGL');
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' });
    } catch (e) { W.ok = false; W.error = String(e && e.message || e); return false; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
    container.appendChild(renderer.domElement);
    scene = new THREE.Scene(); scene.background = new THREE.Color(0x1b232b);
    camera = new THREE.PerspectiveCamera(58, 1, 0.1, 120);
    hemi = new THREE.HemisphereLight(0xdfe8f5, 0x8a7a6a, 0.55); scene.add(hemi);
    sun = new THREE.DirectionalLight(0xfff2dd, 0.95); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03; scene.add(sun); scene.add(sun.target);
    cam.target = new THREE.Vector3();
    clock = new THREE.Clock();
    // Spielerfigur
    var p = Humans.create(Humans.preset('spieler')); scene.add(p);
    W.player = { group: p, x: 0, z: 0, ry: 0 };
    bindInput(); onResize(); window.addEventListener('resize', onResize);
    W.ok = true; running = true; requestAnimationFrame(loop);
    return true;
  };

  function onResize() { if (!renderer) return; var w = window.innerWidth, h = window.innerHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }

  function bindInput() {
    var down = false, lx = 0, ly = 0;
    window.addEventListener('keydown', function (e) {
      if (typing() || W.paused || e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key.toLowerCase(); keys[k] = true;
      if ((k === 'e' || k === 'enter') && !e.repeat) { W.interact(); e.preventDefault(); }
      if (k === 'm' && !e.repeat && W.api.openMap) W.api.openMap();
      if (k === 'h' && !e.repeat && W.api.openHandbuch) W.api.openHandbuch();
      if (k === 'n' && !e.repeat && W.api.openNotebook) W.api.openNotebook();
      if (k === 'c') cam.yaw = W.player.ry + Math.PI;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].indexOf(k) >= 0) e.preventDefault();
    });
    window.addEventListener('keyup', function (e) { if (e.key === 'Meta') keys = {}; else keys[e.key.toLowerCase()] = false; });
    window.addEventListener('blur', function () { keys = {}; });
    var cv = renderer.domElement;
    cv.addEventListener('pointerdown', function (e) { down = true; lx = e.clientX; ly = e.clientY; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointerup', function (e) { down = false; try { cv.releasePointerCapture(e.pointerId); } catch (x) { /* egal */ } });
    cv.addEventListener('pointercancel', function () { down = false; });
    cv.addEventListener('lostpointercapture', function () { down = false; });
    cv.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    cv.addEventListener('pointermove', function (e) {
      if (!down || W.paused) return;
      cam.yaw -= (e.clientX - lx) * 0.006; cam.pitch = clamp(cam.pitch + (e.clientY - ly) * 0.004, 0.08, 1.25); lx = e.clientX; ly = e.clientY;
    });
    cv.addEventListener('wheel', function (e) { if (W.paused) return; cam.dist = clamp(cam.dist + e.deltaY * 0.003, 2.2, 9); e.preventDefault(); }, { passive: false });
  }

  // ---------- Orte ----------
  W.registerLocation = function (def) {
    ['id', 'name', 'build'].forEach(function (k) { if (!def[k]) throw new Error('Ort ' + (def.id || '?') + ': ' + k + ' fehlt'); });
    locations[def.id] = def;
  };
  W.locationIds = function () { return Object.keys(locations); };
  W.location = function (id) { return locations[id]; };

  function dispose(obj) {
    obj.traverse(function (o) {
      if (o.geometry) o.geometry.dispose();
      var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      ms.forEach(function (m) { if (m.map) m.map.dispose(); m.dispose(); });
    });
  }
  function unload() {
    if (!loc) return;
    scene.remove(loc.group); dispose(loc.group);
    markers.forEach(function (m) { scene.remove(m.mesh); dispose(m.mesh); }); markers = []; loc = null; nearest = null;
  }
  function fade(on) { if (hud.fade) hud.fade.classList.toggle('on', !!on); }

  // Betritt einen Ort. spawn = Name eines Startpunkts ('door', 'bed' …), sonst 'default'.
  var enterSeq = 0;
  W.enter = function (id, spawnName) {
    var def = locations[id]; if (!def) return Promise.reject(new Error('Unbekannter Ort: ' + id));
    var seq = ++enterSeq;
    W.paused = true;
    return new Promise(function (resolveP, rejectP) {
      fade(true);
      setTimeout(function () {
        if (seq !== enterSeq) { resolveP(null); return; }           // ein neuerer Aufruf hat übernommen
        var b;
        try {
          b = def.build({ THREE: THREE, Props: Props, Textures: Textures, Humans: Humans, State: window.State, Economy: window.Economy, api: W.api });
          if (!b || !b.group) throw new Error('Ort ' + id + ': build() muss einen Props.builder() zurückgeben');
          b.group.traverse(function (o) { if (o.userData && o.userData.ceiling) o.visible = false; });
          attachWallItems(b); hideCeilingFixtures(b);
        } catch (err) {             // alter Ort bleibt erhalten, Steuerung wird wieder frei
          fade(false); W.paused = false; rejectP(err); return;
        }
        unload();
        scene.add(b.group); loc = b; loc.def = def; W.current = id;
        // Marker über Interaktionspunkten
        b.interactables.forEach(function (it) {
          var mk = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), new THREE.MeshBasicMaterial({ color: 0xffb400, toneMapped: false }));
          mk.position.set(it.x, it.y, it.z); scene.add(mk); markers.push({ mesh: mk, it: it });
        });
        applyLighting(b);
        var sp = b.spawns[spawnName] || b.spawns.default || { x: 0, z: 0, ry: 0 };
        W.player.x = sp.x; W.player.z = sp.z; W.player.ry = sp.ry || 0; W.player.group.rotation.y = W.player.ry;
        var bdz = b.bounds ? Math.max(b.bounds.maxX - b.bounds.minX, b.bounds.maxZ - b.bounds.minZ) : 8;
        cam.yaw = (sp.ry || 0) + Math.PI; cam.dist = clamp(bdz * 0.55, 4.4, 7.5); cam.pitch = 0.5; snapCamera();
        if (hud.name) hud.name.textContent = def.name;
        setTimeout(function () { if (seq !== enterSeq) { resolveP(id); return; } fade(false); W.paused = false; resolveP(id); }, 60);
      }, 240);
    });
  };

  // An der Wand montierte Dinge (Bilder, Schilder, Uhren, Poster) verschwinden mit ihrer Wand.
  // Erkannt werden sie an ihrer Lage: nicht am Boden (Unterkante > 0,55 m) und dicht vor der Wandfläche.
  function attachWallItems(b) {
    if (!b.wallSides) return;
    var box = new THREE.Box3(), known = new Set();
    b.wallSides.forEach(function (ws) { ws.objs.forEach(function (o) { known.add(o); }); });
    b.group.children.forEach(function (o) {
      if (o.isLight || known.has(o)) return;
      box.setFromObject(o); if (box.isEmpty() || box.min.y < 0.55) return;
      var best = null, bestNear = 1e9;
      b.wallSides.forEach(function (ws) {
        var lo = ws.axis === 'z' ? box.min.z : box.min.x, hi = ws.axis === 'z' ? box.max.z : box.max.x, k = -ws.out;
        var near = Math.min((lo - ws.inner) * k, (hi - ws.inner) * k), thick = Math.abs(hi - lo);
        if (near > -0.25 && near < 0.12 && thick < 0.2 && near < bestNear) { best = ws; bestNear = near; }
      });
      if (best) best.objs.push(o);
    });
  }

  // Von oben gesehen stören Deckenlampen und Leuchtröhren die Sicht. Ihre Sichtbarkeit entfällt, das Licht bleibt.
  function hideCeilingFixtures(b) {
    var box = new THREE.Box3(), wall = new Set();
    (b.wallSides || []).forEach(function (ws) { ws.objs.forEach(function (o) { wall.add(o); }); });
    b.group.children.forEach(function (o) {
      if (o.isLight || wall.has(o)) return;
      box.setFromObject(o); if (box.isEmpty()) return;
      if (box.min.y > 1.85 && box.max.y > 2.3) o.traverse(function (c) { if (c.isMesh) c.visible = false; });
    });
  }

  function applyLighting(b) {
    var L = b.lighting || {}, bd = b.bounds || { minX: -6, maxX: 6, minZ: -6, maxZ: 6, h: 3 };
    scene.background = new THREE.Color(L.bg === undefined ? 0x1b232b : L.bg);
    scene.fog = L.fog ? new THREE.Fog(L.fog.color, L.fog.near || 12, L.fog.far || 40) : null;
    hemi.color.set(L.sky === undefined ? 0xdfe8f5 : L.sky); hemi.groundColor.set(L.ground === undefined ? 0x8a7a6a : L.ground); hemi.intensity = L.hemi === undefined ? 0.45 : L.hemi;
    sun.color.set(L.sunColor === undefined ? 0xfff2dd : L.sunColor); sun.intensity = L.sun === undefined ? 0.8 : L.sun;
    var cx = (bd.minX + bd.maxX) / 2, cz = (bd.minZ + bd.maxZ) / 2, ext = Math.max(bd.maxX - bd.minX, bd.maxZ - bd.minZ) / 2 + 2, dir = L.sunDir || [0.45, 1, 0.35];
    sun.position.set(cx + dir[0] * 10, dir[1] * 10, cz + dir[2] * 10); sun.target.position.set(cx, 0, cz); sun.target.updateMatrixWorld();
    var sc = sun.shadow.camera; sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.near = 0.5; sc.far = 40; sc.updateProjectionMatrix();
    renderer.toneMappingExposure = L.exposure === undefined ? 0.9 : L.exposure;
  }

  function snapCamera() { updateCamera(1); }
  function updateCamera(k) {
    var p = W.player, tx = p.x, ty = EYE, tz = p.z;
    cam.target.x += (tx - cam.target.x) * k; cam.target.y += (ty - cam.target.y) * k; cam.target.z += (tz - cam.target.z) * k;
    var cp = Math.cos(cam.pitch), dx = Math.sin(cam.yaw) * cp * cam.dist, dy = Math.sin(cam.pitch) * cam.dist, dz = Math.cos(cam.yaw) * cp * cam.dist;
    var cx = cam.target.x + dx, cy = clamp(cam.target.y + dy, 0.35, 9), cz = cam.target.z + dz;
    camera.position.set(cx, cy, cz); camera.lookAt(cam.target.x, cam.target.y - 0.1, cam.target.z);
    // Puppenhaus: Wände, hinter denen die Kamera steht, verschwinden
    if (loc && loc.wallSides) loc.wallSides.forEach(function (ws) {
      var c = ws.axis === 'z' ? cz : cx, outside = (c - ws.inner) * ws.out > 0.05;
      ws.objs.forEach(function (o) { o.visible = !outside; });
    });
  }

  // ---------- Interaktion ----------
  W.interact = function () {
    if (W.paused || !nearest || !nearest.onUse) return false;
    nearest.onUse(W.api); return true;
  };
  W.setPaused = function (p) { W.paused = !!p; if (p) keys = {}; };
  W.nearest = function () { return nearest; };
  W.setAvatar = function (name) {
    var old = W.player.group, p = Humans.create(Humans.preset(name));
    p.position.copy(old.position); p.rotation.copy(old.rotation); scene.remove(old); scene.add(p); W.player.group = p;
  };
  // Für Tests und Screenshots: Kamera direkt setzen
  W.debugCam = function (yaw, pitch, dist) { cam.yaw = yaw; cam.pitch = pitch; cam.dist = dist; snapCamera(); };
  W.teleport = function (x, z, ry) { W.player.x = x; W.player.z = z; if (ry !== undefined) { W.player.ry = ry; W.player.group.rotation.y = ry; } snapCamera(); };
  W.setApi = function (api) { W.api = api; };
  W.info = function () {
    return { ok: W.ok, location: W.current, x: W.player && W.player.x, z: W.player && W.player.z, paused: W.paused, fps: W.fps,
      interactables: loc ? loc.interactables.map(function (i) { return { id: i.id, label: typeof i.label === 'function' ? i.label() : i.label, x: i.x, z: i.z }; }) : [], colliders: loc ? loc.colliders.length : 0,
      nearest: nearest ? nearest.id : null };
  };

  function findNearest() {
    var best = null, bd = 1e9;
    if (!loc) return null;
    loc.interactables.forEach(function (it) {
      if (it.when && !it.when()) return;
      var dx = it.x - W.player.x, dz = it.z - W.player.z, d = Math.sqrt(dx * dx + dz * dz);
      if (d < it.radius && d < bd) { best = it; bd = d; }
    });
    return best;
  }

  // ---------- Schleife ----------
  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);
    var dt = Math.min(clock.getDelta(), 0.05); animTime += dt;
    fpsCount++; fpsT += dt; if (fpsT >= 1) { W.fps = Math.round(fpsCount / fpsT); fpsCount = 0; fpsT = 0; }
    if (!loc) { renderer.render(scene, camera); return; }
    var p = W.player;
    if (!W.paused) {
      var f = (keys['w'] ? 1 : 0) - (keys['s'] ? 1 : 0), r = (keys['d'] ? 1 : 0) - (keys['a'] ? 1 : 0);
      if (keys['arrowleft']) cam.yaw += 1.8 * dt; if (keys['arrowright']) cam.yaw -= 1.8 * dt;
      if (keys['arrowup']) cam.pitch = clamp(cam.pitch - 1.2 * dt, 0.08, 1.25); if (keys['arrowdown']) cam.pitch = clamp(cam.pitch + 1.2 * dt, 0.08, 1.25);
      var fx = -Math.sin(cam.yaw), fz = -Math.cos(cam.yaw), mx = fx * f + (-fz) * r, mz = fz * f + fx * r, len = Math.sqrt(mx * mx + mz * mz);
      var moving = len > 0.01, speed = keys['shift'] ? RUN : WALK;
      if (moving) {
        mx /= len; mz /= len;
        var res = resolve(p.x + mx * speed * dt, p.z + mz * speed * dt, loc.colliders); p.x = res.x; p.z = res.z;
        var target = Math.atan2(mx, mz), diff = Math.atan2(Math.sin(target - p.ry), Math.cos(target - p.ry)); p.ry += diff * Math.min(1, dt * 12);
        walkPhase += dt * speed * 2.6;
      }
      walkAmt += ((moving ? (keys['shift'] ? 1 : 0.75) : 0) - walkAmt) * Math.min(1, dt * 10);
    } else { walkAmt += (0 - walkAmt) * Math.min(1, dt * 10); }
    p.group.position.set(p.x, 0, p.z); p.group.rotation.y = p.ry;
    p.group.userData.walk(walkPhase, walkAmt); p.group.userData.idle(animTime, dt);
    updateCamera(Math.min(1, dt * 9));
    loc.animators.forEach(function (fn) { fn(dt, animTime); });
    (loc.npcs || []).forEach(function (n) {           // Figuren schauen den Spieler an, wenn er nahe ist
      var d = Math.hypot(n.position.x - p.x, n.position.z - p.z);
      n.userData.lookAt(p.x, p.z, d < 4.5 ? 1 : 0);
    });
    if (loc.update) loc.update(dt, animTime);

    // Interaktion + Marker
    nearest = W.paused ? null : findNearest();
    markers.forEach(function (m, i) {
      var d = Math.hypot(m.it.x - p.x, m.it.z - p.z), on = !m.it.when || m.it.when();
      m.mesh.visible = on && d < 7 && d > 0.9; m.mesh.position.y = m.it.y + Math.sin(animTime * 2.5 + i) * 0.06; m.mesh.rotation.y = animTime * 1.5;
      m.mesh.scale.setScalar(m.it === nearest ? 1.5 : 1);
    });
    if (hud.prompt) {
      if (nearest) { hud.prompt.textContent = 'E  ·  ' + (typeof nearest.label === 'function' ? nearest.label() : nearest.label); hud.prompt.classList.add('on'); } else hud.prompt.classList.remove('on');
    }
    renderer.render(scene, camera);
  }

  window.World = W;
})();

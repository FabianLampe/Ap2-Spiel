// Baukasten für Orte: Räume, Möbel, Lampen, Schilder. Einheiten: Meter. Y zeigt nach oben, Boden bei y = 0.
// Koordinaten: N = -z, S = +z, E = +x, W = -x. "Vorne" eines Möbelstücks zeigt bei ry = 0 nach +z.
// Alle Bauteile hängen an einem Builder `b` (Props.builder()) und tragen Kollisionen selbst ein.
//
//   var b = Props.builder();
//   var room = Props.room(b, { w: 6, d: 5, h: 2.8, floor: { tex: 'wood', color: '#b98f6b' }, doors: [{ wall: 'S', pos: 0 }] });
//   Props.table(b, { x: 0, z: 0 }); Props.chair(b, { x: 0, z: 0.8, ry: Math.PI });
//   return b;   // Builder ist das Ergebnis von build(), siehe game/js/world/CONTRACT.md
(function () {
  var matCache = {};

  // ---------- Grundlagen ----------
  function builder() {
    return {
      group: new THREE.Group(),
      colliders: [],        // { minX, maxX, minZ, maxZ }
      interactables: [],    // { id, label, x, z, radius, y, onUse(api) }
      animators: [],        // function (dt, t)  wird jeden Frame aufgerufen
      npcs: [],             // Figuren (Humans), schauen den Spieler an, wenn er nahe ist
      spawns: {},           // name -> { x, z, ry }
      lighting: null,       // optional, siehe CONTRACT.md
      bounds: null,
      wallSides: []         // { name, axis, inner, out, objs } -> Engine blendet Wände zwischen Kamera und Figur aus
    };
  }

  function mat(color, o) {
    o = o || {};
    var map = null;
    if (o.tex) map = Textures.get(o.tex, { color: color, repeat: o.repeat || [1, 1] });
    var key = map ? null : [color, o.rough, o.metal, o.emissive, o.emissiveIntensity, o.opacity].join('|');
    if (key && matCache[key]) return matCache[key];
    var m = new THREE.MeshStandardMaterial({
      color: map ? 0xffffff : color,
      map: map,
      roughness: o.rough === undefined ? 0.8 : o.rough,
      metalness: o.metal || 0
    });
    if (o.emissive !== undefined) { m.emissive = new THREE.Color(o.emissive); m.emissiveIntensity = o.emissiveIntensity === undefined ? 1 : o.emissiveIntensity; }
    if (o.opacity !== undefined && o.opacity < 1) { m.transparent = true; m.opacity = o.opacity; }
    if (key) matCache[key] = m;
    return m;
  }
  function resolveMat(o, fallbackColor) { return o.mat || mat(o.color === undefined ? fallbackColor : o.color, { tex: o.tex, repeat: o.repeat, rough: o.rough, metal: o.metal, emissive: o.emissive, opacity: o.opacity }); }
  function shadowed(mesh, o) { mesh.castShadow = !(o && o.cast === false); mesh.receiveShadow = !(o && o.recv === false); return mesh; }

  // Achsenparallele Fläche eines gedrehten Rechtecks (w breit, d tief, um ry gedreht) am Mittelpunkt (x, z)
  function aabb(x, z, w, d, ry) {
    var c = Math.abs(Math.cos(ry || 0)), s = Math.abs(Math.sin(ry || 0)), ex = (c * w + s * d) / 2, ez = (s * w + c * d) / 2;
    return { minX: x - ex, maxX: x + ex, minZ: z - ez, maxZ: z + ez };
  }
  function collide(b, x, z, w, d, ry) { var a = aabb(x, z, w, d, ry); b.colliders.push(a); return a; }

  // Teil in lokalem Koordinatensystem einer Gruppe: (lx, ly, lz) = Mitte der Unterseite
  function part(g, w, h, d, lx, ly, lz, m) {
    var mesh = shadowed(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m));
    mesh.position.set(lx, ly + h / 2, lz); g.add(mesh); return mesh;
  }
  function cylPart(g, rTop, rBot, h, lx, ly, lz, m, seg) {
    var mesh = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg || 20), m));
    mesh.position.set(lx, ly + h / 2, lz); g.add(mesh); return mesh;
  }
  function group(b, x, z, ry) { var g = new THREE.Group(); g.position.set(x || 0, 0, z || 0); g.rotation.y = ry || 0; b.group.add(g); return g; }

  // ---------- Primitive ----------
  // Box: o = { w, h, d, x, y (Unterseite, Standard 0), z, ry, color | mat | tex, collide }
  function box(b, o) {
    var mesh = shadowed(new THREE.Mesh(new THREE.BoxGeometry(o.w, o.h, o.d), resolveMat(o, 0xcccccc)), o);
    mesh.position.set(o.x || 0, (o.y || 0) + o.h / 2, o.z || 0); mesh.rotation.y = o.ry || 0;
    b.group.add(mesh);
    if (o.collide) collide(b, o.x || 0, o.z || 0, o.w, o.d, o.ry);
    return mesh;
  }
  // Zylinder: o = { r, rTop?, h, x, y, z, seg, color | mat, collide }
  function cyl(b, o) {
    var mesh = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(o.rTop === undefined ? o.r : o.rTop, o.r, o.h, o.seg || 24), resolveMat(o, 0xcccccc)), o);
    mesh.position.set(o.x || 0, (o.y || 0) + o.h / 2, o.z || 0); b.group.add(mesh);
    if (o.collide) collide(b, o.x || 0, o.z || 0, o.r * 2, o.r * 2, 0);
    return mesh;
  }
  // Kugel: o = { r, x, y (Mittelpunkt), z, color | mat }
  function sphere(b, o) {
    var mesh = shadowed(new THREE.Mesh(new THREE.SphereGeometry(o.r, 20, 14), resolveMat(o, 0xcccccc)), o);
    mesh.position.set(o.x || 0, o.y || 0, o.z || 0); b.group.add(mesh); return mesh;
  }

  // Schild / Bild mit Text: o = { text, w, h, x, y (Mitte), z, ry, bg, fg, font }
  function sign(b, o) {
    var w = o.w || 1.2, h = o.h || 0.4, tex = null;
    if (typeof document !== 'undefined') {
      var cv = document.createElement('canvas'); cv.width = 512; cv.height = Math.max(64, Math.round(512 * h / w));
      var ctx = cv.getContext('2d');
      if (ctx) {
        ctx.fillStyle = o.bg || '#253543'; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.fillStyle = o.fg || '#fffdf7'; ctx.font = (o.font || 'bold ' + Math.round(cv.height * 0.5) + 'px sans-serif'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        var lines = String(o.text || '').split('\n'), lh = cv.height / (lines.length + 0.4);
        lines.forEach(function (ln, i) { ctx.fillText(ln, cv.width / 2, (i + 0.7) * lh, cv.width - 20); });
        tex = new THREE.CanvasTexture(cv); tex.encoding = THREE.sRGBEncoding;
      }
    }
    var m = new THREE.MeshStandardMaterial({ map: tex, color: tex ? 0xffffff : (o.bg || 0x253543), roughness: 0.7 });
    var mesh = shadowed(new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.04), m), { cast: false });
    mesh.position.set(o.x || 0, o.y || 1.5, o.z || 0); mesh.rotation.y = o.ry || 0; b.group.add(mesh); return mesh;
  }

  // ---------- Lichter ----------
  // Punktlicht ohne Schatten (sparsam einsetzen, höchstens 4 pro Ort): o = { color, intensity, x, y, z, dist }
  function pointLight(b, o) {
    var l = new THREE.PointLight(o.color === undefined ? 0xfff1d6 : o.color, o.intensity === undefined ? 0.8 : o.intensity, o.dist || 8, 2);
    l.position.set(o.x || 0, o.y || 2.4, o.z || 0); b.group.add(l); return l;
  }
  function lamp(b, o) {                 // o = { x, z, y (nur type 'table': Tischhöhe), type: 'floor' | 'table' | 'ceiling', color, light }
    var type = o.type || 'floor', g = group(b, o.x, o.z, 0), shade = mat(o.color === undefined ? 0xfff0c8 : o.color, { emissive: 0xffe7a8, emissiveIntensity: 0.6, rough: 0.9 });
    if (type === 'ceiling') {
      var y = o.y || 2.6; cylPart(g, 0.02, 0.02, 0.35, 0, y - 0.35, 0, mat(0x333333), 8);
      var s = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), shade); s.position.set(0, y - 0.4, 0); g.add(s);
      if (o.light !== false) pointLight(b, { x: o.x, y: y - 0.5, z: o.z, intensity: 0.7, dist: 9 });
    } else if (type === 'table') {
      var ty = o.y || 0.75; cylPart(g, 0.09, 0.11, 0.03, 0, ty, 0, mat(0x2b2b2b), 16); cylPart(g, 0.015, 0.015, 0.28, 0, ty, 0, mat(0x2b2b2b), 8);
      cylPart(g, 0.1, 0.16, 0.2, 0, ty + 0.26, 0, shade, 16);
      if (o.light !== false) pointLight(b, { x: o.x, y: ty + 0.4, z: o.z, intensity: 0.35, dist: 4 });
    } else {
      cylPart(g, 0.14, 0.16, 0.03, 0, 0, 0, mat(0x2b2b2b), 16); cylPart(g, 0.018, 0.018, 1.45, 0, 0.03, 0, mat(0x2b2b2b), 8);
      cylPart(g, 0.14, 0.22, 0.3, 0, 1.4, 0, shade, 18);
      if (o.light !== false) pointLight(b, { x: o.x, y: 1.55, z: o.z, intensity: 0.5, dist: 6 });
    }
    return g;
  }

  // ---------- Raum ----------
  // o = { x, z, w, d, h, floor:{tex,color,repeat}, wall:{tex,color}, ceiling, t, doors:[{wall,pos,w,h}], windows:[{wall,pos,w,h,sill}], baseboard, trim }
  // Gibt { x, z, w, d, h, minX, maxX, minZ, maxZ } (Innenmaße) zurück.
  function room(b, o) {
    var x0 = o.x || 0, z0 = o.z || 0, w = o.w, d = o.d, h = o.h || 2.8, t = o.t || 0.2;
    var fl = o.floor || {}, wl = o.wall || {}, wallColor = wl.color === undefined ? 0xeae2d2 : wl.color, wallTex = wl.tex === undefined ? 'plaster' : wl.tex;
    var trimMat = mat(o.trim === undefined ? 0xf3efe6 : o.trim, { rough: 0.6 });
    var R = { x: x0, z: z0, w: w, d: d, h: h, minX: x0 - w / 2, maxX: x0 + w / 2, minZ: z0 - d / 2, maxZ: z0 + d / 2 };

    // Boden
    var floorTex = fl.tex ? Textures.get(fl.tex, { color: fl.color === undefined ? '#b98f6b' : fl.color, repeat: fl.repeat || [w / 2, d / 2] }) : null;
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(w + 2 * t, d + 2 * t), new THREE.MeshStandardMaterial({ map: floorTex, color: floorTex ? 0xffffff : (fl.color === undefined ? 0x9a7b5a : fl.color), roughness: fl.rough === undefined ? 0.75 : fl.rough }));
    floor.rotation.x = -Math.PI / 2; floor.position.set(x0, 0, z0); floor.receiveShadow = true; b.group.add(floor);
    if (o.ceiling) {
      var c = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color: 0xf5f2ea, roughness: 0.9 }));
      c.rotation.x = Math.PI / 2; c.position.set(x0, h, z0); c.userData.ceiling = true; b.group.add(c);
    }

    // Wände: jede Seite wird um Öffnungen (Türen, Fenster) herum aus Stücken gebaut
    var sides = { N: { len: w, axis: 'x', fixed: z0 - d / 2 - t / 2, dir: 1 }, S: { len: w, axis: 'x', fixed: z0 + d / 2 + t / 2, dir: -1 },
                  W: { len: d, axis: 'z', fixed: x0 - w / 2 - t / 2, dir: 1 }, E: { len: d, axis: 'z', fixed: x0 + w / 2 + t / 2, dir: -1 } };
    Object.keys(sides).forEach(function (name) {
      var s = sides[name], L = s.len, ops = [];
      var side = { name: name, axis: s.axis === 'x' ? 'z' : 'x', inner: s.fixed + s.dir * t / 2, out: -s.dir, objs: [] }; b.wallSides.push(side);
      (o.doors || []).forEach(function (dr) { if (dr.wall === name) ops.push({ u: dr.pos || 0, w: dr.w || 1.0, y0: 0, y1: dr.h || 2.1, door: true }); });
      (o.windows || []).forEach(function (wn) { if (wn.wall === name) ops.push({ u: wn.pos || 0, w: wn.w || 1.4, y0: wn.sill === undefined ? 0.9 : wn.sill, y1: (wn.sill === undefined ? 0.9 : wn.sill) + (wn.h || 1.2), win: true }); });
      ops.sort(function (a, c2) { return a.u - c2.u; });
      var wmat = mat(wallColor, { tex: wallTex, repeat: [L / 2, h / 2], rough: 0.9 });
      function seg(u0, u1, y0, y1, solid) {
        if (u1 - u0 < 0.01 || y1 - y0 < 0.01) return;
        var len = u1 - u0, uc = (u0 + u1) / 2, m = shadowed(new THREE.Mesh(new THREE.BoxGeometry(s.axis === 'x' ? len : t, y1 - y0, s.axis === 'x' ? t : len), wmat));
        if (s.axis === 'x') m.position.set(x0 + uc, (y0 + y1) / 2, s.fixed); else m.position.set(s.fixed, (y0 + y1) / 2, z0 + uc);
        b.group.add(m); side.objs.push(m);
        if (solid) { if (s.axis === 'x') b.colliders.push({ minX: x0 + u0, maxX: x0 + u1, minZ: s.fixed - t / 2, maxZ: s.fixed + t / 2, wall: true }); else b.colliders.push({ minX: s.fixed - t / 2, maxX: s.fixed + t / 2, minZ: z0 + u0, maxZ: z0 + u1, wall: true }); }
      }
      var cursor = -L / 2;
      ops.forEach(function (op) {
        var a = Math.max(op.u - op.w / 2, cursor), c3 = Math.min(op.u + op.w / 2, L / 2);
        if (c3 <= a) return;       // Öffnung überlappt eine vorherige oder liegt außerhalb der Wand
        seg(cursor, a, 0, h, true);                              // Wand bis zur Öffnung
        if (op.door) { seg(a, c3, op.y1, h, false); }             // über der Tür
        else { seg(a, c3, 0, op.y0, true); seg(a, c3, op.y1, h, false); }   // unter/über dem Fenster
        // Rahmen + Glas
        var frameT = 0.05, cx = s.axis === 'x' ? x0 + op.u : s.fixed, cz = s.axis === 'x' ? s.fixed : z0 + op.u;
        var ry = s.axis === 'x' ? 0 : Math.PI / 2;
        var fg = new THREE.Group(); fg.position.set(cx, 0, cz); fg.rotation.y = ry; b.group.add(fg); side.objs.push(fg);
        var yb = op.y0, yt = op.y1, oh = yt - yb;
        part(fg, frameT, oh, t + 0.02, -op.w / 2 + frameT / 2, yb, 0, trimMat); part(fg, frameT, oh, t + 0.02, op.w / 2 - frameT / 2, yb, 0, trimMat);
        part(fg, op.w, frameT, t + 0.02, 0, yt - frameT, 0, trimMat);
        if (op.win) {
          part(fg, op.w, frameT, t + 0.02, 0, yb, 0, trimMat);
          var glass = new THREE.Mesh(new THREE.PlaneGeometry(op.w - 0.1, oh - 0.1), new THREE.MeshStandardMaterial({ color: 0xbfe0f5, transparent: true, opacity: 0.28, roughness: 0.1, metalness: 0.1 }));
          glass.position.set(0, yb + oh / 2, 0); fg.add(glass);
          part(fg, 0.04, oh - 0.1, 0.03, 0, yb + 0.05, 0, trimMat);          // Sprosse
        } else {
          // Türblatt, leicht geöffnet (ohne Kollision, die Öffnung bleibt begehbar)
          var pivot = new THREE.Group(); pivot.position.set(-op.w / 2 + frameT, 0, 0); pivot.rotation.y = -1.25; fg.add(pivot);
          part(pivot, op.w - 2 * frameT, oh - frameT, 0.04, (op.w - 2 * frameT) / 2, 0, 0, mat(0x8a6547, { rough: 0.6 }));
        }
        cursor = c3;
      });
      seg(cursor, L / 2, 0, h, true);
      // Fußleiste innen
      if (o.baseboard !== false) {
        var bl = shadowed(new THREE.Mesh(new THREE.BoxGeometry(s.axis === 'x' ? L : 0.03, 0.1, s.axis === 'x' ? 0.03 : L), trimMat), { cast: false });
        var inward = s.axis === 'x' ? s.dir * (t / 2 + 0.015) : s.dir * (t / 2 + 0.015);
        if (s.axis === 'x') bl.position.set(x0, 0.05, s.fixed + inward); else bl.position.set(s.fixed + inward, 0.05, z0);
        b.group.add(bl); side.objs.push(bl);
      }
    });
    b.bounds = { minX: R.minX, maxX: R.maxX, minZ: R.minZ, maxZ: R.maxZ, h: h };
    return R;
  }

  // ---------- Möbel ----------
  var WOOD = 0x9c6f47;
  function table(b, o) {
    var w = o.w || 1.2, d = o.d || 0.8, h = o.h || 0.75, g = group(b, o.x, o.z, o.ry), m = mat(o.color === undefined ? WOOD : o.color, { rough: 0.55 });
    if (o.round) {
      cylPart(g, w / 2, w / 2, 0.05, 0, h - 0.05, 0, m, 28); cylPart(g, 0.05, 0.05, h - 0.05, 0, 0, 0, m, 10); cylPart(g, 0.28, 0.3, 0.04, 0, 0, 0, m, 16);
      collide(b, o.x, o.z, w, w, 0);
    } else {
      part(g, w, 0.05, d, 0, h - 0.05, 0, m);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { part(g, 0.06, h - 0.05, 0.06, s[0] * (w / 2 - 0.06), 0, s[1] * (d / 2 - 0.06), m); });
      collide(b, o.x, o.z, w, d, o.ry);
    }
    return g;
  }
  function chair(b, o) {           // Vorderseite (Sitzrichtung) bei ry = 0 nach +z gerichtet... die Lehne steht hinten (-z)
    var g = group(b, o.x, o.z, o.ry), m = mat(o.color === undefined ? 0x6b4a34 : o.color, { rough: 0.6 }), seatH = o.seatH || 0.46;
    var pad = mat(o.pad === undefined ? o.color === undefined ? 0x6b4a34 : o.color : o.pad, { tex: o.pad !== undefined ? 'fabric' : undefined, rough: 0.9 });
    part(g, 0.44, 0.05, 0.44, 0, seatH - 0.05, 0, pad);
    part(g, 0.44, 0.5, 0.04, 0, seatH, -0.2, m);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { part(g, 0.04, seatH - 0.05, 0.04, s[0] * 0.18, 0, s[1] * 0.18, m); });
    collide(b, o.x, o.z, 0.46, 0.46, o.ry);
    return g;
  }
  function stool(b, o) {
    var g = group(b, o.x, o.z, 0), h = o.h || 0.68, m = mat(o.color === undefined ? 0x2b2b2b : o.color, { metal: 0.4, rough: 0.5 });
    cylPart(g, 0.19, 0.19, 0.06, 0, h - 0.06, 0, mat(o.seat === undefined ? 0x9c3d2e : o.seat, { rough: 0.7 }), 18); cylPart(g, 0.025, 0.025, h - 0.06, 0, 0, 0, m, 8); cylPart(g, 0.16, 0.18, 0.02, 0, 0, 0, m, 14);
    collide(b, o.x, o.z, 0.4, 0.4, 0); return g;
  }
  function sofa(b, o) {
    var w = o.w || 2.0, g = group(b, o.x, o.z, o.ry), c = o.color === undefined ? 0x5a6b7d : o.color, m = mat(c, { tex: 'fabric', rough: 1 }), dark = mat(Textures.shade(c, -0.08), { rough: 1 });
    part(g, w, 0.28, 0.9, 0, 0.1, 0, dark); part(g, w - 0.3, 0.16, 0.7, 0, 0.38, 0.06, m);
    part(g, w, 0.55, 0.22, 0, 0.38, -0.34, m); part(g, 0.22, 0.32, 0.9, -w / 2 + 0.11, 0.38, 0, m); part(g, 0.22, 0.32, 0.9, w / 2 - 0.11, 0.38, 0, m);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) { part(g, 0.06, 0.1, 0.06, s[0] * (w / 2 - 0.1), 0, s[1] * 0.38, mat(0x2b2b2b)); });
    collide(b, o.x, o.z, w, 0.9, o.ry); return g;
  }
  function bed(b, o) {             // Kopfende bei ry = 0 auf der -z-Seite
    var w = o.w || 1.4, l = o.l || 2.0, g = group(b, o.x, o.z, o.ry), fr = mat(o.frame === undefined ? 0x7a5636 : o.frame, { rough: 0.6 });
    part(g, w + 0.1, 0.25, l + 0.1, 0, 0.1, 0, fr); part(g, w + 0.1, 0.9, 0.08, 0, 0.1, -l / 2 - 0.02, fr);
    part(g, w, 0.2, l, 0, 0.35, 0, mat(0xf3efe6, { tex: 'fabric', rough: 1 }));
    part(g, w + 0.02, 0.06, l * 0.62, 0, 0.53, l * 0.19, mat(o.color === undefined ? 0x4f7da3 : o.color, { tex: 'fabric', rough: 1 }));
    part(g, w * 0.36, 0.13, 0.3, -w * 0.22, 0.53, -l * 0.36, mat(0xffffff, { rough: 1 })); part(g, w * 0.36, 0.13, 0.3, w * 0.22, 0.53, -l * 0.36, mat(0xffffff, { rough: 1 }));
    collide(b, o.x, o.z, w + 0.1, l + 0.1, o.ry); return g;
  }
  function desk(b, o) {
    var w = o.w || 1.4, d = o.d || 0.7, g = group(b, o.x, o.z, o.ry), m = mat(o.color === undefined ? 0xb98255 : o.color, { rough: 0.55 });
    part(g, w, 0.05, d, 0, 0.72, 0, m); part(g, 0.05, 0.72, d - 0.05, -w / 2 + 0.03, 0, 0, m); part(g, 0.45, 0.6, d - 0.08, w / 2 - 0.25, 0.1, 0, m);
    part(g, 0.03, 0.16, 0.02, w / 2 - 0.25, 0.5, d / 2 - 0.03, mat(0x222222, { metal: 0.6 }));
    collide(b, o.x, o.z, w, d, o.ry); return g;
  }
  function laptop(b, o) {          // steht auf Tischen; o = { x, y, z, ry, open }
    var g = new THREE.Group(); g.position.set(o.x || 0, o.y || 0.75, o.z || 0); g.rotation.y = o.ry || 0; b.group.add(g);
    part(g, 0.34, 0.02, 0.24, 0, 0, 0, mat(0x9aa3a8, { metal: 0.7, rough: 0.35 }));
    var sc = part(g, 0.34, 0.22, 0.012, 0, 0.02, -0.11, mat(0x1c5a56, { emissive: 0x2fa89a, emissiveIntensity: 0.9, rough: 0.3 })); sc.rotation.x = -0.25; sc.position.y += 0.0;
    var back = part(g, 0.34, 0.22, 0.01, 0, 0.02, -0.118, mat(0x9aa3a8, { metal: 0.7, rough: 0.35 })); back.rotation.x = -0.25;
    return g;
  }
  function shelf(b, o) {
    var w = o.w || 1.2, h = o.h || 1.8, d = o.d || 0.35, g = group(b, o.x, o.z, o.ry), m = mat(o.color === undefined ? 0x7a5636 : o.color, { rough: 0.6 });
    part(g, 0.04, h, d, -w / 2 + 0.02, 0, 0, m); part(g, 0.04, h, d, w / 2 - 0.02, 0, 0, m); part(g, w, h, 0.02, 0, 0, -d / 2 + 0.01, m);
    var n = Math.max(2, Math.round(h / 0.4)), cols = [0xf87845, 0xffcf5b, 0x257e78, 0xc4b6e6, 0xb74532, 0xa8d5ef, 0x4f7da3];
    for (var i = 0; i <= n; i++) {
      part(g, w, 0.03, d, 0, i * (h - 0.03) / n, 0, m);
      if (o.books !== false && i < n) { var x = -w / 2 + 0.1, k = 0; while (x < w / 2 - 0.12) { var bw = 0.03 + ((k * 7) % 3) * 0.012, bh = 0.22 + ((k * 5) % 4) * 0.03; part(g, bw, bh, d * 0.7, x + bw / 2, i * (h - 0.03) / n + 0.03, 0, mat(cols[k % cols.length], { rough: 0.85 })); x += bw + 0.008; k++; } }
    }
    collide(b, o.x, o.z, w, d, o.ry); return g;
  }
  function counter(b, o) {
    var w = o.w || 3, d = o.d || 0.7, h = o.h || 1.05, g = group(b, o.x, o.z, o.ry);
    part(g, w, h - 0.05, d, 0, 0, 0, mat(o.color === undefined ? 0x6b4a34 : o.color, { tex: o.tex, rough: 0.6 }));
    part(g, w + 0.1, 0.05, d + 0.14, 0, h - 0.05, 0.03, mat(o.topColor === undefined ? 0xd9d3c7 : o.topColor, { tex: o.topTex || 'marble', rough: 0.35 }));
    collide(b, o.x, o.z, w + 0.1, d + 0.14, o.ry); return g;
  }
  function plant(b, o) {
    var s = o.size || 1, g = group(b, o.x, o.z, 0);
    cylPart(g, 0.2 * s, 0.15 * s, 0.34 * s, 0, 0, 0, mat(0xc9784f, { rough: 0.8 }), 14);
    cylPart(g, 0.19 * s, 0.19 * s, 0.03 * s, 0, 0.32 * s, 0, mat(0x4a3a2a), 14);
    var leaf = mat(o.color === undefined ? 0x4c9a6a : o.color, { rough: 0.8 });
    for (var i = 0; i < 7; i++) { var a = i / 7 * Math.PI * 2, l = new THREE.Mesh(new THREE.SphereGeometry(0.17 * s, 10, 8), leaf); l.scale.set(0.6, 1.5, 0.35); l.position.set(Math.cos(a) * 0.12 * s, (0.62 + (i % 3) * 0.12) * s, Math.sin(a) * 0.12 * s); l.rotation.set(Math.sin(a) * 0.5, -a, -Math.cos(a) * 0.5); shadowed(l); g.add(l); }
    collide(b, o.x, o.z, 0.4 * s, 0.4 * s, 0); return g;
  }
  function rug(b, o) {
    var m = shadowed(new THREE.Mesh(new THREE.BoxGeometry(o.w, 0.015, o.d), mat(o.color === undefined ? 0x8f3b3b : o.color, { tex: 'carpet', repeat: [o.w, o.d], rough: 1 })), { cast: false });
    m.position.set(o.x || 0, 0.008, o.z || 0); m.rotation.y = o.ry || 0; b.group.add(m); return m;
  }
  function fridge(b, o) {
    var g = group(b, o.x, o.z, o.ry), m = mat(o.color === undefined ? 0xe8ecee : o.color, { metal: 0.3, rough: 0.35 });
    part(g, 0.65, 1.75, 0.65, 0, 0, 0, m); part(g, 0.02, 0.5, 0.03, 0.24, 1.05, 0.34, mat(0x888888, { metal: 0.8 })); part(g, 0.66, 0.015, 0.01, 0, 1.12, 0.33, mat(0x999999));
    collide(b, o.x, o.z, 0.65, 0.65, o.ry); return g;
  }
  function picture(b, o) {         // Bild an der Wand; o = { x, y (Mitte), z, ry, w, h, color }
    var w = o.w || 0.8, h = o.h || 0.55, g = new THREE.Group(); g.position.set(o.x || 0, o.y || 1.6, o.z || 0); g.rotation.y = o.ry || 0; b.group.add(g);
    part(g, w + 0.06, h + 0.06, 0.03, 0, -(h + 0.06) / 2, 0, mat(0x2b2b2b, { rough: 0.5 }));
    var pal = [o.color === undefined ? 0x6fa8c9 : o.color, 0xf0c060, 0xd9694a, 0x4c9a6a];
    part(g, w, h, 0.01, 0, -h / 2, 0.02, mat(pal[0], { rough: 0.9 })); part(g, w * 0.5, h * 0.5, 0.012, -w * 0.15, -h * 0.45, 0.025, mat(pal[1], { rough: 0.9 })); part(g, w * 0.25, h * 0.6, 0.012, w * 0.25, -h * 0.4, 0.025, mat(pal[2], { rough: 0.9 }));
    return g;
  }
  function clock(b, o) {
    var g = new THREE.Group(); g.position.set(o.x || 0, o.y || 2.0, o.z || 0); g.rotation.y = o.ry || 0; b.group.add(g);
    var face = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 28), mat(0xfffdf7, { rough: 0.5 }))); face.rotation.x = Math.PI / 2; g.add(face);
    part(g, 0.015, 0.14, 0.01, 0, 0, 0.03, mat(0x222222)); part(g, 0.01, 0.18, 0.01, 0.0, -0.0, 0.035, mat(0xf87845)).rotation.z = -1.0;
    return g;
  }
  function coffeeMachine(b, o) {
    var g = new THREE.Group(); g.position.set(o.x || 0, o.y || 1.05, o.z || 0); g.rotation.y = o.ry || 0; b.group.add(g);
    part(g, 0.5, 0.42, 0.4, 0, 0, 0, mat(0x2b2b2b, { metal: 0.6, rough: 0.35 })); part(g, 0.4, 0.06, 0.3, 0, 0.42, 0, mat(0xb8bcc0, { metal: 0.8, rough: 0.3 }));
    cylPart(g, 0.035, 0.035, 0.12, -0.1, 0.05, 0.22, mat(0xb8bcc0, { metal: 0.8 }), 8); cylPart(g, 0.035, 0.035, 0.12, 0.1, 0.05, 0.22, mat(0xb8bcc0, { metal: 0.8 }), 8);
    part(g, 0.06, 0.02, 0.01, 0.15, 0.3, 0.21, mat(0x3fbf78, { emissive: 0x3fbf78 })); return g;
  }
  function cashRegister(b, o) {
    var g = new THREE.Group(); g.position.set(o.x || 0, o.y || 1.05, o.z || 0); g.rotation.y = o.ry || 0; b.group.add(g);
    part(g, 0.36, 0.16, 0.34, 0, 0, 0, mat(0x30363b, { rough: 0.5 })); var s = part(g, 0.22, 0.14, 0.03, 0, 0.16, -0.05, mat(0x1c5a56, { emissive: 0x2fa89a, emissiveIntensity: 0.7 })); s.rotation.x = -0.3; return g;
  }
  // Einfaches Auto; o = { x, z, ry, color, tier (1..3: größer/edler) }
  function car(b, o) {
    var g = group(b, o.x, o.z, o.ry), tier = o.tier || 1, L = 3.6 + tier * 0.4, W = 1.65 + tier * 0.05, c = o.color === undefined ? 0xb74532 : o.color;
    var body = mat(c, { metal: 0.55, rough: 0.35 }), glass = mat(0x1c2a36, { metal: 0.3, rough: 0.1 }), tire = mat(0x1a1a1a, { rough: 0.9 }), rim = mat(0xc9ced2, { metal: 0.9, rough: 0.3 });
    part(g, W, 0.5, L, 0, 0.3, 0, body); part(g, W - 0.15, 0.42, L * 0.5, 0, 0.8, -L * 0.03, body);
    part(g, W - 0.12, 0.34, L * 0.5 + 0.02, 0, 0.82, -L * 0.03, glass).scale.set(1, 0.85, 0.9);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (s) {
      var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.24, 20), tire); wh.rotation.z = Math.PI / 2; wh.position.set(s[0] * (W / 2 - 0.05), 0.32, s[1] * (L / 2 - 0.65)); wh.castShadow = true; g.add(wh);
      var r = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.26, 14), rim); r.rotation.z = Math.PI / 2; r.position.copy(wh.position); g.add(r);
    });
    part(g, 0.28, 0.1, 0.03, -W / 2 + 0.3, 0.55, L / 2, mat(0xfff1c0, { emissive: 0xfff1c0, emissiveIntensity: 0.8 })); part(g, 0.28, 0.1, 0.03, W / 2 - 0.3, 0.55, L / 2, mat(0xfff1c0, { emissive: 0xfff1c0, emissiveIntensity: 0.8 }));
    collide(b, o.x, o.z, W, L, o.ry); return g;
  }

  // ---------- Spielelemente ----------
  // Interaktionspunkt: o = { id, label, x, z, radius, y (Höhe der Markierung), onUse(api) }
  function interact(b, o) {
    var it = { id: o.id, label: o.label, x: o.x, z: o.z, radius: o.radius || 1.4, y: o.y === undefined ? 1.4 : o.y, onUse: o.onUse, when: o.when };
    b.interactables.push(it); return it;
  }
  // Figur (NPC): o = { figure: 'bank', x, z, ry, pose: 'stand' | 'sit', name, label, onUse(api) }
  function npc(b, o) {
    var h = Humans.create(Humans.preset(o.figure), o.scale ? { scale: o.scale } : null);
    h.position.set(o.x, o.pose === 'sit' ? 0.05 : 0, o.z); h.rotation.y = o.ry || 0; b.group.add(h);
    if (o.pose === 'sit') h.userData.setPose('sit', o.seatH);
    var idle = Math.random() * 6;
    b.animators.push(function (dt, t) { h.userData.idle(t + idle, dt); });
    b.npcs.push(h);
    if (o.collide !== false) collide(b, o.x, o.z, 0.5, 0.5, 0);
    var baseLabel = o.label || 'Mit ' + (o.name || 'der Person') + ' sprechen';
    if (o.onUse) interact(b, { id: o.id || 'npc-' + o.figure, label: function () { return (typeof Quests !== 'undefined' && Quests.label) ? Quests.label(o.figure, baseLabel) : baseLabel; }, x: o.x, z: o.z, radius: o.radius || 1.7, y: 2.1, onUse: o.onUse });
    return h;
  }

  window.Props = {
    builder: builder, mat: mat, aabb: aabb, collide: collide, group: group, part: part, cylPart: cylPart,
    box: box, cyl: cyl, sphere: sphere, sign: sign, pointLight: pointLight, lamp: lamp, room: room,
    table: table, chair: chair, stool: stool, sofa: sofa, bed: bed, desk: desk, laptop: laptop, shelf: shelf, counter: counter,
    plant: plant, rug: rug, fridge: fridge, picture: picture, clock: clock, coffeeMachine: coffeeMachine, cashRegister: cashRegister, car: car,
    interact: interact, npc: npc
  };
})();

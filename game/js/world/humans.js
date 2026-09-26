// 3D-Figuren (Version 3): Körper aus Drehflächen, Gesicht mit Augen, Lidern, Nase, Lippen, Ohren, Haare in Schichten,
// Kleidung (Kragen, Knöpfe, Sakko, Kapuze, Gürtel), Hände mit Fingern, Schuhe mit Sohle.
// Humans.create(config) -> THREE.Group; Figur steht bei y = 0, blickt nach +z, ca. 1,75 m groß.
// group.userData: walk(phase, amount), idle(t), setPose('stand' | 'sit' | 'wave'), lookAt(x, z, strength) (Weltkoordinaten), talk(on)
(function () {
  var INK = 0x253543;

  // Aussehen; die Namen entsprechen den 2D-Figuren aus characters.js, dazu Statisten.
  // build: 'normal' | 'stout' (rundlich) | 'slim'; female: schmalere Schultern, breitere Hüfte
  var PRESETS = {
    spieler:     { skin: 0xf0c29c, hair: 0x3b2a20, hairStyle: 'short',  shirt: 0xd4491a, pants: 0x2f3b4d, shoes: 0x2a2a2a, hoodie: true, build: 'normal' },
    kalle:       { skin: 0xe2ac86, hair: 0x9a9fa4, hairStyle: 'bald',   shirt: 0xe9efe9, pants: 0x3a3f4a, shoes: 0x2a2320, tie: 0xe0a800, vest: 0x257e78, mustache: true, build: 'stout', belt: true, height: 1.74 },
    finanzamt:   { skin: 0xf0c4a4, hair: 0x4a3b3b, hairStyle: 'bun',    shirt: 0xf0f0f4, jacket: 0x6b7f95, pants: 0x4a5566, shoes: 0x2a2a2a, glasses: true, lanyard: true, female: true, skirt: true, build: 'slim', height: 1.68 },
    bank:        { skin: 0xe6b995, hair: 0x22303c, hairStyle: 'slick',  shirt: 0xf4f6fa, jacket: 0x1f3a5a, pants: 0x1f3a5a, shoes: 0x161616, tie: 0xb74532, belt: true, build: 'normal', height: 1.80 },
    startup:     { skin: 0xd9a781, hair: 0x7a3e2a, hairStyle: 'beanie', shirt: 0x9ed9b8, pants: 0x3b4a5a, shoes: 0xf0f0f0, beanie: 0xf87845, headset: true, hoodie: true, build: 'slim', height: 1.78 },
    datenschutz: { skin: 0xf5cfb1, hair: 0x7b5fb3, hairStyle: 'bob',    shirt: 0xf4f0fa, jacket: 0xc4b6e6, pants: 0x3a3a4a, shoes: 0x2a2a2a, glasses: true, female: true, build: 'normal', height: 1.70 },
    barista:     { skin: 0xd6ad88, hair: 0x3a2a20, hairStyle: 'short',  shirt: 0xf3efe6, pants: 0x2b2b2b, shoes: 0x222222, apron: 0x8a3d2e, beard: true, build: 'normal' },
    makler:      { skin: 0xe6b995, hair: 0x6a4a2a, hairStyle: 'slick',  shirt: 0xf2f2f2, jacket: 0x2b3a4a, pants: 0x2b3a4a, shoes: 0x161616, tie: 0x4a8f6a, belt: true, build: 'normal', height: 1.78 },
    verkaeufer:  { skin: 0xd6a67e, hair: 0x2a2a2a, hairStyle: 'slick',  shirt: 0x1f4f8f, pants: 0x30343a, shoes: 0x161616, belt: true, build: 'stout' },
    gast1:       { skin: 0xf0c4a4, hair: 0x5a3a26, hairStyle: 'ponytail', shirt: 0xe4a0a0, pants: 0x3a4a6a, shoes: 0x2b2b2b, female: true, build: 'slim', height: 1.66 },
    gast2:       { skin: 0xc99672, hair: 0x1f1f1f, hairStyle: 'short',  shirt: 0x6a8f6a, pants: 0x3a3a3a, shoes: 0x2b2b2b, build: 'normal' },
    gast3:       { skin: 0xf2d0b0, hair: 0xb8b0a0, hairStyle: 'bald',   shirt: 0x4f6f8f, pants: 0x4a4a4a, shoes: 0x2b2b2b, glasses: true, build: 'stout', height: 1.72 }
  };

  var DEFAULTS = { skin: 0xe6b995, hair: 0x3b2a20, hairStyle: 'short', shirt: 0x8a9aa8, pants: 0x3a3f4a, shoes: 0x222222, build: 'normal' };

  function std(color, rough, metal) { return new THREE.MeshStandardMaterial({ color: color, roughness: rough === undefined ? 0.85 : rough, metalness: metal || 0 }); }
  function sh(mesh) { mesh.castShadow = true; mesh.receiveShadow = true; return mesh; }
  function at(mesh, x, y, z) { mesh.position.set(x, y, z); return mesh; }
  function sc(mesh, x, y, z) { mesh.scale.set(x, y, z); return mesh; }

  // Hauttextur: sanfte Farbverläufe und Rauschen (nur mit DOM)
  function skinTexture(hex) {
    if (typeof document === 'undefined') return null;
    var cv = document.createElement('canvas'); cv.width = cv.height = 64; var c = cv.getContext('2d'); if (!c) return null;
    // Die sRGB-Textur soll denselben Hautton wie das untexturierte Material liefern.
    var col = new THREE.Color(hex).convertLinearToSRGB(), r = Math.round(col.r * 255), g = Math.round(col.g * 255), b = Math.round(col.b * 255);
    c.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; c.fillRect(0, 0, 64, 64);
    var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = 0; i < 90; i++) { var v = (rnd() - 0.5) * 14; c.fillStyle = 'rgba(' + (v > 0 ? '255,240,230' : '150,100,80') + ',' + Math.abs(v) / 260 + ')'; c.fillRect(rnd() * 64, rnd() * 64, 4 + rnd() * 6, 4 + rnd() * 6); }
    var glow = c.createRadialGradient(24, 20, 2, 32, 32, 42);
    glow.addColorStop(0, 'rgba(255,229,207,0.12)'); glow.addColorStop(1, 'rgba(100,55,42,0.09)');
    c.fillStyle = glow; c.fillRect(0, 0, 64, 64);
    var t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; return t;
  }

  // Drehfläche mit elliptischem Querschnitt (Rumpf, Kleidung): pts = [[radius, höhe], …]
  function lathe(pts, mat, sx, sz, seg) {
    var g = new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), seg || 28);
    return sh(sc(new THREE.Mesh(g, mat), sx || 1, 1, sz || 0.75));
  }
  function capsule(r, len, mat, seg) { return sh(new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, seg || 12), mat)); }
  function ball(r, mat, w, h) { return sh(new THREE.Mesh(new THREE.SphereGeometry(r, w || 16, h || 12), mat)); }

  function create(cfg, over) {
    cfg = Object.assign({}, DEFAULTS, cfg || {}, over || {});
    var scale = cfg.scale || ((cfg.height || 1.75) / 1.8);
    var root = new THREE.Group(), body = new THREE.Group(); root.add(body);
    var skin = new THREE.MeshStandardMaterial({ color: cfg.skin, map: skinTexture(cfg.skin), roughness: 0.72 });
    if (skin.map) skin.color.set(0xffffff);
    var dark = new THREE.Color(cfg.skin).multiplyScalar(0.82), skinDark = std(dark.getHex(), 0.6);
    var shirt = std(cfg.shirt, 0.9), outer = std(cfg.jacket || cfg.vest || cfg.shirt, 0.85), pants = std(cfg.pants, 0.9), shoes = std(cfg.shoes, 0.55, 0.05), hair = std(cfg.hair, 0.7);
    var sleeveMat = cfg.jacket ? std(cfg.jacket, 0.85) : shirt;
    var female = !!cfg.female, stout = cfg.build === 'stout', slim = cfg.build === 'slim';
    var W = (female ? 0.98 : 1.14) * (slim ? 0.95 : 1), belly = stout ? 0.05 : 0;            // Schulterbreite / Bauch
    var HIP = 0.92;                                                     // Hüfthöhe

    // ----- Rumpf: Haut (darunter) und Oberteil -----
    var prof = [[0.001, 0], [0.155, 0.02], [0.158 + belly * 0.4, 0.12], [0.145 + belly, 0.24], [0.16 + belly * 0.7, 0.36], [0.182, 0.47], [0.172, 0.55], [0.085, 0.60], [0.05, 0.63]];
    if (female) prof = [[0.001, 0], [0.17, 0.02], [0.165, 0.12], [0.135, 0.24], [0.15, 0.36], [0.17, 0.46], [0.16, 0.54], [0.08, 0.59], [0.05, 0.62]];
    var torsoSkin = lathe(prof, skin, W, 0.72); at(torsoSkin, 0, HIP, 0); body.add(torsoSkin);
    var topMat = (cfg.jacket && !cfg.hoodie) ? outer : shirt;
    var top = lathe(prof.map(function (p) { return [p[0] * 1.045, p[1] * 1.005]; }), topMat, W, 0.72); at(top, 0, HIP - 0.005, 0); body.add(top);
    if (cfg.jacket) {   // Hemd im Sakko-Ausschnitt und Revers
      var v = sh(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.02), shirt)); at(v, 0, HIP + 0.4, 0.128 * (belly ? 1.1 : 1)); body.add(v);
      [-1, 1].forEach(function (s) { var l = sh(new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.02), outer)); at(l, s * 0.06, HIP + 0.4, 0.14); l.rotation.z = -s * 0.28; body.add(l); });
      for (var b = 0; b < 2; b++) { var bt = ball(0.008, std(0x222222, 0.4, 0.4), 8, 6); at(bt, 0.0, HIP + 0.3 - b * 0.1, 0.152); body.add(bt); }
    } else if (!cfg.hoodie) {   // Hemd: Knopfleiste
      for (var k = 0; k < 4; k++) { var kn = ball(0.007, std(0xf5f5f5, 0.4), 8, 6); at(kn, 0, HIP + 0.5 - k * 0.1, 0.134 * (stout ? 1.15 : 1)); body.add(kn); }
    }
    if (cfg.vest && !cfg.jacket) { var vest = lathe(prof.map(function (p) { return [p[0] * 1.06, p[1]]; }), outer, W, 0.74); at(vest, 0, HIP - 0.008, 0); vest.scale.y = 0.86; body.add(vest); }
    if (cfg.hoodie) {   // Kapuze im Nacken, Tasche, Kordeln
      var cowl = sh(new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.03, 10, 22), shirt)); cowl.rotation.x = Math.PI / 2; at(cowl, 0, HIP + 0.6, 0.0); body.add(cowl);
      var hoodBack = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 10), shirt), 1.1, 0.7, 0.8)); at(hoodBack, 0, HIP + 0.59, -0.06); body.add(hoodBack);
      var pocket = sh(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.09, 0.02), shirt)); at(pocket, 0, HIP + 0.2, 0.125); body.add(pocket);
      [-1, 1].forEach(function (s) { var cd = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.14, 6), std(0xf5f5f5, 0.6))); at(cd, s * 0.028, HIP + 0.46, 0.15); body.add(cd); });
    }
    if (cfg.belt) { var belt = sh(new THREE.Mesh(new THREE.TorusGeometry(0.145 + belly * 0.8, 0.012, 6, 28), std(0x2a1d14, 0.5))); belt.rotation.x = Math.PI / 2; at(belt, 0, HIP + 0.02, 0); sc(belt, W, 0.78, 1); belt.position.y = HIP + 0.05; body.add(belt); var buckle = sh(new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.025, 0.006), std(0xc8b060, 0.3, 0.8))); at(buckle, 0, HIP + 0.05, 0.16 + belly * 0.5); body.add(buckle); }
    if (cfg.tie) {
      var tieM = std(cfg.tie, 0.6);
      var knot = sh(new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.03, 0.03), tieM)); at(knot, 0, HIP + 0.56, 0.115); body.add(knot);
      var tb = sh(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.012), tieM)); at(tb, 0, HIP + 0.43, 0.138 * (belly ? 1.1 : 1)); tb.rotation.x = -0.05; body.add(tb);
    }
    if (cfg.apron) { var am = std(cfg.apron, 0.9); var bib = sh(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.014), am)); at(bib, 0, HIP + 0.4, 0.138); body.add(bib); var skirtA = sh(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.36, 0.014), am)); at(skirtA, 0, HIP - 0.04, 0.152); skirtA.rotation.x = 0.05; body.add(skirtA); [-1, 1].forEach(function (sg) { var str = sh(new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.2, 0.01), am)); at(str, sg * 0.08, HIP + 0.55, 0.11); str.rotation.z = -sg * 0.15; body.add(str); }); }
    if (cfg.lanyard) { var ln = sh(new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.4, 0.008), std(0xf87845, 0.7))); at(ln, 0, HIP + 0.4, 0.137); body.add(ln); var bd = sh(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.008), std(0xffffff, 0.5))); at(bd, 0, HIP + 0.2, 0.14); body.add(bd); }

    // Stofffalten an der Taille und spitze Hemdkragen bleiben nah an der Silhouette.
    [-1, 1].forEach(function (s) {
      for (var fold = 0; fold < 2; fold++) {
        var crease = sh(sc(ball(0.036, topMat, 10, 6), 1.5, 0.10, 0.22));
        at(crease, s * 0.09, HIP + 0.12 + fold * 0.07, 0.106 + belly * 0.4); crease.rotation.z = s * 0.2; body.add(crease);
      }
      if (!cfg.hoodie) {
        var collarTip = sh(new THREE.Mesh(new THREE.ConeGeometry(0.033, 0.068, 3), shirt));
        collarTip.scale.z = 0.24; collarTip.rotation.z = Math.PI + s * 0.35;
        at(collarTip, s * 0.043, 1.492, 0.087); body.add(collarTip);
      }
    });

    // ----- Hüfte / Hose / Rock -----
    if (cfg.skirt) { var sk = lathe([[0.15, 0.0], [0.19, -0.2], [0.2, -0.26], [0.001, -0.26]], pants, W * 0.98, 0.8); at(sk, 0, HIP + 0.02, 0); body.add(sk); }
    else { var hips = lathe([[0.001, -0.06], [0.165, -0.04], [0.17, 0.05], [0.158, 0.11], [0.001, 0.13]], pants, W * 1.02, 0.78); at(hips, 0, HIP, 0); body.add(hips); }

    // ----- Hals und Kragen -----
    var neck = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.041, 0.054, 0.115, 16), skin)); at(neck, 0, 1.53, 0.006); body.add(neck);
    if (!cfg.hoodie) { var collar = sh(new THREE.Mesh(new THREE.TorusGeometry(0.058, 0.014, 8, 20), shirt)); collar.rotation.x = Math.PI / 2; at(collar, 0, 1.505, 0.006); body.add(collar); }

    // ----- Kopf -----
    var head = new THREE.Group(); head.position.set(0, 1.69, 0.01); body.add(head);
    var skull = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.108, 36, 26), skin), 0.96, 1.14, 1.0)); head.add(skull);
    var jaw = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 16), skin), 0.93, 0.78, 0.94)); at(jaw, 0, -0.058, 0.028); head.add(jaw);
    // Ohren
    [-1, 1].forEach(function (s) { var ear = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 10), skin), 0.52, 1.12, 0.8)); at(ear, s * 0.1, 0.0, -0.005); head.add(ear); var inner = sc(new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), skinDark), 0.42, 0.8, 0.55); at(inner, s * 0.104, 0.0, 0.0); head.add(inner); var tragus = sh(sc(ball(0.008, skin, 8, 6), 0.7, 1, 0.8)); at(tragus, s * 0.108, -0.008, 0.011); head.add(tragus); });
    // Nase
    var nose = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.017, 12, 10), skin), 0.9, 1.5, 1.4)); at(nose, 0, -0.008, 0.106); nose.rotation.x = 0.3; head.add(nose);
    var tip = ball(0.013, skin, 10, 8); at(tip, 0, -0.03, 0.118); head.add(tip);
    [-1, 1].forEach(function (s) { var nw = ball(0.008, skin, 8, 6); at(nw, s * 0.012, -0.033, 0.108); head.add(nw); });
    // Augen mit Lidern
    var eyeWhite = std(0xf6f4ee, 0.25), iris = std(cfg.eye || 0x4a6a8a, 0.3), pupilM = std(0x101010, 0.2);
    var lids = [], eyes = [], brows = [];
    var gleam = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [-1, 1].forEach(function (s) {
      var g = new THREE.Group(); at(g, s * 0.038, 0.02, 0.087); head.add(g);
      g.add(sc(ball(0.0155, eyeWhite, 16, 12), 1.05, 0.9, 0.9));
      var irisEdge = new THREE.Mesh(new THREE.CircleGeometry(0.0094, 16), pupilM); at(irisEdge, 0, 0, 0.014); g.add(irisEdge);
      var ir = new THREE.Mesh(new THREE.CircleGeometry(0.0085, 16), iris); at(ir, 0, 0, 0.0142); g.add(ir);
      var pu = new THREE.Mesh(new THREE.CircleGeometry(0.0038, 12), pupilM); at(pu, 0, 0, 0.0145); g.add(pu);
      var shine = new THREE.Mesh(new THREE.CircleGeometry(0.0025, 8), gleam); at(shine, -0.0025, 0.003, 0.0148); g.add(shine);
      var rim = sh(sc(ball(0.016, skinDark, 14, 8), 1.12, 0.22, 0.45)); at(rim, 0, -0.011, 0.002); g.add(rim);
      var lidPivot = new THREE.Group(); lidPivot.position.set(0, 0.002, 0); g.add(lidPivot);
      var lid = sh(new THREE.Mesh(new THREE.SphereGeometry(0.0166, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), skin)); lid.rotation.x = Math.PI / 2; lidPivot.add(lid);
      lidPivot.rotation.x = -1.8;           // offen
      lids.push(lidPivot); eyes.push(g);
      var brow = sh(new THREE.Mesh(new THREE.CapsuleGeometry(0.0035, 0.031, 4, 8), hair)); brow.rotation.z = Math.PI / 2 + s * -0.12; at(brow, s * 0.038, 0.048, 0.096); head.add(brow); brows.push(brow);
      if (cfg.glasses) { var gl = new THREE.Mesh(new THREE.TorusGeometry(0.029, 0.0028, 6, 20), std(0x1a1a1a, 0.35, 0.3)); at(gl, s * 0.038, 0.02, 0.108); head.add(gl); var lens = new THREE.Mesh(new THREE.CircleGeometry(0.028, 16), new THREE.MeshStandardMaterial({ color: 0xcfe6f5, transparent: true, opacity: 0.16, roughness: 0.05 })); at(lens, s * 0.038, 0.02, 0.1085); head.add(lens); var arm = sh(new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.003, 0.1), std(0x1a1a1a, 0.35))); at(arm, s * 0.098, 0.02, 0.05); head.add(arm); }
    });
    if (cfg.glasses) { var br = sh(new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.003, 0.003), std(0x1a1a1a, 0.35))); at(br, 0, 0.026, 0.108); head.add(br); }
    // Mund: Lippen + dunkler Mundraum (Öffnung beim Sprechen)
    var lipMat = std(new THREE.Color(cfg.skin).lerp(new THREE.Color(female ? 0xb8505a : 0xa85a52), 0.55).getHex(), 0.5);
    var mouth = new THREE.Group(); at(mouth, 0, -0.058, 0.098); head.add(mouth);
    var inside = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.02, 0.008), std(0x3a1414, 0.7)); inside.scale.y = 0.05; mouth.add(inside);
    var upper = sh(new THREE.Mesh(new THREE.CapsuleGeometry(0.0035, 0.028, 4, 8), lipMat)); upper.rotation.z = Math.PI / 2; at(upper, 0, 0.004, 0.004); mouth.add(upper);
    var lower = sh(new THREE.Mesh(new THREE.CapsuleGeometry(0.0045, 0.028, 4, 8), lipMat)); lower.rotation.z = Math.PI / 2; at(lower, 0, -0.008, 0.004); mouth.add(lower);
    if (cfg.mustache) { var mu = sh(sc(new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.05, 4, 8), hair), 1, 1, 1)); mu.rotation.z = Math.PI / 2; at(mu, 0, -0.038, 0.108); head.add(mu); }
    if (cfg.beard) { var bd2 = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.07, 18, 12, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.5), hair), 1.0, 0.9, 1.0)); at(bd2, 0, -0.03, 0.03); head.add(bd2); }

    // Kleine Nasenlöcher und weiche Wangen statt harter Gesichtskanten.
    [-1, 1].forEach(function (s) {
      var nostril = sc(ball(0.004, skinDark, 8, 6), 1, 0.5, 0.7); at(nostril, s * 0.01, -0.037, 0.118); head.add(nostril);
      var cheek = sh(sc(ball(0.031, skin, 16, 10), 1, 0.72, 0.42)); at(cheek, s * 0.055, -0.025, 0.081); head.add(cheek);
    });

    // ----- Haare -----
    var style = cfg.hairStyle;
    function cap(r, y, z, tilt) { var c = sh(new THREE.Mesh(new THREE.SphereGeometry(r, 30, 20, 0, Math.PI * 2, 0, Math.PI * 0.58), hair)); at(c, 0, y, z); c.rotation.x = tilt === undefined ? -0.85 : tilt; sc(c, 0.95, 1.07, 1.02); return c; }
    if (style === 'short') { head.add(cap(0.113, 0.006, -0.004)); for (var f = 0; f < 5; f++) { var fr = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 6), hair), 1.3, 0.8, 0.7)); at(fr, -0.05 + f * 0.025, 0.088, 0.088); head.add(fr); } [-1, 1].forEach(function (s) { var sb = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), hair), 0.6, 1.2, 1.1)); at(sb, s * 0.098, 0.03, 0.0); head.add(sb); }); }
    if (style === 'slick') { head.add(cap(0.114, 0.008, -0.006, -0.95)); var part = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), hair), 1.4, 0.55, 0.9)); at(part, 0.02, 0.085, 0.045); head.add(part); [-1, 1].forEach(function (s) { var sb = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), hair), 0.55, 1.2, 1.2)); at(sb, s * 0.099, 0.025, -0.008); head.add(sb); }); }
    if (style === 'bun') { head.add(cap(0.114, 0.008, -0.008)); var bun = ball(0.05, hair, 14, 10); at(bun, 0, 0.115, -0.07); head.add(bun); }
    if (style === 'bob') { head.add(cap(0.115, 0.006, -0.006, -0.8)); [-1, 1].forEach(function (s) { var cu = sh(sc(new THREE.Mesh(new THREE.CapsuleGeometry(0.038, 0.11, 6, 12), hair), 0.7, 1, 0.9)); at(cu, s * 0.09, -0.045, 0.0); head.add(cu); }); var back = sh(sc(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.09, 6, 14), hair), 1, 1, 0.7)); at(back, 0, -0.04, -0.045); head.add(back); var fr2 = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), hair), 1.5, 0.5, 0.8)); at(fr2, 0.0, 0.086, 0.078); head.add(fr2); }
    if (style === 'ponytail') { head.add(cap(0.114, 0.008, -0.006, -0.9)); var pt = sh(new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.15, 6, 10), hair)); at(pt, 0, -0.02, -0.13); pt.rotation.x = -0.45; head.add(pt); var band = sh(new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.007, 6, 12), std(0xd04a4a, 0.5))); at(band, 0, 0.03, -0.11); band.rotation.x = 0.5; head.add(band); }
    if (style === 'bald') { [-1, 1].forEach(function (s) { var sb = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), hair), 0.55, 1.1, 1.3)); at(sb, s * 0.096, 0.012, -0.01); head.add(sb); }); var back2 = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 8, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.3), hair), 1.0, 1.0, 1.0)); at(back2, 0, 0.0, -0.035); head.add(back2); }
    if (style === 'beanie') {
      var bc = std(cfg.beanie || 0xf87845, 0.95);
      var hat = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.118, 26, 18, 0, Math.PI * 2, 0, Math.PI * 0.58), bc), 0.98, 1.05, 1.05)); at(hat, 0, 0.008, -0.004); hat.rotation.x = -0.85; head.add(hat);
      var fold = sh(new THREE.Mesh(new THREE.TorusGeometry(0.113, 0.017, 8, 28), bc)); fold.rotation.x = Math.PI / 2; at(fold, 0, -0.03, 0); hat.add(fold);
      var pom = ball(0.02, std(0xfffdf7, 1), 10, 8); at(pom, 0, 0.125, -0.02); head.add(pom);
      [-1, 1].forEach(function (s) { var sb = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), hair), 0.6, 1.2, 1.1)); at(sb, s * 0.098, 0.0, 0.0); head.add(sb); });
      var fringe = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), hair), 1.3, 0.4, 0.6)); at(fringe, 0, 0.066, 0.084); head.add(fringe);
    }
    // Flache, überlappende Strähnen folgen der Kopfkrümmung; keine einzelnen Haar-Meshes.
    if (style !== 'bald' && style !== 'beanie') {
      var hairLight = std(new THREE.Color(cfg.hair).lerp(new THREE.Color(0xb9a18b), 0.14).getHex(), 0.8);
      for (var strand = 0; strand < 7; strand++) {
        var sx = (strand - 3) * 0.023;
        var lock = sh(sc(ball(0.035, strand % 3 === 0 ? hairLight : hair, 12, 8), 0.44, 0.42, 1.85));
        at(lock, sx, 0.113 - Math.abs(sx) * 0.35, 0.009); lock.rotation.z = -0.2; lock.rotation.x = -0.22; head.add(lock);
      }
    }
    if (cfg.headset) { var band2 = sh(new THREE.Mesh(new THREE.TorusGeometry(0.118, 0.005, 6, 22, Math.PI), std(0x1c1c1c, 0.4))); band2.rotation.z = 0; at(band2, 0, 0.012, 0); head.add(band2); [-1, 1].forEach(function (s) { var cup = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.022, 14), std(0x1c1c1c, 0.4))); cup.rotation.z = Math.PI / 2; at(cup, s * 0.116, 0.0, 0.0); head.add(cup); }); var mic = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.09, 6), std(0x1c1c1c, 0.4))); mic.rotation.set(0.9, 0, 1.4); at(mic, 0.09, -0.04, 0.05); head.add(mic); var micTip = ball(0.007, std(0x1c1c1c, 0.4), 8, 6); at(micTip, 0.045, -0.062, 0.085); head.add(micTip); }

    // ----- Arme -----
    var upperLen = 0.30, foreLen = 0.26;
    var arms = [-1, 1].map(function (s) {
      var pivot = new THREE.Group(); pivot.position.set(s * (female ? 0.18 : 0.215) * (slim ? 0.95 : 1), 1.46, 0); body.add(pivot);
      pivot.add(sh(ball(0.06, sleeveMat, 12, 10)));                                              // Schulterkappe
      var upper = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.045, upperLen, 14), sleeveMat)); at(upper, 0, -upperLen / 2, 0); pivot.add(upper);
      var elbow = new THREE.Group(); elbow.position.y = -upperLen; pivot.add(elbow);
      elbow.add(sh(ball(0.047, sleeveMat, 10, 8)));
      var fore = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.036, foreLen, 14), sleeveMat)); at(fore, 0, -foreLen / 2, 0); elbow.add(fore);
      var cuff = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.03, 12), cfg.jacket ? shirt : sleeveMat)); at(cuff, 0, -foreLen + 0.006, 0); elbow.add(cuff);
      var cuffButton = sh(ball(0.005, cfg.jacket ? outer : shirt, 8, 6)); at(cuffButton, s * 0.036, -foreLen + 0.006, 0.015); elbow.add(cuffButton);
      var wrist = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 10), skin)); at(wrist, 0, -foreLen - 0.014, 0); elbow.add(wrist);
      var hand = new THREE.Group(); hand.position.y = -foreLen - 0.03; elbow.add(hand);
      hand.add(sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.036, 12, 10), skin), 0.85, 1.05, 0.55)));   // Handfläche
      for (var fi = 0; fi < 4; fi++) { var fg = sh(new THREE.Mesh(new THREE.CapsuleGeometry(0.007, 0.032 - Math.abs(fi - 1.4) * 0.006, 3, 6), skin)); at(fg, (fi - 1.5) * 0.015, -0.045, 0.006); fg.rotation.x = 0.27 + Math.abs(fi - 1.4) * 0.08; hand.add(fg); }
      var th = sh(new THREE.Mesh(new THREE.CapsuleGeometry(0.0105, 0.035, 3, 6), skin)); at(th, s * -0.029, -0.014, 0.016); th.rotation.z = s * -0.6; th.rotation.x = 0.3; hand.add(th);
      return { pivot: pivot, elbow: elbow, hand: hand, side: s };
    });

    // ----- Beine -----
    var thighLen = 0.43, shinLen = 0.42;
    var legs = [-1, 1].map(function (s) {
      var hip = new THREE.Group(); hip.position.set(s * 0.085, HIP - 0.01, 0); body.add(hip);
      var thighTop = cfg.skirt ? skin : pants;
      var thigh = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.083, 0.062, thighLen, 16), thighTop)); at(thigh, 0, -thighLen / 2, 0); hip.add(thigh);
      var knee = new THREE.Group(); knee.position.y = -thighLen; hip.add(knee);
      knee.add(sh(ball(0.06, thighTop, 10, 8)));
      var shin = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.045, shinLen, 14), cfg.skirt ? skin : pants)); at(shin, 0, -shinLen / 2, 0); knee.add(shin);
      if (!cfg.skirt) { var hem = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.049, 0.03, 12), pants)); at(hem, 0, -shinLen + 0.03, 0); knee.add(hem); }
      var foot = new THREE.Group(); foot.position.set(0, -shinLen - 0.005, 0.0); knee.add(foot);
      var shoe = sh(sc(new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 10), shoes), 0.95, 0.62, 2.0)); at(shoe, 0, -0.01, 0.055); foot.add(shoe);
      var sole = sh(sc(ball(0.06, std(0x202126, 0.9), 16, 8), 0.79, 0.16, 1.94)); at(sole, 0, -0.042, 0.048); foot.add(sole);
      var tongue = sh(sc(ball(0.028, shoes, 10, 8), 1, 0.35, 1.3)); at(tongue, 0, 0.018, 0.055); foot.add(tongue);
      var laceMat = std(cfg.jacket ? 0x35302c : 0xded8c9, 0.85);
      for (var li = 0; li < 3; li++) {
        var lace = sh(new THREE.Mesh(new THREE.BoxGeometry(0.037, 0.003, 0.004), laceMat)); at(lace, 0, 0.028 - li * 0.003, 0.036 + li * 0.014); foot.add(lace);
      }
      return { hip: hip, knee: knee, foot: foot, side: s };
    });

    root.scale.setScalar(scale);
    var pose = 'stand', talking = false, ud = root.userData, blinkT = 1 + Math.random() * 3, blink = 0, look = { x: 0, y: 0, tx: 0, ty: 0 }, walkAmt = 0;
    function eyesLook(x, y) { eyes.forEach(function (g) { g.rotation.y = x; g.rotation.x = -y; }); }
    ud.walk = function (phase, amount) {
      if (pose === 'sit') return;
      var a = Math.max(0, Math.min(1, amount || 0)); walkAmt = a;
      legs.forEach(function (l, i) { var ph = phase + (i ? Math.PI : 0); l.hip.rotation.x = Math.sin(ph) * 0.38 * a; l.knee.rotation.x = Math.pow(Math.max(0, -Math.cos(ph)), 2) * 0.85 * a; l.foot.rotation.x = -l.hip.rotation.x - l.knee.rotation.x + Math.max(0, -Math.cos(ph)) * 0.12 * a; });
      arms.forEach(function (ar, i) { var ph = phase + (i ? 0 : Math.PI); ar.pivot.rotation.x = Math.sin(ph) * 0.32 * a; ar.elbow.rotation.x = -0.22 * a - (a > 0.01 ? 0.12 : 0) - Math.max(0, Math.sin(ph)) * 0.35 * a; });
      // Beckenhöhe folgt der Streckung des Standbeins; die Sohle bleibt am Boden.
      body.position.y = (thighLen + shinLen + 0.005) * (Math.cos(Math.sin(phase) * 0.38 * a) - 1);
      body.position.x = Math.cos(phase) * 0.018 * a;
      body.rotation.z = -Math.cos(phase) * 0.022 * a;
      body.rotation.y = Math.sin(phase) * 0.055 * a;
    };
    ud.idle = function (t, dt) {
      dt = dt || 0.016;
      var breath = Math.sin(t * 1.9);
      top.scale.x = W * (1 + breath * 0.008); torsoSkin.scale.x = W * (1 + breath * 0.008);
      if (pose === 'wave') { arms[1].pivot.rotation.z = -2.4 + Math.sin(t * 8) * 0.2; arms[1].elbow.rotation.z = -0.5 + Math.sin(t * 8) * 0.3; arms[1].pivot.rotation.x = 0; }
      else if (pose === 'stand' && walkAmt < 0.05) { arms.forEach(function (a, i) { a.pivot.rotation.z = a.side * (0.05 + breath * 0.01); a.elbow.rotation.x = -0.1 - (talking ? 0.5 + Math.sin(t * 5 + i) * 0.3 : 0); a.pivot.rotation.x = talking ? -0.35 - Math.sin(t * 4 + i * 2) * 0.15 : 0; }); }
      // Blinzeln
      blinkT -= dt; if (blinkT <= 0) { blink = 1; blinkT = 2.5 + Math.random() * 3.5; }
      if (blink > 0) { blink -= dt * 8; var c = Math.max(0, Math.sin(Math.max(0, blink) * Math.PI)); lids.forEach(function (l) { l.rotation.x = -1.8 + c * 1.65; }); } else lids.forEach(function (l) { l.rotation.x = -1.8; });
      // Kopf und Blick: folgt einem Ziel (Spieler), sonst leichtes Umherschauen
      look.x += (look.tx - look.x) * Math.min(1, dt * 4); look.y += (look.ty - look.y) * Math.min(1, dt * 4);
      var idleX = look.tx === 0 && look.ty === 0 ? Math.sin(t * 0.5) * 0.22 : 0, idleY = look.tx === 0 && look.ty === 0 ? Math.sin(t * 0.37) * 0.04 : 0;
      head.rotation.y = (look.x + idleX) * 0.75; head.rotation.x = (look.y + idleY) * 0.6;
      eyesLook((look.x + idleX) * 0.25, (look.y + idleY) * 0.25);
      brows.forEach(function (b, i) { b.position.y = 0.048 + (talking ? Math.sin(t * 3 + i * 0.4) * 0.003 : 0); });
      // Mund: beim Sprechen öffnen und schließen
      var open = talking ? (0.25 + 0.75 * Math.abs(Math.sin(t * 9))) : 0;
      inside.scale.y = 0.05 + open * 0.9; lower.position.y = -0.008 - open * 0.012; upper.position.y = 0.004 + open * 0.002;
    };
    // Blickziel in Weltkoordinaten (x, z); strength 0 löscht das Ziel
    ud.lookAt = function (wx, wz, strength) {
      if (!strength) { look.tx = 0; look.ty = 0; return; }
      var inv = new THREE.Vector3(wx, 1.4, wz); root.worldToLocal(inv);
      var yaw = Math.atan2(inv.x, inv.z); yaw = Math.max(-1.1, Math.min(1.1, yaw));
      look.tx = yaw * strength; look.ty = 0.02;
    };
    ud.talk = function (on) { talking = !!on; };
    ud.setPose = function (p) {
      pose = p; walkAmt = 0; body.position.set(0, 0, 0); body.rotation.set(0, 0, 0);
      legs.forEach(function (l) { l.hip.rotation.x = 0; l.knee.rotation.x = 0; l.foot.rotation.x = 0; });
      arms.forEach(function (a) { a.pivot.rotation.set(0, 0, 0); a.elbow.rotation.set(0, 0, 0); });
      if (p === 'sit') {
        body.position.y = -0.4;
        legs.forEach(function (l) { l.hip.rotation.x = -Math.PI / 2 + 0.05; l.knee.rotation.x = Math.PI / 2 - 0.05; l.foot.rotation.x = -0.1; });
        arms.forEach(function (a) { a.pivot.rotation.x = -0.65; a.elbow.rotation.x = -1.0; });
      }
    };
    ud.pose = function () { return pose; };
    return root;
  }

  window.Humans = {
    PRESETS: PRESETS,
    preset: function (name) { var p = PRESETS[name]; if (!p) throw new Error('Unbekannte Figur: ' + name + ' (verfügbar: ' + Object.keys(PRESETS).join(', ') + ')'); return p; },
    create: create
  };
})();

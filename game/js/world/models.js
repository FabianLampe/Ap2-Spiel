// Echte 3D-Figuren (Quaternius, CC0) mit Skelett und Animationen. Ersetzt Humans.create, sobald die Modelle geladen sind.
// Kleidung wird auf den Körper gefärbt: Jeder Punkt gehört zu einer Körperzone (über den stärksten Knochen),
// die Zone bekommt Haut-, Oberteil-, Hosen- oder Schuhfarbe. Frisuren, Bart, Brille und Krawatte hängen am Kopf bzw. an der Brust.
// Aussehen (cfg): skin, hair, hairStyle ('short'|'slick'|'bun'|'ponytail'|'bob'|'long'|'curly'|'beanie'|'bald'), female, height,
//   build ('slim'|'normal'|'stout'), shirt, sleeves (0 Träger, 1 kurz, 2 lang), pants, shorts, skirt, shoes, sole,
//   jacket, vest, hoodie, apron, belt, tie, lanyard, glasses, beard/mustache, beanie (Mützenfarbe)
// Schnittstelle wie in humans.js: userData.walk(phase, amount), idle(t, dt), setPose('stand'|'sit'), lookAt(x, z, s), talk(on), pose()
(function () {
  if (!window.THREE || !THREE.GLTFLoader || !window.MODEL_DATA) return;

  // Zonen: 0 Haut, 1 Rumpf, 2 Oberarm, 3 Unterarm, 4 Becken, 5 Oberschenkel, 6 Unterschenkel, 7 Fuß
  function zoneOf(name) {
    if (/^(spine|clavicle)/.test(name)) return 1;
    if (/^upperarm/.test(name)) return 2;
    if (/^lowerarm/.test(name)) return 3;
    if (/^(pelvis|root)$/.test(name)) return 4;
    if (/^thigh/.test(name)) return 5;
    if (/^calf/.test(name)) return 6;
    if (/^(foot|ball)/.test(name)) return 7;
    return 0;
  }
  var HAIR = {
    f: { curly: 'Hair_Long', afro: 'Hair_Buns', ponytail: 'Hair_Buns', bun: 'Hair_Buns', manbun: 'Hair_Buns', bob: 'Hair_Long', long: 'Hair_Long', short: 'Hair_BuzzedFemale', quiff: 'Hair_BuzzedFemale', buzz: 'Hair_BuzzedFemale', slick: 'Hair_Buns', beanie: 'Hair_BuzzedFemale', bald: null },
    m: { curly: 'Hair_SimpleParted', afro: 'Hair_Buzzed', short: 'Hair_SimpleParted', quiff: 'Hair_SimpleParted', slick: 'Hair_SimpleParted', long: 'Hair_SimpleParted', bob: 'Hair_SimpleParted', ponytail: 'Hair_SimpleParted', bun: 'Hair_Buzzed', manbun: 'Hair_SimpleParted', beanie: 'Hair_Buzzed', buzz: 'Hair_Buzzed', bald: null }
  };
  var SKIN_REF = new THREE.Color(0.86, 0.62, 0.50).convertSRGBToLinear();
  function lin(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }   // mittlerer Hautton der Textur (linear), dient zum Einfärben
  var T = {}, CLIPS = {}, ready = false;

  function b64(s) { var bin = atob(s), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; }
  function parse(key) { return new Promise(function (res, rej) { new THREE.GLTFLoader().parse(b64(MODEL_DATA[key]), '', res, rej); }); }

  function prepare(g) {
    var sc = g.scene, t = { scene: sc, hairs: {}, height: 0 };
    sc.updateMatrixWorld(true);
    sc.traverse(function (o) {
      if (o.isSkinnedMesh && /Superhero/i.test(o.material.name)) t.bodyName = o.name;
      if (o.isBone && o.name === 'Head') t.head = o;
      if (o.isBone && o.name === 'spine_03') t.chest = o;
      if (o.isBone && o.name === 'pelvis') t.pelvis = o;
    });
    var body = sc.getObjectByName(t.bodyName), geo = body.geometry, si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight, bones = body.skeleton.bones;
    var zone = new Float32Array(si.count);
    for (var i = 0; i < si.count; i++) {
      var ws = [sw.getX(i), sw.getY(i), sw.getZ(i), sw.getW(i)], is = [si.getX(i), si.getY(i), si.getZ(i), si.getW(i)], best = 0, bw = -1;
      for (var k = 0; k < 4; k++) if (ws[k] > bw) { bw = ws[k]; best = is[k]; }
      zone[i] = zoneOf(bones[best].name);
    }
    geo.setAttribute('aZone', new THREE.BufferAttribute(zone, 1));
    geo.computeBoundingBox(); t.height = geo.boundingBox.max.y;
    // Frisuren in den Raum des Kopfknochens umrechnen
    var invHead = t.head.matrixWorld.clone().invert(), rm = [];
    sc.children.slice().forEach(function (o) {
      if (o.isMesh && /^Hair_/.test(o.name)) { var hg = o.geometry.clone().applyMatrix4(o.matrixWorld).applyMatrix4(invHead); t.hairs[o.name] = { geo: hg, map: o.material.map }; rm.push(o); }
    });
    rm.forEach(function (o) { o.parent.remove(o); });
    t.invHead = invHead; t.invChest = t.chest.matrixWorld.clone().invert(); t.invPelvis = t.pelvis.matrixWorld.clone().invert(); t.bodyGeo = geo;
    t.pelvisLen = t.pelvis.position.length();
    // Saumhöhen und Ärmellängen aus der Ruhepose (Modellkoordinaten)
    function wp(n) { var v = new THREE.Vector3(); sc.getObjectByName(n).getWorldPosition(v); return v; }
    var sh = wp('upperarm_l'), el = wp('lowerarm_l'), ha = wp('hand_l'), knee = wp('calf_l'), hip = wp('thigh_l');
    t.cut = { waist: t.pelvis.getWorldPosition(new THREE.Vector3()).y + 0.1, neck: wp('neck_01').y - 0.02, ankle: wp('foot_l').y + 0.03,
      shorts: knee.y + (hip.y - knee.y) * 0.3, tank: Math.abs(sh.x) + 0.02, short: Math.abs(sh.x) + (Math.abs(el.x) - Math.abs(sh.x)) * 0.45, long: Math.abs(ha.x) - 0.02 };
    return t;
  }

  // Animationsclips pro Geschlecht: Beckenhöhe an die Figur anpassen
  function clipsFor(t, anim) {
    var ap = null; anim.scene.traverse(function (o) { if (o.name === 'pelvis') ap = o; });
    var ratio = ap ? t.pelvisLen / ap.position.length() : 1, out = {};
    anim.animations.forEach(function (c) {
      var cl = c.clone();
      cl.tracks.forEach(function (tr) { if (/^pelvis\.position$/.test(tr.name)) for (var i = 0; i < tr.values.length; i++) tr.values[i] *= ratio; });
      out[c.name] = cl;
    });
    return out;
  }

  function bodyMaterial(src, cfg) {
    var m = new THREE.MeshStandardMaterial({ map: src.map, roughness: 0.62, metalness: 0 });
    var skin = lin(cfg.skin), tint = new THREE.Color(skin.r / SKIN_REF.r, skin.g / SKIN_REF.g, skin.b / SKIN_REF.b);
    var sleeves = cfg.sleeves !== undefined ? cfg.sleeves : (cfg.jacket || cfg.hoodie || cfg.vest || cfg.tie ? 2 : 1), legs = cfg.shorts || cfg.skirt ? 1 : 2;
    var u = {
      uTint: { value: tint }, uTop: { value: lin(cfg.jacket || cfg.vest || cfg.shirt) }, uArm: { value: lin(cfg.jacket || cfg.shirt) }, uBottom: { value: lin(cfg.pants) },
      uShoes: { value: lin(cfg.shoes) },
      uSleeveX: { value: [T[cfg.female ? 'f' : 'm'].cut.tank, T[cfg.female ? 'f' : 'm'].cut.short, T[cfg.female ? 'f' : 'm'].cut.long][sleeves] },
      uLegY: { value: legs === 1 ? T[cfg.female ? 'f' : 'm'].cut.shorts : T[cfg.female ? 'f' : 'm'].cut.ankle },
      uCut: { value: new THREE.Vector3(T[cfg.female ? 'f' : 'm'].cut.waist, T[cfg.female ? 'f' : 'm'].cut.neck, T[cfg.female ? 'f' : 'm'].cut.ankle) }
    };
    m.onBeforeCompile = function (s) {
      Object.assign(s.uniforms, u);
      s.vertexShader = 'attribute float aZone;\nflat varying float vZone;\nvarying vec3 vBind;\n' + s.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvZone = aZone; vBind = position;');
      s.fragmentShader = 'flat varying float vZone;\nvarying vec3 vBind;\nuniform vec3 uTint, uTop, uArm, uBottom, uShoes, uCut;\nuniform float uSleeveX, uLegY;\n' + s.fragmentShader.replace('#include <map_fragment>', [
        '#include <map_fragment>',
        'float z = floor(vZone + 0.5);',
        'vec3 cloth = vec3(-1.0);',
        'float ax = abs(vBind.x), y = vBind.y;',
        'bool body = z >= 1.0 && z <= 6.0;',
        'if (body && y >= uCut.x && y < (ax < 0.15 ? uCut.y - 0.025 + pow(ax / 0.15, 2.0) * 0.07 : uCut.y + 0.3) && ax < uSleeveX) cloth = z >= 2.0 && z <= 3.0 ? uArm : uTop;',
        'if (body && y < uCut.x && y > uLegY && ax < 0.3) cloth = uBottom;',
        'if ((z == 7.0 || z == 6.0) && y < uCut.z) cloth = uShoes;',
        'if (cloth.x >= 0.0) { float l = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11)); diffuseColor.rgb = cloth * (0.9 + 0.1 * clamp(l * 2.0, 0.0, 1.0)); }',
        'else diffuseColor.rgb *= uTint;'
      ].join('\n'));
    };
    m.customProgramCacheKey = function () { return 'rr-body'; };
    return m;
  }
  function hairMaterial(map, color) {
    var m = new THREE.MeshStandardMaterial({ map: map, roughness: 0.75, side: THREE.DoubleSide });
    var u = { uHair: { value: lin(color) } };
    m.onBeforeCompile = function (s) {
      s.uniforms.uHair = u.uHair;
      s.fragmentShader = 'uniform vec3 uHair;\n' + s.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\nfloat hl = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));\ndiffuseColor.rgb = uHair * (0.45 + hl * 2.2);');
    };
    m.customProgramCacheKey = function () { return 'rr-hair'; };
    return m;
  }
  function std(c, r) { return new THREE.MeshStandardMaterial({ color: lin(c), roughness: r === undefined ? 0.6 : r }); }
  // Teil in Modellkoordinaten (Ruhepose) an einen Knochen hängen
  function attach(bone, inv, mesh) { mesh.applyMatrix4(inv); bone.add(mesh); mesh.castShadow = true; return mesh; }

  // ================= Körperbau =================
  // Die Ruhepose-Punkte werden entlang der Normalen verschoben: schlank = dünner, rundlich = Bauch und etwas mehr Umfang.
  var GEO = {};
  function bodyGeo(t, fem, build) {
    var key = (fem ? 'f' : 'm') + (build || 'normal'); if (GEO[key]) return GEO[key];
    var g = t.bodyGeo.clone(), p = g.attributes.position, n = g.attributes.normal, zn = g.attributes.aZone, belly = t.cut.waist + 0.03;
    for (var i = 0; i < p.count; i++) {
      var z = zn.getX(i); if (z < 1 || z > 6) continue;
      var off;
      if (build === 'slim') off = fem ? -0.004 : -0.009;
      else if (build === 'stout') {
        off = 0.006;
        if (z === 1 || z === 4) { var dy = (p.getY(i) - belly) / 0.2, gs = Math.exp(-dy * dy), nz = Math.max(0, n.getZ(i)); off += gs * (0.085 * Math.pow(nz, 1.6) + 0.012 * Math.abs(n.getX(i))); }
      } else off = fem ? 0 : -0.004;
      p.setXYZ(i, p.getX(i) + n.getX(i) * off, p.getY(i) + n.getY(i) * off, p.getZ(i) + n.getZ(i) * off);
    }
    g.computeBoundingBox();
    GEO[key] = g; return g;
  }
  // vorderste Körperstelle (z) in Höhe y, Mitte des Rumpfs
  function frontZ(geo, y, w) {
    var p = geo.attributes.position, zn = geo.attributes.aZone, best = 0;
    for (var i = 0; i < p.count; i++) { var z = zn.getX(i); if ((z === 1 || z === 4 || (w && z === 5)) && Math.abs(p.getX(i)) < (w || 0.05) && Math.abs(p.getY(i) - y) < 0.03 && p.getZ(i) > best) best = p.getZ(i); }
    return best;
  }

  // ================= Kleidung =================
  // Jedes Kleidungsstück ist eine Hülle um den Körper (gleiches Skelett), leicht nach außen versetzt.
  // Genaue Säume schneidet der Shader anhand der Ruhepose ab (verworfene Pixel), die Kanten werden etwas dunkler (Naht).
  var SHELL = {};
  function shellGeo(base, key, pred, thick) {
    key = base.uuid + '|' + key + '|' + thick; if (SHELL[key]) return SHELL[key];
    var p = base.attributes.position, n = base.attributes.normal, zn = base.attributes.aZone, ix = base.index.array;
    var pos = new Float32Array(p.count * 3), keep = new Uint8Array(p.count);
    for (var i = 0; i < p.count; i++) {
      pos[i * 3] = p.getX(i) + n.getX(i) * thick; pos[i * 3 + 1] = p.getY(i) + n.getY(i) * thick; pos[i * 3 + 2] = p.getZ(i) + n.getZ(i) * thick;
      keep[i] = pred(p.getX(i), p.getY(i), p.getZ(i), zn.getX(i)) ? 1 : 0;
    }
    var tri = [];
    for (var k = 0; k < ix.length; k += 3) if (keep[ix[k]] || keep[ix[k + 1]] || keep[ix[k + 2]]) tri.push(ix[k], ix[k + 1], ix[k + 2]);
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    ['normal', 'skinIndex', 'skinWeight', 'aZone'].forEach(function (a) { g.setAttribute(a, base.attributes[a]); });
    g.setIndex(tri);
    SHELL[key] = g; return g;
  }
  // mode: 1 Oberteil, 2 Hose, 3 Schuhe, 4 Schürze, 5 Gürtel
  function garmentMaterial(color, mode, u) {
    var m = new THREE.MeshStandardMaterial({ color: lin(color), roughness: mode === 3 ? 0.5 : mode === 5 ? 0.45 : 0.88, metalness: 0 });
    var uni = Object.assign({ uMode: { value: mode } }, u);
    m.onBeforeCompile = function (s) {
      Object.assign(s.uniforms, uni);
      s.vertexShader = 'attribute float aZone;\nflat varying float vZone;\nvarying vec3 vBind;\n' + s.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvZone = aZone; vBind = position;');
      s.fragmentShader = [
        'flat varying float vZone;', 'varying vec3 vBind;',
        'uniform float uMode, uSleeveX, uLow, uHigh, uNeck, uVneck, uLegY;',
        s.fragmentShader.replace('#include <map_fragment>', [
          '#include <map_fragment>',
          'float z = floor(vZone + 0.5), ax = abs(vBind.x), y = vBind.y, edge = 1.0;',
          'bool keep = false;',
          'if (uMode == 1.0) {',
          '  float top = (ax < 0.15 ? uNeck - 0.025 + pow(ax / 0.15, 2.0) * 0.07 : uNeck + 0.3);',
          '  float vw = (y - (uNeck - uVneck)) * 0.32;',
          '  bool v = uVneck > 0.0 && vBind.z > 0.02 && ax < vw;',
          '  keep = z >= 1.0 && z <= 5.0 && y >= uLow && y < top && (((z < 2.0 || z > 3.0) && y < uNeck - 0.12) || ax < uSleeveX) && !v;',
          '  edge = min(min(y - uLow, uSleeveX - ax), top - y);',
          '  if (uVneck > 0.0 && vBind.z > 0.02 && vw > 0.0) edge = min(edge, abs(ax - vw));',
          '} else if (uMode == 2.0) {',
          '  keep = z >= 1.0 && z <= 6.0 && y < uHigh && y > uLegY && ax < 0.3;',
          '  edge = min(uHigh - y, y - uLegY);',
          '} else if (uMode == 3.0) {',
          '  keep = z >= 6.0 && y < uHigh;',
          '  edge = uHigh - y;',
          '  if (y < 0.022) diffuseColor.rgb *= 0.35;',
          '} else if (uMode == 4.0) {',
          '  keep = vBind.z > 0.0 && ax < 0.16 && y < uHigh && y > uLow && z >= 1.0 && z <= 6.0;',
          '  edge = min(min(uHigh - y, y - uLow), 0.16 - ax);',
          '} else if (uMode == 5.0) {',
          '  keep = z >= 1.0 && z <= 5.0 && y < uHigh && y > uLow && ax < 0.3;',
          '}',
          'if (!keep) discard;',
          'diffuseColor.rgb *= 0.8 + 0.2 * smoothstep(0.0, 0.012, edge);'
        ].join('\n'))
      ].join('\n');
    };
    m.customProgramCacheKey = function () { return 'rr-cloth'; };
    return m;
  }
  function addShell(bodyMesh, geo, mat) {
    var s = new THREE.SkinnedMesh(geo, mat); s.bind(bodyMesh.skeleton, bodyMesh.bindMatrix);
    s.castShadow = true; s.receiveShadow = true; s.frustumCulled = false; bodyMesh.parent.add(s); return s;
  }
  // Rock: ausgestellter Kegel von der Hüfte bis übers Knie; oben am Becken, unten anteilig an den Oberschenkeln
  function skirt(bodyMesh, base, t, color) {
    var p = base.attributes.position, zn = base.attributes.aZone, bones = bodyMesh.skeleton.bones;
    function bi(n) { for (var i = 0; i < bones.length; i++) if (bones[i].name === n) return i; return 0; }
    var PEL = bi('pelvis'), TL = bi('thigh_l'), TR = bi('thigh_r'), ROWS = 7, SEG = 28;
    var yTop = t.cut.waist + 0.02, yBot = t.cut.shorts - 0.08, pos = [], si = [], sw = [], idx = [], rx = 0, rz = 0, rzb = 0;
    for (var r = 0; r < ROWS; r++) {
      var f = r / (ROWS - 1), y = yTop + (yBot - yTop) * f, mx = 0, mzf = 0, mzb = 0;
      for (var i = 0; i < p.count; i++) { var z = zn.getX(i); if (z < 4 || z > 5 || Math.abs(p.getY(i) - y) > 0.03) continue; mx = Math.max(mx, Math.abs(p.getX(i))); mzf = Math.max(mzf, p.getZ(i)); mzb = Math.min(mzb, p.getZ(i)); }
      rx = Math.max(rx, mx + 0.045); rz = Math.max(rz, mzf + 0.045); rzb = Math.min(rzb, mzb - 0.04);
      var flare = 1 + f * 0.18;
      for (var s = 0; s < SEG; s++) {
        var a = s / SEG * Math.PI * 2, cx = Math.sin(a), cz = Math.cos(a);
        pos.push(cx * rx * flare, y, cz > 0 ? cz * rz * flare : -cz * rzb * flare);
        var wt = f * 0.75, side = cx >= 0 ? TL : TR;
        si.push(PEL, side, 0, 0); sw.push(1 - wt, wt, 0, 0);
      }
    }
    for (r = 0; r < ROWS - 1; r++) for (s = 0; s < SEG; s++) { var a0 = r * SEG + s, a1 = r * SEG + (s + 1) % SEG, b0 = a0 + SEG, b1 = a1 + SEG; idx.push(a0, b0, a1, a1, b0, b1); }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
    g.setIndex(idx); g.computeVertexNormals();
    return addShell(bodyMesh, g, new THREE.MeshStandardMaterial({ color: lin(color), roughness: 0.85, side: THREE.DoubleSide }));
  }
  function dress(cfg, t, fem, bodyMesh, geo, chest, pelvis) {
    var c = t.cut, sleeves = cfg.sleeves !== undefined ? cfg.sleeves : (cfg.jacket || cfg.hoodie || cfg.vest || cfg.tie ? 2 : 1);
    var SX = [c.tank, c.short, c.long], legY = cfg.shorts ? c.shorts : c.ankle - 0.03, tucked = !!cfg.belt;
    function top(color, sx, thick, low, vneck) {
      var u = { uSleeveX: { value: sx }, uLow: { value: low }, uHigh: { value: 0 }, uNeck: { value: c.neck }, uVneck: { value: vneck || 0 }, uLegY: { value: 0 } };
      addShell(bodyMesh, shellGeo(geo, 'top' + sx.toFixed(3) + low.toFixed(3), function (x, y, z, zn) { return zn >= 1 && zn <= 5 && y > low - 0.03 && Math.abs(x) < sx + 0.03; }, thick), garmentMaterial(color, 1, u));
    }
    // Hose (bei Rock keine Hose)
    if (!cfg.skirt) {
      var hi = c.waist + 0.02;
      addShell(bodyMesh, shellGeo(geo, 'pants' + legY.toFixed(3), function (x, y, z, zn) { return zn >= 1 && zn <= 6 && y < hi + 0.03 && y > legY - 0.03; }, 0.007),
        garmentMaterial(cfg.pants, 2, { uSleeveX: { value: 0 }, uLow: { value: 0 }, uHigh: { value: hi }, uNeck: { value: 0 }, uVneck: { value: 0 }, uLegY: { value: legY } }));
    }
    // Oberteil(e)
    var shirtLow = tucked ? c.waist - 0.005 : c.waist - 0.05;
    if (cfg.jacket) { top(cfg.shirt, SX[2], 0.008, shirtLow, 0); top(cfg.jacket, SX[2], 0.017, cfg.skirt ? c.waist - 0.02 : c.waist - 0.13, 0.4); }
    else if (cfg.vest) { top(cfg.shirt, SX[2], 0.008, shirtLow, 0); top(cfg.vest, c.tank - 0.03, 0.014, c.waist - 0.06, 0.3); }
    else if (cfg.hoodie) {
      top(cfg.shirt, SX[2], 0.016, c.waist - 0.1, 0);
      [-1, 1].forEach(function (s) { var cord = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.13, 6), std(0xf2eee6, 0.7)); cord.position.set(s * 0.035, c.neck - 0.1, frontZ(geo, c.neck - 0.1) + 0.02); attach(chest, t.invChest, cord); });
    }
    else top(cfg.shirt, SX[sleeves], 0.008, shirtLow, 0);
    if (cfg.skirt) skirt(bodyMesh, geo, t, cfg.jacket || cfg.pants);
    if (cfg.belt && !cfg.skirt) {
      addShell(bodyMesh, shellGeo(geo, 'belt', function (x, y, z, zn) { return zn >= 1 && zn <= 5 && y < c.waist + 0.03 && y > c.waist - 0.05; }, 0.012),
        garmentMaterial(0x3a2a1e, 5, { uSleeveX: { value: 0 }, uLow: { value: c.waist - 0.03 }, uHigh: { value: c.waist + 0.005 }, uNeck: { value: 0 }, uVneck: { value: 0 }, uLegY: { value: 0 } }));
      var buckle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.032, 0.008), std(0xc9a44a, 0.3)); buckle.position.set(0, c.waist - 0.012, frontZ(geo, c.waist - 0.012) + 0.017); attach(pelvis, t.invPelvis, buckle);
    }
    if (cfg.apron) apron(bodyMesh, geo, t, cfg.apron);
    // Schuhe
    shoes(bodyMesh, geo, t, cfg.shoes, cfg.sole);
    // Krawatte folgt der Brust bzw. dem Bauch
    if (cfg.tie) {
      var tp = [], ti = [], y1 = c.neck - 0.045, y2 = c.neck - 0.4, N = 10, zPrev = 0;
      for (var r = 0; r <= N; r++) {
        var ty = y1 + (y2 - y1) * r / N, tz = Math.max(frontZ(geo, ty), frontZ(geo, ty + 0.03), r ? zPrev - 0.01 : 0) + 0.013, hwid = r === N ? 0.0 : 0.014 + 0.014 * r / N;
        zPrev = tz - 0.013; tp.push(-hwid, ty + (r === N ? 0.0 : 0), tz, hwid, ty, tz);
      }
      for (r = 0; r < N; r++) { var a = r * 2; ti.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
      var tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3)); tg.setIndex(ti); tg.computeVertexNormals();
      var tie = new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ color: lin(cfg.tie), roughness: 0.45, side: THREE.DoubleSide })); attach(chest, t.invChest, tie);
      var knot = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.028, 0.014), std(cfg.tie, 0.45)); knot.position.set(0, y1 + 0.008, frontZ(geo, y1) + 0.014); attach(chest, t.invChest, knot);
    }
    if (cfg.lanyard) {
      var cy = c.neck - 0.26, card = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.006), std(0xfffdf7, 0.6)); card.position.set(0, cy, frontZ(geo, cy) + 0.03); attach(chest, t.invChest, card);
    }
  }
  function boneIndex(skel, n) { for (var i = 0; i < skel.bones.length; i++) if (skel.bones[i].name === n) return i; return 0; }
  // Schürze: flaches Tuch vor Brust und Beinen, oben an der Brust, unten anteilig an den Oberschenkeln
  function apron(bodyMesh, geo, t, color) {
    var c = t.cut, sk = bodyMesh.skeleton, SP = boneIndex(sk, 'spine_02'), PEL = boneIndex(sk, 'pelvis'), TL = boneIndex(sk, 'thigh_l'), TR = boneIndex(sk, 'thigh_r');
    var yTop = c.waist + 0.3, yBot = c.shorts - 0.02, ROWS = 12, COLS = 9, W = 0.17, pos = [], si = [], sw = [], idx = [], zMax = 0;
    for (var r = 0; r < ROWS; r++) {
      var y = yTop + (yBot - yTop) * r / (ROWS - 1), fz = frontZ(geo, y, 0.19); zMax = Math.max(zMax, fz);
      var z = Math.max(fz, y < c.waist ? zMax : 0) + (y > c.waist ? 0.032 : 0.022);
      for (var k = 0; k < COLS; k++) {
        var x = -W + 2 * W * k / (COLS - 1); pos.push(x, y, z - Math.pow(Math.abs(x) / W, 2) * 0.03);
        if (y > c.waist) { si.push(SP, PEL, 0, 0); sw.push(y > c.waist + 0.12 ? 1 : 0.5, y > c.waist + 0.12 ? 0 : 0.5, 0, 0); }
        else { var f = Math.min(1, (c.waist - y) / (c.waist - yBot)) * 0.6; si.push(PEL, x >= 0 ? TL : TR, 0, 0); sw.push(1 - f, f, 0, 0); }
      }
    }
    for (r = 0; r < ROWS - 1; r++) for (k = 0; k < COLS - 1; k++) { var a = r * COLS + k; idx.push(a, a + COLS, a + 1, a + 1, a + COLS, a + COLS + 1); }
    var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4)); g.setIndex(idx); g.computeVertexNormals();
    return addShell(bodyMesh, g, new THREE.MeshStandardMaterial({ color: lin(color), roughness: 0.9, side: THREE.DoubleSide }));
  }
  // Schuhe: abgerundete Form um den Fuß (Superellipsoid), Sohle dunkler; Ferse am Fußknochen, Spitze am Ballen
  var SHOE = {};
  function shoes(bodyMesh, geo, t, color, sole) {
    var sk = bodyMesh.skeleton, col = lin(color), sc = lin(sole || 0x2a2522);
    ['l', 'r'].forEach(function (side) {
      var key = geo.uuid + side, g = SHOE[key];
      if (!g) {
        var p = geo.attributes.position, zn = geo.attributes.aZone, bb = new THREE.Box3(), v = new THREE.Vector3(), sgn = side === 'l' ? 1 : -1;
        for (var i = 0; i < p.count; i++) if (zn.getX(i) === 7 && p.getX(i) * sgn > 0) bb.expandByPoint(v.fromBufferAttribute(p, i));
        var ballZ = (function () { var o = t.scene.getObjectByName('ball_' + side), w = new THREE.Vector3(); o.getWorldPosition(w); return w.z; })();
        var cx = (bb.min.x + bb.max.x) / 2, hw = (bb.max.x - bb.min.x) / 2 + 0.014, cz = (bb.min.z + bb.max.z) / 2 + 0.008, hl = (bb.max.z - bb.min.z) / 2 + 0.018, top = t.cut.ankle + 0.005;
        g = new THREE.SphereGeometry(1, 22, 14); var gp = g.attributes.position;
        function se(a) { return Math.sign(a) * Math.pow(Math.abs(a), 0.55); }
        var cols = [], FI = boneIndex(sk, 'foot_' + side), BI = boneIndex(sk, 'ball_' + side), si = [], sw = [];
        for (i = 0; i < gp.count; i++) {
          var X = se(gp.getX(i)), Y = se(gp.getY(i)), Z = se(gp.getZ(i));
          var zz = cz + Z * hl, fr = Math.max(0, (zz - cz) / hl), h = top * (1 - 0.45 * fr);
          var yy = Math.max(0.0, (Y + 1) / 2 * h - 0.004);
          gp.setXYZ(i, cx + X * hw * (1 - 0.15 * fr * fr), yy, zz);
          var so = yy < 0.02; cols.push(so ? sc.r : col.r, so ? sc.g : col.g, so ? sc.b : col.b);
          var toe = Math.min(1, Math.max(0, (zz - ballZ) / 0.05 + 0.5)); si.push(FI, BI, 0, 0); sw.push(1 - toe, toe, 0, 0);
        }
        g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
        g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
        g.computeVertexNormals(); SHOE[key] = g;
      } else {
        // Farben pro Figur neu setzen (Geometrie wird geteilt)
      }
      var m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5 });
      var gg = g.clone(); var cc = gg.attributes.color, gp2 = gg.attributes.position;
      var arr = new Float32Array(cc.count * 3); for (var j = 0; j < cc.count; j++) { var so2 = gp2.getY(j) < 0.02; arr[j * 3] = so2 ? sc.r : col.r; arr[j * 3 + 1] = so2 ? sc.g : col.g; arr[j * 3 + 2] = so2 ? sc.b : col.b; }
      gg.setAttribute('color', new THREE.BufferAttribute(arr, 3));
      addShell(bodyMesh, gg, m);
    });
  }
  function garmentMaterialPlain(color) { return new THREE.MeshStandardMaterial({ color: lin(color), roughness: 0.88 }); }

  // ================= Locken =================
  // Viele kleine Kugeln auf der Oberfläche einer vorhandenen Frisur ergeben Volumen und Locken.
  var CURL = {};
  function curlyGeo(src, key, count) {
    if (CURL[key]) return CURL[key];
    var p = src.attributes.position, n = src.attributes.normal, ico = new THREE.IcosahedronGeometry(1, 1), ip = ico.attributes.position, seed = 11;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var pos = new Float32Array(count * ip.count * 3), nor = new Float32Array(count * ip.count * 3), o = 0;
    for (var k = 0; k < count; k++) {
      var i = Math.floor(rnd() * p.count), r = 0.008 + rnd() * 0.007, off = 0.003 + rnd() * 0.013;
      var cx = p.getX(i) + n.getX(i) * off, cy = p.getY(i) + n.getY(i) * off, cz = p.getZ(i) + n.getZ(i) * off;
      for (var j = 0; j < ip.count; j++) {
        var vx = ip.getX(j), vy = ip.getY(j), vz = ip.getZ(j);
        pos[o] = cx + vx * r; pos[o + 1] = cy + vy * r * 1.15; pos[o + 2] = cz + vz * r; nor[o] = vx; nor[o + 1] = vy; nor[o + 2] = vz; o += 3;
      }
    }
    var g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    CURL[key] = g; return g;
  }

  function create(cfg) {
    var fem = !!cfg.female, t = T[fem ? 'f' : 'm'];
    var root = new THREE.Group(), model = THREE.SkeletonUtils.clone(t.scene); root.add(model);
    var head, chest, pelvis, bodyMesh, eyeY = fem ? 1.655 : 1.70, faceZ = fem ? 0.095 : 0.1;
    model.traverse(function (o) {
      if (o.isBone && o.name === 'Head') head = o; if (o.isBone && o.name === 'spine_03') chest = o; if (o.isBone && o.name === 'pelvis') pelvis = o;
      if (o.isMesh) {
        o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false;
        if (o.name === t.bodyName) { o.material = bodyMaterial(o.material, cfg); bodyMesh = o; }
        else if (/Hair|Face$|Eyebrows/i.test(o.material.name) || /Eyebrows|^Face$/.test(o.name)) o.material = hairMaterial(o.material.map, cfg.hair);
      }
    });
    var hn = cfg.hairModel !== undefined ? cfg.hairModel : HAIR[fem ? 'f' : 'm'][cfg.hairStyle || 'short'];
    var geo = bodyGeo(t, fem, cfg.build); bodyMesh.geometry = geo;
    dress(cfg, t, fem, bodyMesh, geo, chest, pelvis);
    if (hn && t.hairs[hn]) { var hm = new THREE.Mesh(t.hairs[hn].geo, hairMaterial(t.hairs[hn].map, cfg.hair)); hm.castShadow = true; head.add(hm); }
    if ((cfg.hairStyle === 'curly' || cfg.hairStyle === 'afro') && hn && t.hairs[hn]) {   // Afro: Locken auf dem Dutt ergeben Volumen
      var cm = new THREE.Mesh(curlyGeo(t.hairs[hn].geo, (fem ? 'f' : 'm') + hn, cfg.hairStyle === 'afro' ? 2600 : fem ? 1700 : 700), new THREE.MeshStandardMaterial({ color: lin(cfg.hair), roughness: 0.8 }));
      cm.castShadow = true; head.add(cm);
    }
    if (!fem && (cfg.beard || cfg.mustache) && t.hairs.Hair_Beard) { var bd = new THREE.Mesh(t.hairs.Hair_Beard.geo, hairMaterial(t.hairs.Hair_Beard.map, cfg.hair)); head.add(bd); }
    if (cfg.hairStyle === 'beanie') {
      var bz = t.hairs[fem ? 'Hair_BuzzedFemale' : 'Hair_Buzzed'];
      if (bz) { var cg = bz.geo.clone(); cg.computeBoundingBox(); var ctr = cg.boundingBox.getCenter(new THREE.Vector3()); cg.translate(-ctr.x, -ctr.y, -ctr.z); cg.scale(1.14, 1.12, 1.1); cg.translate(ctr.x, ctr.y + 0.012, ctr.z);
        var cap = new THREE.Mesh(cg, std(cfg.beanie || 0x2f6f8f, 0.95)); cap.castShadow = true; head.add(cap); }
    }
    if (cfg.glasses) {
      var gm = std(cfg.glassesColor || 0x1c1c1c, 0.35), gl = new THREE.Group(), cat = cfg.glassesStyle === 'cateye';
      [-1, 1].forEach(function (s) {
        var r = new THREE.Mesh(new THREE.TorusGeometry(0.02, cat ? 0.0036 : 0.0028, 6, 18), gm); r.position.set(s * 0.032, 0, 0); if (cat) { r.scale.set(1.2, 0.82, 1); r.rotation.z = s * 0.12; } gl.add(r);
        if (cat) { var wg = new THREE.Mesh(new THREE.ConeGeometry(0.0065, 0.018, 4), gm); wg.rotation.z = -s * 1.1; wg.position.set(s * 0.056, 0.011, 0); gl.add(wg); }   // Katzenaugen-Spitzen
      });
      var br = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.004, 0.004), gm); gl.add(br);
      [-1, 1].forEach(function (s) { var a = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.004, 0.1), gm); a.position.set(s * 0.054, 0.004, -0.05); gl.add(a); });
      gl.position.set(0, eyeY - 0.002, faceZ - 0.006); attach(head, t.invHead, gl);
    }
    root.scale.setScalar((cfg.height || (fem ? 1.68 : 1.78)) / t.height);

    // ----- Animation -----
    var mixer = new THREE.AnimationMixer(model), C = CLIPS[fem ? 'f' : 'm'], A = {};
    [['idle', 'Idle_Loop'], ['talk', 'Idle_Talking_Loop'], ['walk', 'Walk_Loop'], ['jog', 'Jog_Fwd_Loop'], ['sit', 'Sitting_Idle_Loop'], ['sitTalk', 'Sitting_Talking_Loop']].forEach(function (p) {
      var a = mixer.clipAction(C[p[1]]); a.play(); a.setEffectiveWeight(p[0] === 'idle' ? 1 : 0); A[p[0]] = a;
    });
    var W = { idle: 1, talk: 0, walk: 0, jog: 0, sit: 0, sitTalk: 0 };
    mixer.update(Math.random() * 3);
    var pose = 'stand', talking = false, amount = 0, look = { x: 0, tx: 0 }, ud = root.userData, qTmp = new THREE.Quaternion(), qP = new THREE.Quaternion(), yAxis = new THREE.Vector3(0, 1, 0);
    ud.walk = function (phase, a) { amount = pose === 'sit' ? 0 : Math.max(0, Math.min(1, a || 0)); };
    ud.idle = function (time, dt) {
      dt = dt || 0.016;
      var tg = { idle: 0, talk: 0, walk: 0, jog: 0, sit: 0, sitTalk: 0 };
      if (pose === 'sit') tg[talking ? 'sitTalk' : 'sit'] = 1;
      else {
        var w = Math.min(1, amount / 0.75), j = Math.max(0, (amount - 0.75) / 0.25);
        tg[talking ? 'talk' : 'idle'] = 1 - w; tg.walk = w * (1 - j); tg.jog = w * j;
      }
      var k = Math.min(1, dt * 8);
      Object.keys(A).forEach(function (n) { W[n] += (tg[n] - W[n]) * k; A[n].setEffectiveWeight(W[n]); });
      mixer.update(dt);
      // Kopf dreht sich zum Blickziel (zusätzlich zur Animation)
      look.x += (look.tx - look.x) * Math.min(1, dt * 4);
      if (Math.abs(look.x) > 0.001) {
        head.parent.getWorldQuaternion(qP); head.getWorldQuaternion(qTmp);
        var rootQ = new THREE.Quaternion(); root.getWorldQuaternion(rootQ);
        var yaw = new THREE.Quaternion().setFromAxisAngle(yAxis.clone().applyQuaternion(rootQ), look.x * 0.8);
        qTmp.premultiply(yaw); head.quaternion.copy(qP.invert().multiply(qTmp));
      }
    };
    ud.lookAt = function (wx, wz, s) {
      if (!s) { look.tx = 0; return; }
      var v = new THREE.Vector3(wx, 1.4, wz); root.worldToLocal(v);
      look.tx = Math.max(-1.0, Math.min(1.0, Math.atan2(v.x, v.z))) * s;
    };
    ud.talk = function (on) { talking = !!on; };
    // Sitzen: Gesäß genau auf die Sitzfläche setzen (Höhe seatH über dem Boden, etwas hinter der Stuhlmitte).
    // Der tiefste Punkt von Becken und Oberschenkeln in der Sitzanimation wird gemessen und die Figur so verschoben.
    function fitSeat(seatH) {
      Object.keys(A).forEach(function (n) { W[n] = n === 'sit' ? 1 : 0; A[n].setEffectiveWeight(W[n]); });
      mixer.update(0); model.position.set(0, 0, 0); model.updateMatrixWorld(true);
      var zone = bodyMesh.geometry.attributes.aZone, pos = bodyMesh.geometry.attributes.position, v = new THREE.Vector3(), pts = [], minY = Infinity;
      for (var i = 0; i < pos.count; i++) {
        var z = zone.getX(i); if (z !== 4 && z !== 5) continue;
        v.fromBufferAttribute(pos, i); bodyMesh.boneTransform(i, v); pts.push(v.clone()); if (v.y < minY) minY = v.y;
      }
      var sz = 0, n = 0; pts.forEach(function (q) { if (q.y < minY + 0.04) { sz += q.z; n++; } });
      var s = root.scale.x, cz = n ? sz / n : 0;
      model.position.set(0, ((seatH || 0.46) - root.position.y) / s - minY, -0.04 / s - cz);
    }
    ud.setPose = function (p, seatH) {
      pose = p === 'sit' ? 'sit' : 'stand'; amount = 0;
      if (pose === 'sit' && bodyMesh) fitSeat(seatH); else model.position.set(0, 0, 0);
    };
    ud.pose = function () { return pose; };
    return root;
  }

  var fallback = Humans.create;
  window.Models = {
    ok: function () { return ready; },
    hairNames: function (g) { return ready ? Object.keys(T[g].hairs) : []; },
    ready: Promise.all([parse('female'), parse('male'), parse('anims')]).then(function (r) {
      T.f = prepare(r[0]); T.m = prepare(r[1]);
      CLIPS.f = clipsFor(T.f, r[2]); CLIPS.m = clipsFor(T.m, r[2]);
      ready = true;
      Humans.create = function (cfg, over) {
        var c = Object.assign({ skin: 0xe6b995, hair: 0x3b2a20, hairStyle: 'short', shirt: 0x8a9aa8, pants: 0x3a3f4a, shoes: 0x222222 }, cfg || {}, over || {});
        try { return create(c); } catch (e) { console.warn('Modell-Figur fehlgeschlagen, nutze einfache Figur', e); return fallback(cfg, over); }
      };
    }).catch(function (e) { console.warn('Figurenmodelle nicht geladen, nutze einfache Figuren', e); })
  };
})();

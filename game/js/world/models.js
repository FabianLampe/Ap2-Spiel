// Echte 3D-Figuren (Quaternius, CC0) mit Skelett und Animationen. Ersetzt Humans.create, sobald die Modelle geladen sind.
// Kleidung wird auf den Körper gefärbt: Jeder Punkt gehört zu einer Körperzone (über den stärksten Knochen),
// die Zone bekommt Haut-, Oberteil-, Hosen- oder Schuhfarbe. Frisuren, Bart, Brille und Krawatte hängen am Kopf bzw. an der Brust.
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
    f: { ponytail: 'Hair_Buns', bun: 'Hair_Buns', bob: 'Hair_Long', long: 'Hair_Long', short: 'Hair_BuzzedFemale', slick: 'Hair_Buns', beanie: 'Hair_BuzzedFemale', bald: null },
    m: { short: 'Hair_SimpleParted', slick: 'Hair_SimpleParted', bob: 'Hair_SimpleParted', ponytail: 'Hair_SimpleParted', bun: 'Hair_Buzzed', beanie: 'Hair_Buzzed', buzz: 'Hair_Buzzed', bald: null }
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
    t.invHead = invHead; t.invChest = t.chest.matrixWorld.clone().invert();
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
    var sleeves = cfg.sleeves !== undefined ? cfg.sleeves : (cfg.jacket || cfg.hoodie ? 2 : 1), legs = cfg.shorts || cfg.skirt ? 1 : 2;
    var u = {
      uTint: { value: tint }, uTop: { value: lin(cfg.jacket || cfg.shirt) }, uBottom: { value: lin(cfg.pants) },
      uShoes: { value: lin(cfg.shoes) },
      uSleeveX: { value: [T[cfg.female ? 'f' : 'm'].cut.tank, T[cfg.female ? 'f' : 'm'].cut.short, T[cfg.female ? 'f' : 'm'].cut.long][sleeves] },
      uLegY: { value: legs === 1 ? T[cfg.female ? 'f' : 'm'].cut.shorts : T[cfg.female ? 'f' : 'm'].cut.ankle },
      uCut: { value: new THREE.Vector3(T[cfg.female ? 'f' : 'm'].cut.waist, T[cfg.female ? 'f' : 'm'].cut.neck, T[cfg.female ? 'f' : 'm'].cut.ankle) }
    };
    m.onBeforeCompile = function (s) {
      Object.assign(s.uniforms, u);
      s.vertexShader = 'attribute float aZone;\nflat varying float vZone;\nvarying vec3 vBind;\n' + s.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvZone = aZone; vBind = position;');
      s.fragmentShader = 'flat varying float vZone;\nvarying vec3 vBind;\nuniform vec3 uTint, uTop, uBottom, uShoes, uCut;\nuniform float uSleeveX, uLegY;\n' + s.fragmentShader.replace('#include <map_fragment>', [
        '#include <map_fragment>',
        'float z = floor(vZone + 0.5);',
        'vec3 cloth = vec3(-1.0);',
        'float ax = abs(vBind.x), y = vBind.y;',
        'bool body = z >= 1.0 && z <= 6.0;',
        'if (body && y >= uCut.x && y < uCut.y + (ax > 0.12 ? 0.3 : 0.0) && ax < uSleeveX) cloth = uTop;',
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
  function std(c, r) { return new THREE.MeshStandardMaterial({ color: c, roughness: r === undefined ? 0.6 : r }); }
  // Teil in Modellkoordinaten (Ruhepose) an einen Knochen hängen
  function attach(bone, inv, mesh) { mesh.applyMatrix4(inv); bone.add(mesh); mesh.castShadow = true; return mesh; }

  function create(cfg) {
    var fem = !!cfg.female, t = T[fem ? 'f' : 'm'];
    var root = new THREE.Group(), model = THREE.SkeletonUtils.clone(t.scene); root.add(model);
    var head, chest, eyeY = fem ? 1.655 : 1.70, faceZ = fem ? 0.095 : 0.1;
    model.traverse(function (o) {
      if (o.isBone && o.name === 'Head') head = o; if (o.isBone && o.name === 'spine_03') chest = o;
      if (o.isMesh) {
        o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false;
        if (o.name === t.bodyName) o.material = bodyMaterial(o.material, cfg);
        else if (/Hair|Face$|Eyebrows/i.test(o.material.name) || /Eyebrows|^Face$/.test(o.name)) o.material = hairMaterial(o.material.map, cfg.hair);
      }
    });
    var hn = cfg.hairModel !== undefined ? cfg.hairModel : HAIR[fem ? 'f' : 'm'][cfg.hairStyle || 'short'];
    if (hn && t.hairs[hn]) { var hm = new THREE.Mesh(t.hairs[hn].geo, hairMaterial(t.hairs[hn].map, cfg.hair)); hm.castShadow = true; head.add(hm); }
    if (!fem && (cfg.beard || cfg.mustache) && t.hairs.Hair_Beard) { var bd = new THREE.Mesh(t.hairs.Hair_Beard.geo, hairMaterial(t.hairs.Hair_Beard.map, cfg.hair)); head.add(bd); }
    if (cfg.hairStyle === 'beanie') {
      var cap = new THREE.Mesh(new THREE.SphereGeometry(0.105, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), std(cfg.beanieColor || 0x2f6f8f, 0.9));
      cap.scale.set(1, 0.95, 1.08); cap.position.set(0, eyeY + 0.05, -0.012); attach(head, t.invHead, cap);
    }
    if (cfg.glasses) {
      var gm = std(0x1c1c1c, 0.35), gl = new THREE.Group();
      [-1, 1].forEach(function (s) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.0028, 6, 18), gm); r.position.set(s * 0.032, 0, 0); gl.add(r); });
      var br = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.004, 0.004), gm); gl.add(br);
      [-1, 1].forEach(function (s) { var a = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.004, 0.1), gm); a.position.set(s * 0.054, 0.004, -0.05); gl.add(a); });
      gl.position.set(0, eyeY - 0.002, faceZ - 0.006); attach(head, t.invHead, gl);
    }
    if (cfg.tie) {
      var tie = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.3, 0.012), std(cfg.tie, 0.5));
      tie.position.set(0, (fem ? 1.3 : 1.33), fem ? 0.1 : 0.125); tie.rotation.x = -0.12; attach(chest, t.invChest, tie);
    }
    if (cfg.lanyard) {
      var card = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.006), std(0xfffdf7, 0.6)); card.position.set(0, 1.22, fem ? 0.14 : 0.15); attach(chest, t.invChest, card);
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
    ud.setPose = function (p) { pose = p === 'sit' ? 'sit' : 'stand'; amount = 0; };
    ud.pose = function () { return pose; };
    return root;
  }

  var fallback = Humans.create;
  window.Models = {
    ok: function () { return ready; },
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

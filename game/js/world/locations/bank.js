// Ort: Stadtbank. Kühl, edel: Marmor, dunkles Holz, Glas. Raum 9 x 7 m, Decke 3,6 m.
// Skizze (x nach Osten, z nach Süden): Schalter im Norden, Geldautomat und Tresor im Osten,
// Wartebereich im Westen, Tür in der Südwand bei x = 0.
World.registerLocation({
  id: 'bank',
  name: 'Stadtbank',
  build: function (ctx) {
    var b = Props.builder();
    var W = 9, D = 7, hw = W / 2, hd = D / 2, H = 3.6;

    Props.room(b, {
      w: W, d: D, h: H,
      floor: { tex: 'marble', color: '#d8d6d0', repeat: [4, 3], rough: 0.3 },
      wall: { tex: 'plaster', color: '#dfe3e6' }, trim: 0x3b2a20,
      doors: [{ wall: 'S', pos: 0, w: 1.2, h: 2.4 }],
      windows: [
        { wall: 'W', pos: -1.6, w: 1.4, h: 1.8, sill: 0.9 }, { wall: 'W', pos: 1.2, w: 1.4, h: 1.8, sill: 0.9 },
        { wall: 'E', pos: 2.2, w: 1.4, h: 1.8, sill: 0.9 },
        { wall: 'S', pos: -2.8, w: 1.4, h: 1.8, sill: 0.9 }, { wall: 'S', pos: 2.8, w: 1.4, h: 1.8, sill: 0.9 }
      ]
    });

    var wood = 0x3d2a1e, woodLight = 0x5a3f2c, brass = 0xb89a55, steel = 0x8f979d;
    var brassM = { metal: 0.8, rough: 0.3 };

    // Dunkler Holzsockel an den Wänden (Wandvertäfelung, nur Nord- und Ostseite ohne Fenster)
    Props.box(b, { w: W - 0.1, h: 1.0, d: 0.05, x: 0, y: 0, z: -hd + 0.03, color: wood, tex: 'wood', cast: false });
    Props.box(b, { w: W - 0.1, h: 0.04, d: 0.07, x: 0, y: 1.0, z: -hd + 0.035, color: brass, metal: 0.8, rough: 0.3, cast: false });
    Props.box(b, { w: 0.05, h: 1.0, d: 2.4, x: hw - 0.03, y: 0, z: -2.2, color: wood, tex: 'wood', cast: false });

    // Teppich vor dem Schalter (Marmorläufer) und Eingangsmatte
    Props.rug(b, { x: 0.2, z: 0.2, w: 3.4, d: 1.4, color: 0x2c3a4d });
    Props.rug(b, { x: 0, z: hd - 0.5, w: 1.6, d: 0.8, color: 0x3a3f45 });

    // ---------- Schalter ----------
    Props.counter(b, { x: -1.0, z: -1.5, w: 5.0, d: 0.7, h: 1.1, color: wood, tex: 'wood', topTex: 'marble', topColor: 0xe6e3dc });
    // Messingleiste an der Front
    Props.box(b, { w: 5.0, h: 0.04, d: 0.03, x: -1.0, y: 0.25, z: -1.5 + 0.36, color: brass, metal: 0.8, rough: 0.3, cast: false });
    // Glasscheiben mit Rahmen und Ablage (Trennwand, ohne Kollision)
    [-3.3, -1.0, 1.4].forEach(function (gx) {
      Props.box(b, { w: 1.2, h: 0.6, d: 0.02, x: gx, y: 1.1, z: -1.5 - 0.2, color: 0xbfe0f5, opacity: 0.25, rough: 0.1, cast: false });
      Props.box(b, { w: 1.24, h: 0.03, d: 0.04, x: gx, y: 1.7, z: -1.5 - 0.2, color: brass, metal: 0.8, rough: 0.3, cast: false });
      Props.box(b, { w: 1.24, h: 0.03, d: 0.04, x: gx, y: 1.1, z: -1.5 - 0.2, color: brass, metal: 0.8, rough: 0.3, cast: false });
    });
    // Zwei Kassen an den Schaltern
    Props.cashRegister(b, { x: -2.2, y: 1.1, z: -1.65, ry: 0 });
    Props.cashRegister(b, { x: 0.3, y: 1.1, z: -1.65, ry: 0 });
    // Stempel, Kugelschreiber an Kette, Unterlagen
    Props.box(b, { w: 0.3, h: 0.02, d: 0.22, x: -0.9, y: 1.1, z: -1.4, color: 0xf3efe6 });
    Props.box(b, { w: 0.3, h: 0.02, d: 0.22, x: -0.87, y: 1.12, z: -1.42, color: 0xe9e2d0, ry: 0.2 });
    Props.box(b, { w: 0.08, h: 0.05, d: 0.06, x: -1.6, y: 1.1, z: -1.3, color: 0x222222 });
    Props.cyl(b, { r: 0.006, h: 0.14, x: -1.6, y: 1.15, z: -1.3, color: 0x1c3a6b });
    Props.cyl(b, { r: 0.03, h: 0.05, x: 1.2, y: 1.1, z: -1.35, color: brass, metal: 0.8, rough: 0.3 });   // Klingel
    // Hocker/Bürostuhl hinter dem Schalter
    Props.chair(b, { x: -2.2, z: -2.35, ry: 0, color: 0x22303f });
    Props.chair(b, { x: 0.3, z: -2.35, ry: 0, color: 0x22303f });
    // Regale mit Ordnern hinter dem Schalter an der Nordwand
    Props.shelf(b, { x: -3.6, z: -hd + 0.25, w: 1.4, h: 2.0, color: wood });
    Props.shelf(b, { x: 1.4, z: -hd + 0.25, w: 1.4, h: 2.0, color: wood });
    Props.box(b, { w: 0.5, h: 0.9, d: 0.5, x: -1.6, y: 0, z: -3.05, color: steel, metal: 0.6, rough: 0.4, collide: true });   // Aktenschrank

    // Schild über dem Schalter
    Props.sign(b, { text: 'Stadtbank', w: 2.6, h: 0.5, x: -1.0, y: 2.9, z: -hd + 0.03, bg: '#14243a', fg: '#e3c878', font: 'bold 60px serif' });
    Props.box(b, { w: 2.72, h: 0.6, d: 0.03, x: -1.0, y: 2.6, z: -hd + 0.01, color: brass, metal: 0.8, rough: 0.3, cast: false });
    Props.sign(b, { text: 'Schalter 1', w: 0.7, h: 0.18, x: -2.2, y: 2.3, z: -hd + 0.03, bg: '#1c2a3a', fg: '#ffffff', font: 'bold 36px sans-serif' });
    Props.sign(b, { text: 'Schalter 2', w: 0.7, h: 0.18, x: 0.3, y: 2.3, z: -hd + 0.03, bg: '#1c2a3a', fg: '#ffffff', font: 'bold 36px sans-serif' });

    // Herr Zinsmann
    Props.npc(b, {
      figure: 'bank', x: -2.2, z: -2.35, ry: 0, pose: 'sit', name: 'Herr Zinsmann', label: 'Mit Herrn Zinsmann sprechen', radius: 2.4,
      onUse: function (api) {
        api.npcTalk({
          figure: 'bank', name: 'Herr Zinsmann',
          text: 'Guten Tag. Zinsen sind kein Geschenk, sondern der Preis der Zeit. Rechnen Sie jede Anschaffung durch: Wann amortisiert sie sich, wo liegt der Break-even, und was sagt die Nutzwertanalyse? Wirtschaftlichkeit ist keine Gefühlssache, sondern eine Tabelle mit ehrlichen Zahlen.',
          actions: [{ label: 'Kontoübersicht', run: function (api2) { api2.openShop('finance'); } }]
        });
      }
    });

    // ---------- Geldautomat (Ostwand) ----------
    var atmX = hw - 0.35, atmZ = -0.9;
    Props.box(b, { w: 0.5, h: 1.7, d: 0.9, x: atmX, y: 0, z: atmZ, color: 0x39424b, metal: 0.5, rough: 0.4, collide: true });
    Props.box(b, { w: 0.05, h: 0.4, d: 0.5, x: atmX - 0.27, y: 1.15, z: atmZ, color: 0x1c5a7a, emissive: 0x39b7e6, emissiveIntensity: 1.0, rough: 0.2 });   // Bildschirm
    Props.box(b, { w: 0.06, h: 0.03, d: 0.4, x: atmX - 0.27, y: 0.95, z: atmZ, color: 0x0c0c0c });      // Kartenschlitz-Leiste
    Props.box(b, { w: 0.05, h: 0.12, d: 0.3, x: atmX - 0.27, y: 0.7, z: atmZ, color: 0x111111 });         // Ausgabe
    Props.box(b, { w: 0.06, h: 0.02, d: 0.2, x: atmX - 0.27, y: 0.98, z: atmZ + 0.0, color: 0x3fbf78, emissive: 0x3fbf78, emissiveIntensity: 1.0 });
    Props.box(b, { w: 0.5, h: 0.2, d: 0.9, x: atmX, y: 1.7, z: atmZ, color: 0x1a2733 });
    Props.sign(b, { text: 'Geldautomat', w: 0.8, h: 0.2, x: hw - 0.03, y: 2.0, z: atmZ, ry: -Math.PI / 2, bg: '#1a2733', fg: '#39b7e6', font: 'bold 44px sans-serif' });

    // ---------- Tresor (Deko, Nordosten) ----------
    var vx = 3.4, vz = -hd + 0.4;
    Props.box(b, { w: 2.0, h: 2.5, d: 0.7, x: vx, y: 0, z: vz, color: 0x6c757d, metal: 0.6, rough: 0.4, collide: true });
    Props.cyl(b, { r: 0.7, h: 0.08, x: vx, y: 0.95, z: vz + 0.38, color: 0x9aa3a8, metal: 0.8, rough: 0.3, seg: 32 }).rotation.x = Math.PI / 2;
    Props.cyl(b, { r: 0.12, h: 0.1, x: vx, y: 1.0, z: vz + 0.44, color: brass, metal: 0.8, rough: 0.3 }).rotation.x = Math.PI / 2;
    Props.box(b, { w: 0.5, h: 0.04, d: 0.05, x: vx, y: 1.0, z: vz + 0.48, color: brass, metal: 0.8, rough: 0.3 });
    Props.box(b, { w: 0.04, h: 0.5, d: 0.05, x: vx, y: 0.77, z: vz + 0.48, color: brass, metal: 0.8, rough: 0.3 });
    Props.box(b, { w: 0.15, h: 0.5, d: 0.06, x: vx - 0.95, y: 0.7, z: vz + 0.36, color: 0x555c62, metal: 0.7 });
    Props.box(b, { w: 0.15, h: 0.5, d: 0.06, x: vx - 0.95, y: 1.7, z: vz + 0.36, color: 0x555c62, metal: 0.7 });
    Props.sign(b, { text: 'Tresor', w: 0.8, h: 0.2, x: vx, y: 2.75, z: -hd + 0.04, bg: '#3a2a20', fg: '#e3c878', font: 'bold 44px serif' });

    // ---------- Wartebereich (Westen) ----------
    Props.sofa(b, { x: -hw + 0.55, z: 1.4, w: 2.0, ry: Math.PI / 2, color: 0x2c3e55 });
    Props.table(b, { x: -2.85, z: 1.4, w: 0.5, d: 1.0, h: 0.4, color: woodLight });
    // Zeitschriften
    Props.box(b, { w: 0.22, h: 0.01, d: 0.3, x: -2.9, y: 0.4, z: 1.15, color: 0xd9694a, ry: 0.2 });
    Props.box(b, { w: 0.22, h: 0.01, d: 0.3, x: -2.85, y: 0.41, z: 1.2, color: 0x4f7da3, ry: -0.3 });
    Props.box(b, { w: 0.22, h: 0.01, d: 0.3, x: -2.85, y: 0.42, z: 1.65, color: 0xf0c060, ry: 0.5 });
    Props.box(b, { w: 0.22, h: 0.01, d: 0.3, x: -2.8, y: 0.43, z: 1.6, color: 0x4c9a6a, ry: -0.1 });
    Props.chair(b, { x: -2.1, z: 0.9, ry: -Math.PI / 2, color: 0x22303f, pad: 0x2c3e55 });
    Props.chair(b, { x: -2.1, z: 1.9, ry: -Math.PI / 2, color: 0x22303f, pad: 0x2c3e55 });
    Props.chair(b, { x: -3.0, z: 2.9, ry: Math.PI, color: 0x22303f, pad: 0x2c3e55 });
    Props.rug(b, { x: -3.0, z: 1.4, w: 2.2, d: 2.4, color: 0x4a2f3a });
    Props.lamp(b, { type: 'floor', x: -hw + 0.4, z: 2.75, light: false });

    // Pflanzen
    Props.plant(b, { x: -hw + 0.4, z: -2.7, size: 1.4, color: 0x3d8a5c });
    Props.plant(b, { x: hw - 0.4, z: hd - 0.4, size: 1.3, color: 0x3d8a5c });
    Props.plant(b, { x: -hw + 0.4, z: hd - 0.4, size: 1.2 });
    Props.plant(b, { x: 1.7, z: hd - 0.45, size: 1.0, color: 0x4c9a6a });
    Props.plant(b, { x: -0.4, z: -3.1, size: 1.2, color: 0x3d8a5c });

    // Broschürenständer (Ostseite)
    var bx = 3.5, bz = 1.5;
    Props.cyl(b, { r: 0.2, h: 0.03, x: bx, y: 0, z: bz, color: steel, metal: 0.6, rough: 0.4 });
    Props.cyl(b, { r: 0.02, h: 1.3, x: bx, y: 0.03, z: bz, color: steel, metal: 0.6, rough: 0.4, seg: 8 });
    Props.box(b, { w: 0.5, h: 0.7, d: 0.3, x: bx, y: 0.75, z: bz, color: 0xdfe3e6, collide: true });
    [0.85, 1.1, 1.35].forEach(function (yy, i) {
      [-0.15, 0, 0.15].forEach(function (dx, j) {
        Props.box(b, { w: 0.12, h: 0.16, d: 0.02, x: bx + dx, y: yy, z: bz + 0.17, color: [0x4f7da3, 0xd9694a, 0xf0c060, 0x4c9a6a][(i + j) % 4], cast: false });
      });
    });

    // Bilder und Uhr
    Props.clock(b, { x: -3.6, y: 2.9, z: -hd + 0.06, ry: 0 });
    Props.picture(b, { x: -hw + 0.06, y: 3.1, z: -1.6, ry: Math.PI / 2, w: 0.8, h: 0.55, color: 0x6fa8c9 });
    Props.picture(b, { x: -hw + 0.06, y: 2.6, z: 3.0, ry: Math.PI / 2, w: 0.8, h: 0.55, color: 0x4c9a6a });
    Props.picture(b, { x: hw - 0.06, y: 2.6, z: 0.5, ry: -Math.PI / 2, w: 0.9, h: 0.6, color: 0xd9694a });
    Props.picture(b, { x: hw - 0.06, y: 3.1, z: 3.0, ry: -Math.PI / 2, w: 0.8, h: 0.55, color: 0x6fa8c9 });
    Props.picture(b, { x: 1.3, y: 2.9, z: -hd + 0.06, ry: 0, w: 0.7, h: 0.5, color: 0x8a9ab0 });
    Props.sign(b, { text: 'Zinsen heute\nTagesgeld 2,4 %', w: 1.1, h: 0.6, x: hw - 0.07, y: 1.6, z: 0.7, ry: -Math.PI / 2, bg: '#14243a', fg: '#e3c878', font: 'bold 34px sans-serif' });

    // Absperrpfosten mit Band (Warteschlange vor dem Schalter, ohne Kollision, Weg bleibt frei)
    [-3.2, -2.4].forEach(function (px) {
      Props.cyl(b, { r: 0.03, h: 0.95, x: px, y: 0, z: -0.3, color: brass, metal: 0.8, rough: 0.3, seg: 10 });
      Props.cyl(b, { r: 0.12, h: 0.03, x: px, y: 0, z: -0.3, color: brass, metal: 0.8, rough: 0.3 });
      Props.sphere(b, { r: 0.05, x: px, y: 0.98, z: -0.3, color: brass, metal: 0.8, rough: 0.3 });
    });
    Props.box(b, { w: 0.8, h: 0.04, d: 0.02, x: -2.8, y: 0.85, z: -0.3, color: 0x8a1f2b, cast: false });

    // Lüftung / Deckenleisten (Deko unter der hohen Decke)
    Props.box(b, { w: W - 0.3, h: 0.12, d: 0.12, x: 0, y: H - 0.14, z: -hd + 0.08, color: wood, cast: false });
    Props.box(b, { w: W - 0.3, h: 0.12, d: 0.12, x: 0, y: H - 0.14, z: hd - 0.08, color: wood, cast: false });

    // ---------- Lichter (3 Deckenlampen) ----------
    Props.lamp(b, { type: 'ceiling', x: -2.5, z: -0.2, y: 3.4, color: 0xeef4ff });
    Props.lamp(b, { type: 'ceiling', x: 1.5, z: 0.6, y: 3.4, color: 0xeef4ff });
    Props.lamp(b, { type: 'ceiling', x: -2.5, z: 2.0, y: 3.4, color: 0xffe9c0 });

    // Kleines Leben: Geldautomat-Bildschirm pulsiert leicht
    var atmScreen = b.group.children.filter(function (o) { return o.material && o.material.emissive && o.material.emissive.getHex() === 0x39b7e6; })[0];
    if (atmScreen) b.animators.push(function (dt, t) { atmScreen.material.emissiveIntensity = 0.85 + Math.sin(t * 2) * 0.15; });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'tuer', label: 'Bank verlassen (Karte)', x: 0, z: hd - 0.5, radius: 1.5, y: 1.3, onUse: function (api) { api.openMap(); } });
    Props.interact(b, { id: 'geldautomat', label: 'Geldautomat: Kontoübersicht', x: atmX - 1.0, z: atmZ, radius: 1.3, y: 1.9, onUse: function (api) { api.openShop('finance'); } });

    // ---------- Startpunkte ----------
    b.spawns.default = { x: 0, z: hd - 1.1, ry: Math.PI };
    b.spawns.door = b.spawns.default;

    b.lighting = { bg: 0x141a22, sun: 0.85, hemi: 0.55, exposure: 0.93, sunColor: 0xeaf1ff };
    return b;
  }
});

// Ort: Café Kolben. Arbeitsplatz des Spielers, solange er kein Büro hat. Warm, gemütlich, lebendig.
// Raum 9 x 7 m: x -4.5..4.5, z -3.5..3.5. Tür in der Südwand bei x = 2.5. Theke an der Nordwand.
World.registerLocation({
  id: 'cafe',
  name: 'Café Kolben',
  build: function (ctx) {
    var b = Props.builder();
    var W = 9, D = 7, hw = W / 2, hd = D / 2;

    Props.room(b, {
      w: W, d: D, h: 3.0,
      floor: { tex: 'wood', color: '#9a6b45', repeat: [W / 2, D / 2] },
      wall: { tex: 'brick', color: '#b5654a' }, trim: 0xe8dcc4,
      doors: [{ wall: 'S', pos: 2.5, w: 1.1 }],
      windows: [
        { wall: 'W', pos: -1.2, w: 1.3, h: 1.3, sill: 0.9 },
        { wall: 'W', pos: 0.3, w: 1.3, h: 1.3, sill: 0.9 },
        { wall: 'E', pos: -1.6, w: 1.3, h: 1.3, sill: 0.9 },
        { wall: 'S', pos: -2.6, w: 1.6, h: 1.3, sill: 0.9 }
      ]
    });

    var cupMat = 0xf5efe2;
    function cup(x, y, z) {
      Props.cyl(b, { r: 0.04, rTop: 0.05, h: 0.07, x: x, y: y, z: z, color: cupMat, seg: 12, cast: false });
      Props.cyl(b, { r: 0.035, h: 0.005, x: x, y: y + 0.065, z: z, color: 0x4a2a18, seg: 12, cast: false });
    }

    // ---------- Theke (Nordwand) ----------
    Props.counter(b, { x: -1.5, z: -2.6, w: 3.6, d: 0.7, h: 1.05, color: 0x5a3b28, topColor: 0x8a8378, topTex: 'marble' });
    Props.coffeeMachine(b, { x: -2.4, y: 1.05, z: -2.65 });
    Props.cashRegister(b, { x: -0.6, y: 1.05, z: -2.6, ry: 0 });
    // Vitrine mit Gebäck
    Props.box(b, { w: 0.7, h: 0.22, d: 0.4, x: -1.5, y: 1.05, z: -2.55, color: 0xcfe6ee, rough: 0.1, opacity: 0.5, cast: false });
    Props.box(b, { w: 0.6, h: 0.08, d: 0.3, x: -1.5, y: 1.05, z: -2.55, color: 0xd9a05b });
    cup(-1.1, 1.05, -2.35); cup(-2.0, 1.05, -2.3); cup(-0.2, 1.05, -2.35);
    // Regal hinter der Theke (Tassen, Gläser) und Kaffeebohnen-Säcke
    Props.box(b, { w: 3.2, h: 0.04, d: 0.25, x: -1.5, y: 1.7, z: -3.37, color: 0x7a5636, cast: false });
    Props.box(b, { w: 3.2, h: 0.04, d: 0.25, x: -1.5, y: 2.2, z: -3.37, color: 0x7a5636, cast: false });
    for (var i = 0; i < 8; i++) {
      Props.cyl(b, { r: 0.04, h: 0.08, x: -2.8 + i * 0.36, y: 1.74, z: -3.37, color: i % 2 ? 0xf5efe2 : 0x3d8a8f, seg: 10, cast: false });
      Props.box(b, { w: 0.12, h: 0.2, d: 0.1, x: -2.75 + i * 0.36, y: 2.24, z: -3.37, color: [0x8a5a3a, 0xb98255, 0x6b4a34][i % 3], cast: false });
    }
    Props.sign(b, { text: 'Café Kolben', w: 2.0, h: 0.5, x: -1.5, y: 2.65, z: -3.47, bg: '#3a2418', fg: '#f6d9a0' });
    Props.npc(b, { figure: 'barista', x: -1.5, z: -3.2, ry: 0, name: 'Barista', collide: false, onUse: function (api) {
      api.npcTalk({ figure: 'barista', name: 'Barista', text: 'Willkommen im Café Kolben! Der Kaffee kostet 4 Euro und ohne läuft hier am Laptop gar nichts.',
        actions: [{ label: 'Kaffee bestellen', run: function (api2) { api2.buyCoffee(); } }] });
    } });
    // Dampf über der Maschine
    var steam = [0, 1, 2].map(function (k) { return Props.sphere(b, { r: 0.03, x: -2.4, y: 1.6, z: -2.65, color: 0xffffff, opacity: 0.35, cast: false }); });
    b.animators.push(function (dt, t) {
      steam.forEach(function (s, k) { var p = ((t * 0.4 + k / 3) % 1); s.position.set(-2.4 + Math.sin(t + k * 2) * 0.05, 1.55 + p * 0.5, -2.65); s.scale.setScalar(0.6 + p); });
    });

    // ---------- Arbeitstische an der Ostseite ----------
    Props.table(b, { x: 3.2, z: -2.2, w: 1.2, d: 0.7, color: 0x8a5a3a });
    Props.laptop(b, { x: 3.2, y: 0.75, z: -2.2, ry: 0 });
    Props.chair(b, { x: 3.2, z: -1.4, ry: Math.PI, color: 0x3b4a5a });
    cup(3.6, 0.75, -2.1);
    Props.table(b, { x: 3.2, z: 0.3, w: 1.2, d: 0.7, color: 0x8a5a3a });
    Props.laptop(b, { x: 3.2, y: 0.75, z: 0.3, ry: 0 });
    Props.chair(b, { x: 3.2, z: 1.0, ry: Math.PI, color: 0x3b4a5a });
    cup(3.6, 0.75, 0.4);

    // ---------- Kalles Tisch ----------
    Props.table(b, { x: 1.0, z: 0.6, w: 0.9, round: true, color: 0xb98255 });
    Props.chair(b, { x: 1.0, z: 1.3, ry: Math.PI, color: 0x7a3b2e });
    Props.chair(b, { x: 1.0, z: -0.1, ry: 0, color: 0x7a3b2e });
    cup(0.85, 0.75, 0.6); cup(1.15, 0.75, 0.55);
    Props.npc(b, { figure: 'kalle', x: 1.0, z: 1.3, ry: Math.PI, pose: 'sit', name: 'Kalle', label: 'Mit Kalle plaudern', radius: 1.7, onUse: function (api) {
      api.npcTalk({ figure: 'kalle', name: 'Chef Kalle',
        text: 'Na, Freelancer! Mein Tipp: Lern für die AP2 jeden Tag eine halbe Stunde, statt am Wochenende alles auf einmal. Und schreib jede Stunde auf, die du abrechnen kannst, sonst schenkst du sie dem Kunden.',
        actions: [{ label: 'Danke, Kalle!', run: function () {} }] });
    } });

    // ---------- Gäste ----------
    Props.table(b, { x: -1.6, z: 0.2, w: 0.9, d: 0.9, color: 0x6b4a34 });
    Props.chair(b, { x: -2.35, z: 0.2, ry: Math.PI / 2, color: 0x2f6f6a });
    Props.chair(b, { x: -0.85, z: 0.2, ry: -Math.PI / 2, color: 0x2f6f6a });
    Props.npc(b, { figure: 'gast1', x: -2.35, z: 0.2, ry: Math.PI / 2, pose: 'sit', collide: false });
    Props.npc(b, { figure: 'gast2', x: -0.85, z: 0.2, ry: -Math.PI / 2, pose: 'sit', collide: false });
    cup(-1.75, 0.75, 0.15); cup(-1.45, 0.75, 0.3);
    Props.table(b, { x: -3.9, z: -0.5, w: 0.8, round: true, color: 0xa87a52 });
    Props.chair(b, { x: -3.9, z: 0.15, ry: Math.PI, color: 0xb74532 });
    Props.npc(b, { figure: 'gast3', x: -3.9, z: 0.15, ry: Math.PI, pose: 'sit', collide: false });
    cup(-3.9, 0.75, -0.5);
    Props.laptop(b, { x: -3.65, y: 0.75, z: -0.6, ry: 0 });

    // ---------- Sitzecke (Südwesten) ----------
    Props.rug(b, { x: -2.9, z: 2.0, w: 1.9, d: 2.0, color: 0x8f4a3b });
    Props.sofa(b, { x: -4.0, z: 2.0, w: 1.8, ry: Math.PI / 2, color: 0x4f6b5a });
    Props.table(b, { x: -2.8, z: 2.0, w: 0.8, d: 0.5, h: 0.4, color: 0x6b4a34 });
    cup(-2.8, 0.4, 2.0);
    Props.chair(b, { x: -2.0, z: 2.0, ry: -Math.PI / 2, color: 0xc48a3a });
    Props.plant(b, { x: -4.1, z: 3.15, size: 1.2 });
    Props.lamp(b, { type: 'floor', x: -4.15, z: 0.75 });

    // ---------- Dekor ----------
    Props.shelf(b, { x: 2.8, z: -3.3, w: 1.6, h: 2.0, ry: 0 });
    Props.clock(b, { x: 0.8, y: 2.45, z: -3.46, ry: 0 });
    Props.picture(b, { x: 0.8, y: 1.8, z: -3.46, ry: 0, w: 0.9, h: 0.6, color: 0x6fa8c9 });
    Props.picture(b, { x: 4.47, y: 2.1, z: 0.3, ry: -Math.PI / 2, w: 0.7, h: 0.5, color: 0xd9694a });
    Props.picture(b, { x: -4.47, y: 2.6, z: 1.0, ry: Math.PI / 2, w: 0.7, h: 0.5, color: 0x4c9a6a });
    Props.sign(b, { text: 'Heute: Kaffee 4 €', w: 1.3, h: 0.5, x: 0.4, y: 1.5, z: hd - 0.03, ry: Math.PI, bg: '#2b2b2b', fg: '#f6d9a0' });
    Props.plant(b, { x: 4.1, z: -3.1, size: 1.3, color: 0x3d8a5c });
    Props.plant(b, { x: 4.1, z: 1.9, size: 1.0 });
    Props.plant(b, { x: -4.1, z: -3.1, size: 1.1, color: 0x5aa06a });
    Props.plant(b, { x: 0.5, z: 3.1, size: 0.9 });
    Props.rug(b, { x: 3.2, z: -0.9, w: 1.6, d: 1.3, color: 0x3f5a7d });
    Props.lamp(b, { type: 'ceiling', x: -1.5, z: -1.1, y: 2.7 });
    Props.lamp(b, { type: 'ceiling', x: 1.0, z: 0.4, y: 2.7 });
    Props.lamp(b, { type: 'ceiling', x: 3.0, z: -0.9, y: 2.7 });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'tuer', label: 'Café verlassen (Karte)', x: 2.5, z: 3.0, radius: 1.3, y: 1.4, onUse: function (api) { api.openMap(); } });
    Props.interact(b, { id: 'kaffee', label: 'Kaffee bestellen (4 €)', x: -1.5, z: -1.8, radius: 1.3, y: 1.7, onUse: function (api) { api.buyCoffee(); } });
    Props.interact(b, { id: 'laptop', label: 'Am Laptop arbeiten', x: 3.2, z: -1.4, radius: 1.2, y: 1.4, onUse: function (api) { api.openJobs(); } });
    Props.interact(b, { id: 'laptop2', label: 'Am Laptop arbeiten', x: 3.2, z: 1.0, radius: 1.2, y: 1.4, onUse: function (api) { api.openJobs(); } });

    b.spawns.default = { x: 2.5, z: 2.5, ry: Math.PI };
    b.spawns.door = b.spawns.default;

    b.lighting = { bg: 0x1c1712, sun: 0.7, hemi: 0.45, exposure: 0.92 };
    return b;
  }
});

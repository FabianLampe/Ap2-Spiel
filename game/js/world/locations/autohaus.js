// Ort: Autohaus Rost & Söhne. Heller Ausstellungsraum mit drei Autos auf Podesten, Verkäufer, Kundenecke.
// Raum 12 x 8 m: x -6..6, z -4..4 (Norden = -z). Tür in der Südwand bei x = 0.
World.registerLocation({
  id: 'autohaus',
  name: 'Autohaus Rost & Söhne',
  build: function (ctx) {
    var b = Props.builder();
    var CARS = (ctx.Economy && ctx.Economy.CARS) || null;
    function carText(t, dn, dp) {
      var c = CARS && CARS[t];
      return (c ? c.name : dn) + '\n' + (c ? c.price : dp) + ' €';
    }

    Props.room(b, {
      w: 12, d: 8, h: 3.8,
      floor: { tex: 'concrete', color: '#cfd2d4', repeat: [6, 4], rough: 0.45 },
      wall: { tex: 'plaster', color: '#f1efe9' }, trim: 0xffffff,
      doors: [{ wall: 'S', pos: 0, w: 1.6, h: 2.4 }],
      windows: [
        { wall: 'S', pos: -3.3, w: 3.2, h: 2.4, sill: 0.3 },
        { wall: 'S', pos: 3.3, w: 3.2, h: 2.4, sill: 0.3 },
        { wall: 'N', pos: -3.6, w: 2.6, h: 2.0, sill: 0.5 },
        { wall: 'N', pos: 0, w: 2.6, h: 2.0, sill: 0.5 },
        { wall: 'E', pos: -1.2, w: 2.2, h: 2.0, sill: 0.5 }
      ]
    });

    // ---------- Autos auf Podesten (Länge entlang z) ----------
    var CZ = -0.4;
    var defs = [
      { tier: 1, x: -3.7, pw: 2.0, pd: 4.4, color: 0xa8402e, dn: 'Rostlaube', dp: 900 },
      { tier: 2, x: -0.5, pw: 2.0, pd: 4.8, color: 0x9ea4ab, dn: 'Gebrauchtwagen', dp: 2600 },
      { tier: 3, x: 2.55, pw: 2.1, pd: 5.2, color: 0x1f3a6b, dn: 'Firmenwagen', dp: 6000 }
    ];
    defs.forEach(function (d) {
      Props.box(b, { w: d.pw, h: 0.15, d: d.pd, x: d.x, y: 0, z: CZ, tex: 'marble', color: 0xe6e3dc, collide: true });
      Props.box(b, { w: d.pw + 0.06, h: 0.03, d: d.pd + 0.06, x: d.x, y: 0.15, z: CZ, color: 0xd2cfc8, cast: false });
      var car = Props.car(b, { x: d.x, z: CZ, ry: 0, color: d.color, tier: d.tier });
      car.position.y = 0.15;
      var front = CZ + d.pd / 2;
      Props.box(b, { w: 0.05, h: 0.5, d: 0.05, x: d.x, y: 0, z: front + 0.2, color: 0x444444 });
      Props.sign(b, { text: carText(d.tier, d.dn, d.dp), w: 1.1, h: 0.5, x: d.x, y: 0.75, z: front + 0.2, ry: 0, bg: '#1f2a33', fg: '#ffe9a8', font: 'bold 56px sans-serif' });
    });

    // ---------- Verkäufer am Schreibtisch (Nordost) ----------
    Props.desk(b, { x: 5.0, z: -2.6, w: 1.4, d: 0.7, ry: Math.PI, color: 0xd8d2c4 });
    Props.laptop(b, { x: 4.8, y: 0.77, z: -2.6, ry: Math.PI });
    Props.box(b, { w: 0.2, h: 0.12, d: 0.3, x: 5.4, y: 0.77, z: -2.6, color: 0xf87845 });
    Props.box(b, { w: 0.1, h: 0.02, d: 0.1, x: 4.4, y: 0.77, z: -2.5, color: 0x2b2b2b });
    Props.npc(b, {
      figure: 'verkaeufer', x: 5.0, z: -3.4, ry: 0, pose: 'stand', name: 'Herr Rost',
      label: 'Mit dem Verkäufer sprechen',
      onUse: function (api) {
        api.npcTalk({
          figure: 'verkaeufer', name: 'Herr Rost',
          text: 'Willkommen bei Rost & Söhne! Ein Auto, mein Freund, ist die beste Geldanlage überhaupt: Mit einem eigenen Wagen erreichst du mehr Kunden und verdienst mehr Honorar. Die Rostlaube fährt meistens, und meistens ist doch schon ganz schön viel, oder? Für dich mache ich natürlich einen Sonderpreis. Na, welches darf es sein?',
          actions: [{ label: 'Autos ansehen', run: function (api2) { api2.openShop('car'); } }]
        });
      }
    });

    // ---------- Kaffeetheke (Südost) ----------
    Props.counter(b, { x: 5.5, z: 2.6, w: 1.8, d: 0.6, h: 1.05, ry: -Math.PI / 2, color: 0x5b6670, topTex: 'marble' });
    Props.coffeeMachine(b, { x: 5.5, y: 1.05, z: 2.3, ry: -Math.PI / 2 });
    [0, 1, 2].forEach(function (i) {
      Props.cyl(b, { r: 0.04, h: 0.09, x: 5.5, y: 1.05, z: 3.0 + i * 0.12 - 0.12, color: i === 1 ? 0xf87845 : 0xfffdf7, seg: 12 });
    });
    Props.box(b, { w: 0.25, h: 0.06, d: 0.2, x: 5.4, y: 1.05, z: 3.2, color: 0xffcf5b });

    // ---------- Kundenecke (Südwest) ----------
    Props.sofa(b, { x: -4.6, z: 3.4, w: 1.8, ry: Math.PI, color: 0x3f5a70 });
    Props.rug(b, { x: -4.6, z: 2.6, w: 2.0, d: 1.2, color: 0x8f5a3b });
    Props.table(b, { x: -4.6, z: 2.55, w: 0.9, d: 0.5, h: 0.42, color: 0x7a5636 });
    Props.box(b, { w: 0.3, h: 0.02, d: 0.22, x: -4.8, y: 0.42, z: 2.55, color: 0xf87845 });
    Props.box(b, { w: 0.3, h: 0.02, d: 0.22, x: -4.4, y: 0.44, z: 2.55, color: 0x6fa8c9 });
    Props.plant(b, { x: -5.75, z: 3.5, size: 1.0 });

    // ---------- Pflanzen, Reifen, Prospektständer ----------
    Props.plant(b, { x: -1.6, z: 3.5, size: 1.2 });
    Props.plant(b, { x: 1.6, z: 3.5, size: 1.4, color: 0x3d8a5c });
    Props.plant(b, { x: 5.6, z: 0.3, size: 1.2 });
    Props.plant(b, { x: -5.75, z: -1.6, size: 1.2, color: 0x3d8a5c });
    var tire = 0x1a1a1a;
    Props.cyl(b, { r: 0.32, h: 0.24, x: -5.65, y: 0, z: -3.65, color: tire, collide: true });
    Props.cyl(b, { r: 0.18, h: 0.25, x: -5.65, y: 0, z: -3.65, color: 0xc9ced2, seg: 14, cast: false });
    Props.cyl(b, { r: 0.32, h: 0.24, x: -5.65, y: 0.24, z: -3.65, color: tire });
    Props.cyl(b, { r: 0.32, h: 0.24, x: -5.65, y: 0.48, z: -3.65, color: tire });
    Props.cyl(b, { r: 0.1, h: 0.04, x: -5.65, y: 0.72, z: -3.65, color: 0xc9ced2, seg: 10 });
    // Prospektständer
    var pr = Props.group(b, 2.9, 3.6, 0);
    Props.part(pr, 0.6, 1.2, 0.25, 0, 0, 0, Props.mat(0x4a5560));
    [0, 1, 2].forEach(function (i) { Props.part(pr, 0.5, 0.2, 0.05, 0, 0.15 + i * 0.35, 0.14, Props.mat([0xf87845, 0xffcf5b, 0x6fa8c9][i])); });
    Props.collide(b, 2.9, 3.6, 0.6, 0.25, 0);

    // ---------- Wanddeko ----------
    Props.sign(b, { text: 'Rost & Söhne', w: 3.4, h: 0.6, x: -5.89, y: 2.9, z: -0.4, ry: Math.PI / 2, bg: '#a8402e', fg: '#fff6e6' });
    Props.sign(b, { text: 'Autohaus seit 1974', w: 1.8, h: 0.3, x: -5.89, y: 2.35, z: -0.4, ry: Math.PI / 2, bg: '#253543', fg: '#ffe9a8' });
    Props.sign(b, { text: 'Jetzt finanzieren!\n0 % (fast)', w: 1.3, h: 0.9, x: 2.3, y: 1.9, z: -3.89, ry: 0, bg: '#f2c14e', fg: '#222222', font: 'bold 46px sans-serif' });
    Props.sign(b, { text: 'TÜV neu', w: 0.9, h: 0.4, x: 5.89, y: 2.3, z: 1.6, ry: -Math.PI / 2, bg: '#2f7d4f', fg: '#ffffff' });
    Props.picture(b, { x: -1.8, y: 2.4, z: -3.89, ry: 0, w: 0.9, h: 0.6, color: 0xd9694a });
    Props.picture(b, { x: 5.89, y: 2.0, z: 3.2, ry: -Math.PI / 2, w: 0.8, h: 0.55 });
    Props.picture(b, { x: -5.89, y: 2.0, z: 2.4, ry: Math.PI / 2, w: 0.8, h: 0.55, color: 0x4c9a6a });
    Props.clock(b, { x: 1.7, y: 3.0, z: -3.89, ry: 0 });
    // Schlüsselbrett hinter dem Verkäufer
    Props.box(b, { w: 0.7, h: 0.5, d: 0.04, x: 3.6, y: 1.4, z: -3.9, color: 0x5a3d26 });
    [0, 1, 2, 3].forEach(function (i) { Props.box(b, { w: 0.05, h: 0.1, d: 0.03, x: 3.4 + i * 0.13, y: 1.55, z: -3.86, color: 0xc9ced2, cast: false }); });

    // ---------- Beleuchtung (3 Punktlichter) ----------
    Props.lamp(b, { type: 'ceiling', x: -3.7, z: -0.4, y: 3.7 });
    Props.lamp(b, { type: 'ceiling', x: 0, z: 1.5, y: 3.7, light: false });
    Props.lamp(b, { type: 'ceiling', x: -0.5, z: -1.8, y: 3.7, light: false });
    Props.lamp(b, { type: 'ceiling', x: 2.55, z: -0.4, y: 3.7 });
    Props.lamp(b, { type: 'ceiling', x: 5.0, z: -2.6, y: 3.7, light: false });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'tuer', label: 'Autohaus verlassen (Karte)', x: 0, z: 3.4, radius: 1.5, y: 1.4, onUse: function (api) { api.openMap(); } });
    Props.interact(b, { id: 'autos', label: 'Autos ansehen', x: -2.1, z: 1.4, radius: 1.5, y: 1.4, onUse: function (api) { api.openShop('car'); } });

    // ---------- Start ----------
    b.spawns.default = { x: 0, z: 2.8, ry: Math.PI };
    b.spawns.door = b.spawns.default;

    b.lighting = { bg: 0x1a2028, sun: 0.9, hemi: 0.6, exposure: 0.98, sunColor: 0xfff6e6 };
    return b;
  }
});

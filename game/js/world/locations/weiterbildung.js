// Ort: Lernzentrum Datenwerk. Hier kauft der Spieler Skills für neue Aufträge.
// Raum 10 x 7,5 m (x -5..5, z -3,75..3,75), Tafel im Norden, Tür im Süden bei x = 3.
World.registerLocation({
  id: 'weiterbildung',
  name: 'Lernzentrum Datenwerk',
  build: function (ctx) {
    var b = Props.builder();
    var W = 10, D = 7.5, hw = W / 2, hd = D / 2;

    Props.room(b, {
      w: W, d: D, h: 2.9,
      floor: { tex: 'tile', color: '#a9b0b3', repeat: [5, 4] },
      wall: { tex: 'plaster', color: '#eef0ec' }, trim: 0xffffff,
      doors: [{ wall: 'S', pos: 3.0, w: 1.0 }],
      windows: [
        { wall: 'S', pos: -2.0, w: 1.5, h: 1.2, sill: 1.0 },
        { wall: 'S', pos: 0.0, w: 1.5, h: 1.2, sill: 1.0 },
        { wall: 'W', pos: 2.6, w: 1.1, h: 1.2, sill: 1.0 },
        { wall: 'E', pos: 2.9, w: 1.1, h: 1.2, sill: 1.0 }
      ]
    });

    // ---------- Vorne: Tafel, Leinwand, Lehrerpult ----------
    Props.box(b, { w: 3.2, h: 1.3, d: 0.05, x: -1.3, y: 1.0, z: -hd + 0.03, color: 0xb9c2c6 });   // Rahmen
    Props.sign(b, { text: "SELECT name\nFROM kunden\nWHERE ort = 'Köln';", w: 3.0, h: 1.2, x: -1.3, y: 1.65, z: -hd + 0.07, bg: '#f4f6f2', fg: '#1f3a4d', font: 'bold 44px monospace' });
    Props.box(b, { w: 2.6, h: 0.04, d: 0.1, x: -1.3, y: 1.0, z: -hd + 0.1, color: 0x888f93 });   // Ablage
    Props.box(b, { w: 0.12, h: 0.025, d: 0.03, x: -0.6, y: 1.04, z: -hd + 0.12, color: 0xd94a3a }); // Kreide/Stift
    Props.box(b, { w: 0.12, h: 0.025, d: 0.03, x: -1.9, y: 1.04, z: -hd + 0.12, color: 0x2c6fb7 });
    // Beamer-Leinwand
    Props.box(b, { w: 2.3, h: 0.05, d: 0.1, x: 2.9, y: 2.55, z: -hd + 0.1, color: 0x333a3e });
    Props.sign(b, { text: 'ER-Modell:\nKunde 1:n Bestellung', w: 2.1, h: 1.4, x: 2.9, y: 1.8, z: -hd + 0.07, bg: '#fbfbf6', fg: '#26445c', font: 'bold 40px sans-serif' });
    var beam = Props.group(b, 1.0, -1.6, 0);
    Props.part(beam, 0.35, 0.12, 0.28, 0, 0, 0, Props.mat(0xdcdedf, { rough: 0.4 }));
    Props.cylPart(beam, 0.05, 0.05, 0.02, 0, 0.12, -0.15, Props.mat(0x222222), 12);
    beam.position.y = 2.6;     // hängt unter der Decke (ohne Kollision)
    Props.clock(b, { x: -4.0, y: 2.35, z: -hd + 0.03, ry: 0 });

    // Lehrerpult
    Props.desk(b, { x: 0.3, z: -2.75, w: 1.7, d: 0.7, ry: Math.PI, color: 0xa87a52 });
    Props.laptop(b, { x: 0.05, y: 0.77, z: -2.75, ry: Math.PI });
    Props.box(b, { w: 0.22, h: 0.02, d: 0.3, x: 0.65, y: 0.77, z: -2.75, color: 0xf2efe6 });
    Props.chair(b, { x: 0.3, z: -3.35, ry: 0, color: 0x3b4a5a });
    Props.npc(b, { figure: 'datenschutz', x: -0.8, z: -3.2, ry: 0, name: 'Dr. Blattner', label: 'Mit Dr. Blattner sprechen', onUse: function (api) {
      api.npcTalk({
        figure: 'datenschutz', name: 'Dr. Blattner',
        text: 'Willkommen im Datenwerk. Jeder neue Skill schaltet neue Aufträge frei, und Wissen ist der beste Zinseszins. Aber bitte: Aufgepasst im Unterricht, und den Datenschutz nicht vergessen. Personenbezogene Daten sind kein Spielzeug!',
        actions: [{ label: 'Skills ansehen', run: function (api2) { api2.openShop('skills'); } }, { label: 'Notizbuch erweitern', run: function (api2) { api2.openShop('notes'); } }]
      });
    } });

    // ---------- Schülertische: 3 Reihen x 3 Tische ----------
    var cols = [-3.3, -0.9, 1.5], rows = [-1.0, 0.4, 1.8];
    var deskCols = [0xd8c39a, 0xcdb88e, 0xd8c39a];
    var chairCols = [0x2f6f8f, 0x3f7d5a, 0xb36a3c];
    var laptopAt = { '0,0': 1, '0,2': 1, '1,1': 1, '2,0': 1, '2,2': 1, '1,0': 1 };
    rows.forEach(function (rz, ri) {
      cols.forEach(function (cx, ci) {
        Props.table(b, { x: cx, z: rz, w: 1.4, d: 0.6, color: deskCols[ci] });
        Props.chair(b, { x: cx - 0.35, z: rz + 0.55, ry: Math.PI, color: chairCols[ri] });
        Props.chair(b, { x: cx + 0.35, z: rz + 0.55, ry: Math.PI, color: chairCols[ri] });
        if (laptopAt[ri + ',' + ci]) Props.laptop(b, { x: cx - 0.3, y: 0.75, z: rz, ry: 0 });
        // Block und Stift
        Props.box(b, { w: 0.2, h: 0.015, d: 0.28, x: cx + 0.3, y: 0.75, z: rz, ry: 0.2, color: 0xf6f3e8 });
        Props.box(b, { w: 0.14, h: 0.01, d: 0.02, x: cx + 0.05, y: 0.75, z: rz + 0.1, ry: 0.4, color: 0x2c6fb7 });
      });
    });
    // Schüler
    Props.npc(b, { figure: 'gast1', x: cols[0] + 0.35, z: rows[0] + 0.55, ry: Math.PI, pose: 'sit', collide: false });
    Props.npc(b, { figure: 'gast2', x: cols[1] - 0.35, z: rows[1] + 0.55, ry: Math.PI, pose: 'sit', collide: false });

    // ---------- Westwand: Regale, Poster, Garderobe ----------
    Props.shelf(b, { x: -hw + 0.25, z: -1.3, ry: Math.PI / 2, w: 1.4, h: 1.8, d: 0.35 });
    Props.shelf(b, { x: -hw + 0.25, z: 0.6, ry: Math.PI / 2, w: 1.4, h: 1.8, d: 0.35 });
    Props.sign(b, { text: 'JOIN\nA  ( A∩B )  B', w: 1.0, h: 0.75, x: -hw + 0.03, y: 1.9, z: -2.8, ry: Math.PI / 2, bg: '#f1eadb', fg: '#7a2f2f', font: 'bold 44px sans-serif' });
    Props.plant(b, { x: -hw + 0.4, z: -3.35, size: 1.3 });
    // Garderobe an der Südwand (Westecke)
    Props.box(b, { w: 1.6, h: 0.05, d: 0.08, x: -4.1, y: 1.7, z: hd - 0.06, color: 0x6b4a34 });
    [-4.7, -4.4, -4.1, -3.8, -3.5].forEach(function (gx, i) {
      Props.cyl(b, { r: 0.03, h: 0.06, x: gx, y: 1.65, z: hd - 0.1, color: 0x2b2b2b, seg: 8 });
      Props.box(b, { w: 0.34, h: 0.7, d: 0.1, x: gx, y: 0.95, z: hd - 0.16, color: [0x2f4b6b, 0x8a3b3b, 0x4a5a3a, 0x555a60, 0x6b5a8a][i], cast: false });
    });
    Props.box(b, { w: 1.6, h: 0.3, d: 0.4, x: -4.1, y: 0, z: hd - 0.3, color: 0x6b4a34, collide: true });   // Schuhbank
    Props.cyl(b, { r: 0.05, h: 0.3, x: -4.1, y: 0.3, z: hd - 0.3, color: 0x333 });

    // ---------- Ostwand: Kursaushang, Kaffeeecke, Mülleimer ----------
    Props.box(b, { w: 1.3, h: 0.9, d: 0.05, x: hw - 0.06, y: 1.1, z: -1.6, color: 0x8a6547, cast: false });
    Props.sign(b, { text: 'KURSANGEBOT\nSQL · UML · Java\nNetzwerk · Recht', w: 1.2, h: 0.8, x: hw - 0.03, y: 1.55, z: -1.6, ry: -Math.PI / 2, bg: '#f7f3e6', fg: '#243c50', font: 'bold 34px sans-serif' });
    Props.plant(b, { x: hw - 0.4, z: -3.3, size: 1.1, color: 0x3d8a5c });
    Props.box(b, { w: 0.3, h: 0.4, d: 0.3, x: hw - 0.35, y: 0, z: -0.5, color: 0x3a4248, collide: true });   // Mülleimer
    Props.cyl(b, { r: 0.13, h: 0.02, x: hw - 0.35, y: 0.4, z: -0.5, color: 0x1e2226, seg: 12 });
    Props.counter(b, { x: hw - 0.4, z: 1.0, w: 1.4, d: 0.5, h: 0.9, ry: -Math.PI / 2, color: 0xdad4c6, topTex: 'marble' });
    Props.coffeeMachine(b, { x: hw - 0.4, y: 0.9, z: 1.3, ry: -Math.PI / 2 });
    Props.box(b, { w: 0.08, h: 0.1, d: 0.08, x: hw - 0.4, y: 0.9, z: 0.7, color: 0xf2efe6 });   // Tasse
    Props.box(b, { w: 0.08, h: 0.1, d: 0.08, x: hw - 0.4, y: 0.9, z: 0.55, color: 0xb74532 });
    // Wasserspender
    var ws = Props.group(b, hw - 0.4, 2.1, 0);
    Props.part(ws, 0.32, 0.9, 0.32, 0, 0, 0, Props.mat(0xe8ecee, { rough: 0.4 }));
    Props.cylPart(ws, 0.13, 0.13, 0.4, 0, 0.9, 0, Props.mat(0x7fc4e8, { rough: 0.2, opacity: 0.6 }), 16);
    Props.collide(b, hw - 0.4, 2.1, 0.32, 0.32, 0);

    // ---------- Weiteres Leben ----------
    Props.rug(b, { x: 0.3, z: -1.95, w: 2.4, d: 0.8, color: 0x3f6d8c });
    Props.plant(b, { x: hw - 0.4, z: 3.3, size: 1.0 });
    Props.box(b, { w: 0.5, h: 0.1, d: 0.35, x: 3.0, y: 0, z: hd - 0.4, color: 0x555a60, cast: false });   // Fußmatte an der Südwand (Optik)
    // Deckenlampen (3 Punktlichter)
    Props.lamp(b, { type: 'ceiling', x: -2.1, z: -0.3, y: 2.8 });
    Props.lamp(b, { type: 'ceiling', x: 2.0, z: 0.9, y: 2.8 });
    Props.lamp(b, { type: 'ceiling', x: 0.3, z: -2.4, y: 2.8 });
    // Beamer-Lichtkegel als kleines Leuchtelement
    var dot = Props.sphere(b, { r: 0.015, x: 1.0, y: 2.5, z: -1.75, color: 0xff3030, emissive: 0xff3030, cast: false });
    b.animators.push(function (dt, t) { dot.visible = Math.sin(t * 2.0) > -0.2; });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'kurse', label: 'Kursangebot ansehen', x: hw - 1.2, z: -1.6, radius: 1.4, y: 1.6, onUse: function (api) { api.openShop('skills'); } });
    Props.interact(b, { id: 'tuer', label: 'Lernzentrum verlassen (Karte)', x: 3.0, z: hd - 0.5, radius: 1.5, y: 1.3, onUse: function (api) { api.openMap(); } });

    // ---------- Startpunkte ----------
    b.spawns.default = { x: 3.0, z: hd - 1.0, ry: Math.PI };
    b.spawns.door = b.spawns.default;

    b.lighting = { bg: 0x161c22, sun: 0.9, hemi: 0.55, exposure: 0.95 };
    return b;
  }
});

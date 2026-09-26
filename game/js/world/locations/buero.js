// Ort: Dein Büro (Coworking Nord). Erst nach Anmietung beim Makler zugänglich.
// Raum 9 x 6,5 m: x -4,5 .. 4,5, z -3,25 .. 3,25. Tür in der Südwand bei x = 3,0.
World.registerLocation({
  id: 'buero',
  name: 'Dein Büro – Coworking Nord',
  build: function (ctx) {
    var b = Props.builder();
    var w = 9, d = 6.5, hw = w / 2, hd = d / 2;

    Props.room(b, {
      w: w, d: d, h: 2.9,
      floor: { tex: 'carpet', color: '#8b98a6', repeat: [w / 2.2, d / 2.2] },
      wall: { tex: 'plaster', color: '#eef1f4' }, trim: 0xffffff,
      doors: [{ wall: 'S', pos: 3.0, w: 1.0 }],
      windows: [{ wall: 'N', pos: -2.2, w: 2.4, h: 1.5, sill: 0.8 }, { wall: 'N', pos: 2.2, w: 2.4, h: 1.5, sill: 0.8 }]
    });

    var WALLS = hd - 0.03;   // Abstand für Wandschmuck an der Südwand

    // ---------- Arbeitsplätze an der Nordwand ----------
    var deskZ = -hd + 0.4, chairZ = -hd + 1.15;
    var xs = [2.6, 0.6, -1.4];
    var chairCol = [0x2f6f8f, 0x3b4a5a, 0x7a4f8a];
    xs.forEach(function (x, i) {
      Props.desk(b, { x: x, z: deskZ, w: 1.4, color: i === 0 ? 0xd9c7a6 : 0xe4e0d6 });
      Props.laptop(b, { x: x - 0.15, y: 0.77, z: deskZ, ry: 0 });
      Props.chair(b, { x: x, z: chairZ, ry: Math.PI, color: chairCol[i], pad: chairCol[i] });
      Props.box(b, { w: 0.08, h: 0.09, d: 0.08, x: x + 0.4, y: 0.77, z: deskZ + 0.15, color: 0xf2f2f2 });      // Tasse
      Props.box(b, { w: 0.22, h: 0.01, d: 0.3, x: x - 0.45, y: 0.77, z: deskZ + 0.05, ry: 0.3, color: 0xffffff }); // Papier
      Props.box(b, { w: 0.14, h: 0.03, d: 0.2, x: x + 0.1, y: 0.77, z: deskZ + 0.22, color: 0x22262b });          // Maus/Notizbuch
    });
    Props.lamp(b, { type: 'table', x: 3.15, y: 0.77, z: deskZ - 0.15 });
    // Kabelbox unter Schreibtisch des Spielers, Router
    var router = Props.box(b, { w: 0.22, h: 0.04, d: 0.16, x: 3.15, y: 0.77, z: deskZ + 0.2, color: 0x1a1f24 });
    var led = Props.sphere(b, { r: 0.012, x: 3.15, y: 0.83, z: deskZ + 0.29, color: 0x33ff88, emissive: 0x33ff88, cast: false });
    b.animators.push(function (dt, t) { led.visible = Math.sin(t * 6) > -0.3; });

    // Lennox am dritten Schreibtisch
    Props.npc(b, {
      figure: 'startup', x: -1.4, z: chairZ, ry: Math.PI, pose: 'sit', name: 'Lennox', label: 'Mit Lennox quatschen', radius: 1.7,
      onUse: function (api) {
        api.npcTalk({
          figure: 'startup', name: 'Lennox',
          text: 'Hey! Wir bauen gerade die Uber-App für Kaffeemaschinen. Läuft alles auf einer einzigen Datenbank, was soll da schon schiefgehen? Backup? Ähm... nächste Woche.',
          actions: [{ label: 'Viel Erfolg!', run: function (a) { a.notify('info', 'Lennox grinst und tippt weiter.'); } }]
        });
      }
    });

    // ---------- Besprechungsecke (Südwest) ----------
    Props.rug(b, { x: -2.6, z: 1.7, w: 3.2, d: 2.4, color: 0x3f5f7a });
    Props.table(b, { x: -2.6, z: 1.7, w: 1.6, d: 0.9, color: 0xe7e3da });
    [-3.0, -2.2].forEach(function (x) {
      Props.chair(b, { x: x, z: 0.93, ry: 0, color: 0x3b4a5a, pad: 0x3b4a5a });
      Props.chair(b, { x: x, z: 2.47, ry: Math.PI, color: 0x3b4a5a, pad: 0x3b4a5a });
    });
    Props.laptop(b, { x: -2.9, y: 0.75, z: 1.55, ry: Math.PI });
    Props.box(b, { w: 0.3, h: 0.01, d: 0.21, x: -2.2, y: 0.75, z: 1.8, ry: 0.4, color: 0xffffff });
    Props.cyl(b, { r: 0.05, h: 0.12, x: -2.6, y: 0.75, z: 1.7, color: 0x4fa3c9 });   // Wasserglas

    // Whiteboard an der Westwand
    Props.box(b, { w: 0.05, h: 1.1, d: 2.0, x: -hw + 0.03, y: 1.0, z: 1.6, color: 0xbfc5ca });
    Props.sign(b, { text: 'SELECT * FROM erfolg;\nSprint 12', w: 1.9, h: 1.0, x: -hw + 0.07, y: 1.55, z: 1.6, ry: Math.PI / 2, bg: '#f7f9fb', fg: '#1f4f8a', font: 'bold 44px sans-serif' });

    // Regal an der Westwand
    Props.shelf(b, { x: -hw + 0.25, z: -1.3, ry: Math.PI / 2, w: 1.5, h: 2.0, color: 0xd9d3c4 });
    Props.box(b, { w: 0.3, h: 0.3, d: 0.3, x: -hw + 0.25, y: 2.0, z: -1.3, color: 0xc9b98a });   // Karton obenauf

    // Pinnwand + Bilder + Uhr (Südwand, Nordwand)
    Props.box(b, { w: 1.3, h: 0.9, d: 0.03, x: -1.0, y: 1.1, z: WALLS - 0.01, color: 0xb98a5a });
    [[-1.4, 1.5, 0xffe27a], [-1.0, 1.7, 0xff9fb0], [-0.6, 1.45, 0x9fd6ff], [-1.15, 1.35, 0xb8f0a8]].forEach(function (n) {
      Props.box(b, { w: 0.12, h: 0.12, d: 0.01, x: n[0], y: n[1], z: WALLS - 0.03, color: n[2] });
    });
    Props.clock(b, { x: 0.8, y: 2.2, z: WALLS, ry: Math.PI });
    Props.picture(b, { x: -3.6, y: 2.0, z: WALLS, ry: Math.PI, w: 0.9, h: 0.6, color: 0x6fa8c9 });
    Props.picture(b, { x: 0, y: 2.0, z: -hd + 0.03, ry: 0, w: 0.7, h: 0.5, color: 0xd9694a });
    Props.picture(b, { x: hw - 0.03, y: 2.0, z: -1.2, ry: -Math.PI / 2, w: 0.8, h: 0.55, color: 0x4c9a6a });

    // ---------- Kaffeeecke + Drucker (Ostwand) ----------
    Props.counter(b, { x: hw - 0.4, z: 0.3, w: 1.6, d: 0.6, h: 0.95, ry: -Math.PI / 2, color: 0x4a5560, topTex: 'marble', topColor: 0xe6e6e6 });
    Props.coffeeMachine(b, { x: hw - 0.4, y: 0.95, z: 0.0, ry: -Math.PI / 2 });
    Props.cyl(b, { r: 0.05, h: 0.09, x: hw - 0.4, y: 0.95, z: 0.55, color: 0xf2f2f2 });     // Tassen
    Props.cyl(b, { r: 0.05, h: 0.09, x: hw - 0.55, y: 0.95, z: 0.7, color: 0xf87845 });
    // Wasserspender
    Props.box(b, { w: 0.34, h: 0.9, d: 0.34, x: hw - 0.35, y: 0, z: 1.7, collide: true, color: 0xe4e9ee });
    Props.cyl(b, { r: 0.13, h: 0.4, x: hw - 0.35, y: 0.9, z: 1.7, color: 0x9fd6f0, opacity: 0.55 });
    Props.box(b, { w: 0.06, h: 0.04, d: 0.06, x: hw - 0.2, y: 0.75, z: 1.7, color: 0x3a8fd0 });
    // Drucker auf Rollcontainer
    Props.box(b, { w: 0.5, h: 0.6, d: 0.5, x: hw - 0.35, y: 0, z: -1.5, collide: true, color: 0xb8bec4 });
    Props.box(b, { w: 0.48, h: 0.22, d: 0.42, x: hw - 0.35, y: 0.6, z: -1.5, color: 0xdfe3e6 });
    Props.box(b, { w: 0.3, h: 0.02, d: 0.2, x: hw - 0.5, y: 0.82, z: -1.5, color: 0xffffff });

    // ---------- Pflanzen ----------
    Props.plant(b, { x: hw - 0.35, z: -hd + 0.4, size: 1.3 });
    Props.plant(b, { x: -hw + 0.4, z: hd - 0.4, size: 1.2, color: 0x3d8a5c });
    Props.plant(b, { x: 1.4, z: hd - 0.4, size: 1.0 });
    Props.plant(b, { x: -hw + 0.4, z: -hd + 0.4, size: 1.1, color: 0x5aa86a });
    var fern = Props.sphere(b, { r: 0.06, x: 0.85, y: 0.79, z: deskZ + 0.1, color: 0x4c9a6a, cast: false });
    b.animators.push(function (dt, t) { fern.position.y = 0.79 + Math.sin(t * 1.2) * 0.005; });

    // ---------- Licht ----------
    Props.lamp(b, { type: 'ceiling', x: -2.6, z: 1.7, y: 2.85, color: 0xf4f8ff });
    Props.lamp(b, { type: 'ceiling', x: 0.6, z: 0.0, y: 2.85, color: 0xf4f8ff });
    Props.lamp(b, { type: 'ceiling', x: 3.0, z: -1.4, y: 2.85, color: 0xf4f8ff });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'tuer', label: 'Büro verlassen (Karte)', x: 3.0, z: hd - 0.5, radius: 1.5, y: 1.3, onUse: function (api) { api.openMap(); } });
    Props.interact(b, { id: 'laptop', label: 'Am Laptop arbeiten', x: 2.6, z: -1.65, radius: 1.2, y: 1.3, onUse: function (api) { api.openJobs(); } });
    Props.interact(b, { id: 'kaffee', label: 'Kaffee holen', x: 3.0, z: 0.3, radius: 1.2, y: 1.5, onUse: function (api) { api.notify('info', 'Im Büro ist der Kaffee inklusive.'); } });

    // ---------- Startpunkte ----------
    b.spawns.default = { x: 3.0, z: hd - 1.1, ry: Math.PI };
    b.spawns.door = b.spawns.default;

    b.lighting = { bg: 0x161c24, sun: 0.62, hemi: 0.4, exposure: 0.82, sunColor: 0xf4f8ff };
    return b;
  }
});

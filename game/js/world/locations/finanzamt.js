// Ort: Finanzamt. Frau Pfennig, Nummernautomat, Wartebereich. Neonlicht, Linoleum, Ironie.
World.registerLocation({
  id: 'finanzamt',
  name: 'Finanzamt',
  build: function (ctx) {
    var b = Props.builder();

    var R = Props.room(b, {
      w: 9, d: 7, h: 2.8,
      floor: { tex: 'tile', color: '#92a397', repeat: [5, 4], rough: 0.68 },
      wall: { tex: 'plaster', color: '#d7dccd' }, trim: 0xb8c0b0,
      doors: [{ wall: 'S', pos: 2.5, w: 1.0 }],
      windows: [
        { wall: 'N', pos: -3.0, w: 1.4, h: 1.2, sill: 1.0 },
        { wall: 'N', pos: 3.0, w: 1.4, h: 1.2, sill: 1.0 },
        { wall: 'W', pos: 2.0, w: 1.4, h: 1.2, sill: 1.0 }
      ]
    });
    var minX = R.minX, maxX = R.maxX, minZ = R.minZ, maxZ = R.maxZ; // -4.5, 4.5, -3.5, 3.5

    // Dunkler Sockelstreifen (Amtsgrün) an der Nordwand
    Props.box(b, { w: 9, h: 0.9, d: 0.04, x: 0, y: 0, z: minZ + 0.02, color: 0x4f6b5c, cast: false });

    // ---------- Schalter mit Frau Pfennig ----------
    Props.counter(b, { x: 0, z: -2.1, w: 4.0, d: 0.7, h: 1.05, color: 0x5d6b62, topColor: 0xcfd3c8, topTex: 'marble' });
    Props.laptop(b, { x: -1.0, y: 1.05, z: -2.2, ry: Math.PI });
    Props.box(b, { w: 0.3, h: 0.16, d: 0.22, x: 1.0, y: 1.05, z: -2.1, color: 0xd9d4c0 });     // Ablagekorb
    Props.box(b, { w: 0.3, h: 0.1, d: 0.22, x: 1.0, y: 1.21, z: -2.1, color: 0xc8c3af });
    Props.box(b, { w: 0.12, h: 0.04, d: 0.16, x: 0.3, y: 1.05, z: -1.95, color: 0xb74532 });   // Stempel
    Props.cyl(b, { r: 0.06, h: 0.08, x: 0.3, y: 1.09, z: -1.95, color: 0x222222 });
    Props.chair(b, { x: -0.9, z: -3.0, ry: 0, color: 0x3b4a5a, cast: false });
    Props.npc(b, { figure: 'finanzamt', x: 0, z: -2.9, ry: 0, name: 'Frau Pfennig', collide: false, onUse: function (api) {
      api.npcTalk({
        figure: 'finanzamt', name: 'Frau Pfennig',
        text: 'Ihre Unterlagen sind unvollständig. Sind sie immer. Als Freelancer werden Umsatzsteuer, Datenschutz und saubere Belege für Sie bald wichtig. Im Moment besteht noch keine Steuerpflicht. Ich behalte Sie aber im Auge.',
        actions: [{ label: 'Kontoübersicht', run: function (api2) { api2.openShop('finance'); } }]
      });
    } });
    // Schild am Schalter
    Props.sign(b, { text: 'Schalter 1\nBitte warten', w: 0.9, h: 0.3, x: -1.4, y: 1.22, z: -1.95, ry: 0, bg: '#3a4a40' });

    // Regale und Aktenschränke hinter dem Schalter / an der Westwand
    Props.shelf(b, { x: minX + 0.3, z: -2.6, ry: Math.PI / 2, w: 1.4, h: 2.0, color: 0x8a8f86 });
    Props.shelf(b, { x: minX + 0.3, z: -1.0, ry: Math.PI / 2, w: 1.4, h: 2.0, color: 0x8a8f86 });
    for (var i = 0; i < 3; i++) {
      var cx = 1.0 + i * 0.5;
      Props.box(b, { w: 0.45, h: 1.7, d: 0.5, x: cx, z: minZ + 0.35, color: 0x8e9a94, collide: true });
      for (var k = 0; k < 4; k++) Props.box(b, { w: 0.38, h: 0.03, d: 0.02, x: cx, y: 0.3 + k * 0.4, z: minZ + 0.61, color: 0x3d4744, cast: false });
    }
    // Kartons und Stapel auf dem Aktenschrank
    Props.box(b, { w: 0.4, h: 0.3, d: 0.4, x: 1.3, y: 1.7, z: minZ + 0.35, color: 0xb59a6a });
    Props.box(b, { w: 0.35, h: 0.2, d: 0.3, x: 1.8, y: 1.7, z: minZ + 0.35, color: 0xc9b98a, ry: 0.3 });

    // ---------- Nummernautomat (Ostwand) ----------
    var mz = 0.6, mx = maxX - 0.3;
    Props.box(b, { w: 0.4, h: 1.3, d: 0.5, x: mx, z: mz, color: 0x2f4f6f, collide: true });
    Props.box(b, { w: 0.04, h: 0.22, d: 0.36, x: mx - 0.21, y: 1.0, z: mz, color: 0x0d2a1a, mat: Props.mat(0x2fd67a, { emissive: 0x2fd67a, emissiveIntensity: 1.2 }) });      // Display
    Props.box(b, { w: 0.03, h: 0.12, d: 0.12, x: mx - 0.21, y: 0.7, z: mz, color: 0xf0c060 });                                        // Knopf
    Props.box(b, { w: 0.05, h: 0.03, d: 0.2, x: mx - 0.22, y: 0.5, z: mz, color: 0x111111 });                                         // Ausgabeschlitz
    Props.cyl(b, { r: 0.06, h: 0.02, x: mx - 0.21, y: 0.72, z: mz + 0.15, color: 0xb74532, seg: 12 });
    Props.box(b, { w: 0.42, h: 0.05, d: 0.52, x: mx, y: 1.3, z: mz, color: 0x1f3a52 });
    Props.sign(b, { text: 'Wartenummer', w: 0.5, h: 0.18, x: mx - 0.24, y: 1.4, z: mz, ry: -Math.PI / 2, bg: '#f0e8c8', fg: '#2f4f6f' });

    // Wartenummernanzeige an der Nordwand
    Props.box(b, { w: 0.9, h: 0.28, d: 0.06, x: -1.9, y: 2.0, z: minZ + 0.05, mat: Props.mat(0x1a0a0a, { emissive: 0xff3b2f, emissiveIntensity: 0.9 }) });
    Props.sign(b, { text: 'Nr. 4 6 8 9', w: 0.8, h: 0.2, x: -1.9, y: 2.0, z: minZ + 0.09, ry: 0, bg: '#2a0d0d', fg: '#ff6a55' });

    // ---------- Wartebereich ----------
    Props.rug(b, { x: -2.9, z: 1.0, w: 2.8, d: 2.4, color: 0x5d6f78 });
    var seatX = [-3.9, -3.3, -2.7, -2.1];
    seatX.forEach(function (sx) {
      Props.chair(b, { x: sx, z: 0.3, ry: Math.PI, color: 0x3b4a5a, pad: 0x4c7a86 });
      Props.chair(b, { x: sx, z: 1.75, ry: Math.PI, color: 0x3b4a5a, pad: 0x4c7a86 });
    });
    Props.npc(b, { figure: 'gast3', x: -2.7, z: 1.75, ry: Math.PI, pose: 'sit', name: 'Wartender', collide: false });
    Props.table(b, { x: -1.2, z: 1.0, w: 0.6, d: 0.5, h: 0.45, color: 0x8a8f86 });                // Beistelltisch
    Props.box(b, { w: 0.25, h: 0.02, d: 0.18, x: -1.2, y: 0.45, z: 1.0, color: 0xf3efe6 });        // Zeitschrift
    Props.plant(b, { x: minX + 0.4, z: maxZ - 0.5, size: 1.3, color: 0x3d8a5c });
    Props.plant(b, { x: maxX - 0.4, z: maxZ - 0.5, size: 1.0 });

    // Absperrpfosten mit Band vor dem Schalter
    Props.cyl(b, { r: 0.04, h: 1.0, x: -2.6, z: -0.9, color: 0x888888, collide: true, seg: 10 });
    Props.cyl(b, { r: 0.04, h: 1.0, x: 2.6, z: -0.9, color: 0x888888, collide: true, seg: 10 });
    Props.box(b, { w: 5.2, h: 0.05, d: 0.02, x: 0, y: 0.85, z: -0.9, color: 0xc0392b, cast: false });

    // ---------- Kopierer (Ostwand) ----------
    Props.box(b, { w: 0.6, h: 0.85, d: 0.7, x: maxX - 0.4, z: -2.3, color: 0xdedbd0, collide: true });
    Props.box(b, { w: 0.62, h: 0.06, d: 0.72, x: maxX - 0.4, y: 0.85, z: -2.3, color: 0x6c7377 });
    Props.box(b, { w: 0.4, h: 0.02, d: 0.3, x: maxX - 0.4, y: 0.91, z: -2.3, color: 0x9ed0e6 });
    Props.box(b, { w: 0.03, h: 0.08, d: 0.2, x: maxX - 0.71, y: 0.6, z: -2.3, mat: Props.mat(0x0d2a1a, { emissive: 0x2fd67a, emissiveIntensity: 0.8 }) });
    Props.box(b, { w: 0.3, h: 0.1, d: 0.22, x: maxX - 0.4, y: 0.97, z: -2.3, color: 0xffffff });     // Papierstapel
    // Aktenschränke Ostwand
    Props.box(b, { w: 0.5, h: 1.3, d: 0.9, x: maxX - 0.3, z: -1.1, color: 0x8e9a94, collide: true });
    Props.box(b, { w: 0.03, h: 0.03, d: 0.7, x: maxX - 0.56, y: 0.4, z: -1.1, color: 0x3d4744 });
    Props.box(b, { w: 0.03, h: 0.03, d: 0.7, x: maxX - 0.56, y: 0.85, z: -1.1, color: 0x3d4744 });

    // ---------- Wandschmuck ----------
    Props.clock(b, { x: -0.9, y: 2.3, z: minZ + 0.08, ry: 0 });
    Props.sign(b, { text: 'Finanzamt\nBitte Wartenummer ziehen', w: 1.9, h: 0.5, x: 1.0, y: 2.3, z: minZ + 0.06, ry: 0, bg: '#2f4f3f', font: 'bold 34px sans-serif' });
    Props.sign(b, { text: 'Steuerklasse?\nEgal. Zahlen.', w: 0.9, h: 0.6, x: -3.2, y: 1.8, z: maxZ - 0.03, ry: Math.PI, bg: '#e8dfb5', fg: '#3a3a3a', font: 'bold 44px sans-serif' });
    Props.sign(b, { text: 'Umsatzsteuer\n19 % / 7 %', w: 0.9, h: 0.6, x: -1.9, y: 1.8, z: maxZ - 0.03, ry: Math.PI, bg: '#cfe3d8', fg: '#22423a', font: 'bold 44px sans-serif' });
    Props.sign(b, { text: 'Belege\naufbewahren!', w: 0.9, h: 0.6, x: -0.6, y: 1.8, z: maxZ - 0.03, ry: Math.PI, bg: '#f0d7c8', fg: '#5a2a1a', font: 'bold 44px sans-serif' });
    Props.picture(b, { x: 0.8, y: 1.9, z: maxZ - 0.03, ry: Math.PI, w: 0.7, h: 0.5, color: 0x9ab8a0 });
    Props.sign(b, { text: 'Abgabe: 31.7.', w: 0.7, h: 0.35, x: maxX - 0.03, y: 2.0, z: 2.0, ry: -Math.PI / 2, bg: '#b74532', fg: '#ffffff', font: 'bold 44px sans-serif' });
    Props.sign(b, { text: 'Bitte\nNummer\nziehen', w: 0.5, h: 0.6, x: maxX - 0.03, y: 1.85, z: mz, ry: -Math.PI / 2, bg: '#e8dfb5', fg: '#333333', font: 'bold 50px sans-serif' });

    // ---------- Neonlicht ----------
    var tubeMat = Props.mat(0xf2fff8, { emissive: 0xe8fff4, emissiveIntensity: 1.3 });
    [[-2.2, -0.2], [2.0, -0.2], [-2.2, 2.0], [2.0, 2.0]].forEach(function (p) {
      Props.box(b, { w: 1.4, h: 0.05, d: 0.12, x: p[0], y: 2.62, z: p[1], mat: tubeMat, cast: false });
    });
    Props.pointLight(b, { x: -2.2, y: 2.4, z: 0.4, color: 0xe6f4eb, intensity: 0.55, dist: 8 });
    Props.pointLight(b, { x: 2.0, y: 2.4, z: 0.4, color: 0xe6f4eb, intensity: 0.55, dist: 8 });
    var flick = Props.pointLight(b, { x: 0, y: 2.4, z: -2.0, color: 0xedf5ed, intensity: 0.6, dist: 7 });
    b.animators.push(function (dt, t) {
      var f = (Math.sin(t * 23) > 0.96 && Math.sin(t * 0.7) > 0.6) ? 0.25 : 1;   // gelegentliches Flackern
      flick.intensity = 0.6 * f;
      tubeMat.emissiveIntensity = 0.5 + 0.8 * f;
    });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'tuer', label: 'Finanzamt verlassen (Karte)', x: 2.5, z: maxZ - 0.5, radius: 1.5, y: 1.3, onUse: function (api) { api.openMap(); } });
    Props.interact(b, { id: 'nummer', label: 'Wartenummer ziehen', x: mx - 0.9, z: mz, radius: 1.3, y: 1.6, onUse: function (api) {
      api.notify('info', 'Nummer 4711. Es sind noch 47 Personen vor dir. Das Spiel wartet nicht.');
    } });

    // ---------- Startpunkte ----------
    b.spawns.default = { x: 2.5, z: maxZ - 1.0, ry: Math.PI };
    b.spawns.door = b.spawns.default;

    // Abgestimmtes Tageslicht und Bodenreflexion, ohne zusätzliche Lichtquellen.
    b.lighting = { bg: 0x121a1a, sun: 0.75, hemi: 0.6, exposure: 0.92, sunColor: 0xf0f5e9, sky: 0xe4ecf0, ground: 0x707969 };
    return b;
  }
});

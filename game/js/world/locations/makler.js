// Ort: Immobilienbüro „Schlüssel & Fertig“. Hier wechselt man die Wohnung oder mietet ein Büro.
// Raum 8 × 6,5 m: x -4 … 4, z -3,25 … 3,25. Tür in der Südwand (x = 2,5).
World.registerLocation({
  id: 'makler',
  name: 'Immobilien Schlüssel & Fertig',
  build: function (ctx) {
    var b = Props.builder();
    var E = ctx.Economy || Props.economy || (typeof Economy !== 'undefined' ? Economy : null);
    var W = 8, D = 6.5, hw = W / 2, hd = D / 2;

    Props.room(b, {
      w: W, d: D, h: 2.8,
      floor: { tex: 'carpet', color: '#7c9295', repeat: [4, 3.2], rough: 0.95 },
      wall: { tex: 'wallpaper', color: '#e8ddc7' }, trim: 0xf6efe0,
      doors: [{ wall: 'S', pos: 2.5, w: 1.0 }],
      windows: [
        { wall: 'N', pos: -2.6, w: 1.4, h: 1.2, sill: 0.9 },
        { wall: 'N', pos: 2.6, w: 1.4, h: 1.2, sill: 0.9 },
        { wall: 'S', pos: -1.8, w: 1.6, h: 1.2, sill: 0.9 }
      ]
    });

    var WOODC = 0xa87446, DARK = 0x6b4a2e;

    // ---------- Schreibtisch mit Makler (Nordwand, Mitte) ----------
    Props.box(b, { w: 1.9, h: 0.05, d: 0.8, x: 0, y: 0.72, z: -2.2, color: WOODC, collide: true });
    Props.box(b, { w: 1.8, h: 0.72, d: 0.06, x: 0, y: 0, z: -2.52, color: DARK });       // Rückwand
    Props.box(b, { w: 0.06, h: 0.72, d: 0.7, x: -0.88, y: 0, z: -2.2, color: DARK });
    Props.box(b, { w: 0.06, h: 0.72, d: 0.7, x: 0.88, y: 0, z: -2.2, color: DARK });
    Props.box(b, { w: 1.9, h: 0.5, d: 0.03, x: 0, y: 0.2, z: -1.82, color: 0x8a5d38 });   // Blende vorn
    Props.laptop(b, { x: -0.3, y: 0.77, z: -2.2, ry: Math.PI });
    Props.lamp(b, { type: 'table', x: 0.75, y: 0.77, z: -2.35 });
    Props.box(b, { w: 0.3, h: 0.03, d: 0.22, x: 0.3, y: 0.77, z: -2.1, color: 0xf4f0e6, ry: 0.2 });   // Papiere
    Props.box(b, { w: 0.28, h: 0.03, d: 0.2, x: 0.32, y: 0.8, z: -2.1, color: 0xd9e4ee, ry: -0.15 });
    Props.cyl(b, { r: 0.045, h: 0.1, x: 0.55, y: 0.77, z: -2.05, color: 0x8a3b3b, seg: 12 });          // Stiftebecher
    Props.box(b, { w: 0.16, h: 0.04, d: 0.1, x: -0.75, y: 0.77, z: -2.0, color: 0x2f5f8a });          // Visitenkartenhalter
    Props.box(b, { w: 0.4, h: 0.012, d: 0.12, x: 0.0, y: 0.77, z: -1.95, color: 0xc9a13a });          // Namensschild
    Props.npc(b, {
      figure: 'makler', x: 0, z: -2.95, ry: 0, pose: 'stand', name: 'Makler Schlüssel', label: 'Mit dem Makler sprechen',
      onUse: function (api) {
        api.npcTalk({
          figure: 'makler', name: 'Makler Schlüssel',
          text: 'Lage, Lage, Lage! Willkommen bei Schlüssel & Fertig. Ich habe Wohnungen für jeden Geldbeutel, und wenn Sie es ernst meinen, vermiete ich Ihnen auch ein Büro in der Innenstadt. Da arbeitet es sich gleich viel professioneller!',
          actions: [
            { label: 'Wohnungen ansehen', run: function (api) { api.openShop('home'); } },
            { label: 'Büro mieten', run: function (api) { api.openShop('office'); } }
          ]
        });
      }
    });
    // Kundenstühle vor dem Schreibtisch
    Props.chair(b, { x: -0.6, z: -1.3, ry: Math.PI, color: 0x3b5a7a });
    Props.chair(b, { x: 0.6, z: -1.3, ry: Math.PI, color: 0x3b5a7a });
    Props.rug(b, { x: 0, z: -1.6, w: 2.6, d: 1.6, color: 0x8a5a3a });

    // ---------- Nordwand: Regal, Schild, Uhr ----------
    Props.shelf(b, { x: -1.3, z: -hd + 0.2, w: 1.0, h: 1.9, ry: 0, color: 0x6b4a2e });
    Props.sign(b, { text: 'Schlüssel & Fertig', w: 1.6, h: 0.4, x: 0.3, y: 2.25, z: -hd + 0.03, ry: 0, bg: '#2f4a6b', fg: '#f6e6b0' });
    Props.clock(b, { x: 1.6, y: 2.2, z: -hd + 0.03, ry: 0 });
    Props.plant(b, { x: -3.5, z: -2.7, size: 1.3 });
    Props.plant(b, { x: 3.5, z: -2.7, size: 1.2, color: 0x3d8a5c });

    // ---------- Westwand: vier Immobilienbilder mit Preisschildern ----------
    var homeCols = [0x8fae7a, 0x6fa8c9, 0xd9a05a, 0x7b6fb0];
    var fallback = [null,
      { name: 'Schäbige Einzimmerbude', rent: 250 }, { name: 'Ordentliche Wohnung', rent: 420 },
      { name: 'Helle Altbauwohnung', rent: 650 }, { name: 'Designer-Loft', rent: 950 }];
    for (var i = 0; i < 4; i++) {
      var hm = (E && E.HOMES && E.HOMES[i + 1]) || fallback[i + 1];
      var pz = -2.4 + i * 1.6;
      Props.picture(b, { x: -hw + 0.06, y: 2.0, z: pz, ry: Math.PI / 2, w: 1.1, h: 0.75, color: homeCols[i] });
      Props.sign(b, { text: hm.name + '\n' + hm.rent + ' € Miete/Woche', w: 1.3, h: 0.42, x: -hw + 0.03, y: 1.3, z: pz, ry: Math.PI / 2, bg: '#f3ead2', fg: '#3b2f22', font: 'bold 34px sans-serif' });
    }
    Props.sign(b, { text: 'Unsere Angebote', w: 1.8, h: 0.34, x: -hw + 0.03, y: 2.75 - 0.15, z: 0, ry: Math.PI / 2, bg: '#2f4a6b', fg: '#ffffff' });
    Props.interact(b, { id: 'wohnungen', label: 'Wohnungsangebote ansehen', x: -hw + 1.2, z: 0, radius: 1.6, y: 1.6, onUse: function (api) { api.openShop('home'); } });

    // ---------- Architekturmodell auf Tisch ----------
    var mx = -1.3, mz = 0.4;
    Props.table(b, { x: mx, z: mz, w: 1.5, d: 0.9, h: 0.75, color: 0xc4a276 });
    Props.box(b, { w: 1.3, h: 0.03, d: 0.7, x: mx, y: 0.75, z: mz, color: 0x6b8f4e, tex: undefined });           // Grundplatte (Rasen)
    var houses = [[-0.45, -0.15, 0.24, 0.2, 0xe8d9b8, 0xb5533c], [-0.05, 0.12, 0.26, 0.24, 0xf0e6d0, 0x3f5f8a], [0.35, -0.12, 0.22, 0.28, 0xd9c7a0, 0x7a4a34], [0.4, 0.2, 0.18, 0.16, 0xe6d3d3, 0x4f6b4f], [-0.4, 0.22, 0.2, 0.16, 0xd7e0e8, 0x8a3b3b]];
    houses.forEach(function (h) {
      Props.box(b, { w: h[2], h: h[3], d: h[2], x: mx + h[0], y: 0.78, z: mz + h[1], color: h[4], cast: false });
      var roof = Props.cyl(b, { r: h[2] * 0.85, rTop: 0, h: 0.14, x: mx + h[0], y: 0.78 + h[3], z: mz + h[1], color: h[5], seg: 4, cast: false });
      roof.rotation.y = Math.PI / 4;
    });
    Props.cyl(b, { r: 0.05, h: 0.14, x: mx + 0.0, y: 0.78, z: mz - 0.25, color: 0x2f7a3a, seg: 8, cast: false });   // Bäumchen
    Props.sphere(b, { r: 0.07, x: mx + 0.0, y: 0.98, z: mz - 0.25, color: 0x3d8a4a, cast: false });
    Props.sphere(b, { r: 0.06, x: mx - 0.2, y: 0.95, z: mz + 0.3, color: 0x3d8a4a, cast: false });

    // ---------- Ostwand: Büro-Aushang, Schlüsselbrett ----------
    Props.sign(b, { text: 'Büro zu\nvermieten', w: 0.9, h: 1.1, x: hw - 0.03, y: 1.6, z: -1.9, ry: -Math.PI / 2, bg: '#f7e9a8', fg: '#8a2f2f', font: 'bold 60px sans-serif' });
    Props.interact(b, { id: 'buero-aushang', label: 'Büro-Aushang lesen', x: hw - 1.0, z: -1.9, radius: 1.5, y: 1.9, onUse: function (api) { api.openShop('office'); } });
    Props.box(b, { w: 0.05, h: 0.8, d: 0.7, x: hw - 0.08, y: 1.0, z: -0.5, color: 0x5a3a24 });
    for (var r = 0; r < 4; r++) for (var c = 0; c < 3; c++) {
      Props.box(b, { w: 0.02, h: 0.07, d: 0.035, x: hw - 0.12, y: 1.12 + r * 0.17, z: -0.5 - 0.22 + c * 0.22, color: (r + c) % 2 ? 0xd9b84a : 0xb8bcc0, cast: false });
      Props.cyl(b, { r: 0.012, h: 0.02, x: hw - 0.115, y: 1.2 + r * 0.17, z: -0.5 - 0.22 + c * 0.22, color: 0x888888, seg: 6, cast: false });
    }
    Props.sign(b, { text: 'Schlüssel', w: 0.6, h: 0.14, x: hw - 0.03, y: 1.93, z: -0.5, ry: -Math.PI / 2, bg: '#2f4a6b', fg: '#fff' });

    // ---------- Sitzecke für Kunden (Ostseite) ----------
    Props.rug(b, { x: 2.3, z: 1.0, w: 2.6, d: 2.2, color: 0x8a6a4a });
    Props.sofa(b, { x: 3.35, z: 1.0, w: 1.8, ry: -Math.PI / 2, color: 0x8a5a3a });
    Props.table(b, { x: 2.1, z: 1.0, w: 0.5, d: 0.9, h: 0.42, color: 0x7a5636 });
    Props.chair(b, { x: 1.2, z: 0.55, ry: Math.PI / 2, color: 0x3b5a7a });
    Props.chair(b, { x: 1.2, z: 1.45, ry: Math.PI / 2, color: 0x3b5a7a });
    Props.box(b, { w: 0.25, h: 0.02, d: 0.18, x: 2.1, y: 0.42, z: 0.8, color: 0xd9e4ee, ry: 0.3 });   // Prospekte
    Props.box(b, { w: 0.22, h: 0.02, d: 0.16, x: 2.1, y: 0.44, z: 0.8, color: 0xf3d9a0, ry: -0.2 });
    Props.cyl(b, { r: 0.05, h: 0.1, x: 2.1, y: 0.42, z: 1.3, color: 0xffffff, seg: 12 });             // Kaffeetasse
    Props.lamp(b, { type: 'floor', x: 3.7, z: 2.5 });

    // ---------- Wasserspender (Südwestecke) ----------
    Props.box(b, { w: 0.32, h: 1.0, d: 0.32, x: -3.6, y: 0, z: 2.9, color: 0xe8ecee, collide: true });

    // ---------- Beleuchtung (insgesamt 4 Punktlichter: 2 Decke, Tischlampe, Stehlampe) ----------
    Props.lamp(b, { type: 'ceiling', x: 0.3, z: 0.8, y: 2.6 });
    Props.lamp(b, { type: 'ceiling', x: -2.0, z: 0.4, y: 2.6 });

    // ---------- Tür ----------
    Props.interact(b, { id: 'tuer', label: 'Zur Karte', x: 2.5, z: hd - 0.5, radius: 1.5, y: 1.3, onUse: function (api) { api.openMap(); } });

    // ---------- Leben: schwingende Pendeluhr-Zeiger gibt es nicht, aber ein Schlüsselbund am Brett ----------
    var swing = Props.box(b, { w: 0.03, h: 0.1, d: 0.03, x: hw - 0.14, y: 1.05, z: -0.5, color: 0xd9b84a, cast: false });
    b.animators.push(function (dt, t) { swing.rotation.x = Math.sin(t * 1.5) * 0.25; });

    b.spawns.default = { x: 2.5, z: hd - 1.0, ry: Math.PI };
    b.spawns.door = b.spawns.default;
    // Abgestimmtes Tageslicht und Bodenreflexion, ohne zusätzliche Lichtquellen.
    b.lighting = { bg: 0x1a1712, sun: 0.8, hemi: 0.5, exposure: 0.93, sunColor: 0xffedd4, sky: 0xe5edf4, ground: 0x897761 };
    return b;
  }
});

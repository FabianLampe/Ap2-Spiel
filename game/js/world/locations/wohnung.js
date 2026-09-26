// Ort: Wohnung. Der Tag beginnt hier. Verändert sich mit der Wohnungsstufe (1 schäbig … 4 Loft).
// Musterbeispiel für alle anderen Orte, siehe game/js/world/CONTRACT.md
World.registerLocation({
  id: 'wohnung',
  name: 'Deine Wohnung',
  build: function (ctx) {
    var tier = (ctx.State && ctx.State.s.home) || 1;
    var b = Props.builder();

    // Größe und Farben je Stufe
    var SIZE = [null, { w: 5.0, d: 4.2 }, { w: 6.0, d: 4.8 }, { w: 7.0, d: 5.4 }, { w: 8.4, d: 6.0 }][tier];
    var LOOK = [null,
      { wall: '#d3c4a0', floor: '#8a6a4a', trim: 0xd9cfb8, tex: 'wood' },
      { wall: '#e6efdc', floor: '#c39b72', trim: 0xf3efe6, tex: 'wood' },
      { wall: '#e2ebf5', floor: '#b08a62', trim: 0xffffff, tex: 'wood' },
      { wall: '#e9e4f1', floor: '#8c959c', trim: 0xffffff, tex: 'concrete' }][tier];
    var w = SIZE.w, d = SIZE.d, hw = w / 2, hd = d / 2;

    var R = Props.room(b, {
      w: w, d: d, h: tier === 4 ? 3.4 : 2.7,
      floor: { tex: LOOK.tex, color: LOOK.floor, repeat: [w / 2.2, d / 2.2] },
      wall: { tex: tier === 1 ? 'plaster' : 'wallpaper', color: LOOK.wall }, trim: LOOK.trim,
      doors: [{ wall: 'S', pos: hw - 1.2, w: 1.0 }],
      windows: tier === 4 ? [{ wall: 'N', pos: -1.6, w: 2.4, h: 1.9, sill: 0.5 }, { wall: 'N', pos: 1.6, w: 2.4, h: 1.9, sill: 0.5 }]
        : [{ wall: 'N', pos: -hw + 1.6, w: 1.4, h: 1.2, sill: 0.95 }].concat(tier >= 3 ? [{ wall: 'W', pos: 1.7, w: 1.2, h: 1.3, sill: 0.9 }] : [])
    });

    // Bett am Westende, Kopf an der Wand
    Props.bed(b, { x: -hw + 1.1, z: -hd + 1.05, ry: Math.PI / 2, color: tier === 1 ? 0x8a8f74 : tier === 4 ? 0x2b3a4a : 0x4f7da3, w: tier >= 3 ? 1.6 : 1.3 });

    // Schreibtisch an der Nordwand mit Laptop (hier wird nicht gearbeitet, aber die Finanzen liegen hier)
    var dx = hw - 1.9;
    Props.desk(b, { x: dx, z: -hd + 0.4, w: tier === 1 ? 1.2 : 1.5, color: tier === 1 ? 0x8a6a4a : 0xb98255 });
    Props.laptop(b, { x: dx, y: 0.77, z: -hd + 0.4, ry: 0 });
    Props.chair(b, { x: dx, z: -hd + 1.15, ry: Math.PI, color: tier === 1 ? 0x6b5a48 : 0x3b4a5a });

    // Küchenzeile / Kühlschrank an der Ostwand
    Props.fridge(b, { x: hw - 0.4, z: -hd + 2.0, ry: -Math.PI / 2 });
    if (tier >= 2) Props.counter(b, { x: hw - 0.4, z: -hd + 3.1, w: 1.4, d: 0.6, h: 0.9, ry: -Math.PI / 2, color: 0xdad4c6, topTex: 'marble' });

    // Einrichtung wächst mit der Stufe
    if (tier === 1) {
      Props.table(b, { x: -0.2, z: 0.6, w: 0.9, d: 0.7, color: 0x8a6a4a });
      Props.chair(b, { x: -0.2, z: 1.15, ry: Math.PI, color: 0x6b5a48 });
      Props.box(b, { w: 0.5, h: 0.03, d: 0.4, x: -0.2, y: 0.75, z: 0.6, color: 0xc9b98a });      // Pizzakarton
      Props.lamp(b, { type: 'ceiling', x: 0, z: 0, y: 2.55, color: 0xfff0c0 });                     // nackte Glühbirne
      // Der Feuchtfleck an der Wand (nur Optik)
      var stain = new THREE.Mesh(new THREE.CircleGeometry(0.45, 20), new THREE.MeshBasicMaterial({ color: 0x9a8a5e, transparent: true, opacity: 0.35 }));
      stain.position.set(1.75, 2.0, -hd + 0.02); b.group.add(stain);
      // Eine Fliege, die durch den Raum summt
      var fly = Props.sphere(b, { r: 0.03, x: 0, y: 1.6, z: 0, color: 0x111111, cast: false });
      b.animators.push(function (dt, t) { fly.position.set(Math.sin(t * 1.3) * 1.4, 1.5 + Math.sin(t * 3.1) * 0.15, Math.cos(t * 0.9) * 1.2); });
    } else {
      Props.sofa(b, { x: -0.3, z: hd - 0.7, w: 1.9, ry: Math.PI, color: tier === 2 ? 0x7d8a6a : tier === 3 ? 0x5a6b7d : 0x2b3540 });
      Props.rug(b, { x: -0.3, z: hd - 1.9, w: 2.2, d: 1.5, color: tier === 2 ? 0x8f5a3b : tier === 3 ? 0x3f7d8c : 0x2c3a47 });
      Props.table(b, { x: -0.3, z: hd - 1.85, w: 0.9, d: 0.5, h: 0.4, color: 0x7a5636 });
      Props.lamp(b, { type: 'floor', x: -hw + 0.5, z: hd - 0.6 });
      Props.plant(b, { x: hw - 0.6, z: hd - 0.6, size: 1.1 });
      Props.picture(b, { x: -0.3, y: 1.9, z: hd - 0.04, ry: Math.PI, w: 1.0, h: 0.65 });
    }
    if (tier >= 3) {
      Props.shelf(b, { x: -hw + 0.3, z: 0.2, ry: Math.PI / 2, w: 1.4, h: 2.0 });
      Props.plant(b, { x: hw - 0.6, z: -hd + 0.6, size: 1.3, color: 0x3d8a5c });
    }
    if (tier === 4) {
      Props.clock(b, { x: 0, y: 2.75, z: hd - 0.06, ry: Math.PI });
      Props.lamp(b, { type: 'ceiling', x: 1.5, z: 0.3, y: 3.2 });
    }
    if (tier <= 2) Props.lamp(b, { type: 'table', x: dx + 0.4, y: 0.77, z: -hd + 0.35, light: tier === 2 });

    // ---------- Interaktionen ----------
    Props.interact(b, { id: 'tuer', label: 'Wohnung verlassen (Karte)', x: hw - 1.2, z: hd - 0.5, radius: 1.5, y: 1.3, onUse: function (api) { api.openMap(); } });
    Props.interact(b, { id: 'bett', label: 'Schlafen (Tag beenden)', x: -hw + 1.9, z: -hd + 1.3, radius: 1.4, y: 1.0, onUse: function (api) { api.sleep(); } });
    Props.interact(b, { id: 'schreibtisch', label: 'Schreibtisch: Finanzen und Rechnungen', x: dx, z: -hd + 1.5, radius: 1.3, y: 1.3, onUse: function (api) { api.openShop('finance'); } });
    Props.interact(b, { id: 'kuehlschrank', label: 'Kühlschrank ansehen', x: hw - 1.1, z: -hd + 2.0, radius: 1.1, y: 1.9, onUse: function (api) {
      api.notify('info', tier === 1 ? 'Ein halber Joghurt und Senf. Du solltest bald Geld verdienen.' : 'Gut gefüllt. Ein Kaffee im Café ist trotzdem besser zum Arbeiten.');
    } });

    // ---------- Startpunkte ----------
    b.spawns.default = { x: hw - 1.2, z: hd - 1.1, ry: Math.PI };
    b.spawns.door = b.spawns.default;
    b.spawns.bed = { x: -hw + 1.9, z: -hd + 2.4, ry: Math.PI / 2 };

    b.lighting = { bg: 0x1c232b, sunDir: [0.5, 1, 0.6], sun: tier === 1 ? 0.55 : 0.8, hemi: tier === 1 ? 0.4 : 0.5, exposure: tier === 1 ? 0.85 : 0.92 };
    return b;
  }
});

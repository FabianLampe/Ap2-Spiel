// Spielerfiguren zur Auswahl: 4 männlich, 4 weiblich, jede mit eigenem Stil. Werden als 3D-Figuren ('spieler-<id>') und als 2D-Figur (Dialoge) genutzt.
(function () {
  var LIST = [
    { id: 'm1', gender: 'm', name: 'Leon',   style: 'Streetwear',
      look: { skin: 0xf0c29c, hair: 0x5a3a24, hairStyle: 'quiff', shirt: 0x4a5560, pants: 0x3c5a80, shoes: 0xf2f2f2, sole: 0xf2f2f2, hoodie: true, watch: 0x1c1c1c, build: 'slim', height: 1.82, eye: 0x5a7a4a } },
    { id: 'm2', gender: 'm', name: 'Malik',  style: 'Sommer-Tattoo',
      look: { skin: 0x8e5b3c, hair: 0x14100e, hairStyle: 'buzz', shirt: 0xe8e4da, tshirt: true, sleeves: 1, pants: 0x6b6a4a, shorts: true, shoes: 0x1c1c1c, sole: 0xeeeeee, shoeStyle: 'hightop', socks: 0xf2f2f2, beard: true, tattoo: 0x2a1c18, watch: 0xb89a5a, build: 'normal', height: 1.84, eye: 0x3a2618 } },
    { id: 'm3', gender: 'm', name: 'Jonas',  style: 'Business casual',
      look: { skin: 0xf3d3b5, hair: 0xc9a55a, hairStyle: 'slick', shirt: 0xf2f4f8, jacket: 0x3a4a64, pants: 0x2a2f3a, shoes: 0x5a3420, belt: true, glasses: true, glassesColor: 0x2a2a2a, build: 'slim', height: 1.80, eye: 0x4a6a8a } },
    { id: 'm4', gender: 'm', name: 'Tarek',  style: 'Entspannt mit Dutt',
      look: { skin: 0xd6a67e, hair: 0x2a1a12, hairStyle: 'manbun', shirt: 0xb4432e, tshirt: true, sleeves: 1, pants: 0x2a2d33, shoes: 0x8a5a36, sole: 0x3a2a20, shoeStyle: 'hightop', beard: true, bracelet: 0x9a9a9a, watch: 0x3a2a20, build: 'normal', height: 1.78, eye: 0x4a3020 } },
    { id: 'f1', gender: 'f', name: 'Sophie', style: 'Vintage mit Locken',
      look: { skin: 0xf5d2b8, hair: 0xb8401c, hairStyle: 'curly', shirt: 0x55643a, tshirt: true, sleeves: 1, pants: 0x5a3b26, shorts: true, shoes: 0x2a2424, sole: 0xe6e6e0, shoeStyle: 'hightop', socks: 0xe0a820, glasses: true, glassesStyle: 'cateye', glassesColor: 0xe8ddd4, tattoo: 0x9a4a38, watch: 0x5a3a2a, female: true, build: 'slim', height: 1.72, eye: 0x6a8a8a } },
    { id: 'f2', gender: 'f', name: 'Aylin',  style: 'Elegant',
      look: { skin: 0xdcae86, hair: 0x14100e, hairStyle: 'long', shirt: 0xf4efe8, jacket: 0x7a2a3a, pants: 0x2a2a30, skirt: true, shoes: 0x1a1a1a, bracelet: 0xd4b060, female: true, build: 'slim', height: 1.70, eye: 0x4a3020 } },
    { id: 'f3', gender: 'f', name: 'Mia',    style: 'Sportlich',
      look: { skin: 0xf0c4a4, hair: 0xd8b878, hairStyle: 'ponytail', shirt: 0x6fa8c8, hoodie: true, pants: 0x2f3440, shoes: 0xf2f2f2, sole: 0xf2f2f2, watch: 0xf0f0f0, female: true, build: 'slim', height: 1.67, eye: 0x4a6a9a } },
    { id: 'f4', gender: 'f', name: 'Nala',   style: 'Bunt mit Afro',
      look: { skin: 0x70442c, hair: 0x1a1210, hairStyle: 'afro', shirt: 0xf2c230, tshirt: true, sleeves: 1, pants: 0x3c5a80, shoes: 0xd84a3a, sole: 0xf2f2f2, shoeStyle: 'hightop', bracelet: 0xd4b060, female: true, build: 'normal', height: 1.69, eye: 0x3a2618 } }
  ];
  var by = {}; LIST.forEach(function (a) { by[a.id] = a; if (window.Humans) Humans.PRESETS['spieler-' + a.id] = a.look; });

  function css(n) { return '#' + ('000000' + n.toString(16)).slice(-6); }
  var HAIR2D = { short: 'short', slick: 'slick', bob: 'bob', ponytail: 'bun', bald: 'bald', beanie: 'beanie', curly: 'curly', afro: 'afro', long: 'long', manbun: 'bun', quiff: 'short', buzz: 'buzz' };

  window.Avatars = {
    list: LIST,
    get: function (id) { return by[id] || by.m1; },
    presetName: function (id) { return 'spieler-' + (by[id] ? id : 'm1'); },
    // Konfiguration für die 2D-Figur (Dialoge, Karten)
    figure2D: function (id) {
      var a = Avatars.get(id), l = a.look;
      return { name: a.name, skin: css(l.skin), hair: css(l.hair), hairStyle: HAIR2D[l.hairStyle] || 'short', shirt: css(l.jacket || l.shirt), extra: l.hoodie ? 'hoodie' : 'none', glasses: !!l.glasses, mustache: !!l.beard, delay: 0 };
    }
  };
})();

// Spielerfiguren zur Auswahl: 3 männlich, 3 weiblich. Werden als 3D-Figuren ('spieler-<id>') und als 2D-Figur (Dialoge) genutzt.
(function () {
  var LIST = [
    { id: 'm1', gender: 'm', name: 'Ben',    look: { skin: 0xf0c29c, hair: 0x4a3020, hairStyle: 'short',  shirt: 0xd4491a, pants: 0x2f3b4d, shoes: 0x2a2a2a, hoodie: true, build: 'normal', height: 1.78 } },
    { id: 'm2', gender: 'm', name: 'Malik',  look: { skin: 0xa8704c, hair: 0x1a1512, hairStyle: 'short',  shirt: 0x2f8f8a, pants: 0x3a3f4a, shoes: 0xe8e8e8, beard: true, build: 'normal', height: 1.82 } },
    { id: 'm3', gender: 'm', name: 'Jonas',  look: { skin: 0xf3d3b5, hair: 0xc9a55a, hairStyle: 'slick',  shirt: 0x7a8899, pants: 0x3b4a5a, shoes: 0x2a2320, glasses: true, build: 'slim', height: 1.80 } },
    { id: 'f1', gender: 'f', name: 'Mia',    look: { skin: 0xf0c4a4, hair: 0x5a3a26, hairStyle: 'ponytail', shirt: 0xe4706a, pants: 0x3a4a6a, shoes: 0x2b2b2b, female: true, build: 'slim', height: 1.68 } },
    { id: 'f2', gender: 'f', name: 'Aylin',  look: { skin: 0xd6a67e, hair: 0x14100e, hairStyle: 'bob',    shirt: 0x6b8f4e, pants: 0x2f2f38, shoes: 0x2a2a2a, female: true, build: 'normal', height: 1.70 } },
    { id: 'f3', gender: 'f', name: 'Sophie', look: { skin: 0xf5d2b8, hair: 0xc0451f, hairStyle: 'bob',    shirt: 0x556b3a, pants: 0x5a3b26, shoes: 0x2a2a2a, glasses: true, female: true, build: 'slim', height: 1.72 } }
  ];
  var by = {}; LIST.forEach(function (a) { by[a.id] = a; if (window.Humans) Humans.PRESETS['spieler-' + a.id] = a.look; });

  function css(n) { return '#' + ('000000' + n.toString(16)).slice(-6); }
  var HAIR2D = { short: 'short', slick: 'slick', bob: 'bob', ponytail: 'bun', bald: 'bald', beanie: 'beanie' };

  window.Avatars = {
    list: LIST,
    get: function (id) { return by[id] || by.m1; },
    presetName: function (id) { return 'spieler-' + (by[id] ? id : 'm1'); },
    // Konfiguration für die 2D-Figur (Dialoge, Karten)
    figure2D: function (id) {
      var a = Avatars.get(id), l = a.look;
      return { name: a.name, skin: css(l.skin), hair: css(l.hair), hairStyle: HAIR2D[l.hairStyle] || 'short', shirt: css(l.shirt), extra: l.hoodie ? 'hoodie' : 'none', glasses: !!l.glasses, mustache: !!l.beard, delay: 0 };
    }
  };
})();

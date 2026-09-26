// Prozedurale Texturen (Canvas), damit keine Bilddateien nötig sind. Alles wird einmal erzeugt und gecacht.
// Nutzung: Textures.get('wood', { color: '#b98f6b', repeat: [4, 3] }) -> THREE.CanvasTexture (oder null ohne DOM)
(function () {
  var cache = {};    // Basis-Canvas je Name+Farbe
  var SIZE = 256;

  function hex(c) { return typeof c === 'number' ? '#' + ('000000' + c.toString(16)).slice(-6) : c; }
  function shade(col, amt) {          // '#rrggbb' aufhellen (amt > 0) oder abdunkeln (amt < 0)
    var n = parseInt(hex(col).slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(v) { return Math.max(0, Math.min(255, Math.round(v + amt * 255))); }
    return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
  }
  // Deterministisches Zufallsrauschen (damit Texturen bei jedem Start gleich aussehen)
  function rng(seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function noise(ctx, amt, seed) {
    var r = rng(seed), id = ctx.getImageData(0, 0, SIZE, SIZE), d = id.data;
    for (var i = 0; i < d.length; i += 4) { var v = (r() - 0.5) * amt * 255; d[i] += v; d[i + 1] += v; d[i + 2] += v; }
    ctx.putImageData(id, 0, 0);
  }

  var GEN = {
    // Holzdielen
    wood: function (ctx, c) {
      var r = rng(7), planks = 4, h = SIZE / planks;
      for (var p = 0; p < planks; p++) {
        ctx.fillStyle = shade(c, (r() - 0.5) * 0.12); ctx.fillRect(0, p * h, SIZE, h);
        for (var k = 0; k < 14; k++) { ctx.strokeStyle = shade(c, -0.05 - r() * 0.05); ctx.globalAlpha = 0.5; ctx.beginPath(); var y = p * h + r() * h; ctx.moveTo(0, y); ctx.bezierCurveTo(SIZE * .3, y + (r() - .5) * 6, SIZE * .6, y + (r() - .5) * 6, SIZE, y + (r() - .5) * 4); ctx.stroke(); }
        ctx.globalAlpha = 1; ctx.fillStyle = shade(c, -0.22); ctx.fillRect(0, p * h, SIZE, 2);
        var cut = r() * SIZE; ctx.fillRect(cut, p * h, 2, h);
      }
      noise(ctx, 0.05, 3);
    },
    // Fliesen (Schachbrett mit Fugen)
    tile: function (ctx, c) {
      var n = 4, s = SIZE / n;
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) { ctx.fillStyle = shade(c, (x + y) % 2 ? 0.05 : -0.03); ctx.fillRect(x * s, y * s, s, s); }
      ctx.fillStyle = shade(c, -0.28);
      for (var i = 0; i <= n; i++) { ctx.fillRect(i * s - 1, 0, 2, SIZE); ctx.fillRect(0, i * s - 1, SIZE, 2); }
      noise(ctx, 0.04, 5);
    },
    // Teppich (feines Rauschen)
    carpet: function (ctx, c) { ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE); noise(ctx, 0.16, 11); },
    // Putz / Tapete (dezent)
    plaster: function (ctx, c) { ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE); noise(ctx, 0.05, 13); },
    // Tapete mit feinen Streifen
    wallpaper: function (ctx, c) {
      ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = shade(c, -0.05); for (var x = 0; x < SIZE; x += 32) ctx.fillRect(x, 0, 14, SIZE);
      noise(ctx, 0.04, 17);
    },
    // Backstein
    brick: function (ctx, c) {
      var r = rng(19), bh = SIZE / 8, bw = SIZE / 4;
      ctx.fillStyle = shade(c, -0.3); ctx.fillRect(0, 0, SIZE, SIZE);
      for (var y = 0; y < 8; y++) for (var x = -1; x < 4; x++) { var off = (y % 2) * bw / 2; ctx.fillStyle = shade(c, (r() - 0.5) * 0.14); ctx.fillRect(x * bw + off + 2, y * bh + 2, bw - 4, bh - 4); }
      noise(ctx, 0.07, 23);
    },
    // Beton / Asphalt
    concrete: function (ctx, c) { ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE); noise(ctx, 0.12, 29); },
    // Marmor (Adern)
    marble: function (ctx, c) {
      var r = rng(31); ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE);
      for (var k = 0; k < 9; k++) { ctx.strokeStyle = shade(c, -0.12); ctx.globalAlpha = 0.45; ctx.lineWidth = 1 + r() * 2; ctx.beginPath(); var x = r() * SIZE, y = 0; ctx.moveTo(x, y); for (var s = 0; s < 8; s++) { x += (r() - .5) * 60; y += SIZE / 8; ctx.lineTo(x, y); } ctx.stroke(); }
      ctx.globalAlpha = 1; noise(ctx, 0.03, 37);
    },
    // Stoff (Gewebe)
    fabric: function (ctx, c) {
      ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE); ctx.globalAlpha = 0.18; ctx.fillStyle = shade(c, -0.3);
      for (var i = 0; i < SIZE; i += 4) { ctx.fillRect(i, 0, 1, SIZE); ctx.fillRect(0, i, SIZE, 1); }
      ctx.globalAlpha = 1; noise(ctx, 0.05, 41);
    },
    // Rasen / Gras
    grass: function (ctx, c) { ctx.fillStyle = hex(c); ctx.fillRect(0, 0, SIZE, SIZE); noise(ctx, 0.2, 43); }
  };

  var Textures = {
    names: Object.keys(GEN),
    // opts: { color, repeat: [u, v] }
    get: function (name, opts) {
      opts = opts || {};
      if (typeof document === 'undefined' || typeof THREE === 'undefined') return null;
      var col = hex(opts.color || '#cccccc'), key = name + col;
      if (!GEN[name]) throw new Error('Unbekannte Textur: ' + name + ' (verfügbar: ' + Object.keys(GEN).join(', ') + ')');
      if (!cache[key]) {
        var cv = document.createElement('canvas'); cv.width = cv.height = SIZE;
        var ctx = cv.getContext('2d'); if (!ctx) return null;
        GEN[name](ctx, col); cache[key] = cv;
      }
      var t = new THREE.CanvasTexture(cache[key]);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      var rep = opts.repeat || [1, 1]; t.repeat.set(rep[0], rep[1]);
      t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
      return t;
    },
    shade: shade
  };
  window.Textures = Textures;
})();

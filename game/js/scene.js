// Szene: die (noch) schäbige Wohnung des Freelancers mit lebendigen Details.
// Später kann hier je nach Wohnungsstufe eine andere Ausstattung gewählt werden.
(function () {
  var INK = '#253543';
  var st = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';

  var WALL   = [0, '#efe3c8', '#e6efdc', '#e2ebf5', '#eee4f2'];
  var STRIPE = [0, '#e3d3ae', '#d6e4c8', '#cddbea', '#dfd0e8'];
  var FLOOR  = [0, '#b98f6b', '#c39b72', '#a98a6a', '#7d8a92'];
  var CARCOL = [0, '#a0522d', '#7a8a99', '#253543'];

  function shabby(tier) {
    if (tier !== 1) return '';
    return '<path d="M590 18 q26 4 30 30 q-8 24 -30 14 q-22 -14 0 -44 z" fill="#d9c08e" opacity=".7"/>' +
           '<path d="M228 12 l12 26 l-9 14 l14 24" fill="none" stroke="#a88b5f" stroke-width="2.5" stroke-linecap="round"/>';
  }
  function fly(tier) {
    return tier === 1 ? '<g class="fly"><circle cx="220" cy="150" r="2.4" fill="' + INK + '"/><path d="M218 148 l-3 -3 M222 148 l3 -3" stroke="' + INK + '" stroke-width="1"/></g>' : '';
  }
  function rug(tier) {
    return tier >= 2 ? '<ellipse cx="420" cy="266" rx="160" ry="15" fill="' + ['', '', '#c0504d', '#3f7d8c', '#2c3a47'][tier] + '" opacity=".85" stroke="' + INK + '" stroke-width="2.5"/>' : '';
  }
  function shelf(tier) {
    if (tier < 3) return '';
    var books = '';
    ['#f87845', '#ffcf5b', '#257e78', '#c4b6e6', '#b74532', '#a8d5ef'].forEach(function (c, i) { books += '<rect x="' + (566 + i * 9) + '" y="' + (60 - (i % 3) * 6) + '" width="8" height="' + (22 + (i % 3) * 6) + '" fill="' + c + '" stroke="' + INK + '" stroke-width="1.6"/>'; });
    return '<g><rect x="558" y="30" width="68" height="4" fill="#8a6547" ' + st + '/>' + books + '<rect x="558" y="84" width="68" height="4" fill="#8a6547" ' + st + '/>' +
      '<rect x="566" y="66" width="10" height="16" fill="#fffdf7" stroke="' + INK + '" stroke-width="1.6"/><circle cx="600" cy="74" r="7" fill="#4c9a6a" ' + st + '/></g>';
  }
  function skyline(tier) {
    if (tier < 4) return '';
    var out = '<g fill="#5b6b7c" opacity=".9">';
    [[52, 120, 22, 50], [80, 100, 18, 70], [102, 116, 26, 54], [134, 92, 20, 78], [160, 110, 30, 60]].forEach(function (b) {
      out += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '"/>';
    });
    out += '</g><g fill="#ffe28a">';
    [[58, 128], [58, 140], [86, 108], [86, 122], [110, 126], [110, 138], [140, 100], [140, 116], [168, 118], [180, 130]].forEach(function (w) { out += '<rect x="' + w[0] + '" y="' + w[1] + '" width="5" height="6"/>'; });
    return out + '</g>';
  }
  function car(carTier) {
    if (!carTier) return '';
    var c = CARCOL[carTier];
    return '<g transform="translate(58 132)"><path d="M0 24 Q0 12 10 10 L24 4 Q30 0 40 0 L58 0 Q68 2 74 12 Q84 14 84 24 Z" fill="' + c + '" ' + st + '/>' +
      '<path d="M28 6 L40 6 L40 12 L22 12 Z M46 6 L58 6 L64 12 L46 12 Z" fill="#a8d5ef" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="20" cy="26" r="8" fill="' + INK + '"/><circle cx="66" cy="26" r="8" fill="' + INK + '"/><circle cx="20" cy="26" r="3" fill="#dae0df"/><circle cx="66" cy="26" r="3" fill="#dae0df"/></g>';
  }

  function svg(tier, carTier) {
    return '' +
    '<svg class="scene" viewBox="0 0 640 300" role="img" aria-label="Deine kleine Wohnung mit Schreibtisch, Fenster und Computer">' +
      '<defs><clipPath id="scene-win"><rect x="44" y="50" width="150" height="120" rx="6"/></clipPath></defs>' +
      // Wand + Boden
      '<rect width="640" height="300" fill="' + WALL[tier] + '"/>' +
      '<g opacity=".5" fill="' + STRIPE[tier] + '"><rect x="0" y="0" width="40" height="230"/><rect x="80" y="0" width="40" height="230"/><rect x="160" y="0" width="40" height="230"/><rect x="240" y="0" width="40" height="230"/><rect x="320" y="0" width="40" height="230"/><rect x="400" y="0" width="40" height="230"/><rect x="480" y="0" width="40" height="230"/><rect x="560" y="0" width="40" height="230"/></g>' +
      '<rect y="230" width="640" height="70" fill="' + FLOOR[tier] + '"/><path d="M0 230 H640" ' + st + '/>' +
      '<g opacity=".35" stroke="#8a6547" stroke-width="2"><path d="M60 252 H600 M0 276 H640"/></g>' +
      shabby(tier) +
      // Fenster mit Sonne und Wolken
      '<rect x="44" y="50" width="150" height="120" rx="6" fill="#a8d5ef"/>' +
      '<g clip-path="url(#scene-win)">' +
        '<g class="sun-rays"><circle cx="150" cy="86" r="16" fill="#ffcf5b" stroke="' + INK + '" stroke-width="2.5"/>' +
          '<g stroke="#ffcf5b" stroke-width="4" stroke-linecap="round"><path d="M150 58 v-8 M150 114 v8 M122 86 h-8 M178 86 h8 M130 66 l-6 -6 M170 106 l6 6 M170 66 l6 -6 M130 106 l-6 6"/></g></g>' +
        skyline(tier) + car(carTier) +
        '<g class="cloud-a"><ellipse cx="80" cy="76" rx="24" ry="9" fill="#fff"/><ellipse cx="96" cy="70" rx="14" ry="9" fill="#fff"/></g>' +
        '<g class="cloud-b"><ellipse cx="60" cy="118" rx="20" ry="7" fill="#fff" opacity=".9"/><ellipse cx="72" cy="113" rx="11" ry="7" fill="#fff" opacity=".9"/></g>' +
      '</g>' +
      '<rect x="44" y="50" width="150" height="120" rx="6" fill="none" ' + st + '/><path d="M119 50 V170 M44 110 H194" ' + st + '/>' +
      '<rect x="36" y="168" width="166" height="10" rx="3" fill="#fffdf7" ' + st + '/>' +
      // Uhr
      '<g><circle cx="300" cy="66" r="30" fill="#fffdf7" ' + st + '/>' +
        '<g stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"><path d="M300 42 v5 M300 85 v5 M276 66 h5 M319 66 h5"/></g>' +
        '<g class="clock-h"><path d="M300 66 V50" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/></g>' +
        '<g class="clock-m"><path d="M300 66 V44" stroke="#f87845" stroke-width="3" stroke-linecap="round"/></g>' +
        '<circle cx="300" cy="66" r="3" fill="' + INK + '"/></g>' +
      // Poster
      '<rect x="468" y="18" width="70" height="92" rx="4" fill="#bfe8d2" ' + st + '/><text x="503" y="50" text-anchor="middle" font-family="ui-rounded,Trebuchet MS,sans-serif" font-size="13" font-weight="800" fill="' + INK + '">SELECT</text><text x="503" y="68" text-anchor="middle" font-family="ui-rounded,Trebuchet MS,sans-serif" font-size="13" font-weight="800" fill="#257e78">* FROM</text><text x="503" y="86" text-anchor="middle" font-family="ui-rounded,Trebuchet MS,sans-serif" font-size="13" font-weight="800" fill="#f87845">erfolg;</text>' +
      // Pflanze
      '<g><path d="M20 230 L24 262 H56 L60 230 Z" fill="#c9784f" ' + st + '/><g class="plant"><path d="M40 232 Q24 200 30 180 Q42 198 40 232 Z M40 232 Q56 196 66 190 Q56 212 40 232 Z M40 232 Q40 196 46 168 Q54 200 40 232 Z" fill="#4c9a6a" ' + st + '/></g></g>' +
      rug(tier) + shelf(tier) +
      // Stuhllehne
      '<rect x="318" y="120" width="96" height="120" rx="14" fill="#8a6547" ' + st + '/>' +
      // Spieler (verschachtelt, wird von außen angesprochen: .scene-player)
      '<svg class="scene-player-slot" x="316" y="88" width="100" height="125" viewBox="0 0 120 150"></svg>' +
      // Schreibtisch
      '<rect x="270" y="212" width="360" height="16" rx="4" fill="#d9a56b" ' + st + '/><rect x="284" y="228" width="12" height="60" fill="#b98255" ' + st + '/><rect x="604" y="228" width="12" height="60" fill="#b98255" ' + st + '/>' +
      // Monitor
      '<g><rect x="452" y="128" width="112" height="76" rx="8" fill="#253543" ' + st + '/><rect x="460" y="136" width="96" height="58" rx="3" fill="#1c5a56"/>' +
        '<g fill="#bfe8d2"><rect class="code-line" x="466" y="144" width="60" height="4" rx="2"/><rect class="code-line" x="466" y="153" width="44" height="4" rx="2"/><rect class="code-line" x="466" y="162" width="72" height="4" rx="2"/><rect class="code-line" x="466" y="171" width="34" height="4" rx="2"/></g>' +
        '<rect class="cursor" x="504" y="171" width="6" height="4" fill="#ffcf5b"/>' +
        '<path d="M508 204 v8 M486 212 h44" ' + st + '/></g>' +
      // PC mit LEDs
      '<g><rect x="578" y="150" width="42" height="62" rx="5" fill="#dae0df" ' + st + '/><rect x="584" y="158" width="30" height="4" rx="2" fill="#253543"/><rect x="584" y="166" width="30" height="4" rx="2" fill="#253543"/>' +
        '<circle class="led led-1" cx="588" cy="186" r="3.2" fill="#3fbf78"/><circle class="led led-2" cx="598" cy="186" r="3.2" fill="#f87845"/><circle class="led led-3" cx="608" cy="186" r="3.2" fill="#4aa8ff"/></g>' +
      // Tasse mit Dampf
      '<g><path d="M414 196 h26 l-3 16 h-20 z" fill="#fffdf7" ' + st + '/><path d="M440 200 q10 0 8 8 q-2 6 -10 4" fill="none" ' + st + '/>' +
        '<path class="steam steam-1" d="M421 190 q-4 -8 2 -12 q4 -4 0 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>' +
        '<path class="steam steam-2" d="M428 190 q-4 -8 2 -12 q4 -4 0 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
        '<path class="steam steam-3" d="M435 190 q-4 -8 2 -12 q4 -4 0 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>' +
      // Schreibtischlampe
      '<g><path d="M292 212 v-42 l12 -12" fill="none" ' + st + '/><path d="M298 146 l22 10 l-9 14 l-22 -10 z" fill="#ffcf5b" ' + st + '/>' +
        '<ellipse class="lamp-glow" cx="300" cy="211" rx="26" ry="5" fill="#ffe9a8" opacity=".55"/></g>' +
      fly(tier) +
    '</svg>';
  }

  // Erzeugt die Szene, setzt den Spieler ein und gibt Zugriffe zurück
  function make(tier, carTier) {
    tier = tier || 1; carTier = carTier || 0;
    var wrap = document.createElement('div');
    wrap.innerHTML = svg(tier, carTier);
    var root = wrap.firstChild;
    var slot = root.querySelector('.scene-player-slot');
    var player = Characters.make('spieler', { size: 120 });
    player.removeAttribute('width'); player.removeAttribute('height');
    player.setAttribute('x', 0); player.setAttribute('y', 0); player.setAttribute('width', 120); player.setAttribute('height', 150);
    slot.appendChild(player);
    var api = { el: root, player: player, setClock: function (minutes) { setClock(root, minutes); } };
    return api;
  }

  // Uhrzeiger nach Spielzeit (Minuten seit Mitternacht)
  function setClock(root, minutes) {
    var h = (minutes / 60) % 12, m = minutes % 60;
    var ha = h * 30, ma = m * 6;
    var hh = root.querySelector('.clock-h'), mh = root.querySelector('.clock-m');
    if (hh) hh.setAttribute('transform', 'rotate(' + ha + ' 300 66)');
    if (mh) mh.setAttribute('transform', 'rotate(' + ma + ' 300 66)');
  }

  window.Scene = { make: make, setClock: setClock };
})();

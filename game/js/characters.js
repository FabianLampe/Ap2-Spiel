// Figuren als SVG-Halbporträts mit einzeln animierbaren Teilen.
// Zustände per Klasse am Figur-Element: is-happy, is-sad, is-talking, is-thinking (siehe css/anim.css)
(function () {
  var INK = '#253543';

  // Konfiguration je Figur
  var FIGURES = {
    spieler:      { name: 'Du',                  skin: '#f3c7a0', hair: '#3b2a20', hairStyle: 'short',  shirt: '#f87845', extra: 'hoodie',  delay: 0.0 },
    kalle:        { name: 'Chef Kalle',          skin: '#e8b48c', hair: '#8a8f94', hairStyle: 'bald',   shirt: '#257e78', extra: 'tie',     delay: 0.9, tie: '#ffcf5b', mustache: true, belly: true },
    finanzamt:    { name: 'Frau Pfennig',        skin: '#f0c4a4', hair: '#4a3b3b', hairStyle: 'bun',    shirt: '#6b7f95', extra: 'lanyard', delay: 1.7, glasses: true },
    bank:         { name: 'Herr Zinsmann',       skin: '#e6b995', hair: '#22303c', hairStyle: 'slick',  shirt: '#1f3a5a', extra: 'tie',     delay: 0.4, tie: '#b74532' },
    startup:      { name: 'Lennox',              skin: '#d9a781', hair: '#7a3e2a', hairStyle: 'beanie', shirt: '#bfe8d2', extra: 'headset', delay: 2.3, beanie: '#f87845' },
    barista:      { name: 'Barista',            skin: '#d9b08c', hair: '#3a2a20', hairStyle: 'short',  shirt: '#8a3d2e', extra: 'none',    delay: 0.6 },
    makler:       { name: 'Makler Schlüssel',   skin: '#e6b995', hair: '#6a4a2a', hairStyle: 'slick',  shirt: '#2b3a4a', extra: 'tie',     delay: 1.1, tie: '#4a8f6a' },
    verkaeufer:   { name: 'Herr Rost',          skin: '#d6a67e', hair: '#2a2a2a', hairStyle: 'slick',  shirt: '#1f4f8f', extra: 'none',    delay: 1.9 },
    datenschutz:  { name: 'Dr. Blattner',        skin: '#f5cfb1', hair: '#7b5fb3', hairStyle: 'bob',    shirt: '#c4b6e6', extra: 'badge',   delay: 1.3, glasses: true }
  };

  function hairBack(c) {
    if (c.hairStyle === 'bob') return '<path d="M32 60 Q28 28 60 24 Q92 28 88 60 L88 84 Q78 80 78 66 L42 66 Q42 80 32 84 Z" fill="' + c.hair + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>';
    return '';
  }
  function hairFront(c) {
    var s = 'stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"';
    switch (c.hairStyle) {
      case 'short': return '<path d="M33 50 Q30 22 60 22 Q90 22 87 50 Q80 36 60 36 Q42 36 33 50 Z" fill="' + c.hair + '" ' + s + '/>';
      case 'bald':  return '<path d="M34 50 Q32 40 38 36 Q36 46 36 54 Z M86 50 Q88 40 82 36 Q84 46 84 54 Z" fill="' + c.hair + '" ' + s + '/>';
      case 'bun':   return '<circle cx="60" cy="18" r="9" fill="' + c.hair + '" ' + s + '/><path d="M33 50 Q30 22 60 22 Q90 22 87 50 Q76 34 60 34 Q44 34 33 50 Z" fill="' + c.hair + '" ' + s + '/>';
      case 'slick': return '<path d="M33 48 Q32 22 62 22 Q90 24 87 48 Q84 34 70 32 Q50 30 33 48 Z" fill="' + c.hair + '" ' + s + '/>';
      case 'beanie':return '<path d="M32 46 Q30 16 60 16 Q90 16 88 46 Z" fill="' + c.beanie + '" ' + s + '/><rect x="31" y="40" width="58" height="9" rx="4" fill="' + c.beanie + '" ' + s + '/><circle cx="60" cy="14" r="4" fill="#fffdf7" ' + s + '/>';
      case 'bob':   return '<path d="M33 50 Q30 22 60 22 Q90 22 87 50 Q78 34 60 34 Q46 34 33 50 Z" fill="' + c.hair + '" ' + s + '/>';
    }
    return '';
  }
  function extras(c) {
    var out = '', s = 'stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"';
    if (c.extra === 'tie') out += '<path d="M56 82 L64 82 L66 92 L60 118 L54 92 Z" fill="' + c.tie + '" ' + s + '/>';
    if (c.extra === 'hoodie') out += '<path d="M46 80 Q60 96 74 80" fill="none" ' + s + '/><path d="M55 92 L55 106 M65 92 L65 106" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/>';
    if (c.extra === 'lanyard') out += '<path d="M50 80 L60 112 L70 80" fill="none" stroke="#f87845" stroke-width="3"/><rect x="53" y="110" width="14" height="18" rx="3" fill="#fffdf7" ' + s + '/>';
    if (c.extra === 'badge') out += '<rect x="66" y="98" width="16" height="16" rx="4" fill="#ffcf5b" ' + s + '/><path d="M71 104 v-2 a3 3 0 0 1 6 0 v2 M70 104 h8 v6 h-8 z" fill="none" stroke="' + INK + '" stroke-width="1.6"/>';
    if (c.extra === 'headset') out += '<path d="M34 54 Q34 24 60 24 Q86 24 86 54" fill="none" stroke="' + INK + '" stroke-width="4"/><rect x="28" y="50" width="9" height="15" rx="4" fill="#f87845" ' + s + '/><rect x="83" y="50" width="9" height="15" rx="4" fill="#f87845" ' + s + '/><path d="M32 64 Q34 78 48 74" fill="none" stroke="' + INK + '" stroke-width="2.5"/><circle cx="49" cy="74" r="3" fill="' + INK + '"/>';
    return out;
  }
  function face(c) {
    var s = 'stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"';
    var g = '';
    if (c.glasses) g = '<g class="glasses" fill="rgba(255,255,255,.25)" stroke="' + INK + '" stroke-width="2.2"><circle cx="50" cy="52" r="9"/><circle cx="70" cy="52" r="9"/><path d="M59 52 h2 M41 52 L34 50 M79 52 L86 50" fill="none"/></g>';
    return (
      '<g class="head-g">' +
        hairBack(c) +
        '<circle cx="34" cy="54" r="5" fill="' + c.skin + '" ' + s + '/><circle cx="86" cy="54" r="5" fill="' + c.skin + '" ' + s + '/>' +
        '<circle cx="60" cy="52" r="26" fill="' + c.skin + '" ' + s + '/>' +
        '<g class="eyes"><ellipse cx="50" cy="52" rx="5" ry="6" fill="#fff" stroke="' + INK + '" stroke-width="1.8"/><ellipse cx="70" cy="52" rx="5" ry="6" fill="#fff" stroke="' + INK + '" stroke-width="1.8"/>' +
          '<g class="pupils"><circle cx="50" cy="53" r="2.7" fill="' + INK + '"/><circle cx="70" cy="53" r="2.7" fill="' + INK + '"/></g></g>' +
        '<g class="brows" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round" fill="none"><path class="brow-l" d="M43 43 Q50 39 57 43"/><path class="brow-r" d="M63 43 Q70 39 77 43"/></g>' +
        '<path d="M60 55 Q57 62 61 62" fill="none" stroke="' + INK + '" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
        (c.mustache ? '<path d="M47 64 Q53 60 60 64 Q67 60 73 64 Q67 68 60 65 Q53 68 47 64 Z" fill="' + c.hair + '" ' + s + '/>' : '') +
        '<g class="mouth"><path class="m-smile" d="M51 67 Q60 74 69 67" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path class="m-happy" opacity="0" d="M49 65 Q60 82 71 65 Z" fill="#7a2d2d" ' + s + '/>' +
          '<path class="m-sad" opacity="0" d="M52 71 Q60 64 68 71" fill="none" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>' +
          '<ellipse class="m-open" opacity="0" cx="60" cy="68" rx="6" ry="5" fill="#7a2d2d" ' + s + '/></g>' +
        g +
        hairFront(c) +
        (c.extra === 'headset' ? extras(c) : '') +
      '</g>'
    );
  }
  function arm(c, side) {
    var x = side === 'l' ? 26 : 94, s = 'stroke="' + INK + '" stroke-width="2.5"';
    return '<g transform="translate(' + x + ' 88)"><g class="arm-' + side + '"><rect x="-7" y="0" width="14" height="48" rx="7" fill="' + c.shirt + '" ' + s + '/><circle cx="0" cy="50" r="7.5" fill="' + c.skin + '" ' + s + '/></g></g>';
  }
  function body(c) {
    var s = 'stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"';
    var w = c.belly ? 4 : 0;
    return '<g class="body-g">' +
      '<rect x="52" y="74" width="16" height="12" fill="' + c.skin + '" ' + s + '/>' +
      '<path d="M' + (30 - w) + ' 150 L' + (30 - w) + ' 104 Q' + (30 - w) + ' 82 50 80 Q60 88 70 80 Q' + (90 + w) + ' 82 ' + (90 + w) + ' 104 L' + (90 + w) + ' 150 Z" fill="' + c.shirt + '" ' + s + '/>' +
      (c.extra !== 'headset' ? extras(c) : '') +
    '</g>';
  }

  function make(id, opts) {
    var c = typeof id === 'object' ? id : FIGURES[id]; if (!c) throw new Error('Unbekannte Figur: ' + id);
    if (typeof id === 'object') id = 'custom';
    var size = (opts && opts.size) || 120;
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<svg class="fig fig-' + id + '" viewBox="0 0 120 150" width="' + size + '" height="' + Math.round(size * 1.25) + '" role="img" aria-label="' + c.name + '" style="--d:' + c.delay + 's">' +
        '<g class="fig-all">' + arm(c, 'l') + arm(c, 'r') + body(c) + face(c) + '</g></svg>';
    return wrap.firstChild;
  }

  function setPlayer(cfg) { FIGURES.spieler = Object.assign({}, FIGURES.spieler, cfg); }
  window.Characters = { make: make, setPlayer: setPlayer, ids: Object.keys(FIGURES), info: FIGURES };
})();

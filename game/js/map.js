// Karte der Stadt: Orte, Reisezeiten und die Kartenansicht (2D-Fenster). Gebaut wird der Ort selbst in world/locations/<id>.js
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs, kids) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }

  // x, y auf einer 100 × 100 Karte
  var PLACES = {
    wohnung:      { name: 'Deine Wohnung',           x: 16, y: 74, color: '#f87845', desc: 'Schlafen, Finanzen ansehen. Der Tag beginnt hier.' },
    cafe:         { name: 'Café Kolben',              x: 40, y: 56, color: '#c9784f', desc: 'Dein Arbeitsplatz, solange du kein Büro hast. Ein Kaffee kostet 4 €.' },
    buero:        { name: 'Dein Büro',                x: 62, y: 34, color: '#257e78', desc: 'Ruhiger Arbeitsplatz, aber du musst es beim Makler mieten.' },
    bank:         { name: 'Stadtbank',                x: 76, y: 58, color: '#1f3a5a', desc: 'Herr Zinsmann berät zu Geld und Wirtschaft.' },
    finanzamt:    { name: 'Finanzamt',                x: 86, y: 30, color: '#6b7f95', desc: 'Frau Pfennig hat Fragen zu Steuern und Recht.' },
    autohaus:     { name: 'Autohaus Rost & Söhne',    x: 84, y: 84, color: '#b74532', desc: 'Ein Auto bringt mehr Honorar.' },
    makler:       { name: 'Immobilien Schlüssel',     x: 52, y: 82, color: '#4a8f6a', desc: 'Bessere Wohnung oder ein eigenes Büro mieten.' },
    weiterbildung:{ name: 'Lernzentrum Datenwerk',    x: 26, y: 32, color: '#7b5fb3', desc: 'Hier kaufst du Skills für neue Aufträge.' }
  };
  var ORDER = ['wohnung', 'cafe', 'buero', 'weiterbildung', 'makler', 'autohaus', 'bank', 'finanzamt'];

  // Reisezeit in Spielminuten: zu Fuß, mit Auto etwa halb so lang
  function minutes(from, to, carTier) {
    if (!PLACES[from] || !PLACES[to] || from === to) return 0;
    var d = Math.hypot(PLACES[from].x - PLACES[to].x, PLACES[from].y - PLACES[to].y), walk = Math.max(8, Math.round(d * 0.7));
    return carTier > 0 ? Math.max(4, Math.round(walk * 0.5)) : walk;
  }

  function mapSvg(cur, selected, lockedFn, onPick) {
    var svg = s('svg', { viewBox: '0 0 100 100', class: 'citymap', role: 'img', 'aria-label': 'Karte der Stadt' });
    svg.appendChild(s('rect', { width: 100, height: 100, fill: '#e9e2c9' }));
    // Fluss
    svg.appendChild(s('path', { d: 'M0 44 C22 40 30 52 48 46 C66 40 78 50 100 44 L100 51 C78 57 66 47 48 53 C30 59 22 47 0 51 Z', fill: '#a8d5ef', stroke: '#253543', 'stroke-width': .5 }));
    // Parks
    [[8, 8, 14], [70, 10, 10], [6, 90, 8]].forEach(function (p) { svg.appendChild(s('circle', { cx: p[0], cy: p[1], r: p[2], fill: '#bfe0b0', stroke: '#6a9a5a', 'stroke-width': .4 })); });
    // Straßen
    var roads = 'M0 66 H100 M0 24 H100 M30 0 V100 M56 0 V100 M80 0 V100';
    svg.appendChild(s('path', { d: roads, stroke: '#fffdf7', 'stroke-width': 3.4, fill: 'none' }));
    svg.appendChild(s('path', { d: roads, stroke: '#cfc7a8', 'stroke-width': .5, 'stroke-dasharray': '2 2', fill: 'none' }));
    // Häuserblöcke (rein dekorativ)
    [[4, 28, 14, 8], [34, 28, 16, 10], [60, 68, 14, 8], [4, 68, 10, 8], [34, 68, 12, 8], [60, 4, 14, 10], [84, 66, 12, 8], [34, 4, 14, 8]].forEach(function (b) {
      svg.appendChild(s('rect', { x: b[0], y: b[1], width: b[2], height: b[3], rx: 1, fill: '#d8ccb0', stroke: '#b8a988', 'stroke-width': .3 }));
    });
    ORDER.forEach(function (id) {
      var p = PLACES[id], locked = lockedFn(id), here = id === cur, sel = id === selected;
      var g = s('g', { class: 'pin' + (sel ? ' sel' : '') + (locked ? ' locked' : ''), tabindex: 0, role: 'button', 'aria-label': p.name + (here ? ' (hier)' : '') + (locked ? ' (gesperrt)' : ''), style: 'cursor:pointer' });
      if (here) g.appendChild(s('circle', { cx: p.x, cy: p.y, r: 5.5, fill: 'none', stroke: '#f87845', 'stroke-width': .8, class: 'here-ring' }));
      g.appendChild(s('circle', { cx: p.x, cy: p.y + .8, r: 3.6, fill: 'rgba(37,53,67,.25)' }));
      g.appendChild(s('circle', { cx: p.x, cy: p.y, r: 3.6, fill: locked ? '#b7bdbb' : p.color, stroke: '#253543', 'stroke-width': .7 }));
      g.appendChild(s('text', { x: p.x, y: p.y + 1.3, 'text-anchor': 'middle', 'font-size': 3.6, 'font-weight': 800, fill: '#fffdf7' }, [locked ? '🔒' : String(ORDER.indexOf(id) + 1)]));
      var label = s('text', { x: p.x, y: p.y + 7.4, 'text-anchor': 'middle', 'font-size': 3, 'font-weight': 800, fill: '#253543', stroke: '#fffdf7', 'stroke-width': .9, 'paint-order': 'stroke' }, [p.name]);
      g.appendChild(label);
      g.addEventListener('click', function () { onPick(id); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(id); } });
      svg.appendChild(g);
    });
    return svg;
  }

  // ctx: { current, car, isLocked(id) -> string|false (Grund), go(id), selected, select(id), close() }
  function render(ctx) {
    var wrap = el('div');
    wrap.appendChild(el('h1', {}, ['Karte']));
    wrap.appendChild(el('p', { class: 'sub' }, ['Wähle, wohin du gehen willst. Der Weg kostet Zeit' + (ctx.car > 0 ? ' (mit Auto nur halb so viel).' : '.') + ' Du bist bei: ' + PLACES[ctx.current].name + '.']));
    var sel = ctx.selected && PLACES[ctx.selected] ? ctx.selected : null;
    var left = el('div', { class: 'card', style: 'padding:8px' }, [mapSvg(ctx.current, sel, function (id) { return !!ctx.isLocked(id); }, ctx.select)]);
    var right = el('div', { class: 'card' });
    if (!sel) {
      right.appendChild(el('h2', {}, ['Orte']));
      ORDER.forEach(function (id, i) {
        var lock = ctx.isLocked(id), mins = minutes(ctx.current, id, ctx.car);
        right.appendChild(el('button', { class: 'btn small ghost mapitem', onclick: function () { ctx.select(id); } }, [(i + 1) + '  ' + PLACES[id].name + (id === ctx.current ? '  (hier)' : lock ? '  🔒' : '  ' + mins + ' Min.')]));
      });
    } else {
      var p = PLACES[sel], lock = ctx.isLocked(sel), mins = minutes(ctx.current, sel, ctx.car);
      right.appendChild(el('h2', {}, [p.name]));
      right.appendChild(el('p', { class: 'sub' }, [p.desc]));
      if (sel === ctx.current) right.appendChild(el('p', {}, ['Du bist schon hier.']));
      else if (lock) right.appendChild(el('div', { class: 'msg info' }, [lock]));
      else right.appendChild(el('p', {}, ['Weg: ' + mins + ' Minuten.']));
      right.appendChild(el('div', { class: 'row', style: 'margin-top:12px' }, [
        el('button', { class: 'btn', disabled: (sel === ctx.current || !!lock) ? 'disabled' : null, onclick: function () { ctx.go(sel); } }, ['Hingehen']),
        el('button', { class: 'btn ghost', onclick: function () { ctx.select(null); } }, ['Alle Orte'])
      ]));
      var b = right.querySelector('button'); if (b && (sel === ctx.current || lock)) b.disabled = true; else if (b) b.removeAttribute('disabled');
    }
    wrap.appendChild(el('div', { class: 'mapgrid' }, [left, right]));
    return wrap;
  }

  window.GameMap = { PLACES: PLACES, ORDER: ORDER, minutes: minutes, render: render };
})();

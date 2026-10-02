// Zeichnet Diagramme (UML, ER, Relationenmodell, EPK) als SVG mit automatischem Layout.
// DiagrammDraw.svg(modus, modell) -> SVG-String. Das Modell hat dieselbe Form wie loesung_diagramm in den Kompass-Daten.
(function () {
  var INK = '#253543', FILL = '#fffdf7', MUTED = '#718087', ACCENT = '#257e78';
  var CW = 6.9, LH = 16;                      // Zeichenbreite und Zeilenhöhe (Schrift 12px)

  function esc(s) { return String(s === null || s === undefined ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function tw(s) { return String(s || '').length * CW; }
  function text(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-size="' + (o.size || 12) + '"' + (o.anchor ? ' text-anchor="' + o.anchor + '"' : '') + (o.weight ? ' font-weight="' + o.weight + '"' : '') +
      (o.italic ? ' font-style="italic"' : '') + (o.under ? ' text-decoration="underline"' : '') + ' fill="' + (o.fill || INK) + '">' + esc(s) + '</text>';
  }
  // Zeilenumbruch für lange Beschriftungen
  function wrap(s, max) {
    var words = String(s || '').split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) { if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur); return lines.length ? lines : [''];
  }
  function wrapText(cx, cy, s, max, o) {
    var ls = wrap(s, max), y0 = cy - (ls.length - 1) * 7 + 4;
    return ls.map(function (l, i) { return text(cx, y0 + i * 14, l, Object.assign({ anchor: 'middle' }, o || {})); }).join('');
  }
  function svg(w, h, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + Math.ceil(w) + ' ' + Math.ceil(h) + '" width="' + Math.ceil(w) + '" height="' + Math.ceil(h) + '" font-family="ui-sans-serif,Segoe UI,Arial,sans-serif" role="img">' +
      '<defs>' +
      '<marker id="dg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + INK + '"/></marker>' +
      '<marker id="dg-open" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10" fill="none" stroke="' + INK + '" stroke-width="1.5"/></marker>' +
      '<marker id="dg-tri" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="13" markerHeight="13" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="' + INK + '" stroke-width="1.3"/></marker>' +
      '<marker id="dg-dia" viewBox="0 0 16 10" refX="15" refY="5" markerWidth="16" markerHeight="10" orient="auto-start-reverse"><path d="M0,5 L8,0 L16,5 L8,10 z" fill="#fff" stroke="' + INK + '" stroke-width="1.3"/></marker>' +
      '</defs><rect width="100%" height="100%" fill="#fff"/>' + body + '</svg>';
  }
  // Punkt auf dem Rand eines Rechtecks in Richtung (tx, ty)
  function clipRect(b, tx, ty) {
    var cx = b.x + b.w / 2, cy = b.y + b.h / 2, dx = tx - cx, dy = ty - cy;
    if (!dx && !dy) return { x: cx, y: cy };
    var sx = dx ? (b.w / 2) / Math.abs(dx) : Infinity, sy = dy ? (b.h / 2) / Math.abs(dy) : Infinity, s = Math.min(sx, sy);
    return { x: cx + dx * s, y: cy + dy * s };
  }
  function line(a, b, o) {
    o = o || {};
    return '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="' + INK + '" stroke-width="1.4"' +
      (o.dash ? ' stroke-dasharray="6 4"' : '') + (o.end ? ' marker-end="url(#' + o.end + ')"' : '') + (o.start ? ' marker-start="url(#' + o.start + ')"' : '') + '/>';
  }
  function label(x, y, s, o) {
    if (!s) return '';
    var w = tw(s) + 8;
    return '<rect x="' + (x - w / 2) + '" y="' + (y - 9) + '" width="' + w + '" height="16" rx="3" fill="#fff" opacity=".92"/>' + text(x, y + 3, s, Object.assign({ anchor: 'middle', size: 11 }, o || {}));
  }
  function emptyHint(msg) { return svg(420, 80, text(210, 44, msg || 'Noch leer – lege links Elemente an.', { anchor: 'middle', fill: MUTED })); }

  // ---------- Kästen im Raster (Klassen, Entitäten, Tabellen) ----------
  function gridLayout(boxes, gapX, gapY) {
    var n = boxes.length, cols = Math.max(1, Math.min(4, Math.ceil(Math.sqrt(n * 1.4)))), colW = [], rowH = [];
    boxes.forEach(function (b, i) { var c = i % cols, r = Math.floor(i / cols); colW[c] = Math.max(colW[c] || 0, b.w); rowH[r] = Math.max(rowH[r] || 0, b.h); });
    var X = [20], Y = [20]; colW.forEach(function (w, i) { X[i + 1] = X[i] + w + gapX; }); rowH.forEach(function (h, i) { Y[i + 1] = Y[i] + h + gapY; });
    boxes.forEach(function (b, i) { var c = i % cols, r = Math.floor(i / cols); b.x = X[c] + (colW[c] - b.w) / 2; b.y = Y[r]; });
    return { w: X[colW.length] - gapX + 20, h: Y[rowH.length] - gapY + 20 };
  }

  // Kästen in Ebenen: edges [{from, to}] zeigen von oben nach unten (z. B. Oberklasse -> Unterklasse)
  function boxLayered(boxes, edges) {
    var nodes = boxes.map(function (b, i) { b.id = b.id || ('b' + i); return b; });
    var lay = layered(nodes, edges, null, 80);
    return { w: lay.w, h: lay.h };
  }

  function sig(m) { return (m.name || '?') + '(' + (m.parameter || []).map(function (p) { return p.name + (p.typ ? ': ' + p.typ : ''); }).join(', ') + ')' + (m.rueckgabe ? ' : ' + m.rueckgabe : ''); }
  function attrStr(a) { return (a.name || '?') + (a.typ ? ' : ' + a.typ : ''); }

  function drawKlassen(m) {
    var ks = m.klassen || []; if (!ks.length) return emptyHint();
    var boxes = ks.map(function (k) {
      var head = (k.art === 'interface' ? ['«interface»'] : []).concat([k.name || '???']);
      var at = (k.attribute || []).map(function (a) { return (a.sicht || ' ') + ' ' + attrStr(a); });
      var me = (k.methoden || []).map(function (x) { return (x.sicht || ' ') + ' ' + sig(x); });
      var w = Math.max(120, Math.max.apply(null, head.concat(at, me).map(tw)) + 20);
      return { k: k, head: head, at: at, me: me, meAbs: (k.methoden || []).map(function (x) { return !!x.abstrakt; }), w: w, h: head.length * LH + 10 + Math.max(1, at.length) * LH + 8 + Math.max(1, me.length) * LH + 8 };
    });
    var by = {}, out = '';
    boxes.forEach(function (b, i) { b.id = 'k' + i; by[b.k.name] = b; });
    var size = boxLayered(boxes, (m.beziehungen || []).filter(function (r) { return by[r.a] && by[r.b] && r.a !== r.b; }).map(function (r) {
      return r.art === 'vererbung' || r.art === 'realisierung' ? { from: by[r.b].id, to: by[r.a].id } : { from: by[r.a].id, to: by[r.b].id };
    }));
    (m.beziehungen || []).forEach(function (r) {
      var A = by[r.a], B = by[r.b]; if (!A || !B || A === B) return;
      var p = clipRect(A, B.x + B.w / 2, B.y + B.h / 2), q = clipRect(B, A.x + A.w / 2, A.y + A.h / 2);
      var o = r.art === 'vererbung' ? { end: 'dg-tri' } : r.art === 'realisierung' ? { end: 'dg-tri', dash: true } : r.art === 'aggregation' || r.art === 'komposition' ? { start: 'dg-dia' } : {};
      out += line(p, q, o);
      if (r.name) out += label((p.x + q.x) / 2, (p.y + q.y) / 2 - 8, r.name, { italic: true });
      if (r.multA) out += label(p.x + (q.x - p.x) * 0.14, p.y + (q.y - p.y) * 0.14 + 12, r.multA);
      if (r.multB) out += label(q.x + (p.x - q.x) * 0.14, q.y + (p.y - q.y) * 0.14 + 12, r.multB);
    });
    boxes.forEach(function (b) {
      var x = b.x, y = b.y, hh = b.head.length * LH + 10, ah = Math.max(1, b.at.length) * LH + 8;
      out += '<rect x="' + x + '" y="' + y + '" width="' + b.w + '" height="' + b.h + '" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.5" rx="2"/>';
      b.head.forEach(function (h, i) { out += text(x + b.w / 2, y + 17 + i * LH, h, { anchor: 'middle', weight: i === b.head.length - 1 ? 700 : 400, italic: b.k.art === 'abstrakt' && i === b.head.length - 1, size: i === b.head.length - 1 ? 13 : 11 }); });
      out += line({ x: x, y: y + hh }, { x: x + b.w, y: y + hh }) + line({ x: x, y: y + hh + ah }, { x: x + b.w, y: y + hh + ah });
      b.at.forEach(function (a, i) { out += text(x + 8, y + hh + 16 + i * LH, a); });
      b.me.forEach(function (a, i) { out += text(x + 8, y + hh + ah + 16 + i * LH, a, { italic: b.meAbs[i] }); });
    });
    return svg(size.w, size.h, out);
  }

  function drawER(m) {
    var es = m.entitaeten || []; if (!es.length) return emptyHint();
    var boxes = es.map(function (e) {
      var at = (e.attribute || []);
      var w = Math.max(110, Math.max.apply(null, [tw(e.name) + 24].concat(at.map(function (a) { return tw(a.name) + 24; }))));
      return { e: e, at: at, w: w, h: 30 + at.length * LH + 8 };
    });
    var size = gridLayout(boxes, 150, 110), by = {}, out = '';
    boxes.forEach(function (b) { by[b.e.name] = b; });
    (m.beziehungen || []).forEach(function (r) {
      var A = by[r.a], B = by[r.b]; if (!A || !B) return;
      var p = clipRect(A, B.x + B.w / 2, B.y + B.h / 2), q = clipRect(B, A.x + A.w / 2, A.y + A.h / 2), mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
      var dw = Math.max(70, tw(r.name) + 30) / 2, dh = 20;
      out += line(p, { x: mx, y: my }) + line({ x: mx, y: my }, q);
      out += '<path d="M' + (mx - dw) + ',' + my + ' L' + mx + ',' + (my - dh) + ' L' + (mx + dw) + ',' + my + ' L' + mx + ',' + (my + dh) + ' z" fill="#fff6dc" stroke="' + INK + '" stroke-width="1.5"/>' + text(mx, my + 4, r.name || '?', { anchor: 'middle', size: 11 });
      out += label(p.x + (mx - p.x) * 0.3, p.y + (my - p.y) * 0.3 - 10, r.kardA || '', { weight: 700 }) + label(q.x + (mx - q.x) * 0.3, q.y + (my - q.y) * 0.3 - 10, r.kardB || '', { weight: 700 });
      (r.attribute || []).forEach(function (a, i) { var ax = mx + dw + 16, ay = my + 28 + i * 24; out += line({ x: mx, y: my + dh }, { x: ax, y: ay - 6 }) + '<ellipse cx="' + (ax + tw(a.name) / 2 + 6) + '" cy="' + ay + '" rx="' + (tw(a.name) / 2 + 10) + '" ry="10" fill="#fff" stroke="' + INK + '"/>' + text(ax + tw(a.name) / 2 + 6, ay + 4, a.name, { anchor: 'middle', size: 11 }); });
    });
    boxes.forEach(function (b) {
      out += '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.6"/>' + text(b.x + b.w / 2, b.y + 19, b.e.name || '???', { anchor: 'middle', weight: 700, size: 13 }) + line({ x: b.x, y: b.y + 27 }, { x: b.x + b.w, y: b.y + 27 });
      b.at.forEach(function (a, i) { out += text(b.x + 10, b.y + 44 + i * LH, a.name, { under: !!a.istSchluessel }); });
    });
    return svg(size.w + 60, size.h + 40, out);
  }

  function drawRelationen(m) {
    var ts = m.tabellen || []; if (!ts.length) return emptyHint();
    var boxes = ts.map(function (t) {
      var rows = (t.spalten || []).map(function (s) { return { s: s, txt: s.name + (s.istPK ? '  PK' : '') + (s.istFK ? '  FK' + (s.refTabelle ? '→' + s.refTabelle : '') : '') }; });
      var w = Math.max(130, Math.max.apply(null, [tw(t.name) + 24].concat(rows.map(function (r) { return tw(r.txt) + 20; }))));
      return { t: t, rows: rows, w: w, h: 30 + Math.max(1, rows.length) * LH + 8 };
    });
    var by = {}, out = '', fk = [];
    boxes.forEach(function (b, i) { b.id = 't' + i; by[b.t.name] = b; });
    boxes.forEach(function (b) { (b.t.spalten || []).forEach(function (s) { if (s.istFK && by[s.refTabelle] && by[s.refTabelle] !== b) fk.push({ from: by[s.refTabelle].id, to: b.id }); }); });
    var size = boxLayered(boxes, fk);
    boxes.forEach(function (b) {
      (b.t.spalten || []).forEach(function (s) {
        var R = s.istFK && by[s.refTabelle]; if (!R || R === b) return;
        var p = clipRect(b, R.x + R.w / 2, R.y + R.h / 2), q = clipRect(R, b.x + b.w / 2, b.y + b.h / 2);
        out += line(p, q, { end: 'dg-open' });
        out += label(p.x + (q.x - p.x) * 0.15, p.y + (q.y - p.y) * 0.15 - 8, s.kardSelf || 'n', { weight: 700 }) + label(q.x + (p.x - q.x) * 0.15, q.y + (p.y - q.y) * 0.15 - 8, s.kardRef || '1', { weight: 700 });
      });
    });
    boxes.forEach(function (b) {
      out += '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.6" rx="3"/>' +
        '<rect x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="27" fill="#d7efe4" stroke="' + INK + '" stroke-width="1.6" rx="3"/>' + text(b.x + b.w / 2, b.y + 18, b.t.name || '???', { anchor: 'middle', weight: 700, size: 13 });
      b.rows.forEach(function (r, i) { out += text(b.x + 10, b.y + 44 + i * LH, r.txt, { under: !!r.s.istPK, italic: !!r.s.istFK && !r.s.istPK, fill: r.s.istFK && !r.s.istPK ? ACCENT : INK }); });
    });
    return svg(size.w, size.h, out);
  }

  // ---------- Gerichtete Graphen in Ebenen (Aktivität, Zustand, EPK) ----------
  // nodes: [{id, w, h, lane}], edges: [{from, to}] -> setzt n.x/n.y, liefert Größe und Rückkanten
  function layered(nodes, edges, lanes, gapY) {
    gapY = gapY || 46;
    var byId = {}, out = {}, inc = {}; nodes.forEach(function (n) { byId[n.id] = n; out[n.id] = []; inc[n.id] = 0; });
    edges.forEach(function (e) { if (byId[e.from] && byId[e.to]) { out[e.from].push(e.to); inc[e.to]++; } });
    // Rückkanten per Tiefensuche erkennen (Zyklen), dann längster Pfad als Ebene
    var state = {}, back = {};
    function dfs(u) { state[u] = 1; out[u].forEach(function (v) { if (state[v] === 1) back[u + '>' + v] = true; else if (!state[v]) dfs(v); }); state[u] = 2; }
    var roots = nodes.filter(function (n) { return n.root; }).concat(nodes.filter(function (n) { return !inc[n.id]; })).concat(nodes);
    roots.forEach(function (n) { if (!state[n.id]) dfs(n.id); });
    var level = {}; nodes.forEach(function (n) { level[n.id] = 0; });
    for (var it = 0; it < nodes.length; it++) {
      var changed = false;
      edges.forEach(function (e) { if (!byId[e.from] || !byId[e.to] || back[e.from + '>' + e.to]) return; if (level[e.to] < level[e.from] + 1) { level[e.to] = level[e.from] + 1; changed = true; } });
      if (!changed) break;
    }
    var rows = {}; nodes.forEach(function (n) { (rows[level[n.id]] = rows[level[n.id]] || []).push(n); });
    var maxL = Math.max.apply(null, nodes.map(function (n) { return level[n.id]; }).concat([0]));
    var laneW = 0; nodes.forEach(function (n) { laneW = Math.max(laneW, n.w + 40); });
    if (lanes) Object.keys(rows).forEach(function (l) {   // Bahn so breit, dass alle Knoten einer Ebene nebeneinander passen
      var sum = {}; rows[l].forEach(function (n) { var li = Math.max(0, lanes.indexOf(n.lane)); sum[li] = (sum[li] || 0) + n.w + 24; });
      Object.keys(sum).forEach(function (li) { laneW = Math.max(laneW, sum[li] + 24); });
    });
    var y = 30 + (lanes ? 26 : 0), width = 0, rowsH = [];
    for (var l = 0; l <= maxL; l++) {
      var r = rows[l] || [], h = Math.max.apply(null, r.map(function (n) { return n.h; }).concat([20]));
      if (lanes) {
        var perLane = {}; r.forEach(function (n) { var li = Math.max(0, lanes.indexOf(n.lane)); (perLane[li] = perLane[li] || []).push(n); });
        Object.keys(perLane).forEach(function (li) { var ns = perLane[li], sub = laneW / ns.length; ns.forEach(function (n, k) { n.x = 20 + li * laneW + sub * k + (sub - n.w) / 2; n.y = y + (h - n.h) / 2; }); });
        width = 20 + lanes.length * laneW + 20;
      } else {
        var tot = r.reduce(function (a, n) { return a + n.w; }, 0) + (r.length - 1) * 50, x = 20;
        r.forEach(function (n) { n.x = x; n.y = y + (h - n.h) / 2; x += n.w + 50; }); width = Math.max(width, tot + 40);
      }
      rowsH.push(h); y += h + gapY;
    }
    if (!lanes) nodes.forEach(function (n) { var rowW = (rows[level[n.id]] || []).reduce(function (a, k) { return a + k.w; }, 0) + ((rows[level[n.id]] || []).length - 1) * 50; n.x += (width - 40 - rowW) / 2; });
    return { w: width + 60, h: y, back: back, laneW: laneW };
  }
  function edgePath(a, b, isBack, w) {
    var ca = { x: a.x + a.w / 2, y: a.y + a.h / 2 }, cb = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
    if (isBack) {   // Rückkante rechts außen herum
      var right = Math.max(a.x + a.w, b.x + b.w) + 30 + (Math.abs(ca.y - cb.y) / 40);
      var p = { x: a.x + a.w, y: ca.y }, q = { x: b.x + b.w, y: cb.y };
      return { d: 'M' + p.x + ',' + p.y + ' C' + right + ',' + p.y + ' ' + right + ',' + q.y + ' ' + q.x + ',' + q.y, mid: { x: right - 8, y: (p.y + q.y) / 2 } };
    }
    var p2 = clipRect(a, cb.x, cb.y), q2 = clipRect(b, ca.x, ca.y);
    return { d: 'M' + p2.x.toFixed(1) + ',' + p2.y.toFixed(1) + ' L' + q2.x.toFixed(1) + ',' + q2.y.toFixed(1), mid: { x: (p2.x + q2.x) / 2, y: (p2.y + q2.y) / 2 } };
  }
  function drawGraph(nodes, edges, lanes, nodeSvg, opts) {
    if (!nodes.length) return emptyHint();
    var lay = layered(nodes, edges, lanes), by = {}, out = '';
    nodes.forEach(function (n) { by[n.id] = n; });
    if (lanes) lanes.forEach(function (l, i) {
      var x = 20 + i * lay.laneW;
      out += '<rect x="' + x + '" y="10" width="' + lay.laneW + '" height="' + (lay.h - 10) + '" fill="' + (i % 2 ? '#f7f9f6' : '#fff') + '" stroke="' + MUTED + '" stroke-width="1"/>' + text(x + lay.laneW / 2, 28, l, { anchor: 'middle', weight: 700 });
    });
    edges.forEach(function (e) {
      var a = by[e.from], b = by[e.to]; if (!a || !b) return;
      var p = edgePath(a, b, lay.back[e.from + '>' + e.to]);
      out += '<path d="' + p.d + '" fill="none" stroke="' + INK + '" stroke-width="1.4"' + (opts && opts.noArrow ? '' : ' marker-end="url(#dg-arr)"') + (e.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
      if (e.label) out += label(p.mid.x, p.mid.y, e.label);
    });
    nodes.forEach(function (n) { out += nodeSvg(n); });
    return svg(lay.w, lay.h, out);
  }

  function drawAktivitaet(m) {
    var lanes = m.swimlanes && m.swimlanes.length ? m.swimlanes : null;
    var nodes = (m.knoten || []).map(function (k) {
      var t = k.typ, w = 30, h = 30;
      if (t === 'aktion') { var ls = wrap(k.bezeichnung || '???', 22); w = Math.max(110, Math.max.apply(null, ls.map(tw)) + 24); h = 18 + ls.length * 14; }
      else if (t === 'entscheidung' || t === 'zusammenfuehrung') { w = 34; h = 34; }
      else if (t === 'teilung' || t === 'parallelisierung' || t === 'synchronisation') { w = 110; h = 8; }
      return { id: k.id, k: k, w: w, h: h, lane: k.swimlane, root: t === 'start' };
    });
    var edges = (m.kanten || []).map(function (e) { return { from: e.von, to: e.nach, label: e.bedingung ? '[' + e.bedingung + ']' : '' }; });
    return drawGraph(nodes, edges, lanes, function (n) {
      var k = n.k, cx = n.x + n.w / 2, cy = n.y + n.h / 2;
      if (k.typ === 'start') return '<circle cx="' + cx + '" cy="' + cy + '" r="12" fill="' + INK + '"/>';
      if (k.typ === 'ende') return '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#fff" stroke="' + INK + '" stroke-width="2"/><circle cx="' + cx + '" cy="' + cy + '" r="8" fill="' + INK + '"/>';
      if (k.typ === 'entscheidung' || k.typ === 'zusammenfuehrung') return '<path d="M' + cx + ',' + n.y + ' L' + (n.x + n.w) + ',' + cy + ' L' + cx + ',' + (n.y + n.h) + ' L' + n.x + ',' + cy + ' z" fill="#fff6dc" stroke="' + INK + '" stroke-width="1.6"/>';
      if (n.h === 8) return '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="8" rx="2" fill="' + INK + '"/>';
      return '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="14" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.6"/>' + wrapText(cx, cy, k.bezeichnung || '???', 22);
    });
  }

  function drawZustand(m) {
    var nodes = (m.zustaende || []).map(function (z) {
      var w = 30, h = 30;
      if (z.typ === 'zustand') { var inner = (z.interne || []).map(function (i) { return i.art + ' / ' + i.text; }); w = Math.max(120, tw(z.bezeichnung) + 30, Math.max.apply(null, inner.map(tw).concat([0])) + 20); h = 34 + inner.length * 15; }
      return { id: z.id, z: z, w: w, h: h, root: z.typ === 'start' };
    });
    var edges = (m.uebergaenge || []).map(function (u) {
      var l = (u.ereignis || '') + (u.bedingung ? ' [' + u.bedingung + ']' : '') + (u.aktion ? ' / ' + u.aktion : '');
      return { from: u.von, to: u.nach, label: l.trim() };
    });
    return drawGraph(nodes, edges, null, function (n) {
      var z = n.z, cx = n.x + n.w / 2, cy = n.y + n.h / 2;
      if (z.typ === 'start') return '<circle cx="' + cx + '" cy="' + cy + '" r="12" fill="' + INK + '"/>';
      if (z.typ === 'ende') return '<circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#fff" stroke="' + INK + '" stroke-width="2"/><circle cx="' + cx + '" cy="' + cy + '" r="8" fill="' + INK + '"/>';
      var s = '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="12" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.6"/>' + text(cx, n.y + 21, z.bezeichnung || '???', { anchor: 'middle', weight: 700 });
      (z.interne || []).forEach(function (i, k) { if (!k) s += line({ x: n.x, y: n.y + 29 }, { x: n.x + n.w, y: n.y + 29 }); s += text(n.x + 8, n.y + 44 + k * 15, i.art + ' / ' + i.text, { size: 11 }); });
      return s;
    });
  }

  function drawEPK(m) {
    var nodes = (m.knoten || []).map(function (k) {
      var w = 34, h = 34;
      if (k.typ !== 'konnektor') { var ls = wrap(k.bezeichnung || '???', 20); w = Math.max(120, Math.max.apply(null, ls.map(tw)) + 28); h = 22 + ls.length * 14; }
      return { id: k.id, k: k, w: w, h: h };
    });
    var edges = (m.kanten || []).map(function (e) {
      var a = e[0], b = e[1], ka = (m.knoten || []).filter(function (k) { return k.id === a; })[0], kb = (m.knoten || []).filter(function (k) { return k.id === b; })[0];
      return { from: a, to: b, dash: (ka && ka.typ === 'objekt') || (kb && kb.typ === 'objekt') };
    });
    return drawGraph(nodes, edges, null, function (n) {
      var k = n.k, cx = n.x + n.w / 2, cy = n.y + n.h / 2;
      if (k.typ === 'konnektor') { var sym = { AND: '∧', OR: '∨', XOR: 'XOR' }[k.bezeichnung] || k.bezeichnung; return '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="#fff" stroke="' + INK + '" stroke-width="1.6"/>' + text(cx, cy + 5, sym, { anchor: 'middle', weight: 700, size: sym.length > 1 ? 10 : 15 }); }
      if (k.typ === 'ereignis') { var d = 12; return '<path d="M' + (n.x + d) + ',' + n.y + ' L' + (n.x + n.w - d) + ',' + n.y + ' L' + (n.x + n.w) + ',' + cy + ' L' + (n.x + n.w - d) + ',' + (n.y + n.h) + ' L' + (n.x + d) + ',' + (n.y + n.h) + ' L' + n.x + ',' + cy + ' z" fill="#f6d6ea" stroke="' + INK + '" stroke-width="1.5"/>' + wrapText(cx, cy, k.bezeichnung, 20); }
      if (k.typ === 'funktion') return '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="10" fill="#d6f0cf" stroke="' + INK + '" stroke-width="1.5"/>' + wrapText(cx, cy, k.bezeichnung, 20);
      return '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" fill="#e3ecf7" stroke="' + INK + '" stroke-width="1.5"/>' + wrapText(cx, cy, k.bezeichnung, 20);
    }, { noArrow: false });
  }

  // ---------- Anwendungsfalldiagramm ----------
  function drawAnwendungsfall(m) {
    var ak = m.akteure || [], uc = m.anwendungsfaelle || []; if (!ak.length && !uc.length) return emptyHint();
    var pos = {}, out = '', ucW = Math.max(180, Math.max.apply(null, uc.map(function (u) { return tw(u.bezeichnung) + 40; }).concat([0])));
    var left = ak.filter(function (a, i) { return i % 2 === 0 || ak.length < 3; }), right = ak.filter(function (a) { return left.indexOf(a) < 0; });
    var sysX = 170, sysW = ucW + 120, cols = uc.length > 6 ? 2 : 1, perCol = Math.ceil(uc.length / cols), sysH = Math.max(160, perCol * 64 + 50);
    sysW = cols * (ucW + 40) + 60;
    var H = sysH + 60, W = sysX + sysW + (right.length ? 170 : 40);
    out += '<rect x="' + sysX + '" y="20" width="' + sysW + '" height="' + sysH + '" fill="#fbfdfb" stroke="' + INK + '" stroke-width="1.4"/>' + text(sysX + 10, 38, 'System', { weight: 700, fill: MUTED });
    uc.forEach(function (u, i) { var c = Math.floor(i / perCol), r = i % perCol; pos[u.id] = { x: sysX + 30 + c * (ucW + 40), y: 56 + r * 64, w: ucW, h: 44, uc: true }; });
    function place(list, x) { list.forEach(function (a, i) { pos[a.id] = { x: x, y: 40 + i * ((sysH - 40) / Math.max(1, list.length)) + 10, w: 90, h: 80 }; }); }
    place(left, 40); place(right, sysX + sysW + 40);
    (m.beziehungen || []).forEach(function (b) {
      var A = pos[b.akteur || b.quelle], B = pos[b.anwendungsfall || b.ziel]; if (!A || !B) return;
      var p = clipRect(A, B.x + B.w / 2, B.y + B.h / 2), q = clipRect(B, A.x + A.w / 2, A.y + A.h / 2);
      if (b.typ === 'assoziation') out += line(p, q);
      else if (b.typ === 'generalisierung_akteur') out += line(p, q, { end: 'dg-tri' });
      else { out += line(p, q, { dash: true, end: 'dg-open' }) + label((p.x + q.x) / 2, (p.y + q.y) / 2, '«' + b.typ + '»' + (b.bedingung ? ' [' + b.bedingung + ']' : ''), { italic: true }); }
    });
    uc.forEach(function (u) { var p = pos[u.id]; out += '<ellipse cx="' + (p.x + p.w / 2) + '" cy="' + (p.y + p.h / 2) + '" rx="' + p.w / 2 + '" ry="' + p.h / 2 + '" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.6"/>' + wrapText(p.x + p.w / 2, p.y + p.h / 2, u.bezeichnung || '???', 26); });
    ak.forEach(function (a) {
      var p = pos[a.id], cx = p.x + p.w / 2, y = p.y;
      if (a.art === 'system') out += '<rect x="' + (cx - 34) + '" y="' + (y + 8) + '" width="68" height="40" fill="#e3ecf7" stroke="' + INK + '" stroke-width="1.5"/>' + text(cx, y + 32, '«system»', { anchor: 'middle', size: 10 });
      else out += '<circle cx="' + cx + '" cy="' + (y + 10) + '" r="8" fill="#fff" stroke="' + INK + '" stroke-width="1.6"/><path d="M' + cx + ',' + (y + 18) + ' v22 M' + (cx - 16) + ',' + (y + 26) + ' h32 M' + cx + ',' + (y + 40) + ' l-12,18 M' + cx + ',' + (y + 40) + ' l12,18" stroke="' + INK + '" stroke-width="1.6" fill="none"/>';
      out += wrapText(cx, y + 70, a.bezeichnung || '???', 16, { size: 11 });
    });
    return svg(W, H, out);
  }

  // ---------- Sequenzdiagramm ----------
  function drawSequenz(m) {
    var ll = m.lifelines || []; if (!ll.length) return emptyHint();
    var colW = Math.max(150, Math.max.apply(null, ll.map(function (l) { return tw(l.bezeichnung) + 40; }))), x = {}, out = '';
    ll.forEach(function (l, i) { x[l.id] = 40 + i * colW + colW / 2; });
    var msgs = m.nachrichten || [], H = 90 + msgs.length * 38 + 30, W = 40 + ll.length * colW + 40;
    ll.forEach(function (l) {
      var cx = x[l.id];
      out += line({ x: cx, y: 60 }, { x: cx, y: H - 10 }, { dash: true });
      if (l.art === 'akteur') out += '<circle cx="' + cx + '" cy="14" r="7" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/><path d="M' + cx + ',21 v14 M' + (cx - 12) + ',26 h24 M' + cx + ',35 l-9,12 M' + cx + ',35 l9,12" stroke="' + INK + '" stroke-width="1.5" fill="none"/>' + text(cx, 60, l.bezeichnung, { anchor: 'middle', size: 11, weight: 700 });
      else { var w = tw(l.bezeichnung) + 24; out += '<rect x="' + (cx - w / 2) + '" y="18" width="' + w + '" height="32" fill="' + FILL + '" stroke="' + INK + '" stroke-width="1.6"/>' + text(cx, 39, l.bezeichnung, { anchor: 'middle', under: true }); }
    });
    msgs.forEach(function (n, i) {
      var y = 90 + i * 38, a = x[n.von], b = x[n.an]; if (a === undefined || b === undefined) return;
      var o = n.art === 'antwort' ? { dash: true, end: 'dg-open' } : n.art === 'asynchron' ? { end: 'dg-open' } : { end: 'dg-arr' };
      if (a === b) out += '<path d="M' + a + ',' + (y - 8) + ' h34 v18 h-30" fill="none" stroke="' + INK + '" stroke-width="1.4"' + (o.dash ? ' stroke-dasharray="6 4"' : '') + ' marker-end="url(#' + o.end + ')"/>' + text(a + 40, y + 2, n.bezeichnung, { size: 11 });
      else out += line({ x: a, y: y }, { x: b + (b > a ? -2 : 2), y: y }, o) + text((a + b) / 2, y - 6, n.bezeichnung, { anchor: 'middle', size: 11 });
      out += text(16, y + 4, String(i + 1), { size: 10, fill: MUTED });
    });
    return svg(W, H, out);
  }

  var DRAW = { uml_klasse: drawKlassen, er_chen: drawER, relationenmodell: drawRelationen, uml_aktivitaet: drawAktivitaet, uml_zustand: drawZustand, epk: drawEPK, uml_anwendungsfall: drawAnwendungsfall, uml_sequenz: drawSequenz };
  window.DiagrammDraw = {
    svg: function (modus, m) { try { return (DRAW[modus] || function () { return emptyHint('Diese Diagrammart wird noch nicht gezeichnet.'); })(m || {}); } catch (e) { return emptyHint('Zeichnen fehlgeschlagen: ' + e.message); } },
    sig: sig, attrStr: attrStr
  };
})();

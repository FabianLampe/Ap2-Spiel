// Referenzbuch: Handbuch zum Nachschlagen (Befehle mit Suche) plus aufgabenspezifische Tabs (z. B. Datenbank).
// Wird neben Aufgaben und als eigenes Handbuch-Fenster gezeigt. Lesen ist immer kostenlos.
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function norm(s) { return String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss'); }

  // ---------- Datenzugriff ----------
  var index = null;
  function build() {
    index = { chapters: (window.GAME_DATA && GAME_DATA.handbuch) || [], byId: {} };
    index.chapters.forEach(function (c) { c.entries.forEach(function (e) { e._chapter = c; index.byId[e.id] = e; }); });
  }
  function data() { if (!index) build(); return index; }

  // Suche: Treffer nach Titel und Stichwörtern zuerst, dann nach Kurzbeschreibung und Text
  function search(q, bereich) {
    q = norm(q).trim(); var all = [];
    data().chapters.forEach(function (c) { if (!bereich || c.bereich === bereich) c.entries.forEach(function (e) { all.push(e); }); });
    if (!q) return all;
    var words = q.split(/\s+/), scored = [];
    all.forEach(function (e) {
      var title = norm(e.title), kws = e.keywords.map(norm), kurz = norm(e.kurz), body = norm((e.erklaerung || []).join(' ') + ' ' + (e.syntax || ''));
      var score = 0, ok = true;
      words.forEach(function (w) {
        var s = 0;
        if (title === w) s = 100; else if (title.indexOf(w) === 0) s = 60; else if (title.indexOf(w) >= 0) s = 40;
        else if (kws.some(function (k) { return k === w; })) s = 50; else if (kws.some(function (k) { return k.indexOf(w) >= 0; })) s = 30;
        else if (kurz.indexOf(w) >= 0) s = 15; else if (body.indexOf(w) >= 0) s = 5;
        if (!s) ok = false; score += s;
      });
      if (ok) scored.push({ e: e, s: score });
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    return scored.map(function (x) { return x.e; });
  }

  // ---------- Darstellung ----------
  var ui = { tab: 'befehle', query: '', entry: null, openDb: {} };   // bleibt beim Neuzeichnen erhalten

  function codeBlock(code, insert) {
    var pre = el('pre', { class: 'code' }, [code]);
    if (!insert) return pre;
    return el('div', { class: 'codewrap' }, [pre, el('button', { class: 'btn small ghost', title: 'In den Editor einfügen', onclick: function () { insert(code); } }, ['In den Editor'])]);
  }

  function entryView(e, opts, rerender) {
    var box = el('div', { class: 'entry' });
    box.appendChild(el('button', { class: 'btn small ghost', onclick: function () { ui.entry = null; rerender(); } }, ['← Alle Befehle']));
    box.appendChild(el('h2', { style: 'margin:10px 0 4px' }, [e.title]));
    box.appendChild(el('p', { class: 'sub', style: 'margin:0 0 10px' }, [e._chapter.bereich + ' · ' + e._chapter.title]));
    box.appendChild(el('p', { style: 'font-weight:700' }, [e.kurz]));
    if (e.syntax) { box.appendChild(el('h3', {}, ['Schreibweise'])); box.appendChild(codeBlock(e.syntax, null)); }
    (e.erklaerung || []).forEach(function (p) { box.appendChild(el('p', {}, [p])); });
    if (e.beispiel && e.beispiel.length) {
      box.appendChild(el('h3', {}, ['Beispiel']));
      e.beispiel.forEach(function (b) { box.appendChild(codeBlock(b.code, opts.insert)); if (b.hinweis) box.appendChild(el('p', { class: 'sub', style: 'margin:2px 0 10px' }, [b.hinweis])); });
    }
    if (e.stolperfallen && e.stolperfallen.length) {
      box.appendChild(el('h3', {}, ['Stolperfallen']));
      box.appendChild(el('ul', { class: 'facts' }, e.stolperfallen.map(function (s) { return el('li', {}, [s]); })));
    }
    if (e.siehe && e.siehe.length) {
      var row = el('div', { class: 'row', style: 'margin-top:8px' }, [el('span', { class: 'sub', style: 'margin:0' }, ['Siehe auch:'])]);
      e.siehe.forEach(function (id) { var t = data().byId[id]; if (t) row.appendChild(el('button', { class: 'btn small ghost', onclick: function () { ui.entry = id; rerender(); } }, [t.title])); });
      box.appendChild(row);
    }
    return box;
  }

  function befehleTab(opts, rerender) {
    var wrap = el('div');
    var cur = ui.entry && data().byId[ui.entry];
    if (cur) { wrap.appendChild(entryView(cur, opts, rerender)); return wrap; }
    var input = el('input', { type: 'search', class: 'book-search', placeholder: 'Befehl suchen (z. B. join, group by, like) …', 'aria-label': 'Handbuch durchsuchen' });
    input.value = ui.query;
    var list = el('div', { class: 'entry-list' });
    function fill() {
      list.textContent = '';
      var q = ui.query.trim();
      if (q) {
        var hits = search(q);
        if (!hits.length) list.appendChild(el('p', { class: 'sub' }, ['Nichts gefunden. Versuche einen anderen Begriff.']));
        hits.forEach(function (e) { list.appendChild(item(e)); });
      } else {
        data().chapters.forEach(function (c) {
          list.appendChild(el('h3', { style: 'margin:12px 0 4px' }, [c.bereich + ': ' + c.title]));
          c.entries.forEach(function (e) { list.appendChild(item(e)); });
        });
      }
    }
    function item(e) {
      return el('button', { class: 'entry-item', onclick: function () { ui.entry = e.id; rerender(); } }, [el('b', {}, [e.title]), el('span', { class: 'sub' }, [' ' + e.kurz])]);
    }
    input.addEventListener('input', function () { ui.query = input.value; fill(); });
    wrap.appendChild(input); wrap.appendChild(list); fill();
    if (data().chapters.length === 0) wrap.appendChild(el('p', { class: 'sub' }, ['Das Handbuch ist noch leer.']));
    return wrap;
  }

  // opts: { task, plugin, insert(code), only: 'befehle' }
  function render(opts) {
    opts = opts || {};
    var root = el('div', { class: 'book' });
    var tabs = [];
    if (opts.plugin && opts.plugin.referenceTabs && opts.task) opts.plugin.referenceTabs(opts.task, ui).forEach(function (t) { tabs.push(t); });
    tabs.push({ id: 'befehle', label: 'Befehle', render: function (o, rr) { return befehleTab(o, rr); } });
    if (opts.extraTabs) opts.extraTabs.forEach(function (t) { if (opts.extraFirst) tabs.unshift(t); else tabs.push(t); });
    if (opts.only) tabs = tabs.filter(function (t) { return t.id === opts.only; });
    // Beim ersten Öffnen für eine neue Aufgabe mit dem aufgabenspezifischen Tab (z. B. Datenbank) beginnen
    var taskKey = opts.task ? opts.task.id : '';
    if (ui.taskKey !== taskKey) { var keep = ui.entry; ui.taskKey = taskKey; ui.tab = tabs[0].id; ui.entry = taskKey ? null : keep; }
    if (!tabs.some(function (t) { return t.id === ui.tab; })) ui.tab = tabs[0].id;

    function draw() {
      root.textContent = '';
      var bar = el('div', { class: 'book-tabs' });
      if (tabs.length > 1) tabs.forEach(function (t) { bar.appendChild(el('button', { class: 'btn small' + (ui.tab === t.id ? ' active' : ' ghost'), onclick: function () { ui.tab = t.id; draw(); } }, [t.label])); });
      if (tabs.length > 1) root.appendChild(bar);
      var cur = tabs.filter(function (t) { return t.id === ui.tab; })[0];
      root.appendChild(cur.render(opts, draw));
    }
    draw();
    return root;
  }

  window.Reference = { render: render, search: search, data: data, state: ui, _reset: function () { index = null; } };
})();

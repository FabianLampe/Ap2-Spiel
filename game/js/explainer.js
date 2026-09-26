// Erklärfilme: Kalle erklärt ein Thema Schritt für Schritt, Tabellen und Zeilen bewegen sich sichtbar.
// Filme sind Daten (game/data/erklaer/*.js), Ergebnisse werden mit der echten SQL-Engine berechnet.
//
// Film:  Erklaer.film({ id, title, bereich, db, steps: [step, …] })
//   id = Skill-ID (z. B. 'sql.join'), db = Name eines Datensatzes aus Erklaer.dataset(name, { ddl, keys })
// Schritt (jeder Schritt beschreibt den kompletten Bildinhalt, dadurch geht Vor- und Zurückspringen immer):
//   say      Text, den Kalle spricht (Untertitel + Vorlesestimme)
//   chapter  Kapitelname (erscheint oben und als Marke in der Zeitleiste; gilt bis zum nächsten chapter)
//   code     SQL-Text; mark: ['JOIN', 'ON'] hebt Wörter hervor
//   show     Tabellen: 'kunden' oder { t: 'kunden', cols: [...], label, sql: 'SELECT … (eigene Ansicht)' }
//   rows     function (r, tabelle) -> Klasse je Zeile: 'hit' | 'miss' | 'g1' … 'g6' | 'new' | 'del' | 'sel'
//   cells    function (r, spalte, tabelle) -> Klasse je Zelle ('hit', 'miss', 'g1' …)
//   run      SQL, dessen Ergebnis als Tabelle erscheint; rlabel, rrows(r, i), rcells(r, col, i), rkey(r, i) -> Quellzeile ('kunden:3')
//   pipe     aktuelle Klausel in der Ausführungsreihenfolge ('FROM', 'WHERE', …)
//   note / warn  Hinweis- bzw. Stolperfallen-Kasten;  html  eigene Grafik (HTML-String)
(function () {
  var FILMS = {}, DATA = {}, ORDER = [];
  var PIPE = ['FROM', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'];

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') n.className = attrs[k]; else if (k === 'html') n.innerHTML = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { if (c !== null && c !== undefined) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // ---------- Daten: SQL ausführen ----------
  function exec(SQL, ddl, sql) {
    var r = SqlEngine.run(SQL, { ddl: ddl }, sql);
    if (!r.ok) throw new Error(sql + ' → ' + r.error);
    if (!r.result) return { cols: [], rows: [] };
    return { cols: r.result.columns, rows: r.result.values.map(function (v) { var o = {}; r.result.columns.forEach(function (c, i) { o[c] = v[i]; }); o._v = v; return o; }) };
  }
  // Alle Tabellen und Ergebnisse eines Films vorab berechnen
  function prepare(film, SQL) {
    if (film._ready) return;
    var ds = DATA[film.db] || { ddl: '', keys: {} };
    film._cache = {};
    film.steps.forEach(function (s, i) {
      var ddl = ds.ddl + (s.setup || film.setup || '');
      (s.show || []).forEach(function (t) {
        var spec = typeof t === 'string' ? { t: t } : t, q = spec.sql || ('SELECT * FROM ' + spec.t), k = (spec.pre || '') + '|' + q + '|' + ddl;
        if (!film._cache[k]) film._cache[k] = exec(SQL, ddl + (spec.pre || ''), q);
      });
      if (s.run) { s._res = exec(SQL, ddl, s.run); }
    });
    film._ready = true;
  }
  function tableData(film, step, spec) {
    var ds = DATA[film.db] || { ddl: '' }, ddl = ds.ddl + (step.setup || film.setup || ''), q = spec.sql || ('SELECT * FROM ' + spec.t);
    return film._cache[(spec.pre || '') + '|' + q + '|' + ddl];
  }
  function keyCol(film, t) { var ds = DATA[film.db]; return (ds && ds.keys && ds.keys[t]) || null; }

  // ---------- Darstellung ----------
  function fmt(v) { if (v === null || v === undefined) return 'NULL'; if (typeof v === 'number' && !Number.isInteger(v)) return (Math.round(v * 100) / 100).toLocaleString('de-DE'); return String(v); }
  function tableEl(label, cols, rows, keyOf, rowCls, cellCls, extraCls, fromOf) {
    var widths = cols.map(function (c) { var w = String(c).length; rows.forEach(function (r) { w = Math.max(w, fmt(r[c]).length); }); return Math.min(Math.max(w, 3), 28); });
    var head = el('div', { class: 'xt-row xt-head' }, cols.map(function (c, i) { return el('span', { class: 'xt-c', style: 'width:' + (widths[i] + 2) + 'ch' }, [c]); }));
    var body = rows.map(function (r, i) {
      var k = keyOf(r, i), a = { class: 'xt-row ' + (rowCls ? rowCls(r, i) || '' : ''), 'data-k': k };
      if (fromOf) { var f = fromOf(r, i); if (f) a['data-from'] = f; }
      return el('div', a, cols.map(function (c, j) {
        var v = r[c], cc = cellCls ? cellCls(r, c, i) || '' : '';
        return el('span', { class: 'xt-c ' + cc + (v === null || v === undefined ? ' null' : ''), style: 'width:' + (widths[j] + 2) + 'ch' }, [fmt(v)]);
      }));
    });
    return el('div', { class: 'xt ' + (extraCls || '') }, [el('div', { class: 'xt-label' }, [label])].concat([head]).concat(body.length ? body : [el('div', { class: 'xt-row xt-empty' }, [el('span', { class: 'xt-c' }, ['(keine Zeilen)'])])]));
  }
  function codeEl(code, marks) {
    var h = esc(code);
    if (marks && marks.length) {   // alle Markierungen in einem Durchgang, längste zuerst (sonst zerschneidet RANK() das DENSE_RANK())
      var alt = marks.slice().sort(function (a, b) { return b.length - a.length; }).map(function (m) { return esc(m).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
      h = h.replace(new RegExp('(' + alt.join('|') + ')', 'g'), '<mark>$1</mark>');
    }
    return el('pre', { class: 'xp-code', html: h });
  }
  function pipeEl(cur) {
    var idx = PIPE.indexOf(cur);
    return el('div', { class: 'xp-pipe', 'aria-label': 'Ausführungsreihenfolge' }, PIPE.map(function (p, i) {
      return el('span', { class: 'xp-pipe-s' + (i === idx ? ' on' : i < idx ? ' done' : '') }, [(i + 1) + ' ' + p]);
    }));
  }

  function renderStage(film, i, stage) {
    var s = film.steps[i];
    stage.innerHTML = '';
    if (s.pipe) stage.appendChild(pipeEl(s.pipe));
    var top = el('div', { class: 'xp-top' });
    if (s.code) top.appendChild(codeEl(s.code, s.mark));
    if (s.note) top.appendChild(el('div', { class: 'xp-note' }, [s.note]));
    if (s.warn) top.appendChild(el('div', { class: 'xp-note warn' }, [el('b', {}, ['Stolperfalle: ']), s.warn]));
    if (top.children.length) stage.appendChild(top);
    if (s.html) stage.appendChild(el('div', { class: 'xp-html', html: s.html }));
    var tabs = el('div', { class: 'xp-tables' });
    (s.show || []).forEach(function (t) {
      var spec = typeof t === 'string' ? { t: t } : t, d = tableData(film, s, spec); if (!d) return;
      var cols = spec.cols || d.cols, kc = keyCol(film, spec.t);
      var keyOf = function (r, j) { return spec.t + ':' + (kc && r[kc] !== undefined ? r[kc] : j); };
      tabs.appendChild(tableEl(spec.label || spec.t, cols, d.rows, keyOf,
        s.rows ? function (r) { return s.rows(r, spec.t); } : null,
        s.cells ? function (r, c) { return s.cells(r, c, spec.t); } : null, spec.cls));
    });
    if (s._res) {
      if (tabs.children.length) tabs.appendChild(el('div', { class: 'xp-arrow', 'aria-hidden': 'true' }, ['➜']));
      var res = s._res;
      tabs.appendChild(tableEl(s.rlabel || 'Ergebnis', s.rcols || res.cols, res.rows,
        function (r, j) { return 'res:' + (s.rkey ? s.rkey(r, j) : j); },
        s.rrows ? function (r, j) { return s.rrows(r, j); } : null,
        s.rcells ? function (r, c, j) { return s.rcells(r, c, j); } : null, 'res',
        s.rkey ? function (r, j) { return s.rkey(r, j); } : null));
    }
    if (tabs.children.length) stage.appendChild(tabs);
  }

  // Bühne verkleinern, bis alles ohne Scrollen sichtbar ist (Schrift und Abstände hängen an --xs)
  function fit(stage) {
    function ok(x) { stage.style.setProperty('--xs', String(x)); return stage.scrollHeight <= stage.clientHeight + 2 && stage.scrollWidth <= stage.clientWidth + 2; }
    if (ok(1)) return;
    // Auf schmalen Bildschirmen nicht unleserlich klein werden: lieber wischen (die Bühne scrollt)
    var lo = stage.clientWidth < 600 ? 0.72 : 0.5, hi = 1;
    if (!ok(lo)) return;                        // passt auch klein nicht: bei der Mindestgröße bleiben
    for (var n = 0; n < 6; n++) { var mid = (lo + hi) / 2; if (ok(mid)) lo = mid; else hi = mid; }
    ok(lo);
  }

  // FLIP: Zeilen gleiten von ihrer alten Position (oder ihrer Quellzeile) an die neue
  function snapshot(stage) {
    var m = {}; [].forEach.call(stage.querySelectorAll('[data-k]'), function (n) { m[n.getAttribute('data-k')] = n.getBoundingClientRect(); }); return m;
  }
  function animate(stage, before, reduce) {
    if (reduce) return;
    [].forEach.call(stage.querySelectorAll('[data-k]'), function (n) {
      var old = before[n.getAttribute('data-k')] || before[n.getAttribute('data-from')];
      if (!old) { n.classList.add('xt-enter'); return; }
      var now = n.getBoundingClientRect(), dx = old.left - now.left, dy = old.top - now.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      n.style.transition = 'none'; n.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; n.classList.add('xt-moving');
      n.getBoundingClientRect();
      n.style.transition = ''; n.style.transform = '';
      setTimeout(function () { n.classList.remove('xt-moving'); }, 900);
    });
  }

  // ---------- Vorlesestimme ----------
  var voice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return null;
    var vs = speechSynthesis.getVoices().filter(function (v) { return /^de/i.test(v.lang); });
    var male = vs.filter(function (v) { return /male|mann|stefan|markus|hans|conrad|killian|yannick|google deutsch/i.test(v.name) && !/female/i.test(v.name); });
    return male[0] || vs[0] || null;
  }
  if (window.speechSynthesis) { voice = pickVoice(); speechSynthesis.onvoiceschanged = function () { voice = pickVoice(); }; }
  // Aussprachehilfen für die Stimme (Untertitel bleiben unverändert)
  function spoken(t) {
    return t.replace(/\bSQL\b/g, 'S Q L').replace(/\bNULL\b/g, 'Null').replace(/\bCTEs?\b/g, function (m) { return m === 'CTE' ? 'C T E' : 'C T Es'; })
      .replace(/\bDDL\b/g, 'D D L').replace(/\bDCL\b/g, 'D C L').replace(/\bDML\b/g, 'D M L').replace(/\bPK\b/g, 'Primärschlüssel').replace(/\bFK\b/g, 'Fremdschlüssel')
      .replace(/\*/g, ' Stern ').replace(/<>/g, ' ungleich ').replace(/>=/g, ' größer gleich ').replace(/<=/g, ' kleiner gleich ').replace(/ > /g, ' größer als ').replace(/ < /g, ' kleiner als ')
      .replace(/_/g, ' ');
  }

  // ---------- Player ----------
  var P = null;
  function settings() { try { return JSON.parse(localStorage.getItem('rr-erklaer') || '{}'); } catch (e) { return {}; } }
  function saveSettings(o) { try { localStorage.setItem('rr-erklaer', JSON.stringify(o)); } catch (e) {} }
  function seen(id) { try { var s = JSON.parse(localStorage.getItem('rr-erklaer-seen') || '{}'); s[id] = true; localStorage.setItem('rr-erklaer-seen', JSON.stringify(s)); } catch (e) {} }

  function play(id, opts) {
    var film = FILMS[id]; if (!film) return false;
    close();
    opts = opts || {};
    var st = settings(), reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    P = { film: film, i: 0, playing: true, timer: null, speed: st.speed || 1, voice: st.voice !== false && !!window.speechSynthesis, token: 0 };
    var kalle = window.Characters ? Characters.make('kalle', { size: 96 }) : el('div');
    var stage = el('div', { class: 'xp-stage', 'aria-live': 'off' });
    var caption = el('p', { class: 'xp-caption', 'aria-live': 'polite' });
    var chap = el('span', { class: 'xp-chap' });
    var count = el('span', { class: 'xp-count' });
    var bar = el('div', { class: 'xp-bar', role: 'slider', tabindex: '0', 'aria-label': 'Zeitleiste', 'aria-valuemin': '1', 'aria-valuemax': String(film.steps.length) });
    var fill = el('div', { class: 'xp-fill' }); bar.appendChild(fill);
    // Kapitelmarken
    film.steps.forEach(function (s, i) { if (s.chapter && i > 0) bar.appendChild(el('span', { class: 'xp-tick', style: 'left:' + (i / film.steps.length * 100) + '%', title: s.chapter })); });
    bar.addEventListener('click', function (e) { var r = bar.getBoundingClientRect(); go(Math.floor((e.clientX - r.left) / r.width * film.steps.length)); });
    function btn(label, aria, fn, cls) { return el('button', { class: 'xp-btn ' + (cls || ''), type: 'button', 'aria-label': aria, title: aria, onclick: fn }, [label]); }
    var bPlay = btn('❚❚', 'Pause', function () { toggle(); }, 'main');
    var bVoice = btn(P.voice ? '🔊' : '🔇', 'Vorlesestimme an/aus', function () {
      P.voice = !P.voice; bVoice.textContent = P.voice ? '🔊' : '🔇'; var s2 = settings(); s2.voice = P.voice; saveSettings(s2);
      if (!P.voice && window.speechSynthesis) speechSynthesis.cancel(); if (P.playing) speak();
    });
    if (!window.speechSynthesis) { bVoice.disabled = true; bVoice.title = 'Dein Browser hat keine Vorlesestimme'; }
    var bSpeed = btn(P.speed + '×', 'Tempo', function () {
      var sp = [1, 1.25, 1.5, 0.85], n = sp[(sp.indexOf(P.speed) + 1) % sp.length]; P.speed = n; bSpeed.textContent = String(n).replace('.', ',') + '×';
      var s2 = settings(); s2.speed = n; saveSettings(s2); if (P.playing) speak();
    });
    bSpeed.textContent = String(P.speed).replace('.', ',') + '×';
    var controls = el('div', { class: 'xp-controls' }, [
      btn('⏮', 'Zum Anfang', function () { go(0); }),
      btn('◀', 'Zurück', function () { go(P.i - 1); }),
      bPlay,
      btn('▶', 'Weiter', function () { go(P.i + 1); }),
      bar, count, bSpeed, bVoice
    ]);
    var root = el('div', { class: 'modal-back xp-back', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Erklärfilm: ' + film.title }, [
      el('div', { class: 'xp-box' }, [
        el('div', { class: 'xp-head' }, [
          el('div', {}, [el('div', { class: 'xp-kicker' }, ['Erklärfilm · ' + (film.bereich || 'SQL')]), el('h2', { class: 'xp-title' }, [film.title])]),
          chap,
          btn('✕', 'Schließen', function () { close(); }, 'close')
        ]),
        stage,
        el('div', { class: 'xp-foot' }, [el('div', { class: 'xp-kalle' }, [kalle]), el('div', { class: 'xp-bubble' }, [caption])]),
        controls
      ])
    ]);
    P.root = root; P.stage = stage; P.caption = caption; P.kalle = kalle; P.fill = fill; P.count = count; P.chap = chap; P.bPlay = bPlay; P.bar = bar; P.reduce = reduce; P.onClose = opts.onClose;
    P.key = function (e) {
      if (e.key === 'Escape') { close(); e.preventDefault(); e.stopPropagation(); }
      else if (e.key === ' ' && e.target.tagName !== 'BUTTON') { toggle(); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { go(P.i + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { go(P.i - 1); e.preventDefault(); }
    };
    document.addEventListener('keydown', P.key, true);
    P.resize = function () { if (P && P.film._ready) fit(P.stage); }; window.addEventListener('resize', P.resize);
    document.body.appendChild(root);
    if (window.World && World.ok) World.setPaused(true);
    stage.appendChild(el('p', { class: 'sub' }, ['Film wird vorbereitet …']));
    SqlEngine.init().then(function (SQL) {
      if (!P || P.film !== film) return;
      try { prepare(film, SQL); } catch (e) { stage.innerHTML = ''; stage.appendChild(el('p', { class: 'sub' }, ['Fehler im Film: ' + e.message])); return; }
      show(0, true); speak();
    });
    seen(id);
    return true;
  }

  function show(i, first) {
    var film = P.film; i = Math.max(0, Math.min(film.steps.length - 1, i)); P.i = i;
    var before = first ? {} : snapshot(P.stage);
    renderStage(film, i, P.stage);
    fit(P.stage);
    animate(P.stage, before, P.reduce);
    var s = film.steps[i];
    P.caption.textContent = s.say || '';
    var ch = ''; for (var k = i; k >= 0; k--) if (film.steps[k].chapter) { ch = film.steps[k].chapter; break; }
    P.chap.textContent = ch;
    P.fill.style.width = ((i + 1) / film.steps.length * 100) + '%';
    P.count.textContent = (i + 1) + '/' + film.steps.length;
    P.bar.setAttribute('aria-valuenow', String(i + 1));
  }
  function talk(on) { if (P && P.kalle.classList) P.kalle.classList.toggle('is-talking', !!on); }
  function stopAudio() { if (!P) return; P.token++; clearTimeout(P.timer); if (window.speechSynthesis) speechSynthesis.cancel(); talk(false); }
  // Aktuellen Schritt sprechen; danach (wenn Wiedergabe läuft) zum nächsten
  function speak() {
    stopAudio(); if (!P) return;
    var s = P.film.steps[P.i], text = s.say || '', tok = P.token;
    var est = Math.max(3500, text.length * 68) / P.speed;         // Lesezeit ohne Stimme
    var t0 = Date.now();
    // Mindestens so lange stehen lassen, dass man den Untertitel lesen kann (auch wenn die Stimme sofort abbricht)
    function done() {
      if (!P || tok !== P.token) return; talk(false);
      var rest = Math.max(0, est * 0.75 - (Date.now() - t0));
      if (P.playing) P.timer = setTimeout(function () { if (P && tok === P.token) next(); }, rest + 900 / P.speed);
    }
    talk(true);
    if (P.voice && window.speechSynthesis && text) {
      // Satzweise vorlesen: Chrome bricht lange Äußerungen sonst nach etwa 15 Sekunden ab
      var parts = spoken(text).split(/(?<=[.!?])\s+/).filter(Boolean), ended = false;
      var finish = function () { if (ended) return; ended = true; done(); };
      parts.forEach(function (part, i) {
        var u = new SpeechSynthesisUtterance(part); u.lang = 'de-DE'; if (voice) u.voice = voice; u.rate = 1.02 * P.speed; u.pitch = 0.95;
        u.onerror = finish; if (i === parts.length - 1) u.onend = finish;
        speechSynthesis.speak(u);
      });
      P.timer = setTimeout(finish, est * 1.8 + 2000);   // Sicherheitsnetz
    } else {
      P.timer = setTimeout(function () { talk(false); done(); }, est);
    }
  }
  function next() {
    if (!P) return;
    if (P.i >= P.film.steps.length - 1) { P.playing = false; P.bPlay.textContent = '↻'; P.bPlay.setAttribute('aria-label', 'Nochmal'); talk(false); return; }
    show(P.i + 1); speak();
  }
  function go(i) { if (!P) return; if (i < 0 || i >= P.film.steps.length) return; show(i); if (P.playing) speak(); else { stopAudio(); } }
  function toggle() {
    if (!P) return;
    if (!P.playing && P.i >= P.film.steps.length - 1 && P.bPlay.textContent === '↻') { P.playing = true; setPlayBtn(); show(0); speak(); return; }
    P.playing = !P.playing; setPlayBtn();
    if (P.playing) speak(); else stopAudio();
  }
  function setPlayBtn() { P.bPlay.textContent = P.playing ? '❚❚' : '▶'; P.bPlay.setAttribute('aria-label', P.playing ? 'Pause' : 'Abspielen'); P.bPlay.title = P.bPlay.getAttribute('aria-label'); }
  function close() {
    if (!P) return;
    var cb = P.onClose;
    stopAudio(); document.removeEventListener('keydown', P.key, true); window.removeEventListener('resize', P.resize); P.root.remove(); P = null;
    if (window.World && World.ok && !document.body.classList.contains('win-open') && !(window.Menu && Menu.isOpen())) World.setPaused(false);
    if (cb) cb();
  }

  // ---------- Schnittstelle ----------
  window.Erklaer = {
    dataset: function (name, d) { DATA[name] = d; },
    film: function (f) { FILMS[f.id] = f; if (ORDER.indexOf(f.id) < 0) ORDER.push(f.id); },
    has: function (id) { return !!FILMS[id]; },
    get: function (id) { return FILMS[id]; },
    list: function () { return ORDER.map(function (id) { return FILMS[id]; }); },
    play: play, close: close,
    isOpen: function () { return !!P; },
    // Knopf "▶ Erklärfilm" für andere Fenster
    button: function (id, cls) {
      if (!FILMS[id]) return null;
      return el('button', { class: 'btn small xp-open ' + (cls || ''), type: 'button', onclick: function (e) { e.stopPropagation(); play(id); } }, ['▶ Erklärfilm']);
    },
    // Für Tests: alle Filme vorbereiten und Fehler sammeln
    _check: function () {
      return SqlEngine.init().then(function (SQL) {
        return ORDER.map(function (id) { var f = FILMS[id]; f._ready = false; try { prepare(f, SQL); return { id: id, ok: true, steps: f.steps.length, chars: f.steps.reduce(function (a, s) { return a + (s.say || '').length; }, 0) }; } catch (e) { return { id: id, ok: false, error: e.message }; } });
      });
    }
  };
})();

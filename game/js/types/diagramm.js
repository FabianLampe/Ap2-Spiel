// Aufgabentyp "diagramm": Diagramm-Werkbank für UML (Klasse, Aktivität, Zustand, Sequenz, Anwendungsfall), ER-Modell,
// Relationenmodell und EPK. Aufgaben: data/diagramme.js (aus den Kompass-Prüfungsaufgaben, tools/build-diagramme.py).
// Der Spieler baut das Diagramm über Formulare; Beschriftungen kommen aus Bausteinen (Musterlösung + Ablenker),
// weil die Prüfung „sinngleiche Bezeichnungen“ zulässt und Freitext sich nicht sicher vergleichen lässt.
// Bewertet wird die Struktur gegen payload.loesung (gleiches Format wie das Antwortmodell).
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c !== null && c !== undefined && c !== '') n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function norm(s) { return String(s === null || s === undefined ? '' : s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9*.<>\[\]]/g, ''); }
  function uniq(a) { var s = {}, o = []; a.forEach(function (x) { if (x && !s[x]) { s[x] = 1; o.push(x); } }); return o; }
  function seeded(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 2147483647; return function () { h = (h * 16807) % 2147483647; return h / 2147483647; }; }
  var sig = function (m) { return DiagrammDraw.sig(m); }, attrStr = function (a) { return DiagrammDraw.attrStr(a); };

  var ART = {
    uml_klasse: { name: 'UML-Klassendiagramm', skill: 'uml.klasse' }, uml_aktivitaet: { name: 'UML-Aktivitätsdiagramm', skill: 'uml.aktivitaet' },
    uml_zustand: { name: 'UML-Zustandsdiagramm', skill: 'uml.zustand' }, uml_sequenz: { name: 'UML-Sequenzdiagramm', skill: 'uml.sequenz' },
    uml_anwendungsfall: { name: 'UML-Anwendungsfalldiagramm', skill: 'uml.anwendungsfall' }, er_chen: { name: 'ER-Modell', skill: 'modell.er' },
    relationenmodell: { name: 'Relationenmodell', skill: 'modell.relationen' }, epk: { name: 'EPK', skill: 'modell.epk' },
    netzplan: { name: 'Netzplan', skill: 'pm.netzplan' }, netzplan_kritischer_pfad: { name: 'Kritischer Pfad', skill: 'pm.netzplan' },
    struktogramm_ausfuellen: { name: 'Struktogramm', skill: 'prog.struktogramm' }, ishikawa: { name: 'Ishikawa-Diagramm', skill: 'qm.ishikawa' },
    geraete_und_verbindungen: { name: 'Geräte verkabeln', skill: 'it.schnittstellen' }, kurve_mit_eintrag: { name: 'Diagramm-Eintrag', skill: 'stat.diagramme' },
    lineare_regression: { name: 'Lineare Regression', skill: 'stat.diagramme' }
  };
  var SKILLS = [
    { id: 'uml.anwendungsfall', name: 'UML: Anwendungsfalldiagramm', cost: 0, starter: true, group: 'Modellierung', topic: 'uml', desc: 'Akteure, Anwendungsfälle, include und extend.' },
    { id: 'uml.klasse', name: 'UML: Klassendiagramm', cost: 150, group: 'Modellierung', topic: 'uml', desc: 'Klassen, Attribute, Methoden, Vererbung, Assoziationen, Multiplizitäten.' },
    { id: 'uml.aktivitaet', name: 'UML: Aktivitätsdiagramm', cost: 150, group: 'Modellierung', topic: 'uml', desc: 'Aktionen, Verzweigungen, parallele Abläufe und Bahnen.' },
    { id: 'uml.zustand', name: 'UML: Zustandsdiagramm', cost: 120, group: 'Modellierung', topic: 'uml', desc: 'Zustände, Übergänge mit Ereignis [Bedingung] / Aktion.' },
    { id: 'uml.sequenz', name: 'UML: Sequenzdiagramm', cost: 200, requires: ['uml.klasse'], group: 'Modellierung', topic: 'uml', desc: 'Lebenslinien, Aufrufe, Antworten und ihre Reihenfolge.' },
    { id: 'modell.er', name: 'ER-Modell', cost: 0, starter: true, group: 'Modellierung', topic: 'datenbank', desc: 'Entitäten, Attribute, Beziehungen und Kardinalitäten.' },
    { id: 'modell.relationen', name: 'Relationenmodell und Normalisierung', cost: 180, group: 'Modellierung', topic: 'datenbank', desc: 'Tabellen in 3NF mit Primär- und Fremdschlüsseln.' },
    { id: 'modell.epk', name: 'EPK (Geschäftsprozesse)', cost: 120, group: 'Modellierung', topic: 'wirtschaft', desc: 'Ereignisse, Funktionen, Konnektoren und Informationsobjekte.' },
    { id: 'pm.netzplan', name: 'Netzplantechnik', cost: 140, group: 'Projektmanagement', topic: 'wirtschaft', desc: 'Vorwärts- und Rückwärtsrechnung, Puffer und kritischer Pfad.' },
    { id: 'prog.struktogramm', name: 'Struktogramme', cost: 0, starter: true, group: 'Programmierung', topic: 'programmierung', desc: 'Anweisungen, Schleifen und Verzweigungen nach Nassi-Shneiderman.' },
    { id: 'qm.ishikawa', name: 'Ishikawa-Diagramm', cost: 80, group: 'Qualitätsmanagement', topic: 'wirtschaft', desc: 'Ursachen nach dem 5M/6M-Schema einordnen.' },
    { id: 'it.schnittstellen', name: 'Hardware-Schnittstellen', cost: 80, group: 'IT-Systeme', topic: 'it', desc: 'DisplayPort, Thunderbolt, Daisy-Chain und passende Anschlüsse.' },
    { id: 'stat.diagramme', name: 'Diagramme und Regression', cost: 100, group: 'Statistik', topic: 'ml', desc: 'Werte in Diagramme eintragen, Regressionsgerade bestimmen.' }
  ];

  // ================= Bausteine (Beschriftungen) =================
  // Je Feld: Werte der Musterlösung + einige Ablenker aus anderen Aufgaben derselben Art
  var FIELDS = {
    uml_klasse: function (m) { return {
      klasse: (m.klassen || []).map(function (k) { return k.name; }),
      attribut: [].concat.apply([], (m.klassen || []).map(function (k) { return (k.attribute || []).map(attrStr); })),
      methode: [].concat.apply([], (m.klassen || []).map(function (k) { return (k.methoden || []).map(sig); })),
      rolle: (m.beziehungen || []).map(function (r) { return r.name; }) }; },
    uml_aktivitaet: function (m) { return {
      aktion: (m.knoten || []).filter(function (k) { return k.typ === 'aktion'; }).map(function (k) { return k.bezeichnung; }),
      bedingung: (m.kanten || []).map(function (k) { return k.bedingung; }) }; },
    uml_zustand: function (m) { return {
      zustand: (m.zustaende || []).filter(function (z) { return z.typ === 'zustand'; }).map(function (z) { return z.bezeichnung; }),
      ereignis: (m.uebergaenge || []).map(function (u) { return u.ereignis; }), bedingung: (m.uebergaenge || []).map(function (u) { return u.bedingung; }),
      aktion: (m.uebergaenge || []).map(function (u) { return u.aktion; }),
      intern: [].concat.apply([], (m.zustaende || []).map(function (z) { return (z.interne || []).map(function (i) { return i.text; }); })) }; },
    uml_sequenz: function (m) { return {
      lifeline: (m.lifelines || []).map(function (l) { return l.bezeichnung; }), nachricht: (m.nachrichten || []).map(function (n) { return n.bezeichnung; }) }; },
    uml_anwendungsfall: function (m) { return {
      akteur: (m.akteure || []).map(function (a) { return a.bezeichnung; }), fall: (m.anwendungsfaelle || []).map(function (u) { return u.bezeichnung; }),
      bedingung: (m.beziehungen || []).map(function (b) { return b.bedingung; }) }; },
    er_chen: function (m) { return {
      entitaet: (m.entitaeten || []).map(function (e) { return e.name; }),
      attribut: [].concat.apply([], (m.entitaeten || []).map(function (e) { return (e.attribute || []).map(function (a) { return a.name; }); })).concat([].concat.apply([], (m.beziehungen || []).map(function (b) { return (b.attribute || []).map(function (a) { return a.name; }); }))),
      beziehung: (m.beziehungen || []).map(function (b) { return b.name; }) }; },
    relationenmodell: function (m) { return {
      tabelle: (m.tabellen || []).map(function (t) { return t.name; }),
      spalte: [].concat.apply([], (m.tabellen || []).map(function (t) { return (t.spalten || []).map(function (s) { return s.name; }); })) }; },
    epk: function (m) {
      var by = function (t) { return (m.knoten || []).filter(function (k) { return k.typ === t; }).map(function (k) { return k.bezeichnung; }); };
      return { ereignis: by('ereignis'), funktion: by('funktion'), objekt: by('objekt') }; },
    // Ishikawa: alle Ursachen der Musterlösung (die vorgegebenen werden im Editor herausgefiltert)
    ishikawa: function (m) { return { ursache: [].concat.apply([], (m.aeste || []).map(function (a) { return (a.ursachen || []).map(function (u) { return u.text; }); })) }; }
  };
  var poolCache = {};
  function pools(t) {
    if (poolCache[t.id]) return poolCache[t.id];
    var modus = t.payload.modus, own = FIELDS[modus] ? FIELDS[modus](t.payload.loesung) : {}, rnd = seeded(t.id), out = {};
    if (modus === 'ishikawa') {   // nur Ursachen der offenen Zweige, Ablenker aus anderen Zweigen der Lösung und anderen Aufgaben
      var given = [].concat.apply([], ((t.payload.start || {}).aeste || []).map(function (a) { return (a.ursachen || []).map(function (u) { return u.text; }); }));
      own.ursache = own.ursache.filter(function (x) { return given.indexOf(x) < 0; });
    }
    var others = ((window.GAME_DATA && GAME_DATA.diagrammTasks) || []).filter(function (o) { return o.payload.modus === modus && o.id !== t.id && FIELDS[modus]; });
    Object.keys(own).forEach(function (f) {
      var mine = uniq(own[f]), extra = uniq([].concat.apply([], others.map(function (o) { return FIELDS[modus](o.payload.loesung)[f] || []; }))).filter(function (x) { return mine.indexOf(x) < 0; });
      var n = Math.min(extra.length, Math.max(2, Math.round(mine.length / 3)));
      for (var i = 0; i < n; i++) { var j = Math.floor(rnd() * extra.length); mine.push(extra.splice(j, 1)[0]); }
      out[f] = mine.sort(function (a, b) { return a.localeCompare(b, 'de'); });
    });
    // Relationenmodell: auch die Spaltennamen der Ausgangstabelle anbieten
    if (modus === 'relationenmodell') (t.payload.aufgabe || []).forEach(function (b) { if (b.typ === 'tabelle') out.spalte = uniq(out.spalte.concat(b.kopf || [])).sort(function (a, c) { return a.localeCompare(c, 'de'); }); });
    return (poolCache[t.id] = out);
  }

  // ================= Startmodell =================
  function emptyModel(modus, sol) {
    var m = { modus: modus };
    ({ uml_klasse: function () { m.klassen = []; m.beziehungen = []; }, uml_aktivitaet: function () { m.knoten = []; m.kanten = []; m.swimlanes = clone(sol.swimlanes || []); },
      uml_zustand: function () { m.zustaende = []; m.uebergaenge = []; }, uml_sequenz: function () { m.lifelines = []; m.nachrichten = []; },
      uml_anwendungsfall: function () { m.akteure = []; m.anwendungsfaelle = []; m.beziehungen = []; }, er_chen: function () { m.entitaeten = []; m.beziehungen = []; },
      relationenmodell: function () { m.tabellen = []; }, epk: function () { m.knoten = []; m.kanten = []; },
      netzplan: function () { m.aktivitaeten = clone(sol.aktivitaeten || []); m.knotenwerte = []; },
      netzplan_kritischer_pfad: function () { m.aktivitaeten = clone(sol.aktivitaeten || []); m.knotenwerte = clone(sol.knotenwerte || []); m.kritischer_pfad = []; },
      struktogramm_ausfuellen: function () { m.bausteine = clone(sol.bausteine || []); m.struktur = strip(clone(sol.struktur || [])); },
      ishikawa: function () { m.aeste = []; m.wirkung = sol.wirkung; },
      geraete_und_verbindungen: function () { m.knoten = clone(sol.knoten || []); m.kanten = []; },
      kurve_mit_eintrag: function () { m.achsen = clone(sol.achsen); m.kurve = clone(sol.kurve || []); m.einzutragen = ['', '']; },
      lineare_regression: function () { m.achsen = clone(sol.achsen); m.punkte = []; m.gerade = { beta0: '', beta1: '' }; } })[modus]();
    return m;
  }
  function strip(list) { (list || []).forEach(function (s) { delete s.baustein; strip(s.rumpf); }); return list; }
  function flat(list, depth, out) { out = out || []; (list || []).forEach(function (s) { out.push({ s: s, d: depth || 0 }); flat(s.rumpf, (depth || 0) + 1, out); }); return out; }
  // Daisy-Chain: geeignete Schnittstelle = Anschlussart, die das Zielgerät doppelt hat (Ein- und Ausgang)
  function chainPort(m, id) {
    var k = (m.knoten || []).filter(function (x) { return x.id === id; })[0], c = {};
    ((k && k.ports) || []).forEach(function (p) { c[p.typ] = (c[p.typ] || 0) + 1; });
    return Object.keys(c).filter(function (p) { return c[p] >= 2; })[0] || '';
  }
  function startModel(t) {
    var p = t.payload, m = p.start ? clone(p.start) : emptyModel(p.modus, p.loesung);
    if (p.modus === 'uml_aktivitaet' && (!m.swimlanes || !m.swimlanes.length)) m.swimlanes = clone(p.loesung.swimlanes || []);
    if (p.modus === 'uml_klasse') (m.klassen || []).forEach(function (k) { if (k.kopf_verdeckt) { k.name = ''; delete k.kopf_verdeckt; } });
    if (p.modus === 'struktogramm_ausfuellen') { m.bausteine = clone(p.loesung.bausteine); m.struktur = strip(m.struktur || clone(p.loesung.struktur)); }
    if (p.modus === 'ishikawa') (m.aeste || []).forEach(function (a) { a.gewaehlt = a.gewaehlt || []; });
    if (p.modus === 'geraete_und_verbindungen') (m.kanten || []).forEach(function (e) { if (!e.port) e.port = chainPort(p.loesung, e.nach); });
    if (p.modus === 'kurve_mit_eintrag') m.einzutragen = m.einzutragen || ['', ''];
    if (p.modus === 'lineare_regression') { m.gerade = m.gerade || { beta0: '', beta1: '' }; m.punkte = (m.punkte || []).map(function (q) { return q.slice(); }); m.fest = (p.start && p.start.punkte || []).length; }
    var fill = emptyModel(p.modus, p.loesung); Object.keys(fill).forEach(function (k) { if (m[k] === undefined) m[k] = fill[k]; });
    return m;
  }
  var idc = 0;
  function newId(prefix, list) { var ids = {}; (list || []).forEach(function (x) { ids[x.id] = 1; }); var i = list ? list.length + 1 : ++idc; while (ids[prefix + i]) i++; return prefix + i; }

  // ================= Graph-Vergleich (Aktivität, Zustand, EPK) =================
  // Knoten: {id, key} (beschriftet) oder {id, kind} (Steuerknoten ohne Text). Kanten: {from, to, label}.
  function matchGraph(sN, sE, pN, pE) {
    var map = {}, used = {};
    // 1) beschriftete Knoten über ihren Schlüssel
    pN.forEach(function (p) { if (!p.key) return; var s = sN.filter(function (x) { return x.key === p.key && !used[x.id]; })[0]; if (s) { map[p.id] = s.id; used[s.id] = 1; } });
    // 2) Steuerknoten: bestes Gegenstück nach gemeinsamen Nachbarn (zweimal, damit Ketten von Steuerknoten aufgehen)
    function score(p, s) {
      var n = 0;
      pE.forEach(function (e) {
        sE.forEach(function (f) {
          if (e.label !== f.label) return;
          if (e.from === p.id && f.from === s.id && (map[e.to] === f.to || e.to === p.id && f.to === s.id)) n++;
          if (e.to === p.id && f.to === s.id && (map[e.from] === f.from || e.from === p.id && f.from === s.id)) n++;
        });
      });
      return n;
    }
    for (var round = 0; round < 3; round++) {
      var cand = [];
      pN.forEach(function (p) { if (p.key || map[p.id]) return; sN.forEach(function (s) { if (s.key || used[s.id] || s.kind !== p.kind) return; cand.push({ p: p, s: s, v: score(p, s) }); }); });
      cand.sort(function (a, b) { return b.v - a.v; });
      cand.forEach(function (c) { if (map[c.p.id] || used[c.s.id]) return; if (c.v === 0 && round < 2) return; map[c.p.id] = c.s.id; used[c.s.id] = 1; });
    }
    var sKeys = sE.map(function (e) { return e.from + '>' + e.to + '|' + e.label; }), pKeys = pE.map(function (e) { return (map[e.from] || '?' + e.from) + '>' + (map[e.to] || '?' + e.to) + '|' + e.label; });
    var left = sKeys.slice(), extraE = [];
    pKeys.forEach(function (k, i) { var j = left.indexOf(k); if (j >= 0) left.splice(j, 1); else extraE.push(pE[i]); });
    var missingE = left.map(function (k) { return sE[sKeys.indexOf(k)]; });
    return { map: map, missingN: sN.filter(function (s) { return !used[s.id]; }), extraN: pN.filter(function (p) { return !map[p.id]; }), missingE: missingE, extraE: extraE };
  }
  function setDiff(sol, pl) {   // Listen von Schlüsseln -> fehlend / zu viel (Mehrfachmengen)
    var left = sol.slice(), extra = [];
    pl.forEach(function (k) { var i = left.indexOf(k); if (i >= 0) left.splice(i, 1); else extra.push(k); });
    return { missing: left, extra: extra };
  }

  // ================= Bewertung je Art =================
  // Liefert { total, wrong, hints: [] }  (wrong = fehlende + überzählige Teile)
  var GRADE = {
    uml_klasse: function (s, p) {
      var total = 0, wrong = 0, hints = [];
      var pBy = {}; (p.klassen || []).forEach(function (k) { pBy[norm(k.name)] = k; });
      (s.klassen || []).forEach(function (k) {
        var q = pBy[norm(k.name)]; total += 1 + (k.attribute || []).length + (k.methoden || []).length;
        if (!q) { wrong += 1 + (k.attribute || []).length + (k.methoden || []).length; return; }
        if ((q.art || 'klasse') !== (k.art || 'klasse')) { wrong++; hints.push('Bei „' + k.name + '“ stimmt die Art (Klasse, abstrakt, Interface) nicht.'); }
        var a = setDiff((k.attribute || []).map(function (x) { return (x.sicht || '') + norm(attrStr(x)); }), (q.attribute || []).map(function (x) { return (x.sicht || '') + norm(attrStr(x)); }));
        var mm = setDiff((k.methoden || []).map(function (x) { return (x.sicht || '') + norm(sig(x)) + (x.abstrakt ? '!' : ''); }), (q.methoden || []).map(function (x) { return (x.sicht || '') + norm(sig(x)) + (x.abstrakt ? '!' : ''); }));
        if (a.missing.length || a.extra.length) { wrong += Math.max(a.missing.length, a.extra.length); hints.push('Bei „' + k.name + '“ stimmen die Attribute (Name, Typ oder Sichtbarkeit) noch nicht.'); }
        if (mm.missing.length || mm.extra.length) { wrong += Math.max(mm.missing.length, mm.extra.length); hints.push('Bei „' + k.name + '“ stimmen die Methoden (Signatur, Sichtbarkeit oder abstrakt) noch nicht.'); }
      });
      var sNames = (s.klassen || []).map(function (k) { return norm(k.name); });
      var extraK = (p.klassen || []).filter(function (k) { return sNames.indexOf(norm(k.name)) < 0; });
      var missK = (s.klassen || []).filter(function (k) { return !pBy[norm(k.name)]; });
      if (missK.length) hints.unshift(missK.length + (missK.length === 1 ? ' Klasse fehlt' : ' Klassen fehlen') + ' noch.');
      if (extraK.length) { wrong += extraK.length; hints.push(extraK.length + ' Klasse(n) gehören nicht ins Diagramm oder sind falsch benannt.'); }
      function rk(r, flip) {
        var a = norm(flip ? r.b : r.a), b = norm(flip ? r.a : r.b), ma = norm(flip ? r.multB : r.multA), mb = norm(flip ? r.multA : r.multB);
        return r.art + '|' + a + '|' + b + (r.art === 'vererbung' || r.art === 'realisierung' ? '' : '|' + ma + '|' + mb);
      }
      var solR = (s.beziehungen || []).map(function (r) { return rk(r); }), left = solR.slice(), extraR = 0;
      (p.beziehungen || []).forEach(function (r) {
        var i = left.indexOf(rk(r)); if (i < 0 && r.art !== 'vererbung' && r.art !== 'realisierung') i = left.indexOf(rk(r, true));
        if (i >= 0) left.splice(i, 1); else extraR++;
      });
      total += solR.length; wrong += Math.max(left.length, extraR);
      if (left.length || extraR) hints.push('Bei den Beziehungen (Art, Richtung oder Multiplizität) ' + (left.length ? 'fehlen noch ' + left.length : '') + (left.length && extraR ? ', ' : '') + (extraR ? extraR + ' sind falsch' : '') + '.');
      return { total: total, wrong: wrong, hints: hints };
    },
    uml_aktivitaet: function (s, p) { return graphGrade(s, p, function (m) {
      var kinds = { teilung: 'fork', parallelisierung: 'fork', synchronisation: 'join' };
      return { n: (m.knoten || []).map(function (k) { return k.typ === 'aktion' ? { id: k.id, key: norm(k.bezeichnung) + '@' + norm(k.swimlane) } : { id: k.id, kind: kinds[k.typ] || k.typ }; }),
        e: (m.kanten || []).map(function (e) { return { from: e.von, to: e.nach, label: norm(e.bedingung) }; }) };
    }, 'Aktionen und Steuerknoten (Start, Verzweigung, Gabelung …)', 'Kontrollflüsse und Bedingungen'); },
    uml_zustand: function (s, p) { return graphGrade(s, p, function (m) {
      return { n: (m.zustaende || []).map(function (z) { return z.typ === 'zustand' ? { id: z.id, key: norm(z.bezeichnung) + '#' + (z.interne || []).map(function (i) { return i.art + norm(i.text); }).sort().join(',') } : { id: z.id, kind: z.typ }; }),
        e: (m.uebergaenge || []).map(function (u) { return { from: u.von, to: u.nach, label: norm(u.ereignis) + '[' + norm(u.bedingung) + ']/' + norm(u.aktion) }; }) };
    }, 'Zustände (mit entry/do-Aktionen) und Start/Ende', 'Übergänge mit Ereignis, Bedingung und Aktion'); },
    epk: function (s, p) { return graphGrade(s, p, function (m) {
      return { n: (m.knoten || []).map(function (k) { return k.typ === 'konnektor' ? { id: k.id, kind: 'k' + k.bezeichnung } : { id: k.id, key: k.typ + ':' + norm(k.bezeichnung) }; }),
        e: (m.kanten || []).map(function (e) { return { from: e[0], to: e[1], label: '' }; }) };
    }, 'Ereignisse, Funktionen, Objekte und Konnektoren', 'Verbindungen (Kontrollfluss und Informationsobjekte)'); },
    uml_sequenz: function (s, p) {
      var name = function (m) { var b = {}; (m.lifelines || []).forEach(function (l) { b[l.id] = norm(l.bezeichnung); }); return b; };
      var sn = name(s), pn = name(p), hints = [];
      var L = setDiff((s.lifelines || []).map(function (l) { return l.art + norm(l.bezeichnung); }), (p.lifelines || []).map(function (l) { return l.art + norm(l.bezeichnung); }));
      var sm = (s.nachrichten || []).map(function (n) { return sn[n.von] + '>' + sn[n.an] + '|' + n.art + '|' + norm(n.bezeichnung); });
      var pm = (p.nachrichten || []).map(function (n) { return pn[n.von] + '>' + pn[n.an] + '|' + n.art + '|' + norm(n.bezeichnung); });
      // längste gemeinsame Teilfolge: wie viele Nachrichten stehen in richtiger Reihenfolge?
      var dp = []; for (var i = 0; i <= sm.length; i++) { dp[i] = []; for (var j = 0; j <= pm.length; j++) dp[i][j] = i && j ? (sm[i - 1] === pm[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])) : 0; }
      var lcs = dp[sm.length][pm.length], first = -1;
      for (var k = 0; k < Math.max(sm.length, pm.length); k++) if (sm[k] !== pm[k]) { first = k; break; }
      if (L.missing.length || L.extra.length) hints.push('Die Lebenslinien (Name oder Akteur/Objekt) stimmen noch nicht.');
      if (first >= 0) hints.push('Ab Nachricht ' + (first + 1) + ' weicht die Folge ab (Absender, Empfänger, Art oder Text). ' + (pm.length < sm.length ? 'Es fehlen noch ' + (sm.length - pm.length) + ' Nachricht(en).' : ''));
      return { total: (s.lifelines || []).length + sm.length, wrong: Math.max(L.missing.length, L.extra.length) + (Math.max(sm.length, pm.length) - lcs), hints: hints };
    },
    uml_anwendungsfall: function (s, p) {
      function keys(m) {
        var nm = {}; (m.akteure || []).concat(m.anwendungsfaelle || []).forEach(function (x) { nm[x.id] = norm(x.bezeichnung); });
        return { a: (m.akteure || []).map(function (x) { return x.art + norm(x.bezeichnung); }), u: (m.anwendungsfaelle || []).map(function (x) { return norm(x.bezeichnung); }),
          r: (m.beziehungen || []).map(function (b) { return b.typ === 'assoziation' ? 'as|' + nm[b.akteur] + '|' + nm[b.anwendungsfall] : b.typ + '|' + nm[b.quelle] + '|' + nm[b.ziel] + (b.typ === 'extend' ? '|' + norm(b.bedingung) : ''); }) };
      }
      var S = keys(s), P = keys(p), A = setDiff(S.a, P.a), U = setDiff(S.u, P.u), R = setDiff(S.r, P.r), hints = [];
      if (A.missing.length || A.extra.length) hints.push('Bei den Akteuren ' + (A.missing.length ? 'fehlen ' + A.missing.length : '') + (A.missing.length && A.extra.length ? ', ' : '') + (A.extra.length ? A.extra.length + ' sind zu viel oder falsch (auch Mensch/System prüfen)' : '') + '.');
      if (U.missing.length || U.extra.length) hints.push('Bei den Anwendungsfällen ' + (U.missing.length ? 'fehlen ' + U.missing.length : '') + (U.missing.length && U.extra.length ? ', ' : '') + (U.extra.length ? U.extra.length + ' sind zu viel' : '') + '.');
      if (R.missing.length || R.extra.length) hints.push('Bei den Beziehungen (Assoziation, include, extend mit Bedingung, Generalisierung, Richtung) ' + (R.missing.length ? 'fehlen ' + R.missing.length : '') + (R.missing.length && R.extra.length ? ', ' : '') + (R.extra.length ? R.extra.length + ' sind falsch' : '') + '.');
      return { total: S.a.length + S.u.length + S.r.length, wrong: Math.max(A.missing.length, A.extra.length) + Math.max(U.missing.length, U.extra.length) + Math.max(R.missing.length, R.extra.length), hints: hints };
    },
    er_chen: function (s, p) {
      var hints = [], total = 0, wrong = 0, pBy = {};
      (p.entitaeten || []).forEach(function (e) { pBy[norm(e.name)] = e; });
      (s.entitaeten || []).forEach(function (e) {
        total += 1 + (e.attribute || []).length; var q = pBy[norm(e.name)];
        if (!q) { wrong += 1 + (e.attribute || []).length; hints.push('Ein Entitätstyp fehlt noch.'); return; }
        var d = setDiff((e.attribute || []).map(function (a) { return norm(a.name) + (a.istSchluessel ? '*' : ''); }), (q.attribute || []).map(function (a) { return norm(a.name) + (a.istSchluessel ? '*' : ''); }));
        if (d.missing.length || d.extra.length) { wrong += Math.max(d.missing.length, d.extra.length); hints.push('Bei „' + e.name + '“ stimmen die Attribute oder der Schlüssel nicht.'); }
      });
      var sn = (s.entitaeten || []).map(function (e) { return norm(e.name); }), ex = (p.entitaeten || []).filter(function (e) { return sn.indexOf(norm(e.name)) < 0; }).length;
      if (ex) { wrong += ex; hints.push(ex + ' Entitätstyp(en) sind zu viel.'); }
      function rk(b, f) { var at = (b.attribute || []).map(function (a) { return norm(a.name); }).sort().join(','); return f ? norm(b.b) + '|' + norm(b.a) + '|' + norm(b.kardB) + '|' + norm(b.kardA) + '|' + at : norm(b.a) + '|' + norm(b.b) + '|' + norm(b.kardA) + '|' + norm(b.kardB) + '|' + at; }
      var left = (s.beziehungen || []).map(function (b) { return rk(b); }), extra = 0; total += left.length;
      (p.beziehungen || []).forEach(function (b) { var i = left.indexOf(rk(b)); if (i < 0) i = left.indexOf(rk(b, true)); if (i >= 0) left.splice(i, 1); else extra++; });
      if (left.length || extra) { wrong += Math.max(left.length, extra); hints.push('Bei den Beziehungen (Partner, Kardinalität oder Beziehungsattribute) stimmt noch etwas nicht.'); }
      return { total: total, wrong: wrong, hints: hints };
    },
    relationenmodell: function (s, p) {
      var hints = [], total = 0, wrong = 0, pBy = {};
      (p.tabellen || []).forEach(function (t) { pBy[norm(t.name)] = t; });
      function ck(c) { return norm(c.name) + (c.istPK ? '|PK' : '') + (c.istFK ? '|FK>' + norm(c.refTabelle) : ''); }
      (s.tabellen || []).forEach(function (t) {
        var q = pBy[norm(t.name)]; total += 1 + (t.spalten || []).length;
        if (!q) { wrong += 1 + (t.spalten || []).length; return; }
        var d = setDiff((t.spalten || []).map(ck), (q.spalten || []).map(ck));
        if (d.missing.length || d.extra.length) { wrong += Math.max(d.missing.length, d.extra.length); hints.push('In „' + t.name + '“ stimmen ' + Math.max(d.missing.length, d.extra.length) + ' Spalte(n) noch nicht (Spalte, PK oder FK mit Ziel).'); }
      });
      var miss = (s.tabellen || []).filter(function (t) { return !pBy[norm(t.name)]; }).length, sn = (s.tabellen || []).map(function (t) { return norm(t.name); });
      var ex = (p.tabellen || []).filter(function (t) { return sn.indexOf(norm(t.name)) < 0; }).length;
      if (miss) hints.unshift(miss + (miss === 1 ? ' Tabelle fehlt' : ' Tabellen fehlen') + ' noch.');
      if (ex) { wrong += ex; hints.push(ex + ' Tabelle(n) sind zu viel (3NF: nichts doppelt zerlegen).'); }
      return { total: total, wrong: wrong, hints: hints };
    }
  };
  function num(v) { if (v === '' || v === null || v === undefined) return NaN; return parseFloat(String(v).replace(/\./g, function (m, i, all) { return /,/.test(all) ? '' : m; }).replace(',', '.')); }
  var FIELDS6 = ['faz', 'fez', 'saz', 'sez', 'gp', 'fp'];
  GRADE.netzplan = function (s, p) {
    var pk = {}, total = 0, wrong = 0, bad = []; (p.knotenwerte || []).forEach(function (k) { pk[k.id] = k; });
    (s.knotenwerte || []).forEach(function (k) {
      var q = pk[k.id] || {}, w = 0; FIELDS6.forEach(function (f) { total++; if (num(q[f]) !== k[f]) w++; });
      if (w) { wrong += w; bad.push(k.id + ' (' + w + ')'); }
    });
    return { total: total, wrong: wrong, hints: bad.length ? ['Noch falsch oder leer: Vorgang ' + bad.join(', ') + '. Tipp: erst vorwärts (FAZ, FEZ), dann rückwärts (SEZ, SAZ), dann die Puffer.'] : [] };
  };
  GRADE.netzplan_kritischer_pfad = function (s, p) {
    var d = setDiff((s.kritischer_pfad || []).slice().sort(), (p.kritischer_pfad || []).slice().sort());
    return { total: (s.kritischer_pfad || []).length, wrong: Math.max(d.missing.length, d.extra.length), hints: d.missing.length || d.extra.length ? ['Der kritische Pfad besteht aus allen Vorgängen ohne Gesamtpuffer (GP = 0) vom Start bis zum Ende.'] : [] };
  };
  GRADE.struktogramm_ausfuellen = function (s, p) {
    var pp = {}, wrong = 0, total = 0; flat(p.struktur).forEach(function (x) { pp[x.s.position] = x.s.baustein; });
    flat(s.struktur).forEach(function (x) { total++; if (pp[x.s.position] !== x.s.baustein) wrong++; });
    return { total: total, wrong: wrong, hints: wrong ? [wrong + ' Feld(er) stehen noch nicht richtig. Achte darauf, was vor der Schleife, im Rumpf und danach passieren muss.'] : [] };
  };
  GRADE.ishikawa = function (s, p, t) {
    var start = (t && t.payload.start) || { aeste: [] }, given = {}, total = 0, wrong = 0, hints = [];
    (start.aeste || []).forEach(function (a) { given[a.id] = (a.ursachen || []).map(function (u) { return norm(u.text); }); });
    var pa = {}; (p.aeste || []).forEach(function (a) { pa[a.id] = a; });
    (s.aeste || []).forEach(function (a) {
      var need = (a.ursachen || []).map(function (u) { return norm(u.text); }).filter(function (x) { return (given[a.id] || []).indexOf(x) < 0; });
      if (!need.length) return;
      var d = setDiff(need, ((pa[a.id] || {}).gewaehlt || []).filter(Boolean).map(norm));
      total += need.length; var w = Math.max(d.missing.length, d.extra.length); wrong += w;
      if (w) hints.push('Im Zweig „' + a.bezeichnung + '“ passen ' + w + ' Ursache(n) noch nicht.');
    });
    return { total: total, wrong: wrong, hints: hints };
  };
  GRADE.geraete_und_verbindungen = function (s, p) {
    var key = function (e) { return [e.von, e.nach].sort().join('-'); };
    var sk = (s.kanten || []).map(function (e) { return key(e) + '@' + chainPort(s, e.nach); });
    var pk = (p.kanten || []).filter(function (e) { return e.von && e.nach; }).map(function (e) { var tgt = (s.kanten || []).filter(function (f) { return key(f) === key(e); })[0]; return key(e) + '@' + (e.port || ''); });
    var d = setDiff(sk, pk), hints = [];
    if (d.missing.length || d.extra.length) hints.push('Die Kette ist noch nicht vollständig oder nutzt eine ungeeignete Schnittstelle. Hintereinander schalten geht nur über Anschlüsse, die am Gerät als Ein- und Ausgang vorhanden sind.');
    return { total: sk.length, wrong: Math.max(d.missing.length, d.extra.length), hints: hints };
  };
  GRADE.kurve_mit_eintrag = function (s, p) {
    var e = s.einzutragen || [], q = p.einzutragen || [], tol = (s.achsen.y_schritt || 1) * 0.15;
    var ok = num(q[0]) === e[0] && Math.abs(num(q[1]) - e[1]) <= tol;
    return { total: 1, wrong: ok ? 0 : 1, hints: ok ? [] : ['Prüfe Jahr und Wert des Eintrags (Einheit beachten: Euro, nicht Tausend).'] };
  };
  GRADE.lineare_regression = function (s, p) {
    var key = function (q) { return (Math.round(num(q[0]) * 100) / 100) + '|' + (Math.round(num(q[1]) * 100) / 100); };
    var d = setDiff((s.punkte || []).map(key), (p.punkte || []).filter(function (q) { return q[0] !== '' && q[1] !== ''; }).map(key)), hints = [], wrong = Math.max(d.missing.length, d.extra.length);
    var g = p.gerade || {}, b0 = Math.abs(num(g.beta0) - s.gerade.beta0) < 0.01, b1 = Math.abs(num(g.beta1) - s.gerade.beta1) < 0.01;
    if (wrong) hints.push('Bei den Messpunkten fehlen ' + d.missing.length + ' oder sind falsch eingetragen.');
    if (!b0 || !b1) hints.push('Die Gerade: β₀ ist der Achsenabschnitt (Wert bei x = 0), β₁ die Steigung.');
    return { total: (s.punkte || []).length + 2, wrong: wrong + (b0 ? 0 : 1) + (b1 ? 0 : 1), hints: hints };
  };
  function graphGrade(s, p, conv, nodeWord, edgeWord) {
    var S = conv(s), P = conv(p), r = matchGraph(S.n, S.e, P.n, P.e), hints = [];
    if (r.missingN.length || r.extraN.length) hints.push(nodeWord + ': ' + (r.missingN.length ? r.missingN.length + ' fehlen' : '') + (r.missingN.length && r.extraN.length ? ', ' : '') + (r.extraN.length ? r.extraN.length + ' passen nicht (Text, Bahn oder Art prüfen)' : '') + '.');
    if (r.missingE.length || r.extraE.length) hints.push(edgeWord + ': ' + (r.missingE.length ? r.missingE.length + ' fehlen' : '') + (r.missingE.length && r.extraE.length ? ', ' : '') + (r.extraE.length ? r.extraE.length + ' sind falsch' : '') + '.');
    return { total: S.n.length + S.e.length, wrong: Math.max(r.missingN.length, r.extraN.length) + Math.max(r.missingE.length, r.extraE.length), hints: hints };
  }

  // ================= Editor =================
  function sel(options, value, onchange, ph, cls) {
    var s = el('select', { class: 'dg-sel ' + (cls || ''), 'aria-label': ph || 'Auswahl' });
    if (ph !== false) s.appendChild(el('option', { value: '' }, ['– ' + (ph || 'wählen') + ' –']));
    var vals = options.map(function (o) { return typeof o === 'string' ? { v: o, t: o } : o; });
    if (value && !vals.some(function (o) { return o.v === value; })) vals.unshift({ v: value, t: value });
    vals.forEach(function (o) { var op = el('option', { value: o.v }, [o.t]); if (o.v === value) op.selected = true; s.appendChild(op); });
    s.addEventListener('change', function () { onchange(s.value); });
    return s;
  }
  function chk(label, value, onchange) {
    var i = el('input', { type: 'checkbox' }); i.checked = !!value; i.addEventListener('change', function () { onchange(i.checked); });
    return el('label', { class: 'dg-chk' }, [i, ' ' + label]);
  }
  function delBtn(fn, what) { return el('button', { class: 'dg-del', type: 'button', title: (what || 'Eintrag') + ' entfernen', 'aria-label': (what || 'Eintrag') + ' entfernen', onclick: fn }, ['✕']); }
  function addBtn(label, fn) { return el('button', { class: 'btn small ghost dg-add', type: 'button', onclick: fn }, ['＋ ' + label]); }
  function section(title, hint, kids) { return el('div', { class: 'dg-sec' }, [el('h4', {}, [title]), hint ? el('p', { class: 'sub dg-hint' }, [hint]) : null].concat(kids)); }
  function row(kids) { return el('div', { class: 'dg-row' }, kids); }
  function rm(list, i) { list.splice(i, 1); }

  var MULT = ['1', '0..1', '*', '0..*', '1..*', 'n'];
  var EDIT = {
    uml_klasse: function (m, P, ch) {
      var names = function () { return m.klassen.map(function (k) { return k.name; }).filter(Boolean); };
      var ks = m.klassen.map(function (k, i) {
        var at = (k.attribute || []).map(function (a, j) { return row([sel(['+', '-', '#', '~'], a.sicht || '', function (v) { a.sicht = v; ch(); }, 'Sicht', 'xs'), sel(P.attribut, attrStr(a) === '?' ? '' : attrStr(a), function (v) { var p = v.split(' : '); a.name = p[0]; a.typ = p[1]; if (!p[1]) delete a.typ; ch(); }, 'Attribut'), delBtn(function () { rm(k.attribute, j); ch(true); }, 'Attribut')]); });
        var me = (k.methoden || []).map(function (x, j) { return row([sel(['+', '-', '#', '~'], x.sicht || '', function (v) { x.sicht = v; ch(); }, 'Sicht', 'xs'), sel(P.methode, x.name ? sig(x) : '', function (v) { var parsed = parseSig(v); Object.keys(parsed).forEach(function (kk) { x[kk] = parsed[kk]; }); if (!parsed.rueckgabe) delete x.rueckgabe; ch(); }, 'Methode'), chk('abstrakt', x.abstrakt, function (v) { if (v) x.abstrakt = true; else delete x.abstrakt; ch(); }), delBtn(function () { rm(k.methoden, j); ch(true); }, 'Methode')]); });
        return el('div', { class: 'dg-card' }, [
          row([sel(P.klasse, k.name, function (v) { var old = k.name; k.name = v; m.beziehungen.forEach(function (r) { if (r.a === old) r.a = v; if (r.b === old) r.b = v; }); ch(true); }, 'Klassenname'),
            sel([{ v: 'klasse', t: 'Klasse' }, { v: 'abstrakt', t: 'abstrakte Klasse' }, { v: 'interface', t: 'Interface' }], k.art || 'klasse', function (v) { k.art = v; ch(); }, false), delBtn(function () { rm(m.klassen, i); ch(true); }, 'Klasse')]),
          el('div', { class: 'dg-sub' }, [el('b', {}, ['Attribute'])].concat(at).concat([addBtn('Attribut', function () { (k.attribute = k.attribute || []).push({ sicht: '-', name: '' }); ch(true); })])),
          el('div', { class: 'dg-sub' }, [el('b', {}, ['Methoden'])].concat(me).concat([addBtn('Methode', function () { (k.methoden = k.methoden || []).push({ sicht: '+', name: '', parameter: [] }); ch(true); })]))
        ]);
      });
      var rs = m.beziehungen.map(function (r, i) {
        var assoc = r.art !== 'vererbung' && r.art !== 'realisierung';
        return row([sel(names(), r.a, function (v) { r.a = v; ch(); }, assoc ? 'Klasse A' : 'Unterklasse'),
          sel([{ v: 'assoziation', t: '— Assoziation' }, { v: 'aggregation', t: '◇ Aggregation' }, { v: 'komposition', t: '◆ Komposition' }, { v: 'vererbung', t: '▷ erbt von' }, { v: 'realisierung', t: '▷ implementiert (gestrichelt)' }], r.art, function (v) { r.art = v; ch(true); }, false),
          sel(names(), r.b, function (v) { r.b = v; ch(); }, assoc ? 'Klasse B' : 'Oberklasse / Interface'),
          assoc ? sel(MULT, r.multA, function (v) { r.multA = v; ch(); }, 'Mult. A', 'xs') : null, assoc ? sel(MULT, r.multB, function (v) { r.multB = v; ch(); }, 'Mult. B', 'xs') : null,
          assoc ? sel(P.rolle, r.name, function (v) { r.name = v; ch(); }, 'Name (optional)') : null, delBtn(function () { rm(m.beziehungen, i); ch(true); }, 'Beziehung')]);
      });
      return [section('Klassen', 'Name aus den Bausteinen wählen, dann Attribute und Methoden mit Sichtbarkeit (+ public, - private, # protected, ~ package).', ks.concat([addBtn('Klasse', function () { m.klassen.push({ art: 'klasse', name: '', attribute: [], methoden: [] }); ch(true); })])),
        section('Beziehungen', 'Bei Vererbung zeigt der Pfeil von der Unterklasse zur Oberklasse.', rs.concat([addBtn('Beziehung', function () { m.beziehungen.push({ a: '', art: 'assoziation', b: '' }); ch(true); })]))];
    },
    uml_aktivitaet: function (m, P, ch) {
      var TY = [{ v: 'start', t: '● Start' }, { v: 'aktion', t: '▭ Aktion' }, { v: 'entscheidung', t: '◇ Verzweigung' }, { v: 'zusammenfuehrung', t: '◇ Zusammenführung' }, { v: 'teilung', t: '▬ Gabelung (parallel)' }, { v: 'synchronisation', t: '▬ Synchronisation' }, { v: 'ende', t: '◉ Ende' }];
      var nodeOpts = function () { var c = {}; return m.knoten.map(function (k) { c[k.typ] = (c[k.typ] || 0) + 1; return { v: k.id, t: k.typ === 'aktion' ? (k.bezeichnung || '(Aktion ohne Text)') : (TY.filter(function (x) { return x.v === k.typ || (k.typ === 'parallelisierung' && x.v === 'teilung'); })[0] || { t: k.typ }).t + ' ' + c[k.typ] }; }); };
      var ns = m.knoten.map(function (k, i) {
        return row([sel(TY, k.typ === 'parallelisierung' ? 'teilung' : k.typ, function (v) { k.typ = v; if (v !== 'aktion') k.bezeichnung = ''; ch(true); }, false, 'sm'),
          k.typ === 'aktion' ? sel(P.aktion, k.bezeichnung, function (v) { k.bezeichnung = v; ch(true); }, 'Aktion') : el('span', { class: 'dg-fill' }),
          m.swimlanes && m.swimlanes.length && k.typ === 'aktion' ? sel(m.swimlanes, k.swimlane, function (v) { k.swimlane = v; ch(); }, 'Bahn', 'sm') : null,
          delBtn(function () { m.kanten = m.kanten.filter(function (e) { return e.von !== k.id && e.nach !== k.id; }); rm(m.knoten, i); ch(true); }, 'Knoten')]);
      });
      var es = m.kanten.map(function (e, i) { return row([sel(nodeOpts(), e.von, function (v) { e.von = v; ch(); }, 'von'), el('span', {}, ['→']), sel(nodeOpts(), e.nach, function (v) { e.nach = v; ch(); }, 'nach'), sel(P.bedingung, e.bedingung || '', function (v) { e.bedingung = v || null; ch(); }, '[Bedingung]'), delBtn(function () { rm(m.kanten, i); ch(true); }, 'Kante')]); });
      return [section('Knoten', 'Lege Aktionen und Steuerknoten an. Aktionen bekommen eine Bahn (Swimlane).', ns.concat([row([addBtn('Aktion', function () { m.knoten.push({ id: newId('A', m.knoten), typ: 'aktion', bezeichnung: '', swimlane: (m.swimlanes || [])[0] || null }); ch(true); }), addBtn('Steuerknoten', function () { m.knoten.push({ id: newId('K', m.knoten), typ: 'entscheidung', bezeichnung: '', swimlane: null }); ch(true); })])])),
        section('Kontrollflüsse', 'Bedingungen nur an den Ausgängen einer Verzweigung.', es.concat([addBtn('Kontrollfluss', function () { m.kanten.push({ von: '', nach: '', bedingung: null }); ch(true); })]))];
    },
    uml_zustand: function (m, P, ch) {
      var TY = [{ v: 'start', t: '● Start' }, { v: 'zustand', t: '▭ Zustand' }, { v: 'ende', t: '◉ Ende' }];
      var opts = function () { return m.zustaende.map(function (z) { return { v: z.id, t: z.typ === 'zustand' ? (z.bezeichnung || '(Zustand ohne Name)') : z.typ === 'start' ? '● Start' : '◉ Ende' }; }); };
      var zs = m.zustaende.map(function (z, i) {
        var inner = (z.interne || []).map(function (x, j) { return row([sel(['entry', 'do', 'exit'], x.art, function (v) { x.art = v; ch(); }, false, 'xs'), el('span', {}, ['/']), sel(P.intern, x.text, function (v) { x.text = v; ch(); }, 'Aktion'), delBtn(function () { rm(z.interne, j); ch(true); }, 'interne Aktion')]); });
        return el('div', { class: 'dg-card' }, [row([sel(TY, z.typ, function (v) { z.typ = v; if (v !== 'zustand') { z.bezeichnung = ''; delete z.interne; } ch(true); }, false, 'sm'),
          z.typ === 'zustand' ? sel(P.zustand, z.bezeichnung, function (v) { z.bezeichnung = v; ch(true); }, 'Zustand') : el('span', { class: 'dg-fill' }),
          delBtn(function () { m.uebergaenge = m.uebergaenge.filter(function (u) { return u.von !== z.id && u.nach !== z.id; }); rm(m.zustaende, i); ch(true); }, 'Zustand')])]
          .concat(z.typ === 'zustand' ? inner.concat([P.intern.length ? addBtn('entry/do/exit', function () { (z.interne = z.interne || []).push({ art: 'entry', text: '' }); ch(true); }) : null]) : []));
      });
      var us = m.uebergaenge.map(function (u, i) { return row([sel(opts(), u.von, function (v) { u.von = v; ch(); }, 'von'), el('span', {}, ['→']), sel(opts(), u.nach, function (v) { u.nach = v; ch(); }, 'nach'),
        sel(P.ereignis, u.ereignis || '', function (v) { u.ereignis = v || null; ch(); }, 'Ereignis'), sel(P.bedingung, u.bedingung || '', function (v) { u.bedingung = v || null; ch(); }, '[Bedingung]'),
        P.aktion.length ? sel(P.aktion, u.aktion || '', function (v) { u.aktion = v || null; ch(); }, '/ Aktion') : null, delBtn(function () { rm(m.uebergaenge, i); ch(true); }, 'Übergang')]); });
      return [section('Zustände', 'Start- und Endknoten nicht vergessen.', zs.concat([row([addBtn('Zustand', function () { m.zustaende.push({ id: newId('Z', m.zustaende), typ: 'zustand', bezeichnung: '' }); ch(true); }), addBtn('Start/Ende', function () { m.zustaende.push({ id: newId('S', m.zustaende), typ: 'start', bezeichnung: '' }); ch(true); })])])),
        section('Übergänge', 'Beschriftung: Ereignis [Bedingung] / Aktion – nur was der Text verlangt.', us.concat([addBtn('Übergang', function () { m.uebergaenge.push({ von: '', nach: '', ereignis: null, bedingung: null, aktion: null }); ch(true); })]))];
    },
    uml_sequenz: function (m, P, ch) {
      var opts = function () { return m.lifelines.map(function (l) { return { v: l.id, t: l.bezeichnung || '(ohne Name)' }; }); };
      var ls = m.lifelines.map(function (l, i) { return row([sel([{ v: 'objekt', t: '▭ Objekt' }, { v: 'akteur', t: '웃 Akteur' }], l.art, function (v) { l.art = v; ch(); }, false, 'sm'), sel(P.lifeline, l.bezeichnung, function (v) { l.bezeichnung = v; ch(true); }, 'Lebenslinie'),
        i > 0 ? el('button', { class: 'dg-del', type: 'button', title: 'nach links', onclick: function () { var t = m.lifelines[i - 1]; m.lifelines[i - 1] = l; m.lifelines[i] = t; ch(true); } }, ['◀']) : null,
        delBtn(function () { m.nachrichten = m.nachrichten.filter(function (n) { return n.von !== l.id && n.an !== l.id; }); rm(m.lifelines, i); ch(true); }, 'Lebenslinie')]); });
      var ns = m.nachrichten.map(function (n, i) { return row([el('span', { class: 'dg-num' }, [String(i + 1)]), sel(opts(), n.von, function (v) { n.von = v; ch(); }, 'von'), el('span', {}, ['→']), sel(opts(), n.an, function (v) { n.an = v; ch(); }, 'an'),
        sel([{ v: 'aufruf', t: '⟶ synchroner Aufruf' }, { v: 'asynchron', t: '⇢ asynchron' }, { v: 'antwort', t: '⇠ Antwort' }], n.art, function (v) { n.art = v; ch(); }, false, 'sm'),
        sel(P.nachricht.filter(function (x) { return x !== ''; }), n.bezeichnung, function (v) { n.bezeichnung = v; ch(); }, n.art === 'antwort' ? 'Rückgabe (optional)' : 'Nachricht'),
        i > 0 ? el('button', { class: 'dg-del', type: 'button', title: 'nach oben', onclick: function () { var t = m.nachrichten[i - 1]; m.nachrichten[i - 1] = n; m.nachrichten[i] = t; ch(true); } }, ['▲']) : null,
        delBtn(function () { rm(m.nachrichten, i); ch(true); }, 'Nachricht')]); });
      return [section('Lebenslinien', 'Reihenfolge von links nach rechts.', ls.concat([addBtn('Lebenslinie', function () { m.lifelines.push({ id: newId('L', m.lifelines), art: 'objekt', bezeichnung: '' }); ch(true); })])),
        section('Nachrichten (von oben nach unten)', 'Jeder synchrone Aufruf bekommt später eine Antwort zurück.', ns.concat([addBtn('Nachricht', function () { m.nachrichten.push({ von: '', an: '', art: 'aufruf', bezeichnung: '' }); ch(true); })]))];
    },
    uml_anwendungsfall: function (m, P, ch) {
      var ak = function () { return m.akteure.map(function (a) { return { v: a.id, t: a.bezeichnung || '(Akteur)' }; }); }, uc = function () { return m.anwendungsfaelle.map(function (u) { return { v: u.id, t: u.bezeichnung || '(Anwendungsfall)' }; }); };
      var as = m.akteure.map(function (a, i) { return row([sel([{ v: 'mensch', t: '웃 Person' }, { v: 'system', t: '▭ System' }], a.art, function (v) { a.art = v; ch(); }, false, 'sm'), sel(P.akteur, a.bezeichnung, function (v) { a.bezeichnung = v; ch(true); }, 'Akteur'), delBtn(function () { m.beziehungen = m.beziehungen.filter(function (b) { return [b.akteur, b.quelle, b.ziel].indexOf(a.id) < 0; }); rm(m.akteure, i); ch(true); }, 'Akteur')]); });
      var us = m.anwendungsfaelle.map(function (u, i) { return row([sel(P.fall, u.bezeichnung, function (v) { u.bezeichnung = v; ch(true); }, 'Anwendungsfall'), delBtn(function () { m.beziehungen = m.beziehungen.filter(function (b) { return [b.anwendungsfall, b.quelle, b.ziel].indexOf(u.id) < 0; }); rm(m.anwendungsfaelle, i); ch(true); }, 'Anwendungsfall')]); });
      var bs = m.beziehungen.map(function (b, i) {
        var typSel = sel([{ v: 'assoziation', t: 'Akteur — Anwendungsfall' }, { v: 'include', t: '«include»' }, { v: 'extend', t: '«extend»' }, { v: 'generalisierung_akteur', t: 'Akteur ▷ erbt von Akteur' }], b.typ, function (v) { m.beziehungen[i] = { typ: v }; ch(true); }, false, 'sm');
        if (b.typ === 'assoziation') return row([typSel, sel(ak(), b.akteur, function (v) { b.akteur = v; ch(); }, 'Akteur'), sel(uc(), b.anwendungsfall, function (v) { b.anwendungsfall = v; ch(); }, 'Anwendungsfall'), delBtn(function () { rm(m.beziehungen, i); ch(true); })]);
        var list = b.typ === 'generalisierung_akteur' ? ak() : uc();
        return row([typSel, sel(list, b.quelle, function (v) { b.quelle = v; ch(); }, b.typ === 'generalisierung_akteur' ? 'speziell' : 'von'), el('span', {}, ['→']), sel(list, b.ziel, function (v) { b.ziel = v; ch(); }, b.typ === 'generalisierung_akteur' ? 'allgemein' : 'nach'),
          b.typ === 'extend' ? sel(P.bedingung, b.bedingung, function (v) { b.bedingung = v; ch(); }, 'Bedingung') : null, delBtn(function () { rm(m.beziehungen, i); ch(true); })]);
      });
      return [section('Akteure', null, as.concat([addBtn('Akteur', function () { m.akteure.push({ id: newId('A', m.akteure), art: 'mensch', bezeichnung: '' }); ch(true); })])),
        section('Anwendungsfälle', null, us.concat([addBtn('Anwendungsfall', function () { m.anwendungsfaelle.push({ id: newId('UC', m.anwendungsfaelle), bezeichnung: '' }); ch(true); })])),
        section('Beziehungen', '«include»: Basisfall → eingebundener Pflichtfall. «extend»: optionale Erweiterung → Basisfall, mit Bedingung.', bs.concat([addBtn('Beziehung', function () { m.beziehungen.push({ typ: 'assoziation' }); ch(true); })]))];
    },
    er_chen: function (m, P, ch) {
      var names = function () { return m.entitaeten.map(function (e) { return e.name; }).filter(Boolean); }, K = ['1', 'c', 'n', 'm', 'mc', 'nc'];
      var es = m.entitaeten.map(function (e, i) {
        var at = (e.attribute || []).map(function (a, j) { return row([sel(P.attribut, a.name, function (v) { a.name = v; ch(); }, 'Attribut'), chk('Schlüssel', a.istSchluessel, function (v) { if (v) a.istSchluessel = true; else delete a.istSchluessel; ch(); }), delBtn(function () { rm(e.attribute, j); ch(true); }, 'Attribut')]); });
        return el('div', { class: 'dg-card' }, [row([sel(P.entitaet, e.name, function (v) { var o = e.name; e.name = v; m.beziehungen.forEach(function (b) { if (b.a === o) b.a = v; if (b.b === o) b.b = v; }); ch(true); }, 'Entitätstyp'), delBtn(function () { rm(m.entitaeten, i); ch(true); }, 'Entitätstyp')])].concat(at).concat([addBtn('Attribut', function () { (e.attribute = e.attribute || []).push({ name: '' }); ch(true); })]));
      });
      var bs = m.beziehungen.map(function (b, i) {
        var at = (b.attribute || []).map(function (a, j) { return row([el('span', { class: 'sub' }, ['Attribut der Beziehung:']), sel(P.attribut, a.name, function (v) { a.name = v; ch(); }, 'Attribut'), delBtn(function () { rm(b.attribute, j); ch(true); })]); });
        return el('div', { class: 'dg-card' }, [row([sel(names(), b.a, function (v) { b.a = v; ch(); }, 'Entität A'), sel(K, b.kardA, function (v) { b.kardA = v; ch(); }, 'A', 'xs'), sel(P.beziehung, b.name, function (v) { b.name = v; ch(); }, 'Beziehung'), sel(K, b.kardB, function (v) { b.kardB = v; ch(); }, 'B', 'xs'), sel(names(), b.b, function (v) { b.b = v; ch(); }, 'Entität B'), delBtn(function () { rm(m.beziehungen, i); ch(true); }, 'Beziehung')])].concat(at).concat([addBtn('Beziehungsattribut', function () { (b.attribute = b.attribute || []).push({ name: '' }); ch(true); })]));
      });
      return [section('Entitätstypen', 'Schlüsselattribute werden unterstrichen.', es.concat([addBtn('Entitätstyp', function () { m.entitaeten.push({ name: '', attribute: [] }); ch(true); })])),
        section('Beziehungen', 'Kardinalität in Chen-Notation (1, n, m) auf der jeweiligen Seite.', bs.concat([addBtn('Beziehung', function () { m.beziehungen.push({ a: '', b: '', name: '', kardA: '1', kardB: 'n' }); ch(true); })]))];
    },
    relationenmodell: function (m, P, ch) {
      var names = function () { return m.tabellen.map(function (t) { return t.name; }).filter(Boolean); };
      var ts = m.tabellen.map(function (t, i) {
        var cs = (t.spalten || []).map(function (c, j) { return row([sel(P.spalte, c.name, function (v) { c.name = v; ch(); }, 'Spalte'), chk('PK', c.istPK, function (v) { if (v) c.istPK = true; else delete c.istPK; ch(); }),
          chk('FK', c.istFK, function (v) { if (v) { c.istFK = true; c.kardRef = '1'; c.kardSelf = 'n'; } else { delete c.istFK; delete c.refTabelle; delete c.refSpalte; } ch(true); }),
          c.istFK ? sel(names().filter(function (n) { return n !== t.name; }), c.refTabelle, function (v) { c.refTabelle = v; var rt = m.tabellen.filter(function (x) { return x.name === v; })[0], pk = rt && (rt.spalten || []).filter(function (s) { return s.istPK; })[0]; c.refSpalte = pk ? pk.name : c.name; ch(); }, 'verweist auf') : null,
          delBtn(function () { rm(t.spalten, j); ch(true); }, 'Spalte')]); });
        return el('div', { class: 'dg-card' }, [row([sel(P.tabelle, t.name, function (v) { var o = t.name; t.name = v; m.tabellen.forEach(function (x) { (x.spalten || []).forEach(function (c) { if (c.refTabelle === o) c.refTabelle = v; }); }); ch(true); }, 'Tabellenname'), delBtn(function () { rm(m.tabellen, i); ch(true); }, 'Tabelle')])].concat(cs).concat([addBtn('Spalte', function () { (t.spalten = t.spalten || []).push({ name: '' }); ch(true); })]));
      });
      return [section('Tabellen', 'Jede Tabelle in 3NF: Primärschlüssel (PK) markieren, Fremdschlüssel (FK) mit Zieltabelle. Beziehungen ergeben sich aus den FKs (1:n).', ts.concat([addBtn('Tabelle', function () { m.tabellen.push({ name: '', spalten: [] }); ch(true); })]))];
    },
    epk: function (m, P, ch) {
      var TY = [{ v: 'ereignis', t: '⬡ Ereignis' }, { v: 'funktion', t: '▭ Funktion' }, { v: 'objekt', t: '▯ Informationsobjekt' }, { v: 'konnektor', t: '○ Konnektor' }];
      var opts = function () { var c = 0; return m.knoten.map(function (k) { return { v: k.id, t: k.typ === 'konnektor' ? (k.bezeichnung || '?') + ' ' + (++c) : (k.bezeichnung || '(' + k.typ + ')') }; }); };
      var ns = m.knoten.map(function (k, i) {
        return row([sel(TY, k.typ, function (v) { k.typ = v; k.bezeichnung = v === 'konnektor' ? 'XOR' : ''; ch(true); }, false, 'sm'),
          k.typ === 'konnektor' ? sel(['AND', 'OR', 'XOR'], k.bezeichnung, function (v) { k.bezeichnung = v; ch(true); }, false, 'xs') : sel(P[k.typ] || [], k.bezeichnung, function (v) { k.bezeichnung = v; ch(true); }, 'Text'),
          delBtn(function () { m.kanten = m.kanten.filter(function (e) { return e[0] !== k.id && e[1] !== k.id; }); rm(m.knoten, i); ch(true); }, 'Element')]);
      });
      var es = m.kanten.map(function (e, i) { return row([sel(opts(), e[0], function (v) { e[0] = v; ch(); }, 'von'), el('span', {}, ['→']), sel(opts(), e[1], function (v) { e[1] = v; ch(); }, 'nach'), delBtn(function () { rm(m.kanten, i); ch(true); })]); });
      return [section('Elemente', 'Ereignisse und Funktionen wechseln sich ab; Konnektoren verzweigen und führen zusammen.', ns.concat([addBtn('Element', function () { m.knoten.push({ id: newId('N', m.knoten), typ: 'ereignis', bezeichnung: '' }); ch(true); })])),
        section('Verbindungen', 'Informationsobjekte verbindest du mit ihrer Funktion.', es.concat([addBtn('Verbindung', function () { m.kanten.push(['', '']); ch(true); })]))];
    }
  };
  function numIn(value, onchange, label, cls) {
    var i = el('input', { type: 'text', inputmode: 'decimal', class: 'dg-num-in ' + (cls || ''), value: value === undefined || value === null ? '' : String(value), 'aria-label': label, placeholder: label });
    i.addEventListener('input', function () { onchange(i.value.trim()); }); return i;
  }
  EDIT.netzplan = function (m, P, ch) {
    var kw = {}; m.knotenwerte.forEach(function (k) { kw[k.id] = k; });
    m.aktivitaeten.forEach(function (a) { if (!kw[a.id]) { kw[a.id] = { id: a.id }; m.knotenwerte.push(kw[a.id]); } });
    var head = el('tr', {}, ['Vorgang', 'Dauer', 'Vorgänger'].concat(FIELDS6.map(function (f) { return f.toUpperCase(); })).map(function (h) { return el('th', {}, [h]); }));
    var rows = m.aktivitaeten.map(function (a) {
      var k = kw[a.id];
      return el('tr', {}, [el('td', {}, [el('b', {}, [a.id])]), el('td', {}, [String(a.dauer)]), el('td', {}, [(a.vorgaenger || []).join(', ') || '–'])].concat(FIELDS6.map(function (f) {
        return el('td', {}, [numIn(k[f], function (v) { k[f] = v === '' ? '' : num(v); ch(); }, f.toUpperCase() + ' ' + a.id, 'xs')]);
      })));
    });
    return [section('Knotenwerte', 'Vorwärtsrechnung: FAZ = größter FEZ der Vorgänger, FEZ = FAZ + Dauer. Rückwärts: SEZ = kleinster SAZ der Nachfolger, SAZ = SEZ − Dauer. GP = SAZ − FAZ, FP = kleinster FAZ der Nachfolger − FEZ.', [el('div', { class: 'dg-tabwrap' }, [el('table', { class: 'data dg-net' }, [head].concat(rows))])])];
  };
  EDIT.netzplan_kritischer_pfad = function (m, P, ch) {
    return [section('Kritischer Pfad', 'Markiere alle Vorgänge, die auf dem kritischen Pfad liegen.', [row(m.aktivitaeten.map(function (a) {
      return chk(a.id, m.kritischer_pfad.indexOf(a.id) >= 0, function (v) { m.kritischer_pfad = m.kritischer_pfad.filter(function (x) { return x !== a.id; }); if (v) m.kritischer_pfad.push(a.id); m.kritischer_pfad.sort(); ch(); });
    }))])];
  };
  EDIT.struktogramm_ausfuellen = function (m, P, ch) {
    var opts = m.bausteine.map(function (b) { return { v: b.id, t: b.text }; });
    return [section('Felder von oben nach unten', 'Eingerückte Felder stehen im Rumpf der Schleife darüber.', flat(m.struktur).map(function (x) {
      return el('div', { class: 'dg-row', style: 'margin-left:' + (x.d * 22) + 'px' }, [el('span', { class: 'dg-num' }, [x.s.typ === 'schleife' ? '⟲' : '▭']), sel(opts, x.s.baustein, function (v) { if (v) x.s.baustein = v; else delete x.s.baustein; ch(); }, x.s.typ === 'schleife' ? 'Schleifenkopf' : 'Anweisung')]);
    }))];
  };
  EDIT.ishikawa = function (m, P, ch) {
    var open = m.aeste.filter(function (a) { return a.offene_ursachen; });
    return [section('Offene Zweige', 'Ordne jedem leeren Zweig passende Ursachen zu. Nicht jede angebotene Ursache gehört ins Diagramm.', open.map(function (a) {
      while (a.gewaehlt.length < a.offene_ursachen) a.gewaehlt.push('');
      return el('div', { class: 'dg-card' }, [el('b', {}, [a.bezeichnung])].concat(a.gewaehlt.map(function (g, i) { return row([sel(P.ursache, g, function (v) { a.gewaehlt[i] = v; ch(); }, 'Ursache ' + (i + 1))]); })));
    }))];
  };
  EDIT.geraete_und_verbindungen = function (m, P, ch) {
    var dev = m.knoten.map(function (k) { return { v: k.id, t: k.bezeichnung }; });
    var ports = uniq([].concat.apply([], m.knoten.map(function (k) { return (k.ports || []).map(function (p) { return p.typ; }); })));
    var es = m.kanten.map(function (e, i) { return row([sel(dev, e.von, function (v) { e.von = v; ch(); }, 'von'), el('span', {}, ['→']), sel(dev, e.nach, function (v) { e.nach = v; ch(); }, 'nach'), sel(ports.map(function (p) { return { v: p, t: p.replace('_', '-').toUpperCase() }; }), e.port, function (v) { e.port = v; ch(); }, 'Schnittstelle', 'sm'), delBtn(function () { rm(m.kanten, i); ch(true); }, 'Kabel')]); });
    return [section('Kabel', 'Lege jede Verbindung mit der passenden Schnittstelle an.', es.concat([addBtn('Kabel', function () { m.kanten.push({ von: '', nach: '', port: '' }); ch(true); })]))];
  };
  EDIT.kurve_mit_eintrag = function (m, P, ch) {
    var years = []; for (var x = m.achsen.x_min; x <= m.achsen.x_max; x += (m.achsen.x_schritt || 1)) years.push(String(x));
    return [section('Eintrag', 'Trage den gesuchten Wert an der richtigen Stelle ein (Wert in Euro, ohne Punkte oder mit Tausenderpunkten).', [row([
      sel(years, m.einzutragen[0] === '' ? '' : String(m.einzutragen[0]), function (v) { m.einzutragen[0] = v === '' ? '' : +v; ch(); }, 'Jahr', 'sm'),
      numIn(m.einzutragen[1], function (v) { m.einzutragen[1] = v === '' ? '' : num(v); ch(); }, 'Wert')])]),
      el('p', { class: 'sub' }, ['Die schriftliche Beurteilung aus der Prüfungsaufgabe wird hier nicht bewertet; die Musterlösung zeigt sie nach dem Abgeben.'])];
  };
  EDIT.lineare_regression = function (m, P, ch) {
    var pts = m.punkte.map(function (q, i) { var fixed = i < (m.fest || 0);
      return row([el('span', { class: 'dg-num' }, [String(i + 1)]), fixed ? el('span', {}, ['(' + q[0] + ' | ' + q[1] + ') vorgegeben']) : numIn(q[0], function (v) { q[0] = v === '' ? '' : num(v); ch(); }, 'x', 'xs'), fixed ? null : numIn(q[1], function (v) { q[1] = v === '' ? '' : num(v); ch(); }, 'y', 'xs'), fixed ? null : delBtn(function () { rm(m.punkte, i); ch(true); }, 'Punkt')]); });
    return [section('Messpunkte', 'Übertrage die fehlenden Messpunkte aus der Aufgabe.', pts.concat([addBtn('Messpunkt', function () { m.punkte.push(['', '']); ch(true); })])),
      section('Regressionsgerade y = β₀ + β₁ · x', null, [row([el('span', {}, ['β₀ =']), numIn(m.gerade.beta0, function (v) { m.gerade.beta0 = v === '' ? '' : num(v); ch(); }, 'β₀', 'xs'), el('span', {}, ['β₁ =']), numIn(m.gerade.beta1, function (v) { m.gerade.beta1 = v === '' ? '' : num(v); ch(); }, 'β₁', 'xs')])])];
  };

  // „name(p: T, q) : R“ -> {name, parameter, rueckgabe}
  function parseSig(s) {
    var m = /^\s*([^(]*)\((.*)\)\s*(?::\s*(.+))?$/.exec(s || ''); if (!m) return { name: s, parameter: [] };
    var ps = m[2].trim() ? m[2].split(',').map(function (p) { var q = p.split(':'); var o = { name: q[0].trim() }; if (q[1]) o.typ = q[1].trim(); return o; }) : [];
    var o = { name: m[1].trim(), parameter: ps }; if (m[3]) o.rueckgabe = m[3].trim(); return o;
  }

  // Aufgabentext (Absätze, Überschriften, Tabellen) aus den Kompass-Daten
  function aufgabeNode(blocks) {
    var box = el('div', { class: 'dg-aufgabe' });
    (blocks || []).forEach(function (b) {
      if (b.typ === 'ueberschrift') box.appendChild(el('h4', {}, [b.text]));
      else if (b.typ === 'tabelle') {
        var t = el('table', { class: 'data dg-tab' });
        if (b.kopf) t.appendChild(el('tr', {}, b.kopf.map(function (h) { return el('th', {}, [h]); })));
        (b.zeilen || []).forEach(function (r) { t.appendChild(el('tr', {}, r.map(function (c) { return el('td', {}, [String(c)]); }))); });
        box.appendChild(el('div', { class: 'dg-tabwrap' }, [t]));
      } else if (b.typ === 'punktzeile') box.appendChild(el('p', { class: 'sub' }, [b.text]));
      else if (b.text) box.appendChild(el('p', { style: 'white-space:pre-wrap' }, [b.text]));
    });
    return box;
  }

  function evaluate(t, model) {
    var r = GRADE[t.payload.modus](t.payload.loesung, model || {}, t);
    var pts = r.total ? Math.max(0, Math.round(t.payload.punkte * (1 - r.wrong / r.total))) : 0;
    return { ok: r.wrong === 0, wrong: r.wrong, total: r.total, punkte: pts, hints: r.hints };
  }

  Tasks.registerType({
    id: 'diagramm',
    wide: true,
    init: function () { return Promise.resolve(); },
    tasks: function () {
      return ((window.GAME_DATA && GAME_DATA.diagrammTasks) || []).map(function (t) { var c = Object.assign({}, t); c.skills = [ART[t.payload.modus].skill]; return c; });
    },
    skills: function () { return SKILLS; },
    validate: function (t) { return GRADE[t.payload && t.payload.modus] ? [] : ['Unbekannte Diagrammart: ' + (t.payload && t.payload.modus)]; },
    renderInfo: function (t) { return aufgabeNode(t.payload.aufgabe); },
    render: function (t, ctx) {
      var model = ctx.draft ? clone(ctx.draft) : startModel(t), P = pools(t);
      var form = el('div', { class: 'dg-form' }), pic = el('div', { class: 'dg-pic', 'aria-label': 'Vorschau des Diagramms' });
      var status = el('p', { class: 'sub dg-status' });
      function redraw() { pic.innerHTML = DiagrammDraw.svg(t.payload.modus, model); }
      function build() {
        var st = form.scrollTop; form.innerHTML = '';
        EDIT[t.payload.modus](model, P, changed).forEach(function (n) { form.appendChild(n); });
        form.scrollTop = st;
      }
      function changed(structural) { ctx.setDraft(clone(model)); if (structural) build(); redraw(); }
      build(); redraw();
      var reset = el('button', { class: 'btn small ghost', type: 'button', onclick: function () { if (!confirm('Alles auf den Anfang zurücksetzen?')) return; model = startModel(t); ctx.setDraft(null); build(); redraw(); } }, ['↺ Zurücksetzen']);
      var check = el('button', { class: 'btn small ghost', type: 'button', onclick: function () {
        var r = evaluate(t, model); status.textContent = r.ok ? 'Alles stimmt – du kannst abgeben.' : 'Zwischenstand: etwa ' + r.punkte + ' von ' + t.payload.punkte + ' Punkten. ' + (r.hints[0] || ''); if (ctx.ran) ctx.ran();
      } }, ['Zwischenstand prüfen']);
      var head = el('div', { class: 'row dg-tools' }, [el('span', { class: 'badge' }, [ART[t.payload.modus].name]), el('span', { class: 'sub', style: 'margin:0' }, [t.payload.punkte + ' Punkte']), el('span', { class: 'spacer' }), check, reset]);
      var kids = [head, el('div', { class: 'dg-grid' }, [form, el('div', { class: 'dg-picwrap' }, [pic])]), status];
      if (window.State && State.s.done && State.s.done[t.id]) kids.push(el('details', { class: 'dg-sol' }, [el('summary', {}, ['Musterlösung als Diagramm']), el('div', { class: 'dg-pic', html: DiagrammDraw.svg(t.payload.modus, t.payload.loesung) })]));
      return { node: el('div', { class: 'dg' }, kids), getAnswer: function () { return clone(model); } };
    },
    grade: function (t, answer) {
      var start = startModel(t);
      if (!answer || JSON.stringify(answer) === JSON.stringify(start)) return { ok: false, empty: true, hint: 'Ergänze zuerst das Diagramm.' };
      var r = evaluate(t, answer);
      if (r.ok) return { ok: true };
      return { ok: false, hint: 'Etwa ' + r.punkte + ' von ' + t.payload.punkte + ' Punkten. ' + r.hints.slice(0, 3).join(' ') };
    },
    solutionText: function (t) { return (t.payload.erwartung || []).join('\n').slice(0, 2500); },
    // für Tests
    _evaluate: evaluate, _start: startModel, _pools: pools,
    // Musterlösung im Antwortformat (für Tests)
    _solutionAnswer: function (t) {
      var m = clone(t.payload.loesung), st = t.payload.start || {};
      if (t.payload.modus === 'geraete_und_verbindungen') m.kanten.forEach(function (e) { e.port = chainPort(t.payload.loesung, e.nach); });
      if (t.payload.modus === 'ishikawa') {
        var given = {}; (st.aeste || []).forEach(function (a) { given[a.id] = (a.ursachen || []).map(function (u) { return u.text; }); });
        m.aeste.forEach(function (a) { a.gewaehlt = (a.ursachen || []).map(function (u) { return u.text; }).filter(function (x) { return (given[a.id] || []).indexOf(x) < 0; }); });
      }
      return m;
    }
  });
})();

// Aufgabentyp "sql": Abfragen/Änderungen werden in sql.js ausgeführt und mit der Musterlösung verglichen.
(function () {
  var DATA = window.GAME_DATA.sql;
  var SQL = null;

  // Benötigte Fähigkeiten aus der Musterlösung ableiten (Grundlage für den Skill-Shop)
  var SKILL_RULES = [
    ['sql.select', /\bSELECT\b/i], ['sql.where', /\bWHERE\b/i], ['sql.orderby', /\bORDER\s+BY\b/i],
    ['sql.join', /\bJOIN\b/i], ['sql.groupby', /\bGROUP\s+BY\b/i], ['sql.having', /\bHAVING\b/i],
    ['sql.subquery', /\(\s*SELECT\b|\b(ANY|SOME|EXISTS)\b|\bALL\s*\(/i], ['sql.cte', /\bWITH\b/i],
    ['sql.union', /\bUNION\b|\bINTERSECT\b|\bEXCEPT\b/i], ['sql.window', /\bOVER\s*\(/i],
    ['sql.case', /\bCASE\b/i], ['sql.insert', /(^|;)\s*INSERT\b/i], ['sql.update', /(^|;)\s*UPDATE\b/i], ['sql.delete', /(^|;)\s*DELETE\b/i],
    ['sql.ddl', /\b(CREATE|ALTER|DROP)\s+(TABLE|INDEX|VIEW)|\bALTER\s+TABLE\b/i], ['sql.dcl', /\b(GRANT|REVOKE|CREATE\s+USER)\b/i],
    ['sql.aggregate', /\b(COUNT|SUM|AVG|MIN|MAX|STDDEV)\s*\(/i], ['sql.datetime', /\b(YEAR|MONTH|DAY|DATEDIFF|TIMESTAMPDIFF|WEEKDAY)\s*\(/i]
  ];
  function deriveSkills(sol) {
    var out = SKILL_RULES.filter(function (r) { return r[1].test(sol); }).map(function (r) { return r[0]; });
    return out.length ? out : ['sql.select'];
  }

  // Skill-Katalog für den Shop. starter = von Anfang an vorhanden.
  var SKILLS = [
    { id: 'sql.select',    name: 'SELECT-Grundlagen',           cost: 0,   starter: true, desc: 'Spalten und Tabellen abfragen.' },
    { id: 'sql.where',     name: 'WHERE-Bedingungen',           cost: 0,   starter: true, desc: 'Zeilen mit Bedingungen filtern (=, <, LIKE, AND/OR).' },
    { id: 'sql.orderby',   name: 'ORDER BY und LIMIT',          cost: 0,   starter: true, desc: 'Ergebnisse sortieren und begrenzen.' },
    { id: 'sql.aggregate', name: 'Aggregatfunktionen',          cost: 80,  desc: 'COUNT, SUM, AVG, MIN, MAX über mehrere Zeilen.' },
    { id: 'sql.groupby',   name: 'GROUP BY',                    cost: 120, desc: 'Zeilen zu Gruppen zusammenfassen und je Gruppe rechnen.' },
    { id: 'sql.having',    name: 'HAVING',                      cost: 150, requires: ['sql.groupby'], desc: 'Gruppen nach dem Aggregieren filtern.' },
    { id: 'sql.join',      name: 'JOINs',                       cost: 120, desc: 'Mehrere Tabellen über Schlüssel verknüpfen (INNER, LEFT).' },
    { id: 'sql.subquery',  name: 'Unterabfragen',               cost: 200, desc: 'Abfragen in Abfragen, IN, EXISTS, ALL, ANY.' },
    { id: 'sql.cte',       name: 'CTEs (WITH)',                 cost: 300, requires: ['sql.subquery'], desc: 'Benannte Zwischenergebnisse mit WITH.' },
    { id: 'sql.union',     name: 'UNION, INTERSECT, EXCEPT',    cost: 150, desc: 'Ergebnisse mehrerer Abfragen zusammenführen oder vergleichen.' },
    { id: 'sql.window',    name: 'Fensterfunktionen',           cost: 400, requires: ['sql.groupby'], desc: 'RANK, ROW_NUMBER, Summen über Fenster mit OVER.' },
    { id: 'sql.case',      name: 'CASE-Ausdrücke',              cost: 120, desc: 'Bedingte Werte direkt in der Abfrage berechnen.' },
    { id: 'sql.datetime',  name: 'Datums- und Zeitfunktionen',  cost: 120, desc: 'YEAR, MONTH, DATEDIFF und Rechnen mit Zeiten.' },
    { id: 'sql.insert',    name: 'INSERT',                      cost: 100, desc: 'Neue Datensätze einfügen.' },
    { id: 'sql.update',    name: 'UPDATE',                      cost: 100, desc: 'Vorhandene Datensätze ändern.' },
    { id: 'sql.delete',    name: 'DELETE',                      cost: 100, desc: 'Datensätze löschen.' },
    { id: 'sql.ddl',       name: 'Tabellen anlegen und ändern', cost: 250, desc: 'CREATE, ALTER, DROP (Datendefinition, DDL).' },
    { id: 'sql.dcl',       name: 'Rechte vergeben (DCL)',       cost: 250, desc: 'GRANT, REVOKE und Benutzer anlegen.' }
  ].map(function (k) { k.topic = 'datenbank'; k.group = 'SQL'; return k; });

  function toEnvelope(t) {
    return {
      id: t.id, type: 'sql', topic: 'datenbank', subtopic: 'sql',
      title: t.title, difficulty: t.difficulty, prompt: t.prompt,
      context: DATA.schemas[t.schemaId].label,
      skills: deriveSkills(t.solution),
      reflection: t.reflection || '',
      payload: { schemaId: t.schemaId, solution: t.solution, grading: t.grading || 'result', tieFree: !!t.tieFree }
    };
  }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function resultTable(r) {
    if (!r) return el('p', { class: 'sub' }, ['Die Anweisung wurde ausgeführt (keine Ergebniszeilen).']);
    var head = el('tr', {}, r.columns.map(function (c) { return el('th', {}, [c]); }));
    var rows = r.values.slice(0, 200).map(function (v) { return el('tr', {}, v.map(function (x) { return el('td', {}, [x === null ? 'NULL' : String(x)]); })); });
    return el('div', {}, [el('p', { class: 'sub' }, [r.values.length + ' Zeile(n)']), el('div', { class: 'tablewrap' }, [el('table', { class: 'data' }, [el('thead', {}, [head]), el('tbody', {}, rows)])])]);
  }
  function schemaBox(schema) {
    var box = el('div');
    box.appendChild(el('h2', {}, ['Datenbank']));
    box.appendChild(el('p', { class: 'sub' }, [schema.description]));
    schema.tables.forEach(function (t) {
      var cols = t.columns.map(function (c) { return c.name + ' ' + c.type + (c.primaryKey ? ' 🔑' : '') + (c.references ? ' → ' + c.references : ''); }).join(', ');
      box.appendChild(el('div', { class: 'schema-table' }, [el('b', {}, [t.name]), el('span', {}, [' (' + t.rowCount + ' Zeilen)']), el('div', { class: 'cols' }, [cols])]));
    });
    return box;
  }

  var plugin = {
    id: 'sql',
    init: function () { return SqlEngine.init().then(function (S) { SQL = S; }); },
    tasks: function () { return DATA.tasks.map(toEnvelope); },
    skills: function () { return SKILLS; },
    validate: function (t) { return DATA.schemas[t.payload.schemaId] ? [] : ['Schema fehlt: ' + t.payload.schemaId]; },

    // Tabs im Referenzbuch neben der Aufgabe: die Datenbank zum Aufklappen (Spalten, Schlüssel, alle Zeilen)
    referenceTabs: function (t, ui) {
      var schema = DATA.schemas[t.payload.schemaId];
      return [{ id: 'db', label: 'Datenbank', render: function () {
        var wrap = el('div'), info = {};
        schema.tables.forEach(function (tb) { info[tb.name] = tb; });
        wrap.appendChild(el('p', { class: 'sub' }, [schema.label + '. Klappe eine Tabelle auf, um die Daten zu sehen.']));
        SqlEngine.tables(SQL, schema).forEach(function (tb, i) {
          var meta = info[tb.name], d = el('details', { class: 'dbtable' });
          if (ui.openDb[t.id + tb.name] !== false && (ui.openDb[t.id + tb.name] || i === 0)) d.setAttribute('open', '');
          d.addEventListener('toggle', function () { ui.openDb[t.id + tb.name] = d.open; });
          d.appendChild(el('summary', {}, [el('b', {}, [tb.name]), ' (' + tb.rows.length + ' Zeilen)']));
          if (meta) {
            var badges = el('div', { class: 'cols' }, meta.columns.map(function (c) {
              return el('span', { class: 'badge', style: 'background:' + (c.primaryKey ? '#ffcf5b' : c.references ? '#c4b6e6' : '#fff') + ';margin:0 4px 4px 0' }, [c.name + ' · ' + c.type + (c.primaryKey ? ' · PK' : '') + (c.references ? ' → ' + c.references : '')]);
            }));
            d.appendChild(badges);
          }
          var head = el('tr', {}, tb.columns.map(function (c) { return el('th', {}, [c]); }));
          var rows = tb.rows.slice(0, 100).map(function (r) { return el('tr', {}, r.map(function (x) { return el('td', {}, [x === null ? 'NULL' : String(x)]); })); });
          d.appendChild(el('div', { class: 'tablewrap' }, [el('table', { class: 'data' }, [el('thead', {}, [head]), el('tbody', {}, rows)])]));
          if (tb.rows.length > 100) d.appendChild(el('p', { class: 'sub' }, ['Es werden die ersten 100 von ' + tb.rows.length + ' Zeilen gezeigt.']));
          wrap.appendChild(d);
        });
        return wrap;
      } }];
    },

    // Zusatzinfo links unter dem Auftragstext
    renderInfo: function (t) { return schemaBox(DATA.schemas[t.payload.schemaId]); },

    // Arbeitsbereich rechts. ctx: { draft, setDraft(v), output (Element), feedback(kind,text), rerender() }
    render: function (t, ctx) {
      var schema = DATA.schemas[t.payload.schemaId];
      var ta = el('textarea', { class: 'sql', spellcheck: 'false', placeholder: 'SQL hier eingeben …' });
      ta.value = ctx.draft || '';
      ta.addEventListener('input', function () { ctx.setDraft(ta.value); });
      var run = el('button', { class: 'btn ghost', onclick: function () {
        ctx.output.textContent = '';
        if (ctx.ran) ctx.ran();
        if (t.payload.grading === 'pattern') { ctx.feedback('info', 'Diese Anweisung (ALTER, GRANT, REVOKE …) kann im Browser nicht ausgeführt werden. Beim Abgeben wird sie per Mustervergleich geprüft.'); return; }
        var r = SqlEngine.run(SQL, schema, ta.value);
        ctx.output.appendChild(r.ok ? resultTable(r.result) : el('div', { class: 'msg bad' }, ['Fehler: ' + r.error]));
      } }, ['Ausführen']);
      function insert(code) {           // Beispiel aus dem Handbuch an der Cursorposition einfügen
        var a = ta.selectionStart === undefined ? ta.value.length : ta.selectionStart, b = ta.selectionEnd === undefined ? a : ta.selectionEnd;
        ta.value = ta.value.slice(0, a) + code + ta.value.slice(b); ta.focus(); ta.selectionStart = ta.selectionEnd = a + code.length;
        ctx.setDraft(ta.value);
      }
      return { node: el('div', {}, [ta, el('div', { class: 'row', style: 'margin-top:10px' }, [run])]), getAnswer: function () { return ta.value; }, insert: insert };
    },

    // Antwort ist ein Text. Ergebnis: { ok, hint }
    grade: function (t, answer) {
      if (!String(answer).trim()) return { ok: false, hint: 'Gib zuerst eine SQL-Anweisung ein.', empty: true };
      return SqlEngine.grade(SQL, DATA.schemas[t.payload.schemaId], answer, { solution: t.payload.solution, grading: t.payload.grading, tieFree: t.payload.tieFree });
    },
    solutionText: function (t) { return t.payload.solution; }
  };
  Tasks.registerType(plugin);
})();

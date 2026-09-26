// SQL-Engine (sql.js, eingebettet) + Bewertung durch Ergebnisvergleich mit der Musterlösung
(function () {
  var SQLP = null;

  function b64ToBytes(b64) {
    var bin = atob(b64), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function init() {
    if (!SQLP) SQLP = window.initSqlJs({ wasmBinary: b64ToBytes(window.SQL_WASM_B64) });
    return SQLP;
  }

  function freshDb(SQL, schema) {
    var db = new SQL.Database();
    if (window.MysqlCompat) window.MysqlCompat.install(db);
    db.exec(schema.ddl);
    return db;
  }

  // Letztes Ergebnis mit Zeilen (SELECT) oder null
  function lastResult(db, sql) {
    var res = db.exec(rw(sql));
    return res.length ? res[res.length - 1] : null;
  }

  function rw(sql) { return window.MysqlCompat ? window.MysqlCompat.rewrite(sql) : sql; }

  function norm(v) {
    if (v === null || v === undefined) return 'NULL';
    if (typeof v === 'number') return String(Math.round(v * 1e6) / 1e6);
    return String(v);
  }
  function rowKey(r) { return r.map(norm).join('\u0001'); }

  // Kompletter Tabelleninhalt (für Aufgaben mit UPDATE/INSERT/DELETE)
  function dump(db) {
    var names = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
    var out = {};
    if (!names.length) return out;
    names[0].values.forEach(function (n) {
      var r = db.exec('SELECT * FROM "' + n[0] + '"');
      out[n[0]] = r.length ? r[0].values.map(rowKey).sort() : [];
    });
    return out;
  }

  function isQuery(sql) { return /^\s*(with|select)\b/i.test(sql.replace(/^(\s*--[^\n]*\n|\s*\/\*[\s\S]*?\*\/)*/g, '')); }

  // Führt SQL des Spielers aus (nur Anzeige, ohne Bewertung)
  function run(SQL, schema, sql) {
    var db = freshDb(SQL, schema);
    try {
      var r = lastResult(db, sql);
      return { ok: true, result: r, changed: r ? null : dump(db) };
    } catch (e) {
      return { ok: false, error: e.message };
    } finally { db.close(); }
  }

  // Bewertung: { ok, hint }
  function grade(SQL, schema, userSql, task) {
    if (task.grading === 'pattern') {
      return window.MysqlCompat.patternMatch(userSql, task.solution)
        ? { ok: true }
        : { ok: false, hint: 'Die Anweisung stimmt nicht mit der erwarteten überein. Diese Aufgabe wird über einen Mustervergleich geprüft, achte auf Tabellen-, Spalten- und Benutzernamen und die genaue Syntax.' };
    }
    var dbS = freshDb(SQL, schema), dbU = freshDb(SQL, schema);
    try {
      var sol, usr;
      try { usr = isQuery(userSql) ? lastResult(dbU, userSql) : (dbU.exec(rw(userSql)), null); }
      catch (e) { return { ok: false, hint: 'Deine Abfrage hat einen Fehler: ' + e.message }; }

      if (isQuery(task.solution)) {
        sol = lastResult(dbS, task.solution);
        if (!usr) return { ok: false, hint: 'Deine Abfrage liefert keine Ergebniszeilen. Erwartet wird eine Abfrage mit Ergebnis.' };
        var sc = sol ? sol.columns.length : 0, uc = usr.columns.length;
        if (sc !== uc) return { ok: false, hint: 'Die Anzahl der Spalten stimmt nicht (erwartet: ' + sc + ', geliefert: ' + uc + ').' };
        var sr = sol ? sol.values.map(rowKey) : [], ur = usr.values.map(rowKey);
        if (sr.length !== ur.length) return { ok: false, hint: 'Die Anzahl der Zeilen stimmt nicht (erwartet: ' + sr.length + ', geliefert: ' + ur.length + ').' };
        var ordered = /\border\s+by\b/i.test(task.solution) && !task.tieFree;
        var a = ordered ? sr : sr.slice().sort(), b = ordered ? ur : ur.slice().sort();
        for (var i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return { ok: false, hint: ordered ? 'Die Zeilen stimmen nicht oder stehen in falscher Reihenfolge.' : 'Der Inhalt der Zeilen stimmt nicht.' };
        }
        return { ok: true };
      }
      // Schreibende Aufgabe: Endzustand aller Tabellen vergleichen
      dbS.exec(rw(task.solution));
      if (usr) return { ok: false, hint: 'Hier soll Daten geändert werden (UPDATE, INSERT oder DELETE), keine Abfrage.' };
      var ds = dump(dbS), du = dump(dbU);
      var tn = Object.keys(ds);
      for (var j = 0; j < tn.length; j++) {
        if (JSON.stringify(ds[tn[j]]) !== JSON.stringify(du[tn[j]])) return { ok: false, hint: 'Der Inhalt der Tabelle „' + tn[j] + '“ nach deiner Anweisung stimmt nicht.' };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, hint: 'Fehler bei der Prüfung: ' + e.message };
    } finally { dbS.close(); dbU.close(); }
  }

  // Alle Tabellen des Schemas samt Zeilen (für die aufklappbare Datenbank im Referenzbuch)
  function tables(SQL, schema) {
    var db = freshDb(SQL, schema), out = [];
    try {
      var names = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid");
      (names.length ? names[0].values : []).forEach(function (n) {
        var r = db.exec('SELECT * FROM "' + n[0] + '"');
        out.push({ name: n[0], columns: r.length ? r[0].columns : [], rows: r.length ? r[0].values : [] });
      });
    } finally { db.close(); }
    return out;
  }

  window.SqlEngine = { init: init, run: run, grade: grade, tables: tables };
})();

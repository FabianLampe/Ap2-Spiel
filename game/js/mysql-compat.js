// MySQL-Funktionen, die SQLite nicht kennt, für die heidelab-Aufgaben nachgebaut.
(function () {
  function d(v) {                         // 'YYYY-MM-DD[ HH:MM:SS]' -> Date (UTC) oder null
    if (v === null || v === undefined) return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?/.exec(String(v));
    if (!m) return null;
    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)));
  }
  function part(v, i) {                   // Zeit-Teil aus 'HH:MM:SS' oder Datetime
    if (v === null || v === undefined) return null;
    var s = String(v), m = /(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(s);
    return m ? +m[i] : null;
  }
  function pad(n) { return String(n).padStart(2, '0'); }

  function install(db) {
    db.create_function('YEAR', function (v) { var x = d(v); return x ? x.getUTCFullYear() : null; });
    db.create_function('MONTH', function (v) { var x = d(v); return x ? x.getUTCMonth() + 1 : null; });
    db.create_function('DAY', function (v) { var x = d(v); return x ? x.getUTCDate() : null; });
    db.create_function('DAYOFMONTH', function (v) { var x = d(v); return x ? x.getUTCDate() : null; });
    db.create_function('HOUR', function (v) { return part(v, 1); });
    db.create_function('MINUTE', function (v) { return part(v, 2); });
    db.create_function('SECOND', function (v) { return part(v, 3) || 0; });
    db.create_function('WEEKDAY', function (v) { var x = d(v); return x ? (x.getUTCDay() + 6) % 7 : null; });
    db.create_function('DATEDIFF', function (a, b) {
      var x = d(a), y = d(b); if (!x || !y) return null;
      var dx = Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate()), dy = Date.UTC(y.getUTCFullYear(), y.getUTCMonth(), y.getUTCDate());
      return Math.round((dx - dy) / 86400000);
    });
    db.create_function('SUBSTRING_INDEX', function (s, delim, count) {
      if (s === null) return null; s = String(s); var parts = s.split(delim);
      if (count >= 0) return parts.slice(0, count).join(delim);
      return parts.slice(count).join(delim);
    });
    db.create_function('SEC_TO_TIME', function (n) {
      if (n === null) return null; n = Math.round(n); var neg = n < 0; n = Math.abs(n);
      return (neg ? '-' : '') + pad(Math.floor(n / 3600)) + ':' + pad(Math.floor(n % 3600 / 60)) + ':' + pad(n % 60);
    });
    db.create_function('TIME_TO_SEC', function (v) {
      if (v === null) return null; var m = /^(-?)(\d+):(\d{2}):(\d{2})/.exec(String(v)); if (!m) return null;
      return (m[1] ? -1 : 1) * (+m[2] * 3600 + +m[3] * 60 + +m[4]);
    });
    db.create_function('TIMESTAMPDIFF', function (unit, a, b) {
      var x = d(a), y = d(b); if (!x || !y) return null;
      var ms = y - x, u = String(unit).toUpperCase();
      var div = { SECOND: 1000, MINUTE: 60000, HOUR: 3600000, DAY: 86400000, WEEK: 604800000 }[u];
      if (div) return Math.trunc(ms / div);
      var months = (y.getUTCFullYear() - x.getUTCFullYear()) * 12 + (y.getUTCMonth() - x.getUTCMonth());
      if (y.getUTCDate() < x.getUTCDate() && months > 0) months--; else if (y.getUTCDate() > x.getUTCDate() && months < 0) months++;
      if (u === 'MONTH') return months;
      if (u === 'YEAR') return Math.trunc(months / 12);
      return null;
    });
    db.create_function('LAST_INSERT_ID', function () {
      var r = db.exec('SELECT last_insert_rowid()'); return r[0].values[0][0];
    });
    // STDDEV (MySQL: Population), plus Varianten
    function agg(name, sample) {
      db.create_aggregate(name, {
        init: function () { return { n: 0, sum: 0, sq: 0 }; },
        step: function (st, v) { if (v === null) return st; return { n: st.n + 1, sum: st.sum + v, sq: st.sq + v * v }; },
        finalize: function (st) {
          var n = st.n; if (n === 0 || (sample && n < 2)) return null;
          var mean = st.sum / n, ss = st.sq - n * mean * mean;
          return Math.sqrt(Math.max(0, ss) / (sample ? n - 1 : n));
        }
      });
    }
    agg('STDDEV', false); agg('STDDEV_POP', false); agg('STDDEV_SAMP', true);
  }
  // Findet die zur Klammer bei Position i gehörende schließende Klammer
  function closeParen(sql, i) {
    var depth = 0, q = null;
    for (var k = i; k < sql.length; k++) {
      var c = sql[k];
      if (q) { if (c === q) q = null; continue; }
      if (c === "'" || c === '"' || c === '`') { q = c; continue; }
      if (c === '(') depth++;
      else if (c === ')') { depth--; if (depth === 0) return k; }
    }
    return -1;
  }
  // Erste FROM-Stelle der obersten Ebene (für "AS _c" an der ersten Spalte)
  function topFrom(sub) {
    var depth = 0, q = null;
    for (var k = 0; k < sub.length; k++) {
      var c = sub[k];
      if (q) { if (c === q) q = null; continue; }
      if (c === "'" || c === '"' || c === '`') { q = c; continue; }
      if (c === '(') depth++; else if (c === ')') depth--;
      else if (depth === 0 && /^\sFROM\s/i.test(sub.slice(k, k + 6))) return k;
    }
    return -1;
  }
  // x > ALL (SELECT ...) / x < ANY (SELECT ...) -> EXISTS-Formulierung (SQLite kennt ALL/ANY nicht)
  function rewrite(sql) {
    var re = /([\w.]+)\s*(<>|!=|<=|>=|=|<|>)\s*(ALL|ANY|SOME)\s*\(/i, m, guard = 0;
    while ((m = re.exec(sql)) && guard++ < 20) {
      var open = m.index + m[0].length - 1, close = closeParen(sql, open);
      if (close < 0) break;
      var sub = sql.slice(open + 1, close), f = topFrom(sub);
      if (f < 0) break;
      sub = sub.slice(0, f) + ' AS _c' + sub.slice(f);
      var cond = m[1] + ' ' + m[2] + ' _q._c', isAll = m[3].toUpperCase() === 'ALL';
      var rep = isAll ? 'NOT EXISTS (SELECT 1 FROM (' + sub + ') AS _q WHERE NOT (' + cond + '))'
                      : 'EXISTS (SELECT 1 FROM (' + sub + ') AS _q WHERE ' + cond + ')';
      sql = sql.slice(0, m.index) + rep + sql.slice(close + 1);
    }
    // TIMESTAMPDIFF(MINUTE, a, b) -> Einheit als Text übergeben
    return sql.replace(/TIMESTAMPDIFF\s*\(\s*([A-Za-z]+)\s*,/gi, "TIMESTAMPDIFF('$1',");
  }
  // Mustervergleich für Anweisungen, die SQLite nicht ausführen kann (ALTER, GRANT, REVOKE, ...)
  function normPattern(sql) {
    return sql.replace(/--[^\n]*/g, ' ').replace(/[`'"]/g, '').replace(/\s+/g, ' ').toUpperCase()
      .split(';').map(function (x) { return x.replace(/\s*([(),=@])\s*/g, '$1').trim(); }).filter(Boolean);
  }
  function patternMatch(user, solution) {
    var a = normPattern(user), b = normPattern(solution);
    return a.length === b.length && a.every(function (x, i) { return x === b[i]; });
  }
  window.MysqlCompat = { install: install, rewrite: rewrite, patternMatch: patternMatch };
})();

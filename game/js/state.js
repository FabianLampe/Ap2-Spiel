// Zentraler Spielzustand + Speicherstand (localStorage, mit Fallback ohne Speicherung)
(function () {
  var KEY = 'rack-und-ruhm-v1';
  var DAY_START = 8 * 60;

  function fresh() {
    return {
      day: 1, minutes: DAY_START, money: 150, rep: 0,
      done: {}, attempts: {}, offersSeed: 1, view: { name: 'home' },
      skills: {}, home: 1, car: 0, missedRent: 0, events: [],
      loc: 'wohnung', office: false, coffeeDay: 0,
      difficulty: 'normal', avatar: 'm1', pname: 'Freelancer', started: false,
      acc: {}, notes: [], noteLevel: 0, rel: {}, taught: {}, lastLesson: {}, pending: [], failed: {}, bookOpen: true
    };
  }

  var State = {
    s: fresh(),
    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) this.s = Object.assign(fresh(), JSON.parse(raw));
      } catch (e) { /* ohne Speicherung weiterspielen */ }
    },
    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(this.s)); } catch (e) { /* ignorieren */ }
    },
    reset: function () {
      this.s = fresh();
      try { localStorage.removeItem(KEY); } catch (e) { /* ignorieren */ }
    },
    // Spielstand als Datei: exportieren / importieren
    exportJSON: function () { return JSON.stringify({ game: 'rack-und-ruhm', version: 1, saved: new Date().toISOString(), state: this.s }, null, 1); },
    importJSON: function (text) {
      var o; try { o = JSON.parse(text); } catch (e) { return { ok: false, why: 'Die Datei ist kein gültiger Spielstand.' }; }
      if (!o || o.game !== 'rack-und-ruhm' || !o.state || typeof o.state.day !== 'number') return { ok: false, why: 'Das ist kein Rack-&-Ruhm-Spielstand.' };
      this.s = Object.assign(fresh(), o.state); this.s.started = true; this.save(); return { ok: true };
    },
    hasSave: function () { try { var r = JSON.parse(localStorage.getItem(KEY) || 'null'); return !!(r && r.started); } catch (e) { return false; } },
    // Zeit vergeht; nach Feierabend beginnt der nächste Tag (mit neuen Angeboten und ggf. Rechnung).
    spendTime: function (min) {
      this.s.minutes += min;
      var newDay = false;
      while (this.s.minutes >= Economy.dayEnd(this.s)) {
        var over = this.s.minutes - Economy.dayEnd(this.s);
        this.s.day += 1;
        this.s.minutes = DAY_START + over;
        this.s.offersSeed += 1;
        newDay = true;
        Economy.onNewDay(this.s);
      }
      return newDay;
    },
    // Absolute Spielzeit in Minuten seit Tag 1, 00:00 (für Fristen über Tagesgrenzen)
    abs: function () { return (this.s.day - 1) * 1440 + this.s.minutes; },
    takeEvents: function () { var e = this.s.events; this.s.events = []; return e; },
    clock: function () {
      var m = this.s.minutes, h = Math.floor(m / 60), mm = m % 60;
      return 'Tag ' + this.s.day + ' · ' + String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
    }
  };
  window.State = State;
})();

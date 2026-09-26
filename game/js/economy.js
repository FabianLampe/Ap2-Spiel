// Wirtschaft: Wohnung, Auto, wöchentliche Kosten, Skills kaufen. Alle Zahlen stehen hier an einer Stelle.
(function () {
  var FIXED_COSTS = 40;          // Strom, Internet usw. pro Woche
  // Schwierigkeit: pay = Honorar, rent = Miete/Nebenkosten, limit = Fristlänge, fine = Nachzahlung bei falscher Antwort, start = Startgeld
  var DIFF = {
    leicht: { id: 'leicht', name: 'Leicht',  pay: 1.25, rent: 0.7,  limit: 1.5,  fine: 0,   start: 300, desc: 'Mehr Honorar, günstigere Miete, lange Fristen, keine Strafen bei falschen Antworten.' },
    normal: { id: 'normal', name: 'Normal',  pay: 1,    rent: 1,    limit: 1,    fine: 1,   start: 150, desc: 'So ist das Spiel gedacht.' },
    schwer: { id: 'schwer', name: 'Schwer',  pay: 0.85, rent: 1.25, limit: 0.75, fine: 1.5, start: 100, desc: 'Weniger Honorar, teurere Miete, knappe Fristen und höhere Strafen.' }
  };
  var HOMES = [
    null,
    { tier: 1, name: 'Schäbige Einzimmerbude', price: 0,    rent: 250, dayEnd: 17, timeFactor: 1.00, desc: 'Feuchter Fleck an der Wand, eine Fliege als Mitbewohner. Es reicht zum Arbeiten.' },
    { tier: 2, name: 'Ordentliche Wohnung',    price: 600,  rent: 420, dayEnd: 18, timeFactor: 0.95, desc: 'Frisch gestrichen, ruhiger Arbeitsplatz. Du kannst eine Stunde länger arbeiten und bist 5 % schneller.' },
    { tier: 3, name: 'Helle Altbauwohnung',    price: 1800, rent: 650, dayEnd: 19, timeFactor: 0.90, desc: 'Zweiter Monitor, guter Stuhl. Zwei Stunden länger arbeiten, 10 % schneller.' },
    { tier: 4, name: 'Designer-Loft',          price: 4500, rent: 950, dayEnd: 20, timeFactor: 0.85, desc: 'Skyline-Blick und Kaffeemaschine. Drei Stunden länger arbeiten, 15 % schneller.' }
  ];
  // Büro: ersetzt das Café als Arbeitsplatz (kein Kaffee nötig, ruhiger, schneller). Kostet jede Woche Miete.
  var OFFICE = { name: 'Kleines Büro', setup: 250, rent: 380, timeFactor: 0.90,
    desc: 'Eigener Schreibtisch in der Innenstadt: kein Kaffeezwang, ruhiger Arbeitsplatz, Aufträge sind dort 10 % schneller.' };
  var COFFEE_PRICE = 4;
  // Notizbuch: Plätze je Stufe (Stufe 0 gratis), Erweiterungen gibt es im Lernzentrum
  var NOTEBOOK = [{ cap: 8, price: 0, name: 'Schulheft' }, { cap: 14, price: 150, name: 'Notizbuch mit Register' }, { cap: 22, price: 400, name: 'Ringbuch mit Karteikarten' }];
  var CARS = [
    { tier: 0, name: 'Kein Auto',        price: 0,    upkeep: 0,   bonus: 0,    desc: 'Du fährst Bahn. Kunden vor Ort sind schwer zu erreichen.' },
    { tier: 1, name: 'Rostlaube',        price: 900,  upkeep: 30,  bonus: 0.10, desc: 'Springt meistens an. Du erreichst mehr Kunden vor Ort: 10 % mehr Honorar.' },
    { tier: 2, name: 'Gebrauchtwagen',   price: 2600, upkeep: 60,  bonus: 0.20, desc: 'Zuverlässig und ordentlich. 20 % mehr Honorar.' },
    { tier: 3, name: 'Firmenwagen',      price: 6000, upkeep: 100, bonus: 0.35, desc: 'Macht Eindruck beim Kunden. 35 % mehr Honorar.' }
  ];

  var Economy = {
    HOMES: HOMES, CARS: CARS, OFFICE: OFFICE, NOTEBOOK: NOTEBOOK, COFFEE_PRICE: COFFEE_PRICE, FIXED_COSTS: FIXED_COSTS,

    DIFF: DIFF,
    diff: function (s) { return DIFF[(s && s.difficulty) || 'normal'] || DIFF.normal; },
    home: function (s) { return HOMES[s.home]; },
    car: function (s) { return CARS[s.car]; },
    dayEnd: function (s) { return HOMES[s.home].dayEnd * 60; },
    timeFactor: function (s) { return HOMES[s.home].timeFactor * (s.office && s.loc === 'buero' ? OFFICE.timeFactor : 1); },
    payFactor: function (s) { return 1 + CARS[s.car].bonus; },
    weeklyBill: function (s) {
      var f = Economy.diff(s).rent, off = Math.round((s.office ? OFFICE.rent : 0) * f), rent = Math.round(HOMES[s.home].rent * f), fixed = Math.round(FIXED_COSTS * f);
      return { rent: rent, fixed: fixed, car: CARS[s.car].upkeep, office: off, total: rent + fixed + CARS[s.car].upkeep + off };
    },
    noteCap: function (s) { return NOTEBOOK[s.noteLevel || 0].cap; },
    upgradeNotebook: function (s) {
      var next = NOTEBOOK[(s.noteLevel || 0) + 1];
      if (!next) return { ok: false, why: 'Größer geht es nicht.' };
      if (s.money < next.price) return { ok: false, why: 'Zu wenig Geld (' + next.price + ' € nötig)', poor: true };
      s.money -= next.price; s.noteLevel = (s.noteLevel || 0) + 1; return { ok: true };
    },

    // Arbeiten: im Café mit Kaffee von heute, im Büro wenn angemietet
    hasCoffee: function (s) { return s.coffeeDay === s.day; },
    canWork: function (s, loc) {
      loc = loc || s.loc;
      if (loc === 'cafe') return Economy.hasCoffee(s);
      if (loc === 'buero') return !!s.office;
      return false;
    },
    buyCoffee: function (s) {
      if (Economy.hasCoffee(s)) return { ok: false, why: 'Du hast heute schon einen Kaffee.' };
      if (s.money < COFFEE_PRICE) return { ok: false, why: 'Zu wenig Geld für einen Kaffee (' + COFFEE_PRICE + ' €).' };
      s.money -= COFFEE_PRICE; s.coffeeDay = s.day; return { ok: true };
    },
    rentOffice: function (s) {
      if (s.office) return { ok: false, why: 'Du hast schon ein Büro.' };
      if (s.money < OFFICE.setup) return { ok: false, why: 'Zu wenig Geld (' + OFFICE.setup + ' € Einrichtung nötig)', poor: true };
      s.money -= OFFICE.setup; s.office = true; return { ok: true };
    },
    cancelOffice: function (s) { if (!s.office) return { ok: false, why: 'Kein Büro gemietet.' }; s.office = false; return { ok: true }; },

    // Tage bis zur nächsten Wochenrechnung (Rechnung kommt am Morgen von Tag 8, 15, 22 …)
    daysUntilBill: function (s) { return 7 - ((s.day - 1) % 7); },

    // Skills: Starter-Skills gehören dir von Anfang an
    owns: function (s, id) {
      var k = Tasks.skill(id);
      return !!(k && k.starter) || !!s.skills[id];
    },
    missingSkills: function (s, task) {
      return (task.skills || []).filter(function (id) { return !Economy.owns(s, id); });
    },
    canBuySkill: function (s, id) {
      var k = Tasks.skill(id);
      if (!k || Economy.owns(s, id)) return { ok: false, why: 'schon gekauft' };
      var req = (k.requires || []).filter(function (r) { return !Economy.owns(s, r); });
      if (req.length) return { ok: false, why: 'Zuerst nötig: ' + req.map(function (r) { return Tasks.skill(r).name; }).join(', '), locked: true };
      if (s.money < k.cost) return { ok: false, why: 'Zu wenig Geld (' + k.cost + ' € nötig)', poor: true };
      return { ok: true };
    },
    buySkill: function (s, id) {
      var c = Economy.canBuySkill(s, id);
      if (!c.ok) return c;
      s.skills[id] = true; s.money -= Tasks.skill(id).cost;
      return { ok: true };
    },

    upgradeHome: function (s) {
      var next = HOMES[s.home + 1];
      if (!next) return { ok: false, why: 'Höchste Stufe erreicht' };
      if (s.money < next.price) return { ok: false, why: 'Zu wenig Geld (' + next.price + ' € nötig)', poor: true };
      s.money -= next.price; s.home = next.tier;
      return { ok: true };
    },
    buyCar: function (s, tier) {
      var c = CARS[tier];
      if (!c || tier <= s.car) return { ok: false, why: 'Du hast schon ein gleichwertiges oder besseres Auto' };
      if (s.money < c.price) return { ok: false, why: 'Zu wenig Geld (' + c.price + ' € nötig)', poor: true };
      s.money -= c.price; s.car = tier;
      return { ok: true };
    },

    // Wird von State bei jedem neuen Tag aufgerufen. Meldungen landen in s.events.
    onNewDay: function (s) {
      if (window.Quests && s.pending) Quests.onNewDay(s);
      if (s.day <= 1 || (s.day - 1) % 7 !== 0) return;
      var b = Economy.weeklyBill(s), parts = 'Miete ' + b.rent + ' €, Nebenkosten ' + b.fixed + ' €' + (b.car ? ', Auto ' + b.car + ' €' : '') + (b.office ? ', Büro ' + b.office + ' €' : '');
      if (s.money >= b.total) {
        s.money -= b.total; s.missedRent = 0;
        s.events.push({ kind: 'info', text: 'Wochenrechnung bezahlt: −' + b.total + ' € (' + parts + ').' });
        return;
      }
      s.missedRent += 1; s.rep = Math.max(0, s.rep - 10);
      s.events.push({ kind: 'bad', text: 'Wochenrechnung (' + b.total + ' €) nicht bezahlt: Mahnung, Ruf −10.' });
      if (s.missedRent >= 2) {
        if (s.office) {
          s.office = false; s.missedRent = 0;
          s.events.push({ kind: 'bad', text: 'Du konntest die Rechnung zweimal nicht zahlen: Das Büro wurde gekündigt.' });
        } else if (s.home > 1) {
          s.home -= 1; s.missedRent = 0;
          s.events.push({ kind: 'bad', text: 'Du konntest die Miete zweimal nicht zahlen und musst umziehen: ' + HOMES[s.home].name + '.' });
        } else {
          s.money -= b.total;
          s.events.push({ kind: 'bad', text: 'Der Vermieter bucht ' + b.total + ' € ab. Du hast jetzt Schulden, arbeite sie ab.' });
        }
      }
    }
  };
  window.Economy = Economy;
})();

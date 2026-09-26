// Aufgabentyp "rechnen": Rechenaufgaben aus dem IT-Alltag und der AP2 (Skonto, Break-even, Datenmengen, Subnetting …).
// Jede Aufgabe entsteht aus einem Generator mit festem Startwert, die Zahlen bleiben also stabil. Bewertet wird der Zahlenwert.
// payload: { gen: 'skonto', seed: 1 }
(function () {
  function rngOf(seed) { var s = (seed * 9301 + 49297) % 233280 || 1; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function int(r, a, b, step) { step = step || 1; return a + Math.floor(r() * ((b - a) / step + 1)) * step; }
  function de(n, d) { return Number(n).toLocaleString('de-DE', { minimumFractionDigits: d || 0, maximumFractionDigits: d === undefined ? 2 : d }); }
  function eur(n) { return de(n, 2) + ' €'; }

  // Generator: (r) -> { prompt, unit, answer, decimals, steps: [..], errors: [{ value, hint }] }
  var GENS = {
    skonto: { title: 'Skonto berechnen', difficulty: 1, make: function (r) {
      var b = int(r, 800, 4800, 200), s = pick(r, [2, 3, 1.5, 2.5]), z = b * (1 - s / 100);
      return { prompt: 'Eine Rechnung über ' + eur(b) + ' kann mit ' + de(s) + ' % Skonto bezahlt werden, wenn du innerhalb der Skontofrist überweist. Wie viel Euro überweist du?', unit: '€', answer: z, decimals: 2,
        steps: ['Skontobetrag = ' + de(b) + ' € × ' + de(s) + ' % = ' + eur(b * s / 100), 'Überweisung = ' + eur(b) + ' − ' + eur(b * s / 100) + ' = ' + eur(z)],
        errors: [{ value: b * s / 100, hint: 'Das ist nur der Skontobetrag, nicht die Überweisung.' }, { value: b * (1 + s / 100), hint: 'Skonto verringert den Betrag, es erhöht ihn nicht.' }] };
    } },
    rabatt: { title: 'Einkaufspreis nach Rabatt', difficulty: 1, make: function (r) {
      var lp = int(r, 300, 2400, 50), p = pick(r, [10, 15, 20, 25]), n = int(r, 3, 12), e = lp * (1 - p / 100) * n;
      return { prompt: 'Ein Hersteller gibt ' + de(p) + ' % Rabatt auf den Listenpreis von ' + eur(lp) + ' pro Gerät. Du kaufst ' + n + ' Geräte. Was zahlst du insgesamt?', unit: '€', answer: e, decimals: 2,
        steps: ['Preis je Gerät = ' + eur(lp) + ' × (1 − ' + p + ' %) = ' + eur(lp * (1 - p / 100)), 'Gesamt = ' + n + ' × ' + eur(lp * (1 - p / 100)) + ' = ' + eur(e)],
        errors: [{ value: lp * n, hint: 'Der Rabatt fehlt noch.' }, { value: lp * (1 - p / 100), hint: 'Das ist der Preis für ein Gerät. Multipliziere mit der Stückzahl.' }] };
    } },
    breakeven: { title: 'Break-even-Menge', difficulty: 2, make: function (r) {
      var f = int(r, 6000, 30000, 1000), pr = int(r, 40, 120, 5), v = int(r, 10, pr - 10, 5), m = Math.ceil(f / (pr - v));
      return { prompt: 'Ein Start-up hat monatliche Fixkosten von ' + eur(f) + '. Ein Produkt wird für ' + eur(pr) + ' verkauft, die variablen Kosten betragen ' + eur(v) + ' pro Stück. Ab welcher Stückzahl pro Monat wird Gewinn gemacht (Break-even, aufgerundet)?', unit: 'Stück', answer: m, decimals: 0,
        steps: ['Deckungsbeitrag je Stück = ' + eur(pr) + ' − ' + eur(v) + ' = ' + eur(pr - v), 'Break-even = ' + eur(f) + ' ÷ ' + eur(pr - v) + ' = ' + de(f / (pr - v), 2) + ' → aufgerundet ' + m + ' Stück'],
        errors: [{ value: Math.ceil(f / pr), hint: 'Du hast die variablen Kosten vergessen. Teile durch den Deckungsbeitrag (Preis − variable Kosten).' }] };
    } },
    amortisation: { title: 'Amortisationsdauer', difficulty: 2, make: function (r) {
      var i = int(r, 12000, 90000, 3000), e = int(r, 2000, 9000, 500), k = int(r, 200, 1000, 100), n = e - k;
      return { prompt: 'Eine Serverlösung kostet in der Anschaffung ' + eur(i) + '. Sie spart jährlich ' + eur(e) + ' an Lizenzkosten, verursacht aber ' + eur(k) + ' zusätzliche Betriebskosten pro Jahr. Nach wie vielen Jahren hat sie sich amortisiert (auf zwei Nachkommastellen)?', unit: 'Jahre', answer: i / n, decimals: 2,
        steps: ['Jährlicher Nutzen = ' + eur(e) + ' − ' + eur(k) + ' = ' + eur(n), 'Amortisationsdauer = ' + eur(i) + ' ÷ ' + eur(n) + ' = ' + de(i / n, 2) + ' Jahre'],
        errors: [{ value: i / e, hint: 'Die zusätzlichen Betriebskosten mindern den jährlichen Nutzen.' }] };
    } },
    uebertragung: { title: 'Übertragungsdauer', difficulty: 2, make: function (r) {
      var mb = int(r, 200, 4000, 100), mbit = pick(r, [50, 100, 200, 500]), s = mb * 8 / mbit;
      return { prompt: 'Eine Datei mit ' + de(mb) + ' MB (Megabyte) wird über eine Leitung mit ' + mbit + ' Mbit/s übertragen. Wie viele Sekunden dauert das, wenn die Leitung voll ausgelastet ist? (1 Byte = 8 Bit, 1 MB = 1 Mio. Byte)', unit: 's', answer: s, decimals: 1,
        steps: [de(mb) + ' MB × 8 = ' + de(mb * 8) + ' Mbit', de(mb * 8) + ' Mbit ÷ ' + mbit + ' Mbit/s = ' + de(s, 1) + ' s'],
        errors: [{ value: mb / mbit, hint: 'Byte und Bit verwechselt: 1 Byte sind 8 Bit, also mit 8 multiplizieren.' }] };
    } },
    bildspeicher: { title: 'Speicherbedarf eines Bildes', difficulty: 2, make: function (r) {
      var w = pick(r, [1920, 2560, 3840]), h = w === 1920 ? 1080 : w === 2560 ? 1440 : 2160, bit = pick(r, [8, 16, 24, 32]), mib = w * h * bit / 8 / 1024 / 1024;
      return { prompt: 'Ein unkomprimiertes Bild hat ' + w + ' × ' + h + ' Pixel und eine Farbtiefe von ' + bit + ' Bit pro Pixel. Wie groß ist es in MiB (1 MiB = 1.024 × 1.024 Byte, auf zwei Nachkommastellen)?', unit: 'MiB', answer: mib, decimals: 2,
        steps: [de(w) + ' × ' + de(h) + ' = ' + de(w * h) + ' Pixel', de(w * h) + ' × ' + bit + ' Bit = ' + de(w * h * bit) + ' Bit = ' + de(w * h * bit / 8) + ' Byte', de(w * h * bit / 8) + ' Byte ÷ 1.048.576 = ' + de(mib, 2) + ' MiB'],
        errors: [{ value: w * h * bit / 1024 / 1024, hint: 'Ein Byte hat 8 Bit. Teile die Bitzahl durch 8.' }] };
    } },
    subnetz: { title: 'Hosts im Subnetz', difficulty: 2, make: function (r) {
      var p = int(r, 22, 29), h = Math.pow(2, 32 - p) - 2;
      return { prompt: 'Ein IPv4-Netz hat die Präfixlänge /' + p + '. Wie viele Geräte (Hosts) können darin adressiert werden?', unit: 'Hosts', answer: h, decimals: 0,
        steps: ['Hostbits = 32 − ' + p + ' = ' + (32 - p), 'Adressen = 2^' + (32 - p) + ' = ' + de(h + 2), 'Nutzbare Hosts = ' + de(h + 2) + ' − 2 (Netz- und Broadcastadresse) = ' + de(h)],
        errors: [{ value: h + 2, hint: 'Netzadresse und Broadcastadresse sind nicht als Host nutzbar: zwei abziehen.' }] };
    } },
    raid: { title: 'Nutzbare RAID-Kapazität', difficulty: 2, make: function (r) {
      var n = int(r, 4, 8), c = pick(r, [2, 4, 6, 8]), lvl = pick(r, [5, 6, 10]), u = lvl === 5 ? (n - 1) * c : lvl === 6 ? (n - 2) * c : n * c / 2;
      if (lvl === 10 && n % 2) n += 1, u = n * c / 2;
      return { prompt: 'Ein Server nutzt ' + n + ' Festplatten mit je ' + c + ' TB in einem RAID ' + lvl + '. Wie viel TB stehen nutzbar zur Verfügung?', unit: 'TB', answer: u, decimals: 0,
        steps: [lvl === 5 ? 'RAID 5: eine Platte für Parität: (' + n + ' − 1) × ' + c + ' TB = ' + u + ' TB' : lvl === 6 ? 'RAID 6: zwei Platten für Parität: (' + n + ' − 2) × ' + c + ' TB = ' + u + ' TB' : 'RAID 10: die Hälfte ist gespiegelt: ' + n + ' × ' + c + ' TB ÷ 2 = ' + u + ' TB'],
        errors: [{ value: n * c, hint: 'Ein Teil der Kapazität geht für Parität oder Spiegelung verloren.' }] };
    } },
    verfuegbarkeit: { title: 'Verfügbarkeit', difficulty: 2, make: function (r) {
      var a = int(r, 2, 40), t = 8760, v = (t - a) / t * 100;
      return { prompt: 'Ein Dienst war im Jahr (8.760 Stunden) insgesamt ' + a + ' Stunden ausgefallen. Wie hoch ist die Verfügbarkeit in Prozent (auf drei Nachkommastellen)?', unit: '%', answer: v, decimals: 3,
        steps: ['Verfügbare Zeit = 8.760 h − ' + a + ' h = ' + de(t - a) + ' h', 'Verfügbarkeit = ' + de(t - a) + ' ÷ 8.760 × 100 = ' + de(v, 3) + ' %'],
        errors: [{ value: a / t * 100, hint: 'Das ist die Ausfallquote. Gefragt ist die Verfügbarkeit, also der Rest bis 100 %.' }] };
    } },
    energie: { title: 'Stromkosten', difficulty: 1, make: function (r) {
      var w = pick(r, [150, 250, 400, 600]), h = pick(r, [8, 10, 24]), d = pick(r, [30, 100, 365]), p = pick(r, [0.30, 0.35, 0.40]), k = w / 1000 * h * d * p;
      return { prompt: 'Ein Server nimmt ' + w + ' W auf und läuft ' + h + ' Stunden pro Tag an ' + d + ' Tagen. Eine Kilowattstunde kostet ' + de(p, 2) + ' €. Wie hoch sind die Stromkosten?', unit: '€', answer: k, decimals: 2,
        steps: ['Energie = ' + de(w / 1000, 3) + ' kW × ' + h + ' h × ' + d + ' Tage = ' + de(w / 1000 * h * d, 2) + ' kWh', 'Kosten = ' + de(w / 1000 * h * d, 2) + ' kWh × ' + de(p, 2) + ' € = ' + eur(k)],
        errors: [{ value: w * h * d * p, hint: 'Watt sind noch nicht in Kilowatt umgerechnet (durch 1.000).' }] };
    } },
    stundensatz: { title: 'Stundensatz', difficulty: 2, make: function (r) {
      var g = int(r, 42000, 78000, 2000), gk = pick(r, [20, 25, 30]), st = int(r, 1500, 1800, 50), z = Math.round(g * (1 + gk / 100)), s = z / st;
      return { prompt: 'Ein Mitarbeiter kostet ' + eur(g) + ' Bruttojahresgehalt. Dazu kommen ' + gk + ' % Lohnnebenkosten. Er arbeitet im Jahr ' + de(st) + ' produktive Stunden. Wie hoch ist der Stundensatz (auf zwei Nachkommastellen)?', unit: '€/h', answer: z / st, decimals: 2,
        steps: ['Jahreskosten = ' + eur(g) + ' × ' + de(1 + gk / 100, 2) + ' = ' + eur(z), 'Stundensatz = ' + eur(z) + ' ÷ ' + de(st) + ' h = ' + eur(s)],
        errors: [{ value: g / st, hint: 'Die Lohnnebenkosten gehören zu den Kosten des Arbeitgebers.' }] };
    } },
    zinsen: { title: 'Zinsen berechnen', difficulty: 1, make: function (r) {
      var k = int(r, 2000, 20000, 1000), p = pick(r, [2, 3, 3.5, 4.5]), t = pick(r, [90, 180, 270]), z = k * p / 100 * t / 360;
      return { prompt: 'Ein Kredit über ' + eur(k) + ' wird für ' + t + ' Tage zu ' + de(p) + ' % Jahreszins aufgenommen (Zinsjahr = 360 Tage). Wie hoch sind die Zinsen?', unit: '€', answer: z, decimals: 2,
        steps: ['Zinsen = Kapital × Zinssatz × Tage ÷ 360', eur(k) + ' × ' + de(p) + ' % × ' + t + ' ÷ 360 = ' + eur(z)],
        errors: [{ value: k * p / 100, hint: 'Das wären die Zinsen für ein ganzes Jahr, nicht für ' + t + ' Tage.' }] };
    } },
    nutzwert: { title: 'Nutzwertanalyse', difficulty: 3, make: function (r) {
      var w = [int(r, 2, 5), int(r, 2, 5), int(r, 1, 4)], sc = [int(r, 1, 5), int(r, 1, 5), int(r, 1, 5)], sum = w[0] + w[1] + w[2], nw = w[0] * sc[0] + w[1] * sc[1] + w[2] * sc[2];
      return { prompt: 'Ein Angebot wird bewertet: Preis (Gewicht ' + w[0] + ', Note ' + sc[0] + '), Support (Gewicht ' + w[1] + ', Note ' + sc[1] + '), Leistung (Gewicht ' + w[2] + ', Note ' + sc[2] + '). Noten von 1 (schlecht) bis 5 (sehr gut). Wie hoch ist der Gesamtnutzwert (Summe aus Gewicht × Note)?', unit: 'Punkte', answer: nw, decimals: 0,
        steps: [w[0] + ' × ' + sc[0] + ' = ' + w[0] * sc[0], w[1] + ' × ' + sc[1] + ' = ' + w[1] * sc[1], w[2] + ' × ' + sc[2] + ' = ' + w[2] * sc[2], 'Summe = ' + nw + ' Punkte'],
        errors: [{ value: sc[0] + sc[1] + sc[2], hint: 'Die Gewichte fehlen: erst Gewicht × Note, dann addieren.' }] };
    } },
    mittelwert: { title: 'Mittelwert und Spannweite', difficulty: 1, make: function (r) {
      var v = [int(r, 10, 60), int(r, 10, 60), int(r, 10, 60), int(r, 10, 60), int(r, 10, 60)], s = v.reduce(function (a, b) { return a + b; }, 0);
      return { prompt: 'Die Antwortzeiten einer Anwendung (in ms) lauten: ' + v.join(', ') + '. Wie groß ist der Mittelwert (auf eine Nachkommastelle)?', unit: 'ms', answer: s / 5, decimals: 1,
        steps: ['Summe = ' + v.join(' + ') + ' = ' + s, 'Mittelwert = ' + s + ' ÷ 5 = ' + de(s / 5, 1) + ' ms'],
        errors: [{ value: s, hint: 'Die Summe muss noch durch die Anzahl der Werte geteilt werden.' }] };
    } },
    leasing: { title: 'Kaufen oder leasen?', difficulty: 3, make: function (r) {
      var kauf = int(r, 6000, 15000, 500), rest = int(r, 500, 2500, 250), rate = int(r, 150, 350, 10), n = pick(r, [24, 36, 48]), diff = (rate * n) - (kauf - rest);
      return { prompt: 'Ein Notebook-Set kann für ' + eur(kauf) + ' gekauft werden (nach ' + n / 12 + ' Jahren Restwert ' + eur(rest) + '). Alternativ wird es für ' + eur(rate) + ' im Monat über ' + n + ' Monate geleast. Wie viel Euro kostet Leasing insgesamt MEHR als Kaufen (negativ, wenn Leasing günstiger ist)?', unit: '€', answer: diff, decimals: 0,
        steps: ['Leasing gesamt = ' + eur(rate) + ' × ' + n + ' = ' + eur(rate * n), 'Kauf netto = ' + eur(kauf) + ' − ' + eur(rest) + ' = ' + eur(kauf - rest), 'Unterschied = ' + eur(rate * n) + ' − ' + eur(kauf - rest) + ' = ' + eur(diff)],
        errors: [{ value: rate * n - kauf, hint: 'Der Restwert des gekauften Geräts ist noch nicht berücksichtigt.' }] };
    } }
  };

  var SKILLS = [];   // Rechnen braucht keine Skills, jeder darf üben

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function gen(t) { return GENS[t.payload.gen].make(rngOf(t.payload.seed * 131 + t.payload.gen.length * 17)); }
  // Zahl lesen: Komma oder Punkt als Dezimalzeichen. Bei Mehrdeutigkeit ("99.909") gelten beide Lesarten.
  function parse(v) {
    var s = String(v).trim().replace(/\s|€|%/g, ''), out = [];
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) out.push(Number(s.replace(/\./g, '').replace(',', '.')));   // deutsch mit Tausenderpunkten
    if (/^-?\d+(\.\d+)?$/.test(s)) out.push(Number(s));                                                        // englisch
    if (/^-?\d+,\d+$/.test(s)) out.push(Number(s.replace(',', '.')));                                         // deutsch
    return out.filter(function (n) { return isFinite(n); });
  }

  Tasks.registerType({
    id: 'rechnen',
    init: function () { return Promise.resolve(); },
    // 4 Varianten je Generator, mit stabilen Zahlen
    tasks: function () {
      var out = [];
      Object.keys(GENS).forEach(function (g) {
        for (var i = 1; i <= 4; i++) {
          var t = { id: 'rechnen-' + g + '-' + i, type: 'rechnen', topic: 'rechnen', subtopic: 'Rechenwerkstatt', title: GENS[g].title + (i > 1 ? ' (' + i + ')' : ''), difficulty: GENS[g].difficulty, prompt: '', payload: { gen: g, seed: i } };
          t.prompt = gen(t).prompt; out.push(t);
        }
      });
      return out;
    },
    skills: function () { return SKILLS; },
    validate: function (t) { return GENS[t.payload.gen] ? [] : ['Unbekannter Generator: ' + t.payload.gen]; },
    render: function (t, ctx) {
      var g = gen(t), inp = el('input', { type: 'text', inputmode: 'decimal', class: 'book-search', style: 'max-width:220px', placeholder: 'Ergebnis', 'aria-label': 'Ergebnis in ' + g.unit });
      inp.value = ctx.draft || ''; inp.addEventListener('input', function () { ctx.setDraft(inp.value); });
      return { node: el('div', {}, [el('p', { class: 'sub' }, ['Rechne selbst (Taschenrechner erlaubt). Nachkommastellen mit Komma oder Punkt. Gerundet auf ' + g.decimals + ' Stelle(n).']), el('div', { class: 'row' }, [inp, el('b', {}, [g.unit])])]), getAnswer: function () { return inp.value; } };
    },
    grade: function (t, answer) {
      if (!String(answer).trim()) return { ok: false, hint: 'Gib zuerst dein Ergebnis ein.', empty: true };
      var g = gen(t), vals = parse(answer);
      if (!vals.length) return { ok: false, hint: 'Das ist keine Zahl. Beispiel: 1234,56' };
      var tol = Math.max(Math.pow(10, -g.decimals) / 2 + 1e-9, Math.abs(g.answer) * 0.0005);
      if (vals.some(function (v) { return Math.abs(v - g.answer) <= tol; })) return { ok: true };
      for (var i = 0; i < (g.errors || []).length; i++) if (vals.some(function (v) { return Math.abs(v - g.errors[i].value) <= Math.max(0.01, Math.abs(g.errors[i].value) * 0.001); })) return { ok: false, hint: g.errors[i].hint };
      return { ok: false, hint: 'Das Ergebnis stimmt nicht. Prüfe Einheiten und Rechenschritte.' };
    },
    solutionText: function (t) { var g = gen(t); return 'Ergebnis: ' + de(g.answer, g.decimals) + ' ' + g.unit + '\n\nRechenweg:\n' + g.steps.map(function (s) { return '• ' + s; }).join('\n'); }
  });
})();

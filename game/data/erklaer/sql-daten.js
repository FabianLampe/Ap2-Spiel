// Beispieldaten für alle SQL-Erklärfilme (ein gemeinsamer Datensatz, damit man sich nicht jedes Mal neu eindenken muss)
// und kleine Helfer für die Drehbücher in sql-1.js … sql-3.js.
(function () {
  Erklaer.dataset('sql', {
    keys: { kunden: 'id', auftraege: 'id', interessenten: 'id' },
    ddl: [
      'CREATE TABLE kunden (id INTEGER PRIMARY KEY, name VARCHAR(40), stadt VARCHAR(30), branche VARCHAR(30));',
      "INSERT INTO kunden VALUES (1,'Café Bohne','Köln','Gastro'),(2,'Autohaus Rost','Bonn','Handel'),(3,'Kanzlei Blattner','Köln','Recht'),",
      "  (4,'Bäckerei Korn','Düsseldorf','Gastro'),(5,'Startup Lennox','Köln','IT'),(6,'Praxis Weiß','Bonn','Gesundheit');",
      'CREATE TABLE auftraege (id INTEGER PRIMARY KEY, kunde_id INT REFERENCES kunden(id), titel VARCHAR(40), betrag INT, datum DATE, status VARCHAR(10));',
      "INSERT INTO auftraege VALUES (101,1,'Kassensystem',1200,'2026-01-12','bezahlt'),(102,2,'Webshop',3400,'2026-02-03','bezahlt'),",
      "  (103,1,'WLAN-Ausbau',450,'2026-02-20','offen'),(104,3,'Backup',800,'2026-03-05','bezahlt'),(105,5,'Server',2500,'2026-03-18','offen'),",
      "  (106,2,'Datenbank',1800,'2026-04-02','bezahlt'),(107,4,'Website',950,'2026-04-15','offen'),(108,5,'Firewall',1300,'2026-05-09','bezahlt'),",
      "  (109,1,'Schulung',300,'2026-05-21','bezahlt'),(110,3,'Beratung',NULL,'2026-06-02','offen');",
      'CREATE TABLE interessenten (id INTEGER PRIMARY KEY, name VARCHAR(40), stadt VARCHAR(30));',
      "INSERT INTO interessenten VALUES (1,'Hotel Rhein','Köln'),(2,'Bäckerei Korn','Düsseldorf'),(3,'Kiosk Eck','Bonn'),(4,'Startup Lennox','Köln');",
      ''
    ].join('\n')
  });

  // Titel → Auftrags-id und Name → Kunden-id: damit Ergebniszeilen von ihrer Quellzeile aus losfliegen
  var T = { 'Kassensystem': 101, 'Webshop': 102, 'WLAN-Ausbau': 103, 'Backup': 104, 'Server': 105, 'Datenbank': 106, 'Website': 107, 'Firewall': 108, 'Schulung': 109, 'Beratung': 110 };
  var N = { 'Café Bohne': 1, 'Autohaus Rost': 2, 'Kanzlei Blattner': 3, 'Bäckerei Korn': 4, 'Startup Lennox': 5, 'Praxis Weiß': 6 };
  var FIRST = { 1: 101, 2: 102, 3: 104, 4: 107, 5: 105 };   // erster Auftrag je Kunde

  function mini(head, rows, cls) {   // kleine Tabelle als Grafik (HTML)
    return '<table class="xp-mini ' + (cls || '') + '"><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }

  window.ErklaerSQL = {
    T: T, N: N,
    // Zeilen-Schlüssel
    auftrag: function (r) { return 'auftraege:' + (r.id !== undefined ? r.id : T[r.titel]); },
    kunde: function (r) { return 'kunden:' + (N[r.name] || r.id); },
    ersterAuftrag: function (r) { return 'auftraege:' + FIRST[r.kunde_id]; },
    // Farbe je Kunde (g1 … g6)
    farbe: function (id) { return id ? 'g' + id : ''; },
    // Zeilen einer Tabelle hervorheben: nur(t, test) -> 'hit', Rest 'miss'
    filter: function (t, test) { return function (r, tt) { return tt === t ? (test(r) ? 'hit' : 'miss') : ''; }; },
    nur: function (t, test, cls) { return function (r, tt) { return tt === t && test(r) ? (cls || 'hit') : ''; }; },
    mini: mini
  };
})();

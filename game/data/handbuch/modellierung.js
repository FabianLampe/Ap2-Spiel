window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.handbuch = (GAME_DATA.handbuch || []).concat([
  { id: 'er-modell', bereich: 'Datenbankdesign', title: 'ER-Modell', entries: [
    { id: 'er-entitaet', title: 'Entität und Entitätstyp', keywords: ['entität', 'entitaet', 'entitätstyp', 'objekt', 'er-modell'],
      kurz: 'Eine Entität ist ein eindeutig unterscheidbares Objekt der realen Welt, das in der Datenbank gespeichert werden soll.',
      erklaerung: [
        'Ein Entitätstyp fasst gleichartige Entitäten zusammen, zum Beispiel der Typ KUNDE mit den Entitäten „Meier“ und „Schulz“. Im ER-Diagramm wird der Typ als Rechteck mit dem Namen (meist Singular) gezeichnet.',
        'Später wird jeder Entitätstyp in der Regel zu einer Tabelle, jede einzelne Entität zu einer Zeile (Datensatz).'
      ],
      stolperfallen: ['Entität und Entitätstyp werden im Alltag oft vermischt. In Prüfungsaufgaben ist mit „Entität“ im Diagramm meist der Typ gemeint.'],
      siehe: ['er-attribut', 'er-beziehung'] },
    { id: 'er-attribut', title: 'Attribut', keywords: ['attribut', 'eigenschaft', 'schlüsselattribut', 'merkmal'],
      kurz: 'Ein Attribut beschreibt eine Eigenschaft eines Entitätstyps, etwa Name, Preis oder Geburtsdatum.',
      erklaerung: [
        'Ein Schlüsselattribut identifiziert jede Entität eindeutig und wird im Diagramm unterstrichen. Weitere Attribute beschreiben die Entität, ohne sie zu identifizieren.',
        'Mehrwertige Attribute (z. B. mehrere Telefonnummern) und zusammengesetzte Attribute (z. B. Adresse aus Straße, PLZ, Ort) sind im ER-Modell erlaubt, müssen aber beim Übersetzen in Relationen aufgelöst werden.'
      ],
      siehe: ['er-entitaet', 'er-primaerschluessel'] },
    { id: 'er-beziehung', title: 'Beziehung (Relationship)', keywords: ['beziehung', 'relationship', 'relationshiptyp', 'assoziation'],
      kurz: 'Eine Beziehung verbindet Entitätstypen miteinander, zum Beispiel „Kunde bestellt Artikel“.',
      erklaerung: [
        'In der Chen-Notation wird die Beziehung als Raute mit einem Verb dargestellt und mit Linien an die Entitätstypen angeschlossen. Eine Beziehung kann eigene Attribute haben, z. B. die Menge bei „bestellt“.',
        'Wichtig ist immer die Kardinalität: Wie viele Entitäten der einen Seite können mit wie vielen der anderen Seite verbunden sein.'
      ],
      siehe: ['er-kardinalitaet', 'er-chen-kraehenfuss'] },
    { id: 'er-kardinalitaet', title: 'Kardinalitäten 1:1, 1:n, n:m', keywords: ['kardinalität', 'kardinalitaet', '1:n', 'n:m', '1:1', 'cardinality'],
      kurz: 'Die Kardinalität gibt an, mit wie vielen Entitäten des anderen Typs eine Entität in Beziehung stehen kann.',
      erklaerung: [
        '1:1 – eine Entität ist mit höchstens einer anderen verbunden (Mitarbeiter hat einen Dienstwagen). 1:n – eine Entität der Seite 1 hat mehrere der Seite n, aber jede n-Entität nur eine 1-Entität (Abteilung hat viele Mitarbeiter). n:m – beide Seiten können mehrere Partner haben (Schüler belegen Kurse).',
        'Die Kardinalität bestimmt, wie die Beziehung später in Tabellen umgesetzt wird.'
      ],
      stolperfallen: ['Die Kardinalität wird von der Seite aus gelesen, die man betrachtet. Bei „Abteilung 1 : n Mitarbeiter“ steht die n an der Seite Mitarbeiter.'],
      siehe: ['er-min-max', 'er-uebersetzung-1n', 'er-uebersetzung-nm'] },
    { id: 'er-min-max', title: '(min,max)-Notation', keywords: ['min-max', 'min,max', '(min,max)', 'optional', 'mussbeziehung', 'kannbeziehung'],
      kurz: 'Die (min,max)-Notation gibt pro Seite die kleinste und größte Anzahl der Beziehungen an, an denen eine Entität teilnimmt.',
      erklaerung: [
        'Beispiel: Zwischen KUNDE und BESTELLUNG steht an KUNDE (0,n) und an BESTELLUNG (1,1). Das heißt: Ein Kunde hat null bis beliebig viele Bestellungen, eine Bestellung gehört zu genau einem Kunden.',
        'min = 0 bedeutet optionale Teilnahme (Kann-Beziehung), min = 1 bedeutet Pflicht (Muss-Beziehung). Die Angabe ist genauer als 1:n, weil sie auch die Pflicht ausdrückt. Achtung: Bei (min,max) steht die Angabe an der Seite der Entität, deren Teilnahme beschrieben wird.'
      ],
      stolperfallen: ['Bei der einfachen 1:n-Notation und bei (min,max) sind die Leserichtungen entgegengesetzt. Bei Aufgaben genau auf die Legende achten.'],
      siehe: ['er-kardinalitaet'] },
    { id: 'er-chen-kraehenfuss', title: 'Chen- und Krähenfuß-Notation', keywords: ['chen', 'krähenfuß', 'kraehenfuss', 'crow', 'notation', 'erd'],
      kurz: 'Zwei verbreitete Zeichenweisen für ER-Diagramme: Chen mit Rauten, Krähenfuß mit Linienenden.',
      erklaerung: [
        'Chen-Notation: Entitätstypen als Rechtecke, Beziehungen als Rauten, Attribute als Ovale, Kardinalitäten als Zahlen (1, n, m) an den Linien.',
        'Krähenfuß-Notation (Crow’s Foot): Es gibt keine Raute. Die Beziehung ist eine beschriftete Linie, die Kardinalität wird durch das Linienende gezeigt: ein Strich für „genau eins“, ein Kreis für „null“, eine gespaltene Gabel (Krähenfuß) für „viele“. Entitäten werden oft als Tabelle mit Attributen gezeichnet.',
        'Fachlich sagen beide dasselbe aus. Im Abschlussprojekt und in Prüfungen wird die Notation meist vorgegeben.'
      ],
      siehe: ['er-beziehung', 'er-min-max'] },
    { id: 'er-schwache-entitaet', title: 'Starke und schwache Entität', keywords: ['schwache entität', 'existenzabhängig', 'weak entity', 'identifizierend'],
      kurz: 'Eine schwache Entität ist ohne eine andere (starke) Entität nicht identifizierbar, z. B. Bestellposition ohne Bestellung.',
      erklaerung: [
        'Ihr Schlüssel setzt sich aus dem Schlüssel der starken Entität und einem eigenen Teilschlüssel zusammen, z. B. (BestellNr, PositionsNr). In der Relation ist der Fremdschlüssel daher Teil des Primärschlüssels.',
        'Wird die starke Entität gelöscht, verschwinden auch die abhängigen schwachen Entitäten, in SQL meist per ON DELETE CASCADE.'
      ],
      siehe: ['er-primaerschluessel', 'er-fremdschluessel'] }
  ] },

  { id: 'er-relationenmodell', bereich: 'Datenbankdesign', title: 'Relationenmodell und Übersetzung', entries: [
    { id: 'er-tabelle', title: 'Relation (Tabelle)', keywords: ['tabelle', 'relation', 'relationenmodell', 'zeile', 'spalte', 'tupel'],
      kurz: 'Im relationalen Modell werden Daten in Tabellen mit Spalten (Attributen) und Zeilen (Datensätzen, Tupeln) abgelegt.',
      syntax: 'Kunde(KundenNr, Name, Ort)',
      erklaerung: [
        'Die Kurzschreibweise nennt den Tabellennamen und in Klammern die Attribute. Üblich: Primärschlüssel unterstreichen, Fremdschlüssel mit # oder Pfeil kennzeichnen (in reinem Text oft in Großbuchstaben oder mit „FK“).',
        'Jede Zeile beschreibt genau eine Entität, jede Spalte hat einen festen Datentyp. Die Reihenfolge der Zeilen ist ohne ORDER BY nicht festgelegt.'
      ],
      siehe: ['er-primaerschluessel', 'er-fremdschluessel'] },
    { id: 'er-primaerschluessel', title: 'Primärschlüssel', keywords: ['primärschlüssel', 'primary key', 'pk', 'schlüssel', 'primaerschluessel'],
      kurz: 'Der Primärschlüssel identifiziert jede Zeile einer Tabelle eindeutig und darf nie NULL sein.',
      syntax: 'CREATE TABLE kunde (\n  kunden_nr INT PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);',
      erklaerung: [
        'Er kann aus einem Attribut oder mehreren Attributen (zusammengesetzter Schlüssel) bestehen. Er muss eindeutig und minimal sein: Es darf kein Attribut weglassbar sein, ohne die Eindeutigkeit zu verlieren.',
        'Gibt es mehrere Kandidaten (Kandidatenschlüssel), wird einer als Primärschlüssel gewählt, die anderen können mit UNIQUE abgesichert werden.'
      ],
      siehe: ['er-schluesselarten', 'er-fremdschluessel'] },
    { id: 'er-schluesselarten', title: 'Natürlicher Schlüssel und Ersatzschlüssel', keywords: ['natürlicher schlüssel', 'ersatzschlüssel', 'surrogatschlüssel', 'surrogate key', 'auto_increment', 'künstlicher schlüssel'],
      kurz: 'Ein natürlicher Schlüssel stammt aus den Fachdaten, ein Ersatzschlüssel (Surrogat) wird künstlich, meist als Zähler, vergeben.',
      erklaerung: [
        'Natürliche Schlüssel sind z. B. ISBN oder Kfz-Kennzeichen. Sie können sich ändern, sind manchmal doch nicht eindeutig oder sind lang und zusammengesetzt.',
        'Ersatzschlüssel wie eine fortlaufende ID (AUTO_INCREMENT, IDENTITY, SERIAL) sind kurz, stabil und ohne fachliche Bedeutung. Sie sind heute der Normalfall, die fachliche Eindeutigkeit sichert man zusätzlich mit UNIQUE.'
      ],
      beispiel: [{ code: 'CREATE TABLE buch (\n  buch_id INT AUTO_INCREMENT PRIMARY KEY,\n  isbn CHAR(13) NOT NULL UNIQUE,\n  titel VARCHAR(200) NOT NULL\n);', hinweis: 'MySQL/MariaDB: buch_id ist der Ersatzschlüssel, die ISBN bleibt eindeutig.' }],
      siehe: ['er-primaerschluessel'] },
    { id: 'er-fremdschluessel', title: 'Fremdschlüssel', keywords: ['fremdschlüssel', 'foreign key', 'fk', 'referenz', 'fremdschluessel'],
      kurz: 'Ein Fremdschlüssel verweist auf den Primärschlüssel einer anderen (oder derselben) Tabelle und stellt die Beziehung her.',
      syntax: 'FOREIGN KEY (spalte) REFERENCES zieltabelle (zielspalte)',
      erklaerung: [
        'Er darf nur Werte enthalten, die in der Zieltabelle als Primärschlüssel vorkommen, oder NULL (falls erlaubt). Das DBMS erzwingt diese referentielle Integrität.',
        'Mit ON DELETE / ON UPDATE legt man fest, was bei Änderungen in der Elterntabelle passiert: RESTRICT (verbieten), CASCADE (mitändern/-löschen), SET NULL.'
      ],
      beispiel: [{ code: 'CREATE TABLE bestellung (\n  bestell_nr INT PRIMARY KEY,\n  kunden_nr INT NOT NULL,\n  FOREIGN KEY (kunden_nr) REFERENCES kunde (kunden_nr)\n);' }],
      siehe: ['er-referentielle-integritaet', 'er-uebersetzung-1n'] },
    { id: 'er-uebersetzung-1n', title: 'Übersetzung einer 1:n-Beziehung', keywords: ['1:n', 'übersetzung', 'er in relationen', 'fremdschlüssel auf n-seite'],
      kurz: 'Bei 1:n kommt der Fremdschlüssel in die Tabelle der n-Seite und verweist auf den Primärschlüssel der 1-Seite.',
      erklaerung: [
        'Jeder Entitätstyp wird zunächst zu einer eigenen Tabelle. Dann wird der Primärschlüssel der 1-Seite als Fremdschlüssel in die n-Seite übernommen. Eigene Attribute der Beziehung wandern ebenfalls in die n-Tabelle.',
        'Ist min = 1 auf der n-Seite (jeder Mitarbeiter muss in einer Abteilung sein), wird der Fremdschlüssel NOT NULL. Bei min = 0 ist NULL erlaubt.'
      ],
      beispiel: [{ code: 'Abteilung(AbtNr, Bezeichnung)\nMitarbeiter(MaNr, Name, #AbtNr)', hinweis: 'Abteilung 1 : n Mitarbeiter' }],
      siehe: ['er-fremdschluessel', 'er-uebersetzung-nm', 'er-uebersetzung-11'] },
    { id: 'er-uebersetzung-nm', title: 'Übersetzung einer n:m-Beziehung', keywords: ['n:m', 'zwischentabelle', 'verbindungstabelle', 'kreuztabelle', 'assoziationstabelle'],
      kurz: 'Eine n:m-Beziehung wird durch eine eigene Zwischentabelle mit den Fremdschlüsseln beider Seiten aufgelöst.',
      erklaerung: [
        'Die Zwischentabelle enthält die Primärschlüssel beider Tabellen als Fremdschlüssel. Ihr Primärschlüssel ist meist die Kombination beider. Attribute der Beziehung (Menge, Datum) stehen ebenfalls dort.',
        'Damit wird aus einer n:m-Beziehung zwei 1:n-Beziehungen.'
      ],
      beispiel: [{ code: 'Artikel(ArtNr, Bezeichnung)\nBestellung(BestellNr, Datum)\nBestellposition(#BestellNr, #ArtNr, Menge)', hinweis: 'Primärschlüssel von Bestellposition: (BestellNr, ArtNr)' },
        { code: 'CREATE TABLE bestellposition (\n  bestell_nr INT,\n  art_nr INT,\n  menge INT NOT NULL,\n  PRIMARY KEY (bestell_nr, art_nr),\n  FOREIGN KEY (bestell_nr) REFERENCES bestellung (bestell_nr),\n  FOREIGN KEY (art_nr) REFERENCES artikel (art_nr)\n);' }],
      siehe: ['er-uebersetzung-1n', 'er-fremdschluessel'] },
    { id: 'er-uebersetzung-11', title: 'Übersetzung einer 1:1-Beziehung', keywords: ['1:1', 'eins zu eins', 'übersetzung'],
      kurz: 'Bei 1:1 genügt ein Fremdschlüssel in einer der beiden Tabellen, gesichert durch UNIQUE, oder man fasst beide Tabellen zusammen.',
      erklaerung: [
        'Den Fremdschlüssel legt man dorthin, wo die Teilnahme verpflichtend ist (min = 1), damit er NOT NULL sein kann. Das UNIQUE sorgt dafür, dass er wirklich nur einmal vorkommt.',
        'Wenn beide Seiten immer zusammengehören und zusammen genutzt werden, kann man beide Entitätstypen zu einer Tabelle verschmelzen.'
      ],
      beispiel: [{ code: 'CREATE TABLE dienstwagen (\n  wagen_id INT PRIMARY KEY,\n  kennzeichen VARCHAR(12) NOT NULL,\n  ma_nr INT UNIQUE,\n  FOREIGN KEY (ma_nr) REFERENCES mitarbeiter (ma_nr)\n);' }],
      siehe: ['er-uebersetzung-1n'] }
  ] },

  { id: 'norm-normalisierung', bereich: 'Datenbankdesign', title: 'Normalisierung', entries: [
    { id: 'norm-redundanz', title: 'Redundanz', keywords: ['redundanz', 'doppelte daten', 'wiederholung'],
      kurz: 'Redundanz bedeutet, dass dieselbe Information mehrfach gespeichert wird; sie kostet Platz und führt zu Inkonsistenzen.',
      erklaerung: [
        'Steht in einer Bestelltabelle bei jeder Zeile Name und Adresse des Kunden, ist das redundant. Ändert sich die Adresse, muss sie an vielen Stellen geändert werden.',
        'Ziel der Normalisierung ist es, unnötige Redundanz zu vermeiden. Kontrollierte Redundanz (z. B. Denormalisierung aus Performancegründen) ist möglich, muss aber bewusst gepflegt werden.'
      ],
      siehe: ['norm-anomalien', 'norm-vorgehen'] },
    { id: 'norm-anomalien', title: 'Anomalien (Einfüge-, Änderungs-, Löschanomalie)', keywords: ['anomalie', 'einfügeanomalie', 'änderungsanomalie', 'löschanomalie', 'update anomalie'],
      kurz: 'Anomalien sind Fehler und Widersprüche, die durch Redundanz beim Einfügen, Ändern oder Löschen von Daten entstehen.',
      erklaerung: [
        'Einfügeanomalie: Ein neuer Datensatz kann nicht angelegt werden, ohne unbekannte oder unsinnige Daten mitzuliefern (z. B. ein Kurs kann nicht gespeichert werden, solange kein Teilnehmer existiert).',
        'Änderungsanomalie: Wird ein redundant gespeicherter Wert nur an einer Stelle geändert, widersprechen sich die Daten.',
        'Löschanomalie: Beim Löschen eines Datensatzes gehen ungewollt weitere Informationen verloren (wird der letzte Teilnehmer gelöscht, verschwindet auch der Kurs).'
      ],
      siehe: ['norm-redundanz', 'norm-3nf'] },
    { id: 'norm-funktionale-abhaengigkeit', title: 'Funktionale Abhängigkeit', keywords: ['funktionale abhängigkeit', 'abhängigkeit', 'transitive abhängigkeit', 'partielle abhängigkeit', 'determiniert'],
      kurz: 'B ist funktional abhängig von A (A → B), wenn zu jedem Wert von A genau ein Wert von B gehört.',
      erklaerung: [
        'Beispiel: PLZ → Ort, KundenNr → Name. Die Schreibweise A → B heißt „A bestimmt B“. Schlüssel bestimmen alle anderen Attribute der Tabelle.',
        'Partielle Abhängigkeit: Ein Nichtschlüsselattribut hängt nur von einem Teil eines zusammengesetzten Schlüssels ab. Transitive Abhängigkeit: Ein Nichtschlüsselattribut hängt über ein anderes Nichtschlüsselattribut vom Schlüssel ab (A → B → C).'
      ],
      siehe: ['norm-2nf', 'norm-3nf'] },
    { id: 'norm-1nf', title: 'Erste Normalform (1NF)', keywords: ['1nf', 'erste normalform', 'atomar', 'atomare werte'],
      kurz: 'Eine Tabelle ist in 1NF, wenn alle Attributwerte atomar sind, also keine Listen oder Mehrfachwerte enthalten.',
      erklaerung: [
        'Verstoß: Eine Spalte „Telefon“ mit „0171-1, 0172-2“ oder Spalten wie Tel1, Tel2, Tel3. Besser: Die Mehrfachwerte in eine eigene Tabelle auslagern (1:n) oder pro Wert eine Zeile anlegen.',
        'Auch zusammengesetzte Angaben wie „Musterstr. 5, 12345 Berlin“ sollten in Straße, PLZ, Ort zerlegt werden, wenn einzeln darauf zugegriffen wird.'
      ],
      siehe: ['norm-2nf', 'norm-vorgehen'] },
    { id: 'norm-2nf', title: 'Zweite Normalform (2NF)', keywords: ['2nf', 'zweite normalform', 'partielle abhängigkeit'],
      kurz: 'Eine Tabelle ist in 2NF, wenn sie in 1NF ist und jedes Nichtschlüsselattribut vom ganzen Primärschlüssel abhängt.',
      erklaerung: [
        'Nur bei zusammengesetzten Schlüsseln relevant. Beispiel: Bestellposition(BestellNr, ArtNr, Menge, Artikelname). Der Artikelname hängt nur von ArtNr ab, nicht von der ganzen Kombination, und verletzt daher 2NF.',
        'Lösung: Attribute mit partieller Abhängigkeit in eine eigene Tabelle auslagern: Artikel(ArtNr, Artikelname). Hat die Tabelle nur einen einfachen Schlüssel, ist sie mit 1NF automatisch in 2NF.'
      ],
      siehe: ['norm-1nf', 'norm-3nf'] },
    { id: 'norm-3nf', title: 'Dritte Normalform (3NF)', keywords: ['3nf', 'dritte normalform', 'transitive abhängigkeit'],
      kurz: 'Eine Tabelle ist in 3NF, wenn sie in 2NF ist und kein Nichtschlüsselattribut von einem anderen Nichtschlüsselattribut abhängt.',
      erklaerung: [
        'Beispiel: Mitarbeiter(MaNr, Name, AbtNr, AbtName). AbtName hängt von AbtNr ab, nicht direkt von MaNr (transitiv: MaNr → AbtNr → AbtName). Lösung: Abteilung(AbtNr, AbtName) auslagern und in Mitarbeiter nur AbtNr als Fremdschlüssel behalten.',
        'Merksatz: Jedes Nichtschlüsselattribut hängt vom Schlüssel ab, vom ganzen Schlüssel und von nichts als dem Schlüssel. In Praxis und Prüfung ist die 3NF meist das Ziel.'
      ],
      siehe: ['norm-2nf', 'norm-vorgehen'] },
    { id: 'norm-vorgehen', title: 'Normalisieren Schritt für Schritt', keywords: ['normalisieren', 'vorgehen', 'beispiel', 'schritt für schritt', 'normalisierung'],
      kurz: 'Man prüft nacheinander 1NF, 2NF und 3NF und zerlegt die Tabelle jeweils dort, wo die Bedingung verletzt ist.',
      erklaerung: [
        'Ausgangstabelle: Rechnung(RechNr, Datum, KundenNr, KundenName, ArtNr, Artikelname, Menge). Ein Artikel je Zeile, Schlüssel (RechNr, ArtNr).',
        '1NF: Alle Werte sind atomar, es steht nur ein Artikel je Zeile. Erfüllt.',
        '2NF: Datum, KundenNr und KundenName hängen nur von RechNr, Artikelname nur von ArtNr. Zerlegung: Rechnung(RechNr, Datum, KundenNr, KundenName), Artikel(ArtNr, Artikelname), Rechnungsposition(RechNr, ArtNr, Menge).',
        '3NF: KundenName hängt von KundenNr ab, nicht von RechNr. Zerlegung: Kunde(KundenNr, KundenName), Rechnung(RechNr, Datum, KundenNr). Ergebnis: Kunde, Rechnung, Artikel, Rechnungsposition, jeweils mit Fremdschlüsseln.'
      ],
      stolperfallen: ['Nach jeder Zerlegung Schlüssel und Fremdschlüssel neu festlegen, sonst gehen die Beziehungen verloren.', 'Die Zerlegung muss verlustfrei sein: Durch Join der Tabellen muss sich die ursprüngliche Tabelle wieder herstellen lassen.'],
      siehe: ['norm-1nf', 'norm-2nf', 'norm-3nf', 'norm-anomalien'] },
    { id: 'norm-integritaet', title: 'Datenintegrität', keywords: ['integrität', 'datenintegrität', 'konsistenz', 'constraint', 'integritätsbedingung'],
      kurz: 'Datenintegrität bedeutet, dass die gespeicherten Daten widerspruchsfrei, vollständig und korrekt sind.',
      erklaerung: [
        'Entitätsintegrität: Jede Zeile hat einen eindeutigen, nicht leeren Primärschlüssel. Domänenintegrität: Werte liegen im erlaubten Wertebereich (Datentyp, NOT NULL, CHECK, DEFAULT).',
        'Referentielle Integrität: Fremdschlüsselwerte verweisen immer auf existierende Datensätze. Benutzerdefinierte Integrität: fachliche Regeln, etwa per CHECK, Trigger oder in der Anwendung.',
        'Das DBMS setzt diese Bedingungen über Constraints durch und lehnt Verstöße ab.'
      ],
      beispiel: [{ code: 'CREATE TABLE artikel (\n  art_nr INT PRIMARY KEY,\n  preis DECIMAL(8,2) NOT NULL CHECK (preis >= 0),\n  bestand INT DEFAULT 0\n);' }],
      siehe: ['er-referentielle-integritaet', 'er-fremdschluessel'] },
    { id: 'er-referentielle-integritaet', title: 'Referentielle Integrität', keywords: ['referentielle integrität', 'on delete cascade', 'restrict', 'set null', 'löschweitergabe'],
      kurz: 'Referentielle Integrität stellt sicher, dass jeder Fremdschlüssel auf einen vorhandenen Datensatz zeigt.',
      erklaerung: [
        'Das DBMS verhindert daher, dass ein Datensatz eingefügt wird, dessen Fremdschlüssel ins Leere zeigt, und dass ein referenzierter Datensatz einfach gelöscht wird.',
        'Über Löschregeln steuert man das Verhalten: RESTRICT/NO ACTION verbietet das Löschen, CASCADE löscht abhängige Zeilen mit, SET NULL setzt den Fremdschlüssel auf NULL.'
      ],
      beispiel: [{ code: 'FOREIGN KEY (kunden_nr) REFERENCES kunde (kunden_nr)\n  ON DELETE RESTRICT\n  ON UPDATE CASCADE', hinweis: 'Kunden mit Bestellungen dürfen nicht gelöscht werden.' }],
      siehe: ['er-fremdschluessel', 'norm-integritaet'] }
  ] },

  { id: 'uml-diagramme', bereich: 'UML', title: 'UML mit PlantUML', entries: [
    { id: 'uml-plantuml-grundlagen', title: 'PlantUML-Grundlagen', keywords: ['plantuml', 'uml', '@startuml', '@enduml', 'diagramm'],
      kurz: 'PlantUML erzeugt UML-Diagramme aus Text, der zwischen @startuml und @enduml steht.',
      syntax: '@startuml\n... Diagrammbeschreibung ...\n@enduml',
      erklaerung: [
        'Jedes Diagramm wird als Text beschrieben, die Grafik entsteht automatisch. Kommentare beginnen mit einem Apostroph (\'). Mit title Text lässt sich eine Überschrift setzen.',
        'Die Diagrammart ergibt sich aus der Syntax: Pfeile zwischen Akteuren und Ovalen ergeben ein Use-Case-Diagramm, Schlüsselwort class ein Klassendiagramm, Nachrichten mit -> ein Sequenzdiagramm usw.'
      ],
      beispiel: [{ code: '@startuml\ntitle Mini-Beispiel\nAlice -> Bob : Hallo\n@enduml' }],
      stolperfallen: ['@enduml vergessen oder Syntaxfehler: Es wird kein Diagramm erzeugt, sondern eine Fehlermeldung.'] },
    { id: 'uml-usecase-grundlagen', title: 'Use-Case-Diagramm: Akteur, Anwendungsfall, Systemgrenze', keywords: ['use case', 'anwendungsfall', 'akteur', 'systemgrenze', 'usecase', 'anwendungsfalldiagramm'],
      kurz: 'Ein Use-Case-Diagramm zeigt, wer (Akteur) ein System wofür (Anwendungsfall) nutzt.',
      erklaerung: [
        'Akteure (Strichmännchen) sind Personen oder Fremdsysteme außerhalb des Systems. Anwendungsfälle (Ovale) sind Funktionen, die dem Akteur einen Nutzen bringen, benannt mit Verb und Objekt („Bestellung aufgeben“). Die Systemgrenze ist ein Rechteck um alle Anwendungsfälle.',
        'Akteure und Anwendungsfälle werden mit Linien (Assoziationen) verbunden. Das Diagramm zeigt was, nicht wie.'
      ],
      beispiel: [{ code: '@startuml\nleft to right direction\nactor Kunde\nactor Lagerist\nrectangle Onlineshop {\n  usecase "Bestellung aufgeben" as UC1\n  usecase "Ware versenden" as UC2\n}\nKunde --> UC1\nLagerist --> UC2\n@enduml' }],
      siehe: ['uml-usecase-beziehungen'] },
    { id: 'uml-usecase-beziehungen', title: 'Use Case: include und extend', keywords: ['include', 'extend', '<<include>>', '<<extend>>', 'erweiterung', 'enthält'],
      kurz: 'include bindet einen Anwendungsfall zwingend ein, extend erweitert ihn optional unter einer Bedingung.',
      erklaerung: [
        '<<include>>: Der Basis-Anwendungsfall enthält den anderen immer (Bestellung aufgeben include Anmelden). Der Pfeil zeigt vom Basisfall zum eingebundenen Fall.',
        '<<extend>>: Der erweiternde Fall wird nur in bestimmten Situationen ausgeführt (Gutschein einlösen extend Bestellung aufgeben). Der Pfeil zeigt vom erweiternden Fall zum Basisfall.'
      ],
      beispiel: [{ code: '@startuml\nactor Kunde\n(Bestellung aufgeben) as B\n(Anmelden) as A\n(Gutschein einlösen) as G\nKunde --> B\nB ..> A : <<include>>\nG ..> B : <<extend>>\n@enduml' }],
      stolperfallen: ['Pfeilrichtung verwechseln: include zeigt zum eingebundenen Fall, extend zum erweiterten Basisfall.'],
      siehe: ['uml-usecase-grundlagen'] },
    { id: 'uml-aktivitaet-grundlagen', title: 'Aktivitätsdiagramm: Start, Aktion, Ende', keywords: ['aktivitätsdiagramm', 'aktivität', 'start', 'aktion', 'ablauf', 'activity'],
      kurz: 'Ein Aktivitätsdiagramm beschreibt den Ablauf eines Vorgangs als Folge von Aktionen.',
      syntax: 'start\n:Aktion;\nstop',
      erklaerung: [
        'In PlantUML (neue Syntax) beginnt der Ablauf mit start, Aktionen stehen in :Doppelpunkt und Semikolon;, das Ende ist stop oder end. Die Reihenfolge im Text ist die Reihenfolge im Ablauf.'
      ],
      beispiel: [{ code: '@startuml\nstart\n:Bestellung erfassen;\n:Rechnung erstellen;\nstop\n@enduml' }],
      siehe: ['uml-aktivitaet-verzweigung'] },
    { id: 'uml-aktivitaet-verzweigung', title: 'Aktivitätsdiagramm: Verzweigung und Schleife', keywords: ['verzweigung', 'schleife', 'if', 'while', 'repeat', 'entscheidung'],
      kurz: 'Verzweigungen werden mit if/else, Schleifen mit while oder repeat modelliert.',
      erklaerung: [
        'if (Bedingung?) then (ja) ... else (nein) ... endif erzeugt eine Raute mit zwei Zweigen. while (Bedingung?) ... endwhile prüft vor dem Durchlauf, repeat ... repeat while (Bedingung?) prüft danach.'
      ],
      beispiel: [{ code: '@startuml\nstart\nif (Lagerbestand ausreichend?) then (ja)\n  :Ware versenden;\nelse (nein)\n  :Nachbestellen;\nendif\nwhile (Paket nicht zugestellt?) is (ja)\n  :Sendung verfolgen;\nendwhile (nein)\nstop\n@enduml' }],
      stolperfallen: ['Jeder Entscheidungsausgang braucht eine Beschriftung (ja/nein oder Bedingung in eckigen Klammern), sonst ist das Diagramm mehrdeutig.'],
      siehe: ['uml-aktivitaet-grundlagen', 'uml-aktivitaet-parallel'] },
    { id: 'uml-aktivitaet-parallel', title: 'Aktivitätsdiagramm: Fork/Join und Schwimmbahnen', keywords: ['fork', 'join', 'parallel', 'schwimmbahn', 'swimlane', 'partition', 'nebenläufig'],
      kurz: 'Fork/Join stellt parallele Abläufe dar, Schwimmbahnen ordnen Aktionen einem Verantwortlichen zu.',
      erklaerung: [
        'fork startet mehrere parallele Zweige (fork again für jeden weiteren), end fork synchronisiert sie wieder (Join): Der Ablauf geht erst weiter, wenn alle Zweige fertig sind.',
        'Schwimmbahnen werden mit |Name| gewechselt. Alle folgenden Aktionen gehören zur jeweiligen Bahn (z. B. Kunde, Vertrieb, Lager).'
      ],
      beispiel: [{ code: '@startuml\n|Kunde|\nstart\n:Bestellung senden;\n|Lager|\nfork\n  :Ware kommissionieren;\nfork again\n  :Rechnung drucken;\nend fork\n:Paket versenden;\nstop\n@enduml' }],
      siehe: ['uml-aktivitaet-verzweigung'] },
    { id: 'uml-klasse-grundlagen', title: 'Klassendiagramm: Klasse, Attribute, Methoden, Sichtbarkeit', keywords: ['klassendiagramm', 'klasse', 'attribut', 'methode', 'sichtbarkeit', 'public', 'private', 'protected'],
      kurz: 'Eine Klasse wird als Kasten mit Name, Attributen und Methoden dargestellt; Symbole geben die Sichtbarkeit an.',
      erklaerung: [
        'Sichtbarkeit: + public (überall sichtbar), - private (nur in der Klasse), # protected (Klasse und Unterklassen), ~ package. Attribute stehen als name : Typ, Methoden als name(param : Typ) : Rückgabetyp.',
        'Statische Member werden in PlantUML mit {static} markiert und unterstrichen dargestellt.'
      ],
      beispiel: [{ code: '@startuml\nclass Kunde {\n  - kundenNr : int\n  - name : String\n  + getName() : String\n  + setName(name : String) : void\n}\n@enduml' }],
      siehe: ['uml-klasse-vererbung', 'uml-klasse-assoziation'] },
    { id: 'uml-klasse-vererbung', title: 'Klassendiagramm: Vererbung, abstrakte Klassen, Interfaces', keywords: ['vererbung', 'generalisierung', 'abstract', 'interface', 'schnittstelle', 'implements', 'extends'],
      kurz: 'Vererbung („ist ein“) wird mit hohlem Dreieckspfeil zur Oberklasse dargestellt, Interfaces mit gestricheltem Pfeil.',
      erklaerung: [
        'Die Unterklasse erbt Attribute und Methoden der Oberklasse. In PlantUML: Oberklasse <|-- Unterklasse. Abstrakte Klassen (nicht instanziierbar) heißen abstract class, ihre Namen erscheinen kursiv.',
        'Ein Interface (<<interface>>) enthält nur Methodensignaturen. Eine Klasse setzt es um (Realisierung): gestrichelte Linie mit hohlem Dreieck, in PlantUML Interface <|.. Klasse.'
      ],
      beispiel: [{ code: '@startuml\nabstract class Mitarbeiter {\n  # name : String\n  + {abstract} gehalt() : double\n}\ninterface Druckbar {\n  + drucken() : void\n}\nclass Angestellter\nclass Azubi\nMitarbeiter <|-- Angestellter\nMitarbeiter <|-- Azubi\nDruckbar <|.. Angestellter\n@enduml' }],
      siehe: ['uml-klasse-grundlagen'] },
    { id: 'uml-klasse-assoziation', title: 'Klassendiagramm: Assoziation, Aggregation, Komposition', keywords: ['assoziation', 'aggregation', 'komposition', 'multiplizität', 'kardinalität', 'raute'],
      kurz: 'Assoziation ist eine einfache Beziehung, Aggregation eine „Teil-Ganzes“-Beziehung, Komposition eine existenzabhängige Teil-Ganzes-Beziehung.',
      erklaerung: [
        'Assoziation: einfache Linie (--). Aggregation: offene (hohle) Raute beim Ganzen (o--), die Teile können auch ohne das Ganze existieren (Abteilung – Mitarbeiter). Komposition: gefüllte Raute (*--), die Teile sind vom Ganzen abhängig und werden mit ihm gelöscht (Haus – Raum).',
        'Multiplizitäten stehen in Anführungszeichen an den Enden: 1, 0..1, *, 1..*. Sie sagen aus, wie viele Objekte beteiligt sind.'
      ],
      beispiel: [{ code: '@startuml\nclass Kunde\nclass Bestellung\nclass Position\nclass Abteilung\nclass Mitarbeiter\nKunde "1" -- "0..*" Bestellung : gibt auf\nBestellung "1" *-- "1..*" Position\nAbteilung "1" o-- "*" Mitarbeiter\n@enduml' }],
      stolperfallen: ['Die Raute steht immer beim Ganzen, nicht beim Teil.'],
      siehe: ['uml-klasse-grundlagen', 'uml-klasse-vererbung'] },
    { id: 'uml-sequenz-grundlagen', title: 'Sequenzdiagramm: Lebenslinie und Nachrichten', keywords: ['sequenzdiagramm', 'lebenslinie', 'nachricht', 'synchron', 'asynchron', 'rückgabe', 'sequence'],
      kurz: 'Ein Sequenzdiagramm zeigt den zeitlichen Nachrichtenaustausch zwischen Objekten entlang ihrer Lebenslinien.',
      erklaerung: [
        'Teilnehmer stehen oben nebeneinander, die Zeit läuft nach unten. Synchrone Nachricht: ausgefüllter Pfeil (->), der Sender wartet. Asynchrone Nachricht: offener Pfeil (->>), der Sender arbeitet weiter. Rückgabe: gestrichelter Pfeil (-->).',
        'Mit participant, actor oder database lassen sich Teilnehmer deklarieren. Mit activate und deactivate wird der Aktivitätsbalken gezeigt.'
      ],
      beispiel: [{ code: '@startuml\nactor Kunde\nparticipant Shop\ndatabase DB\nKunde -> Shop : bestellen(artikel)\nactivate Shop\nShop -> DB : bestandPruefen()\nDB --> Shop : bestand\nShop ->> Kunde : Bestätigung\ndeactivate Shop\n@enduml' }],
      siehe: ['uml-sequenz-fragmente'] },
    { id: 'uml-sequenz-fragmente', title: 'Sequenzdiagramm: alt, opt, loop', keywords: ['alt', 'opt', 'loop', 'fragment', 'kombiniertes fragment', 'else'],
      kurz: 'Kombinierte Fragmente bilden Verzweigungen (alt), optionale Teile (opt) und Wiederholungen (loop) ab.',
      erklaerung: [
        'alt: Alternativen wie if/else, getrennt durch else. opt: Bereich wird nur ausgeführt, wenn die Bedingung gilt (if ohne else). loop: Wiederholung, solange die Bedingung gilt. Jedes Fragment endet mit end. Die Bedingung steht in eckigen Klammern.'
      ],
      beispiel: [{ code: '@startuml\nKunde -> Shop : bezahlen()\nalt Zahlung erfolgreich\n  Shop --> Kunde : Bestätigung\nelse Zahlung abgelehnt\n  Shop --> Kunde : Fehlermeldung\nend\nopt Gutschein vorhanden\n  Kunde -> Shop : einlösen()\nend\nloop für jeden Artikel\n  Shop -> Lager : reservieren()\nend\n@enduml' }],
      siehe: ['uml-sequenz-grundlagen'] },
    { id: 'uml-zustand-grundlagen', title: 'Zustandsdiagramm: Zustand, Übergang, Ereignis', keywords: ['zustandsdiagramm', 'zustand', 'übergang', 'ereignis', 'state', 'transition', 'startzustand', 'endzustand', 'automat'],
      kurz: 'Ein Zustandsdiagramm zeigt die Zustände eines Objekts und die Ereignisse, die es von einem in den anderen überführen.',
      syntax: 'Zustand1 --> Zustand2 : Ereignis [Bedingung] / Aktion',
      erklaerung: [
        'Ein Übergang wird beschriftet mit Ereignis [Bedingung] / Aktion. Das Ereignis löst den Wechsel aus, die Bedingung (Guard) muss wahr sein, die Aktion wird beim Übergang ausgeführt. Alle Teile sind optional.',
        'Der Startzustand ist ein gefüllter Kreis ([*] am Anfang), der Endzustand ein Kreis mit Ring ([*] als Ziel).'
      ],
      beispiel: [{ code: '@startuml\n[*] --> Offen\nOffen --> InBearbeitung : zuweisen / Techniker informieren\nInBearbeitung --> Offen : zurückgeben\nInBearbeitung --> Geschlossen : lösen [Kunde bestätigt]\nGeschlossen --> [*]\n@enduml', hinweis: 'Ticket-Lebenszyklus' }],
      stolperfallen: ['Zustände sind Substantive oder Adjektive („Offen“), Übergänge tragen Ereignisse (Verben). Nicht verwechseln mit Aktivitätsdiagramm, das Abläufe zeigt.'] }
  ] }
]);

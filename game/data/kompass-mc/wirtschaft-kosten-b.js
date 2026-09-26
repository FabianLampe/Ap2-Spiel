window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "leasing",
  "title": "Leasing",
  "figure": "makler",
  "lines": [
   "Merk dir: Leasing ist ein zeitlich begrenztes, vertraglich vereinbartes Nutzungsrecht an einem Wirtschaftsgut gegen regelmäßige Leasingraten.",
   "Eigentümer bleibt während der Laufzeit der Leasinggeber. Besitzer und Nutzer ist der Leasingnehmer.",
   "Eine Kaufoption bedeutet: Der Leasingnehmer darf das Gut nach Laufzeitende zu einem Restwert- oder Buchwertpreis kaufen, muss es aber nicht.",
   "Vorteile: geringere Liquiditätsbelastung, feste Raten für die Kostenplanung, Eigenkapital und Kreditspielraum bleiben erhalten, Raten sind steuerlich absetzbar."
  ]
 },
 {
  "concept": "make-or-buy-entscheidung",
  "title": "Make-or-Buy-Entscheidung",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: Make or Buy heißt Eigenfertigung oder Fremdbezug. Man vergleicht Kosten und weitere Kriterien wie Know-how, Risiko und Abhängigkeit.",
   "Ein Fremdbezug bringt Spezialwissen und entlastet die eigene IT. Nachteile sind Abhängigkeit vom Dienstleister und Weitergabe sensibler Daten.",
   "Risiken der Fremdvergabe: erschwerter Anbieterwechsel, weniger Kontrolle und Verlust von internem Know-how.",
   "Rechnerisch bestimmt man die Schwelle: Ab welcher Menge ist die Eigenentwicklung mit ihren Fixkosten günstiger als der Bezug je Stück? Bei Kostengleichheit ist sie noch nicht günstiger."
  ]
 },
 {
  "concept": "nutzwertanalyse",
  "title": "Nutzwertanalyse",
  "figure": "bank",
  "lines": [
   "Merk dir: Die Nutzwertanalyse vergleicht Alternativen anhand mehrerer gewichteter Kriterien, auch nicht monetärer.",
   "Gewichteter Einzelwert = Gewicht × Einzelbewertung. Der Gesamtnutzwert ist die Summe aller gewichteten Einzelwerte einer Alternative.",
   "Rang 1 hat der höchste Gesamtnutzwert. Die Gewichte sollen zusammen 100 % ergeben.",
   "Die Nutzwertanalyse ist eine Entscheidungshilfe. Harte Vorgaben wie Budget oder Pflichtmerkmale können Alternativen trotz hohen Nutzwerts ausschließen."
  ]
 },
 {
  "concept": "preisgestaltung",
  "title": "Preisgestaltung",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: Ein tragfähiger Preis beginnt mit der Kostenbasis. Dazu kommen Kundenkenntnis, Marktbeobachtung und die Wahl eines Preismodells.",
   "Ist ein Preis zu hoch, lehnen potenzielle Kunden das Angebot ab. Ist er zu niedrig, deckt der Erlös die Kosten nicht.",
   "In der Nachkalkulation vergleicht man den tatsächlichen mit dem geplanten Zuschlag oder der Rendite je Produkt.",
   "Weicht ein stark nachgefragtes Produkt deutlich vom Ziel ab, ist die Ursache zu klären und der Preis anzuheben oder die Kostenbasis zu senken."
  ]
 },
 {
  "concept": "projektkostenplanung",
  "title": "Projektkostenplanung",
  "figure": "bank",
  "lines": [
   "Merk dir: Projektkosten werden nach Kostenarten gegliedert, zum Beispiel Personal-, Lizenz-, Hardware- und Schulungskosten.",
   "Personalkosten = Anzahl Personen × Stunden × Stundensatz.",
   "Lizenzkosten = Anzahl Lizenzen × Monatspreis × Monate.",
   "Schulungskosten = Teilnehmer × Tage × Tagessatz je Person. Immer alle Faktoren der Aufgabe einbeziehen."
  ]
 },
 {
  "concept": "rabatt-und-skonto",
  "title": "Rabatt und Skonto",
  "figure": "finanzamt",
  "lines": [
   "Merk dir: Rabatt ist ein Preisnachlass aus einem bestimmten Anlass, zum Beispiel Menge, Treue oder Neukunde, unabhängig vom Zahlungszeitpunkt.",
   "Skonto ist ein Nachlass für Zahlung innerhalb einer verkürzten Frist.",
   "Der Skontoabzug wird vom Bruttoendbetrag der Rechnung berechnet: Betrag × Skontosatz.",
   "Der Zahler spart Kosten. Der Lieferant erhält schneller Geld und senkt das Ausfallrisiko sowie den Mahnaufwand."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-leasing-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "leasing",
  "title": "Leasing: Eigentum und Besitz",
  "difficulty": 2,
  "points": 4,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Rechenzentrum schließt für ein Kühlsystem einen auf vier Jahre befristeten Leasingvertrag mit einer Finanzierungsgesellschaft. Was gilt während der Laufzeit?",
  "payload": {
   "options": [
    {
     "text": "Die Finanzierungsgesellschaft bleibt Eigentümerin, das Rechenzentrum ist Besitzer und Nutzer und zahlt dafür Leasingraten.",
     "correct": true
    },
    {
     "text": "Das Rechenzentrum wird bereits mit der ersten Leasingrate Eigentümer und zugleich Besitzer des Kühlsystems.",
     "correct": false,
     "why": "Beim Leasing geht das Eigentum nicht über; das entspricht eher einem Ratenkauf."
    },
    {
     "text": "Die Finanzierungsgesellschaft bleibt Eigentümerin und zugleich Besitzerin, weil sie das Kühlsystem bezahlt und bereitgestellt hat.",
     "correct": false,
     "why": "Besitzer ist, wer die Sache tatsächlich nutzt, und das ist der Leasingnehmer."
    },
    {
     "text": "Das Rechenzentrum ist Eigentümer des Kühlsystems, die Finanzierungsgesellschaft ist dessen Besitzerin und Nutzerin.",
     "correct": false,
     "why": "Eigentum und Besitz sind vertauscht: Eigentum beim Leasinggeber, Besitz beim Leasingnehmer."
    },
    {
     "text": "Eigentum und Besitz sind gemeinsam auf beide Parteien verteilt und gehen zum Vertragsende automatisch über.",
     "correct": false,
     "why": "Es gibt keine gemeinsame Zuordnung, und ein automatischer Eigentumsübergang ist nicht vorgesehen."
    }
   ],
   "multi": false,
   "explanation": "Leasing ist zeitlich begrenzte Nutzung gegen Raten. Der Leasinggeber bleibt Eigentümer, der Leasingnehmer ist als tatsächlicher Nutzer Besitzer."
  }
 },
 {
  "id": "kmp-leasing-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "leasing",
  "title": "Kaufoption beim Leasing",
  "difficulty": 1,
  "points": 2,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Rechenzentrum least einen Notstromgenerator. Im Angebot steht eine Kaufoption. Was bedeutet sie?",
  "payload": {
   "options": [
    {
     "text": "Nach Ablauf der Nutzungsdauer darf das Rechenzentrum den Generator zu einem am Restwert oder Buchwert orientierten Preis kaufen, muss aber nicht.",
     "correct": true
    },
    {
     "text": "Das Rechenzentrum ist verpflichtet, den Generator am Ende der Laufzeit zum vereinbarten Restwert zu kaufen.",
     "correct": false,
     "why": "Eine Kaufoption ist ein Recht, keine Pflicht."
    },
    {
     "text": "Das Eigentum am Generator geht nach der letzten Leasingrate automatisch und ohne weitere Zahlung auf das Rechenzentrum über.",
     "correct": false,
     "why": "Es gibt keinen automatischen Eigentumsübergang; der Kauf erfordert eine Entscheidung und Zahlung."
    },
    {
     "text": "Das Rechenzentrum darf den Generator jederzeit während der laufenden Vertragszeit zum ursprünglichen Neupreis erwerben.",
     "correct": false,
     "why": "Die Option bezieht sich auf das Vertragsende und einen am Rest- oder Buchwert orientierten Preis."
    },
    {
     "text": "Der Leasinggeber muss den Generator am Ende der Laufzeit in jedem Fall zum Restwert zurücknehmen und vergüten.",
     "correct": false,
     "why": "Das wäre eine Rücknahmeverpflichtung des Leasinggebers, keine Kaufoption des Leasingnehmers."
    }
   ],
   "multi": false,
   "explanation": "Die Kaufoption gibt dem Leasingnehmer das Recht, das Gut nach Laufzeitende zu einem Restwert- oder Buchwertpreis zu erwerben. Es besteht weder Kaufpflicht noch automatischer Eigentumsübergang."
  }
 },
 {
  "id": "kmp-leasing-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "leasing",
  "title": "Vorteile des Leasings",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Eine Genossenschaft erwägt statt des Kaufs von drei Transportern einen vierjährigen Leasingvertrag. Welche Vorteile sprechen dafür? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Es wird zunächst nur die Rate statt des vollen Kaufpreises die Liquidität belasten",
     "correct": true
    },
    {
     "text": "Feste Raten erleichtern die Kostenplanung",
     "correct": true
    },
    {
     "text": "Der Kreditspielraum der Genossenschaft bleibt erhalten",
     "correct": true
    },
    {
     "text": "Die Transporter gehen sofort in das Eigentum der Genossenschaft über",
     "correct": false,
     "why": "Beim Leasing bleibt der Leasinggeber Eigentümer, das ist kein Vorteil des Leasings."
    },
    {
     "text": "Am Ende der Laufzeit gehört das Fahrzeug immer kostenlos dem Leasingnehmer",
     "correct": false,
     "why": "Eine Übernahme ist nur über eine Kaufoption gegen Zahlung möglich."
    }
   ],
   "multi": true,
   "explanation": "Typische Leasingvorteile sind geringere Liquiditätsbelastung, planbare Raten und erhaltener Kreditspielraum. Eigentumserwerb ist gerade kein Merkmal des Leasings."
  }
 },
 {
  "id": "kmp-make-or-buy-entscheidung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "make-or-buy-entscheidung",
  "title": "Risiken der Fremdvergabe",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Ingenieurbüro will den Betrieb seines Dokumentenservers an einen externen Dienstleister übergeben. Welche Risiken sind damit verbunden? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Abhängigkeit vom Dienstleister, etwa bei Ausfall oder Preiserhöhung",
     "correct": true
    },
    {
     "text": "Weitergabe sensibler Daten an einen Dritten (Datenschutzrisiko)",
     "correct": true
    },
    {
     "text": "Das eigene Know-how zum Serverbetrieb wächst stetig weiter",
     "correct": false,
     "why": "Bei Fremdvergabe geht internes Know-how eher verloren, es wächst nicht."
    },
    {
     "text": "Die eigenen Eingriffsmöglichkeiten am Server nehmen zu",
     "correct": false,
     "why": "Die Kontrolle nimmt ab, weil der Dienstleister den Betrieb steuert."
    },
    {
     "text": "Ein Anbieterwechsel wird dadurch besonders einfach",
     "correct": false,
     "why": "Ein Wechsel wird erschwert, etwa durch Datenmigration und Einarbeitung."
    }
   ],
   "multi": true,
   "explanation": "Fremdvergabe führt zu Abhängigkeit, Datenschutzrisiken, geringerer Kontrolle und Know-how-Verlust. Ein einfacher Anbieterwechsel wäre kein Risiko."
  }
 },
 {
  "id": "kmp-make-or-buy-entscheidung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "make-or-buy-entscheidung",
  "title": "Folgen der Vergabe an Softwarehaus",
  "difficulty": 2,
  "points": 4,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Bauhof lässt Software zur Einsatzplanung entweder intern entwickeln oder von einem Softwarehaus einschließlich Wartung erstellen. Welche Folgen einer Vergabe an das Softwarehaus sind richtig? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Zugriff auf spezialisiertes Fachwissen zur Einsatzplanung",
     "correct": true
    },
    {
     "text": "Abhängigkeit vom Softwarehaus bei Wartung und Änderungen",
     "correct": true
    },
    {
     "text": "Schutzbedürftige Einsatz- und Fahrzeugdaten müssen an einen Dritten übermittelt werden",
     "correct": true
    },
    {
     "text": "Die eigene IT-Abteilung baut Wissen über die Software weiter auf",
     "correct": false,
     "why": "Wer nicht selbst entwickelt, baut dieses Wissen kaum auf, das wäre ein Vorteil der Eigenentwicklung."
    },
    {
     "text": "Datenschutzrisiken entfallen vollständig, da Fachleute die Software erstellen",
     "correct": false,
     "why": "Fachwissen ersetzt keinen Datenschutz; die Datenweitergabe bleibt ein Risiko."
    }
   ],
   "multi": true,
   "explanation": "Vorteile des Fremdbezugs sind Spezialwissen und Entlastung. Nachteile sind Abhängigkeit und Datenweitergabe. Wissensaufbau im Haus ist ein Vorteil der Eigenentwicklung."
  }
 },
 {
  "id": "kmp-make-or-buy-entscheidung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "make-or-buy-entscheidung",
  "title": "Schwelle Eigenentwicklung",
  "difficulty": 2,
  "points": 5,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Archiv vergleicht Eigenentwicklung (einmalig 180 Std. plus monatlich 12 Std., interner Satz 70 EUR/Std.) mit Lizenzen (54 EUR je Lizenz und Monat). Betrachtungszeitraum: 24 Monate. Ab welcher ganzzahligen Lizenzanzahl ist die Eigenentwicklung strikt günstiger?",
  "payload": {
   "options": [
    {
     "text": "26 Lizenzen",
     "correct": true
    },
    {
     "text": "25 Lizenzen",
     "correct": false,
     "why": "Es wurde abgerundet: 25,28 wird nicht unterschritten, bei 25 Lizenzen ist der Fremdbezug mit 32.400 EUR noch günstiger als 32.760 EUR."
    },
    {
     "text": "10 Lizenzen",
     "correct": false,
     "why": "Die monatlichen 12 Std. wurden vergessen: 180 × 70 = 12.600 EUR, geteilt durch 1.296 EUR."
    },
    {
     "text": "16 Lizenzen",
     "correct": false,
     "why": "Die 180 Std. Einmalaufwand wurden vergessen: 288 Std. × 70 = 20.160 EUR, geteilt durch 1.296 EUR ergibt 15,56."
    },
    {
     "text": "607 Lizenzen",
     "correct": false,
     "why": "Der Fremdbezug wurde nur mit einem Monat (54 EUR) statt mit 24 Monaten (1.296 EUR) angesetzt."
    }
   ],
   "multi": false,
   "explanation": "Intern: 180 + 12 × 24 = 468 Std. × 70 EUR = 32.760 EUR. Fremd je Lizenz: 54 × 24 = 1.296 EUR. Schwelle: 32.760 / 1.296 = 25,28, also ab 26 Lizenzen günstiger."
  }
 },
 {
  "id": "kmp-nutzwertanalyse-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "nutzwertanalyse",
  "title": "Cloud-Anbieter auswählen",
  "difficulty": 2,
  "points": 4,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Drei Cloud-Anbieter werden bewertet (Skala 1 bis 3). Gewichte: Verfügbarkeit 40 %, Skalierbarkeit 35 %, Kosten 25 %. Nord: 3, 2, 1. Süd: 2, 3, 2. West: 1, 2, 3. Welcher Anbieter hat den höchsten Gesamtnutzwert?",
  "payload": {
   "options": [
    {
     "text": "Süd mit 235 Punkten",
     "correct": true
    },
    {
     "text": "Nord mit 215 Punkten",
     "correct": false,
     "why": "Nord hat nur bei der am höchsten gewichteten Verfügbarkeit die beste Note, verliert aber bei Skalierbarkeit und Kosten in der Summe."
    },
    {
     "text": "West mit 185 Punkten",
     "correct": false,
     "why": "West hat die beste Kostennote, dieses Kriterium wiegt aber nur 25 %. Die Summe liegt trotzdem am niedrigsten."
    },
    {
     "text": "Alle drei Anbieter liegen gleichauf, da jeder dieselbe Punkteskala nutzt",
     "correct": false,
     "why": "Die Gewichte und Einzelbewertungen führen zu unterschiedlichen Gesamtwerten."
    }
   ],
   "multi": false,
   "explanation": "Nord: 120 + 70 + 25 = 215. Süd: 80 + 105 + 50 = 235. West: 40 + 70 + 75 = 185. Süd erreicht den höchsten Gesamtnutzwert."
  }
 },
 {
  "id": "kmp-nutzwertanalyse-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "nutzwertanalyse",
  "title": "Handscanner Rangfolge",
  "difficulty": 3,
  "points": 9,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Drei Handscanner werden bewertet (Skala 1 bis 5). Gewichte: Akkulaufzeit 30 %, Robustheit 40 %, Preis 30 %. Alpha: 4, 3, 2. Beta: 3, 5, 3. Gamma: 2, 4, 5. Wie lautet die Rangfolge nach Gesamtnutzwert (Gewicht als ganze Zahl, z. B. 30)?",
  "payload": {
   "options": [
    {
     "text": "1. Beta (380), 2. Gamma (370), 3. Alpha (300)",
     "correct": true
    },
    {
     "text": "1. Gamma (370), 2. Beta (380), 3. Alpha (300)",
     "correct": false,
     "why": "Die Reihenfolge widerspricht den Werten: 380 ist größer als 370, Beta liegt vorn."
    },
    {
     "text": "1. Alpha (300), 2. Beta (380), 3. Gamma (370)",
     "correct": false,
     "why": "Es wurde nur nach der Akkulaufzeit sortiert, ohne die anderen Kriterien einzubeziehen."
    },
    {
     "text": "1. Beta (11), 1. Gamma (11), 3. Alpha (9)",
     "correct": false,
     "why": "Die Gewichte wurden ignoriert, es wurden nur die Noten addiert (Beta 11, Gamma 11, Alpha 9)."
    }
   ],
   "multi": false,
   "explanation": "Alpha: 120 + 120 + 60 = 300. Beta: 90 + 200 + 90 = 380. Gamma: 60 + 160 + 150 = 370. Damit: Beta Rang 1, Gamma Rang 2, Alpha Rang 3."
  }
 },
 {
  "id": "kmp-nutzwertanalyse-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "nutzwertanalyse",
  "title": "Energiebedarf und Nutzwert",
  "difficulty": 1,
  "points": 3,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Für einen fünfstündigen Einsatz laufen sechs Terminals mit je 40 W und ein Switch mit 60 W. Wie groß ist der Energiebedarf, der bei der Bewertung des Stromversorgungssystems angesetzt wird?",
  "payload": {
   "options": [
    {
     "text": "1.500 Wh",
     "correct": true
    },
    {
     "text": "300 Wh",
     "correct": false,
     "why": "Es wurde nur die Leistung (300 W) ohne die Betriebsdauer von 5 Stunden angegeben."
    },
    {
     "text": "1.200 Wh",
     "correct": false,
     "why": "Der Switch mit 60 W wurde vergessen: 240 W × 5 h."
    },
    {
     "text": "1.800 Wh",
     "correct": false,
     "why": "Es wurden 6 Stunden statt 5 Stunden angesetzt."
    },
    {
     "text": "15.000 Wh",
     "correct": false,
     "why": "Es wurden 50 Stunden statt 5 Stunden angesetzt (300 W × 50 h)."
    }
   ],
   "multi": false,
   "explanation": "Gesamtleistung: 6 × 40 W + 60 W = 300 W. Energiebedarf: 300 W × 5 h = 1.500 Wh. Dieser Wert dient anschließend als Grundlage für die Einstufung im Kriterium Energiebedarf."
  }
 },
 {
  "id": "kmp-preisgestaltung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "preisgestaltung",
  "title": "Grundlagen der Preisfestlegung",
  "difficulty": 2,
  "points": 4,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein IT-Dienstleister legt den Preis für ein neues Fernwartungsangebot für Arztpraxen fest. Welche Grundlagen der Preisgestaltung gehören dazu? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Alle relevanten Kosten ermitteln",
     "correct": true
    },
    {
     "text": "Die Kundschaft und ihre Erwartungen kennen",
     "correct": true
    },
    {
     "text": "Konkurrenzangebote im Markt beobachten",
     "correct": true
    },
    {
     "text": "Den Preis allein nach dem Bauchgefühl der Geschäftsleitung setzen",
     "correct": false,
     "why": "Ein tragfähiger Preis beruht auf Kosten, Kunden und Markt, nicht auf Bauchgefühl."
    },
    {
     "text": "Die Preise des Vorjahres unverändert für neue Angebote übernehmen",
     "correct": false,
     "why": "Ein neues Angebot braucht eine eigene Kalkulation."
    }
   ],
   "multi": true,
   "explanation": "Vier Grundlagen: Kostenbasis, Kundenkenntnis, Marktbeobachtung und Preismodell. Bauchgefühl oder das Übernehmen alter Preise ersetzen keine Kalkulation."
  }
 },
 {
  "id": "kmp-preisgestaltung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "preisgestaltung",
  "title": "Folge eines zu niedrigen Preises",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Eine Agentur bietet Vereinen einen Sicherungsdienst an und setzt den Preis sehr niedrig an. Der Preis erregt Aufmerksamkeit. Welche wirtschaftliche Folge ist die Hauptgefahr?",
  "payload": {
   "options": [
    {
     "text": "Die Einnahmen decken die laufenden Betriebskosten des Sicherungsdienstes nicht.",
     "correct": true
    },
    {
     "text": "Potenzielle Kunden lehnen den Dienst wegen des zu hohen Preises ab und buchen ihn nicht.",
     "correct": false,
     "why": "Das ist die Folge eines zu hohen, nicht eines zu niedrigen Preises."
    },
    {
     "text": "Die Konkurrenz ist gezwungen, ihre Preise für vergleichbare Dienste ebenfalls sofort zu senken.",
     "correct": false,
     "why": "Das ist nicht zwangsläufig, und es beschreibt keine Folge für die eigene Kostendeckung."
    },
    {
     "text": "Der Gewinn steigt automatisch und dauerhaft, weil deutlich mehr Kunden den Dienst buchen.",
     "correct": false,
     "why": "Mehr Kunden bringen bei nicht kostendeckendem Preis eher höhere Verluste."
    }
   ],
   "multi": false,
   "explanation": "Ein sehr niedriger Preis kann Aufmerksamkeit schaffen, doch wenn der Erlös die Betriebskosten nicht deckt, entsteht Verlust."
  }
 },
 {
  "id": "kmp-preisgestaltung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "preisgestaltung",
  "title": "Nachkalkulation Wartungspakete",
  "difficulty": 2,
  "points": 4,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Anbieter plante bei zwei Wartungspaketen je 30 % Gewinnzuschlag. Nachkalkuliert: Basispaket rund 28 %, Komfortpaket nur rund 9 %. 65 % der Kunden buchen das Komfortpaket. Welche Empfehlung ist sachgerecht?",
  "payload": {
   "options": [
    {
     "text": "Basispaket unverändert lassen; beim Komfortpaket die Ursachen klären und den Preis erhöhen oder die Kosten senken.",
     "correct": true
    },
    {
     "text": "Beide Pakete gleich behandeln und den Preis senken, weil beide unter 30 % liegen.",
     "correct": false,
     "why": "Die Abweichung ist sehr verschieden (2 gegenüber 21 Prozentpunkten), eine Preissenkung verschlechtert die Lage."
    },
    {
     "text": "Nur das Basispaket erhöhen, weil das Komfortpaket sehr beliebt ist.",
     "correct": false,
     "why": "Beliebtheit hebt das Renditeproblem nicht auf, gerade beim Komfortpaket ist Handlungsbedarf."
    },
    {
     "text": "Das Komfortpaket einstellen, weil seine Rendite niedrig ist.",
     "correct": false,
     "why": "Es macht 65 % der Kunden aus; erst Preis und Kosten prüfen statt das Hauptprodukt einzustellen."
    }
   ],
   "multi": false,
   "explanation": "Basispaket: 28 % statt 30 %, nur geringe Abweichung. Komfortpaket: 9 % statt 30 % bei hohem Nachfrageanteil, deshalb kritisch. Sinnvoll: Ursachen klären, Preis anheben oder Kosten senken."
  }
 },
 {
  "id": "kmp-projektkostenplanung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "projektkostenplanung",
  "title": "Personalkosten Testphase",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "In der Testphase eines Softwareprojekts arbeiten 3 Techniker je 15 Stunden. Der interne Stundensatz beträgt 85 EUR. Wie hoch sind die Personalkosten?",
  "payload": {
   "options": [
    {
     "text": "3.825 EUR",
     "correct": true
    },
    {
     "text": "1.275 EUR",
     "correct": false,
     "why": "Die Anzahl der Techniker (3) wurde vergessen: 15 × 85."
    },
    {
     "text": "255 EUR",
     "correct": false,
     "why": "Nur Anzahl mal Stundensatz gerechnet (3 × 85), die 15 Stunden fehlen."
    },
    {
     "text": "130 EUR",
     "correct": false,
     "why": "Die Faktoren wurden addiert (3 × 15 + 85) statt multipliziert."
    },
    {
     "text": "38.250 EUR",
     "correct": false,
     "why": "Die Dezimalstelle wurde falsch gesetzt, das Ergebnis ist um den Faktor 10 zu groß."
    }
   ],
   "multi": false,
   "explanation": "Personalkosten: 3 Techniker × 15 Stunden × 85 EUR = 3.825 EUR."
  }
 },
 {
  "id": "kmp-projektkostenplanung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "projektkostenplanung",
  "title": "Lizenzkosten Cloud-Dienst",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Für ein Cloud-Projekt werden 12 Nutzerlizenzen benötigt. Eine Lizenz kostet 45 EUR im Monat, die Nutzungsdauer beträgt 6 Monate. Wie hoch sind die Lizenzkosten?",
  "payload": {
   "options": [
    {
     "text": "3.240 EUR",
     "correct": true
    },
    {
     "text": "540 EUR",
     "correct": false,
     "why": "Es wurde nur ein Monat berechnet: 12 × 45."
    },
    {
     "text": "270 EUR",
     "correct": false,
     "why": "Die Anzahl der Lizenzen fehlt: 45 × 6."
    },
    {
     "text": "6.480 EUR",
     "correct": false,
     "why": "Es wurden 12 Monate statt 6 Monate angesetzt: 12 × 45 × 12."
    },
    {
     "text": "32.400 EUR",
     "correct": false,
     "why": "Die Dezimalstelle wurde falsch gesetzt, das Ergebnis ist um den Faktor 10 zu groß."
    }
   ],
   "multi": false,
   "explanation": "Lizenzkosten: 12 Lizenzen × 45 EUR × 6 Monate = 3.240 EUR."
  }
 },
 {
  "id": "kmp-projektkostenplanung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "projektkostenplanung",
  "title": "Schulungskosten Digitalisierung",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Für ein Digitalisierungsprojekt werden 8 Mitarbeiter je 2 Tage geschult. Der externe Trainer berechnet 120 EUR pro Person und Tag. Wie hoch sind die Schulungskosten?",
  "payload": {
   "options": [
    {
     "text": "1.920 EUR",
     "correct": true
    },
    {
     "text": "960 EUR",
     "correct": false,
     "why": "Die Schulungsdauer von 2 Tagen fehlt: 8 × 120."
    },
    {
     "text": "240 EUR",
     "correct": false,
     "why": "Die 8 Teilnehmer fehlen: 2 × 120."
    },
    {
     "text": "3.840 EUR",
     "correct": false,
     "why": "Die Tage wurden doppelt gezählt (8 × 4 × 120)."
    },
    {
     "text": "19.200 EUR",
     "correct": false,
     "why": "Die Dezimalstelle wurde falsch gesetzt, das Ergebnis ist um den Faktor 10 zu groß."
    }
   ],
   "multi": false,
   "explanation": "Schulungskosten: 8 Mitarbeiter × 2 Tage × 120 EUR = 1.920 EUR."
  }
 },
 {
  "id": "kmp-projektkostenplanung-4",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "projektkostenplanung",
  "title": "Kostenarten Sportbund-Projekt",
  "difficulty": 2,
  "points": 4,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Sportbund führt ein digitales System zur Hallenzeiten-Buchung ein. Ein Team aus Geschäftsstelle und IT plant, entwickelt und testet es, danach folgt ein Pilotbetrieb. Welche Zuordnungen von Kostenart und Beispiel sind richtig? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Personalkosten: Arbeitszeit des internen Entwicklungsteams",
     "correct": true
    },
    {
     "text": "Hardwarekosten: Server für den Systembetrieb",
     "correct": true
    },
    {
     "text": "Erlöse: Mitgliedsbeiträge der Vereine",
     "correct": false,
     "why": "Erlöse sind keine Kostenart."
    },
    {
     "text": "Personalkosten: Kaufpreis des Servers",
     "correct": false,
     "why": "Der Server ist eine Hardwareposition und keine Personalausgabe."
    },
    {
     "text": "Gewinn: Überschuss aus dem Pilotbetrieb",
     "correct": false,
     "why": "Gewinn ist ein Ergebnis und keine Kostenart."
    }
   ],
   "multi": true,
   "explanation": "Personalkosten (Arbeitszeit) und Hardwarekosten (Server) sind passende Kostenarten. Erlöse und Gewinn sind keine Kosten, und Beispiele müssen zur Kostenart passen."
  }
 },
 {
  "id": "kmp-rabatt-und-skonto-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "rabatt-und-skonto",
  "title": "Rabatt und Skonto unterscheiden",
  "difficulty": 2,
  "points": 4,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Eine Auszubildende verwechselt Rabatt und Skonto. Was unterscheidet die beiden Preisnachlässe richtig?",
  "payload": {
   "options": [
    {
     "text": "Rabatt wird aus einem Anlass wie Menge oder Kundengruppe gewährt, Skonto nur bei Zahlung innerhalb einer verkürzten Frist.",
     "correct": true
    },
    {
     "text": "Rabatt gibt es nur bei besonders schneller Zahlung, Skonto nur bei Abnahme großer Mengen.",
     "correct": false,
     "why": "Die Begriffe sind vertauscht: Skonto knüpft an die Zahlungsfrist, Rabatt an einen Anlass."
    },
    {
     "text": "Beide Nachlässe werden ausschließlich gewährt, wenn die gelieferte Ware nachweislich mangelhaft ist.",
     "correct": false,
     "why": "Bei Mängeln geht es um Gewährleistung; Rabatt und Skonto sind davon unabhängige Nachlässe."
    },
    {
     "text": "Rabatt mindert nur die Umsatzsteuer der Rechnung, Skonto senkt allein den Nettopreis.",
     "correct": false,
     "why": "Beide Nachlässe mindern den Preis; sie sind keine Änderung des Steuersatzes."
    },
    {
     "text": "Skonto und Rabatt sind dasselbe Instrument und unterscheiden sich lediglich im Namen und Klang.",
     "correct": false,
     "why": "Sie unterscheiden sich in Voraussetzung und Anlass."
    }
   ],
   "multi": false,
   "explanation": "Rabatt: Preisnachlass aus einem bestimmten Anlass, unabhängig vom Zahlungszeitpunkt. Skonto: Nachlass für Zahlung innerhalb einer verkürzten Frist."
  }
 },
 {
  "id": "kmp-rabatt-und-skonto-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "rabatt-und-skonto",
  "title": "Skonto Netzwerkkomponenten",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Eine Rechnung lautet: Netto 1.250,00 EUR, Umsatzsteuer 237,50 EUR, brutto 1.487,50 EUR. Zahlungsbedingung: 3 % Skonto bei Zahlung innerhalb von zehn Tagen (Zahlung erfolgt fristgerecht). Wie hoch ist der Skontoabzug (Bruttoendbetrag)?",
  "payload": {
   "options": [
    {
     "text": "44,63 EUR",
     "correct": true
    },
    {
     "text": "37,50 EUR",
     "correct": false,
     "why": "Es wurde vom Nettobetrag (1.250 EUR) gerechnet statt vom Bruttoendbetrag."
    },
    {
     "text": "7,13 EUR",
     "correct": false,
     "why": "Nur der Umsatzsteueranteil (237,50 EUR) wurde mit 3 % verrechnet."
    },
    {
     "text": "148,75 EUR",
     "correct": false,
     "why": "Es wurden 10 % statt 3 % angesetzt (Frist von zehn Tagen mit dem Satz verwechselt)."
    },
    {
     "text": "1.442,88 EUR",
     "correct": false,
     "why": "Das ist der Zahlbetrag nach Abzug, nicht der Skontoabzug selbst."
    }
   ],
   "multi": false,
   "explanation": "Skonto wird vom Bruttoendbetrag berechnet: 1.487,50 EUR × 0,03 = 44,625, gerundet 44,63 EUR."
  }
 },
 {
  "id": "kmp-rabatt-und-skonto-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "rabatt-und-skonto",
  "title": "Skonto Handscanner",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Eine Rechnung über Handscanner weist Netto 1.899,00 EUR, Umsatzsteuer 360,81 EUR und brutto 2.259,81 EUR aus. Bei Zahlung bis zum Frühzahlungstermin gibt es 4 % Skonto. Der Termin wird eingehalten. Wie hoch ist der Skontoabzug?",
  "payload": {
   "options": [
    {
     "text": "90,39 EUR",
     "correct": true
    },
    {
     "text": "75,96 EUR",
     "correct": false,
     "why": "Es wurde vom Nettowert gerechnet: 1.899,00 EUR × 0,04."
    },
    {
     "text": "14,43 EUR",
     "correct": false,
     "why": "Nur die Umsatzsteuer wurde mit 4 % verrechnet: 360,81 EUR × 0,04."
    },
    {
     "text": "86,92 EUR",
     "correct": false,
     "why": "Der Skonto wurde rückwärts vom Bruttobetrag ausgerechnet (durch 1,04 geteilt), statt 4 % vom Bruttobetrag zu nehmen."
    },
    {
     "text": "2.169,42 EUR",
     "correct": false,
     "why": "Das ist der Zahlbetrag (96 % der Rechnung), nicht der Skontoabzug."
    }
   ],
   "multi": false,
   "explanation": "Skonto: 2.259,81 EUR × 0,04 = 90,3924, gerundet 90,39 EUR. Zu zahlen wären dann 2.169,42 EUR."
  }
 },
 {
  "id": "kmp-rabatt-und-skonto-4",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "rabatt-und-skonto",
  "title": "Skonto aus Sicht des Lieferanten",
  "difficulty": 2,
  "points": 4,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Lieferant räumt bei Serverlizenzen Skonto für Zahlung innerhalb einer verkürzten Frist ein. Welches Interesse verfolgt er damit?",
  "payload": {
   "options": [
    {
     "text": "Er erhält das Geld schneller, verbessert seine Liquidität und verringert das Risiko von Zahlungsausfall und Mahnaufwand.",
     "correct": true
    },
    {
     "text": "Er möchte vor allem Kunden mit besonders großen Bestellmengen für ihre hohe Abnahme belohnen.",
     "correct": false,
     "why": "Das wäre ein Mengenrabatt und hängt nicht von der Zahlungsfrist ab."
    },
    {
     "text": "Er möchte die auf den Rechnungsbetrag entfallende Umsatzsteuer an das Finanzamt senken.",
     "correct": false,
     "why": "Skonto ändert nichts am Steuersatz oder an der Verpflichtung zur Umsatzsteuer."
    },
    {
     "text": "Er will die Lizenzen dauerhaft billiger verkaufen, damit sie vom Kunden länger genutzt werden.",
     "correct": false,
     "why": "Der Nachlass belohnt die schnelle Zahlung, nicht die Nutzungsdauer."
    }
   ],
   "multi": false,
   "explanation": "Der Lieferant gibt Skonto, um schneller an sein Geld zu kommen. Das stärkt die Liquidität und verringert Zahlungsausfälle und Mahnungen. Der Zahler spart Kosten."
  }
 }
]);

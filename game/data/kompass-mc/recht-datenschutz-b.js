window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "datenschutzmassnahmen",
  "title": "Datenschutzmaßnahmen",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Gespeicherte personenbezogene Daten schützt man u. a. durch Verschlüsselung der Datenbank oder der Datenträger, damit sie bei Diebstahl nicht lesbar sind.",
   "Wichtig ist: Abgestufte Zugriffsrechte. Jeder sieht nur die Daten, die er für seine Aufgabe braucht, z. B. Lehrkräfte nur ihre eigenen Kurse.",
   "Löschfristen festlegen und einhalten: Daten werden nicht auf Vorrat aufbewahrt, sondern gelöscht, wenn der Zweck entfällt.",
   "Das Verzeichnis von Verarbeitungstätigkeiten hält Zweck, Datenkategorien und Löschfristen der einzelnen Verarbeitungen fest.",
   "Bei Systemen, die Beschäftigtendaten erfassen, hilft eine Betriebsvereinbarung mit dem Betriebsrat, die Zweck, Umfang und Auswertung regelt."
  ]
 },
 {
  "concept": "it-bezogene-rechtliche-rahmenbedingungen",
  "title": "IT-bezogene rechtliche Rahmenbedingungen",
  "figure": "finanzamt",
  "lines": [
   "Merk dir: Öffentlich verfügbar heißt nicht frei nutzbar. Bei fremden Bibliotheken sind die Lizenzbedingungen maßgeblich.",
   "Wichtig ist: Eine fremde Bibliothek darf in eine kostenpflichtige Anwendung nur eingebunden und ausgeliefert werden, wenn die Lizenz kommerzielle Nutzung und Weitergabe erlaubt.",
   "Lizenzauflagen müssen eingehalten werden. Ungeprüfte Bedingungen sind ein Risiko, das man vor dem Einbau klärt.",
   "Schriften und Fotos können urheberrechtlich geschützt sein. Ohne eingeräumte Nutzungsrechte darf man sie nicht einbinden oder speichern.",
   "Fehlt eine passende Lizenz, kauft man sie oder verwendet eine Alternative, z. B. eine andere Schrift."
  ]
 },
 {
  "concept": "kaufvertrag",
  "title": "Kaufvertrag",
  "figure": "makler",
  "lines": [
   "Merk dir: Ein Kaufvertrag kommt durch zwei übereinstimmende Willenserklärungen zustande, meist Antrag (Bestellung) und Annahme.",
   "Wichtig ist: Die Annahme kann auch stillschweigend durch Handeln erfolgen, etwa durch Lieferung und Übergabe der bestellten Ware.",
   "Wirtschaftliche Inhalte des Kaufvertrags sind Kaufgegenstand samt Beschaffenheit, Menge, Kaufpreis, Zahlungs- und Lieferbedingungen sowie Liefertermin.",
   "Auch die Gewährleistung und der Zustand der Sache, etwa bei gebrauchter Ware, sollten kaufmännisch geregelt werden.",
   "Angebot und Annahme betreffen das Zustandekommen, nicht den Inhalt. Zählt man sie unter den Regelungsinhalten auf, ist das falsch."
  ]
 },
 {
  "concept": "kaufvertragsstoerungen",
  "title": "Kaufvertragsstörungen",
  "figure": "makler",
  "lines": [
   "Merk dir: Störungen durch den Käufer sind Zahlungsverzug (Kaufpreis nicht rechtzeitig gezahlt) und Annahmeverzug (Ware nicht abgenommen).",
   "Wichtig ist: Störungen durch den Verkäufer sind Lieferverzug (zu spät geliefert) und mangelhafte Lieferung (Sach- oder Rechtsmangel).",
   "Zur mangelhaften Lieferung zählen auch Falsch- und Minderlieferung, also falsche oder zu geringe Menge.",
   "In der Prüfung reicht oft die Nennung der Störung. Zwei Bezeichnungen für dieselbe Störung zählen nur einmal."
  ]
 },
 {
  "concept": "marktformen",
  "title": "Marktformen",
  "figure": "bank",
  "lines": [
   "Merk dir: Die Marktform ergibt sich aus der Anzahl der Anbieter und Nachfrager, jeweils einer, wenige oder viele.",
   "Wichtig ist: Wenige Anbieter und viele Nachfrager nennt man Angebotsoligopol, z. B. drei bis vier Hersteller für tausende Kunden.",
   "Sehr viele Anbieter und sehr viele Nachfrager ergeben ein Polypol, z. B. viele kleine Reparaturbetriebe für viele Kunden.",
   "Ein einziger Anbieter mit vielen Nachfragern ist ein Angebotsmonopol."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-datenschutzmassnahmen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "datenschutzmassnahmen",
  "title": "Schutz der Datenbank",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Eine Musikschule speichert Name, Anschrift, Bankverbindung und Beurteilungen der Teilnehmenden in einer Datenbank auf dem eigenen Server. Welche zwei Maßnahmen schützen diese gespeicherten Daten?",
  "payload": {
   "options": [
    {
     "text": "Allen Lehrkräften Administratorrechte auf die gesamte Datenbank geben, damit sie flexibel arbeiten können",
     "correct": false,
     "why": "Vollzugriff für alle widerspricht dem Prinzip abgestufter Zugriffsrechte."
    },
    {
     "text": "Die Datenbank bzw. die Datenträger des Servers verschlüsseln, damit Daten bei Diebstahl nicht lesbar sind",
     "correct": true
    },
    {
     "text": "Alte Anmeldungen dauerhaft aufbewahren, damit die Daten nie verloren gehen",
     "correct": false,
     "why": "Dauerhafte Aufbewahrung ohne Zweck widerspricht der Pflicht zur Löschung."
    },
    {
     "text": "Abgestufte Zugriffsrechte vergeben, sodass Lehrkräfte nur Daten ihrer Kurse sehen und Bankdaten der Verwaltung vorbehalten bleiben",
     "correct": true
    },
    {
     "text": "Die Bankverbindungen zusätzlich auf einem gemeinsamen Laufwerk für alle ablegen",
     "correct": false,
     "why": "Das erweitert den Zugriff auf sensible Daten unnötig."
    }
   ],
   "multi": true,
   "explanation": "Speziell für die Speicherung passen Verschlüsselung der Daten und abgestufte Zugriffsrechte. Übermäßige Rechte und Vorratsspeicherung erhöhen dagegen das Risiko."
  }
 },
 {
  "id": "kmp-datenschutzmassnahmen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "datenschutzmassnahmen",
  "title": "Telematik im Fuhrpark",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Eine Spedition erfasst per Telematik Standort und Lenkzeiten der Fahrer. Die Disposition will die Daten auch für Leistungsvergleiche nutzen, der Betriebsrat hat Bedenken. Welche Maßnahme macht den Betrieb datenschutzkonformer?",
  "payload": {
   "options": [
    {
     "text": "Die Leistungsvergleiche einzelner Fahrer einführen und die Daten unbegrenzt speichern",
     "correct": false,
     "why": "Das widerspricht Zweckbindung und Speicherbegrenzung."
    },
    {
     "text": "Die Fahrer erst nach Einführung des Systems über die Datenerhebung informieren",
     "correct": false,
     "why": "Die Information muss vor bzw. bei der Erhebung erfolgen."
    },
    {
     "text": "Eine Betriebsvereinbarung mit dem Betriebsrat über Zweck, Umfang und Auswertung der Telematikdaten abschließen",
     "correct": true
    },
    {
     "text": "Allen Mitarbeitern der Spedition Lesezugriff auf alle Fahrerdaten geben, um Transparenz herzustellen",
     "correct": false,
     "why": "Berechtigungen sind restriktiv zu halten; offener Zugriff verletzt die Vertraulichkeit."
    }
   ],
   "multi": false,
   "explanation": "Eine Betriebsvereinbarung regelt Zweck, Umfang und Auswertung verbindlich. Dazu passen Zweckbindung, aggregierte oder pseudonymisierte Auswertung, Information der Fahrer und restriktive Berechtigungen."
  }
 },
 {
  "id": "kmp-datenschutzmassnahmen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "datenschutzmassnahmen",
  "title": "Verzeichnis der Verarbeitungstätigkeiten",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Fahrradverleih speichert Kundendaten und Positionsdaten seiner Ausleihen. Was gehört in ein Verzeichnis von Verarbeitungstätigkeiten?",
  "payload": {
   "options": [
    {
     "text": "Nur die Passwörter der Kunden, damit sie bei Verlust wiederhergestellt werden können",
     "correct": false,
     "why": "Passwörter gehören nicht ins Verzeichnis und sollten nie im Klartext gespeichert werden."
    },
    {
     "text": "Eine Liste aller Kundenkonten mit sämtlichen gespeicherten Einzeldaten",
     "correct": false,
     "why": "Das Verzeichnis beschreibt Verarbeitungen, nicht jeden einzelnen Datensatz."
    },
    {
     "text": "Die Bilanzzahlen des Unternehmens für das laufende Geschäftsjahr",
     "correct": false,
     "why": "Finanzkennzahlen sind kein Inhalt des Verzeichnisses."
    },
    {
     "text": "Die einzelnen Verarbeitungen, z. B. der Verleihprozess, mit Zweck, Datenkategorien und Löschfristen",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Das Verzeichnis dokumentiert jede Verarbeitung mit Zweck, Datenkategorien und Löschfristen. Es enthält keine einzelnen Kundendaten oder Passwörter."
  }
 },
 {
  "id": "kmp-it-bezogene-rechtliche-rahmenbedingungen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Recht",
  "concept": "it-bezogene-rechtliche-rahmenbedingungen",
  "title": "Fremde Bibliothek einbinden",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Hersteller will eine öffentlich einsehbare Programmbibliothek unverändert in seine kostenpflichtige Desktopanwendung einbauen und ausliefern. Die Lizenz wurde nicht geprüft. Wie ist die Zulässigkeit zu begründen?",
  "payload": {
   "options": [
    {
     "text": "Zulässig, denn was öffentlich einsehbar ist, darf beliebig genutzt und weitergegeben werden",
     "correct": false,
     "why": "Einsehbarer Quelltext bedeutet keine Freigabe für jede Nutzung."
    },
    {
     "text": "Zulässig, solange der Hersteller die Bibliothek unverändert lässt und die Quelle nennt",
     "correct": false,
     "why": "Entscheidend sind die Lizenzbedingungen; Unverändertheit und Quellenangabe genügen nicht automatisch."
    },
    {
     "text": "Die Lizenzbedingungen sind maßgeblich: zulässig nur, wenn sie kommerzielle Nutzung und Weitergabe erlauben und alle Auflagen erfüllt werden",
     "correct": true
    },
    {
     "text": "Zulässig, wenn die Anwendung an die Kunden zum Selbstkostenpreis abgegeben wird",
     "correct": false,
     "why": "Der Preis ändert nichts an den Lizenzbedingungen."
    }
   ],
   "multi": false,
   "explanation": "Maßgeblich ist die Lizenz. Nur wenn sie kommerzielle Nutzung und Weitergabe gestattet und alle Auflagen eingehalten werden, darf die Bibliothek mit der Anwendung ausgeliefert werden."
  }
 },
 {
  "id": "kmp-it-bezogene-rechtliche-rahmenbedingungen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Recht",
  "concept": "it-bezogene-rechtliche-rahmenbedingungen",
  "title": "Schriftdatei im Installationspaket",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Softwarehaus bindet für seine kostenpflichtige App eine Schriftdatei aus einem frei zugänglichen Internetarchiv in das Installationspaket ein. Die Nutzungsbedingungen wurden nicht geprüft. Wie ist das zu bewerten?",
  "payload": {
   "options": [
    {
     "text": "Maßgeblich sind die Lizenzbedingungen der geschützten Schrift; zulässig nur, wenn die Nutzungsrechte diese Weitergabe abdecken, sonst Lizenz erwerben oder andere Schrift nehmen",
     "correct": true
    },
    {
     "text": "Unproblematisch, weil Schriften nicht urheberrechtlich geschützt sein können",
     "correct": false,
     "why": "Schriftdateien können geschützt sein und sind meist lizenziert."
    },
    {
     "text": "Unproblematisch, weil ein freier Download im Internet die Weitergabe automatisch erlaubt",
     "correct": false,
     "why": "Ein freier Download räumt keine Rechte zur kommerziellen Weitergabe ein."
    },
    {
     "text": "Unzulässig, weil in kostenpflichtigen Apps ausschließlich selbst erstellte Schriften erlaubt sind",
     "correct": false,
     "why": "Fremde Schriften sind erlaubt, wenn die Lizenz es zulässt."
    }
   ],
   "multi": false,
   "explanation": "Auch Schriftdateien sind meist urheberrechtlich geschützt und lizenziert. Die Einbindung ist nur zulässig, wenn die Lizenz die Weitergabe abdeckt; sonst braucht man eine Lizenz oder eine Alternative."
  }
 },
 {
  "id": "kmp-it-bezogene-rechtliche-rahmenbedingungen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Recht",
  "concept": "it-bezogene-rechtliche-rahmenbedingungen",
  "title": "Fotos für KI-Training sammeln",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Entwicklerteam lädt automatisiert Produktfotos von Händlerseiten herunter und speichert sie dauerhaft, um einen kommerziellen Bilderkennungsdienst zu trainieren. Nutzungsrechte liegen nicht vor. Wie ist das zu beurteilen?",
  "payload": {
   "options": [
    {
     "text": "Zulässig, weil im Internet frei sichtbare Fotos automatisch gemeinfrei sind",
     "correct": false,
     "why": "Öffentliche Sichtbarkeit hebt den Urheberrechtsschutz nicht auf."
    },
    {
     "text": "Zulässig, weil die Fotos nur intern gespeichert und nicht veröffentlicht werden",
     "correct": false,
     "why": "Schon Vervielfältigung und Speicherung greifen in Verwertungsrechte ein."
    },
    {
     "text": "Nicht zulässig ohne eingeräumte Nutzungsrechte oder eine im Einzelfall greifende gesetzliche Erlaubnis, denn Produktfotos können urheberrechtlich geschützt sein",
     "correct": true
    },
    {
     "text": "Zulässig, sobald die Herkunftsseite in der Dokumentation des Projekts genannt wird",
     "correct": false,
     "why": "Eine Quellenangabe ersetzt keine Nutzungsrechte."
    }
   ],
   "multi": false,
   "explanation": "Produktfotos können urheberrechtlich geschützt sein. Herunterladen und dauerhaftes Speichern greifen in Verwertungsrechte ein; ohne Nutzungsrechte oder gesetzliche Erlaubnis ist das unzulässig."
  }
 },
 {
  "id": "kmp-kaufvertrag-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Verträge",
  "concept": "kaufvertrag",
  "title": "Inhalte eines Kaufvertrags",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Systemhaus bestellt bei einem Großhändler mehrere Netzwerk-Switches. Welche drei Angaben gehören als wirtschaftliche Regelungen in den Kaufvertrag?",
  "payload": {
   "options": [
    {
     "text": "Kaufpreis der Switches",
     "correct": true
    },
    {
     "text": "Der Zeitpunkt, zu dem beide Willenserklärungen übereinstimmen",
     "correct": false,
     "why": "Das betrifft das Zustandekommen des Vertrags, nicht wirtschaftliche Inhalte."
    },
    {
     "text": "Menge der bestellten Geräte",
     "correct": true
    },
    {
     "text": "Die Geschäftsfähigkeit der beiden Vertragsparteien",
     "correct": false,
     "why": "Das ist eine rechtliche Voraussetzung, keine wirtschaftliche Vereinbarung."
    },
    {
     "text": "Lieferbedingungen und Liefertermin",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Wirtschaftliche Inhalte sind z. B. Kaufpreis, Menge sowie Liefer- und Zahlungsbedingungen. Willenserklärungen und Geschäftsfähigkeit betreffen das rechtliche Zustandekommen."
  }
 },
 {
  "id": "kmp-kaufvertrag-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Verträge",
  "concept": "kaufvertrag",
  "title": "Zeitpunkt des Vertragsschlusses",
  "difficulty": 1,
  "points": 2,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Eine Agentur bestellt am 12. Februar zwei Scanner. Es gibt keine Bestätigung. Am 19. Februar liefert der Händler und übergibt die Geräte, am 21. Februar kommt die Rechnung. Wann ist der Kaufvertrag zustande gekommen?",
  "payload": {
   "options": [
    {
     "text": "Am 12. Februar, weil die Bestellung allein den Vertrag bereits abschließt",
     "correct": false,
     "why": "Die Bestellung ist nur die erste Willenserklärung; es fehlt die Annahme."
    },
    {
     "text": "Am 21. Februar, weil erst die Rechnung den Vertrag verbindlich macht",
     "correct": false,
     "why": "Die Rechnung ist keine Voraussetzung für den Vertragsschluss."
    },
    {
     "text": "Am 20. Februar, einen Tag nach der Lieferung, wenn die Ware unbeanstandet bleibt",
     "correct": false,
     "why": "Ein solcher Stichtag existiert nicht; die Annahme erfolgt durch die Lieferung selbst."
    },
    {
     "text": "Am 19. Februar, weil der Händler der Bestellung durch Lieferung und Übergabe der Ware zustimmt",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Die Bestellung ist die erste Willenserklärung. Der Händler stimmt durch Lieferung stillschweigend zu, damit liegen am 19. Februar zwei übereinstimmende Willenserklärungen vor."
  }
 },
 {
  "id": "kmp-kaufvertrag-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Verträge",
  "concept": "kaufvertrag",
  "title": "Gebrauchten Server kaufen",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Rechenzentrumsbetreiber kauft von einem anderen Unternehmen einen gebrauchten Server. Welche zwei Angaben sollten kaufmännisch im Vertrag festgehalten werden?",
  "payload": {
   "options": [
    {
     "text": "Angebot und Annahme als Vertragsbestandteile",
     "correct": false,
     "why": "Angebot und Annahme betreffen das Zustandekommen und nicht den Vertragsinhalt."
    },
    {
     "text": "Bezeichnung und Zustand des Kaufgegenstands",
     "correct": true
    },
    {
     "text": "Der Vertragsschluss durch schlüssiges Handeln der Beteiligten",
     "correct": false,
     "why": "Das ist eine Frage des Zustandekommens, kein kaufmännischer Inhalt."
    },
    {
     "text": "Eine Regelung zur Gewährleistung",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Kaufmännisch festzuhalten sind z. B. Bezeichnung und Zustand der Sache und die Gewährleistungsregelung, ebenso Preis, Zahlungs- und Lieferbedingungen. Angebot und Annahme betreffen den Vertragsschluss."
  }
 },
 {
  "id": "kmp-kaufvertragsstoerungen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Verträge",
  "concept": "kaufvertragsstoerungen",
  "title": "Störungen durch den Käufer",
  "difficulty": 1,
  "points": 2,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Softwarehaus liefert Lizenzen vereinbarungsgemäß aus. Welche zwei Kaufvertragsstörungen können durch das Verhalten des Käufers entstehen?",
  "payload": {
   "options": [
    {
     "text": "Zahlungsverzug",
     "correct": true
    },
    {
     "text": "Lieferverzug",
     "correct": false,
     "why": "Lieferverzug wird vom Verkäufer verursacht, der zu spät liefert."
    },
    {
     "text": "Annahmeverzug",
     "correct": true
    },
    {
     "text": "Mangelhafte Lieferung",
     "correct": false,
     "why": "Ein Mangel der Ware liegt in der Verantwortung des Verkäufers."
    }
   ],
   "multi": true,
   "explanation": "Der Käufer verursacht Zahlungsverzug (Kaufpreis nicht rechtzeitig) und Annahmeverzug (ordnungsgemäß angebotene Ware nicht abgenommen). Liefer- und Qualitätsprobleme kommen vom Verkäufer."
  }
 },
 {
  "id": "kmp-kaufvertragsstoerungen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Verträge",
  "concept": "kaufvertragsstoerungen",
  "title": "Störungen aus Käufersicht",
  "difficulty": 1,
  "points": 2,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Systemhaus bestellt Serverschränke mit festem Liefertermin. Welche zwei Störungen können dem Systemhaus als Käufer bei dieser Bestellung entstehen?",
  "payload": {
   "options": [
    {
     "text": "Zahlungsverzug",
     "correct": false,
     "why": "Zahlungsverzug verursacht der Käufer selbst, er ist keine Störung, die dem Käufer entsteht."
    },
    {
     "text": "Lieferverzug des Verkäufers",
     "correct": true
    },
    {
     "text": "Annahmeverzug",
     "correct": false,
     "why": "Annahmeverzug wäre ein Fehlverhalten des Käufers."
    },
    {
     "text": "Mangelhafte Lieferung, z. B. Sachmangel",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Dem Käufer können Lieferverzug und mangelhafte Lieferung entstehen. Zahlungs- und Annahmeverzug gehen vom Käufer selbst aus."
  }
 },
 {
  "id": "kmp-kaufvertragsstoerungen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Verträge",
  "concept": "kaufvertragsstoerungen",
  "title": "Ware nicht abgenommen",
  "difficulty": 1,
  "points": 2,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Händler bietet bestellte Netzwerkkarten zum vereinbarten Termin ordnungsgemäß an, doch der Käufer verweigert die Abnahme. Welche Kaufvertragsstörung liegt vor?",
  "payload": {
   "options": [
    {
     "text": "Lieferverzug",
     "correct": false,
     "why": "Der Verkäufer hat rechtzeitig angeboten, er ist nicht im Verzug."
    },
    {
     "text": "Zahlungsverzug",
     "correct": false,
     "why": "Hier geht es nicht um die Zahlung, sondern um die Abnahme der Ware."
    },
    {
     "text": "Mangelhafte Lieferung",
     "correct": false,
     "why": "Die Ware wurde ordnungsgemäß angeboten, es liegt kein Mangel vor."
    },
    {
     "text": "Annahmeverzug",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Nimmt der Käufer ordnungsgemäß angebotene Ware nicht ab, liegt Annahmeverzug vor. Er ist eine Störung durch den Käufer."
  }
 },
 {
  "id": "kmp-marktformen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "marktformen",
  "title": "Marktform Messgeräte",
  "difficulty": 1,
  "points": 1,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Auf einem regionalen Markt für industrielle Messgeräte konkurrieren drei unabhängige Hersteller um die Aufträge zahlreicher Produktionsbetriebe. Welche Marktform liegt vor?",
  "payload": {
   "options": [
    {
     "text": "Angebotsmonopol",
     "correct": false,
     "why": "Beim Monopol gibt es nur einen Anbieter, hier sind es drei."
    },
    {
     "text": "Angebotsoligopol",
     "correct": true
    },
    {
     "text": "Polypol",
     "correct": false,
     "why": "Beim Polypol gibt es sehr viele Anbieter, hier nur drei."
    },
    {
     "text": "Nachfrageoligopol",
     "correct": false,
     "why": "Hier sind die Nachfrager zahlreich, nicht die Anbieter oder Nachfrager wenige."
    }
   ],
   "multi": false,
   "explanation": "Wenige Anbieter (drei) und viele Nachfrager bilden ein Angebotsoligopol."
  }
 },
 {
  "id": "kmp-marktformen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "marktformen",
  "title": "Marktform Reparaturdienste",
  "difficulty": 1,
  "points": 1,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Auf einem regionalen Markt für Reparaturdienstleistungen stehen sehr viele selbstständige Betriebe einer sehr großen Zahl privater und gewerblicher Kunden gegenüber. Welche Marktform liegt vor?",
  "payload": {
   "options": [
    {
     "text": "Angebotsoligopol",
     "correct": false,
     "why": "Ein Oligopol setzt wenige Anbieter voraus."
    },
    {
     "text": "Nachfragemonopol",
     "correct": false,
     "why": "Es gibt nicht einen einzelnen Nachfrager, sondern sehr viele."
    },
    {
     "text": "Polypol",
     "correct": true
    },
    {
     "text": "Nachfrageoligopol",
     "correct": false,
     "why": "Die Nachfrager sind sehr viele, nicht wenige."
    }
   ],
   "multi": false,
   "explanation": "Sehr viele Anbieter und sehr viele Nachfrager kennzeichnen das Polypol."
  }
 },
 {
  "id": "kmp-marktformen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "marktformen",
  "title": "Marktform Spezialsoftware",
  "difficulty": 1,
  "points": 1,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Auf einem Markt für eine Spezialsoftware bietet ein einziges Unternehmen sein Produkt an, tausende gewerbliche Kunden fragen es nach. Welche Marktform liegt vor?",
  "payload": {
   "options": [
    {
     "text": "Polypol",
     "correct": false,
     "why": "Beim Polypol treten sehr viele Anbieter auf."
    },
    {
     "text": "Angebotsoligopol",
     "correct": false,
     "why": "Ein Oligopol setzt wenige, aber mehrere Anbieter voraus."
    },
    {
     "text": "Angebotsmonopol",
     "correct": true
    },
    {
     "text": "Nachfragemonopol",
     "correct": false,
     "why": "Es gibt nicht einen einzigen Nachfrager, sondern einen einzigen Anbieter."
    }
   ],
   "multi": false,
   "explanation": "Ein einziger Anbieter mit vielen Nachfragern bildet ein Angebotsmonopol."
  }
 }
]);

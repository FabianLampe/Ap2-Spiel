window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "innovationsmanagement",
  "title": "Innovationsmanagement",
  "figure": "startup",
  "lines": [
   "Merk dir: Beim Bottom-up-Ansatz entstehen Innovationsimpulse auf operativer Ebene und werden in der Hierarchie nach oben getragen.",
   "Beim Top-down-Ansatz gibt die Leitung Innovationsziele oder Vorgaben aus, die abwärts konkretisiert und umgesetzt werden.",
   "Vorteil von Bottom-up: Das praxisnahe Wissen der Beschäftigten führt zu bedarfsgerechten, früh erkannten Verbesserungen.",
   "Ein weiterer Vorteil: Wer beteiligt wird, identifiziert sich mit Neuerungen, und die Akzeptanz der Umsetzung steigt.",
   "Wichtig ist: Ein Ideenkanal garantiert nicht, dass jede Idee umgesetzt wird – ein Ausschuss oder die Leitung entscheidet."
  ]
 },
 {
  "concept": "ishikawa-diagramm",
  "title": "Ishikawa-Diagramm",
  "figure": "kalle",
  "lines": [
   "Merk dir: Das Ishikawa-Diagramm (Ursache-Wirkungs-Diagramm) stellt ein Problem als Wirkung dar und sammelt mögliche Ursachen in Kategorien.",
   "Typische Kategorien sind Mensch, Methode, Maschine, Material, Messung und Mitwelt (Umgebung).",
   "Ziele: Ursachen strukturiert und möglichst vollständig sammeln, Zusammenhänge sichtbar machen und Ansatzpunkte für Maßnahmen finden.",
   "Zudem schafft es eine gemeinsame Problemsicht im Team und wirkt sachlich statt personenbezogen; vorschnelle Schuldzuweisungen werden vermieden.",
   "Wichtig ist: Das Diagramm zeigt vermutete Ursachen, es berechnet keine Kosten und liefert die Lösung nicht automatisch."
  ]
 },
 {
  "concept": "kundenbedarfsanalyse-und-beratung",
  "title": "Kundenbedarfsanalyse und Beratung",
  "figure": "makler",
  "lines": [
   "Merk dir: Vor der Konzeption erhebt man den Bedarf der Kunden systematisch, statt Wünsche zu raten.",
   "Geeignete Methoden sind Einzelinterviews, schriftliche oder Online-Befragung, Workshop bzw. Fokusgruppe und Beobachtung vor Ort.",
   "Auch vorhandene Daten helfen: Support-Tickets, Beschwerden, Kundenfeedback und Nutzungsdaten bestehender Angebote lassen sich auswerten.",
   "Wichtig ist: Maßnahmen oder Funktionsvorschläge wie eine Preissenkung sind keine Erhebungsmethode.",
   "Eine standardisierte Befragung liefert eine breite, vergleichbare Grundlage; ein Interview liefert dafür tiefe Einblicke bei wenigen Kunden."
  ]
 },
 {
  "concept": "kundenpraesentation",
  "title": "Kundenpräsentation",
  "figure": "makler",
  "lines": [
   "Merk dir: Folienpunkte verdichten Unternehmensinformationen so, dass sie zu den Bedürfnissen des Kunden passen.",
   "Ein guter Punkt verbindet einen belegten Fakt mit seinem Nutzen, zum Beispiel: „Störungen in durchschnittlich 18 Minuten gelöst – schnelle Hilfe“.",
   "Wichtig ist: Zahlen und Nachweise machen Aussagen glaubwürdig; unbelegte Werbeaussagen und reine Notizkopien zählen nicht.",
   "Fakten ohne Bezug zum Kundenanliegen, etwa ein Stadtlauf-Sponsoring bei einem IT-Angebot, gehören nicht auf die Folie.",
   "Jede Kundenbotschaft soll eigenständig sein und einen Rohfakt mit seiner positiven Bedeutung für den Kunden verbinden."
  ]
 },
 {
  "concept": "lasten-und-pflichtenheft",
  "title": "Lasten- und Pflichtenheft",
  "figure": "makler",
  "lines": [
   "Merk dir: Das Lastenheft schreibt der Auftraggeber. Es beschreibt den Bedarf – was verlangt wird und wofür.",
   "Das Pflichtenheft schreibt der Auftragnehmer. Es beschreibt die vorgesehenen und verbindlich zugesagten Leistungen.",
   "Das Lastenheft nennt das benötigte Ergebnis. Das Pflichtenheft konkretisiert den Lösungsweg samt Mitteln – wie und womit es umgesetzt wird.",
   "Ins Lastenheft gehören Ausgangssituation, Projektziel, funktionale und nichtfunktionale Anforderungen, vorhandene IT-Umgebung sowie Zeitrahmen und Budget.",
   "Wichtig ist: Die konkrete technische Umsetzung gehört ins Pflichtenheft, nicht ins Lastenheft."
  ]
 },
 {
  "concept": "machbarkeitsanalyse",
  "title": "Machbarkeitsanalyse",
  "figure": "startup",
  "lines": [
   "Merk dir: Die Machbarkeitsanalyse prüft vor der Auftragsvergabe, ob sich ein Vorhaben realisieren lässt.",
   "Übliche Bereiche sind technische, wirtschaftliche, rechtliche und organisatorische Machbarkeit (auch Ressourcen und Zeit).",
   "Technisch: Datenübernahme, Schnittstellen, Kompatibilität, Verfügbarkeit. Wirtschaftlich: Kosten und Budget. Rechtlich: Datenschutz, Aufbewahrung, Verträge. Organisatorisch: Personal, Schulung, Zeit.",
   "Wichtig ist: Ein Kriterium muss zum Fall konkret erläutert werden – bloße Nennungen ohne Klärungsfragen reichen nicht."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-innovationsmanagement-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "innovationsmanagement",
  "title": "Vorteile eines Ideenkanals",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Softwarehaus richtet einen digitalen Ideenkanal ein, in dem Beschäftigte Verbesserungsvorschläge einreichen. Teams besprechen sie, ein Innovationsausschuss entscheidet. Welche zwei Zusammenhänge sind positive Folgen?",
  "payload": {
   "options": [
    {
     "text": "Die Leitung gibt Innovationsziele verbindlich vor, die Beschäftigte ohne eigene Vorschläge umsetzen.",
     "correct": false,
     "why": "Das beschreibt den Top-down-Ansatz und keinen Vorteil des Ideenkanals."
    },
    {
     "text": "Das praxisnahe Wissen der Beschäftigten fließt ein, wodurch Innovationen näher am tatsächlichen Bedarf entstehen.",
     "correct": true
    },
    {
     "text": "Jede eingereichte Idee wird garantiert umgesetzt, daher ist keine weitere Prüfung mehr notwendig.",
     "correct": false,
     "why": "Ein Ausschuss entscheidet; eine Umsetzungsgarantie besteht nicht."
    },
    {
     "text": "Die Beteiligung stärkt die Identifikation der Beschäftigten und erhöht die Akzeptanz späterer Veränderungen.",
     "correct": true
    },
    {
     "text": "Der Innovationsausschuss wird überflüssig, weil die Teams alle Entscheidungen selbstständig treffen.",
     "correct": false,
     "why": "Der Ausschuss bleibt entscheidungsbefugt; der Ideenkanal ersetzt ihn nicht."
    }
   ],
   "multi": true,
   "explanation": "Vorteile sind die Nutzung des Praxiswissens für bedarfsgerechte Innovationen und die höhere Akzeptanz durch Beteiligung. Vorgaben der Leitung sind Top-down, und Umsetzungsgarantien gibt es nicht."
  }
 },
 {
  "id": "kmp-innovationsmanagement-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "innovationsmanagement",
  "title": "Bottom-up und Top-down",
  "difficulty": 1,
  "points": 3,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Verpackungshersteller bereitet einen Workshop vor und will die Innovationsansätze Bottom-up und Top-down vergleichen. Welche Beschreibung trifft den organisatorischen Unterschied?",
  "payload": {
   "options": [
    {
     "text": "Bottom-up: Die Leitung legt Ziele fest. Top-down: Die Beschäftigten entwickeln Ideen und geben sie nach oben.",
     "correct": false,
     "why": "Die Zuordnung ist vertauscht."
    },
    {
     "text": "Bottom-up: Ideen entstehen ausschließlich bei Kunden. Top-down: Ideen entstehen ausschließlich bei Lieferanten und bringt für Beschäftigte keinerlei Mehrarbeit mit sich.",
     "correct": false,
     "why": "Der Unterschied betrifft die Ebenen im Unternehmen, nicht Kunden und Lieferanten."
    },
    {
     "text": "Bottom-up: Impulse entstehen auf operativer Ebene und werden aufwärts getragen. Top-down: Die Leitung gibt Ziele vor, die abwärts umgesetzt werden.",
     "correct": true
    },
    {
     "text": "Bottom-up: Innovation dauert immer länger. Top-down: Innovation ist immer schneller und ohne Risiko.",
     "correct": false,
     "why": "Dauer und Risiko sind keine Definition; der Unterschied liegt in der Richtung der Impulse."
    }
   ],
   "multi": false,
   "explanation": "Bottom-up heißt: Impulse von unten nach oben; Top-down heißt: Vorgaben von oben nach unten. Das ist der organisatorische Kern des Unterschieds."
  }
 },
 {
  "id": "kmp-innovationsmanagement-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "innovationsmanagement",
  "title": "Nutzen von Servicewissen",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein IT-Dienstleister lässt Servicemitarbeitende Erfahrungen aus Kundenkontakten als Vorschläge einstellen; Teamleitungen bündeln sie, eine bereichsübergreifende Runde entscheidet. Welcher Vorteil ergibt sich für Dienstleistungen?",
  "payload": {
   "options": [
    {
     "text": "Servicemitarbeitende haben die höchste Entscheidungsbefugnis und können neue Angebote allein beschließen.",
     "correct": false,
     "why": "Die Entscheidung liegt bei der Runde, nicht bei den Vorschlagenden."
    },
    {
     "text": "Kundennahes Erfahrungswissen ermöglicht bedarfsgerechtere Dienstleistungen, Ideen aus verschiedenen Bereichen werden erschlossen.",
     "correct": true
    },
    {
     "text": "Ideen der Servicemitarbeitenden müssen nicht mehr geprüft werden, weil sie aus der Praxis kommen.",
     "correct": false,
     "why": "Auch Ideen aus der Praxis werden von der Runde geprüft und ausgewählt."
    },
    {
     "text": "Die Kosten für neue Dienstleistungen entfallen vollständig, weil Beschäftigte die Ideen kostenlos einbringen und die Umsetzung braucht keine Prüfung.",
     "correct": false,
     "why": "Umsetzung und Entwicklung kosten weiterhin Geld; ein Nutzen ist der Bedarfsbezug."
    }
   ],
   "multi": false,
   "explanation": "Der Vorteil ist das Erfahrungswissen aus dem Kundenkontakt, das zu bedarfsgerechteren Leistungen führt. Entscheidungsbefugnis, fehlende Prüfung und Kostenfreiheit sind unzutreffend."
  }
 },
 {
  "id": "kmp-ishikawa-diagramm-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Qualitätsmanagement",
  "concept": "ishikawa-diagramm",
  "title": "Ziele des Ishikawa-Diagramms",
  "difficulty": 3,
  "points": 8,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Onlineversand hat viele fehlerhafte Paketsendungen und untersucht die Ursachen mit einem Ishikawa-Diagramm. Welche zwei Ziele werden mit dem Diagramm verfolgt?",
  "payload": {
   "options": [
    {
     "text": "Den verantwortlichen Mitarbeiter zu ermitteln, der die Fehler verursacht hat, damit dieser bestraft werden kann.",
     "correct": false,
     "why": "Das Diagramm soll sachlich Ursachen sammeln und vorschnelle Schuldzuweisungen vermeiden."
    },
    {
     "text": "Mögliche Ursachen strukturiert und möglichst vollständig entlang der Kategorien zu sammeln.",
     "correct": true
    },
    {
     "text": "Die exakten Fehlerkosten pro Paket zu berechnen und daraus den Gesamtschaden zu ermitteln.",
     "correct": false,
     "why": "Das Diagramm berechnet keine Kosten; es ordnet Ursachen zu."
    },
    {
     "text": "Eine gemeinsame Problemsicht im Team zu schaffen und Ansatzpunkte für Verbesserungen zu finden.",
     "correct": true
    },
    {
     "text": "Den Zeitplan der Verbesserungsmaßnahmen mit Balken und Terminen für jede Aufgabe festzulegen.",
     "correct": false,
     "why": "Ein Zeitplan mit Balken ist ein Gantt-Diagramm, nicht Zweck des Ishikawa-Diagramms."
    }
   ],
   "multi": true,
   "explanation": "Das Diagramm sammelt Ursachen strukturiert, macht Zusammenhänge sichtbar, schafft gemeinsame Problemsicht und liefert Ansatzpunkte. Kosten berechnen, Zeitpläne erstellen oder Schuldige suchen gehört nicht dazu."
  }
 },
 {
  "id": "kmp-ishikawa-diagramm-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Qualitätsmanagement",
  "concept": "ishikawa-diagramm",
  "title": "Kategorie zuordnen: Maschine",
  "difficulty": 3,
  "points": 8,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Im Ishikawa-Diagramm eines Versandhändlers steht die Ursache „Der Etikettendrucker fällt zeitweise aus“. Welcher Kategorie ist sie zuzuordnen?",
  "payload": {
   "options": [
    {
     "text": "Mensch, weil Beschäftigte für den Betrieb des Druckers verantwortlich sind.",
     "correct": false,
     "why": "Ein technischer Ausfall ist keine Fehlhandlung von Personen."
    },
    {
     "text": "Methode, weil der Druck des Etiketts ein Arbeitsschritt im Ablauf ist.",
     "correct": false,
     "why": "Ein Ablauf oder Verfahren liegt nicht vor; die Ursache ist ein technisches Gerät."
    },
    {
     "text": "Maschine, weil der Ausfall eine technische Einrichtung betrifft.",
     "correct": true
    },
    {
     "text": "Material, weil Etiketten und Papier im Drucker verbraucht werden.",
     "correct": false,
     "why": "Nicht das Verbrauchsmaterial fehlt; das Gerät selbst fällt aus."
    }
   ],
   "multi": false,
   "explanation": "Ein Ausfall eines Geräts gehört zur Kategorie Maschine. Mensch betrifft Handlungen, Methode Abläufe, Material Roh- und Verbrauchsstoffe."
  }
 },
 {
  "id": "kmp-ishikawa-diagramm-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Qualitätsmanagement",
  "concept": "ishikawa-diagramm",
  "title": "Kategorie zuordnen: Messung",
  "difficulty": 3,
  "points": 8,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Bei einem Serviceportal werden viele Bewohnerparkausweise zur Nachbearbeitung zurückgegeben. Im Ishikawa-Diagramm steht die Ursache „Rückgaben werden ohne Grundcode gezählt“. Welcher Kategorie gehört sie an?",
  "payload": {
   "options": [
    {
     "text": "Mensch, weil Prüfer bei der Bearbeitung überlastet sein können.",
     "correct": false,
     "why": "Es geht um die Art des Zählens, nicht um Belastung von Personen."
    },
    {
     "text": "Maschine, weil das Portal Dateien fehlerhaft anzeigt.",
     "correct": false,
     "why": "Es handelt sich nicht um technische Fehler des Systems."
    },
    {
     "text": "Mitwelt, weil die mobile Verbindung der Antragsteller instabil sein kann.",
     "correct": false,
     "why": "Die Verbindung gehört zur Umgebung; hier geht es um die Zählweise."
    },
    {
     "text": "Messung, weil die Art der Erfassung und Zählung der Rückgaben betroffen ist.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Wie Rückgaben gezählt und erfasst werden, gehört zur Kategorie Messung. Mensch, Maschine und Mitwelt betreffen Personen, Technik und Umgebung."
  }
 },
 {
  "id": "kmp-kundenbedarfsanalyse-und-beratung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "kundenbedarfsanalyse-und-beratung",
  "title": "Methoden der Bedarfserhebung",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein IT-Dienstleister für Cloud-Backups will vor einem neuen Tarifmodell wissen, welche Anforderungen Arztpraxen an Rückspielzeiten, Support und Preis stellen. Welche drei Vorgehen erheben den Bedarf systematisch?",
  "payload": {
   "options": [
    {
     "text": "Den Preis pauschal um zehn Prozent senken und beobachten, ob mehr Praxen kündigen.",
     "correct": false,
     "why": "Das ist eine Maßnahme, keine systematische Erhebung des Bedarfs."
    },
    {
     "text": "Kundeninterviews mit Praxisinhabern zu ihren Erwartungen an Rückspielzeiten und Support",
     "correct": true
    },
    {
     "text": "Den neuen Tarif ohne Rückfrage einführen und Änderungen später bei Beschwerden vornehmen.",
     "correct": false,
     "why": "Das ist keine Erhebung vor der Einführung."
    },
    {
     "text": "Eine schriftliche oder Online-Befragung der Praxen zu Anforderungen, Preisvorstellungen und Service",
     "correct": true
    },
    {
     "text": "Ein Workshop mit Praxisvertretern, in dem Anforderungen gemeinsam gesammelt und besprochen werden",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Interviews, Befragung und Workshop erheben den Bedarf systematisch. Preissenkung oder Einführung ohne Rückfrage sind Maßnahmen und keine Erhebungsmethoden."
  }
 },
 {
  "id": "kmp-kundenbedarfsanalyse-und-beratung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "kundenbedarfsanalyse-und-beratung",
  "title": "Auswertung vorhandener Daten",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Softwarehaus für Kassensysteme will vor einem Selbstbedienungsterminal wissen, welche Funktionen Bäckereibetreiber benötigen. Die Auswertung von Support-Tickets und Änderungswünschen wird vorgeschlagen. Welche Aussage passt zu dieser Methode?",
  "payload": {
   "options": [
    {
     "text": "Sie ermittelt Bedarf aus vorhandenen Beschwerden und Änderungswünschen, ohne dass Kunden zusätzlich befragt werden müssen.",
     "correct": true
    },
    {
     "text": "Sie ist keine Methode der Bedarfserhebung, sondern eine Maßnahme zur Kundenbindung.",
     "correct": false,
     "why": "Die Auswertung vorhandener Rückmeldungen gilt als geeignete Erhebungsmethode."
    },
    {
     "text": "Sie erfordert, dass alle Betreiber zu einem gemeinsamen Termin in einem Workshop erscheinen.",
     "correct": false,
     "why": "Das beschreibt einen Workshop, nicht die Auswertung von Tickets."
    },
    {
     "text": "Sie erfasst den Bedarf durch stilles Beobachten der Abläufe in den Filialen im laufenden Betrieb und hält die Beobachtungen in einem Protokoll fest.",
     "correct": false,
     "why": "Das beschreibt die Beobachtung vor Ort, nicht die Auswertung vorhandener Daten."
    }
   ],
   "multi": false,
   "explanation": "Die Auswertung von Support-Tickets, Beschwerden und Änderungswünschen nutzt vorhandene Rückmeldungen als Bedarfsquelle, ohne neue Befragungen. Workshop und Beobachtung sind eigene Methoden."
  }
 },
 {
  "id": "kmp-kundenbedarfsanalyse-und-beratung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "kundenbedarfsanalyse-und-beratung",
  "title": "Breite Grundlage schaffen",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Anbieter von Online-Schulungen für Auszubildende will vor einem mobilen Übungsangebot den Bedarf auf eine breitere Grundlage stellen. Welche Methode liefert vergleichbare Antworten vieler Kunden?",
  "payload": {
   "options": [
    {
     "text": "Ein einzelnes Interview mit der Ausbildungsleiterin eines Kunden, weil sie die Lerngewohnheiten am besten kennt.",
     "correct": false,
     "why": "Ein Einzelinterview liefert die Sicht einer Person und keine breite Grundlage."
    },
    {
     "text": "Die Beobachtung eines einzelnen Auszubildenden beim Lernen an einem Nachmittag in dessen Betrieb.",
     "correct": false,
     "why": "Auch das erfasst nur wenige Personen."
    },
    {
     "text": "Ein Gespräch mit dem eigenen Vertrieb, der seine Vermutungen über die Wünsche der Kunden zusammenfasst.",
     "correct": false,
     "why": "Vermutungen des Vertriebs sind keine systematische Kundenerhebung."
    },
    {
     "text": "Eine standardisierte Onlinebefragung, die vielen Kunden dieselben Fragen stellt und vergleichbare Antworten liefert.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Eine standardisierte Onlinebefragung erreicht viele Kunden mit gleichen Fragen und ist vergleichbar. Einzelinterview und Einzelbeobachtung liefern nur schmale Grundlagen."
  }
 },
 {
  "id": "kmp-kundenpraesentation-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Kommunikation",
  "concept": "kundenpraesentation",
  "title": "Folienpunkte formulieren",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Eine IT-KG bewirbt sich bei einer Klinikkette. Sie hat 180 Fachkräfte, löst Störungen im Schnitt in 18 Minuten und besitzt ein ISO-27001-Zertifikat. Notizen: schnelle Hilfe, nachgewiesene Sicherheit, ausreichende Kapazität. Welche drei Folienpunkte sind geeignet?",
  "payload": {
   "options": [
    {
     "text": "Wir sind der beste Anbieter am Markt und überzeugen jeden Kunden.",
     "correct": false,
     "why": "Das ist eine unbelegte Werbeaussage ohne Beleg."
    },
    {
     "text": "Störungen werden im Durchschnitt in 18 Minuten gelöst – schnelle Hilfe",
     "correct": true
    },
    {
     "text": "Schnelle Hilfe, nachgewiesene Sicherheit, ausreichende Umsetzungskapazität",
     "correct": false,
     "why": "Das ist nur eine Kopie der Notizen ohne verdichtete Unternehmensinformation."
    },
    {
     "text": "ISO-27001-zertifizierte Informationssicherheit als Nachweis der Sicherheit",
     "correct": true
    },
    {
     "text": "180 Fachkräfte stehen für die Umsetzung der Cloud-Plattform bereit",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Gut sind Punkte, die einen belegten Fakt mit einem Nutzen verbinden: 18 Minuten, ISO-27001 und 180 Fachkräfte. Werbeslogans und reine Notizkopien werden nicht gewertet."
  }
 },
 {
  "id": "kmp-kundenpraesentation-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Kommunikation",
  "concept": "kundenpraesentation",
  "title": "Kundenbotschaft zum Schichtbetrieb",
  "difficulty": 2,
  "points": 6,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein IT-Dienstleister (seit 2008, 140 Fachkräfte, vier Standorte, 260 Kunden, 24/7-Bereitschaftsteam, ISO 9001) stellt sich einer Logistik-KG mit durchgängigem Schichtbetrieb vor, die den Betrieb ihrer Infrastruktur auslagern will. Welche Kundenbotschaft passt am besten?",
  "payload": {
   "options": [
    {
     "text": "Wir wurden 2008 gegründet, ein schönes Jahr für unser Unternehmen.",
     "correct": false,
     "why": "Das Gründungsjahr wird genannt, aber ohne Bedeutung für den Kunden."
    },
    {
     "text": "Das rund um die Uhr erreichbare Bereitschaftsteam unterstützt auch bei Störungen im nächtlichen Schichtbetrieb.",
     "correct": true
    },
    {
     "text": "Durch vier Standorte sind wir der günstigste Anbieter in ganz Deutschland.",
     "correct": false,
     "why": "Aus vier Standorten folgt keine Preisaussage; die Behauptung ist unbelegt."
    },
    {
     "text": "Die ISO-9001-Zertifizierung macht uns zum größten IT-Dienstleister des Landes, weil wir an jedem Ort denselben Preis verlangen.",
     "correct": false,
     "why": "Ein Zertifikat belegt geregelte Abläufe, nicht die Größe des Unternehmens."
    }
   ],
   "multi": false,
   "explanation": "Eine gute Botschaft verbindet einen Rohfakt mit seiner Bedeutung für den Kunden: Das 24/7-Bereitschaftsteam passt zum Schichtbetrieb. Bloße Fakten oder unbelegte Behauptungen zählen nicht."
  }
 },
 {
  "id": "kmp-kundenpraesentation-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Kommunikation",
  "concept": "kundenpraesentation",
  "title": "Fakt der passenden Notiz zuordnen",
  "difficulty": 1,
  "points": 3,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Ein Softwarehaus präsentiert bei einem Maschinenbauer seine Software für digitale Wartungsakten. Es hat 46 Altsysteme erfolgreich migriert. Zu welcher Kundennotiz passt dieser Fakt am besten?",
  "payload": {
   "options": [
    {
     "text": "Einsatz für die Region",
     "correct": false,
     "why": "Die Zahl der Migrationen hat keinen Bezug zum Engagement für die Region."
    },
    {
     "text": "Prüfbare Dokumentation",
     "correct": false,
     "why": "Diese Notiz passt zur revisionssicheren Protokollierung, nicht zu den Migrationen."
    },
    {
     "text": "Verständnis des Arbeitsumfelds",
     "correct": false,
     "why": "Dazu passt eher die Erfahrung aus industriellen Instandhaltungsprojekten."
    },
    {
     "text": "Verlässlicher Systemwechsel",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "46 erfolgreich migrierte Altsysteme belegen Erfahrung mit dem Systemwechsel; das passt zur Notiz verlässlicher Systemwechsel. Die anderen Notizen benötigen andere Fakten."
  }
 },
 {
  "id": "kmp-lasten-und-pflichtenheft-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "lasten-und-pflichtenheft",
  "title": "Lastenheft und Pflichtenheft unterscheiden",
  "difficulty": 2,
  "points": 4,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Die Bäckereikette Kornblum beauftragt das Softwarehaus DigitalOven mit einem Online-Vorbestelldienst. Es entstehen ein Lastenheft und ein Pflichtenheft. Welche Aussage ordnet beide Dokumente richtig zu?",
  "payload": {
   "options": [
    {
     "text": "Das Lastenheft schreibt das Softwarehaus, das Pflichtenheft die Bäckereikette, weil diese die Software abnimmt.",
     "correct": false,
     "why": "Die Zuordnung ist vertauscht."
    },
    {
     "text": "Beide Dokumente erstellt das Softwarehaus allein, weil nur es die Technik kennt und Anforderungen beurteilen kann und der Auftraggeber sie nur unterschreibt.",
     "correct": false,
     "why": "Das Lastenheft gibt den Bedarf des Auftraggebers wieder."
    },
    {
     "text": "Das Lastenheft konkretisiert den technischen Lösungsweg, das Pflichtenheft nennt nur den Bedarf der Bäckereikette.",
     "correct": false,
     "why": "Die Rollen der Dokumente sind vertauscht."
    },
    {
     "text": "Das Lastenheft hält den Bedarf der Bäckereikette fest, das Pflichtenheft die vom Softwarehaus verbindlich zugesagten Leistungen.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Das Lastenheft beschreibt den Bedarf des Auftraggebers, das Pflichtenheft die zugesagten Leistungen des Auftragnehmers. Die anderen Aussagen vertauschen die Rollen."
  }
 },
 {
  "id": "kmp-lasten-und-pflichtenheft-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "lasten-und-pflichtenheft",
  "title": "Ergebnis oder Lösungsweg",
  "difficulty": 2,
  "points": 4,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Eine Bibliothek vergibt die automatisierte Medienrückgabe an einen IT-Dienstleister. Lastenheft und Pflichtenheft werden verwendet. Welche Gegenüberstellung trifft zu?",
  "payload": {
   "options": [
    {
     "text": "Das Lastenheft benennt das benötigte Ergebnis, das Pflichtenheft konkretisiert den Lösungsweg samt einzusetzender Mittel.",
     "correct": true
    },
    {
     "text": "Das Lastenheft nennt den Lösungsweg mit Mitteln, das Pflichtenheft nur das gewünschte Ergebnis in einem Satz.",
     "correct": false,
     "why": "Die Rollen der beiden Dokumente sind vertauscht."
    },
    {
     "text": "Beide Dokumente beschreiben ausschließlich die Kosten, nur in unterschiedlicher Reihenfolge und Darstellung.",
     "correct": false,
     "why": "Beide Dokumente haben andere Inhalte und Zwecke als reine Kosten."
    },
    {
     "text": "Das Lastenheft enthält den Quellcode der Rückgabesoftware, das Pflichtenheft den Zeitplan für den Vertrieb.",
     "correct": false,
     "why": "Quellcode und Vertriebszeitplan sind nicht die Inhalte dieser Dokumente."
    }
   ],
   "multi": false,
   "explanation": "Lastenheft: was wird benötigt (Ergebnis). Pflichtenheft: wie und womit setzt der Auftragnehmer es um (Lösungsweg, Mittel)."
  }
 },
 {
  "id": "kmp-lasten-und-pflichtenheft-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "lasten-und-pflichtenheft",
  "title": "Inhalte des Lastenhefts",
  "difficulty": 2,
  "points": 5,
  "figure": "makler",
  "source": "AP2",
  "prompt": "Die Feinbäckerei Kornmühle will Bestellungen über eine Online-Plattform annehmen und erstellt für ein externes Softwarehaus ein Lastenheft. Welche drei Angaben gehören üblicherweise hinein?",
  "payload": {
   "options": [
    {
     "text": "Ausgangssituation und Projektziel der Feinbäckerei",
     "correct": true
    },
    {
     "text": "Die konkrete technische Umsetzung mit gewählter Softwarearchitektur",
     "correct": false,
     "why": "Die technische Umsetzung legt der Auftragnehmer im Pflichtenheft fest."
    },
    {
     "text": "Funktionale und nichtfunktionale Anforderungen an das System, etwa Verfügbarkeit und Datenschutz",
     "correct": true
    },
    {
     "text": "Die vom Softwarehaus zugesagte Lösung mit verbindlichem Leistungsumfang samt Preisen für Wartung und Betrieb der Lösung.",
     "correct": false,
     "why": "Die zugesagte Lösung gehört ins Pflichtenheft, nicht ins Lastenheft."
    },
    {
     "text": "Zeitrahmen und Budget des Vorhabens",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Ins Lastenheft gehören Ausgangssituation, Projektziel, Anforderungen, Zeitrahmen und Budget. Technische Umsetzung und verbindlich zugesagte Leistungen stehen im Pflichtenheft."
  }
 },
 {
  "id": "kmp-machbarkeitsanalyse-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "machbarkeitsanalyse",
  "title": "Machbarkeitskriterien wählen",
  "difficulty": 3,
  "points": 9,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Bauhof plant eine App zur Schadenserfassung mit Fotos und Standortdaten, gebaut von zwei internen Entwicklern in sechs Monaten mit Schnittstelle zum Geoinformationssystem. Welche drei Machbarkeitskriterien sind für die Prüfung geeignet?",
  "payload": {
   "options": [
    {
     "text": "Technische Machbarkeit: unterschiedliche Smartphone-Betriebssysteme, Offlinebetrieb und Anbindung an das Geoinformationssystem",
     "correct": true
    },
    {
     "text": "Marktmachbarkeit: Analyse der Wettbewerber im Straßenbau, um Marktanteile zu bestimmen",
     "correct": false,
     "why": "Ein Bauhof steht nicht im Wettbewerb; Marktanalyse ist hier keine sinnvolle Prüfung."
    },
    {
     "text": "Organisatorische Machbarkeit: Verfügbarkeit des kleinen Teams und Einbindung der Bauhofmitarbeiter im Zeitrahmen",
     "correct": true
    },
    {
     "text": "Werbliche Machbarkeit: Planung einer Plakatkampagne für Bürger, die Schäden künftig melden sollen und sich über Hinweise in Amtsblättern informieren.",
     "correct": false,
     "why": "Werbung gehört nicht zur Machbarkeit des Systems selbst."
    },
    {
     "text": "Rechtliche Machbarkeit: Zulässigkeit der Verarbeitung von Foto- und Standortdaten und Beteiligungsrechte",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Sinnvoll sind technische, organisatorische und rechtliche Machbarkeit, jeweils fallbezogen erläutert. Marktanalyse und Werbung passen nicht zu einem kommunalen Bauhof-Projekt."
  }
 },
 {
  "id": "kmp-machbarkeitsanalyse-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "machbarkeitsanalyse",
  "title": "Technische Machbarkeit: Klärungsfragen",
  "difficulty": 3,
  "points": 9,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Verbund aus fünf Tierarztpraxen will ein gemeinsames System für Behandlungsdaten. Die Standorte nutzen unterschiedliche Praxisprogramme. Welche Klärungsfrage gehört zur technischen Machbarkeit?",
  "payload": {
   "options": [
    {
     "text": "Wie hoch sind Anschaffungs- und Betriebskosten und reicht das Budget des Verbunds dafür aus?",
     "correct": false,
     "why": "Das gehört zur wirtschaftlichen Machbarkeit."
    },
    {
     "text": "Wie werden Behandlungs- und Halterdaten datenschutzkonform gespeichert und ausgetauscht?",
     "correct": false,
     "why": "Das gehört zur rechtlichen Machbarkeit."
    },
    {
     "text": "Wie können Altdaten aus den verschiedenen Praxisprogrammen übernommen und die Standorte angebunden werden?",
     "correct": true
    },
    {
     "text": "Wie viel Schulung benötigen die Teilzeitkräfte, und sind ausreichend Projektressourcen vorhanden?",
     "correct": false,
     "why": "Das gehört zur organisatorischen Machbarkeit."
    }
   ],
   "multi": false,
   "explanation": "Datenübernahme aus verschiedenen Programmen und standortübergreifende Anbindung sind technische Fragen. Kosten sind wirtschaftlich, Datenschutz rechtlich, Schulung organisatorisch."
  }
 },
 {
  "id": "kmp-machbarkeitsanalyse-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "machbarkeitsanalyse",
  "title": "Rechtliche Machbarkeit: Klärungsfragen",
  "difficulty": 3,
  "points": 9,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Bibliotheksverbund führt ein gemeinsames Ausleihsystem für fünf Zweigstellen ein, verarbeitet Nutzerstammdaten und Ausleihhistorien und erwägt externes Hosting. Welche Prüfung gehört zur rechtlichen Machbarkeit?",
  "payload": {
   "options": [
    {
     "text": "Kalkulation von Lizenz-, Migrations- und Schulungskosten sowie Folgekosten für Support",
     "correct": false,
     "why": "Das ist eine wirtschaftliche Prüfung."
    },
    {
     "text": "Eignung und Vereinheitlichung der Netzanbindungen in den Zweigstellen",
     "correct": false,
     "why": "Das ist eine technische Prüfung."
    },
    {
     "text": "Abwägung zwischen eigenem IT-Personal und externer Vergabe des Projekts",
     "correct": false,
     "why": "Das ist eine Frage von Ressourcen und Organisation."
    },
    {
     "text": "Datenschutz der Nutzerdaten, Auftragsverarbeitung beim externen Hosting und Löschfristen",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Datenschutz, Auftragsverarbeitung bei externem Hosting und Löschfristen sind rechtliche Fragen. Kosten sind wirtschaftlich, Netzanbindung ist technisch, Personal ist organisatorisch."
  }
 }
]);

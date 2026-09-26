window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "funktionale-und-nichtfunktionale-anforderungen",
  "title": "Funktionale und nichtfunktionale Anforderungen",
  "figure": "startup",
  "lines": [
   "Merk dir: Eine funktionale Anforderung beschreibt eine konkrete Systemleistung – was das System tun soll, etwa Daten erfassen oder suchen.",
   "Eine nichtfunktionale Anforderung beschreibt eine Qualitätseigenschaft – wie gut das System arbeitet, etwa Verfügbarkeit, Bedienbarkeit, Antwortzeit oder Datenschutz.",
   "Beispiel: „Mitglied kann sich für eine Trainingseinheit an- und abmelden“ ist funktional; „auch am Smartphone gut bedienbar“ ist nichtfunktional.",
   "Wichtig ist: Ein sinnvolles Anforderungspaar besteht aus einer Funktion und einer Qualitätsbedingung mit Bezug zur Nutzungssituation."
  ]
 },
 {
  "concept": "gantt-diagramm",
  "title": "Gantt-Diagramm und Netzplan",
  "figure": "kalle",
  "lines": [
   "Merk dir: Das Gantt-Diagramm zeigt Vorgänge als Balken auf einer Zeitachse. Anfang, Ende und Dauer sind direkt ablesbar.",
   "Der Netzplan stellt die logischen Abhängigkeiten zwischen Vorgängen dar und ermöglicht die Berechnung von frühesten und spätesten Zeitpunkten sowie Pufferzeiten.",
   "Ein Vorgang mit Puffer darf sich verzögern, ohne dass das Projektende später wird. Vorgänge ohne Puffer liegen auf dem kritischen Pfad.",
   "Wichtig ist: Ordne Eigenschaften immer der richtigen Darstellung zu – Balken und Zeitachse gehören zum Gantt-Diagramm, Abhängigkeiten und Puffer zum Netzplan."
  ]
 },
 {
  "concept": "geschaeftsprozessanalyse",
  "title": "Geschäftsprozessanalyse",
  "figure": "kalle",
  "lines": [
   "Merk dir: Bei der Ist-Aufnahme erfasst man den aktuellen Ablauf mit Verfahren wie Beobachtung, Interview und Dokumentenanalyse.",
   "Ergänzend kann man Befragungen oder Auswertungen vorhandener Daten nutzen. Man wählt Verfahren passend zu dem, was im Betrieb zugänglich ist.",
   "Bei einem Problem stellt man Ursachenhypothesen auf und prüft sie an Daten, statt sofort einen Schuldigen wie die neue Software zu benennen.",
   "Typische Kritikpunkte am Ist-Prozess sind Medienbrüche mit manueller Übertragung und lange Durchlaufzeiten durch gebündelte Übergaben."
  ]
 },
 {
  "concept": "geschaeftsprozessdigitalisierung",
  "title": "Geschäftsprozessdigitalisierung",
  "figure": "startup",
  "lines": [
   "Merk dir: Digitalisierung heißt, ein Ereignis oder Datum digital zu erfassen, im System zu verarbeiten und damit den Ablauf zu verbessern.",
   "Beispiel Umschlaglager: Eine Kamera erfasst ein einfahrendes Fahrzeug, das System gleicht es mit Anmeldedaten ab, das Tor wird schneller abgefertigt.",
   "Wichtig ist die Kette aus drei Gliedern: Erfassung, Verarbeitung oder Verknüpfung mit vorhandenen Daten, Wirkung auf den Ablauf.",
   "Eine bloße Nennung von Technik ohne Verarbeitung und Wirkung reicht nicht; Aufnahmen, die nur archiviert werden, verbessern keinen Prozess."
  ]
 },
 {
  "concept": "geschaeftsprozessmodellierung",
  "title": "Geschäftsprozessmodellierung",
  "figure": "kalle",
  "lines": [
   "Merk dir: Ein UML-Aktivitätsdiagramm zeigt den Ablauf eines Geschäftsprozesses als Folge von Aktionen mit Start, Ende und Verzweigungen.",
   "Vorteil: Zuständigkeiten und Übergaben werden erkennbar, wenn man Verantwortungsbereiche als Bahnen darstellt.",
   "Vorteil: Alternative Wege und ihre Bedingungen werden über Entscheidungen sichtbar, sodass Abweichungen einheitlich behandelt werden.",
   "Vorteil: Gleichzeitig ausführbare Schritte und Abstimmungspunkte zeigt man mit Gabelung und Zusammenführung; das erleichtert die zeitliche Planung.",
   "Wichtig ist: Ein bloßes Schlagwort genügt nicht – ein Vorteil braucht immer eine nachvollziehbare Wirkung."
  ]
 },
 {
  "concept": "geschaeftsprozessoptimierung",
  "title": "Geschäftsprozessoptimierung",
  "figure": "kalle",
  "lines": [
   "Merk dir: Digitale Prozesse sparen Aufwand, wenn Kunden ihre Daten selbst erfassen und Angaben ohne Abtippen direkt in die Planung gelangen.",
   "Pflichtangaben werden vor dem Absenden geprüft, deshalb sind Nachforderungen und Rückfragen seltener. Medienbrüche entfallen.",
   "Eine Optimierung beurteilt man nach Prozess- und Wirtschaftswirkung: Automatisierbares entfällt, persönliche Beratung und Konfliktklärung bleiben oft personengebunden.",
   "Wichtig ist: Ein begründeter teilweiser Personalabbau kann besser sein als ein vollständiger; frei werdende Zeit kann für Beratung genutzt werden."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-funktionale-und-nichtfunktionale-anforderungen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "funktionale-und-nichtfunktionale-anforderungen",
  "title": "Nichtfunktionale Anforderungen erkennen",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Sportverein baut eine Webanwendung zur Anmeldung zu Trainingseinheiten für Mitglieder am Computer und Smartphone. Welche zwei der folgenden Anforderungen sind nichtfunktional?",
  "payload": {
   "options": [
    {
     "text": "Ein Mitglied kann sich für eine Trainingseinheit an- und wieder abmelden.",
     "correct": false,
     "why": "Das ist eine konkrete Systemleistung und damit funktional."
    },
    {
     "text": "Die Anwendung ist auch auf dem Smartphone gut bedienbar.",
     "correct": true
    },
    {
     "text": "Die Anzahl der noch freien Plätze je Einheit wird angezeigt.",
     "correct": false,
     "why": "Die Anzeige freier Plätze ist eine konkrete Funktion des Systems und damit funktional."
    },
    {
     "text": "Die Anmeldung ist rund um die Uhr verfügbar.",
     "correct": true
    },
    {
     "text": "Nach jeder Anmeldung wird automatisch eine Bestätigung versendet.",
     "correct": false,
     "why": "Der automatische Versand ist eine konkrete Systemleistung und damit funktional."
    }
   ],
   "multi": true,
   "explanation": "Bedienbarkeit auf dem Smartphone und Verfügbarkeit beschreiben Qualitätseigenschaften und sind nichtfunktional. An- und Abmelden, Anzeige freier Plätze und Bestätigung sind konkrete Systemleistungen."
  }
 },
 {
  "id": "kmp-funktionale-und-nichtfunktionale-anforderungen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "funktionale-und-nichtfunktionale-anforderungen",
  "title": "Anforderungspaar für Lageranwendung",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Großhandel führt eine Anwendung für sein Ersatzteillager ein, genutzt im Schichtbetrieb von unterschiedlich erfahrenen Beschäftigten. Welches Paar aus einer funktionalen und einer nichtfunktionalen Anforderung ist richtig zugeordnet?",
  "payload": {
   "options": [
    {
     "text": "Funktional: Die Oberfläche ist ohne lange Einarbeitung verständlich. Nichtfunktional: Die Anwendung zeigt die Bestandsliste an, auch in allen Hallen des Standorts.",
     "correct": false,
     "why": "Die Zuordnung ist vertauscht: Verständlichkeit ist eine Qualität, die Bestandsliste eine Funktion."
    },
    {
     "text": "Funktional: Die Anwendung erfasst und speichert einen Lagerplatzwechsel. Nichtfunktional: Die Oberfläche ist ohne lange Einarbeitung verständlich.",
     "correct": true
    },
    {
     "text": "Funktional: Die Anwendung erfasst einen Lagerplatzwechsel. Nichtfunktional: Die Anwendung speichert Aufträge in der Datenbank.",
     "correct": false,
     "why": "Das Speichern von Aufträgen ist eine Funktion; beide Nennungen wären funktional."
    },
    {
     "text": "Funktional: Die Bedienung ist auch für Aushilfen einfach. Nichtfunktional: Die Anwendung ist im Schichtbetrieb erreichbar.",
     "correct": false,
     "why": "Beide Nennungen sind Qualitätsbedingungen; es fehlt eine funktionale Anforderung."
    }
   ],
   "multi": false,
   "explanation": "Das Erfassen und Speichern eines Lagerplatzwechsels ist eine Funktion, die leichte Verständlichkeit eine Qualitätseigenschaft. Zwei Funktionen oder zwei Qualitätsbedingungen erfüllen den Auftrag nicht."
  }
 },
 {
  "id": "kmp-funktionale-und-nichtfunktionale-anforderungen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "funktionale-und-nichtfunktionale-anforderungen",
  "title": "Funktionale Anforderung einordnen",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Kulturarchiv führt eine Webanwendung für die Bestandsarbeit ein. Eine Anforderung lautet: „Die Anwendung erlaubt die Recherche nach Archivalien anhand ihrer Beschreibungsdaten.“ Wie ist sie einzuordnen?",
  "payload": {
   "options": [
    {
     "text": "Nichtfunktional, weil sie beschreibt, wie zuverlässig und schnell das System insgesamt arbeiten soll.",
     "correct": false,
     "why": "Von Zuverlässigkeit oder Schnelligkeit steht dort nichts; die Anforderung nennt eine Leistung."
    },
    {
     "text": "Nichtfunktional, weil es eine Webanwendung ist und Anforderungen an Webanwendungen immer Qualitätsanforderungen sind.",
     "correct": false,
     "why": "Auch Webanwendungen haben funktionale Anforderungen; die Technik bestimmt die Art nicht."
    },
    {
     "text": "Funktional, weil sie eine konkrete Leistung des Systems beschreibt, nämlich die Recherche in den Daten.",
     "correct": true
    },
    {
     "text": "Keines von beiden, weil sie nur eine Rahmenbedingung des Projekts ohne Bezug zum System darstellt.",
     "correct": false,
     "why": "Die Anforderung bezieht sich unmittelbar auf eine Systemleistung."
    }
   ],
   "multi": false,
   "explanation": "Eine Recherchefunktion ist eine konkrete Systemleistung und damit funktional. Nichtfunktional wären Qualitäten wie Konsistenz bei gleichzeitigem Arbeiten oder Bedienbarkeit."
  }
 },
 {
  "id": "kmp-gantt-diagramm-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "gantt-diagramm",
  "title": "Eigenschaften des Gantt-Diagramms",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Projektteam grenzt in einer Schulungsunterlage das Gantt-Diagramm vom Netzplan ab. Welche zwei Aussagen treffen auf das Gantt-Diagramm zu?",
  "payload": {
   "options": [
    {
     "text": "Vorgänge werden als Balken auf einer Zeitachse dargestellt.",
     "correct": true
    },
    {
     "text": "Frühester und spätester Zeitpunkt sowie Puffer je Vorgang stehen als Kernaussage im Mittelpunkt.",
     "correct": false,
     "why": "Das kennzeichnet den Netzplan; das Gantt-Diagramm zeigt vor allem Lage und Dauer."
    },
    {
     "text": "Vorgänge sind als Knoten dargestellt, die durch Pfeile ihre logischen Abhängigkeiten zeigen.",
     "correct": false,
     "why": "Knoten und Pfeile sind typisch für den Netzplan, nicht für das Gantt-Diagramm."
    },
    {
     "text": "Anfangszeitpunkte, Endzeitpunkte und Dauern der Vorgänge lassen sich unmittelbar ablesen.",
     "correct": true
    },
    {
     "text": "Es zeigt den Datenfluss zwischen den Softwarekomponenten des geplanten Systems im Projekt.",
     "correct": false,
     "why": "Ein Datenfluss ist Gegenstand der Systemmodellierung, nicht der Terminplanung."
    }
   ],
   "multi": true,
   "explanation": "Das Gantt-Diagramm zeigt Vorgänge als Balken auf einer Zeitachse; Anfang, Ende und Dauer sind sichtbar. Abhängigkeiten, Knoten und Pufferberechnung gehören zum Netzplan."
  }
 },
 {
  "id": "kmp-gantt-diagramm-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "gantt-diagramm",
  "title": "Eigenschaften des Netzplans",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Projektteam dokumentiert für eine Lagerautomatisierung Wissen über Planungsdarstellungen. Welche zwei Aussagen treffen auf den Netzplan zu?",
  "payload": {
   "options": [
    {
     "text": "Die logischen Abhängigkeiten zwischen den Vorgängen werden dargestellt.",
     "correct": true
    },
    {
     "text": "Vorgänge erscheinen als Balken, deren Länge direkt der Dauer auf der Kalenderachse entspricht.",
     "correct": false,
     "why": "Das ist das Merkmal des Gantt-Diagramms, nicht des Netzplans."
    },
    {
     "text": "Frühester und spätester Zeitpunkt der Vorgänge und damit Pufferzeiten lassen sich ermitteln.",
     "correct": true
    },
    {
     "text": "Sein Hauptzweck ist die Kostenkalkulation je Arbeitspaket samt Angebot an den Kunden.",
     "correct": false,
     "why": "Die Kalkulation ist nicht der Zweck des Netzplans; er dient der Ablauf- und Terminplanung."
    },
    {
     "text": "Die Vorgänge werden alphabetisch angeordnet, damit sie leichter gefunden werden können.",
     "correct": false,
     "why": "Die Anordnung folgt der logischen Abfolge, nicht dem Alphabet."
    }
   ],
   "multi": true,
   "explanation": "Der Netzplan bildet Abhängigkeiten ab und erlaubt die Ermittlung von frühesten und spätesten Zeitpunkten und Pufferzeiten. Balken auf der Zeitachse sind Gantt."
  }
 },
 {
  "id": "kmp-gantt-diagramm-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Projektmanagement",
  "concept": "gantt-diagramm",
  "title": "Bedeutung von Pufferzeit",
  "difficulty": 1,
  "points": 1,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "In einem Gantt-Plan hat der Vorgang „Schulung“ zwei Tage Pufferzeit. Was bedeutet das?",
  "payload": {
   "options": [
    {
     "text": "Der Vorgang darf sich um bis zu zwei Tage verzögern, ohne dass das Projektende später wird.",
     "correct": true
    },
    {
     "text": "Der Vorgang dauert zwei Tage länger als geplant und verschiebt dadurch das Projektende um zwei Tage.",
     "correct": false,
     "why": "Puffer ist Spielraum ohne Auswirkung auf das Ende, keine Verlängerung der Dauer."
    },
    {
     "text": "Der Vorgang muss zwei Tage vor dem eigentlichen Projektstart beginnen, damit alles rechtzeitig fertig wird.",
     "correct": false,
     "why": "Puffer beschreibt Spielraum im Ablauf, nicht einen Beginn vor dem Projektstart."
    },
    {
     "text": "Der Vorgang liegt auf dem kritischen Pfad, weil jeder Verzug sofort das Projektende verschiebt.",
     "correct": false,
     "why": "Auf dem kritischen Pfad gibt es gerade keinen Puffer."
    }
   ],
   "multi": false,
   "explanation": "Pufferzeit ist der Spielraum, um den sich ein Vorgang verzögern darf, ohne das Projektende zu verschieben. Vorgänge ohne Puffer liegen auf dem kritischen Pfad."
  }
 },
 {
  "id": "kmp-geschaeftsprozessanalyse-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessanalyse",
  "title": "Verfahren der Ist-Aufnahme",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein kommunaler Baubetrieb will seinen Bestand an Fahrzeugen und Geräten erstmals einheitlich erfassen. Verantwortliche sind vor Ort erreichbar, Beschaffungsakten und Wartungsnachweise liegen vor. Welche drei Verfahren eignen sich für die Ist-Aufnahme?",
  "payload": {
   "options": [
    {
     "text": "Interviews mit den verantwortlichen Beschäftigten vor Ort",
     "correct": true
    },
    {
     "text": "Ein Lasttest der geplanten Verwaltungssoftware mit vielen gleichzeitigen Nutzern",
     "correct": false,
     "why": "Ein Lasttest prüft Software; hier soll erst der aktuelle Bestand erhoben werden."
    },
    {
     "text": "Beobachtung bzw. Inaugenscheinnahme der Objekte auf den Betriebshöfen",
     "correct": true
    },
    {
     "text": "Ein Abnahmetest der neuen Software durch die Fachabteilung nach der Einführung",
     "correct": false,
     "why": "Ein Abnahmetest liegt nach der Einführung; er erfasst keinen Ist-Zustand."
    },
    {
     "text": "Dokumentenanalyse der Beschaffungsakten, Wartungsnachweise und alten Bestandslisten",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Für die Ist-Aufnahme eignen sich Beobachtung, Interview und Dokumentenanalyse. Lasttest und Abnahmetest beziehen sich auf Software und nicht auf den vorhandenen Bestand."
  }
 },
 {
  "id": "kmp-geschaeftsprozessanalyse-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessanalyse",
  "title": "Ursache bei doppelten Buchungen",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Pflegedienst erfasst Einsatzzeiten per mobiler App. Einzelne Besuche erscheinen mehrfach in der Abrechnung; die Verwaltung macht sofort die App verantwortlich. Die Geräte nutzen unterschiedliche Mobilfunknetze, Protokolle und Zeitstempel liegen vor. Welche Ursache sollte als Nächstes geprüft werden?",
  "payload": {
   "options": [
    {
     "text": "Unterbrochene Übertragungen, bei denen Beschäftigte eine Buchung erneut senden und so Dubletten mit doppelten Zeitstempeln entstehen.",
     "correct": true
    },
    {
     "text": "Die Beschäftigten tragen absichtlich Einsätze doppelt ein, um höhere Vergütung zu erhalten und Kontrollen zu umgehen.",
     "correct": false,
     "why": "Das ist eine unbelegte Unterstellung; Analyse prüft Ursachen an Daten und nicht nach Verdacht."
    },
    {
     "text": "Die App wird sofort ausgetauscht, weil die Verwaltung sie als Verursacher genannt hat und weitere Prüfung unnötig ist, was vorher niemand bemerkt hatte.",
     "correct": false,
     "why": "Ohne Prüfung an Protokollen bleibt die Ursache unbekannt; die Analyse würde übersprungen."
    },
    {
     "text": "Die Abrechnungsformulare sind zu spät gedruckt worden, weshalb Besuche nachträglich auf Papier ergänzt werden mussten.",
     "correct": false,
     "why": "Die Buchungen entstehen in der App; ein Druckzeitpunkt erklärt keine mehrfachen Einträge."
    }
   ],
   "multi": false,
   "explanation": "Naheliegend und prüfbar ist eine Ursache im Datenweg: Bei Verbindungsabbrüchen wird erneut gesendet und es entstehen Dubletten. Protokolle und doppelte Zeitstempel können das belegen."
  }
 },
 {
  "id": "kmp-geschaeftsprozessanalyse-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessanalyse",
  "title": "Kritik am Ist-Prozess",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Veranstaltungsservice bearbeitet Anträge so: Antrag als PDF per E-Mail, manuelle Übertragung in eine Tabelle, wöchentliche Liste an das Ordnungsamt, später Weitergabe an die Verkehrsplanung, deren Stellungnahme in eigener Datei zurückkommt. Welche zwei Kritikpunkte sind berechtigt?",
  "payload": {
   "options": [
    {
     "text": "Das Bürgerbüro überträgt Angaben manuell in eine Tabelle, ein Medienbruch mit Gefahr von Übertragungsfehlern.",
     "correct": true
    },
    {
     "text": "Das Ordnungsamt prüft die Angaben der Anträge auf Vollständigkeit, was grundsätzlich überflüssig ist und dadurch Nachfragen erzeugt.",
     "correct": false,
     "why": "Die Prüfung ist fachlich sinnvoll; kritisiert wird der Ablauf, nicht das Prüfen selbst."
    },
    {
     "text": "Der Bescheid wird vom Bürgerbüro versendet, wodurch zwingend eine Doppelarbeit entsteht.",
     "correct": false,
     "why": "Der Versand durch eine Stelle ist nicht zwingend doppelt; der Ablauf liefert hier keinen Beleg."
    },
    {
     "text": "Wöchentlich gebündelte Übergaben verlängern die Durchlaufzeit, da Anträge auf den nächsten Stichtag warten.",
     "correct": true
    },
    {
     "text": "Das PDF-Formular ist als Dateiformat grundsätzlich unzulässig, weil es nicht bearbeitet werden kann.",
     "correct": false,
     "why": "Das Format ist nicht das Problem; kritisiert werden manuelle Übertragung und Wartezeiten."
    }
   ],
   "multi": true,
   "explanation": "Berechtigt sind der Medienbruch mit manueller Übertragung (Fehlerquelle) und die lange Durchlaufzeit durch wöchentlich gebündelte Übergaben. Die übrigen Aussagen sind unbelegt."
  }
 },
 {
  "id": "kmp-geschaeftsprozessdigitalisierung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessdigitalisierung",
  "title": "Kamera am Werktor sinnvoll nutzen",
  "difficulty": 1,
  "points": 3,
  "figure": "startup",
  "source": "AP2",
  "prompt": "In einem Umschlaglager wird jeder ankommende Lkw manuell am Tor abgefertigt, es entstehen Wartezeiten und Rückstau. An der Einfahrt hängt eine Kamera. Welcher Einsatz unterstützt den Ablauf digital sinnvoll?",
  "payload": {
   "options": [
    {
     "text": "Die Kamera erfasst das Kennzeichen, das System gleicht es mit den Anmeldedaten ab und fertigt das Fahrzeug schneller ab.",
     "correct": true
    },
    {
     "text": "Die Kamera zeichnet den Verkehr auf, und die Aufnahmen werden im Archiv gespeichert, falls später etwas nachzuprüfen ist.",
     "correct": false,
     "why": "Die Aufnahmen werden nicht verarbeitet; der Ablauf am Tor verändert sich nicht."
    },
    {
     "text": "Die Kamera ersetzt den Pförtner, der jedes Fahrzeug weiterhin per Hand prüft, aber die Sicht vom Büro aus erhält.",
     "correct": false,
     "why": "Die Abfertigung bleibt manuell; ohne Datenverknüpfung sinken Wartezeiten kaum."
    },
    {
     "text": "Zusätzliche Kameras werden aufgestellt, damit die Fahrer im Rückstau den Wartebereich auf einem Bildschirm sehen.",
     "correct": false,
     "why": "Das zeigt den Stau, löst aber nicht die Ursache der langsamen Abfertigung."
    }
   ],
   "multi": false,
   "explanation": "Der Weg lautet Erfassung (Kennzeichen), Verarbeitung (Abgleich mit Anmeldedaten) und Wirkung (schnellere Abfertigung, weniger Rückstau). Reine Aufzeichnung oder mehr Kameras ändern den Ablauf nicht."
  }
 },
 {
  "id": "kmp-geschaeftsprozessdigitalisierung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessdigitalisierung",
  "title": "Videoüberwachung und Rampenplanung",
  "difficulty": 1,
  "points": 3,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Vor einem Getränkegroßhandel warten morgens mehrere Lkw auf ihre Rampe, die Reihenfolge wird telefonisch abgestimmt, Rampen liegen zeitweise brach. Eine Videoüberwachung erfasst den Hof. Wie kann diese den Ablauf digital verbessern?",
  "payload": {
   "options": [
    {
     "text": "Die Videoüberwachung wird zusätzlich an das Telefonsystem angeschlossen, damit die Anrufe der Disponenten aufgezeichnet werden.",
     "correct": false,
     "why": "Die Abstimmung bleibt telefonisch; der Leerlauf an den Rampen ändert sich nicht."
    },
    {
     "text": "Die Videoüberwachung erkennt ankommende Lkw, das System verknüpft sie mit der Rampen- und Tourenplanung und weist eine freie Rampe zu.",
     "correct": true
    },
    {
     "text": "Die Bilder werden auf einem Monitor im Büro gezeigt, sodass der Disponent Lkw sehen kann, wenn er zufällig hinschaut.",
     "correct": false,
     "why": "Die Bilder werden nicht verarbeitet; die Zuweisung bleibt von Zufall und Telefon abhängig."
    },
    {
     "text": "Die Videoüberwachung speichert alle Bilder für zehn Jahre, damit die Auslastung später einmal ausgewertet werden könnte.",
     "correct": false,
     "why": "Späteres Auswerten verbessert nicht den heutigen Ablauf der Abfertigung."
    }
   ],
   "multi": false,
   "explanation": "Die Videoerfassung liefert das Ereignis, die Verknüpfung mit Rampen- und Tourenplanung die Verarbeitung, die automatische Rampenzuweisung die Wirkung: gleichmäßigere Auslastung ohne Telefonat."
  }
 },
 {
  "id": "kmp-geschaeftsprozessdigitalisierung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessdigitalisierung",
  "title": "Was zu einer guten Erläuterung gehört",
  "difficulty": 1,
  "points": 3,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Sie sollen erläutern, wie eine Kamera am Betriebshof einen Abladeprozess digital unterstützt. Was muss eine tragfähige Erläuterung enthalten?",
  "payload": {
   "options": [
    {
     "text": "Nur den Namen der Technik, etwa „Kamera mit Bilderkennung“, weil die Wirkung sich daraus von selbst ergibt.",
     "correct": false,
     "why": "Eine bloße Technologienennung reicht nicht; Verarbeitung und Wirkung müssen erklärt werden."
    },
    {
     "text": "Das erfasste Ereignis, dessen Verarbeitung oder Verknüpfung mit vorhandenen Daten und die daraus folgende Wirkung auf den Ablauf.",
     "correct": true
    },
    {
     "text": "Allein die Wirkung, zum Beispiel „weniger Stau“, ohne zu erklären, welche Daten erfasst und wie verarbeitet werden.",
     "correct": false,
     "why": "Ein Nutzen ohne Verarbeitungsweg ist unbegründet und genügt nicht."
    },
    {
     "text": "Eine Aufzählung der Kosten der Kamera und der Wartung, weil wirtschaftliche Aspekte im Mittelpunkt stehen.",
     "correct": false,
     "why": "Gefragt ist der Einsatzweg im Ablauf; Kosten sind dafür nicht der Kern."
    }
   ],
   "multi": false,
   "explanation": "Tragfähig ist die Verbindung von Erfassung, Verarbeitung/Verknüpfung und Wirkung auf den Ablauf. Reine Technik, reiner Nutzen oder Kosten allein genügen nicht."
  }
 },
 {
  "id": "kmp-geschaeftsprozessmodellierung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Modellierung",
  "concept": "geschaeftsprozessmodellierung",
  "title": "Vorteil: Zuständigkeiten",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein kommunaler Bauhof dokumentiert den Ablauf von der Schadensmeldung bis zur Instandsetzung als UML-Aktivitätsdiagramm. Welcher Vorteil ergibt sich für den Bauhof?",
  "payload": {
   "options": [
    {
     "text": "Das Diagramm zeigt Datenbanktabellen mit Fremdschlüsseln, sodass die spätere Datenbank sofort angelegt werden kann.",
     "correct": false,
     "why": "Tabellen und Schlüssel zeigt ein Datenmodell (ER-Diagramm), kein Aktivitätsdiagramm."
    },
    {
     "text": "Zuständigkeiten und Übergaben werden im Ablauf erkennbar, sodass die Bereiche ihre Aufgaben eindeutig abstimmen können.",
     "correct": true
    },
    {
     "text": "Es berechnet automatisch die Durchlaufzeit jeder Meldung und legt fest, wie viele Beschäftigte eingesetzt werden.",
     "correct": false,
     "why": "Ein Diagramm zeigt den Ablauf, es berechnet weder Zeiten noch Personalbedarf."
    },
    {
     "text": "Es ersetzt das Pflichtenheft vollständig, weil alle technischen Anforderungen darin schon enthalten sind.",
     "correct": false,
     "why": "Ein Aktivitätsdiagramm zeigt Abläufe und ersetzt kein Pflichtenheft."
    }
   ],
   "multi": false,
   "explanation": "Ein Aktivitätsdiagramm macht Abläufe, Zuständigkeiten und Übergaben sichtbar, sodass sich Bereiche abstimmen können. Datenbanktabellen, Berechnungen und ein Pflichtenheft liefert es nicht."
  }
 },
 {
  "id": "kmp-geschaeftsprozessmodellierung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Modellierung",
  "concept": "geschaeftsprozessmodellierung",
  "title": "Vorteil: Alternative Wege",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Versandhandel führt ein neues Verfahren für beschädigte Lieferungen ein und dokumentiert es als UML-Aktivitätsdiagramm. Welchen Vorteil bietet die Darstellung mit Entscheidungsknoten?",
  "payload": {
   "options": [
    {
     "text": "Klassen und ihre Vererbungsbeziehungen der späteren Software werden direkt sichtbar und geplant.",
     "correct": false,
     "why": "Klassen und Vererbung zeigt ein Klassendiagramm, nicht das Aktivitätsdiagramm."
    },
    {
     "text": "Der zeitliche Nachrichtenaustausch zwischen Objekten wird Schritt für Schritt aufgezeigt und ist prüfbar.",
     "correct": false,
     "why": "Nachrichten zwischen Objekten zeigt ein Sequenzdiagramm."
    },
    {
     "text": "Alternative Bearbeitungswege und ihre Bedingungen werden sichtbar, sodass Abweichungen einheitlich behandelt werden.",
     "correct": true
    },
    {
     "text": "Der Speicherbedarf jeder Aktion ist ablesbar, damit die Hardware für den Prozess ausgelegt werden kann.",
     "correct": false,
     "why": "Speicherbedarf ist nicht Gegenstand eines Aktivitätsdiagramms."
    }
   ],
   "multi": false,
   "explanation": "Entscheidungsknoten machen Alternativen und ihre Bedingungen sichtbar; so lassen sich Abweichungen einheitlich behandeln. Klassen, Nachrichten und Speicher sind andere Modellarten."
  }
 },
 {
  "id": "kmp-geschaeftsprozessmodellierung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Modellierung",
  "concept": "geschaeftsprozessmodellierung",
  "title": "Vorteil: Parallele Schritte",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Kulturzentrum dokumentiert den Ablauf von der Veranstaltungsanfrage bis zur Raumfreigabe als UML-Aktivitätsdiagramm. Manche Schritte laufen gleichzeitig. Welcher Vorteil ergibt sich daraus?",
  "payload": {
   "options": [
    {
     "text": "Gleichzeitig ausführbare Schritte und notwendige Abstimmungspunkte werden erkennbar, sodass die Planung zeitlich besser koordiniert wird.",
     "correct": true
    },
    {
     "text": "Alle Schritte müssen streng nacheinander ablaufen, wodurch die Planung besonders einfach und übersichtlich bleibt und die Raumverwaltung ohne Datenbank auskommt.",
     "correct": false,
     "why": "Ein Aktivitätsdiagramm kann parallele Abläufe gerade darstellen; strikte Reihenfolge ist keine Vorgabe."
    },
    {
     "text": "Die Raumkosten werden automatisch berechnet und den einzelnen Abteilungen im Diagramm zugeordnet.",
     "correct": false,
     "why": "Kosten werden im Diagramm nicht berechnet; es zeigt den Ablauf."
    },
    {
     "text": "Die Veranstaltungsanfragen werden im Diagramm gespeichert, sodass keine weitere Datenhaltung nötig ist.",
     "correct": false,
     "why": "Ein Diagramm ist eine Darstellung, keine Datenhaltung."
    }
   ],
   "multi": false,
   "explanation": "Mit Gabelung und Synchronisation zeigt das Aktivitätsdiagramm gleichzeitige Schritte und Abstimmungspunkte; das verbessert die zeitliche Koordination."
  }
 },
 {
  "id": "kmp-geschaeftsprozessoptimierung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessoptimierung",
  "title": "Nutzen des Webformulars",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Eine Werkstatt nahm Reparaturaufträge auf Papier an, ein Mitarbeiter übertrug sie später ins Planungssystem, fehlende Daten wurden telefonisch nachgefordert. Künftig füllt der Kunde ein Webformular aus. Wodurch verkürzt das den Ablauf?",
  "payload": {
   "options": [
    {
     "text": "Jeder Auftrag wird zusätzlich telefonisch bestätigt, damit Fehler in den Angaben ganz ausgeschlossen werden, wodurch sich die Zahl der Rückfragen angeblich verringert.",
     "correct": false,
     "why": "Das würde den Ablauf verlängern und ist nicht der Nutzen des Webformulars."
    },
    {
     "text": "Das Formular wird ausgedruckt und später übertragen, sodass die Daten im System schneller erfasst sind.",
     "correct": false,
     "why": "Der Ausdruck mit späterer Übertragung wäre der bisherige Medienbruch."
    },
    {
     "text": "Der Kunde erhält Zugang zu allen internen Daten der Werkstattplanung, um seine Aufträge selbst zu planen.",
     "correct": false,
     "why": "Der Nutzen liegt in der direkten Erfassung, nicht in einem Zugriff auf interne Planungsdaten."
    },
    {
     "text": "Die Angaben gelangen ohne Abtippen direkt in die Planung, und Pflichtangaben werden vor dem Absenden geprüft, wodurch Rückfragen sinken.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Beim Webformular entfallen zeitversetzte Übertragung und viele Nachforderungen: Die Daten gelangen direkt in die Planung, und Pflichtangaben werden vorab geprüft."
  }
 },
 {
  "id": "kmp-geschaeftsprozessoptimierung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Prozessanalyse",
  "concept": "geschaeftsprozessoptimierung",
  "title": "Kassenkraft ersetzen?",
  "difficulty": 2,
  "points": 6,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Kulturhaus beschäftigt eine Kassenkraft für Buchung, Beratung, Prüfung von Ermäßigungsnachweisen, Kartenausgabe und Klärung von Sitzplatzkonflikten. Ein Portal übernimmt Buchung, Zahlung und Ticketversand. Welche Bewertung ist begründet?",
  "payload": {
   "options": [
    {
     "text": "Die Kassenkraft entfällt vollständig, weil das Portal günstiger ist und rund um die Uhr läuft.",
     "correct": false,
     "why": "Das übersieht Aufgaben wie Prüfung, Beratung und Konfliktklärung, die weiter personengebunden sind."
    },
    {
     "text": "Das Portal ist unbrauchbar, weil es sonntags eine Stunde gewartet wird, daher bleibt alles wie bisher.",
     "correct": false,
     "why": "Ein kurzes Wartungsfenster macht das Portal nicht unbrauchbar; der Nutzen bleibt groß."
    },
    {
     "text": "Das Portal ersetzt alle Aufgaben der Kasse, sodass Beratung und Sitzplatzklärung vom Portal übernommen werden.",
     "correct": false,
     "why": "Beratung, Nachweisprüfung und Konfliktklärung sind nicht automatisiert und bleiben Aufgaben der Fachkraft."
    },
    {
     "text": "Buchung, Zahlung und Ticketversand werden automatisiert, Prüfung, Beratung, Kartenausgabe und Konfliktklärung bleiben personengebunden; ein teilweiser Abbau ist begründbar.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Sinnvoll ist ein Gesamturteil: Standardaufgaben entfallen, aber Nachweisprüfung, Beratung und Konfliktklärung bleiben. Freie Zeit kann für Beratung genutzt werden, ein teilweiser Abbau ist begründbar."
  }
 },
 {
  "id": "kmp-geschaeftsprozessoptimierung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "geschaeftsprozessoptimierung",
  "title": "Monatliche Ersparnis berechnen",
  "difficulty": 2,
  "points": 6,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Die Kassenkraft eines Kulturhauses kostet monatlich 3.180 Euro, das neue Portal einschließlich Betrieb 840 Euro. Wie hoch wäre die monatliche Kostenersparnis, wenn das Portal die Kassenkraft vollständig ersetzen würde?",
  "payload": {
   "options": [
    {
     "text": "4.020 Euro",
     "correct": false,
     "why": "Das ist die Summe beider Kosten; für die Ersparnis müssen sie voneinander abgezogen werden."
    },
    {
     "text": "2.340 Euro",
     "correct": true
    },
    {
     "text": "3.180 Euro",
     "correct": false,
     "why": "Das sind die Kosten der Kassenkraft allein; die neuen Portalkosten werden nicht abgezogen."
    },
    {
     "text": "840 Euro",
     "correct": false,
     "why": "Das sind nur die Portalkosten; diese sind keine Ersparnis."
    }
   ],
   "multi": false,
   "explanation": "Ersparnis = alte Kosten minus neue Kosten: 3.180 Euro − 840 Euro = 2.340 Euro pro Monat. Nur bei vollständigem Ersatz; Beratungsaufgaben bleiben in der Praxis oft bestehen."
  }
 }
]);

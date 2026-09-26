window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "anforderungsanalyse",
  "title": "Anforderungsanalyse",
  "figure": "startup",
  "lines": [
   "Merk dir: Die Anforderungsanalyse klärt vor der Entwicklung, was ein System leisten soll. Grundlage sind die Probleme und Ziele der späteren Nutzer.",
   "Wichtig ist: Eine gute Anforderung ist fallbezogen, von anderen unterscheidbar und begründet – sie sagt, was das System tun muss und warum das im Einsatz wichtig ist.",
   "Zum Ermitteln der Wünsche nutzt man Methoden wie Interviews, Befragungen, Beobachtung, Workshops oder die Analyse vorhandener Dokumente und Beschwerden.",
   "Sind die Nutzerwünsche unklar, erkundet man sie systematisch vor dem Entwicklungsstart, zum Beispiel durch Interviews und die Beobachtung der Nutzer im Alltag."
  ]
 },
 {
  "concept": "datenqualitaetskriterien",
  "title": "Datenqualitätskriterien",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Datenqualität misst man an Kriterien wie Vollständigkeit, Aktualität, Konsistenz, Korrektheit, Eindeutigkeit und Einheitlichkeit.",
   "Vollständigkeit heißt: Alle für den Zweck notwendigen Angaben sind vorhanden. Aktualität heißt: Die Daten bilden den gegenwärtigen Zustand ab.",
   "Konsistenz bedeutet Widerspruchsfreiheit zwischen Datensätzen. Eindeutigkeit bedeutet: Ein Sachverhalt ist nur einmal gespeichert, ohne Dubletten.",
   "Plausibilität oder Validität fragt, ob Werte möglich und sinnvoll sind – eine negative Fahrtdauer ist zum Beispiel unplausibel.",
   "Wichtig ist: Verfügbarkeit oder Verschlüsselung gehören zur IT-Sicherheit, nicht zu den Kriterien der Datenqualität."
  ]
 },
 {
  "concept": "datenqualitaetspruefung",
  "title": "Datenqualitätsprüfung",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Bei der Datenqualitätsprüfung wendet man konkrete Prüfregeln auf die Daten an und belegt jeden Mangel durch einen konkreten Wert.",
   "Typische Mängel sind Formatfehler (E-Mail ohne @), uneinheitliche Datumsformate, unmögliche Datumswerte wie der 30.02. und fehlende Pflichtwerte.",
   "Auch unplausible Werte (negative Menge, Ausreißer) und Widersprüche fallen auf – etwa dieselbe ID mit zwei verschiedenen Modellen.",
   "Dubletten wie K-1047 und K1047 können dasselbe Objekt meinen; beim Import drohen dann doppelte Anlage oder getrennte Objektakten.",
   "Wichtig ist: Zu jedem Befund gehört die verletzte Prüfregel und, wo möglich, die Folge für Import oder Nutzung."
  ]
 },
 {
  "concept": "datenqualitaetssicherung",
  "title": "Datenqualitätssicherung",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Datenqualitätssicherung ist ein Ablauf. Man leitet den Qualitätsbedarf aus dem Verwendungszweck der Daten ab.",
   "Dann prüft man die Daten gegen Format-, Werte- und Stammdatenregeln und klärt auffällige Angaben mit der Quelle, zum Beispiel dem Lieferanten.",
   "Formate und Einheiten vereinheitlicht man kontrolliert. Erst freigegebene Daten werden ins Zielsystem übernommen, und der Vorgang wird dokumentiert.",
   "Wichtig ist: Eine bloße Aufzählung von Kriterien oder das stille Löschen fehlerhafter Zeilen sichert die Qualität nicht."
  ]
 },
 {
  "concept": "ereignisgesteuerte-prozesskette",
  "title": "Ereignisgesteuerte Prozesskette (EPK)",
  "figure": "kalle",
  "lines": [
   "Merk dir: In einer EPK wechseln sich Ereignisse (Zustände) und Funktionen (Tätigkeiten) ab. Konnektoren verzweigen oder führen zusammen.",
   "Der UND-Konnektor bei einer Zusammenführung heißt: Die Funktion startet erst, wenn beide eingehenden Ereignisse eingetreten sind.",
   "Beim XOR (exklusives ODER) muss genau eines der beiden Ereignisse eingetreten sein, nicht beide zugleich.",
   "Beim inklusiven ODER genügt mindestens ein Ereignis; auch der gemeinsame Eintritt beider Ereignisse aktiviert die Funktion."
  ]
 },
 {
  "concept": "fmea",
  "title": "FMEA",
  "figure": "kalle",
  "lines": [
   "Merk dir: FMEA steht für Fehlermöglichkeits- und Einflussanalyse. Sie erkennt mögliche Fehler und Risiken schon vor dem Start eines Prozesses.",
   "Der Nutzen: Risiken werden früh bearbeitet, so sinken Fehler, Ausfälle und Folgekosten – die FMEA ist vorbeugend.",
   "Bewertet werden Bedeutung (B), Auftreten (A) und Entdeckung (E), meist auf einer Skala von 1 bis 10. Dabei ist B die Schwere der Auswirkung.",
   "Die Risikoprioritätszahl ist RPZ = B × A × E. Hohe RPZ-Werte zeigen, wo man zuerst Maßnahmen ergreift.",
   "Achtung: Bei der Entdeckung bedeutet ein niedriger Wert, dass der Fehler früh und sicher erkannt wird."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-anforderungsanalyse-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "anforderungsanalyse",
  "title": "Anforderungen an Dispositionssystem",
  "difficulty": 2,
  "points": 6,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Baustoffhandel ersetzt die telefonische und papierbasierte Auslieferungsplanung durch ein digitales Dispositionssystem. Bisher gehen nachträgliche Änderungen an Lieferaufträgen verloren, Fahrer erhalten veraltete Angaben und das Lager erkennt den gültigen Planungsstand nicht. Welche drei Aussagen sind fachlich sinnvolle Anforderungen an das neue System?",
  "payload": {
   "options": [
    {
     "text": "Änderungen an Lieferaufträgen sind zentral und sofort für alle Beteiligten verfügbar, damit alle denselben Planungsstand nutzen.",
     "correct": true
    },
    {
     "text": "Das System wird ausschließlich in einer bestimmten Programmiersprache umgesetzt, damit der Quellcode einheitlich aussieht.",
     "correct": false,
     "why": "Das ist eine technische Umsetzungsvorgabe, keine fachliche Anforderung, die das geschilderte Problem löst."
    },
    {
     "text": "Jede Bearbeitung wird mit Zeitpunkt und Urheber festgehalten, damit widersprüchliche Angaben später geklärt werden können.",
     "correct": true
    },
    {
     "text": "Jeder Fahrer erhält ein neues Firmenfahrzeug, damit Fehlfahrten künftig grundsätzlich nicht mehr vorkommen können.",
     "correct": false,
     "why": "Fahrzeuge haben mit den verlorenen Änderungen im System nichts zu tun; die Ursache wird nicht behoben."
    },
    {
     "text": "Fahrer können auch bei unterbrochener Mobilfunkverbindung auf den zuletzt freigegebenen Auftrag zugreifen und weiterarbeiten.",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Sinnvoll sind Anforderungen, die das Problem fallbezogen lösen: zentrale, sofort verfügbare Änderungen, Nachvollziehbarkeit von Bearbeitungen und Offline-Zugriff für Fahrer. Technologie- oder Fahrzeugvorgaben lösen das Problem nicht."
  }
 },
 {
  "id": "kmp-anforderungsanalyse-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "anforderungsanalyse",
  "title": "Anforderung gegen Doppelbuchung",
  "difficulty": 2,
  "points": 6,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Eine Musikschule organisiert Unterrichtsräume bisher über Wandkalender und Tabellen. Räume werden gelegentlich doppelt eingeplant. Welche Anforderung an das neue System begegnet genau diesem Problem?",
  "payload": {
   "options": [
    {
     "text": "Ein Wandkalender im Flur bleibt zusätzlich bestehen, damit alle Lehrkräfte die Belegung auch auf Papier sehen können.",
     "correct": false,
     "why": "Das erhält die Insellösung; abweichende Einträge und Doppelbelegungen bleiben möglich."
    },
    {
     "text": "Das System erkennt Überschneidungen bei Raum und Zeitraum und verhindert eine zweite Belegung, damit keine Doppelbuchungen entstehen.",
     "correct": true
    },
    {
     "text": "Der Hausdienst bestätigt jede Belegung telefonisch bei den Lehrkräften, bevor der Raum im Kalender eingetragen wird.",
     "correct": false,
     "why": "Das ist ein manueller Ablauf; das System selbst verhindert dadurch keine Überschneidungen."
    },
    {
     "text": "Die Oberfläche zeigt Räume in frei wählbaren Farben an, damit die Belegung übersichtlicher und hübscher aussieht.",
     "correct": false,
     "why": "Die Optik ändert nichts an der Prüfung von Überschneidungen; Doppelbuchungen wären weiterhin möglich."
    }
   ],
   "multi": false,
   "explanation": "Die Doppelbuchungen entstehen durch fehlende Prüfung. Das System muss Überschneidungen bei Raum und Zeitraum erkennen und die zweite Belegung verhindern; Kalender, Telefonate oder Farben beheben das nicht."
  }
 },
 {
  "id": "kmp-anforderungsanalyse-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "anforderungsanalyse",
  "title": "Vorgehensweisen der Bedarfserkundung",
  "difficulty": 2,
  "points": 6,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein kommunaler Fahrradverleih will eine neue Ausleihanwendung für Berufspendler entwickeln. Bisher gibt es nur unspezifische Beschwerden, frühere Untersuchungen fehlen. Vor Entwicklungsbeginn sollen die Wünsche der Nutzer systematisch erkundet werden. Welche zwei Vorgehensweisen der Anforderungsanalyse passen?",
  "payload": {
   "options": [
    {
     "text": "Ein Code-Review der bestehenden Anwendung, um Programmierfehler im Quelltext der alten Version aufzuspüren.",
     "correct": false,
     "why": "Ein Code-Review prüft Quelltext, erkundet aber keine Wünsche der Nutzer."
    },
    {
     "text": "Interviews mit Pendlern zu ihren typischen Schwierigkeiten bei der Ausleihe und zu gewünschten neuen Funktionen.",
     "correct": true
    },
    {
     "text": "Ein Lasttest der Server, um die Antwortzeiten bei vielen gleichzeitigen Ausleihen zu messen und zu bewerten.",
     "correct": false,
     "why": "Ein Lasttest misst Systemleistung, aber keine Nutzerwünsche."
    },
    {
     "text": "Beobachtung von Pendlern bei der Ausleihe an den Stationen, um Schwierigkeiten im echten Ablauf zu erkennen.",
     "correct": true
    },
    {
     "text": "Ein Abnahmetest nach Fertigstellung, bei dem Nutzer die fertige Anwendung mit einer Checkliste durchgehen.",
     "correct": false,
     "why": "Ein Abnahmetest kommt erst nach der Entwicklung; hier sollen Wünsche vorher erkundet werden."
    }
   ],
   "multi": true,
   "explanation": "Zur Erkundung unbekannter Nutzerwünsche eignen sich Interviews und Beobachtung. Code-Review, Lasttest und Abnahmetest prüfen Software, nicht die Erwartungen der Nutzer vor der Entwicklung."
  }
 },
 {
  "id": "kmp-datenqualitaetskriterien-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetskriterien",
  "title": "Datenqualitätskriterien nennen",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein kommunaler Bauhof führt Daten aus mehreren getrennten Bestandslisten in einer zentralen Anwendung zusammen. Vor der Übernahme legt das Projektteam verbindliche Qualitätsanforderungen für die Daten fest. Welche drei Merkmale sind anerkannte Datenqualitätskriterien?",
  "payload": {
   "options": [
    {
     "text": "Vollständigkeit der Angaben zu Geräten und Standorten",
     "correct": true
    },
    {
     "text": "Verfügbarkeit des Servers im Rechenzentrum mit 99,9 Prozent",
     "correct": false,
     "why": "Die Serververfügbarkeit gehört zum Betrieb bzw. zur IT-Sicherheit, sie beschreibt nicht die Qualität der gespeicherten Daten."
    },
    {
     "text": "Aktualität der gespeicherten Wartungstermine und Zustände",
     "correct": true
    },
    {
     "text": "Verschlüsselungsstärke der Datenbank bei der Speicherung",
     "correct": false,
     "why": "Verschlüsselung schützt Daten, sagt aber nichts darüber, ob sie vollständig, aktuell oder widerspruchsfrei sind."
    },
    {
     "text": "Konsistenz der Daten über die zusammengeführten Listen hinweg",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Anerkannte Datenqualitätskriterien sind zum Beispiel Vollständigkeit, Aktualität und Konsistenz. Serververfügbarkeit und Verschlüsselung betreffen Betrieb und Sicherheit, nicht die Qualität der Dateninhalte."
  }
 },
 {
  "id": "kmp-datenqualitaetskriterien-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetskriterien",
  "title": "Aktualität erklären",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Projektteam beschreibt für eine Maschinendatenbank verschiedene Datenqualitätsmerkmale. Was bedeutet das Merkmal Aktualität?",
  "payload": {
   "options": [
    {
     "text": "Alle für den jeweiligen Zweck notwendigen Angaben sind in jedem Datensatz vorhanden und keine Felder bleiben leer.",
     "correct": false,
     "why": "Das beschreibt die Vollständigkeit, nicht die Aktualität."
    },
    {
     "text": "Die Datensätze widersprechen einander nicht, auch wenn dieselbe Information an mehreren Stellen gespeichert ist.",
     "correct": false,
     "why": "Das beschreibt die Konsistenz, nicht die Aktualität."
    },
    {
     "text": "Jeder Sachverhalt ist genau einmal gespeichert, sodass keine doppelten Datensätze im Bestand vorkommen.",
     "correct": false,
     "why": "Das beschreibt die Eindeutigkeit bzw. Redundanzfreiheit, nicht die Aktualität."
    },
    {
     "text": "Die gespeicherten Angaben bilden den gegenwärtigen Zustand ab und sind nicht veraltet.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Aktualität bedeutet, dass die gespeicherten Angaben den gegenwärtigen Zustand abbilden. Fehlende Felder betreffen die Vollständigkeit, Widersprüche die Konsistenz, Dubletten die Eindeutigkeit."
  }
 },
 {
  "id": "kmp-datenqualitaetskriterien-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetskriterien",
  "title": "Prüfperspektive Plausibilität",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "In einem Auszug aus Fahrzeugmessdaten eines Winterdienstes steht bei einem Einsatz eine Fahrtdauer von minus fünf Minuten. Gegen welches Datenqualitätskriterium wird verstoßen?",
  "payload": {
   "options": [
    {
     "text": "Vollständigkeit, weil bei dem Einsatz Pflichtangaben im Datensatz fehlen.",
     "correct": false,
     "why": "Es fehlt nichts; der vorhandene Wert ist unmöglich, nicht abwesend."
    },
    {
     "text": "Eindeutigkeit, weil derselbe Einsatz mehrfach mit derselben Einsatz-ID gespeichert wurde.",
     "correct": false,
     "why": "Es geht um einen einzelnen unmöglichen Wert, nicht um doppelte Datensätze."
    },
    {
     "text": "Plausibilität bzw. Validität, weil der Wert außerhalb des fachlich möglichen Wertebereichs liegt.",
     "correct": true
    },
    {
     "text": "Aktualität, weil die Messdaten nicht mehr den gegenwärtigen Zustand des Fahrzeugs abbilden.",
     "correct": false,
     "why": "Ein negativer Wert ist nicht veraltet, sondern fachlich unmöglich."
    }
   ],
   "multi": false,
   "explanation": "Eine negative Fahrtdauer ist fachlich unmöglich. Das ist ein Verstoß gegen Plausibilität bzw. Validität; Vollständigkeit, Eindeutigkeit und Aktualität sind nicht betroffen."
  }
 },
 {
  "id": "kmp-datenqualitaetspruefung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetspruefung",
  "title": "Unmögliches Datum erkennen",
  "difficulty": 3,
  "points": 8,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "In einem Export aus einem Shopsystem steht in einer Bestellzeile als Bestelldatum der 30.02.2026. Welcher Qualitätsmangel liegt vor?",
  "payload": {
   "options": [
    {
     "text": "Ein uneinheitliches Datumsformat, weil das Datum nicht wie die anderen Zeilen als 2026-02-05 geschrieben ist.",
     "correct": false,
     "why": "Das Format TT.MM.JJJJ ist hier gültig; das Problem ist der Inhalt, nicht die Schreibweise."
    },
    {
     "text": "Ein fehlender Pflichtwert, weil in der Spalte für das Bestelldatum keine Eintragung vorhanden ist.",
     "correct": false,
     "why": "Das Feld ist gefüllt; der eingetragene Wert ist das Problem."
    },
    {
     "text": "Eine Dublette, weil dieselbe Bestellposition zweimal mit demselben Datum im Export enthalten ist.",
     "correct": false,
     "why": "Ein einzelner unmöglicher Wert ist keine doppelte Zeile."
    },
    {
     "text": "Ein ungültiger Kalenderwert, weil es den 30. Februar nicht gibt und die Datumsregel verletzt wird.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Der Februar hat höchstens 29 Tage, der 30.02.2026 ist also kein gültiges Kalenderdatum. Es handelt sich um einen ungültigen Wert, der eine Datumsprüfung verletzt."
  }
 },
 {
  "id": "kmp-datenqualitaetspruefung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetspruefung",
  "title": "Widerspruch bei Losnummer",
  "difficulty": 3,
  "points": 8,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "In den Fertigungsdaten einer Fahrradmanufaktur kennzeichnet eine Losnummer genau einen Fertigungsauftrag. Die Losnummer L-784 steht aber in zwei Zeilen mit unterschiedlichen Modellen und Verbrauchswerten. Welcher Mangel liegt vor?",
  "payload": {
   "options": [
    {
     "text": "Ein Ausreißer, weil der Materialverbrauch in einer der beiden Zeilen deutlich vom Durchschnitt der anderen Lose abweicht.",
     "correct": false,
     "why": "Der Widerspruch liegt in der Zuordnung der Losnummer, nicht in einem Zahlenausreißer."
    },
    {
     "text": "Ein Formatfehler, weil die Losnummer nicht dem vorgeschriebenen Aufbau mit Buchstabe und Zahl entspricht.",
     "correct": false,
     "why": "Der Aufbau L-784 ist in Ordnung; problematisch ist die doppelte Verwendung."
    },
    {
     "text": "Ein fehlender Pflichtwert, weil bei einem der beiden Einträge die Angabe zum Modell im Datensatz leer geblieben ist.",
     "correct": false,
     "why": "Beide Zeilen haben ein Modell; sie widersprechen sich nur."
    },
    {
     "text": "Eine widersprüchliche Zuordnung: Dieselbe Losnummer soll einen Auftrag kennzeichnen, steht aber für verschiedene Modelle.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Wenn eine Losnummer genau einen Auftrag kennzeichnen soll, verletzt eine zweite Zeile mit anderem Modell diese Eindeutigkeitsregel. Es ist eine widersprüchliche Zuordnung, kein Format- oder Fehlwertproblem."
  }
 },
 {
  "id": "kmp-datenqualitaetspruefung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetspruefung",
  "title": "Folge einer Dublette",
  "difficulty": 3,
  "points": 9,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Stadtmuseum übernimmt 18.000 Inventardatensätze in ein neues Sammlungsportal. Die Objektnummern K-1047 und K1047 bezeichnen vermutlich dasselbe Objekt. Welche Folge droht bei unveränderter Übernahme am ehesten?",
  "payload": {
   "options": [
    {
     "text": "Der Import bricht ab, weil das Datumsfeld einen Wert enthält, der kein gültiges Kalenderdatum ist.",
     "correct": false,
     "why": "Das wäre die Folge eines ungültigen Datums, nicht unterschiedlich geschriebener Objektnummern."
    },
    {
     "text": "Materialfilter liefern unvollständige Ergebnisse, weil für ähnliche Materialien verschiedene Begriffe verwendet werden.",
     "correct": false,
     "why": "Das ist die Folge uneinheitlicher Materialbegriffe, nicht doppelter Objektnummern."
    },
    {
     "text": "Das Portal löscht bei der Übernahme den Standort, weil die Objektnummern nicht genau übereinstimmen.",
     "correct": false,
     "why": "Eine solche automatische Löschung folgt nicht aus abweichender Schreibweise der Nummer."
    },
    {
     "text": "Dasselbe Objekt wird doppelt angelegt, oder es entstehen getrennte Objektakten für ein einziges Objekt.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Wird dasselbe Objekt mit K-1047 und K1047 geführt, erkennt der Import keine Dublette. Die Folge sind doppelte Anlage oder getrennte Objektakten, Datum und Materialbegriffe sind andere Probleme."
  }
 },
 {
  "id": "kmp-datenqualitaetssicherung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetssicherung",
  "title": "Ablauf vor der Datenübernahme",
  "difficulty": 2,
  "points": 5,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Fahrradgroßhandel übernimmt Lieferdaten aus CSV-Dateien seiner Zulieferer in sein Warenwirtschaftssystem. Die Daten steuern Bestandsbewertung und Nachbestellung. Welcher Ablauf sichert die Datenqualität vor der Übernahme geeignet?",
  "payload": {
   "options": [
    {
     "text": "Alle CSV-Dateien ungeprüft übernehmen und Fehler später bei der Bestandsbewertung von Hand korrigieren.",
     "correct": false,
     "why": "Fehler würden unbemerkt in Bewertung und Nachbestellung einfließen; die Prüfung fehlt vor der Übernahme."
    },
    {
     "text": "Nur die Spaltenüberschriften kontrollieren und fehlerhafte Preise automatisch auf den Durchschnitt der Vormonate setzen.",
     "correct": false,
     "why": "Das prüft die Daten nicht regelbasiert und verfälscht Werte, ohne die Quelle zu klären."
    },
    {
     "text": "Datums-, Mengen- und Preisangaben gegen Regeln und Artikelstamm prüfen, Auffälliges beim Lieferanten klären, Einheiten vereinheitlichen und erst dann freigeben.",
     "correct": true
    },
    {
     "text": "Fehlerhafte Zeilen still löschen, damit die Nachbestellung nicht gestört wird, und den Rest sofort übernehmen.",
     "correct": false,
     "why": "Gelöschte Zeilen fehlen dann in Zugängen und Bestand; nichts wird geklärt oder korrigiert."
    }
   ],
   "multi": false,
   "explanation": "Ein guter Ablauf prüft die Daten gegen Regeln und Stammdaten, klärt Auffälligkeiten an der Quelle, vereinheitlicht Einheiten und übernimmt erst freigegebene Daten. Ungeprüfte Übernahme oder stilles Löschen sichert nichts."
  }
 },
 {
  "id": "kmp-datenqualitaetssicherung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetssicherung",
  "title": "Kumulierter Zählerstand sinkt",
  "difficulty": 2,
  "points": 5,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Gebäudedienstleister rechnet nach Heizungszählerdaten ab. Ein Zählerstand in kWh ist kumuliert und darf nicht sinken. Bei Messpunkt M11 ist ein späterer Stand aber kleiner als der frühere. Wie sollte der Fall behandelt werden?",
  "payload": {
   "options": [
    {
     "text": "Den Wert als auffällig markieren, mit Messhistorie und Quelle klären, erst nach Bestätigung regelgebunden korrigieren und dokumentieren.",
     "correct": true
    },
    {
     "text": "Den niedrigeren Stand als negativen Verbrauch in die Abrechnung übernehmen, weil die Software den Wert so erhalten hat.",
     "correct": false,
     "why": "Ein negativer Verbrauch ist fachlich unmöglich und würde die Abrechnung verfälschen."
    },
    {
     "text": "Den Wert stillschweigend durch den letzten größeren Stand ersetzen, damit die Reihe wieder aufsteigend aussieht.",
     "correct": false,
     "why": "Ohne Klärung und Dokumentation wird geraten; dadurch können echte Zählerwechsel oder Fehler verdeckt werden."
    },
    {
     "text": "Den Messpunkt M11 dem Gebäude G7 zuordnen, damit die Summen beider Gebäude in der Abrechnung wieder stimmen.",
     "correct": false,
     "why": "Die Zuordnung von Messpunkt zu Gebäude ist Stammdatum; sie wird nicht geändert, um Summen zu glätten."
    }
   ],
   "multi": false,
   "explanation": "Ein sinkender kumulierter Zählerstand verletzt die Regel der Datenreihe. Er wird markiert, mit Historie und Quelle geklärt, erst nach Bestätigung regelgebunden korrigiert und dokumentiert; Raten oder Umbuchen ist falsch."
  }
 },
 {
  "id": "kmp-datenqualitaetssicherung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "datenqualitaetssicherung",
  "title": "Personendaten zusammenführen",
  "difficulty": 2,
  "points": 5,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Bildungsanbieter führt Anmeldungen aus Webportal und eingescannten Formularen zusammen. Daraus entstehen Teilnahmebescheinigungen. Derselbe Teilnehmer ist in beiden Quellen mit unterschiedlicher Namensschreibweise erfasst. Was ist ein geeigneter Schritt?",
  "payload": {
   "options": [
    {
     "text": "Datensätze allein anhand ähnlich klingender Namen zusammenführen und immer die Schreibweise aus dem Webportal verwenden.",
     "correct": false,
     "why": "Ähnliche Namen können verschiedene Personen sein; ohne Abgleich mit Kennungen drohen Verwechslungen."
    },
    {
     "text": "Die Formulare aus dem Scan verwerfen und nur das Webportal nutzen, weil dessen Namen dann nicht mehr abweichen.",
     "correct": false,
     "why": "Dadurch gehen tatsächliche Anmeldungen verloren, ohne dass die Abweichung geklärt wird."
    },
    {
     "text": "Bei Abweichungen jeweils den kürzeren Namen speichern, damit die Bescheinigung sicher in das Namensfeld passt.",
     "correct": false,
     "why": "Die Länge sagt nichts über Richtigkeit; der bestätigte Name wird für die Bescheinigung benötigt."
    },
    {
     "text": "Einträge über Teilnehmer-ID und Kursnummer abgleichen, Schreibweisen anhand bestätigter Personendaten prüfen und Abweichungen klären.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Zusammengehörige Einträge werden über Teilnehmer-ID und Kursnummer abgeglichen, Namen gegen bestätigte Daten geprüft und Abweichungen geklärt. Reines Namensraten oder Verwerfen einer Quelle sichert die Qualität nicht."
  }
 },
 {
  "id": "kmp-ereignisgesteuerte-prozesskette-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Modellierung",
  "concept": "ereignisgesteuerte-prozesskette",
  "title": "EPK: UND-Konnektor",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "In einer EPK münden die Ereignisse „Qualitätsprüfung abgeschlossen“ und „Zahlung bestätigt“ in einen UND-Konnektor vor der Funktion „Versand freigeben“. Wann wird die Funktion aktiviert?",
  "payload": {
   "options": [
    {
     "text": "Sobald mindestens eines der beiden Ereignisse eingetreten ist, auch wenn das andere noch aussteht.",
     "correct": false,
     "why": "Das beschreibt das inklusive ODER, nicht das UND."
    },
    {
     "text": "Wenn genau eines der beiden Ereignisse eingetreten ist und das andere ausdrücklich nicht.",
     "correct": false,
     "why": "Das beschreibt das exklusive ODER (XOR)."
    },
    {
     "text": "Erst wenn beide Ereignisse eingetreten sind.",
     "correct": true
    },
    {
     "text": "Sobald die Funktion davor beendet ist, unabhängig davon, welche Ereignisse eingetreten sind.",
     "correct": false,
     "why": "Ein Konnektor verknüpft Ereignisse; ohne deren Eintritt startet nichts."
    }
   ],
   "multi": false,
   "explanation": "Der UND-Konnektor verlangt den Eintritt beider Ereignisse. Mindestens eines wäre inklusives ODER, genau eines wäre XOR."
  }
 },
 {
  "id": "kmp-ereignisgesteuerte-prozesskette-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Modellierung",
  "concept": "ereignisgesteuerte-prozesskette",
  "title": "EPK: XOR-Konnektor",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "In einer EPK führen „Messwertprüfung beendet“ und „Sicherheitsprotokoll eingegangen“ über einen XOR-Konnektor zur Funktion „Maschinenstatus bewerten“. Welche Konstellation aktiviert die Funktion?",
  "payload": {
   "options": [
    {
     "text": "Nur der Eintritt beider Ereignisse zusammen, ein einzelnes Ereignis reicht nicht aus.",
     "correct": false,
     "why": "Das beschreibt das UND."
    },
    {
     "text": "Genau eines der beiden Ereignisse ist eingetreten, nicht beide zugleich.",
     "correct": true
    },
    {
     "text": "Mindestens eines der Ereignisse; ein gemeinsamer Eintritt wäre ebenfalls zulässig.",
     "correct": false,
     "why": "Das beschreibt das inklusive ODER; beim XOR ist der gemeinsame Eintritt gerade nicht vorgesehen."
    },
    {
     "text": "Keines der beiden Ereignisse darf eingetreten sein, damit die Funktion sicher starten kann.",
     "correct": false,
     "why": "Ohne eintretende Ereignisse wird die Funktion nie ausgelöst."
    }
   ],
   "multi": false,
   "explanation": "XOR steht für exklusives ODER: Es muss genau eines der Ereignisse eintreten. Beide zugleich oder keines aktiviert die Funktion nicht."
  }
 },
 {
  "id": "kmp-ereignisgesteuerte-prozesskette-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Modellierung",
  "concept": "ereignisgesteuerte-prozesskette",
  "title": "EPK: inklusives ODER",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "In einer EPK soll die Funktion „Monatsrechnung erzeugen“ starten, sobald „Nutzungsdaten importiert“ oder „Tarifänderung übernommen“ oder beide eingetreten sind. Welchen Konnektor benötigt man?",
  "payload": {
   "options": [
    {
     "text": "UND, weil beide Ereignisse gemeinsam vorliegen müssen.",
     "correct": false,
     "why": "Beim UND wäre ein einzelnes Ereignis nicht genug."
    },
    {
     "text": "XOR, weil genau eines der beiden Ereignisse eintreten soll.",
     "correct": false,
     "why": "Beim XOR wäre der gemeinsame Eintritt ausgeschlossen, hier aber erlaubt."
    },
    {
     "text": "Inklusives ODER, weil mindestens ein Ereignis genügt und auch beide zugelassen sind.",
     "correct": true
    },
    {
     "text": "Keinen Konnektor, weil zwei Ereignisse unmittelbar vor einer Funktion stehen dürfen.",
     "correct": false,
     "why": "Mehrere Ereignisse vor einer Funktion brauchen einen Konnektor, der die Bedingung festlegt."
    }
   ],
   "multi": false,
   "explanation": "Wenn mindestens ein Ereignis genügt und beide zulässig sind, ist es das inklusive ODER. UND verlangt beide, XOR genau eines."
  }
 },
 {
  "id": "kmp-fmea-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Qualitätsmanagement",
  "concept": "fmea",
  "title": "Nutzen der FMEA",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Hersteller von Laborausrüstung plant eine neue Montagelinie und setzt vor dem Produktionsstart eine FMEA ein. Welcher betriebliche Nutzen ergibt sich?",
  "payload": {
   "options": [
    {
     "text": "Sie berechnet die Personalkosten der Montage und legt damit fest, wie viele Beschäftigte eingestellt werden.",
     "correct": false,
     "why": "Die FMEA bewertet Fehlerrisiken, sie kalkuliert keine Personalkosten."
    },
    {
     "text": "Sie ersetzt die Endkontrolle, sodass nach der Montage keine Prüfung der fertigen Geräte mehr nötig ist.",
     "correct": false,
     "why": "Die FMEA beugt Fehlern vor, ersetzt aber keine Prüfung der Erzeugnisse."
    },
    {
     "text": "Sie benennt den Mitarbeiter, der für spätere Fehler verantwortlich gemacht werden kann, um Haftung zu regeln.",
     "correct": false,
     "why": "Die FMEA untersucht Prozessrisiken sachlich, sie sucht keine Schuldigen."
    },
    {
     "text": "Sie erkennt Fehlerrisiken vor dem Start und bearbeitet sie früh, sodass Fehler und Folgekosten vermieden werden.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Die FMEA ist eine vorbeugende Methode: Sie bewertet mögliche Fehler vor dem Start und ermöglicht Maßnahmen, bevor Schäden entstehen. Kostenkalkulation, Endkontrolle oder Schuldzuweisung sind nicht ihr Zweck."
  }
 },
 {
  "id": "kmp-fmea-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Qualitätsmanagement",
  "concept": "fmea",
  "title": "RPZ berechnen",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Bei einer FMEA wurden für eine doppelte Zahlungsauslösung folgende Werte vergeben: Bedeutung B = 7, Auftreten A = 4, Entdeckung E = 3. Wie hoch ist die Risikoprioritätszahl (RPZ)?",
  "payload": {
   "options": [
    {
     "text": "14 Punkte",
     "correct": false,
     "why": "Das ist die Summe 7 + 4 + 3; die RPZ ist aber ein Produkt."
    },
    {
     "text": "28 Punkte",
     "correct": false,
     "why": "Das ist nur B × A; die Entdeckung E fehlt im Produkt."
    },
    {
     "text": "84 Punkte",
     "correct": true
    },
    {
     "text": "21 Punkte",
     "correct": false,
     "why": "Das ist nur B × E; das Auftreten A fehlt im Produkt."
    }
   ],
   "multi": false,
   "explanation": "Die RPZ ist das Produkt aus Bedeutung, Auftreten und Entdeckung: 7 × 4 × 3 = 84. Eine Summe oder ein Produkt aus nur zwei Werten ist falsch."
  }
 },
 {
  "id": "kmp-fmea-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Qualitätsmanagement",
  "concept": "fmea",
  "title": "Auftretenswert begründen",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Bei der automatischen Erstattung eines Onlinehändlers wurde in 300 Vorgängen sechsmal dieselbe Zahlung doppelt ausgelöst. Die Skala für Auftreten reicht von 1 (niedrig) bis 10 (hoch), im Beispiel wurde A = 4 vergeben. Warum ist das plausibel?",
  "payload": {
   "options": [
    {
     "text": "Sechs Fehler bei 300 Vorgängen sind ein gelegentliches, aber kein häufiges Auftreten.",
     "correct": true
    },
    {
     "text": "Sechs Fehler bedeuten, dass fast jeder Vorgang betroffen ist, weshalb der Wert bei 4 der Skala liegt.",
     "correct": false,
     "why": "Sechs von 300 sind nur zwei Prozent, also gerade nicht fast jeder Vorgang."
    },
    {
     "text": "Der Wert 4 bewertet, wie schwer die Auswirkung für Kunden ist, die doppelt belastet werden.",
     "correct": false,
     "why": "Die Schwere der Auswirkung ist die Bedeutung (B), nicht das Auftreten (A)."
    },
    {
     "text": "Der Wert ist niedrig, weil der tägliche Abgleich die meisten Doppelungen erkennt, bevor Kunden sie melden.",
     "correct": false,
     "why": "Die Erkennung wird mit der Entdeckung (E) bewertet, nicht mit dem Auftreten (A)."
    }
   ],
   "multi": false,
   "explanation": "Das Auftreten beschreibt, wie oft die Fehlerursache vorkommt: sechs von 300 Vorgängen sind gelegentlich. Die Schwere gehört zu B, die Erkennungswahrscheinlichkeit zu E."
  }
 }
]);

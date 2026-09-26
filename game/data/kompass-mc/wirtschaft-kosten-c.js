window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "sensitivity",
  "title": "Sensitivity und Accuracy",
  "figure": "startup",
  "lines": [
   "Merk dir: Die Vierfeldertafel zählt TP (richtig positiv), FN (falsch negativ), FP (falsch positiv) und TN (richtig negativ).",
   "Sensitivity = TP / (TP + FN): Anteil der tatsächlich positiven Fälle, die das Modell erkennt. Accuracy = (TP + TN) / N: Anteil aller richtigen Vorhersagen.",
   "Bei seltenen Ereignissen täuscht die Accuracy: Ein Modell, das fast alles als negativ einstuft, hat trotzdem einen hohen Wert, erkennt aber die seltenen Fälle nicht.",
   "Wenn ein übersehener Fall teuer ist, etwa ein Angriff, ist eine hohe Sensitivity wichtiger. Mehr Fehlalarme (FP) nimmt man dann in Kauf."
  ]
 },
 {
  "concept": "wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen",
  "title": "Wirtschaftliche Auswahl von Datenqualitätsmaßnahmen",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Welche Maßnahme zur Verbesserung der Datenqualität gewählt wird, entscheidet die Abwägung von Aufwand und Nutzen.",
   "Zum Aufwand zählen Personalzeit, Technik und Kosten, etwa für automatisierte Bereinigung, manuelle Nachpflege oder Neuerfassung.",
   "Der Wert der Daten bestimmt, wie viel Aufwand gerechtfertigt ist. Mängel mit hoher Wirkung auf Umsatz oder Prozesse werden zuerst behoben.",
   "Bei geringem Nutzen kann es wirtschaftlicher sein, Altdaten nicht zu übernehmen oder nur den aktuellen, geprüften Bestand zu migrieren."
  ]
 },
 {
  "concept": "wirtschaftlichkeitsbewertung",
  "title": "Wirtschaftlichkeitsbewertung",
  "figure": "bank",
  "lines": [
   "Merk dir: Eine Wirtschaftlichkeitsbewertung stellt Kosten und Nutzen gegenüber, meist über einen festen Betrachtungszeitraum.",
   "Alle Kosten gehören hinein, auch interne Arbeitsstunden. Ein Kostenwert für einen Monat oder ein Jahr sagt wenig über das gesamte Vorhaben.",
   "Die Amortisationsdauer ist Investition geteilt durch monatliche Nettoersparnis, also nach Abzug laufender Kosten.",
   "Nicht nur Geld zählt: Zeitgewinn, Fehlerquote und Durchlaufzeit fließen ein. Ein Zeitgewinn wirkt wirtschaftlich nur bei produktiver Nutzung."
  ]
 },
 {
  "concept": "storage-area-network",
  "title": "Storage Area Network (SAN)",
  "figure": "startup",
  "lines": [
   "Merk dir: Ein SAN ist ein eigenes Hochleistungsnetz, das Servern Speicher als Blockspeicher bereitstellt. Er erscheint dem Server wie ein lokales Laufwerk.",
   "NAS liefert Dateien (Dateiebene) über das normale Netzwerk. DAS ist Speicher, der direkt an einem einzelnen Server hängt.",
   "Vorteile des SAN: zentrale, bedarfsgerechte Zuweisung von Kapazität, gemeinsamer Zugriff mehrerer Server, redundante Pfade und zentrale Administration.",
   "Beim SAN lassen sich Kapazitäten flexibel umverteilen und weitere Server einfach anbinden. Bei lokalen Laufwerken ist das schwer."
  ]
 },
 {
  "concept": "technisches-auslastungsmanagement",
  "title": "Technisches Auslastungsmanagement",
  "figure": "startup",
  "lines": [
   "Merk dir: Auslastung ist Nutzungsdauer geteilt durch mögliche Betriebszeit. Man betrachtet Durchschnitt und Spitze getrennt.",
   "Hoher Durchschnitt und Spitze nahe 100 % bedeuten Engpass- und Ausfallrisiko. Dann helfen Erweiterung, Lastverteilung oder Redundanz.",
   "Niedriger Durchschnitt und niedrige Spitze deuten auf Überdimensionierung. Dort kann man konsolidieren oder abschalten und Kosten sparen.",
   "Kritische Systeme, bei deren Ausfall Prozesse abbrechen, werden nicht abgebaut, sondern redundant abgesichert."
  ]
 },
 {
  "concept": "virtual-private-network",
  "title": "Virtual Private Network (VPN)",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Ein VPN stellt über eine fremde oder öffentliche Infrastruktur wie das Internet eine logisch abgegrenzte, private Verbindung her.",
   "Dabei wird die Kommunikation verschlüsselt. Unbefugte können sie nicht einsehen und nicht unbemerkt verändern.",
   "Typischer Einsatz: Fernzugriff auf interne Systeme aus Homeoffice, Hotel, Messe oder fremdem WLAN, dem man nicht vertraut.",
   "Ein VPN ersetzt keine eigene Leitung und keinen Virenschutz. Es schützt den Übertragungsweg, nicht das Endgerät."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-sensitivity-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Statistik",
  "concept": "sensitivity",
  "title": "Sensitivity und Accuracy berechnen",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Bilderkennungssystem prüft 500 Leiterplatten (positiv = fehlerhaft). Ergebnis: 75 richtig aussortiert (TP), 25 fehlerhafte übersehen (FN), 40 fehlerfreie fälschlich aussortiert (FP), 360 fehlerfreie richtig durchgelassen (TN). Wie lauten Sensitivity und Accuracy?",
  "payload": {
   "options": [
    {
     "text": "Sensitivity 75,0 %, Accuracy 87,0 %",
     "correct": true
    },
    {
     "text": "Sensitivity 65,22 %, Accuracy 87,0 %",
     "correct": false,
     "why": "Die Sensitivity wurde mit TP / (TP + FP) statt TP / (TP + FN) berechnet (75 / 115). Das ist die Precision."
    },
    {
     "text": "Sensitivity 15,0 %, Accuracy 87,0 %",
     "correct": false,
     "why": "Es wurde durch alle 500 Leiterplatten geteilt statt durch die tatsächlich fehlerhaften (TP + FN = 100)."
    },
    {
     "text": "Sensitivity 75,0 %, Accuracy 72,0 %",
     "correct": false,
     "why": "Die Accuracy wurde nur mit den richtig negativen Fällen (360 / 500) berechnet, TP fehlt im Zähler."
    },
    {
     "text": "Sensitivity 87,0 %, Accuracy 75,0 %",
     "correct": false,
     "why": "Die beiden Kennzahlen wurden vertauscht."
    }
   ],
   "multi": false,
   "explanation": "Sensitivity: 75 / (75 + 25) = 75,0 %. Accuracy: (75 + 360) / 500 = 87,0 %. Die Kontrolle: 75 + 25 + 40 + 360 = 500."
  }
 },
 {
  "id": "kmp-sensitivity-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Statistik",
  "concept": "sensitivity",
  "title": "Accuracy täuscht bei seltenen Ausfällen",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Modell sagt Batterieausfälle im Rechenzentrum voraus. Nur etwa 3 von 100 Einheiten fallen aus. Der Abteilungsleiter lobt die Accuracy von 96 %, ein Mitarbeiter verweist auf die deutlich niedrigere Sensitivity. Warum belegt die Accuracy allein die Güte hier nicht?",
  "payload": {
   "options": [
    {
     "text": "Bei so wenigen Ausfällen erreicht schon ein Modell, das fast alles als kein Ausfall einstuft, eine hohe Accuracy, ohne die seltenen Ausfälle zu erkennen.",
     "correct": true
    },
    {
     "text": "Accuracy berücksichtigt nur die tatsächlich ausgefallenen Einheiten und ignoriert alle intakten.",
     "correct": false,
     "why": "Es ist umgekehrt: Die große Zahl intakter Einheiten dominiert die Accuracy."
    },
    {
     "text": "Eine Accuracy von 96 % bedeutet automatisch, dass auch 96 % aller tatsächlich eingetretenen Batterieausfälle vom Modell rechtzeitig erkannt werden.",
     "correct": false,
     "why": "Die Accuracy zählt alle richtigen Vorhersagen, nicht den Anteil erkannter Ausfälle."
    },
    {
     "text": "Accuracy kann grundsätzlich nie höher sein als die Sensitivity eines Modells.",
     "correct": false,
     "why": "Beide Kennzahlen haben unterschiedliche Nenner und können sehr weit auseinanderliegen."
    }
   ],
   "multi": false,
   "explanation": "Bei stark ungleicher Klassenverteilung dominiert die Negativklasse die Accuracy. Die Sensitivity misst gezielt, welcher Anteil der seltenen Ausfälle tatsächlich erkannt wird."
  }
 },
 {
  "id": "kmp-sensitivity-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Statistik",
  "concept": "sensitivity",
  "title": "Einstellung für Angriffserkennung",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein System stuft Netzwerkereignisse einer Klinik als Angriff oder harmlos ein. Einstellung A hat hohe Sensitivity, aber mehr Fehlalarme. Einstellung B hat weniger Fehlalarme, übersieht aber öfter echte Angriffe. Über das Netz laufen Patientendaten. Welche Einstellung ist zu bevorzugen?",
  "payload": {
   "options": [
    {
     "text": "Einstellung A, weil ein übersehener Angriff auf Patientendaten schwerer wiegt als ein manuell prüfbarer Fehlalarm.",
     "correct": true
    },
    {
     "text": "Einstellung B, weil weniger Fehlalarme den Prüfaufwand senken und Angriffe ohnehin selten sind.",
     "correct": false,
     "why": "Der geringere Aufwand wiegt weniger als das Risiko unerkannter Angriffe auf sensible Daten."
    },
    {
     "text": "Beide Einstellungen sind gleichwertig, weil sich Fehlalarme und übersehene Angriffe ausgleichen.",
     "correct": false,
     "why": "Die Folgen unterscheiden sich stark; ein übersehener Angriff hat ungleich größeren Schaden."
    },
    {
     "text": "Einstellung B, weil ein niedriger Wert bei der Sensitivity ein Zeichen hoher Qualität ist.",
     "correct": false,
     "why": "Eine niedrige Sensitivity bedeutet mehr übersehene Angriffe und ist gerade unerwünscht."
    }
   ],
   "multi": false,
   "explanation": "Wenn falsch-negative Ergebnisse schwere Folgen haben, zählt hohe Sensitivity. Die zusätzlichen Fehlalarme sind der geringere Schaden."
  }
 },
 {
  "id": "kmp-wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen",
  "title": "Aufwand und Nutzen abwägen",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Energieversorger findet Qualitätsmängel in seinen Zählerstandsdaten. Zur Wahl stehen automatisierte Bereinigung, manuelle Nachkontrolle oder Neuerfassung, das Budget ist begrenzt. Wie beeinflusst die Wirtschaftlichkeit die Auswahl?",
  "payload": {
   "options": [
    {
     "text": "Aufwand und Kosten der Maßnahme werden dem erwarteten Nutzen gegenübergestellt, wichtige Daten rechtfertigen mehr Aufwand.",
     "correct": true
    },
    {
     "text": "Es wird stets die teuerste Maßnahme wie die vollständige Neuerfassung gewählt, weil sie die höchste Datenqualität verspricht.",
     "correct": false,
     "why": "Wirtschaftlich ist nicht das Maximum an Aufwand, sondern ein angemessenes Verhältnis zum Nutzen."
    },
    {
     "text": "Es wird stets die günstigste Maßnahme gewählt, unabhängig von der Bedeutung der Daten.",
     "correct": false,
     "why": "Der Wert der Daten muss berücksichtigt werden; zu billige Maßnahmen können Folgekosten verursachen."
    },
    {
     "text": "Die Wirtschaftlichkeit spielt keine Rolle, weil Datenqualität immer vollständig herzustellen ist.",
     "correct": false,
     "why": "Bei begrenztem Budget muss priorisiert und abgewogen werden."
    }
   ],
   "multi": false,
   "explanation": "Die Auswahl erfolgt nach dem Verhältnis von Aufwand und Nutzen. Der Betriebswert der Daten bestimmt, wie viel Aufwand gerechtfertigt ist."
  }
 },
 {
  "id": "kmp-wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen",
  "title": "Priorisierung im Produktkatalog",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Onlinehändler hat einen Produktkatalog mit fehlerhaften Preisen, Beschreibungen und Kategorien. Nicht jeder Mangel wirkt sich gleich stark auf den Umsatz aus. Wie sollte er wirtschaftlich vorgehen?",
  "payload": {
   "options": [
    {
     "text": "Mängel mit großer Umsatz- und Kundenwirkung zuerst beheben und geringfügige nachrangig behandeln.",
     "correct": true
    },
    {
     "text": "Alle Mängel in der Reihenfolge ihrer Entdeckung mit gleichem Aufwand beheben.",
     "correct": false,
     "why": "Ohne Priorisierung wird Aufwand in unwichtige Mängel investiert."
    },
    {
     "text": "Zuerst die Mängel beheben, die am einfachsten und schnellsten korrigierbar sind.",
     "correct": false,
     "why": "Leichte Korrekturen sind nicht unbedingt die wirtschaftlich wichtigsten."
    },
    {
     "text": "Keine Korrektur vornehmen, weil Katalogfehler grundsätzlich unvermeidbar sind.",
     "correct": false,
     "why": "Fehler mit hoher Umsatzwirkung verursachen reale Verluste und sollten behoben werden."
    }
   ],
   "multi": false,
   "explanation": "Wirtschaftlich sinnvoll ist eine Priorisierung nach der Relevanz der Mängel. Der Umfang der Verbesserung wird so gewählt, dass der zusätzliche Nutzen den Aufwand rechtfertigt."
  }
 },
 {
  "id": "kmp-wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenqualität",
  "concept": "wirtschaftliche-auswahl-von-datenqualitaetsmassnahmen",
  "title": "Kostenseite der Bereinigung",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Onlinehändler führt gewachsene Kundenbestände zusammen und wägt Maßnahmen zur Bereinigung ab. Welche Positionen gehören zur Aufwands- bzw. Kostenseite der Abwägung? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Personalstunden für die manuelle Nachpflege der Datensätze",
     "correct": true
    },
    {
     "text": "Kosten einer Software für die automatisierte Bereinigung",
     "correct": true
    },
    {
     "text": "Weniger Folgefehler in späteren Auswertungen",
     "correct": false,
     "why": "Das ist ein Nutzen der verbesserten Daten, kein Aufwand."
    },
    {
     "text": "Verlässlichere Entscheidungsgrundlagen für die Geschäftsleitung",
     "correct": false,
     "why": "Auch das gehört zur Nutzenseite der Abwägung."
    },
    {
     "text": "Höhere Kundenzufriedenheit durch korrekte Anschriften",
     "correct": false,
     "why": "Korrekte Daten führen zu Nutzen, sie verursachen keine Kosten."
    }
   ],
   "multi": true,
   "explanation": "Aufwand entsteht durch Arbeitszeit, Technik und Software. Weniger Fehler, bessere Entscheidungen und zufriedene Kunden sind Nutzen und werden dem Aufwand gegenübergestellt."
  }
 },
 {
  "id": "kmp-wirtschaftlichkeitsbewertung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "wirtschaftlichkeitsbewertung",
  "title": "Amortisation Rechnungsmodul",
  "difficulty": 2,
  "points": 6,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Eine Sachbearbeiterin prüft Rechnungen 60 Std./Monat (interner Stundensatz 28,00 EUR). Ein Modul senkt den manuellen Aufwand um 70 %, kostet einmalig 9.600,00 EUR und 180,00 EUR Lizenz pro Monat. Nach wie vielen Monaten haben sich die Einführungskosten amortisiert?",
  "payload": {
   "options": [
    {
     "text": "ca. 10 Monate",
     "correct": true
    },
    {
     "text": "ca. 8,2 Monate",
     "correct": false,
     "why": "Die Lizenzgebühr von 180 EUR wurde nicht von der Ersparnis abgezogen: 9.600 / 1.176."
    },
    {
     "text": "ca. 29,6 Monate",
     "correct": false,
     "why": "Es wurden nur 30 % statt 70 % Ersparnis angesetzt (504 EUR − 180 EUR = 324 EUR)."
    },
    {
     "text": "ca. 53,3 Monate",
     "correct": false,
     "why": "Die Einführungskosten wurden nur durch die Lizenzgebühr geteilt: 9.600 / 180."
    },
    {
     "text": "ca. 6,4 Monate",
     "correct": false,
     "why": "Die Ersparnis wurde mit dem vollen Aufwand gerechnet (1.680 EUR statt 70 %): 9.600 / 1.500."
    }
   ],
   "multi": false,
   "explanation": "Ersparnis: 0,7 × 60 Std. × 28,00 EUR = 1.176 EUR pro Monat. Nach Lizenz: 1.176 − 180 = 996 EUR. Amortisation: 9.600 / 996 = 9,6, also ca. 10 Monate."
  }
 },
 {
  "id": "kmp-wirtschaftlichkeitsbewertung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "wirtschaftlichkeitsbewertung",
  "title": "Server im Haus oder Cloud",
  "difficulty": 2,
  "points": 6,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Online-Händler vergleicht über 3 Jahre (36 Monate): Option A eigene Server: 14.000 EUR einmalig, 3.600 EUR/Jahr Betrieb, 20 Std./Monat Administration à 45 EUR. Option B Cloud: 1.450 EUR/Monat inklusive Betrieb, 5 Std./Monat Administration à 45 EUR. Was ist richtig?",
  "payload": {
   "options": [
    {
     "text": "A kostet 57.200 EUR, B kostet 60.300 EUR, also ist A günstiger.",
     "correct": true
    },
    {
     "text": "A kostet 57.200 EUR, B kostet 52.200 EUR, also ist B günstiger, weil der Administrationsaufwand nur bei A zählt.",
     "correct": false,
     "why": "Der interne Administrationsaufwand von 5 Std. pro Monat muss auch bei Option B angesetzt werden (8.100 EUR)."
    },
    {
     "text": "A kostet 24.800 EUR, B kostet 52.200 EUR, also ist A deutlich günstiger, weil Personal nicht zählt.",
     "correct": false,
     "why": "Die internen Arbeitsstunden wurden bei beiden Optionen vergessen, obwohl sie echte Kosten sind."
    },
    {
     "text": "A kostet 57.200 EUR, B kostet 25.500 EUR, also ist B günstiger, weil Cloud kaum Personal braucht.",
     "correct": false,
     "why": "Die Miete wurde nur für ein Jahr statt für 36 Monate angesetzt (17.400 statt 52.200 EUR)."
    }
   ],
   "multi": false,
   "explanation": "A: 14.000 + 3 × 3.600 + 36 × 20 × 45 = 57.200 EUR. B: 36 × 1.450 + 36 × 5 × 45 = 52.200 + 8.100 = 60.300 EUR. A ist um 3.100 EUR günstiger."
  }
 },
 {
  "id": "kmp-wirtschaftlichkeitsbewertung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "wirtschaftlichkeitsbewertung",
  "title": "Tragweite eines Monatswerts",
  "difficulty": 1,
  "points": 3,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Ingenieurbüro will ein digitales Dokumentenarchiv einführen. Die Kostenrechnung für den ersten Betriebsmonat ergibt 1.260 EUR (480 EUR Lizenz, 300 EUR Speicherplatz, 480 EUR Scanneranteil). Was sagt der Wert für die Einführungsentscheidung aus?",
  "payload": {
   "options": [
    {
     "text": "Er zeigt nur die berechneten Betriebskosten des ersten Monats; Projekt- und Umstellungsaufwand wie Einrichtung, Datenübernahme und Schulung fehlen.",
     "correct": true
    },
    {
     "text": "Er entspricht den Gesamtkosten des Vorhabens, sodass weitere Kosten nicht mehr anfallen.",
     "correct": false,
     "why": "Der Betrag betrifft nur einen Betriebsmonat. Weitere Aufwände wie Einrichtung und Schulung fehlen."
    },
    {
     "text": "Er belegt bereits, dass sich das Archiv innerhalb des ersten Jahres durch Einsparungen amortisiert und daher eingeführt werden sollte.",
     "correct": false,
     "why": "Ohne Nutzen- oder Ersparnisangaben ist keine Amortisation ableitbar."
    },
    {
     "text": "Er gilt automatisch als Jahreswert, wenn man ihn mit 12 multipliziert, und ist vollständig.",
     "correct": false,
     "why": "Auch hochgerechnet fehlen die einmaligen Projektkosten und die Umstellungsbelastungen."
    }
   ],
   "multi": false,
   "explanation": "Der Betrag enthält nur Lizenz, Speicher und Scanneranteil (17.280 EUR / 36 = 480 EUR) für einen Monat. Anbieterauswahl, Einrichtung, Datenübernahme, Tests und Schulung sind nicht enthalten."
  }
 },
 {
  "id": "kmp-wirtschaftlichkeitsbewertung-4",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "wirtschaftlichkeitsbewertung",
  "title": "Intern oder externe Auswertung",
  "difficulty": 2,
  "points": 5,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Energieversorger wertet 240.000 Datensätze pro Jahr intern aus (Gesamtkosten 96.000 EUR, 3,5 Minuten je Datensatz). Ein Dienstleister bietet die Auswertung für 0,25 EUR je Datensatz (1,2 Minuten je Datensatz) an. Wie hoch ist die jährliche Kostenersparnis bei Vergabe?",
  "payload": {
   "options": [
    {
     "text": "36.000 EUR",
     "correct": true
    },
    {
     "text": "60.000 EUR",
     "correct": false,
     "why": "Das sind die Kosten des Dienstleisters (240.000 × 0,25 EUR), nicht die Ersparnis."
    },
    {
     "text": "24.000 EUR",
     "correct": false,
     "why": "Es wurden 25 % der internen Kosten berechnet, statt die Kosten je Datensatz zu vergleichen."
    },
    {
     "text": "0,15 EUR",
     "correct": false,
     "why": "Das ist die Ersparnis je Datensatz, nicht die jährliche Gesamtersparnis."
    },
    {
     "text": "156.000 EUR",
     "correct": false,
     "why": "Die Kosten wurden addiert (96.000 + 60.000) statt voneinander abgezogen."
    }
   ],
   "multi": false,
   "explanation": "Intern: 96.000 / 240.000 = 0,40 EUR je Datensatz. Extern 0,25 EUR. Ersparnis je Datensatz 0,15 EUR × 240.000 = 36.000 EUR. Die Bearbeitungsdauer sinkt von 3,5 auf 1,2 Minuten."
  }
 },
 {
  "id": "kmp-storage-area-network-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "storage-area-network",
  "title": "Vorteile des SAN",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Messdienst hat Rohdaten auf einem NAS und Auswertungsdaten auf lokalen Laufwerken (DAS) des Analyseservers. Er prüft ein SAN. Welche Vorteile bietet das SAN im Vergleich? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Speicherkapazität wird zentral und bedarfsgerecht statt in getrennten Beständen zugewiesen",
     "correct": true
    },
    {
     "text": "Redundante Speicherpfade verringern einzelne Ausfallpunkte",
     "correct": true
    },
    {
     "text": "Die Daten liegen jeweils fest im Gehäuse eines einzelnen Servers und sind nur dort erreichbar",
     "correct": false,
     "why": "Das beschreibt DAS, nicht das SAN."
    },
    {
     "text": "Zugriffe erfolgen ausschließlich über Dateifreigaben, ohne dass Blockspeicher nötig ist",
     "correct": false,
     "why": "Dateizugriff ist typisch für NAS. Das SAN arbeitet auf Blockebene."
    },
    {
     "text": "Es ist kein eigenes Speichernetz nötig, weil das SAN über die normale Büro-LAN-Verkabelung läuft",
     "correct": false,
     "why": "Ein SAN ist ein eigenes Speichernetz, das getrennt vom normalen LAN aufgebaut wird."
    }
   ],
   "multi": true,
   "explanation": "Ein SAN bündelt Speicher zentral, teilt ihn flexibel zu und bindet Server über redundante Pfade an. DAS und NAS bleiben dagegen getrennte, weniger flexible Bestände."
  }
 },
 {
  "id": "kmp-storage-area-network-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "storage-area-network",
  "title": "SAN und NAS unterscheiden",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Ingenieurbüro archiviert Projekte auf einem NAS und speichert Simulationsdaten lokal in den Rechenservern. Ein SAN soll beides ablösen. Welche Aussage über SAN und NAS ist richtig?",
  "payload": {
   "options": [
    {
     "text": "Das SAN stellt mehreren Servern gemeinsam Blockspeicher bereit, das NAS liefert Dateien über das Netzwerk.",
     "correct": true
    },
    {
     "text": "Das SAN liefert Dateien per Freigabe im LAN, das NAS stellt Blockspeicher bereit.",
     "correct": false,
     "why": "Die Begriffe sind vertauscht: NAS arbeitet dateibasiert, SAN blockbasiert."
    },
    {
     "text": "Beide sind identisch und unterscheiden sich nur in ihrem Anschaffungspreis.",
     "correct": false,
     "why": "Sie unterscheiden sich in Zugriffsart und Aufbau."
    },
    {
     "text": "Das SAN ist eine eingebaute Festplatte, die ausschließlich einem einzigen Server gehört.",
     "correct": false,
     "why": "Das wäre DAS; ein SAN ist ein gemeinsam genutzter Speicherverbund."
    }
   ],
   "multi": false,
   "explanation": "SAN: eigenes Speichernetz mit Blockzugriff für viele Server. NAS: Dateiserver im LAN. DAS: Laufwerke direkt am Server."
  }
 },
 {
  "id": "kmp-storage-area-network-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "storage-area-network",
  "title": "Zentrale Verwaltung im SAN",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Medienarchiv hat Produktionsdateien auf lokalen Laufwerken der Schnittplätze und freigegebene Fassungen auf einem NAS. Ein SAN soll beide Bestände aufnehmen. Welcher Vorteil ergibt sich für Administration und Ausbau?",
  "payload": {
   "options": [
    {
     "text": "Speicher lässt sich zentral verwalten und sichern, und weitere Server lassen sich flexibel an bereitgestellten Blockspeicher anbinden.",
     "correct": true
    },
    {
     "text": "Jeder Schnittplatz muss für mehr Kapazität einzeln aufgerüstet werden, was die Verwaltung und den Betrieb des Archivs insgesamt deutlich vereinfacht.",
     "correct": false,
     "why": "Einzelaufrüstung ist der Nachteil lokaler Laufwerke, kein Vorteil des SAN."
    },
    {
     "text": "Die getrennte Sicherung der Bestände bleibt bestehen und wird deshalb übersichtlicher.",
     "correct": false,
     "why": "Ein SAN konsolidiert Speicher und Sicherung, statt getrennte Bestände beizubehalten."
    },
    {
     "text": "Es entsteht kein Bedarf mehr an Datensicherung, da Blockspeicher nie ausfällt.",
     "correct": false,
     "why": "Auch ein SAN braucht Sicherung; Redundanz ersetzt kein Backup."
    }
   ],
   "multi": false,
   "explanation": "Ein SAN konsolidiert getrennte Speicherbestände. Administration und Sicherung werden zentral, und zusätzliche Server binden sich flexibel an den Blockspeicher an."
  }
 },
 {
  "id": "kmp-technisches-auslastungsmanagement-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "technisches-auslastungsmanagement",
  "title": "Kategorie mit Handlungsbedarf",
  "difficulty": 2,
  "points": 6,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Entwicklungszentrum hat pro Woche 168 Stunden. Trainingsserver: Mittel 96 Std., Spitze 154 Std. Inferenzserver: Mittel 142 Std., Spitze 165 Std. Analyseserver: Mittel 38 Std., Spitze 91 Std. Wo besteht vorrangiger Handlungsbedarf?",
  "payload": {
   "options": [
    {
     "text": "Bei den Inferenzservern: Mittel 84,5 % und Spitze 98,2 % lassen kaum Reserve, geeignet ist Kapazitätserweiterung oder Verlagerung von Aufträgen.",
     "correct": true
    },
    {
     "text": "Bei den Analyseservern: Mittel 22,6 % zeigen Bedarf an zusätzlicher Technik zur Auslastung.",
     "correct": false,
     "why": "Niedrige Auslastung bedeutet Reserve. Zusätzliche Beschaffung wäre unwirtschaftlich."
    },
    {
     "text": "Bei den Trainingsservern: 154 Std. Spitze sind der höchste Wert aller Kategorien, daher dringend.",
     "correct": false,
     "why": "Die höchste Spitze hat die Inferenzkategorie mit 165 Std.; Trainingsserver haben mit 57 % Mittel Luft."
    },
    {
     "text": "Bei keiner Kategorie, weil alle Mittelwerte und Spitzenwerte unter der verfügbaren Wochenzeit von 168 Stunden liegen und somit nirgends ein Engpass besteht.",
     "correct": false,
     "why": "Der Vergleich mit der Wochenzeit allein reicht nicht, entscheidend sind Verhältnis und Spitzen."
    }
   ],
   "multi": false,
   "explanation": "Auslastung im Mittel: Training 57,1 %, Inferenz 84,5 %, Analyse 22,6 %. Spitzen: 91,7 %, 98,2 %, 54,2 %. Nur Inferenz hat kaum Reserve, bei Analyse ist keine Beschaffung nötig."
  }
 },
 {
  "id": "kmp-technisches-auslastungsmanagement-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "technisches-auslastungsmanagement",
  "title": "Haltestellen-Infrastruktur beurteilen",
  "difficulty": 2,
  "points": 6,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Verkehrsbetrieb betreibt digitale Haltestellensysteme, die täglich höchstens 18 Stunden laufen. Edge-Computer (12 Stück): Mittel 7,5 Std., Spitze 13 Std. Videospeicher-Server (6): Mittel 5 Std., Spitze 8 Std. Datenbankserver (3): Mittel 15 Std., Spitze 18 Std. Welche Beurteilung passt?",
  "payload": {
   "options": [
    {
     "text": "Edge-Computer und Videospeicher haben deutliche Reserven, die Datenbankserver sind hoch bis kritisch ausgelastet und brauchen Skalierung oder Lastverteilung.",
     "correct": true
    },
    {
     "text": "Die Datenbankserver sind kaum ausgelastet und können abgebaut werden, die Edge-Computer sind kritisch.",
     "correct": false,
     "why": "Verwechslung: Datenbankserver liegen mit 15 von 18 Std. im Mittel (83 %) und 100 % in der Spitze."
    },
    {
     "text": "Alle drei Typen sind gleich stark ausgelastet, deshalb ist keine Maßnahme nötig.",
     "correct": false,
     "why": "Die Mittelwerte reichen von 28 % bis 83 % der Betriebszeit und sind sehr unterschiedlich."
    },
    {
     "text": "Die Videospeicher-Server sind am stärksten ausgelastet und müssen sofort erweitert werden.",
     "correct": false,
     "why": "Mit 5 von 18 Std. haben sie die niedrigste Auslastung (28 %)."
    }
   ],
   "multi": false,
   "explanation": "Mittlere Auslastung: Edge 41,7 %, Video 27,8 %, Datenbank 83,3 % (Spitze 100 %). Bei Edge und Video sind Reserven vorhanden, bei den Datenbankservern besteht Engpassrisiko."
  }
 },
 {
  "id": "kmp-technisches-auslastungsmanagement-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "technisches-auslastungsmanagement",
  "title": "Labor: Gateways nicht abbauen",
  "difficulty": 2,
  "points": 6,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Prüflabor arbeitet täglich 16 Stunden. Simulationsworkstations (8): Mittel 6 Std., Spitze 9 Std. Messdaten-Gateways (4): Mittel 11 Std., Spitze 16 Std., ein Ausfall bricht Versuche ab. Backup-Appliances (2): Mittel 3 Std., Spitze 7 Std. Kosten sollen sinken. Welcher Vorschlag ist sachgerecht?",
  "payload": {
   "options": [
    {
     "text": "Workstations konsolidieren oder bedarfsgerecht abschalten, bei den Gateways eher Redundanz oder Lastverteilung statt Abbau.",
     "correct": true
    },
    {
     "text": "Die Gateways abbauen, da ihr Mittel von 11 Std. unter der Betriebszeit von 16 Std. liegt.",
     "correct": false,
     "why": "Die Spitze erreicht 100 %. Ein Ausfall bricht Versuche ab, ein Abbau erhöht das Risiko."
    },
    {
     "text": "Die Workstations erweitern, weil sie mit 6 Std. Mittel die höchste Auslastung haben.",
     "correct": false,
     "why": "6 von 16 Std. sind nur 37,5 % und die niedrigste Auslastung der drei Typen neben den Backups."
    },
    {
     "text": "Die Backup-Appliances abschaffen, da sie im Mittel nur 3 Stunden laufen.",
     "correct": false,
     "why": "Backups sichern Projektdaten. Geringe Nutzungszeit ist bei Datensicherung normal."
    }
   ],
   "multi": false,
   "explanation": "Workstations: 37,5 % Mittel, viel Reserve. Gateways: 68,75 % Mittel, Spitze 100 %, kritisch. Backup: geringe Zeit, aber notwendig für die Datensicherheit."
  }
 },
 {
  "id": "kmp-virtual-private-network-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "virtual-private-network",
  "title": "Vorteil VPN im fremden Netz",
  "difficulty": 1,
  "points": 2,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Eine Servicetechnikerin greift in einer angemieteten Werkstatt über die nicht vertrauenswürdige Netzinfrastruktur des Vermieters auf das interne Ticketsystem zu. Ein VPN ist vorgesehen. Worin besteht der sicherheitstechnische Vorteil?",
  "payload": {
   "options": [
    {
     "text": "Die Kommunikation ist vor unberechtigter Einsicht und Manipulation geschützt, obwohl sie über ein nicht vertrauenswürdiges Netz läuft.",
     "correct": true
    },
    {
     "text": "Das Netz des Vermieters wird durch das VPN vertrauenswürdig und sicher.",
     "correct": false,
     "why": "Das fremde Netz bleibt unsicher; das VPN schützt nur die Verbindung darüber."
    },
    {
     "text": "Das Notebook der Technikerin ist danach automatisch vor Schadsoftware, Viren und Angriffen aus dem Werkstattnetz vollständig geschützt.",
     "correct": false,
     "why": "Ein VPN schützt den Übertragungsweg, nicht das Endgerät vor Malware."
    },
    {
     "text": "Der Zugriff wird schneller, weil der Vermieter die Verbindung bevorzugt behandelt.",
     "correct": false,
     "why": "Ein VPN ist kein Geschwindigkeitsvorteil und verursacht oft zusätzlichen Aufwand."
    }
   ],
   "multi": false,
   "explanation": "Das VPN verschlüsselt die Verbindung zum Ticketsystem. Über das fremde Netz können Dritte weder mitlesen noch die Daten unbemerkt verändern."
  }
 },
 {
  "id": "kmp-virtual-private-network-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "virtual-private-network",
  "title": "Funktionsweise eines VPN",
  "difficulty": 1,
  "points": 2,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Eine Vertriebsmitarbeiterin greift auf einer Messe über das dortige WLAN per VPN auf das interne Auftragssystem zu. Wie ermöglicht das VPN die Kommunikation?",
  "payload": {
   "options": [
    {
     "text": "Es baut über die öffentliche Infrastruktur eine logisch abgegrenzte, verschlüsselte private Verbindung zum Firmennetz auf.",
     "correct": true
    },
    {
     "text": "Es zieht eigens eine physische Standleitung vom Messestand durch die Messehalle bis zum Rechenzentrum des Unternehmens.",
     "correct": false,
     "why": "Ein VPN nutzt vorhandene öffentliche Infrastruktur und braucht keine eigene Leitung."
    },
    {
     "text": "Es komprimiert die Daten der Verbindung, damit sie schneller übertragen werden.",
     "correct": false,
     "why": "Das Ziel ist Schutz durch Verschlüsselung, nicht Komprimierung."
    },
    {
     "text": "Es verbindet das Notebook mit dem Messe-WLAN ohne jede Absicherung der Daten.",
     "correct": false,
     "why": "Ohne Verschlüsselung wäre es kein VPN; die Daten wären einsehbar."
    }
   ],
   "multi": false,
   "explanation": "Ein VPN richtet einen logisch abgegrenzten Kanal durch das Internet ein. Die Daten werden verschlüsselt, ohne dass eine eigene Leitung nötig ist."
  }
 },
 {
  "id": "kmp-virtual-private-network-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "virtual-private-network",
  "title": "Was ein VPN leistet",
  "difficulty": 1,
  "points": 2,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Softwareentwickler arbeitet von zu Hause und greift auf das interne Versionsverwaltungssystem zu, ausschließlich über VPN. Welche Aussagen zum VPN treffen zu? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Die übertragenen Daten werden vor unbefugter Einsicht geschützt",
     "correct": true
    },
    {
     "text": "Die Verbindung erscheint logisch wie ein eigenes privates Netz, obwohl sie über das Internet läuft",
     "correct": true
    },
    {
     "text": "Ein Virus auf dem privaten Rechner wird durch das VPN blockiert",
     "correct": false,
     "why": "Ein VPN schützt den Übertragungsweg, ersetzt aber keinen Virenschutz."
    },
    {
     "text": "Das VPN garantiert, dass das Rechenzentrum nie ausfällt",
     "correct": false,
     "why": "Verfügbarkeit des Rechenzentrums hängt nicht vom VPN ab."
    }
   ],
   "multi": true,
   "explanation": "Ein VPN sorgt für Vertraulichkeit und eine logisch private Verbindung über das Internet. Malware auf dem Endgerät und Ausfälle des Rechenzentrums verhindert es nicht."
  }
 }
]);

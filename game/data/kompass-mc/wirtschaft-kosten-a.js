window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "angebotsvergleich",
  "title": "Angebotsvergleich",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: Beim Angebotsvergleich zählt nicht nur der Preis. Man vergleicht den Bezugspreis und zusätzlich qualitative Kriterien.",
   "Wichtig sind zum Beispiel Qualität, Lieferzeit, Garantie, Service, Zahlungsziel und Zuverlässigkeit des Lieferanten.",
   "Ein höherer Bezugspreis kann sachlich gerechtfertigt sein, etwa durch bessere Qualität, schnellere Lieferung oder längere Garantie.",
   "Bezugspreis heißt: Einkaufspreis abzüglich Rabatt und Skonto, zuzüglich Bezugskosten wie Fracht."
  ]
 },
 {
  "concept": "break-even-analyse",
  "title": "Break-even-Analyse",
  "figure": "bank",
  "lines": [
   "Merk dir: Die Break-even-Analyse ermittelt die Gewinnschwelle. Ab dieser Menge (oder diesem Zeitpunkt) sind alle Kosten gedeckt und es beginnt die Gewinnzone.",
   "Am Break-even-Point gilt: Erlöse = Kosten. Bei Stückerlös p, Stückkosten kv und Fixkosten Kf ergibt sich die Menge x = Kf / (p − kv).",
   "Relevant sind nur Kosten, die durch das Vorhaben zusätzlich entstehen. Ohnehin anfallende Gehälter und rein kalkulatorische Werte ohne Zahlung zählen nicht.",
   "Lineare Abschreibung: Anschaffungskosten geteilt durch Nutzungsdauer, bei 21.600 EUR über sechs Jahre also 3.600 EUR pro Jahr oder 300 EUR pro Monat."
  ]
 },
 {
  "concept": "kalkulatorischer-stundensatz",
  "title": "Kalkulatorischer Stundensatz",
  "figure": "bank",
  "lines": [
   "Merk dir: Der Stundensatz einer internen Fachkraft ergibt sich aus den jährlichen Gesamtkosten geteilt durch die produktiven Jahresstunden.",
   "Produktive Arbeitstage = Arbeitstage laut Vertrag minus Urlaub, Krankheit, Feiertage und Weiterbildung. Mal Stunden je Tag ergibt die produktiven Stunden.",
   "Der Gehalt allein reicht nicht: Im Vollkosten-Stundensatz stecken auch Arbeitgeberanteile zur Sozialversicherung, Raum-, Energie- und Lizenzkosten sowie Abschreibungen.",
   "Mit dem effektiven Stundensatz lässt sich intern gegen einen externen Anbieter vergleichen (Eigenleistung oder Fremdbezug)."
  ]
 },
 {
  "concept": "kostenanalyse",
  "title": "Kostenanalyse",
  "figure": "bank",
  "lines": [
   "Merk dir: Die Kostenanalyse gliedert Kosten nach Kostenarten, etwa Personal-, Hardware-, Lizenz-, Schulungs- oder Dienstleistungskosten.",
   "Bei Kostenentwicklungen gibt man Kostengegenstand, Richtung, Prozentwert und Zeitspanne an. Beispiel: Die Kosten sind von Januar bis Dezember um 25 % gestiegen.",
   "Prozentuale Veränderung = (Endwert − Anfangswert) / Anfangswert × 100. Bezugsgröße ist immer der Anfangswert.",
   "In einem Kostenplan wird jede Kostenart mit einem konkreten Aufwand des Vorhabens hinterlegt, zum Beispiel Honorar der externen Agentur unter Personal-/Dienstleistungskosten."
  ]
 },
 {
  "concept": "kostenrechnung-und-kalkulation",
  "title": "Kostenrechnung und Kalkulation",
  "figure": "finanzamt",
  "lines": [
   "Merk dir: Stromkosten pro Jahr = Leistungsaufnahme in kW × Betriebsstunden × Preis je kWh. Watt musst du zuvor durch 1.000 teilen.",
   "Bei einer Auslastung nutzt du nur den Anteil der Nennleistung. Der Wirkungsgrad erhöht die Aufnahme aus dem Netz: Aufnahme = Nutzleistung / Wirkungsgrad.",
   "Anschaffungskosten verteilst du gleichmäßig auf die Nutzungsdauer. 2.400 EUR über 48 Monate ergeben 50 EUR pro Monat.",
   "Zu den Monatskosten zählen Abschreibung, Verbrauchs- und Druckkosten sowie Wartung. Runde erst am Ende."
  ]
 },
 {
  "concept": "kostenvergleich",
  "title": "Kostenvergleich",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: Beim Kostenvergleich Kauf gegen Miete rechnest du beide Varianten auf dieselbe Zeitbasis um, zum Beispiel pro Monat oder für den gesamten Zeitraum.",
   "Beim Kauf zählst du Abschreibung, Verbrauchsmaterial, Wartung und weitere Kosten. Bei der Miete prüfst du, was in der Rate enthalten ist.",
   "Rechenbeispiel: 960 EUR über 48 Monate sind 20 EUR im Monat. Kosten, die in beiden Varianten gleich sind, kannst du weglassen.",
   "Danach wählst du die Variante mit den geringeren Gesamtkosten. Nicht-monetäre Aspekte wie Flexibilität kommen ergänzend dazu."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-angebotsvergleich-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "angebotsvergleich",
  "title": "Teureres Angebot begründen",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Für einen neuen Schulungsraum liegen zwei Angebote über je 24 Tablets vor: Angebot A kostet 410 EUR je Gerät, Angebot B 438 EUR. Die Einkaufsleitung wählt Angebot B. Welche Gründe können den höheren Bezugspreis sachlich rechtfertigen? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Höhere Produktqualität der Geräte von Anbieter B",
     "correct": true
    },
    {
     "text": "Kürzere Lieferzeit, sodass der Raum früher genutzt werden kann",
     "correct": true
    },
    {
     "text": "Längere Garantiefrist auf die gelieferten Tablets",
     "correct": true
    },
    {
     "text": "Der höhere Preis je Gerät, weil teurer automatisch besser bedeutet",
     "correct": false,
     "why": "Der Preis allein ist kein sachlicher Grund. Er ist gerade das, was gerechtfertigt werden soll."
    },
    {
     "text": "Anbieter B hat den größeren Firmensitz und ein bekannteres Logo",
     "correct": false,
     "why": "Größe und Bekanntheit sind keine nachprüfbaren Leistungsmerkmale des Angebots."
    }
   ],
   "multi": true,
   "explanation": "Sachliche Gründe sind Leistungsmerkmale des Angebots wie Qualität, Lieferzeit und Garantie. Der Preis selbst oder das Image des Anbieters begründen den Mehrpreis nicht."
  }
 },
 {
  "id": "kmp-angebotsvergleich-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "angebotsvergleich",
  "title": "Mehrpreis bei Sensoren",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Für ein Messprojekt werden 40 baugleiche Sensoren gekauft. Angebot 1: 126 EUR je Sensor, Angebot 2: 134 EUR je Sensor. Die Projektleitung beauftragt Anbieter 2. Welche Begründungen sind sachlich tragfähig? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Schnellere Bereitstellung der Sensoren",
     "correct": true
    },
    {
     "text": "Längeres Zahlungsziel, das die Liquidität schont",
     "correct": true
    },
    {
     "text": "Geringeres Ausfallrisiko durch gute Erfahrungen mit dem Lieferanten",
     "correct": true
    },
    {
     "text": "Die Sensoren von Anbieter 2 kosten 8 EUR mehr je Stück",
     "correct": false,
     "why": "Das ist nur die Preisdifferenz, keine Begründung. Ein Mehrpreis ist kein Vorteil."
    },
    {
     "text": "Bei 40 Stück sind alle Anbieter gleich gut, also zählt der Zufall",
     "correct": false,
     "why": "Ein Angebotsvergleich beruht auf nachprüfbaren Kriterien, nicht auf Zufall."
    }
   ],
   "multi": true,
   "explanation": "Der Mehrpreis von 8 EUR je Sensor (insgesamt 320 EUR) lässt sich durch Lieferzeit, Zahlungsbedingungen oder Zuverlässigkeit begründen. Die Preisdifferenz selbst ist keine Begründung."
  }
 },
 {
  "id": "kmp-angebotsvergleich-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "angebotsvergleich",
  "title": "Teurer Wartungsanbieter",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Eine Bildungseinrichtung vergleicht zwei Wartungsangebote für ihre Server über fünf Jahre und wählt bewusst den Anbieter mit der höheren Angebotssumme. Welche Gründe sprechen sachlich dafür? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Kürzere Reaktions- und Wiederherstellungszeiten bei Störungen",
     "correct": true
    },
    {
     "text": "Höhere Zuverlässigkeit und positive Referenzen des Anbieters",
     "correct": true
    },
    {
     "text": "Die höhere Angebotssumme ist an sich ein Qualitätsnachweis",
     "correct": false,
     "why": "Ein höherer Preis belegt keine höhere Leistung. Entscheidend sind konkrete Leistungsmerkmale."
    },
    {
     "text": "Ein teureres Angebot ist immer wirtschaftlicher, weil mehr bezahlt wird",
     "correct": false,
     "why": "Wirtschaftlichkeit heißt Nutzen im Verhältnis zu den Kosten, nicht möglichst hohe Kosten."
    },
    {
     "text": "Der Anbieter liegt räumlich weit entfernt und ist dadurch schwer erreichbar",
     "correct": false,
     "why": "Große Entfernung ist eher ein Nachteil und kein Grund für das teurere Angebot."
    }
   ],
   "multi": true,
   "explanation": "Für das teurere Angebot sprechen Service- und Qualitätsmerkmale wie schnelle Reaktionszeiten, Zuverlässigkeit und Referenzen. Der Preis allein oder eine große Entfernung sind keine Argumente."
  }
 },
 {
  "id": "kmp-break-even-analyse-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "break-even-analyse",
  "title": "Zweck der Break-even-Analyse",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Lebensmittelgroßhändler plant eine automatisiertes Kommissioniersystem. Die Geschäftsleitung will vor der Freigabe wissen, was eine Break-even-Analyse zur Entscheidung beiträgt. Was ist richtig?",
  "payload": {
   "options": [
    {
     "text": "Sie ermittelt die Gewinnschwelle, zeit- oder mengenbezogen, ab der die Anschaffung in die Gewinnzone führt.",
     "correct": true
    },
    {
     "text": "Sie bewertet Angebote anhand gewichteter Kriterien und liefert einen Gesamtnutzwert je Anbieter.",
     "correct": false,
     "why": "Das beschreibt die Nutzwertanalyse, nicht die Break-even-Analyse."
    },
    {
     "text": "Sie legt die jährliche Abschreibung der Anlage nach dem Steuerrecht fest.",
     "correct": false,
     "why": "Abschreibung ist ein Rechenbestandteil, aber nicht Ziel der Break-even-Analyse."
    },
    {
     "text": "Sie ermittelt die höchstmögliche Kapazität der Systems in Paketen pro Stunde.",
     "correct": false,
     "why": "Kapazität ist eine technische Kenngröße; die Analyse fragt nach der Kostendeckung."
    },
    {
     "text": "Sie zeigt den Preis, zu dem die Anlage später am Markt weiterverkauft werden kann.",
     "correct": false,
     "why": "Der Restwert ist keine Aussage der Break-even-Analyse."
    }
   ],
   "multi": false,
   "explanation": "Die Break-even-Analyse bestimmt die Gewinnschwelle als Menge oder Zeitpunkt, ab dem Erlöse und Kosten gleich sind und danach ein Gewinn entsteht. Sie ist ein Verfahren zur ökonomischen Beurteilung eines Vorhabens."
  }
 },
 {
  "id": "kmp-break-even-analyse-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "break-even-analyse",
  "title": "Break-even Druckservice",
  "difficulty": 3,
  "points": 13,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Medienzentrum bietet einen 3D-Druck-Service an, jede Freigabe erlöst 8 EUR. Ein Drucksystem kostet 21.600 EUR und wird linear über 6 Jahre abgeschrieben (12 Monate je Jahr). Vorhandene Gehälter (9.400 EUR/Monat) bleiben unverändert, ein freier Raum wird mit 700 EUR/Monat nur kalkulatorisch verrechnet (keine Zahlung, keine verdrängte Nutzung). Zusätzlich fallen monatlich an: Drucksteuerung 420 EUR, Wartung 180 EUR, Bekanntmachung 300 EUR. Wie viele Freigaben pro Monat sind mindestens nötig, um die Kosten zu decken?",
  "payload": {
   "options": [
    {
     "text": "150 Freigaben",
     "correct": true
    },
    {
     "text": "238 Freigaben",
     "correct": false,
     "why": "Der kalkulatorische Raumwert von 700 EUR wurde angesetzt: 1.900 / 8 = 237,5, aufgerundet 238. Er löst aber keine zusätzliche Zahlung aus."
    },
    {
     "text": "1.325 Freigaben",
     "correct": false,
     "why": "Zusätzlich wurden die Gehälter von 9.400 EUR angesetzt: 10.600 / 8 = 1.325. Sie fallen ohnehin an."
    },
    {
     "text": "563 Freigaben",
     "correct": false,
     "why": "Die Abschreibung wurde mit 3.600 EUR (Jahreswert) statt 300 EUR pro Monat angesetzt: 4.500 / 8 = 562,5, aufgerundet 563."
    },
    {
     "text": "113 Freigaben",
     "correct": false,
     "why": "Die Bekanntmachung von 300 EUR wurde vergessen: 900 / 8 = 112,5, aufgerundet 113."
    }
   ],
   "multi": false,
   "explanation": "Relevante Monatskosten: Abschreibung 21.600 / 72 Monate = 300 EUR, dazu 420 + 180 + 300 EUR = 1.200 EUR. Gehälter und kalkulatorischer Raumwert entfallen. Break-even: 1.200 EUR / 8 EUR = 150 Freigaben."
  }
 },
 {
  "id": "kmp-kalkulatorischer-stundensatz-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kalkulatorischer-stundensatz",
  "title": "Effektiver Stundensatz intern",
  "difficulty": 2,
  "points": 5,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Systemhaus vergleicht interne Entwickler mit einem externen Büro (72,00 EUR/Std.). Eine interne Fachkraft kostet 96.000,00 EUR im Jahr. Laut Vertrag gibt es 250 Arbeitstage à 8 Stunden. Davon entfallen 28 Tage auf Urlaub, 7 auf Krankheit und 11 auf Feiertage. Wie hoch ist der effektive Stundensatz der internen Kraft?",
  "payload": {
   "options": [
    {
     "text": "58,82 EUR/Std.",
     "correct": true
    },
    {
     "text": "48,00 EUR/Std.",
     "correct": false,
     "why": "Es wurde durch alle 250 Vertragstage geteilt (2.000 Std.), ohne Ausfalltage abzuziehen."
    },
    {
     "text": "55,81 EUR/Std.",
     "correct": false,
     "why": "Die 11 Feiertage wurden nicht abgezogen: 215 Tage × 8 = 1.720 Std."
    },
    {
     "text": "56,87 EUR/Std.",
     "correct": false,
     "why": "Die 7 Krankheitstage wurden nicht abgezogen: 211 Tage × 8 = 1.688 Std."
    },
    {
     "text": "470,59 EUR/Std.",
     "correct": false,
     "why": "Es wurde durch produktive Tage (204) statt Stunden geteilt. Das ergibt einen Tagessatz, keinen Stundensatz."
    }
   ],
   "multi": false,
   "explanation": "Produktive Tage: 250 − 28 − 7 − 11 = 204. Produktive Stunden: 204 × 8 = 1.632. Stundensatz: 96.000 / 1.632 = 58,82 EUR. Er liegt unter dem externen Satz von 72,00 EUR."
  }
 },
 {
  "id": "kmp-kalkulatorischer-stundensatz-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kalkulatorischer-stundensatz",
  "title": "Stundensatz Softwareentwicklerin",
  "difficulty": 2,
  "points": 5,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Für ein internes Digitalisierungsprojekt braucht das Controlling den kalkulatorischen Stundensatz einer Entwicklerin. Ihre Vollkosten betragen 96.000 EUR im Jahr, vertraglich sind 250 Arbeitstage à 8 Stunden vorgesehen. Es entfallen 25 Tage auf Urlaub, 8 auf Krankheit und 4 auf Weiterbildung. Wie hoch ist der Stundensatz (gerundet)?",
  "payload": {
   "options": [
    {
     "text": "56,34 EUR/Std.",
     "correct": true
    },
    {
     "text": "48,00 EUR/Std.",
     "correct": false,
     "why": "Es wurde durch alle 250 Tage × 8 Stunden geteilt und kein Ausfall berücksichtigt."
    },
    {
     "text": "54,30 EUR/Std.",
     "correct": false,
     "why": "Die Weiterbildung von 4 Tagen wurde nicht abgezogen: 221 Tage × 8 = 1.768 Std."
    },
    {
     "text": "55,30 EUR/Std.",
     "correct": false,
     "why": "Die Krankheitstage wurden nicht abgezogen: 217 Tage × 8 = 1.736 Std."
    },
    {
     "text": "58,82 EUR/Std.",
     "correct": false,
     "why": "Es wurden 204 Tage angesetzt, also andere Ausfallwerte verwendet als in der Aufgabe."
    }
   ],
   "multi": false,
   "explanation": "Produktive Tage: 250 − 25 − 8 − 4 = 213. Stunden: 213 × 8 = 1.704. Stundensatz: 96.000 / 1.704 = 56,338, gerundet 56,34 EUR."
  }
 },
 {
  "id": "kmp-kalkulatorischer-stundensatz-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kalkulatorischer-stundensatz",
  "title": "Vollkosten-Stundensatz",
  "difficulty": 2,
  "points": 4,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Für eine fest angestellte Übersetzerin ist der Gehaltsstundensatz bekannt. Die Geschäftsführung will einen kostendeckenden Vollkosten-Stundensatz ansetzen. Welche Kostenbestandteile müssen zusätzlich einfließen? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Arbeitgeberanteile zur Sozialversicherung",
     "correct": true
    },
    {
     "text": "Anteilige Raum- und Bürokosten wie Miete und Nebenkosten",
     "correct": true
    },
    {
     "text": "Abschreibungen auf die IT- und Arbeitsplatzausstattung",
     "correct": true
    },
    {
     "text": "Der Umsatzerlös, den die Übersetzerin pro Stunde erzielt",
     "correct": false,
     "why": "Erlöse sind keine Kosten und gehören nicht in einen Kostensatz."
    },
    {
     "text": "Der geplante Gewinnaufschlag der Geschäftsführung",
     "correct": false,
     "why": "Der Gewinn kommt erst bei der Preisbildung dazu, nicht in den Kostenstundensatz."
    }
   ],
   "multi": true,
   "explanation": "Der Vollkosten-Stundensatz enthält alle Kosten des Arbeitsplatzes: Lohnnebenkosten, Raum, Ausstattung und Lizenzen. Erlöse und Gewinnaufschlag sind keine Kosten."
  }
 },
 {
  "id": "kmp-kostenanalyse-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenanalyse",
  "title": "Kühlkosten im Jahresverlauf",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Die Kühlkosten eines Rechenzentrums betragen im Januar 48.000 EUR, im April 51.000 EUR, im Juli 57.000 EUR und im Dezember 60.000 EUR. Welche Aussage zum Gesamtzeitraum ist quantitativ richtig?",
  "payload": {
   "options": [
    {
     "text": "Die Kühlkosten sind von Januar bis Dezember um 25 % gestiegen.",
     "correct": true
    },
    {
     "text": "Die Kühlkosten sind von Januar bis Dezember um 20 % gestiegen.",
     "correct": false,
     "why": "Es wurde die Differenz von 12.000 EUR auf den Endwert (60.000) statt auf den Anfangswert bezogen."
    },
    {
     "text": "Die Kühlkosten sind von Januar bis Dezember um 12.000 % gestiegen.",
     "correct": false,
     "why": "Der absolute Betrag in EUR wurde fälschlich als Prozentwert genannt."
    },
    {
     "text": "Die Kühlkosten sind von Januar bis Dezember um 125 % gestiegen.",
     "correct": false,
     "why": "Das Verhältnis 60.000 / 48.000 = 125 % ist der Endwert in Prozent, nicht die Zunahme."
    }
   ],
   "multi": false,
   "explanation": "Zunahme: 60.000 − 48.000 = 12.000 EUR. Bezogen auf den Anfangswert: 12.000 / 48.000 = 25 %. Die Kosten sind also um 25 % gestiegen."
  }
 },
 {
  "id": "kmp-kostenanalyse-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenanalyse",
  "title": "Lizenzkosten sinken",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Die jährlichen Lizenzkosten eines Fachverfahrens lagen 2022 bei 320.000 EUR, 2023 bei 304.000 EUR, 2024 bei 272.000 EUR und 2025 bei 240.000 EUR. Welche Aussage zum gesamten Zeitraum stimmt?",
  "payload": {
   "options": [
    {
     "text": "Die Lizenzkosten sind von 2022 bis 2025 um 25 % gesunken.",
     "correct": true
    },
    {
     "text": "Die Lizenzkosten sind von 2022 bis 2025 um 33,3 % gesunken.",
     "correct": false,
     "why": "Die Senkung von 80.000 EUR wurde auf den Endwert 240.000 statt auf den Anfangswert bezogen."
    },
    {
     "text": "Die Lizenzkosten sind von 2022 bis 2025 um 75 % gesunken.",
     "correct": false,
     "why": "Der Endwert in Prozent des Anfangswerts (75 %) wurde als Senkung gelesen."
    },
    {
     "text": "Die Lizenzkosten sind von 2022 bis 2025 um 25 % gestiegen.",
     "correct": false,
     "why": "Die Richtung ist falsch: Die Kosten sanken von 320.000 auf 240.000 EUR."
    }
   ],
   "multi": false,
   "explanation": "Senkung: 320.000 − 240.000 = 80.000 EUR. Bezogen auf 320.000 EUR sind das 25 %. Die Lizenzkosten sind also um 25 % gesunken."
  }
 },
 {
  "id": "kmp-kostenanalyse-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenanalyse",
  "title": "Kostenarten Ersatzteilportal",
  "difficulty": 2,
  "points": 4,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Fahrradhersteller entwickelt ein internes Ersatzteilportal mit eigenem Entwicklerteam und externer Agentur. Für den Kostenplan werden Kostenarten samt Beispiel gegliedert. Welche Zuordnungen sind richtig? (Mehrfachauswahl)",
  "payload": {
   "options": [
    {
     "text": "Personalkosten: Gehälter des Entwicklerteams und Honorar der externen Agentur",
     "correct": true
    },
    {
     "text": "Hardwarekosten: Server und Testgeräte für den Portalbetrieb",
     "correct": true
    },
    {
     "text": "Erlöse: Einnahmen aus dem Verkauf der Ersatzteile über das Portal",
     "correct": false,
     "why": "Erlöse sind Einnahmen und keine Kostenart eines Kostenplans."
    },
    {
     "text": "Gewinn: Überschuss nach dem Projektabschluss",
     "correct": false,
     "why": "Gewinn ist ein Ergebnis, keine Kostenart, die im Vorhaben anfällt."
    },
    {
     "text": "Personalkosten: Umsatzsteuer auf die Ersatzteile",
     "correct": false,
     "why": "Umsatzsteuer ist kein Personalaufwand und keine Kostenart dieses Beispiels."
    }
   ],
   "multi": true,
   "explanation": "Im Kostenplan werden Aufwände nach Art gegliedert, etwa Personal- und Hardwarekosten mit passenden Beispielen. Erlöse und Gewinn sind keine Kostenarten."
  }
 },
 {
  "id": "kmp-kostenrechnung-und-kalkulation-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenrechnung-und-kalkulation",
  "title": "Stromkosten Archivrechner",
  "difficulty": 1,
  "points": 3,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Archivrechner hat ein Netzteil mit 600 W Nennleistung, das im Betrieb zu 40 % ausgelastet ist und einen Wirkungsgrad von 80 % hat. Er läuft an 220 Tagen je 8 Stunden. Strom kostet 0,32 EUR/kWh. Wie hoch sind die jährlichen Stromkosten?",
  "payload": {
   "options": [
    {
     "text": "168,96 EUR",
     "correct": true
    },
    {
     "text": "135,17 EUR",
     "correct": false,
     "why": "Der Wirkungsgrad wurde ignoriert: 240 W × 1.760 h = 422,4 kWh × 0,32 EUR."
    },
    {
     "text": "108,13 EUR",
     "correct": false,
     "why": "Der Wirkungsgrad wurde multipliziert statt dividiert: 192 W × 1.760 h = 337,92 kWh."
    },
    {
     "text": "337,92 EUR",
     "correct": false,
     "why": "Es wurde mit der vollen Nennleistung 600 W gerechnet, ohne die Auslastung von 40 %."
    },
    {
     "text": "506,88 EUR",
     "correct": false,
     "why": "Es wurden 24 Stunden statt 8 Stunden pro Tag angesetzt: 300 W × 5.280 h."
    }
   ],
   "multi": false,
   "explanation": "Nutzleistung: 600 W × 0,4 = 240 W. Aufnahme: 240 / 0,8 = 300 W. Betriebszeit: 220 × 8 = 1.760 h. Energie: 0,3 kW × 1.760 h = 528 kWh. Kosten: 528 × 0,32 = 168,96 EUR."
  }
 },
 {
  "id": "kmp-kostenrechnung-und-kalkulation-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenrechnung-und-kalkulation",
  "title": "Monatskosten Netzwerkdrucker",
  "difficulty": 1,
  "points": 3,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Jugendzentrum kauft einen Drucker für 2.400 EUR (Nutzungsdauer 48 Monate, kein Restwert). Monatlich werden 1.800 Schwarz-Weiß-Seiten zu 0,03 EUR und 300 Farbseiten zu 0,08 EUR gedruckt, dazu 18 EUR Wartung. Wie hoch sind die monatlichen Gesamtkosten?",
  "payload": {
   "options": [
    {
     "text": "146,00 EUR",
     "correct": true
    },
    {
     "text": "128,00 EUR",
     "correct": false,
     "why": "Es wurden nur 54 EUR Schwarz-Weiß plus 24 EUR Farbe plus 50 EUR Abschreibung genannt, die Wartung von 18 EUR fehlt."
    },
    {
     "text": "296,00 EUR",
     "correct": false,
     "why": "Die Anschaffung wurde durch 12 statt 48 geteilt (200 EUR statt 50 EUR)."
    },
    {
     "text": "131,00 EUR",
     "correct": false,
     "why": "Die Farbseiten wurden mit 0,03 EUR statt 0,08 EUR gerechnet (9 statt 24 EUR)."
    },
    {
     "text": "96,00 EUR",
     "correct": false,
     "why": "Die Abschreibung von 50 EUR wurde vergessen, nur Druck und Wartung gezählt."
    }
   ],
   "multi": false,
   "explanation": "Abschreibung: 2.400 / 48 = 50 EUR. Schwarz-Weiß: 1.800 × 0,03 = 54 EUR. Farbe: 300 × 0,08 = 24 EUR. Wartung 18 EUR. Summe: 50 + 54 + 24 + 18 = 146 EUR."
  }
 },
 {
  "id": "kmp-kostenrechnung-und-kalkulation-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenrechnung-und-kalkulation",
  "title": "Stromkosten Schnittstation",
  "difficulty": 1,
  "points": 3,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Eine Videoschnittstation braucht bis zu 800 W, das Netzteil hat einen Wirkungsgrad von 88 %, die Station ist im Schnitt zu 45 % ausgelastet und läuft an 210 Tagen je 7,5 Stunden. Strom kostet 0,38 EUR/kWh. Wie hoch sind die jährlichen Stromkosten (gerundet)?",
  "payload": {
   "options": [
    {
     "text": "244,84 EUR",
     "correct": true
    },
    {
     "text": "189,60 EUR",
     "correct": false,
     "why": "Der Wirkungsgrad wurde multipliziert (360 W × 0,88) statt dividiert."
    },
    {
     "text": "215,46 EUR",
     "correct": false,
     "why": "Der Wirkungsgrad wurde weggelassen: 360 W × 1.575 h = 567 kWh."
    },
    {
     "text": "544,09 EUR",
     "correct": false,
     "why": "Die Auslastung von 45 % wurde vergessen: 800 W / 0,88 statt 360 W / 0,88."
    },
    {
     "text": "261,16 EUR",
     "correct": false,
     "why": "Es wurden 8 statt 7,5 Stunden pro Tag angesetzt (1.680 h)."
    }
   ],
   "multi": false,
   "explanation": "Mittlere Leistung: 800 × 0,45 = 360 W. Netzbezug: 360 / 0,88 = 409,09 W. Stunden: 210 × 7,5 = 1.575 h. Energie: 644,32 kWh. Kosten: 644,32 × 0,38 = 244,84 EUR."
  }
 },
 {
  "id": "kmp-kostenvergleich-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenvergleich",
  "title": "Etikettiersystem Kauf oder Miete",
  "difficulty": 2,
  "points": 5,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Etikettiergerät kostet 960 EUR (48 Monate Nutzung, kein Restwert). Monatlich werden 6.400 Etiketten gebraucht (Rolle mit 800 Stück: 18 EUR), dazu 24 EUR Wartung im Monat. Miete: 190 EUR pro Monat inklusive Etiketten und Wartung. Was ist richtig?",
  "payload": {
   "options": [
    {
     "text": "Kauf: 188 EUR pro Monat, also 2 EUR günstiger als die Miete",
     "correct": true
    },
    {
     "text": "Miete: 190 EUR pro Monat, der Kauf kostet 248 EUR pro Monat",
     "correct": false,
     "why": "Die Anschaffung wurde durch 12 statt 48 Monate geteilt (80 EUR statt 20 EUR)."
    },
    {
     "text": "Kauf: 164 EUR pro Monat, deutlich günstiger als die Miete",
     "correct": false,
     "why": "Die Wartung von 24 EUR wurde vergessen: 20 + 144 = 164 EUR."
    },
    {
     "text": "Kauf: 44 EUR pro Monat, da die Etiketten wie Miete zählen",
     "correct": false,
     "why": "Die Etikettenkosten von 144 EUR fehlen, obwohl sie in der Miete enthalten sind und daher verglichen werden müssen."
    },
    {
     "text": "Beide Varianten kosten 190 EUR pro Monat und sind gleichwertig",
     "correct": false,
     "why": "Die Kaufvariante wurde der Mietrate gleichgesetzt statt einzeln berechnet."
    }
   ],
   "multi": false,
   "explanation": "Kauf: 960 / 48 = 20 EUR, dazu 8 Rollen × 18 = 144 EUR und 24 EUR Wartung, gesamt 188 EUR pro Monat. Miete 190 EUR. Der Kauf ist 2 EUR günstiger."
  }
 },
 {
  "id": "kmp-kostenvergleich-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenvergleich",
  "title": "Etikettendrucker Reparaturdienst",
  "difficulty": 2,
  "points": 5,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Drucker kostet beim Kauf 2.400 EUR (Nutzungsdauer 48 Monate). Wartung: 90 EUR je Quartal. Verbrauch: 600 Etiketten im Monat zu 0,08 EUR. Alternativ mietet man ihn für 135 EUR im Monat inklusive Wartung und Material. Was ergibt die Rechnung?",
  "payload": {
   "options": [
    {
     "text": "Kauf: 128 EUR pro Monat, damit 7 EUR günstiger als die Miete",
     "correct": true
    },
    {
     "text": "Kauf: 188 EUR pro Monat, die Miete ist 53 EUR günstiger",
     "correct": false,
     "why": "Die Quartalswartung von 90 EUR wurde als Monatswert angesetzt (50 + 90 + 48)."
    },
    {
     "text": "Kauf: 98 EUR pro Monat, weit unter der Miete",
     "correct": false,
     "why": "Die Quartalswartung von 30 EUR pro Monat wurde vergessen: 50 + 48 = 98 EUR."
    },
    {
     "text": "Kauf: 278 EUR pro Monat, die Miete ist deutlich günstiger",
     "correct": false,
     "why": "Die Anschaffung wurde durch 12 statt 48 geteilt (200 EUR statt 50 EUR)."
    },
    {
     "text": "Kauf: 135 EUR pro Monat, gleich hoch wie die Miete",
     "correct": false,
     "why": "Die Mietrate wurde einfach auf den Kauf übertragen, ohne die Kaufkosten zu berechnen."
    }
   ],
   "multi": false,
   "explanation": "Kauf pro Monat: 2.400 / 48 = 50 EUR, Wartung 90 / 3 = 30 EUR, Etiketten 600 × 0,08 = 48 EUR, gesamt 128 EUR. Miete 135 EUR. Kauf ist 7 EUR günstiger."
  }
 },
 {
  "id": "kmp-kostenvergleich-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "kostenvergleich",
  "title": "Eigener Server oder Cloud",
  "difficulty": 2,
  "points": 5,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Eine Prüfungsplattform läuft 24 Monate. Eigene Infrastruktur: Server einmalig 7.200 EUR, dazu 600 EUR Wartung pro Jahr und 35 EUR Energie pro Monat. Cloud: einmalig 900 EUR Einrichtung plus 310 EUR pro Monat, Betrieb und Wartung inklusive. Kein Restwert. Was ist richtig?",
  "payload": {
   "options": [
    {
     "text": "Cloud: 8.340 EUR statt 9.240 EUR bei eigener Infrastruktur, also 900 EUR günstiger",
     "correct": true
    },
    {
     "text": "Eigene Infrastruktur: 7.835 EUR statt 8.340 EUR in der Cloud, also günstiger",
     "correct": false,
     "why": "Wartung und Energie wurden nur einfach statt für 24 Monate angesetzt (7.200 + 600 + 35)."
    },
    {
     "text": "Cloud: 7.440 EUR statt 9.240 EUR, also 1.800 EUR günstiger",
     "correct": false,
     "why": "Die einmalige Einrichtung von 900 EUR wurde in der Cloud vergessen."
    },
    {
     "text": "Eigene Infrastruktur: 8.400 EUR statt 8.340 EUR, also fast gleich teuer",
     "correct": false,
     "why": "Die Energiekosten von 840 EUR über 24 Monate wurden weggelassen."
    },
    {
     "text": "Eigene Infrastruktur: 9.240 EUR, weil Eigentum immer günstiger ist",
     "correct": false,
     "why": "Die Zahl 9.240 EUR stimmt, doch sie liegt über den Cloud-Kosten von 8.340 EUR. Eigentum ist nicht automatisch billiger."
    }
   ],
   "multi": false,
   "explanation": "Eigene Infrastruktur: 7.200 + 2 × 600 + 24 × 35 = 9.240 EUR. Cloud: 900 + 24 × 310 = 8.340 EUR. Die Cloud ist um 900 EUR günstiger."
  }
 }
]);

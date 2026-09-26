# Rack & Ruhm – Scope

## Ziel
Web-Lernspiel zur AP2-Vorbereitung (Fachinformatiker). Ergänzung zu heidelab, Inhalte mit Erlaubnis des Autors übernommen. Es sollen **alle** heidelab-Themen vorkommen, das Spiel wird um diese Themen herum gebaut.

## Spielprinzip (Freelancer-Simulation, Sims-Stil)
Start in schäbiger Wohnung. Jobs annehmen → Aufgabe lösen → Geld (je schwieriger der Job, desto mehr) → Skills kaufen, Wohnung upgraden, Auto kaufen → bessere Jobs. Kunden und Aufträge kommen aus allen Themen.

## Inhalte (alle, komplett)
- Datenbank: ER (34), Normalisierung (28), SQL (190)
- UML: Use Case (13), Aktivität (42), Klasse (36), Sequenz (39), Zustand (21), PlantUML-Editor
- Programmierung: Python (146), Algorithmen (13), Spring (12)
- Maschinelles Lernen: KNN, Entscheidungsbäume
- Git im Team
- Wirtschaft: Rechenwerkstatt (42)
- Prüfung: Exambuilder (1.628), Prüfungskompass, Prüfungsfinale + Endlos-Modus
- **Prüfungskompass-Themenkarte inkl. WiSo/Rechtliches:** 15 Themenzweige (Prüfungen 2021–2026), 1.607 Beispielaufgaben, Daten liegen in `daten/kompass/`
  - Sie kommen als **Fragen von Figuren** ins Spiel (Finanzamt, Bank, Krankenkasse, Datenschutzbehörde, Kunden)
  - Freitext-Aufgaben werden zu **Auswahlaufgaben** umgebaut (Multiple Choice/Zuordnung), damit sie sicher prüfbar sind. Falsche Antwortoptionen schreibt Claude, du prüfst stichprobenartig
  - Berechnung, Tabelle, Code und Diagramme bleiben wie bei heidelab (feste Prüflogik)
  - **Programmieren, SQL, UML, ER usw. bleiben exakt wie bei heidelab**
- **Gedächtnis-Mechanik:** Figuren erklären Themen in Gesprächen. Später fragt jemand genau dazu (auch zeitversetzt, Tage später). Der Spieler muss sich erinnern oder im **Notizbuch** nachsehen
  - Notizen entstehen durch **Markieren und Ablegen** von Sätzen im Gespräch
  - Das Notizbuch hat ein **Platz-Limit** (Erweiterung über Skills/Shop). Wer nichts oder zu viel notiert, verliert Fortschritt
  - Falsche Antwort: **Beziehung zur Figur sinkt UND Geldstrafe/Nachzahlung**
  - Notizbuch (persönlich, begrenzt) ist etwas anderes als das **Handbuch** (heidelab-Wissen, kostenlos, unbegrenzt)
- Bewertung **wie heidelab**, auch alle Diagramm-Editoren

## Mechaniken
- **Job-Board mit Filter** (Thema, Schwierigkeit, Bezahlung) **plus Stammkunden** mit Themenschwerpunkt und wachsender Beziehung, die Sonderjobs anbieten
- **Skill-Baum über alle Fachgebiete:** Braucht ein Job einen Befehl/ein Konzept, das noch nicht gekauft ist, sagt das Spiel es ausdrücklich: erst Skill kaufen
- **Lernsteuerung:** Empfehlungen für selten geübte Themen, dort besser bezahlte Jobs
- Tagesablauf, Geld, Ruf, Job-Fristen
- **Wohnung** (schäbig bis schick) und **Auto** mit spielerischem Vorteil
- **Miete und Fixkosten** als Druck
- **Tutorial** für alle Themen (überspringbar, wiederholbar)
- **Handbuch**: jederzeit, kostenlos lesbar, Kapitel + Suche, Inhalte aus heidelab

## Animation (Wunsch des Auftraggebers: das Spiel soll lebendig wirken)
- **Figuren im Leerlauf:** atmen, blinzeln, nicken, kleine Bewegungen
- **Figuren reagieren:** Freude bei richtiger Antwort, Frust bei Fehler, Mundbewegung beim Sprechen im Dialog
- **Umgebung lebt:** blinkende Server-LEDs, Dampf aus der Kaffeetasse, Lichter, Uhrzeiger
- **Übergänge und Effekte:** weiche Bildwechsel, fliegende Münzen, Ruf-Sterne, Konfetti bei Erfolg
- Umgesetzt von Claude in CSS/SVG (ohne externe Bibliotheken), respektiert `prefers-reduced-motion`. Dateien: `game/js/characters.js`, `scene.js`, `fx.js`, `game/css/anim.css`. Vorschau: `game/demo/animation.html`

## 3D-Welt (Umbau, Entscheidung des Auftraggebers)
- Das Spiel wird eine **begehbare 3D-Welt** (three.js, offline im Ordner mitgeliefert, Dritte-Person-Kamera, WASD + Maus, E zum Benutzen). Stil: realistischer als der 2D-Comic (Licht, Schatten, Materialien), Geometrie und Texturen aus Code, keine 3D-Dateien.
- **Tagesablauf:** Der Tag beginnt in der Wohnung. Ein Büro ist anfangs nicht bezahlbar, also geht man über eine **Karte** ins **Café** und arbeitet dort am Laptop. Fahren/Gehen kostet Spielzeit. Feierabend schickt den Spieler nach Hause.
- **Orte (alle):** Wohnung, Café, Büro (erst nach Anmietung), Bank, Finanzamt, Autohaus, Immobilienmakler (Wohnung/Büro), Weiterbildungszentrum (Skills). Karte als Übersicht zum Reisen.
- Die 2D-Fenster (Job-Board, SQL-Aufgabe, Shop, Dialoge) bleiben und öffnen sich als Fenster im Ort (Laptop im Café/Büro, Schalter in Bank/Amt usw.).
- Umsetzung: Grundgerüst (Engine, Bausteine, Ortsschnittstelle) von Claude, die Orte von Sonnet-Agenten parallel, danach Review-Agenten auf Bugs. Siehe `game/js/world/` (Schnittstelle: `CONTRACT.md`, Prüfer: `node tools/check-location.js <ort.js>`).
- **Stand:** Alle 8 Orte gebaut, geprüft und im Browser abgenommen (Wohnung in 4 Stufen, Café, Büro, Bank, Finanzamt, Autohaus, Makler, Lernzentrum). Kamera als „Puppenhaus“ (Wände zwischen Kamera und Figur blenden aus).
- **Regeln:** Arbeiten nur im Café (Kaffee 4 € pro Tag) oder im gemieteten Büro (380 €/Woche + 250 € Einrichtung, Aufträge 10 % schneller). Skills kauft man im Lernzentrum, Wohnung und Büro beim Makler, Autos im Autohaus. Fällt beim Aufbau eines Ortes etwas aus, bleibt man im alten Ort.
- **Umgesetzt danach:**
  - **Referenzbuch** neben jeder Aufgabe (Umschalter „Referenzbuch“): Tab „Datenbank“ (Tabellen aufklappen, Spalten mit PK/FK, alle Zeilen), Tab „Befehle“ (Suche, Detailansicht mit Syntax, Beispielen, Stolperfallen, „In den Editor“). Als eigenes Handbuch-Fenster mit Taste H. Inhalte: `game/data/handbuch/*.js` (SQL, Modellierung/UML, Programmierung/Git, später Daten/Rechnen).
  - **Figuren-Gedächtnis:** Figuren erklären Themen (Lektion), der Spieler übernimmt Sätze ins **Notizbuch** (Taste N, 8 Plätze, im Lernzentrum auf 14 und 22 erweiterbar). Tage später fragt die Figur (Frage-Fenster mit Notizbuch-Tab). Richtig: Geld (skaliert mit Beziehung) + Beziehung +6. Falsch: Nachzahlung + Beziehung −8. Liegengelassene Fragen kosten Beziehung. Daten: `game/data/kompass-mc/*.js` (aus den Kompass-Aufgaben umgewandelt).
  - **Tutorial:** 8 Tipps am ersten Tag (Kalle), überspringbar, über „? Tipps“ wiederholbar.
  - **Job-Fristen:** je Auftrag 90/150/240 Spielminuten; Ausführen kostet 3, Fehlversuch 10 Minuten; zu spät = halbes Honorar und −2 Ruf.
  - **Aufgabentyp „Rechnen“:** 15 Generatoren × 4 Varianten (Skonto, Rabatt, Break-even, Amortisation, Übertragung, Bildspeicher, Subnetz, RAID, Verfügbarkeit, Strom, Stundensatz, Zinsen, Nutzwert, Mittelwert, Leasing) mit Rechenweg.
  - **Ton:** kurze Geräusche aus Code, stummschaltbar.
  - **Figuren 3D v2:** Gesicht mit Lidern, Nase, Lippen, Haare in Schichten, Kleidung mit Kragen/Sakko/Kapuze, Hände mit Fingern; blinzeln, atmen, schauen den Spieler an. Vorschau: `game/demo/figuren.html`.
- **Bewusst noch nicht umgesetzt (eigene Vorhaben):** heidelab-Werkbänke mit eigenen Editoren und Prüflogik: ER-Modell (34), Normalisierung (28), UML-Diagramme (Use Case, Aktivität, Klasse, Sequenz, Zustand: 151), Python (146, braucht einen Interpreter im Browser), Algorithmen (13), Spring (12), KNN/Entscheidungsbaum/Git-Lerneinheiten, Exambuilder (1.628). Straßen/Außenwelt.

## Technik
- Comic-Stil, Laptop/PC, Mockup in `mockup/` gilt als Stilvorlage (Layout wird ans neue Prinzip angepasst)
- Offline, ohne Server, per Doppelklick startbar, Speicherstand lokal im Browser

## Nicht enthalten
- Sims-Bedürfnisse (Hunger, Stimmung)

## Wirtschaft (Schritt 3, umgesetzt, Werte in `game/js/economy.js`)
- **Skills:** 18 SQL-Skills, 3 Starter-Skills gratis, Rest 80–400 €, teils mit Voraussetzung (HAVING braucht GROUP BY, CTE braucht Unterabfragen, Fensterfunktionen brauchen GROUP BY). Fehlt ein Skill, sagt das Spiel es im Dialog „Dafür brauchst du erst …" mit Kaufen-Knopf. Skills je Aufgabe werden aus der Musterlösung abgeleitet.
- **Wohnung:** 4 Stufen (0 / 600 / 1.800 / 4.500 €), Miete 250 / 420 / 650 / 950 € pro Woche, Arbeitsende 17 / 18 / 19 / 20 Uhr, Aufträge 0 / 5 / 10 / 15 % schneller. Die Szene verändert sich mit der Stufe.
- **Auto:** 3 Stufen (900 / 2.600 / 6.000 €), Honorar +10 / +20 / +35 %, Unterhalt 30 / 60 / 100 € pro Woche.
- **Rechnung:** jede Woche (Morgen von Tag 8, 15, 22 …) Miete + 40 € Nebenkosten + Autounterhalt. Nicht zahlbar: Mahnung und Ruf −10. Zweite verpasste Rechnung in Folge: Umzug eine Stufe tiefer. In der schäbigen Bude: Schulden statt Game Over.
- Honorar: leicht 40 €, mittel 80 €, schwer 140 €. Erster Fehlversuch frei, danach sinkt der Auftragswert (mind. 40 %).

## Offen
- Ton/Musik, Story-Stufen-Umschalter
- Feinabstimmung der Zahlen (Miete, Preise, Honorar) nach Spieltests
- Job-Fristen (Aufträge, die ablaufen) sind noch nicht umgesetzt

## Erklärfilme (Wunsch des Auftraggebers)
- **Kalle erklärt** jedes Thema in einem animierten Film im Spiel (keine Videodateien): Untertitel plus Vorlesestimme des Browsers (abschaltbar), Play/Pause, Vor/Zurück, Zeitleiste mit Kapitelmarken, Tempo 0,85×–1,5×. Ausführlich, 3–5 Minuten, ohne Quiz.
- **Wann:** automatisch direkt nach dem Skill-Kauf im Lernzentrum; jederzeit über „▶ Erklärfilm“ im Handbuch (Einträge mit Film tragen die Marke „▶ Film“) und auf den Skill-Karten.
- **Visualisierung:** Zeilen wandern sichtbar von der Tabelle ins Ergebnis, Filter streichen Zeilen durch, Gruppen bekommen Farben, eine Leiste zeigt die Ausführungsreihenfolge (FROM → … → LIMIT). Ergebnisse berechnet die echte SQL-Engine, damit alles stimmt.
- **Referenzen:** animierte SQL-GIFs von dataschool.com, SQL-Visualisierer (sql-tutorial.dev, VizLearn „Query Execution Order“), Visual Guides zu Fensterfunktionen; Grundsätze: ein Gedanke pro Schritt, Hervorheben statt Textwand, gleiche Beispieldaten in allen Filmen.
- **Stand:** alle 18 SQL-Skills. Danach: Rechnen, UML/Modellierung, Programmierung/Git, Kompass-Themen.
- Dateien: `game/js/explainer.js` (Player), `game/css/explainer.css`, Drehbücher `game/data/erklaer/sql-*.js` (gemeinsame Beispieldaten in `sql-daten.js`).

## Bau-Reihenfolge (intern, damit früh etwas spielbar ist)
1. Kern: Job → Aufgabe lösen → Geld, mit einem einfachen Aufgabentyp (SQL)
2. Einheitliches Aufgabenformat + Plugin-Schnittstelle für Aufgabentypen
3. Skill-Shop mit Sperre, Wohnung, Miete, Auto
4. Weitere Aufgabentypen und Editoren, Thema für Thema
5. Handbuch, Tutorial, Kunden, Lernsteuerung
6. Prüfungsfinale + Endlos-Modus

## Arbeitsteilung
- Claude: Logik, Aufgabenformat, Bewertung, Datenextraktion, Integration, Review
- Codex/Astra: entfällt (Zugang funktionierte nicht, Entscheidung des Auftraggebers). Claude übernimmt auch Grafik und Animation

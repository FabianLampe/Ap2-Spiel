# Auftrag: Lektionen und Multiple-Choice-Fragen aus Prüfungsaufgaben (Spiel „Rack & Ruhm“)

Du erzeugst Lerninhalte für ein Browserspiel (AP2-Prüfungsvorbereitung für Fachinformatiker, Deutsch). Figuren im Spiel (Bank, Finanzamt, Lehrerin, Chef …) erklären dem Spieler Themen (Lektion) und stellen ihm später Multiple-Choice-Fragen dazu. Du wandelst echte Prüfungsaufgaben in Lektionen und Fragen um. Deine Parameter (Themenliste, Dateiname-Präfix, bevorzugte Figuren) stehen im Auftrag, der dich hierher verwiesen hat.

## Eingabe
Themenliste: eine Textdatei mit einem Konzeptnamen pro Zeile. Zu jedem Konzept gibt es `/Users/fabian/Projekte/Ap2 Spiel/daten/kompass/<konzept>.json`:
`{"beispielaufgaben":[{ "artefakt_id": "artefakt.freitextantwort|berechnung|tabelle|quellcode|diagramm…", "aufgabe":[{"text":…,"typ":…}], "loesung":[{"text":…}], "operator_id":…, "punkte":…, "pruefungszuordnung":{…} }]}`.
Lies mit Python (json). Die Musterlösung (`loesung`) ist maßgeblich für „richtig“.

## Aufgabe pro Konzept
1. EINE Lektion: 3–6 kurze, sachlich richtige Merksätze (je 25–260 Zeichen), wie die Figur sie dem Spieler erklärt („Merk dir: …“, „Wichtig ist …“). Sie fassen die Fakten zusammen, die man für die Fragen braucht. Nur gesichertes Wissen (Musterlösungen und Allgemeinwissen), keine erfundenen Rechtsvorschriften oder Zahlen.
2. 3–4 Multiple-Choice-Fragen aus den Aufgaben des Konzepts. Bevorzuge Freitext-Aufgaben (nennen, beschreiben, erläutern, begründen, ergänzen) und Berechnungen. ÜBERSPRINGE Aufgaben, die eine Abbildung, Tabelle, ein Diagramm, Quellcode oder eine Anlage brauchen, die im Text nicht enthalten ist (Typen tabelle, diagramm*, quellcode meist überspringen), und alles, was man ohne fehlenden Kontext nicht versteht. Formuliere jede Frage als eigenständiges kurzes Szenario, so dass der Text allein verständlich ist. Kurze Codebeispiele dürfen im Prompt stehen (mit \n), wenn sie vollständig in der Aufgabe enthalten sind. Überspringe ein Konzept ganz, wenn sich keine gute Frage ergibt.
   - Freitext → 4–5 Optionen: eine richtige Aussage aus der Musterlösung, 3–4 plausible, aber falsche (typische Denkfehler, Verwechslungen). Bei „Nennen Sie zwei/drei …“ Mehrfachauswahl (`payload.multi = true`, mindestens 2 richtige und mindestens 1 falsche Option).
   - Berechnung → richtiger Wert plus 3–4 falsche Werte aus typischen Rechenfehlern (mit Einheit); die richtige Zahl muss exakt zur Musterlösung passen. Rechne jede Zahl selbst nach (Python erlaubt), Rechenweg in `explanation`.
   - JEDE falsche Option bekommt ein `why` (10–240 Zeichen): welcher Fehler dahintersteckt.
   - `payload.explanation` (25–700 Zeichen): die richtige Antwort mit kurzer Begründung in eigenen Worten.
   - Richtige Antwort nicht immer an erster oder längster Stelle; Falschantworten ähnlich lang und detailliert wie die richtige. (Das Spiel mischt die Reihenfolge zusätzlich.)
   - `difficulty`: 1 bei ≤ 3 Punkten, 2 bei 4–6 Punkten, 3 bei ≥ 7 Punkten.
   - `figure` (wer fragt): 'kalle' (Ex-Chef/Mentor), 'finanzamt' (Frau Pfennig: Steuern, Recht, Belege), 'bank' (Herr Zinsmann: Geld, Kosten, Finanzierung), 'startup' (Lennox: Technik, Entwicklung, Projekte), 'datenschutz' (Dr. Blattner: Datenschutz, Sicherheit, Datenbanken, Lernen), 'barista', 'makler' (Immobilien, Verträge), 'verkaeufer' (Autohändler: Beschaffung, Kauf, Hardware). Lektion und Fragen eines Konzepts haben dieselbe Figur. Verteile die Figuren sinnvoll (Vorgabe im Auftrag).
   - `subtopic`: Themenzweig, z. B. Datenschutz, Wirtschaftlichkeit, Netzwerke, Hardware, Projektmanagement, Softwareentwicklung, Modellierung, Statistik, Qualitätsmanagement, Prozessanalyse, Anforderungsanalyse, IT-Sicherheit, Recht, Datenqualität.
   - `id`: `kmp-<konzept>-<laufende Nummer ab 1>`, `concept` = Konzeptname (kebab-case wie der Dateiname), `type` 'auswahl', `topic` 'wirtschaft'.

## Ausgabe
JS-Dateien in `/Users/fabian/Projekte/Ap2 Spiel/game/data/kompass-mc/` (Verzeichnis anlegen, falls nötig). Dateinamen `<präfix>-a.js`, `<präfix>-b.js` … mit höchstens 6 Konzepten pro Datei, jede Datei eigenständig gültig. Format exakt (reines JS, JSON-kompatible Objekte, Texte in einfachen Anführungszeichen mit maskierten Apostrophen oder in Backticks):

```js
window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
  { concept: 'break-even-analyse', title: 'Break-even-Analyse', figure: 'bank', lines: ['Satz 1 …', 'Satz 2 …', 'Satz 3 …'] }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
  { id: 'kmp-break-even-analyse-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'Wirtschaftlichkeit', concept: 'break-even-analyse', title: 'Break-even berechnen', difficulty: 2, points: 4, figure: 'bank', source: 'AP2', prompt: 'Szenario und Frage …', payload: { options: [ { text: '…', correct: true }, { text: '…', correct: false, why: '…' } ], multi: false, explanation: '…' } }
]);
```

## Prüfen (Pflicht, jede Datei bis fehlerfrei)
Im Ordner `/Users/fabian/Projekte/Ap2 Spiel`: `node tools/check-content.js kompass game/data/kompass-mc/<datei>.js` muss „Alles in Ordnung“ melden (achte auf die Meldung zum Muster „richtige Antwort ist die längste“).

## Abgabe (kurz, Deutsch)
Anzahl Lektionen und Fragen, übersprungene Konzepte mit Grund, Dateinamen. Bei Zweifeln an einer fachlichen Aussage lieber die Frage weglassen. Arbeite zügig und knapp, keine Zwischenberichte.

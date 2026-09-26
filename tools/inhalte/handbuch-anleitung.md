# Auftrag: Handbuch-Kapitel schreiben (Spiel „Rack & Ruhm“)

Du schreibst Nachschlage-Einträge für das Handbuch eines Lernspiels (AP2-Vorbereitung Fachinformatiker, Deutsch). Der Spieler öffnet es neben einer Aufgabe und sucht einen Begriff oder Befehl. Schreibe sachlich richtig, knapp, mit Beispielen, für Auszubildende verständlich. Erfinde nichts.

## Format
Datei: `/Users/fabian/Projekte/Ap2 Spiel/game/data/handbuch/<name>.js`, reines JS:

```js
window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.handbuch = (GAME_DATA.handbuch || []).concat([
  { id: 'py-grundlagen', bereich: 'Python', title: 'Grundlagen', entries: [
    { id: 'py-variablen', title: 'Variablen und Datentypen', keywords: ['variable', 'int', 'str', 'float', 'bool'],
      kurz: 'Ein Satz (15–200 Zeichen): was ist es, wofür braucht man es.',
      syntax: 'name = wert',                         // optional, Code-Block
      erklaerung: ['Absatz 1 …', 'Absatz 2 …'],     // Liste von Absätzen (je mindestens 20 Zeichen)
      beispiel: [{ code: 'alter = 42\nname = "Ada"', hinweis: 'optional: kurze Erklärung' }],   // optional
      stolperfallen: ['häufiger Fehler …'],          // optional
      siehe: ['py-operatoren'] }                     // optional: ids anderer Einträge (müssen existieren, auch in anderen Dateien nur wenn sicher)
  ] }
]);
```
Regeln: Eintrags-`id` nur a-z, 0-9, Bindestrich, global eindeutig (Präfix je Bereich, z. B. `py-`, `uml-`, `git-`, `er-`, `ml-`). Kapitel-`id` ebenso. Jedes Kapitel hat mindestens 3 Einträge. `keywords`: mindestens 2 Suchbegriffe (klein geschrieben, auch Synonyme und Schreibweisen wie „group by“). `siehe` nur auf Einträge derselben Datei verweisen.
Umfang: 4–8 Kapitel, insgesamt 35–55 Einträge pro Datei. Keine Werbung, keine Floskeln. Codebeispiele lauffähig und korrekt.

## Prüfen (Pflicht)
Im Ordner `/Users/fabian/Projekte/Ap2 Spiel`: `node tools/check-content.js handbuch game/data/handbuch/<name>.js` muss „Alles in Ordnung“ melden.

## Abgabe (kurz, Deutsch)
Dateiname, Anzahl Kapitel/Einträge, Auffälligkeiten. Zügig arbeiten, keine Zwischenberichte.

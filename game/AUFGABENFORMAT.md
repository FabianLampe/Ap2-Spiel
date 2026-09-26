# Aufgabenformat und Plugins

Jede Aufgabe im Spiel hat dieselbe Hülle. Was typspezifisch ist, steckt in `payload` und im Plugin des Typs. Das Spiel selbst (Job-Board, Bezahlung, Zeit, Ruf, Shop) kennt nur die Hülle.

## Hülle

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `id` | ja | Eindeutige, stabile ID |
| `type` | ja | Aufgabentyp = Plugin-ID (`sql`, `auswahl`, später `uml-klasse`, `python` …) |
| `topic` | ja | Themenbereich: `datenbank`, `uml`, `programmierung`, `ml`, `git`, `wirtschaft`, `pruefung` |
| `title` | ja | Kurztitel für das Job-Board |
| `difficulty` | ja | 1 leicht, 2 mittel, 3 schwer (bestimmt Bezahlung, Zeit und Ruf) |
| `prompt` | ja | Auftragstext |
| `payload` | ja | Typspezifische Daten (siehe Plugin) |
| `subtopic` | nein | z. B. `sql`, `er`, `normalisierung` |
| `context` | nein | Kunde/Szenario, wird auf der Karte angezeigt |
| `skills` | nein | Liste benötigter Fähigkeiten für den Skill-Shop, z. B. `["sql.join","sql.groupby"]` |
| `reflection` | nein | Hintergrundtext, wird nach dem Lösen gezeigt |

Ungültige Aufgaben (fehlende Pflichtfelder, falsche `difficulty`, unbekannter Typ, doppelte ID, Plugin-eigene Prüfung) werden beim Start abgelehnt und in der Browser-Konsole gemeldet. Das Spiel läuft mit den übrigen weiter.

## Plugin-Schnittstelle

Registrierung: `Tasks.registerType(plugin)`. Pflicht sind `id`, `render` und `grade`.

```js
{
  id: 'sql',
  init(): Promise,               // einmalig beim Start (z. B. Engine laden)
  tasks(): Task[],               // optional: liefert die Aufgaben dieses Typs in der Hülle
  validate(task): string[],      // optional: typspezifische Prüfung, Fehlerliste
  renderInfo(task): Node,        // optional: Zusatzinfo unter dem Auftragstext (z. B. Datenbankschema)
  render(task, ctx): { node, getAnswer() },   // Arbeitsbereich
  grade(task, answer): { ok, hint?, empty? },  // Bewertung
  solutionText(task): string     // optional: Musterlösung, wird nach Erfolg gezeigt
}
```

`ctx` für `render`: `draft` (zwischengespeicherte Antwort), `setDraft(v)`, `output` (Element für Ausgaben wie Ergebnistabellen), `feedback(kind, text)` (`ok`/`bad`/`info`), `rerender()`.

`grade` liefert `empty: true`, wenn noch nichts abgegeben wurde. Das zählt dann nicht als Fehlversuch.

## Vorhandene Typen

**`sql`** (190 Aufgaben aus heidelab)
`payload: { schemaId, solution, grading: 'result' | 'pattern', tieFree }`
Bewertung `result`: Abfrage bzw. Endzustand der Tabellen wird mit der Musterlösung verglichen. Bewertung `pattern`: normalisierter Textvergleich für `ALTER`, `GRANT`, `REVOKE`, `CREATE USER`. `tieFree`: bei gleichen Werten ist die Reihenfolge frei. `skills` werden automatisch aus der Musterlösung abgeleitet.

**`auswahl`** (Multiple Choice, für WiSo/Kompass und Wissensfragen)
`payload: { options: [{ text, correct, why? }], multi?: true, explanation? }`
Die Optionen werden je Aufgabe fest, aber gemischt angezeigt. `why` ist ein Hinweis, der bei genau dieser falschen Wahl erscheint.

## Neuen Aufgabentyp anlegen

1. `js/types/<typ>.js` mit `Tasks.registerType({...})` schreiben.
2. In `index.html` vor `js/game.js` einbinden.
3. Aufgaben als Daten liefern (`tasks()` oder `Tasks.add([...])`).

Am Spielkern ändert sich nichts.

## Skills

Jede Aufgabe listet in `skills` die Fähigkeiten, die sie braucht. Fehlt dem Spieler eine, ist der Auftrag gesperrt und das Spiel bietet den Kauf an.

Jedes Plugin liefert seinen Katalog mit `skills()`:

```js
{ id: 'sql.join', name: 'JOINs', desc: '…', cost: 120, group: 'SQL', topic: 'datenbank',
  requires: ['sql.groupby'],   // optional: Voraussetzung
  starter: true }               // optional: von Anfang an vorhanden (cost 0)
```

Alle `skills` einer Aufgabe müssen im Katalog eines Plugins stehen. Der SQL-Typ leitet sie automatisch aus der Musterlösung ab.

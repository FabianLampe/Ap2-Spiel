# Inhalte nachliefern

Die Listen in `listen/` enthalten nur noch die **noch nicht umgewandelten** Kompass-Konzepte (eins pro Zeile).
Für jede Liste einen Auftrag an einen Agenten mit `kompass-anleitung.md` geben (Parameter: Themenliste, Dateiname-Präfix, bevorzugte Figuren).
Handbuch-Kapitel: `handbuch-anleitung.md`. Prüfen: `node tools/check-content.js kompass|handbuch <datei>`. Einbinden: `node tools/update-index.js`.
Die Quelldaten liegen in `daten/kompass/<konzept>.json`.

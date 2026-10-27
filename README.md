# Rack & Ruhm – AP2-Lernspiel

Browser-Lernspiel zur Vorbereitung auf die **AP2** (Fachinformatiker). Du startest als Freelancer in einer schäbigen Wohnung, nimmst Jobs an, löst Aufgaben, verdienst Geld und kaufst Skills, eine bessere Wohnung und ein Auto – und bekommst dadurch schwerere Jobs.

## Inhalte
- **Datenbank:** ER-Modellierung, Normalisierung, SQL (Editor mit Bewertung)
- **UML:** Use-Case-, Aktivitäts-, Klassen-, Sequenz- und Zustandsdiagramme
- **Programmierung:** Python, Algorithmen, Git im Team
- **Wirtschaft & Recht:** Rechen-Aufgaben (Skonto, Break-even, Amortisation, Subnetz, RAID …), Prüfungskompass mit über 1.600 Beispielaufgaben aus den Prüfungen 2021–2026
- **Lernmechanik:** Figuren erklären Themen, du notierst Wichtiges im begrenzten Notizbuch und wirst später danach gefragt. Dazu gibt es ein Referenzbuch und ein Tutorial.

## Technik
- Reines **HTML/CSS/JavaScript**, ohne Build-Schritt und ohne externe Dienste
- Begehbare **3D-Welt** mit three.js (liegt offline im Repo, `game/vendor/`), Animationen in CSS/SVG
- Aufgaben- und Lerninhalte als Daten (`game/data/`), Prüfskripte in `tools/` (Node.js)

## Starten
```bash
cd game
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Hinweis zu den Inhalten
Ein Teil der Lerninhalte basiert auf **heidelab** und wurde mit Erlaubnis des Autors übernommen. Details zum Umfang stehen in [SCOPE.md](SCOPE.md).

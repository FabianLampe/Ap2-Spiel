# Rack & Ruhm

Browser game for preparing for the German IT apprenticeship final exam (AP2). The player works as a freelancer: take jobs, solve tasks, earn money, buy skills and upgrades, and unlock harder jobs.

Topics: databases (ER modelling, normalisation, SQL), UML diagrams, programming (Python, algorithms, Git), and business and law questions based on exams from 2021 to 2026.

Part of the learning content is based on heidelab and is used with the author's permission. See [SCOPE.md](SCOPE.md) for the full scope.

## Run

The game is plain HTML, CSS and JavaScript and needs no build step.

```
cd game
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Layout

- `game/`: the game (three.js is vendored in `game/vendor/`)
- `game/data/`: tasks and learning content
- `tools/`: scripts that check content and locations (Node.js)
- `daten/kompass/`: exam questions grouped by topic

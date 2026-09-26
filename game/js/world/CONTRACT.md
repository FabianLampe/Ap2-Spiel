# Schnittstelle für Orte (3D-Welt)

Jeder Ort ist eine Datei `game/js/world/locations/<id>.js`, die genau einen Ort anmeldet. Vorbild: `locations/wohnung.js`.
Die Engine (`engine.js`), der Baukasten (`props.js`), Texturen (`textures.js`) und Figuren (`humans.js`) werden **nicht** verändert.

```js
World.registerLocation({
  id: 'cafe',                 // eindeutig, kleingeschrieben
  name: 'Café Kolben',        // Anzeigename (HUD, Karte)
  build: function (ctx) {
    var b = Props.builder();
    // ... Räume, Möbel, Figuren, Interaktionen bauen (siehe unten) ...
    return b;                 // der Builder ist das Ergebnis
  }
});
```

`ctx` enthält: `THREE`, `Props`, `Textures`, `Humans`, `State`, `Economy`, `api`. Die Globals `THREE`, `Props` usw. stehen auch direkt zur Verfügung.
`build()` wird bei jedem Betreten neu aufgerufen und muss ohne Seiteneffekte auf globalen Zustand auskommen (außer Lesen von `State.s`).

## Koordinaten

Meter, Y oben, Boden bei y = 0. N = -z, S = +z, E = +x, W = -x.
Figuren und Möbel schauen bei `ry = 0` nach **+z**. Drehung um Y: `ry = Math.PI` schaut nach -z, `Math.PI/2` nach +x, `-Math.PI/2` nach -x.
Ein Stuhl mit `ry = 0` hat die Lehne bei -z (man sitzt und schaut nach +z).

## Was `build()` zurückgeben muss

Den Builder mit diesen Feldern (Props-Funktionen füllen sie automatisch):

| Feld | Bedeutung |
|---|---|
| `group` | alle sichtbaren Objekte |
| `colliders` | Liste `{minX,maxX,minZ,maxZ}`, Möbel und Wände (kommen von `Props.*` automatisch mit `collide: true`) |
| `interactables` | Interaktionspunkte, siehe unten (`Props.interact`, `Props.npc`) |
| `animators` | Funktionen `(dt, t)`, laufen jeden Frame (z. B. drehender Ventilator) |
| `spawns` | mindestens `default` = `{ x, z, ry }`, dort startet der Spieler. Weitere Namen: `door` (Ankunft von der Karte), `bed` (morgens in der Wohnung) |
| `bounds` | wird von `Props.room` gesetzt, `{minX,maxX,minZ,maxZ,h}` |
| `lighting` | optional: `{ bg, sky, ground, hemi, sun, sunColor, sunDir:[x,y,z], exposure, fog:{color,near,far} }` |

Regeln:
- Der Spieler muss vom Startpunkt aus alle Interaktionspunkte **erreichen** können (nichts zubauen, Türöffnungen freihalten, mindestens 0,9 m Gänge).
- Räume **ohne Decke** bauen (Kamera schaut von oben). Lampen dürfen an `y ≈ 2,6` hängen.
- Höchstens **4 Punktlichter** (`Props.pointLight` / `Props.lamp` mit Licht) pro Ort, keine Schattenwerfer außer der Engine-Sonne.
- Nur Geometrie und Texturen aus `Props`/`Textures`/`THREE`, keine Dateien laden, kein Netzwerk.
- Jeder Ort hat eine `Tür` zur Karte: `Props.interact(b, { id: 'tuer', label: 'Zur Karte', x, z, onUse: function (api) { api.openMap(); } })`.
- Alle Texte auf Deutsch.

## Interaktionen

```js
Props.interact(b, { id, label, x, z, radius, y, onUse: function (api) { ... }, when: function () { return bool; } });
Props.npc(b, { figure: 'bank', x, z, ry, pose: 'stand' | 'sit', name: 'Herr Zinsmann', onUse: function (api) { api.talk({...}); } });
```
`label` erscheint als „E · label“. `y` ist die Höhe der schwebenden Markierung. `when()` blendet den Punkt bei Bedarf aus.

### `api` (wird an `onUse` übergeben)

| Aufruf | Wirkung |
|---|---|
| `api.openMap()` | Karte zum Reisen |
| `api.openJobs()` | Job-Board am Laptop; prüft selbst, ob hier gearbeitet werden darf (Café: Kaffee nötig, Büro: angemietet) |
| `api.openShop(tab)` | Shop-Fenster: `'skills'`, `'home'`, `'car'`, `'office'`, `'finance'` |
| `api.talk({ figure, name, text, actions })` | Gesprächsfenster mit 2D-Figur (`figure` wie bei `Props.npc`), `actions: [{ label, run(api) }]` |
| `api.notify(kind, text)` | Meldung, `kind`: `'ok'`, `'bad'`, `'info'` |
| `api.sleep()` | Tag beenden, nächster Morgen in der Wohnung |
| `api.buyCoffee()` | Kaffee für 4 € kaufen (Café) |
| `api.hasCoffee()` | `true`, wenn heute schon Kaffee gekauft |
| `api.canWork()` | `true` im Café (mit Kaffee) und im angemieteten Büro |
| `api.state`, `api.economy` | `State`, `Economy` (nur lesen) |

## Figuren (`Props.npc`, `figure`)

`spieler`, `kalle` (Ex-Chef), `finanzamt` (Frau Pfennig), `bank` (Herr Zinsmann), `startup` (Lennox), `datenschutz` (Dr. Blattner), `barista`, `makler`, `verkaeufer`, `gast1`, `gast2`, `gast3`.

## Baukasten (`Props`)

`room` (Wände mit Türen/Fenstern), `box`, `cyl`, `sphere`, `sign`, `table`, `chair`, `stool`, `sofa`, `bed`, `desk`, `laptop`, `shelf`, `counter`, `plant`, `rug`, `fridge`, `picture`, `clock`, `coffeeMachine`, `cashRegister`, `car`, `lamp`, `pointLight`, `part`/`cylPart`/`group` (eigene Möbel aus Teilen). Details und Parameter stehen als Kommentare in `props.js`.
Texturen für Böden und Wände: `wood`, `tile`, `carpet`, `plaster`, `wallpaper`, `brick`, `concrete`, `marble`, `fabric`, `grass`.

## Prüfen

`node tools/check-location.js game/js/world/locations/<id>.js` baut den Ort ohne Grafikkarte auf und prüft: Struktur, Spawn frei von Kollisionen, alle Interaktionspunkte vom Spawn aus erreichbar, Anzahl Lichter, Größe. Muss ohne Fehler durchlaufen.

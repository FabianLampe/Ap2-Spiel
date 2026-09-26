# Rack & Ruhm – Design-Grundlage

Eigenständiges Hauptansicht-Mockup für ein AP2-Lernspiel. `index.html` direkt im Browser öffnen. Keine Installation, Fonts, Bilder, Bibliotheken oder Netzwerkzugriffe erforderlich. Alle Illustrationen sind inline SVG; ein kleines eingebettetes JavaScript steuert die Vorschauen und Story-Stufe.

## Gestaltungsprinzip

Eine sympathische Bruchbude mit Potenzial: warme Papierfläche, dunkle Comic-Konturen, handgezeichnet wirkende Ausstattung und ein kräftig orangefarbener Einstieg. Der Spieler ist Junior-Admin. Geld und Ruf finanzieren den sichtbaren Ausbau. Die Gebäudestruktur ist ein 2×2-Querschnitt: unten Technik, oben Planung und Experimente. Raum 01 ist offen, Räume 02–04 sind sichtbar und gesperrt. Sperren werden zusätzlich durch Schloss und Freischaltbedingungen erklärt.

## Palette / CSS-Tokens

Alle zentralen Farben und Abstände stehen in `:root`.

| Token | Wert | Verwendung |
| --- | --- | --- |
| `--paper` | `#f5f2e9` | Seitenhintergrund |
| `--surface` | `#fffdf7` | Karten und Sprechblase |
| `--ink` | `#253543` | Text, Konturen, Gebäudeträger |
| `--muted` | `#718087` | Sekundäre Beschriftung |
| `--orange` | `#f87845` | Hauptaktion, Frist, Spieler-Shirt |
| `--orange-light` | `#ffe2cb` | Hover-Akzent |
| `--yellow` | `#ffcf5b` | Hinweise und Raum-Einstieg |
| `--mint` | `#bfe8d2` | Datenbankkeller und SQL-Kategorie |
| `--teal` | `#257e78` | Positive Werte, Betrieb, Fortschritt |
| `--blue` | `#a8d5ef` | Technik-/Fensterakzent |
| `--purple` | `#c4b6e6` | Architektur / UML |
| `--line` | `#d9ddd4` | Dezente Trennlinien |
| `--locked` | `#dae0df` | Vorgesehene Sperrfarbe |
| `--danger` | `#b74532` | Dringliche Frist-Beschriftung |

Die SVGs verwenden dieselbe Farbfamilie plus lokale Schattierungen direkt in ihren Füllungen. Für dynamische Raum-Themes diese Werte bei Bedarf ebenfalls auf CSS-Variablen umstellen. Gesperrte Illustrationen erhalten `grayscale(1)` und reduzierte Deckkraft; ihre Texte bleiben separat lesbar.

## Schriften und Abstände

- Systemschrift: `ui-rounded, "Trebuchet MS", Arial, sans-serif` (`--font`). Keine externen Schriftdateien. Je nach Betriebssystem leichte Unterschiede.
- Wortmarke 25 px, Haupttitel 32 px, Paneltitel 21 px, Raum-/Tickettitel 16 px, Fließtext 11–14 px. Kleine technische Etiketten 9–10 px; Großschreibung nur für kurze Labels.
- Abstandsraster: `--space-1/2/3/4/5/6/8/10` = 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 px.
- Radien: `--radius-sm` 10 px, `--radius` 18 px, `--radius-lg` 24 px.
- Hauptkontur: `--border` = 2 px Ink. Harter Comic-Schatten: `--shadow` = 0 4 px 0 Ink.
- Maximale Inhaltsbreite 1536 px; Desktop: flexible Gebäude-Spalte plus 332 px Posteingang. Ab 1100 px schmalere Abstände, bis 850 px Posteingang unter dem Gebäude, bis 570 px Räume untereinander. Primär für Laptop/PC ausgelegt.

## Komponenten und Anknüpfungspunkte

| Komponente | CSS / DOM | Aufgabe |
| --- | --- | --- |
| AppHeader | `.topbar`, `.brand` | Wortmarke und Spielstand |
| ResourceStat | `.stat-day`, `.stat-money`, `.stat-rep` | Tag/Uhrzeit, Budget, Ruf |
| SettingsPopover | `.settings`, `.settings-panel` | Natives `details` mit Zahnrad-Auslöser |
| StoryLevelControl | `input[name="story"]` | Werte `leicht`, `mittel`, `stark`; Standard `mittel` |
| ShiftProgress | `.shift`, `.shift-progress` | Tagesfortschritt mit ARIA-Wert |
| BuildingOverview | `.world-panel`, `.building`, `.room-grid` | Querschnitt und Betriebslegende |
| RoomCard | `.room[data-room]` | IDs: `database`, `architecture`, `servers`, `lab` |
| RoomState | `.active`, `.locked`, `.lock-badge` | Verfügbarkeit und Bedingungen |
| RoomIllustration | `.room-art` | Eigene SVG-Zeichnung pro Raum, ViewBox 390×214 |
| RoomEnterButton | `.room-enter[data-preview="database"]` | Einstieg in den verfügbaren Raum |
| MentorMessage | `.mentor`, `.portrait`, `.speech`, `#mentor-text` | Kalle, Chef mit Kaffeeproblem; Story-abhängiger Dialog |
| TicketInbox | `.ticket-panel`, `.ticket-heading`, `.count` | Ticketanzahl und Warteschlange |
| TicketCard | `.ticket`, `.featured`, `.unavailable` | Standard, empfohlener Einstieg, gesperrte Vorschau |
| DeadlineBar | `.timer-label`, `.progress` | Fristtext und Restzeit-Anteil |
| TicketReward | `.ticket-reward` | Geld und Ruf |
| PrimaryButton | `.primary` | Orangefarbene Hauptaktion mit hartem Schatten |
| PreviewDialog | `#preview-dialog`, `[data-preview]` | Ehrlich gekennzeichnete Platzhalter für spätere Aufgaben-/Raumansichten |
| IconLibrary | `symbol#i-*` | Wiederverwendbare Icons mit `use`; dekorative Icons im Textkontext |

## Beispieldaten und Zustände

- Montag, Tag 01, 09:40 Uhr; Schichtende 17:00; Budget 350 €, Ruf 12/100.
- Datenbankkeller: verfügbar; SQL, ER-Modelle, Normalisierung.
- Architekturbüro: 600 € **und** Ruf 20; UML / Softwaredesign.
- Serverhalle: 1.200 € **und** Ruf 40; Systeme / Vernetzung als ergänzende AP2-Themen.
- Labor: 1.800 € **und** Ruf 60; Python / Machine Learning.
- Ticket 001: SQL, Bäckerei Bytes, 120 € / 8 Ruf; 4 Std. 20 Min. Restzeit bei beispielhaft acht Stunden Gesamtfrist (54 %).
- Ticket 002: Normalisierung, 180 € / 10 Ruf; 6 Std. 20 Min. Restzeit (79 %).
- Ticket 003: UML, 250 € / 15 Ruf; gesperrt bis zum Architekturbüro. Keine laufende Frist.
- Fristen laufen im Mockup nicht. Kein Geldabzug, kein Freischalten und keine echte Ticketannahme. Der Titel des Vorschau-Dialogs und sein Hinweis erklären den Prototyp-Status.

## Verhalten und Übergabe an Claude

Story-Auswahl verändert die Beschreibung und Kalles Nachricht sofort. `leicht` gibt knappe Lernhinweise, `mittel` kurze Dialoge, `stark` mehr Geschichte. Die Auswahl gilt nur für die aktuelle Seite, wird nicht gespeichert und verändert keine Schwierigkeit oder Fristen.

Der Raum-Pfeil, die primäre Ticketaktion und Ticket 002 öffnen einen nativen Dialog. Schließen per Button oder Escape; Browser übernimmt Fokusführung und Rückkehr zum Auslöser. Einstellungen sind per Tastatur erreichbar; Escape schließt das Popover. Sichtbare Fokusringe sind definiert. Illustrationen tragen beschreibende Labels. Fortschrittsbalken haben Namen sowie Minimum, Maximum und aktuellen Wert.

Für die Integration die statischen Werte durch einen zentralen Spielzustand ersetzen. Empfohlene Felder: `day`, `timeMinutes`, `money`, `reputation`, `storyLevel`, `rooms`, `tickets`. Raum-Verfügbarkeit aus gekauftem Status und Freischaltbedingungen ableiten. Beim Kauf Budget prüfen und reduzieren; Ruf dient hier als Schwelle. Klassen, Schlossanzeige, Bedienbarkeit und Dialoge gemeinsam aktualisieren.

Tickets benötigen stabile IDs, Raumbezug, Kategorie, Belohnung, Status sowie Gesamt- und Restfrist. Prozentbalken und ARIA-Werte aus derselben Zeitquelle berechnen. Gesperrte Tickets starten ihre Frist erst mit Verfügbarkeit. `data-preview` durch echte Spielaktionen ersetzen und Vorschau-Hinweise dann entfernen. Lerninhalte, Prüflogik, Speichern und Zeitsteuerung sind bewusst noch nicht implementiert.

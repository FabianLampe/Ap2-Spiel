// Tutorial: Kalle führt den ersten Tag mit kurzen Tipps. Schritte warten auf echte Ereignisse aus dem Spiel.
// Überspringbar (×), jederzeit über den Knopf „?“ wiederholbar. Fortschritt steht im Spielstand (State.s.tutorial).
(function () {
  var STEPS = [
    { text: 'Hi, ich bin Kalle, dein alter Chef. Ich zeige dir kurz, wie das hier läuft. Mit WASD läufst du, mit gedrückter Maus oder den Pfeiltasten drehst du die Kamera. Die gelben Rauten zeigen, womit du mit E etwas tun kannst.', next: 'Weiter' },
    { text: 'Deine Wohnung ist klein, aber zum Arbeiten brauchst du Kunden. Geh zur Tür und drück E, dann öffnet sich die Karte (die Taste M geht auch).', wait: 'map-open' },
    { text: 'Ein Büro kannst du dir noch nicht leisten. Also arbeitest du im Café Kolben: Wähle es auf der Karte und klick „Hingehen“. Der Weg kostet Zeit.', wait: 'arrive-cafe' },
    { text: 'Bestell dir an der Theke einen Kaffee (E). Ohne Kaffee darfst du nicht am Tisch sitzen. Der kostet 4 € pro Tag.', wait: 'coffee' },
    { text: 'Jetzt such dir einen Tisch mit Laptop (an der Ostwand) und drück dort E, um zu arbeiten.', wait: 'jobs-open' },
    { text: 'Das ist dein Job-Board. Schwere Aufträge zahlen mehr. Aufträge mit Schloss brauchen erst einen Skill, den kaufst du später im Lernzentrum. Nimm für den Anfang einen leichten.', wait: 'task-open' },
    { text: 'Rechts findest du das Referenzbuch: die Datenbank zum Aufklappen und alle Befehle zum Nachschlagen. Mit „In den Editor“ übernimmst du ein Beispiel. Das Handbuch geht auch überall mit der Taste H. Schreib deine Lösung und klick „Abgeben“.', wait: 'task-done' },
    { text: 'Geschafft! Das Geld gibst du klug aus: Skills und Notizbuch im Lernzentrum, Wohnung und Büro beim Makler, ein Auto im Autohaus. Denk an die Wochenrechnung! Und hör den Figuren zu: Frau Pfennig, Herr Zinsmann und die anderen erklären dir Wissen und fragen dich Tage später ab. Schreib dir das Wichtige ins Notizbuch (N).', next: 'Los geht\'s' }
  ];

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  var box = null, fig = null;

  function step() { var t = State.s.tutorial; return typeof t === 'number' && t >= 0 && t < STEPS.length ? t : -1; }
  function hide() { if (box) { box.remove(); box = null; } }

  function show() {
    hide();
    var i = step(); if (i < 0 || !document.body.classList.contains('has-world')) return;
    var s = STEPS[i];
    fig = Characters.make('kalle', { size: 64 });
    var actions = el('div', { class: 'row', style: 'margin-top:8px' });
    if (s.next) actions.appendChild(el('button', { class: 'btn small', onclick: function () { Tutorial.advance(); } }, [s.next]));
    actions.appendChild(el('span', { class: 'spacer' }));
    actions.appendChild(el('button', { class: 'btn small ghost', onclick: function () { Tutorial.skip(); }, title: 'Tutorial beenden' }, ['Überspringen']));
    box = el('div', { id: 'coach', class: 'coach', role: 'dialog', 'aria-label': 'Tutorial' }, [
      fig, el('div', { class: 'coach-text' }, [el('div', { class: 'sub', style: 'margin:0 0 4px' }, ['Tipp ' + (i + 1) + ' von ' + STEPS.length]), el('div', {}, [s.text]), actions])
    ]);
    document.body.appendChild(box);
    Fx.mood(fig, 'talking', 1800);
  }

  window.Tutorial = {
    steps: STEPS.length,
    start: function () { State.s.tutorial = 0; State.save(); show(); },
    // Beim Spielstart: neuer Spieler bekommt das Tutorial automatisch
    boot: function () { if (State.s.tutorial === undefined) State.s.tutorial = 0; show(); },
    event: function (name) {
      var i = step(); if (i < 0) return;
      if (STEPS[i].wait === name) Tutorial.advance();
    },
    advance: function () {
      var i = step(); if (i < 0) return;
      State.s.tutorial = i + 1 >= STEPS.length ? -1 : i + 1; State.save(); show();
    },
    skip: function () { State.s.tutorial = -1; State.save(); hide(); },
    active: function () { return step() >= 0; },
    refresh: show
  };
})();

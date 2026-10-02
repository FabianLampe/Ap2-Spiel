// Spielkern: Job-Board -> Aufgabe (beliebiger Typ per Plugin) -> Prüfung -> Geld/Ruf/Zeit
(function () {
  var PAY = { 1: 40, 2: 80, 3: 140 };
  var REP = { 1: 3, 2: 5, 3: 8 };
  var TIME = { 1: 30, 2: 60, 3: 90 };
  var DLABEL = { 1: 'leicht', 2: 'mittel', 3: 'schwer' };
  var TOPIC_LABEL = { datenbank: 'Datenbank', uml: 'UML', programmierung: 'Programmierung', ml: 'Maschinelles Lernen', git: 'Git', wirtschaft: 'Wirtschaft', rechnen: 'Rechnen', pruefung: 'Prüfung' };
  var LIMIT = { 1: 90, 2: 150, 3: 240 };    // Frist in Spielminuten ab Annahme
  var RUN_COST = 3, MISS_COST = 10;         // Ausführen und Fehlversuch kosten Zeit
  var OFFERS_PER_DAY = 6;
  var app = document.getElementById('app');
  var filterD = 0, filterT = '', feedback = null;
  var draftMem = {};   // Entwürfe je Aufgabe (nur im Speicher, damit auch Nicht-Text-Antworten funktionieren)
  var banners = [];   // Meldungen (Rechnung, Kauf …), bleiben bis sie weggeklickt werden (nur im 2D-Modus)
  var WM = false, winOpen = false, talkCtx = null, mapSel = null;   // WM: 3D-Welt aktiv
  var hero = null, lastKey = null, pendingFx = null, pendingGreet = true, newDayFlag = false, shown = { money: null, rep: null };

  var LINES = {
    ok:  ['Sauber gelöst! So verdient man sein Geld.', 'Genau so! Ich wusste, dass du das kannst.', 'Der Kunde ist begeistert. Die Miete übrigens auch.', 'Das war stark. Weiter so!'],
    bad: ['Hm, so nicht. Lies den Auftrag noch mal genau.', 'Knapp daneben. Schau dir die Vorgabe noch mal an.', 'Nicht ganz. Versuch es noch mal, du kriegst das hin.', 'Autsch. Aber aus Fehlern lernt man.'],
    intro: { 1: 'Ein einfacher Auftrag. Los geht\'s!', 2: 'Der ist nicht ohne. Konzentrier dich.', 3: 'Ein harter Brocken! Dafür zahlt er gut.' },
    greet: ['Willkommen im Geschäft! Such dir einen Auftrag aus, die Miete zahlt sich nicht von selbst.', 'Na, wieder da? Der Kaffee ist alle, die Aufträge nicht.', 'Guten Morgen! Heute sind ein paar Aufträge reingekommen.', 'Schau dir das Job-Board an. Schwere Jobs zahlen mehr.'],
    newday: 'Ein neuer Tag, neue Aufträge. Los!'
  };
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function euro(n) { return n.toLocaleString('de-DE') + ' €'; }
  function topicLabel(t) { return TOPIC_LABEL[t] || t; }

  function payFor(task) {
    var tries = State.s.attempts[task.id] || 0;
    var factor = Math.max(0.4, 1 - 0.15 * Math.max(0, tries - 1)); // erster Fehlversuch frei
    return Math.round(PAY[task.difficulty] * factor * Economy.payFactor(State.s) * Economy.diff(State.s).pay);
  }
  function timeFor(task) { return Math.max(10, Math.round(TIME[task.difficulty] * Economy.timeFactor(State.s))); }
  function missingFor(task) { return Economy.missingSkills(State.s, task); }

  function toast(kind, text) {
    var box = document.getElementById('toasts'); if (!box) return;
    var n = el('div', { class: 'toast ' + kind, role: 'status' }, [text]); box.appendChild(n);
    setTimeout(function () { n.classList.add('out'); }, 4800); setTimeout(function () { n.remove(); }, 5400);
  }
  function banner(kind, text) { if (WM) toast(kind, text); else banners.push({ kind: kind, text: text }); }
  function pullEvents() { State.takeEvents().forEach(function (e) { banner(e.kind, e.text); }); }
  var api = {
    toast: function (kind, text) { banner(kind, text); render(true); },
    bought: function (text, fromEl) {
      banner('ok', text); State.save(); if (window.Sound) Sound.play('buy');
      if (fromEl && fromEl.isConnected) Fx.confetti(fromEl, 16);
      render(true);
    },
    setTab: function (tab) { if (WM) return; go({ name: 'shop', tab: tab }); },
    open: function (task) { go({ name: 'task', id: task.id }); },
    openShop: function () { if (WM) { api3d.openMap(); return; } go({ name: 'shop', tab: 'skills' }); },
    openHandbuch: function () { if (WM) api3d.openHandbuch(); else go({ name: 'handbuch' }); },
    canBuyHere: function () { return !WM; }
  };

  // Tagesangebote: deterministisch pro Tag
  function offersForToday() {
    var seed = State.s.offersSeed * 9301 + 49297;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var open = Tasks.all().filter(function (t) { return !t.figure && !State.s.done[t.id]; });
    for (var i = open.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), tmp = open[i]; open[i] = open[j]; open[j] = tmp; }
    return open;
  }
  // Auswahl fürs Board: erst machbare Aufträge, dazu einige, für die noch ein Skill fehlt
  function boardList(all) {
    var doable = all.filter(function (t) { return !missingFor(t).length; });
    var locked = all.filter(function (t) { return missingFor(t).length; });
    var lockedShow = Math.min(locked.length, doable.length >= OFFERS_PER_DAY - 2 ? 2 : OFFERS_PER_DAY - doable.length);
    return doable.slice(0, OFFERS_PER_DAY - lockedShow).concat(locked.slice(0, lockedShow));
  }

  function renderStats() {
    document.getElementById('stat-day').textContent = State.clock();
    var m = document.getElementById('stat-money'), r = document.getElementById('stat-rep');
    m.textContent = euro(State.s.money); r.textContent = 'Ruf ' + State.s.rep;
    if (shown.money !== null && shown.money !== State.s.money) Fx.pulse(m);
    if (shown.rep !== null && shown.rep !== State.s.rep) Fx.pulse(r);
    shown.money = State.s.money; shown.rep = State.s.rep;
  }
  function go(view) { Shop.closeModal(); State.s.view = view; feedback = null; pendingGreet = view.name === 'home'; State.save(); render(); }

  function getHero() {
    if (hero && (hero.tier !== State.s.home || hero.car !== State.s.car)) hero = null;
    if (!hero) {
      var sc = Scene.make(State.s.home, State.s.car), k = Characters.make('kalle', { size: 150 }), b = el('div', { class: 'bubble' }, ['']);
      hero = { tier: State.s.home, car: State.s.car, scene: sc, kalle: k, bubble: b, node: el('div', { class: 'hero' }, [el('div', { class: 'card scene-card' }, [sc.el]), el('div', { class: 'card mentor' }, [k, b])]) };
    }
    return hero;
  }

  function renderHome() {
    var all = Tasks.all().filter(function (t) { return !t.figure; }), doneCount = all.filter(function (t) { return State.s.done[t.id]; }).length;
    var wrap = el('div');
    var h = WM ? null : getHero();
    if (h) { h.scene.setClock(State.s.minutes); wrap.appendChild(h.node); }
    if (h && pendingGreet) {
      pendingGreet = false;
      var first = State.s.day === 1 && !Object.keys(State.s.done).length;
      var nd = newDayFlag; newDayFlag = false;
      Fx.say(h.bubble, h.kalle, first ? LINES.greet[0] : (nd ? LINES.newday : pick(LINES.greet.slice(1))));
    }
    var bill = Economy.weeklyBill(State.s), d = Economy.daysUntilBill(State.s);
    wrap.appendChild(el('div', { class: 'strip' }, [
      el('span', {}, ['🏠 ' + Economy.home(State.s).name]), el('span', {}, ['🚗 ' + Economy.car(State.s).name]),
      el('span', { class: 'spacer' }),
      el('span', { class: d <= 2 && State.s.money < bill.total ? 'warn' : '' }, ['Nächste Rechnung: ' + euro(bill.total) + ' in ' + d + (d === 1 ? ' Tag' : ' Tagen')])
    ]));
    wrap.appendChild(el('h1', {}, ['Job-Board']));
    wrap.appendChild(el('p', { class: 'sub' }, [(WM ? (State.s.loc === 'buero' ? 'Dein Büro. ' : 'Café Kolben. ') : '') + doneCount + ' von ' + all.length + ' Aufträgen erledigt. Schwierigere Jobs zahlen mehr, brauchen aber mehr Zeit.']));

    var topics = {}; all.forEach(function (t) { topics[t.topic] = 1; });
    var f = el('div', { class: 'filter' });
    f.appendChild(el('button', { class: 'btn small' + (!filterT ? ' active' : ' ghost'), onclick: function () { filterT = ''; render(); } }, ['Alle Themen']));
    Object.keys(topics).forEach(function (k) {
      f.appendChild(el('button', { class: 'btn small' + (filterT === k ? ' active' : ' ghost'), onclick: function () { filterT = k; render(); } }, [topicLabel(k)]));
    });
    wrap.appendChild(f);
    var f2 = el('div', { class: 'filter' });
    [[0, 'Alle Stufen'], [1, 'Leicht'], [2, 'Mittel'], [3, 'Schwer']].forEach(function (o) {
      f2.appendChild(el('button', { class: 'btn small' + (filterD === o[0] ? ' active' : ' ghost'), onclick: function () { filterD = o[0]; render(); } }, [o[1]]));
    });
    wrap.appendChild(f2);

    var list = boardList(offersForToday().filter(function (t) { return (!filterD || t.difficulty === filterD) && (!filterT || t.topic === filterT); }));
    if (!list.length) wrap.appendChild(el('div', { class: 'msg info' }, ['Keine passenden Aufträge mehr. Wähle einen anderen Filter oder warte bis morgen.']));
    var grid = el('div', { class: 'grid' });
    list.forEach(function (t) {
      var missing = missingFor(t), locked = missing.length > 0;
      var names = missing.map(function (id) { return Tasks.skill(id).name; }).join(', ');
      var pay = Math.round(PAY[t.difficulty] * Economy.payFactor(State.s));
      grid.appendChild(el('div', { class: 'card' + (locked ? ' locked' : '') }, [
        el('div', { class: 'row' }, [el('span', { class: 'badge d' + t.difficulty }, [DLABEL[t.difficulty]]), el('span', { class: 'badge', style: 'background:#fff' }, [topicLabel(t.topic)]), el('span', { class: 'spacer' }), el('span', { class: 'pay' }, [euro(pay)])]),
        el('h2', { style: 'margin-top:10px' }, [(locked ? '🔒 ' : '') + t.title]),
        el('p', { class: 'sub' }, [(t.context ? t.context + ' · ' : '') + timeFor(t) + ' Min. · +' + REP[t.difficulty] + ' Ruf']),
        locked ? el('p', { class: 'sub lockinfo' }, ['Dafür fehlt dir: ' + names]) : el('span'),
        el('button', { class: 'btn' + (locked ? ' ghost' : ''), onclick: function () { if (locked) Shop.missingDialog(t, api); else go({ name: 'task', id: t.id }); } }, [locked ? 'Was fehlt mir?' : 'Annehmen'])
      ]));
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function fmtClock(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }
  function deadlineText(due) {
    var left = due - State.abs(), dueDay = Math.floor(due / 1440) + 1, clock = fmtClock(due % 1440);
    return '⏱ Frist: ' + (dueDay !== State.s.day ? 'Tag ' + dueDay + ', ' : '') + clock + ' Uhr' + (left > 0 ? ' (noch ' + left + ' Min.)' : ' – überschritten: nur halbes Honorar');
  }
  function refreshDeadline(task) {
    var d = document.getElementById('deadline'), a = State.s.acc[task.id]; if (!d || !a) return;
    d.textContent = deadlineText(a.due); d.classList.toggle('warn', a.due - State.abs() < 30);
  }

  function renderTask(id) {
    var task = Tasks.get(id);
    if (!task) { go({ name: 'home' }); return el('div'); }
    if (missingFor(task).length && !State.s.done[id]) { setTimeout(function () { go({ name: 'home' }); Shop.missingDialog(task, api); }, 0); return el('div'); }
    if (!task.figure && !State.s.done[id] && !State.s.acc[id]) State.s.acc[id] = { start: State.abs(), due: State.abs() + Math.round(LIMIT[task.difficulty] * Economy.diff(State.s).limit) };
    var plugin = Tasks.plugin(task.type), isNpc = !!task.figure, done = !!State.s.done[id] || !!State.s.failed[id];
    var wrap = el('div');
    var bookOpen = State.s.bookOpen !== false;
    wrap.appendChild(el('div', { class: 'row' }, [
      isNpc ? el('span') : el('button', { class: 'btn small ghost', onclick: function () { go({ name: 'home' }); } }, ['← Zurück zum Job-Board']),
      el('span', { class: 'spacer' }),
      el('button', { class: 'btn small' + (bookOpen ? ' active' : ' ghost'), 'aria-pressed': bookOpen ? 'true' : 'false', onclick: function () { State.s.bookOpen = !bookOpen; State.save(); render(true); } }, ['📖 Referenzbuch'])
    ]));
    wrap.appendChild(el('h1', { style: 'margin-top:12px' }, [task.title]));
    wrap.appendChild(el('p', { class: 'sub' }, [isNpc
      ? 'Frage von ' + Quests.name(task.figure) + ' · ' + (task.subtopic || 'Wirtschaft') + ' · Belohnung ' + euro(Quests.rewardFor(task)) + ' · falsch: −' + euro(Quests.fineFor(task)) + ' und die Beziehung sinkt'
      : topicLabel(task.topic) + ' · ' + DLABEL[task.difficulty] + ' · Auftragswert ' + euro(payFor(task)) + ' · ' + timeFor(task) + ' Min.']));

    var dl = !isNpc && State.s.acc[id] ? State.s.acc[id].due : null;
    if (dl !== null && !done) {
      var left = dl - State.abs();
      wrap.appendChild(el('p', { class: 'sub deadline' + (left < 30 ? ' warn' : ''), id: 'deadline' }, [deadlineText(dl)]));
    }
    var kalle = Characters.make(isNpc ? task.figure : 'kalle', { size: 62 }), bubble = el('div', { class: 'bubble' }, [isNpc ? 'Erinnerst du dich, was ich dir dazu erklärt habe? Schau in dein Notizbuch, wenn du es aufgeschrieben hast.' : LINES.intro[task.difficulty]]);
    wrap.appendChild(el('div', { class: 'card mentor compact', style: 'margin-bottom:14px;align-items:center;padding:8px 14px' }, [kalle, bubble]));
    wrap._mentor = { kalle: kalle, bubble: bubble };
    var left = el('div', { class: 'card' }, [el('h2', {}, ['Auftrag']), el('p', { style: 'white-space:pre-wrap' }, [task.prompt])]);
    if (plugin.renderInfo && !bookOpen && !isNpc) left.appendChild(plugin.renderInfo(task));

    var output = el('div', { id: 'out' });
    var ws = plugin.render(task, {
      draft: draftMem[id], output: output,
      setDraft: function (v) { draftMem[id] = v; },
      feedback: function (kind, text) { output.appendChild(el('div', { class: 'msg ' + kind }, [text])); },
      ran: function () { Fx.mood(kalle, 'thinking', 1600); if (!isNpc && !done) { var nd = State.spendTime(RUN_COST); pullEvents(); if (WM && nd) State.s.dayOver = true; State.save(); renderStats(); refreshDeadline(task); } },
      rerender: function () { render(true); }
    });
    var btnSubmit = el('button', { class: 'btn green', onclick: function () { (isNpc ? submitNpc : submit)(task, plugin, ws.getAnswer()); } }, ['Abgeben']);
    if (done) btnSubmit.disabled = true;
    var right = el('div', { class: 'card' }, [el('h2', {}, ['Dein Arbeitsplatz']), ws.node, el('div', { class: 'row', style: 'margin-top:10px' }, [btnSubmit]), output]);
    if (feedback) right.appendChild(el('div', { class: 'msg ' + feedback.kind }, [feedback.text]));
    else if (done) right.appendChild(el('div', { class: 'msg ok' }, [isNpc ? 'Diese Frage ist beantwortet.' : 'Dieser Auftrag ist erledigt.']));
    var cols = [left, right];
    if (bookOpen) cols.push(el('div', { class: 'card book-card' }, [el('h2', {}, ['Referenzbuch']), Reference.render(isNpc ? { task: task, plugin: plugin, insert: ws.insert, extraTabs: [Quests.notebookTab()], extraFirst: true } : { task: task, plugin: plugin, insert: ws.insert })]));
    wrap.appendChild(el('div', { class: 'task' + (bookOpen ? ' with-book' : '') + (plugin.wide ? ' wide' : '') }, cols));
    return wrap;
  }

  function submitNpc(task, plugin, answer) {
    var g = plugin.grade(task, answer);
    if (g.empty) { feedback = { kind: 'info', text: g.hint }; render(true); return; }
    var newDay = State.spendTime(10); pullEvents(); if (WM && newDay) State.s.dayOver = true;
    var r = Quests.answered(task, g.ok), sol = plugin.solutionText ? plugin.solutionText(task) : '', who = Quests.name(task.figure);
    if (g.ok) { pendingFx = { kind: 'ok', difficulty: task.difficulty }; feedback = { kind: 'ok', text: '✔ Richtig! ' + who + ' gibt dir ' + euro(r.pay) + '. Die Beziehung wird besser.\n\n' + sol }; }
    else { pendingFx = { kind: 'bad' }; feedback = { kind: 'bad', text: '✘ Leider falsch. ' + (g.hint ? g.hint + ' ' : '') + 'Nachzahlung: ' + euro(r.fine) + ', die Beziehung zu ' + who + ' sinkt.\n\nRichtig wäre:\n' + sol }; }
    State.save(); render(true);
  }

  var lessonCtx = null;
  function finishLesson(l) {
    var q = Quests.finishLesson(l), newDay = State.spendTime(20); pullEvents(); if (WM && newDay) State.s.dayOver = true;
    State.save(); lessonCtx = null;
    if (q) toast('info', Quests.name(l.figure) + ' wird dich in ein paar Tagen dazu abfragen. Schreib dir das Wichtige auf!');
    closeWindow();
  }
  function renderLesson() { return lessonCtx ? Quests.renderLesson({ lesson: lessonCtx, api: { toast: toast, finish: finishLesson } }) : el('div'); }
  function renderNotebook() {
    var wrap = el('div'); wrap.appendChild(el('h1', {}, ['Notizbuch']));
    wrap.appendChild(el('div', { class: 'card' }, [Quests.notebookNode(function () { render(true); })])); return wrap;
  }

  function renderHandbuch() {
    var wrap = el('div');
    wrap.appendChild(el('h1', {}, ['Handbuch']));
    wrap.appendChild(el('p', { class: 'sub' }, ['Befehle und Grundlagen zum Nachschlagen. Das Handbuch ist immer kostenlos.']));
    wrap.appendChild(el('div', { class: 'card' }, [Reference.render({})]));
    return wrap;
  }

  function submit(task, plugin, answer) {
    var g = plugin.grade(task, answer);
    if (g.empty) { feedback = { kind: 'info', text: g.hint }; render(true); return; }
    if (g.ok) {
      var acc = State.s.acc[task.id], late = !!acc && State.abs() + timeFor(task) > acc.due, pay = Math.round(payFor(task) * (late ? 0.5 : 1)), repGain = late ? -2 : REP[task.difficulty];
      State.s.money += pay; State.s.rep = Math.max(0, State.s.rep + repGain); State.s.done[task.id] = true; delete State.s.acc[task.id];
      var newDay = State.spendTime(timeFor(task)); pullEvents(); if (WM && newDay) State.s.dayOver = true;
      Tutorial.event('task-done');
      var text = (late ? '⚠ Zu spät abgegeben: nur halbes Honorar, Ruf ' + repGain + '. ✔ Auftrag erledigt: +' + euro(pay) + '.' : '✔ Auftrag erledigt: +' + euro(pay) + ', +' + REP[task.difficulty] + ' Ruf.') + (newDay ? (WM ? ' Es ist Feierabend, schließ das Fenster und geh nach Hause.' : ' Ein neuer Tag beginnt, es gibt neue Aufträge.') : '');
      var sol = plugin.solutionText ? plugin.solutionText(task) : '';
      pendingFx = { kind: 'ok', difficulty: task.difficulty }; if (newDay) newDayFlag = true;
      feedback = { kind: 'ok', text: text + (task.reflection ? '\n\nHintergrund: ' + task.reflection : '') + (sol ? '\n\nMusterlösung:\n' + sol : '') };
    } else {
      State.s.attempts[task.id] = (State.s.attempts[task.id] || 0) + 1;
      var n = State.s.attempts[task.id], nd2 = State.spendTime(MISS_COST); pullEvents(); if (WM && nd2) State.s.dayOver = true;
      pendingFx = { kind: 'bad' };
      feedback = { kind: 'bad', text: '✘ Noch nicht richtig. ' + g.hint + (n >= 2 ? ' (Ab dem zweiten Fehlversuch sinkt der Auftragswert.)' : '') };
    }
    State.save(); render(true);
  }

  function runPending(node) {
    var fx = pendingFx; pendingFx = null;
    if (!fx) return;
    var m = node._mentor;
    if (fx.kind === 'ok') {
      if (window.Sound) Sound.play('ok');
      var btn = document.querySelector('.btn.green') || document.body;
      if (m) { Fx.mood(m.kalle, 'happy', 2200); Fx.say(m.bubble, m.kalle, pick(LINES.ok)); }
      Fx.coins(btn, document.getElementById('stat-money'), 5 + fx.difficulty * 3);
      Fx.stars(btn, document.getElementById('stat-rep'), 2 + fx.difficulty);
      Fx.confetti(btn, 18 + fx.difficulty * 8);
    } else if (fx.kind === 'bad') {
      if (window.Sound) Sound.play('bad');
      if (m) { Fx.mood(m.kalle, 'sad', 2400); Fx.say(m.bubble, m.kalle, pick(LINES.bad)); }
      Fx.shake(document.querySelector('.task .card:last-child'));
    }
  }

  // ---------- 3D-Welt: Fenster, Karte, Gespräche, Reisen ----------
  function showWindow(on) {
    winOpen = !!on; document.body.classList.toggle('win-open', winOpen);
    if (WM) World.setPaused(winOpen || Menu.isOpen());
  }
  function openWindow(view) { if (!WM) { go(view); return; } State.s.view = view; feedback = null; showWindow(true); render(); }
  function closeWindow() {
    if (!WM) return;
    Shop.closeModal(); showWindow(false); talkCtx = null;
    if (State.s.dayOver) dayOver('Feierabend! Du gehst nach Hause.');
    State.save();
  }
  function enterLocation(id, spawn) {
    State.s.loc = id; State.save(); showWindow(false);
    if (window.Sound) Sound.play('door');
    return World.enter(id, spawn).then(function () { renderStats(); if (id === 'cafe') Tutorial.event('arrive-cafe'); }, function (err) {
      console.error('Ort konnte nicht aufgebaut werden:', id, err);
      if (id !== 'wohnung') { toast('bad', 'Dieser Ort ließ sich nicht laden. Du bist zurück in der Wohnung.'); return enterLocation('wohnung', 'default'); }
    });
  }
  function dayOver(text) {
    State.s.dayOver = false; talkCtx = null; showWindow(false);
    if (text) banner('info', text);
    enterLocation('wohnung', 'bed');
  }
  function isLocked(id) {
    if (!World.location(id)) return 'Dieser Ort ist noch nicht fertig gebaut.';
    if (id === 'buero' && !State.s.office) return 'Du hast noch kein Büro. Miete eins beim Immobilienmakler.';
    return false;
  }
  function travel(id) {
    var from = State.s.loc, mins = GameMap.minutes(from, id, State.s.car);
    mapSel = null; showWindow(false);
    var newDay = State.spendTime(mins); pullEvents();
    if (newDay) { dayOver('Unterwegs wurde es spät. Feierabend, du gehst nach Hause.'); return; }
    enterLocation(id, 'door');
  }
  function renderMap() {
    return GameMap.render({ current: State.s.loc, car: State.s.car, selected: mapSel, isLocked: isLocked,
      select: function (id) { mapSel = id; render(true); }, go: travel });
  }
  function renderTalk() {
    var t = talkCtx; if (!t) return el('div');
    var wrap = el('div'), fig = Characters.make(t.figure, { size: 150 }), bub = el('div', { class: 'bubble' }, ['']);
    wrap.appendChild(el('h1', {}, [t.name || 'Gespräch']));
    wrap.appendChild(el('div', { class: 'card mentor', style: 'margin:12px 0;align-items:center' }, [fig, bub]));
    Fx.say(bub, fig, t.text);
    var row = el('div', { class: 'row' });
    (t.actions || []).forEach(function (a) { row.appendChild(el('button', { class: 'btn', onclick: function () { if (a.run) a.run(api3d); else closeWindow(); } }, [a.label])); });
    row.appendChild(el('button', { class: 'btn ghost', onclick: closeWindow }, ['Tschüss']));
    wrap.appendChild(row);
    return wrap;
  }

  // Schnittstelle für die Orte (siehe world/CONTRACT.md)
  var api3d = {
    state: State, economy: Economy,
    openMap: function () { mapSel = null; openWindow({ name: 'map' }); Tutorial.event('map-open'); },
    openHandbuch: function () { openWindow({ name: 'handbuch' }); },
    openNotebook: function () { openWindow({ name: 'notebook' }); },
    // Gespräch mit einer Figur: erst offene Frage, sonst neue Lektion, sonst normales Gespräch
    npcTalk: function (o) {
      var n = Quests.next(o.figure);
      if (n && n.kind === 'question') { openWindow({ name: 'task', id: n.taskId }); return; }
      if (n && n.kind === 'lesson') { lessonCtx = n.lesson; openWindow({ name: 'lesson' }); return; }
      api3d.talk(o);
    },
    openTask: function (id) { if (Tasks.get(id)) openWindow({ name: 'task', id: id }); },
    openJobs: function () {
      if (!Economy.canWork(State.s)) { toast('bad', State.s.loc === 'cafe' ? 'Bestell dir erst einen Kaffee an der Theke, sonst wirft dich der Kellner raus.' : 'Hier kannst du nicht arbeiten.'); return; }
      openWindow({ name: 'home' }); Tutorial.event('jobs-open');
    },
    openShop: function (tab) { openWindow({ name: 'shop', tab: tab || 'skills', only: true }); },
    talk: function (o) { talkCtx = o; openWindow({ name: 'talk' }); },
    notify: function (kind, text) { toast(kind, text); },
    hasCoffee: function () { return Economy.hasCoffee(State.s); },
    canWork: function () { return Economy.canWork(State.s); },
    buyCoffee: function () {
      var r = Economy.buyCoffee(State.s);
      if (!r.ok) { toast(Economy.hasCoffee(State.s) ? 'info' : 'bad', r.why); return r; }
      State.save(); renderStats(); Tutorial.event('coffee'); toast('ok', 'Kaffee gekauft: −' + euro(Economy.COFFEE_PRICE) + '. Jetzt darfst du am Tisch arbeiten.'); return r;
    },
    sleep: function () {
      var left = Economy.dayEnd(State.s) - State.s.minutes;
      function doSleep() { State.spendTime(Math.max(1, left)); pullEvents(); dayOver('Guten Morgen! Tag ' + State.s.day + ' beginnt.'); }
      if (left > 90) api3d.talk({ figure: 'spieler', name: 'Du', text: 'Es ist erst ' + State.clock().split('· ')[1] + ' Uhr. Jetzt schlafen und den Rest des Tages verschenken?', actions: [{ label: 'Ja, schlafen', run: function () { closeWindow(); doSleep(); } }] });
      else doSleep();
    },
    goTo: function (id, spawn) { return enterLocation(id, spawn || 'default'); }
  };

  function renderNav() {
    var v = (State.s.view || {}).name, nav = document.getElementById('nav');
    if (WM) { nav.textContent = ''; return; }
    nav.textContent = '';
    [['home', 'Job-Board'], ['shop', 'Shop'], ['handbuch', 'Handbuch']].forEach(function (n) {
      var active = n[0] === 'home' ? (v === 'home' || v === 'task') : v === n[0];
      nav.appendChild(el('button', { class: 'btn small' + (active ? ' active' : ' ghost'), 'aria-current': active ? 'page' : 'false', onclick: function () { go(n[0] === 'shop' ? { name: 'shop', tab: 'skills' } : n[0] === 'handbuch' ? { name: 'handbuch' } : { name: 'home' }); } }, [n[1]]));
    });
  }
  function bannerNodes() {
    return banners.map(function (b, i) {
      return el('div', { class: 'msg ' + (b.kind === 'ok' ? 'ok' : b.kind === 'bad' ? 'bad' : 'info') + ' banner', role: 'status' }, [
        el('span', {}, [b.text]), el('button', { class: 'btn small ghost', 'aria-label': 'Meldung schließen', onclick: function () { banners.splice(i, 1); render(true); } }, ['×'])
      ]);
    });
  }

  function render(keepScroll) {
    var y = app.scrollTop || window.scrollY;
    pullEvents();
    renderStats(); renderNav();
    if (WM && !winOpen) { app.textContent = ''; return; }
    var v = State.s.view || { name: 'home' };
    var key = v.name + (v.id || '') + (v.tab || '');
    app.textContent = '';
    var node;
    if (v.name === 'task') node = renderTask(v.id);
    else if (v.name === 'shop') node = Shop.render(v, api);
    else if (v.name === 'map') node = renderMap();
    else if (v.name === 'talk') node = renderTalk();
    else if (v.name === 'handbuch') node = renderHandbuch();
    else if (v.name === 'lesson') node = renderLesson();
    else if (v.name === 'notebook') node = renderNotebook();
    else node = (WM && !Economy.canWork(State.s)) ? el('div', {}, [el('h1', {}, ['Hier kannst du nicht arbeiten']), el('p', {}, ['Arbeite im Café (mit Kaffee) oder in deinem Büro.'])]) : renderHome();
    app.classList.toggle('wide', v.name === 'task' && State.s.bookOpen !== false);
    app.appendChild(node);
    if (WM) node.insertBefore(el('button', { class: 'btn small ghost wclose', onclick: closeWindow, 'aria-label': 'Fenster schließen' }, ['✕ Schließen (Esc)']), node.firstChild);
    var bn = bannerNodes(), anchor = node.firstChild;
    bn.forEach(function (b) { node.insertBefore(b, anchor); });
    if (v.name === 'task' && key !== lastKey) { var tk = Tasks.get(v.id); if (tk && !tk.figure) Tutorial.event('task-open'); }
    if (key !== lastKey || WM) Fx.enter(node);
    lastKey = key;
    runPending(node);
    if (keepScroll) { window.scrollTo(0, y); app.scrollTop = y; }
  }

  document.getElementById('btn-reset').addEventListener('click', function () {
    if (confirm('Spielstand wirklich löschen und neu beginnen?')) {
      State.reset(); draftMem = {}; banners = []; hero = null; pendingGreet = true; talkCtx = null; mapSel = null;
      if (WM) { showWindow(false); enterLocation('wohnung', 'default'); }
      render();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (WM && winOpen && e.key === 'Escape') { if (document.querySelector('.modal-back')) return; closeWindow(); e.preventDefault(); }
  });
  var hudMap = document.getElementById('hud-map'); if (hudMap) hudMap.addEventListener('click', function () { if (WM && !winOpen) api3d.openMap(); });
  var hudNotes = document.getElementById('hud-notes'); if (hudNotes) hudNotes.addEventListener('click', function () { if (WM && !winOpen) api3d.openNotebook(); });
  var hudSound = document.getElementById('hud-sound'); if (hudSound) { hudSound.textContent = Sound.isMuted() ? '🔇' : '🔊'; hudSound.addEventListener('click', function () { hudSound.textContent = Sound.toggle() ? '🔇' : '🔊'; Sound.play('click'); }); }
  var hudHelp = document.getElementById('hud-help'); if (hudHelp) hudHelp.addEventListener('click', function () { Tutorial.start(); });
  var hudBook = document.getElementById('hud-book'); if (hudBook) hudBook.addEventListener('click', function () { if (WM && !winOpen) api3d.openHandbuch(); });

  // Start: alle Plugins initialisieren, Aufgaben einsammeln und prüfen, dann 3D-Welt (falls WebGL) oder 2D-Notlösung
  State.load();
  Promise.all(Tasks.typeIds().map(function (id) { return Tasks.plugin(id).init(); }).concat(window.Models ? [Models.ready] : [])).then(function () {
    Tasks.typeIds().forEach(function (id) {
      var p = Tasks.plugin(id);
      if (!p.tasks) return;
      var rejected = Tasks.add(p.tasks());
      if (rejected.length) console.warn('Aufgaben abgelehnt (' + id + '):', rejected);
    });
    WM = !!(window.World && window.THREE && World.init(document.getElementById('world')));
    if (!WM) { State.s.view = { name: 'home' }; render(); return; }
    document.body.classList.add('has-world');
    World.setApi(api3d);
    function startOpts() {
      return {
        hasSave: State.hasSave(),
        onContinue: function () { Menu.close(); },
        onNew: function (o) {
          State.reset(); var s = State.s; s.avatar = o.avatar; s.pname = o.name; s.difficulty = o.difficulty; s.money = Economy.DIFF[o.difficulty].start; s.started = true; State.save(); Menu.reloadIntoGame();
        }
      };
    }
    function applyAvatar() { Characters.setPlayer(Avatars.figure2D(State.s.avatar)); World.setAvatar(Avatars.presetName(State.s.avatar)); }
    applyAvatar();
    if (!Menu.consumeSkip() || (!State.s.started && !State.hasSave())) Menu.showTitle(startOpts());
    var openPause = function () { if (winOpen || Menu.isOpen() || document.querySelector('.modal-back')) return; Menu.showPause({ startOpts: startOpts }); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !winOpen && !Menu.isOpen() && !document.querySelector('.modal-back')) { openPause(); e.preventDefault(); } else if (e.key === 'Escape' && Menu.isOpen() && document.getElementById('menu-pause')) { Menu.close(); } });
    var hm = document.getElementById('hud-menu'); if (hm) hm.addEventListener('click', openPause);
    var start = State.s.loc && World.location(State.s.loc) ? State.s.loc : 'wohnung';
    if (start === 'buero' && !State.s.office) start = 'wohnung';
    State.s.loc = start; State.s.view = { name: 'home' };
    render();
    World.enter(start, 'default').then(function () {
      if (Menu.isOpen()) World.setPaused(true);
      if (State.s.dayOver) dayOver('Feierabend! Du gehst nach Hause.');
      Tutorial.boot();
    });
  }, function (e) { app.textContent = 'Start fehlgeschlagen: ' + e; });
})();

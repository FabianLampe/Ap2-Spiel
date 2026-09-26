// Figuren-Gedächtnis: Figuren erklären Themen (Lektion), der Spieler markiert Sätze im begrenzten Notizbuch,
// Tage später stellen sie eine Frage dazu. Richtig: Geld + bessere Beziehung. Falsch: Beziehung sinkt + Nachzahlung.
(function () {
  var REWARD = { 1: 30, 2: 60, 3: 100 }, FINE = { 1: 15, 2: 30, 3: 50 };
  var REL_START = 50;
  var NAMES = { kalle: 'Chef Kalle', finanzamt: 'Frau Pfennig', bank: 'Herr Zinsmann', startup: 'Lennox', datenschutz: 'Dr. Blattner', barista: 'der Barista', makler: 'Makler Schlüssel', verkaeufer: 'Herr Rost' };

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function S() { return State.s; }
  function lessons() { return (window.GAME_DATA && GAME_DATA.lektionen) || []; }

  var Q = {
    NAMES: NAMES,
    name: function (fig) { return NAMES[fig] || fig; },

    // ---------- Beziehung ----------
    rel: function (fig) { var r = S().rel[fig]; return r === undefined ? REL_START : r; },
    addRel: function (fig, d) { S().rel[fig] = Math.max(0, Math.min(100, Q.rel(fig) + d)); },
    // Belohnung skaliert mit der Beziehung: 0 -> 70 %, 50 -> 100 %, 100 -> 130 %
    rewardFor: function (task) { return Math.round(REWARD[task.difficulty] * (0.7 + Q.rel(task.figure) / 100 * 0.6)); },
    fineFor: function (task) { return Math.round(FINE[task.difficulty] * Economy.diff(S()).fine); },

    // ---------- Notizbuch ----------
    cap: function () { return Economy.noteCap(S()); },
    hasNote: function (key) { return S().notes.some(function (n) { return n.key === key; }); },
    addNote: function (key, text, fig, title) {
      if (Q.hasNote(key)) return { ok: false, why: 'Steht schon im Notizbuch.' };
      if (S().notes.length >= Q.cap()) return { ok: false, why: 'Das Notizbuch ist voll. Streiche eine Notiz oder erweitere es im Lernzentrum.' };
      S().notes.push({ key: key, text: text, figure: fig, title: title, day: S().day }); return { ok: true };
    },
    removeNote: function (key) { S().notes = S().notes.filter(function (n) { return n.key !== key; }); },

    // ---------- Ablauf ----------
    lessonsAvailable: function (fig) { return lessons().filter(function (l) { return l.figure === fig && !S().taught[l.concept] && Q.questionsFor(l.concept).length; }); },
    questionsFor: function (concept) { return Tasks.all().filter(function (t) { return t.concept === concept && !S().done[t.id] && !S().failed[t.id]; }); },
    dueFor: function (fig) { return S().pending.filter(function (p) { return p.figure === fig && p.dueDay <= S().day; }); },
    pendingCount: function (fig) { return S().pending.filter(function (p) { return p.figure === fig; }).length; },

    // Was tut die Figur gerade? { kind: 'question', taskId } | { kind: 'lesson', lesson } | null
    next: function (fig) {
      var due = Q.dueFor(fig); if (due.length) return { kind: 'question', taskId: due[0].taskId };
      if (S().lastLesson[fig] !== S().day) { var l = Q.lessonsAvailable(fig)[0]; if (l) return { kind: 'lesson', lesson: l }; }
      return null;
    },
    // Text am Interaktionspunkt
    label: function (fig, base) {
      if (!window.State || !State.s.notes) return base;
      var n = Q.next(fig);
      return n ? base + (n.kind === 'question' ? '  (hat eine Frage an dich)' : '  (will dir etwas erklären)') : base;
    },

    finishLesson: function (lesson) {
      var s = S(); s.taught[lesson.concept] = s.day; s.lastLesson[lesson.figure] = s.day;
      var qs = Q.questionsFor(lesson.concept);
      if (qs.length) {
        var q = qs[Math.floor(Math.random() * qs.length)];
        s.pending.push({ taskId: q.id, concept: lesson.concept, figure: lesson.figure, dueDay: s.day + 1 + Math.floor(Math.random() * 3) });
        return q;
      }
      return null;
    },
    answered: function (task, ok) {
      var s = S(); s.pending = s.pending.filter(function (p) { return p.taskId !== task.id; });
      if (ok) { s.done[task.id] = true; var pay = Q.rewardFor(task); s.money += pay; Q.addRel(task.figure, 6); return { pay: pay }; }
      s.failed[task.id] = true; var fine = Q.fineFor(task); s.money -= fine; Q.addRel(task.figure, -8); return { fine: fine };
    },
    // Neuer Tag: Figuren werden ungeduldig, wenn du ihre Fragen liegen lässt
    onNewDay: function (s) {
      var late = {};
      s.pending.forEach(function (p) { if (s.day - p.dueDay >= 2) late[p.figure] = (late[p.figure] || 0) + 1; });
      Object.keys(late).forEach(function (f) {
        s.rel[f] = Math.max(0, (s.rel[f] === undefined ? REL_START : s.rel[f]) - 3 * late[f]);
        s.events.push({ kind: 'bad', text: Q.name(f) + ' wartet schon länger auf deine Antwort. Die Beziehung leidet.' });
      });
    },

    // ---------- Oberflächen ----------
    // ctx: { lesson, taken: {}, api: { rerender, close } }
    renderLesson: function (ctx) {
      var l = ctx.lesson, wrap = el('div');
      wrap.appendChild(el('h1', {}, [l.title]));
      var fig = Characters.make(l.figure, { size: 130 }), bub = el('div', { class: 'bubble' }, ['']);
      wrap.appendChild(el('div', { class: 'card mentor', style: 'margin:12px 0;align-items:center' }, [fig, bub]));
      Fx.say(bub, fig, Q.name(l.figure) + ' erklärt: „' + l.title + '“. Was du dir merken willst, kannst du ins Notizbuch übernehmen, aber der Platz ist begrenzt.');
      var cap = el('p', { class: 'sub', id: 'notecap' }, ['Notizbuch: ' + S().notes.length + ' von ' + Q.cap() + ' Plätzen belegt.']);
      wrap.appendChild(cap);
      l.lines.forEach(function (text, i) {
        var key = l.concept + '#' + i, btn;
        function label() { btn.textContent = Q.hasNote(key) ? '✔ Notiert' : '✎ Notieren'; }
        btn = el('button', { class: 'btn small ' + (Q.hasNote(key) ? 'green' : ''), onclick: function () {
          if (Q.hasNote(key)) { Q.removeNote(key); } else { var r = Q.addNote(key, text, l.figure, l.title); if (!r.ok) ctx.api.toast('info', r.why); else if (window.Sound) Sound.play('note'); }
          State.save(); label(); btn.className = 'btn small ' + (Q.hasNote(key) ? 'green' : ''); cap.textContent = 'Notizbuch: ' + S().notes.length + ' von ' + Q.cap() + ' Plätzen belegt.';
        } }, ['']);
        label();
        wrap.appendChild(el('div', { class: 'card lesson-line', style: 'display:flex;gap:12px;align-items:center;margin-bottom:8px' }, [el('span', { style: 'flex:1' }, [text]), btn]));
      });
      wrap.appendChild(el('div', { class: 'row', style: 'margin-top:12px' }, [
        el('button', { class: 'btn', onclick: function () { ctx.api.finish(l); } }, ['Verstanden']),
        el('span', { class: 'sub', style: 'margin:0' }, ['Achtung: Wer nichts aufschreibt, weiß in ein paar Tagen vieles nicht mehr.'])
      ]));
      return wrap;
    },

    // Notizbuch als Tab im Referenzbuch und als eigenes Fenster
    notebookNode: function (rerender) {
      var wrap = el('div'), s = S();
      wrap.appendChild(el('p', { class: 'sub' }, ['Deine Notizen aus Gesprächen: ' + s.notes.length + ' von ' + Q.cap() + ' Plätzen belegt.']));
      var bar = el('div', { class: 'meter' }, [el('div', { class: 'meter-fill', style: 'width:' + Math.min(100, Math.round(100 * s.notes.length / Q.cap())) + '%' })]);
      wrap.appendChild(bar);
      if (!s.notes.length) wrap.appendChild(el('p', { class: 'sub' }, ['Noch nichts notiert. Hör den Figuren zu und übernimm wichtige Sätze.']));
      var groups = {};
      s.notes.forEach(function (n) { (groups[n.title] = groups[n.title] || []).push(n); });
      Object.keys(groups).forEach(function (t) {
        wrap.appendChild(el('h3', { style: 'margin:12px 0 4px' }, [t + ' · ' + Q.name(groups[t][0].figure)]));
        groups[t].forEach(function (n) {
          wrap.appendChild(el('div', { class: 'note' }, [el('span', {}, [n.text]), el('button', { class: 'btn small ghost', 'aria-label': 'Notiz streichen', title: 'Streichen', onclick: function () { Q.removeNote(n.key); State.save(); rerender(); } }, ['✕'])]));
        });
      });
      return wrap;
    },
    notebookTab: function () { return { id: 'notes', label: 'Notizbuch', render: function (o, rr) { return Q.notebookNode(rr); } }; }
  };

  window.Quests = Q;
})();

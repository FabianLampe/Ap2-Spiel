// Shop-Ansicht (Skills, Wohnung, Auto, Finanzen) und der Dialog "Dafür brauchst du erst den Skill …"
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function euro(n) { return n.toLocaleString('de-DE') + ' €'; }

  // Wie viele noch offene Aufträge brauchen diesen Skill?
  function neededBy(id) {
    return Tasks.all().filter(function (t) { return !State.s.done[t.id] && (t.skills || []).indexOf(id) >= 0; }).length;
  }

  // ---------- Kauf-Aktionen: führen aus, speichern, melden an den Spielkern ----------
  function buySkill(id, api, btn) {
    var name = Tasks.skill(id).name, r = Economy.buySkill(State.s, id);
    if (!r.ok) { api.toast('bad', r.why); return r; }
    State.save(); api.bought('Skill gekauft: ' + name + '.', btn);
    // Nach dem Kauf erklärt Kalle den neuen Befehl im Erklärfilm
    if (window.Erklaer && Erklaer.has(id)) setTimeout(function () { Erklaer.play(id); }, 900);
    return r;
  }

  // ---------- Shop ----------
  function skillCard(k, api) {
    var s = State.s, owned = Economy.owns(s, k.id), c = Economy.canBuySkill(s, k.id), n = neededBy(k.id);
    var status = owned ? el('span', { class: 'badge' }, [k.starter ? '✔ von Anfang an' : '✔ gekauft'])
      : el('span', { class: 'badge d2' }, [euro(k.cost)]);
    var btn = null;
    if (!owned) {
      btn = el('button', { class: 'btn small' + (c.ok ? '' : ' ghost'), onclick: function () { buySkill(k.id, api, btn); } }, ['Kaufen']);
      if (!c.ok) btn.disabled = true;
    }
    var film = window.Erklaer ? Erklaer.button(k.id) : null;
    return el('div', { class: 'card skillcard' + (owned ? ' owned' : '') }, [
      el('div', { class: 'row' }, [el('b', {}, [k.name]), el('span', { class: 'spacer' }), status]),
      el('p', { class: 'sub', style: 'margin:6px 0' }, [k.desc]),
      el('p', { class: 'sub', style: 'margin:0 0 8px;font-size:13px' }, [n ? n + ' offene(r) Auftrag/Aufträge brauchen das.' : (owned ? '' : 'Aktuell braucht kein offener Auftrag das.')]),
      el('div', { class: 'row' }, [btn || '', film || '', btn && !c.ok ? el('span', { class: 'sub', style: 'font-size:13px;margin:0' }, [c.why]) : ''])
    ]);
  }

  function tierCard(t, cur, actions) {
    var cls = 'card tier' + (t.tier === cur ? ' current' : '');
    return el('div', { class: cls }, actions);
  }

  function skillsTab(api) {
    var wrap = el('div');
    var groups = {};
    Tasks.skills().forEach(function (k) { (groups[k.group] = groups[k.group] || []).push(k); });
    Object.keys(groups).forEach(function (g) {
      wrap.appendChild(el('h2', { style: 'margin:20px 0 10px' }, [g]));
      var list = groups[g].slice().sort(function (a, b) { return a.cost - b.cost; });
      wrap.appendChild(el('div', { class: 'grid' }, list.map(function (k) { return skillCard(k, api); })));
    });
    return wrap;
  }

  function homeTab(api) {
    var s = State.s, grid = el('div', { class: 'grid' });
    Economy.HOMES.forEach(function (h) {
      if (!h) return;
      var isCur = h.tier === s.home, isNext = h.tier === s.home + 1, done = h.tier < s.home;
      var btn = null;
      if (isNext) {
        btn = el('button', { class: 'btn' + (s.money >= h.price ? '' : ' ghost'), onclick: function () {
          var r = Economy.upgradeHome(s); if (!r.ok) { api.toast('bad', r.why); return; }
          State.save(); api.bought('Umgezogen: ' + h.name + '!', btn);
        } }, ['Einziehen für ' + euro(h.price)]);
        if (s.money < h.price) btn.disabled = true;
      }
      grid.appendChild(el('div', { class: 'card tier' + (isCur ? ' current' : '') + (h.tier > s.home + 1 ? ' far' : '') }, [
        el('div', { class: 'row' }, [el('b', {}, ['Stufe ' + h.tier + ': ' + h.name]), el('span', { class: 'spacer' }), isCur ? el('span', { class: 'badge' }, ['Du wohnst hier']) : (done ? el('span', { class: 'badge' }, ['✔ hinter dir']) : el('span', { class: 'badge d2' }, [euro(h.price)]))]),
        el('p', { class: 'sub', style: 'margin:8px 0' }, [h.desc]),
        el('ul', { class: 'facts' }, [
          el('li', {}, ['Miete: ' + euro(Math.round(h.rent * Economy.diff(State.s).rent)) + ' pro Woche']),
          el('li', {}, ['Arbeitsende: ' + h.dayEnd + ':00 Uhr']),
          el('li', {}, [h.timeFactor === 1 ? 'Aufträge dauern normal lang' : 'Aufträge dauern ' + Math.round((1 - h.timeFactor) * 100) + ' % kürzer'])
        ]),
        btn || el('span', { class: 'sub', style: 'margin:0;font-size:13px' }, [isCur || done ? '' : 'Erst die vorherige Stufe erreichen.'])
      ]));
    });
    return grid;
  }

  function carTab(api) {
    var s = State.s, grid = el('div', { class: 'grid' });
    Economy.CARS.forEach(function (c) {
      var isCur = c.tier === s.car, better = c.tier > s.car, btn = null;
      if (better) {
        btn = el('button', { class: 'btn' + (s.money >= c.price ? '' : ' ghost'), onclick: function () {
          var r = Economy.buyCar(s, c.tier); if (!r.ok) { api.toast('bad', r.why); return; }
          State.save(); api.bought('Neues Auto: ' + c.name + '.', btn);
        } }, ['Kaufen für ' + euro(c.price)]);
        if (s.money < c.price) btn.disabled = true;
      }
      grid.appendChild(el('div', { class: 'card tier' + (isCur ? ' current' : '') }, [
        el('div', { class: 'row' }, [el('b', {}, [c.name]), el('span', { class: 'spacer' }), isCur ? el('span', { class: 'badge' }, ['Dein Auto']) : (better ? el('span', { class: 'badge d2' }, [euro(c.price)]) : el('span'))]),
        el('p', { class: 'sub', style: 'margin:8px 0' }, [c.desc]),
        el('ul', { class: 'facts' }, [el('li', {}, ['Honorar: ' + (c.bonus ? '+' + Math.round(c.bonus * 100) + ' %' : 'normal')]), el('li', {}, ['Unterhalt: ' + (c.upkeep ? euro(c.upkeep) + ' pro Woche' : 'keiner')])]),
        btn || el('span')
      ]));
    });
    return grid;
  }

  function officeTab(api) {
    var s = State.s, o = Economy.OFFICE, has = s.office, btn;
    if (has) btn = el('button', { class: 'btn ghost', onclick: function () { Economy.cancelOffice(s); State.save(); api.bought('Büro gekündigt. Du arbeitest wieder im Café.', null); } }, ['Büro kündigen']);
    else {
      btn = el('button', { class: 'btn' + (s.money >= o.setup ? '' : ' ghost'), onclick: function () {
        var r = Economy.rentOffice(s); if (!r.ok) { api.toast('bad', r.why); return; }
        State.save(); api.bought('Büro gemietet! Ab jetzt kannst du dort arbeiten.', btn);
      } }, ['Mieten (Einrichtung ' + euro(o.setup) + ')']);
      if (s.money < o.setup) btn.disabled = true;
    }
    return el('div', { class: 'grid' }, [el('div', { class: 'card tier' + (has ? ' current' : '') }, [
      el('div', { class: 'row' }, [el('b', {}, [o.name]), el('span', { class: 'spacer' }), has ? el('span', { class: 'badge' }, ['Gemietet']) : el('span', { class: 'badge d2' }, [euro(o.rent) + ' pro Woche'])]),
      el('p', { class: 'sub', style: 'margin:8px 0' }, [o.desc]),
      el('ul', { class: 'facts' }, [el('li', {}, ['Miete: ' + euro(Math.round(o.rent * Economy.diff(State.s).rent)) + ' pro Woche, dazu einmalig ' + euro(o.setup) + ' Einrichtung']), el('li', {}, ['Kein Kaffee nötig (spart ' + euro(Economy.COFFEE_PRICE) + ' am Tag)']), el('li', {}, ['Aufträge im Büro sind 10 % schneller'])]),
      btn
    ])]);
  }

  function notesTab(api) {
    var s = State.s, lvl = s.noteLevel || 0, grid = el('div', { class: 'grid' });
    Economy.NOTEBOOK.forEach(function (n, i) {
      var cur = i === lvl, next = i === lvl + 1, btn = null;
      if (next) {
        btn = el('button', { class: 'btn' + (s.money >= n.price ? '' : ' ghost'), onclick: function () {
          var r = Economy.upgradeNotebook(s); if (!r.ok) { api.toast('bad', r.why); return; }
          State.save(); api.bought('Neues Notizbuch: ' + n.name + ' (' + n.cap + ' Plätze).', btn);
        } }, ['Kaufen für ' + euro(n.price)]);
        if (s.money < n.price) btn.disabled = true;
      }
      grid.appendChild(el('div', { class: 'card tier' + (cur ? ' current' : '') + (i > lvl + 1 ? ' far' : '') }, [
        el('div', { class: 'row' }, [el('b', {}, [n.name]), el('span', { class: 'spacer' }), cur ? el('span', { class: 'badge' }, ['Dein Notizbuch']) : (i < lvl ? el('span', { class: 'badge' }, ['✔']) : el('span', { class: 'badge d2' }, [euro(n.price)]))]),
        el('p', { class: 'sub', style: 'margin:8px 0' }, [n.cap + ' Notizen. Was du hier nicht aufschreibst, vergisst du, und Figuren fragen dich Tage später ab.']),
        btn || el('span')
      ]));
    });
    return grid;
  }

  function financeTab() {
    var s = State.s, b = Economy.weeklyBill(s), h = Economy.home(s), c = Economy.car(s), d = Economy.daysUntilBill(s);
    var rows = [['Miete (' + h.name + ')', b.rent], ['Nebenkosten (Strom, Internet)', b.fixed]];
    if (b.car) rows.push(['Auto (' + c.name + ')', b.car]);
    if (b.office) rows.push(['Büro', b.office]);
    var tb = el('table', { class: 'data', style: 'font-size:15px' }, [el('tbody', {}, rows.map(function (r) { return el('tr', {}, [el('td', {}, [r[0]]), el('td', { style: 'text-align:right' }, [euro(r[1])])]); }).concat([el('tr', {}, [el('th', {}, ['Summe pro Woche']), el('th', { style: 'text-align:right' }, [euro(b.total)])])]))]);
    var warn = s.missedRent ? el('div', { class: 'msg bad' }, ['Du hast ' + s.missedRent + ' Rechnung(en) nicht bezahlt. Bei der nächsten verpassten Rechnung musst du umziehen.']) : el('span');
    return el('div', { class: 'card' }, [
      el('h2', {}, ['Wochenrechnung']), tb,
      el('p', {}, ['Nächste Rechnung in ' + d + (d === 1 ? ' Tag' : ' Tagen') + '. Dein Kontostand: ' + euro(s.money) + (s.money >= b.total ? '' : ' (reicht aktuell nicht!)')]),
      warn
    ]);
  }

  var TABS = [['skills', 'Skills'], ['notes', 'Notizbuch'], ['home', 'Wohnung'], ['office', 'Büro'], ['car', 'Auto'], ['finance', 'Finanzen']];
  var TITLES = { skills: 'Skills', notes: 'Notizbuch erweitern', home: 'Wohnung', office: 'Büro mieten', car: 'Auto', finance: 'Finanzen und Rechnungen' };

  function render(view, api) {
    var tab = view.tab || 'skills', wrap = el('div');
    wrap.appendChild(el('h1', {}, [view.only ? TITLES[tab] : 'Shop']));
    if (!view.only) {
      wrap.appendChild(el('p', { class: 'sub' }, ['Geld ausgeben, um besser zu werden: Skills schalten Aufträge frei, eine bessere Wohnung gibt dir mehr Zeit, ein Auto mehr Honorar.']));
      var tabs = el('div', { class: 'filter' });
      TABS.forEach(function (t) { tabs.appendChild(el('button', { class: 'btn small' + (tab === t[0] ? ' active' : ' ghost'), onclick: function () { api.setTab(t[0]); } }, [t[1]])); });
      wrap.appendChild(tabs);
    }
    wrap.appendChild(tab === 'home' ? homeTab(api) : tab === 'car' ? carTab(api) : tab === 'office' ? officeTab(api) : tab === 'notes' ? notesTab(api) : tab === 'finance' ? financeTab() : skillsTab(api));
    return wrap;
  }

  // Knopf zum passenden Handbuch-Eintrag (Eintrag trägt den Skill in `skill`)
  function handbookLink(skillId, api) {
    if (!window.Reference || !api.openHandbuch) return '';
    var entry = null;
    Reference.data().chapters.forEach(function (c) { c.entries.forEach(function (e) { if (!entry && e.skill === skillId) entry = e; }); });
    if (!entry) return '';
    return el('button', { class: 'btn small ghost', onclick: function () { closeModal(); Reference.state.tab = 'befehle'; Reference.state.entry = entry.id; Reference.state.taskKey = ''; api.openHandbuch(); } }, ['📖 Im Handbuch']);
  }

  // ---------- Dialog: "Dafür brauchst du erst …" ----------
  var openModal = null;
  function closeModal() { if (openModal) { openModal.remove(); openModal = null; document.removeEventListener('keydown', onKey); } }
  function onKey(e) { if (e.key === 'Escape') closeModal(); }

  function missingDialog(task, api) {
    closeModal();
    var back = el('div', { class: 'modal-back', onclick: function (e) { if (e.target === back) closeModal(); } });
    var box = el('div', { class: 'modal card', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Skill fehlt' });
    back.appendChild(box); document.body.appendChild(back); openModal = back;
    document.addEventListener('keydown', onKey);

    function draw() {
      box.textContent = '';
      var missing = Economy.missingSkills(State.s, task);
      box.appendChild(el('h2', {}, [missing.length ? 'Dafür brauchst du erst einen Skill' : 'Jetzt kannst du den Auftrag machen!']));
      box.appendChild(el('p', { class: 'sub' }, ['Auftrag: ' + task.title]));
      missing.forEach(function (id) {
        var k = Tasks.skill(id), c = Economy.canBuySkill(State.s, id), here = !api.canBuyHere || api.canBuyHere();
        var btn = here ? el('button', { class: 'btn small', onclick: function () { var r = buySkill(id, api, btn); if (r.ok) draw(); } }, ['Kaufen für ' + euro(k.cost)]) : el('span', { class: 'sub', style: 'margin:0;font-weight:700' }, ['Erhältlich im Lernzentrum Datenwerk (Karte)']);
        if (here && !c.ok) btn.disabled = true;
        box.appendChild(el('div', { class: 'card skillcard', style: 'margin-bottom:10px' }, [
          el('div', { class: 'row' }, [el('b', {}, [k.name]), el('span', { class: 'spacer' }), el('span', { class: 'badge d2' }, [euro(k.cost)])]),
          el('p', { class: 'sub', style: 'margin:6px 0' }, [k.desc]),
          el('div', { class: 'row' }, [btn, (c.ok || !here) ? '' : el('span', { class: 'sub', style: 'font-size:13px;margin:0' }, [c.why]), handbookLink(id, api)])
        ]));
      });
      var row = el('div', { class: 'row', style: 'margin-top:12px' });
      if (!missing.length) row.appendChild(el('button', { class: 'btn green', onclick: function () { closeModal(); api.open(task); } }, ['Auftrag starten']));
      row.appendChild(el('button', { class: 'btn ghost', onclick: closeModal }, [missing.length ? 'Später' : 'Zurück']));
      row.appendChild(el('span', { class: 'spacer' }));
      row.appendChild(el('button', { class: 'btn small ghost', onclick: function () { closeModal(); api.openShop(); } }, [(api.canBuyHere && !api.canBuyHere()) ? 'Zur Karte' : 'Zum Shop']));
      box.appendChild(row);
      // Fokus in den Dialog, damit Tastatur und Screenreader ihn erreichen
      var first = box.querySelector('button:not([disabled])'); if (first) first.focus();
    }
    draw();
  }

  window.Shop = { render: render, missingDialog: missingDialog, closeModal: closeModal };
})();

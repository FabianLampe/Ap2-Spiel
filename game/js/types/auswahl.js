// Aufgabentyp "auswahl": Multiple Choice (eine oder mehrere richtige Antworten).
// Vorgesehen für Fragen von Figuren (WiSo/Kompass) und Wissensfragen.
// payload: { options: [{ text, correct: true|false, why?: 'Begründung' }], multi?: true, explanation?: 'Musterlösung' }
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') n.className = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  // Feste, aber gemischte Reihenfolge je Aufgabe (damit die richtige Antwort nicht immer oben steht)
  function order(t) {
    var idx = t.payload.options.map(function (_, i) { return i; });
    var seed = 0; for (var i = 0; i < t.id.length; i++) seed = (seed * 31 + t.id.charCodeAt(i)) % 100003;
    for (var k = idx.length - 1; k > 0; k--) { seed = (seed * 9301 + 49297) % 233280; var j = seed % (k + 1), tmp = idx[k]; idx[k] = idx[j]; idx[j] = tmp; }
    return idx;
  }

  Tasks.registerType({
    id: 'auswahl',
    init: function () { return Promise.resolve(); },
    // WiSo-/Kompass-Fragen der Figuren (Daten aus data/kompass-mc/*.js)
    tasks: function () { return (window.GAME_DATA && GAME_DATA.kompassTasks) || []; },
    validate: function (t) {
      var o = t.payload.options, errs = [];
      if (!Array.isArray(o) || o.length < 2) return ['Mindestens 2 Antwortoptionen nötig'];
      var right = o.filter(function (x) { return x.correct; }).length;
      if (right < 1) errs.push('Mindestens eine richtige Option nötig');
      if (!t.payload.multi && right !== 1) errs.push('Bei Einfachauswahl genau eine richtige Option');
      return errs;
    },
    renderInfo: function () { return document.createElement('div'); },

    // Antwort ist eine Liste gewählter Optionsindizes (bezogen auf payload.options)
    render: function (t, ctx) {
      var chosen = (ctx.draft && Array.isArray(ctx.draft)) ? ctx.draft.slice() : [];
      var multi = !!t.payload.multi, box = el('div');
      box.appendChild(el('p', { class: 'sub' }, [multi ? 'Mehrere Antworten können richtig sein.' : 'Wähle eine Antwort.']));
      order(t).forEach(function (i) {
        var inp = el('input', { type: multi ? 'checkbox' : 'radio', name: 'opt', id: 'opt' + i });
        inp.checked = chosen.indexOf(i) >= 0;
        inp.addEventListener('change', function () {
          if (multi) { chosen = inp.checked ? chosen.concat([i]) : chosen.filter(function (x) { return x !== i; }); }
          else chosen = [i];
          ctx.setDraft(chosen);
        });
        var label = el('label', { for: 'opt' + i, style: 'display:block;margin:6px 0;cursor:pointer' }, [inp, ' ' + t.payload.options[i].text]);
        box.appendChild(label);
      });
      return { node: box, getAnswer: function () { return chosen; } };
    },

    grade: function (t, answer) {
      var chosen = Array.isArray(answer) ? answer : [];
      if (!chosen.length) return { ok: false, hint: 'Wähle zuerst eine Antwort.', empty: true };
      var o = t.payload.options, wrong = [], missing = 0;
      o.forEach(function (x, i) {
        var picked = chosen.indexOf(i) >= 0;
        if (picked && !x.correct) wrong.push(x);
        if (!picked && x.correct) missing++;
      });
      if (!wrong.length && !missing) return { ok: true };
      var why = wrong.filter(function (x) { return x.why; }).map(function (x) { return x.why; })[0];
      return { ok: false, hint: why || (t.payload.multi ? 'Nicht alle Antworten stimmen oder es fehlen richtige.' : 'Das ist nicht die richtige Antwort.') };
    },
    solutionText: function (t) {
      var right = t.payload.options.filter(function (x) { return x.correct; }).map(function (x) { return '• ' + x.text; }).join('\n');
      return right + (t.payload.explanation ? '\n\n' + t.payload.explanation : '');
    }
  });
})();

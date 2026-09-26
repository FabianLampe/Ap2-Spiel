// Effekte und Stimmungen. Alles über die Web Animations API, respektiert "Bewegung reduzieren".
(function () {
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  var layer = null;
  function getLayer() {
    if (!layer || !layer.isConnected) { layer = document.createElement('div'); layer.className = 'fx-layer'; document.body.appendChild(layer); }
    return layer;
  }
  function center(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function fly(piece, from, to, opts) {
    var a = piece.animate([
      { transform: 'translate(' + from.x + 'px,' + from.y + 'px) scale(.4)', opacity: 0 },
      { transform: 'translate(' + (from.x + (opts.dx || 0)) + 'px,' + (from.y + (opts.dy || -60)) + 'px) scale(1.1)', opacity: 1, offset: 0.3 },
      { transform: 'translate(' + to.x + 'px,' + to.y + 'px) scale(.6)', opacity: 0.9 }
    ], { duration: opts.duration, delay: opts.delay || 0, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'both' });
    a.onfinish = function () { piece.remove(); if (opts.done) opts.done(); };
  }

  var Fx = {
    reduced: reduced,

    // Stimmung: 'happy' | 'sad' | 'thinking' (schließen sich gegenseitig aus). 'talking' überlagert sie.
    // mood(fig, null) setzt alles zurück. ms: nach so vielen Millisekunden zurück (0 = bleibt)
    mood: function (fig, mood, ms) {
      if (!fig) return;
      var excl = ['is-happy', 'is-sad', 'is-thinking'];
      if (mood === 'talking') {
        fig.classList.add('is-talking');
        clearTimeout(fig._talkT);
        if (ms) fig._talkT = setTimeout(function () { fig.classList.remove('is-talking'); }, ms);
        return;
      }
      excl.forEach(function (c) { fig.classList.remove(c); });
      if (!mood) { fig.classList.remove('is-talking'); return; }
      void fig.getBoundingClientRect();   // Neustart der Animation erzwingen
      fig.classList.add('is-' + mood);
      clearTimeout(fig._moodT);
      if (ms) fig._moodT = setTimeout(function () { fig.classList.remove('is-' + mood); }, ms);
    },

    // Text tippt sich in eine Sprechblase, die Figur bewegt dabei den Mund (Stimmung bleibt erhalten)
    say: function (bubble, fig, text, done) {
      clearInterval(bubble._t);
      bubble.textContent = '';
      if (reduced()) { bubble.textContent = text; if (done) done(); return; }
      var i = 0; Fx.mood(fig, 'talking', 0);
      bubble._t = setInterval(function () {
        bubble.textContent = text.slice(0, ++i);
        if (i >= text.length) { clearInterval(bubble._t); fig.classList.remove('is-talking'); if (done) done(); }
      }, 22);
    },

    pulse: function (el) { if (!el || reduced()) return; el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse'); },
    shake: function (el) { if (!el || reduced()) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); },

    // Münzen fliegen von 'from' zur Geldanzeige
    coins: function (from, to, n) {
      if (reduced() || !from || !to) return;
      var a = center(from), b = center(to), L = getLayer(); n = n || 8;
      for (var i = 0; i < n; i++) {
        var p = document.createElement('div'); p.className = 'fx-piece fx-coin'; p.textContent = '€'; L.appendChild(p);
        fly(p, a, b, { dx: (Math.random() - .5) * 160, dy: -40 - Math.random() * 70, duration: 900 + Math.random() * 300, delay: i * 55, done: i === n - 1 ? function () { Fx.pulse(to); } : null });
      }
    },

    // Ruf-Sterne fliegen zur Rufanzeige
    stars: function (from, to, n) {
      if (reduced() || !from || !to) return;
      var a = center(from), b = center(to), L = getLayer(); n = n || 4;
      for (var i = 0; i < n; i++) {
        var p = document.createElement('div'); p.className = 'fx-piece fx-star';
        p.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2l3 7 7 .6-5.3 4.7 1.7 7.2L12 17.8 5.6 21.5l1.7-7.2L2 9.6 9 9z" fill="#ffcf5b" stroke="#253543" stroke-width="1.8" stroke-linejoin="round"/></svg>';
        L.appendChild(p);
        fly(p, a, b, { dx: (Math.random() - .5) * 120, dy: -30 - Math.random() * 60, duration: 1000 + Math.random() * 250, delay: 250 + i * 90, done: i === n - 1 ? function () { Fx.pulse(to); } : null });
      }
    },

    // Konfetti aus einem Punkt
    confetti: function (from, n) {
      if (reduced() || !from) return;
      var a = center(from), L = getLayer(), cols = ['#f87845', '#ffcf5b', '#bfe8d2', '#a8d5ef', '#c4b6e6']; n = n || 28;
      for (var i = 0; i < n; i++) {
        var p = document.createElement('div'); p.className = 'fx-piece fx-conf'; p.style.background = cols[i % cols.length]; L.appendChild(p);
        var ang = Math.random() * Math.PI - Math.PI, sp = 90 + Math.random() * 190, dx = Math.cos(ang) * sp, dy = Math.sin(ang) * sp;
        var rot = (Math.random() - .5) * 720;
        var anim = p.animate([
          { transform: 'translate(' + a.x + 'px,' + a.y + 'px) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + (a.x + dx) + 'px,' + (a.y + dy) + 'px) rotate(' + rot / 2 + 'deg)', opacity: 1, offset: 0.45 },
          { transform: 'translate(' + (a.x + dx * 1.2) + 'px,' + (a.y + dy + 260) + 'px) rotate(' + rot + 'deg)', opacity: 0 }
        ], { duration: 1300 + Math.random() * 500, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'both' });
        anim.onfinish = (function (el) { return function () { el.remove(); }; })(p);
      }
    },

    // Bildwechsel: Inhalt weich einblenden
    enter: function (el) { if (!el || reduced()) return; el.classList.remove('view-enter'); void el.offsetWidth; el.classList.add('view-enter'); }
  };
  window.Fx = Fx;
})();

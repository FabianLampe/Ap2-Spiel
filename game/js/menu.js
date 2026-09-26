// Titelbildschirm, Figurenwahl (drehbare 3D-Vorschau, Name, Schwierigkeit) und Pausenmenü (Schwierigkeit, Spielstand laden/herunterladen)
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  var previews = null, root = null, stage = null;

  // Einheitliches Licht für Vorschaubilder und Live-Vorschau
  function makeRenderer(w, h, ratio) {
    var r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.setPixelRatio(ratio || 1); r.setSize(w, h, false);
    r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 0.92;
    return r;
  }
  function lights(sc) {
    sc.add(new THREE.HemisphereLight(0xf2f6ff, 0x7a6a5a, 0.5));
    var key = new THREE.DirectionalLight(0xfff0dc, 0.95); key.position.set(2.5, 4, 5); sc.add(key);
    var rim = new THREE.DirectionalLight(0xcfe8ff, 0.45); rim.position.set(-3, 3, -4); sc.add(rim);
  }
  // weicher Bodenschatten
  function floorShadow() {
    var cv = document.createElement('canvas'); cv.width = cv.height = 64; var c = cv.getContext('2d');
    var g = c.createRadialGradient(32, 32, 2, 32, 32, 32); g.addColorStop(0, 'rgba(20,30,40,0.45)'); g.addColorStop(1, 'rgba(20,30,40,0)');
    c.fillStyle = g; c.fillRect(0, 0, 64, 64);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.55), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.002; return m;
  }

  // Vorschaubilder: ein Renderer, jede Figur einmal als Bild
  function renderPreviews() {
    if (previews) return previews;
    previews = {};
    try {
      var W = 220, H = 330, r = makeRenderer(W, H);
      var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(26, W / H, 0.1, 30);
      lights(sc); sc.add(floorShadow());
      cam.position.set(0, 1.0, 4.4); cam.lookAt(0, 0.92, 0);
      Avatars.list.forEach(function (a) {
        var g = Humans.create(Humans.preset(Avatars.presetName(a.id))); g.rotation.y = -0.4; sc.add(g); if (g.userData.idle) g.userData.idle(0.6, 0.6);
        r.render(sc, cam); previews[a.id] = r.domElement.toDataURL('image/png'); sc.remove(g);
      });
      r.dispose();
    } catch (e) { previews = {}; }
    return previews;
  }
  // Live-Vorschau: drehbare 3D-Figur mit Atmen und Blinzeln
  function makeStage(host) {
    var st = { ry: -0.35, target: -0.35, fig: null, alive: true };
    try {
      var W = 300, H = 440, r = makeRenderer(W, H, Math.min(window.devicePixelRatio || 1, 2));
      r.domElement.className = 'stage-canvas'; host.appendChild(r.domElement);
      var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(24, W / H, 0.1, 30);
      lights(sc); sc.add(floorShadow());
      cam.position.set(0, 1.05, 5.6); cam.lookAt(0, 0.86, 0);
      var clock = new THREE.Clock(), t = 0;
      st.set = function (id) {
        if (st.fig) sc.remove(st.fig);
        st.fig = Humans.create(Humans.preset(Avatars.presetName(id))); st.fig.rotation.y = st.ry; sc.add(st.fig);
        if (st.fig.userData.setPose) st.fig.userData.setPose('stand');
      };
      (function loop() {
        if (!st.alive) { r.dispose(); return; }
        var dt = Math.min(0.05, clock.getDelta()); t += dt;
        st.ry += (st.target - st.ry) * Math.min(1, dt * 8);
        if (st.fig) { st.fig.rotation.y = st.ry; if (st.fig.userData.idle) st.fig.userData.idle(t, dt); }
        r.render(sc, cam); requestAnimationFrame(loop);
      })();
      // Ziehen zum Drehen
      var down = false, lx = 0;
      r.domElement.addEventListener('pointerdown', function (e) { down = true; lx = e.clientX; r.domElement.setPointerCapture(e.pointerId); });
      r.domElement.addEventListener('pointermove', function (e) { if (!down) return; st.target += (e.clientX - lx) * 0.012; lx = e.clientX; });
      r.domElement.addEventListener('pointerup', function () { down = false; });
      r.domElement.addEventListener('pointercancel', function () { down = false; });
    } catch (e) { st.set = function () {}; st.failed = true; }
    st.turn = function (d) { st.target += d; };
    st.stop = function () { st.alive = false; };
    return st;
  }

  function download() {
    var blob = new Blob([State.exportJSON()], { type: 'application/json' }), a = el('a', { href: URL.createObjectURL(blob), download: 'rack-und-ruhm-spielstand-tag' + State.s.day + '.json' });
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function pickFile(msg) {
    var inp = el('input', { type: 'file', accept: '.json,application/json' });
    inp.addEventListener('change', function () {
      var f = inp.files[0]; if (!f) return; var rd = new FileReader();
      rd.onload = function () { var r = State.importJSON(String(rd.result)); if (r.ok) reloadIntoGame(); else msg(r.why); };
      rd.readAsText(f);
    });
    inp.click();
  }
  // Nach Neustart oder Laden direkt ins Spiel statt erneut auf den Titelbildschirm
  var SKIP = 'rr-skip-title';
  function reloadIntoGame() { try { sessionStorage.setItem(SKIP, '1'); } catch (e) {} location.reload(); }
  function consumeSkip() { try { var v = sessionStorage.getItem(SKIP); sessionStorage.removeItem(SKIP); return v === '1'; } catch (e) { return false; } }
  function diffButtons(current, onPick) {
    var wrap = el('div', { class: 'diff-row' }), info = el('p', { class: 'sub', style: 'margin:6px 0 0' }, [Economy.DIFF[current].desc]);
    Object.keys(Economy.DIFF).forEach(function (k) {
      var d = Economy.DIFF[k], b = el('button', { class: 'btn small diff-btn' + (k === current ? ' on' : ''), type: 'button', onclick: function () {
        current = k; onPick(k); info.textContent = d.desc;
        [].forEach.call(wrap.children, function (c) { c.classList.toggle('on', c === b); });
      } }, [d.name]);
      wrap.appendChild(b);
    });
    return el('div', {}, [wrap, info]);
  }
  function close() {
    if (stage) { stage.stop(); stage = null; }
    if (root) { root.remove(); root = null; }
    document.body.classList.remove('menu-open');
    // Welt läuft weiter, außer ein Spielfenster ist offen
    if (window.World && World.ok) World.setPaused(document.body.classList.contains('win-open'));
  }
  function open() {
    close(); document.body.classList.add('menu-open');
    if (window.World && World.ok) World.setPaused(true);
  }

  // ---- Figurenwahl ----
  function showStart(opts) {
    open();
    var pv = renderPreviews(), sel = Avatars.list.some(function (a) { return a.id === State.s.avatar; }) ? State.s.avatar : 'f1', diff = State.s.difficulty || 'normal';
    var nameIn = el('input', { type: 'text', maxlength: '16', value: State.s.pname && State.s.started ? State.s.pname : '', placeholder: 'Dein Name', class: 'menu-name', 'aria-label': 'Name' });
    var msg = el('p', { class: 'sub', style: 'color:var(--danger);min-height:1.2em' });
    var tagName = el('strong', {}), tagStyle = el('span', {});
    var host = el('div', { class: 'stage-view', tabindex: '0', 'aria-label': 'Figur-Vorschau, mit Pfeiltasten drehen' });
    host.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { stage.turn(-0.6); e.preventDefault(); } if (e.key === 'ArrowRight') { stage.turn(0.6); e.preventDefault(); } });
    function arrow(dir) {
      var path = dir < 0 ? 'M30 10 A16 16 0 1 0 38 30 M30 10 L22 6 M30 10 L27 18' : 'M18 10 A16 16 0 1 1 10 30 M18 10 L26 6 M18 10 L21 18';
      var b = el('button', { class: 'stage-turn', type: 'button', 'aria-label': dir < 0 ? 'Nach links drehen' : 'Nach rechts drehen', onclick: function () { stage.turn(dir * 0.8); } });
      b.innerHTML = '<svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true"><path d="' + path + '" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      return b;
    }
    var stageBox = el('div', { class: 'stage' }, [host, el('div', { class: 'stage-tag' }, [tagName, tagStyle]), el('div', { class: 'stage-arrows' }, [arrow(-1), arrow(1)])]);
    var rows = el('div', {});
    function card(a) {
      return el('button', { type: 'button', class: 'avatar-card' + (a.id === sel ? ' on' : ''), 'aria-pressed': a.id === sel ? 'true' : 'false', 'aria-label': a.name + ', ' + a.style, onclick: function () { pick(a.id); } }, [
        pv[a.id] ? el('img', { src: pv[a.id], alt: '' }) : el('div', { class: 'noimg' }, [a.name]),
        el('span', {}, [a.name])
      ]);
    }
    function draw() {
      rows.innerHTML = '';
      [['m', 'Männer'], ['f', 'Frauen']].forEach(function (g) {
        rows.appendChild(el('h3', { class: 'menu-group' }, [g[1]]));
        rows.appendChild(el('div', { class: 'menu-grid' }, Avatars.list.filter(function (a) { return a.gender === g[0]; }).map(card)));
      });
      var a = Avatars.get(sel); tagName.textContent = a.name; tagStyle.textContent = a.style;
    }
    function pick(id) { sel = id; draw(); stage.set(id); }
    var btns = el('div', { class: 'row', style: 'gap:10px;flex-wrap:wrap;margin-top:12px' }, [
      el('button', { class: 'btn ghost', type: 'button', onclick: function () { showTitle(opts); } }, ['← Zurück']),
      el('button', { class: 'btn big', type: 'button', onclick: function () {
        if (opts.hasSave && !confirm('Dein gespeicherter Fortschritt wird überschrieben. Neu beginnen?')) return;
        opts.onNew({ avatar: sel, name: nameIn.value.trim() || Avatars.get(sel).name, difficulty: diff });
      } }, ['Los geht’s!'])
    ]);
    root = el('div', { id: 'menu-start', class: 'menu-screen', role: 'dialog', 'aria-label': 'Figur wählen' }, [
      el('div', { class: 'menu-box wide' }, [
        el('h1', { class: 'menu-title', style: 'font-size:32px' }, ['Wähle deine Figur']),
        el('div', { class: 'menu-cols' }, [
          stageBox,
          el('div', { class: 'menu-side' }, [
            rows,
            el('h3', { style: 'margin-top:14px' }, ['Name']), nameIn,
            el('h3', { style: 'margin-top:14px' }, ['Schwierigkeit']), diffButtons(diff, function (k) { diff = k; })
          ])
        ]),
        msg, btns
      ])
    ]);
    document.body.appendChild(root);
    stage = makeStage(host);
    if (stage.failed) host.appendChild(pv[sel] ? el('img', { src: pv[sel], alt: '' }) : el('div', {}, []));
    draw(); stage.set(sel);
  }

  // ---- Titelbild ----
  // opts.onNew({avatar,name,difficulty}), opts.onContinue() (nur wenn Spielstand da), opts.hasSave
  function showTitle(opts) {
    open();
    var pv = renderPreviews(), sky = el('div', { class: 'ti-city' }), i;
    for (i = 0; i < 14; i++) {
      var h = 80 + ((i * 53) % 150), b = el('div', { class: 'ti-bld', style: 'height:' + h + 'px;width:' + (46 + (i * 17) % 40) + 'px' });
      for (var w = 0; w < Math.floor(h / 26); w++) b.appendChild(el('i', { style: 'animation-delay:' + (((i * 7 + w * 3) % 11) * 0.45) + 's' }));
      sky.appendChild(b);
    }
    var crowd = el('div', { class: 'ti-crowd' });
    Avatars.list.forEach(function (a, k) {
      crowd.appendChild(el('div', { class: 'ti-fig', style: 'animation-delay:' + (-k * 1.3) + 's' }, [pv[a.id] ? el('img', { src: pv[a.id], alt: '' }) : el('span')]));
    });
    var msg = el('p', { class: 'ti-hint', style: 'color:var(--danger);min-height:1.2em' });
    function leave(fn) { root.classList.add('leaving'); setTimeout(fn, 350); }
    var play = opts.hasSave
      ? el('button', { class: 'btn green ti-play', type: 'button', onclick: function () { leave(function () { close(); opts.onContinue(); }); } }, ['▶ Weiterspielen'])
      : el('button', { class: 'btn ti-play', type: 'button', onclick: function () { leave(function () { showStart(opts); }); } }, ['▶ Neues Spiel']);
    var more = el('div', { class: 'ti-more' }, [
      opts.hasSave ? el('button', { class: 'btn', type: 'button', onclick: function () { leave(function () { showStart(opts); }); } }, ['Neues Spiel']) : '',
      el('button', { class: 'btn ghost', type: 'button', onclick: function () { pickFile(function (t) { msg.textContent = t; }); } }, ['Spielstand laden (Datei)'])
    ]);
    root = el('div', { id: 'menu-title', class: 'menu-screen ti', role: 'dialog', 'aria-label': 'Titelbild' }, [
      el('div', { class: 'ti-sun' }), el('div', { class: 'ti-cloud c1' }), el('div', { class: 'ti-cloud c2' }), el('div', { class: 'ti-cloud c3' }),
      sky, el('div', { class: 'ti-road' }), crowd,
      el('div', { class: 'ti-center' }, [
        el('h1', { class: 'ti-title' }, ['Rack & Ruhm']),
        el('p', { class: 'ti-sub' }, ['Vom Freelancer zum Fachinformatiker']),
        play, more, msg, el('p', { class: 'ti-hint' }, ['Für die AP2 · offline spielbar'])
      ])
    ]);
    document.body.appendChild(root); play.focus();
  }

  // ---- Pausenmenü ----
  function showPause(opts) {
    open();
    var msg = el('p', { class: 'sub', style: 'min-height:1.2em' });
    var sound = el('button', { class: 'btn ghost', type: 'button', onclick: function () { sound.textContent = Sound.toggle() ? 'Ton: aus' : 'Ton: an'; } }, [Sound.isMuted() ? 'Ton: aus' : 'Ton: an']);
    root = el('div', { id: 'menu-pause', class: 'menu-screen', role: 'dialog', 'aria-label': 'Menü' }, [
      el('div', { class: 'menu-box small' }, [
        el('h1', { class: 'menu-title', style: 'font-size:28px' }, ['Menü']),
        el('h3', {}, ['Schwierigkeit']),
        diffButtons(State.s.difficulty || 'normal', function (k) { State.s.difficulty = k; State.save(); if (opts.onChange) opts.onChange(); }),
        el('p', { class: 'sub' }, ['Gilt ab sofort für neue Aufträge und Rechnungen.']),
        el('h3', { style: 'margin-top:14px' }, ['Spielstand']),
        el('div', { class: 'row', style: 'gap:10px;flex-wrap:wrap' }, [
          el('button', { class: 'btn', type: 'button', onclick: function () { State.save(); download(); msg.textContent = 'Spielstand heruntergeladen.'; } }, ['⬇ Spielstand herunterladen']),
          el('button', { class: 'btn ghost', type: 'button', onclick: function () { pickFile(function (t) { msg.textContent = t; }); } }, ['Spielstand laden'])
        ]), msg,
        el('div', { class: 'row', style: 'gap:10px;flex-wrap:wrap;margin-top:8px' }, [
          sound,
          el('button', { class: 'btn ghost', type: 'button', onclick: function () { close(); Tutorial.start(); } }, ['Tutorial wiederholen']),
          el('button', { class: 'btn ghost', type: 'button', onclick: function () { showTitle(opts.startOpts()); } }, ['Zum Startbildschirm'])
        ]),
        el('div', { class: 'row', style: 'margin-top:14px' }, [el('button', { class: 'btn green', type: 'button', onclick: close }, ['Weiterspielen'])])
      ])
    ]);
    document.body.appendChild(root);
  }

  window.Menu = { showTitle: showTitle, showStart: showStart, showPause: showPause, close: close, isOpen: function () { return !!root; }, download: download, reloadIntoGame: reloadIntoGame, consumeSkip: consumeSkip };
})();

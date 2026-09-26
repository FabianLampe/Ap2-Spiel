// Startbildschirm (Figur, Name, Schwierigkeit) und Pausenmenü (Schwierigkeit, Spielstand laden/herunterladen)
(function () {
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') n.className = attrs[k]; else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]); else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  var previews = null, root = null;

  // Vorschaubilder: ein Renderer, jede Figur einmal als Bild
  function renderPreviews() {
    if (previews) return previews;
    previews = {};
    try {
      var W = 240, H = 320, r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      r.setSize(W, H); r.setPixelRatio(1);
      var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 30);
      sc.add(new THREE.HemisphereLight(0xffffff, 0x998877, 0.9));
      var sun = new THREE.DirectionalLight(0xfff2dd, 0.9); sun.position.set(2, 4, 4); sc.add(sun);
      cam.position.set(0, 1.0, 3.7); cam.lookAt(0, 0.9, 0);
      Avatars.list.forEach(function (a) {
        var g = Humans.create(Humans.preset(Avatars.presetName(a.id))); g.rotation.y = -0.35; sc.add(g);
        r.render(sc, cam); previews[a.id] = r.domElement.toDataURL('image/png'); sc.remove(g);
      });
      r.dispose();
    } catch (e) { previews = {}; }
    return previews;
  }

  function download() {
    var blob = new Blob([State.exportJSON()], { type: 'application/json' }), a = el('a', { href: URL.createObjectURL(blob), download: 'rack-und-ruhm-spielstand-tag' + State.s.day + '.json' });
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function pickFile(msg) {
    var inp = el('input', { type: 'file', accept: '.json,application/json' });
    inp.addEventListener('change', function () {
      var f = inp.files[0]; if (!f) return; var rd = new FileReader();
      rd.onload = function () { var r = State.importJSON(String(rd.result)); if (r.ok) location.reload(); else msg(r.why); };
      rd.readAsText(f);
    });
    inp.click();
  }
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
  function close() { if (root) { root.remove(); root = null; } document.body.classList.remove('menu-open'); }

  // ---- Startbildschirm ----
  // opts.onNew({avatar,name,difficulty}), opts.onContinue() (nur wenn Spielstand da)
  function showStart(opts) {
    close(); document.body.classList.add('menu-open');
    var pv = renderPreviews(), sel = State.s.avatar || 'm1', diff = State.s.difficulty || 'normal';
    var nameIn = el('input', { type: 'text', maxlength: '16', value: State.s.pname && State.s.started ? State.s.pname : '', placeholder: 'Dein Name', class: 'menu-name', 'aria-label': 'Name' });
    var big = el('div', { class: 'menu-big' }), grid = el('div', { class: 'menu-grid' }), msg = el('p', { class: 'sub', style: 'color:var(--danger);min-height:1.2em' });
    function draw() {
      grid.innerHTML = '';
      Avatars.list.forEach(function (a) {
        grid.appendChild(el('button', { type: 'button', class: 'avatar-card' + (a.id === sel ? ' on' : ''), 'aria-label': a.name, onclick: function () { sel = a.id; draw(); } }, [
          pv[a.id] ? el('img', { src: pv[a.id], alt: a.name }) : el('div', { class: 'noimg' }, [a.name]),
          el('span', {}, [a.name + (a.gender === 'm' ? ' ♂' : ' ♀')])
        ]));
      });
      var a = Avatars.get(sel); big.innerHTML = '';
      big.appendChild(pv[sel] ? el('img', { src: pv[sel], alt: a.name }) : el('div', {}, [a.name]));
    }
    draw();
    var btns = el('div', { class: 'row', style: 'gap:10px;flex-wrap:wrap;margin-top:12px' }, [
      el('button', { class: 'btn', type: 'button', onclick: function () {
        if (opts.hasSave && !confirm('Dein gespeicherter Fortschritt wird überschrieben. Neu beginnen?')) return;
        opts.onNew({ avatar: sel, name: nameIn.value.trim() || Avatars.get(sel).name, difficulty: diff });
      } }, ['Neues Spiel'])
    ]);
    if (opts.hasSave) btns.insertBefore(el('button', { class: 'btn green', type: 'button', onclick: function () { close(); opts.onContinue(); } }, ['Weiterspielen']), btns.firstChild);
    btns.appendChild(el('button', { class: 'btn ghost', type: 'button', onclick: function () { pickFile(function (t) { msg.textContent = t; }); } }, ['Spielstand laden (Datei)']));
    root = el('div', { id: 'menu-start', class: 'menu-screen', role: 'dialog', 'aria-label': 'Startbildschirm' }, [
      el('div', { class: 'menu-box' }, [
        el('h1', { class: 'menu-title' }, ['Rack & Ruhm']),
        el('p', { class: 'sub' }, ['Vom Freelancer zum Fachinformatiker: Aufträge lösen, Geld verdienen, aufsteigen.']),
        el('div', { class: 'menu-cols' }, [
          big,
          el('div', { style: 'flex:1;min-width:260px' }, [
            el('h3', {}, ['Wähle deine Figur']), grid,
            el('h3', { style: 'margin-top:14px' }, ['Name']), nameIn,
            el('h3', { style: 'margin-top:14px' }, ['Schwierigkeit']), diffButtons(diff, function (k) { diff = k; })
          ])
        ]),
        msg, btns
      ])
    ]);
    document.body.appendChild(root);
  }

  // ---- Pausenmenü ----
  function showPause(opts) {
    close(); document.body.classList.add('menu-open');
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
          el('button', { class: 'btn ghost', type: 'button', onclick: function () { showStart(opts.startOpts()); } }, ['Zum Startbildschirm'])
        ]),
        el('div', { class: 'row', style: 'margin-top:14px' }, [el('button', { class: 'btn green', type: 'button', onclick: close }, ['Weiterspielen'])])
      ])
    ]);
    document.body.appendChild(root);
  }

  window.Menu = { showStart: showStart, showPause: showPause, close: close, isOpen: function () { return !!root; }, download: download };
})();

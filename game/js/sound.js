// Ton ohne Audiodateien: kurze Geräusche mit der Web Audio API. Stummschalten über den Knopf oben (wird gemerkt).
(function () {
  var ctx = null, muted = false, KEY = 'rack-und-ruhm-mute';
  try { muted = localStorage.getItem(KEY) === '1'; } catch (e) { /* egal */ }

  function ac() {
    if (muted) return null;
    if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { ctx = new C(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // Ton: Frequenzverlauf, Dauer, Form, Lautstärke, Startverzögerung
  function tone(freqs, dur, type, vol, delay) {
    var c = ac(); if (!c) return;
    var t0 = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; freqs = [].concat(freqs);
    o.frequency.setValueAtTime(freqs[0], t0); if (freqs[1]) o.frequency.exponentialRampToValueAtTime(freqs[1], t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.12, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function noise(dur, vol, delay, freq) {
    var c = ac(); if (!c) return;
    var n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t0 = c.currentTime + (delay || 0);
    f.type = 'lowpass'; f.frequency.value = freq || 800; g.gain.value = vol || 0.15; s.buffer = b; s.connect(f); f.connect(g); g.connect(c.destination); s.start(t0);
  }
  var SOUNDS = {
    coin: function () { tone([1200, 1800], 0.09, 'square', 0.05); tone([1800, 2400], 0.16, 'square', 0.05, 0.07); },
    ok: function () { tone(523, 0.12, 'triangle', 0.14); tone(659, 0.12, 'triangle', 0.14, 0.11); tone(784, 0.22, 'triangle', 0.14, 0.22); },
    bad: function () { tone([220, 140], 0.28, 'sawtooth', 0.09); },
    door: function () { noise(0.18, 0.2, 0, 500); tone([140, 90], 0.14, 'sine', 0.12, 0.02); },
    buy: function () { tone(660, 0.08, 'triangle', 0.12); tone(880, 0.14, 'triangle', 0.12, 0.08); },
    click: function () { tone(700, 0.04, 'square', 0.04); },
    note: function () { noise(0.1, 0.12, 0, 2500); },
    day: function () { tone(392, 0.18, 'sine', 0.12); tone(523, 0.18, 'sine', 0.12, 0.16); tone(659, 0.3, 'sine', 0.12, 0.32); }
  };
  window.Sound = {
    play: function (name) { try { if (SOUNDS[name]) SOUNDS[name](); } catch (e) { /* Ton ist optional */ } },
    toggle: function () { muted = !muted; try { localStorage.setItem(KEY, muted ? '1' : '0'); } catch (e) { /* egal */ } return muted; },
    isMuted: function () { return muted; }
  };
})();

#!/usr/bin/env node
// Prüft Inhaltsdateien. Aufruf:
//   node tools/check-content.js kompass game/data/kompass-mc/<datei>.js     (WiSo-/Kompass-Fragen + Lektionen)
//   node tools/check-content.js handbuch game/data/handbuch/<datei>.js      (Handbuch-Kapitel)
const fs = require('fs'), vm = require('vm'), path = require('path');
const [kind, file] = process.argv.slice(2);
if (!kind || !file) { console.error('Aufruf: node tools/check-content.js <kompass|handbuch> <datei.js>'); process.exit(2); }
const ctx = vm.createContext({ console }); ctx.window = ctx;
try { vm.runInContext(fs.readFileSync(path.resolve(file), 'utf8'), ctx, { filename: file }); } catch (e) { console.log('  ✘ Datei lässt sich nicht laden: ' + e.message); process.exit(1); }
const G = ctx.GAME_DATA || {};
let fails = 0; const errs = [];
const bad = (id, m) => { fails++; if (errs.length < 60) errs.push(`  ✘ ${id}: ${m}`); };
const FIG = ['kalle', 'finanzamt', 'bank', 'startup', 'datenschutz', 'barista', 'makler', 'verkaeufer'];
const str = (v, min, max) => typeof v === 'string' && v.trim().length >= min && (!max || v.length <= max);

if (kind === 'kompass') {
  const tasks = G.kompassTasks || [], less = G.lektionen || [], concepts = new Set(less.map(l => l.concept)), ids = new Set();
  less.forEach(l => {
    const id = 'Lektion ' + l.concept;
    if (!str(l.concept, 2)) bad(id, 'concept fehlt');
    if (!str(l.title, 3, 80)) bad(id, 'title fehlt oder zu lang');
    if (FIG.indexOf(l.figure) < 0) bad(id, 'figure ungültig: ' + l.figure);
    if (!Array.isArray(l.lines) || l.lines.length < 3 || l.lines.length > 6) bad(id, 'lines: 3 bis 6 Sätze nötig');
    else l.lines.forEach((s, i) => { if (!str(s, 25, 260)) bad(id, `Satz ${i + 1}: 25 bis 260 Zeichen nötig`); });
  });
  tasks.forEach(t => {
    const id = t.id || '(ohne id)';
    if (!str(t.id, 4) || ids.has(t.id)) bad(id, 'id fehlt oder doppelt'); ids.add(t.id);
    if (t.type !== 'auswahl') bad(id, "type muss 'auswahl' sein");
    if (t.topic !== 'wirtschaft') bad(id, "topic muss 'wirtschaft' sein");
    if (!str(t.subtopic, 3)) bad(id, 'subtopic fehlt (Themenzweig, z. B. "Netzwerke")');
    if (!str(t.title, 5, 80)) bad(id, 'title fehlt oder zu lang');
    if ([1, 2, 3].indexOf(t.difficulty) < 0) bad(id, 'difficulty 1..3');
    if (FIG.indexOf(t.figure) < 0) bad(id, 'figure ungültig: ' + t.figure);
    if (!concepts.has(t.concept)) bad(id, 'concept "' + t.concept + '" hat keine Lektion');
    if (!str(t.prompt, 40)) bad(id, 'prompt zu kurz (mindestens 40 Zeichen, mit Szenario)');
    if (/Anlage|Abbildung|siehe Tabelle|nachfolgende(n|r)? (Tabelle|Grafik|Diagramm)|Quellcode|folgende(n|r|s)? (Tabelle|Abbildung|Diagramm|Code)/i.test(t.prompt || '') && !/```|\n/.test(t.prompt)) bad(id, 'prompt verweist auf fehlende Anlage/Abbildung: Text muss allein verständlich sein');
    const p = t.payload || {}, o = p.options;
    if (!Array.isArray(o) || o.length < 4 || o.length > 5) { bad(id, '4 oder 5 Optionen nötig'); return; }
    const right = o.filter(x => x.correct).length;
    if (p.multi ? (right < 2 || right >= o.length) : right !== 1) bad(id, p.multi ? 'multi: mindestens 2 richtige und mindestens 1 falsche Option' : 'genau 1 richtige Option nötig');
    const seen = new Set();
    o.forEach((x, i) => {
      if (!str(x.text, 1, 220)) bad(id, `Option ${i + 1}: Text fehlt oder zu lang`);
      if (seen.has(x.text)) bad(id, 'doppelte Option: ' + x.text); seen.add(x.text);
      if (!x.correct && !str(x.why, 10, 240)) bad(id, `falsche Option ${i + 1}: "why" (Begründung, 10–240 Zeichen) fehlt`);
    });
    if (!str(p.explanation, 25, 700)) bad(id, 'payload.explanation (Musterlösung/Erklärung, 25–700 Zeichen) fehlt');
    // Antwortlängen: die richtige Option soll nicht immer die längste sein (Muster vermeiden)
  });
  // Muster prüfen: ist die richtige Antwort meist die längste?
  let longest = 0, single = 0;
  tasks.forEach(t => { const o = (t.payload || {}).options; if (!o || (t.payload || {}).multi) return; single++; const m = Math.max.apply(null, o.map(x => x.text.length)); if (o.find(x => x.correct) && o.find(x => x.correct).text.length === m) longest++; });
  if (single > 8 && longest / single > 0.6) bad('Muster', `bei ${Math.round(100 * longest / single)} % der Fragen ist die richtige Antwort die längste (soll unter 60 % liegen): Falschantworten ähnlich lang und detailliert formulieren`);
  console.log(`${path.basename(file)}: ${tasks.length} Fragen, ${less.length} Lektionen`);
} else if (kind === 'handbuch') {
  const chapters = G.handbuch || [], ids = new Set();
  chapters.forEach(c => {
    const cid = 'Kapitel ' + c.id;
    if (!/^[a-z0-9-]+$/.test(c.id || '')) bad(cid, 'id: nur a-z, 0-9, -');
    if (!str(c.bereich, 2, 40)) bad(cid, 'bereich fehlt (z. B. "SQL")');
    if (!str(c.title, 3, 60)) bad(cid, 'title fehlt');
    if (!Array.isArray(c.entries) || c.entries.length < 3) bad(cid, 'mindestens 3 Einträge');
    (c.entries || []).forEach(e => {
      const id = cid + ' / ' + e.id;
      if (!/^[a-z0-9-]+$/.test(e.id || '') || ids.has(e.id)) bad(id, 'id ungültig oder doppelt (global eindeutig)'); ids.add(e.id);
      if (!str(e.title, 2, 70)) bad(id, 'title fehlt');
      if (!Array.isArray(e.keywords) || e.keywords.length < 2) bad(id, 'keywords: mindestens 2 Suchbegriffe');
      if (!str(e.kurz, 15, 200)) bad(id, 'kurz (ein Satz, 15–200 Zeichen) fehlt');
      if (!Array.isArray(e.erklaerung) || !e.erklaerung.length || e.erklaerung.some(s => !str(s, 20))) bad(id, 'erklaerung: Liste von Absätzen (je mindestens 20 Zeichen)');
      if (e.syntax !== undefined && !str(e.syntax, 3)) bad(id, 'syntax leer');
      if (e.beispiel !== undefined) { if (!Array.isArray(e.beispiel) || e.beispiel.some(b => !str(b.code, 3))) bad(id, 'beispiel: Liste von { code, hinweis? }'); }
      if (e.stolperfallen !== undefined && (!Array.isArray(e.stolperfallen) || e.stolperfallen.some(s => !str(s, 10)))) bad(id, 'stolperfallen: Liste von Sätzen');
    });
  });
  // siehe-Verweise müssen existieren
  chapters.forEach(c => (c.entries || []).forEach(e => (e.siehe || []).forEach(s => { if (!ids.has(s)) bad('Kapitel ' + c.id + ' / ' + e.id, 'siehe verweist auf unbekannten Eintrag: ' + s + ' (nur Einträge derselben Datei prüfbar)'); })));
  console.log(`${path.basename(file)}: ${chapters.length} Kapitel, ${chapters.reduce((n, c) => n + (c.entries || []).length, 0)} Einträge`);
} else { console.error('Unbekannte Art: ' + kind); process.exit(2); }

console.log(errs.join('\n'));
console.log(fails ? `\n${fails} Fehler` : '\nAlles in Ordnung');
process.exit(fails ? 1 : 0);

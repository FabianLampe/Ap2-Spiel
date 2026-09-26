#!/usr/bin/env node
// Trägt alle Inhaltsdateien (data/handbuch/*.js, data/kompass-mc/*.js) in game/index.html ein.
// Aufruf: node tools/update-index.js   (nach dem Hinzufügen neuer Inhaltsdateien)
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..', 'game'), file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');
const list = d => fs.existsSync(path.join(root, d)) ? fs.readdirSync(path.join(root, d)).filter(f => f.endsWith('.js')).sort() : [];
const tags = (d) => list(d).map(f => `<script src="${d}/${f}"></script>`).join('\n');
const block = `<!-- inhalte:start -->\n${tags('data/handbuch')}\n${tags('data/kompass-mc')}\n<!-- inhalte:ende -->`;
if (/<!-- inhalte:start -->[\s\S]*<!-- inhalte:ende -->/.test(html)) html = html.replace(/<!-- inhalte:start -->[\s\S]*<!-- inhalte:ende -->/, block);
else {   // erstes Mal: alte einzelne Handbuch-Tags ersetzen
  html = html.replace(/<script src="data\/handbuch\/[^"]+"><\/script>\n?/g, '');
  html = html.replace('<script src="js/reference.js"></script>', block + '\n<script src="js/reference.js"></script>');
}
fs.writeFileSync(file, html);
console.log('Eingetragen:', list('data/handbuch').length, 'Handbuch-Dateien,', list('data/kompass-mc').length, 'Kompass-Dateien');

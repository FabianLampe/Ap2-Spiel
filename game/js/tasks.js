// Einheitliches Aufgabenformat + Plugin-Registry. Siehe game/AUFGABENFORMAT.md
(function () {
  var types = {};      // typ -> Plugin
  var tasks = [];      // alle Aufgaben (Hülle)
  var byId = {};
  var skillMap = null;   // Katalog aller Skills, aus den Plugins zusammengesetzt (lazy)

  var REQUIRED = ['id', 'type', 'topic', 'title', 'difficulty', 'prompt', 'payload'];

  function validate(t) {
    var errs = [];
    REQUIRED.forEach(function (k) { if (t[k] === undefined || t[k] === null || t[k] === '') errs.push('Feld fehlt: ' + k); });
    if (t.difficulty !== undefined && [1, 2, 3].indexOf(t.difficulty) < 0) errs.push('difficulty muss 1, 2 oder 3 sein');
    if (t.skills !== undefined && !Array.isArray(t.skills)) errs.push('skills muss eine Liste sein');
    if (t.type && !types[t.type]) errs.push('Unbekannter Aufgabentyp: ' + t.type);
    (t.skills || []).forEach(function (id) { if (!Tasks.skill(id)) errs.push('Unbekannter Skill: ' + id); });
    if (t.id && byId[t.id]) errs.push('Doppelte ID: ' + t.id);
    if (!errs.length && types[t.type].validate) errs = errs.concat(types[t.type].validate(t) || []);
    return errs;
  }

  var Tasks = {
    // Ein Plugin beschreibt, wie ein Aufgabentyp geladen, angezeigt und bewertet wird.
    registerType: function (plugin) {
      ['id', 'render', 'grade'].forEach(function (k) { if (!plugin[k]) throw new Error('Plugin ' + (plugin.id || '?') + ': ' + k + ' fehlt'); });
      types[plugin.id] = plugin; skillMap = null;
    },
    // Fügt Aufgaben hinzu; ungültige werden gemeldet und übersprungen.
    add: function (list) {
      var rejected = [];
      list.forEach(function (t) {
        if (!t.skills) t.skills = [];
        var errs = validate(t);
        if (errs.length) { rejected.push({ id: t.id, errors: errs }); return; }
        tasks.push(t); byId[t.id] = t;
      });
      return rejected;
    },
    typeIds: function () { return Object.keys(types); },
    all: function () { return tasks.slice(); },
    get: function (id) { return byId[id]; },
    plugin: function (typeId) { return types[typeId]; },
    topics: function () {
      var seen = {}; tasks.forEach(function (t) { seen[t.topic] = (seen[t.topic] || 0) + 1; }); return seen;
    },
    // Skill-Katalog: { id, name, desc, cost, topic, group, requires?, starter? }
    skills: function () {
      if (!skillMap) {
        skillMap = {};
        Object.keys(types).forEach(function (t) {
          (types[t].skills ? types[t].skills() : []).forEach(function (k) { skillMap[k.id] = k; });
        });
      }
      return Object.keys(skillMap).map(function (id) { return skillMap[id]; });
    },
    skill: function (id) { Tasks.skills(); return skillMap[id]; },
    validate: validate,
    // Nur für Tests: alles zurücksetzen
    _reset: function () { types = {}; tasks = []; byId = {}; skillMap = null; }
  };
  window.Tasks = Tasks;
})();

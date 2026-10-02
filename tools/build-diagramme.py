#!/usr/bin/env python3
"""Diagramm-Aufgaben aus den Kompass-Daten (daten/kompass/*.json) ins Spielformat bringen.

Aufruf (im Projektordner):  python3 tools/build-diagramme.py
Ergebnis:                    game/data/diagramme.js  (GAME_DATA.diagrammTasks)

Übernommen werden alle Aufgaben mit maschinell prüfbarer Musterlösung (loesung_diagramm) in den
Diagrammarten, die die Werkbank (game/js/types/diagramm.js) kennt.
"""
import glob, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODI = {
    'uml_klasse':         ('uml', 'UML-Klassendiagramm'),
    'uml_aktivitaet':     ('uml', 'UML-Aktivitätsdiagramm'),
    'uml_zustand':        ('uml', 'UML-Zustandsdiagramm'),
    'uml_sequenz':        ('uml', 'UML-Sequenzdiagramm'),
    'uml_anwendungsfall': ('uml', 'UML-Anwendungsfalldiagramm'),
    'er_chen':            ('datenbank', 'ER-Modell'),
    'relationenmodell':   ('datenbank', 'Relationenmodell'),
    'epk':                ('wirtschaft', 'EPK'),
    'netzplan':           ('wirtschaft', 'Netzplan'),
    'netzplan_kritischer_pfad': ('wirtschaft', 'Kritischer Pfad'),
    'struktogramm_ausfuellen':  ('programmierung', 'Struktogramm'),
    'ishikawa':           ('wirtschaft', 'Ishikawa-Diagramm'),
    'geraete_und_verbindungen': ('it', 'Geräte verkabeln'),
    'kurve_mit_eintrag':  ('wirtschaft', 'Diagramm-Eintrag'),
    'lineare_regression': ('ml', 'Lineare Regression'),
}


PROMPT = {
    'netzplan': 'Berechne die fehlenden Knotenwerte des Netzplans (Aufgabe unten) mit Vorwärts- und Rückwärtsrechnung.',
    'netzplan_kritischer_pfad': 'Markiere den kritischen Pfad im Netzplan (Aufgabe unten).',
    'struktogramm_ausfuellen': 'Setze die Anweisungen in die richtigen Felder des Struktogramms (Aufgabe unten).',
    'ishikawa': 'Ergänze die leeren Zweige des Ishikawa-Diagramms mit passenden Ursachen (Aufgabe unten).',
    'geraete_und_verbindungen': 'Verkabele die Geräte nach der Aufgabe unten und wähle die geeignete Schnittstelle.',
    'kurve_mit_eintrag': 'Trage den gesuchten Wert ins Diagramm ein (Aufgabe unten).',
    'lineare_regression': 'Übertrage die Messpunkte und bestimme die Regressionsgerade (Aufgabe unten).',
}


def schwierigkeit(punkte):
    return 1 if punkte <= 6 else 2 if punkte <= 12 else 3


def titel(konzept, modus, nr):
    name = konzept.replace('-', ' ')
    name = name[:1].upper() + name[1:]
    return '%s: %s%s' % (MODI[modus][1], name, ' (%d)' % nr if nr > 1 else '')


def main():
    out, zaehler = [], {}
    for f in sorted(glob.glob(os.path.join(ROOT, 'daten', 'kompass', '*.json'))):
        konzept = os.path.basename(f)[:-5]
        for a in json.load(open(f, encoding='utf-8')).get('beispielaufgaben', []):
            loes = a.get('loesung_diagramm')
            if not loes or loes.get('modus') not in MODI or a.get('freigabeart') != 'maschinell':
                continue
            modus = loes['modus']
            # Verkabelung: nur die Reihenschaltungs-Aufgaben haben eine prüfbare Lösung (bei den IP-Aufgaben zählen Adressen im Text)
            if modus == 'geraete_und_verbindungen' and not any(k.get('ports') for k in loes.get('knoten', [])):
                continue
            key = (konzept, modus)
            zaehler[key] = zaehler.get(key, 0) + 1
            bid = re.sub(r'[^a-z0-9-]', '', a['beispiel_id'].lower())
            punkte = int(a.get('punkte') or 0)
            out.append({
                'id': 'dia-' + bid,
                'type': 'diagramm',
                'topic': MODI[modus][0],
                'subtopic': MODI[modus][1],
                'concept': konzept,
                'title': titel(konzept, modus, zaehler[key]),
                'difficulty': schwierigkeit(punkte),
                'prompt': PROMPT.get(modus, 'Erstelle bzw. ergänze das Diagramm nach der Aufgabe unten. Die Beschriftungen wählst du aus den Bausteinen.'),
                'source': 'AP2 (Prüfungskompass)',
                'payload': {
                    'modus': modus,
                    'punkte': punkte,
                    'aufgabe': a.get('aufgabe') or [],
                    'start': a.get('aufgabe_diagramm'),
                    'loesung': loes,
                    'erwartung': [b.get('text', '') for b in (a.get('loesung') or []) if b.get('text')],
                },
            })
    dst = os.path.join(ROOT, 'game', 'data', 'diagramme.js')
    with open(dst, 'w', encoding='utf-8') as fh:
        fh.write('// Automatisch erzeugt mit tools/build-diagramme.py – nicht von Hand ändern.\n')
        fh.write('window.GAME_DATA = window.GAME_DATA || {};\n')
        fh.write('GAME_DATA.diagrammTasks = ')
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
        fh.write(';\n')
    arten = {}
    for t in out:
        arten[t['payload']['modus']] = arten.get(t['payload']['modus'], 0) + 1
    print(len(out), 'Aufgaben ->', os.path.relpath(dst, ROOT), arten)


if __name__ == '__main__':
    main()

window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
  { concept: 'asymmetrische-verschluesselung', title: 'Asymmetrische Verschlüsselung', figure: 'startup', lines: [
    'Merk dir: Asymmetrische Verfahren wie RSA arbeiten mit einem Schlüsselpaar aus öffentlichem und privatem Schlüssel.',
    'Zur vertraulichen Übertragung verschlüsselt der Absender mit dem öffentlichen Schlüssel des Empfängers; nur dessen privater Schlüssel entschlüsselt.',
    'Vorteil: Es muss vorab kein gemeinsames Geheimnis über einen sicheren Kanal ausgetauscht werden.',
    'Nachteil: Asymmetrische Verfahren sind rechenaufwendiger und langsamer als symmetrische Verfahren.',
    'Geht es nur darum, Veränderungen zu erkennen, ist Verschlüsselung überflüssig; dann passen Signatur oder MAC.'
  ] },
  { concept: 'backupstrategien', title: 'Backupstrategien', figure: 'kalle', lines: [
    'Merk dir: Ein Backup auf demselben Gerät oder im selben Serverschrank geht bei Brand, Diebstahl oder Defekt zusammen mit den Originaldaten verloren.',
    'Ein dauerhaft angebundenes Sicherungsziel kann bei einem Angriff mit Schadsoftware mitverschlüsselt oder gelöscht werden.',
    'Wird immer nur der letzte Stand überschrieben, lässt sich ein fehlerhafter oder verschlüsselter Bestand nicht auf einen älteren zurücksetzen.',
    'Der Sicherungsabstand bestimmt den möglichen Datenverlust: Bei wöchentlicher Sicherung können bis zu sieben Tage Arbeit fehlen.',
    'Faustregel 3-2-1: drei Kopien, auf zwei Medien, eine davon an einem anderen Ort.'
  ] },
  { concept: 'bsi-und-it-grundschutz', title: 'BSI und IT-Grundschutz', figure: 'kalle', lines: [
    'Merk dir: Das BSI ist das Bundesamt für Sicherheit in der Informationstechnik und veröffentlicht den IT-Grundschutz.',
    'IT-Grundschutz liefert Vorgehensweise und Bausteine mit Standard-Sicherheitsmaßnahmen für typische IT-Systeme, etwa für Clients.',
    'Sicherheitsupdates sollten zentral und automatisiert verteilt werden (Patchmanagement), damit bekannte Lücken schnell geschlossen sind.',
    'Administrative Tätigkeiten laufen über ein separates privilegiertes Konto; im Alltag arbeitet man mit einem Konto ohne Adminrechte.'
  ] },
  { concept: 'code-signierung', title: 'Code-Signierung', figure: 'startup', lines: [
    'Merk dir: Bei der Code-Signierung signiert der Herausgeber sein Programm mit seinem privaten Schlüssel; ein Zertifikat weist ihn aus.',
    'Das Betriebssystem prüft die Signatur und kann so Herausgeber und Unverändertheit des Programms feststellen.',
    'Fehlt eine prüfbare Signatur, warnt das System, dass die Herkunft nicht bestätigt werden kann.',
    'Eine Signatur belegt Herkunft und Unverändertheit, aber nicht, dass ein Programm fehlerfrei oder harmlos ist.'
  ] },
  { concept: 'cyberangriffe', title: 'Cyberangriffe', figure: 'datenschutz', lines: [
    'Merk dir: E-Mail-Anhänge wie Word- oder Excel-Dateien können Schadcode enthalten, der beim Öffnen ausgeführt wird.',
    'Auch erwartete Nachrichten sind nicht automatisch sicher: Absender können gefälscht oder deren Konten übernommen sein.',
    'Angreifer nutzen Schadcode, um Zugangsdaten auszulesen, Daten zu verschlüsseln oder sich im Netzwerk weiter auszubreiten.',
    'Vor dem Öffnen prüft man Absender und Kontext und meldet verdächtige Dateien der IT.'
  ] },
  { concept: 'digitale-signaturen', title: 'Digitale Signaturen', figure: 'bank', lines: [
    'Merk dir: Der Absender signiert mit seinem privaten Schlüssel; der Empfänger prüft die Signatur mit dem öffentlichen Schlüssel des Absenders.',
    'Bei erfolgreicher Prüfung ist der Absender als Urheber erkannt (Authentizität), und die Nachricht wurde nicht verändert (Integrität).',
    'Technisch wird meist ein Hashwert der Nachricht gebildet und dieser signiert; der Empfänger vergleicht Hashwerte.',
    'Eine Signatur schützt nicht vor dem Mitlesen; für Vertraulichkeit muss zusätzlich verschlüsselt werden.'
  ] }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
  { id: 'kmp-asymmetrische-verschluesselung-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'asymmetrische-verschluesselung', title: 'RSA erläutern', difficulty: 1, points: 3, figure: 'startup', source: 'AP2', prompt: 'Ein kommunales Archiv überträgt vertrauliche Vertragsakten über ein öffentliches Netz an ein externes Rechenzentrum. Die Akten sollen unterwegs nicht lesbar sein. Welche Aussage zu RSA und den Schlüsseln trifft zu?', payload: { options: [
      { text: 'RSA ist asymmetrisch: Das Archiv verschlüsselt mit seinem eigenen privaten Schlüssel, das Rechenzentrum entschlüsselt mit dem öffentlichen.', correct: false, why: 'Schlüsselrollen vertauscht; so wird signiert, nicht vertraulich verschlüsselt.' },
      { text: 'RSA ist asymmetrisch: Das Archiv verschlüsselt mit dem öffentlichen Schlüssel des Rechenzentrums, dieses entschlüsselt mit seinem privaten Schlüssel.', correct: true },
      { text: 'RSA ist symmetrisch: Beide Seiten nutzen für Ver- und Entschlüsselung denselben geheimen Schlüssel, der vorab vereinbart wird.', correct: false, why: 'Verwechslung mit symmetrischen Verfahren; RSA nutzt ein Schlüsselpaar.' },
      { text: 'RSA ist ein Hashverfahren: Es bildet aus den übertragenen Akten einen Prüfwert fester Länge, aus dem sich der Inhalt nicht zurückgewinnen lässt und der Unbefugte fernhält.', correct: false, why: 'Hashverfahren sind Einwegfunktionen und keine Verschlüsselung.' }
    ], multi: false, explanation: 'RSA ist ein asymmetrisches Verfahren. Für Vertraulichkeit verschlüsselt der Absender mit dem öffentlichen Schlüssel des Empfängers; nur der zugehörige private Schlüssel des Empfängers kann entschlüsseln.' } },
  { id: 'kmp-asymmetrische-verschluesselung-2', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'asymmetrische-verschluesselung', title: 'Vor- und Nachteil', difficulty: 2, points: 4, figure: 'startup', source: 'AP2', prompt: 'Eine Klinik schützt Uploads bisher mit einem einzigen geheimen Schlüssel, den alle Teilnehmenden erhalten. Sie erwägt ein Schlüsselpaar-Verfahren. Welche zwei Aussagen zum Vergleich sind richtig?', payload: { options: [
      { text: 'Vorteil: Ein gemeinsames Geheimnis muss nicht vorab sicher an alle Teilnehmenden verteilt werden.', correct: true },
      { text: 'Vorteil: Ein einziger privater Schlüssel kann von allen Patienten gemeinsam genutzt und gefahrlos weitergegeben werden.', correct: false, why: 'Der private Schlüssel muss geheim bleiben und gehört nur einer Seite.' },
      { text: 'Vorteil: Das Verfahren ist deutlich schneller, weil nur ein einziger Schlüssel pro Nachricht berechnet werden muss.', correct: false, why: 'Falsch: Asymmetrische Verfahren sind langsamer als symmetrische.' },
      { text: 'Nachteil: Der öffentliche Schlüssel der Klinik muss ebenso geheim gehalten werden wie der bisherige gemeinsame Schlüssel.', correct: false, why: 'Falsch: Der öffentliche Schlüssel darf frei bekannt sein.' },
      { text: 'Nachteil: Das Verfahren verursacht höheren Rechenaufwand und arbeitet langsamer als das bisherige.', correct: true }
    ], multi: true, explanation: 'Beim Schlüsselpaar entfällt der sichere Vorabaustausch eines gemeinsamen Geheimnisses, und das Verfahren skaliert gut. Der Preis ist ein höherer Rechenaufwand gegenüber symmetrischen Verfahren.' } },
  { id: 'kmp-asymmetrische-verschluesselung-3', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'asymmetrische-verschluesselung', title: 'RSA geeignet?', difficulty: 1, points: 3, figure: 'startup', source: 'AP2', prompt: 'Ein batteriebetriebener Messknoten mit schwachem Prozessor sendet Pegelstände an eine bekannte Leitstelle. Wichtig ist nur, dass Manipulationen erkannt werden; Geheimhaltung ist nicht gefordert. Vorgeschlagen wird RSA-Verschlüsselung. Ist das geeignet?', payload: { options: [
      { text: 'Ja: RSA schützt zugleich zuverlässig vor Manipulation, und der Rechenaufwand fällt bei so kleinen Messwerten auf einem Knoten nicht ins Gewicht.', correct: false, why: 'Verschlüsselung allein weist keine Unverändertheit nach; der Aufwand ist für den Knoten relevant.' },
      { text: 'Ja: Asymmetrische Verschlüsselung ist immer die sicherste Wahl und deshalb bei jeder Datenübertragung zu bevorzugen.', correct: false, why: 'Pauschalurteil; die Wahl richtet sich nach Schutzziel und Ressourcen.' },
      { text: 'Nein: Gefordert ist Nachweis unveränderter Daten, nicht Vertraulichkeit; RSA belastet Akku und Prozessor, besser passt eine Signatur oder ein MAC.', correct: true },
      { text: 'Nein: Ein Klartext-Übertragungsweg wäre völlig ausreichend, da Manipulationen bei Pegelständen einer Leitstelle grundsätzlich nicht erkannt werden müssen.', correct: false, why: 'Die Aufgabe fordert ausdrücklich, Manipulationen zu erkennen.' }
    ], multi: false, explanation: 'Das Schutzziel ist Integrität, nicht Vertraulichkeit. RSA-Verschlüsselung erfüllt das nicht gezielt und ist für den ressourcenschwachen Knoten zu aufwendig; eine Signatur oder ein MAC passt besser.' } },
  { id: 'kmp-backupstrategien-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'backupstrategien', title: 'Risiken der Sonntagssicherung', difficulty: 1, points: 2, figure: 'kalle', source: 'AP2', prompt: 'Ein Großhandel sichert seine Datenbank sonntags automatisch auf ein dauerhaft verbundenes NAS im selben Serverschrank und überschreibt dabei die Vorwochensicherung. Welche zwei Risiken bestehen?', payload: { options: [
      { text: 'Die Sicherung ist wertlos, weil ein NAS grundsätzlich keine Datenbankdateien aufnehmen kann.', correct: false, why: 'Falsch: Ein NAS kann Sicherungen speichern.' },
      { text: 'Das Überschreiben führt dazu, dass der Datenbankserver selbst nach jeder Sicherung neu installiert werden muss.', correct: false, why: 'Das Überschreiben betrifft nur den Sicherungsstand, nicht den Server.' },
      { text: 'Zwischen den Sicherungen können bis zu sieben Tage an Änderungen verloren gehen.', correct: true },
      { text: 'Ein Brand oder Diebstahl im Serverschrank zerstört Datenbank und Sicherung gleichzeitig.', correct: true },
      { text: 'Weil die Sicherung automatisch startet, ist sie zwangsläufig unvollständig und lässt sich nicht wiederherstellen.', correct: false, why: 'Automatisierung ist kein Risiko an sich, sondern sinnvoll.' }
    ], multi: true, explanation: 'Sicherung und Original stehen am selben Ort und teilen sich das Schadensrisiko. Zudem erfolgt die Sicherung nur wöchentlich, sodass bis zu eine Woche Daten fehlen kann.' } },
  { id: 'kmp-backupstrategien-2', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'backupstrategien', title: 'Sicherung auf zweiter Festplatte', difficulty: 1, points: 2, figure: 'kalle', source: 'AP2', prompt: 'Ein Planungsbüro sichert Projektdateien freitags auf eine zweite, fest eingebaute Festplatte desselben Rechners und überschreibt dabei den alten Stand. Welches Risiko besteht hier besonders?', payload: { options: [
      { text: 'Fällt der Rechner durch Diebstahl oder Überspannung aus, sind Original und Sicherung zugleich verloren.', correct: true },
      { text: 'Ein wöchentlicher Rhythmus ist zu häufig, weil dadurch das Betriebssystem zu oft neu gestartet werden muss.', correct: false, why: 'Häufigere Sicherung senkt das Risiko.' },
      { text: 'Die zweite Festplatte verlangsamt den Rechner dauerhaft so stark, dass keine Projektdateien mehr geöffnet werden können.', correct: false, why: 'Erfundene Folge; das Risiko liegt im gemeinsamen Ausfall.' },
      { text: 'Festplatten im selben Gehäuse können nur lesend genutzt werden, daher lässt sich nichts darauf sichern.', correct: false, why: 'Falsch: Interne Zweitfestplatten sind beschreibbar.' }
    ], multi: false, explanation: 'Ein Backup im selben Gerät schützt nicht vor Diebstahl, Brand, Überspannung oder Totalausfall. Sicherung gehört auf ein getrenntes Medium an einem anderen Ort.' } },
  { id: 'kmp-backupstrategien-3', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'backupstrategien', title: 'Sicherung auf gleichem Host', difficulty: 1, points: 2, figure: 'kalle', source: 'AP2', prompt: 'Ein Gewächshausbetrieb sichert montags Messdaten in eine virtuelle Maschine auf demselben Host und Datenspeicher und hebt nur den aktuellen Wochenstand auf. Was ist ein Risiko?', payload: { options: [
      { text: 'Virtuelle Maschinen dürfen laut Standard nie Daten anderer Systeme aufnehmen, sodass die Sicherung abgelehnt wird.', correct: false, why: 'Erfundene Regel; technisch ist das möglich.' },
      { text: 'Da Daten und Sicherung nebeneinander liegen, ist die Wiederherstellung immer schneller und damit fehleranfälliger.', correct: false, why: 'Schnelle Wiederherstellung ist kein Risiko.' },
      { text: 'Der Montag ist ungeeignet, weil Sicherungen ausschließlich am Wochenende ausgeführt werden dürfen.', correct: false, why: 'Es gibt keine Vorgabe zum Wochentag.' },
      { text: 'Ein Ausfall von Host oder Datenspeicher trifft Daten und Sicherung gemeinsam; ältere Stände existieren nicht.', correct: true }
    ], multi: false, explanation: 'Sicherung und Produktivdaten hängen am gleichen Host und Speicher (gemeinsamer Ausfallpunkt), und mit nur einem Stand kann kein älterer Zustand zurückgeholt werden.' } },
  { id: 'kmp-bsi-und-it-grundschutz-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'bsi-und-it-grundschutz', title: 'Maßnahmen für einen PC-Client', difficulty: 1, points: 2, figure: 'kalle', source: 'AP2', prompt: 'Ein kommunales Archiv richtet einen PC-Client ein. Vorgaben: Software soll automatisch aktualisiert werden, und normale sowie administrative Rechte sollen getrennt sein. Welche zwei Maßnahmen setzen das um?', payload: { options: [
      { text: 'Für Administration wird ein separates Konto eingerichtet, im Alltag gilt ein Standardkonto.', correct: true },
      { text: 'Alle Beschäftigten erhalten dauerhaft lokale Administratorrechte, damit sie Updates selbst einspielen können.', correct: false, why: 'Widerspricht der Trennung der Rechte.' },
      { text: 'Updates werden abgeschaltet und nur einmal jährlich bei der Gerätewartung von Hand geprüft und installiert.', correct: false, why: 'Nicht automatisiert; Lücken bleiben lange offen.' },
      { text: 'Alle nutzen ein gemeinsames Administratorkonto mit einem einheitlichen Kennwort, das der Einfachheit halber im Büro sichtbar ausgehängt wird.', correct: false, why: 'Hebt die Rechtetrennung auf und verhindert Nachvollziehbarkeit.' },
      { text: 'Freigegebene Updates werden zentral und automatisch verteilt und installiert.', correct: true }
    ], multi: true, explanation: 'Automatisches Patchmanagement schließt bekannte Lücken zeitnah. Getrennte Konten für Alltag und Administration begrenzen, was Fehler und Schadsoftware anrichten können.' } },
  { id: 'kmp-bsi-und-it-grundschutz-2', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'bsi-und-it-grundschutz', title: 'Nutzen der Kontentrennung', difficulty: 1, points: 2, figure: 'kalle', source: 'AP2', prompt: 'Warum verlangt der IT-Grundschutz, dass Beschäftigte im Alltag mit einem Konto ohne Administratorrechte arbeiten?', payload: { options: [
      { text: 'Administratorkonten dürfen laut BSI ausschließlich in Rechenzentren existieren, auf normalen Arbeitsplatzrechnern sind sie grundsätzlich untersagt.', correct: false, why: 'Erfundene Regel; es geht um Trennung.' },
      { text: 'Mit Adminrechten arbeitet der Rechner spürbar langsamer, deshalb wird im Alltag aus Leistungsgründen ein Standardkonto bevorzugt.', correct: false, why: 'Sicherheitsgrund, nicht Geschwindigkeit.' },
      { text: 'Standardkonten verschlüsseln automatisch alle Dateien des Rechners, sodass Schadsoftware sie grundsätzlich nicht mehr lesen oder verändern kann.', correct: false, why: 'Konten verschlüsseln nicht von selbst.' },
      { text: 'Schadsoftware, die im Alltagskonto läuft, kann das System nicht mit Adminrechten verändern; der Schaden bleibt begrenzt.', correct: true }
    ], multi: false, explanation: 'Prinzip der minimalen Rechte: Malware erbt die Rechte des angemeldeten Kontos. Ohne Adminrechte kann sie systemweite Einstellungen kaum verändern.' } },
  { id: 'kmp-bsi-und-it-grundschutz-3', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'bsi-und-it-grundschutz', title: 'Aufgabe des BSI', difficulty: 1, points: 2, figure: 'kalle', source: 'AP2', prompt: 'Welche Aussage zum BSI und zum IT-Grundschutz stimmt?', payload: { options: [
      { text: 'Das BSI ist eine private Firma, die Firewalls verkauft und dafür eigene Sicherheitskonzepte lizenziert.', correct: false, why: 'Das BSI ist eine Bundesbehörde.' },
      { text: 'Das BSI stellt im IT-Grundschutz Bausteine mit Standard-Sicherheitsmaßnahmen für typische IT-Systeme bereit.', correct: true },
      { text: 'Das BSI kontrolliert täglich alle Firmennetzwerke in Deutschland und behebt Störungen selbst vor Ort.', correct: false, why: 'Falsch; es berät und veröffentlicht Standards.' },
      { text: 'Der IT-Grundschutz regelt ausschließlich den Umgang mit personenbezogenen Daten in Vereinen.', correct: false, why: 'Das ist Datenschutz; Grundschutz betrifft Informationssicherheit.' }
    ], multi: false, explanation: 'Das Bundesamt für Sicherheit in der Informationstechnik ist eine Bundesbehörde. Der IT-Grundschutz bietet Vorgehensweise und Bausteine mit Standardmaßnahmen.' } },
  { id: 'kmp-code-signierung-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'code-signierung', title: 'Meldung deuten', difficulty: 1, points: 2, figure: 'startup', source: 'AP2', prompt: 'Beim ersten Start eines intern entwickelten Programms meldet das Betriebssystem: „Die Herkunft dieser Anwendung konnte nicht bestätigt werden.“ Was bedeutet das?', payload: { options: [
      { text: 'Das Programm wurde mit einem symmetrischen Schlüssel verschlüsselt, den das System nicht kennt.', correct: false, why: 'Signierung ist keine symmetrische Verschlüsselung.' },
      { text: 'Das Programm enthält nachweislich einen Virus, den das Betriebssystem beim ersten Start erkannt und den Start deshalb blockiert hat.', correct: false, why: 'Die Meldung sagt nichts über konkrete Schadsoftware.' },
      { text: 'Es liegt keine prüfbare Code-Signierung vor, daher kann das System das Programm keinem vertrauenswürdigen Herausgeber zuordnen.', correct: true },
      { text: 'Die Festplatte des Notebooks ist voll, daher kann das System die Herkunftsdaten des Programms nicht mehr sicher speichern und prüfen.', correct: false, why: 'Kein Speicherplatzproblem.' }
    ], multi: false, explanation: 'Ohne prüfbare Signatur mit vertrauenswürdigem Zertifikat kann das System die Authentizität des Herausgebers nicht bestätigen und warnt deshalb.' } },
  { id: 'kmp-code-signierung-2', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'code-signierung', title: 'Build-Prozess anpassen', difficulty: 1, points: 2, figure: 'startup', source: 'AP2', prompt: 'Für ein Auskunftsterminal wird eine Desktopanwendung automatisiert gebaut und verteilt. Beim Start erscheint eine Warnung zur nicht bestätigten Herkunft. Wie passt man den Build an?', payload: { options: [
      { text: 'Die Build-Konfiguration trägt den Namen des Herausgebers als Text in die Programmdatei ein, ohne Zertifikat.', correct: false, why: 'Ein Name ohne Zertifikat ist nicht prüfbar.' },
      { text: 'Die Build-Konfiguration schaltet die Warnmeldungen des Betriebssystems auf allen Terminals per Skript dauerhaft ab und blendet sie künftig aus.', correct: false, why: 'Unterdrückt nur die Warnung, löst das Problem nicht.' },
      { text: 'Die Build-Konfiguration komprimiert das Programm deutlich stärker, damit das Zielsystem die kleinere Dateigröße als Herkunftsnachweis nutzen kann.', correct: false, why: 'Kompression ist kein Herkunftsnachweis.' },
      { text: 'Die Build-Konfiguration signiert das erzeugte Programm mit einem vertrauenswürdigen Code-Signing-Zertifikat, sodass Zielsysteme die Signatur prüfen können.', correct: true }
    ], multi: false, explanation: 'Der Erzeugungsprozess muss das Programm mit einem Signierungszertifikat einer vertrauenswürdigen Stelle signieren; dann kann das Zielsystem die Herkunft prüfen.' } },
  { id: 'kmp-code-signierung-3', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'code-signierung', title: 'Was die Signatur belegt', difficulty: 1, points: 2, figure: 'startup', source: 'AP2', prompt: 'Ein Softwarehaus signiert sein Programm. Was kann das Betriebssystem durch die Signatur feststellen?', payload: { options: [
      { text: 'Dass alle Daten, die das Programm später erzeugt, automatisch verschlüsselt und vor jedem Zugriff Unbefugter geschützt sind.', correct: false, why: 'Signatur verschlüsselt keine Nutzdaten.' },
      { text: 'Dass das Programm garantiert frei von Programmierfehlern und Sicherheitslücken ist, da es geprüft wurde.', correct: false, why: 'Signatur sagt nichts über Fehlerfreiheit.' },
      { text: 'Wer der Herausgeber ist und dass das Programm seit dem Signieren nicht verändert wurde.', correct: true },
      { text: 'Dass das Programm nur mit einer bezahlten Lizenz gestartet werden darf und sonst automatisch abbricht.', correct: false, why: 'Lizenzprüfung ist ein anderes Thema.' }
    ], multi: false, explanation: 'Die Signatur weist die Herkunft nach und macht nachträgliche Änderungen erkennbar. Über Qualität oder Harmlosigkeit sagt sie nichts aus.' } },
  { id: 'kmp-cyberangriffe-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'cyberangriffe', title: 'Risiko Word-Anhang', difficulty: 1, points: 2, figure: 'datenschutz', source: 'AP2', prompt: 'Ein Architekturbüro schickt Bauherren vor Terminen Entwurfsunterlagen als Word-Datei per E-Mail. Welches Sicherheitsrisiko kann beim Öffnen entstehen?', payload: { options: [
      { text: 'Eine manipulierte Datei kann beim Öffnen Schadcode ausführen und Endgerät oder erreichbare Daten beeinträchtigen.', correct: true },
      { text: 'Der Anhang erhöht lediglich die Dateigröße der E-Mail, was höchstens das Postfach des Empfängers füllt.', correct: false, why: 'Verharmlosung; das Risiko liegt im Inhalt.' },
      { text: 'Word-Dateien werden beim Öffnen immer automatisch gelöscht, sodass die Entwürfe unwiederbringlich verloren gehen.', correct: false, why: 'Erfundene Folge, kein typischer Angriff.' },
      { text: 'Das Risiko besteht nur bei der Übertragung; das Öffnen einer erhaltenen Datei ist grundsätzlich unkritisch.', correct: false, why: 'Das Öffnen selbst kann Schadcode auslösen.' }
    ], multi: false, explanation: 'Manipulierte Office-Dokumente können Schadcode enthalten, der beim Öffnen läuft und Daten oder Systeme gefährdet. Ein zu erwartender Anhang ist nicht automatisch sicher.' } },
  { id: 'kmp-cyberangriffe-2', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'cyberangriffe', title: 'Risiko Excel-Abrechnung', difficulty: 1, points: 2, figure: 'datenschutz', source: 'AP2', prompt: 'Eine Lohnabrechnungsstelle sendet Arbeitgebern monatlich eine erwartete Excel-Datei per E-Mail-Anhang. Wie kann eine gefälschte Datei schaden?', payload: { options: [
      { text: 'Sie kann die Internetverbindung zum Anbieter dauerhaft drosseln, damit spätere Abrechnungen langsamer eintreffen.', correct: false, why: 'Unrealistische Folge.' },
      { text: 'Sie kann den Absender der Abrechnungsstelle automatisch aus dem Adressbuch des Empfängers löschen und sperren.', correct: false, why: 'Kein typischer Angriffsweg.' },
      { text: 'Beim Öffnen kann sie schädliche Inhalte aktivieren, Zugangsdaten auslesen und an Angreifer übertragen.', correct: true },
      { text: 'Sie kann nur die Formatierung der Tabelle verändern, was ausschließlich das Layout der Abrechnung betrifft.', correct: false, why: 'Untertreibt die Möglichkeiten von Schadcode.' }
    ], multi: false, explanation: 'Gefälschte Abrechnungsdateien können Schadcode ausführen, der Zugangsdaten ausliest und an Angreifer sendet.' } },
  { id: 'kmp-cyberangriffe-3', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'cyberangriffe', title: 'Erwartete Mail ohne Risiko?', difficulty: 1, points: 2, figure: 'datenschutz', source: 'AP2', prompt: 'Ein Weiterbildungsanbieter schickt Teilnehmenden nach dem Seminar erwartungsgemäß eine PowerPoint-Datei. Ein Teilnehmer meint: „Die Mail ist erwartet, also ist sie sicher.“ Was stimmt?', payload: { options: [
      { text: 'Das stimmt nicht: Gefährlich sind ausschließlich Anhänge unbekannter Absender, bekannte Absender sind grundsätzlich nie davon betroffen.', correct: false, why: 'Auch bekannte Absender können kompromittiert sein.' },
      { text: 'Das stimmt: Erwartete Mails werden vom Mailserver immer als sicher eingestuft und von Schadcode befreit.', correct: false, why: 'Kein Server garantiert das.' },
      { text: 'Das stimmt: Präsentationsdateien können technisch keinen Schadcode enthalten, nur Excel- und Word-Dateien.', correct: false, why: 'Auch PowerPoint kann manipuliert sein.' },
      { text: 'Das stimmt nicht: Absender können gefälscht oder Konten übernommen sein, die Datei kann trotzdem Schadcode enthalten.', correct: true }
    ], multi: false, explanation: 'Ein erwarteter Anhang kann trotzdem manipuliert sein, etwa durch Absenderfälschung oder ein gekapertes Konto. Vorsicht gilt immer.' } },
  { id: 'kmp-digitale-signaturen-1', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'digitale-signaturen', title: 'Ablauf beschreiben', difficulty: 2, points: 4, figure: 'bank', source: 'AP2', prompt: 'Schichtleiterin Jana Krüger sendet eine verbindliche Versandfreigabe an die Leitstelle eines Frachtführers. Ihr öffentlicher Schlüssel ist der Leitstelle zugänglich. Welcher Ablauf ist richtig?', payload: { options: [
      { text: 'Jana signiert mit dem öffentlichen Schlüssel der Leitstelle; nur die Leitstelle kann die Signatur mit ihrem privaten Schlüssel prüfen.', correct: false, why: 'Schlüsselrollen vertauscht; das wäre Verschlüsselung.' },
      { text: 'Jana signiert mit ihrem privaten Schlüssel; die Leitstelle prüft mit Janas öffentlichem Schlüssel und kann sie als Urheberin zuordnen.', correct: true },
      { text: 'Jana signiert mit ihrem öffentlichen Schlüssel; die Leitstelle prüft mit Janas privatem Schlüssel, den sie mitgeschickt bekommt.', correct: false, why: 'Privater Schlüssel wird nie weitergegeben.' },
      { text: 'Jana verschlüsselt die Nachricht mit einem Passwort; die Leitstelle erkennt Jana daran, dass sie dasselbe Passwort kennt.', correct: false, why: 'Beschreibt symmetrische Verschlüsselung, keine Signatur.' }
    ], multi: false, explanation: 'Signiert wird mit dem privaten Schlüssel des Absenders, geprüft mit dessen öffentlichem Schlüssel. Ein Erfolg ordnet die Nachricht der Urheberin zu und belegt Authentizität.' } },
  { id: 'kmp-digitale-signaturen-2', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'digitale-signaturen', title: 'Aussage der Prüfung', difficulty: 1, points: 3, figure: 'bank', source: 'AP2', prompt: 'Ein Server prüft die Signatur einer Freigabenachricht erfolgreich. Was ist damit belegt?', payload: { options: [
      { text: 'Die Nachricht stammt vom Inhaber des Schlüsselpaars und wurde auf dem Weg nicht verändert.', correct: true },
      { text: 'Die Nachricht ist während der Übertragung verschlüsselt worden, sodass Dritte sie nicht mitlesen konnten.', correct: false, why: 'Signatur bietet keine Vertraulichkeit.' },
      { text: 'Die Nachricht ist inhaltlich richtig, und die freigegebene Aussonderungsliste enthält garantiert keinerlei Fehler oder Lücken.', correct: false, why: 'Inhaltliche Richtigkeit wird nicht bestätigt.' },
      { text: 'Die Nachricht wurde vom Server selbst erzeugt, weil nur er den zur Prüfung nötigen privaten Schlüssel besitzt.', correct: false, why: 'Prüfung nutzt öffentlichen Schlüssel des Absenders.' }
    ], multi: false, explanation: 'Eine erfolgreiche Prüfung weist Urheberschaft (Authentizität) und Unverändertheit (Integrität) nach, nicht aber Vertraulichkeit oder inhaltliche Richtigkeit.' } },
  { id: 'kmp-digitale-signaturen-3', type: 'auswahl', topic: 'wirtschaft', subtopic: 'IT-Sicherheit', concept: 'digitale-signaturen', title: 'Signatur und Vertraulichkeit', difficulty: 1, points: 3, figure: 'bank', source: 'AP2', prompt: 'Ein Techniker meldet per signierter Nachricht die Reparatur einer Ampel. Ein Kollege sagt, die Signatur verberge den Inhalt. Was stimmt?', payload: { options: [
      { text: 'Das stimmt: Wer die Signatur nicht prüfen kann, kann auch den Text der Nachricht nicht lesen.', correct: false, why: 'Nachricht liegt im Klartext vor.' },
      { text: 'Das stimmt: Das Signieren verschlüsselt die Nachricht automatisch mit dem öffentlichen Schlüssel der Leitstelle.', correct: false, why: 'Signieren verschlüsselt nicht.' },
      { text: 'Das stimmt nicht: Die Signatur belegt Herkunft und Unverändertheit; für Geheimhaltung müsste zusätzlich verschlüsselt werden.', correct: true },
      { text: 'Das stimmt nicht: Signaturen dürfen nur bei geheimen Nachrichten verwendet werden und sind sonst unzulässig.', correct: false, why: 'Erfundene Einschränkung.' }
    ], multi: false, explanation: 'Eine Signatur schützt Integrität und Authentizität. Der Nachrichtentext bleibt lesbar, sofern er nicht zusätzlich verschlüsselt wird.' } }
]);

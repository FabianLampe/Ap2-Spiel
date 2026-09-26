window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.handbuch = (GAME_DATA.handbuch || []).concat([
  { id: 'py-grundlagen', bereich: 'Python', title: 'Python: Grundlagen', entries: [
    { id: 'py-variablen', title: 'Variablen und Datentypen', keywords: ['variable', 'int', 'str', 'float', 'bool', 'datentyp', 'type', 'zuweisung'],
      kurz: 'Eine Variable ist ein Name, der auf einen Wert zeigt; der Datentyp ergibt sich aus dem Wert.',
      syntax: 'name = wert',
      erklaerung: [
        'Python ist dynamisch typisiert: Der Typ gehoert zum Wert, nicht zur Variablen. Die wichtigsten Grundtypen sind int (ganze Zahl), float (Kommazahl), str (Text), bool (True/False) und None (kein Wert).',
        'Mit type(x) fragt man den Typ ab, mit int(), float(), str(), bool() wandelt man Werte um. Variablennamen bestehen aus Buchstaben, Ziffern und Unterstrich, beginnen nicht mit einer Ziffer und unterscheiden Gross-/Kleinschreibung.'
      ],
      beispiel: [{ code: 'alter = 42\npreis = 9.99\nname = "Ada"\naktiv = True\nprint(type(preis))   # <class \'float\'>\nzahl = int("17") + 3  # 20', hinweis: 'Text mit Zahlen muss vor dem Rechnen mit int() oder float() umgewandelt werden.' }],
      stolperfallen: ['"5" + 3 wirft einen TypeError: str und int lassen sich nicht addieren.', 'Boolesche Werte schreibt man True und False, gross geschrieben.'],
      siehe: ['py-operatoren', 'py-ausgabe-eingabe'] },
    { id: 'py-operatoren', title: 'Operatoren', keywords: ['operator', 'modulo', 'vergleich', 'and', 'or', 'not', 'rechnen', 'floor division'],
      kurz: 'Operatoren verknuepfen Werte: arithmetisch, vergleichend und logisch.',
      syntax: '+  -  *  /  //  %  **   ==  !=  <  >  <=  >=   and  or  not',
      erklaerung: [
        'Arithmetik: / liefert immer float, // teilt ganzzahlig (abgerundet), % ist der Rest (Modulo), ** ist die Potenz. Zusammengesetzte Zuweisungen wie += oder *= kuerzen x = x + 1 ab.',
        'Vergleiche liefern bool. Mit and, or und not werden Bedingungen kombiniert; and bindet staerker als or. Mit in prueft man Zugehoerigkeit ("a" in "Ada"), mit is die Objektidentitaet (vor allem bei None).'
      ],
      beispiel: [{ code: 'print(7 / 2)    # 3.5\nprint(7 // 2)   # 3\nprint(7 % 2)    # 1\nprint(2 ** 10)  # 1024\nx = 5\nprint(1 < x <= 10 and x != 7)  # True' }],
      stolperfallen: ['= weist zu, == vergleicht. In einer Bedingung ist fast immer == gemeint.', 'Gleitkommazahlen sind ungenau: 0.1 + 0.2 == 0.3 ist False.'],
      siehe: ['py-bedingungen'] },
    { id: 'py-ausgabe-eingabe', title: 'Ein- und Ausgabe: print, input, f-Strings', keywords: ['print', 'input', 'f-string', 'formatierung', 'ausgabe', 'eingabe', 'format'],
      kurz: 'print gibt Text aus, input liest eine Zeile als str ein, f-Strings setzen Werte in Text ein.',
      syntax: 'print(wert1, wert2, sep=" ", end="\\n")\neingabe = input("Prompt: ")\nf"Text {ausdruck}"',
      erklaerung: [
        'input() liefert immer einen String. Fuer Zahlen muss man umwandeln: alter = int(input("Alter: ")).',
        'Ein f-String beginnt mit f vor dem Anfuehrungszeichen. In geschweiften Klammern steht ein beliebiger Ausdruck, dahinter nach einem Doppelpunkt optional das Format, z. B. :.2f fuer zwei Nachkommastellen oder :>8 fuer rechtsbuendig in Breite 8.'
      ],
      beispiel: [{ code: 'name = input("Name: ")\npreis = 19.5\nprint(f"Hallo {name}, Preis: {preis:.2f} EUR")\nprint("a", "b", sep="-", end="!\\n")  # a-b!' }],
      stolperfallen: ['input("5") + 3 scheitert, weil das Ergebnis ein str ist.'],
      siehe: ['py-variablen', 'py-strings'] },
    { id: 'py-bedingungen', title: 'Bedingungen: if, elif, else', keywords: ['if', 'elif', 'else', 'verzweigung', 'bedingung', 'einrueckung'],
      kurz: 'Mit if/elif/else fuehrt man Codeblöcke nur aus, wenn eine Bedingung wahr ist.',
      syntax: 'if bedingung:\n    ...\nelif andere_bedingung:\n    ...\nelse:\n    ...',
      erklaerung: [
        'Python erkennt Bloecke an der Einrueckung (ueblich sind vier Leerzeichen) und am Doppelpunkt. Es wird der erste Zweig ausgefuehrt, dessen Bedingung wahr ist; else faengt alles uebrige ab.',
        'Als falsch gelten False, None, 0, leere Strings und leere Sammlungen. Alles andere gilt als wahr, daher kann man if liste: schreiben, um auf "nicht leer" zu pruefen.'
      ],
      beispiel: [{ code: 'note = 2\nif note == 1:\n    print("sehr gut")\nelif note <= 3:\n    print("gut bis befriedigend")\nelse:\n    print("schwaecher")' }],
      stolperfallen: ['Fehlende oder gemischte Einrueckung fuehrt zu IndentationError.', 'if x = 5: ist ein Syntaxfehler; gemeint ist ==.'],
      siehe: ['py-operatoren'] },
    { id: 'py-for-range', title: 'for-Schleife und range', keywords: ['for', 'range', 'schleife', 'iterieren', 'enumerate', 'zaehlschleife'],
      kurz: 'Die for-Schleife durchlaeuft die Elemente einer Sammlung; range erzeugt Zahlenfolgen.',
      syntax: 'for element in sammlung:\n    ...\nrange(stop)  range(start, stop, schritt)',
      erklaerung: [
        'range(5) liefert 0 bis 4, der Endwert ist nie enthalten. range(2, 10, 2) liefert 2, 4, 6, 8. Rueckwaerts geht es mit negativem Schritt: range(5, 0, -1).',
        'Mit enumerate() bekommt man Index und Wert gleichzeitig, mit zip() lassen sich zwei Sammlungen parallel durchlaufen. break beendet die Schleife, continue springt zum naechsten Durchlauf.'
      ],
      beispiel: [{ code: 'summe = 0\nfor i in range(1, 6):\n    summe += i\nprint(summe)  # 15\nfor idx, name in enumerate(["a", "b"]):\n    print(idx, name)\nfor zahl in [1, 2, 3, 4]:\n    if zahl == 2:\n        continue\n    if zahl == 4:\n        break\n    print(zahl)  # 1, 3' }],
      stolperfallen: ['range(n) laeuft bis n-1, nicht bis n.', 'Eine Liste waehrend der Iteration zu veraendern fuehrt zu ueberraschenden Ergebnissen.'],
      siehe: ['py-while', 'py-listen'] },
    { id: 'py-while', title: 'while-Schleife, break und continue', keywords: ['while', 'schleife', 'break', 'continue', 'endlosschleife', 'abbruch'],
      kurz: 'while wiederholt einen Block, solange eine Bedingung wahr ist.',
      syntax: 'while bedingung:\n    ...',
      erklaerung: [
        'Die Bedingung wird vor jedem Durchlauf geprueft. Damit die Schleife endet, muss im Block etwas geschehen, das die Bedingung irgendwann falsch macht. Sonst entsteht eine Endlosschleife.',
        'break verlaesst die Schleife sofort, continue springt zur naechsten Pruefung. Ein optionales else nach der Schleife laeuft nur, wenn kein break ausgeloest wurde.'
      ],
      beispiel: [{ code: 'n = 27\nschritte = 0\nwhile n != 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    schritte += 1\nprint(schritte)\n\nwhile True:\n    eingabe = input("Zahl (q = Ende): ")\n    if eingabe == "q":\n        break' }],
      stolperfallen: ['Vergessene Aenderung der Schleifenvariable erzeugt eine Endlosschleife (Abbruch mit Strg+C).'],
      siehe: ['py-for-range'] }
  ] },
  { id: 'py-datenstrukturen', bereich: 'Python', title: 'Python: Datenstrukturen', entries: [
    { id: 'py-listen', title: 'Listen', keywords: ['list', 'liste', 'append', 'array', 'sort', 'pop', 'remove'],
      kurz: 'Eine Liste ist eine geordnete, veraenderbare Folge beliebiger Werte.',
      syntax: 'liste = [1, 2, 3]\nliste[0]  liste.append(x)  len(liste)',
      erklaerung: [
        'Der Zugriff erfolgt per Index ab 0, negative Indizes zaehlen von hinten (liste[-1] ist das letzte Element). Wichtige Methoden: append(x) haengt an, insert(i, x) fuegt ein, remove(x) loescht den ersten passenden Wert, pop(i) entfernt und liefert das Element, sort() sortiert in place, index(x) und count(x) suchen.',
        'sorted(liste) liefert eine neue sortierte Liste und laesst das Original unveraendert. len(), sum(), min(), max() funktionieren mit Listen. Eine Kopie erzeugt liste.copy() oder liste[:]; eine reine Zuweisung kopiert nicht.'
      ],
      beispiel: [{ code: 'zahlen = [5, 2, 9]\nzahlen.append(1)\nzahlen.sort()\nprint(zahlen)       # [1, 2, 5, 9]\nprint(zahlen[-1])   # 9\nprint(2 in zahlen)  # True' }],
      stolperfallen: ['b = a erzeugt keine Kopie, beide Namen zeigen auf dieselbe Liste.', 'liste.sort() gibt None zurueck; x = liste.sort() ist fast immer ein Fehler.', 'Index ausserhalb des Bereichs wirft IndexError.'],
      siehe: ['py-slicing', 'py-tupel', 'py-comprehensions'] },
    { id: 'py-slicing', title: 'Slicing (Teilbereiche)', keywords: ['slicing', 'slice', 'teilbereich', 'schnitt', 'index'],
      kurz: 'Mit [start:stop:schritt] schneidet man Teilbereiche aus Listen, Tupeln und Strings.',
      syntax: 'folge[start:stop]\nfolge[start:stop:schritt]',
      erklaerung: [
        'start ist enthalten, stop nicht. Fehlt eine Angabe, gilt Anfang bzw. Ende. Negative Werte zaehlen vom Ende.',
        'Slicing liefert immer ein neues Objekt und wirft bei zu grossen Grenzen keinen Fehler. [::-1] kehrt die Reihenfolge um.'
      ],
      beispiel: [{ code: 'z = [10, 20, 30, 40, 50]\nprint(z[1:3])   # [20, 30]\nprint(z[:2])    # [10, 20]\nprint(z[-2:])   # [40, 50]\nprint(z[::2])   # [10, 30, 50]\nprint("Python"[::-1])  # nohtyP' }],
      stolperfallen: ['Der Endindex ist exklusiv: z[1:3] enthaelt nur zwei Elemente.'],
      siehe: ['py-listen', 'py-strings'] },
    { id: 'py-tupel', title: 'Tupel', keywords: ['tuple', 'tupel', 'unveraenderlich', 'unpacking', 'entpacken'],
      kurz: 'Ein Tupel ist eine geordnete, unveraenderliche Folge von Werten.',
      syntax: 't = (1, 2, 3)\nx, y = t',
      erklaerung: [
        'Tupel werden mit runden Klammern (oder nur Kommas) geschrieben und koennen nach dem Erzeugen nicht geaendert werden. Sie eignen sich fuer feste Wertgruppen wie Koordinaten oder mehrere Rueckgabewerte einer Funktion.',
        'Beim Entpacken (unpacking) werden die Elemente auf mehrere Variablen verteilt. Weil Tupel unveraenderlich sind, duerfen sie als Dictionary-Schluessel und in Mengen dienen.'
      ],
      beispiel: [{ code: 'punkt = (3, 4)\nx, y = punkt\neinzeln = (5,)      # Komma noetig\na, b = 1, 2\na, b = b, a       # Tausch\nprint(a, b)        # 2 1' }],
      stolperfallen: ['Ein Tupel mit einem Element braucht ein Komma: (5,) statt (5).', 't[0] = 1 wirft einen TypeError.'],
      siehe: ['py-listen', 'py-dict'] },
    { id: 'py-dict', title: 'Dictionaries', keywords: ['dict', 'dictionary', 'schluessel', 'key', 'value', 'items', 'get', 'map'],
      kurz: 'Ein Dictionary speichert Schluessel-Wert-Paare mit schnellem Zugriff ueber den Schluessel.',
      syntax: 'd = {"name": "Ada", "alter": 36}\nd["name"]  d.get("x", standard)',
      erklaerung: [
        'Schluessel muessen eindeutig und unveraenderlich sein (z. B. str, int, Tupel). d[key] = wert legt an oder ueberschreibt; del d[key] loescht. Mit d.get(key, standard) vermeidet man einen KeyError bei fehlendem Schluessel.',
        'Iteration: for k in d (Schluessel), d.values() (Werte), d.items() (Paare). "key" in d prueft auf Vorhandensein eines Schluessels. Dictionaries behalten die Einfuegereihenfolge.'
      ],
      beispiel: [{ code: 'punkte = {"Ada": 10, "Bob": 7}\npunkte["Cy"] = 5\nfor name, p in punkte.items():\n    print(name, p)\nprint(punkte.get("Zed", 0))  # 0\nprint("Ada" in punkte)       # True' }],
      stolperfallen: ['d["fehlt"] wirft KeyError; get() liefert None oder den Standardwert.', 'Listen koennen nicht Schluessel sein (nicht hashbar).'],
      siehe: ['py-mengen', 'py-tupel'] },
    { id: 'py-mengen', title: 'Mengen (set)', keywords: ['set', 'menge', 'mengen', 'union', 'schnittmenge', 'duplikate'],
      kurz: 'Eine Menge speichert Werte ohne Duplikate und ohne feste Reihenfolge.',
      syntax: 'm = {1, 2, 3}\nleer = set()',
      erklaerung: [
        'Mengen sind schnell bei der Pruefung "ist enthalten?" und eignen sich, um Duplikate zu entfernen: set(liste). Methoden: add(x), remove(x) (Fehler, wenn fehlt), discard(x) (kein Fehler).',
        'Mengenoperationen: a | b oder a.union(b) Vereinigung, a & b Schnitt, a - b Differenz, a ^ b symmetrische Differenz. Mengen sind nicht indizierbar und nicht slicebar, weil sie ungeordnet sind.'
      ],
      beispiel: [{ code: 'a = {1, 2, 3}\nb = {3, 4}\nprint(a | b)  # {1, 2, 3, 4}\nprint(a & b)  # {3}\nprint(a - b)  # {1, 2}\nprint(set([1, 1, 2]))  # {1, 2}' }],
      stolperfallen: ['{} ist ein leeres Dictionary, keine leere Menge; dafuer set() verwenden.'],
      siehe: ['py-dict', 'py-listen'] },
    { id: 'py-strings', title: 'Zeichenketten und ihre Methoden', keywords: ['string', 'str', 'split', 'join', 'replace', 'strip', 'upper', 'lower', 'find', 'zeichenkette', 'text'],
      kurz: 'Strings sind unveraenderliche Zeichenfolgen mit vielen eingebauten Methoden.',
      syntax: 's.upper()  s.lower()  s.strip()  s.split(sep)  sep.join(liste)  s.replace(alt, neu)',
      erklaerung: [
        'Methoden geben immer einen neuen String zurueck, das Original bleibt unveraendert. Haeufig genutzt: strip() entfernt Leerraum an den Raendern, split() zerlegt in eine Liste, "-".join(liste) fuegt zusammen, find(x) liefert den Index oder -1, startswith()/endswith() pruefen Anfang und Ende, count() zaehlt Vorkommen.',
        'Strings unterstuetzen Indexierung und Slicing (s[0], s[1:4]) und len(s). Mehrzeilige Texte schreibt man in dreifachen Anfuehrungszeichen.'
      ],
      beispiel: [{ code: 's = "  Hallo Welt  "\nprint(s.strip().upper())        # HALLO WELT\nteile = "a,b,c".split(",")      # [\'a\', \'b\', \'c\']\nprint("-".join(teile))          # a-b-c\nprint("Hallo".replace("l", "L")) # HaLLo' }],
      stolperfallen: ['s.upper() allein aendert s nicht; das Ergebnis muss zugewiesen werden.', 's[0] = "X" ist nicht erlaubt (TypeError).'],
      siehe: ['py-slicing', 'py-ausgabe-eingabe'] },
    { id: 'py-comprehensions', title: 'List Comprehensions', keywords: ['comprehension', 'list comprehension', 'listen erzeugen', 'dict comprehension'],
      kurz: 'Eine Comprehension erzeugt eine Liste (oder Menge/Dict) in einem Ausdruck aus einer Schleife.',
      syntax: '[ausdruck for x in folge if bedingung]',
      erklaerung: [
        'Die Schreibweise ersetzt eine for-Schleife mit append. Der optionale if-Teil filtert Elemente. Analog gibt es {ausdruck for ...} fuer Mengen und {k: v for ...} fuer Dictionaries.',
        'Fuer sehr komplexe Logik ist eine normale Schleife lesbarer.'
      ],
      beispiel: [{ code: 'quadrate = [x * x for x in range(5)]         # [0, 1, 4, 9, 16]\ngerade = [x for x in range(10) if x % 2 == 0]\nlaengen = {w: len(w) for w in ["a", "bcd"]}' }],
      stolperfallen: ['Bei if/else im Ausdruck steht die Bedingung vor for: [a if x > 0 else b for x in z].'],
      siehe: ['py-for-range', 'py-listen'] }
  ] },
  { id: 'py-programmstruktur', bereich: 'Python', title: 'Python: Funktionen, Objekte, Dateien', entries: [
    { id: 'py-funktionen', title: 'Funktionen: def, return, Parameter', keywords: ['def', 'return', 'funktion', 'parameter', 'argument', 'standardwert', 'default', 'keyword argument'],
      kurz: 'Funktionen buendeln wiederverwendbaren Code, nehmen Parameter entgegen und geben Werte zurueck.',
      syntax: 'def name(param1, param2=standardwert):\n    ...\n    return ergebnis',
      erklaerung: [
        'Ohne return liefert eine Funktion None. Mit return a, b gibt man mehrere Werte als Tupel zurueck. Aufrufe koennen positional (f(1, 2)) oder mit Namen (f(b=2, a=1)) erfolgen.',
        'Parameter mit Standardwert sind optional und muessen hinter Pflichtparametern stehen. Variablen innerhalb der Funktion sind lokal. Veraenderbare Objekte (Listen) werden als Referenz uebergeben, Aenderungen wirken also nach aussen.'
      ],
      beispiel: [{ code: 'def begruesse(name, gruss="Hallo"):\n    return f"{gruss}, {name}!"\n\nprint(begruesse("Ada"))          # Hallo, Ada!\nprint(begruesse("Bob", "Moin"))  # Moin, Bob!\n\ndef min_max(z):\n    return min(z), max(z)\nkleinster, groesster = min_max([3, 1, 7])' }],
      stolperfallen: ['Veraenderbare Standardwerte wie def f(x=[]) werden zwischen Aufrufen geteilt; besser x=None verwenden.', 'print statt return: Der Wert wird nur angezeigt, nicht zurueckgegeben.'],
      siehe: ['py-module', 'algo-rekursion'] },
    { id: 'py-dateien', title: 'Dateien lesen und schreiben', keywords: ['datei', 'open', 'with', 'read', 'write', 'readlines', 'csv', 'file', 'append'],
      kurz: 'Mit open() und dem with-Block liest und schreibt man Textdateien sicher.',
      syntax: 'with open("datei.txt", "r", encoding="utf-8") as f:\n    inhalt = f.read()',
      erklaerung: [
        'Modi: "r" lesen (Standard), "w" schreiben (ueberschreibt), "a" anhaengen, "x" nur neu anlegen. Der with-Block schliesst die Datei automatisch, auch bei Fehlern.',
        'Lesen: read() ganzer Text, readline() eine Zeile, readlines() Liste der Zeilen; am einfachsten iteriert man mit for zeile in f. Schreiben: write(text) (Zeilenumbruch selbst mit \\n einfuegen).'
      ],
      beispiel: [{ code: 'with open("notizen.txt", "w", encoding="utf-8") as f:\n    f.write("Zeile 1\\n")\n    f.write("Zeile 2\\n")\n\nwith open("notizen.txt", encoding="utf-8") as f:\n    for zeile in f:\n        print(zeile.strip())' }],
      stolperfallen: ['Modus "w" loescht den bisherigen Inhalt.', 'Fehlende Datei beim Lesen wirft FileNotFoundError.', 'Encoding angeben, sonst Probleme mit Umlauten.'],
      siehe: ['py-fehler'] },
    { id: 'py-fehler', title: 'Fehlerbehandlung: try/except', keywords: ['try', 'except', 'finally', 'exception', 'fehler', 'raise', 'valueerror'],
      kurz: 'try/except faengt Laufzeitfehler ab, damit das Programm kontrolliert weiterlaufen kann.',
      syntax: 'try:\n    ...\nexcept FehlerTyp as e:\n    ...\nelse:\n    ...\nfinally:\n    ...',
      erklaerung: [
        'Tritt im try-Block ein Fehler auf, springt Python zum passenden except. else laeuft nur ohne Fehler, finally immer (z. B. zum Aufraeumen). Typische Ausnahmen: ValueError, TypeError, KeyError, IndexError, ZeroDivisionError, FileNotFoundError.',
        'Mit raise loest man selbst eine Ausnahme aus. Es sollten konkrete Typen abgefangen werden, nicht pauschal jeder Fehler.'
      ],
      beispiel: [{ code: 'try:\n    zahl = int(input("Zahl: "))\n    print(10 / zahl)\nexcept ValueError:\n    print("Keine Zahl")\nexcept ZeroDivisionError:\n    print("Nicht durch 0")\nfinally:\n    print("Fertig")' }],
      stolperfallen: ['Ein nacktes except: verschluckt auch Tippfehler und Abbrueche.'],
      siehe: ['py-dateien'] },
    { id: 'py-klassen', title: 'Klassen und Objekte', keywords: ['class', 'klasse', 'objekt', '__init__', 'self', 'methode', 'attribut', 'konstruktor', 'oop'],
      kurz: 'Eine Klasse ist ein Bauplan fuer Objekte mit Attributen (Daten) und Methoden (Verhalten).',
      syntax: 'class Name:\n    def __init__(self, param):\n        self.attribut = param',
      erklaerung: [
        '__init__ ist der Konstruktor und wird beim Erzeugen aufgerufen. self bezeichnet das aktuelle Objekt und ist bei jeder Methode der erste Parameter, beim Aufruf aber nicht anzugeben. Objekte entstehen durch Aufruf der Klasse: k = Name(wert).',
        'Attribute setzt man mit self.x = ... . Die Methode __str__ legt fest, wie das Objekt bei print erscheint. Konvention: Klassennamen in CamelCase, Attribute/Methoden in snake_case, "private" Attribute mit fuehrendem Unterstrich.'
      ],
      beispiel: [{ code: 'class Konto:\n    def __init__(self, inhaber, stand=0):\n        self.inhaber = inhaber\n        self.stand = stand\n\n    def einzahlen(self, betrag):\n        self.stand += betrag\n\n    def __str__(self):\n        return f"{self.inhaber}: {self.stand} EUR"\n\nk = Konto("Ada")\nk.einzahlen(50)\nprint(k)  # Ada: 50 EUR' }],
      stolperfallen: ['self vergessen: ohne self.stand wird nur eine lokale Variable gesetzt.', 'Methode ohne self im Kopf fuehrt zu TypeError beim Aufruf.'],
      siehe: ['py-vererbung', 'py-funktionen'] },
    { id: 'py-vererbung', title: 'Vererbung', keywords: ['vererbung', 'super', 'erben', 'ueberschreiben', 'basisklasse', 'unterklasse', 'inheritance'],
      kurz: 'Eine Unterklasse uebernimmt Attribute und Methoden einer Basisklasse und kann sie erweitern oder ueberschreiben.',
      syntax: 'class Unterklasse(Basisklasse):\n    def __init__(self, ...):\n        super().__init__(...)',
      erklaerung: [
        'Die Basisklasse steht in Klammern hinter dem Klassennamen. Mit super() greift man auf die Basisklasse zu, meist um deren __init__ aufzurufen. Definiert die Unterklasse eine Methode gleichen Namens, ueberschreibt sie die geerbte (Polymorphie).',
        'isinstance(obj, Klasse) prueft die Zugehoerigkeit auch fuer Basisklassen. Vererbung modelliert eine "ist-ein"-Beziehung (ein Hund ist ein Tier).'
      ],
      beispiel: [{ code: 'class Tier:\n    def __init__(self, name):\n        self.name = name\n    def laut(self):\n        return "..."\n\nclass Hund(Tier):\n    def laut(self):\n        return "Wuff"\n\nfor t in [Tier("x"), Hund("Rex")]:\n    print(t.name, t.laut())' }],
      stolperfallen: ['Wird super().__init__() vergessen, fehlen die Attribute der Basisklasse.'],
      siehe: ['py-klassen'] },
    { id: 'py-module', title: 'Module und import', keywords: ['import', 'modul', 'from', 'bibliothek', 'math', 'random', 'package', 'as'],
      kurz: 'Mit import nutzt man Code aus der Standardbibliothek, aus Paketen oder aus eigenen Dateien.',
      syntax: 'import modul\nfrom modul import name\nimport modul as kurz',
      erklaerung: [
        'Jede .py-Datei ist ein Modul. import math macht math.sqrt() verfuegbar; from math import sqrt erlaubt den direkten Aufruf sqrt(). Externe Pakete installiert man mit pip install paketname.',
        'Der Block if __name__ == "__main__": fuehrt Code nur aus, wenn die Datei direkt gestartet und nicht importiert wird. Nuetzliche Standardmodule: math, random, datetime, os, json, csv.'
      ],
      beispiel: [{ code: 'import math\nimport random\nfrom datetime import date\n\nprint(math.sqrt(16))            # 4.0\nprint(random.randint(1, 6))     # Zufallszahl 1-6\nprint(date.today().year)\n\nif __name__ == "__main__":\n    print("direkt gestartet")' }],
      stolperfallen: ['Eine eigene Datei nicht wie ein Standardmodul benennen (z. B. random.py), sonst wird sie stattdessen importiert.'],
      siehe: ['py-funktionen'] }
  ] },
  { id: 'algo-grundlagen', bereich: 'Algorithmen', title: 'Algorithmen und Datenstrukturen', entries: [
    { id: 'algo-pseudocode', title: 'Pseudocode', keywords: ['pseudocode', 'algorithmus', 'ablauf', 'beschreibung'],
      kurz: 'Pseudocode beschreibt einen Algorithmus in strukturiertem Text, unabhaengig von einer Programmiersprache.',
      erklaerung: [
        'Es gibt keine feste Norm; ueblich sind Schluesselwoerter wie WENN/DANN/SONST, SOLANGE, FUER ... VON ... BIS, WIEDERHOLE, Einrueckung fuer Bloecke und Pfeil oder := fuer Zuweisungen. Wichtig sind Eindeutigkeit, Lesbarkeit und konsistente Schreibweise.',
        'Ein guter Algorithmus ist endlich, eindeutig, ausfuehrbar und liefert bei gleicher Eingabe das gleiche Ergebnis. Eingabe und Ausgabe sollten klar benannt sein.'
      ],
      beispiel: [{ code: 'Eingabe: Liste zahlen\nmax := zahlen[0]\nFUER JEDES z IN zahlen\n    WENN z > max DANN\n        max := z\n    ENDE WENN\nENDE FUER\nAusgabe: max', hinweis: 'Bestimmung des groessten Elements.' }],
      siehe: ['algo-struktogramm', 'algo-schreibtischtest'] },
    { id: 'algo-struktogramm', title: 'Struktogramm (Nassi-Shneiderman)', keywords: ['struktogramm', 'nassi-shneiderman', 'nassi shneiderman', 'programmablaufplan', 'pap', 'flussdiagramm'],
      kurz: 'Ein Struktogramm stellt den Ablauf als ineinander geschachtelte Rechtecke dar, ohne Sprungpfeile.',
      erklaerung: [
        'Grundbausteine: Anweisung (einfaches Rechteck), Sequenz (Rechtecke untereinander), Verzweigung (Rechteck mit dreieckig geteiltem Kopf und Ja/Nein-Spalten), Mehrfachauswahl (Case), Schleife mit Kopfpruefung (Rahmen oben: solange Bedingung) und Schleife mit Fusspruefung (Bedingung unten).',
        'Zum Uebersetzen in Code: jeden Baustein in die passende Struktur umsetzen (Verzweigung = if/else, Kopfpruefung = while, Zaehlschleife = for). Im Gegensatz zum Programmablaufplan (PAP) mit Pfeilen und Rauten ist der Kontrollfluss durch die Verschachtelung immer strukturiert.'
      ],
      beispiel: [{ code: 'Struktogramm-Denken als Text:\n[ Eingabe: n ]\n[ summe := 0 ]\n[ Solange n > 0 ]\n  [ summe := summe + n ]\n  [ n := n - 1 ]\n[ Ausgabe: summe ]', hinweis: 'Jede eingerueckte Zeile liegt im Schleifenrahmen.' }],
      siehe: ['algo-pseudocode', 'algo-schreibtischtest'] },
    { id: 'algo-schreibtischtest', title: 'Schreibtischtest', keywords: ['schreibtischtest', 'trace', 'wertetabelle', 'testen', 'nachvollziehen'],
      kurz: 'Beim Schreibtischtest fuehrt man einen Algorithmus von Hand mit konkreten Werten in einer Tabelle aus.',
      erklaerung: [
        'Vorgehen: (1) Alle Variablen als Spalten anlegen, dazu Spalten fuer Bedingungen und Ausgaben. (2) Startwerte eintragen. (3) Jede Anweisung der Reihe nach ausfuehren und bei jeder Wertaenderung eine neue Zeile schreiben. (4) Bedingungen auswerten und den gewaehlten Zweig notieren. (5) Am Ende die Ausgabe mit dem erwarteten Ergebnis vergleichen.',
        'Auch Grenzfaelle testen: leere Eingabe, ein Element, Wert genau an der Grenze. So findet man Fehler wie Off-by-one oder Endlosschleifen.'
      ],
      beispiel: [{ code: 'summe = 0\nfor i in range(1, 4):\n    summe = summe + i\n\n# i | summe\n# - | -----\n#   | 0\n# 1 | 1\n# 2 | 3\n# 3 | 6      -> Ausgabe: 6' }],
      stolperfallen: ['Nicht mehrere Schritte in einer Zeile zusammenfassen, sonst uebersieht man Fehler.'],
      siehe: ['algo-pseudocode'] },
    { id: 'algo-linear', title: 'Lineare Suche', keywords: ['lineare suche', 'suche', 'suchen', 'sequentielle suche', 'linear search'],
      kurz: 'Die lineare Suche prueft die Elemente nacheinander, bis der Suchwert gefunden ist.',
      erklaerung: [
        'Sie funktioniert auf unsortierten Daten. Im schlechtesten Fall werden alle n Elemente geprueft: Laufzeit O(n). Im besten Fall steht der Wert am Anfang.',
        'Rueckgabe ist typischerweise der Index oder -1/None, falls der Wert nicht vorkommt.'
      ],
      beispiel: [{ code: 'def linear_suchen(liste, ziel):\n    for i, wert in enumerate(liste):\n        if wert == ziel:\n            return i\n    return -1\n\nprint(linear_suchen([4, 8, 15], 15))  # 2' }],
      siehe: ['algo-binaer', 'algo-laufzeit'] },
    { id: 'algo-binaer', title: 'Binaere Suche', keywords: ['binaere suche', 'binary search', 'halbieren', 'sortiert', 'suche'],
      kurz: 'Die binaere Suche halbiert bei jedem Schritt den Suchbereich, setzt aber sortierte Daten voraus.',
      erklaerung: [
        'Man vergleicht den Suchwert mit dem mittleren Element. Ist er kleiner, sucht man links weiter, ist er groesser, rechts; bei Gleichheit ist man fertig. Die Laufzeit ist O(log n): Bei 1.000.000 Elementen genuegen etwa 20 Vergleiche.',
        'Voraussetzung ist eine sortierte Folge mit direktem Indexzugriff. Bei nicht sortierten Daten liefert das Verfahren falsche Ergebnisse.'
      ],
      beispiel: [{ code: 'def binaer_suchen(liste, ziel):\n    links, rechts = 0, len(liste) - 1\n    while links <= rechts:\n        mitte = (links + rechts) // 2\n        if liste[mitte] == ziel:\n            return mitte\n        if liste[mitte] < ziel:\n            links = mitte + 1\n        else:\n            rechts = mitte - 1\n    return -1\n\nprint(binaer_suchen([1, 3, 5, 7, 9], 7))  # 3' }],
      stolperfallen: ['Bedingung links <= rechts (nicht <), sonst wird das letzte Element uebersehen.'],
      siehe: ['algo-linear', 'algo-laufzeit'] },
    { id: 'algo-bubblesort', title: 'Bubble Sort', keywords: ['bubble sort', 'bubblesort', 'sortieren', 'sortierverfahren', 'vertauschen'],
      kurz: 'Bubble Sort vertauscht benachbarte Elemente, bis die Liste sortiert ist.',
      erklaerung: [
        'Idee: Man durchlaeuft die Liste und tauscht jedes Paar, das in falscher Reihenfolge steht. Nach jedem Durchgang steht das groesste verbleibende Element am Ende. Ein Durchgang ohne Tausch bedeutet: fertig.',
        'Laufzeit O(n^2), sehr einfach, aber langsam bei grossen Datenmengen. Das Verfahren ist stabil und sortiert in place.'
      ],
      beispiel: [{ code: 'def bubble_sort(z):\n    n = len(z)\n    for i in range(n - 1):\n        getauscht = False\n        for j in range(n - 1 - i):\n            if z[j] > z[j + 1]:\n                z[j], z[j + 1] = z[j + 1], z[j]\n                getauscht = True\n        if not getauscht:\n            break\n    return z\n\nprint(bubble_sort([5, 2, 9, 1]))  # [1, 2, 5, 9]' }],
      siehe: ['algo-selectionsort', 'algo-insertionsort', 'algo-laufzeit'] },
    { id: 'algo-selectionsort', title: 'Selection Sort', keywords: ['selection sort', 'selectionsort', 'sortieren', 'minimum', 'auswahl'],
      kurz: 'Selection Sort sucht wiederholt das kleinste Element im unsortierten Rest und setzt es nach vorn.',
      erklaerung: [
        'Idee: Im unsortierten Teil das Minimum suchen und mit dem ersten Element dieses Teils tauschen. Danach waechst der sortierte Teil vorne um eins.',
        'Laufzeit immer O(n^2), aber nur hoechstens n-1 Vertauschungen. Das Verfahren ist in der Grundform nicht stabil.'
      ],
      beispiel: [{ code: 'def selection_sort(z):\n    for i in range(len(z) - 1):\n        m = i\n        for j in range(i + 1, len(z)):\n            if z[j] < z[m]:\n                m = j\n        z[i], z[m] = z[m], z[i]\n    return z\n\nprint(selection_sort([5, 2, 9, 1]))  # [1, 2, 5, 9]' }],
      siehe: ['algo-bubblesort', 'algo-insertionsort'] },
    { id: 'algo-insertionsort', title: 'Insertion Sort', keywords: ['insertion sort', 'insertionsort', 'sortieren', 'einfuegen'],
      kurz: 'Insertion Sort fuegt jedes Element an der richtigen Stelle in den bereits sortierten Teil ein.',
      erklaerung: [
        'Idee wie beim Sortieren von Spielkarten in der Hand: Das naechste Element wird mit dem sortierten Teil verglichen und so weit nach links geschoben, bis es passt.',
        'Laufzeit im Schnitt und im schlechtesten Fall O(n^2), bei fast sortierten Daten aber nahezu O(n). Das Verfahren ist stabil und eignet sich fuer kleine Listen.'
      ],
      beispiel: [{ code: 'def insertion_sort(z):\n    for i in range(1, len(z)):\n        wert = z[i]\n        j = i - 1\n        while j >= 0 and z[j] > wert:\n            z[j + 1] = z[j]\n            j -= 1\n        z[j + 1] = wert\n    return z\n\nprint(insertion_sort([5, 2, 9, 1]))  # [1, 2, 5, 9]' }],
      siehe: ['algo-bubblesort', 'algo-selectionsort'] },
    { id: 'algo-rekursion', title: 'Rekursion', keywords: ['rekursion', 'rekursiv', 'fakultaet', 'abbruchbedingung', 'fibonacci', 'recursion'],
      kurz: 'Bei Rekursion ruft sich eine Funktion mit einem kleineren Teilproblem selbst auf.',
      erklaerung: [
        'Jede rekursive Funktion braucht eine Abbruchbedingung (Basisfall) und einen rekursiven Schritt, der sich dem Basisfall naehert. Fehlt einer von beiden, entsteht unendliche Rekursion (Python: RecursionError).',
        'Rekursion ist elegant fuer Baumstrukturen und Teile-und-herrsche-Verfahren. Jeder Aufruf belegt Platz auf dem Aufrufstapel; viele Probleme lassen sich alternativ iterativ mit Schleife loesen.'
      ],
      beispiel: [{ code: 'def fakultaet(n):\n    if n <= 1:          # Basisfall\n        return 1\n    return n * fakultaet(n - 1)\n\nprint(fakultaet(5))  # 120\n# Ablauf: 5 * 4 * 3 * 2 * 1' }],
      stolperfallen: ['Naive Fibonacci-Rekursion berechnet Werte mehrfach und wird exponentiell langsam.'],
      siehe: ['algo-stapel-warteschlange', 'algo-laufzeit'] },
    { id: 'algo-laufzeit', title: 'Laufzeit und O-Notation', keywords: ['o-notation', 'big o', 'laufzeit', 'komplexitaet', 'landau', 'aufwand'],
      kurz: 'Die O-Notation beschreibt, wie der Aufwand eines Algorithmus mit der Eingabegroesse n waechst.',
      erklaerung: [
        'Konstante Faktoren und kleinere Terme werden ignoriert. Wichtige Klassen von schnell nach langsam: O(1) konstant (Indexzugriff), O(log n) logarithmisch (binaere Suche), O(n) linear (lineare Suche), O(n log n) (gute Sortierverfahren), O(n^2) quadratisch (Bubble-, Selection-, Insertion-Sort, verschachtelte Schleifen), O(2^n) exponentiell.',
        'Angegeben wird meist der schlechteste Fall (worst case). Zwei ineinander verschachtelte Schleifen ueber n Elemente ergeben typischerweise O(n^2), hintereinander stehende Schleifen O(n).'
      ],
      beispiel: [{ code: 'for x in liste:            # O(n)\n    pass\nfor a in liste:            # O(n^2)\n    for b in liste:\n        pass' }],
      siehe: ['algo-linear', 'algo-binaer', 'algo-bubblesort'] },
    { id: 'algo-stapel-warteschlange', title: 'Stapel und Warteschlange', keywords: ['stapel', 'stack', 'warteschlange', 'queue', 'lifo', 'fifo', 'push', 'pop', 'enqueue', 'dequeue'],
      kurz: 'Ein Stapel arbeitet nach LIFO, eine Warteschlange nach FIFO.',
      erklaerung: [
        'Stapel (Stack): Last In, First Out. Operationen push (obenauf legen), pop (oberstes entfernen), peek (oberstes ansehen). Anwendungen: Rueckgaengig-Funktion, Aufrufstapel bei Rekursion, Klammerpruefung.',
        'Warteschlange (Queue): First In, First Out. Operationen enqueue (hinten anstellen), dequeue (vorne entnehmen). Anwendungen: Druckauftraege, Aufgabenverteilung, Pufferung.',
        'In Python dient eine Liste als Stapel (append/pop). Fuer eine Warteschlange ist collections.deque besser, weil pop(0) bei Listen langsam ist.'
      ],
      beispiel: [{ code: 'stapel = []\nstapel.append(1)\nstapel.append(2)\nprint(stapel.pop())   # 2 (zuletzt rein, zuerst raus)\n\nfrom collections import deque\nschlange = deque()\nschlange.append("a")\nschlange.append("b")\nprint(schlange.popleft())  # a (zuerst rein, zuerst raus)' }],
      siehe: ['algo-rekursion'] }
  ] },
  { id: 'git-grundlagen', bereich: 'Git', title: 'Git: Grundlagen', entries: [
    { id: 'git-init-clone', title: 'git init und git clone', keywords: ['git init', 'git clone', 'repository', 'repo', 'klonen', 'anlegen'],
      kurz: 'git init legt ein neues lokales Repository an, git clone kopiert ein bestehendes.',
      syntax: 'git init\ngit clone <url> [ordner]',
      erklaerung: [
        'git init erzeugt im aktuellen Ordner das versteckte Verzeichnis .git, in dem die gesamte Historie liegt. git clone <url> laedt ein entferntes Repository samt aller Historie herunter und richtet es als Remote "origin" ein.'
      ],
      beispiel: [{ code: 'git init mein-projekt\ngit clone https://example.com/team/projekt.git' }],
      stolperfallen: ['Nie git init in einem Ordner ausfuehren, der schon in einem Repository liegt.'],
      siehe: ['git-remote', 'git-status'] },
    { id: 'git-add', title: 'git add', keywords: ['git add', 'staging', 'index', 'stage', 'vormerken'],
      kurz: 'git add uebernimmt Aenderungen in die Staging-Area, aus der der naechste Commit gebildet wird.',
      syntax: 'git add <datei>\ngit add .\ngit add -p',
      erklaerung: [
        'Git kennt drei Bereiche: Arbeitsverzeichnis, Staging-Area (Index) und Repository. Mit git add waehlt man aus, was in den naechsten Commit kommt. git add . stagt alle Aenderungen im aktuellen Ordner, git add -p erlaubt die Auswahl einzelner Aenderungsbloecke.',
        'Eine Datei aus der Staging-Area nehmen: git restore --staged <datei>.'
      ],
      beispiel: [{ code: 'git add index.html\ngit add src/\ngit restore --staged index.html' }],
      siehe: ['git-commit', 'git-status'] },
    { id: 'git-commit', title: 'git commit', keywords: ['git commit', 'commit', 'speichern', 'amend', 'nachricht'],
      kurz: 'git commit speichert die gestagten Aenderungen als Schnappschuss mit Nachricht in der Historie.',
      syntax: 'git commit -m "Nachricht"\ngit commit --amend',
      erklaerung: [
        'Ein Commit ist unveraenderlicher Schnappschuss mit Autor, Zeitpunkt, Nachricht und Verweis auf den Vorgaenger. Gute Nachrichten sind kurz, im Imperativ und beschreiben das Warum ("Fehler bei leerer Eingabe behoben").',
        'git commit -a -m committet alle bereits verfolgten geaenderten Dateien ohne vorheriges add (neue Dateien nicht). git commit --amend ersetzt den letzten Commit; das sollte man nur tun, solange er noch nicht gepusht ist.'
      ],
      beispiel: [{ code: 'git add .\ngit commit -m "Login-Formular hinzugefuegt"' }],
      stolperfallen: ['Ohne vorheriges git add gibt es nichts zu committen.'],
      siehe: ['git-add', 'git-log'] },
    { id: 'git-status', title: 'git status', keywords: ['git status', 'status', 'zustand', 'untracked', 'modified'],
      kurz: 'git status zeigt, welche Dateien geaendert, gestagt oder noch nicht verfolgt sind.',
      syntax: 'git status\ngit status -s',
      erklaerung: [
        'Die Ausgabe trennt "Changes to be committed" (gestagt), "Changes not staged for commit" (geaendert, nicht gestagt) und "Untracked files" (neu, unbekannt). Ausserdem steht dort der aktuelle Branch und der Abstand zum Remote-Branch. Bei einem Merge-Konflikt werden die betroffenen Dateien als "both modified" aufgelistet.'
      ],
      beispiel: [{ code: 'git status\ngit status -s   # Kurzform: M = modifiziert, ?? = neu' }],
      siehe: ['git-add', 'git-merge-konflikt'] },
    { id: 'git-log', title: 'git log', keywords: ['git log', 'historie', 'verlauf', 'history', 'oneline', 'graph'],
      kurz: 'git log zeigt die Commit-Historie des aktuellen Branches.',
      syntax: 'git log\ngit log --oneline --graph --all\ngit log -n 5',
      erklaerung: [
        'Standardmaessig erscheinen Hash, Autor, Datum und Nachricht, neueste zuerst. --oneline verkuerzt jeden Commit auf eine Zeile, --graph zeichnet die Verzweigungen, --all bezieht alle Branches ein. Mit git log <datei> sieht man die Historie einer einzelnen Datei, mit git show <hash> die Aenderungen eines Commits.'
      ],
      beispiel: [{ code: 'git log --oneline -5\ngit show a1b2c3d' }],
      siehe: ['git-diff', 'git-commit'] },
    { id: 'git-diff', title: 'git diff', keywords: ['git diff', 'diff', 'unterschied', 'aenderungen', 'vergleichen'],
      kurz: 'git diff zeigt zeilenweise, was sich zwischen zwei Staenden geaendert hat.',
      syntax: 'git diff\ngit diff --staged\ngit diff <branch1> <branch2>',
      erklaerung: [
        'Ohne Argumente vergleicht git diff Arbeitsverzeichnis und Staging-Area (also noch nicht gestagte Aenderungen). git diff --staged (oder --cached) zeigt, was im naechsten Commit landet. Zeilen mit + wurden hinzugefuegt, Zeilen mit - entfernt.'
      ],
      beispiel: [{ code: 'git diff\ngit diff --staged\ngit diff main feature/login' }],
      siehe: ['git-status', 'git-log'] },
    { id: 'git-gitignore', title: '.gitignore', keywords: ['gitignore', '.gitignore', 'ignorieren', 'ausschliessen', 'secrets'],
      kurz: 'In der Datei .gitignore stehen Muster fuer Dateien, die Git nicht verfolgen soll.',
      syntax: '*.log\nnode_modules/\n.env\n!wichtig.log',
      erklaerung: [
        'Typisch ignoriert werden Build-Ausgaben, Abhaengigkeiten (node_modules/, venv/), Logdateien und lokale Konfiguration mit Zugangsdaten (.env). Ein Muster mit / am Ende gilt fuer Ordner, ! hebt eine Ausnahme auf, # leitet einen Kommentar ein.',
        'Bereits verfolgte Dateien werden dadurch nicht automatisch vergessen; sie muessen mit git rm --cached <datei> aus dem Index entfernt werden.'
      ],
      stolperfallen: ['Wurde ein Passwort bereits committet, bleibt es in der Historie, auch wenn man es spaeter ignoriert: Das Passwort muss geaendert werden.'],
      siehe: ['git-add'] }
  ] },
  { id: 'git-zusammenarbeit', bereich: 'Git', title: 'Git: Branches und Zusammenarbeit', entries: [
    { id: 'git-branch', title: 'Branches (git branch)', keywords: ['git branch', 'branch', 'zweig', 'verzweigung', 'main'],
      kurz: 'Ein Branch ist ein beweglicher Zeiger auf einen Commit und ermoeglicht paralleles Arbeiten.',
      syntax: 'git branch\ngit branch <name>\ngit branch -d <name>',
      erklaerung: [
        'Branches sind billig: Sie sind nur Verweise auf Commits. Ueblich ist ein Hauptbranch (main) und pro Aufgabe ein Feature-Branch. git branch listet Branches, git branch <name> legt einen an, -d loescht einen bereits gemergten, -D erzwingt das Loeschen.',
        'HEAD zeigt darauf, welcher Branch (Commit) gerade ausgecheckt ist.'
      ],
      beispiel: [{ code: 'git branch feature/login\ngit branch -d feature/login' }],
      siehe: ['git-switch', 'git-merge'] },
    { id: 'git-switch', title: 'Branch wechseln: switch und checkout', keywords: ['git switch', 'git checkout', 'checkout', 'wechseln', 'branch wechseln'],
      kurz: 'git switch (frueher git checkout) wechselt den aktiven Branch.',
      syntax: 'git switch <branch>\ngit switch -c <neuer-branch>\ngit checkout <branch>',
      erklaerung: [
        'git switch -c legt einen neuen Branch an und wechselt sofort dorthin (entspricht git checkout -b). git checkout kann zusaetzlich einzelne Dateien oder Commits auschecken, deshalb wurde es in switch und restore aufgeteilt. Beim Wechsel muessen nicht gesicherte Aenderungen zum Zielstand passen; sonst vorher committen oder stashen.'
      ],
      beispiel: [{ code: 'git switch main\ngit switch -c feature/suche\ngit checkout -b feature/suche   # gleichwertig' }],
      siehe: ['git-branch', 'git-stash'] },
    { id: 'git-merge', title: 'git merge', keywords: ['git merge', 'merge', 'zusammenfuehren', 'fast-forward', 'rebase'],
      kurz: 'git merge fuehrt die Aenderungen eines Branches in den aktuellen Branch ein.',
      syntax: 'git switch <ziel>\ngit merge <quelle>',
      erklaerung: [
        'Man wechselt zuerst auf den Branch, der die Aenderungen erhalten soll, und merged dann den anderen hinein. Ist der Ziel-Branch nur "hinterher", genuegt ein Fast-Forward, der Zeiger wird einfach vorgeschoben. Haben sich beide Seiten weiterentwickelt, entsteht ein Merge-Commit mit zwei Vorgaengern.',
        'Aenderungen an denselben Zeilen fuehren zu einem Merge-Konflikt. git merge --abort bricht den Vorgang ab.'
      ],
      beispiel: [{ code: 'git switch main\ngit merge feature/login' }],
      siehe: ['git-merge-konflikt', 'git-branch'] },
    { id: 'git-merge-konflikt', title: 'Merge-Konflikt loesen', keywords: ['merge konflikt', 'konflikt', 'conflict', '<<<<<<<', 'konflikt loesen'],
      kurz: 'Ein Merge-Konflikt entsteht, wenn beide Seiten dieselbe Stelle geaendert haben; er wird von Hand aufgeloest.',
      erklaerung: [
        'Vorgehen: (1) git status zeigt die Dateien mit Konflikt. (2) In jeder Datei die Markierungen suchen und entscheiden, welche Fassung gilt oder wie beide kombiniert werden. (3) Markierungen <<<<<<<, ======= und >>>>>>> vollstaendig entfernen. (4) Datei mit git add als geloest markieren. (5) Merge mit git commit abschliessen. Abbrechen ist jederzeit mit git merge --abort moeglich.',
        'Konflikte vermeidet man durch haeufiges Pullen, kleine Branches und klare Zustaendigkeiten.'
      ],
      beispiel: [{ code: '<<<<<<< HEAD\ntitel = "Startseite"\n=======\ntitel = "Home"\n>>>>>>> feature/umbenennen', hinweis: 'Oberer Teil: aktueller Branch, unterer Teil: eingefuehrter Branch. Nach der Entscheidung bleibt nur eine Zeile stehen.' }],
      stolperfallen: ['Committen mit stehengebliebenen Markierungen bricht den Code.'],
      siehe: ['git-merge', 'git-status'] },
    { id: 'git-remote', title: 'Remote-Repositories (git remote)', keywords: ['git remote', 'remote', 'origin', 'upstream', 'github', 'gitlab'],
      kurz: 'Ein Remote ist ein Verweis auf ein Repository auf einem anderen Rechner, meist "origin".',
      syntax: 'git remote -v\ngit remote add origin <url>',
      erklaerung: [
        'git remote -v listet die konfigurierten Remotes mit URL. Nach git clone heisst das Ursprungs-Repository automatisch origin. Ein bestehendes lokales Repository verbindet man mit git remote add origin <url>.',
        'Der erste Push eines neuen Branches setzt mit -u die Verknuepfung (Upstream), danach genuegen git push und git pull.'
      ],
      beispiel: [{ code: 'git remote add origin https://example.com/team/projekt.git\ngit push -u origin main' }],
      siehe: ['git-push', 'git-pull-fetch'] },
    { id: 'git-push', title: 'git push', keywords: ['git push', 'push', 'hochladen', 'upstream', 'force'],
      kurz: 'git push laedt lokale Commits in das Remote-Repository hoch.',
      syntax: 'git push [remote] [branch]\ngit push -u origin <branch>',
      erklaerung: [
        'Ein Push wird abgelehnt, wenn der Remote-Branch neuere Commits hat; dann zuerst git pull ausfuehren. --force ueberschreibt die Remote-Historie und darf auf gemeinsam genutzten Branches nicht verwendet werden (sicherer: --force-with-lease).'
      ],
      beispiel: [{ code: 'git push origin feature/login\ngit push   # nach gesetztem Upstream' }],
      stolperfallen: ['"rejected (non-fast-forward)": Erst pullen und ggf. Konflikte loesen, nicht erzwingen.'],
      siehe: ['git-pull-fetch', 'git-remote'] },
    { id: 'git-pull-fetch', title: 'git pull und git fetch', keywords: ['git pull', 'git fetch', 'pull', 'fetch', 'herunterladen', 'aktualisieren'],
      kurz: 'git fetch holt neue Commits vom Remote, git pull holt sie und fuehrt sie zusaetzlich in den aktuellen Branch ein.',
      syntax: 'git fetch [remote]\ngit pull [remote] [branch]',
      erklaerung: [
        'fetch veraendert nur die Remote-Tracking-Branches (z. B. origin/main), nicht die eigene Arbeit; man kann in Ruhe mit git log oder git diff origin/main ansehen, was neu ist. git pull ist fetch plus merge (oder mit --rebase plus rebase).',
        'Vor dem Push und vor dem Anlegen neuer Branches sollte man pullen, um Konflikte frueh zu bemerken.'
      ],
      beispiel: [{ code: 'git fetch origin\ngit log HEAD..origin/main --oneline\ngit pull origin main' }],
      siehe: ['git-push', 'git-merge'] },
    { id: 'git-stash', title: 'git stash', keywords: ['git stash', 'stash', 'zwischenspeichern', 'aenderungen parken'],
      kurz: 'git stash legt ungesicherte Aenderungen zur Seite, damit man den Branch wechseln kann.',
      syntax: 'git stash\ngit stash list\ngit stash pop',
      erklaerung: [
        'Der Befehl speichert Aenderungen an verfolgten Dateien und stellt den sauberen Stand des letzten Commits wieder her. git stash pop holt die neueste Sicherung zurueck und loescht sie, git stash apply behaelt sie, git stash list zeigt alle. Neue Dateien nimmt man mit -u mit.'
      ],
      beispiel: [{ code: 'git stash\ngit switch hotfix\n# ... Fehler beheben ...\ngit switch feature/login\ngit stash pop' }],
      siehe: ['git-switch'] },
    { id: 'git-pull-request', title: 'Pull Request', keywords: ['pull request', 'pr', 'merge request', 'code review', 'review'],
      kurz: 'Ein Pull Request (bei GitLab: Merge Request) bittet darum, einen Branch nach Review in einen anderen zu uebernehmen.',
      erklaerung: [
        'Der Pull Request ist keine Git-Funktion, sondern ein Feature von Plattformen wie GitHub oder GitLab. Man pusht einen Feature-Branch und eroeffnet den PR gegen main. Das Team kommentiert den Code, automatische Tests laufen (CI), und nach Freigabe wird gemergt.',
        'Gute PRs sind klein, haben eine klare Beschreibung und behandeln nur ein Thema.'
      ],
      siehe: ['git-workflow-team', 'git-push'] },
    { id: 'git-workflow-team', title: 'Typischer Arbeitsablauf im Team', keywords: ['workflow', 'feature branch', 'team', 'arbeitsablauf', 'zusammenarbeit'],
      kurz: 'Im Feature-Branch-Workflow entsteht jede Aufgabe auf einem eigenen Branch, der per Pull Request in main einfliesst.',
      erklaerung: [
        'Ablauf: (1) git switch main und git pull. (2) git switch -c feature/xyz. (3) Aendern, git add, git commit in kleinen Schritten. (4) Regelmaessig main einarbeiten (git pull origin main). (5) git push -u origin feature/xyz. (6) Pull Request eroeffnen, Review abwarten, Rueckmeldungen einarbeiten. (7) Mergen, Branch loeschen, lokal main aktualisieren.',
        'Direkte Commits auf main vermeidet man oft per Branch-Schutz. Commit-Nachrichten und Branch-Namen folgen einer Teamkonvention.'
      ],
      beispiel: [{ code: 'git switch main\ngit pull\ngit switch -c feature/suche\n# arbeiten ...\ngit add .\ngit commit -m "Suchfeld ergaenzt"\ngit push -u origin feature/suche' }],
      siehe: ['git-pull-request', 'git-merge-konflikt'] }
  ] },
  { id: 'web-rest-spring', bereich: 'Web', title: 'HTTP, REST und Spring Boot', entries: [
    { id: 'web-http-methoden', title: 'HTTP-Methoden', keywords: ['http', 'get', 'post', 'put', 'delete', 'patch', 'methoden', 'idempotent'],
      kurz: 'HTTP-Methoden legen fest, welche Aktion ein Client auf einer Ressource ausloesen will.',
      erklaerung: [
        'GET liest (ohne Seiteneffekt), POST legt neu an, PUT ersetzt eine Ressource vollstaendig, PATCH aendert sie teilweise, DELETE loescht. GET, PUT und DELETE sind idempotent: mehrfaches Ausfuehren hat dasselbe Ergebnis wie einmaliges. POST ist es nicht.',
        'Eine Anfrage besteht aus Methode, URL, Headern und optionalem Body; die Antwort aus Statuscode, Headern und Body.'
      ],
      beispiel: [{ code: 'GET    /api/kunden/7     -> Kunde 7 lesen\nPOST   /api/kunden       -> neuen Kunden anlegen (Body: JSON)\nPUT    /api/kunden/7     -> Kunde 7 ersetzen\nDELETE /api/kunden/7     -> Kunde 7 loeschen' }],
      siehe: ['web-statuscodes', 'web-rest'] },
    { id: 'web-statuscodes', title: 'HTTP-Statuscodes', keywords: ['statuscode', 'status code', '200', '201', '204', '400', '401', '403', '404', '500', 'http status'],
      kurz: 'Der dreistellige Statuscode einer Antwort zeigt, ob und wie die Anfrage erfolgreich war.',
      erklaerung: [
        'Die erste Ziffer gibt die Klasse an: 1xx Information, 2xx Erfolg, 3xx Umleitung, 4xx Fehler des Clients, 5xx Fehler des Servers.',
        'Haeufig: 200 OK, 201 Created (nach POST), 204 No Content, 301/302 Umleitung, 400 Bad Request (ungueltige Eingabe), 401 Unauthorized (nicht angemeldet), 403 Forbidden (keine Berechtigung), 404 Not Found, 409 Conflict, 500 Internal Server Error.'
      ],
      stolperfallen: ['401 heisst "nicht authentifiziert", 403 "authentifiziert, aber nicht berechtigt".'],
      siehe: ['web-http-methoden'] },
    { id: 'web-rest', title: 'REST-Prinzipien', keywords: ['rest', 'restful', 'api', 'ressource', 'zustandslos', 'schnittstelle'],
      kurz: 'REST ist ein Architekturstil fuer Web-APIs, bei dem Ressourcen ueber URLs und HTTP-Methoden angesprochen werden.',
      erklaerung: [
        'Kernprinzipien: Ressourcen haben eindeutige URLs (Substantive, Plural: /kunden/7), Aktionen ergeben sich aus der HTTP-Methode statt aus dem Pfad, die Kommunikation ist zustandslos (jede Anfrage enthaelt alle noetigen Informationen), Darstellungen sind meist JSON, Statuscodes signalisieren das Ergebnis.',
        'Schlecht: /getKunde?id=7 oder /kundeLoeschen. Besser: GET /kunden/7 und DELETE /kunden/7.'
      ],
      siehe: ['web-http-methoden', 'web-json'] },
    { id: 'web-json', title: 'JSON', keywords: ['json', 'datenformat', 'serialisierung', 'objekt', 'array'],
      kurz: 'JSON ist ein textbasiertes Datenformat aus Objekten, Arrays und einfachen Werten.',
      syntax: '{ "schluessel": wert }',
      erklaerung: [
        'Erlaubte Werte: String (nur in doppelten Anfuehrungszeichen), Zahl, true/false, null, Array [ ... ] und Objekt { ... }. Schluessel sind immer Strings. Kommentare und ein Komma nach dem letzten Element sind nicht erlaubt.',
        'Spring wandelt Java-Objekte automatisch in JSON um und zurueck (Serialisierung/Deserialisierung); in Python geht das mit dem Modul json (json.dumps, json.loads).'
      ],
      beispiel: [{ code: '{\n  "id": 7,\n  "name": "Ada",\n  "aktiv": true,\n  "rollen": ["admin", "user"],\n  "adresse": { "ort": "Berlin" }\n}' }],
      stolperfallen: ['Einfache Anfuehrungszeichen und nachgestellte Kommata machen JSON ungueltig.'],
      siehe: ['web-rest', 'web-spring-mappings'] },
    { id: 'web-spring-controller', title: 'Spring Boot: @RestController', keywords: ['spring', 'spring boot', '@restcontroller', '@controller', 'controller', 'requestmapping'],
      kurz: '@RestController kennzeichnet eine Klasse, deren Methoden HTTP-Anfragen beantworten und Objekte als JSON zurueckgeben.',
      erklaerung: [
        '@RestController kombiniert @Controller und @ResponseBody: Rueckgabewerte werden direkt in den Antwort-Body geschrieben, meist als JSON. @RequestMapping("/api/kunden") an der Klasse legt einen gemeinsamen Pfad-Praefix fest.',
        'Spring Boot startet die Anwendung mit einer Klasse, die mit @SpringBootApplication annotiert ist, und findet Komponenten automatisch per Component-Scan.'
      ],
      beispiel: [{ code: '@RestController\n@RequestMapping("/api/kunden")\npublic class KundeController {\n    @GetMapping\n    public List<Kunde> alle() {\n        return List.of(new Kunde(1, "Ada"));\n    }\n}' }],
      siehe: ['web-spring-mappings', 'web-spring-schichten'] },
    { id: 'web-spring-mappings', title: 'Spring: @GetMapping, @PathVariable, @RequestBody', keywords: ['@getmapping', '@postmapping', '@pathvariable', '@requestbody', '@putmapping', '@deletemapping', 'requestparam'],
      kurz: 'Mapping-Annotationen binden Methoden an HTTP-Methode und Pfad; PathVariable und RequestBody holen Eingaben aus der Anfrage.',
      erklaerung: [
        '@GetMapping, @PostMapping, @PutMapping und @DeleteMapping verbinden eine Methode mit der jeweiligen HTTP-Methode und dem Pfad. @PathVariable liest einen Teil des Pfads ("/{id}"), @RequestParam einen Query-Parameter (?name=...), @RequestBody wandelt den JSON-Body der Anfrage in ein Java-Objekt um.',
        'Mit ResponseEntity kann man Statuscode und Body selbst bestimmen, z. B. 201 Created oder 404 Not Found.'
      ],
      beispiel: [{ code: '@GetMapping("/{id}")\npublic Kunde einer(@PathVariable Long id) {\n    return service.finde(id);\n}\n\n@PostMapping\npublic ResponseEntity<Kunde> neu(@RequestBody Kunde k) {\n    return ResponseEntity.status(201).body(service.speichere(k));\n}' }],
      stolperfallen: ['Ohne @RequestBody bleibt das Objekt leer, weil der JSON-Body nicht gelesen wird.'],
      siehe: ['web-spring-controller', 'web-json'] },
    { id: 'web-spring-schichten', title: 'Spring: @Service, @Repository, @Autowired', keywords: ['@service', '@repository', '@autowired', 'dependency injection', 'schichten', 'jparepository', 'di'],
      kurz: 'Spring trennt Controller, Service und Repository und verbindet sie per Dependency Injection.',
      erklaerung: [
        'Typische Schichten: Controller (HTTP), Service (@Service, Geschaeftslogik), Repository (@Repository, Datenzugriff, oft ein Interface, das JpaRepository erweitert). Spring erzeugt diese Objekte (Beans) selbst.',
        '@Autowired laesst Spring eine passende Bean einsetzen (Dependency Injection). Empfohlen ist die Konstruktor-Injektion; bei genau einem Konstruktor kann @Autowired sogar entfallen.'
      ],
      beispiel: [{ code: '@Repository\npublic interface KundeRepository extends JpaRepository<Kunde, Long> { }\n\n@Service\npublic class KundeService {\n    private final KundeRepository repo;\n\n    @Autowired\n    public KundeService(KundeRepository repo) {\n        this.repo = repo;\n    }\n\n    public Kunde finde(Long id) {\n        return repo.findById(id).orElseThrow();\n    }\n}' }],
      siehe: ['web-spring-controller', 'web-spring-mappings'] }
  ] }
]);

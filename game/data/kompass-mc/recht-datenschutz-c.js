window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "open-source-software",
  "title": "Open-Source-Software",
  "figure": "startup",
  "lines": [
   "Merk dir: Bei Open Source ist der Quelltext für die Allgemeinheit einsehbar.",
   "Wichtig ist: Vorteil für das Team: Es kann nachvollziehen und überprüfen, wie eine Bibliothek intern arbeitet, bevor es sie einbindet.",
   "Nachteil: Auch Außenstehende können den Quelltext auf Schwachstellen durchsuchen und diese gegen Anwendungen ausnutzen, die die Bibliothek einsetzen.",
   "Statt einer aufwendigen Eigenentwicklung spart eine quelloffene Bibliothek Zeit, ihre Lizenzbedingungen muss man aber trotzdem prüfen."
  ]
 },
 {
  "concept": "personenbezogene-daten",
  "title": "Personenbezogene Daten",
  "figure": "finanzamt",
  "lines": [
   "Merk dir: Personenbezogene Daten sind alle Angaben, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.",
   "Wichtig ist: Name, Kontaktdaten, Prüfungstermine, Leistungswerte oder ausgeliehene Medien sind personenbezogen, sobald sie einer Person zuordenbar sind.",
   "Die maßgebliche gesetzliche Grundlage dafür ist die Datenschutz-Grundverordnung (DSGVO).",
   "Merkregel für Prüfungen: Datenart nennen (personenbezogene Daten) und die passende Norm dazu (DSGVO)."
  ]
 },
 {
  "concept": "rechtsgrundlagen-der-beschaeftigtendatenverarbeitung",
  "title": "Rechtsgrundlagen der Beschäftigtendatenverarbeitung",
  "figure": "finanzamt",
  "lines": [
   "Merk dir: Beschäftigtendaten dürfen ohne Einwilligung verarbeitet werden, wenn es für die Durchführung des Beschäftigungsverhältnisses erforderlich ist (§ 26 Abs. 1 Satz 1 BDSG).",
   "Wichtig ist: Ein Beispiel ist die Entgeltabrechnung mit den genehmigten Nachtarbeitsstunden des Abrechnungsmonats.",
   "Ärztliche Diagnosen für die Schichtplanung oder die Zahl privater Nachrichten zur Leistungsbewertung sind nicht erforderlich und nicht gedeckt.",
   "Ein zulässiger Verwendungsfall ist z. B. der begrenzte Abgleich der eigenen Zutritte einer Person, wenn sie ihre Arbeitszeitabrechnung beanstandet.",
   "Bloße Behauptungen der Zulässigkeit oder technische Optimierung genügen nicht; der Verwendungsfall muss konkret und erforderlich sein."
  ]
 },
 {
  "concept": "rechtsgrundlagen-der-datenverarbeitung",
  "title": "Rechtsgrundlagen der Datenverarbeitung",
  "figure": "finanzamt",
  "lines": [
   "Merk dir: Wichtige Rechtsgrundlagen für den Schutz personenbezogener Daten in Deutschland sind die DSGVO und das Bundesdatenschutzgesetz (BDSG).",
   "Wichtig ist: Weitere Grundlagen sind z. B. Landesdatenschutzgesetze und das Grundgesetz mit dem allgemeinen Persönlichkeitsrecht.",
   "Die DSGVO gilt unmittelbar in der EU. Das BDSG ergänzt und konkretisiert sie für Deutschland.",
   "Die DSGVO dient dem Schutz personenbezogener Daten natürlicher Personen bei der Verarbeitung.",
   "Lang- und Kurzform derselben Norm, etwa DSGVO und Datenschutz-Grundverordnung, zählen in der Prüfung nur einmal."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-open-source-software-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Softwareentwicklung",
  "concept": "open-source-software",
  "title": "Vorteil und Nachteil abwägen",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Team erwägt, eine quelloffene Bibliothek zur Bildverarbeitung in seine mobile App einzubinden. Welche Aussage nennt eine zutreffende vorteilhafte und eine zutreffende nachteilige Auswirkung?",
  "payload": {
   "options": [
    {
     "text": "Vorteil: Der Hersteller garantiert vertraglich Support. Nachteil: Der Quelltext ist für das Team nicht einsehbar.",
     "correct": false,
     "why": "Bei Open Source ist der Quelltext gerade einsehbar; ein Supportvertrag ist nicht automatisch gegeben."
    },
    {
     "text": "Vorteil: Sicherheitslücken sind ausgeschlossen, weil viele mitlesen. Nachteil: Das Team darf den Quelltext nicht prüfen.",
     "correct": false,
     "why": "Offener Code garantiert keine Sicherheit, und das Team darf ihn prüfen."
    },
    {
     "text": "Vorteil: Die Bibliothek ist automatisch fehlerfrei. Nachteil: Sie läuft nur auf einem einzigen Betriebssystem.",
     "correct": false,
     "why": "Fehlerfreiheit ist nicht garantiert, und die Einschränkung auf ein System ist nicht typisch."
    },
    {
     "text": "Vorteil: Das Team kann prüfen, wie die Bibliothek arbeitet. Nachteil: Angreifer können den Quelltext auf Schwachstellen durchsuchen.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Der offene Quelltext ermöglicht Nachvollziehen und Prüfen, erlaubt aber auch Angreifern, gezielt nach Schwachstellen zu suchen und sie gegen abhängige Anwendungen auszunutzen."
  }
 },
 {
  "id": "kmp-open-source-software-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Softwareentwicklung",
  "concept": "open-source-software",
  "title": "Open Source definieren",
  "difficulty": 1,
  "points": 3,
  "figure": "startup",
  "source": "AP2",
  "prompt": "In der Dokumentation einer Komponente zur Verarbeitung von Standortdaten steht die Kennzeichnung Open Source. Was bedeutet das?",
  "payload": {
   "options": [
    {
     "text": "Der Quelltext ist nur für zahlende Kunden des Herstellers einsehbar",
     "correct": false,
     "why": "Das wäre gerade nicht offen für die Allgemeinheit."
    },
    {
     "text": "Der Quelltext der Komponente ist für die Allgemeinheit einsehbar",
     "correct": true
    },
    {
     "text": "Die Komponente wird nur als fertige Programmdatei ohne Quelltext kostenlos verteilt",
     "correct": false,
     "why": "Das beschreibt Freeware, nicht Open Source."
    },
    {
     "text": "Die Komponente darf ausschließlich nicht kommerziell eingesetzt werden",
     "correct": false,
     "why": "Ob kommerzielle Nutzung erlaubt ist, regelt die Lizenz, nicht der Begriff Open Source."
    }
   ],
   "multi": false,
   "explanation": "Open Source heißt, dass der Quelltext für alle einsehbar ist. Preis und erlaubte Nutzung regelt die jeweilige Lizenz."
  }
 },
 {
  "id": "kmp-open-source-software-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Softwareentwicklung",
  "concept": "open-source-software",
  "title": "Nachteil quelloffener Bibliotheken",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Team will eine quelloffene Bibliothek für Berichtsdateien einbinden. Welche nachteilige Auswirkung des Open-Source-Charakters ist zutreffend?",
  "payload": {
   "options": [
    {
     "text": "Das Team kann nicht mehr nachvollziehen, was die Bibliothek im Einzelnen macht",
     "correct": false,
     "why": "Bei offenem Quelltext ist das Nachvollziehen gerade möglich."
    },
    {
     "text": "Die Bibliothek darf grundsätzlich nicht in kommerziellen Anwendungen für Unternehmen eingesetzt und weitergegeben werden",
     "correct": false,
     "why": "Ein solches pauschales Verbot gibt es nicht; es hängt von der Lizenz ab."
    },
    {
     "text": "Außenstehende können den Quelltext auf Schwachstellen untersuchen und diese ausnutzen",
     "correct": true
    },
    {
     "text": "Fehler in der Bibliothek können grundsätzlich nur vom ursprünglichen Autor behoben werden",
     "correct": false,
     "why": "Da der Quelltext offen ist, kann er auch von anderen geprüft und angepasst werden, soweit die Lizenz es erlaubt."
    }
   ],
   "multi": false,
   "explanation": "Offener Quelltext erlaubt es auch Außenstehenden, nach Schwachstellen zu suchen und diese gegen Anwendungen auszunutzen, die die Bibliothek verwenden."
  }
 },
 {
  "id": "kmp-personenbezogene-daten-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "personenbezogene-daten",
  "title": "Bibliotheksdaten einordnen",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Bibliotheksverbund speichert Namen, Kontaktdaten und ausgeliehene Medien seiner Mitglieder. Nennen Sie die zutreffende Datenart und die einschlägige gesetzliche Grundlage.",
  "payload": {
   "options": [
    {
     "text": "Anonyme Daten; DSGVO",
     "correct": false,
     "why": "Die Angaben sind Personen zugeordnet und daher nicht anonym."
    },
    {
     "text": "Personenbezogene Daten; Handelsgesetzbuch (HGB)",
     "correct": false,
     "why": "Das HGB regelt kaufmännische Buchführung, nicht den Schutz personenbezogener Daten."
    },
    {
     "text": "Personenbezogene Daten; Datenschutz-Grundverordnung (DSGVO)",
     "correct": true
    },
    {
     "text": "Sachdaten; Urheberrechtsgesetz (UrhG)",
     "correct": false,
     "why": "Die Angaben betreffen Personen, und das Urheberrecht schützt Werke."
    }
   ],
   "multi": false,
   "explanation": "Namen, Kontaktdaten und Ausleihen sind personenbezogene Daten. Grundlage ist die DSGVO."
  }
 },
 {
  "id": "kmp-personenbezogene-daten-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "personenbezogene-daten",
  "title": "Fahrschul-Lernplattform",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Die Lernplattform einer Fahrschule speichert Namen, Prüfungstermine, bearbeitete Übungsfragen und individuelle Fehlerquoten. Welche Datenart und welche Rechtsnorm passen?",
  "payload": {
   "options": [
    {
     "text": "Betriebs- und Geschäftsgeheimnisse; Geschäftsgeheimnisgesetz (GeschGehG)",
     "correct": false,
     "why": "Die Daten betreffen einzelne Personen und sind keine Betriebsgeheimnisse."
    },
    {
     "text": "Personenbezogene Daten; Gewerbeordnung",
     "correct": false,
     "why": "Die Gewerbeordnung regelt nicht den Schutz personenbezogener Daten."
    },
    {
     "text": "Sachbezogene Daten; Produkthaftungsgesetz",
     "correct": false,
     "why": "Die Angaben sind einzelnen Fahrschülern zugeordnet und keine Sachdaten."
    },
    {
     "text": "Personenbezogene Daten; Datenschutz-Grundverordnung (DSGVO)",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Namen und individuelle Lernergebnisse lassen sich Personen zuordnen und sind personenbezogene Daten. Maßgeblich ist die DSGVO."
  }
 },
 {
  "id": "kmp-personenbezogene-daten-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "personenbezogene-daten",
  "title": "Merkmal personenbezogener Daten",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Sportverein fragt, wann Angaben wie Trainingsanwesenheit oder Leistungswerte als personenbezogene Daten gelten. Welche Aussage trifft zu?",
  "payload": {
   "options": [
    {
     "text": "Wenn sie auf einem Server im Internet oder in einer Cloud gespeichert sind",
     "correct": false,
     "why": "Der Speicherort entscheidet nicht über den Personenbezug."
    },
    {
     "text": "Wenn sie im Unternehmen als vertraulich oder streng vertraulich klassifiziert sind",
     "correct": false,
     "why": "Vertraulichkeitsstufen sind unabhängig vom Personenbezug."
    },
    {
     "text": "Wenn sie ein Unternehmen als juristische Person mit Firmensitz betreffen",
     "correct": false,
     "why": "Personenbezug setzt eine natürliche Person voraus."
    },
    {
     "text": "Wenn sie sich auf eine identifizierte oder identifizierbare Person beziehen",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Personenbezogen sind Daten, die sich einer identifizierten oder identifizierbaren natürlichen Person zuordnen lassen, unabhängig vom Speicherort."
  }
 },
 {
  "id": "kmp-rechtsgrundlagen-der-beschaeftigtendatenverarbeitung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "rechtsgrundlagen-der-beschaeftigtendatenverarbeitung",
  "title": "Zutrittsdaten sinnvoll nutzen",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Betrieb kann über die Personalnummer aus Ausweisprotokollen zeitliche Aufenthaltsbilder einzelner Beschäftigter erstellen. Welcher Verwendungsfall ist rechtlich tragfähig?",
  "payload": {
   "options": [
    {
     "text": "Alle Aufenthaltsbilder laufend automatisch rastern, um besonders lange Pausen einzelner Beschäftigter aufzuspüren und zu vergleichen",
     "correct": false,
     "why": "Eine anlasslose Dauerrasterung ist nicht erforderlich und unverhältnismäßig."
    },
    {
     "text": "Die Aufenthaltsprofile den Abteilungsleitern zur allgemeinen Einsicht freigeben",
     "correct": false,
     "why": "Die Weitergabe an viele Personen ohne Erforderlichkeit ist unzulässig."
    },
    {
     "text": "Eine beanstandete Abrechnung klären, indem man die gebuchte Zeit mit den eigenen erforderlichen Gebäudezutritten des Beschäftigten abgleicht",
     "correct": true
    },
    {
     "text": "Bewegungsprofile aller Beschäftigten dauerhaft sammeln, weil sie für spätere Zwecke nützlich sein könnten",
     "correct": false,
     "why": "Vorratsdatenhaltung ohne konkreten Zweck ist nicht erforderlich."
    }
   ],
   "multi": false,
   "explanation": "Zulässig ist ein konkreter, begrenzter Verwendungsfall, z. B. der Abgleich der eigenen Zutritte zur Klärung einer beanstandeten Abrechnung. Dauerhafte Profile auf Vorrat sind es nicht."
  }
 },
 {
  "id": "kmp-rechtsgrundlagen-der-beschaeftigtendatenverarbeitung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "rechtsgrundlagen-der-beschaeftigtendatenverarbeitung",
  "title": "Auswertung für die Entgeltabrechnung",
  "difficulty": 1,
  "points": 3,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Die Personalstelle braucht für die monatliche Abrechnung einen Bericht, eine Einwilligung liegt nicht vor. A zeigt genehmigte Nachtarbeitsstunden zur Entgeltberechnung, B ärztliche Diagnosen zur Schichtplanung, C private Nachrichten zur Leistungsbewertung. Welche Auswertung ist mit welcher Grundlage tragfähig?",
  "payload": {
   "options": [
    {
     "text": "Auswertung B, weil die Schichtplanung zur Durchführung des Beschäftigungsverhältnisses gehört und Diagnosen dafür nötig sind",
     "correct": false,
     "why": "Diagnosen sind dafür nicht erforderlich und besonders schutzwürdig."
    },
    {
     "text": "Auswertung C, weil die Leistungsbewertung ein berechtigtes Interesse des Arbeitgebers darstellt und keine Einwilligung braucht",
     "correct": false,
     "why": "Private Nachrichten auszuwerten ist nicht erforderlich und stark eingreifend."
    },
    {
     "text": "Auswertung A, aber nur mit ausdrücklicher Einwilligung jedes Beschäftigten nach der DSGVO",
     "correct": false,
     "why": "Für die erforderliche Entgeltabrechnung genügt § 26 BDSG, eine Einwilligung ist nicht nötig."
    },
    {
     "text": "Auswertung A nach § 26 Abs. 1 Satz 1 BDSG, weil die Nachtarbeitsstunden erforderlich sind",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Nur die Nachtarbeitsstunden sind für die Abrechnung erforderlich. Rechtsgrundlage ist § 26 Abs. 1 Satz 1 BDSG. Diagnosen und private Nachrichten sind nicht erforderlich."
  }
 },
 {
  "id": "kmp-rechtsgrundlagen-der-beschaeftigtendatenverarbeitung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "rechtsgrundlagen-der-beschaeftigtendatenverarbeitung",
  "title": "Erlaubnis ohne Einwilligung",
  "difficulty": 1,
  "points": 3,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Wann dürfen personenbezogene Beschäftigtendaten nach § 26 Abs. 1 Satz 1 BDSG auch ohne Einwilligung verarbeitet werden?",
  "payload": {
   "options": [
    {
     "text": "Wenn die Verarbeitung technisch möglich und einfach umzusetzen ist",
     "correct": false,
     "why": "Technische Machbarkeit begründet keine Erlaubnis."
    },
    {
     "text": "Wenn sie für die Durchführung des Beschäftigungsverhältnisses erforderlich ist",
     "correct": true
    },
    {
     "text": "Wenn der Arbeitgeber daran ein wirtschaftliches Interesse hat",
     "correct": false,
     "why": "Ein bloßes Interesse genügt nicht, die Verarbeitung muss erforderlich sein."
    },
    {
     "text": "Wenn der Betriebsrat der Verarbeitung nicht ausdrücklich widerspricht",
     "correct": false,
     "why": "Das Schweigen des Betriebsrats ersetzt weder Erforderlichkeit noch Rechtsgrundlage."
    }
   ],
   "multi": false,
   "explanation": "Nach § 26 Abs. 1 Satz 1 BDSG ist die Verarbeitung zulässig, wenn sie für die Durchführung des Beschäftigungsverhältnisses erforderlich ist, z. B. für die Entgeltabrechnung."
  }
 },
 {
  "id": "kmp-rechtsgrundlagen-der-datenverarbeitung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "rechtsgrundlagen-der-datenverarbeitung",
  "title": "Gesetzliche Grundlagen nennen",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Sportverein lässt seine Mitgliederdaten durch Ihren Ausbildungsbetrieb pflegen und fragt nach den rechtlichen Vorgaben. Welche zwei Grundlagen schützen personenbezogene Daten in Deutschland?",
  "payload": {
   "options": [
    {
     "text": "Datenschutz-Grundverordnung (DSGVO)",
     "correct": true
    },
    {
     "text": "Handelsgesetzbuch (HGB)",
     "correct": false,
     "why": "Das HGB regelt Handelsgeschäfte und Buchführung, nicht den Datenschutz."
    },
    {
     "text": "Bundesdatenschutzgesetz (BDSG)",
     "correct": true
    },
    {
     "text": "Urheberrechtsgesetz (UrhG)",
     "correct": false,
     "why": "Das UrhG schützt Werke und keine personenbezogenen Daten."
    }
   ],
   "multi": true,
   "explanation": "Zwei einschlägige Grundlagen sind DSGVO und BDSG. Auch Landesdatenschutzgesetze und das Grundgesetz kommen infrage; HGB und UrhG regeln andere Materien."
  }
 },
 {
  "id": "kmp-rechtsgrundlagen-der-datenverarbeitung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "rechtsgrundlagen-der-datenverarbeitung",
  "title": "Funktion der DSGVO",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Ein Fahrradverleih speichert Name, Kontaktdaten und Mietzeiten in Kundenkonten. Welche grundlegende Funktion hat die DSGVO dafür?",
  "payload": {
   "options": [
    {
     "text": "Sie regelt, welche Steuern auf die Mieteinnahmen des Verleihs zu zahlen sind",
     "correct": false,
     "why": "Steuerfragen sind nicht Gegenstand der DSGVO."
    },
    {
     "text": "Sie verpflichtet Unternehmen, alle Kundendaten dauerhaft aufzubewahren",
     "correct": false,
     "why": "Die DSGVO fordert Speicherbegrenzung, nicht dauerhafte Aufbewahrung."
    },
    {
     "text": "Sie schützt personenbezogene Daten natürlicher Personen bei deren Verarbeitung",
     "correct": true
    },
    {
     "text": "Sie schützt die Marke und die Fahrräder des Verleihs vor Nachahmung",
     "correct": false,
     "why": "Marken- und Produktschutz sind andere Rechtsgebiete."
    }
   ],
   "multi": false,
   "explanation": "Die DSGVO dient dem Schutz personenbezogener Daten bei der Verarbeitung, hier von Name, Kontaktdaten und Mietzeiten der Kunden."
  }
 },
 {
  "id": "kmp-rechtsgrundlagen-der-datenverarbeitung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "rechtsgrundlagen-der-datenverarbeitung",
  "title": "Nationale Ergänzung",
  "difficulty": 1,
  "points": 2,
  "figure": "finanzamt",
  "source": "AP2",
  "prompt": "Die DSGVO gilt unmittelbar in der EU. Welches deutsche Gesetz ergänzt und konkretisiert sie für den Datenschutz in Deutschland?",
  "payload": {
   "options": [
    {
     "text": "Handwerksordnung",
     "correct": false,
     "why": "Sie regelt das Handwerk, nicht den Datenschutz."
    },
    {
     "text": "Gewerbeordnung",
     "correct": false,
     "why": "Sie regelt gewerbliche Tätigkeiten und ist nicht das ergänzende Datenschutzgesetz."
    },
    {
     "text": "Bundesdatenschutzgesetz (BDSG)",
     "correct": true
    },
    {
     "text": "Handelsgesetzbuch (HGB)",
     "correct": false,
     "why": "Das HGB regelt Handelsrecht und nicht den Schutz personenbezogener Daten."
    }
   ],
   "multi": false,
   "explanation": "Das BDSG ergänzt und konkretisiert die DSGVO in Deutschland, etwa für den Beschäftigtendatenschutz."
  }
 }
]);

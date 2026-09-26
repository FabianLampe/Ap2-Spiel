window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "arbeitsplatzergonomie",
  "title": "Arbeitsplatzergonomie",
  "figure": "kalle",
  "lines": [
   "Merk dir: Wer dauerhaft am Notebook arbeitet, braucht einen separaten Bildschirm auf Sichthöhe, damit Kopf und Nacken nicht dauernd nach unten geneigt sind.",
   "Wichtig ist: Wird das Notebook erhöht aufgestellt, gehört zwingend eine separate Tastatur dazu, sonst werden Arme und Handgelenke ungünstig belastet.",
   "Bildschirm und Eingabegeräte sollen unabhängig voneinander positionierbar sein. Genau das geht bei einem Tablet mit Touch-Eingabe nicht.",
   "Höhenverstellbarer Tisch und individuell einstellbarer Bürostuhl sind typische konkrete Änderungen für einen ergonomischen Dauerarbeitsplatz.",
   "Bloße Gesundheitshinweise sind keine konkrete Änderung am Arbeitsplatz und zählen in der Prüfung nicht als Maßnahme."
  ]
 },
 {
  "concept": "barrierefreiheit-von-benutzerschnittstellen",
  "title": "Barrierefreiheit von Benutzerschnittstellen",
  "figure": "kalle",
  "lines": [
   "Merk dir: Barrierefreiheit bedeutet, dass Menschen mit Behinderungen durch Gestaltung und Bedienung nicht von der Nutzung ausgeschlossen oder wesentlich behindert werden.",
   "Wichtig ist: Es genügt nicht, das Wort nur zu wiederholen. Man muss erklären, wie Hindernisse der Oberfläche die tatsächliche Nutzbarkeit einschränken.",
   "Barrieren können bei Terminals und Touchscreens z. B. zu kleine Bedienelemente, schwache Kontraste oder Rückmeldungen nur über Farbe sein.",
   "Barrierefreiheit gehört früh in die Anforderungsanalyse, etwa ins Lastenheft, damit der Auftraggeber sie später prüfen kann."
  ]
 },
 {
  "concept": "beschaffungsmodelle",
  "title": "Beschaffungsmodelle",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: Beim Kauf geht das Gerät gegen einmalige Zahlung in das Eigentum des Käufers über. Er kann es dauerhaft und frei nutzen.",
   "Wichtig ist: Nach dem Erwerb fallen keine weiteren Nutzungsentgelte an. Über einen langen Zeitraum ist der Kauf oft günstiger als dauerndes Mieten.",
   "Bei Miete oder Nutzungsüberlassung bleibt das Eigentum beim Anbieter, die Nutzung ist befristet und es fallen laufende Entgelte an.",
   "Für den Anbieter bringt der Verkauf sofort den vollen Kaufpreis und damit Liquidität, ohne Vorfinanzierung über die Laufzeit."
  ]
 },
 {
  "concept": "betrieblicher-datenschutz",
  "title": "Betrieblicher Datenschutz",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Werden Kundendaten erhoben, muss das Unternehmen die Betroffenen bei der Erhebung über Zweck, Verantwortlichen und Speicherdauer informieren.",
   "Wichtig ist: Zweckbindung und Datenminimierung. Erhoben wird nur, was für den Zweck erforderlich ist, und genutzt wird es nur dafür.",
   "Für jede Verarbeitung braucht es eine Rechtsgrundlage, z. B. die Vertragserfüllung bei einer Bestellung.",
   "Lagert man Daten an einen Dienstleister aus, braucht es einen schriftlichen Vertrag zur Auftragsverarbeitung mit Weisungsbindung.",
   "Zusätzlich vereinbart man technische und organisatorische Maßnahmen, z. B. Verschlüsselung der Sicherungen und Zugriffskontrolle."
  ]
 },
 {
  "concept": "datenschutz",
  "title": "Datenschutz",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Standort-, Zutritts- und Nutzungsdaten, die sich einer Person zuordnen lassen, sind personenbezogene Daten und unterliegen dem Datenschutz.",
   "Wichtig ist: Eine Dauererfassung von Beschäftigten muss erforderlich und verhältnismäßig sein, und die Beschäftigten sind darüber zu informieren.",
   "Zweckbindung: Daten, die für einen Zweck erhoben wurden, dürfen nicht ohne eigene Rechtsgrundlage für einen anderen Zweck genutzt werden.",
   "Kontrolle von Anwesenheit oder Pausen mit Zutrittsdaten wäre eine Zweckänderung und ohne Rechtsgrundlage und Verhältnismäßigkeitsprüfung unzulässig.",
   "Echte personenbezogene Daten gehören nicht ohne Weiteres an fremde Onlinedienste; ohne Vertrag und mit unnötigen Datenfeldern sind sie tabu."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-arbeitsplatzergonomie-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Ergonomie",
  "concept": "arbeitsplatzergonomie",
  "title": "Notebookarbeitsplatz verbessern",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "In einem Bereitschaftsraum arbeiten Beschäftigte ganze Schichten lang nur am Notebook, das direkt auf dem Schreibtisch steht. Stuhl und Beleuchtung sind bereits in Ordnung, die Körperhaltung ist aber belastend. Welche zwei Änderungen verbessern die Ergonomie konkret?",
  "payload": {
   "options": [
    {
     "text": "Die Beschäftigten regelmäßig per Rundmail an gesunde Sitzhaltung erinnern und zu Dehnübungen auffordern",
     "correct": false,
     "why": "Das ist nur ein Gesundheitshinweis und keine konkrete Änderung am Arbeitsplatz."
    },
    {
     "text": "Einen separaten Bildschirm auf geeigneter Sichthöhe zusätzlich zum Notebook bereitstellen",
     "correct": true
    },
    {
     "text": "Die Notebooks durch Tablets mit Bildschirmtastatur ersetzen, damit sie leichter zu halten sind",
     "correct": false,
     "why": "Tablets koppeln Anzeige und Eingabe fest und verschlechtern die Haltung eher."
    },
    {
     "text": "Eine separate, ergonomisch geformte Tastatur für die Dauernutzung einsetzen",
     "correct": true
    },
    {
     "text": "Die Helligkeit der Notebook-Displays dauerhaft auf den Maximalwert stellen",
     "correct": false,
     "why": "Das ändert die Körperhaltung nicht und kann die Augen zusätzlich belasten."
    }
   ],
   "multi": true,
   "explanation": "Zwei unterscheidbare konkrete Änderungen sind z. B. ein externer Bildschirm auf Sichthöhe und eine separate Tastatur. Reine Gesundheitshinweise genügen nicht, Tablets verschärfen das Problem."
  }
 },
 {
  "id": "kmp-arbeitsplatzergonomie-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Ergonomie",
  "concept": "arbeitsplatzergonomie",
  "title": "Tablet als Dauerarbeitsgerät",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Lohnbuchhaltungsbüro will einer Mitarbeiterin im Homeoffice ausschließlich ein Tablet für die tägliche, mehrstündige Bildschirmarbeit geben. Warum ist das ergonomisch problematisch?",
  "payload": {
   "options": [
    {
     "text": "Tablets sind für Personaldaten grundsätzlich gesetzlich verboten und dürfen dort nicht genutzt werden",
     "correct": false,
     "why": "Ein solches Verbot gibt es nicht; das Problem ist die Ergonomie, nicht ein Nutzungsverbot."
    },
    {
     "text": "Tablets haben stets zu wenig Rechenleistung, um Abrechnungen überhaupt darzustellen",
     "correct": false,
     "why": "Die Rechenleistung ist nicht der ergonomische Aspekt, um den es hier geht."
    },
    {
     "text": "Bildschirm und Touch-Eingabe sind fest gekoppelt, das erzwingt auf Dauer ungünstige Kopf-, Arm- und Handhaltungen",
     "correct": true
    },
    {
     "text": "Tablets lassen sich nicht in ein Firmennetz einbinden und sind deshalb ungeeignet",
     "correct": false,
     "why": "Die Netzanbindung ist möglich und hat mit der Körperhaltung nichts zu tun."
    }
   ],
   "multi": false,
   "explanation": "Beim Tablet sind Anzeige und Eingabe fest verbunden. Für dauerhafte Dateneingabe entsteht so eine ungünstige Haltung; zudem ist die Bildschirmtastatur für längere Eingaben wenig effizient."
  }
 },
 {
  "id": "kmp-arbeitsplatzergonomie-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Ergonomie",
  "concept": "arbeitsplatzergonomie",
  "title": "Notebook erhöhen",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Projektteam stellt seine Notebooks auf Ständer, damit der Bildschirm höher steht. Was muss zusätzlich bereitgestellt werden, damit die Lösung ergonomisch ist?",
  "payload": {
   "options": [
    {
     "text": "Eine separate Tastatur, damit die Hände trotz erhöhter Bildschirmposition günstig positioniert bleiben",
     "correct": true
    },
    {
     "text": "Ein zweiter Akku samt Ladestation, damit das Notebook auch bei langen Einsätzen ohne Netzteil auskommt",
     "correct": false,
     "why": "Ein Akku betrifft die Laufzeit, nicht die Körperhaltung."
    },
    {
     "text": "Ein Blaulichtfilter für das Display, der die Bildschirmfarben abends wärmer und augenschonender darstellt",
     "correct": false,
     "why": "Ein Filter ändert nichts an der Haltung von Armen und Handgelenken."
    },
    {
     "text": "Eine Docking-Station mit integriertem Virenscanner und zentraler Verwaltung für alle Geräte",
     "correct": false,
     "why": "Sicherheitssoftware hat keinen Einfluss auf die Ergonomie."
    }
   ],
   "multi": false,
   "explanation": "Wird das Notebook erhöht, rücken auch die Tasten nach oben. Deshalb ist eine separate Tastatur nötig, sonst werden Arme und Handgelenke ungünstig belastet."
  }
 },
 {
  "id": "kmp-barrierefreiheit-von-benutzerschnittstellen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "barrierefreiheit-von-benutzerschnittstellen",
  "title": "Barrierefreiheit erläutern",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Eine Verwaltung entwickelt ein Bürgerterminal, an dem Besucher Anträge auswählen, Angaben eingeben und absenden. Im Lastenheft steht Barrierefreiheit als Anforderung. Was ist darunter zu verstehen?",
  "payload": {
   "options": [
    {
     "text": "Die Oberfläche antwortet auf jede Eingabe in unter einer Sekunde, sodass niemand warten muss",
     "correct": false,
     "why": "Antwortzeit ist Performance, nicht Barrierefreiheit."
    },
    {
     "text": "Nur berechtigte Personen dürfen das Terminal bedienen, alle anderen werden ausgesperrt",
     "correct": false,
     "why": "Das beschreibt Zugriffsschutz, nicht den Ausschluss durch fehlende Barrierefreiheit."
    },
    {
     "text": "Das Terminal läuft auf allen gängigen Betriebssystemen und Bildschirmgrößen",
     "correct": false,
     "why": "Das ist Plattformkompatibilität und meint nicht die Nutzbarkeit für Menschen mit Behinderungen."
    },
    {
     "text": "Menschen mit Behinderungen werden durch die Gestaltung und Bedienung nicht von der Nutzung ausgeschlossen oder wesentlich behindert",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Barrierefreiheit heißt: Die Bedienung ist so gestaltet, dass Menschen mit Behinderungen nicht ausgeschlossen oder wesentlich behindert werden. Performance, Zugriffsschutz und Plattformen sind andere Themen."
  }
 },
 {
  "id": "kmp-barrierefreiheit-von-benutzerschnittstellen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "barrierefreiheit-von-benutzerschnittstellen",
  "title": "Barriere erkennen",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Beim Test eines Touchscreens für die Warenerfassung fällt auf, dass ein Fehler nur durch einen kurzen Farbwechsel des Feldes angezeigt wird, ohne Text oder Ton. Was ist das aus Sicht der Barrierefreiheit?",
  "payload": {
   "options": [
    {
     "text": "Kein Problem, solange die Farbe kräftig genug gewählt ist und die große Mehrheit der Nutzer sie problemlos sieht",
     "correct": false,
     "why": "Wer Farben nicht wahrnehmen kann, wird trotzdem ausgeschlossen; die Mehrheit zählt nicht."
    },
    {
     "text": "Eine Barriere, weil Menschen mit Sehbeeinträchtigung den Fehler nicht wahrnehmen und den Vorgang nicht abschließen können",
     "correct": true
    },
    {
     "text": "Ein Sicherheitsmangel, weil Fehlermeldungen in einer Oberfläche für Beschäftigte niemals angezeigt werden dürfen",
     "correct": false,
     "why": "Fehlermeldungen sind erwünscht; es geht um ihre Wahrnehmbarkeit."
    },
    {
     "text": "Ein reines Designthema ohne Auswirkung auf die tatsächliche Nutzbarkeit der Oberfläche",
     "correct": false,
     "why": "Gerade die Nutzbarkeit für Menschen mit Behinderungen ist betroffen."
    }
   ],
   "multi": false,
   "explanation": "Wird eine Rückmeldung nur über Farbe gegeben, können manche Nutzer sie nicht wahrnehmen. Das Hindernis schränkt die tatsächliche Nutzung ein und ist damit eine Barriere."
  }
 },
 {
  "id": "kmp-barrierefreiheit-von-benutzerschnittstellen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Anforderungsanalyse",
  "concept": "barrierefreiheit-von-benutzerschnittstellen",
  "title": "Anforderung prüfbar machen",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Für einen Selbstbedienungsautomaten eines Kulturhauses ist Barrierefreiheit im Lastenheft gefordert. Welche Prüffrage passt zu dieser Anforderung?",
  "payload": {
   "options": [
    {
     "text": "Werden alle Zahlungsdaten der Gäste bei der Übertragung an den Zahlungsdienstleister verschlüsselt?",
     "correct": false,
     "why": "Das prüft Datensicherheit, nicht Barrierefreiheit."
    },
    {
     "text": "Lädt die Startseite des Automaten auch bei vielen gleichzeitigen Nutzern in weniger als zwei Sekunden?",
     "correct": false,
     "why": "Das prüft Antwortzeit, nicht die Nutzbarkeit für Menschen mit Behinderungen."
    },
    {
     "text": "Können Menschen mit Behinderungen Veranstaltungen suchen, Plätze wählen und Karten kaufen, ohne ausgeschlossen oder wesentlich behindert zu werden?",
     "correct": true
    },
    {
     "text": "Läuft der Automat auch bei einem kurzzeitigen Stromausfall ohne Datenverlust weiter?",
     "correct": false,
     "why": "Das prüft Ausfallsicherheit, nicht Barrierefreiheit."
    }
   ],
   "multi": false,
   "explanation": "Barrierefreiheit wird daran geprüft, ob die vorgesehenen Vorgänge für Menschen mit Behinderungen tatsächlich nutzbar sind. Verschlüsselung, Ladezeit und Ausfallsicherheit sind andere Qualitätsmerkmale."
  }
 },
 {
  "id": "kmp-beschaffungsmodelle-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "beschaffungsmodelle",
  "title": "Vorteile des Kaufs",
  "difficulty": 2,
  "points": 4,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Bildungsdienstleister bietet Trainern interaktive Displays zum Kauf oder zur zwölfmonatigen Nutzungsüberlassung an. Welche zwei Vorteile hat der Kauf aus Sicht der Lehrkraft?",
  "payload": {
   "options": [
    {
     "text": "Das Display gehört der Lehrkraft und steht dauerhaft zur freien Verfügung",
     "correct": true
    },
    {
     "text": "Bei jeder neuen Gerätegeneration wird das Display kostenlos gegen ein neueres ausgetauscht",
     "correct": false,
     "why": "Ein regelmäßiger Austausch ist typisch für Überlassungsmodelle, nicht für den Kauf."
    },
    {
     "text": "Nach dem Erwerb fallen keine weiteren Nutzungsentgelte mehr an",
     "correct": true
    },
    {
     "text": "Das Gerät kann nach zwölf Monaten ohne weitere Kosten zurückgegeben werden",
     "correct": false,
     "why": "Eine Rückgabe nach Ablauf gehört zum befristeten Nutzungsmodell, nicht zum Kauf."
    },
    {
     "text": "Die Anschaffung belastet die Liquidität der Lehrkraft nicht, da nichts im Voraus gezahlt wird",
     "correct": false,
     "why": "Beim Kauf wird der Preis auf einmal fällig und belastet die Liquidität zunächst."
    }
   ],
   "multi": true,
   "explanation": "Beim Kauf geht das Eigentum über: Das Gerät ist dauerhaft frei verfügbar, und es fallen keine laufenden Nutzungsentgelte an. Rückgabe und Tausch gehören zur befristeten Überlassung."
  }
 },
 {
  "id": "kmp-beschaffungsmodelle-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "beschaffungsmodelle",
  "title": "Vorteil für den Anbieter",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Anbieter verkauft 3D-Drucker an Schulen, statt sie zu vermieten. Welcher Vorteil ergibt sich daraus für den Anbieter?",
  "payload": {
   "options": [
    {
     "text": "Der Anbieter behält das Eigentum und erhält über Jahre gleichbleibende monatliche Entgelte",
     "correct": false,
     "why": "Das beschreibt die Vermietung, nicht den Verkauf."
    },
    {
     "text": "Der Anbieter bleibt für Wartung und Rücknahme der Geräte langfristig verantwortlich",
     "correct": false,
     "why": "Das ist bei Vermietung typisch; beim Verkauf entfällt es weitgehend."
    },
    {
     "text": "Der Anbieter trägt das Verwertungsrisiko der Geräte nach Ablauf der Nutzungszeit",
     "correct": false,
     "why": "Dieses Risiko trägt bei einer Vermietung der Anbieter, beim Verkauf der Käufer."
    },
    {
     "text": "Der volle Kaufpreis fließt sofort zu, das schafft Liquidität ohne Vorfinanzierung über die Laufzeit",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Beim Verkauf erhält der Anbieter den ganzen Preis sofort und hat danach keine Rückgabe-, Wartungs- oder Verwertungsrisiken. Die Merkmale der anderen Optionen gehören zur Vermietung."
  }
 },
 {
  "id": "kmp-beschaffungsmodelle-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Wirtschaftlichkeit",
  "concept": "beschaffungsmodelle",
  "title": "Kauf und Miete unterscheiden",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Eine Arztpraxis überlegt, mobile Diagnose-Tablets zu kaufen statt zu mieten. Welche Aussage über den Kauf stimmt?",
  "payload": {
   "options": [
    {
     "text": "Das Eigentum an den Geräten bleibt beim Hersteller, die Praxis darf sie nur befristet nutzen und muss sie zurückgeben",
     "correct": false,
     "why": "Das gilt für die Miete; beim Kauf wechselt das Eigentum."
    },
    {
     "text": "Die Praxis muss die Geräte nach Ablauf der Vertragslaufzeit unaufgefordert an den Anbieter zurückgeben",
     "correct": false,
     "why": "Eine Rückgabepflicht besteht nur bei befristeter Nutzung."
    },
    {
     "text": "Die Praxis zahlt neben dem einmaligen Kaufpreis zusätzlich weiterhin monatliche Nutzungsentgelte",
     "correct": false,
     "why": "Nach dem Kauf fallen keine laufenden Nutzungsentgelte an."
    },
    {
     "text": "Die Geräte gehen in das Eigentum der Praxis über und stehen unbegrenzt zur Verfügung",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Der Kauf überträgt das Eigentum. Die Praxis kann die Tablets unbegrenzt nutzen, muss sie nicht zurückgeben und zahlt nach dem Kaufpreis keine Nutzungsentgelte mehr."
  }
 },
 {
  "id": "kmp-betrieblicher-datenschutz-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "betrieblicher-datenschutz",
  "title": "Pflichten bei Kundendaten",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Online-Terminanbieter will in einem neuen Webshop Name, Anschrift, E-Mail und Geburtsdatum der Besteller speichern. Welche zwei Pflichten muss das Unternehmen beachten?",
  "payload": {
   "options": [
    {
     "text": "Die Kunden bei der Erhebung verständlich über Zweck, Verantwortlichen und Speicherdauer informieren",
     "correct": true
    },
    {
     "text": "Die Daten sicherheitshalber unbegrenzt speichern, damit sie später für beliebige Zwecke nutzbar sind",
     "correct": false,
     "why": "Das verstößt gegen Zweckbindung und Speicherbegrenzung."
    },
    {
     "text": "Nur die für die Bestellabwicklung erforderlichen Daten erheben und ausschließlich dafür verwenden",
     "correct": true
    },
    {
     "text": "Die Datenschutzerklärung erst auf ausdrückliche Nachfrage eines Kunden aushändigen",
     "correct": false,
     "why": "Die Information muss bei der Erhebung erfolgen, nicht erst auf Nachfrage."
    },
    {
     "text": "Das Geburtsdatum vorsorglich abfragen, weil es später einmal nützlich sein könnte",
     "correct": false,
     "why": "Vorratsdatenhaltung widerspricht der Datenminimierung."
    }
   ],
   "multi": true,
   "explanation": "Pflichten sind z. B. die Informationspflicht bei der Erhebung sowie Zweckbindung und Datenminimierung. Vorratsspeicherung ohne Zweck ist unzulässig."
  }
 },
 {
  "id": "kmp-betrieblicher-datenschutz-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "betrieblicher-datenschutz",
  "title": "Auslagerung der Datensicherung",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Ingenieurbüro lagert seine tägliche Sicherung von Projekt- und Personaldaten an einen Cloud-Dienstleister aus, der weisungsgebunden arbeitet. Welche zwei Anforderungen sind zu beachten?",
  "payload": {
   "options": [
    {
     "text": "Eine mündliche Absprache mit dem Dienstleister genügt, wenn er seriös wirkt",
     "correct": false,
     "why": "Erforderlich ist ein schriftlicher Vertrag zur Auftragsverarbeitung."
    },
    {
     "text": "Einen schriftlichen Vertrag zur Auftragsverarbeitung schließen, der Gegenstand, Zweck, Dauer und Weisungsbindung regelt",
     "correct": true
    },
    {
     "text": "Dem Dienstleister erlauben, die Daten zusätzlich für eigene Zwecke auszuwerten",
     "correct": false,
     "why": "Ein Auftragsverarbeiter darf nur nach Weisung des Auftraggebers verarbeiten."
    },
    {
     "text": "Technische und organisatorische Maßnahmen vereinbaren, z. B. verschlüsselte Sicherungen und Zugriffskontrolle",
     "correct": true
    },
    {
     "text": "Die Verantwortung für den Datenschutz vollständig auf den Dienstleister übertragen",
     "correct": false,
     "why": "Der Auftraggeber bleibt verantwortlich und muss den Dienstleister auswählen und kontrollieren."
    }
   ],
   "multi": true,
   "explanation": "Nötig sind ein Vertrag zur Auftragsverarbeitung und vereinbarte technische und organisatorische Maßnahmen. Der Auftraggeber bleibt verantwortlich, der Dienstleister handelt nur nach Weisung."
  }
 },
 {
  "id": "kmp-betrieblicher-datenschutz-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "betrieblicher-datenschutz",
  "title": "Zeiterfassung mit RFID",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Hersteller führt eine Zeiterfassung per RFID-Ausweis ein. Die Kommt- und Geht-Zeiten werden mit Name und Personalnummer gespeichert. Welche Pflicht gilt für das Unternehmen als Verantwortlichen?",
  "payload": {
   "options": [
    {
     "text": "Die Daten dürfen frei und ohne weitere Prüfung auch für heimliche Leistungs- und Verhaltensbewertungen der Beschäftigten genutzt werden",
     "correct": false,
     "why": "Das widerspricht der Zweckbindung."
    },
    {
     "text": "Eine Information der Beschäftigten ist überflüssig, weil sie einen Arbeitsvertrag haben",
     "correct": false,
     "why": "Die Beschäftigten müssen über Art, Umfang und Zweck informiert werden."
    },
    {
     "text": "Die Kommt- und Geht-Zeiten dürfen für alle Kollegen und Besucher am Schwarzen Brett sichtbar ausgehängt werden",
     "correct": false,
     "why": "Ein offener Aushang verletzt die Vertraulichkeit der Beschäftigtendaten."
    },
    {
     "text": "Die Daten dürfen nur für die Lohnabrechnung genutzt werden",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Nach dem Grundsatz der Zweckbindung dürfen die Zeitdaten nur für Arbeitszeit- und Lohnabrechnung genutzt werden. Zudem sind die Beschäftigten zu informieren."
  }
 },
 {
  "id": "kmp-datenschutz-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "datenschutz",
  "title": "Standorterfassung im Winterdienst",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Baubetrieb will Standort und Geschwindigkeit der Winterdienst-Beschäftigten fortlaufend erfassen, um Routen zu optimieren. Die Daten lassen sich den Personen zuordnen. Welche zwei Gesichtspunkte sind datenschutzrechtlich relevant?",
  "payload": {
   "options": [
    {
     "text": "Dienstliche Standortdaten sind kein Thema des Datenschutzes, weil das Diensttelefon dem Arbeitgeber gehört",
     "correct": false,
     "why": "Auch bei Firmengeräten sind zuordenbare Standortdaten personenbezogen."
    },
    {
     "text": "Erforderlichkeit und Verhältnismäßigkeit der personenbezogenen Dauererfassung",
     "correct": true
    },
    {
     "text": "Weil Routenoptimierung ein guter Zweck ist, darf die Auswertung beliebig auf Leistungsprofile erweitert werden",
     "correct": false,
     "why": "Zweckbindung: Eine Ausweitung auf Leistungs- und Verhaltensprofile ist nicht gedeckt."
    },
    {
     "text": "Transparenz: Die Beschäftigten müssen über die Erfassung und ihren Zweck informiert werden",
     "correct": true
    },
    {
     "text": "Eine Einwilligung des Betriebsrats ersetzt alle weiteren datenschutzrechtlichen Prüfungen",
     "correct": false,
     "why": "Auch bei Beteiligung des Betriebsrats bleiben Rechtsgrundlage, Zweckbindung und Transparenz zu prüfen."
    }
   ],
   "multi": true,
   "explanation": "Relevant sind z. B. Erforderlichkeit und Verhältnismäßigkeit der Dauererfassung, Transparenz gegenüber den Beschäftigten und die Zweckbindung. Auch Firmengeräte ändern daran nichts."
  }
 },
 {
  "id": "kmp-datenschutz-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "datenschutz",
  "title": "Zutrittsdaten auswerten",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Elektronische Zutrittskarten protokollieren, wer wann welchen Raum betritt. Die Personalabteilung will diese Daten nun nutzen, um Anwesenheit und Pausen einzelner Beschäftigter zu kontrollieren. Wie ist das zu beurteilen?",
  "payload": {
   "options": [
    {
     "text": "Zulässig, weil die Daten ohnehin vorhanden sind und der Arbeitgeber alle Arbeitszeiten prüfen darf",
     "correct": false,
     "why": "Vorhandensein der Daten ersetzt keine Rechtsgrundlage."
    },
    {
     "text": "Zulässig, sobald die Personalabteilung die Auswertung intern dokumentiert",
     "correct": false,
     "why": "Dokumentation allein ersetzt weder Rechtsgrundlage noch Verhältnismäßigkeitsprüfung."
    },
    {
     "text": "Unzulässig ohne eigene Rechtsgrundlage: Die Nutzung zur Verhaltenskontrolle ist eine Zweckänderung gegenüber der Zutrittssicherung",
     "correct": true
    },
    {
     "text": "Unzulässig, weil Zutrittsdaten nie länger als einen Tag gespeichert werden dürfen",
     "correct": false,
     "why": "Eine solche pauschale Frist gibt es nicht; das Problem ist die Zweckänderung."
    }
   ],
   "multi": false,
   "explanation": "Die Protokolle dienen der Zutrittssicherung. Sie für Anwesenheits- und Verhaltenskontrolle zu nutzen, ist eine Zweckänderung und ohne Rechtsgrundlage und Verhältnismäßigkeitsprüfung unzulässig."
  }
 },
 {
  "id": "kmp-datenschutz-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Datenschutz",
  "concept": "datenschutz",
  "title": "Testdaten an externen Dienst",
  "difficulty": 2,
  "points": 6,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Für einen Systemtest soll eine CSV mit Namen, Bankverbindungen und Fahrkartennummern an einen externen Onlinedienst gesendet werden. Einen Vertrag mit dem Anbieter gibt es nicht. Welche Überlegung ist richtig?",
  "payload": {
   "options": [
    {
     "text": "Das ist unproblematisch, weil es sich nur um Testdaten handelt und der Dienst die Datei lediglich im Browser anzeigt und nicht weiterverarbeitet",
     "correct": false,
     "why": "Echte Datensätze bleiben personenbezogen, auch wenn sie nur zum Test dienen."
    },
    {
     "text": "Es genügt, den Vertrag nachträglich zu schließen, sobald der Dienst regelmäßig in der Qualitätssicherung genutzt wird",
     "correct": false,
     "why": "Vor der Übermittlung müssen Zulässigkeit und Vereinbarungen geklärt sein."
    },
    {
     "text": "Nur die Bankverbindungen sind schutzwürdig, Namen und Fahrkartennummern dürfen bedenkenlos an den Anbieter übermittelt werden",
     "correct": false,
     "why": "Auch Namen und zuordenbare Nummern sind personenbezogene Daten."
    },
    {
     "text": "Die Übermittlung an einen fremden Anbieter birgt Offenlegungsrisiken, vorab sind Zulässigkeit, Vereinbarungen und Datensparsamkeit zu klären",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Personenbezogene Daten dürfen nicht ohne Klärung von Zulässigkeit und Vertrag an Dritte gehen. Datensparsame Testdaten verringern das Risiko; Testdaten sind nicht automatisch harmlos."
  }
 }
]);

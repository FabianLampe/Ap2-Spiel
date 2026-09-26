window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "hardware-fehlerdiagnose",
  "title": "Hardware-Fehlerdiagnose",
  "figure": "kalle",
  "lines": [
   "Merk dir: Startet ein Gerät unter Last neu, prüfst du zuerst die Stromversorgung.",
   "Wichtig ist: Ein USB-Anschluss liefert nur eine begrenzte Stromstärke, etwa 0,9 A. Braucht das Gerät mehr, wird die Versorgung instabil.",
   "Abhilfe: Gerät an das mitgelieferte Netzteil oder eine eigene Stromquelle anschließen.",
   "Bei akkubetriebenen Geräten kommen verschlissene Akkus, lockere Kontakte, defekte Ladeelektronik oder thermische Schutzabschaltung als Ursache infrage."
  ]
 },
 {
  "concept": "hardware-schnittstellen-und-steckverbinder",
  "title": "Hardware-Schnittstellen und Steckverbinder",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: DisplayPort hat einen rechteckigen Stecker mit abgeschrägter Ecke. HDMI ist trapezförmig mit 19 Kontakten, VGA (D-Sub 15) trapezförmig mit 15 Stiften in drei Reihen.",
   "Wichtig ist: USB Typ C ist oval, hat 24 Kontakte und ist verdrehsicher steckbar. Er kann Daten übertragen und Strom liefern.",
   "Glasfaser überbrückt längere Strecken als Kupfer mit RJ45 (etwa 100 m) und ist unempfindlich gegen elektromagnetische Störungen.",
   "Ein USB-Port mit Taster am Mainboard dient dem Firmware-Update (BIOS/UEFI). Mehrere Monitore in Reihe brauchen Multi-Stream Transport (MST)."
  ]
 },
 {
  "concept": "hardware-und-endgeraete",
  "title": "Hardware und Endgeräte",
  "figure": "barista",
  "lines": [
   "Merk dir: Bei der Geräteauswahl zählt der Einsatzzweck. Gewicht, Schnittstellen, Leistung, Akku und Robustheit richten sich danach.",
   "Wichtig ist: Ein Thin-Client nutzt zentral bereitgestellte Anwendungen, ist aber vom Netzwerk und vom zentralen System abhängig.",
   "Ein Notebook ist mobil und unabhängig vom festen Aufbau, hat aber ein höheres Verlust- und Beschädigungsrisiko als ein Desktop.",
   "Ergänzungen wie Scanner, Webcam, Dockingstation oder zweiter Bildschirm begründest du immer mit der konkreten Tätigkeit."
  ]
 },
 {
  "concept": "ip-und-mac-adressierung",
  "title": "IP- und MAC-Adressierung",
  "figure": "startup",
  "lines": [
   "Merk dir: IPv4 nutzt 32-Bit-Adressen in Dezimalschreibweise mit Punkten. IPv6 nutzt 128-Bit-Adressen, hexadezimal mit Doppelpunkten.",
   "Wichtig ist: IPv4 kennt Broadcast. IPv6 nutzt stattdessen Multicast und Anycast.",
   "IPv4-Adressen konfiguriert man typischerweise per DHCP. IPv6 unterstützt zusätzlich die automatische Konfiguration per SLAAC.",
   "Der große IPv6-Adressraum macht Adressübersetzung per NAT weitgehend überflüssig."
  ]
 },
 {
  "concept": "ipv4-adressierung-und-subnetting",
  "title": "IPv4-Adressierung und Subnetting",
  "figure": "kalle",
  "lines": [
   "Merk dir: Private IPv4-Bereiche sind 10.0.0.0/8, 172.16.0.0/12 und 192.168.0.0/16. Sie werden im Internet nicht geroutet.",
   "Wichtig ist: Private Adressen sind von außen nicht direkt erreichbar. Ein Zugriff ins Internet geht nur über NAT am Router.",
   "Netzadresse: alle Hostbits 0. Broadcastadresse: alle Hostbits 1. Dazwischen liegen die Hostadressen.",
   "Ein /27 hat Blöcke von 32 Adressen, ein /23 fasst zwei /24-Netze zusammen, ein /30 hat vier Adressen und zwei Hosts."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-hardware-fehlerdiagnose-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-fehlerdiagnose",
  "title": "Etikettendrucker startet neu",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Etikettendrucker wird über den USB-Anschluss eines Notebooks versorgt (max. 0,9 A). Bei 5 V braucht er 2,4 A. Bei Probedrucken startet er gelegentlich neu; das Netzteil wurde noch nicht genutzt. Welche Begründung passt?",
  "payload": {
   "options": [
    {
     "text": "Der USB-Anschluss liefert mit 0,9 A mehr Strom als der Drucker benötigt, die entstehende Überspannung löst die gelegentlichen Neustarts aus.",
     "correct": false,
     "why": "0,9 A ist weniger als der Bedarf von 2,4 A, und nicht Überspannung ist das Problem."
    },
    {
     "text": "Der Drucker braucht 2,4 A, der Anschluss liefert höchstens 0,9 A; die zu schwache Versorgung wird instabil und verursacht die Neustarts.",
     "correct": true
    },
    {
     "text": "Die Spannung von 5 V ist für einen USB-Anschluss grundsätzlich zu niedrig, deshalb bricht die Versorgung unter Last zusammen und das Gerät startet neu.",
     "correct": false,
     "why": "5 V sind die übliche USB-Spannung. Es fehlt Stromstärke."
    },
    {
     "text": "Ein Treiberfehler im Notebook ist die einzige denkbare Ursache, die Stromversorgung spielt bei Neustarts unter Last grundsätzlich keine Rolle.",
     "correct": false,
     "why": "Bei Neustarts unter Last ist eine zu geringe Stromabgabe eine naheliegende Ursache."
    }
   ],
   "multi": false,
   "explanation": "Der Bedarf liegt mit 2,4 A weit über den maximal 0,9 A des USB-Ports. Die unzureichende Stromabgabe macht die Versorgung instabil, das Gerät startet neu. Das Netzteil kann Abhilfe schaffen."
  }
 },
 {
  "id": "kmp-hardware-fehlerdiagnose-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-fehlerdiagnose",
  "title": "Messmodul mit unvollständigen Datensätzen",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein USB-gespeistes Messmodul (Bedarf 5 V, 2,4 A) startet neu, sobald mehrere Sensorwerte gleichzeitig gespeichert werden. Der USB-Anschluss des Industrie-PCs ist mit 1,5 A gekennzeichnet. Welche Ursache im Bereich der Energieversorgung ist möglich?",
  "payload": {
   "options": [
    {
     "text": "Der Anschluss liefert 1,5 A, das Modul benötigt 2,4 A; bei höherer Aktivität wird die Versorgung instabil.",
     "correct": true
    },
    {
     "text": "Der Anschluss liefert mit 1,5 A mehr als das Modul für den Betrieb braucht, das überschüssige Angebot stört die Elektronik.",
     "correct": false,
     "why": "Ein Netzteil liefert nur, was das Gerät zieht. Zu wenig Strom ist das Problem."
    },
    {
     "text": "Die Sensoren sind falsch kalibriert, und das erzeugt bei gleichzeitigem Speichern Neustarts des gesamten Messmoduls.",
     "correct": false,
     "why": "Falsche Kalibrierung verfälscht Messwerte, sie führt nicht zu Neustarts."
    },
    {
     "text": "Der Datenspeicher des Moduls ist voll, weshalb dem Modul beim gleichzeitigen Speichern Strom fehlt und es neu startet.",
     "correct": false,
     "why": "Ein voller Speicher verursacht keine Stromknappheit."
    }
   ],
   "multi": false,
   "explanation": "Dem Bedarf von 2,4 A steht eine Abgabe von nur 1,5 A gegenüber. Steigt die Last, bricht die Versorgung ein. Neustarts und unvollständige Datensätze sind die Folge. Eine eigene Stromquelle behebt es."
  }
 },
 {
  "id": "kmp-hardware-fehlerdiagnose-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-fehlerdiagnose",
  "title": "Handterminal schaltet sich ab",
  "difficulty": 2,
  "points": 4,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein akkubetriebenes Handterminal schaltet sich im Prüflauf ohne Vorwarnung ab und funktioniert erst nach längerem Laden wieder. Welche zwei Ursachen sind hardware- oder energiebezogen möglich?",
  "payload": {
   "options": [
    {
     "text": "Ein verschlissener Akku liefert unter Last nicht mehr genug Energie.",
     "correct": true
    },
    {
     "text": "Die Bildschirmauflösung ist zu hoch eingestellt, deshalb schaltet das Gerät ab und lädt sich selbst.",
     "correct": false,
     "why": "Die Auflösung hat keinen Einfluss auf ein abruptes Abschalten mit Erholung durch Laden."
    },
    {
     "text": "Ein lockerer Akkukontakt unterbricht zeitweise die Stromversorgung.",
     "correct": true
    },
    {
     "text": "Zu wenig Arbeitsspeicher wird durch Laden wieder freigegeben.",
     "correct": false,
     "why": "Laden gibt keinen Arbeitsspeicher frei, sondern füllt nur den Akku."
    },
    {
     "text": "Die Zeitzone ist falsch, deshalb entlädt sich der Akku.",
     "correct": false,
     "why": "Die Zeitzoneneinstellung hat keinen Einfluss auf die Stromversorgung."
    }
   ],
   "multi": true,
   "explanation": "Ein verschlissener Akku kann unter Last einbrechen und ein lockerer Akkukontakt unterbricht die Versorgung. Beide erklären das plötzliche Abschalten. Laden oder Neuverbinden stellt kurzzeitig wieder Kontakt her."
  }
 },
 {
  "id": "kmp-hardware-schnittstellen-und-steckverbinder-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-schnittstellen-und-steckverbinder",
  "title": "Buchsen der Grafikkarte erkennen",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "An einer Grafikkarte sitzen drei Buchsen: (1) rechteckig mit abgeschrägter Ecke, (2) schmal trapezförmig mit 19 flachen Kontakten, (3) trapezförmig mit 15 Stiften in drei Reihen. Welche Zuordnung stimmt?",
  "payload": {
   "options": [
    {
     "text": "(1) HDMI, (2) DisplayPort, (3) VGA (D-Sub 15) mit 15 Stiften",
     "correct": false,
     "why": "HDMI hat 19 flache Kontakte, DisplayPort die abgeschrägte Ecke; die Zuordnung ist vertauscht."
    },
    {
     "text": "(1) DisplayPort, (2) HDMI, (3) VGA",
     "correct": true
    },
    {
     "text": "(1) DisplayPort, (2) VGA (D-Sub 15), (3) HDMI mit 19 Kontakten",
     "correct": false,
     "why": "VGA hat 15 Stifte in drei Reihen, HDMI die 19 Kontakte."
    },
    {
     "text": "(1) USB Typ C, (2) HDMI, (3) RJ45 mit acht Kontakten",
     "correct": false,
     "why": "USB Typ C ist oval mit 24 Kontakten, RJ45 hat acht Pole und ist ein Netzwerkstecker."
    }
   ],
   "multi": false,
   "explanation": "Die abgeschrägte Ecke kennzeichnet DisplayPort, 19 flache Kontakte in trapezförmigem Gehäuse HDMI, 15 Stifte in drei Reihen VGA (D-Sub 15)."
  }
 },
 {
  "id": "kmp-hardware-schnittstellen-und-steckverbinder-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "hardware-schnittstellen-und-steckverbinder",
  "title": "Glasfaser statt Kupfer",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Zwei Etagenverteiler im Abstand von 300 m sollen verbunden werden, entweder mit Glasfaser (LC-Stecker) oder Kupfer (RJ45). Welche zwei Vorteile hat die Glasfaser?",
  "payload": {
   "options": [
    {
     "text": "Größere überbrückbare Länge, während Kupfer mit RJ45 nur bis etwa 100 m reicht.",
     "correct": true
    },
    {
     "text": "Die Stecker lassen sich ohne Spezialwerkzeug vor Ort konfektionieren.",
     "correct": false,
     "why": "Glasfaserstecker zu konfektionieren ist aufwendiger als bei Kupfer."
    },
    {
     "text": "Unempfindlichkeit gegen elektromagnetische Störungen.",
     "correct": true
    },
    {
     "text": "Die Stromversorgung von Endgeräten über das Kabel ist direkt möglich.",
     "correct": false,
     "why": "Strom kann über Kupfer, aber nicht über Glasfaser übertragen werden."
    },
    {
     "text": "Glasfaserkabel sind grundsätzlich günstiger als Kupferkabel.",
     "correct": false,
     "why": "Glasfaser ist in der Regel teurer, Kosten sind kein Vorteil."
    }
   ],
   "multi": true,
   "explanation": "Glasfaser überbrückt größere Längen (Kupfer/RJ45 etwa 100 m) und wird nicht durch elektromagnetische Störungen beeinflusst. Höhere Datenraten sind ein weiterer Vorteil."
  }
 },
 {
  "id": "kmp-hardware-schnittstellen-und-steckverbinder-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-schnittstellen-und-steckverbinder",
  "title": "USB-Port mit Taster",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Auf dem I/O-Panel eines Mainboards ist ein USB-A-Port farblich abgesetzt und hat direkt daneben einen kleinen versenkten Taster. Was ist die Besonderheit?",
  "payload": {
   "options": [
    {
     "text": "Er ist ein Schnellladeanschluss für Smartphones am Gehäuse, der Taster schaltet die Ladeleistung auf das Maximum um.",
     "correct": false,
     "why": "Ein Taster kennzeichnet hier nicht die Ladefunktion."
    },
    {
     "text": "Er dient dem Aktualisieren der Firmware (BIOS/UEFI) von einem USB-Stick, auch ohne vollständig betriebsbereites System.",
     "correct": true
    },
    {
     "text": "Er ist ausschließlich für Tastaturen gedacht, damit diese schon vor dem Start des Betriebssystems im BIOS funktionieren.",
     "correct": false,
     "why": "Die Firmware-Aktualisierung ist der Zweck, nicht ein Bootanschluss für Tastaturen."
    },
    {
     "text": "Er verbindet das Mainboard über einen Adapter mit dem Netzwerk, der Taster startet dabei Wake-on-LAN.",
     "correct": false,
     "why": "Netzwerkzugang läuft über die Ethernet-Buchse, nicht über diesen Port."
    }
   ],
   "multi": false,
   "explanation": "Der farblich abgesetzte USB-Port mit Taster dient dem Einspielen von BIOS/UEFI-Updates von einem USB-Stick, auch wenn noch keine lauffähige Konfiguration vorhanden ist."
  }
 },
 {
  "id": "kmp-hardware-schnittstellen-und-steckverbinder-4",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-schnittstellen-und-steckverbinder",
  "title": "Monitorkette mit MST",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Fünf Monitore sollen hintereinander an einem einzigen DisplayPort- oder Thunderbolt-Ausgang eines Rechners betrieben werden, jeder zeigt ein eigenes Bild. Was muss vor der Beschaffung geprüft werden?",
  "payload": {
   "options": [
    {
     "text": "Der Ausgang des Rechners und die Monitoranschlüsse müssen Multi-Stream Transport (MST) unterstützen und das Signal weiterreichen.",
     "correct": true
    },
    {
     "text": "Es genügt, dass Stecker und Kabel mechanisch zusammenpassen, denn die Funktion der Reihenschaltung ergibt sich dann von selbst.",
     "correct": false,
     "why": "Ein passender Stecker garantiert MST-Fähigkeit nicht."
    },
    {
     "text": "Alle Monitore müssen VGA-Eingänge besitzen, weil nur diese Schnittstelle eine Reihenschaltung mehrerer Bildschirme erlaubt.",
     "correct": false,
     "why": "VGA kann Bildsignale nicht in Reihe an mehrere Monitore weitergeben."
    },
    {
     "text": "Der Rechner muss für jeden der fünf Monitore einen eigenen Videoausgang mit eigenem Kabel haben.",
     "correct": false,
     "why": "Genau das soll mit MST vermieden werden: ein Ausgang für die ganze Kette."
    }
   ],
   "multi": false,
   "explanation": "Reihenschaltung funktioniert nur mit Multi-Stream Transport. Der Videoausgang des Rechners muss MST beherrschen, ebenso die Monitore, die das Signal weiterleiten. Ein passender Stecker allein reicht nicht."
  }
 },
 {
  "id": "kmp-hardware-und-endgeraete-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-und-endgeraete",
  "title": "Ergänzungen für die Sachbearbeiterin",
  "difficulty": 2,
  "points": 4,
  "figure": "barista",
  "source": "AP2",
  "prompt": "Eine Sachbearbeiterin prüft Papierrechnungen, überträgt Belegdaten in die Buchhaltung und nimmt täglich an Videobesprechungen teil. Ihr PC hat Bildschirm, Tastatur, Maus, Lautsprecher und Netzwerkanschluss. Welche zwei Ergänzungen sind sinnvoll?",
  "payload": {
   "options": [
    {
     "text": "Ein Dokumentenscanner für die digitale Erfassung der Rechnungen.",
     "correct": true
    },
    {
     "text": "Ein Grafiktablett, um die Rechnungen digital nachzuzeichnen und zu beschriften.",
     "correct": false,
     "why": "Ein Grafiktablett hilft bei Belegerfassung und Besprechungen nicht."
    },
    {
     "text": "Eine Webcam für die Bildübertragung in Besprechungen.",
     "correct": true
    },
    {
     "text": "Ein Etikettendrucker, um Besprechungen an die Niederlassungen zu übertragen.",
     "correct": false,
     "why": "Etikettendrucker haben nichts mit Videobesprechungen zu tun."
    },
    {
     "text": "Eine zusätzliche Grafikkarte, um umfangreiche Tabellen zu rendern.",
     "correct": false,
     "why": "Tabellen brauchen keine leistungsstarke Grafikkarte."
    }
   ],
   "multi": true,
   "explanation": "Der Scanner erfasst Papierbelege für die digitale Weiterverarbeitung, die Webcam ermöglicht die Bildübertragung in Videobesprechungen. Die anderen Geräte bieten keinen Nutzen für diese Tätigkeiten."
  }
 },
 {
  "id": "kmp-hardware-und-endgeraete-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-und-endgeraete",
  "title": "Homeoffice-Ausstattung ergänzen",
  "difficulty": 2,
  "points": 4,
  "figure": "barista",
  "source": "AP2",
  "prompt": "Ein Projektkoordinator arbeitet drei Tage pro Woche zu Hause. Vorhanden sind Notebook, 27-Zoll-Bildschirm, Tastatur, Maus, Headset und stabile Internetverbindung. Er wertet Tabellen und Baupläne parallel aus und wechselt mehrmals täglich zwischen Arbeitsmitteln. Welche zwei Ergänzungen passen?",
  "payload": {
   "options": [
    {
     "text": "Ein Etikettendrucker für die Videokonferenzen",
     "correct": false,
     "why": "Ein Etikettendrucker unterstützt weder Auswertung noch Konferenzen."
    },
    {
     "text": "Eine Dockingstation für den gebündelten Anschluss der Peripherie.",
     "correct": true
    },
    {
     "text": "Ein zusätzliches Netzteil ohne Notebook, weil es die vorhandenen Bildschirme vollständig ersetzt",
     "correct": false,
     "why": "Ein Netzteil ersetzt keinen Bildschirm."
    },
    {
     "text": "Ein zweiter Bildschirm für die parallele Darstellung von Tabellen und Bauplänen.",
     "correct": true
    },
    {
     "text": "Ein Handscanner, um die Baupläne im Büro zu digitalisieren.",
     "correct": false,
     "why": "Handscanner dienen der Datenerfassung, nicht dem parallelen Arbeiten mit Plänen."
    }
   ],
   "multi": true,
   "explanation": "Die Dockingstation bündelt Peripherie und erleichtert den Arbeitsmittelwechsel. Der zweite Bildschirm ermöglicht die parallele Ansicht von Tabellen und Bauplänen."
  }
 },
 {
  "id": "kmp-hardware-und-endgeraete-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "hardware-und-endgeraete",
  "title": "Thin-Client im Schulungsbetrieb",
  "difficulty": 2,
  "points": 4,
  "figure": "barista",
  "source": "AP2",
  "prompt": "Ein Bildungsanbieter richtet Schulungsräume ein. Welche Aussage zum Thin-Client (zentral bereitgestellte Anwendungen) ist zutreffend?",
  "payload": {
   "options": [
    {
     "text": "Vorteil: Er ist ein vollwertiger Arbeitsplatz mit lokaler Fachsoftware; Nachteil: er ist zu schwer zu transportieren.",
     "correct": false,
     "why": "Ein Thin-Client ist gerade ein schlankes Gerät mit zentraler Anwendungsbereitstellung."
    },
    {
     "text": "Vorteil: Er lässt sich beliebig mit Komponenten erweitern; Nachteil: er braucht keinen Netzwerkzugang.",
     "correct": false,
     "why": "Die Aussagen passen zu einem Desktop, nicht zum Thin-Client."
    },
    {
     "text": "Vorteil: zentrale Anwendungsbereitstellung; Nachteil: Abhängigkeit vom Netzwerk und vom zentralen System.",
     "correct": true
    },
    {
     "text": "Vorteil: höchste lokale Rechenleistung; Nachteil: hohe Anschaffungskosten durch Akku und Display.",
     "correct": false,
     "why": "Ein Thin-Client rechnet kaum lokal, er nutzt zentrale Ressourcen."
    }
   ],
   "multi": false,
   "explanation": "Beim Thin-Client laufen die Anwendungen zentral, das vereinfacht Verwaltung und Bereitstellung. Fällt Netzwerk oder Zentralsystem aus, ist er nicht nutzbar."
  }
 },
 {
  "id": "kmp-ip-und-mac-adressierung-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ip-und-mac-adressierung",
  "title": "IPv4 und IPv6 im Kulturzentrum",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Für die Dokumentation sollen IPv4 und IPv6 gegenübergestellt werden. Welche Vergleichsaussage ist technisch zutreffend?",
  "payload": {
   "options": [
    {
     "text": "IPv4 hat 128-Bit-Adressen hexadezimal, IPv6 hat 32-Bit-Adressen dezimal.",
     "correct": false,
     "why": "Die Zuordnung ist vertauscht. IPv4 hat 32 Bit, IPv6 128 Bit."
    },
    {
     "text": "IPv4 hat 32-Bit-Adressen mit Punkten, IPv6 hat 128-Bit-Adressen mit Doppelpunkten.",
     "correct": true
    },
    {
     "text": "IPv4 und IPv6 unterscheiden sich nur im Namen, beide haben 64-Bit-Adressen und Punkte.",
     "correct": false,
     "why": "Beide Protokolle unterscheiden sich deutlich im Adressraum."
    },
    {
     "text": "IPv4 schreibt Adressen mit Doppelpunkten, IPv6 mit Punkten, beide haben 48 Bit.",
     "correct": false,
     "why": "Weder Schreibweise noch Länge stimmen. 48 Bit hat die MAC-Adresse."
    }
   ],
   "multi": false,
   "explanation": "IPv4-Adressen bestehen aus 32 Bit und werden dezimal mit Punkten geschrieben, IPv6-Adressen aus 128 Bit hexadezimal mit Doppelpunkten."
  }
 },
 {
  "id": "kmp-ip-und-mac-adressierung-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ip-und-mac-adressierung",
  "title": "Broadcast bei IPv4 und IPv6",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein Bildungszentrum stellt die Protokolle IPv4 und IPv6 für eine Entscheidungsgrundlage gegenüber. Welche Aussage über Broadcast trifft zu?",
  "payload": {
   "options": [
    {
     "text": "IPv6 unterstützt Broadcast an alle Teilnehmer, IPv4 verwendet dafür Multicast und Anycast.",
     "correct": false,
     "why": "Die Zuordnung ist umgekehrt."
    },
    {
     "text": "Beide Protokolle nutzen ausschließlich Broadcast, Multicast und Anycast gibt es nicht.",
     "correct": false,
     "why": "Multicast ist bei IPv6 ein wichtiger Ersatz für Broadcast."
    },
    {
     "text": "IPv4 hat Broadcast, IPv6 nutzt dafür Multicast beziehungsweise Anycast.",
     "correct": true
    },
    {
     "text": "Weder IPv4 noch IPv6 kennen Adressierungen an mehrere Empfänger.",
     "correct": false,
     "why": "IPv4 kennt Broadcast und Multicast, IPv6 Multicast und Anycast."
    }
   ],
   "multi": false,
   "explanation": "Broadcast an alle Teilnehmer gibt es nur bei IPv4. IPv6 ersetzt ihn durch Multicast (Gruppe) und Anycast (nächstgelegener Empfänger)."
  }
 },
 {
  "id": "kmp-ip-und-mac-adressierung-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ip-und-mac-adressierung",
  "title": "Unterschiede für die Schulungsunterlage",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Für ein Testnetz mit IPv4- und IPv6-Geräten sollen zwei Unterschiede der Protokolle in eine Schulung. Welche zwei Aussagen sind zutreffend?",
  "payload": {
   "options": [
    {
     "text": "IPv6 kennt keine Subnetze und keine Präfixe, IPv4 dagegen schon.",
     "correct": false,
     "why": "Auch IPv6 arbeitet mit Subnetzen."
    },
    {
     "text": "IPv4 wird typischerweise per DHCP konfiguriert, IPv6 zusätzlich per SLAAC.",
     "correct": true
    },
    {
     "text": "IPv6 verlangt wegen der langen Adressen zwingend NAT, IPv4 dagegen nicht.",
     "correct": false,
     "why": "Der große IPv6-Adressraum macht NAT weniger notwendig."
    },
    {
     "text": "Der große IPv6-Adressraum verringert die Notwendigkeit von NAT.",
     "correct": true
    },
    {
     "text": "IPv4-Adressen sind mit 128 Bit länger als IPv6-Adressen und dezimal geschrieben.",
     "correct": false,
     "why": "IPv4-Adressen haben 32 Bit, IPv6-Adressen 128 Bit."
    }
   ],
   "multi": true,
   "explanation": "IPv4 wird typischerweise per DHCP konfiguriert, IPv6 zusätzlich per SLAAC. Zudem verringert der riesige IPv6-Adressraum die Notwendigkeit von NAT."
  }
 },
 {
  "id": "kmp-ipv4-adressierung-und-subnetting-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ipv4-adressierung-und-subnetting",
  "title": "Klassifikation privater Adressen",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "In einem Schulungsraum sind Tablet 10.42.8.21/24, Präsentationsrechner 10.42.8.34/24 und Drucker 10.42.8.50/24 zugewiesen. Wie sind diese Adressen einzuordnen und was folgt daraus?",
  "payload": {
   "options": [
    {
     "text": "Es sind öffentliche Adressen, die weltweit im Internet direkt erreichbar sind.",
     "correct": false,
     "why": "10.0.0.0/8 ist ein privater Bereich und wird nicht ins Internet geroutet."
    },
    {
     "text": "Es sind Link-Local-Adressen, die nach einem DHCP-Ausfall entstehen.",
     "correct": false,
     "why": "Link-Local-Adressen liegen in 169.254.0.0/16."
    },
    {
     "text": "Es sind private IPv4-Adressen, von außen nicht direkt erreichbar.",
     "correct": true
    },
    {
     "text": "Es sind private Adressen; deshalb sind sie aus dem Internet direkt erreichbar, sobald der Router läuft.",
     "correct": false,
     "why": "Ohne NAT oder Portweiterleitung sind private Adressen von außen nicht erreichbar."
    }
   ],
   "multi": false,
   "explanation": "10.42.8.x liegt im privaten Bereich 10.0.0.0/8. Solche Adressen werden im Internet nicht weitergeleitet, die Geräte sind aus öffentlichen Netzen nicht unmittelbar erreichbar."
  }
 },
 {
  "id": "kmp-ipv4-adressierung-und-subnetting-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ipv4-adressierung-und-subnetting",
  "title": "Netz- und Broadcastadresse bei /27",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Zutrittscontroller hat die Adresse 172.20.45.78/27. Welche Netzadresse und welche Broadcastadresse gehören dazu?",
  "payload": {
   "options": [
    {
     "text": "Netz 172.20.45.0/27, Broadcast 172.20.45.31",
     "correct": false,
     "why": "Das ist der erste /27-Block. 78 liegt aber im Block 64 bis 95."
    },
    {
     "text": "Netz 172.20.45.64/27, Broadcast 172.20.45.127",
     "correct": false,
     "why": "Ein /27 hat Blöcke von 32 Adressen, der Broadcast ist .95, nicht .127."
    },
    {
     "text": "Netz 172.20.45.72/27, Broadcast 172.20.45.79",
     "correct": false,
     "why": "Die Blockgrenzen liegen bei Vielfachen von 32, nicht bei 8."
    },
    {
     "text": "Netz 172.20.45.64/27, Broadcast 172.20.45.95",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Ein /27 hat 32 Adressen je Block (Blöcke 0, 32, 64, 96 ...). 78 liegt im Block 64 bis 95. Netzadresse 172.20.45.64/27, Broadcast 172.20.45.95."
  }
 },
 {
  "id": "kmp-ipv4-adressierung-und-subnetting-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ipv4-adressierung-und-subnetting",
  "title": "Netz- und Broadcastadresse bei /23",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Diagnosegerät hat die IPv4-Adresse 10.73.19.201 mit der Subnetzmaske 255.255.254.0. Wie lauten Netz- und Broadcastadresse?",
  "payload": {
   "options": [
    {
     "text": "Netz 10.73.19.0/23, Broadcast 10.73.19.255",
     "correct": false,
     "why": "Ein /23 beginnt bei geraden dritten Oktetten, also bei 18, nicht bei 19."
    },
    {
     "text": "Netz 10.73.18.0/23, Broadcast 10.73.18.255",
     "correct": false,
     "why": "Der Broadcast eines /23-Netzes liegt am Ende des zweiten /24-Blocks, also bei 19.255."
    },
    {
     "text": "Netz 10.73.18.0/23, Broadcast 10.73.19.255",
     "correct": true
    },
    {
     "text": "Netz 10.73.19.0/24, Broadcast 10.73.19.255",
     "correct": false,
     "why": "Die Maske 255.255.254.0 entspricht /23, nicht /24."
    }
   ],
   "multi": false,
   "explanation": "255.255.254.0 ist /23, das Netz umfasst zwei /24-Blöcke: 10.73.18.0 bis 10.73.19.255. Netzadresse 10.73.18.0/23, Broadcast 10.73.19.255."
  }
 },
 {
  "id": "kmp-ipv4-adressierung-und-subnetting-4",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "ipv4-adressierung-und-subnetting",
  "title": "Punkt-zu-Punkt-Netz mit /30",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Die Wetterstation hat die Adresse 192.168.44.214/30. Welche Netz- und Broadcastadresse gehören dazu?",
  "payload": {
   "options": [
    {
     "text": "Netz 192.168.44.214/30, Broadcast 192.168.44.215",
     "correct": false,
     "why": "Die Hostadresse .214 ist nicht die Netzadresse. Die liegt am Blockanfang bei .212."
    },
    {
     "text": "Netz 192.168.44.212/30, Broadcast 192.168.44.213",
     "correct": false,
     "why": ".213 ist eine Hostadresse; der Broadcast ist die letzte Adresse des Blocks."
    },
    {
     "text": "Netz 192.168.44.208/30, Broadcast 192.168.44.211",
     "correct": false,
     "why": "Der Block 208 bis 211 enthält .214 nicht."
    },
    {
     "text": "Netz 192.168.44.212/30, Broadcast 192.168.44.215",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Ein /30 hat Blöcke von 4 Adressen (..., 212 bis 215). .214 liegt im Block 212 bis 215: Netzadresse 192.168.44.212/30, Broadcast 192.168.44.215."
  }
 }
]);

window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "arbeitsspeicher-und-hardwarekompatibilitaet",
  "title": "Arbeitsspeicher und Hardwarekompatibilität",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: DDR4 und DDR5 sind verschiedene Speichergenerationen. Sie haben andere Kerben und Elektrik und passen nicht in denselben Steckplatz.",
   "Wichtig ist: Ein schnelleres Modul der richtigen Generation läuft nur mit der Taktrate, die Mainboard und Prozessor unterstützen.",
   "Für Dual-Channel gehören die Module in ein kanalübergreifendes Steckplatzpaar. Welche das sind, steht in der Dokumentation des Boards.",
   "Für den Zweikanalbetrieb sollten beide Module dieselbe Speicherkapazität haben.",
   "Bei der Beschaffung gilt: Erreichen zwei kompatible Module dieselbe effektive Taktrate, wähle das günstigere."
  ]
 },
 {
  "concept": "bild-video-und-farbdatenmengen",
  "title": "Bild-, Video- und Farbdatenmengen",
  "figure": "startup",
  "lines": [
   "Merk dir: Pixelzahl = Breite in Zoll mal dpi mal Höhe in Zoll mal dpi. Ein Zoll entspricht 2,54 cm.",
   "Wichtig ist: Datenmenge in Bit = Pixelzahl mal Farbtiefe. Durch 8 ergibt das Byte, durch 1.024 KiB, nochmals durch 1.024 MiB.",
   "Bei n Bit Farbtiefe gibt es 2 hoch n Zustände. Bei drei Farbkanälen mit je n Bit ergibt sich (2 hoch n) hoch 3 Farben.",
   "Bei Zeilenkameras berechnest du die Aufnahmen aus Geschwindigkeit geteilt durch Abschnittslänge und rechnest dann auf Stunden hoch."
  ]
 },
 {
  "concept": "datentraeger-hdd-und-ssd",
  "title": "Datenträger: HDD und SSD",
  "figure": "kalle",
  "lines": [
   "Merk dir: Eine SSD hat keine beweglichen Teile. Sie ist daher unempfindlich gegen Erschütterungen und arbeitet lautlos.",
   "Wichtig ist: SSDs haben kürzere Zugriffszeiten und höhere Lese- und Schreibraten als magnetische Festplatten.",
   "Eine SSD nimmt weniger Leistung auf, wird weniger warm und verlängert im Notebook die Akkulaufzeit. Sie ist auch leichter.",
   "M.2-SSDs erreichen höhere Datenraten und brauchen wenig Platz. Sie sind aber meist teurer und belegen einen begrenzt verfügbaren M.2-Steckplatz."
  ]
 },
 {
  "concept": "datenuebertragungsrate-und-uebertragungsdauer",
  "title": "Datenübertragungsrate und Übertragungsdauer",
  "figure": "startup",
  "lines": [
   "Merk dir: Rate in bit/s = Pixel je Bild mal Bilder je Sekunde mal Bit je Pixel, bei Kompression mal dem verbleibenden Anteil.",
   "Wichtig ist: 1 Mbit = 1.000.000 bit bei Übertragungsraten. Bei Dateigrößen in MiB gilt dagegen 1 MiB = 1.024 x 1.024 Byte.",
   "Übertragungsdauer = Datenmenge in bit geteilt durch Rate in bit/s. Ein Byte hat 8 bit.",
   "Beim Versand vom eigenen Standort zum Rechenzentrum zählt die Uploadrate, nicht die Downloadrate."
  ]
 },
 {
  "concept": "dhcp",
  "title": "DHCP",
  "figure": "barista",
  "lines": [
   "Merk dir: DHCP vergibt Netzwerkkonfiguration automatisch, zum Beispiel IPv4-Adresse und Subnetzmaske.",
   "Wichtig ist: Die MAC-Adresse ist fest in der Hardware und wird nicht per DHCP vergeben. Die fe80-Adresse bildet das Gerät selbst.",
   "Findet ein Gerät keinen DHCP-Server, vergibt es sich selbst eine Adresse aus 169.254.0.0/16 (APIPA, link-local).",
   "Eine Adresse aus 169.254.0.0/16 passt nicht zum vorgesehenen Netz. Sie zeigt, dass die dynamische Adressvergabe nicht funktioniert hat."
  ]
 },
 {
  "concept": "elektrische-leistung-strom-und-energiebedarf",
  "title": "Elektrische Leistung, Strom und Energiebedarf",
  "figure": "verkaeufer",
  "lines": [
   "Merk dir: Elektrische Leistung P = U mal I. Also Spannung in Volt mal Stromstärke in Ampere ergibt Leistung in Watt.",
   "Wichtig ist: Stromstärke I = P / U. Bei gleicher Leistung braucht eine niedrigere Spannung einen höheren Strom.",
   "Bei mehreren Geräten an einer Steckdose addierst du alle Leistungen. Die Summe muss unter U mal I_max liegen.",
   "Rechne immer zuerst die Leistung aus, wenn du Netzteil und Alternativversorgung vergleichst, und führe die Einheiten mit."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-arbeitsspeicher-und-hardwarekompatibilitaet-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "arbeitsspeicher-und-hardwarekompatibilitaet",
  "title": "DDR4-Module im Kassenrechner",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Kassenrechner nutzt DDR4-Arbeitsspeicher mit 2666 MHz, ein Steckplatz ist frei. Zur Wahl stehen Modul A (8 GB DDR5-5200), Modul B (8 GB DDR4-3200) und Modul C (8 GB DDR4-2666). Welche Aussage zur Verwendbarkeit trifft zu?",
  "payload": {
   "options": [
    {
     "text": "A passt nicht (andere Generation); B ist kompatibel, läuft aber höchstens mit 2666 MHz; C ist kompatibel und läuft mit 2666 MHz.",
     "correct": true
    },
    {
     "text": "A läuft mit 2666 MHz, weil sich der Speichercontroller an das Modul anpasst; B läuft mit 3200 MHz; C läuft mit 2666 MHz.",
     "correct": false,
     "why": "DDR5 passt weder mechanisch noch elektrisch in einen DDR4-Steckplatz, und B wird vom Rechner ausgebremst."
    },
    {
     "text": "A und B sind beide nicht kompatibel, weil nur Module mit exakt gleicher Taktrate wie der Rechner (2666 MHz) verwendbar sind.",
     "correct": false,
     "why": "Gleiche Generation genügt. Ein schnelleres DDR4-Modul läuft mit der niedrigeren Taktrate des Systems."
    },
    {
     "text": "A ist kompatibel und läuft mit 2666 MHz; B läuft mit 3200 MHz; C ist kompatibel und läuft ebenfalls mit 2666 MHz.",
     "correct": false,
     "why": "Die DDR5-Bauform hat eine andere Kerbe und Elektrik, ein Betrieb im DDR4-Slot ist unmöglich."
    },
    {
     "text": "A ist nicht kompatibel; B läuft mit 3200 MHz, weil der Rechner den höheren Takt automatisch übernimmt; C läuft mit 2666 MHz.",
     "correct": false,
     "why": "Der Rechner bestimmt die maximale Taktrate. Das Modul kann nicht schneller laufen als das System erlaubt."
    }
   ],
   "multi": false,
   "explanation": "DDR5 (A) ist eine andere Generation und passt nicht in den DDR4-Steckplatz. B (DDR4-3200) ist kompatibel, wird aber auf die vom Rechner unterstützten 2666 MHz begrenzt. C (DDR4-2666) passt in Generation und Takt."
  }
 },
 {
  "id": "kmp-arbeitsspeicher-und-hardwarekompatibilitaet-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "arbeitsspeicher-und-hardwarekompatibilitaet",
  "title": "Dual-Channel richtig bestücken",
  "difficulty": 1,
  "points": 3,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Mainboard mit Dual-Channel-Unterstützung hat vier gleich aussehende Steckplätze (DIMM 1 bis DIMM 4), deren Kanalzuordnung nicht aufgedruckt ist. Zwei DDR4-Module sollen im Zweikanalbetrieb laufen. Welche Voraussetzungen müssen erfüllt sein?",
  "payload": {
   "options": [
    {
     "text": "Die Kanalzuordnung steht in der Dokumentation des Boards; die Module stecken in einem dort vorgesehenen kanalübergreifenden Steckplatzpaar und haben dieselbe Kapazität.",
     "correct": true
    },
    {
     "text": "Beide Module stecken in beliebigen Steckplätzen nebeneinander, etwa DIMM 1 und DIMM 2; benachbarte Slots gehören immer zu verschiedenen Kanälen.",
     "correct": false,
     "why": "Die Kanalzuordnung lässt sich nicht aus der Lage ableiten. Sie ist der Board-Dokumentation zu entnehmen."
    },
    {
     "text": "Beide Module müssen im selben Kanal stecken, damit sie sich abstimmen können; die Kapazität ist dabei unerheblich.",
     "correct": false,
     "why": "Zweikanalbetrieb heißt, dass die Module auf verschiedene Kanäle verteilt werden. Zudem sollen die Kapazitäten gleich sein."
    },
    {
     "text": "Es müssen alle vier Steckplätze belegt sein, mit zwei Modulen ist kein Dual-Channel-Betrieb möglich.",
     "correct": false,
     "why": "Zwei Module im passenden Steckplatzpaar genügen für zwei Kanäle."
    },
    {
     "text": "Die Module müssen unterschiedliche Kapazitäten besitzen, damit der Speichercontroller sie den beiden Kanälen zuordnen kann.",
     "correct": false,
     "why": "Für Dual-Channel sollten die Kapazitäten übereinstimmen, nicht verschieden sein."
    }
   ],
   "multi": false,
   "explanation": "Zuerst ist in der Dokumentation des konkreten Boards nachzusehen, welche Steckplätze zu welchem Kanal gehören. Die beiden Module gehören dann in ein kanalübergreifendes Paar und müssen dieselbe Kapazität haben."
  }
 },
 {
  "id": "kmp-arbeitsspeicher-und-hardwarekompatibilitaet-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "arbeitsspeicher-und-hardwarekompatibilitaet",
  "title": "Speichermodul für den Kassenrechner wählen",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "In einem Kassenrechner steckt ein 8-GB-Modul DDR4-2666. Zur Erweiterung stehen bereit: Option A (DDR5-4800, 28 Euro, nicht kompatibel), Option B (DDR4-3200, 44 Euro, im Mischbetrieb 2666 MHz) und Option C (DDR4-2666, 25 Euro, 2666 MHz). Welche Entscheidung ist sachlich richtig?",
  "payload": {
   "options": [
    {
     "text": "Option B, weil 3200 MHz im Datenblatt die höchste Taktrate ist und sich die Mehrkosten von 19 Euro durch mehr Leistung lohnen.",
     "correct": false,
     "why": "Im Mischbetrieb läuft B ebenfalls nur mit 2666 MHz, die Mehrkosten bringen keinen Vorteil."
    },
    {
     "text": "Option C, weil sie dieselben 2666 MHz erreicht wie B, aber 19 Euro weniger kostet; Option A scheidet wegen fehlender Kompatibilität aus.",
     "correct": true
    },
    {
     "text": "Option A, weil DDR5 die neueste Generation ist und die Zukunftssicherheit den geringen Preisunterschied rechtfertigt.",
     "correct": false,
     "why": "DDR5 ist im DDR4-Rechner nicht verwendbar; Kompatibilität ist das Ausschlusskriterium."
    },
    {
     "text": "Option B, weil ein teureres Modul grundsätzlich die höhere Qualität hat und somit länger hält.",
     "correct": false,
     "why": "Der Preis sagt nichts über die nutzbare Leistung aus. Bei gleichem effektivem Takt entscheidet der Preis."
    }
   ],
   "multi": false,
   "explanation": "Option A ist inkompatibel. B und C erreichen beide nur 2666 MHz, C kostet aber 44 - 25 = 19 Euro weniger. Also wird das günstigere, gleich schnelle Modul C gewählt."
  }
 },
 {
  "id": "kmp-arbeitsspeicher-und-hardwarekompatibilitaet-4",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "arbeitsspeicher-und-hardwarekompatibilitaet",
  "title": "Aufrüstung des DDR5-Notebooks",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Notebook hat 16 GB DDR5-4800 und einen freien Speicherplatz. Angeboten werden ein 16-GB-DDR5-5600-Modul für 68 EUR und ein 16-GB-DDR5-4800-Modul für 61 EUR. Beide sind kompatibel, effektiv laufen beide mit 4800 MHz. Was ist die beste Beschaffungsentscheidung?",
  "payload": {
   "options": [
    {
     "text": "Das DDR5-5600-Modul für 68 EUR, weil es mit 5600 MHz mehr Leistung bietet.",
     "correct": false,
     "why": "Das System begrenzt auf 4800 MHz, die 5600 MHz werden nicht genutzt."
    },
    {
     "text": "Das DDR5-4800-Modul für 61 EUR, weil beide Module effektiv 4800 MHz erreichen und dieses 7 EUR günstiger ist.",
     "correct": true
    },
    {
     "text": "Das DDR5-5600-Modul, weil das schnellere Modul den Takt des vorhandenen Moduls auf 5600 MHz anhebt.",
     "correct": false,
     "why": "Der Takt wird nie über das vom System unterstützte Maximum angehoben, sondern durch das langsamste Bauteil begrenzt."
    },
    {
     "text": "Keines der beiden, weil unterschiedliche Taktraten im selben Rechner grundsätzlich nicht funktionieren.",
     "correct": false,
     "why": "Kompatible Module mit unterschiedlicher Taktrate laufen gemeinsam, und zwar mit dem niedrigeren Takt."
    }
   ],
   "multi": false,
   "explanation": "Beide Module erreichen effektiv 4800 MHz. Damit bringt das teurere 5600er-Modul keinen Nutzen. Das 4800er-Modul kostet 68 - 61 = 7 EUR weniger und ist die wirtschaftliche Wahl."
  }
 },
 {
  "id": "kmp-bild-video-und-farbdatenmengen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "bild-video-und-farbdatenmengen",
  "title": "Speicherbedarf eines Kartenscans",
  "difficulty": 1,
  "points": 2,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Eine Kamera erfasst einen Kartenausschnitt von 25,40 cm x 20,32 cm mit 300 dpi und 24 Bit Farbtiefe. Es gilt 1 Zoll = 2,54 cm, 1 Byte = 8 Bit, 1 KiB = 1.024 Byte, 1 MiB = 1.024 KiB. Wie groß ist eine unkomprimierte Aufnahme?",
  "payload": {
   "options": [
    {
     "text": "164,79 MiB",
     "correct": false,
     "why": "Es wurde nicht durch 8 geteilt, die Bitmenge wurde direkt in MiB umgerechnet."
    },
    {
     "text": "21,60 MiB",
     "correct": false,
     "why": "Die 21.600.000 Byte wurden durch 1.000.000 geteilt statt zweimal durch 1.024."
    },
    {
     "text": "20,60 MiB",
     "correct": true
    },
    {
     "text": "21.093,75 MiB",
     "correct": false,
     "why": "Die Umrechnung von KiB in MiB (Teilung durch 1.024) fehlt, der Wert ist noch in KiB."
    },
    {
     "text": "2,57 MiB",
     "correct": false,
     "why": "Es wurde durch 8 und dann nochmals durch 8 geteilt."
    }
   ],
   "multi": false,
   "explanation": "Pixel: 3.000 x 2.400 = 7.200.000. Bit: 7.200.000 x 24 = 172.800.000. Byte: durch 8 = 21.600.000. KiB: durch 1.024 = 21.093,75. MiB: durch 1.024 = ca. 20,60 MiB."
  }
 },
 {
  "id": "kmp-bild-video-und-farbdatenmengen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "bild-video-und-farbdatenmengen",
  "title": "Aufnahmen einer Zeilenkamera",
  "difficulty": 1,
  "points": 2,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Eine Zeilenkamera überwacht eine Stoffbahn, die mit 18 m/min läuft. Jede Aufnahme erfasst 0,25 m in Laufrichtung. Die Maschine läuft 8 Stunden am Tag. Wie viele Aufnahmen entstehen pro Arbeitstag?",
  "payload": {
   "options": [
    {
     "text": "8.640 Aufnahmen",
     "correct": false,
     "why": "Es wurde 18 x 60 x 8 gerechnet, die Aufnahmelänge von 0,25 m blieb unberücksichtigt."
    },
    {
     "text": "34.560 Aufnahmen",
     "correct": true
    },
    {
     "text": "4.320 Aufnahmen",
     "correct": false,
     "why": "Das ist nur der Wert für eine Stunde; mit 8 Stunden ist zu multiplizieren."
    },
    {
     "text": "2.160 Aufnahmen",
     "correct": false,
     "why": "Es wurde mit 18 x 0,25 statt mit 18 / 0,25 gerechnet."
    },
    {
     "text": "576 Aufnahmen",
     "correct": false,
     "why": "Es wurde nur 72 x 8 gerechnet, die 60 Minuten pro Stunde fehlen."
    }
   ],
   "multi": false,
   "explanation": "18 m/min geteilt durch 0,25 m ergibt 72 Aufnahmen pro Minute. Mal 60 sind 4.320 pro Stunde, mal 8 Stunden ergeben 34.560 Aufnahmen pro Arbeitstag."
  }
 },
 {
  "id": "kmp-bild-video-und-farbdatenmengen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "bild-video-und-farbdatenmengen",
  "title": "Farben eines HDR-Panels",
  "difficulty": 1,
  "points": 2,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein HDR-Panel setzt jeden Bildpunkt aus drei Farbkanälen zusammen, jeder Kanal wird mit 12 Bit codiert. Wie viele verschiedene Farben lassen sich darstellen?",
  "payload": {
   "options": [
    {
     "text": "12.288 Farben",
     "correct": false,
     "why": "Die 4.096 Werte pro Kanal wurden mit 3 multipliziert statt mit sich selbst dreimal."
    },
    {
     "text": "16.777.216 Farben",
     "correct": false,
     "why": "Es wurden nur zwei Kanäle kombiniert (4.096 hoch 2) beziehungsweise mit 24 Bit gerechnet."
    },
    {
     "text": "1.728 Farben",
     "correct": false,
     "why": "Es wurde 12 hoch 3 statt 2 hoch 12 pro Kanal gerechnet."
    },
    {
     "text": "68.719.476.736 Farben",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Pro Kanal gibt es 2 hoch 12 = 4.096 Werte. Für drei Kanäle kombiniert man sie: 4.096 hoch 3 = 68.719.476.736 Farben (entspricht 2 hoch 36)."
  }
 },
 {
  "id": "kmp-datentraeger-hdd-und-ssd-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "datentraeger-hdd-und-ssd",
  "title": "SSD im Messfahrzeug",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Notebooks werden im Fahrzeug über unbefestigte Wege transportiert und arbeiten im Akkubetrieb. Statt einer magnetischen Festplatte soll eine SSD verbaut werden. Welche drei Eigenschaften der SSD sind in diesem Einsatz von Vorteil?",
  "payload": {
   "options": [
    {
     "text": "Höhere Kapazität pro Euro, bessere Langzeitarchivierung und größere Bauform.",
     "correct": false,
     "why": "Das sind keine Vorteile im Einsatzszenario; bei Preis pro GB liegt die HDD vorn."
    },
    {
     "text": "Unempfindlichkeit gegen Erschütterungen, geringere Leistungsaufnahme und kürzere Zugriffszeiten.",
     "correct": true
    },
    {
     "text": "Geringere Leistungsaufnahme, geräuschloser Betrieb und kürzere Zugriffszeiten.",
     "correct": true
    },
    {
     "text": "Bessere Eignung als Wechseldatenträger, robuste rotierende Scheiben und niedrigerer Preis.",
     "correct": false,
     "why": "Rotierende Scheiben sind der Schwachpunkt bei Erschütterungen, nicht ein Vorteil."
    },
    {
     "text": "Unempfindlichkeit gegen Erschütterungen, keine bewegten Teile und geringere Wärmeentwicklung.",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Richtig sind alle Kombinationen aus SSD-Eigenschaften wie Erschütterungsunempfindlichkeit (keine beweglichen Teile), geringere Leistungsaufnahme (längere Akkulaufzeit), kürzere Zugriffszeiten, Geräuschlosigkeit und geringere Wärmeentwicklung."
  }
 },
 {
  "id": "kmp-datentraeger-hdd-und-ssd-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "datentraeger-hdd-und-ssd",
  "title": "M.2-SSD gegenüber SATA-SSD",
  "difficulty": 1,
  "points": 2,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Für einen Schulungsrechner stehen eine SATA-SSD (2,5 Zoll) und eine M.2-SSD zur Wahl, das Mainboard unterstützt beide. Welche zwei Aussagen zur M.2-Ausführung im Vergleich zur SATA-Option treffen zu?",
  "payload": {
   "options": [
    {
     "text": "Sie belegt keinen Steckplatz auf dem Mainboard, weil sie direkt über das Netzteil versorgt wird.",
     "correct": false,
     "why": "M.2-SSDs stecken in einem M.2-Steckplatz des Mainboards."
    },
    {
     "text": "Sie erreicht mögliche höhere Datenübertragungsraten.",
     "correct": true
    },
    {
     "text": "Sie ist in der Regel teurer und belegt einen begrenzt verfügbaren M.2-Steckplatz.",
     "correct": true
    },
    {
     "text": "Sie besitzt bewegliche Teile und ist deshalb empfindlicher gegenüber Erschütterungen.",
     "correct": false,
     "why": "Auch die SATA-SSD hat keine beweglichen Teile. Bewegte Teile gibt es nur bei HDDs."
    },
    {
     "text": "Sie ist grundsätzlich langsamer, dafür aber wesentlich größer als die 2,5-Zoll-Ausführung.",
     "correct": false,
     "why": "M.2 ist eher kompakt und schneller, nicht größer."
    }
   ],
   "multi": true,
   "explanation": "M.2 kann höhere Datenraten bieten und braucht wenig Platz (günstig). Ungünstig sind meist der höhere Preis und der begrenzt verfügbare M.2-Steckplatz auf dem Mainboard."
  }
 },
 {
  "id": "kmp-datentraeger-hdd-und-ssd-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "datentraeger-hdd-und-ssd",
  "title": "SSD statt HDD bei Erschütterungen",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein mobiler Messwagen nutzt Notebooks mit HDD, die häufig Erschütterungen ausgesetzt sind und im Akkubetrieb laufen. Welche Begründung für den Wechsel auf SSDs gleicher Bauform und Kapazität ist fachlich zutreffend?",
  "payload": {
   "options": [
    {
     "text": "Die SSD hat keine beweglichen Teile und ist daher unempfindlicher gegen Erschütterungen.",
     "correct": true
    },
    {
     "text": "Die SSD benötigt einen anderen Steckverbinder, wodurch der Kontakt bei Erschütterungen stabiler bleibt.",
     "correct": false,
     "why": "Bauform und Anschluss bleiben laut Aufgabe gleich und sind kein SSD-Vorteil."
    },
    {
     "text": "Die SSD dreht sich schneller als die HDD und gleicht so Erschütterungen aus.",
     "correct": false,
     "why": "SSDs haben gar keine drehenden Scheiben."
    },
    {
     "text": "Die SSD ist schwerer als die HDD und liegt deshalb ruhiger im Gerät.",
     "correct": false,
     "why": "SSDs sind leichter, und Gewicht schützt nicht vor Erschütterung."
    }
   ],
   "multi": false,
   "explanation": "Die SSD speichert in Flash-Speicher ohne mechanische Teile. Schreib-Lese-Köpfe und rotierende Scheiben einer HDD sind dagegen erschütterungsempfindlich."
  }
 },
 {
  "id": "kmp-datenuebertragungsrate-und-uebertragungsdauer-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "datenuebertragungsrate-und-uebertragungsdauer",
  "title": "Datenrate einer Untersuchungskamera",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Eine Kamera liefert 2.560 x 1.440 Bildpunkte bei 25 Bildern pro Sekunde, jeder Bildpunkt hat 30 bit. Nach der Codierung verbleiben 18 % der Datenmenge; 1 Mbit = 1.000.000 bit. Welche Datenübertragungsrate wird mindestens benötigt (kaufmännisch auf volle Mbit/s gerundet)?",
  "payload": {
   "options": [
    {
     "text": "2.765 Mbit/s",
     "correct": false,
     "why": "Die Kompression auf 18 % wurde nicht berücksichtigt."
    },
    {
     "text": "62 Mbit/s",
     "correct": false,
     "why": "Das Ergebnis wurde zusätzlich durch 8 geteilt, obwohl bereits in bit gerechnet wird."
    },
    {
     "text": "50 Mbit/s",
     "correct": false,
     "why": "Der Kompressionsanteil wurde als 1,8 % statt 18 % angesetzt."
    },
    {
     "text": "498 Mbit/s",
     "correct": true
    },
    {
     "text": "2.267 Mbit/s",
     "correct": false,
     "why": "Es wurden 82 % (der eingesparte Anteil) statt der verbleibenden 18 % verwendet."
    }
   ],
   "multi": false,
   "explanation": "2.560 x 1.440 x 25 x 30 bit/s = 2.764,8 Mbit/s unkomprimiert. Mal 0,18 ergibt 497.664.000 bit/s = 497,664 Mbit/s. Aufgerundet auf volle Mbit/s: 498 Mbit/s."
  }
 },
 {
  "id": "kmp-datenuebertragungsrate-und-uebertragungsdauer-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "datenuebertragungsrate-und-uebertragungsdauer",
  "title": "Datenrate eines Mikroskops",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Ein digitales Mikroskop sendet 2.560 x 1.440 Bildpunkte bei 18 Bildern pro Sekunde mit 30 bit je Bildpunkt. Nach der Komprimierung verbleiben 22 % der Datenmenge, Protokolldaten bleiben unberücksichtigt, 1 Mbit = 1.000.000 bit. Welche Rate wird mindestens benötigt (eine Nachkommastelle)?",
  "payload": {
   "options": [
    {
     "text": "1.552,7 Mbit/s",
     "correct": false,
     "why": "Es wurden 78 % (der eingesparte Anteil) verwendet statt der verbleibenden 22 %."
    },
    {
     "text": "437,9 Mbit/s",
     "correct": true
    },
    {
     "text": "54,7 Mbit/s",
     "correct": false,
     "why": "Das Ergebnis wurde zusätzlich durch 8 geteilt."
    },
    {
     "text": "1.990,7 Mbit/s",
     "correct": false,
     "why": "Die Komprimierung auf 22 % wurde nicht berücksichtigt."
    }
   ],
   "multi": false,
   "explanation": "2.560 x 1.440 x 18 x 30 = 1.990.656.000 bit/s. Verbleibende 22 %: 437.944.320 bit/s = 437,9 Mbit/s."
  }
 },
 {
  "id": "kmp-datenuebertragungsrate-und-uebertragungsdauer-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "datenuebertragungsrate-und-uebertragungsdauer",
  "title": "Upload einer Protokolldatei",
  "difficulty": 2,
  "points": 4,
  "figure": "startup",
  "source": "AP2",
  "prompt": "Eine 640 MiB große Datei soll vom Messfahrzeug zum Rechenzentrum übertragen werden (Download 80 Mbit/s, Upload 12,5 Mbit/s). Es gilt 1 MiB = 1.024 x 1.024 Byte, 1 Byte = 8 bit, 1 Mbit/s = 1.000.000 bit/s. Wie lange dauert die Übertragung (aufgerundet)?",
  "payload": {
   "options": [
    {
     "text": "68 s, mit der Downloadrate von 80 Mbit/s gerechnet",
     "correct": false,
     "why": "Zum Rechenzentrum wird gesendet, also gilt die Uploadrate."
    },
    {
     "text": "54 s, weil das Umrechnen von Byte in bit vergessen wurde",
     "correct": false,
     "why": "Bei 640 MiB = 5.368.709.120 bit ist mit 8 bit je Byte zu rechnen."
    },
    {
     "text": "410 s, weil 1 MiB mit 1.000.000 Byte statt 1.048.576 Byte gerechnet wurde",
     "correct": false,
     "why": "Die Vorgabe 1 MiB = 1.024 x 1.024 Byte muss beachtet werden."
    },
    {
     "text": "430 s, also 7 Minuten 10 Sekunden, mit der Uploadrate gerechnet",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "640 MiB = 640 x 1.048.576 x 8 = 5.368.709.120 bit. Bei 12.500.000 bit/s ergeben sich 429,4967 s, aufgerundet 430 s = 7 min 10 s."
  }
 },
 {
  "id": "kmp-dhcp-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "dhcp",
  "title": "Was DHCP dem Erfassungsgerät liefert",
  "difficulty": 1,
  "points": 2,
  "figure": "barista",
  "source": "AP2",
  "prompt": "Ein mobiles Gerät ist mit automatischer Zuweisung im Lager-WLAN. Sein Systemauszug zeigt: Gerätename MDE-17, MAC 7C-2A-91-4D-6E-30, IPv6-Adresse fe80::9d2:44ff:fe71:8a10, IPv4-Adresse 10.46.12.87, Subnetzmaske 255.255.252.0, Akkustand 78 %. Welche zwei Angaben wurden automatisch für die IPv4-Konfiguration bereitgestellt?",
  "payload": {
   "options": [
    {
     "text": "Die MAC-Adresse 7C-2A-91-4D-6E-30",
     "correct": false,
     "why": "Die MAC-Adresse ist fest in der Hardware hinterlegt und wird nicht zugewiesen."
    },
    {
     "text": "Die IPv4-Adresse 10.46.12.87",
     "correct": true
    },
    {
     "text": "Die IPv6-Adresse fe80::9d2:44ff:fe71:8a10",
     "correct": false,
     "why": "Adressen mit fe80 sind link-local und werden vom Gerät selbst gebildet."
    },
    {
     "text": "Die Subnetzmaske 255.255.252.0",
     "correct": true
    },
    {
     "text": "Der Gerätename MDE-17",
     "correct": false,
     "why": "Der Gerätename gehört nicht zur IPv4-Netzkonfiguration."
    }
   ],
   "multi": true,
   "explanation": "Bei automatischer Zuweisung erhält das Gerät IPv4-Adresse (10.46.12.87) und Subnetzmaske (255.255.252.0). MAC-Adresse, Gerätename und die selbst gebildete fe80-Adresse gehören nicht dazu."
  }
 },
 {
  "id": "kmp-dhcp-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "dhcp",
  "title": "Warum 169.254.73.18 am Laptop?",
  "difficulty": 1,
  "points": 2,
  "figure": "barista",
  "source": "AP2",
  "prompt": "In einer Werkstatt ist das Netz 10.44.8.0/24 vorgesehen. Ein angeschlossener Laptop zeigt jedoch die Adresse 169.254.73.18. Wie ist diese Adresse zustande gekommen?",
  "payload": {
   "options": [
    {
     "text": "Der Router hat die Adresse per NAT aus 10.44.8.0/24 in einen anderen Bereich übersetzt.",
     "correct": false,
     "why": "NAT ändert Adressen beim Routing, es erzeugt keine Adresse am Laptop."
    },
    {
     "text": "Der Laptop war auf dynamischen Bezug eingestellt, fand keinen DHCP-Dienst und vergab sich selbst eine Adresse aus 169.254.0.0/16.",
     "correct": true
    },
    {
     "text": "Der DHCP-Server hat absichtlich eine Adresse außerhalb des Netzes vergeben, um den Laptop zu isolieren.",
     "correct": false,
     "why": "Ein erreichbarer DHCP-Server hätte eine Adresse aus dem konfigurierten Netz vergeben."
    },
    {
     "text": "Der Laptop besitzt eine fest eingetragene statische Adresse, die aus dem Bereich 169.254.0.0/16 stammt.",
     "correct": false,
     "why": "Eine 169.254-Adresse entsteht automatisch, wenn keine Zuweisung erfolgt, und wird nicht manuell eingetragen."
    }
   ],
   "multi": false,
   "explanation": "Der Laptop war für dynamischen Adressbezug eingerichtet. Ohne erreichbaren DHCP-Dienst erhielt er keine Adresse und erzeugte lokal eine aus 169.254.0.0/16."
  }
 },
 {
  "id": "kmp-dhcp-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Netzwerke",
  "concept": "dhcp",
  "title": "Kassenterminal mit 169.254.14.207",
  "difficulty": 1,
  "points": 2,
  "figure": "barista",
  "source": "AP2",
  "prompt": "Ein Kassenterminal wird an das Netz 192.168.61.0/24 angeschlossen und besitzt danach die Adresse 169.254.14.207. Welche Aussage begründet das zutreffend?",
  "payload": {
   "options": [
    {
     "text": "Das Terminal hat die Adresse von einem zweiten Router aus dem Bereich 169.254.0.0/16 zugewiesen bekommen.",
     "correct": false,
     "why": "Diese Adresse ist keine Zuweisung, das Gerät wählt sie selbst."
    },
    {
     "text": "Die MAC-Adresse des Terminals wurde in eine IPv4-Adresse umgerechnet.",
     "correct": false,
     "why": "MAC- und IPv4-Adressen sind unabhängig voneinander."
    },
    {
     "text": "Das Terminal war auf dynamischen Bezug gestellt, fand keinen erreichbaren DHCP-Dienst und wählte lokal eine Adresse aus 169.254.0.0/16.",
     "correct": true
    },
    {
     "text": "Der DHCP-Server hat das Terminal wegen abgelaufener Lizenz auf einen Notbereich gesetzt.",
     "correct": false,
     "why": "DHCP kennt keine Lizenzen. Die Adresse kommt ohne Server zustande."
    }
   ],
   "multi": false,
   "explanation": "Ohne erreichbaren DHCP-Dienst erhält das Terminal keine Adresse aus 192.168.61.0/24. Es wählt sich dann selbst eine Adresse aus dem link-local-Bereich 169.254.0.0/16."
  }
 },
 {
  "id": "kmp-elektrische-leistung-strom-und-energiebedarf-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "elektrische-leistung-strom-und-energiebedarf",
  "title": "Handscanner am USB-Anschluss",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Handscanner-Netzteil trägt die Angaben 20 V und 0,75 A. Über USB mit 5 V soll dieselbe Leistung geliefert werden. Welche Stromstärke müsste der USB-Anschluss bereitstellen (P = U x I)?",
  "payload": {
   "options": [
    {
     "text": "4 A",
     "correct": false,
     "why": "Es wurde 20 V / 5 V gerechnet, also nur das Spannungsverhältnis ohne Strom."
    },
    {
     "text": "0,1875 A",
     "correct": false,
     "why": "Der Strom wurde mit 5 / 20 multipliziert statt mit 20 / 5."
    },
    {
     "text": "3 A",
     "correct": true
    },
    {
     "text": "0,75 A",
     "correct": false,
     "why": "Der Strom des Netzteils wurde übernommen, obwohl die Spannung sinkt."
    },
    {
     "text": "75 A",
     "correct": false,
     "why": "Es wurde 5 V x 15 W gerechnet statt 15 W / 5 V."
    }
   ],
   "multi": false,
   "explanation": "Leistung des Netzteils: 20 V x 0,75 A = 15 W. Strom bei 5 V: I = P / U = 15 W / 5 V = 3 A."
  }
 },
 {
  "id": "kmp-elektrische-leistung-strom-und-energiebedarf-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "elektrische-leistung-strom-und-energiebedarf",
  "title": "Mehrfachsteckdose im Schulungsraum",
  "difficulty": 2,
  "points": 4,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "An einer 230-V-Mehrfachsteckdose (max. 12 A) hängen zwei Rechner mit je 420 W, ein Projektor mit 680 W, ein Drucker mit 950 W und eine Leuchte mit 120 W. Ist der gleichzeitige Betrieb zulässig?",
  "payload": {
   "options": [
    {
     "text": "Nicht zulässig, weil die Summe 3.010 W beträgt und über 2.760 W liegt.",
     "correct": false,
     "why": "Ein Rechner wurde dreimal gezählt; die richtige Summe ist 2.590 W."
    },
    {
     "text": "Zulässig, denn die Summe beträgt nur 2.170 W (zweiter Rechner vergessen).",
     "correct": false,
     "why": "Es kommen zwei Rechner vor, die Summe ist 2.590 W. Das Urteil stimmt zufällig, die Rechnung nicht."
    },
    {
     "text": "Zulässig, weil 2.590 W Gesamtleistung unter den maximal zulässigen 2.760 W (230 V x 12 A) liegen.",
     "correct": true
    },
    {
     "text": "Nicht zulässig, denn 12 A geteilt durch 230 V ergibt nur 0,05 W zulässige Leistung.",
     "correct": false,
     "why": "Die Formel lautet P = U x I, also 230 V x 12 A und nicht 12 A / 230 V."
    }
   ],
   "multi": false,
   "explanation": "Gesamtleistung: 2 x 420 + 680 + 950 + 120 = 2.590 W. Zulässig sind 230 V x 12 A = 2.760 W. Da 2.590 W kleiner sind, ist der Betrieb zulässig."
  }
 },
 {
  "id": "kmp-elektrische-leistung-strom-und-energiebedarf-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Hardware",
  "concept": "elektrische-leistung-strom-und-energiebedarf",
  "title": "Kundendisplay: Leistung und Strom",
  "difficulty": 1,
  "points": 2,
  "figure": "verkaeufer",
  "source": "AP2",
  "prompt": "Ein Kundendisplay hat ein Netzteil mit 12 V und 0,75 A. Alternativ soll es mit 5 V versorgt werden. Welche Leistung nimmt es auf, und welcher Strom müsste bei 5 V bereitstehen?",
  "payload": {
   "options": [
    {
     "text": "9 W und 2,4 A",
     "correct": false,
     "why": "Der Strom wurde nur aus dem Verhältnis 12 / 5 gebildet, ohne die Leistung zu beachten."
    },
    {
     "text": "3,75 W und 0,75 A",
     "correct": false,
     "why": "Es wurde 5 V x 0,75 A gerechnet; das ist nicht die Leistung des 12-V-Netzteils."
    },
    {
     "text": "9 W und 0,31 A",
     "correct": false,
     "why": "Es wurde 0,75 A x 5 / 12 gerechnet, das Spannungsverhältnis wurde falsch herum angesetzt."
    },
    {
     "text": "9 W und 1,8 A",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "P = 12 V x 0,75 A = 9 W. Bei 5 V gilt I = P / U = 9 W / 5 V = 1,8 A."
  }
 }
]);

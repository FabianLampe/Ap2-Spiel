window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.lektionen = (GAME_DATA.lektionen || []).concat([
 {
  "concept": "digitale-zahlungsinformationen-und-girocode",
  "title": "GiroCode und digitale Zahlungsinformationen",
  "figure": "bank",
  "lines": [
   "Merk dir: Der GiroCode ist ein QR-Code, der die Daten einer SEPA-Überweisung enthält, zum Beispiel Empfänger, IBAN, Betrag und Verwendungszweck.",
   "Wer den Code mit der Banking-App scannt, muss keine Überweisungsdaten mehr von Hand abtippen.",
   "Das vermeidet Tippfehler bei IBAN und Betrag und spart dem Zahler Zeit.",
   "Der Zahlungsempfänger profitiert von eindeutigem Verwendungszweck, korrektem Betrag und weniger Rückfragen bei der Zuordnung des Zahlungseingangs."
  ]
 },
 {
  "concept": "digitale-zertifikate",
  "title": "Digitale Zertifikate",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Ein digitales Zertifikat verknüpft einen öffentlichen Schlüssel mit einer Identität; eine Zertifizierungsstelle bestätigt das per Signatur.",
   "Mit einem persönlichen Zertifikat weist sich ein Benutzer gegenüber einem Server aus (Authentifizierung).",
   "Der Server prüft das Zertifikat, zum Beispiel Gültigkeit und die Signatur der ausstellenden Stelle, und entscheidet über den Zugang.",
   "Verschlüsselung der Verbindung ist ein anderer Zweck; ein Zertifikat zur Anmeldung dient dem Identitätsnachweis."
  ]
 },
 {
  "concept": "informationssicherheit-bedrohungen-und-schutzmassnahmen",
  "title": "Bedrohungen und Schutzmaßnahmen",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Ein einzelner Server ist ein Single Point of Failure; fällt er aus, stehen alle darauf laufenden Dienste still.",
   "Redundanz, etwa ein zweiter Server im Cluster, verringert dieses Risiko.",
   "Unterschiedlich schnelle Anbindungen der Außenstellen können bei vielen gleichzeitigen Zugriffen zu Engpässen führen.",
   "Ein gemeinsames Administratorkonto verhindert die Nachvollziehbarkeit: Man erkennt nicht, wer eine Änderung vorgenommen hat.",
   "Dienste und Nutzergruppen sollten getrennt (segmentiert) sein, damit sich Störungen nicht im ganzen Netz ausbreiten."
  ]
 },
 {
  "concept": "malware-und-schutzmassnahmen",
  "title": "Malware und Schutzmaßnahmen",
  "figure": "kalle",
  "lines": [
   "Merk dir: Ein Virenscanner allein reicht nicht; Malware-Schutz braucht mehrere Schichten.",
   "Betriebssystem und Anwendungen zeitnah aktualisieren, damit bekannte Sicherheitslücken geschlossen sind.",
   "Im Alltag mit einem Konto ohne Administratorrechte arbeiten und Programme nur durch autorisierte Personen installieren lassen.",
   "Application-Whitelisting erlaubt nur freigegebene Programme; eine Firewall blockiert unerwünschte Verbindungen.",
   "Beschäftigte schulen: verdächtige Nachrichten und Dateien erkennen und melden."
  ]
 },
 {
  "concept": "passwortrichtlinien-und-standardpasswoerter",
  "title": "Passwortrichtlinien und Standardpasswörter",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Ein langes Kennwort erschwert automatisiertes Erraten (Brute Force).",
   "Kennwörter dürfen nicht aus Wörterbuchbegriffen, Gerätenamen oder Benutzerdaten bestehen; mehrere Zeichenarten vergrößern den Suchraum.",
   "Für jeden Dienst ein eigenes Kennwort verwenden; bei Verdacht auf Kompromittierung sofort wechseln.",
   "Werkskennwörter sind oft für alle Geräte gleich und öffentlich bekannt und müssen bei Inbetriebnahme geändert werden.",
   "Ist noch kein Kennwort gesetzt, muss vor der ersten Nutzung ein eigenes Kennwort eingerichtet werden."
  ]
 },
 {
  "concept": "phishing-schutzmassnahmen",
  "title": "Phishing-Schutzmaßnahmen",
  "figure": "datenschutz",
  "lines": [
   "Merk dir: Hinweise auf Phishing sind abweichende oder gefälschte Absenderadressen, sprachliche Fehler und künstlicher Zeitdruck.",
   "Technisch helfen Spam- und Phishingfilter am Mailgateway.",
   "Organisatorisch helfen regelmäßige Schulungen, damit Beschäftigte Täuschungsversuche erkennen.",
   "Bei einer verdächtigen Nachricht keine Links oder Anhänge öffnen und den Fall der IT melden."
  ]
 }
]);
GAME_DATA.kompassTasks = (GAME_DATA.kompassTasks || []).concat([
 {
  "id": "kmp-digitale-zahlungsinformationen-und-girocode-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Digitalisierung",
  "concept": "digitale-zahlungsinformationen-und-girocode",
  "title": "Inhalt eines GiroCodes",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Solartechnik-Betrieb druckt auf Ausgangsrechnungen künftig einen GiroCode. Welche zwei Angaben können darin codiert sein?",
  "payload": {
   "options": [
    {
     "text": "Steuernummer des Betriebs samt Umsatzsteuer-Identifikationsnummer",
     "correct": false,
     "why": "Steuerdaten gehören nicht in den Zahlungsdatensatz einer SEPA-Überweisung."
    },
    {
     "text": "IBAN des Zahlungsempfängers",
     "correct": true
    },
    {
     "text": "Kontostand des Kunden zum Zeitpunkt des Rechnungsdrucks",
     "correct": false,
     "why": "Der Kontostand des Kunden ist dem Betrieb unbekannt und nicht enthalten."
    },
    {
     "text": "Liste aller berechneten Artikel mit Einzelpreisen und Mengen",
     "correct": false,
     "why": "Artikeldaten sind kein Bestandteil des Zahlungsdatensatzes."
    },
    {
     "text": "Rechnungsbetrag in Euro",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Der GiroCode enthält die Daten einer SEPA-Überweisung: Empfängername, IBAN, ggf. BIC, Betrag, Währung und Verwendungszweck. Steuer- oder Artikeldaten gehören nicht dazu."
  }
 },
 {
  "id": "kmp-digitale-zahlungsinformationen-und-girocode-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Digitalisierung",
  "concept": "digitale-zahlungsinformationen-und-girocode",
  "title": "Erleichterungen für Zahler",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Ein Sportverein ergänzt seine Beitragsrechnungen um einen GiroCode. Welche zwei Erleichterungen haben die Mitglieder beim Bezahlen?",
  "payload": {
   "options": [
    {
     "text": "Die Überweisungsdaten müssen nicht von Hand eingetippt werden.",
     "correct": true
    },
    {
     "text": "IBAN, Betrag und Verwendungszweck werden ohne Tippfehler übernommen.",
     "correct": true
    },
    {
     "text": "Die Bank erhebt für per GiroCode ausgelöste Überweisungen grundsätzlich keinerlei Gebühren mehr.",
     "correct": false,
     "why": "Erfundener Vorteil; Gebühren regelt die Bank unabhängig vom Code."
    },
    {
     "text": "Der Verein erhält den Betrag am selben Tag garantiert vor der Belastung des Mitgliedskontos.",
     "correct": false,
     "why": "Keine Garantie durch den Code; Ausführungszeiten regelt die Bank."
    },
    {
     "text": "Die Zahlung wird nach dem Scannen ohne Freigabe automatisch ausgelöst und vom Konto abgebucht.",
     "correct": false,
     "why": "Die Zahlung muss in der Banking-App weiterhin bestätigt werden."
    }
   ],
   "multi": true,
   "explanation": "Der Code liefert die Zahlungsdaten direkt in die Banking-App. Das erspart das Abtippen langer IBAN und verhindert Übertragungsfehler."
  }
 },
 {
  "id": "kmp-digitale-zahlungsinformationen-und-girocode-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "Digitalisierung",
  "concept": "digitale-zahlungsinformationen-und-girocode",
  "title": "Vorteile für den Empfänger",
  "difficulty": 1,
  "points": 2,
  "figure": "bank",
  "source": "AP2",
  "prompt": "Eine Stadtbibliothek verschickt Mahngebührenbescheide mit GiroCode. Welche zwei Vorteile hat sie als Zahlungsempfängerin?",
  "payload": {
   "options": [
    {
     "text": "Es gibt weniger Rückfragen und Nacharbeit durch falsch eingegebene Überweisungsdaten.",
     "correct": true
    },
    {
     "text": "Die Bibliothek erhält Zugriff auf die Kontodaten und den Kontostand jedes Zahlers durch den Scan.",
     "correct": false,
     "why": "Der Scan gibt dem Empfänger keinen Einblick in das Konto des Zahlers."
    },
    {
     "text": "Jede Mahnung gilt bereits mit dem Aufdruck des Codes als bezahlt und wird automatisch ausgebucht.",
     "correct": false,
     "why": "Bezahlt ist erst, wenn das Geld eingeht."
    },
    {
     "text": "Der eindeutige Verwendungszweck erleichtert die Zuordnung des Zahlungseingangs.",
     "correct": true
    },
    {
     "text": "Die Bibliothek darf die Mahngebühren nachträglich erhöhen, sobald ein Kunde den Code eingescannt hat.",
     "correct": false,
     "why": "Der Code ändert nichts an der Höhe der Forderung."
    }
   ],
   "multi": true,
   "explanation": "Feste Vorgaben für Betrag und Verwendungszweck vermeiden Fehler, erleichtern die Zuordnung der Zahlung und verringern manuellen Klärungsaufwand."
  }
 },
 {
  "id": "kmp-digitale-zertifikate-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "digitale-zertifikate",
  "title": "Richtung der Authentifizierung",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Eine Servicetechnikerin erhält ein ihr zugeordnetes digitales Zertifikat für den Zugriff auf den internen Dokumentationsserver ihres Betriebs. Wie ist die Identitätsfeststellung gerichtet?",
  "payload": {
   "options": [
    {
     "text": "Der Server weist sich mit dem Zertifikat gegenüber der Technikerin aus, und diese prüft dabei die Identität des Servers.",
     "correct": false,
     "why": "Richtung vertauscht; das persönliche Zertifikat weist die Technikerin aus."
    },
    {
     "text": "Das Zertifikat dient ausschließlich dazu, die Daten zwischen Technikerin und Server auf der Leitung zu verschlüsseln.",
     "correct": false,
     "why": "Verschlüsselung allein ist kein Identitätsnachweis."
    },
    {
     "text": "Die Technikerin weist sich mit dem Zertifikat gegenüber dem Server aus, und der Server prüft ihre Identität.",
     "correct": true
    },
    {
     "text": "Das Zertifikat ersetzt die Prüfung durch den Server, weil jede Person mit einem Zertifikat automatisch Zugriff erhält.",
     "correct": false,
     "why": "Der Server prüft und entscheidet weiterhin über den Zugang."
    }
   ],
   "multi": false,
   "explanation": "Ein einer Person zugeordnetes Zertifikat authentifiziert diese gegenüber dem Server: Die Person ist die auszuweisende Seite, der Server die prüfende Gegenstelle."
  }
 },
 {
  "id": "kmp-digitale-zertifikate-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "digitale-zertifikate",
  "title": "Inhalt eines Zertifikats",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Was wird durch ein digitales Zertifikat bestätigt?",
  "payload": {
   "options": [
    {
     "text": "Das Passwort des Inhabers ist im Zertifikat hinterlegt, sodass Server es beim Login automatisch abgleichen können.",
     "correct": false,
     "why": "Zertifikate enthalten keine Passwörter."
    },
    {
     "text": "Der private Schlüssel des Inhabers ist im Zertifikat enthalten, damit jeder damit Nachrichten für ihn entschlüsseln kann.",
     "correct": false,
     "why": "Der private Schlüssel bleibt geheim und gehört nie ins Zertifikat."
    },
    {
     "text": "Ein öffentlicher Schlüssel gehört zu einer bestimmten Person oder Organisation; die Zertifizierungsstelle beglaubigt dies per Signatur.",
     "correct": true
    },
    {
     "text": "Alle Rechte des Inhabers im Unternehmen sind fest im Zertifikat gespeichert und gelten dauerhaft unverändert.",
     "correct": false,
     "why": "Zertifikate bestätigen Identität, keine Berechtigungen; sie laufen ab."
    }
   ],
   "multi": false,
   "explanation": "Das Zertifikat bindet den öffentlichen Schlüssel an eine Identität und ist von einer vertrauenswürdigen Stelle signiert. Der private Schlüssel bleibt beim Inhaber."
  }
 },
 {
  "id": "kmp-informationssicherheit-bedrohungen-und-schutzmassnahmen-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "informationssicherheit-bedrohungen-und-schutzmassnahmen",
  "title": "Schwachstellen erkennen",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Baubetrieb betreibt alle Anwendungen auf einem einzelnen Server. Außenstellen greifen über unterschiedlich schnelle Anschlüsse zu; zu Schichtbeginn dauert das Laden lange, und bei Wartung am Server fällt alles aus. Welche zwei Schwachstellen liegen vor?",
  "payload": {
   "options": [
    {
     "text": "Die zu geringe Zahl an Bildschirmen in den Außenstellen verhindert, dass alle Beschäftigten gleichzeitig arbeiten können.",
     "correct": false,
     "why": "Hat keinen Bezug zur Ausgangslage."
    },
    {
     "text": "Der einzelne Server ist ein zentraler Ausfallpunkt: Defekt oder Wartung legt alle Dienste gleichzeitig still.",
     "correct": true
    },
    {
     "text": "Die Nutzung von Mobilgeräten ist grundsätzlich unzulässig, weil sie Datenverkehr verursachen und daher verboten werden sollten.",
     "correct": false,
     "why": "Mobilgeräte sind nicht per se unzulässig; Ursache sind Kapazität und Architektur."
    },
    {
     "text": "Unterschiedlich leistungsfähige Anbindungen erzeugen bei gleichzeitigen Zugriffen Engpässe.",
     "correct": true
    },
    {
     "text": "Der Server läuft im Verwaltungsgebäude statt in einer Außenstelle, weshalb Zugriffe zwingend zu langsam sein müssen.",
     "correct": false,
     "why": "Der Standort an sich erklärt weder Ausfälle noch die Engpässe."
    }
   ],
   "multi": true,
   "explanation": "Ein einzelner Server ohne Redundanz ist ein Single Point of Failure. Ungleich schnelle Anbindungen erklären die Ladezeiten bei gleichzeitigem Zugriff zu Schichtbeginn."
  }
 },
 {
  "id": "kmp-informationssicherheit-bedrohungen-und-schutzmassnahmen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "informationssicherheit-bedrohungen-und-schutzmassnahmen",
  "title": "Gemeinsames Konto",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Fuhrpark betreibt Anwendung, Dateiaustausch und Druckdienst im selben Netzwerksegment; für die Administration nutzen alle ein gemeinsames Konto. Nach Änderungen ist unklar, wer sie durchgeführt hat. Welche zwei Schwachstellen bestehen?",
  "payload": {
   "options": [
    {
     "text": "Der externe Wartungsdienst benötigt keinen Zugriff auf Fahrzeugdaten, weshalb jede Einsicht in den Auftragsstatus abzuschalten ist.",
     "correct": false,
     "why": "Zugriff ist fachlich vorgesehen; Problem sind Konto und Segmentierung."
    },
    {
     "text": "Das Gemeinschaftskonto verhindert, dass Änderungen einer Person zugeordnet werden können.",
     "correct": true
    },
    {
     "text": "Das Netzwerksegment ist zu klein, weshalb zusätzliche Dienste zwingend auf einen weiteren Standort ausgelagert werden müssen.",
     "correct": false,
     "why": "Kleine Segmente sind nicht das Problem; fehlende Trennung ist es."
    },
    {
     "text": "Der Druckdienst ist grundsätzlich unsicher und muss durch eine Cloud-Lösung ersetzt werden, sobald Änderungen protokolliert werden.",
     "correct": false,
     "why": "Erfundene Pauschalforderung ohne Bezug zur Ausgangslage."
    },
    {
     "text": "Fehlende Trennung der Dienste lässt Störungen oder Angriffe auf das ganze Segment übergreifen.",
     "correct": true
    }
   ],
   "multi": true,
   "explanation": "Ein geteiltes Admin-Konto macht Handlungen nicht nachvollziehbar. Ohne Segmentierung breiten sich Störungen oder Kompromittierungen leichter aus."
  }
 },
 {
  "id": "kmp-informationssicherheit-bedrohungen-und-schutzmassnahmen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "informationssicherheit-bedrohungen-und-schutzmassnahmen",
  "title": "Ausfallpunkt beseitigen",
  "difficulty": 1,
  "points": 2,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Baubetrieb hat einen einzelnen Server als Ausfallpunkt für Auftragsverwaltung und Zeiterfassung. Welche Maßnahme senkt dieses Risiko am besten?",
  "payload": {
   "options": [
    {
     "text": "Den Server redundant auslegen, zum Beispiel als Cluster mit zweitem Server, der bei Ausfall übernimmt.",
     "correct": true
    },
    {
     "text": "Den vorhandenen Server mit einem längeren Kennwort und häufigeren Passwortwechseln absichern, damit er seltener ausfällt.",
     "correct": false,
     "why": "Kennwörter schützen vor Zugriff, nicht vor Hardwareausfall."
    },
    {
     "text": "Den Zugriff der Außenstellen nur noch zu Schichtbeginn zu erlauben, damit der Server nachts ausgelastet wird.",
     "correct": false,
     "why": "Verschiebt Last, beseitigt aber den Ausfallpunkt nicht."
    },
    {
     "text": "Die Bildschirmhelligkeit an den Arbeitsplätzen zu reduzieren, damit weniger Strom im Verwaltungsgebäude verbraucht wird.",
     "correct": false,
     "why": "Ohne Bezug zur Ausfallsicherheit."
    }
   ],
   "multi": false,
   "explanation": "Redundanz, etwa ein Cluster oder Ausweichserver, beseitigt den Single Point of Failure, weil bei Ausfall ein zweites System die Dienste weiterführt."
  }
 },
 {
  "id": "kmp-malware-und-schutzmassnahmen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "malware-und-schutzmassnahmen",
  "title": "Weitere Schutzmaßnahmen am Kassenrechner",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Ein Kulturzentrum nutzt einen Kassencomputer für Zahlungsdaten. Antivirensoftware läuft. Welche zwei weiteren Vorkehrungen sind geeignet?",
  "payload": {
   "options": [
    {
     "text": "Die Firewall dauerhaft abschalten, damit Zahlungsdaten schneller übertragen werden und keine Verbindungen blockiert werden.",
     "correct": false,
     "why": "Ohne Firewall sind unerwünschte Verbindungen offen."
    },
    {
     "text": "Den Rechner durch eine Firewall vor unerwünschten Netzwerkverbindungen schützen.",
     "correct": true
    },
    {
     "text": "Beschäftigte zu verdächtigen Nachrichten und sicherem Umgang mit Dateien schulen.",
     "correct": true
    },
    {
     "text": "Aktualisierungen des Betriebssystems verbieten, damit sich die Bedienung der Kasse nie verändert.",
     "correct": false,
     "why": "Updates schließen Sicherheitslücken."
    },
    {
     "text": "Softwareinstallationen von jeder beschäftigten Person nach Bedarf zulassen, damit die Kasse flexibel bleibt.",
     "correct": false,
     "why": "Unkontrollierte Installationen erhöhen das Malware-Risiko."
    }
   ],
   "multi": true,
   "explanation": "Schulungen, eine Firewall und Installationen nur durch autorisierte IT-Beschäftigte ergänzen den Virenscanner sinnvoll."
  }
 },
 {
  "id": "kmp-malware-und-schutzmassnahmen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "malware-und-schutzmassnahmen",
  "title": "Warum Adminrechte einschränken",
  "difficulty": 1,
  "points": 3,
  "figure": "kalle",
  "source": "AP2",
  "prompt": "Warum ist es gegen Malware sinnvoll, ein Tablet im Alltag mit einem Konto ohne administrative Rechte zu nutzen?",
  "payload": {
   "options": [
    {
     "text": "Ohne Adminrechte lassen sich Dateien nicht mehr öffnen, daher kann Malware sie auch nicht erreichen.",
     "correct": false,
     "why": "Normale Dateien bleiben nutzbar."
    },
    {
     "text": "Adminrechte machen den Rechner automatisch immun gegen Schadsoftware, deshalb sind sie nur für Chefs vorgesehen.",
     "correct": false,
     "why": "Adminrechte erhöhen den möglichen Schaden."
    },
    {
     "text": "Schadsoftware läuft mit den Rechten des Kontos und kann ohne Adminrechte weniger am System verändern.",
     "correct": true
    },
    {
     "text": "Konten ohne Adminrechte werden vom Virenscanner nicht mehr geprüft, weshalb dieser Ressourcen spart.",
     "correct": false,
     "why": "Der Scanner prüft unabhängig vom Konto."
    }
   ],
   "multi": false,
   "explanation": "Prinzip der minimalen Rechte: Malware erbt die Rechte des angemeldeten Kontos; ohne Adminrechte ist ihr Schaden begrenzt."
  }
 },
 {
  "id": "kmp-passwortrichtlinien-und-standardpasswoerter-1",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "passwortrichtlinien-und-standardpasswoerter",
  "title": "Geeignete Kennwortregeln",
  "difficulty": 2,
  "points": 4,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Cloud-Dienst für Entwicklungsunterlagen legt kein Kennwort vorab fest. Welche zwei Regeln für spätere Kennwörter sind zweckmäßig?",
  "payload": {
   "options": [
    {
     "text": "Dasselbe einfache Kennwort für alle Dienste verwenden, damit es sich leichter merken lässt und nicht vergessen wird.",
     "correct": false,
     "why": "Bei einer Kompromittierung wären alle Dienste offen."
    },
    {
     "text": "Das Kennwort auf einem Zettel am Monitor aufbewahren, damit Vertretungen es im Notfall sofort finden.",
     "correct": false,
     "why": "Sichtbar notierte Kennwörter sind für Unbefugte lesbar."
    },
    {
     "text": "Für den Dienst ein eigenes Kennwort verwenden, das nirgendwo sonst genutzt wird.",
     "correct": true
    },
    {
     "text": "Bei Verdacht auf Kompromittierung das Kennwort sofort wechseln.",
     "correct": true
    },
    {
     "text": "Das Kennwort aus dem Namen des Mandanten und dem Geburtsjahr bilden, damit es sich logisch herleiten lässt.",
     "correct": false,
     "why": "Aus Benutzerdaten ableitbare Kennwörter lassen sich erraten."
    }
   ],
   "multi": true,
   "explanation": "Ein eigenes Kennwort begrenzt den Schaden, wenn ein anderer Dienst kompromittiert wird. Der Wechsel bei Verdacht entwertet ein bekannt gewordenes Kennwort."
  }
 },
 {
  "id": "kmp-passwortrichtlinien-und-standardpasswoerter-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "passwortrichtlinien-und-standardpasswoerter",
  "title": "Ohne Herstellerkennwort",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Schließsystem wird ohne herstellerseitiges Kennwort ausgeliefert. Welche unmittelbare Folge hat das?",
  "payload": {
   "options": [
    {
     "text": "Das Portal lässt sich dauerhaft ohne Anmeldung nutzen, weil ohne Kennwort auch kein Zugriffsschutz nötig ist.",
     "correct": false,
     "why": "Ein ungeschütztes Portal wäre ein Sicherheitsrisiko."
    },
    {
     "text": "Alle Geräte dieses Herstellers teilen ein identisches Werkskennwort, das jeder Angreifer aus dem Internet kennt.",
     "correct": false,
     "why": "Trifft bei fehlendem Herstellerkennwort gerade nicht zu."
    },
    {
     "text": "Vor der Anmeldung im Webportal muss ein eigenes Kennwort eingerichtet werden; serienweit bekannte Werkszugangsdaten gibt es nicht.",
     "correct": true
    },
    {
     "text": "Das Kennwort wird beim ersten Start zufällig erzeugt und automatisch per E-Mail an den Hersteller gesendet.",
     "correct": false,
     "why": "Erfundener Vorgang."
    }
   ],
   "multi": false,
   "explanation": "Ohne Werkskennwort muss der Betreiber zuerst ein eigenes setzen. Bekannte Standardzugangsdaten stehen Angreifern nicht zur Verfügung."
  }
 },
 {
  "id": "kmp-passwortrichtlinien-und-standardpasswoerter-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "passwortrichtlinien-und-standardpasswoerter",
  "title": "Sicherheitswirkung einer Regel",
  "difficulty": 1,
  "points": 3,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Eine Wartungskonsole mit weitreichenden Rechten soll ein Kennwort aus mehreren Zeichenarten erhalten. Welche Wirkung hat das?",
  "payload": {
   "options": [
    {
     "text": "Das Kennwort wird durch Sonderzeichen verschlüsselt und kann deshalb nicht mehr abgefangen werden.",
     "correct": false,
     "why": "Zeichenarten verschlüsseln nicht."
    },
    {
     "text": "Das Kennwort muss nie mehr geändert werden, da mehrere Zeichenarten es dauerhaft unangreifbar machen.",
     "correct": false,
     "why": "Auch starke Kennwörter müssen bei Verdacht gewechselt werden."
    },
    {
     "text": "Die Konsole schaltet sich automatisch ab, sobald ein Kennwort weniger als drei Zeichenarten enthält.",
     "correct": false,
     "why": "Erfundenes Verhalten."
    },
    {
     "text": "Der Suchraum wird größer, sodass Brute-Force-Angriffe deutlich länger dauern.",
     "correct": true
    }
   ],
   "multi": false,
   "explanation": "Mehr Zeichenarten vergrößern die Zahl möglicher Kombinationen; automatisiertes Ausprobieren dauert deutlich länger."
  }
 },
 {
  "id": "kmp-phishing-schutzmassnahmen-2",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "phishing-schutzmassnahmen",
  "title": "Schutzvorkehrungen des Betriebs",
  "difficulty": 1,
  "points": 2,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Ein Logistikbetrieb richtet neue E-Mail-Arbeitsplätze ein. Welche zwei Vorkehrungen verringern das Phishing-Risiko?",
  "payload": {
   "options": [
    {
     "text": "Alle Beschäftigten erhalten Administratorrechte, damit sie selbst Schutzsoftware nachinstallieren können",
     "correct": false,
     "why": "Erhöht die Angriffsfläche."
    },
    {
     "text": "Ein leistungsfähiger Spam- und Phishingfilter",
     "correct": true
    },
    {
     "text": "Das Postfach wird für externe Nachrichten geöffnet und die Filterung dem Zufall der Nutzer überlassen",
     "correct": false,
     "why": "Verzicht auf Schutz."
    },
    {
     "text": "Regelmäßige Sensibilisierungsschulungen für Beschäftigte",
     "correct": true
    },
    {
     "text": "Alle Kennwörter werden per E-Mail an die IT gesendet, damit sie zentral geprüft werden können",
     "correct": false,
     "why": "Kennwörter per Mail zu senden ist unsicher."
    }
   ],
   "multi": true,
   "explanation": "Ein Filter hält viele Phishing-Mails schon am Gateway auf; Schulungen befähigen Beschäftigte, den Rest zu erkennen."
  }
 },
 {
  "id": "kmp-phishing-schutzmassnahmen-3",
  "type": "auswahl",
  "topic": "wirtschaft",
  "subtopic": "IT-Sicherheit",
  "concept": "phishing-schutzmassnahmen",
  "title": "Verhaltensregeln im Büro",
  "difficulty": 1,
  "points": 2,
  "figure": "datenschutz",
  "source": "AP2",
  "prompt": "Für neu eingegangene Mails soll eine Arbeitsanweisung erstellt werden. Welche zwei Verhaltensregeln sind geeignet?",
  "payload": {
   "options": [
    {
     "text": "Verdächtige Nachrichten an möglichst viele Kolleginnen und Kollegen weiterleiten, damit sie es beurteilen.",
     "correct": false,
     "why": "Verbreitet die Gefahr weiter."
    },
    {
     "text": "Keine Links aus verdächtigen Nachrichten öffnen.",
     "correct": true
    },
    {
     "text": "Verdachtsfälle an die zuständige IT-Stelle melden.",
     "correct": true
    },
    {
     "text": "Auf Aufforderungen zur Zahlung sofort antworten und die Absenderadresse später prüfen.",
     "correct": false,
     "why": "Reagieren ohne Prüfung ist genau das Ziel des Angreifers."
    },
    {
     "text": "Bei Zweifeln den Anhang sicherheitshalber zuerst öffnen, um zu prüfen, ob er harmlos aussieht.",
     "correct": false,
     "why": "Öffnen kann bereits Schadcode auslösen."
    }
   ],
   "multi": true,
   "explanation": "Links nicht öffnen und Verdachtsfälle melden begrenzen den Schaden und ermöglichen der IT, weitere Empfänger zu warnen."
  }
 }
]);

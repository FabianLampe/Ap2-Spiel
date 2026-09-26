window.GAME_DATA = window.GAME_DATA || {};
GAME_DATA.handbuch = (GAME_DATA.handbuch || []).concat([

  // ============================================================ Maschinelles Lernen: Grundlagen
  { id: 'ml-grundlagen', bereich: 'Maschinelles Lernen', title: 'Grundlagen des maschinellen Lernens', entries: [
    { id: 'ml-ueberwacht-unueberwacht', title: 'Überwachtes und unüberwachtes Lernen', keywords: ['überwachtes lernen', 'unüberwachtes lernen', 'supervised', 'unsupervised', 'label', 'clustering'],
      kurz: 'Überwacht: Trainingsdaten haben bekannte Zielwerte (Labels). Unüberwacht: keine Labels, das Verfahren sucht selbst Strukturen.',
      erklaerung: [
        'Beim überwachten Lernen (supervised learning) besteht jeder Trainingsdatensatz aus Merkmalen (Eingabe) und einem bekannten Ergebnis, dem Label. Das Modell lernt den Zusammenhang und soll ihn auf neue, unbekannte Daten übertragen. Beispiele: Spam-Erkennung, Preisvorhersage. Typische Verfahren: k-nächste-Nachbarn, Entscheidungsbaum, lineare Regression.',
        'Beim unüberwachten Lernen (unsupervised learning) gibt es keine Labels. Das Verfahren sucht selbst Muster, etwa Gruppen ähnlicher Datensätze (Clustering, z. B. k-Means) für eine Kundensegmentierung.',
        'Merkhilfe: Gibt es eine „richtige Antwort“ in den Trainingsdaten, ist es überwacht. Gibt es sie nicht, ist es unüberwacht. Daneben existiert das bestärkende Lernen (reinforcement learning), bei dem ein Agent über Belohnungen lernt.'
      ],
      stolperfallen: ['Clustering ist keine Klassifikation: Bei der Klassifikation sind die Klassen vorher bekannt, beim Clustering entstehen die Gruppen erst durch das Verfahren.'],
      siehe: ['ml-klassifikation-regression', 'ml-trainings-testdaten'] },

    { id: 'ml-klassifikation-regression', title: 'Klassifikation und Regression', keywords: ['klassifikation', 'regression', 'klasse', 'kategorie', 'numerischer wert', 'vorhersage'],
      kurz: 'Klassifikation sagt eine Kategorie voraus, Regression einen numerischen Wert.',
      erklaerung: [
        'Beide gehören zum überwachten Lernen und unterscheiden sich nur im Typ der Zielgröße. Bei der Klassifikation ist das Ergebnis eine Klasse aus einer endlichen Menge, z. B. „Spam“ oder „kein Spam“, „Tarif A/B/C“. Bei der Regression ist das Ergebnis eine Zahl aus einem stetigen Bereich, z. B. Verkaufspreis in Euro oder Temperatur.',
        'Entscheidungsbäume und k-nächste-Nachbarn können beides (Mehrheitsentscheid bzw. Mittelwert der Nachbarn). Die lineare Regression liefert dagegen immer Zahlenwerte.'
      ],
      beispiel: [{ code: 'Vorhersage "Kunde kündigt: ja/nein"   -> Klassifikation\nVorhersage "Kündigung in Monaten: 7,4" -> Regression', hinweis: 'Entscheidend ist, ob die Zielgröße eine Kategorie oder eine Zahl ist.' }],
      stolperfallen: ['Klassen, die als Zahlen codiert sind (z. B. 0 und 1 für nein/ja), bleiben Klassen. Es ist trotzdem Klassifikation.'],
      siehe: ['ml-ueberwacht-unueberwacht', 'ml-lineare-regression', 'ml-metriken'] },

    { id: 'ml-trainings-testdaten', title: 'Trainings- und Testdaten', keywords: ['trainingsdaten', 'testdaten', 'validierung', 'split', 'train test split', 'aufteilung'],
      kurz: 'Die Daten werden geteilt: Mit den Trainingsdaten lernt das Modell, mit den Testdaten wird es auf unbekannten Daten geprüft.',
      erklaerung: [
        'Ein Modell, das nur auf den Daten bewertet wird, mit denen es gelernt hat, wirkt zu gut. Deshalb wird der Datenbestand vor dem Lernen aufgeteilt, häufig etwa 70–80 % Training und 20–30 % Test. Die Testdaten dürfen beim Training nicht verwendet werden.',
        'Die Datensätze sollten vor dem Teilen zufällig gemischt werden, damit beide Teile die Klassen in ähnlichem Verhältnis enthalten. Wenn zusätzlich Parameter (z. B. k bei KNN) abgestimmt werden, nutzt man oft eine dritte Menge, die Validierungsdaten, damit die Testdaten unberührt bleiben.'
      ],
      beispiel: [{ code: '1000 Datensätze\nTraining: 800 (80 %)\nTest:     200 (20 %)', hinweis: 'Die Kennzahlen (z. B. Accuracy) werden nur auf den 200 Testdaten berechnet.' }],
      stolperfallen: ['Wenn Informationen aus den Testdaten ins Training gelangen (Data Leakage), ist die gemessene Güte unrealistisch hoch.'],
      siehe: ['ml-ueber-unteranpassung', 'ml-metriken'] },

    { id: 'ml-ueber-unteranpassung', title: 'Überanpassung und Unteranpassung', keywords: ['overfitting', 'underfitting', 'überanpassung', 'unteranpassung', 'generalisierung'],
      kurz: 'Überanpassung: Das Modell lernt Trainingsdaten samt Rauschen auswendig. Unteranpassung: Das Modell ist zu einfach für die Muster.',
      erklaerung: [
        'Überanpassung (Overfitting) erkennt man daran, dass die Güte auf den Trainingsdaten sehr hoch ist, auf den Testdaten aber deutlich schlechter. Das Modell hat Zufälligkeiten und Ausreißer gelernt und generalisiert schlecht. Ursachen: zu komplexes Modell (z. B. sehr tiefer Entscheidungsbaum, k = 1 bei KNN), zu wenige Daten.',
        'Unteranpassung (Underfitting) liegt vor, wenn das Modell schon auf den Trainingsdaten schlecht ist, weil es zu einfach ist (z. B. eine Gerade bei klar gekrümmtem Zusammenhang) oder wichtige Merkmale fehlen.',
        'Gegenmaßnahmen gegen Überanpassung: mehr Trainingsdaten, einfacheres Modell (Baumtiefe begrenzen, größeres k), unwichtige Merkmale entfernen. Gegen Unteranpassung: komplexeres Modell oder bessere Merkmale.'
      ],
      beispiel: [{ code: 'Trainings-Accuracy 99 %, Test-Accuracy 70 %  -> Überanpassung\nTrainings-Accuracy 62 %, Test-Accuracy 60 %  -> Unteranpassung', hinweis: 'Erst der Vergleich von Training und Test macht das Problem sichtbar.' }],
      siehe: ['ml-trainings-testdaten', 'ml-knn-wahl-k', 'ml-id3-entscheidungsbaum'] }
  ] },

  // ============================================================ Maschinelles Lernen: Verfahren
  { id: 'ml-verfahren', bereich: 'Maschinelles Lernen', title: 'Verfahren und Bewertung', entries: [
    { id: 'ml-knn-ablauf', title: 'k-nächste-Nachbarn (KNN): Ablauf', keywords: ['knn', 'k-nächste-nachbarn', 'k nearest neighbors', 'nachbarn', 'k-nn'],
      kurz: 'KNN klassifiziert einen neuen Datenpunkt nach der Mehrheit der Klassen seiner k ähnlichsten Trainingspunkte.',
      erklaerung: [
        'Ablauf: (1) Distanz des neuen Punkts zu allen Trainingspunkten berechnen. (2) Die k Punkte mit der kleinsten Distanz auswählen. (3) Die häufigste Klasse unter diesen k Nachbarn ist das Ergebnis (bei Regression: Mittelwert der Nachbarwerte).',
        'KNN hat keine eigentliche Trainingsphase, die Trainingsdaten werden nur gespeichert (lazy learning). Dafür ist jede Vorhersage rechenaufwendig, weil alle Distanzen bestimmt werden müssen.'
      ],
      beispiel: [{ code: 'Neuer Punkt Q = (3, 4), k = 3\nA (1,2) rot   d = 2,83\nB (4,4) blau  d = 1,00\nC (6,8) rot   d = 5,00\nD (3,6) blau  d = 2,00\n\nDie 3 nächsten: B (blau), D (blau), A (rot)\nErgebnis: blau (2 zu 1)', hinweis: 'd(Q,A) = Wurzel((3-1)² + (4-2)²) = Wurzel(8) ≈ 2,83.' }],
      siehe: ['ml-knn-distanz', 'ml-knn-wahl-k', 'ml-skalierung'] },

    { id: 'ml-knn-distanz', title: 'Distanzmaße (euklidisch, Manhattan)', keywords: ['distanz', 'euklidisch', 'manhattan', 'abstand', 'metrik'],
      kurz: 'Die euklidische Distanz ist die Luftlinie, die Manhattan-Distanz die Summe der Achsenabstände.',
      syntax: 'euklidisch:  d = Wurzel( (x1-y1)² + (x2-y2)² + ... )\nManhattan:   d = |x1-y1| + |x2-y2| + ...',
      erklaerung: [
        'Für KNN muss festgelegt sein, was „nah“ bedeutet. Üblich ist die euklidische Distanz, die sich für beliebig viele Merkmale erweitern lässt (Summe der quadrierten Differenzen, daraus die Wurzel). Die Manhattan-Distanz addiert nur die Beträge der Differenzen.',
        'Zwischen zwei Punkten P = (1, 2) und Q = (4, 6): euklidisch Wurzel(9 + 16) = 5, Manhattan 3 + 4 = 7.',
        'Für den reinen Vergleich, wer näher ist, kann man die Wurzel weglassen, denn die Reihenfolge der Distanzen ändert sich dadurch nicht.'
      ],
      stolperfallen: ['Nominale Merkmale (z. B. Farbe) lassen sich nicht direkt in eine Distanz einsetzen. Sie müssen passend codiert werden.'],
      siehe: ['ml-knn-ablauf', 'ml-skalierung'] },

    { id: 'ml-knn-wahl-k', title: 'Wahl von k bei KNN', keywords: ['k wählen', 'wahl von k', 'hyperparameter', 'ungerades k', 'mehrheitsentscheid'],
      kurz: 'Kleines k folgt jedem Rauschen (Überanpassung), großes k glättet zu stark (Unteranpassung).',
      erklaerung: [
        'Bei k = 1 zählt nur der nächste Nachbar, ein einzelner Ausreißer kann das Ergebnis kippen. Bei sehr großem k überstimmt die häufigste Klasse im ganzen Datensatz die lokale Struktur.',
        'Bei zwei Klassen wählt man k ungerade, damit es keinen Gleichstand gibt. Einen guten Wert findet man durch Ausprobieren: Für mehrere k die Güte auf Validierungsdaten messen und das beste wählen. k ist ein Hyperparameter, kein gelernter Wert.'
      ],
      beispiel: [{ code: 'k=1: Ergebnis rot   (nächster Nachbar rot)\nk=3: Ergebnis blau  (2 blau, 1 rot)\nk=5: Ergebnis blau  (3 blau, 2 rot)', hinweis: 'Das Ergebnis kann sich mit k ändern. Deshalb wird k getestet.' }],
      siehe: ['ml-knn-ablauf', 'ml-ueber-unteranpassung'] },

    { id: 'ml-skalierung', title: 'Skalierung von Merkmalen', keywords: ['skalierung', 'normalisierung', 'min-max', 'standardisierung', 'feature scaling'],
      kurz: 'Merkmale mit großem Wertebereich dominieren die Distanz. Deshalb werden sie vor KNN auf einen gemeinsamen Bereich skaliert.',
      syntax: 'Min-Max-Normalisierung:  x\' = (x - min) / (max - min)',
      erklaerung: [
        'Liegt das Gehalt zwischen 30 000 und 90 000 und das Alter zwischen 20 und 60, bestimmt praktisch nur das Gehalt die Distanz, weil Unterschiede von tausenden Euro die von wenigen Jahren erdrücken. Die Min-Max-Normalisierung bildet jedes Merkmal auf den Bereich 0 bis 1 ab.',
        'Alternativ standardisiert man mit dem Mittelwert und der Standardabweichung: z = (x - Mittelwert) / Standardabweichung.',
        'Min und max bzw. Mittelwert und Standardabweichung werden aus den Trainingsdaten bestimmt und dann auch auf die Testdaten angewendet.'
      ],
      beispiel: [{ code: 'Gehalt 60000, min 30000, max 90000:\n(60000 - 30000) / (90000 - 30000) = 0,5\n\nAlter 30, min 20, max 60:\n(30 - 20) / (60 - 20) = 0,25' }],
      stolperfallen: ['Entscheidungsbäume brauchen keine Skalierung, KNN dagegen unbedingt.'],
      siehe: ['ml-knn-distanz', 'ml-knn-ablauf'] },

    { id: 'ml-id3-entscheidungsbaum', title: 'Entscheidungsbaum und ID3', keywords: ['entscheidungsbaum', 'id3', 'decision tree', 'baum', 'blatt', 'knoten'],
      kurz: 'ID3 baut einen Entscheidungsbaum auf, indem es Schritt für Schritt das Merkmal mit dem größten Informationsgewinn wählt.',
      erklaerung: [
        'Ein Entscheidungsbaum besteht aus Knoten (Test auf ein Merkmal), Kanten (Ausprägung) und Blättern (Klasse). ID3 arbeitet rekursiv: (1) Entropie der aktuellen Datenmenge bestimmen. (2) Für jedes verbleibende Merkmal den Informationsgewinn berechnen. (3) Merkmal mit dem größten Gewinn als Knoten wählen und die Daten nach seinen Werten aufteilen. (4) Für jede Teilmenge wiederholen.',
        'Abbruch: Alle Datensätze einer Teilmenge haben dieselbe Klasse (Blatt), oder es sind keine Merkmale mehr übrig (dann Mehrheitsklasse). Ein Merkmal wird auf einem Pfad nur einmal verwendet.',
        'Vorteil: Der Baum ist gut nachvollziehbar. Nachteil: Ohne Begrenzung der Tiefe wächst er, bis er die Trainingsdaten auswendig kennt (Überanpassung).'
      ],
      siehe: ['ml-id3-entropie', 'ml-id3-informationsgewinn', 'ml-ueber-unteranpassung'] },

    { id: 'ml-id3-entropie', title: 'Entropie', keywords: ['entropie', 'unreinheit', 'log2', 'impurity'],
      kurz: 'Die Entropie misst die Unordnung einer Klassenverteilung: 0 bei nur einer Klasse, 1 bei zwei gleich häufigen Klassen.',
      syntax: 'H(S) = - Summe( p_i * log2(p_i) )     (p_i = Anteil der Klasse i)',
      erklaerung: [
        'Je gleichmäßiger sich die Datensätze auf die Klassen verteilen, desto höher die Entropie. Eine reine Menge (alle gleiche Klasse) hat H = 0. Bei zwei Klassen liegt der Höchstwert bei 1 (Verteilung 50 : 50).',
        'Rechenweg für 9 Datensätze „ja“ und 5 „nein“ (gesamt 14): p(ja) = 9/14 ≈ 0,643 und p(nein) = 5/14 ≈ 0,357. Der Logarithmus zur Basis 2 wird im Taschenrechner meist als log(x) / log(2) berechnet.',
        'Klassen mit p = 0 werden weggelassen (0 · log 0 gilt als 0).'
      ],
      beispiel: [{ code: 'H = -(9/14)*log2(9/14) - (5/14)*log2(5/14)\n  = -0,643*(-0,637) - 0,357*(-1,485)\n  = 0,410 + 0,530\n  = 0,940', hinweis: 'Zum Prüfen: bei 7 ja / 7 nein ergibt sich genau 1, bei 14 ja / 0 nein genau 0.' }],
      siehe: ['ml-id3-informationsgewinn', 'ml-id3-entscheidungsbaum'] },

    { id: 'ml-id3-informationsgewinn', title: 'Informationsgewinn (mit Rechenbeispiel)', keywords: ['informationsgewinn', 'information gain', 'gain', 'attributwahl', 'id3 rechnen'],
      kurz: 'Der Informationsgewinn ist die Entropie vor dem Teilen minus die gewichtete Entropie der Teilmengen. Das Merkmal mit dem größten Gewinn wird gewählt.',
      syntax: 'IG(S, A) = H(S) - Summe( |S_v| / |S| * H(S_v) )',
      erklaerung: [
        'S ist die aktuelle Datenmenge, A das Merkmal, S_v die Teilmenge mit dem Wert v des Merkmals. Jede Teilmenge wird mit ihrem Anteil an S gewichtet.',
        'Beispiel: 14 Tage, 9 Mal „Spielen = ja“, 5 Mal „nein“ (H(S) = 0,940). Merkmal „Wetter“: sonnig (5 Tage: 2 ja, 3 nein), bewölkt (4 Tage: 4 ja, 0 nein), regnerisch (5 Tage: 3 ja, 2 nein).',
        'H(sonnig) = H(2/5, 3/5) ≈ 0,971. H(bewölkt) = 0. H(regnerisch) ≈ 0,971. Gewichtete Summe: 5/14 · 0,971 + 4/14 · 0 + 5/14 · 0,971 ≈ 0,347 + 0 + 0,347 = 0,694. Informationsgewinn: 0,940 - 0,694 ≈ 0,247.',
        'Dieser Wert wird für jedes Merkmal berechnet. Das Merkmal mit dem größten Gewinn wird Wurzel bzw. nächster Knoten.'
      ],
      beispiel: [{ code: 'IG(Wetter) = 0,940 - (5/14*0,971 + 4/14*0 + 5/14*0,971)\n           = 0,940 - 0,694\n           = 0,246 (genauer: 0,247)', hinweis: 'Kleine Abweichungen entstehen durch Rundung der Zwischenergebnisse.' }],
      stolperfallen: ['Die Gewichte sind Anteile der Teilmengen (Anzahl / Gesamtanzahl), nicht Anteile der Klasse.', 'Die Entropie H(S) vor dem Teilen nicht vergessen abzuziehen, sonst erhält man nur die Restentropie.'],
      siehe: ['ml-id3-entropie', 'ml-id3-entscheidungsbaum'] },

    { id: 'ml-lineare-regression', title: 'Lineare Regression', keywords: ['lineare regression', 'regressionsgerade', 'steigung', 'achsenabschnitt', 'kleinste quadrate', 'mse', 'r2'],
      kurz: 'Die lineare Regression legt die Gerade y = m·x + b so durch die Datenpunkte, dass die Summe der quadrierten Abweichungen minimal wird.',
      syntax: 'y = m * x + b\nm = Summe((x - x̄)*(y - ȳ)) / Summe((x - x̄)²)\nb = ȳ - m * x̄',
      erklaerung: [
        'm ist die Steigung: Um wie viel steigt y, wenn x um 1 wächst. b ist der Achsenabschnitt: der Wert von y bei x = 0. x̄ und ȳ sind die Mittelwerte. Die Gerade läuft immer durch den Punkt (x̄, ȳ).',
        'Beispiel mit den Punkten (1,2), (2,4), (3,5), (4,4), (5,5): x̄ = 3, ȳ = 4. Zähler: (-2)(-2) + (-1)(0) + 0 + (1)(0) + (2)(1) = 6. Nenner: 4 + 1 + 0 + 1 + 4 = 10. Also m = 0,6 und b = 4 - 0,6 · 3 = 2,2. Vorhersage für x = 6: y = 0,6 · 6 + 2,2 = 5,8.',
        'Bewertung: Die Residuen (Ist minus Vorhersage) sind -0,8; 0,6; 1,0; -0,6; -0,2. Der mittlere quadratische Fehler (MSE) ist (0,64 + 0,36 + 1 + 0,36 + 0,04) / 5 = 0,48. Das Bestimmtheitsmaß R² = 1 - 2,4 / 6 = 0,6 (2,4 = Summe der Residuenquadrate, 6 = Summe (y - ȳ)²). R² nahe 1 heißt, die Gerade erklärt die Daten gut.'
      ],
      stolperfallen: ['Nicht weit außerhalb des Wertebereichs der Trainingsdaten vorhersagen (Extrapolation), dort ist die Annahme einer Geraden oft falsch.', 'Ein hohes R² beweist keinen ursächlichen Zusammenhang.'],
      siehe: ['ml-klassifikation-regression', 'stat-mittelwert'] },

    { id: 'ml-metriken', title: 'Konfusionsmatrix, Accuracy, Precision, Recall', keywords: ['konfusionsmatrix', 'accuracy', 'precision', 'recall', 'f1', 'genauigkeit', 'trefferquote', 'confusion matrix'],
      kurz: 'Aus der Konfusionsmatrix (TP, FP, FN, TN) werden Accuracy, Precision und Recall berechnet, um Klassifikatoren zu bewerten.',
      syntax: 'Accuracy  = (TP + TN) / (TP + TN + FP + FN)\nPrecision = TP / (TP + FP)\nRecall    = TP / (TP + FN)\nF1        = 2 * Precision * Recall / (Precision + Recall)',
      erklaerung: [
        'TP (richtig positiv): als positiv vorhergesagt und wirklich positiv. FP (falsch positiv): als positiv vorhergesagt, in Wahrheit negativ. FN (falsch negativ): als negativ vorhergesagt, in Wahrheit positiv. TN (richtig negativ): als negativ vorhergesagt und wirklich negativ.',
        'Accuracy ist der Anteil aller richtigen Vorhersagen. Precision beantwortet: Wie viele der als positiv gemeldeten Fälle sind wirklich positiv? Recall beantwortet: Wie viele der tatsächlich positiven Fälle wurden gefunden?',
        'Beispiel Spam-Filter mit 200 E-Mails: TP = 40, FP = 10, FN = 20, TN = 130. Accuracy = 170 / 200 = 0,85. Precision = 40 / 50 = 0,80. Recall = 40 / 60 ≈ 0,667. F1 ≈ 0,727.',
        'Bei ungleich verteilten Klassen ist Accuracy irreführend: Sind 99 % der Fälle negativ, erreicht ein Modell, das immer „negativ“ sagt, 99 % Accuracy, findet aber nie einen positiven Fall (Recall = 0). Wenn ein verpasster Fall teuer ist (z. B. Krankheit), ist Recall wichtiger, wenn Fehlalarme teuer sind, Precision.'
      ],
      beispiel: [{ code: '              vorhergesagt: Spam | kein Spam\ntatsächlich Spam:        40 (TP) |   20 (FN)\ntatsächlich kein Spam:   10 (FP) |  130 (TN)' }],
      stolperfallen: ['Precision und Recall nicht verwechseln: Precision hat FP im Nenner, Recall hat FN im Nenner.'],
      siehe: ['ml-trainings-testdaten', 'ml-klassifikation-regression'] }
  ] },

  // ============================================================ Statistik
  { id: 'stat-kennzahlen', bereich: 'Statistik', title: 'Statistische Kennzahlen', entries: [
    { id: 'stat-mittelwert', title: 'Arithmetischer Mittelwert', keywords: ['mittelwert', 'durchschnitt', 'arithmetisches mittel', 'avg'],
      kurz: 'Der Mittelwert ist die Summe aller Werte geteilt durch ihre Anzahl.',
      syntax: 'x̄ = (x1 + x2 + ... + xn) / n',
      erklaerung: [
        'Der Mittelwert ist empfindlich gegen Ausreißer. Ein einzelner extremer Wert verschiebt ihn deutlich. Bei stark schiefen Daten (z. B. Gehälter) ist deshalb oft der Median aussagekräftiger.',
        'Sind Werte unterschiedlich oft vorhanden, nimmt man den gewichteten Mittelwert: Summe(Wert · Häufigkeit) / Summe(Häufigkeiten).'
      ],
      beispiel: [{ code: 'Werte: 2, 4, 4, 4, 5, 5, 7, 9\nSumme = 40, n = 8\nMittelwert = 40 / 8 = 5', hinweis: 'Dieser Datensatz wird in den folgenden Einträgen weiterverwendet.' },
                 { code: 'Note 1: 2 Mal, Note 2: 5 Mal, Note 3: 3 Mal\n(1*2 + 2*5 + 3*3) / 10 = 21 / 10 = 2,1', hinweis: 'Gewichteter Mittelwert aus einer Häufigkeitstabelle.' }],
      siehe: ['stat-median-modus', 'stat-varianz-standardabweichung'] },

    { id: 'stat-median-modus', title: 'Median und Modus', keywords: ['median', 'modus', 'modalwert', 'zentralwert', 'lagemaß'],
      kurz: 'Der Median ist der mittlere Wert der sortierten Liste, der Modus der häufigste Wert.',
      erklaerung: [
        'Median: Werte der Größe nach sortieren. Bei ungerader Anzahl ist es der mittlere Wert, bei gerader Anzahl der Mittelwert der beiden mittleren Werte. Der Median ist robust gegen Ausreißer.',
        'Modus (Modalwert): der Wert, der am häufigsten vorkommt. Er ist auch bei nominalen Merkmalen (z. B. häufigste Farbe) bestimmbar. Es kann mehrere Modi geben oder keinen sinnvollen, wenn alle Werte nur einmal vorkommen.'
      ],
      beispiel: [{ code: 'Werte: 2, 4, 4, 4, 5, 5, 7, 9 (n = 8, schon sortiert)\nMedian = (4 + 5) / 2 = 4,5\nModus  = 4 (kommt dreimal vor)\n\nMit Ausreißer: 2, 4, 4, 4, 5, 5, 7, 90\nMittelwert = 121 / 8 = 15,125\nMedian     = 4,5 (unverändert)' }],
      stolperfallen: ['Vor dem Bestimmen des Medians unbedingt sortieren.'],
      siehe: ['stat-mittelwert', 'stat-spannweite'] },

    { id: 'stat-spannweite', title: 'Spannweite', keywords: ['spannweite', 'range', 'minimum', 'maximum', 'streuung'],
      kurz: 'Die Spannweite ist der Abstand zwischen größtem und kleinstem Wert.',
      syntax: 'R = x_max - x_min',
      erklaerung: [
        'Die Spannweite ist das einfachste Streuungsmaß, aber sehr anfällig für Ausreißer, da sie nur die beiden Extremwerte betrachtet.'
      ],
      beispiel: [{ code: 'Werte: 2, 4, 4, 4, 5, 5, 7, 9\nR = 9 - 2 = 7' }],
      siehe: ['stat-varianz-standardabweichung'] },

    { id: 'stat-varianz-standardabweichung', title: 'Varianz und Standardabweichung', keywords: ['varianz', 'standardabweichung', 'sigma', 'streuung', 'stichprobe', 'population', 'grundgesamtheit'],
      kurz: 'Varianz und Standardabweichung messen, wie stark Werte um den Mittelwert streuen. Bei Stichproben wird durch n-1 geteilt.',
      syntax: 'Population:  σ² = Summe((x - μ)²) / n\nStichprobe:  s² = Summe((x - x̄)²) / (n - 1)\nStandardabweichung = Wurzel(Varianz)',
      erklaerung: [
        'Man bildet die Abweichung jedes Werts vom Mittelwert, quadriert sie, summiert und teilt. Die Standardabweichung ist die Wurzel daraus und hat dieselbe Einheit wie die Daten.',
        'Liegt die gesamte Grundgesamtheit vor (Population), teilt man durch n. Bei einer Stichprobe, aus der man auf die Grundgesamtheit schließen will, teilt man durch n - 1 (Bessel-Korrektur), weil sonst die Streuung systematisch unterschätzt wird.',
        'Beispiel mit 2, 4, 4, 4, 5, 5, 7, 9 (Mittelwert 5): Die quadrierten Abweichungen sind 9, 1, 1, 1, 0, 0, 4, 16, ihre Summe ist 32. Population: σ² = 32 / 8 = 4, σ = 2. Stichprobe: s² = 32 / 7 ≈ 4,571, s ≈ 2,138.'
      ],
      stolperfallen: ['Aufgabe genau lesen: „alle Mitarbeiter“ ist eine Population, „eine Auswahl von 30 Messungen“ eine Stichprobe.', 'Varianz hat die quadrierte Einheit (z. B. Euro²), die Standardabweichung die Einheit der Daten.'],
      siehe: ['stat-mittelwert', 'stat-spannweite'] },

    { id: 'stat-erwartungswert', title: 'Erwartungswert', keywords: ['erwartungswert', 'wahrscheinlichkeit', 'zufallsvariable', 'gewinnerwartung'],
      kurz: 'Der Erwartungswert ist der mit den Wahrscheinlichkeiten gewichtete Mittelwert aller möglichen Ergebnisse.',
      syntax: 'E(X) = Summe( x_i * p_i )',
      erklaerung: [
        'Er gibt an, welcher Wert sich bei sehr häufiger Wiederholung im Durchschnitt ergibt. Die Wahrscheinlichkeiten p_i aller Ergebnisse müssen zusammen 1 ergeben.',
        'Wichtig für Entscheidungen unter Unsicherheit, z. B. erwarteter Gewinn oder Schaden.'
      ],
      beispiel: [{ code: 'Würfel: E = (1+2+3+4+5+6) / 6 = 3,5', hinweis: 'Ein einzelner Wurf liefert nie 3,5, das ist nur der Durchschnitt über viele Würfe.' },
                 { code: 'Einsatz 2 EUR. Bei einer 6 (p = 1/6) gibt es 9 EUR, sonst nichts.\nE(Auszahlung) = 9 * 1/6 + 0 * 5/6 = 1,50 EUR\nErwarteter Gewinn = 1,50 - 2 = -0,50 EUR' }],
      siehe: ['stat-mittelwert', 'stat-haeufigkeit'] },

    { id: 'stat-haeufigkeit', title: 'Absolute und relative Häufigkeit', keywords: ['häufigkeit', 'absolute häufigkeit', 'relative häufigkeit', 'häufigkeitstabelle', 'anteil'],
      kurz: 'Absolute Häufigkeit ist die Anzahl des Auftretens, relative Häufigkeit der Anteil an allen Beobachtungen.',
      syntax: 'h(x) = Anzahl von x        (absolut)\nr(x) = h(x) / n            (relativ; mal 100 = Prozent)',
      erklaerung: [
        'Die Summe aller absoluten Häufigkeiten ist n, die Summe aller relativen Häufigkeiten ist 1 (also 100 %). Die kumulierte Häufigkeit addiert die Werte der Reihe nach auf.'
      ],
      beispiel: [{ code: 'Klausur, n = 40 Teilnehmer\nNote 1: 4  -> 4/40  = 0,10 = 10 %\nNote 2: 10 -> 10/40 = 0,25 = 25 %\nNote 3: 14 -> 14/40 = 0,35 = 35 %\nNote 4: 8  -> 8/40  = 0,20 = 20 %\nNote 5: 4  -> 4/40  = 0,10 = 10 %\nSumme: 40 bzw. 100 %', hinweis: 'Kumuliert: bis Note 2 haben 14 von 40 bestanden mit 1 oder 2 (35 %).' }],
      siehe: ['stat-prozentrechnung', 'stat-klassenbildung'] },

    { id: 'stat-prozentrechnung', title: 'Prozentrechnung in der Statistik', keywords: ['prozent', 'prozentpunkte', 'prozentwert', 'grundwert', 'prozentsatz', 'veränderung'],
      kurz: 'Prozentwert = Grundwert · Prozentsatz / 100. Prozentuale Änderung und Prozentpunkte sind verschiedene Dinge.',
      syntax: 'W = G * p / 100\np = W / G * 100\nG = W / p * 100\nÄnderung in % = (neu - alt) / alt * 100',
      erklaerung: [
        'Der Grundwert G ist der Bezugswert (100 %), der Prozentwert W der Teil davon, p der Prozentsatz. Steigt eine Quote von 20 % auf 25 %, ist das eine Änderung um 5 Prozentpunkte, aber um 25 % relativ (5 / 20).',
        'Der Grundwert der Änderung ist immer der alte Wert. Fällt ein Wert um 20 % und steigt danach um 20 %, ist er nicht wieder beim Ausgangswert: 100 · 0,8 · 1,2 = 96.'
      ],
      beispiel: [{ code: 'Fehlerquote sinkt von 8 auf 6 Fehler je 100 Aufträge:\n(6 - 8) / 8 * 100 = -25 %  (relative Änderung)\n8 % -> 6 % sind 2 Prozentpunkte' }],
      siehe: ['calc-prozent-zins', 'stat-haeufigkeit'] },

    { id: 'stat-klassenbildung', title: 'Klassenbildung', keywords: ['klassen', 'klassenbildung', 'klassenbreite', 'histogramm', 'klassierung'],
      kurz: 'Bei vielen unterschiedlichen Werten fasst man sie in Klassen (Intervalle) zusammen, um Häufigkeiten übersichtlich darzustellen.',
      erklaerung: [
        'Vorgehen: (1) Spannweite bestimmen. (2) Anzahl der Klassen festlegen. Eine Faustregel ist etwa die Wurzel aus n, meist zwischen 5 und 15 Klassen. (3) Klassenbreite = Spannweite / Klassenanzahl, auf einen glatten Wert aufrunden. (4) Klassen lückenlos und überschneidungsfrei festlegen, sodass jeder Wert genau einer Klasse angehört. (5) Häufigkeiten auszählen.',
        'Jede Klasse hat eine Klassenmitte, mit der man bei klassierten Daten näherungsweise weiterrechnet, z. B. für einen Mittelwert. Im Histogramm stehen die Klassen ohne Lücken nebeneinander, die Höhe entspricht der Häufigkeit (bei gleicher Breite).'
      ],
      beispiel: [{ code: 'Antwortzeiten von 12 bis 88 ms, geplant 5 Klassen\nSpannweite = 76, 76 / 5 = 15,2 -> Breite 20 gewählt\nKlassen: 10-29, 30-49, 50-69, 70-89 (4 Klassen genügen)', hinweis: 'Nach dem Aufrunden der Breite kann sich die Klassenzahl verringern. Wichtig ist, dass min und max abgedeckt sind.' }],
      stolperfallen: ['Klassengrenzen eindeutig festlegen: 20-29 und 30-39 statt 20-30 und 30-40, sonst ist der Wert 30 doppelt zuordenbar.'],
      siehe: ['stat-haeufigkeit', 'stat-spannweite'] }
  ] },

  // ============================================================ Rechnen: Betriebswirtschaft
  { id: 'calc-betrieb', bereich: 'Rechnen', title: 'Kaufmännisches Rechnen', entries: [
    { id: 'calc-prozent-zins', title: 'Prozent- und Zinsrechnung', keywords: ['prozentrechnung', 'zinsrechnung', 'mehrwertsteuer', 'mwst', 'zinsen', 'zinseszins', 'netto brutto'],
      kurz: 'Prozentwert = Grundwert · p / 100. Zinsen = Kapital · Zinssatz · Zeit. Beim Zinseszins wächst das Kapital mit (1 + p/100)^n.',
      syntax: 'Zinsen:      Z = K * p * t / 100        (t in Jahren)\nTageszinsen: Z = K * p * Tage / (100 * 360)\nZinseszins:  Kn = K0 * (1 + p/100)^n',
      erklaerung: [
        'Mehrwertsteuer: Netto · 1,19 = Brutto (bei 19 %). Von Brutto auf Netto rechnet man durch 1,19, nicht durch Abzug von 19 %. Beispiel: Netto 250 EUR, MwSt 47,50 EUR, Brutto 297,50 EUR. Umgekehrt: 297,50 / 1,19 = 250 EUR.',
        'Tageszinsen (kaufmännisch: 1 Jahr = 360 Tage, 1 Monat = 30 Tage): 8 000 EUR zu 3 % für 90 Tage ergeben 8 000 · 3 · 90 / 36 000 = 60 EUR.',
        'Zinseszins: 5 000 EUR bei 4 % über 3 Jahre: 5 000 · 1,04³ = 5 000 · 1,124864 = 5 624,32 EUR.'
      ],
      stolperfallen: ['Bei Aufgaben mit „Tage“ prüfen, ob 360 oder 365 Tage anzusetzen sind. Die Aufgabe gibt es meist vor.'],
      siehe: ['calc-rabatt-skonto', 'stat-prozentrechnung'] },

    { id: 'calc-rabatt-skonto', title: 'Rabatt, Skonto und Bezugspreis', keywords: ['rabatt', 'skonto', 'listenpreis', 'einkaufspreis', 'bezugspreis', 'einstandspreis', 'bezugskosten'],
      kurz: 'Rabatt mindert den Listenpreis, Skonto den Rechnungsbetrag bei schneller Zahlung. Mit Bezugskosten ergibt sich der Bezugspreis.',
      syntax: 'Listeneinkaufspreis\n- Rabatt\n= Zieleinkaufspreis\n- Skonto\n= Bareinkaufspreis\n+ Bezugskosten\n= Bezugs-(Einstands-)preis',
      erklaerung: [
        'Rabatt wird vom Listenpreis abgezogen, Skonto vom Zieleinkaufspreis (Rechnungsbetrag). Skonto bekommt man nur, wenn innerhalb der Skontofrist gezahlt wird. Nachlässe sind Prozentrechnung mit dem jeweils vorherigen Zwischenwert als Grundwert.',
        'Beispiel: Listenpreis 1 200 EUR, 15 % Rabatt = 180 EUR, Zieleinkaufspreis 1 020 EUR. 2 % Skonto = 20,40 EUR, Bareinkaufspreis 999,60 EUR. Bezugskosten (Fracht) 30 EUR, Bezugspreis 1 029,60 EUR.',
        'Ist Skonto sinnvoll? Bei „2 % Skonto innerhalb 10 Tagen, netto 30 Tage“ spart man 2 % für 20 Tage früheres Zahlen. Auf das Jahr gerechnet: 2 / 98 · 360 / 20 ≈ 36,7 %. Das liegt weit über üblichen Kreditzinsen, deshalb lohnt sich das Skonto meist, auch wenn dafür ein Kredit nötig ist.'
      ],
      stolperfallen: ['Skonto nicht auf den Listenpreis rechnen, sondern auf den Betrag nach Rabatt.', 'Zwei Rabatte (z. B. 10 % und 5 %) addieren sich nicht zu 15 %. Man rechnet nacheinander: 0,90 · 0,95 = 0,855, also 14,5 %.'],
      siehe: ['calc-prozent-zins', 'calc-kostenvergleich'] },

    { id: 'calc-break-even', title: 'Break-even-Analyse', keywords: ['break-even', 'break even', 'gewinnschwelle', 'deckungsbeitrag', 'fixkosten', 'variable kosten', 'gewinnschwellenmenge'],
      kurz: 'Der Break-even-Punkt ist die Menge, ab der Erlöse die Gesamtkosten decken: Fixkosten geteilt durch den Deckungsbeitrag je Stück.',
      syntax: 'Deckungsbeitrag je Stück: db = p - k_v\nBreak-even-Menge:         x = K_fix / db\nKosten K(x) = K_fix + k_v * x\nErlös  E(x) = p * x',
      erklaerung: [
        'Fixkosten fallen unabhängig von der Menge an (Miete, Lizenz). Variable Kosten wachsen mit der Menge. Jedes verkaufte Stück trägt den Deckungsbeitrag zur Deckung der Fixkosten bei. Unterhalb der Break-even-Menge entsteht Verlust, darüber Gewinn.',
        'Beispiel: Fixkosten 12 000 EUR, Verkaufspreis 50 EUR, variable Kosten 30 EUR. db = 20 EUR, Break-even-Menge = 12 000 / 20 = 600 Stück. Probe: Erlös 600 · 50 = 30 000 EUR, Kosten 12 000 + 600 · 30 = 30 000 EUR. Bei 800 Stück ergibt sich ein Gewinn von 200 · 20 = 4 000 EUR.'
      ],
      siehe: ['calc-amortisation', 'calc-kostenvergleich'] },

    { id: 'calc-amortisation', title: 'Amortisationsrechnung', keywords: ['amortisation', 'amortisationsdauer', 'payback', 'investition', 'rückfluss', 'wirtschaftlichkeit'],
      kurz: 'Die Amortisationsdauer gibt an, nach welcher Zeit eine Investition durch Einsparungen bzw. Überschüsse zurückgeflossen ist.',
      syntax: 'Amortisationsdauer = Investition / jährlicher Rückfluss\nRückfluss = Einsparung (bzw. Ertrag) - laufende Kosten',
      erklaerung: [
        'Bei der statischen Amortisationsrechnung nimmt man gleichbleibende jährliche Rückflüsse an und ignoriert Zinsen. Je kürzer die Dauer, desto günstiger die Investition. Sie sollte kürzer sein als die Nutzungsdauer.',
        'Beispiel: Neuer Server kostet 24 000 EUR. Er spart jährlich 9 000 EUR Kosten, verursacht aber 1 000 EUR Wartung. Rückfluss 8 000 EUR pro Jahr, Amortisation nach 24 000 / 8 000 = 3 Jahren. Bei 5 Jahren Nutzungsdauer lohnt sich die Anschaffung.',
        'Ungleiche Rückflüsse: kumulieren, bis die Investition erreicht ist, und im letzten Jahr anteilig rechnen.'
      ],
      stolperfallen: ['Die Methode sagt nichts über Gewinne nach der Amortisation aus.'],
      siehe: ['calc-break-even', 'calc-abschreibung'] },

    { id: 'calc-abschreibung', title: 'Lineare Abschreibung', keywords: ['abschreibung', 'afa', 'nutzungsdauer', 'anschaffungskosten', 'restwert', 'linear'],
      kurz: 'Bei linearer Abschreibung wird der Anschaffungswert gleichmäßig auf die Nutzungsdauer verteilt.',
      syntax: 'Jährliche Abschreibung = (Anschaffungskosten - Restwert) / Nutzungsdauer in Jahren',
      erklaerung: [
        'Abschreibung erfasst den jährlichen Wertverlust von Anlagegütern. Die Nutzungsdauer wird vorgegeben (in Aufgaben) oder aus offiziellen Tabellen entnommen. Ohne Restwert ist der Buchwert nach Ablauf 0.',
        'Beispiel: Notebook 3 600 EUR, 3 Jahre Nutzungsdauer, kein Restwert: 3 600 / 3 = 1 200 EUR pro Jahr. Buchwert nach 1 Jahr: 2 400 EUR, nach 2 Jahren: 1 200 EUR.'
      ],
      siehe: ['calc-stundensatz', 'calc-amortisation'] },

    { id: 'calc-nutzwertanalyse', title: 'Nutzwertanalyse', keywords: ['nutzwertanalyse', 'nwa', 'gewichtung', 'bewertungsmatrix', 'entscheidungsmatrix', 'kriterien'],
      kurz: 'Die Nutzwertanalyse bewertet Alternativen nach gewichteten Kriterien. Die Alternative mit der höchsten Gesamtpunktzahl gewinnt.',
      syntax: 'Teilnutzen = Gewichtung * Punkte\nNutzwert = Summe der Teilnutzen',
      erklaerung: [
        'Ablauf: (1) Kriterien festlegen. (2) Kriterien gewichten (Summe 100 % bzw. 1). (3) Jede Alternative je Kriterium mit Punkten bewerten (z. B. 1–5). (4) Gewichtung mal Punkte rechnen und je Alternative summieren. (5) Die höchste Summe entscheidet.',
        'Beispiel: Gewichtung Preis 40 %, Leistung 35 %, Support 25 %. Angebot A hat 3, 4, 5 Punkte: 0,40 · 3 + 0,35 · 4 + 0,25 · 5 = 1,20 + 1,40 + 1,25 = 3,85. Angebot B hat 5, 3, 2 Punkte: 2,00 + 1,05 + 0,50 = 3,55. A hat den höheren Nutzwert.',
        'K.-o.-Kriterien (Muss-Anforderungen) werden vorab geprüft: Wer sie nicht erfüllt, scheidet aus, unabhängig von der Punktzahl. Die Gewichtung ist subjektiv, deshalb sollte sie begründet und dokumentiert werden.'
      ],
      stolperfallen: ['Wenn niedrige Werte besser sind (z. B. Preis), muss die Punktvergabe entsprechend umgekehrt sein: günstiger = mehr Punkte.'],
      siehe: ['calc-kostenvergleich'] },

    { id: 'calc-stundensatz', title: 'Kalkulatorischer Stundensatz', keywords: ['stundensatz', 'maschinenstundensatz', 'kalkulatorisch', 'kostensatz', 'verrechnungssatz'],
      kurz: 'Der Stundensatz verteilt die jährlichen Gesamtkosten einer Maschine oder eines Mitarbeiters auf die Nutzungsstunden.',
      syntax: 'Stundensatz = Jahreskosten / Nutzungsstunden pro Jahr',
      erklaerung: [
        'Zu den Jahreskosten zählen kalkulatorische Abschreibung, Zinsen auf das gebundene Kapital, Energie, Wartung und Raumkosten. Zinsen berechnet man oft auf das durchschnittlich gebundene Kapital, das ist der halbe Anschaffungswert.',
        'Beispiel Maschine: Anschaffung 60 000 EUR, 5 Jahre linear = 12 000 EUR Abschreibung. Zinsen 4 % auf 30 000 EUR = 1 200 EUR. Energie und Wartung 2 800 EUR. Jahreskosten 16 000 EUR. Bei 1 600 Betriebsstunden ergibt sich ein Stundensatz von 10 EUR.',
        'Beispiel Mitarbeiter: Jahreskosten für den Arbeitgeber 60 000 EUR, produktive Stunden 1 500 (ohne Urlaub, Krankheit, Feiertage, Besprechungen): 60 000 / 1 500 = 40 EUR pro Stunde.'
      ],
      stolperfallen: ['Nicht durch alle bezahlten, sondern durch die tatsächlich nutzbaren bzw. produktiven Stunden teilen.'],
      siehe: ['calc-abschreibung', 'calc-kostenvergleich'] },

    { id: 'calc-kostenvergleich', title: 'Kostenvergleich', keywords: ['kostenvergleich', 'kostenvergleichsrechnung', 'kritische menge', 'tco', 'gesamtkosten', 'vergleich'],
      kurz: 'Beim Kostenvergleich werden die Gesamtkosten alternativer Lösungen über einen Zeitraum oder eine Menge gegenübergestellt.',
      syntax: 'Gesamtkosten = Anschaffungskosten + laufende Kosten * Zeit\nKritische Zeit/Menge: K_A(t) = K_B(t) nach t auflösen',
      erklaerung: [
        'Es müssen alle relevanten Kosten einbezogen werden (Total Cost of Ownership): Anschaffung, Betrieb, Wartung, Energie, Lizenzen. Nur so ist ein günstiger Kaufpreis nicht trügerisch.',
        'Beispiel: Lösung A kostet 1 000 EUR Anschaffung und 200 EUR pro Jahr, Lösung B 600 EUR und 350 EUR pro Jahr. Nach 3 Jahren: A = 1 000 + 600 = 1 600 EUR, B = 600 + 1 050 = 1 650 EUR. Kritische Dauer: 1 000 + 200 t = 600 + 350 t, also 400 = 150 t, t ≈ 2,67 Jahre. Ab dann ist A günstiger, davor B.'
      ],
      stolperfallen: ['Der Kostenvergleich berücksichtigt keine Qualität und Leistung. Dafür gibt es die Nutzwertanalyse.'],
      siehe: ['calc-nutzwertanalyse', 'calc-break-even'] }
  ] },

  // ============================================================ Rechnen: Technik
  { id: 'calc-technik', bereich: 'Rechnen', title: 'Technisches Rechnen', entries: [
    { id: 'calc-datenmengen', title: 'Datenmengen: Bit, Byte, KiB, MiB', keywords: ['bit', 'byte', 'kib', 'mib', 'gib', 'kilobyte', 'megabyte', 'umrechnung', 'datenmenge'],
      kurz: '1 Byte = 8 Bit. Dezimalpräfixe (kB, MB, GB) rechnen mit 1000, Binärpräfixe (KiB, MiB, GiB) mit 1024.',
      syntax: '1 Byte = 8 Bit\n1 kB = 1000 Byte       1 KiB = 1024 Byte\n1 MB = 1000 kB         1 MiB = 1024 KiB = 1 048 576 Byte\n1 GB = 1000 MB         1 GiB = 1024 MiB = 1 073 741 824 Byte',
      erklaerung: [
        'Speicher und Dateigrößen werden in Byte angegeben (großes B), Übertragungsraten in Bit pro Sekunde (kleines b, z. B. Mbit/s). Deshalb muss man bei Übertragungsaufgaben mit dem Faktor 8 umrechnen.',
        'Beispiele: 3 MiB = 3 · 1 024 KiB = 3 072 KiB. 2 048 KiB = 2 MiB. 512 Byte = 4 096 Bit. 1 GiB = 1 024 MiB.',
        'Speicherhersteller geben Kapazitäten dezimal an: eine „500 GB“-Platte hat 500 · 10⁹ Byte, das sind etwa 465,7 GiB (500 · 10⁹ / 1 073 741 824), weshalb das Betriebssystem weniger anzeigt.'
      ],
      stolperfallen: ['Bit (b) und Byte (B) nicht verwechseln. Nur den Faktor 8, nicht 10.', 'Aufgabe genau lesen: KB/MB nach Aufgabenangabe oder KiB/MiB. Bei Unklarheit die Annahme dazuschreiben.'],
      siehe: ['calc-uebertragungszeit'] },

    { id: 'calc-uebertragungszeit', title: 'Übertragungszeit berechnen', keywords: ['übertragungszeit', 'übertragungsrate', 'bandbreite', 'download', 'mbit/s', 'datenrate', 'transferzeit'],
      kurz: 'Übertragungszeit = Datenmenge in Bit / Übertragungsrate in Bit pro Sekunde.',
      syntax: 't = Datenmenge / Datenrate\nDatenmenge in Bit = Datenmenge in Byte * 8',
      erklaerung: [
        'Erst beide Größen auf dieselbe Einheit bringen (Bit und Bit/s), dann teilen. Reale Übertragungen sind langsamer als die Nennrate, wegen Protokoll-Overhead. Aufgaben geben dafür oft einen Wirkungsgrad oder eine Effizienz an: dann Zeit = Zeit ohne Overhead / Effizienz.',
        'Beispiel 1: 1 GB (dezimal) über 16 Mbit/s. 1 GB = 1 000 MB = 8 000 Mbit. t = 8 000 / 16 = 500 s ≈ 8 min 20 s.',
        'Beispiel 2: 500 MiB über 100 Mbit/s. Datenmenge = 500 · 1 048 576 Byte · 8 = 4 194 304 000 Bit. t = 4 194 304 000 / 100 000 000 ≈ 41,9 s. Bei 80 % Effizienz: 41,9 / 0,8 ≈ 52,4 s.',
        'Umgekehrt lässt sich die nötige Rate berechnen: Rate = Datenmenge / Zeit, z. B. 60 MB in 10 s benötigen 480 Mbit / 10 s = 48 Mbit/s.'
      ],
      stolperfallen: ['Ergebnis mit Plausibilität prüfen: Eine große Datei mit schneller Leitung darf nicht Stunden brauchen.'],
      siehe: ['calc-datenmengen'] },

    { id: 'calc-subnetting-maske', title: 'IPv4: Netzmaske und Präfixlänge', keywords: ['subnetzmaske', 'netzmaske', 'cidr', 'präfix', 'slash', 'subnetting', 'ipv4'],
      kurz: 'Die Präfixlänge /n gibt an, wie viele der 32 Bit einer IPv4-Adresse das Netz bezeichnen. Die Netzmaske hat diese n Bits als Einsen.',
      syntax: 'Präfix /n -> n Einsen, dann 32-n Nullen\n/24 = 255.255.255.0\n/26 = 255.255.255.192',
      erklaerung: [
        'Das letzte betroffene Oktett berechnet man aus der Anzahl der Netzbits in diesem Oktett: 1 Bit = 128, 2 Bit = 192, 3 Bit = 224, 4 Bit = 240, 5 Bit = 248, 6 Bit = 252, 7 Bit = 254.',
        'Beispiel /26: 26 = 8 + 8 + 8 + 2, also 255.255.255 und im letzten Oktett 2 Einsen = 11000000 = 192. Ergebnis 255.255.255.192. Beispiel /20: 8 + 8 + 4, also 255.255.240.0.',
        'Die Schrittweite (Blockgröße) im relevanten Oktett ist 256 minus Maskenwert: bei 192 sind es 64, bei 240 sind es 16.'
      ],
      beispiel: [{ code: '/25 -> 255.255.255.128  (Block 128)\n/26 -> 255.255.255.192  (Block 64)\n/27 -> 255.255.255.224  (Block 32)\n/28 -> 255.255.255.240  (Block 16)\n/29 -> 255.255.255.248  (Block 8)\n/30 -> 255.255.255.252  (Block 4)' }],
      siehe: ['calc-subnetting-hosts', 'calc-subnetting-adressen'] },

    { id: 'calc-subnetting-hosts', title: 'IPv4: Anzahl der Hosts', keywords: ['hosts', 'anzahl hosts', 'hostbits', 'nutzbare adressen', 'adressen pro netz'],
      kurz: 'In einem Netz mit Präfix /n gibt es 2^(32-n) Adressen. Nutzbar für Geräte sind 2^(32-n) - 2.',
      syntax: 'Hosts = 2^(32 - n) - 2',
      erklaerung: [
        'Die erste Adresse ist die Netzadresse, die letzte die Broadcastadresse. Beide können keinem Gerät zugewiesen werden, daher minus 2.',
        'Beispiele: /24: 2⁸ - 2 = 254. /26: 2⁶ - 2 = 62. /28: 2⁴ - 2 = 14. /30: 2² - 2 = 2 (typisch für Verbindung zweier Router). Zum Planen: Wie viele Hosts werden benötigt? Kleinste Zweierpotenz suchen, die Hosts + 2 abdeckt. Für 50 Geräte: 50 + 2 = 52, 2⁶ = 64, also 6 Hostbits und damit /26.'
      ],
      stolperfallen: ['Den Abzug von 2 nicht vergessen. Ein /32 hat nur eine einzelne Adresse, ein /31 ist ein Sonderfall für Punkt-zu-Punkt-Verbindungen.'],
      siehe: ['calc-subnetting-maske', 'calc-subnetting-adressen'] },

    { id: 'calc-subnetting-adressen', title: 'IPv4: Netz- und Broadcastadresse, Aufteilung', keywords: ['netzadresse', 'broadcastadresse', 'broadcast', 'subnetz aufteilen', 'vlsm', 'adressbereich'],
      kurz: 'Netzadresse: alle Hostbits 0. Broadcast: alle Hostbits 1. Dazwischen liegen die nutzbaren Hostadressen.',
      erklaerung: [
        'Vorgehen mit Blockgröße: Im relevanten Oktett das größte Vielfache der Blockgröße finden, das kleiner oder gleich dem Adresswert ist. Das ist die Netzadresse. Die Broadcastadresse ist Netzadresse + Blockgröße - 1. Erste Host-Adresse = Netz + 1, letzte = Broadcast - 1.',
        'Beispiel: 192.168.10.77/26. Blockgröße 64 (Maske .192). Vielfache von 64: 0, 64, 128, 192. Die 77 liegt im Block ab 64. Netzadresse 192.168.10.64, Broadcast 192.168.10.127, Hosts 192.168.10.65 bis 192.168.10.126 (62 Hosts).',
        'Aufteilen in Subnetze: 192.168.1.0/24 soll in 4 gleich große Netze geteilt werden. 4 = 2², also 2 Bit mehr, Präfix /26. Netze: 192.168.1.0/26, 192.168.1.64/26, 192.168.1.128/26, 192.168.1.192/26, je 62 Hosts.',
        'Mit verschieden großen Netzen (VLSM) beginnt man mit dem größten Bedarf und vergibt die Adressbereiche nacheinander ohne Überschneidung.'
      ],
      beispiel: [{ code: '10.0.5.200/27\nBlockgröße 32, Vielfache: ... 192, 224\n200 liegt in 192 bis 223\nNetz:      10.0.5.192\nBroadcast: 10.0.5.223\nHosts:     10.0.5.193 bis 10.0.5.222 (30)' }],
      stolperfallen: ['Bei Präfixen über /24 verändert sich nur das vierte Oktett, bei /16 bis /23 das dritte Oktett (Blockgröße dort z. B. /22 = 4 im dritten Oktett).'],
      siehe: ['calc-subnetting-maske', 'calc-subnetting-hosts'] },

    { id: 'calc-energie-leistung', title: 'Energie, Leistung und Stromkosten', keywords: ['leistung', 'energie', 'kwh', 'watt', 'stromkosten', 'wirkungsgrad', 'pue', 'verbrauch'],
      kurz: 'Energie = Leistung · Zeit. Ein Gerät mit 1 kW, das 1 Stunde läuft, verbraucht 1 kWh. Die Kosten ergeben sich aus kWh · Preis.',
      syntax: 'E = P * t              (kWh = kW * h)\nKosten = E * Preis pro kWh\nWirkungsgrad η = Nutzleistung / aufgenommene Leistung\nPUE = Gesamtenergie Rechenzentrum / Energie IT-Geräte',
      erklaerung: [
        'Leistung P in Watt (W) oder Kilowatt (kW): 1 kW = 1 000 W. Energie in Kilowattstunden (kWh). Zeit in Stunden, sonst umrechnen.',
        'Beispiel: Ein PC nimmt 150 W auf, läuft 8 h am Tag an 220 Tagen im Jahr. E = 0,15 kW · 8 h · 220 = 264 kWh. Bei 0,30 EUR/kWh: 264 · 0,30 = 79,20 EUR pro Jahr.',
        'Wirkungsgrad: Ein Netzteil mit 80 % Wirkungsgrad gibt 400 W ab und nimmt 400 / 0,8 = 500 W auf, 100 W werden als Wärme verloren. Kühlung zählt im Rechenzentrum zusätzlich mit: PUE = 150 kW / 100 kW = 1,5 bedeutet, dass zu je 1 kWh IT weitere 0,5 kWh für Kühlung und Infrastruktur anfallen.'
      ],
      stolperfallen: ['W und Wh nicht verwechseln: Watt ist Leistung, Wattstunde Energie.', 'Wenn der Preis in Cent pro kWh angegeben ist, am Ende in Euro umrechnen.'],
      siehe: ['calc-kostenvergleich', 'calc-prozent-zins'] }
  ] },

  // ============================================================ Prüfung
  { id: 'exam-arbeitsweise', bereich: 'Prüfung', title: 'Arbeitsweise in der Prüfung', entries: [
    { id: 'exam-operatoren', title: 'Operatoren in Aufgaben', keywords: ['operatoren', 'nennen', 'beschreiben', 'erläutern', 'begründen', 'berechnen', 'ergänzen', 'aufgabenstellung'],
      kurz: 'Das Verb in der Aufgabenstellung (Operator) legt fest, wie ausführlich und in welcher Form du antworten sollst.',
      erklaerung: [
        'Nennen: Stichwörter oder kurze Angaben, keine Erklärung nötig. Die Anzahl der geforderten Nennungen genau einhalten.',
        'Beschreiben: Sachverhalt oder Vorgehen in eigenen Worten und in sinnvoller Reihenfolge darstellen, ohne zu bewerten.',
        'Erläutern: Beschreiben und zusätzlich mit Gründen oder einem Beispiel verständlich machen.',
        'Begründen: Eine Aussage mit einem stichhaltigen Argument stützen (weil, deshalb, daher).',
        'Berechnen: Rechenweg mit Formel, Einsetzen und Ergebnis mit Einheit darstellen.',
        'Ergänzen: Fehlende Teile in einer vorgegebenen Vorlage (Tabelle, Diagramm, Code) einfügen.',
        'Weitere häufige Operatoren sind vergleichen (Gemeinsamkeiten und Unterschiede), erstellen bzw. entwerfen (selbst anfertigen, z. B. ein Diagramm) und beurteilen bzw. bewerten (mit Kriterien zu einem Urteil kommen). Was genau erwartet wird, kann sich je nach Aufgabe unterscheiden, deshalb immer auch den Aufgabentext und die Punktzahl beachten.'
      ],
      stolperfallen: ['Bei „nennen“ keine langen Erklärungen schreiben, sie kosten Zeit. Bei „erläutern“ oder „begründen“ reicht ein bloßes Stichwort nicht.'],
      siehe: ['exam-antworten-formulieren', 'exam-zeitmanagement'] },

    { id: 'exam-antworten-formulieren', title: 'Antworten formulieren', keywords: ['antwort', 'formulieren', 'punkte', 'stichpunkte', 'fachbegriffe', 'konkret'],
      kurz: 'Kurz, konkret und passend zur Aufgabe antworten. Gefragte Anzahl beachten und Fachbegriffe richtig einsetzen.',
      erklaerung: [
        'Als Faustregel gilt: Die Punktzahl gibt einen Hinweis darauf, wie viele Aspekte oder Schritte erwartet werden. Bei 4 Punkten für „Nennen Sie zwei Vorteile und begründen Sie“ sollten es zwei Vorteile mit je einer Begründung sein.',
        'Beziehe dich auf das Szenario der Aufgabe (Firma, System, Zahlen) statt allgemeiner Lehrbuchsätze. Schreibe klar, wo eine Antwort beginnt und endet, und trenne mehrere Punkte deutlich, z. B. durch Aufzählung.',
        'Wenn nur eine bestimmte Anzahl verlangt ist, nur diese aufschreiben. Nicht alle Möglichkeiten aufzählen und hoffen, dass eine passt.'
      ],
      stolperfallen: ['Aussagen wie „ist besser“ ohne Kriterium oder Begründung.'],
      siehe: ['exam-operatoren', 'exam-rechenaufgaben'] },

    { id: 'exam-rechenaufgaben', title: 'Rechenaufgaben sauber lösen', keywords: ['rechenweg', 'rechenaufgabe', 'einheit', 'runden', 'formel', 'ergebnis', 'folgefehler'],
      kurz: 'Formel notieren, Werte mit Einheit einsetzen, Ergebnis mit Einheit angeben und auf Plausibilität prüfen.',
      erklaerung: [
        'Sinnvoller Ablauf: (1) Gegebene und gesuchte Größen herausschreiben. (2) Formel aufschreiben. (3) Werte mit Einheiten einsetzen. (4) Ausrechnen. (5) Ergebnis mit Einheit und einem Antwortsatz notieren. Ein nachvollziehbarer Rechenweg kann bei einem Folgefehler noch Teilpunkte bringen.',
        'Einheiten früh vereinheitlichen (Bit und Byte, Minuten und Stunden, Watt und Kilowatt). Rundung: erst am Ende runden und Vorgaben der Aufgabe zur Genauigkeit beachten, bei Geldbeträgen meist auf zwei Nachkommastellen.',
        'Prüfen, ob das Ergebnis plausibel ist: Ein Rabatt darf den Preis nicht erhöhen, ein Anteil liegt zwischen 0 und 100 %, die Anzahl nutzbarer Hosts ist immer kleiner als die Adressanzahl.'
      ],
      siehe: ['calc-prozent-zins', 'calc-datenmengen', 'exam-zeitmanagement'] },

    { id: 'exam-zeitmanagement', title: 'Zeit einteilen', keywords: ['zeit', 'zeitmanagement', 'zeiteinteilung', 'reihenfolge', 'überblick', 'prüfungsstrategie'],
      kurz: 'Erst alles überfliegen, dann Aufgaben nach Punkten und Sicherheit bearbeiten und am Ende Zeit zum Kontrollieren lassen.',
      erklaerung: [
        'Verschaffe dir zu Beginn einen Überblick über alle Aufgaben. Verteile die Zeit grob nach Punkten: Die Gesamtdauer geteilt durch die Gesamtpunktzahl ergibt die ungefähre Zeit pro Punkt.',
        'Beginne mit Aufgaben, bei denen du sicher bist, und lasse zeitaufwendige oder unklare zurück. Hänge nicht zu lange an einer Aufgabe fest: Markiere sie und kehre später zurück. Leere Antworten bringen sicher keine Punkte, ein begründeter Ansatz vielleicht schon.',
        'Plane die letzten Minuten zum Kontrollieren ein: Wurde jede Teilaufgabe beantwortet, stimmen Einheiten, sind Zahlen richtig übertragen? Die genauen Prüfungsbereiche, die Dauer und zugelassene Hilfsmittel stehen in den Unterlagen deiner Kammer und müssen dort nachgelesen werden.'
      ],
      stolperfallen: ['Nicht die gesamte Zeit für eine schwierige Aufgabe mit wenigen Punkten aufwenden.'],
      siehe: ['exam-operatoren', 'exam-rechenaufgaben'] }
  ] }
]);

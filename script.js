"use strict";

const QUESTION_SECONDS = 20;
const ROUND_QUESTION_COUNT = 20;
const FEEDBACK_DELAY_MS = 5000;
const ANSWER_LETTERS = ["A", "B", "C", "D"];

const QUESTION_BANK = Object.freeze([
  {
    id: "rasse-islaender",
    category: "Pferderassen",
    question: "Welche zusätzliche Gangart ist besonders typisch für Islandpferde?",
    answers: ["Tölt", "Passage", "Terre-à-terre", "Spanischer Schritt"],
    correctIndex: 0,
    explanation: "Der taktreine Viertakt Tölt ist eine natürliche Spezialgangart vieler Islandpferde."
  },
  {
    id: "rasse-shetland",
    category: "Pferderassen",
    question: "Woher stammt das Shetlandpony ursprünglich?",
    answers: ["Von den Shetlandinseln", "Aus der Camargue", "Aus Andalusien", "Aus dem Schwarzwald"],
    correctIndex: 0,
    explanation: "Die robuste Ponyrasse stammt von den rauen Shetlandinseln nördlich von Schottland."
  },
  {
    id: "rasse-haflinger",
    category: "Pferderassen",
    question: "Mit welcher Region ist der Ursprung des Haflingers verbunden?",
    answers: ["Südtirol", "Normandie", "Friesland", "Wales"],
    correctIndex: 0,
    explanation: "Der Haflinger ist nach dem Südtiroler Ort Hafling benannt."
  },
  {
    id: "rasse-friese",
    category: "Pferderassen",
    question: "Für welche Fellfarbe ist der Friese besonders bekannt?",
    answers: ["Rappe", "Palomino", "Falbe", "Schimmel"],
    correctIndex: 0,
    explanation: "Friesen treten fast ausschließlich als Rappen mit schwarzem Fell auf."
  },
  {
    id: "rasse-araber",
    category: "Pferderassen",
    question: "Welches Kopfmerkmal gilt als typisch für viele Arabische Vollblüter?",
    answers: ["Ein konkaves Profil", "Ein stark konvexes Profil", "Sehr kleine Nüstern", "Ein ausgeprägter Ramskopf"],
    correctIndex: 0,
    explanation: "Der feine Kopf mit leicht konkavem Nasenprofil wird oft als Araberknick bezeichnet."
  },
  {
    id: "haltung-sozialkontakt",
    category: "Haltung",
    question: "Warum ist regelmäßiger Kontakt zu Artgenossen für Pferde so wichtig?",
    answers: ["Pferde sind ausgeprägte Herdentiere", "Pferde können nur in Gruppen schlafen", "Pferde fressen allein grundsätzlich nicht", "Nur andere Pferde halten Fliegen fern"],
    correctIndex: 0,
    explanation: "Sozialkontakt gehört zu den Grundbedürfnissen des Herdentiers Pferd."
  },
  {
    id: "haltung-raufutter",
    category: "Haltung",
    question: "Was sollte die Grundlage einer pferdegerechten Fütterung bilden?",
    answers: ["Raufutter wie Heu", "Große Mengen Kraftfutter", "Obst und Brot", "Mineralleckerlis"],
    correctIndex: 0,
    explanation: "Raufutter beschäftigt den Verdauungstrakt lange und entspricht dem natürlichen Fressverhalten."
  },
  {
    id: "haltung-wasser",
    category: "Haltung",
    question: "Was muss einem Pferd jederzeit in ausreichender Menge zur Verfügung stehen?",
    answers: ["Sauberes Trinkwasser", "Kraftfutter", "Stroh als Einstreu", "Ein Salzstein mit Zucker"],
    correctIndex: 0,
    explanation: "Frisches, sauberes Wasser ist unverzichtbar und muss regelmäßig kontrolliert werden."
  },
  {
    id: "haltung-stallklima",
    category: "Haltung",
    question: "Was zeichnet ein gutes Stallklima besonders aus?",
    answers: ["Frische Luft ohne scharfe Zugluft", "Möglichst warme, stehende Luft", "Geschlossene Fenster im Winter", "Ein deutlicher Ammoniakgeruch"],
    correctIndex: 0,
    explanation: "Gute Lüftung schützt die Atemwege; direkte, scharfe Zugluft sollte dennoch vermieden werden."
  },
  {
    id: "pflege-hufe",
    category: "Pflege",
    question: "Warum sollten die Hufe vor und nach dem Reiten ausgekratzt werden?",
    answers: ["Um Steine und Verletzungen früh zu entdecken", "Damit das Horn heller wird", "Um den Huf größer zu machen", "Damit das Pferd schneller läuft"],
    correctIndex: 0,
    explanation: "Beim Auskratzen lassen sich Fremdkörper, lose Eisen und Veränderungen am Huf erkennen."
  },
  {
    id: "pflege-striegel",
    category: "Pflege",
    question: "Wo wird ein harter Striegel normalerweise nicht eingesetzt?",
    answers: ["An Kopf und knochigen Beinen", "An der bemuskelten Kruppe", "Am Hals", "An der Schulter"],
    correctIndex: 0,
    explanation: "Empfindliche und knochige Bereiche werden mit weicheren Bürsten gepflegt."
  },
  {
    id: "pflege-hufschmied",
    category: "Pflege",
    question: "In welchem Abstand werden Pferdehufe typischerweise vom Hufprofi kontrolliert und bearbeitet?",
    answers: ["Etwa alle 6 bis 8 Wochen", "Einmal im Jahr", "Alle zwei Tage", "Nur wenn das Pferd lahmt"],
    correctIndex: 0,
    explanation: "Das genaue Intervall ist individuell, häufig liegt es ungefähr bei sechs bis acht Wochen."
  },
  {
    id: "pflege-abschrittten",
    category: "Pflege",
    question: "Was ist nach anstrengender Arbeit mit einem stark verschwitzten Pferd sinnvoll?",
    answers: ["Ruhig abschreiten und vor Auskühlung schützen", "Sofort unbewegt in die Box stellen", "Direkt eine große Kraftfutterportion geben", "Ohne Pause erneut galoppieren"],
    correctIndex: 0,
    explanation: "Ruhiges Abkühlen unterstützt Kreislauf und Muskulatur; nasses Fell darf nicht auskühlen."
  },
  {
    id: "anatomie-strahl",
    category: "Anatomie",
    question: "Wo befindet sich der Strahl des Pferdehufs?",
    answers: ["An der Unterseite des Hufs", "Zwischen den Ohren", "Am Sprunggelenk", "Unter der Mähne"],
    correctIndex: 0,
    explanation: "Der elastische, keilförmige Strahl liegt mittig an der Unterseite des Hufs."
  },
  {
    id: "anatomie-widerrist",
    category: "Anatomie",
    question: "Wo liegt der Widerrist?",
    answers: ["Am Übergang von Hals zu Rücken", "Zwischen Maul und Nüstern", "Unterhalb des Sprunggelenks", "An der Schweifrübe"],
    correctIndex: 0,
    explanation: "Der Widerrist liegt über den Schulterblättern am Übergang von Hals zu Rücken."
  },
  {
    id: "anatomie-puls",
    category: "Anatomie",
    question: "Welcher Ruhepuls ist für ein gesundes erwachsenes Pferd ungefähr normal?",
    answers: ["28 bis 44 Schläge pro Minute", "5 bis 10 Schläge pro Minute", "80 bis 110 Schläge pro Minute", "150 bis 180 Schläge pro Minute"],
    correctIndex: 0,
    explanation: "Bei erwachsenen Pferden liegt der Ruhepuls meist ungefähr zwischen 28 und 44 Schlägen pro Minute."
  },
  {
    id: "anatomie-verdauung",
    category: "Anatomie",
    question: "Welche Fütterung passt besonders gut zum Verdauungssystem des Pferdes?",
    answers: ["Viele kleine Raufutterportionen", "Eine einzige große Mahlzeit", "Lange tägliche Fresspausen", "Vor allem zuckerreiche Snacks"],
    correctIndex: 0,
    explanation: "Der relativ kleine Magen und die lange natürliche Fressdauer sprechen für viele kleine Raufutteraufnahmen."
  },
  {
    id: "anatomie-gallenblase",
    category: "Anatomie",
    question: "Welches Organ besitzen Pferde im Gegensatz zum Menschen nicht?",
    answers: ["Eine Gallenblase", "Eine Leber", "Zwei Nieren", "Eine Bauchspeicheldrüse"],
    correctIndex: 0,
    explanation: "Pferde haben keine Gallenblase; die Galle fließt kontinuierlich in den Dünndarm."
  },
  {
    id: "reiten-helm",
    category: "Reiten",
    question: "Welcher Ausrüstungsgegenstand schützt beim Reiten vor allem den Kopf?",
    answers: ["Ein passender Reithelm", "Bandagen", "Eine Schabracke", "Eine Gerte"],
    correctIndex: 0,
    explanation: "Ein korrekt sitzender, geprüfter Reithelm senkt das Risiko schwerer Kopfverletzungen."
  },
  {
    id: "reiten-leichttraben",
    category: "Reiten",
    question: "Wann steht man beim Leichttraben auf dem richtigen Fuß üblicherweise auf?",
    answers: ["Wenn die äußere Schulter vorgeht", "Wenn beide Hinterbeine gleichzeitig auffußen", "Nur in jeder dritten Trabphase", "Wenn die innere Schulter zurückgeht"],
    correctIndex: 0,
    explanation: "Die bekannte Merkhilfe lautet: Aufstehen, wenn die äußere Schulter vorgeht."
  },
  {
    id: "reiten-halbe-parade",
    category: "Reiten",
    question: "Wozu dient eine halbe Parade?",
    answers: ["Aufmerksam machen, ausbalancieren und Übergänge vorbereiten", "Das Pferd dauerhaft anhalten", "Den Sattelgurt lockern", "Die Zügel vollständig wegwerfen"],
    correctIndex: 0,
    explanation: "Halbe Paraden stimmen treibende, verwahrende und nachgebende Hilfen fein aufeinander ab."
  },
  {
    id: "reiten-aufstiegshilfe",
    category: "Reiten",
    question: "Warum ist eine Aufstiegshilfe beim Aufsitzen oft sinnvoll?",
    answers: ["Sie entlastet Pferderücken und Sattel", "Sie ersetzt das Nachgurten", "Sie verlängert die Steigbügel automatisch", "Sie macht einen Reithelm überflüssig"],
    correctIndex: 0,
    explanation: "Ein Aufstieg vom Block reduziert den seitlichen Zug an Sattel und Pferderücken."
  },
  {
    id: "verhalten-ohren",
    category: "Verhalten",
    question: "Was können flach angelegte Ohren beim Pferd signalisieren?",
    answers: ["Unwohlsein, Ärger oder eine Warnung", "Immer tiefe Entspannung", "Sicheren Hunger", "Dass das Pferd eingeschlafen ist"],
    correctIndex: 0,
    explanation: "Angelegte Ohren sind ein wichtiges Warnsignal; der gesamte Körperausdruck liefert den Kontext."
  },
  {
    id: "verhalten-fellkraulen",
    category: "Verhalten",
    question: "Welche Funktion hat gegenseitiges Fellkraulen unter Pferden häufig?",
    answers: ["Es stärkt soziale Bindungen", "Es ersetzt vollständig die Fellpflege", "Es dient nur dem Futterneid", "Es ist immer ein Rangordnungskampf"],
    correctIndex: 0,
    explanation: "Gegenseitige Fellpflege kann Wohlbefinden fördern und soziale Beziehungen festigen."
  },
  {
    id: "verhalten-flehmen",
    category: "Verhalten",
    question: "Wozu dient das Flehmen mit hochgezogener Oberlippe?",
    answers: ["Der genaueren Analyse von Gerüchen", "Der Kühlung der Schneidezähne", "Dem Schärfen des Gehörs", "Dem Abschrecken von Fliegen"],
    correctIndex: 0,
    explanation: "Beim Flehmen gelangen Duftstoffe zum Jacobsonschen Organ und können genauer untersucht werden."
  },
  {
    id: "verhalten-sichtfeld",
    category: "Verhalten",
    question: "Warum haben Pferde ein besonders weites Sichtfeld?",
    answers: ["Ihre Augen liegen seitlich am Kopf", "Ihre Pupillen sind rund", "Sie können die Augen unabhängig schließen", "Ihre Mähne spiegelt Licht"],
    correctIndex: 0,
    explanation: "Als Fluchttiere überblicken Pferde durch die seitliche Augenlage fast ihre gesamte Umgebung."
  },
  {
    id: "allgemein-tragzeit",
    category: "Allgemeines Wissen",
    question: "Wie lange dauert die Trächtigkeit einer Stute durchschnittlich?",
    answers: ["Etwa 11 Monate", "Etwa 3 Monate", "Etwa 6 Monate", "Etwa 18 Monate"],
    correctIndex: 0,
    explanation: "Die mittlere Tragezeit liegt bei rund 340 Tagen, also ungefähr elf Monaten."
  },
  {
    id: "allgemein-pflanzenfresser",
    category: "Allgemeines Wissen",
    question: "Zu welcher Ernährungsgruppe gehört das Pferd?",
    answers: ["Pflanzenfresser", "Allesfresser", "Fleischfresser", "Insektenfresser"],
    correctIndex: 0,
    explanation: "Pferde sind spezialisierte Pflanzenfresser mit einem empfindlichen Verdauungssystem."
  },
  {
    id: "allgemein-stockmass",
    category: "Allgemeines Wissen",
    question: "An welcher Stelle wird das Stockmaß eines Pferdes gemessen?",
    answers: ["Am höchsten Punkt des Widerrists", "An der Spitze der Ohren", "Von der Brust bis zur Schweifrübe", "Am höchsten Punkt der Kruppe"],
    correctIndex: 0,
    explanation: "Die Körpergröße wird vom Boden senkrecht bis zum höchsten Punkt des Widerrists gemessen."
  },
  {
    id: "allgemein-wallach",
    category: "Allgemeines Wissen",
    question: "Was bezeichnet man als Wallach?",
    answers: ["Ein kastriertes männliches Pferd", "Ein weibliches Pferd mit Fohlen", "Ein Pferd unter einem Jahr", "Ein ungezügeltes Wildpferd"],
    correctIndex: 0,
    explanation: "Ein Wallach ist ein kastriertes männliches Pferd."
  },
  {
    id: "rasse-lipizzaner",
    category: "Pferderassen",
    question: "Welche Pferderasse ist eng mit der Spanischen Hofreitschule in Wien verbunden?",
    answers: ["Lipizzaner", "Trakehner", "Dülmener", "Norweger"],
    correctIndex: 0,
    explanation: "Die Spanische Hofreitschule ist besonders für ihre Ausbildung weißer Lipizzaner bekannt."
  },
  {
    id: "rasse-quarterhorse",
    category: "Pferderassen",
    question: "Worauf bezieht sich der Name des American Quarter Horse?",
    answers: ["Auf seine Schnelligkeit über eine Viertelmeile", "Auf vier weiße Beine", "Auf vier natürliche Gangarten", "Auf ein Viertel Vollblutanteil"],
    correctIndex: 0,
    explanation: "Die Rasse wurde für ihre Sprintfähigkeit über die Quarter Mile, also eine Viertelmeile, berühmt."
  },
  {
    id: "rasse-fjord",
    category: "Pferderassen",
    question: "Welches Merkmal ist für viele Norwegische Fjordpferde typisch?",
    answers: ["Eine zweifarbige Stehmähne mit dunklem Aalstrich", "Eine lange schwarze Lockenmähne", "Ein vollständig geflecktes Fell", "Ein stets weißer Schweif"],
    correctIndex: 0,
    explanation: "Fjordpferde sind meist falb und tragen einen dunklen Aalstrich sowie eine markante zweifarbige Mähne."
  },
  {
    id: "rasse-appaloosa",
    category: "Pferderassen",
    question: "Für welches äußere Merkmal ist der Appaloosa besonders bekannt?",
    answers: ["Verschiedene Tigerscheckmuster", "Ausschließlich schwarzes Fell", "Eine natürliche Stehmähne", "Dichtes Langhaar an allen vier Fesseln"],
    correctIndex: 0,
    explanation: "Appaloosas sind besonders für ihre vielfältigen Tigerscheckzeichnungen bekannt."
  },
  {
    id: "rasse-clydesdale",
    category: "Pferderassen",
    question: "Aus welchem Land stammt das Clydesdale ursprünglich?",
    answers: ["Schottland", "Portugal", "Island", "Ungarn"],
    correctIndex: 0,
    explanation: "Das kräftige Kaltblut stammt aus dem Tal des River Clyde in Schottland."
  },
  {
    id: "rasse-hannoveraner",
    category: "Pferderassen",
    question: "Zu welcher Pferdegruppe gehört der Hannoveraner?",
    answers: ["Warmblut", "Kaltblut", "Gangpony", "Wildpferd"],
    correctIndex: 0,
    explanation: "Der Hannoveraner ist eine bekannte deutsche Warmblutrasse für den Reitsport."
  },
  {
    id: "rasse-camargue",
    category: "Pferderassen",
    question: "In welcher Landschaft sind Camargue-Pferde beheimatet?",
    answers: ["Im südfranzösischen Rhône-Delta", "Im norwegischen Fjordland", "In der mongolischen Steppe", "Im schottischen Hochland"],
    correctIndex: 0,
    explanation: "Camargue-Pferde stammen aus der gleichnamigen Feuchtlandschaft im Süden Frankreichs."
  },
  {
    id: "rasse-achaltekiner",
    category: "Pferderassen",
    question: "Aus welchem heutigen Land stammt der Achal-Tekkiner?",
    answers: ["Turkmenistan", "Irland", "Kanada", "Belgien"],
    correctIndex: 0,
    explanation: "Der ausdauernde Achal-Tekkiner ist eng mit Turkmenistan verbunden."
  },
  {
    id: "rasse-falabella",
    category: "Pferderassen",
    question: "Wofür ist das Falabella besonders bekannt?",
    answers: ["Als sehr kleine Miniaturpferderasse", "Als schwerstes Kaltblut", "Als fünf-gängiges Rennpferd", "Als ausschließlich wild lebende Rasse"],
    correctIndex: 0,
    explanation: "Das aus Argentinien stammende Falabella zählt zu den kleinsten Pferderassen."
  },
  {
    id: "rasse-shire",
    category: "Pferderassen",
    question: "Für welche ursprüngliche Aufgabe wurde das Shire Horse vor allem gezüchtet?",
    answers: ["Für schwere Zug- und Lastarbeit", "Für kurze Windhundrennen", "Für die Rentierhaltung", "Für das Hüten von Schafen"],
    correctIndex: 0,
    explanation: "Das englische Shire Horse ist ein mächtiges Kaltblut und wurde besonders als Zugpferd genutzt."
  },
  {
    id: "haltung-futterwechsel",
    category: "Haltung",
    question: "Wie sollte eine größere Futterumstellung erfolgen?",
    answers: ["Schrittweise über mehrere Tage", "Vollständig von einer Mahlzeit zur nächsten", "Nur nach einer langen Fresspause", "Ausschließlich nachts"],
    correctIndex: 0,
    explanation: "Langsame Futterwechsel geben der empfindlichen Darmflora Zeit, sich anzupassen."
  },
  {
    id: "haltung-weidezaun",
    category: "Haltung",
    question: "Welche Eigenschaft ist bei einem Pferdeweidezaun besonders wichtig?",
    answers: ["Er ist sicher, stabil und gut sichtbar", "Er besteht aus losem Stacheldraht", "Er ist möglichst niedrig", "Er hat scharfkantige Metallteile"],
    correctIndex: 0,
    explanation: "Ein gut sichtbarer, intakter und pferdegerechter Zaun verringert das Verletzungs- und Ausbruchsrisiko."
  },
  {
    id: "haltung-einstreu",
    category: "Haltung",
    question: "Wie sollte eine geeignete Einstreu im Stall beschaffen sein?",
    answers: ["Sauber, trocken und möglichst staubarm", "Dauerhaft feucht und warm", "Mit starkem Ammoniakgeruch", "Vollständig schimmelig"],
    correctIndex: 0,
    explanation: "Trockene und staubarme Einstreu unterstützt Huf-, Haut- und Atemwegsgesundheit."
  },
  {
    id: "haltung-unterstand",
    category: "Haltung",
    question: "Wozu dient ein geeigneter Unterstand auf der Weide?",
    answers: ["Als Schutz vor Sonne, Wind und Niederschlag", "Als Ersatz für Trinkwasser", "Zum Lagern von Stacheldraht", "Zum vollständigen Ausschluss von Bewegung"],
    correctIndex: 0,
    explanation: "Pferde benötigen je nach Witterung Zugang zu einem wirksamen Schutzbereich."
  },
  {
    id: "haltung-futterplaetze",
    category: "Haltung",
    question: "Warum sind in einer Gruppe mehrere gut verteilte Fressplätze sinnvoll?",
    answers: ["Sie verringern Konkurrenz und ermöglichen rangniederen Pferden Zugang", "Sie machen Trinkwasser überflüssig", "Sie verhindern jedes Sozialverhalten", "Sie erhöhen absichtlich den Futterneid"],
    correctIndex: 0,
    explanation: "Ausreichend Abstand und genügend Fressplätze reduzieren Konflikte in der Herde."
  },
  {
    id: "haltung-giftpflanzen",
    category: "Haltung",
    question: "Was ist bei Giftpflanzen auf einer Pferdeweide zu tun?",
    answers: ["Sie fachgerecht erkennen und entfernen beziehungsweise den Bereich sperren", "Sie als Leckerli anbieten", "Sie unter das Kraftfutter mischen", "Sie nur mit Wasser besprühen"],
    correctIndex: 0,
    explanation: "Giftpflanzen müssen sicher beseitigt oder für Pferde unzugänglich gemacht werden."
  },
  {
    id: "haltung-traenke",
    category: "Haltung",
    question: "Warum müssen Tränken regelmäßig kontrolliert und gereinigt werden?",
    answers: ["Damit Wasserfluss und Hygiene gewährleistet bleiben", "Damit das Wasser süßer schmeckt", "Damit Pferde weniger trinken", "Damit sich Algen schneller vermehren"],
    correctIndex: 0,
    explanation: "Nur eine funktionierende, saubere Tränke stellt zuverlässig frisches Wasser bereit."
  },
  {
    id: "haltung-heuqualitaet",
    category: "Haltung",
    question: "Welches Heu sollte nicht verfüttert werden?",
    answers: ["Schimmeliges oder deutlich muffig riechendes Heu", "Sauberes, angenehm riechendes Heu", "Strukturreiches, trocken gelagertes Heu", "Zur Ration passendes analysiertes Heu"],
    correctIndex: 0,
    explanation: "Schimmel und Verderb können Atemwege und Verdauung gefährden."
  },
  {
    id: "haltung-bewegung",
    category: "Haltung",
    question: "Warum gehört regelmäßige freie Bewegung zu pferdegerechter Haltung?",
    answers: ["Sie unterstützt Körper, Verdauung und natürliches Verhalten", "Sie ersetzt jedes Raufutter", "Sie verhindert vollständig das Schlafen", "Sie macht Hufpflege unnötig"],
    correctIndex: 0,
    explanation: "Pferde sind Lauftiere; tägliche Bewegung fördert Gesundheit und Wohlbefinden."
  },
  {
    id: "haltung-eingliederung",
    category: "Haltung",
    question: "Wie lässt sich ein neues Pferd möglichst umsichtig in eine Herde eingliedern?",
    answers: ["Schrittweise mit Beobachtung und zunächst sicherem Kontakt über den Zaun", "Unbeobachtet und sofort auf engem Raum", "Erst nach mehrtägigem Wasserentzug", "Durch dauerhaftes vollständiges Isolieren"],
    correctIndex: 0,
    explanation: "Eine kontrollierte, schrittweise Zusammenführung vermindert Stress und Verletzungsrisiken."
  },
  {
    id: "pflege-kardaetsche",
    category: "Pflege",
    question: "Wofür wird eine Kardätsche hauptsächlich verwendet?",
    answers: ["Zum Entfernen von feinem Staub aus dem Fell", "Zum Ausschneiden der Hufsohle", "Zum Kürzen der Zähne", "Zum Festziehen des Sattelgurts"],
    correctIndex: 0,
    explanation: "Die weichere Kardätsche nimmt gelösten Staub und Schmutz aus dem Fell auf."
  },
  {
    id: "pflege-wurzelbuerste",
    category: "Pflege",
    question: "Wofür eignet sich eine Wurzelbürste besonders?",
    answers: ["Für groben, angetrockneten Schmutz an unempfindlichen Körperstellen", "Für das empfindliche Auge", "Für die Innenseite des Mauls", "Für offene Wunden"],
    correctIndex: 0,
    explanation: "Die festen Borsten lösen groben Schmutz, sollten aber nicht an empfindlichen Stellen eingesetzt werden."
  },
  {
    id: "pflege-schweissmesser",
    category: "Pflege",
    question: "Wozu dient ein Schweißmesser nach dem Waschen?",
    answers: ["Zum Abziehen von überschüssigem Wasser aus dem Fell", "Zum Schneiden der Mähne", "Zum Öffnen von Hufnägeln", "Zum Reinigen des Gebisses"],
    correctIndex: 0,
    explanation: "Mit dem Schweißmesser wird Wasser aus dem nassen Fell gestrichen, damit es schneller trocknet."
  },
  {
    id: "pflege-putzrichtung",
    category: "Pflege",
    question: "In welche Richtung wird das Fell mit der Kardätsche üblicherweise glatt gebürstet?",
    answers: ["In Richtung des Haarwuchses", "Stets gegen den Haarwuchs", "Nur senkrecht nach oben", "Ausschließlich kreisförmig am Kopf"],
    correctIndex: 0,
    explanation: "Zum Abschluss wird überwiegend mit dem Haarstrich gebürstet."
  },
  {
    id: "pflege-sattellage",
    category: "Pflege",
    question: "Warum muss die Sattellage vor dem Reiten sauber sein?",
    answers: ["Schmutz und verklebtes Fell können Druck- und Scheuerstellen verursachen", "Der Sattel wird dadurch automatisch größer", "Nur so wächst die Mähne schneller", "Damit das Pferd mehr Kraftfutter verträgt"],
    correctIndex: 0,
    explanation: "Eine saubere, kontrollierte Sattellage hilft, unangenehme Reibung und Druckstellen zu vermeiden."
  },
  {
    id: "pflege-maehne-schweif",
    category: "Pflege",
    question: "Wie entwirrt man langes Schweifhaar besonders schonend?",
    answers: ["Strähnenweise von unten nach oben", "Mit kräftigem Reißen von der Schweifrübe abwärts", "Nur mit einer harten Metallkante", "Ausschließlich im vollständig nassen Zustand"],
    correctIndex: 0,
    explanation: "Vorsichtiges Entwirren in kleinen Strähnen reduziert Haarbruch und Ziepen."
  },
  {
    id: "pflege-augen",
    category: "Pflege",
    question: "Was ist beim Säubern der Augenpartie wichtig?",
    answers: ["Ein weiches, sauberes Tuch und eine sanfte Bewegung", "Eine harte Wurzelbürste", "Huföl direkt am Augenlid", "Starkes Reiben mit Sand"],
    correctIndex: 0,
    explanation: "Die empfindliche Augenpartie wird vorsichtig mit sauberem, weichem Material gepflegt."
  },
  {
    id: "pflege-putzzeug",
    category: "Pflege",
    question: "Warum sollte Putzzeug regelmäßig gereinigt und möglichst einem Pferd zugeordnet werden?",
    answers: ["Um Schmutz und die Übertragung von Hautproblemen zu verringern", "Damit die Bürsten schwerer werden", "Damit das Fell seine Farbe wechselt", "Um das Hufwachstum zu stoppen"],
    correctIndex: 0,
    explanation: "Sauberes, individuelles Putzzeug verbessert die Hygiene und kann Ansteckungen vorbeugen."
  },
  {
    id: "pflege-lederzeug",
    category: "Pflege",
    question: "Was sollte beim Reinigen von Sattel und Trense immer mitkontrolliert werden?",
    answers: ["Nähte, Riemen und Verschlüsse auf Schäden", "Die Länge der Pferdezähne", "Die Temperatur des Tränkewassers", "Die Farbe der Einstreu"],
    correctIndex: 0,
    explanation: "Beschädigte Riemen, Nähte oder Beschläge können während der Nutzung zum Sicherheitsrisiko werden."
  },
  {
    id: "pflege-hufkratzer",
    category: "Pflege",
    question: "An welcher Hufstruktur arbeitet man mit dem Hufkratzer besonders vorsichtig?",
    answers: ["Am empfindlichen Strahl und an der Sohle", "An der Mähne", "Am Widerrist", "An den Nüstern"],
    correctIndex: 0,
    explanation: "Fremdkörper werden entfernt, ohne Strahl oder Sohle mit der Spitze zu verletzen."
  },
  {
    id: "anatomie-hufmechanismus",
    category: "Anatomie",
    question: "Was geschieht beim gesunden Hufmechanismus unter Belastung?",
    answers: ["Der Huf kann sich geringfügig weiten und Stöße mit abfedern", "Der Huf wird vollständig starr", "Die Hufwand klappt nach innen", "Das Hufbein verlässt die Hornkapsel"],
    correctIndex: 0,
    explanation: "Das elastische Zusammenspiel der Hufstrukturen unterstützt Stoßdämpfung und Durchblutung."
  },
  {
    id: "anatomie-sprunggelenk",
    category: "Anatomie",
    question: "An welchem Bein befindet sich das Sprunggelenk?",
    answers: ["Am Hinterbein", "Am Vorderbein direkt unter der Schulter", "Im Unterkiefer", "Am Schweif"],
    correctIndex: 0,
    explanation: "Das markante Sprunggelenk liegt zwischen Unterschenkel und Hintermittelfuß."
  },
  {
    id: "anatomie-vorderfusswurzel",
    category: "Anatomie",
    question: "Welcher menschlichen Gelenkregion ähnelt das sogenannte Vorderfußwurzel- oder Karpalgelenk des Pferdes?",
    answers: ["Dem Handgelenk", "Dem Schultergelenk", "Dem Hüftgelenk", "Dem Kiefergelenk"],
    correctIndex: 0,
    explanation: "Das oft als Vorderknie bezeichnete Karpalgelenk entspricht anatomisch der Handwurzel."
  },
  {
    id: "anatomie-zehe",
    category: "Anatomie",
    question: "Auf wie vielen funktionellen Zehen steht ein Pferd je Bein?",
    answers: ["Auf einer", "Auf zwei", "Auf drei", "Auf fünf"],
    correctIndex: 0,
    explanation: "Der Pferdehuf umschließt die stark entwickelte mittlere, dritte Zehe."
  },
  {
    id: "anatomie-blinddarm",
    category: "Anatomie",
    question: "Welche wichtige Aufgabe hat der große Blinddarm des Pferdes?",
    answers: ["Mikrobielle Fermentation von Pflanzenfasern", "Produktion von Hufhorn", "Speicherung der Atemluft", "Steuerung der Augenbewegung"],
    correctIndex: 0,
    explanation: "Mikroorganismen im Blinddarm helfen, faserreiches Pflanzenmaterial aufzuschließen."
  },
  {
    id: "anatomie-schneidezahn",
    category: "Anatomie",
    question: "Welche Hauptaufgabe haben die Schneidezähne des Pferdes beim Fressen?",
    answers: ["Gras und Pflanzenmaterial abzubeißen", "Futter im Blinddarm zu vergären", "Wasser zu filtern", "Die Zunge zu bewegen"],
    correctIndex: 0,
    explanation: "Mit den Schneidezähnen fasst und trennt das Pferd Pflanzenmaterial ab."
  },
  {
    id: "anatomie-backenzahn",
    category: "Anatomie",
    question: "Wofür sind die breiten Backenzähne des Pferdes besonders geeignet?",
    answers: ["Zum Zermahlen faserreichen Futters", "Zum Atmen", "Zum Hören", "Zum Abkühlen der Hufe"],
    correctIndex: 0,
    explanation: "Die Backenzähne zerreiben Raufutter mit ausgedehnten Kauflächen."
  },
  {
    id: "anatomie-nasenatmer",
    category: "Anatomie",
    question: "Auf welchem Weg atmet ein gesundes Pferd normalerweise?",
    answers: ["Durch die Nüstern", "Durch das Maul", "Durch die Ohren", "Durch die Haut"],
    correctIndex: 0,
    explanation: "Pferde sind obligate Nasenatmer und führen die Atemluft normalerweise über die Nüstern."
  },
  {
    id: "anatomie-roehrbein",
    category: "Anatomie",
    question: "Wo liegt das Röhrbein?",
    answers: ["Zwischen Vorderfußwurzel beziehungsweise Sprunggelenk und Fesselgelenk", "Zwischen Ohr und Auge", "Unter der Schweifrübe", "Im Brustkorb"],
    correctIndex: 0,
    explanation: "Das Röhrbein bildet den langen Hauptknochen des Mittelfußes."
  },
  {
    id: "anatomie-kastanie",
    category: "Anatomie",
    question: "Was ist die sogenannte Kastanie am Pferdebein?",
    answers: ["Eine hornige Hautschwiele", "Ein zusätzlicher Huf", "Eine Muskelverletzung", "Ein Teil des Sattels"],
    correctIndex: 0,
    explanation: "Kastanien sind haarlose, hornartige Hautstellen an den Innenseiten bestimmter Gliedmaßenbereiche."
  },
  {
    id: "reiten-schritt-takt",
    category: "Reiten",
    question: "Welchen Takt hat der Schritt?",
    answers: ["Viertakt", "Zweitakt", "Dreitakt", "Eintakt"],
    correctIndex: 0,
    explanation: "Im Schritt setzen die vier Hufe nacheinander in einem klaren Viertakt auf."
  },
  {
    id: "reiten-trab-takt",
    category: "Reiten",
    question: "Welchen Takt hat der Trab?",
    answers: ["Zweitakt", "Viertakt", "Dreitakt", "Fünftakt"],
    correctIndex: 0,
    explanation: "Im Trab bewegen sich diagonale Beinpaare gemeinsam im Zweitakt."
  },
  {
    id: "reiten-galopp-takt",
    category: "Reiten",
    question: "Welchen Takt hat der Galopp in seiner Grundform?",
    answers: ["Dreitakt mit anschließender Schwebephase", "Reinen Viertakt ohne Schwebephase", "Zweitakt ohne Schwebephase", "Eintakt"],
    correctIndex: 0,
    explanation: "Der Galopp ist grundsätzlich eine Dreitaktbewegung mit einer Schwebephase."
  },
  {
    id: "reiten-trab-diagonal",
    category: "Reiten",
    question: "Welche Beine bewegen sich im Trab gleichzeitig?",
    answers: ["Diagonale Beinpaare", "Immer beide Vorderbeine", "Immer beide Hinterbeine", "Nur die Beine einer Körperseite"],
    correctIndex: 0,
    explanation: "Beispielsweise fußen linkes Vorderbein und rechtes Hinterbein als diagonales Paar."
  },
  {
    id: "reiten-galopphilfe-zirkel",
    category: "Reiten",
    question: "Welcher Galopp wird auf einem Zirkel üblicherweise angestrebt?",
    answers: ["Der Galopp auf der inneren Hand", "Stets Kreuzgalopp", "Ausschließlich Außengalopp", "Ein Trab ohne Galoppsprung"],
    correctIndex: 0,
    explanation: "Auf der gebogenen Linie wird normalerweise der zur inneren Hand passende Galopp geritten."
  },
  {
    id: "reiten-grundsitz",
    category: "Reiten",
    question: "Welche Linie beschreibt den ausbalancierten Grundsitz von der Seite?",
    answers: ["Ohr, Schulter, Hüfte und Absatz liegen ungefähr übereinander", "Knie, Hand und Ohr liegen waagerecht", "Der Oberkörper liegt dauerhaft auf dem Pferdehals", "Die Füße befinden sich vor der Pferdebrust"],
    correctIndex: 0,
    explanation: "Eine gedachte senkrechte Linie durch Ohr, Schulter, Hüfte und Absatz unterstützt die Balance."
  },
  {
    id: "reiten-aufwaermen",
    category: "Reiten",
    question: "Wie beginnt eine pferdegerechte Aufwärmphase normalerweise?",
    answers: ["Mit ausreichend ruhigem Schritt", "Sofort mit maximalem Springen", "Mit langem unbewegtem Stehen unter dem Reiter", "Mit engem Rückwärtsrichten über mehrere Minuten"],
    correctIndex: 0,
    explanation: "Eine angemessene Schrittphase bereitet Kreislauf, Gelenke und Muskulatur auf weitere Arbeit vor."
  },
  {
    id: "reiten-abkuehlen",
    category: "Reiten",
    question: "Was gehört nach intensiver Arbeit zur Abkühlphase?",
    answers: ["Ruhiges Schrittreiten oder Führen", "Sofortiger Stillstand ohne Bewegung", "Eine weitere maximale Belastung", "Das vollständige Entziehen von Wasser"],
    correctIndex: 0,
    explanation: "Ruhige Bewegung unterstützt das allmähliche Herunterfahren von Atmung, Kreislauf und Muskulatur."
  },
  {
    id: "reiten-bahn-x",
    category: "Reiten",
    question: "Wo liegt der Bahnpunkt X in einer Dressurbahn?",
    answers: ["In der Mitte der Bahn", "In einer Ecke", "Außerhalb des Eingangs", "Direkt auf der Bande bei A"],
    correctIndex: 0,
    explanation: "X bezeichnet den Mittelpunkt der rechteckigen Dressurbahn."
  },
  {
    id: "reiten-hilfen-zusammenspiel",
    category: "Reiten",
    question: "Wie wirken gute Reiterhilfen zusammen?",
    answers: ["Abgestimmt über Gewicht, Schenkel und Zügel", "Nur durch dauerhaftes Ziehen am Zügel", "Nur durch lautes Rufen", "Ohne Rücksicht auf die Reaktion des Pferdes"],
    correctIndex: 0,
    explanation: "Feine Hilfen entstehen durch ein koordiniertes Zusammenspiel und werden der Reaktion angepasst."
  },
  {
    id: "verhalten-schweifschlagen",
    category: "Verhalten",
    question: "Was kann häufiges kräftiges Schweifschlagen anzeigen?",
    answers: ["Irritation, Unbehagen oder Insektenabwehr", "Immer völlige Entspannung", "Sicheren Tiefschlaf", "Dass das Pferd nichts wahrnimmt"],
    correctIndex: 0,
    explanation: "Schweifschlagen wird im Zusammenhang mit der gesamten Situation und Körpersprache beurteilt."
  },
  {
    id: "verhalten-fluchtreaktion",
    category: "Verhalten",
    question: "Welche natürliche Reaktion ist für das Fluchttier Pferd bei plötzlicher Gefahr typisch?",
    answers: ["Ausweichen oder Fliehen", "Sich grundsätzlich hinlegen", "Jede Bewegung einstellen", "Immer angreifen"],
    correctIndex: 0,
    explanation: "Pferde versuchen bei wahrgenommener Gefahr häufig zunächst, Abstand zu gewinnen."
  },
  {
    id: "verhalten-annaehern",
    category: "Verhalten",
    question: "Wie nähert man sich einem Pferd im Normalfall sicher und gut wahrnehmbar?",
    answers: ["Ruhig seitlich im Bereich der Schulter und mit Ansprache", "Lautlos direkt von hinten", "Rennend mit erhobenen Armen", "Kriechend unter dem Bauch"],
    correctIndex: 0,
    explanation: "Eine ruhige Annäherung im Sichtbereich vermeidet unnötiges Erschrecken."
  },
  {
    id: "verhalten-blinder-bereich",
    category: "Verhalten",
    question: "Wo besitzt ein Pferd direkt am Körper einen schwer einsehbaren Bereich?",
    answers: ["Unmittelbar hinter der Hinterhand", "Seitlich neben der Schulter", "Weit vor dem Kopf", "Auf Augenhöhe neben dem Hals"],
    correctIndex: 0,
    explanation: "Trotz des weiten Sichtfelds gibt es direkt hinter dem Pferd einen blinden Bereich."
  },
  {
    id: "verhalten-hinterbein-ruhen",
    category: "Verhalten",
    question: "Was kann ein locker entlastetes Hinterbein bei einem ansonsten entspannten Pferd bedeuten?",
    answers: ["Es ruht und entspannt sich", "Es galoppiert im Stand", "Es kann grundsätzlich nicht laufen", "Es fordert immer Futter"],
    correctIndex: 0,
    explanation: "Ein ruhendes Hinterbein ist häufig ein Entspannungszeichen; Haltung und Gesamteindruck bleiben wichtig."
  },
  {
    id: "verhalten-tiefschlaf",
    category: "Verhalten",
    question: "Warum muss sich ein Pferd zeitweise hinlegen können?",
    answers: ["Für vollständige Tief- beziehungsweise REM-Schlafphasen", "Weil es im Stehen nie dösen kann", "Damit seine Hufe wachsen", "Um Wasser zu verdauen"],
    correctIndex: 0,
    explanation: "Pferde können im Stehen ruhen, benötigen für bestimmte tiefe Schlafphasen aber sichere Liegezeiten."
  },
  {
    id: "verhalten-scharren",
    category: "Verhalten",
    question: "Was kann Scharren mit dem Vorderhuf je nach Situation ausdrücken?",
    answers: ["Ungeduld, Aufmerksamkeitssuche oder Unwohlsein", "Ausschließlich Freude", "Immer tiefen Schlaf", "Nur Durst"],
    correctIndex: 0,
    explanation: "Scharren hat verschiedene mögliche Ursachen und muss im jeweiligen Kontext beurteilt werden."
  },
  {
    id: "verhalten-ohren-drehen",
    category: "Verhalten",
    question: "Warum drehen Pferde ihre Ohren unabhängig in verschiedene Richtungen?",
    answers: ["Um Geräusche gezielt zu orten", "Um ihre Körpertemperatur zu messen", "Um Futter zu zerkleinern", "Um die Augen abzudecken"],
    correctIndex: 0,
    explanation: "Bewegliche Ohrmuscheln helfen, Schallquellen aus unterschiedlichen Richtungen wahrzunehmen."
  },
  {
    id: "verhalten-fohlen-sozial",
    category: "Verhalten",
    question: "Was lernen Fohlen im Kontakt mit anderen Pferden unter anderem?",
    answers: ["Pferdetypische Kommunikation und soziale Grenzen", "Das Lesen menschlicher Schrift", "Das selbstständige Hufbeschlagen", "Das Öffnen von Stalltoren"],
    correctIndex: 0,
    explanation: "Artgenossen sind für die Entwicklung von Kommunikation und angemessenem Sozialverhalten wichtig."
  },
  {
    id: "verhalten-koerpersprache-kontext",
    category: "Verhalten",
    question: "Warum sollte man nie nur ein einzelnes Körpersignal des Pferdes bewerten?",
    answers: ["Weil Gesamthaltung, Situation und mehrere Signale den Kontext liefern", "Weil Pferde keine Körpersprache besitzen", "Weil nur die Fellfarbe Verhalten zeigt", "Weil Ohren immer bedeutungslos sind"],
    correctIndex: 0,
    explanation: "Eine zuverlässige Einschätzung berücksichtigt den ganzen Körper und die jeweilige Situation."
  },
  {
    id: "allgemein-stute",
    category: "Allgemeines Wissen",
    question: "Was ist eine Stute?",
    answers: ["Ein weibliches Pferd", "Ein kastriertes männliches Pferd", "Ein Pferd im ersten Lebensjahr", "Eine bestimmte Fellfarbe"],
    correctIndex: 0,
    explanation: "Als Stute bezeichnet man ein weibliches Pferd."
  },
  {
    id: "allgemein-hengst",
    category: "Allgemeines Wissen",
    question: "Was ist ein Hengst?",
    answers: ["Ein nicht kastriertes männliches Pferd", "Ein weibliches Jungpferd", "Ein Pferd mit weißem Fell", "Ein Zuggeschirr"],
    correctIndex: 0,
    explanation: "Ein Hengst ist ein unkastriertes männliches Pferd."
  },
  {
    id: "allgemein-fohlen",
    category: "Allgemeines Wissen",
    question: "Wie nennt man ein junges Pferd im ersten Lebensjahr?",
    answers: ["Fohlen", "Wallach", "Remonte", "Beschäler"],
    correctIndex: 0,
    explanation: "Ein Pferd wird von der Geburt bis ungefähr zum Ende des ersten Lebensjahres Fohlen genannt."
  },
  {
    id: "allgemein-jaehrling",
    category: "Allgemeines Wissen",
    question: "Was bezeichnet der Begriff Jährling?",
    answers: ["Ein Pferd zwischen dem ersten und zweiten Geburtstag", "Ein Pferd über zwanzig Jahre", "Eine tragende Stute", "Ein frisch beschlagenes Pferd"],
    correctIndex: 0,
    explanation: "Als Jährling gilt ein Jungpferd vom ersten bis zum zweiten Geburtstag."
  },
  {
    id: "allgemein-fuchsfarbe",
    category: "Allgemeines Wissen",
    question: "Welche Beschreibung passt zur Fellfarbe Fuchs?",
    answers: ["Rötliches bis braunes Fell ohne schwarze Abzeichen an Mähne und Beinen", "Schwarzes Fell mit weißen Punkten", "Helles Fell mit schwarzem Aalstrich", "Nur weißes Fell und rosa Haut"],
    correctIndex: 0,
    explanation: "Beim Fuchs sind Körper- und Langhaar rötlich bis braun; schwarze Points fehlen."
  },
  {
    id: "allgemein-brauner",
    category: "Allgemeines Wissen",
    question: "Welches Merkmal hat ein Brauner typischerweise?",
    answers: ["Braunes Körperfell mit schwarzer Mähne, schwarzem Schweif und dunklen Beinenden", "Vollständig weißes Fell von Geburt an", "Nur rötliches Langhaar ohne dunkle Stellen", "Ein geflecktes Zebramuster"],
    correctIndex: 0,
    explanation: "Braune besitzen braunes Körperfell und schwarze sogenannte Points."
  },
  {
    id: "allgemein-schimmel",
    category: "Allgemeines Wissen",
    question: "Wie verändert sich das Fell vieler Schimmel mit zunehmendem Alter?",
    answers: ["Es wird durch immer mehr weiße Haare heller", "Es wird immer vollständig schwarz", "Es verliert dauerhaft jede Behaarung", "Es entwickelt grundsätzlich große braune Flecken"],
    correctIndex: 0,
    explanation: "Schimmel werden meist farbig geboren und hellen durch zunehmende weiße Haare auf."
  },
  {
    id: "allgemein-blesse",
    category: "Allgemeines Wissen",
    question: "Wo befindet sich eine Blesse?",
    answers: ["Als weißes Abzeichen am Pferdekopf", "Als Gelenk am Hinterbein", "Als Teil des Hufbeschlags", "Als Muskel unter dem Sattel"],
    correctIndex: 0,
    explanation: "Eine Blesse ist ein längliches weißes Kopfabzeichen."
  },
  {
    id: "allgemein-kolikzeichen",
    category: "Allgemeines Wissen",
    question: "Welches Verhalten kann auf eine Kolik hindeuten und sollte ernst genommen werden?",
    answers: ["Wiederholtes Wälzen, Scharren oder zum Bauch schauen", "Ruhiges Dösen in entspannter Haltung", "Einmaliges Abschnauben nach der Arbeit", "Gelassenes Kauen von Heu"],
    correctIndex: 0,
    explanation: "Kolikverdacht ist ein tiermedizinischer Notfall; bei typischen Anzeichen muss umgehend der Tierarzt kontaktiert werden."
  },
  {
    id: "allgemein-galopp",
    category: "Allgemeines Wissen",
    question: "In welcher natürlichen Gangart erreicht ein Pferd normalerweise seine höchste Geschwindigkeit?",
    answers: ["Im Galopp", "Im Schritt", "Im Rückwärtsrichten", "Im Halt"],
    correctIndex: 0,
    explanation: "Der Galopp ist die schnellste natürliche Grundgangart des Pferdes."
  }
]);

const state = {
  playerName: "",
  questions: [],
  currentIndex: 0,
  score: 0,
  startedAt: 0,
  questionDeadline: 0,
  timerId: null,
  nextQuestionId: null,
  answerLocked: false
};

const ui = {};

function shuffle(items, random = Math.random) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function prepareQuestions(random = Math.random) {
  return shuffle(QUESTION_BANK, random)
    .slice(0, Math.min(ROUND_QUESTION_COUNT, QUESTION_BANK.length))
    .map((question) => {
      const correctAnswer = question.answers[question.correctIndex];
      const answers = shuffle(question.answers, random);

      return {
        ...question,
        answers,
        correctIndex: answers.indexOf(correctAnswer)
      };
    });
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function normalizeName(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, 24);
}

function cacheElements() {
  ui.startScreen = document.getElementById("start-screen");
  ui.quizScreen = document.getElementById("quiz-screen");
  ui.resultScreen = document.getElementById("result-screen");
  ui.startForm = document.getElementById("start-form");
  ui.playerName = document.getElementById("player-name");
  ui.nameError = document.getElementById("name-error");
  ui.playerDisplay = document.getElementById("player-display");
  ui.playerAvatar = document.getElementById("player-avatar");
  ui.score = document.getElementById("score");
  ui.scoreTotal = document.getElementById("score-total");
  ui.timer = document.getElementById("timer");
  ui.timerChip = document.getElementById("timer-chip");
  ui.progressText = document.getElementById("progress-text");
  ui.progressTrack = document.querySelector(".progress-track");
  ui.progressBar = document.getElementById("progress-bar");
  ui.category = document.getElementById("category");
  ui.questionText = document.getElementById("question-text");
  ui.answers = document.getElementById("answers");
  ui.feedback = document.getElementById("feedback");
  ui.resultName = document.getElementById("result-name");
  ui.resultMessage = document.getElementById("result-message");
  ui.resultScore = document.getElementById("result-score");
  ui.resultTotal = document.getElementById("result-total");
  ui.resultPercent = document.getElementById("result-percent");
  ui.resultTime = document.getElementById("result-time");
  ui.resultAnswered = document.getElementById("result-answered");
  ui.resultBadge = document.getElementById("result-badge");
  ui.restartButton = document.getElementById("restart-button");
  ui.homeButton = document.getElementById("home-button");
}

function showScreen(screen) {
  [ui.startScreen, ui.quizScreen, ui.resultScreen].forEach((element) => {
    element.hidden = element !== screen;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearTimers() {
  window.clearInterval(state.timerId);
  window.clearTimeout(state.nextQuestionId);
  state.timerId = null;
  state.nextQuestionId = null;
}

function startQuiz(playerName) {
  clearTimers();
  state.playerName = playerName;
  state.questions = prepareQuestions();
  state.currentIndex = 0;
  state.score = 0;
  state.startedAt = Date.now();
  state.answerLocked = false;

  ui.playerDisplay.textContent = playerName;
  ui.playerAvatar.textContent = playerName.charAt(0).toLocaleUpperCase("de-DE");
  ui.score.textContent = "0";
  ui.scoreTotal.textContent = String(state.questions.length);

  showScreen(ui.quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const question = state.questions[state.currentIndex];
  const questionNumber = state.currentIndex + 1;
  const totalQuestions = state.questions.length;

  state.answerLocked = false;
  ui.feedback.textContent = "";
  ui.questionText.textContent = question.question;
  ui.category.textContent = question.category;
  ui.progressText.textContent = `Frage ${questionNumber} von ${totalQuestions}`;
  ui.progressBar.style.width = `${(questionNumber / totalQuestions) * 100}%`;
  ui.progressTrack.setAttribute("aria-valuemax", String(totalQuestions));
  ui.progressTrack.setAttribute("aria-valuenow", String(questionNumber));
  ui.answers.replaceChildren();

  question.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    const text = document.createElement("span");
    const icon = document.createElement("span");

    button.type = "button";
    button.className = "answer-button";
    button.dataset.answerIndex = String(answerIndex);
    button.setAttribute("aria-label", `${ANSWER_LETTERS[answerIndex]}: ${answer}`);

    letter.className = "answer-letter";
    letter.textContent = ANSWER_LETTERS[answerIndex];
    text.className = "answer-text";
    text.textContent = answer;
    icon.className = "answer-icon";
    icon.setAttribute("aria-hidden", "true");

    button.append(letter, text, icon);
    button.addEventListener("click", () => handleAnswer(answerIndex));
    ui.answers.appendChild(button);
  });

  startQuestionTimer();
}

function startQuestionTimer() {
  window.clearInterval(state.timerId);
  state.questionDeadline = Date.now() + QUESTION_SECONDS * 1000;
  updateTimerDisplay(QUESTION_SECONDS);

  state.timerId = window.setInterval(() => {
    const secondsLeft = Math.max(0, Math.ceil((state.questionDeadline - Date.now()) / 1000));
    updateTimerDisplay(secondsLeft);

    if (secondsLeft === 0) {
      window.clearInterval(state.timerId);
      state.timerId = null;
      handleAnswer(null);
    }
  }, 250);
}

function updateTimerDisplay(secondsLeft) {
  ui.timer.textContent = String(secondsLeft);
  ui.timerChip.classList.toggle("is-urgent", secondsLeft <= 5);
  ui.timerChip.setAttribute("aria-label", `${secondsLeft} Sekunden verbleibend`);
}

function handleAnswer(selectedIndex) {
  if (state.answerLocked) {
    return;
  }

  state.answerLocked = true;
  window.clearInterval(state.timerId);
  state.timerId = null;

  const question = state.questions[state.currentIndex];
  const buttons = [...ui.answers.querySelectorAll(".answer-button")];
  const correctButton = buttons[question.correctIndex];
  const selectedButton = selectedIndex === null ? null : buttons[selectedIndex];
  const isCorrect = selectedIndex === question.correctIndex;

  buttons.forEach((button) => {
    button.disabled = true;
  });

  correctButton.classList.add("is-correct");
  correctButton.querySelector(".answer-icon").textContent = "✓";

  if (isCorrect) {
    state.score += 1;
    ui.score.textContent = String(state.score);
    ui.feedback.innerHTML = `<span><strong>Richtig!</strong> ${question.explanation}</span>`;
  } else {
    if (selectedButton) {
      selectedButton.classList.add("is-wrong");
      selectedButton.querySelector(".answer-icon").textContent = "×";
      ui.feedback.innerHTML = `<span><strong>Falsch.</strong> ${question.explanation}</span>`;
    } else {
      ui.feedback.innerHTML = `<span><strong>Zeit abgelaufen.</strong> ${question.explanation}</span>`;
    }
  }

  state.nextQuestionId = window.setTimeout(goToNextQuestion, FEEDBACK_DELAY_MS);
}

function goToNextQuestion() {
  state.currentIndex += 1;

  if (state.currentIndex < state.questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearTimers();
  const elapsedSeconds = Math.round((Date.now() - state.startedAt) / 1000);
  const percent = Math.round((state.score / state.questions.length) * 100);
  let message = "Jeder Ausritt macht klüger – beim nächsten Mal wartet eine neue Reihenfolge.";
  let badge = "↟";

  if (percent >= 90) {
    message = "Sattelfest! Dein Pferdewissen ist wirklich beeindruckend.";
    badge = "★";
  } else if (percent >= 70) {
    message = "Starke Runde! Du kennst dich schon richtig gut mit Pferden aus.";
    badge = "♞";
  } else if (percent >= 50) {
    message = "Gut geritten! Mit etwas Übung wird daraus eine echte Spitzenrunde.";
    badge = "✓";
  }

  ui.resultName.textContent = state.playerName;
  ui.resultMessage.textContent = message;
  ui.resultScore.textContent = String(state.score);
  ui.resultTotal.textContent = String(state.questions.length);
  ui.resultPercent.textContent = `${percent} %`;
  ui.resultTime.textContent = formatTime(elapsedSeconds);
  ui.resultAnswered.textContent = `${state.questions.length} Fragen`;
  ui.resultBadge.textContent = badge;
  showScreen(ui.resultScreen);
  ui.restartButton.focus({ preventScroll: true });
}

function returnHome() {
  clearTimers();
  showScreen(ui.startScreen);
  ui.nameError.textContent = "";
  ui.playerName.focus({ preventScroll: true });
}

function initialize() {
  cacheElements();

  ui.startForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = normalizeName(ui.playerName.value);

    if (!playerName) {
      ui.nameError.textContent = "Bitte gib zuerst deinen Namen ein.";
      ui.playerName.setAttribute("aria-invalid", "true");
      ui.playerName.focus();
      return;
    }

    ui.nameError.textContent = "";
    ui.playerName.removeAttribute("aria-invalid");
    ui.playerName.value = playerName;
    startQuiz(playerName);
  });

  ui.playerName.addEventListener("input", () => {
    ui.nameError.textContent = "";
    ui.playerName.removeAttribute("aria-invalid");
  });

  ui.restartButton.addEventListener("click", () => startQuiz(state.playerName));
  ui.homeButton.addEventListener("click", returnHome);
}

window.HufschlagQuiz = Object.freeze({
  questions: QUESTION_BANK,
  roundQuestionCount: ROUND_QUESTION_COUNT,
  shuffle,
  prepareQuestions,
  formatTime,
  normalizeName
});

document.addEventListener("DOMContentLoaded", initialize);

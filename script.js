// Frage-Objekt erstellen
function Frage(text, antworten, korrekteAntwort) {
    this.text = text;
    this.antworten = antworten;
    this.korrekteAntwort = korrekteAntwort;
}
// Quiz-Objekt erstellen
function Quiz(fragen, spielername) {
    this.fragen = fragen;
    this.punktestand = 0;
    this.frageIndex = 0;
    this.spielername = spielername;
    this.timer = new Timer(15, this.zeitAbgelaufen.bind(this));
    this.startZeit = Date.now(); // Hinzufügen von startZeit
}
// Zeit abgelaufen
Quiz.prototype.zeitAbgelaufen = function() {
    this.pruefeAntwort('');
}

// Frage prüfen
Quiz.prototype.pruefeAntwort = function(antwort) {
    const frage = this.fragen[this.frageIndex];

    if (antwort === frage.korrekteAntwort) {
        this.punktestand++;
        this.zeigeFeedback('Richtig!', 'green');
    } else {
        this.zeigeFeedback('Falsch!', 'red');
    }

    this.naechsteFrage();
}

// Nächste Frage laden
Quiz.prototype.naechsteFrage = function() {
    this.frageIndex++;
    if (this.frageIndex < this.fragen.length) {
        this.timer.stop();
        this.timer.start();
        this.zeigeFrage();
    } else {
        this.quizBeenden();
    }
}

// Quiz beenden
Quiz.prototype.quizBeenden = function() {
    const fragenDiv = document.getElementById('frageText');
    const antwortenDiv = document.getElementById('antworten');
    const feedbackDiv = document.getElementById('feedback');
    const timerElement = document.getElementById('timer'); // Timer-Element holen

    const vergangeneZeit = Date.now() - this.startZeit;
    const vergangeneSekunden = Math.floor(vergangeneZeit / 1000);

    timerElement.innerText = ''; // Timer-Element leeren
    fragenDiv.innerText = 'Quiz beendet!';
    antwortenDiv.innerHTML = '';
    feedbackDiv.innerHTML = `Spieler: ${this.spielername}<br>Dein Punktestand: ${this.punktestand}/${this.fragen.length}<br>Gesamte Zeit: ${vergangeneSekunden} Sekunden`;
    feedbackDiv.style.color = 'white';
}

// Frage anzeigen
Quiz.prototype.zeigeFrage = function() {
    const fragenDiv = document.getElementById('frageText');
    const antwortenDiv = document.getElementById('antworten');
    const feedbackDiv = document.getElementById('feedback');
    const frage = this.fragen[this.frageIndex];

    fragenDiv.innerText = frage.text;
    antwortenDiv.innerHTML = '';

    frage.antworten.forEach((antwort) => {
        const antwortButton = document.createElement('button');
        antwortButton.innerText = antwort;
        antwortButton.addEventListener('click', () => {
            this.timer.stop();
            this.pruefeAntwort(antwort);
        });
        antwortenDiv.appendChild(antwortButton);
    });

    feedbackDiv.innerText = '';
}

// Feedback anzeigen
Quiz.prototype.zeigeFeedback = function(text, farbe) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerText = text;
    feedbackDiv.style.color = farbe;
}

// Timer-Objekt erstellen
function Timer(callback) {
    this.zeit = 15;  // Setzen Sie die Zeit direkt auf 15 Sekunden
    this.callback = callback;
    this.timerID = null;
}

// Timer starten
Timer.prototype.start = function() {
    this.zeit = 15; // Setzen Sie die Zeit hier zurück
    const timerElement = document.getElementById('timer');
    timerElement.innerText = this.zeit;

    this.timerID = setInterval(() => {
        this.zeit--;
        timerElement.innerText = this.zeit;

        if (this.zeit === 0) {
            this.stop();
            this.callback();
        }
    }, 1000);

}

// Timer stoppen
Timer.prototype.stop = function() {
    clearInterval(this.timerID);
}

// Quiz-Objekt erstellen
function Quiz(fragen, spielername) {
    this.fragen = fragen;
    this.punktestand = 0;
    this.frageIndex = 0;
    this.spielername = spielername;
    this.timer = new Timer(this.zeitAbgelaufen.bind(this));
}


// Quiz-Spiel starten
function quizSpielStarten() {
    const fragen = [
        new Frage("Was ist HTML?", ["Eine Programmiersprache", "Ein Texteditor", "Eine Bildbearbeitungssoftware", "Eine Auszeichnungssprache"], "Eine Auszeichnungssprache"),
        new Frage("Welche Sprache wird hauptsächlich für die Frontend-Entwicklung verwendet?", ["Java", "Python", "HTML", "CSS"], "HTML"),
        new Frage("Was ist CSS?", ["Eine Datenbank", "Ein Framework", "Ein Styling-Sprache", "Ein Betriebssystem"], "Ein Styling-Sprache"),
        new Frage("Was bedeutet die Abkürzung 'HTTP'?", ["HyperText Transfer Protocol", "High Tech Programming", "Home Tool Programming", "HyperText Technical Protocol"], "HyperText Transfer Protocol"),
        new Frage("Was ist JavaScript?", ["Eine Datenbank", "Ein Betriebssystem", "Eine Programmiersprache", "Ein Texteditor"], "Eine Programmiersprache"),
        new Frage("Was ist eine Variable in der Programmierung?", ["Ein Speicherplatz für Daten", "Ein Computer-Netzwerk", "Ein spezielles Symbol", "Eine Programmiersprache"], "Ein Speicherplatz für Daten"),
        new Frage("Was bedeutet 'SQL'?", ["Structured Query Language", "Standard Question Language", "Simple Query Language", "Structured Question Language"], "Structured Query Language"),
        new Frage("Was ist ein Server?", ["Ein spezieller Computer", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein spezielles Kabel"], "Ein spezieller Computer"),
        new Frage("Was ist ein Algorithmus?", ["Ein spezieller Code", "Ein Musikinstrument", "Eine Programmiersprache", "Eine Schritt-für-Schritt-Anleitung"], "Eine Schritt-für-Schritt-Anleitung"),
        new Frage("Was bedeutet 'API'?", ["Application Program Interface", "Advanced Programming Interface", "Application Personal Interface", "Advanced Program Interface"], "Application Program Interface"),
        new Frage("Was ist ein Framework?", ["Ein Programmierwerkzeug", "Ein Datenformat", "Eine Musikband", "Ein Programmierfehler"], "Ein Programmierwerkzeug"),
        new Frage("Was ist ein Repository in der Versionsverwaltung?", ["Ein spezieller Computer", "Ein Speichermedium", "Ein Speicherplatz für Daten", "Ein Programmierwerkzeug"], "Ein Speicherplatz für Daten"),
        new Frage("Was ist ein Debugger?", ["Ein Fehler in einem Programm", "Ein Musikinstrument", "Ein Programmierfehler", "Ein Programmierwerkzeug"], "Ein Programmierwerkzeug"),
        new Frage("Was ist ein Protokoll in der Netzwerktechnik?", ["Eine Programmiersprache", "Eine Verbindungsmethode", "Ein Texteditor", "Ein Fehler in einem Programm"], "Eine Verbindungsmethode"),
        new Frage("Was ist eine Firewall?", ["Ein Musikinstrument", "Ein Programmierfehler", "Ein Sicherheitsmechanismus", "Ein Datenformat"], "Ein Sicherheitsmechanismus"),
        new Frage("Was ist ein Router?", ["Ein spezieller Computer", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein Netzwerkgerät"], "Ein Netzwerkgerät"),
        new Frage("Was ist ein Cache?", ["Ein Speicherplatz für Daten", "Ein Programmierfehler", "Ein Fehler in einem Programm", "Ein Datenformat"], "Ein Speicherplatz für Daten"),
        new Frage("Was ist eine Schnittstelle?", ["Eine Verbindungsmethode", "Ein Musikinstrument", "Ein Texteditor", "Ein Fehler in einem Programm"], "Eine Verbindungsmethode"),
        new Frage("Was ist ein Byte?", ["Eine Einheit für Daten", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein Netzwerkgerät"], "Eine Einheit für Daten"),
        new Frage("Was ist ein Compiler?", ["Ein Musikinstrument", "Ein Programmierfehler", "Ein Übersetzungswerkzeug", "Ein Datenformat"], "Ein Übersetzungswerkzeug"),
        new Frage("Was ist ein Betriebssystem?", ["Eine Software für Systemadministratoren", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Eine Systemsoftware"], "Eine Systemsoftware"),
        new Frage("Was ist ein Algorithmus?", ["Ein spezieller Code", "Ein Musikinstrument", "Eine Programmiersprache", "Eine Schritt-für-Schritt-Anleitung"], "Eine Schritt-für-Schritt-Anleitung"),
        new Frage("Was ist eine Schleife in der Programmierung?", ["Ein Kontrollstrukturelement", "Ein Musikinstrument", "Ein Programmierwerkzeug", "Ein Fehler in einem Programm"], "Ein Kontrollstrukturelement"),
        new Frage("Was ist ein DNS?", ["Domain Name System", "Data Network Server", "Data Network System", "Domain Network System"], "Domain Name System"),
        new Frage("Was ist ein Datenbankmanagementsystem (DBMS)?", ["Eine Software zur Verwaltung von Datenbanken", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein Datenformat"], "Eine Software zur Verwaltung von Datenbanken"),
        new Frage("Was ist ein VPN?", ["Virtual Private Network", "Virtual Public Network", "Virtual Personal Network", "Virtual Program Network"], "Virtual Private Network"),
        new Frage("Was ist eine URL?", ["Uniform Resource Locator", "Unified Resource Locator", "Uniform Remote Locator", "Unified Remote Locator"], "Uniform Resource Locator"),
        new Frage("Was ist ein Stack in der Programmierung?", ["Ein Datenstrukturtyp", "Ein Musikinstrument", "Ein Programmierwerkzeug", "Ein Fehler in einem Programm"], "Ein Datenstrukturtyp"),
        new Frage("Was ist ein JSON?", ["Ein Datenformat", "Ein Musikinstrument", "Eine Programmiersprache", "Ein Texteditor"], "Ein Datenformat"),
        new Frage("Was ist ein Framework?", ["Ein Programmierwerkzeug", "Ein Datenformat", "Eine Musikband", "Ein Programmierfehler"], "Ein Programmierwerkzeug"),
        new Frage("Was ist ein SSL-Zertifikat?", ["Ein Verschlüsselungszertifikat für sichere Kommunikation im Web", "Ein Netzwerkprotokoll für die Datenübertragung", "Ein Framework zur Entwicklung von Websites", "Ein Speichermedium für Daten"], "Ein Verschlüsselungszertifikat für sichere Kommunikation im Web"),
        new Frage("Was ist ein API-Schlüssel?", ["Ein geheimes Passwort für den Zugriff auf eine API", "Ein Programmierwerkzeug für die API-Entwicklung", "Ein eindeutiger Identifikator für eine API", "Ein Datenbankobjekt für die API-Kommunikation"], "Ein geheimes Passwort für den Zugriff auf eine API"),
        new Frage("Was bedeutet die Abkürzung 'URL'?", ["Unified Resource Locator", "Universal Remote Link", "Unique Routing Language", "Uniform Resource Link"], "Unified Resource Locator"),
        new Frage("Was ist eine DNS-Auflösung?", ["Die Übersetzung einer Domain in eine IP-Adresse", "Die Verschlüsselung von Daten bei der Übertragung", "Die Verbindung zu einem VPN-Netzwerk", "Die Verwaltung von Datenbanken in einem DBMS"], "Die Übersetzung einer Domain in eine IP-Adresse"),
        new Frage("Was ist ein Open-Source-Projekt?", ["Ein Softwareprojekt mit öffentlich zugänglichem Quellcode", "Ein Projekt zur Netzwerksicherheit", "Ein Datenbankmanagementsystem mit freier Lizenz", "Ein Framework zur Datenvisualisierung"], "Ein Softwareprojekt mit öffentlich zugänglichem Quellcode"),
        new Frage("Was ist ein HTML-Tag?", ["Ein spezielles Element in der HTML-Struktur", "Ein Programmierwerkzeug zur HTML-Entwicklung", "Ein Link zu einer anderen HTML-Seite", "Ein CSS-Stylingattribut"], "Ein spezielles Element in der HTML-Struktur"),
        new Frage("Was ist ein VPN?", ["Virtual Private Network", "Virtual Public Network", "Virtual Personal Network", "Virtual Program Network"], "Virtual Private Network"),
        new Frage("Was ist ein Versionskontrollsystem?", ["Ein Tool zur Verwaltung von Änderungen im Quellcode", "Ein Framework zur Versionsverwaltung von Dateien", "Ein Verschlüsselungsprotokoll für die Datenübertragung", "Ein Datenbankmanagementsystem für die Code-Dokumentation"], "Ein Tool zur Verwaltung von Änderungen im Quellcode"),
        new Frage("Was ist Responsive Webdesign?", ["Ein Ansatz zur Entwicklung von Websites, die auf verschiedenen Geräten gut aussehen", "Ein Algorithmus zur Website-Optimierung", "Ein Framework zur automatischen Generierung von Webseiten", "Ein Datenformat für die Webseitenstruktur"], "Ein Ansatz zur Entwicklung von Websites, die auf verschiedenen Geräten gut aussehen"),
        new Frage("Was ist ein SQL-Injection-Angriff?", ["Ein Angriff, bei dem schädlicher Code in SQL-Abfragen eingefügt wird", "Ein Fehler im Datenbankmanagementsystem", "Ein Algorithmus zur Datenmanipulation", "Ein Datenbankobjekt zur SQL-Integration"], "Ein Angriff, bei dem schädlicher Code in SQL-Abfragen eingefügt wird"),
        new Frage("Was ist ein Framework?", ["Ein Programmierwerkzeug zur Entwicklung von Anwendungen", "Ein spezielles Datenbankobjekt", "Ein Netzwerkprotokoll für die Datenübertragung", "Ein Speichermedium für Programmiercode"], "Ein Programmierwerkzeug zur Entwicklung von Anwendungen"),
        new Frage("Was ist ein Algorithmus?", ["Eine Schritt-für-Schritt-Anleitung zur Lösung eines Problems", "Ein Datenbankobjekt zur Algorithmusoptimierung", "Ein Framework zur Algorithmenentwicklung", "Ein spezielles Element in der Programmiersprache"], "Eine Schritt-für-Schritt-Anleitung zur Lösung eines Problems"),
        new Frage("Was ist Cloud Computing?", ["Die Bereitstellung von Computing-Ressourcen über das Internet", "Ein spezielles Datenbankmanagementsystem", "Ein Framework zur Cloud-Entwicklung", "Ein Algorithmus zur Cloud-Optimierung"], "Die Bereitstellung von Computing-Ressourcen über das Internet"),
        new Frage("Was ist eine API?", ["Eine Programmierschnittstelle für die Kommunikation zwischen Anwendungen", "Ein Datenbankmanagementsystem für die API-Integration", "Ein Framework zur API-Entwicklung", "Ein spezielles Datenformat für die API-Kommunikation"], "Eine Programmierschnittstelle für die Kommunikation zwischen Anwendungen"),
        new Frage("Was ist ein Stack Overflow?", ["Eine Online-Community für Fragen und Antworten zu Programmierthemen", "Ein Fehler im Datenbankmanagementsystem", "Ein Algorithmus zur Datenmanipulation", "Ein Datenbankobjekt zur Datenintegration"], "Eine Online-Community für Fragen und Antworten zu Programmierthemen"),
        new Frage("Was ist ein Bug?", ["Ein Fehler in einem Programm", "Ein Framework zur Programmierung", "Ein Speichermedium für Programmiercode", "Ein Algorithmus zur Fehlerbehebung"], "Ein Fehler in einem Programm"),
        new Frage("Was ist ein Datenbankmanagementsystem (DBMS)?", ["Eine Software zur Verwaltung von Datenbanken", "Ein Programmierwerkzeug für Datenanalyse", "Ein Algorithmus zur Datenmanipulation", "Ein Datenformat für Datenbankstrukturen"], "Eine Software zur Verwaltung von Datenbanken"),
        new Frage("Was ist eine IDE?", ["Eine integrierte Entwicklungsumgebung für die Programmierung", "Ein Algorithmus zur Code-Optimierung", "Ein Framework zur IDE-Entwicklung", "Ein spezielles Datenbankobjekt für die Code-Integration"], "Eine integrierte Entwicklungsumgebung für die Programmierung"),
        new Frage("Was ist ein Compiler?", ["Ein Programmierwerkzeug zur Übersetzung von Quellcode", "Ein Datenbankmanagementsystem für die Code-Integration", "Ein Algorithmus zur Compiler-Optimierung", "Ein Framework zur Compiler-Entwicklung"], "Ein Programmierwerkzeug zur Übersetzung von Quellcode"),
        new Frage("Was ist ein Stack in der Programmierung?", ["Eine Datenstruktur zur Speicherung von Elementen", "Ein spezielles Datenbankmanagementsystem", "Ein Framework zur Stack-Entwicklung", "Ein Algorithmus zur Stack-Optimierung"], "Eine Datenstruktur zur Speicherung von Elementen"),
        new Frage("Was ist HTML?", ["Eine Programmiersprache", "Ein Texteditor", "Eine Bildbearbeitungssoftware", "Eine Auszeichnungssprache"], "Eine Auszeichnungssprache"),
        new Frage("Welche Sprache wird hauptsächlich für die Frontend-Entwicklung verwendet?", ["Java", "Python", "HTML", "CSS"], "HTML"),
        new Frage("Was ist CSS?", ["Eine Datenbank", "Ein Framework", "Ein Styling-Sprache", "Ein Betriebssystem"], "Ein Styling-Sprache"),
        new Frage("Was bedeutet die Abkürzung 'HTTP'?", ["HyperText Transfer Protocol", "High Tech Programming", "Home Tool Programming", "HyperText Technical Protocol"], "HyperText Transfer Protocol"),
        new Frage("Was ist JavaScript?", ["Eine Datenbank", "Ein Betriebssystem", "Eine Programmiersprache", "Ein Texteditor"], "Eine Programmiersprache"),
        new Frage("Was ist eine Variable in der Programmierung?", ["Ein Speicherplatz für Daten", "Ein Computer-Netzwerk", "Ein spezielles Symbol", "Eine Programmiersprache"], "Ein Speicherplatz für Daten"),
        new Frage("Was bedeutet 'SQL'?", ["Structured Query Language", "Standard Question Language", "Simple Query Language", "Structured Question Language"], "Structured Query Language"),
        new Frage("Was ist ein Server?", ["Ein spezieller Computer", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein spezielles Kabel"], "Ein spezieller Computer"),
        new Frage("Was ist ein Algorithmus?", ["Ein spezieller Code", "Ein Musikinstrument", "Eine Programmiersprache", "Eine Schritt-für-Schritt-Anleitung"], "Eine Schritt-für-Schritt-Anleitung"),
        new Frage("Was bedeutet 'API'?", ["Application Program Interface", "Advanced Programming Interface", "Application Personal Interface", "Advanced Program Interface"], "Application Program Interface"),
        new Frage("Was ist ein Framework?", ["Ein Programmierwerkzeug", "Ein Datenformat", "Eine Musikband", "Ein Programmierfehler"], "Ein Programmierwerkzeug"),
        new Frage("Was ist ein Repository in der Versionsverwaltung?", ["Ein spezieller Computer", "Ein Speichermedium", "Ein Speicherplatz für Daten", "Ein Programmierwerkzeug"], "Ein Speicherplatz für Daten"),
        new Frage("Was ist ein Debugger?", ["Ein Fehler in einem Programm", "Ein Musikinstrument", "Ein Programmierfehler", "Ein Programmierwerkzeug"], "Ein Programmierwerkzeug"),
        new Frage("Was ist ein Protokoll in der Netzwerktechnik?", ["Eine Programmiersprache", "Eine Verbindungsmethode", "Ein Texteditor", "Ein Fehler in einem Programm"], "Eine Verbindungsmethode"),
        new Frage("Was ist eine Firewall?", ["Ein Musikinstrument", "Ein Programmierfehler", "Ein Sicherheitsmechanismus", "Ein Datenformat"], "Ein Sicherheitsmechanismus"),
        new Frage("Was ist ein Router?", ["Ein spezieller Computer", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein Netzwerkgerät"], "Ein Netzwerkgerät"),
        new Frage("Was ist ein Cache?", ["Ein Speicherplatz für Daten", "Ein Programmierfehler", "Ein Fehler in einem Programm", "Ein Datenformat"], "Ein Speicherplatz für Daten"),
        new Frage("Was ist eine Schnittstelle?", ["Eine Verbindungsmethode", "Ein Musikinstrument", "Ein Texteditor", "Ein Fehler in einem Programm"], "Eine Verbindungsmethode"),
        new Frage("Was ist ein Byte?", ["Eine Einheit für Daten", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein Netzwerkgerät"], "Eine Einheit für Daten"),
        new Frage("Was ist ein Compiler?", ["Ein Musikinstrument", "Ein Programmierfehler", "Ein Übersetzungswerkzeug", "Ein Datenformat"], "Ein Übersetzungswerkzeug"),
        new Frage("Was ist ein Betriebssystem?", ["Eine Software für Systemadministratoren", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Eine Systemsoftware"], "Eine Systemsoftware"),
        new Frage("Was ist ein Algorithmus?", ["Ein spezieller Code", "Ein Musikinstrument", "Eine Programmiersprache", "Eine Schritt-für-Schritt-Anleitung"], "Eine Schritt-für-Schritt-Anleitung"),
        new Frage("Was ist eine Schleife in der Programmierung?", ["Ein Kontrollstrukturelement", "Ein Musikinstrument", "Ein Programmierwerkzeug", "Ein Fehler in einem Programm"], "Ein Kontrollstrukturelement"),
        new Frage("Was ist ein DNS?", ["Domain Name System", "Data Network Server", "Data Network System", "Domain Network System"], "Domain Name System"),
        new Frage("Was ist ein Datenbankmanagementsystem (DBMS)?", ["Eine Software zur Verwaltung von Datenbanken", "Ein Programmierwerkzeug", "Ein Musik-Streaming-Dienst", "Ein Datenformat"], "Eine Software zur Verwaltung von Datenbanken"),
        new Frage("Was ist ein VPN?", ["Virtual Private Network", "Virtual Public Network", "Virtual Personal Network", "Virtual Program Network"], "Virtual Private Network"),
        new Frage("Was ist eine URL?", ["Uniform Resource Locator", "Unified Resource Locator", "Uniform Remote Locator", "Unified Remote Locator"], "Uniform Resource Locator"),
        new Frage("Was ist ein Stack in der Programmierung?", ["Ein Datenstrukturtyp", "Ein Musikinstrument", "Ein Programmierwerkzeug", "Ein Fehler in einem Programm"], "Ein Datenstrukturtyp"),
        new Frage("Was ist ein JSON?", ["Ein Datenformat", "Ein Musikinstrument", "Eine Programmiersprache", "Ein Texteditor"], "Ein Datenformat"),
        new Frage("Was ist ein Framework?", ["Ein Programmierwerkzeug", "Ein Datenformat", "Eine Musikband", "Ein Programmierfehler"], "Ein Programmierwerkzeug")
    ];

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', starteQuiz);

    function starteQuiz() {
        const spielernameInput = document.getElementById('spielername');
        const spielername = spielernameInput.value.trim();

        if (spielername === "") {
            alert("Bitte gib deinen Namen ein, um das Spiel zu starten.");
            return;
        }

        const quiz = new Quiz(fragen, spielername);
        quiz.startZeit = Date.now(); // Startzeit hier setzen

        // Fragen zufällig auswählen
        const zufaelligeFragen = fragen.sort(() => Math.random() - 0.5).slice(0, 10);
        quiz.fragen = zufaelligeFragen;

        // HTML-Elemente für Spielername und Start-Button ausblenden
        spielernameInput.style.display = 'none';
        startButton.style.display = 'none';

        quiz.zeigeFrage();
        quiz.timer.start();
    }
}

// Spiel starten
quizSpielStarten();

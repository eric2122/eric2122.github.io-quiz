// Frage-Objekt erstellen
function Frage(text, antworten, korrekteAntwort) {
    this.text = text;
    this.antworten = antworten;
    this.korrekteAntwort = korrekteAntwort;
}

// Timer-Objekt erstellen
function Timer(callback) {
    this.zeit = 15; // Setzen Sie die Zeit direkt auf 15 Sekunden
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
    this.startZeit = Date.now(); // Startzeit hier setzen
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
    const timerElement = document.getElementById('timer');

    const vergangeneZeit = Date.now() - this.startZeit;
    const vergangeneSekunden = Math.floor(vergangeneZeit / 1000);

    timerElement.innerText = '';
    fragenDiv.innerText = 'Quiz beendet!';
    antwortenDiv.innerHTML = '';
    feedbackDiv.innerHTML = `Spieler: ${this.spielername}<br>Dein Punktestand: ${this.punktestand}/${this.fragen.length}<br>Gesamte Zeit: ${vergangeneSekunden} Sekunden`;

    // Wiederholung-Button hinzufügen
    const wiederholungButton = this.erstelleWiederholungButton();
    feedbackDiv.appendChild(wiederholungButton);

    feedbackDiv.style.color = 'white';
}

// Wiederholung-Button erstellen
Quiz.prototype.erstelleWiederholungButton = function() {
    const wiederholungButton = document.createElement('button');
    wiederholungButton.innerText = 'Again';
    wiederholungButton.addEventListener('click', () => quizSpielStarten(this.spielername));
    return wiederholungButton;
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

// Quiz-Spiel starten
function quizSpielStarten(spielername) {
    const fragen = [
        new Frage("Wann wurde der erste Computer entwickelt?", ["1945", "1950", "1960", "1970"], "1945"),
        new Frage("Welches Unternehmen brachte den ersten personalisierten Computer auf den Markt?", ["IBM", "Apple", "Microsoft", "HP"], "IBM"),
        new Frage("Welches war der erste kommerzielle Computer?", ["ENIAC", "UNIVAC", "EDVAC", "IBM 650"], "UNIVAC"),
        new Frage("Wer gilt als der Vater des Computers?", ["Charles Babbage", "Alan Turing", "Steve Jobs", "Bill Gates"], "Charles Babbage"),
        new Frage("In welchem Jahr wurde der erste Mikroprozessor entwickelt?", ["1971", "1980", "1990", "2000"], "1971"),
        new Frage("Welche Firma entwickelte den ersten kommerziellen Laptop?", ["IBM", "Apple", "Dell", "HP"], "IBM"),
        new Frage("Welches war das erste Betriebssystem?", ["UNIX", "Windows", "Mac OS", "Linux"], "UNIX"),
        new Frage("Wann wurde das World Wide Web erfunden?", ["1989", "1995", "2001", "2010"], "1989"),
        new Frage("Welches war das erste Suchmaschinenunternehmen?", ["Google", "Yahoo", "Altavista", "Ask Jeeves"], "Altavista"),
        new Frage("Welches war das erste soziale Netzwerk?", ["Friendster", "Myspace", "Facebook", "LinkedIn"], "Friendster"),
        new Frage("Wer hat das erste Smartphone entwickelt?", ["Apple", "Samsung", "Nokia", "BlackBerry"], "IBM"),
        new Frage("Welches war das erste Videospiel?", ["Pong", "Tetris", "Super Mario Bros", "Pac-Man"], "Pong"),
        new Frage("In welchem Jahr wurde die erste E-Mail versendet?", ["1971", "1980", "1990", "2000"], "1971"),
        new Frage("Welches war das erste kommerzielle Handy?", ["Motorola DynaTAC 8000X", "Nokia 3210", "iPhone", "BlackBerry"], "Motorola DynaTAC 8000X"),
        new Frage("Wer gilt als der Vater des Internets?", ["Vint Cerf", "Tim Berners-Lee", "Steve Jobs", "Bill Gates"], "Vint Cerf"),
        new Frage("Wann wurde der erste Computer-Virus entdeckt?", ["1971", "1980", "1990", "2000"], "1980"),
        new Frage("Welche Programmiersprache wurde zuerst entwickelt?", ["Fortran", "C", "Java", "Python"], "Fortran"),
        new Frage("Wer hat das erste Betriebssystem entwickelt?", ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Tim Berners-Lee"], "Tim Berners-Lee"),
        new Frage("In welchem Jahr wurde der erste 3D-Drucker entwickelt?", ["1983", "1990", "2000", "2010"], "1983"),
        new Frage("Welches Unternehmen entwickelte den ersten kommerziellen CD-Player?", ["Sony", "Philips", "Panasonic", "Toshiba"], "Philips"),
        new Frage("Wer hat die erste Suchmaschine entwickelt?", ["Larry Page und Sergey Brin", "Jerry Yang und David Filo", "Mark Zuckerberg", "Bill Gates"], "Larry Page und Sergey Brin"),
        new Frage("Welches war das erste Online-Auktionshaus?", ["eBay", "Amazon", "Alibaba", "Rakuten"], "eBay"),
        new Frage("Wer hat die erste Digitalkamera erfunden?", ["Steven Sasson", "Thomas Edison", "Alexander Graham Bell", "Nikola Tesla"], "Steven Sasson"),
        new Frage("Wann wurde der erste kommerzielle Videorekorder auf den Markt gebracht?", ["1956", "1960", "1970", "1980"], "1956"),
        new Frage("Wer hat das erste Tablet entwickelt?", ["Microsoft", "Apple", "Samsung", "Amazon"], "Microsoft"),
        new Frage("Welches Unternehmen entwickelte den ersten Laserdrucker?", ["Xerox", "HP", "Canon", "Epson"], "Xerox"),
        new Frage("Wer hat das Konzept des World Wide Web entwickelt?", ["Tim Berners-Lee", "Larry Page und Sergey Brin", "Mark Zuckerberg", "Bill Gates"], "Tim Berners-Lee"),
        new Frage("In welchem Jahr wurde der erste öffentliche WLAN-Hotspot eingerichtet?", ["2000", "2005", "2010", "2015"], "2000"),
        new Frage("Welches Unternehmen entwickelte den ersten kommerziellen Farbfernseher?", ["RCA", "Sony", "Samsung", "Panasonic"], "RCA"),
        new Frage("Wer hat die erste kommerzielle Computermaus entwickelt?", ["Douglas Engelbart", "Steve Jobs", "Bill Gates", "Mark Zuckerberg"], "Douglas Engelbart"),
        new Frage("Welches war das erste kommerzielle E-Book?", ["The Gutenberg Bible", "Kindle", "Nook", "Sony Reader"], "The Gutenberg Bible"),
        new Frage("Wer hat den ersten Sprachassistenten entwickelt?", ["Apple", "Amazon", "Google", "Microsoft"], "IBM"),
        new Frage("In welchem Jahr wurde die erste SMS versendet?", ["1992", "1995", "2000", "2005"], "1992"),
        new Frage("Welches war das erste kommerzielle GPS-Gerät?", ["Garmin GPS 100", "TomTom Navigator", "Google Maps", "Apple Maps"], "Garmin GPS 100"),
        new Frage("Wer hat den ersten programmierbaren Roboterarm entwickelt?", ["George Devol", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg"], "George Devol"),
        new Frage("Welches Unternehmen entwickelte den ersten kommerziellen Videoplayer?", ["Sony", "Panasonic", "JVC", "Toshiba"], "Sony"),
        new Frage("Wer hat den ersten personalisierten Computer entwickelt?", ["Steve Jobs und Steve Wozniak", "Bill Gates und Paul Allen", "Larry Page und Sergey Brin", "Mark Zuckerberg und Eduardo Saverin"], "Steve Jobs und Steve Wozniak"),
        new Frage("In welchem Jahr wurde der erste Supercomputer entwickelt?", ["1960", "1970", "1980", "1990"], "1960"),
        new Frage("Welches war das erste kommerzielle Betriebssystem?", ["UNIX", "Windows", "Mac OS", "Linux"], "UNIX"),
        new Frage("Wer hat das erste elektronische Buch entwickelt?", ["Michael S. Hart", "Jeff Bezos", "Tim Berners-Lee", "Mark Zuckerberg"], "Michael S. Hart"),
        new Frage("In welchem Jahr wurde das erste Videotelefon vorgestellt?", ["1936", "1950", "1960", "1970"], "1936"),
        new Frage("Welches Unternehmen entwickelte den ersten kommerziellen Fernseher?", ["RCA", "Sony", "Samsung", "LG"], "RCA"),
        new Frage("Wer hat den ersten Personal Digital Assistant (PDA) entwickelt?", ["Apple", "Palm", "BlackBerry", "Microsoft"], "Palm"),
        new Frage("In welchem Jahr wurde der erste öffentliche Internetzugang bereitgestellt?", ["1989", "1995", "2001", "2005"], "1989"),
        new Frage("Welches Unternehmen entwickelte den ersten kommerziellen Kopfhörer?", ["Bose", "Sony", "Sennheiser", "Beats"], "Bose"),
        new Frage("Wer hat das erste E-Mail-Programm entwickelt?", ["Ray Tomlinson", "Larry Page und Sergey Brin", "Mark Zuckerberg", "Bill Gates"], "Ray Tomlinson"),
        new Frage("In welchem Jahr wurde das erste digitale Mobiltelefon eingeführt?", ["1973", "1980", "1990", "2000"], "1973"),
        new Frage("Welches war der erste kommerzielle Musikplayer?", ["Sony Walkman", "iPod", "Discman", "Zune"], "Sony Walkman"),
        new Frage("Wer hat den ersten kommerziellen Sprachsynthesizer entwickelt?", ["IBM", "Apple", "Microsoft", "Google"], "IBM"),
        new Frage("In welchem Jahr wurde der erste Computer-Monitor entwickelt?", ["1950", "1960", "1970", "1980"], "1950"),
        new Frage("Welches Unternehmen entwickelte die erste kommerzielle Datenbank?", ["IBM", "Oracle", "Microsoft", "SAP"], "IBM"),
        new Frage("Wer hat den ersten Computer-Virenscanner entwickelt?", ["Bernd Fix", "John McAfee", "Bill Gates", "Linus Torvalds"], "Bernd Fix"),
        new Frage("Welches war das erste kommerzielle MP3-Player-Gerät?", ["Diamond Rio PMP300", "iPod", "Zune", "Sony Walkman"], "Diamond Rio PMP300"),
        new Frage("Wer hat das erste Online-Zahlungssystem entwickelt?", ["PayPal", "Amazon Pay", "Apple Pay", "Google Pay"], "PayPal"),
        new Frage("In welchem Jahr wurde die erste Digitalkamera für den Massenmarkt eingeführt?", ["1990", "1995", "2000", "2005"], "1990"),
        new Frage("Welches Unternehmen entwickelte den ersten kommerziellen Laserpointer?", ["IBM", "Apple", "HP", "Logitech"], "IBM"),
        new Frage("Wer hat das erste Breitband-Internet entwickelt?", ["Robert E. Kahn und Vint Cerf", "Tim Berners-Lee", "Larry Page und Sergey Brin", "Bill Gates"], "Robert E. Kahn und Vint Cerf"),
        new Frage("Wann wurde das erste Echtzeitbetriebssystem entwickelt?", ["1950", "1960", "1970", "1980"], "1960"),
        new Frage("Welches war das erste kommerzielle Spracherkennungssystem?", ["IBM Shoebox", "Siri", "Alexa", "Google Assistant"], "IBM Shoebox"),
        new Frage("Wer hat den ersten Computer für den Heimgebrauch entwickelt?", ["Steve Jobs und Steve Wozniak", "Bill Gates und Paul Allen", "Larry Page und Sergey Brin", "Mark Zuckerberg und Eduardo Saverin"], "Steve Jobs und Steve Wozniak"),
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

    // Fragen zufällig auswählen
    const zufaelligeFragen = fragen.sort(() => Math.random() - 0.5).slice(0, 10);

    const quiz = new Quiz(zufaelligeFragen, spielername);
    quiz.startZeit = Date.now(); // Startzeit hier setzen

    // HTML-Elemente für Spielername und Start-Button ausblenden
    document.getElementById('spielername').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';

    quiz.zeigeFrage();
    quiz.timer.start();
}

// Spiel starten
document.getElementById('startButton').addEventListener('click', function() {
    const spielername = document.getElementById('spielername').value.trim();
    if (spielername === '') {
        alert('Bitte gib deinen Namen ein');
    } else {
        quizSpielStarten(spielername);
    }
});

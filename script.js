// Frage-Objekt erstellen
function Frage(text, antworten, korrekteAntwort) {
    this.text = text;
    this.antworten = antworten;
    this.korrekteAntwort = korrekteAntwort;
}

// Timer-Objekt erstellen
function Timer(callback) {
    this.zeit = 15;
    this.callback = callback;
    this.timerID = null;
}

// Timer starten
Timer.prototype.start = function() {
    this.zeit = 15;
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
    this.startZeit = Date.now();
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
        this.highlightAntwort(true);
    } else {
        this.zeigeFeedback('Falsch!', 'red');
        this.highlightAntwort(false);
    }

    setTimeout(() => this.naechsteFrage(), 1000);
}

// Nächste Frage laden
Quiz.prototype.naechsteFrage = function() {
    const antwortenDiv = document.getElementById('antworten');
    antwortenDiv.style.backgroundColor = '';  // Reset color

    this.frageIndex++;
    if (this.frageIndex < this.fragen.length) {
        this.timer.stop();
        this.timer.start();
        this.zeigeFrage();
    } else {
        this.quizBeenden();
    }
}

// Antwort hervorheben
Quiz.prototype.highlightAntwort = function(istRichtig) {
    const antwortenDiv = document.getElementById('antworten');
    antwortenDiv.style.backgroundColor = istRichtig ? 'lightgreen' : 'red';
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

    const wiederholungButton = this.erstelleWiederholungButton();
    feedbackDiv.appendChild(wiederholungButton);

    feedbackDiv.style.color = 'white';
}

// Wiederholung-Button erstellen
Quiz.prototype.erstelleWiederholungButton = function() {
    const wiederholungButton = document.createElement('button');
    wiederholungButton.innerText = 'Nochmal';
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

    frage.antworten.forEach((antwort, index) => {
        const antwortButton = document.createElement('button');
        antwortButton.innerText = `${index+1}. ${antwort}`;
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
        new Frage("Welches Unternehmen brachte den ersten personalisierten Computer auf den Markt?", ["IBM", "Apple", "Microsoft", "HP"], "IBM"),
        new Frage("Wer gilt allgemein als der 'Vater des Computers'?", ["John Atanasoff", "Alan Turing", "Charles Babbage", "John von Neumann"], "Charles Babbage"),
        new Frage("Wer ist der Gründer von Microsoft?", ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], "Bill Gates"),
        new Frage("Was ist das am weitesten verbreitete Betriebssystem für Personal Computer?", ["Linux", "macOS", "Windows", "Unix"], "Windows"),
        new Frage("Welches Unternehmen entwickelte den ersten Computer-Mausprototyp?", ["IBM", "Apple", "Xerox", "Microsoft"], "Xerox"),
        new Frage("In welchem Jahr wurde das World Wide Web (www) eingeführt?", ["1980", "1989", "1995", "2000"], "1989"),
        new Frage("Was bedeutet die Abkürzung 'URL'?", ["Uniform Resource Locator", "Universal Resource Locator", "Unified Retrieval Language", "Universal Retrieval Locator"], "Uniform Resource Locator"),
        new Frage("Welche Programmiersprache wurde zuerst entwickelt?", ["C", "Python", "FORTRAN", "Java"], "FORTRAN"),
        new Frage("Wer hat das Linux-Betriebssystem erstellt?", ["Linus Torvalds", "Steve Jobs", "Bill Gates", "Dennis Ritchie"], "Linus Torvalds"),
        new Frage("Welche Programmiersprache wird hauptsächlich zur Entwicklung von iOS-Anwendungen verwendet?", ["Objective-C", "Swift", "Python", "Java"], "Swift"),
        new Frage("Welche Datenstruktur folgt dem Last-In-First-Out-Prinzip (LIFO)?", ["Queue", "Array", "Stack", "Linked List"], "Stack"),
        new Frage("Was ist die maximale Länge einer IPv4-Adresse?", ["32 bit", "128 bit", "256 bit", "512 bit"], "32 bit"),
        new Frage("Was ist der Standard-Port für HTTP?", ["80", "8080", "443", "22"], "80"),
        new Frage("Was bedeutet die Abkürzung 'SQL'?", ["Structured Query Language", "Sequential Query Language", "Structured Queue Language", "Simple Query Language"], "Structured Query Language"),
        new Frage("Welches Protokoll wird zur Übertragung von Webseiten von Webservern zu Webbrowsern verwendet?", ["FTP", "SMTP", "HTTP", "SSH"], "HTTP"),
        new Frage("Welche Sprache wird üblicherweise für die Gestaltung von Webseiten verwendet?", ["Java", "Python", "HTML", "Swift"], "HTML"),
        new Frage("In welchem Jahr wurde der erste iPhone von Apple vorgestellt?", ["2005", "2007", "2010", "2012"], "2007"),
        new Frage("Wer hat das World Wide Web (www) entwickelt?", ["Bill Gates", "Vint Cerf", "Tim Berners-Lee", "Robert E. Kahn"], "Tim Berners-Lee"),
        new Frage("Welche Sprache wird hauptsächlich verwendet, um das Verhalten von Webseiten zu steuern?", ["JavaScript", "Python", "Java", "Swift"], "JavaScript"),
        new Frage("In welchem Jahr wurde der erste MacBook Pro veröffentlicht?", ["2003", "2006", "2010", "2015"], "2006"),
        new Frage("Welches Unternehmen brachte den ersten personalisierten Computer auf den Markt?", ["IBM", "Apple", "Microsoft", "HP"], "IBM"),
        new Frage("Wer gilt allgemein als der 'Vater des Computers'?", ["John Atanasoff", "Alan Turing", "Charles Babbage", "John von Neumann"], "Charles Babbage"),
        new Frage("Wer ist der Gründer von Microsoft?", ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], "Bill Gates"),
        new Frage("Was ist das am weitesten verbreitete Betriebssystem für Personal Computer?", ["Linux", "macOS", "Windows", "Unix"], "Windows"),
        new Frage("Welches Unternehmen entwickelte den ersten Computer-Mausprototyp?", ["IBM", "Apple", "Xerox", "Microsoft"], "Xerox"),
        new Frage("In welchem Jahr wurde das World Wide Web (www) eingeführt?", ["1980", "1989", "1995", "2000"], "1989"),
        new Frage("Was bedeutet die Abkürzung 'URL'?", ["Uniform Resource Locator", "Universal Resource Locator", "Unified Retrieval Language", "Universal Retrieval Locator"], "Uniform Resource Locator"),
        new Frage("Welche Programmiersprache wurde zuerst entwickelt?", ["C", "Python", "FORTRAN", "Java"], "FORTRAN"),
        new Frage("Wer hat das Linux-Betriebssystem erstellt?", ["Linus Torvalds", "Steve Jobs", "Bill Gates", "Dennis Ritchie"], "Linus Torvalds"),
        new Frage("Welche Programmiersprache wird hauptsächlich zur Entwicklung von iOS-Anwendungen verwendet?", ["Objective-C", "Swift", "Python", "Java"], "Swift"),
        new Frage("Welche Datenstruktur folgt dem Last-In-First-Out-Prinzip (LIFO)?", ["Queue", "Array", "Stack", "Linked List"], "Stack"),
        new Frage("Was ist die maximale Länge einer IPv4-Adresse?", ["32 bit", "128 bit", "256 bit", "512 bit"], "32 bit"),
        new Frage("Was ist der Standard-Port für HTTP?", ["80", "8080", "443", "22"], "80"),
        new Frage("Was bedeutet die Abkürzung 'SQL'?", ["Structured Query Language", "Sequential Query Language", "Structured Queue Language", "Simple Query Language"], "Structured Query Language"),
        new Frage("Welches Protokoll wird zur Übertragung von Webseiten von Webservern zu Webbrowsern verwendet?", ["FTP", "SMTP", "HTTP", "SSH"], "HTTP"),
        new Frage("Welche Sprache wird üblicherweise für die Gestaltung von Webseiten verwendet?", ["Java", "Python", "HTML", "Swift"], "HTML"),
        new Frage("In welchem Jahr wurde der erste iPhone von Apple vorgestellt?", ["2005", "2007", "2010", "2012"], "2007"),
        new Frage("Wer hat das World Wide Web (www) entwickelt?", ["Bill Gates", "Vint Cerf", "Tim Berners-Lee", "Robert E. Kahn"], "Tim Berners-Lee"),
        new Frage("Welche Sprache wird hauptsächlich verwendet, um das Verhalten von Webseiten zu steuern?", ["JavaScript", "Python", "Java", "Swift"], "JavaScript"),
        new Frage("In welchem Jahr wurde der erste MacBook Pro veröffentlicht?", ["2003", "2006", "2010", "2015"], "2006"),
        new Frage("Wann wurde der erste Computer entwickelt?", ["1945", "1950", "1960", "1970"], "1945"),
        new Frage("Welches Unternehmen brachte den ersten personalisierten Computer auf den Markt?", ["IBM", "Apple", "Microsoft", "HP"], "IBM"),
        new Frage("Welches war der erste kommerzielle Computer?", ["ENIAC", "UNIVAC", "EDVAC", "IBM 650"], "UNIVAC"),
        new Frage("Wer gilt als der Vater des Computers?", ["Charles Babbage", "Alan Turing", "Steve Jobs", "Bill Gates"], "Charles Babbage"),
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
        new Frage("Wer hat den ersten Computer für den Heimgebrauch entwickelt?", ["Steve Jobs und Steve Wozniak", "Bill Gates und Paul Allen", "Larry Page und Sergey Brin", "Mark Zuckerberg und Eduardo Saverin"], "Steve Jobs und Steve Wozniak")
    
    ];
    
    const zufaelligeFragen = fragen.sort(() => Math.random() - 0.5).slice(0, 10);
    const quiz = new Quiz(zufaelligeFragen, spielername);
    
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

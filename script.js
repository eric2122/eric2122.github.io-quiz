"use strict";

const QUESTION_SECONDS = 20;
const FEEDBACK_DELAY_MS = 1350;
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
  return shuffle(QUESTION_BANK, random).map((question) => {
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
  ui.resultPercent = document.getElementById("result-percent");
  ui.resultTime = document.getElementById("result-time");
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
  ui.resultPercent.textContent = `${percent} %`;
  ui.resultTime.textContent = formatTime(elapsedSeconds);
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
  shuffle,
  prepareQuestions,
  formatTime,
  normalizeName
});

document.addEventListener("DOMContentLoaded", initialize);

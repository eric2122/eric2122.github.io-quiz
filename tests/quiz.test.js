"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptPath = path.join(__dirname, "..", "script.js");
const source = fs.readFileSync(scriptPath, "utf8");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const context = {
  document: { addEventListener() {} },
  window: {}
};

vm.runInNewContext(source, context, { filename: scriptPath });

const quiz = context.window.HufschlagQuiz;

function seededRandom(seed) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

test("der Fragenpool enthält 100 eindeutige und vollständige Fragen", () => {
  assert.equal(quiz.questions.length, 100);
  assert.equal(new Set(quiz.questions.map((question) => question.id)).size, 100);
  assert.equal(new Set(quiz.questions.map((question) => question.question)).size, 100);

  quiz.questions.forEach((question) => {
    assert.ok(question.id);
    assert.ok(question.category);
    assert.ok(question.question);
    assert.equal(question.answers.length, 4);
    assert.equal(new Set(question.answers).size, 4);
    assert.ok(Number.isInteger(question.correctIndex));
    assert.ok(question.correctIndex >= 0 && question.correctIndex < question.answers.length);
    assert.ok(question.explanation);
  });
});

test("alle sieben Kategorien sind mit mehreren Fragen vertreten", () => {
  const expectedCategories = [
    "Allgemeines Wissen",
    "Anatomie",
    "Haltung",
    "Pferderassen",
    "Pflege",
    "Reiten",
    "Verhalten"
  ];
  const categories = [...new Set(quiz.questions.map((question) => question.category))].sort();

  assert.deepEqual(categories, expectedCategories);
  expectedCategories.forEach((category) => {
    const count = quiz.questions.filter((question) => question.category === category).length;
    assert.ok(count >= 14, `${category} enthält nur ${count} Fragen`);
  });
});

test("jede Runde enthält 20 eindeutige Fragen und behält die richtige Antwort", () => {
  for (let seed = 1; seed <= 25; seed += 1) {
    const round = quiz.prepareQuestions(seededRandom(seed));

    assert.equal(round.length, quiz.roundQuestionCount);
    assert.equal(new Set(round.map((question) => question.id)).size, quiz.roundQuestionCount);

    round.forEach((question) => {
      const sourceQuestion = quiz.questions.find((candidate) => candidate.id === question.id);
      const expectedAnswer = sourceQuestion.answers[sourceQuestion.correctIndex];

      assert.equal(question.answers[question.correctIndex], expectedAnswer);
    });
  }
});

test("unterschiedliche Zufallsfolgen erzeugen unterschiedliche Runden", () => {
  const firstRound = quiz.prepareQuestions(seededRandom(101)).map((question) => question.id);
  const secondRound = quiz.prepareQuestions(seededRandom(202)).map((question) => question.id);

  assert.notDeepEqual(firstRound, secondRound);
});

test("HTML-IDs sind eindeutig und alle JavaScript-Verweise vorhanden", () => {
  const htmlIds = [...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
  const referencedIds = [...source.matchAll(/getElementById\("([^"]+)"\)/g)].map((match) => match[1]);

  assert.equal(new Set(htmlIds).size, htmlIds.length);
  referencedIds.forEach((id) => assert.ok(htmlIds.includes(id), `HTML-Element #${id} fehlt`));
  assert.match(html, /20 aus 100 Fragen/);
});

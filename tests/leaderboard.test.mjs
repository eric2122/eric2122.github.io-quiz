import assert from "node:assert/strict";
import test from "node:test";

import {
  isBetterResult,
  normalizeDisplayName,
  normalizeLeaderboardRows,
  normalizeNameKey,
  parseAllowedOrigins,
  validateSubmission
} from "../worker/src/index.mjs";

test("Spitznamen werden normalisiert und sicher begrenzt", () => {
  assert.equal(normalizeDisplayName("  Oma   Hanni  "), "Oma Hanni");
  assert.equal(normalizeNameKey("Änne"), "änne");
  assert.equal(normalizeDisplayName(""), null);
  assert.equal(normalizeDisplayName("<script>"), null);
  assert.equal(normalizeDisplayName("a".repeat(25)), null);
});

test("nur plausible vollständige Runden werden angenommen", () => {
  const valid = validateSubmission({
    name: "Pferdefan",
    score: 18,
    totalQuestions: 20,
    elapsedSeconds: 183,
    website: ""
  });

  assert.equal(valid.ok, true);
  assert.deepEqual(valid.value, {
    name: "Pferdefan",
    normalizedName: "pferdefan",
    score: 18,
    elapsedSeconds: 183
  });

  assert.equal(validateSubmission({ name: "A", score: 21, totalQuestions: 20, elapsedSeconds: 183 }).ok, false);
  assert.equal(validateSubmission({ name: "A", score: 18, totalQuestions: 19, elapsedSeconds: 183 }).ok, false);
  assert.equal(validateSubmission({ name: "A", score: 18, totalQuestions: 20, elapsedSeconds: 20 }).ok, false);
  assert.equal(validateSubmission({ name: "A", score: 18, totalQuestions: 20, elapsedSeconds: 183, website: "bot" }).ok, false);
});

test("pro Spitzname bleibt nur das bessere Ergebnis maßgeblich", () => {
  const previous = { score: 17, elapsedSeconds: 200 };

  assert.equal(isBetterResult({ score: 18, elapsedSeconds: 260 }, previous), true);
  assert.equal(isBetterResult({ score: 17, elapsedSeconds: 190 }, previous), true);
  assert.equal(isBetterResult({ score: 17, elapsedSeconds: 210 }, previous), false);
  assert.equal(isBetterResult({ score: 16, elapsedSeconds: 150 }, previous), false);
});

test("die öffentliche Liste enthält höchstens fünf korrekt sortierte Einträge", () => {
  const rows = normalizeLeaderboardRows([
    { name: "D", score: 18, elapsedSeconds: 170 },
    { name: "A", score: 20, elapsedSeconds: 210 },
    { name: "C", score: 18, elapsedSeconds: 160 },
    { name: "B", score: 20, elapsedSeconds: 190 },
    { name: "F", score: 16, elapsedSeconds: 130 },
    { name: "E", score: 17, elapsedSeconds: 140 },
    { name: "<b>", score: 20, elapsedSeconds: 100 }
  ]);

  assert.deepEqual(rows.map((entry) => entry.name), ["B", "A", "C", "D", "E"]);
});

test("erlaubte Webseitenursprünge werden eindeutig gelesen", () => {
  assert.deepEqual(
    parseAllowedOrigins("https://example.com, http://127.0.0.1:4173"),
    ["https://example.com", "http://127.0.0.1:4173"]
  );
});

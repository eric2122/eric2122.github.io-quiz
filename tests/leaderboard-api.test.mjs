import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import leaderboardWorker from "../worker/src/index.mjs";
import { createNodeD1Adapter } from "../worker/test-support/node-d1.mjs";

function createTestEnvironment() {
  const database = new DatabaseSync(":memory:");
  const migration = readFileSync(
    new URL("../worker/migrations/0001_create_leaderboard.sql", import.meta.url),
    "utf8"
  );

  database.exec(migration);

  return {
    database,
    env: {
      ALLOWED_ORIGINS: "https://eric2122.github.io",
      DB: createNodeD1Adapter(database),
      SUBMIT_RATE_LIMITER: {
        async limit() {
          return { success: true };
        }
      }
    }
  };
}

async function apiRequest(env, path, options = {}) {
  const response = await leaderboardWorker.fetch(
    new Request(`https://leaderboard.test${path}`, {
      ...options,
      headers: {
        Origin: "https://eric2122.github.io",
        ...options.headers
      }
    }),
    env
  );
  const data = response.status === 204 ? null : await response.json();
  return { response, data };
}

function resultBody(name, score, elapsedSeconds) {
  return JSON.stringify({
    name,
    score,
    totalQuestions: 20,
    elapsedSeconds,
    website: ""
  });
}

test("die API speichert gemeinsame Ergebnisse und liefert dieselben Top 5", async (context) => {
  const { database, env } = createTestEnvironment();
  context.after(() => database.close());

  const empty = await apiRequest(env, "/leaderboard");
  assert.equal(empty.response.status, 200);
  assert.deepEqual(empty.data.entries, []);

  const players = [
    ["Oma", 18, 220],
    ["Eric", 20, 240],
    ["Lena", 20, 210],
    ["Mia", 17, 180],
    ["Papa", 19, 230],
    ["Hanni", 16, 160]
  ];

  for (const [name, score, elapsedSeconds] of players) {
    const saved = await apiRequest(env, "/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: resultBody(name, score, elapsedSeconds)
    });
    assert.equal(saved.response.status, 200);
  }

  const leaderboard = await apiRequest(env, "/leaderboard");
  assert.deepEqual(
    leaderboard.data.entries.map((entry) => entry.name),
    ["Lena", "Eric", "Papa", "Oma", "Mia"]
  );
  assert.equal(leaderboard.data.entries.length, 5);
});

test("ein schlechteres Ergebnis überschreibt die persönliche Bestleistung nicht", async (context) => {
  const { database, env } = createTestEnvironment();
  context.after(() => database.close());

  const first = await apiRequest(env, "/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: resultBody("Oma", 18, 220)
  });
  assert.equal(first.data.improved, true);
  assert.equal(first.data.rank, 1);

  const worse = await apiRequest(env, "/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: resultBody("Oma", 17, 180)
  });
  assert.equal(worse.data.improved, false);
  assert.deepEqual(worse.data.personalBest, {
    name: "Oma",
    score: 18,
    elapsedSeconds: 220
  });
});

test("die API weist fremde Webseiten und unplausible Ergebnisse ab", async (context) => {
  const { database, env } = createTestEnvironment();
  context.after(() => database.close());

  const foreignOrigin = await leaderboardWorker.fetch(
    new Request("https://leaderboard.test/leaderboard", {
      headers: { Origin: "https://example.com" }
    }),
    env
  );
  assert.equal(foreignOrigin.status, 403);

  const impossible = await apiRequest(env, "/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: resultBody("Schummler", 21, 61)
  });
  assert.equal(impossible.response.status, 400);
});

test("die API setzt sichere CORS-Antworten für das Quiz", async (context) => {
  const { database, env } = createTestEnvironment();
  context.after(() => database.close());

  const preflight = await apiRequest(env, "/leaderboard", { method: "OPTIONS" });

  assert.equal(preflight.response.status, 204);
  assert.equal(
    preflight.response.headers.get("Access-Control-Allow-Origin"),
    "https://eric2122.github.io"
  );
  assert.match(
    preflight.response.headers.get("Access-Control-Allow-Methods"),
    /POST/
  );
});

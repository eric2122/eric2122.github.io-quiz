const MAX_NAME_LENGTH = 24;
const MAX_STORED_PLAYERS = 100;
const ROUND_QUESTION_COUNT = 20;
const MIN_ROUND_SECONDS = 60;
const MAX_ROUND_SECONDS = 3600;

const LEADERBOARD_QUERY = `
  SELECT
    display_name AS name,
    score,
    elapsed_seconds AS elapsedSeconds
  FROM leaderboard
  ORDER BY score DESC, elapsed_seconds ASC, achieved_at ASC
  LIMIT 5
`;

export function normalizeDisplayName(value) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.normalize("NFKC").trim().replace(/\s+/gu, " ");

  if (
    normalized.length === 0
    || Array.from(normalized).length > MAX_NAME_LENGTH
    || /[<>\p{Cc}\p{Cf}]/u.test(normalized)
  ) {
    return null;
  }

  return normalized;
}

export function normalizeNameKey(value) {
  return normalizeDisplayName(value)?.toLocaleLowerCase("de-DE") ?? null;
}

export function isBetterResult(candidate, previous) {
  if (!previous) {
    return true;
  }

  return candidate.score > previous.score
    || (
      candidate.score === previous.score
      && candidate.elapsedSeconds < previous.elapsedSeconds
    );
}

export function validateSubmission(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, message: "Ungültige Ergebnisdaten." };
  }

  if (payload.website) {
    return { ok: false, message: "Ungültige Ergebnisdaten." };
  }

  const name = normalizeDisplayName(payload.name);
  const score = Number(payload.score);
  const totalQuestions = Number(payload.totalQuestions);
  const elapsedSeconds = Number(payload.elapsedSeconds);

  if (!name) {
    return { ok: false, message: "Bitte verwende einen Spitznamen mit höchstens 24 Zeichen." };
  }

  if (
    !Number.isInteger(score)
    || score < 0
    || score > ROUND_QUESTION_COUNT
    || totalQuestions !== ROUND_QUESTION_COUNT
  ) {
    return { ok: false, message: "Der Punktestand ist ungültig." };
  }

  if (
    !Number.isInteger(elapsedSeconds)
    || elapsedSeconds < MIN_ROUND_SECONDS
    || elapsedSeconds > MAX_ROUND_SECONDS
  ) {
    return { ok: false, message: "Die Spielzeit ist ungültig." };
  }

  return {
    ok: true,
    value: {
      name,
      normalizedName: normalizeNameKey(name),
      score,
      elapsedSeconds
    }
  };
}

export function normalizeLeaderboardRows(rows) {
  return (Array.isArray(rows) ? rows : [])
    .map((row) => ({
      name: normalizeDisplayName(row.name),
      score: Number(row.score),
      elapsedSeconds: Number(row.elapsedSeconds)
    }))
    .filter((row) => (
      row.name
      && Number.isInteger(row.score)
      && row.score >= 0
      && row.score <= ROUND_QUESTION_COUNT
      && Number.isInteger(row.elapsedSeconds)
      && row.elapsedSeconds >= 0
      && row.elapsedSeconds <= MAX_ROUND_SECONDS
    ))
    .sort((first, second) => (
      second.score - first.score
      || first.elapsedSeconds - second.elapsedSeconds
      || first.name.localeCompare(second.name, "de")
    ))
    .slice(0, 5);
}

export function parseAllowedOrigins(value) {
  return String(value ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin");

  if (!origin) {
    return null;
  }

  return parseAllowedOrigins(env.ALLOWED_ORIGINS).includes(origin) ? origin : false;
}

function createHeaders(origin, extra = {}) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    ...extra
  });

  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }

  return headers;
}

function jsonResponse(data, status = 200, origin = null, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: createHeaders(origin, extraHeaders)
  });
}

async function readLeaderboard(database) {
  const result = await database.prepare(LEADERBOARD_QUERY).all();
  return normalizeLeaderboardRows(result.results);
}

async function getPersonalResult(database, normalizedName) {
  return database.prepare(`
    SELECT
      display_name AS name,
      score,
      elapsed_seconds AS elapsedSeconds
    FROM leaderboard
    WHERE normalized_name = ?
  `).bind(normalizedName).first();
}

async function getRank(database, score, elapsedSeconds) {
  const row = await database.prepare(`
    SELECT COUNT(*) + 1 AS rank
    FROM leaderboard
    WHERE score > ?
      OR (score = ? AND elapsed_seconds < ?)
  `).bind(score, score, elapsedSeconds).first();

  return Number(row?.rank) || null;
}

async function submitResult(request, env, origin) {
  const contentLength = Number(request.headers.get("Content-Length") ?? 0);

  if (contentLength > 2048) {
    return jsonResponse({ error: "Die Anfrage ist zu groß." }, 413, origin);
  }

  if (env.SUBMIT_RATE_LIMITER?.limit) {
    const rateLimitKey = request.headers.get("CF-Connecting-IP") ?? "local-preview";
    const rateLimit = await env.SUBMIT_RATE_LIMITER.limit({ key: rateLimitKey });

    if (!rateLimit.success) {
      return jsonResponse(
        { error: "Zu viele Ergebnisse in kurzer Zeit. Bitte versuche es gleich noch einmal." },
        429,
        origin,
        { "Retry-After": "60" }
      );
    }
  }

  let payload;

  try {
    const rawBody = await request.text();

    if (rawBody.length > 2048) {
      return jsonResponse({ error: "Die Anfrage ist zu groß." }, 413, origin);
    }

    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Ungültige Ergebnisdaten." }, 400, origin);
  }

  const validation = validateSubmission(payload);

  if (!validation.ok) {
    return jsonResponse({ error: validation.message }, 400, origin);
  }

  const candidate = validation.value;
  const previous = await getPersonalResult(env.DB, candidate.normalizedName);
  const improved = isBetterResult(candidate, previous);

  if (improved) {
    await env.DB.prepare(`
      INSERT INTO leaderboard (
        normalized_name,
        display_name,
        score,
        elapsed_seconds,
        achieved_at
      )
      VALUES (?, ?, ?, ?, datetime('now'))
      ON CONFLICT(normalized_name) DO UPDATE SET
        display_name = excluded.display_name,
        score = excluded.score,
        elapsed_seconds = excluded.elapsed_seconds,
        achieved_at = excluded.achieved_at
      WHERE excluded.score > leaderboard.score
        OR (
          excluded.score = leaderboard.score
          AND excluded.elapsed_seconds < leaderboard.elapsed_seconds
        )
    `).bind(
      candidate.normalizedName,
      candidate.name,
      candidate.score,
      candidate.elapsedSeconds
    ).run();
  }

  await env.DB.prepare(`
    DELETE FROM leaderboard
    WHERE normalized_name NOT IN (
      SELECT normalized_name
      FROM leaderboard
      ORDER BY score DESC, elapsed_seconds ASC, achieved_at ASC
      LIMIT ?
    )
  `).bind(MAX_STORED_PLAYERS).run();

  const personalBest = await getPersonalResult(env.DB, candidate.normalizedName);
  const [entries, rank] = await Promise.all([
    readLeaderboard(env.DB),
    personalBest
      ? getRank(env.DB, Number(personalBest.score), Number(personalBest.elapsedSeconds))
      : Promise.resolve(null)
  ]);

  return jsonResponse({
    entries,
    improved,
    rank,
    personalBest: personalBest
      ? {
        name: normalizeDisplayName(personalBest.name),
        score: Number(personalBest.score),
        elapsedSeconds: Number(personalBest.elapsedSeconds)
      }
      : null
  }, 200, origin);
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const origin = getAllowedOrigin(request, env);

  if (request.method === "OPTIONS") {
    if (origin === false) {
      return jsonResponse({ error: "Diese Webseite ist nicht freigeschaltet." }, 403);
    }

    return new Response(null, {
      status: 204,
      headers: createHeaders(origin, {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Max-Age": "86400"
      })
    });
  }

  if (url.pathname === "/health" && request.method === "GET") {
    await env.DB.prepare("SELECT 1").first();
    return jsonResponse({ ok: true }, 200, origin || null);
  }

  if (url.pathname !== "/leaderboard") {
    return jsonResponse({ error: "Nicht gefunden." }, 404, origin || null);
  }

  if (origin === false) {
    return jsonResponse({ error: "Diese Webseite ist nicht freigeschaltet." }, 403);
  }

  if (request.method === "GET") {
    return jsonResponse({ entries: await readLeaderboard(env.DB) }, 200, origin);
  }

  if (request.method === "POST") {
    return submitResult(request, env, origin);
  }

  return jsonResponse(
    { error: "Methode nicht erlaubt." },
    405,
    origin,
    { Allow: "GET, POST, OPTIONS" }
  );
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      console.error("Leaderboard request failed", error);
      const origin = getAllowedOrigin(request, env);
      return jsonResponse(
        { error: "Die Bestenliste ist gerade nicht erreichbar." },
        500,
        origin || null
      );
    }
  }
};

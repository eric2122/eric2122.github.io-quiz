import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";

import leaderboardWorker from "../worker/src/index.mjs";
import { createNodeD1Adapter } from "../worker/test-support/node-d1.mjs";

const port = 8787;
const database = new DatabaseSync(":memory:");
const migration = readFileSync(
  new URL("../worker/migrations/0001_create_leaderboard.sql", import.meta.url),
  "utf8"
);

database.exec(migration);

const env = {
  ALLOWED_ORIGINS: "http://127.0.0.1:4173,http://localhost:4173",
  DB: createNodeD1Adapter(database),
  SUBMIT_RATE_LIMITER: {
    async limit() {
      return { success: true };
    }
  }
};

const server = createServer(async (request, response) => {
  try {
    const chunks = [];

    for await (const chunk of request) {
      chunks.push(chunk);
    }

    const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
    const workerRequest = new Request(
      `http://127.0.0.1:${port}${request.url}`,
      {
        method: request.method,
        headers: request.headers,
        body
      }
    );
    const workerResponse = await leaderboardWorker.fetch(workerRequest, env);

    response.writeHead(
      workerResponse.status,
      Object.fromEntries(workerResponse.headers.entries())
    );
    response.end(Buffer.from(await workerResponse.arrayBuffer()));
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Lokaler Testserver fehlgeschlagen." }));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Lokale Bestenlisten-API: http://127.0.0.1:${port}`);
});

function closeServer() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);

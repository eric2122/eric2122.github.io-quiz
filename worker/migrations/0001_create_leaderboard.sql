CREATE TABLE IF NOT EXISTS leaderboard (
  normalized_name TEXT PRIMARY KEY NOT NULL
    CHECK (length(normalized_name) BETWEEN 1 AND 96),
  display_name TEXT NOT NULL
    CHECK (length(display_name) BETWEEN 1 AND 96),
  score INTEGER NOT NULL
    CHECK (score BETWEEN 0 AND 20),
  elapsed_seconds INTEGER NOT NULL
    CHECK (elapsed_seconds BETWEEN 60 AND 3600),
  achieved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS leaderboard_ranking
ON leaderboard (score DESC, elapsed_seconds ASC, achieved_at ASC);

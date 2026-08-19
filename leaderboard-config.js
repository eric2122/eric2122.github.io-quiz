"use strict";

const isLocalPreview = ["127.0.0.1", "localhost"].includes(window.location.hostname);

window.HufschlagConfig = Object.freeze({
  leaderboardApiUrl: isLocalPreview
    ? "http://127.0.0.1:8787"
    : "https://hufschlag-leaderboard.ericyo79.workers.dev"
});

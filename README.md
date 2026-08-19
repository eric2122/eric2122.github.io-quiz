# Hufschlag – Das Pferdequiz

Ein responsives Pferdequiz mit einem Pool aus 100 Fragen in sieben Kategorien. Pro Runde werden 20 Fragen zufällig ausgewählt. Das Projekt verwendet bewusst nur HTML, CSS und Vanilla JavaScript und benötigt weder Build-Schritt noch Framework.

## Live-Version

https://eric2122.github.io/eric2122.github.io-quiz/

## Funktionen

- Spielername, Punktestand und Fortschrittsanzeige
- 20-Sekunden-Timer pro Frage
- 100 eindeutige Fragen mit je vier Antwortmöglichkeiten
- 20 zufällig ausgewählte Fragen pro Runde
- zufällige Reihenfolge der ausgewählten Fragen und ihrer Antworten
- direktes Richtig-/Falsch-Feedback mit kurzer Erklärung
- automatischer Wechsel zur nächsten Frage
- Ergebnis mit Trefferquote und Gesamtzeit
- gemeinsame Top-5-Bestenliste für alle Geräte
- pro Spitzname bleibt automatisch die beste Runde gespeichert
- neue Runde mit neu gemischten Fragen
- responsive Oberfläche für Smartphone, Tablet und Desktop
- Tastaturbedienung, sichtbare Fokuszustände und Live-Feedback für Hilfstechnologien

## Kategorien

Pferderassen, Haltung, Pflege, Anatomie, Reiten, Verhalten und allgemeines Pferdewissen.

## Gemeinsame Bestenliste

Das Quiz bleibt eine statische GitHub-Pages-Seite. Ergebnisse werden über eine
kleine Cloudflare-Worker-API in einer D1-Datenbank gespeichert. Öffentlich
ausgegeben werden nur die fünf besten Einträge mit Spitzname, Punkten und
Spielzeit.

Die API prüft Namen, Punktestand, Fragenzahl und Spielzeit, begrenzt
Einreichungen pro Verbindung und akzeptiert Browserzugriffe ausschließlich von
der freigeschalteten Quizseite. Im Repository liegen keine geheimen Schlüssel.
Ist die API nicht erreichbar, bleibt das Quiz vollständig spielbar.

## Lokal starten

Für die Webseite reicht ein einfacher lokaler Webserver im Projektordner. Die
lokale Bestenlisten-API kann nach der Installation der Entwicklungsabhängigkeiten
separat gestartet werden:

```sh
npm install
npm run leaderboard:dev
```

Die API läuft anschließend unter `http://127.0.0.1:8787`.

## Tests

Mit einer lokal vorhandenen Node.js-Laufzeit lassen sich die Daten- und Zufallstests ohne weitere Abhängigkeiten ausführen:

```sh
npm test
```

Die Tests prüfen zusätzlich die Datenvalidierung, SQL-Speicherung, gemeinsame
Sortierung, persönliche Bestleistungen, Top-5-Begrenzung und CORS-Regeln.

## Deployment

GitHub Pages bleibt unverändert aktiviert. Die Anwendung liegt weiterhin direkt im Repository und verwendet `index.html` als Einstiegspunkt. Es gibt keinen Build-Schritt und keine GitHub-Actions-Abhängigkeit.

Die Bestenlisten-API wird getrennt davon bereitgestellt:

```sh
npm run leaderboard:deploy
npm run leaderboard:migrate:remote
```

Danach wird die ausgegebene Worker-Adresse in `leaderboard-config.js`
eingetragen. Die Webseite wird erst veröffentlicht, wenn API, Datenbank und
End-to-End-Test erfolgreich sind.

## Sicherung des Vorgängers

Die letzte alte Version auf `main` stammt aus Commit `7f7b43de7898d21286af9012114789d7004aa5f1` vom 21. Juli 2023. Vor der Überarbeitung wurde dieser Stand zusätzlich als vollständiges Quellarchiv gesichert.

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
- neue Runde mit neu gemischten Fragen
- responsive Oberfläche für Smartphone, Tablet und Desktop
- Tastaturbedienung, sichtbare Fokuszustände und Live-Feedback für Hilfstechnologien

## Kategorien

Pferderassen, Haltung, Pflege, Anatomie, Reiten, Verhalten und allgemeines Pferdewissen.

## Lokal starten

Da die Anwendung vollständig statisch ist, reicht ein einfacher lokaler Webserver im Projektordner. Alternativ kann `index.html` direkt geöffnet werden.

## Tests

Mit einer lokal vorhandenen Node.js-Laufzeit lassen sich die Daten- und Zufallstests ohne weitere Abhängigkeiten ausführen:

```sh
node --test tests/quiz.test.js
```

## Deployment

GitHub Pages bleibt unverändert aktiviert. Die Anwendung liegt weiterhin direkt im Repository und verwendet `index.html` als Einstiegspunkt. Es gibt keinen Build-Schritt und keine GitHub-Actions-Abhängigkeit.

## Sicherung des Vorgängers

Die letzte alte Version auf `main` stammt aus Commit `7f7b43de7898d21286af9012114789d7004aa5f1` vom 21. Juli 2023. Vor der Überarbeitung wurde dieser Stand zusätzlich als vollständiges Quellarchiv gesichert.

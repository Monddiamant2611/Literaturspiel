# Das Literatur-Archiv

Phase 5 ergänzt Transferaufgaben und einen achtteiligen Abschlusstest.

Statisches Lernspiel für den Deutschunterricht auf Basis von React, TypeScript und Vite. Phase 2 implementiert den ersten vollständigen Lernzyklus **Entdecken → Zuordnen → Verstehen**. Die Anwendung benötigt kein Backend und nutzt relative Build-Pfade für eine spätere Veröffentlichung über GitHub Pages.

## Entwicklung

- `npm run dev` – lokale Entwicklung
- `npm run typecheck` – TypeScript-Prüfung
- `npm run lint` – Lint
- `npm test` – Unit-Tests
- `npm run test:e2e` – Browsertests
- `npm run build` – Produktionsbuild

## Struktur

- `src/components` – wiederverwendbare UI-, Glossar- und Dekorationskomponenten
- `src/data` – Asset-Manifest und lösungsneutrale Glossardaten
- `src/styles` – zentrale Design-Tokens und responsive Gestaltung
- `public/assets` – unveränderte, redaktionell bereitgestellte Bilddateien
- `tests` – Manifest-, Daten- und Browserprüfungen

## Phase 2

### Textsortenmodell

`src/data/textTypes.ts` enthält 22 Textsorten mit stabiler ID, Kategorie, lösungsneutraler Vorab-Beschreibung, ausführlicher Wissensbeschreibung, mindestens drei Erkennungsmerkmalen, optionaler Besonderheit beziehungsweise Diskussionsnotiz und einer Liste verwendeter Glossarbegriffe. Das Modell kann seine Erkennungsmerkmale später erneut verwenden, implementiert aber noch keine Phase-3-Mechanik.

### Strukturierter Rich Text

Erklärungstexte bestehen aus kontrollierten Text- und Glossarsegmenten. `RichTextRenderer` rendert Textsegmente direkt und Glossarsegmente über das vorhandene `GlossaryTerm`. Es werden weder HTML-Strings noch `dangerouslySetInnerHTML` verwendet.

### Lernkartenmechanik

Jede Karte zeigt zunächst nur den Textsortennamen, eine optionale neutrale Beschreibung und die fünf Kategorien. Nach genau einer Auswahl werden alle Kategorien gesperrt, die korrekte Lösung und ruhiges Feedback angezeigt und eine ausführliche `KnowledgeCard` mit Erkennungsmerkmalen geöffnet. Die Fortschrittsanzeige zeigt die aktuelle Karte von 22; es gibt keine Punkte oder lokale Speicherung.

### Dekoration und Responsive-Verhalten

Vor der Zuordnung verwendet `DecorativeLayer` ausschließlich Schriftrolle, Schreibutensilien und Rahmenelemente. Erst nach der Auflösung erscheint ein zurückhaltendes Motiv für die korrekte Kategorie. Das Fünffachraster bricht auf Tablet in drei, auf kleineren Geräten in zwei beziehungsweise eine Spalte um. Karten haben keine festen Höhen; Langwörter, Wissenslisten und Glossarfenster bleiben vollständig sichtbar.

### Datenvalidierung

Automatische Tests sichern eindeutige IDs, gültige Kategorien, vollständige Beschreibungen, mindestens drei Erkennungsmerkmale, existierende Glossarverweise und das Verbot der fünf Kategorienamen in allen Vorab-Beschreibungen.

## Phase 3 – Erinnern und Vernetzen

Die Phase-2-Abschlussansicht führt mit „Das Archiv prüfen“ direkt in vier aufeinander aufbauende Bereiche. Es entsteht keine zweite Anwendung und keine neue Route.

### Aufgabentypen

1. **Welche Textsorte bin ich?** – Acht Aufgaben verwenden direkt die vorhandenen `recognitionFeatures`. Vier Antwortoptionen werden bevorzugt aus derselben Kategorie zusammengestellt. Ein Hinweis schaltet genau ein weiteres bestehendes Merkmal frei und wird für die Sitzung vermerkt.
2. **Merkmalsarchiv** – Sechs Merkmalskarten kombinieren richtige Merkmale der aktuellen Textsorte mit plausiblen Merkmalen ähnlicher Textsorten. Alle Texte werden zur Laufzeit aus `recognitionFeatures` gelesen. Nach der Prüfung werden richtige, unpassende und fehlende Karten mit Textstatus und den vorhandenen Häkchen-/X-Assets gekennzeichnet.
3. **Wer passt zu wem?** – Drei aus fünf Vergleichspaaren werden pro Durchgang ausgewählt. Jedes Merkmal wird Textsorte A, beiden oder Textsorte B zugeordnet. Die primäre Quelle bleiben die Textsortenmerkmale; wenige gemeinsame Vergleichsformulierungen sind direkt an das jeweilige Paar gebunden.
4. **Begriffsnetz** – Sieben Anwendungssituationen prüfen zusammen alle 22 Glossarbegriffe. Antwortbegriffe sind vor der Entscheidung normale Auswahlbuttons. Erst nach der Auflösung werden richtige Begriffe wieder als `GlossaryTerm` angeboten.

### Auswahl- und Validierungslogik

`src/data/phase3.ts` enthält ausschließlich Aufgabenreferenzen, Auswahlstrategien und Anwendungssituationen. Textsortennamen, Kategorien und Merkmalsformulierungen werden weiterhin aus `src/data/textTypes.ts` gelesen. Automatische Validierung prüft vorhandene Antworten und Distraktoren, doppelte Optionen, nichtleere Merkmale, existierende Vergleichspaare und Glossar-IDs sowie lösungsneutrale Hinweise.

### Sitzungsstatistik und Zwischenbilanz

Während der laufenden Phase werden nur im React-Zustand festgehalten:

- ohne Hinweis zuerst richtig erkannte Textsorten,
- Textsorten mit Hinweis oder Fehlzuordnung,
- falsch beziehungsweise nicht ausgewählte Fachbegriffe.

Die Zwischenbilanz „Das Archiv nimmt Gestalt an“ leitet daraus die Bereiche „Sicher erkannt“, „Noch einmal ansehen“ und „Fachbegriffe wiederholen“ ab. Sie erzeugt keine erfundenen Empfehlungen, keine Note und keine Punktzahl. Problematische Fachbegriffe öffnen direkt das bestehende Glossar. „Weiter“ führt ausschließlich zur Ankündigung für Phase 4.

### Responsive Verhalten

Merkmalskarten wachsen mit ihrem Inhalt. Das Vergleichslayout wechselt auf schmalen Geräten von zwei gegenüberliegenden Textsorten zu einer vertikalen Darstellung; die drei Ziele werden auf sehr schmalen Geräten ebenfalls untereinander angeordnet. Alle Auswahlflächen bleiben mindestens 44 Pixel hoch. Dekorationen wechseln bereichsbezogen, bleiben jedoch vollständig außerhalb der Interaktionsebene.

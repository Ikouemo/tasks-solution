# Aufgaben-Lösungen

## Ansatz & Denkweise

Das Ziel dieser Umsetzung bestand nicht nur darin, die Aufgaben zu lösen, sondern auch darin die Lösung **übersichtlich, vorhersehbar und leicht verständlich** zu gestalten.

Ich habe mich auf Folgendes fokussiert:

- Trennung von **Zustand, Logik, und UI**
- Lösungen **einfach und eindeutig** halten.
- Unnötige Komplexität vermeiden.
- Das Verhalten leicht nachvollziehbar machen.

---

## Wie ich die Aufgaben angegangen bin

Bei jeder Aufgabe bin ich nach dem gleichen
Schema vorgegangen:

1. **Das Datenmodell verstehen**
2. **Eine klare Zustandsdarstellung definieren**
3. **Interaktionslogik implementieren**
4. **UI basierend auf dem Zustand rendern**
5. **Visuelles Feedback hinzufügen**

## Aufgabe 1 - Sortierbare Tabelle

### Denkprozess

- Die Sortierung sollte vorhersehbar sein
  → Stabile Sortierung implementiert.
- Unterschiedliche Datentypen erfordern
  unterschiedliche Vergleichsstrategien.
- Die Benutzeroberfläche sollte den aktuellen
  Sortierzustand klar widerspiegeln.

### Entscheidungen

- Zentrale sortBy-Funktion für die gesamte Sortierlogik.
- Separate Vergleichslogik (`compareValues`).
- Zustandsgesteuerte Aktualisierungen
  der Benutzeroberfläche (Rendering +
  Indikatoren in Kopfzeile).

---

## Aufgabe 2 - Ticket-Board

### Denkprozess

- Tickets als einzige Quelle der Wahrheit behandeln.
- Komplexität durch direkte DOM-Manipulation
  vermeiden → stattdessen neu rendern.
- Drag-and-Drop-Logik minimal und lesbar halten.

### Entscheidungen

- Gezogene Ticket-ID statt des
  vollständigen Objekts speichern.
- Einfache Statusaktualisierungen.
  anstelle komplexer Strukturen verwenden.
- Zustand in `localStorage` speichern für bessere UX.

---

## Aufgabe 3 - Parkplatzauswahl

### Denkprozess

- Die Auswahl ist ein Zustandsproblem → `Set` verwenden.
- Einschränkungen (max. 3) sollten in der Logik
  durchgesetzt werden, nicht in der Benutzeroberfläche.
- Die Benutzeroberfläche sollte den aktuellen
  Zustand immer sofort widerspiegeln.

  ### Entscheidungen

  - Verwendung von `Set`für eine effiziente
    Verwaltung der Auswahl.
  - Vorzeitiger Abbruch bei ungültigen
    Aktionen (belegte Plätze).
  - Rendering einfach und vollständig
    zustandsgesteuert halten.

## Überlegungen zur Benutzeroberfläche

- Klare visuelle Zustände verbessern
  die Benutzerfreundlichkeit.
- Sofortiges Feedback hilft
  Benutzern, Interaktionen zu verstehen.
- Konsistente Abstände und ein einheitliches
  Layout erhöhen die Lesbarkeit.

---

## Was ich verbessern würde

- Task1: Die Die Sortierindikatoren(▲/▼) werden derzeit über
  `textContent` im Kombination mit `replace()` gesteuert. Dieser Ansatz
  ist etwas anfällig. Eine robuste Lösung wäre die Verwendung eines speziellen
  `<span>`-Elements oder von CSS-Pseudo-Elementen (::after).
- In kleinere, wiederverwendbare Module umgestalten.

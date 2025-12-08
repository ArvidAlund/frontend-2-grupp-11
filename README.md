# 📌 Projektarbete – Productivity Assistant Application

## 📅 Slutförandevillkor
- **Projekt öppnades:** Torsdag 8 december 2025  
- **Deadline:** Måndag 22 december 2025, 23:59  

---

## 🎯 Projektbeskrivning
Applikationen ska underlätta produktivitet i vardagslivet genom att ge användaren möjlighet att:
- Hantera **Todos & Activities** (ärenden att utföra)
- Spåra **Habits** (rutiner och repetitioner)
- Planera **Events** (tidsspecifika händelser)

För **VG‑nivå** krävs inloggning med användarhantering, lagring av data per användare samt en startsida med översikt.

---

## 🛠 Funktionalitet

### ✅ Todos & Activities
- Skapa, redigera, ta bort ärenden
- Markera som slutfört
- Fält: Titel, Beskrivning, Status, Tidsestimat, Kategori, Deadline
- Filtrering: Status, Kategori
- Sortering: Deadline, Tidsestimat, Status

### ✅ Habits
- Skapa och ta bort rutiner
- Fält: Titel, Repetitioner, Prioritet
- Uppdatera repetitioner (öka, minska, nollställa)
- Filtrering: Prioritet
- Sortering: Repetitioner, Prioritet

### ✅ Event Planner
- Skapa, redigera, ta bort händelser
- Fält: Start, Slut, Namn
- Sortering: Nästkommande händelser först
- Visa tidigare händelser separat
- Filtrering: Kommande / Tidigare händelser

### ⭐ VG‑krav (Inloggning & Startsida)
- Registrera och logga in användare (användarnamn + lösenord)
- Lagra data per användare i `localStorage` och `sessionStorage`
- Hälsning + slumpat citat från [Quotable API](https://api.quotable.io/)
- Startsida visar:
  - 3 senaste ej utförda ärenden
  - 3 rutiner med flest repetitioner
  - 3 nästkommande händelser
  - Länkar till fullständiga listor

---

## 📐 Projektmetodik

### Planering
- Trello används för planering och översikt  
- Samtliga medlemmar + **Brandon.DuarteTsegai@nackademin.se** är inbjudna  
- Minst fem spalter: **Backlog, Todo, In Progress, Ready for Test, Done**  
- Backlog fylls med alla ärenden för hela projektet  
- Wireframe tas fram utifrån kravställning  

### Sprintar
- Projektlängd: **2 sprintar (1 vecka vardera)**  
- Sprintplanering: Ärenden flyttas från *Backlog* till *Todo*  
- Varje Trello‑kort har en huvudansvarig  

### Standups
- 5–15 min dagliga avstämningar  
- Dokumenteras med tid, deltagare och diskussioner (Trello eller Google Docs)  

### Retrospektiv
- Efter Sprint 1: Vad gick bra, vad kan förbättras  
- Dokumenteras i Trello eller Google Docs  

### Git Flow
- Repo på GitHub  
- Branches skapas från `main`  
- Merge sker regelbundet efter kodgranskning  

### Testning
- Ärenden testas av andra gruppmedlemmar  
- Ingen får markera sina egna ärenden som färdiga  

---

## 🏆 Bedömningskriterier

### Godkänt (G)
- Grundläggande DOM‑manipulering  
- Aktivt deltagande i projektet (Trello, möten)  
- Bidrar till agilt arbete och problemlösning  
- Enhetligt utseende på applikationen  

### Väl godkänt (VG)
- Uppfyller samtliga G‑krav  
- Ingen större bugg i applikationen  
- Stöd för registrering och inloggning av flera användare  
- Använder `localStorage` och `sessionStorage` för användardata  

---

## 👥 Team & Ansvar
- **Arvid:** Event Planner  
- **Filippa:** Todos & Activities  
- **Lone:** Habits  

---

## 🚀 Körning
1. Klona repot  
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```bash

2. Installera beroenden
   ```bash
   npm install
   ```

3. Starta utvecklingsserver
   ```bash
   npm run dev
   ```

## Dokumentation
- [Trello board](https://trello.com/invite/b/6937059cf1a9f8c34cf7229e/ATTIed9be0d3a5563021e1389710baa445c6086DF2EB/front-2-grupp-project)
- [Mötesanteckningar](/public/möten)

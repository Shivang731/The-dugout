# The Dugout

You are the manager. 64 World Cup 2022 turning points. 60 seconds to decide.

## What It Does

A tactical football simulator where you step into the manager's seat at every match of the 2022 FIFA World Cup. See the live pitch with real formations, player fatigue, and scorelines. Choose from four tactical options before the clock runs out. The AI breaks down every option with tactical logic, risk, and context — then reveals what the real manager actually did.

Built on **StatsBomb open event data** — every goal, card, foul, and sub traces to a real timestamped match event.

## Features

- **64 match scenarios** — every match from the 2022 FIFA World Cup, each with a real turning point
- **60-second timer** — make your tactical decision under pressure
- **2D/3D pitch** — toggle between a 2D tactical board and a full 3D broadcast-style view with camera modes (Broadcast, Tactical, Free), cinematic transition, and player fatigue indicators
- **Tactical overlays** — shape, pressing triggers, attack zones, passing lanes, and defensive block visualizations
- **Momentum bar** — live match momentum based on events and scoreline
- **Events timeline** — scrollable match events (goals, cards, subs) inline
- **Attack zones** — live breakdown of player distribution across pitch thirds
- **AI analysis** — local Ollama-powered analyst explains your decision and compares it to the real manager's choice
- **SSE streaming** — typewriter-style explanation effect via server-sent events
- **Multi-language analysts** — English (Nathan), Spanish (Valeria), French (Claire), German (Lukas)
- **Counterfactuals** — explore alternate timelines and option valuations
- **Matchup fixes** — get tactical solutions for critical 1v1 matchups
- **Tactical IQ** — your decisions are scored across 5 dimensions (attacking, defensive, sub timing, formation, pressure) with radar chart and shareable download card
- **Decision DNA** — every choice is analyzed by difficulty, vision, risk, decisiveness, and leverage
- **Coaching library (RAG)** — ask tactical questions answered from FIFA/UEFA coaching documents via FAISS retrieval
- **Local scoring engine** — Action Quality, Decision DNA, and Stakes computed without AI dependency (fallback when Ollama is unavailable)
- **Pre-generated explanations** — every scenario ships with pre-written tactical analysis so it works offline
- **Tactical concepts** — learn one concept per scenario (overloads, compactness, transitions, half-spaces, etc.) with inline SVG diagrams
- **Coach tips** — contextual wisdom displayed per match
- **Tournament timeline** — visual round-by-round navigation on the landing page
- **Stage filtering** — filter scenarios by tournament stage (Group Stage → Final)
- **Progress tracking** — localStorage persists your decisions, stats, and IQ across sessions

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js (for Three.js — installs via npm)
- [Ollama](https://ollama.ai) (for live AI analysis — optional, app works without it with pre-generated content)

```bash
git clone https://github.com/Shivang731/the-dugout
cd the-dugout

# Backend dependencies
pip install -r requirements.txt

# Frontend dependencies (Three.js for 3D pitch)
npm install

# Create .env (optional — defaults work without it)
# echo "OLLAMA_MODEL=granite3.3:2b" > .env
# echo "OLLAMA_BASE_URL=http://127.0.0.1:11434" >> .env

# Start the app
python run.py
```

Open http://localhost:8000

> **Note:** Live AI analysis requires Ollama running locally (`ollama serve && ollama pull granite3.3:2b`). Without it, the app uses pre-generated explanations and local scoring.

### Optional — Build the coaching library

```bash
python scripts/build-docling.py
```

Place FIFA/UEFA coaching PDFs in `data/pdfs/` and rerun. The FAISS index will be built at `data/docling/`.

## Project Structure

```
backend/                      FastAPI Python backend
  main.py                     App entry point, routes, static file serving, CORS
  ai_client.py                Ollama API wrapper (generate, stream, structured JSON)
  analyst_personas.py         Analyst personas (EN, ES, FR, DE) with voice prompts
  cache.py                    Disk-based JSON cache for AI responses (.dugout_cache/)
  fixture_loader.py           Scenario JSON loader with TTL caching
  rag_service.py              FAISS vector retrieval for Docling RAG (chunks + index)
  scoring.py                  Local scoring engine (Action Quality, DNA, Stakes)
  routes/
    decision.py               POST /api/decision + GET /api/decision/stream (SSE)
    counterfactual.py         POST /api/counterfactual
    insight.py                POST /api/match/insight
    iq_rating.py              POST /api/iq-rating
    library.py                POST /api/library (RAG coaching Q&A)
    matchup.py                POST /api/matchup-fix
frontend/                     Vanilla HTML/CSS/JS + Three.js 3D pitch
  index.html                  Scenario selection landing page with tournament timeline
  game.html                   3-act decision game with scoreboard, pitch, options
  css/
    main.css                  Global styles, variables, layout grid
    index.css                 Landing page styles, hero, grid, timeline
    game.css                  Game page styles, pitch, scoreboard, sidebar cards
  js/
    api.js                    All fetch calls to the FastAPI backend
    game.js                   Main game logic, timer, option selection, pitch init
    pitch.js                  Three.js 3D pitch (2350 lines — stadium, crowd, goals, cameras)
    pitch2d.js                Canvas 2D tactical board with formations, overlays, preview
    scenarios.js              Scenario grid rendering, stage filtering, flags
    analysts.js               Analyst selector data (client-side mirror)
    i18n.js                   Multi-language UI translations (EN, ES, FR, DE)
    modules/
      fatigue.js              Player fatigue popup with color-coded bar
      iq.js                   Tactical IQ overlay with radar chart + download card
      library.js              Coaching library sidebar UI
      matchup.js              Matchup fix panel UI
  player-photos.json          Player name → photo URL mapping
data/
  scenarios/                  64 match scenarios (one per World Cup match)
  docling/                    Built FAISS index + chunks (generated by build-docling.py)
  2022/                       StatsBomb open data
    json/                     Processed events (matches, lineups, goals, cards, subs)
    csv/                      Raw CSV exports
    scripts/                  Data processing scripts
scripts/
  build-docling.py            Parse PDFs → FAISS index for coaching library
  generate-2022-scenarios.py  Build 64 scenarios from StatsBomb data
  generate-scenarios.py       Alternative scenario generator
Procfile                      Railway deployment: uvicorn backend.main:app
vercel.json                   Frontend deployment with /api rewrite to Railway
```

## Data

All 64 scenarios are built from **StatsBomb's free open event data**
(competition_id=43, season_id=106). Every decision event traces
back to a real timestamped in-game event.

Source: https://github.com/statsbomb/open-data

**License note:** StatsBomb's terms require attribution
("Data from StatsBomb") in anything you publish, share, or distribute.

## Scoring

### Tactical IQ

Your performance is scored across 5 dimensions:
- **Attacking Instinct** — willingness to make offensive changes
- **Defensive Pragmatism** — ability to protect a lead
- **Substitution Timing** — knowing when to make changes
- **Formation Flexibility** — adapting shape to the match state
- **Pressure Management** — keeping composure under time pressure

Tier labels: **Scout** (0–40) → **Coach** (41–60) → **Gaffer** (61–80) → **The Special One** (81–100)

### Decision DNA

Every choice is analyzed across 5 axes:
- **Difficulty** — how hard the tactical situation was
- **Vision** — how creative/unexpected the choice was
- **Risk** — how risky the chosen option was
- **Decisiveness** — how bold the response was
- **Leverage** — how much the moment mattered (stage, scoreline, context)

### Stakes

Each scenario has a stakes rating (Low → Medium → High → Decisive) based on
match stage, scoreline margin, and difficulty.

### Action Quality

Each decision gets an action quality score (0–100) and label
(Poor → Reasonable → Good → Outstanding) with pros/cons.

### Pre-generated Explanations

Every scenario includes pre-written tactical analysis for all four options,
so the game works fully offline (no AI dependency).

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/ping` | Health check |
| GET | `/api/config` | App config (AI provider, model, available langs) |
| GET | `/api/scenarios` | List all scenarios (sorted by match order) |
| GET | `/api/scenario/{id}` | Get full scenario detail |
| GET | `/api/analysts` | List available analyst personas |
| POST | `/api/decision` | Submit decision → get AI explanation + local scoring |
| GET | `/api/decision/stream` | SSE stream for typewriter explanation effect |
| POST | `/api/counterfactual` | Alternate timeline + option valuations |
| POST | `/api/match/insight` | Pre-match tactical insight |
| POST | `/api/matchup-fix` | 3 tactical solutions for a 1v1 matchup |
| POST | `/api/iq-rating` | Calculate Tactical IQ from completed scenarios |
| POST | `/api/library` | RAG-powered coaching Q&A |

## Tech Stack

- **Backend:** Python FastAPI + uvicorn
- **Frontend:** Vanilla HTML/CSS/JS (no framework) + Three.js (3D pitch) + Canvas 2D (2D pitch)
- **AI:** Ollama (local, default: `granite3.3:2b`)
- **RAG:** Docling → PyMuPDF → FAISS + sentence-transformers (`all-MiniLM-L6-v2`)
- **Scoring:** Local engine with pre-generated fallback (no AI dependency)
- **Deploy:** Vercel (frontend) + Railway (backend)
- **Data:** StatsBomb open-data (competition_id=43, season_id=106)

---

*Built for IBM SkillsBuild June Challenge 2026*

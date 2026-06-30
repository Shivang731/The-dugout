# The Dugout - Developer Guide

## Quick Start

```bash
git clone https://github.com/Shivang731/the-dugout
cd the-dugout
pip install -r requirements.txt
npm install
python run.py
```

Open <http://localhost:8000>

## Architecture Structure

- **backend/**: Python FastAPI service with uvicorn
  - Main API endpoints (decision, counterfactual, iq-rating, etc.)
  - Ollama AI client integration
  - Local scoring engine (pre-generated fallback mode)
  - FAISS vector database for RAG coaching library
- **frontend/**: Vanilla HTML/CSS/JS + Three.js
  - No framework libraries
  - Pitch.js (3D rendering, 2350 lines)
  - No build system or bundling
- **data/**: Pre-generated scenarios (64 matches from 2022 World Cup)
  - scenarios/ - Match data with turning points
  - docling/ - Built FAISS index for RAG
  - 2022/ - StatsBomb open data exports

## Starting the App

**Local development:**

```bash
python run.py
```

**Deployment:**

- **Backend (Railway)**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- **Frontend (Vercel)**: Static files in `/frontend` with `/api` rewrites to Railway

## Key Scripts

**Build the coaching library:**

```bash
python scripts/build-docling.py
```

This creates the FAISS index in `data/docling/` for coaching Q&A RAG. Requires FIFA/UEFA coaching PDFs in `data/pdfs/`.

**Generate scenarios:**

```bash
python scripts/generate-2022-scenarios.py
```

Creates the 64 match scenarios from StatsBomb data.

## Deployments

**Dependencies:**
- Python 3.10+
- Node.js (Three.js only)
- Ollama (optional, for AI analysis)
- Must run Ollama locally: `ollama serve && ollama pull granite3.3:2b`

**Deployment-specific files:**

- `Procfile`: Railway deployment command
- `vercel.json`: Vercel frontend config with `/api` rewrites

## Configuration

**Environment variables:**

```bash
echo "OLLAMA_MODEL=granite3.3:2b" > .env
echo "OLLAMA_BASE_URL=http://127.0.0.1:11434" >> .env
```

Defaults work without Ollama - pre-generated explanations provide full offline functionality.

## Important Notes

**AI Analysis:**

- Local Ollama provides real-time AI analysis
- Pre-generated explanations included for offline fallback
- Uses `granite3.3:2b` model by default

**Data Structure:**

- 64 pre-generated scenarios in `data/scenarios/`
- StatsBomb open-data source (competition_id=43, season_id=106)
- Requires attribution: "Data from StatsBomb" for published distributions

**Frontend quirks:**

- Plain JavaScript (no build tool or framework)
- pitch.js (3D pitch) is 2350 lines
- Direct API calls via frontend/js/api.js
- No TypeScript

**Backend quirks:**

- Single process FastAPI app with both API and static serving
- No test framework or linting configured
- CORS enabled for all origins (`allow_origins=["*"]`)
- LRU caching in `backend/cache.py`

**Multi-language support:**

- Four analyst personas: English (Nathan), Spanish (Valeria), French (Claire), German (Lukas)
- Translations in frontend/js/i18n.js

**3D Passing Lanes Implementation:**

As of recent updates, passing lanes are now properly rendered in the 3D pitch:
- 3D Passing Lane visualization implementation in `frontend/js/pitch.js`
- Uses existing 2D tactical calculations as single source of truth
- Reuses ball carrier detection and player filtering from 2D engine
- Renders ribbon-based passing lanes from ball to receiver with:
  - Semi-transparent with emissive glow effect
  - Positioned 2-5cm above grass (randomized for visual depth)
  - Smooth rounded ends with arrowhead indicator
  - Same logic as 2D overlays (safe/risky/blocked categories)
- Auto-updates immediately on replay events (advance/pause/resume/scrub/restart)
- Shared geometry and materials for performance
- Hover tooltip shows confidence and pressure data
- Uses existing `passing` overlay toggle from UI

# The Dugout

You are the manager. 64 World Cup 2022 turning points. 60 seconds to decide.

## What It Does

A tactical football simulator where you step into the manager's seat at every match of the 2022 FIFA World Cup. See the live pitch with real formations, player fatigue, and scorelines. Choose from four tactical options before the clock runs out. The AI breaks down every option with tactical logic, risk, and context — then reveals what the real manager actually did.

Built on **StatsBomb open event data** — every goal, card, foul, and sub traces to a real timestamped match event.

## Web3 Vision — Increasing On-Chain Transactions

The current app gives tactical analysis for free. Here's the roadmap to turn engagement into transactions:

### Live Features

| Feature | How It Drives Transactions |
|---|---|
| **Prediction Staking** | Stake SOL on your tactical pick. Win if your choice matches/misses the real manager's decision. Pool payouts create recurring tx volume. |
| **Manager Pass NFT** | Soul-bound NFT tracks your win rate across all 64 scenarios. Paid mint = initial tx. Upgradable with streaks = follow-up txs. |
| **Fantasy Tournament** | Entry fee (e.g. 0.1 SOL) per 8-match group stage. Leaderboard payout. Creates predictable daily tx volume during events. |
| **Moment Minting** | When you correctly predict a famous upset (e.g. Japan 2–1 Spain), mint a "What If" moment NFT with the alternate timeline as art. Limited edition = scarcity-driven mints. |
| **Token-Gated Analysis** | Hold X tokens to unlock premium tactical breakdowns from legendary managers (RAG-piped through their published coaching docs). |
| **Referral Rewards** | Refer a friend → both earn tokens after they complete 3 scenarios. Viral loop with on-chain attribution. |
| **Season Pass** | Quarterly subscription (USDC) unlocks exclusive scenarios (1998, 2010, 2014 World Cups). Recurring revenue. |

### Why This Works

1. **Low friction entry** — Free to play the first 8 scenarios. Upgrade only after hooks are set.
2. **Predictable tx cadence** — Daily scenario releases create daily staking/minting windows.
3. **Social amplification** — Share your Manager Pass on X/Telegram. Comparison = FOMO = mints.
4. **Data-backed scarcity** — Correct picks on low-probability events (5% manager choice) become rare mints.

## Quick Start

```bash
git clone https://github.com/Shivang731/the-dugout
cd the-dugout
pip install -r requirements.txt
cp .env.example .env
# add your GEMINI_API_KEY to .env
uvicorn backend.main:app --reload --port 8000
```

Open http://localhost:8000

## Project Structure

```
backend/          FastAPI Python backend
  main.py         App entry point, routes, static file serving
  ai_client.py    Gemini API wrapper
  rag_service.py  FAISS retrieval for Docling RAG
  fixture_loader.py  Scenario JSON loader with caching
  routes/         API route handlers
frontend/         Vanilla HTML/CSS/JS + Three.js 3D pitch
  index.html      Scenario selection landing page
  game.html       3-act decision game
  css/            Stylesheets
  js/             Game logic, 3D pitch, API calls, modules
data/
  scenarios/      64 match scenarios with real formations + lineups
  2022/           StatsBomb structured data (matches, goals, cards, etc.)
  docling/        FAISS index + chunks for RAG coaching library
scripts/
  build-docling.py          Parse PDFs into FAISS index
  generate-2022-scenarios.py  Build 64 scenarios from StatsBomb data
```

## Data

All 64 scenarios are built from **StatsBomb's free open event data**
(competition_id=43, season_id=106). Every decision event traces
back to a real timestamped in-game event.
Source: https://github.com/statsbomb/open-data

**License note:** StatsBomb's terms require attribution
("Data from StatsBomb") in anything you publish, share, or distribute.

## Scoring

Your Tactical IQ is calculated across 5 dimensions: Attacking, Defensive,
Sub Timing, Formation, Pressure. Tier labels: Scout → Coach → Gaffer →
The Special One.

## Tech Stack

- **Backend:** Python FastAPI
- **Frontend:** Vanilla HTML/CSS/JS + Three.js (3D pitch) + Chart.js (radar)
- **AI:** Gemini (Google Generative AI)
- **RAG:** Docling + FAISS + sentence-transformers
- **Pitch:** Three.js with OrbitControls
- **Deploy:** Vercel (frontend) + Railway (backend)

---

*Built for IBM SkillsBuild June Challenge 2026*

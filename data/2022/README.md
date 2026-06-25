# 2022 FIFA World Cup — ML-Ready Dataset

Built from **StatsBomb's free, open event data** (the same provider professional
analytics teams use), not scraped from articles — so every row below traces back
to a real timestamped event in the match. Source: https://github.com/statsbomb/open-data
(competition_id=43, season_id=106). **License note: StatsBomb's terms require
attribution ("Data from StatsBomb") in anything you publish, share, or distribute
using this data.**

Re-run `scripts/build_dataset.py` any time to rebuild from scratch or extend it
(e.g. to pull passes/carries/duels for spatial models — see "Going further" below).

## Files (in both `csv/` and `json/`)

| File | Rows | Grain | Key columns |
|---|---|---|---|
| `matches` | 64 | 1 per match | match_id, date, stage, group, home/away team+score, stadium, referee, possession_pct_proxy |
| `goals` | 172 | 1 per goal | match_id, minute, team, player, body_part, shot_type (Open Play/Penalty/Free Kick/Own Goal) |
| `cards` | 228 | 1 per card | match_id, minute, team, player, card (Yellow/Second Yellow/Red), reason (Foul/Bad Behaviour) |
| `fouls` | 1,775 | 1 per foul | match_id, minute, team, player, card (if any), advantage, offensive |
| `offsides` | 250 | 1 per offside | match_id, minute, team, player |
| `substitutions` | 587 | 1 per sub | match_id, minute, team, player_off, player_in, reason |
| `shootout_kicks` | 41 | 1 per penalty | match_id, kick_order, team, player, outcome, scored — covers the 5 matches decided on penalties |
| `team_match_stats` | 128 | 1 per team per match | shots, shots_on_target, corners, fouls_committed/won, offsides, cards, passes |
| `lineups_appearances` | 3,244 | 1 per named squad player per match | starter, appeared, on/off time, position, jersey number |
| `lineups_cards` | 228 | 1 per card (player-file cross-check) | same cards as `cards.csv`, sourced independently from lineup files |

All tables join cleanly on `match_id` (and `team`/`player` where relevant).

## What "every decision made" actually means here
- **Referee decisions** are captured as the underlying events: every foul (`fouls`),
  every card and who/why (`cards`), every penalty awarded (`goals.shot_type == "Penalty"`
  or check `fouls` immediately preceding), every offside call (`offsides`).
- **What's not separately flagged**: StatsBomb's open data doesn't tag a discrete
  "VAR review" event — VAR-driven penalty/goal overturns show up as the *result*
  (e.g. a penalty awarded, a goal disallowed for offside) rather than a labeled review
  event. If you need explicit VAR-overturn flags, that requires manual annotation —
  happy to help build that layer for the small number of famous VAR incidents
  (e.g. Japan vs Spain's goal-line call) if useful.
- **Lineups & substitutions** use real player names, jersey numbers, positions, and
  exact on/off timestamps — pulled from StatsBomb's official lineup files, not OCR'd
  from images (which is what Wikipedia's match boxes would have required, and which
  isn't reliably machine-readable).

## Methodology notes (read before modeling)
- **172 goals** matches FIFA's official tally exactly — penalty **shootout** kicks
  (5 matches went to penalties) are intentionally excluded from `goals`/`team_match_stats`
  and broken out separately in `shootout_kicks`, since they aren't "goals" for
  goals-scored statistics.
- **Possession %** (`home/away_possession_pct_proxy`) is a **pass-share proxy**
  (team's passes ÷ total passes by both teams), not official broadcast "time in
  possession." It tracks broadcast figures closely in spot checks (e.g. England
  77.4% vs Iran 22.6%, which matches reported match stats) but treat it as an
  approximation, not ground truth.
- **Shots on target** = outcomes `Goal`, `Saved`, or `Saved to Post` (the standard
  event-data convention). `Blocked`, `Off T`, `Wayward`, `Post`, `Saved Off Target`
  are NOT on-target.
- **Player names** are StatsBomb's full registered names (e.g. "Neymar da Silva
  Santos Junior", "Vinícius José Paixão de Oliveira Júnior") rather than common
  short names — worth normalizing if you're joining against another dataset that
  uses nicknames.
- 63/64 matches have a confirmed referee name (1 missing in source data).

## Going further
The full StatsBomb event stream (every pass, carry, duel, pressure — ~3,000+
events per match, with x/y pitch coordinates) was downloaded to `sb_data/events/`
during the build but isn't included in this delivery (≈190MB raw). Re-run the
script, or just read those JSON files directly, if your ML project wants
pitch-level/spatial features (xG models, pass networks, possession chains, etc.)
rather than the flattened tables here.

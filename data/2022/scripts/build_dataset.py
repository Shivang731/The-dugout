"""
2022 FIFA World Cup — ML Dataset Builder
==========================================
Downloads StatsBomb's free, open event/lineup data for the 2022 World Cup
(competition_id=43, season_id=106) and builds clean, flat tables suitable
for ML pipelines: matches, goals, cards, fouls, offsides, substitutions,
shootout kicks, team-match stats, and player lineups/appearances.

Source: https://github.com/statsbomb/open-data  (free for research/personal
use — please credit "StatsBomb" if you publish anything built on this data)

Usage:
    pip install requests --break-system-packages
    python3 build_dataset.py
Output:
    ./out/*.csv and ./out/*.json
"""
import json, csv, os, time, urllib.request, concurrent.futures

BASE = "https://raw.githubusercontent.com/statsbomb/open-data/master/data"
COMP_ID, SEASON_ID = 43, 106
OUT = "out"
os.makedirs(f"{OUT}", exist_ok=True)
os.makedirs("sb_data/events", exist_ok=True)
os.makedirs("sb_data/lineups", exist_ok=True)

# ---------- 1. Download match list ----------
urllib.request.urlretrieve(f"{BASE}/matches/{COMP_ID}/{SEASON_ID}.json", "matches_106.json")
matches_raw = json.load(open("matches_106.json"))
ids = [m["match_id"] for m in matches_raw]

# ---------- 2. Download events + lineups for every match ----------
def fetch(kind, mid):
    url = f"{BASE}/{kind}/{mid}.json"
    dest = f"sb_data/{kind}/{mid}.json"
    if os.path.exists(dest):
        return True
    for _ in range(3):
        try:
            urllib.request.urlretrieve(url, dest)
            return True
        except Exception:
            time.sleep(1)
    return False

tasks = [("events", m) for m in ids] + [("lineups", m) for m in ids]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    list(ex.map(lambda t: fetch(*t), tasks))

# ---------- 3. Build match-level table ----------
matches = []
for m in matches_raw:
    matches.append(dict(
        match_id=m["match_id"], date=m["match_date"], kickoff=m["kick_off"],
        stage=m["competition_stage"]["name"], group=m["home_team"].get("home_team_group"),
        match_week=m.get("match_week"),
        home_team=m["home_team"]["home_team_name"], away_team=m["away_team"]["away_team_name"],
        home_score=m["home_score"], away_score=m["away_score"],
        home_manager=(m["home_team"]["managers"][0]["name"] if m["home_team"].get("managers") else None),
        away_manager=(m["away_team"]["managers"][0]["name"] if m["away_team"].get("managers") else None),
        stadium=m["stadium"]["name"] if m.get("stadium") else None,
        stadium_country=m["stadium"]["country"]["name"] if m.get("stadium") else None,
        referee=m["referee"]["name"] if m.get("referee") else None,
        referee_country=(m["referee"]["country"]["name"] if m.get("referee") and m["referee"].get("country") else None),
    ))
matches.sort(key=lambda r: (r["date"], r["kickoff"]))

# ---------- 4. Walk every event stream ----------
goals, cards, subs, fouls, offsides, shootouts = [], [], [], [], [], []
team_stats = {}

def ts_key(mid, team):
    k = (mid, team)
    if k not in team_stats:
        team_stats[k] = dict(match_id=mid, team=team, shots=0, shots_on_target=0, goals=0,
                              corners=0, fouls_committed=0, fouls_won=0, offsides=0,
                              yellow_cards=0, second_yellow_cards=0, red_cards=0,
                              passes_attempted=0, passes_completed=0, substitutions_used=0)
    return team_stats[k]

import glob
for ev_file in glob.glob("sb_data/events/*.json"):
    mid = int(os.path.basename(ev_file).replace(".json", ""))
    data = json.load(open(ev_file))
    own_goal_against_by_id = {}
    for e in data:
        t = e["type"]["name"]
        team = e.get("team", {}).get("name")
        minute, second, period = e.get("minute"), e.get("second"), e.get("period")
        player = e.get("player", {}).get("name") if e.get("player") else None

        if t == "Shot":
            outcome = e.get("shot", {}).get("outcome", {}).get("name")
            shot_type = e.get("shot", {}).get("type", {}).get("name")
            body_part = e.get("shot", {}).get("body_part", {}).get("name")
            if period == 5:
                shootouts.append(dict(match_id=mid, kick_order=len(shootouts), team=team,
                                       player=player, outcome=outcome, scored=(outcome == "Goal")))
                continue
            st = ts_key(mid, team)
            st["shots"] += 1
            if outcome in ("Goal", "Saved", "Saved to Post"):
                st["shots_on_target"] += 1
            if outcome == "Goal":
                st["goals"] += 1
                loc = e.get("location", [None, None])
                goals.append(dict(match_id=mid, minute=minute, second=second, period=period,
                                   team=team, player=player, body_part=body_part,
                                   shot_type=shot_type, own_goal=False, x=loc[0], y=loc[1]))
        elif t == "Own Goal Against":
            for rid in e.get("related_events", []):
                own_goal_against_by_id[e["id"]] = (player, team)
        elif t == "Own Goal For":
            scorer = None
            for rid in e.get("related_events", []):
                if rid in own_goal_against_by_id:
                    scorer, _ = own_goal_against_by_id[rid]
            st = ts_key(mid, team)
            st["goals"] += 1
            goals.append(dict(match_id=mid, minute=minute, second=second, period=period,
                               team=team, player=scorer, body_part=None, shot_type="Own Goal",
                               own_goal=True, x=None, y=None))
        elif t == "Foul Committed":
            st = ts_key(mid, team)
            st["fouls_committed"] += 1
            card = e.get("foul_committed", {}).get("card", {}).get("name")
            fouls.append(dict(match_id=mid, minute=minute, second=second, team=team, player=player,
                               card=card, advantage=e.get("foul_committed", {}).get("advantage", False),
                               offensive=e.get("foul_committed", {}).get("offensive", False)))
            if card:
                cards.append(dict(match_id=mid, minute=minute, second=second, team=team,
                                   player=player, card=card, reason="Foul"))
                if card == "Yellow Card": st["yellow_cards"] += 1
                elif card == "Second Yellow": st["second_yellow_cards"] += 1; st["red_cards"] += 1
                elif card == "Red Card": st["red_cards"] += 1
        elif t == "Foul Won":
            ts_key(mid, team)["fouls_won"] += 1
        elif t == "Bad Behaviour":
            card = e.get("bad_behaviour", {}).get("card", {}).get("name")
            if card:
                st = ts_key(mid, team)
                cards.append(dict(match_id=mid, minute=minute, second=second, team=team,
                                   player=player, card=card, reason="Bad Behaviour"))
                if card == "Yellow Card": st["yellow_cards"] += 1
                elif card == "Second Yellow": st["second_yellow_cards"] += 1; st["red_cards"] += 1
                elif card == "Red Card": st["red_cards"] += 1
        elif t == "Offside":
            ts_key(mid, team)["offsides"] += 1
            offsides.append(dict(match_id=mid, minute=minute, second=second, team=team, player=player))
        elif t == "Pass":
            st = ts_key(mid, team)
            st["passes_attempted"] += 1
            outcome = e.get("pass", {}).get("outcome", {}).get("name")
            if outcome is None:
                st["passes_completed"] += 1
            if outcome == "Pass Offside":
                st["offsides"] += 1
                offsides.append(dict(match_id=mid, minute=minute, second=second, team=team, player=player))
            if e.get("pass", {}).get("type", {}).get("name") == "Corner":
                st["corners"] += 1
        elif t == "Substitution":
            sub_in = e.get("substitution", {}).get("replacement", {}).get("name")
            outcome = e.get("substitution", {}).get("outcome", {}).get("name")
            ts_key(mid, team)["substitutions_used"] += 1
            subs.append(dict(match_id=mid, minute=minute, second=second, team=team,
                              player_off=player, player_in=sub_in, reason=outcome))

poss_by_match = {}
for (mid, team), st in team_stats.items():
    poss_by_match.setdefault(mid, {})[team] = st["passes_attempted"]
for m in matches:
    p = poss_by_match.get(m["match_id"], {})
    total = sum(p.values())
    m["home_possession_pct_proxy"] = round(100 * p.get(m["home_team"], 0) / total, 1) if total else None
    m["away_possession_pct_proxy"] = round(100 * p.get(m["away_team"], 0) / total, 1) if total else None

# ---------- 5. Lineups / appearances ----------
appearances, player_cards = [], []
for lf in glob.glob("sb_data/lineups/*.json"):
    mid = int(os.path.basename(lf).replace(".json", ""))
    for team_block in json.load(open(lf)):
        team = team_block["team_name"]
        for p in team_block["lineup"]:
            positions = p.get("positions", [])
            starter = any(pos["start_reason"] == "Starting XI" for pos in positions)
            first_pos = positions[0] if positions else {}
            last_pos = positions[-1] if positions else {}
            appearances.append(dict(
                match_id=mid, team=team, player=p["player_name"], jersey_number=p.get("jersey_number"),
                starter=starter, appeared=len(positions) > 0, first_position=first_pos.get("position"),
                on_time=first_pos.get("from"), off_time=last_pos.get("to"),
                start_reason=first_pos.get("start_reason"), end_reason=last_pos.get("end_reason"),
                num_positions_played=len(positions)))
            for c in p.get("cards", []):
                player_cards.append(dict(match_id=mid, team=team, player=p["player_name"],
                                          card=c.get("card_type"), time=c.get("time"),
                                          period=c.get("period"), reason=c.get("reason")))

# ---------- 6. Write everything out ----------
def write(name, rows):
    json.dump(rows, open(f"{OUT}/{name}.json", "w"), indent=2)
    if rows:
        with open(f"{OUT}/{name}.csv", "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader(); w.writerows(rows)

write("matches", matches)
write("goals", goals)
write("cards", cards)
write("fouls", fouls)
write("offsides", offsides)
write("substitutions", subs)
write("shootout_kicks", shootouts)
write("team_match_stats", list(team_stats.values()))
write("lineups_appearances", appearances)
write("lineups_cards", player_cards)

print(f"Done. {len(matches)} matches, {len(goals)} goals, {len(cards)} cards, "
      f"{len(fouls)} fouls, {len(offsides)} offsides, {len(subs)} substitutions, "
      f"{len(shootouts)} shootout kicks, {len(appearances)} player appearances.")

import json, os, random
from collections import defaultdict

random.seed(42)

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "2022", "json")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "scenarios")

with open(os.path.join(DATA_DIR, "matches.json")) as f:
    matches = json.load(f)
with open(os.path.join(DATA_DIR, "lineups_appearances.json")) as f:
    lineups = json.load(f)
with open(os.path.join(DATA_DIR, "goals.json")) as f:
    goals = json.load(f)
with open(os.path.join(DATA_DIR, "substitutions.json")) as f:
    subs = json.load(f)
with open(os.path.join(DATA_DIR, "cards.json")) as f:
    cards = json.load(f)

lineup_idx = defaultdict(lambda: defaultdict(list))
lineup_player_idx = defaultdict(dict)
for entry in lineups:
    if entry.get("starter"):
        lineup_idx[entry["match_id"]][entry["team"]].append(entry)
    key = (entry["match_id"], entry["team"], entry["player"])
    lineup_player_idx[key] = entry

goals_by_match = defaultdict(list)
for g in goals:
    goals_by_match[g["match_id"]].append(g)

subs_by_match = defaultdict(list)
for s in subs:
    subs_by_match[s["match_id"]].append(s)

cards_by_match = defaultdict(list)
for c in cards:
    cards_by_match[c["match_id"]].append(c)

POS_MAP = {
    "Goalkeeper": [(0.5, 0.06)],
    "Center Back": [(0.37, 0.1), (0.63, 0.1)],
    "Centre Back": [(0.37, 0.1), (0.63, 0.1)],
    "Left Center Back": [(0.25, 0.1)],
    "Right Center Back": [(0.75, 0.1)],
    "Left Back": [(0.12, 0.18)],
    "Right Back": [(0.88, 0.18)],
    "Left Wing Back": [(0.1, 0.25)],
    "Right Wing Back": [(0.9, 0.25)],
    "Left Midfield": [(0.12, 0.35)],
    "Right Midfield": [(0.88, 0.35)],
    "Defensive Midfield": [(0.5, 0.28)],
    "Left Defensive Midfield": [(0.35, 0.28)],
    "Right Defensive Midfield": [(0.65, 0.28)],
    "Center Defensive Midfield": [(0.5, 0.28)],
    "Centre Defensive Midfield": [(0.5, 0.28)],
    "Center Midfield": [(0.42, 0.35), (0.58, 0.35)],
    "Left Center Midfield": [(0.3, 0.35)],
    "Right Center Midfield": [(0.7, 0.35)],
    "Central Midfield": [(0.42, 0.35), (0.58, 0.35)],
    "Centre Midfield": [(0.42, 0.35), (0.58, 0.35)],
    "Attacking Midfield": [(0.5, 0.42)],
    "Left Attacking Midfield": [(0.35, 0.42)],
    "Right Attacking Midfield": [(0.65, 0.42)],
    "Center Attacking Midfield": [(0.5, 0.42)],
    "Centre Attacking Midfield": [(0.5, 0.42)],
    "Left Wing": [(0.12, 0.48)],
    "Right Wing": [(0.88, 0.48)],
    "Striker": [(0.5, 0.55)],
    "Center Forward": [(0.5, 0.55)],
    "Left Center Forward": [(0.35, 0.55)],
    "Right Center Forward": [(0.65, 0.55)],
    "Centre Forward": [(0.5, 0.55)],
    "Forward": [(0.5, 0.55)],
}

POS_CATEGORIES = {
    "Goalkeeper": 0,
    "Left Back": 1, "Right Back": 1,
    "Center Back": 2, "Centre Back": 2,
    "Left Center Back": 2, "Right Center Back": 2,
    "Left Wing Back": 3, "Right Wing Back": 3,
    "Left Midfield": 4, "Right Midfield": 4,
    "Defensive Midfield": 5, "Left Defensive Midfield": 5, "Right Defensive Midfield": 5,
    "Center Defensive Midfield": 5, "Centre Defensive Midfield": 5,
    "Center Midfield": 6, "Left Center Midfield": 6, "Right Center Midfield": 6,
    "Central Midfield": 6, "Centre Midfield": 6,
    "Attacking Midfield": 7, "Left Attacking Midfield": 7, "Right Attacking Midfield": 7,
    "Center Attacking Midfield": 7, "Centre Attacking Midfield": 7,
    "Left Wing": 8, "Right Wing": 8,
    "Striker": 9, "Center Forward": 9, "Left Center Forward": 9, "Right Center Forward": 9,
    "Centre Forward": 9, "Forward": 9,
}

POS_CODE = {
    "Goalkeeper": "GK",
    "Center Back": "CB", "Centre Back": "CB",
    "Left Center Back": "CB", "Right Center Back": "CB",
    "Left Back": "LB", "Right Back": "RB",
    "Left Wing Back": "LWB", "Right Wing Back": "RWB",
    "Left Midfield": "LM", "Right Midfield": "RM",
    "Defensive Midfield": "CDM", "Left Defensive Midfield": "CDM", "Right Defensive Midfield": "CDM",
    "Center Defensive Midfield": "CDM", "Centre Defensive Midfield": "CDM",
    "Center Midfield": "CM", "Left Center Midfield": "CM", "Right Center Midfield": "CM",
    "Central Midfield": "CM", "Centre Midfield": "CM",
    "Attacking Midfield": "CAM", "Left Attacking Midfield": "CAM", "Right Attacking Midfield": "CAM",
    "Center Attacking Midfield": "CAM", "Centre Attacking Midfield": "CAM",
    "Left Wing": "LW", "Right Wing": "RW",
    "Striker": "ST", "Center Forward": "CF", "Left Center Forward": "CF", "Right Center Forward": "CF",
    "Centre Forward": "CF", "Forward": "ST",
}

POS_POSITION_GROUP = {
    "Goalkeeper": "GK",
    "Left Back": "DEF", "Right Back": "DEF",
    "Center Back": "DEF", "Centre Back": "DEF",
    "Left Center Back": "DEF", "Right Center Back": "DEF",
    "Left Wing Back": "DEF", "Right Wing Back": "DEF",
    "Left Midfield": "MID", "Right Midfield": "MID",
    "Defensive Midfield": "MID", "Left Defensive Midfield": "MID", "Right Defensive Midfield": "MID",
    "Center Defensive Midfield": "MID", "Centre Defensive Midfield": "MID",
    "Center Midfield": "MID", "Left Center Midfield": "MID", "Right Center Midfield": "MID",
    "Central Midfield": "MID", "Centre Midfield": "MID",
    "Attacking Midfield": "FWD", "Left Attacking Midfield": "FWD", "Right Attacking Midfield": "FWD",
    "Center Attacking Midfield": "FWD", "Centre Attacking Midfield": "FWD",
    "Left Wing": "FWD", "Right Wing": "FWD",
    "Striker": "FWD", "Center Forward": "FWD", "Left Center Forward": "FWD", "Right Center Forward": "FWD",
    "Centre Forward": "FWD", "Forward": "FWD",
}

def normalize_team(name):
    return name.lower().replace(" ", "-").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ñ", "n").replace("ç", "c").replace("ä", "a").replace("ö", "o").replace("ü", "u")

def pos_to_xy(pos, used_positions):
    candidates = POS_MAP.get(pos, [(0.5, 0.35)])
    available = [c for c in candidates if c not in used_positions]
    if not available:
        alt_y = 0.08 + random.random() * 0.5
        return (0.5, alt_y)
    return available[0]

def parse_minute(val):
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return int(val)
    parts = str(val).split(":")
    return int(parts[0]) + (int(parts[1]) // 60 if len(parts) > 1 else 0)


def compute_fatigue(player_entry, match_minute=60):
    if not player_entry:
        return random.randint(30, 60)
    starter = player_entry.get("starter", False)
    on_time = parse_minute(player_entry.get("on_time"))
    off_time = parse_minute(player_entry.get("off_time"))

    if starter:
        started_at = 0
        ended_at = off_time if off_time is not None else 90
        played = min(match_minute, ended_at) - started_at
    elif on_time is not None:
        started_at = on_time
        ended_at = off_time if off_time is not None else 90
        played = max(0, min(match_minute, ended_at) - started_at)
    else:
        played = 0

    played = max(0, min(played, 90))
    base = (played / 90.0) * 80
    noise = random.randint(-8, 8)
    pos = player_entry.get("first_position") or "Forward"
    group = POS_POSITION_GROUP.get(pos, "MID")
    pos_mod = {"GK": -15, "DEF": -5, "MID": 0, "FWD": 5}.get(group, 0)
    return max(5, min(95, int(base + noise + pos_mod)))

def assign_player_positions(players_11, match_id, team):
    used = set()
    result = []
    sorted_players = sorted(players_11, key=lambda p: POS_CATEGORIES.get(p.get("first_position") or "Forward", 99))
    for p in sorted_players:
        pos_label = p.get("first_position") or "Forward"
        x, y = pos_to_xy(pos_label, used)
        used.add((x, y))
        x += (random.random() - 0.5) * 0.04
        y += (random.random() - 0.5) * 0.02
        x = max(0.02, min(0.98, x))
        y = max(0.02, min(0.98, y))
        fatigue = compute_fatigue(p)
        result.append({
            "name": p["player"],
            "number": p["jersey_number"],
            "pos": POS_CODE.get(pos_label, "ST"),
            "x": round(x, 3),
            "y": round(y, 3),
            "fatigue": fatigue,
        })
    return result

def detect_formation(players_11):
    pos_counts = defaultdict(int)
    for p in players_11:
        pos = p.get("first_position") or "Forward"
        cat = POS_CATEGORIES.get(pos, 9)
        pos_counts[cat] += 1
    defs = pos_counts.get(1, 0) + pos_counts.get(2, 0) * 2 + pos_counts.get(3, 0)
    mids = pos_counts.get(4, 0) + pos_counts.get(5, 0) + pos_counts.get(6, 0) + pos_counts.get(7, 0)
    fwds = pos_counts.get(8, 0) + pos_counts.get(9, 0)
    if defs == 4 and mids >= 3 and fwds >= 2: return "4-3-3"
    if defs == 4 and mids >= 4: return "4-4-2"
    if defs == 5: return "5-3-2" if mids >= 3 else "5-4-1"
    if defs == 3: return "3-4-3" if fwds >= 3 else "3-5-2"
    return "4-3-3"

def find_player_by_pos(players, pos_prefix):
    """Find a player whose pos field starts with the given prefix."""
    for p in players:
        if p["pos"] == pos_prefix:
            return p
    return None

def find_player_by_name(players, name):
    """Find a player by name (case insensitive, partial match)."""
    for p in players:
        if p["name"].lower() == name.lower() or p["name"].lower().split()[-1] == name.lower():
            return p
    return None

def is_defensive_pos(pos):
    return pos in ("CB", "LB", "RB", "GK", "WB")

def is_attacking_pos(pos):
    return pos in ("ST", "CF", "LW", "RW", "AM", "LM", "RM")

def generate_matchups(home_players, away_players, home_team, away_team):
    matchups = []
    used_attacker_names = set()
    used_defender_names = set()

    home_by_pos = {p["pos"]: p for p in home_players}
    away_by_pos = {p["pos"]: p for p in away_players}

    pairs = [("LW", "RB"), ("RW", "LB"), ("ST", "CB"), ("CF", "CB"),
             ("LM", "RB"), ("RM", "LB"), ("CAM", "CDM")]

    for att_pos, def_pos in pairs:
        attacker = home_by_pos.get(att_pos)
        defender = away_by_pos.get(def_pos)
        if attacker and defender and attacker["name"] not in used_attacker_names and defender["name"] not in used_defender_names:
            diff = random.randint(-15, 20)
            advantage = attacker["name"] if diff > 0 else defender["name"] if diff < 0 else "Even"
            matchups.append({
                "attacker": attacker["name"],
                "attacker_team": home_team,
                "defender": defender["name"],
                "defender_team": away_team,
                "advantage": advantage,
                "diff": f"{diff:+d}",
                "critical": abs(diff) > 12 or random.random() < 0.2,
            })
            used_attacker_names.add(attacker["name"])
            used_defender_names.add(defender["name"])

        attacker2 = away_by_pos.get(att_pos)
        defender2 = home_by_pos.get(def_pos)
        if attacker2 and defender2 and attacker2["name"] not in used_attacker_names and defender2["name"] not in used_defender_names:
            diff = random.randint(-15, 20)
            advantage = attacker2["name"] if diff > 0 else defender2["name"] if diff < 0 else "Even"
            matchups.append({
                "attacker": attacker2["name"],
                "attacker_team": away_team,
                "defender": defender2["name"],
                "defender_team": home_team,
                "advantage": advantage,
                "diff": f"{diff:+d}",
                "critical": abs(diff) > 12 or random.random() < 0.2,
            })
            used_attacker_names.add(attacker2["name"])
            used_defender_names.add(defender2["name"])

    if len(matchups) < 2:
        home_pool = [p for p in home_players if p["name"] not in used_attacker_names]
        away_pool = [p for p in away_players if p["name"] not in used_defender_names]
        random.shuffle(home_pool)
        random.shuffle(away_pool)
        for i in range(min(len(home_pool), len(away_pool), 4)):
            if len(matchups) >= 2:
                break
            a, d = home_pool[i], away_pool[i]
            diff = random.randint(-10, 15)
            advantage = a["name"] if diff >= 0 else d["name"]
            matchups.append({
                "attacker": a["name"],
                "attacker_team": home_team,
                "defender": d["name"],
                "defender_team": away_team,
                "advantage": advantage,
                "diff": f"{diff:+d}",
                "critical": abs(diff) > 12,
            })

    return matchups[:6]

def derive_real_decision(mid, team, match):
    home_subs = [s for s in subs_by_match.get(mid, []) if s["team"] == team]
    if not home_subs:
        return random.choice(["A", "B", "C", "D"])

    early_subs = [s for s in home_subs if s["minute"] < 70]
    late_subs = [s for s in home_subs if s["minute"] >= 70]
    early_count = len(early_subs)
    total_count = len(home_subs)

    attacking_sub = False
    for s in home_subs:
        key = (mid, team, s["player_in"])
        entry = lineup_player_idx.get(key)
        pos = entry.get("first_position") if entry else None
        if pos and POS_POSITION_GROUP.get(pos) == "FWD":
            attacking_sub = True
            break

    defensive_sub = False
    for s in home_subs:
        key = (mid, team, s["player_in"])
        entry = lineup_player_idx.get(key)
        pos = entry.get("first_position") if entry else None
        if pos and POS_POSITION_GROUP.get(pos) == "DEF":
            defensive_sub = True
            break

    hs = match["home_score"]
    as_ = match["away_score"]

    if hs < as_:
        if total_count >= 3 or (early_count >= 2 and attacking_sub):
            return "D"
        if early_count >= 1:
            return "A"
        if total_count == 0 or late_subs:
            return "C"
        return "B"
    elif as_ < hs:
        if defensive_sub:
            return "A"
        if early_count == 0:
            return "B"
        if attacking_sub:
            return "C"
        return "D"
    else:
        if early_count >= 2 and attacking_sub:
            return "D"
        if early_count >= 1 and attacking_sub:
            return "A"
        if early_count >= 1:
            return "B"
        return "C"


def generate_fatigue_popups(home_players, away_players, match):
    """Generate fatigue popups for key players with extreme fatigue."""
    popups = {}
    all_players = home_players + away_players
    home_team = match["home_team"]
    away_team = match["away_team"]
    hs, as_ = match["home_score"], match["away_score"]

    # Find the top 3-5 most fatigued players and bottom 1-2 least fatigued
    sorted_by_fatigue = sorted(all_players, key=lambda p: p["fatigue"], reverse=True)

    for p in sorted_by_fatigue[:4]:
        f = p["fatigue"]
        if f >= 65:
            team = home_team if p in home_players else away_team
            popups[p["name"]] = (
                f"{p['name']} at {f}/100 fatigue — looks exhausted. "
                f"His movement has dropped significantly and he is struggling to track back. "
                f"The manager must consider whether to keep him on or make a change."
            )
        elif f >= 55:
            popups[p["name"]] = (
                f"{p['name']} at {f}/100 fatigue — starting to tire. "
                f"His pressing intensity has dropped and he is losing duels he would normally win. "
                f"A substitution in the next 15-20 minutes may be needed."
            )

    # Add popup for the freshest player (star player with low fatigue)
    sorted_asc = sorted(all_players, key=lambda p: p["fatigue"])
    for p in sorted_asc[:2]:
        if p["name"] not in popups and p["fatigue"] < 35:
            popups[p["name"]] = (
                f"{p['name']} at {p['fatigue']}/100 fatigue — looks fresh and sharp. "
                f"He still has plenty in the tank and could be a decisive factor in the closing stages."
            )

    # Ensure we have at least 2-3 popups
    if len(popups) < 2:
        for p in sorted_by_fatigue[:3]:
            if p["name"] not in popups:
                popups[p["name"]] = (
                    f"{p['name']} at {p['fatigue']}/100 fatigue. "
                    f"His work rate has been a key factor in this match so far."
                )

    return popups

def generate_explanations(options, match, home_players, away_players):
    """Generate pre_generated_explanations for all 4 options."""
    home = match["home_team"]
    away = match["away_team"]
    hs, as_ = match["home_score"], match["away_score"]
    stage = match["stage"]
    explanations = {}

    for opt in options:
        label = opt["label"]
        action = opt["action"]
        risk = opt["risk"]

        if hs > as_:
            # Home team is winning
            verdicts = {
                "A": "the safe, professional choice that protects the lead without abandoning attacking threat.",
                "B": "a solid conservative choice that prioritizes defensive stability. Low risk of conceding, but may invite pressure.",
                "C": "the aggressive choice. Keeping attacking intent when leading can catch opponents off guard but leaves defensive gaps.",
                "D": "the ultra-defensive option. Maximum security at the back, but surrenders possession and invites sustained pressure.",
            }
        elif as_ > hs:
            # Away team is winning (home is losing)
            verdicts = {
                "A": "the proactive choice. Fresh legs can exploit tiring defenders and create new attacking patterns.",
                "B": "the structural change. A back 3 gives more attacking width but requires the midfield to cover more ground.",
                "C": "the patient approach. Trusting the system avoids panic but may waste precious time on the clock.",
                "D": "the desperate gamble. Maximum attacking intent but leaves the team dangerously exposed to counter-attacks.",
            }
        else:
            # Draw
            verdicts = {
                "A": "the positive choice. An attacking substitution signals intent and can break the deadlock.",
                "B": "the width-based approach. Overlapping full-backs create numerical advantages in wide areas.",
                "C": "the patient choice. Maintaining shape avoids risk but may not be enough to win.",
                "D": "the all-out attacking option. An extra striker increases goal threat but sacrifices midfield control.",
            }

        explanations[label] = (
            f"**OPTION {label} — {action}**\n"
            f"Risk level: {risk}. This is {verdicts.get(label, 'a tactical decision that carries its own risks and rewards.')} "
            f"In the context of this {stage.lower()} match between {home} and {away} ({hs}-{as_}), "
            f"this option addresses the tactical challenge but requires precise execution from the players on the pitch."
        )

    return explanations

def generate_options(match, is_home_losing, is_away_losing):
    home = match["home_team"]
    away = match["away_team"]
    home_score = match["home_score"]
    away_score = match["away_score"]

    if home_score < away_score:
        return [
            {"label": "A", "action": f"Double substitution — inject fresh legs into attack and midfield", "risk": "High"},
            {"label": "B", "action": f"Switch to a back 3, push full-backs forward for overloads", "risk": "Medium"},
            {"label": "C", "action": f"Hold shape, trust the system, make changes at 75th minute", "risk": "Medium"},
            {"label": "D", "action": f"Triple substitution — all-out attacking change, gamble everything", "risk": "Very High"},
        ]
    elif away_score < home_score:
        return [
            {"label": "A", "action": f"Defensive substitution — bring on a fresh center-back, sit deep", "risk": "Medium"},
            {"label": "B", "action": f"Drop deeper as a unit, protect the lead, counter-attack", "risk": "Low"},
            {"label": "C", "action": f"Keep attacking — the best defense is a good offense", "risk": "High"},
            {"label": "D", "action": f"Bring on a defensive midfielder, switch to 5-4-1", "risk": "Low"},
        ]
    else:
        return [
            {"label": "A", "action": f"Make an attacking substitution to break the deadlock", "risk": "High"},
            {"label": "B", "action": f"Push the full-backs higher, create overloads out wide", "risk": "Medium"},
            {"label": "C", "action": f"Stay patient, maintain shape, look for a moment of magic", "risk": "Medium"},
            {"label": "D", "action": f"Go ultra-attacking — bring on an extra striker", "risk": "Very High"},
        ]

def generate_context(match):
    home = match["home_team"]
    away = match["away_team"]
    hs = match["home_score"]
    as_ = match["away_score"]
    stage = match["stage"]

    if hs > as_:
        return f"A pivotal moment in this {stage.lower()} match. {home} lead {away} {hs}-{as_}. The game hangs in the balance — every decision from the touchline could decide the outcome."
    elif as_ > hs:
        return f"A pivotal moment in this {stage.lower()} match. {home} trail {away} {hs}-{as_}. Something has to change. The manager must decide how to respond."
    else:
        return f"A tense moment in this {stage.lower()} match. {home} and {away} are locked at {hs}-{as_}. One tactical shift could be the difference between glory and heartbreak."

def generate_replay_events(match):
    events = []
    mid = match["match_id"]
    match_goals = goals_by_match.get(mid, [])
    match_subs = subs_by_match.get(mid, [])
    match_cards = cards_by_match.get(mid, [])

    for g in match_goals:
        gtype = "goal"
        desc = f"{g['player']} scores for {g['team']}!"
        if g["shot_type"] == "Penalty":
            desc += " (Penalty)"
        elif g.get("own_goal"):
            desc += " (Own Goal)"
        events.append({"minute": g["minute"], "type": gtype, "description": desc, "player": g["player"]})

    for s in match_subs:
        if s.get("player_off") and s.get("player_in"):
            events.append({
                "minute": int(s["minute"]) if s["minute"] else 45,
                "type": "substitution",
                "description": f"{s['player_in']} replaces {s['player_off']} ({s.get('reason', 'Tactical')})",
                "player": s["player_in"],
            })

    for c in match_cards:
        events.append({
            "minute": c["minute"],
            "type": "red_card" if c["card"] == "Red" else "yellow_card",
            "description": f"{c['player']} ({c['team']}) shown a {c['card'].lower()} card — {c.get('reason', 'Foul')}",
            "player": c["player"],
        })

    events.sort(key=lambda e: (isinstance(e["minute"], str), e["minute"] if isinstance(e["minute"], int) else 999))
    return events

def build_scenario(match):
    mid = match["match_id"]
    home = match["home_team"]
    away = match["away_team"]
    stage = match["stage"]
    group = match.get("group", "")

    sid = f"{normalize_team(home)}-{normalize_team(away)}-2022"

    home_lineup = lineup_idx.get(mid, {}).get(home, [])
    away_lineup = lineup_idx.get(mid, {}).get(away, [])

    home_players = assign_player_positions(home_lineup, mid, home)[:11]
    away_players = assign_player_positions(away_lineup, mid, away)[:11]

    home_form = detect_formation(home_lineup[:11])
    away_form = detect_formation(away_lineup[:11])

    diff_map = {"Group Stage": 1, "Round of 16": 2, "Quarter-finals": 3, "Semi-finals": 4, "3rd Place Final": 2, "Final": 5}
    difficulty = diff_map.get(stage, 2)

    order_map = {"Group Stage": 10, "Round of 16": 60, "Quarter-finals": 70, "Semi-finals": 80, "3rd Place Final": 90, "Final": 95}
    base_order = order_map.get(stage, 50)
    if stage == "Group Stage":
        order = base_order + (match.get("match_week", 1) - 1) * 16 + hash(home + away) % 16
    else:
        order = base_order + hash(home + away) % 10

    hs, as_ = match["home_score"], match["away_score"]

    trigger = f"Second half — {home} {'lead' if hs > as_ else 'trail' if hs < as_ else 'locked at'} {hs}-{as_}"
    if hs == as_:
        trigger += ", a moment of brilliance needed"

    context = generate_context(match)
    options = generate_options(match, hs < as_, as_ < hs)

    real_option = derive_real_decision(mid, home, match)

    match_goals = goals_by_match.get(mid, [])
    goal_summary = []
    for g in match_goals:
        goal_summary.append(f"{g['player']} ({g['minute']}')")
    gstr = ", ".join(goal_summary) if goal_summary else "No goals"

    shootout_kicks_path = os.path.join(DATA_DIR, "shootout_kicks.json")
    has_shootout = False
    if os.path.exists(shootout_kicks_path):
        with open(shootout_kicks_path) as f:
            shootout_kicks = json.load(f)
        match_shootout = [k for k in shootout_kicks if k["match_id"] == mid]
        has_shootout = len(match_shootout) > 0

    if has_shootout:
        real_desc = f"The match went to penalties after a {hs}-{as_} draw. {gstr}."
    elif hs > as_:
        real_desc = f"{home} won {hs}-{as_}. {gstr}."
    elif as_ > hs:
        real_desc = f"{away} won {as_}-{hs}. {gstr}."
    else:
        real_desc = f"The match ended {hs}-{as_}. {gstr}."

    replay_events = generate_replay_events(match)

    matchups = generate_matchups(home_players, away_players, home, away)
    fatigue_popups = generate_fatigue_popups(home_players, away_players, match)
    pre_generated_explanations = generate_explanations(options, match, home_players, away_players)

    scenario = {
        "id": sid,
        "meta": {
            "title": f"{home} vs {away} — {stage}",
            "trigger_label": trigger,
            "difficulty": difficulty,
            "order": order,
            "stage": stage,
            "group": group,
            "date": match["date"],
            "stadium": match.get("stadium", ""),
        },
        "scoreline": {
            "display": f"{home} {hs} – {as_} {away}",
            "home": hs if hs > 0 else 0,
            "away": as_ if as_ > 0 else 0,
        },
        "context": context,
        "home_team": home,
        "away_team": away,
        "home_formation": home_form,
        "away_formation": away_form,
        "home_players": home_players,
        "away_players": away_players,
        "options": options,
        "real_decision": {
            "option": real_option,
            "description": real_desc,
        },
        "pre_generated_explanations": pre_generated_explanations,
        "fatigue_popups": fatigue_popups,
        "matchups": matchups,
        "replay_events": replay_events,
    }

    return sid, scenario


os.makedirs(OUT_DIR, exist_ok=True)

generated = 0
for match in matches:
    sid, scenario = build_scenario(match)
    filepath = os.path.join(OUT_DIR, f"{sid}.json")
    with open(filepath, "w") as f:
        json.dump(scenario, f, indent=2, ensure_ascii=False)
    generated += 1
    if generated <= 3:
        print(f"  ✓ {sid} ({match['stage']})")

print(f"\nGenerated {generated} scenario files with complete data in {OUT_DIR}")
print("  ✓ matchups — position-based 1v1 battles")
print("  ✓ fatigue_popups — key player stamina insights")
print("  ✓ pre_generated_explanations — tactical analysis for all 4 options")

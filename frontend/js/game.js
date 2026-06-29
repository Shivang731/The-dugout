let currentScenario = null;
let pitch = null;
let pitch3d = null;
let timerId = null;
let decisionMade = false;
let currentView = '2d';
const TIMER_SECONDS = 60;
const allDecisions = JSON.parse(localStorage.getItem('dugout_decisions') || '{}');
let _selectedLang = 'en';
let _lastAILang = 'en';

function getMatchMinute(scenario) {
  const events = scenario.replay_events || [];
  const critical = events.filter(e => (e.minute || 0) >= 40 && (e.minute || 0) <= 80);
  if (critical.length > 0) {
    const midIdx = Math.floor(critical.length / 2);
    return critical[midIdx].minute;
  }
  if (events.length > 0) return events[0].minute || 67;
  return 67;
}

function getFlagEmoji(team) {
  const map = {
    'Senegal': '🇸🇳', 'Netherlands': '🇳🇱', 'Qatar': '🇶🇦', 'Ecuador': '🇪🇨',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Iran': '🇮🇷', 'USA': '🇺🇸', 'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    'Argentina': '🇦🇷', 'Saudi Arabia': '🇸🇦', 'Mexico': '🇲🇽', 'Poland': '🇵🇱',
    'France': '🇫🇷', 'Australia': '🇦🇺', 'Denmark': '🇩🇰', 'Tunisia': '🇹🇳',
    'Spain': '🇪🇸', 'Costa Rica': '🇨🇷', 'Germany': '🇩🇪', 'Japan': '🇯🇵',
    'Belgium': '🇧🇪', 'Canada': '🇨🇦', 'Morocco': '🇲🇦', 'Croatia': '🇭🇷',
    'Brazil': '🇧🇷', 'Serbia': '🇷🇸', 'Switzerland': '🇨🇭', 'Cameroon': '🇨🇲',
    'Portugal': '🇵🇹', 'Ghana': '🇬🇭', 'Uruguay': '🇺🇾', 'South Korea': '🇰🇷',
  };
  return map[team] || '🏳';
}


document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const scenarioId = params.get('scenario');
  if (!scenarioId) {
    document.querySelector('.team-block.home .team-name').textContent = 'NO MATCH';
    return;
  }
  try {
    currentScenario = await fetchScenario(scenarioId);
  } catch (e) {
    document.querySelector('.team-block.home .team-name').textContent = 'ERROR';
    return;
  }
  initMatch();
});

function initMatch() {
  const meta = currentScenario.meta || {};
  const score = currentScenario.scoreline || {};

  _storedAIInsightHTML = '';
  _lastAILang = _selectedLang;

  populateScoreboard(meta, score);
  populateFormationLabels();
  populateStory();
  populateTacticalStory();
  populateAttackZones();
  populateConcept();
  loadAIInsight(_selectedLang);

  init2DPitch();
  populateMomentum();
  renderEvents();

  const legendItems = document.querySelectorAll('.legend-item');
  if (legendItems.length >= 2) {
    legendItems[0].childNodes[1].textContent = ' ' + (currentScenario.home_team || 'Home') + ' shape';
    legendItems[1].childNodes[1].textContent = ' ' + (currentScenario.away_team || 'Away') + ' shape';
  }

  setTimeout(() => showDecision(), 1500);
}

function populateMomentum() {
  const scenario = currentScenario;
  const events = scenario.replay_events || [];
  const homeName = (scenario.home_team || '').toLowerCase();
  const awayName = (scenario.away_team || '').toLowerCase();
  const hScore = scenario.scoreline?.home || 0;
  const aScore = scenario.scoreline?.away || 0;

  const totalEvents = events.length;
  if (!totalEvents) {
    _updateMomentumBar(50, 50, 'Balanced');
    return;
  }

  let homeMom = 0, awayMom = 0;
  events.forEach((e, idx) => {
    const desc = (e.description || '').toLowerCase();
    const recency = 0.5 + (idx / totalEvents) * 0.5;
    const hasHome = homeName && desc.includes(homeName);
    const hasAway = awayName && desc.includes(awayName);

    let value = 0;
    if (e.type === 'goal') value = 3;
    else if (e.type === 'shot') value = 1.5;
    else if (desc.includes('save') || desc.includes('dangerous')) value = 1;
    else if (desc.includes('cross') || desc.includes('through')) value = 0.8;
    else if (desc.includes('foul') || desc.includes('yellow') || desc.includes('red')) value = 0.3;
    else value = 0.5;

    value *= recency;

    if (hasHome && !hasAway) homeMom += value;
    else if (hasAway && !hasHome) awayMom += value;
    else { homeMom += value * 0.5; awayMom += value * 0.5; }
  });

  const totalGoals = hScore + aScore || 1;
  const scoreMom = (hScore / totalGoals) * 100;
  const totalMom = homeMom + awayMom || 1;
  const eventMom = (homeMom / totalMom) * 100;

  const pct = Math.round(scoreMom * 0.25 + eventMom * 0.75);
  const homePct = Math.min(85, Math.max(15, pct));
  const awayPct = 100 - homePct;

  const diff = homePct - awayPct;
  const label = diff > 15 ? 'Home Dominating' : diff < -15 ? 'Away Dominating' : diff > 5 ? 'Home Advantaged' : diff < -5 ? 'Away Advantaged' : 'Balanced';

  _updateMomentumBar(homePct, awayPct, label);
}

function _updateMomentumBar(homePct, awayPct, label) {
  const home = currentScenario.home_team || 'Home';
  const away = currentScenario.away_team || 'Away';

  document.getElementById('mom-home-name').textContent = home.toUpperCase();
  document.getElementById('mom-away-name').textContent = away.toUpperCase();
  document.getElementById('mom-home-fill').style.width = homePct + '%';
  document.getElementById('mom-away-fill').style.width = awayPct + '%';
  document.getElementById('mom-home-pct').textContent = homePct + '%';
  document.getElementById('mom-away-pct').textContent = awayPct + '%';

  const lblEl = document.getElementById('mom-label');
  if (lblEl) lblEl.textContent = label;
}

function renderEvents() {
  const el = document.getElementById('events-timeline');
  if (!el) return;
  const events = currentScenario.replay_events || [];
  if (!events.length) { el.innerHTML = ''; return; }

  // Compute keyframes on the pitch so seekReplay works
  if (pitch && pitch.computeReplayKeyframes) {
    pitch.computeReplayKeyframes(events);
  }

  const iconMap = {
    'goal': '⚽',
    'yellow_card': '🟨',
    'substitution': '🔄',
    'red_card': '🟥',
    'shot': '➡️',
    'foul': '🔶',
    'corner': '🚩',
    'offside': '🚫',
  };

  el.innerHTML = events.map((e, i) => {
    const cls = e.type === 'goal' ? 'goal' : e.type === 'yellow_card' ? 'yellow_card' : e.type === 'substitution' ? 'substitution' : '';
    const desc = (e.description || '').substring(0, 28);
    const icon = iconMap[e.type] || '●';
    return `
      <div class="event-pin ${cls}" data-index="${i}" title="${(e.description || '').replace(/"/g, '&quot;')}">
        <div class="event-pin-inner">
          <span class="event-icon">${icon}</span>
          <span class="event-minute">${e.minute || '?'}'</span>
        </div>
        <div class="event-desc-wrapper">
          <span class="event-desc">${desc}</span>
        </div>
      </div>
    `;
  }).join('');

  el.querySelectorAll('.event-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const idx = parseInt(pin.dataset.index);
      const event = events[idx];
      // Seek to this event on the pitch (smooth ball animation)
      if (pitch && pitch.seekReplay) {
        pitch.pauseReplay();
        pitch._replayIndex = idx - 1;
        pitch.seekReplay(idx);
      }
      // Set highlight zones without snapping ball
      if (pitch && event) {
        const eType = (event.type || '').toLowerCase();
        if (eType === 'goal' || eType === 'shot') {
          pitch.setHighlightedZones([{ x: 0.78, y: 0.22, w: 0.22, h: 0.56, label: 'Goal attempt' }]);
        } else if (eType === 'corner') {
          pitch.setHighlightedZones([{ x: 0.82, y: 0, w: 0.18, h: 0.18, label: 'Corner' }]);
        } else {
          pitch.setHighlightedZones([]);
        }
      }
      // Update active class
      document.querySelectorAll('.event-pin').forEach(p => p.classList.remove('active'));
      pin.classList.add('active');
      populateTacticalStory();
      loadAIInsight(_selectedLang);
      updateReplayButton();
    });
    pin.addEventListener('mouseenter', () => {
      const idx = parseInt(pin.dataset.index);
      const event = events[idx];
      if (pitch && pitch.highlightEvent) pitch.highlightEvent(event);
      // Highlight zones for the event type without changing overlay
      if (pitch && event) {
        const eType = (event.type || '').toLowerCase();
        if (eType === 'goal' || eType === 'shot') {
          pitch.setHighlightedZones([{ x: 0.78, y: 0.22, w: 0.22, h: 0.56, label: 'Goal attempt' }]);
        } else if (eType === 'foul' || eType === 'yellow_card' || eType === 'red_card') {
          pitch.setHighlightedZones([]);
        } else if (eType === 'corner') {
          pitch.setHighlightedZones([{ x: 0.82, y: 0, w: 0.18, h: 0.18, label: 'Corner' }]);
        } else {
          pitch.setHighlightedZones([]);
        }
      }
      populateTacticalStory();
    });
    pin.addEventListener('mouseleave', () => {
      if (pitch && pitch.clearEventHighlight) pitch.clearEventHighlight();
      if (pitch) pitch.setHighlightedZones([]);
      populateTacticalStory();
    });
  });
}

// ── REPLAY CONTROLS ──

function toggleReplay() {
  if (!pitch || !pitch._replayKeyframes || !pitch._replayKeyframes.length) return;
  if (pitch._replayPlaying) {
    pitch.pauseReplay();
  } else {
    if (pitch._replayIndex >= pitch._replayKeyframes.length - 1) {
      pitch._replayIndex = -1;
    }
    pitch.playReplay();
  }
  updateReplayButton();
}

function setReplaySpeed(speed) {
  if (!pitch) return;
  pitch.setReplaySpeed(speed);
  document.querySelectorAll('.speed-btn').forEach(b => {
    b.classList.toggle('active', parseFloat(b.dataset.speed) === speed);
  });
}

function updateReplayButton() {
  const btn = document.getElementById('replay-play-btn');
  if (!btn) return;
  const playing = pitch && pitch._replayPlaying;
  btn.innerHTML = playing
    ? `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="6" y="5" width="4" height="14" rx="1" fill="white"/><rect x="14" y="5" width="4" height="14" rx="1" fill="white"/></svg>`
    : `<svg viewBox="0 0 24 24" width="18" height="18"><polygon points="6,4 20,12 6,20" fill="white"/></svg>`;
  btn.classList.toggle('playing', playing);
}

// ===== OVERLAY CONTROL =====
function setOverlay(mode) {
  if (pitch && pitch.setOverlay) {
    pitch.setOverlay(mode);
  }
  if (pitch3d && pitch3d.setOverlay) {
    pitch3d.setOverlay(mode);
  }
  document.querySelectorAll('.overlay-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.overlay === mode);
  });
  // Refresh the concept to match the selected overlay
  populateConcept();
}

function setDisplayMode(mode) {
  if (pitch && pitch.setDisplayMode) {
    pitch.setDisplayMode(mode);
  }
  document.querySelectorAll('.mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
  const overlayBtns = document.querySelector('.overlay-toggles');
  if (overlayBtns) {
    overlayBtns.style.display = mode === 'live' ? 'none' : 'flex';
  }
}

// ===== ALL DATA FROM SCENARIO =====

function populateScoreboard(meta, score) {
  const home = currentScenario.home_team || 'Home';
  const away = currentScenario.away_team || 'Away';
  document.querySelector('.team-block.home .team-name').textContent = home.toUpperCase();
  document.querySelector('.team-block.away .team-name').textContent = away.toUpperCase();
  document.getElementById('home-score').textContent = score.home ?? 0;
  document.getElementById('away-score').textContent = score.away ?? 0;
  const matchMinute = getMatchMinute(currentScenario);
  document.getElementById('match-minute').textContent = matchMinute + "'";
  document.getElementById('match-stage').textContent = meta.stage || 'Group Stage';
  document.getElementById('match-stadium').textContent = meta.stadium || 'Al Thumama Stadium';
  const halfEl = document.querySelector('.half-display');
  if (halfEl) halfEl.textContent = matchMinute > 45 ? 'Second Half' : 'First Half';

  populateProgress();
}

function populateProgress() {
  const completed = Object.keys(allDecisions).length;
  const items = document.querySelectorAll('.progress-item');
  if (items.length < 4) return;
  const pct = Math.min(100, Math.round((completed / 64) * 100));
  items[0].querySelector('.progress-value').textContent = `${completed}/64`;
  items[0].querySelector('.progress-fill').style.width = pct + '%';
  const level = Math.min(5, Math.max(1, Math.floor(completed / 12) + 1));
  const levelPct = Math.min(100, (completed % 12) * (100 / 12));
  items[3].querySelector('.progress-value').textContent = String(level);
  items[3].querySelector('.progress-fill').style.width = levelPct + '%';
}

function populateFormationLabels() {
  const h = currentScenario.home_team || '';
  const a = currentScenario.away_team || '';
  const hf = currentScenario.home_formation || '4-3-3';
  const af = currentScenario.away_formation || '4-3-3';
  const el1 = document.getElementById('home-formation');
  const el2 = document.getElementById('away-formation');
  if (el1) el1.textContent = h.toUpperCase() + ' ' + hf;
  if (el2) el2.textContent = a.toUpperCase() + ' ' + af;
}

function populateStory() {
  const h = currentScenario.home_team;
  const a = currentScenario.away_team;
  const hScore = currentScenario.scoreline?.home ?? 0;
  const aScore = currentScenario.scoreline?.away ?? 0;
  const hForm = currentScenario.home_formation || '4-3-3';
  const aForm = currentScenario.away_formation || '5-3-2';

  const context = currentScenario.context || '';
  let story = context;

  const trailing = hScore < aScore;
  const leading = hScore > aScore;
  const drawing = !trailing && !leading;

  if (trailing) {
    story = context || `${h} trail ${hScore}–${aScore} and are pushing forward in their ${hForm} shape. ${a} have dropped into a compact ${aForm} defensive block. Possession is not translating into clear chances — the next tactical adjustment could decide the result.`;
  } else if (leading) {
    story = context || `${h} protect a ${hScore}–${aScore} lead in their ${hForm} shape. ${a} search for an equaliser but risk leaving space at the back. One moment of quality could swing the tie.`;
  } else {
    story = context || `${h} in a ${hForm} vs ${a} in a ${aForm}. Scores level but the game is finely balanced. The team that makes the right tactical adjustment will gain the upper hand.`;
  }

  const el = document.getElementById('story-text');
  if (el) el.textContent = story;

  const titleEl = document.querySelector('.story-title');
  if (titleEl) {
    if (trailing) titleEl.textContent = `Can ${h} turn this around?`;
    else if (leading) titleEl.textContent = `${h} must hold on.`;
    else titleEl.textContent = `Who breaks the deadlock?`;
  }

  const goalTextEl = document.querySelector('.goal-text');
  if (goalTextEl) {
    if (trailing) goalTextEl.textContent = `Find the tactical change to get ${h} back into this match.`;
    else if (leading) goalTextEl.textContent = `Choose how ${h} should protect their lead.`;
    else goalTextEl.textContent = `Select the adjustment that gives ${h} the edge.`;
  }

  const flagEl = document.querySelector('.story-flag');
  if (flagEl) flagEl.textContent = getFlagEmoji(h);
}

function loadAIInsight(lang) {
  lang = lang || _selectedLang || 'en';
  console.log('[AI] loadAIInsight called with lang:', lang);
  const el = document.getElementById('ai-insight');
  if (!el) return;

  el.innerHTML = '<div class="spinner"></div>';

  console.log('[AI] Fetching insight for scenario:', currentScenario.id, 'lang:', lang);
  fetchMatchInsight(currentScenario.id, lang).then(data => {
    console.log('[AI] Response received for lang:', lang, 'via:', data.via);
    el.innerHTML = '';
    const insight = data.insight || '';
    const parts = insight.split(/(?<=\.)\s+/);
    parts.forEach((p, i) => {
      if (!p.trim()) return;
      const isLast = i === parts.length - 1;
      const cls = isLast ? 'highlight-green' : '';
      el.innerHTML += `<p class="${cls}">${p}</p>`;
    });
    _storedAIInsightHTML = el.innerHTML;
    _lastAILang = lang;
    console.log('[AI] Stored as _lastAILang:', _lastAILang);
    // Sync the pitch overlay + zone highlights to match the AI description
    _syncPitchToConcepts(insight, currentScenario);
    populateConcept();
  }).catch(() => {
    console.log('[AI] API call failed, using fallback for lang:', lang);
    const h = currentScenario.home_team;
    const a = currentScenario.away_team;
    const hf = currentScenario.home_formation || '4-3-3';
    const af = currentScenario.away_formation || '5-3-2';
    el.innerHTML = `
      <p>${h} are organised in a ${hf} while ${a} defend in a ${af}.</p>
      <p class="highlight-green">Creating overloads in the final third will be key to breaking down the defensive block.</p>
    `;
    _storedAIInsightHTML = el.innerHTML;
    _lastAILang = lang;
    _syncPitchToConcepts(el.innerHTML, currentScenario);
    populateConcept();
  });
}

function changeInsightLang(lang) {
  console.log('[LANG] changeInsightLang called with:', lang, '| _lastAILang:', _lastAILang);
  if (lang === _lastAILang) {
    console.log('[LANG] Same as current, skipping');
    return;
  }
  _selectedLang = lang;
  document.getElementById('lang-select').value = lang;
  console.log('[LANG] Updated _selectedLang to:', _selectedLang);
  loadAIInsight(lang);
}

// ── Dynamic Tactical Story engine ──

function _analyzeTeam(players) {
  if (!players || players.length === 0) {
    return { avgX: 0.5, avgDefX: 0.5, compactness: 0.2, thirdCounts: [3, 4, 3], defLineX: 0.35 };
  }
  const outfield = players.filter(p => p.pos !== 'GK');
  const n = outfield.length || 1;
  const sumX = outfield.reduce((s, p) => s + (p._tx ?? p.x ?? 0.5), 0);
  const avgX = sumX / n;

  const defRoles = ['CB', 'DF', 'LB', 'RB', 'WB'];
  const defPlayers = outfield.filter(p => defRoles.includes(p.pos));
  const avgDefX = defPlayers.length > 0
    ? defPlayers.reduce((s, p) => s + (p._tx ?? p.x ?? 0.5), 0) / defPlayers.length
    : avgX;

  const variance = outfield.reduce((s, p) => s + ((p._tx ?? p.x ?? 0.5) - avgX) ** 2, 0) / n;
  const compactness = Math.sqrt(variance);

  const left = outfield.filter(p => (p._tx ?? p.x ?? 0.5) < 0.33).length;
  const center = outfield.filter(p => {
    const x = p._tx ?? p.x ?? 0.5;
    return x >= 0.33 && x <= 0.66;
  }).length;
  const right = outfield.filter(p => (p._tx ?? p.x ?? 0.5) > 0.66).length;

  return { avgX, avgDefX, compactness, thirdCounts: [left, center, right], defLineX: avgDefX };
}

function _describeBlock(analysis) {
  const dl = analysis.defLineX;
  if (dl < 0.35) return 'low';
  if (dl < 0.55) return 'mid';
  return 'high';
}

function _describeCompactness(analysis) {
  if (analysis.compactness < 0.12) return 'very compact';
  if (analysis.compactness < 0.2) return 'relatively compact';
  if (analysis.compactness < 0.28) return 'moderately spread';
  return 'stretched';
}

function _describePressing(scenario, pitch) {
  if (pitch && pitch._pressingState) {
    const ps = pitch._pressingState;
    const intVal = ps.intensityValue || 0;
    if (intVal > 55) return 'intense';
    if (intVal > 35) return 'aggressive';
    if (intVal > 20) return 'moderate';
    return 'passive';
  }
  const events = scenario.replay_events || [];
  const pressEvents = events.filter(e =>
    (e.description || '').toLowerCase().includes('press') ||
    (e.description || '').toLowerCase().includes('tackl') ||
    (e.description || '').toLowerCase().includes('intercept')
  );
  if (pressEvents.length > 2) return 'aggressive';
  if (pressEvents.length > 0) return 'moderate';
  return 'passive';
}

function _detectPossession(pitch, scenario) {
  if (pitch && pitch.momentum) {
    const m = pitch.momentum;
    if (m.home > 58) return 'home';
    if (m.away > 58) return 'away';
    if (m.home > 52) return 'home-slight';
    if (m.away > 52) return 'away-slight';
    return 'balanced';
  }
  const events = scenario.replay_events || [];
  let homeEv = 0, awayEv = 0;
  const hName = (scenario.home_team || '').toLowerCase();
  events.forEach(e => {
    const desc = (e.description || '').toLowerCase();
    if (desc.includes(hName)) homeEv++;
    else awayEv++;
  });
  const total = homeEv + awayEv || 1;
  const pct = (homeEv / total) * 100;
  if (pct > 58) return 'home';
  if (pct < 42) return 'away';
  return 'balanced';
}

function _dominantChannelLabel(az) {
  if (az.leftPct >= az.centerPct && az.leftPct >= az.rightPct) return 'left';
  if (az.centerPct >= az.rightPct) return 'central';
  return 'right';
}

function _ballThirdLabel(x) {
  if (x < 0.33) return 'their own half';
  if (x < 0.66) return 'the middle third';
  return "the opponent's half";
}

function _findRecentEventType(events, n) {
  const recent = events.slice(-n);
  for (const e of recent) {
    const t = (e.type || '').toLowerCase();
    if (t === 'goal') return 'a goal';
    if (t === 'yellow_card') return 'a yellow card';
    if (t === 'red_card') return 'a red card';
    if (t === 'substitution') return 'a substitution';
    if (t === 'shot') return 'a shot';
    if (t === 'foul') return 'a foul';
  }
  return null;
}

function generateTacticalStory(scenario, pitch) {
  const h = scenario.home_team || 'Home';
  const a = scenario.away_team || 'Away';
  const hForm = scenario.home_formation || '4-4-2';
  const aForm = scenario.away_formation || '4-4-2';
  const score = scenario.scoreline || { home: 0, away: 0 };
  const events = scenario.replay_events || [];

  const minute = getMatchMinute(scenario) + "'";

  // Ball position
  const ball = pitch && pitch.ball ? pitch.ball.pos : { x: 0.5, y: 0.5 };
  const ballThird = ball.x < 0.33 ? 'home-def' : ball.x < 0.66 ? 'mid' : 'away-def';

  // Team analysis
  const homeA = _analyzeTeam(scenario.home_players);
  const awayA = _analyzeTeam(scenario.away_players);

  // Possession
  const possession = _detectPossession(pitch, scenario);

  // Attack zones
  const az = computeAttackZones(scenario);
  const dominantCh = _dominantChannelLabel(az);

  // Defensive block (team with lower avgX is defending)
  const homeDefending = homeA.avgX < awayA.avgX;
  const defTeam = homeDefending ? 'home' : 'away';
  const attTeam = homeDefending ? 'away' : 'home';
  const defAnalysis = homeDefending ? homeA : awayA;
  const attAnalysis = homeDefending ? awayA : homeA;
  const blockType = _describeBlock(defAnalysis);
  const compact = _describeCompactness(defAnalysis);

  // Pressing
  const pressIntensity = _describePressing(scenario, pitch);

  // Recent event
  const recentEvent = _findRecentEventType(events, 3);
  const lastEvent = events[events.length - 1];

  // Numerical advantages
  const hMid = homeA.thirdCounts[1];
  const aMid = awayA.thirdCounts[1];
  const hAtt = homeA.thirdCounts[2];
  const aDef = awayA.thirdCounts[0];

  // Score context
  const homeLeading = score.home > score.away;
  const awayLeading = score.away > score.home;
  const drawing = score.home === score.away;
  const isLopsided = Math.abs(score.home - score.away) >= 2;

  // ── BUILD SITUATION ──
  let situation = '';

  if (possession === 'home' || possession === 'home-slight') {
    const prefix = possession === 'home' ? 'dominate' : 'have';
    situation = `${h} ${prefix} possession in ${_ballThirdLabel(ball.x)}`;
  } else if (possession === 'away' || possession === 'away-slight') {
    const prefix = possession === 'away' ? 'dominate' : 'have';
    situation = `${a} ${prefix} possession in ${_ballThirdLabel(ball.x)}`;
  } else {
    situation = `Possession is evenly contested in the middle third`;
  }

  if (recentEvent) {
    situation += ` following ${recentEvent}`;
  }

  if (ballThird === 'home-def' && (possession === 'home' || possession === 'home-slight')) {
    situation = `${h} are building from the back under ${pressIntensity} pressure from ${a}`;
  } else if (ballThird === 'away-def' && (possession === 'away' || possession === 'away-slight')) {
    situation = `${a} are playing out from defence with ${homeDefending ? h : a} pressing ${pressIntensity}ly`;
  }

  if (drawing && ballThird === 'away-def' && possession === 'home') {
    situation = `${h} are camped in ${a}'s half, searching for a breakthrough against a ${blockType} block`;
  } else if (homeLeading && ballThird === 'home-def') {
    situation = `${h} are protecting their lead, keeping possession deep while ${a} push forward`;
  } else if (awayLeading && ballThird === 'away-def') {
    situation = `${a} are shielding their advantage, holding a ${blockType} defensive block`;
  }

  // ── BUILD WHY IT MATTERS ──
  let why = '';

  const hMidfielders = ['CM', 'DM', 'LM', 'RM', 'AM', 'MF'];
  const hMidCount = (scenario.home_players || []).filter(p => hMidfielders.includes(p.pos)).length;
  const aMidCount = (scenario.away_players || []).filter(p => hMidfielders.includes(p.pos)).length;
  const midfieldAdvantage = hMidCount > aMidCount ? 'home' : aMidCount > hMidCount ? 'away' : null;

  if (midfieldAdvantage === 'home') {
    why = `${h}'s ${hForm} gives them a ${hMidCount}-vs-${aMidCount} numerical edge in midfield, controlling the central areas`;
  } else if (midfieldAdvantage === 'away') {
    why = `${a}'s ${aForm} creates a ${aMidCount}-vs-${hMidCount} midfield advantage, allowing them to crowd the centre`;
  } else {
    why = `Both ${hForm} and ${aForm} are evenly matched with ${hMidCount} midfielders each`;
  }

  if (homeDefending && blockType !== 'mid') {
    const blockDesc = blockType === 'low' ? `daring ${a} to break them down from distance` : 'pressing higher up to force turnovers';
    why += `. ${h} sit in a ${blockType} ${compact} block, ${blockDesc}`;
  } else if (!homeDefending && blockType !== 'mid') {
    const blockDesc = blockType === 'low' ? 'packing the penalty area' : `meeting ${h} earlier in the build-up`;
    why += `. ${a} defend in a ${blockType} ${compact} block, ${blockDesc}`;
  }

  if (pressIntensity === 'intense') {
    why += `. The pressing is ${pressIntensity} — the ${homeDefending ? h : a} front line is disrupting passing lanes`;
  }

  // Channel emphasis
  if (az.leftPct > 40) {
    why += `. ${possession === 'home' || possession === 'home-slight' ? h : a} are funneling play through the left channel (${az.leftPct}% of attacks)`;
  } else if (az.rightPct > 40) {
    why += `. The right flank is the primary outlet (${az.rightPct}% of attacks)`;
  }

  // ── BUILD NOTICE (what to look at) ──
  let notice = '';

  if (hAtt > aDef + 1) {
    notice = `${h} have ${hAtt} players forward against ${aDef} defenders — a numerical overload in the final third`;
  } else if (aDef > hAtt + 1) {
    notice = `${a} have ${aDef} defenders against ${hAtt} attackers, comfortably matched in the box`;
  }

  if (homeDefending && compact.includes('compact')) {
    const gap = Math.abs(homeA.avgX - awayA.avgX);
    if (gap < 0.35) {
      notice = (notice ? notice + '. ' : '') + `The gap between ${h}'s block and ${a}'s attack is narrow — space is at a premium`;
    } else if (gap > 0.5) {
      notice = (notice ? notice + '. ' : '') + `There is significant space between ${h}'s defence and midfield — ${a} can exploit the pocket`;
    }
  }

  if (!notice) {
    notice = `Watch how ${possession === 'home' || possession === 'home-slight' ? h : a} build through the ${dominantCh} channel`;
  }

  // ── BUILD EXPECTED OUTCOME ──
  let outcome = '';

  if (drawing) {
    if (possession === 'home' || possession === 'home-slight') {
      if (az.centerPct > 40) {
        outcome = `${h} are likely to create through the centre`;
      } else {
        outcome = `${h} will continue probing the ${dominantCh} flank for a defensive gap`;
      }
      if (blockType === 'low') {
        outcome += `, but ${a}'s deep block forces them to rely on shots from distance`;
      }
    } else if (possession === 'away' || possession === 'away-slight') {
      outcome = `${a} look to transition quickly through the ${dominantCh} channel when they recover possession`;
      if (pressIntensity === 'intense' || pressIntensity === 'aggressive') {
        outcome += ` — a turnover in midfield could be decisive`;
      }
    } else {
      outcome = `The next midfield duel or set piece could tip the balance in a finely poised match`;
    }
  } else if (homeLeading) {
    outcome = `${a} will commit more players forward, leaving space for ${h} to counter through the ${dominantCh} channel`;
  } else if (awayLeading) {
    outcome = `${h} will push higher, risking exposure to ${a}'s counter-attacks`;
  }

  if (!outcome) {
    outcome = `The momentum shift will depend on which team wins the next midfield battle`;
  }

  return { minute, situation, whyItMatters: why, notice, expectedOutcome: outcome };
}

function populateTacticalStory() {
  const minuteEl = document.getElementById('tl-minute');
  const sitEl = document.getElementById('ts-situation');
  const whyEl = document.getElementById('ts-why');
  const outEl = document.getElementById('ts-outcome');
  if (!minuteEl || !sitEl || !whyEl || !outEl) return;

  const story = generateTacticalStory(currentScenario, pitch);
  minuteEl.textContent = story.minute;
  sitEl.textContent = story.situation;
  whyEl.textContent = story.whyItMatters;
  outEl.textContent = story.expectedOutcome;
}

function populateAttackZones() {
  if (!currentScenario) return;

  const container = document.getElementById('mini-pitch-container');
  if (!container) return;

  // Create mini-pitch as a lightweight Pitch2D instance
  if (window.pitchMini) {
    window.pitchMini.destroy();
    delete window.pitchMini;
  }
  window.pitchMini = new Pitch2D('mini-pitch-container', currentScenario);
  window.pitchMini.renderFlags = { players: false, ball: false, labels: false, attackZones: true };
  window.pitchMini._pad = 10;

  // Calculate attack zones once (shared with main overlay & AI insight)
  const result = computeAttackZones(currentScenario);

  // Animate smooth transition on the mini-pitch
  window.pitchMini.setAttackZoneData(result);

  // Wire up tooltip on canvas hover
  const canvas = window.pitchMini.canvas;
  const tooltip = document.getElementById('pitch-tooltip');

  canvas.onmousemove = function (e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = mx * scaleX, cy = my * scaleY;
    const pad = window.pitchMini._pad;
    const W = canvas.width, H = canvas.height;
    const ph = H - pad * 2;
    const pw = W - pad * 2;
    const cw = pw / 3;

    if (cy < pad || cy > pad + ph || cx < pad || cx > pad + pw) {
      tooltip.style.display = 'none';
      canvas.style.cursor = 'default';
      return;
    }

    const relX = cx - pad;
    let channel, pct, raw;
    if (relX < cw) { channel = 'Left'; pct = result.leftPct; raw = result.leftRaw; }
    else if (relX < cw * 2) { channel = 'Central'; pct = result.centerPct; raw = result.centerRaw; }
    else { channel = 'Right'; pct = result.rightPct; raw = result.rightRaw; }
    canvas.style.cursor = 'pointer';

    const tw = Math.max(tooltip.offsetWidth, 120);
    let tx = mx + 12, ty = my - 20;
    if (tx + tw > rect.width - 8) tx = mx - tw - 12;
    if (ty < 4) ty = 4;

    tooltip.innerHTML = '<div class="tt-channel">' + channel + '</div><div class="tt-stat">' + pct + '% \u00B7 ' + Math.round(raw) + ' weighted actions</div>';
    tooltip.style.left = tx + 'px';
    tooltip.style.top = ty + 'px';
    tooltip.style.display = 'block';
  };

  canvas.onmouseleave = function () {
    tooltip.style.display = 'none';
    canvas.style.cursor = 'default';
  };
}

// ── Tactical concept parsing & pitch sync (AI Insight ↔ Overlay) ──

let _storedAIInsightHTML = '';

function _parseTacticalConcepts(text, scenario) {
  const h = (scenario.home_team || '').toLowerCase();
  const a = (scenario.away_team || '').toLowerCase();
  const lower = text.toLowerCase();
  const concepts = [];
  const zones = [];

  if (/\b(press(ing|ure)?|high press|urgent)\b/.test(lower)) {
    concepts.push('pressing');
  }
  if (/\b(compact|low block|defensive block|deep)\b/.test(lower)) {
    concepts.push('defensive');
  }
  if (/\b(attack(ing)?|overload|final third)\b/.test(lower)) {
    concepts.push('attack');
    if (/\bleft\b/.test(lower) && !/\bright\b/.test(lower)) {
      zones.push({ x: 0, y: 0, w: 0.33, h: 1, label: 'Left channel' });
    }
    if (/\bright\b/.test(lower) && !/\bleft\b/.test(lower)) {
      zones.push({ x: 0.66, y: 0, w: 0.34, h: 1, label: 'Right channel' });
    }
    if (/\b(central|middle|through)\b/.test(lower)) {
      zones.push({ x: 0.33, y: 0, w: 0.33, h: 1, label: 'Central channel' });
    }
    if (/\b(half.?space|halfspace)\b/i.test(lower)) {
      zones.push({ x: 0.28, y: 0, w: 0.15, h: 1, label: 'Left half-space' });
      zones.push({ x: 0.57, y: 0, w: 0.15, h: 1, label: 'Right half-space' });
    }
    if (/\b(penalty area|box|18-yard)\b/.test(lower)) {
      zones.push({ x: 0.78, y: 0.22, w: 0.22, h: 0.56, label: 'Penalty area' });
    }
    if (/\b(wide|wing|flank)\b/.test(lower) && /\bleft\b/.test(lower)) {
      zones.push({ x: 0, y: 0, w: 0.18, h: 1, label: 'Left wing' });
    }
    if (/\b(wide|wing|flank)\b/.test(lower) && /\bright\b/.test(lower)) {
      zones.push({ x: 0.82, y: 0, w: 0.18, h: 1, label: 'Right wing' });
    }
  }
  if (/\b(passing|pass(es)?|lane)\b/.test(lower)) {
    concepts.push('passing');
  }
  if (/\b(pitch control|possession|control)\b/.test(lower)) {
    concepts.push('pitch_control');
  }
  if (/\b(compact(ness)?|gap|distance)\b/.test(lower)) {
    concepts.push('compactness');
  }

  if (concepts.length === 0) {
    const az = computeAttackZones(scenario);
    if (az.leftPct >= az.centerPct && az.leftPct >= az.rightPct) {
      zones.push({ x: 0, y: 0, w: 0.33, h: 1, label: 'Primary attack: Left' });
    } else if (az.centerPct >= az.leftPct && az.centerPct >= az.rightPct) {
      zones.push({ x: 0.33, y: 0, w: 0.33, h: 1, label: 'Primary attack: Central' });
    } else {
      zones.push({ x: 0.66, y: 0, w: 0.34, h: 1, label: 'Primary attack: Right' });
    }
  }

  return { concepts, zones };
}

function _conceptToOverlay(concepts) {
  if (concepts.includes('pressing')) return 'pressing';
  if (concepts.includes('defensive')) return 'defensive';
  if (concepts.includes('passing')) return 'passing';
  if (concepts.includes('compactness')) return 'compactness';
  if (concepts.includes('pitch_control')) return 'pitch_control';
  if (concepts.includes('attack')) return 'attack';
  return 'shape';
}

function _syncPitchToConcepts(text, scenario) {
  if (!pitch) return;
  const parsed = _parseTacticalConcepts(text, scenario);
  pitch.setHighlightedZones(parsed.zones);
}

function _getActionPreviewText(action, scenario) {
  const h = scenario.home_team || 'Home';
  const a = scenario.away_team || 'Away';
  const aLower = action.toLowerCase();

  if (aLower.includes('press') || aLower.includes('high line') || aLower.includes('urgent')) {
    return `<p>${h} would push their defensive line higher and trigger a coordinated press in the opponent's half. This reduces the time ${a} have on the ball but risks leaving space in behind for quick transitions.</p><p class="highlight-green">The pressing intensity would increase by approximately 25%, forcing more turnovers in dangerous areas.</p>`;
  }
  if ((aLower.includes('striker') || aLower.includes('forward')) && (aLower.includes('second') || aLower.includes('extra'))) {
    return `<p>Adding a second striker shifts the attacking shape to put more bodies in the penalty area. This creates 2v2 situations against the centre-backs and increases the cross completion target area.</p><p class="highlight-green">Running the risk of losing midfield control if ${a} counter through the middle.</p>`;
  }
  if (aLower.includes('shape') || aLower.includes('back 3') || aLower.includes('back three') || aLower.includes('back 5') || aLower.includes('back five') || aLower.includes('formation') || aLower.includes('switch')) {
    return `<p>${h} would restructure their defensive and attacking lines, altering the spacing between units. A shape change can disrupt the opponent's pressing triggers and create new passing lanes.</p><p class="highlight-green">Players must adapt to new positions — expect a brief adjustment period before the system settles.</p>`;
  }
  if (aLower.includes('hold') || aLower.includes('trust') || aLower.includes('patient') || aLower.includes('wait') || aLower.includes('system')) {
    return `<p>${h} maintain their current tactical structure, trusting the system to create opportunities. Staying patient preserves defensive organisation and prevents unnecessary disruption.</p><p class="highlight-green">The risk is running out of time — if the current approach isn't working, waiting may not change the outcome.</p>`;
  }
  if (aLower.includes('sub') || aLower.includes('fresh') || aLower.includes('inject') || aLower.includes('legs')) {
    return `<p>Fresh substitutions inject energy into ${h}'s attacking channels and raise the overall pressing intensity. New players can exploit specific mismatches against tired opponents.</p><p class="highlight-green">The tactical shape remains intact but individual battles shift in ${h}'s favour.</p>`;
  }
  if (aLower.includes('wing') || aLower.includes('wider') || aLower.includes('cross') || aLower.includes('wide')) {
    return `<p>${h} would stretch the play wider to create 1v1 situations on the flanks. This pulls the opposition defence apart horizontally and opens crossing lanes into the box.</p><p class="highlight-green">The full-backs push higher, leaving more space for ${a} to counter into if possession is lost.</p>`;
  }
  if (aLower.includes('drop') || aLower.includes('deep') || aLower.includes('defend')) {
    return `<p>${h} drop their defensive line closer to the penalty area, reducing the space for ${a} to run in behind. The block becomes more compact and harder to penetrate.</p><p class="highlight-green">Dropping deeper invites more possession from ${a} but limits their ability to create high-quality chances.</p>`;
  }
  if (aLower.includes('midfield') || aLower.includes('pivot') || aLower.includes('dm') || aLower.includes('defensive')) {
    return `<p>Reinforcing ${h}'s midfield creates numerical superiority in the central areas. This disrupts ${a}'s passing rhythm and provides more security in transitions.</p><p class="highlight-green">Fewer players in attack means ${h} must be more clinical when chances arrive.</p>`;
  }
  if (aLower.includes('gamble') || aLower.includes('all-out') || aLower.includes('all out') || aLower.includes('triple') || aLower.includes('desperate') || aLower.includes('everything')) {
    return `<p>${h} commit everything forward in a high-risk attacking gambit. Numbers are pushed into the final third, creating overloads in every channel.</p><p class="highlight-green">Maximum attacking threat but the defence is dangerously exposed — a single counter could decide the match.</p>`;
  }

  const az = computeAttackZones(scenario);
  const primaryLabel = az.leftPct >= az.centerPct && az.leftPct >= az.rightPct ? 'left' : az.centerPct >= az.leftPct && az.centerPct >= az.rightPct ? 'central' : 'right';
  return `<p>${h} adjust their tactical approach to exploit the ${primaryLabel} channel. The shift in structure changes pressing triggers and defensive responsibilities across the team.</p><p class="highlight-green">The next phase of play will reveal whether the adjustment overcomes ${a}'s defensive organisation.</p>`;
}

function populateConcept() {
  if (!currentScenario) return;
  const concept = _selectConcept(currentScenario);
  const nameEl = document.getElementById('concept-name');
  const defEl = document.getElementById('concept-def');
  const whyEl = document.getElementById('concept-why');

  if (nameEl) nameEl.textContent = concept.name;
  if (defEl) defEl.textContent = concept.def;
  if (whyEl) whyEl.textContent = 'Why it matters here: ' + concept.why;

  const diagramSvg = document.querySelector('.concept-diagram svg');
  if (diagramSvg) diagramSvg.innerHTML = getConceptDiagram(concept.name);
}

const CONCEPT_LIBRARY = {
  Overloads: {
    def: 'Creating numerical superiority in a specific area of the pitch — more attackers than defenders in one zone forces the opposition to make difficult decisions about who to mark.',
  },
  Compactness: {
    def: 'The distance between players in a defensive block. A compact shape shrinks the spaces between lines, making it harder for the opposition to play through.',
  },
  'Half-Spaces': {
    def: 'The vertical channels between the centre and the wing. Attacking through half-spaces creates better passing angles and forces defenders into no-man\'s land.',
  },
  'Pressing Trap': {
    def: 'Deliberately funnelling the opposition into a specific area where the trap is sprung — multiple defenders converge to win the ball back in dangerous territory.',
  },
  'Defensive Block': {
    def: 'A team\'s shape without the ball — the height and width of the block determines whether the team presses high, sits in a mid-block, or drops into a low block.',
  },
  Transition: {
    def: 'The moment when possession changes between teams. Quick transitions exploit defensive disorganisation before the opposition can reset their shape.',
  },
  'Rest Defence': {
    def: 'The players who stay behind when the team attacks — they protect against counter-attacks and provide defensive balance in attacking phases.',
  },
  'Counter-Pressing': {
    def: 'Immediate pressure applied within seconds of losing the ball — the goal is to win it back high up the pitch before the opposition can counter.',
  },
  'Weak-Side Switch': {
    def: 'Moving the ball quickly from one side of the pitch to the other — this forces the defence to shift laterally, creating gaps and isolating defenders in 1v1 situations.',
  },
};

function _selectConcept(scenario) {
  const h = scenario.home_team || 'Home';
  const a = scenario.away_team || 'Away';
  const hScore = scenario.scoreline?.home || 0;
  const aScore = scenario.scoreline?.away || 0;
  const trailing = hScore < aScore;
  const az = computeAttackZones(scenario);

  // Determine current overlay mode from the active button or pitch state
  let overlayMode = 'shape';
  const activeBtn = document.querySelector('.overlay-btn.active');
  if (activeBtn && activeBtn.dataset.overlay) {
    overlayMode = activeBtn.dataset.overlay;
  } else if (pitch && pitch.overlayMode) {
    overlayMode = pitch.overlayMode;
  }

  // Check if one attack channel dominates (overload indicator)
  const dominantPct = Math.max(az.leftPct, az.centerPct, az.rightPct);
  const dominantIsLeft = az.leftPct >= az.centerPct && az.leftPct >= az.rightPct;
  const dominantIsRight = az.rightPct >= az.leftPct && az.rightPct >= az.centerPct;
  const hasOverload = dominantPct >= 45;

  // Check scoreline urgency
  const needsGoal = trailing || hScore === aScore;

  // Select concept based on tactical state
  if (overlayMode === 'pressing') {
    return {
      name: 'Counter-Pressing',
      def: CONCEPT_LIBRARY['Counter-Pressing'].def,
      why: `${h} are applying immediate pressure after losing possession. Winning the ball high up forces ${a} into rushed decisions and creates chances from turnovers in dangerous areas.`,
    };
  }

  if (overlayMode === 'defensive') {
    return {
      name: 'Defensive Block',
      def: CONCEPT_LIBRARY['Defensive Block'].def,
      why: `${a} are defending in a compact block, reducing space between the lines. ${h} must find ways to penetrate without exposing themselves to counters.`,
    };
  }

  if (overlayMode === 'compactness') {
    return {
      name: 'Compactness',
      def: CONCEPT_LIBRARY['Compactness'].def,
      why: `${a} are keeping their defensive lines tight, forcing ${h} to play sideways or backwards. The trade-off is leaving space on the wings for switches of play.`,
    };
  }

  if (overlayMode === 'passing') {
    if (dominantIsLeft || dominantIsRight) {
      return {
        name: 'Half-Spaces',
        def: CONCEPT_LIBRARY['Half-Spaces'].def,
        why: `${h} are concentrating attacks through the ${dominantIsLeft ? 'left' : 'right'} channel, where half-space combinations can unlock ${a}'s defensive block.`,
      };
    }
    return {
      name: 'Weak-Side Switch',
      def: CONCEPT_LIBRARY['Weak-Side Switch'].def,
      why: `${h} are shifting the ball across the pitch to stretch ${a}'s defensive shape. Quick switches isolate defenders and create 1v1 opportunities on the weak side.`,
    };
  }

  if (overlayMode === 'pitch_control') {
    return {
      name: 'Rest Defence',
      def: CONCEPT_LIBRARY['Rest Defence'].def,
      why: `${h} commit numbers forward but must balance attacking threat with defensive security. Their rest defence structure determines how vulnerable they are to ${a}'s counters.`,
    };
  }

  // Default: attack overlay or shape mode
  if (hasOverload) {
    const chan = dominantIsLeft ? 'left' : dominantIsRight ? 'right' : 'central';
    return {
      name: 'Overloads',
      def: CONCEPT_LIBRARY['Overloads'].def,
      why: `${h} are concentrating ${dominantPct}% of their attacking play through the ${chan} channel. This overload draws defenders across, creating space for switches and second-phase attacks.`,
    };
  }

  if (needsGoal) {
    return {
      name: 'Transition',
      def: CONCEPT_LIBRARY['Transition'].def,
      why: `${h} need to score and must transition quickly when they win the ball. Catching ${a} out of shape in the moments after turnover is their best path to goal.`,
    };
  }

  // Fallback to half-spaces
  return {
    name: 'Half-Spaces',
    def: CONCEPT_LIBRARY['Half-Spaces'].def,
    why: `${h} should look to attack the half-spaces where ${a}'s defensive structure is weakest. These zones create better passing angles and force difficult decisions on defenders.`,
  };
}

function getConceptDiagram(name) {
  const diagrams = {
    'Overloads': `
      <circle cx="20" cy="20" r="5" fill="#3B82F6" opacity="0.6"/>
      <circle cx="30" cy="18" r="5" fill="#3B82F6" opacity="0.6"/>
      <circle cx="25" cy="28" r="5" fill="#3B82F6" opacity="0.6"/>
      <circle cx="40" cy="22" r="5" fill="#8BF55A" opacity="0.4"/>
      <circle cx="42" cy="32" r="5" fill="#8BF55A" opacity="0.4"/>
      <line x1="20" y1="20" x2="30" y2="18" stroke="#3B82F6" stroke-width="1"/>
      <line x1="30" y1="18" x2="25" y2="28" stroke="#3B82F6" stroke-width="1"/>
      <line x1="20" y1="20" x2="25" y2="28" stroke="#3B82F6" stroke-width="1"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">3v2 overload</text>`,
    'Compactness': `
      <circle cx="25" cy="20" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="25" cy="30" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="25" cy="40" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="35" cy="20" r="4" fill="#8BF55A" opacity="0.3"/>
      <circle cx="35" cy="30" r="4" fill="#8BF55A" opacity="0.3"/>
      <line x1="25" y1="20" x2="25" y2="30" stroke="#3B82F6" stroke-width="0.8"/>
      <line x1="25" y1="30" x2="25" y2="40" stroke="#3B82F6" stroke-width="0.8"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">tight block</text>`,
    'Transition': `
      <circle cx="15" cy="25" r="5" fill="#3B82F6" opacity="0.6"/>
      <circle cx="28" cy="25" r="4" fill="#8BF55A" opacity="0.3"/>
      <line x1="20" y1="25" x2="32" y2="25" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="2,1"/>
      <polygon points="30,22 36,25 30,28" fill="#F59E0B"/>
      <text x="25" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">→ transition</text>`,
    'Half-Spaces': `
      <rect x="10" y="10" width="40" height="30" fill="none" stroke="#334155" stroke-width="0.5"/>
      <line x1="23" y1="10" x2="23" y2="40" stroke="#334155" stroke-width="0.5" stroke-dasharray="1,1"/>
      <line x1="37" y1="10" x2="37" y2="40" stroke="#334155" stroke-width="0.5" stroke-dasharray="1,1"/>
      <rect x="23" y="10" width="14" height="30" fill="#8BF55A" opacity="0.1"/>
      <circle cx="20" cy="22" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="28" cy="30" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="36" cy="20" r="3" fill="#3B82F6" opacity="0.5"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">half-spaces</text>`,
    'Pressing Trap': `
      <path d="M10,15 L25,10 L40,15 L35,30 L15,30 Z" fill="#3B82F6" opacity="0.15"/>
      <circle cx="20" cy="20" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="30" cy="18" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="25" cy="28" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="40" cy="22" r="3" fill="#8BF55A" opacity="0.3"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">trap zone</text>`,
    'Defensive Block': `
      <rect x="15" y="12" width="30" height="25" fill="none" stroke="#3B82F6" stroke-width="0.5" rx="2"/>
      <circle cx="22" cy="18" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="30" cy="18" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="38" cy="18" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="26" cy="28" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="34" cy="28" r="3" fill="#3B82F6" opacity="0.5"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">low block</text>`,
    'Rest Defence': `
      <circle cx="22" cy="15" r="5" fill="#3B82F6" opacity="0.6"/>
      <circle cx="28" cy="28" r="8" fill="#3B82F6" opacity="0.15"/>
      <circle cx="38" cy="20" r="4" fill="#8BF55A" opacity="0.4"/>
      <line x1="22" y1="15" x2="38" y2="20" stroke="#F59E0B" stroke-width="0.8" stroke-dasharray="2,1"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">rest defence</text>`,
    'Counter-Pressing': `
      <circle cx="18" cy="18" r="4" fill="#3B82F6" opacity="0.6"/>
      <circle cx="30" cy="15" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="25" cy="28" r="4" fill="#3B82F6" opacity="0.6"/>
      <circle cx="40" cy="22" r="4" fill="#8BF55A" opacity="0.3"/>
      <line x1="18" y1="18" x2="40" y2="22" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="2,2"/>
      <line x1="30" y1="15" x2="40" y2="22" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="25" y1="28" x2="40" y2="22" stroke="#EF4444" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">counter-press</text>`,
    'Weak-Side Switch': `
      <line x1="8" y1="25" x2="52" y2="25" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,2"/>
      <polygon points="50,21 56,25 50,29" fill="#F59E0B"/>
      <circle cx="12" cy="25" r="5" fill="#3B82F6" opacity="0.5"/>
      <circle cx="18" cy="16" r="3" fill="#8BF55A" opacity="0.2"/>
      <circle cx="42" cy="18" r="3" fill="#8BF55A" opacity="0.2"/>
      <circle cx="48" cy="30" r="4" fill="#3B82F6" opacity="0.5"/>
      <line x1="12" y1="25" x2="48" y2="30" stroke="#F59E0B" stroke-width="1" stroke-dasharray="2,1"/>
      <text x="30" y="48" fill="#94A3B8" font-size="5" text-anchor="middle">switch play</text>`,
  };
  return diagrams[name] || diagrams['Overloads'];
}

function openConceptLibrary() {
  const name = document.getElementById('concept-name')?.textContent || 'tactical concepts';
  const team = currentScenario?.home_team || '';
  const q = encodeURIComponent(`football tactics ${name} ${team} explained`);
  window.open(`https://www.google.com/search?q=${q}`, '_blank');
}

// ===== VIEW TOGGLE with cinematic transition =====
function setView(view) {
  if (view === currentView) return;
  currentView = view;
  document.getElementById('view-2d')?.classList.toggle('active', view === '2d');
  document.getElementById('view-3d')?.classList.toggle('active', view === '3d');

  const modeBtns = document.querySelector('.mode-toggles');
  const overlayBtns = document.querySelector('.overlay-toggles');
  const camBtns = document.getElementById('cam-toggles');

  const pitchControlBtn = document.querySelector('.overlay-btn[data-overlay="pitch_control"]');

  if (view === '2d') {
    if (modeBtns) modeBtns.style.display = 'flex';
    if (overlayBtns) overlayBtns.style.display = 'flex';
    if (pitchControlBtn) pitchControlBtn.style.display = '';
    if (camBtns) camBtns.classList.add('hidden');
    if (pitch3d && pitch3d.destroy) pitch3d.destroy();
    pitch3d = null;
    init2DPitch();
    return;
  }

  if (modeBtns) modeBtns.style.display = 'none';
  if (overlayBtns) overlayBtns.style.display = 'flex';
  if (pitchControlBtn) pitchControlBtn.style.display = 'none';
  if (camBtns) camBtns.classList.remove('hidden');

  // --- Cinematic transition: 2D → 3D ---
  const pitchWrap = document.querySelector('.pitch-wrap');
  const container = document.getElementById('pitch-container');

  // Capture the 2D canvas as a screenshot
  let screenshotData = null;
  const canvas = container.querySelector('canvas');
  if (canvas) {
    try {
      screenshotData = canvas.toDataURL('image/png');
    } catch (e) { /* ignore */ }
  }

  // Create transition overlay
  const overlay = document.createElement('div');
  overlay.className = 'pitch-transition-overlay';
  if (screenshotData) {
    overlay.style.backgroundImage = `url(${screenshotData})`;
    overlay.style.backgroundSize = 'cover';
    overlay.style.backgroundPosition = 'center';
  }
  pitchWrap.appendChild(overlay);

  // Destroy 2D pitch
  if (pitch && pitch.destroy) pitch.destroy();
  pitch = null;

  // Initialize 3D pitch behind the overlay
  init3DPitch();

  // Start transition animation
  requestAnimationFrame(() => {
    overlay.classList.add('active');
    // After animation completes, remove overlay
    setTimeout(() => {
      overlay.remove();
    }, 1000);
  });
}

function init3DPitch() {
  try {
    if (typeof Pitch3D === 'undefined') {
      document.getElementById('view-2d')?.click();
      return;
    }
    pitch3d = new Pitch3D('pitch-container', currentScenario);
    pitch3d.load(currentScenario.home_players || [], currentScenario.away_players || []);
    pitch3d.onPlayerHover = (player, sx, sy) => showTooltip(player, sx, sy);
    pitch3d.onPlayerLeave = () => hideTooltip();
    if (currentScenario) pitch3d.setMatchContext(currentScenario);

    const activeCam = document.querySelector('.cam-btn.active');
    if (activeCam && activeCam.dataset.cam) {
      pitch3d.setCameraMode(activeCam.dataset.cam, true);
    }

    const activeOverlay = document.querySelector('.overlay-btn.active');
    if (activeOverlay && activeOverlay.dataset.overlay) {
      pitch3d.setOverlay(activeOverlay.dataset.overlay);
    }
  } catch (e) {
    document.getElementById('view-2d')?.click();
  }
}

function setCameraMode(mode) {
  if (pitch3d && pitch3d.setCameraMode) {
    pitch3d.setCameraMode(mode);
  }
  document.querySelectorAll('.cam-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cam === mode);
  });
}

function init2DPitch() {
  pitch = new Pitch2D('pitch-container', currentScenario);
  pitch.load(currentScenario.home_players || [], currentScenario.away_players || []);
  pitch.onPlayerHover = (player, sx, sy, pressCtx) => {
    if (pressCtx && pressCtx.isActive) {
      showTooltip(player, sx, sy, {
        sub: 'Pressure: ' + pressCtx.pressure + '% | ' + (pressCtx.pressure > 70 ? 'Intense' : pressCtx.pressure > 40 ? 'Active' : 'Light'),
      });
    } else {
      showTooltip(player, sx, sy);
    }
  };
  pitch.onPlayerLeave = () => hideTooltip();
  pitch.onPassingHover = (edge, sx, sy) => {
    const tooltip = document.getElementById('player-tooltip');
    if (!edge || !tooltip) { hideTooltip(); return; }
    const recv = edge.receiver;
    tooltip.innerHTML = `
      <div class="tooltip-name">Pass to ${recv.name || '#' + recv.number}</div>
      <div class="tooltip-detail">${edge.category} · ${edge.dist}px · ${edge.completionPct}% completion</div>
      <div style="font-size:9px;color:#64748B;margin-top:2px">${edge.blocked ? '⚠ Blocked by defender' : edge.pressure === 'High' ? '⚠ High pressure' : edge.pressure === 'Medium' ? '◷ Medium pressure' : '✓ Open lane'}</div>
    `;
    tooltip.classList.remove('hidden');
    const rect = document.getElementById('pitch-container')?.getBoundingClientRect();
    if (rect) {
      let left = sx + 14, top = sy - 8;
      if (left + 180 > window.innerWidth) left = sx - 180;
      if (top + 90 > window.innerHeight) top = window.innerHeight - 100;
      if (top < 10) top = 10;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }
  };
  const activeOverlay = document.querySelector('.overlay-btn.active');
  if (activeOverlay && pitch.setOverlay) {
    pitch.setOverlay(activeOverlay.dataset.overlay);
  }
}

// ===== DYNAMIC OPTIONS FROM SCENARIO DATA =====
function showDecision() {
  const loading = document.getElementById('pitch-loading');
  if (loading) loading.classList.add('hidden');

  const section = document.getElementById('choice-section');
  const cards = document.getElementById('choice-cards');
  if (!section || !cards) return;

  const options = currentScenario.options || [];
  if (!options.length) return;

  section.classList.remove('hidden');

  cards.innerHTML = options.map(opt => {
    const mapped = mapOption(opt);
    const label = opt.label;
    const action = opt.action || '';
    return `
      <div class="option-card" data-label="${label}" data-action="${action.replace(/"/g, '&quot;')}"
           onclick="selectOption('${label}')"
           onmouseenter="previewOption('${action.replace(/'/g, "\\'")}')"
           onmouseleave="clearOptionPreview()">
        <div class="option-badge">${label}</div>
        <div class="option-title">${mapped.title}</div>
        <div class="option-details">
          <div>
            <div class="option-benefit-label">Potential Benefit</div>
            <div class="option-benefit">${mapped.benefit}</div>
          </div>
          <div class="option-risk-row">
            <span class="option-risk-dot ${mapped.riskClass === 'option-risk-low' ? 'success' : mapped.riskClass === 'option-risk-medium' ? 'warning' : 'danger'}"></span>
            <div>
              <div class="option-risk-label">Main Risk</div>
              <div class="option-risk ${mapped.riskClass}">${mapped.risk}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  startTimer();
}

function previewOption(action) {
  if (currentView !== '2d' || !pitch || !pitch.setPreviewAction) return;
  pitch.setPreviewAction(action);

  // Temporarily update AI insight to describe the action's tactical impact
  const el = document.getElementById('ai-insight');
  if (el && _storedAIInsightHTML) {
    // Store stored HTML if not already stored
    el.dataset.restoreHTML = _storedAIInsightHTML;
    el.innerHTML = _getActionPreviewText(action, currentScenario);
  }

  // Highlight zones based on action
  const actionLower = action.toLowerCase();
  if (actionLower.includes('wing') || actionLower.includes('wide') || actionLower.includes('cross')) {
    pitch.setHighlightedZones([
      { x: 0, y: 0, w: 0.18, h: 1, label: 'Left flank' },
      { x: 0.82, y: 0, w: 0.18, h: 1, label: 'Right flank' }
    ]);
  } else if (actionLower.includes('defend') || actionLower.includes('drop') || actionLower.includes('deep')) {
    pitch.setHighlightedZones([
      { x: 0.6, y: 0, w: 0.4, h: 1, label: 'Deep block' }
    ]);
  } else {
    pitch.setHighlightedZones([]);
  }

  const label = document.querySelector('.preview-label');
  if (label) label.classList.add('show');
}

function clearOptionPreview() {
  if (currentView !== '2d' || !pitch || !pitch.clearPreview) return;
  pitch.clearPreview();
  pitch.clearHighlightedZones();

  // Restore the original AI insight
  const el = document.getElementById('ai-insight');
  if (el && el.dataset.restoreHTML) {
    el.innerHTML = el.dataset.restoreHTML;
    delete el.dataset.restoreHTML;
  }

  // Restore the pitch overlay to match the original AI insight
  if (_storedAIInsightHTML) {
    _syncPitchToConcepts(_storedAIInsightHTML, currentScenario);
  }

  const label = document.querySelector('.preview-label');
  if (label) label.classList.remove('show');
}

function mapOption(opt) {
  const a = opt.action.toLowerCase();

  if (a.includes('press') || a.includes('high line') || a.includes('urgent')) {
    return { title: 'Increase Pressing', benefit: 'Force turnovers higher up the pitch', risk: 'Leaves space behind the defence', riskClass: 'option-risk-medium' };
  }
  if ((a.includes('striker') || a.includes('forward')) && (a.includes('second') || a.includes('extra') || a.includes('another'))) {
    return { title: 'Add Second Striker', benefit: 'More bodies in the box', risk: 'Less midfield control', riskClass: '' };
  }
  if (a.includes('shape') || a.includes('back 3') || a.includes('back three') || a.includes('back 5') || a.includes('back five') || a.includes('formation') || a.includes('switch')) {
    return { title: 'Change Shape', benefit: 'Better structural balance', risk: 'Can take time to settle', riskClass: 'option-risk-medium' };
  }
  if (a.includes('hold') || a.includes('trust') || a.includes('patient') || a.includes('wait') || a.includes('system')) {
    return { title: 'Stay Patient', benefit: 'Maintain defensive stability', risk: 'Running out of time', riskClass: 'option-risk-medium' };
  }
  if (a.includes('sub') || a.includes('fresh') || a.includes('double sub') || a.includes('inject') || a.includes('legs')) {
    return { title: 'Make Substitutions', benefit: 'Fresh legs and energy', risk: 'Disrupts team rhythm', riskClass: '' };
  }
  if (a.includes('gamble') || a.includes('all-out') || a.includes('all out') || a.includes('triple') || a.includes('desperate') || a.includes('everything')) {
    return { title: 'Go All Out', benefit: 'Maximum attacking threat', risk: 'Leaves defence dangerously exposed', riskClass: '' };
  }
  if (a.includes('midfield') || a.includes('pivot') || a.includes('dm') || a.includes('defensive')) {
    return { title: 'Reinforce Midfield', benefit: 'Better control in central areas', risk: 'Fewer players in attack', riskClass: 'option-risk-medium' };
  }
  if (a.includes('wing') || a.includes('wider') || a.includes('cross') || a.includes('wide')) {
    return { title: 'Attack Through Wings', benefit: 'Stretch the defence wide', risk: 'Crosses may not find targets', riskClass: '' };
  }
  if (a.includes('drop') || a.includes('deep') || a.includes('defend')) {
    return { title: 'Drop Defensive Line', benefit: 'Less space in behind', risk: 'Invites more pressure', riskClass: 'option-risk-low' };
  }

  const fallback = opt.action.split('—')[0]?.trim() || opt.action;
  return {
    title: fallback.length > 30 ? fallback.substring(0, 30) + '…' : fallback,
    benefit: 'Tactical adjustment to change the match',
    risk: opt.risk || 'Medium',
    riskClass: opt.risk === 'Low' ? 'option-risk-low' : opt.risk === 'High' || opt.risk === 'Very High' ? '' : 'option-risk-medium'
  };
}

function startTimer() {
  const timerEl = document.getElementById('choice-timer');
  if (!timerEl) return;
  let secondsLeft = TIMER_SECONDS;
  timerEl.textContent = formatTime(secondsLeft);
  timerEl.className = 'choice-timer';

  const end = Date.now() + secondsLeft * 1000;
  timerId = setInterval(() => {
    const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
    timerEl.textContent = formatTime(left);
    timerEl.className = 'choice-timer';
    if (left <= 10) timerEl.classList.add('warning');
    else if (left <= 20) timerEl.style.color = '#F59E0B';
    else timerEl.style.color = '';

    if (left <= 0) {
      clearInterval(timerId);
      timerId = null;
      const opts = currentScenario.options || [];
      if (opts.length && !decisionMade) {
        const rand = opts[Math.floor(Math.random() * opts.length)];
        selectOption(rand.label);
      }
    }
  }, 200);
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m + ':' + String(sec).padStart(2, '0');
}

// ===== USER SELECTS OPTION → CALL REAL API =====
async function selectOption(label) {
  if (decisionMade) return;
  decisionMade = true;
  if (timerId) { clearInterval(timerId); timerId = null; }

  clearOptionPreview();

  const chosenOpt = (currentScenario.options || []).find(o => o.label === label);
  const action = chosenOpt ? chosenOpt.action : '';

  if (currentView === '2d' && pitch && pitch.animateSelection) {
    pitch.animateSelection(action);
  }

  const cards = document.querySelectorAll('.option-card');
  cards.forEach(el => {
    if (el.dataset.label === label) el.classList.add('selected', 'locked');
    else el.classList.add('locked');
  });

  allDecisions[currentScenario.id] = label;
  localStorage.setItem('dugout_decisions', JSON.stringify(allDecisions));

  await new Promise(r => setTimeout(r, 600));

  const choiceSection = document.getElementById('choice-section');
  if (choiceSection) choiceSection.classList.add('hidden');

  await showResult(label);
  loadAIInsight(_selectedLang);
}

async function showResult(choice) {
  const resultSection = document.getElementById('result-section');
  if (!resultSection) return;
  resultSection.classList.remove('hidden');

  const scenario = currentScenario;
  const home = scenario.home_team || 'Home';
  const away = scenario.away_team || 'Away';
  const score = scenario.scoreline || { home: 0, away: 0 };

  // ── Final Result ──
  document.getElementById('result-home-team').textContent = home.toUpperCase();
  document.getElementById('result-away-team').textContent = away.toUpperCase();
  document.getElementById('result-score').textContent = `${score.home}–${score.away}`;
  document.getElementById('result-match-minute').textContent = (getMatchMinute(scenario) || '?') + "'";

  // Goal scorers
  const goalEvents = (scenario.replay_events || []).filter(e => e.type === 'goal');
  const scorersEl = document.getElementById('result-scorers');
  if (goalEvents.length > 0) {
    scorersEl.innerHTML = goalEvents.map(e => {
      const isHome = (e.description || '').toLowerCase().includes(home.toLowerCase());
      return `<span class="result-scorer ${isHome ? 'home' : 'away'}">${e.player || '?'} ${e.minute || '?'}'</span>`;
    }).join(' · ');
  } else {
    scorersEl.textContent = 'No goals scored.';
  }

  // ── Get real decision data ──
  const real = scenario.real_decision || {};
  const realOption = real.option || '';
  const realOptData = (scenario.options || []).find(o => o.label === realOption);
  const realMapped = realOptData ? mapOption(realOptData) : null;
  const managerChoice = realMapped?.title || (realOption ? `Option ${realOption}` : '—');

  // ── User's choice ──
  const chosenOpt = (scenario.options || []).find(o => o.label === choice);
  const chosenMapped = chosenOpt ? mapOption(chosenOpt) : null;
  document.getElementById('result-your-choice').textContent = chosenMapped?.title || (choice ? `Option ${choice}` : '—');
  document.getElementById('result-your-effect').textContent = chosenMapped?.benefit || '—';

  // ── Manager choice ──
  document.getElementById('result-manager-choice').textContent = managerChoice;
  document.getElementById('result-manager-objective').textContent = realMapped?.benefit || real.description || '—';

  // ── Tactical Comparison ──
  const compEl = document.getElementById('result-comparison');
  compEl.textContent = 'Analysing…';

  // ── Key Takeaway ──
  const takeawayEl = document.getElementById('result-takeaway');
  takeawayEl.textContent = 'Analysing…';

  // Fetch explanation from API
  try {
    const data = await fetchExplanation(scenario.id, choice, _selectedLang);
    const explanation = data.explanation || '';
    const cleaned = explanation.replace(/\*\*(.*?)\*\*/g, '$1');

    // Comparison — use the first meaningful paragraph
    const parts = cleaned.split(/(?<=\.)\s+/).filter(p => p.trim());
    if (parts.length > 0) {
      if (parts.length >= 2) {
        compEl.textContent = parts[1];
      } else {
        compEl.textContent = parts[0];
      }
    }

    // Generate comparison: explain differences without saying "wrong"
    const diffHome = home.toLowerCase();
    const diffAway = away.toLowerCase();
    const myTitle = (chosenMapped?.title || '').toLowerCase();
    const mgrTitle = (realMapped?.title || '').toLowerCase();
    if (myTitle && mgrTitle && myTitle !== mgrTitle) {
      compEl.textContent = `${home} chose ${mgrTitle} while you considered ${myTitle}. ${mgrTitle} prioritised ${realMapped?.benefit || 'defensive structure'}, whereas your approach focused on ${chosenMapped?.benefit || 'attacking pressure'}. Both approaches have merit — the manager's choice reflected the match context at that moment.`;
    }

    // Key takeaway from last part of explanation
    takeawayEl.textContent = parts.length > 2 ? parts[parts.length - 1] : cleaned.substring(0, 200);

    // Sync pitch
    _storedAIInsightHTML = `<p>${cleaned.substring(0, 300)}</p>`;
    _syncPitchToConcepts(_storedAIInsightHTML, scenario);
  } catch (e) {
    const pregen = scenario.pre_generated_explanations || {};
    const fallback = pregen[realOption] || '';
    compEl.textContent = real.description || 'The coaching staff made a tactical decision based on the match situation.';
    takeawayEl.textContent = 'Every tactical decision involves trade-offs. The key is understanding which trade-offs match your team\'s strengths and the match context.';

    // Generate comparison from fallback data
    const myTitle = (chosenMapped?.title || '').toLowerCase();
    const mgrTitle = (realMapped?.title || '').toLowerCase();
    if (myTitle && mgrTitle && myTitle !== mgrTitle) {
      compEl.textContent = `${home} chose ${mgrTitle} while you considered ${myTitle}. ${mgrTitle} prioritised ${realMapped?.benefit || 'defensive structure'}, whereas your approach focused on ${chosenMapped?.benefit || 'attacking pressure'}. Both approaches have merit.`;
    }

    _storedAIInsightHTML = `<p>${fallback || compEl.textContent}</p>`;
    _syncPitchToConcepts(_storedAIInsightHTML, scenario);
  }

  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Fire 3D replay in parallel
  if (currentView === '3d' && pitch3d && pitch3d.playReplayEvents) {
    pitch3d.playReplayEvents(scenario.replay_events || [], scenario);
  }
}

// ===== NAVIGATION =====
function closeResult() {
  document.getElementById('result-section')?.classList.add('hidden');
  document.getElementById('choice-section')?.classList.remove('hidden');
}

function nextScenario() {
  listScenarios().then(scenarios => {
    const sorted = [...scenarios].sort((a, b) => ((a.meta?.order) || 99) - ((b.meta?.order) || 99));
    const idx = sorted.findIndex(s => s.id === currentScenario.id);
    if (idx >= 0 && idx < sorted.length - 1) {
      window.location.href = `/static/game.html?scenario=${sorted[idx + 1].id}`;
    } else {
      window.location.href = '/static/index.html';
    }
  }).catch(() => {
    window.location.href = '/static/index.html';
  });
}

// ===== PLAYER TOOLTIP =====
function showTooltip(player, sx, sy, extra) {
  const tooltip = document.getElementById('player-tooltip');
  if (!tooltip) return;
  const fatigue = player.fatigue ?? 50;
  const fColor = fatigue < 40 ? '#22C55E' : fatigue < 65 ? '#F59E0B' : '#EF4444';

  const extraHtml = extra && extra.sub ? `<div style="font-size:9px;color:#FBBF24;margin-top:3px">${extra.sub}</div>` : '';

  tooltip.innerHTML = `
    <div class="tooltip-name">${player.name}</div>
    <div class="tooltip-detail">${player.pos} · #${player.number}</div>
    <div class="tooltip-fatigue">
      <span style="font-size:9px;color:#64748B;font-weight:600">Fatigue</span>
      <div class="tooltip-fatigue-bar">
        <div class="tooltip-fatigue-fill" style="width:${fatigue}%;background:${fColor}"></div>
      </div>
      <span style="font-size:10px;font-weight:700;color:${fColor}">${fatigue}%</span>
    </div>
    ${extraHtml}
  `;

  const rect = document.getElementById('pitch-container')?.getBoundingClientRect();
  if (!rect) return;
  let left = sx + 14;
  let top = sy - 8;
  if (left + 180 > window.innerWidth) left = sx - 180;
  if (top + 90 > window.innerHeight) top = window.innerHeight - 100;
  if (top < 10) top = 10;

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
  tooltip.classList.remove('hidden');
}

function hideTooltip() {
  const tooltip = document.getElementById('player-tooltip');
  if (tooltip) tooltip.classList.add('hidden');
}

// ===== PITCH HOOKS =====
const origSetup = Pitch3D.prototype._setupScene;
Pitch3D.prototype._setupScene = function() {
  origSetup.call(this);
  const origMouseMove = this._onMouseMove;
  this._onMouseMove = function(e) {
    origMouseMove.call(this, e);
    if (this.hovered && this.onPlayerHover) {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.onPlayerHover(this.hovered.data, e.clientX, e.clientY);
    } else if (this.onPlayerLeave) {
      this.onPlayerLeave();
    }
  };
};

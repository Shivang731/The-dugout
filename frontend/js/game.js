let currentScenario = null;
let pitch = null;
let pitch3d = null;
let timerId = null;
let decisionMade = false;
let currentView = '2d';
const TIMER_SECONDS = 60;
const allDecisions = JSON.parse(localStorage.getItem('dugout_decisions') || '{}');

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

const COACH_TIPS = [
  'There is no perfect choice in football. Every decision has trade-offs.',
  'The best managers adapt their strategy to the match, not the other way around.',
  'Pressing higher creates chances but leaves space — know when to commit.',
  'Formation is just the starting point. Movement and positioning define the system.',
  'A substitution changes more than one position — it shifts the whole team dynamic.',
  'Half-spaces are where matches are won. Control those zones, control the game.',
  'Defensive shape without organisation is just running. Structure wins titles.',
  'Transitions decide top-level games — the moment the ball changes hands is everything.',
];

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

  populateScoreboard(meta, score);
  populateFormationLabels();
  populateStory();
  populateTacticalStory();
  populateAttackZones();
  populateConcept();
  loadAIInsight();

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
  const events = currentScenario.replay_events || [];
  const home = currentScenario.home_team || 'Home';
  const away = currentScenario.away_team || 'Away';
  let homeEv = 0, awayEv = 0;
  events.forEach(e => {
    const d = (e.description || '').toLowerCase();
    if (d.includes(home.toLowerCase()) || (d.includes('scores') && !d.includes(away.toLowerCase()))) homeEv++;
    else awayEv++;
  });
  const hScore = currentScenario.scoreline?.home || 0;
  const aScore = currentScenario.scoreline?.away || 0;
  const scoreFactor = (hScore + aScore) > 0 ? Math.max(hScore, aScore) / (hScore + aScore) : 0.5;
  const evFactor = (homeEv + awayEv) > 0 ? homeEv / (homeEv + awayEv) : 0.5;
  const pct = Math.round((scoreFactor * 0.6 + evFactor * 0.4) * 100);
  const homePct = Math.min(85, Math.max(15, pct));
  const awayPct = 100 - homePct;

  document.getElementById('mom-home-name').textContent = home.toUpperCase();
  document.getElementById('mom-away-name').textContent = away.toUpperCase();
  document.getElementById('mom-home-fill').style.width = homePct + '%';
  document.getElementById('mom-away-fill').style.width = awayPct + '%';
  document.getElementById('mom-home-pct').textContent = homePct + '%';
  document.getElementById('mom-away-pct').textContent = awayPct + '%';
}

function renderEvents() {
  const el = document.getElementById('events-timeline');
  if (!el) return;
  const events = currentScenario.replay_events || [];
  if (!events.length) { el.innerHTML = ''; return; }

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
    const icon = iconMap[e.type] || '●';
    const cls = e.type === 'goal' ? 'goal' : e.type === 'yellow_card' ? 'yellow_card' : e.type === 'substitution' ? 'substitution' : '';
    const desc = (e.description || '').substring(0, 25);
    return `
      <div class="event-pin ${cls}" title="${e.description || ''}">
        <span class="event-minute">${e.minute || '?'}'</span>
        <span class="event-icon">${icon}</span>
        <span class="event-desc">${desc}</span>
      </div>
      ${i < events.length - 1 ? '<span class="timeline-line"></span>' : ''}
    `;
  }).join('');
}

// ===== OVERLAY CONTROL =====
function setOverlay(mode) {
  if (pitch && pitch.setOverlay) {
    pitch.setOverlay(mode);
  }
  document.querySelectorAll('.overlay-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.overlay === mode);
  });
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

  const tipTextEl = document.querySelector('.tip-text');
  if (tipTextEl) {
    const tipIdx = Math.floor(Math.random() * COACH_TIPS.length);
    tipTextEl.textContent = COACH_TIPS[tipIdx];
  }
}

function loadAIInsight() {
  const el = document.getElementById('ai-insight');
  if (!el) return;

  el.innerHTML = '<div class="spinner"></div>';

  fetchMatchInsight(currentScenario.id).then(data => {
    el.innerHTML = '';
    const insight = data.insight || '';
    const parts = insight.split(/(?<=\.)\s+/);
    parts.forEach((p, i) => {
      if (!p.trim()) return;
      const isLast = i === parts.length - 1;
      const cls = isLast ? 'highlight-green' : '';
      el.innerHTML += `<p class="${cls}">${p}</p>`;
    });
  }).catch(() => {
    const h = currentScenario.home_team;
    const a = currentScenario.away_team;
    const hf = currentScenario.home_formation || '4-3-3';
    const af = currentScenario.away_formation || '5-3-2';
    el.innerHTML = `
      <p>${h} are organised in a ${hf} while ${a} defend in a ${af}.</p>
      <p class="highlight-green">Creating overloads in the final third will be key to breaking down the defensive block.</p>
    `;
  });
}

function populateTacticalStory() {
  const el = document.getElementById('tl-minute');
  const tlText = document.getElementById('tl-text');
  const tlDesc = document.getElementById('tl-description');
  if (!el || !tlText || !tlDesc) return;

  el.textContent = getMatchMinute(currentScenario) + "'";

  const h = currentScenario.home_team;
  const a = currentScenario.away_team;
  const hScore = currentScenario.scoreline?.home ?? 0;
  const aScore = currentScenario.scoreline?.away ?? 0;

  const events = currentScenario.replay_events || [];
  const relevant = events.filter(e => {
    const min = e.minute || 0;
    return min >= 45 && min <= 75;
  });

  if (hScore < aScore) {
    const needed = aScore - hScore;
    tlText.textContent = `${h} need ${needed} goal${needed > 1 ? 's' : ''}`;
  } else if (hScore > aScore) {
    const needed = hScore - aScore;
    tlText.textContent = `${a} need ${needed} goal${needed > 1 ? 's' : ''}`;
  } else {
    tlText.textContent = `Scores level — both teams need a breakthrough`;
  }

  if (relevant.length > 0) {
    const latest = relevant[relevant.length - 1];
    tlDesc.textContent = `${latest.description} — the game is at a critical point.`;
  } else {
    const hf = currentScenario.home_formation || '4-3-3';
    const af = currentScenario.away_formation || '5-3-2';
    tlDesc.textContent = `${h} push forward in their ${hf}. ${a} stay compact in a ${af}. The next decision changes momentum.`;
  }
}

function populateAttackZones() {
  const el = document.querySelector('.attack-zones-visual');
  if (!el) return;

  const homePlayers = currentScenario.home_players || [];
  const awayPlayers = currentScenario.away_players || [];
  const allPlayers = [...homePlayers.map(p => ({ ...p, team: 'home' })), ...awayPlayers.map(p => ({ ...p, team: 'away' }))];

  const fieldThird = (x) => {
    if (x < 0.33) return 'left';
    if (x < 0.66) return 'center';
    return 'right';
  };

  const zones = { left: 0, center: 0, right: 0 };
  allPlayers.forEach(p => {
    const z = fieldThird(p.x);
    zones[z]++;
  });
  const total = allPlayers.length || 1;

  const leftPct = Math.round((zones.left / total) * 100);
  const centerPct = Math.round((zones.center / total) * 100);
  const rightPct = 100 - leftPct - centerPct;

  const miniPitch = el.querySelector('.mini-pitch');
  const zoneStats = el.querySelector('.zone-stats');
  if (miniPitch) {
    miniPitch.innerHTML = `
      <div class="zone-bar left" style="height:${leftPct}%"></div>
      <div class="zone-bar center" style="height:${centerPct}%"></div>
      <div class="zone-bar right" style="height:${rightPct}%"></div>
      <span class="zone-arrow">→</span>
    `;
  }
  if (zoneStats) {
    zoneStats.innerHTML = `
      <div class="zone-stat"><span class="zone-dot l"></span> Left <span class="zone-pct">${leftPct}%</span></div>
      <div class="zone-stat"><span class="zone-dot c"></span> Central <span class="zone-pct">${centerPct}%</span></div>
      <div class="zone-stat"><span class="zone-dot r"></span> Right <span class="zone-pct">${rightPct}%</span></div>
    `;
  }
}

function populateConcept() {
  const h = currentScenario.home_team || '';
  const a = currentScenario.away_team || '';

  const concepts = [
    {
      name: 'Overloads',
      def: 'Creating numerical superiority in a specific area of the pitch to generate better passing options.',
      why: `${h} need to create overloads near the penalty area to break through ${a}'s defensive block.`
    },
    {
      name: 'Compactness',
      def: 'The distance between players in a defensive block — a compact shape limits space for the opposition.',
      why: `${a} are maintaining a compact shape, forcing ${h} to play sideways rather than forward.`
    },
    {
      name: 'Transition',
      def: 'The moment when possession changes — quick transitions exploit defensive disorganisation.',
      why: `${h} need faster transitions to catch ${a} out of shape before they can reorganise.`
    },
    {
      name: 'Half-Spaces',
      def: 'The areas between fullbacks and centre-backs — dangerous attacking zones where chances are created.',
      why: `${h} should look to attack the half-spaces where ${a}'s wing-backs leave gaps.`
    },
    {
      name: 'Pressing Trap',
      def: 'Deliberately funnelling play into an area where the press is triggered to win the ball back.',
      why: `${h} could set a pressing trap in midfield to force turnovers in dangerous areas.`
    },
    {
      name: 'Defensive Block',
      def: 'A team\'s shape without the ball — mid-block, low-block, or high press with different risk profiles.',
      why: `${a} are defending in a low block, inviting pressure but protecting the penalty area.`
    },
    {
      name: 'Rest Defence',
      def: 'The players who stay behind to protect against counter-attacks when the team is attacking.',
      why: `${h} must be careful with their rest defence — committing too many forward leaves them exposed to ${a}'s counters.`
    },
  ];

  const concept = concepts[Math.floor(Math.random() * concepts.length)];
  const nameEl = document.getElementById('concept-name');
  const defEl = document.getElementById('concept-def');
  const whyEl = document.getElementById('concept-why');

  if (nameEl) nameEl.textContent = concept.name;
  if (defEl) defEl.textContent = concept.def;
  if (whyEl) whyEl.textContent = 'Why it matters here: ' + concept.why;

  const diagramSvg = document.querySelector('.concept-diagram svg');
  if (diagramSvg) diagramSvg.innerHTML = getConceptDiagram(concept.name);
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

  if (view === '2d') {
    if (modeBtns) modeBtns.style.display = 'flex';
    if (overlayBtns) overlayBtns.style.display = 'flex';
    if (camBtns) camBtns.classList.add('hidden');
    if (pitch3d && pitch3d.destroy) pitch3d.destroy();
    pitch3d = null;
    init2DPitch();
    return;
  }

  if (modeBtns) modeBtns.style.display = 'none';
  if (overlayBtns) overlayBtns.style.display = 'none';
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
  pitch.onPlayerHover = (player, sx, sy) => showTooltip(player, sx, sy);
  pitch.onPlayerLeave = () => hideTooltip();
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
        <div class="option-badge">OPTION ${label}</div>
        <div class="option-title">${mapped.title}</div>
        <div>
          <div class="option-benefit-label">Potential Benefit</div>
          <div class="option-benefit">${mapped.benefit}</div>
        </div>
        <div>
          <div class="option-risk-label">Main Risk</div>
          <div class="option-risk ${mapped.riskClass}">${mapped.risk}</div>
        </div>
      </div>
    `;
  }).join('');

  startTimer();
}

function previewOption(action) {
  if (currentView !== '2d' || !pitch || !pitch.setPreviewAction) return;
  pitch.setPreviewAction(action);
  const label = document.querySelector('.preview-label');
  if (label) label.classList.add('show');
}

function clearOptionPreview() {
  if (currentView !== '2d' || !pitch || !pitch.clearPreview) return;
  pitch.clearPreview();
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
}

async function showResult(choice) {
  const resultSection = document.getElementById('result-section');
  if (!resultSection) return;
  resultSection.classList.remove('hidden');

  const choiceEl = document.getElementById('result-choice');
  const whyText = document.getElementById('result-why-text');
  const outcomeText = document.getElementById('result-outcome-text');

  // Get real data from scenario
  const real = currentScenario.real_decision || {};
  const realOption = real.option || '?';
  const realOptData = (currentScenario.options || []).find(o => o.label === realOption);
  const mapped = realOptData ? mapOption(realOptData) : null;
  const realManagerChoice = mapped?.title || `Option ${realOption}`;

  choiceEl.textContent = realManagerChoice;
  outcomeText.textContent = real.description || 'No data available.';

  // Call Granite via API for explanation
  whyText.textContent = 'Analysing with tactical AI…';

  try {
    const data = await fetchExplanation(currentScenario.id, choice, 'en');
    const explanation = data.explanation || '';
    const cleaned = explanation.replace(/\*\*(.*?)\*\*/g, '$1');

    whyText.textContent = cleaned.substring(0, 500);
  } catch (e) {
    const pregen = currentScenario.pre_generated_explanations || {};
    const fallback = pregen[realOption] || '';
    whyText.textContent = fallback || `The coaching staff made a tactical decision based on the match situation.`;
  }

  // Add the user's choice for comparison
  const chosenOpt = (currentScenario.options || []).find(o => o.label === choice);
  const chosenMapped = chosenOpt ? mapOption(chosenOpt) : null;

  const userChoiceHtml = document.createElement('div');
  userChoiceHtml.className = 'result-row';
  userChoiceHtml.innerHTML = `
    <span class="result-label">Your Choice</span>
    <span class="result-value" style="color:var(--text-secondary);font-size:13px;">${chosenMapped?.title || choice}</span>
  `;

  const whyRow = whyText.parentElement;
  if (whyRow) {
    whyRow.parentElement.insertBefore(userChoiceHtml, whyRow);
  }

  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
function showTooltip(player, sx, sy) {
  const tooltip = document.getElementById('player-tooltip');
  if (!tooltip) return;
  const fatigue = player.fatigue ?? 50;
  const fColor = fatigue < 40 ? '#22C55E' : fatigue < 65 ? '#F59E0B' : '#EF4444';

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

const FORMATION_POSITIONS = {
  '4-3-3': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'LB', x: 0.20, y: 0.12 },
    { role: 'CB', x: 0.15, y: 0.38 },
    { role: 'CB', x: 0.15, y: 0.62 },
    { role: 'RB', x: 0.20, y: 0.88 },
    { role: 'CM', x: 0.35, y: 0.28 },
    { role: 'CM', x: 0.35, y: 0.50 },
    { role: 'CM', x: 0.35, y: 0.72 },
    { role: 'LW', x: 0.52, y: 0.08 },
    { role: 'ST', x: 0.57, y: 0.50 },
    { role: 'RW', x: 0.52, y: 0.92 },
  ],
  '4-4-2': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'LB', x: 0.20, y: 0.12 },
    { role: 'CB', x: 0.15, y: 0.38 },
    { role: 'CB', x: 0.15, y: 0.62 },
    { role: 'RB', x: 0.20, y: 0.88 },
    { role: 'LM', x: 0.37, y: 0.08 },
    { role: 'CM', x: 0.35, y: 0.38 },
    { role: 'CM', x: 0.35, y: 0.62 },
    { role: 'RM', x: 0.37, y: 0.92 },
    { role: 'ST', x: 0.57, y: 0.35 },
    { role: 'ST', x: 0.57, y: 0.65 },
  ],
  '4-2-3-1': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'LB', x: 0.20, y: 0.12 },
    { role: 'CB', x: 0.15, y: 0.38 },
    { role: 'CB', x: 0.15, y: 0.62 },
    { role: 'RB', x: 0.20, y: 0.88 },
    { role: 'DM', x: 0.30, y: 0.35 },
    { role: 'DM', x: 0.30, y: 0.65 },
    { role: 'LW', x: 0.50, y: 0.08 },
    { role: 'AM', x: 0.48, y: 0.50 },
    { role: 'RW', x: 0.50, y: 0.92 },
    { role: 'ST', x: 0.60, y: 0.50 },
  ],
  '5-3-2': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.25 },
    { role: 'CB', x: 0.12, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.75 },
    { role: 'WB', x: 0.24, y: 0.08 },
    { role: 'WB', x: 0.24, y: 0.92 },
    { role: 'CM', x: 0.35, y: 0.30 },
    { role: 'CM', x: 0.35, y: 0.50 },
    { role: 'CM', x: 0.35, y: 0.70 },
    { role: 'ST', x: 0.57, y: 0.35 },
    { role: 'ST', x: 0.57, y: 0.65 },
  ],
  '5-4-1': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.25 },
    { role: 'CB', x: 0.12, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.75 },
    { role: 'WB', x: 0.24, y: 0.08 },
    { role: 'WB', x: 0.24, y: 0.92 },
    { role: 'CM', x: 0.37, y: 0.20 },
    { role: 'CM', x: 0.37, y: 0.40 },
    { role: 'CM', x: 0.37, y: 0.60 },
    { role: 'CM', x: 0.37, y: 0.80 },
    { role: 'ST', x: 0.60, y: 0.50 },
  ],
  '3-5-2': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.25 },
    { role: 'CB', x: 0.12, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.75 },
    { role: 'WB', x: 0.25, y: 0.08 },
    { role: 'WB', x: 0.25, y: 0.92 },
    { role: 'CM', x: 0.36, y: 0.25 },
    { role: 'CM', x: 0.36, y: 0.50 },
    { role: 'CM', x: 0.36, y: 0.75 },
    { role: 'ST', x: 0.57, y: 0.35 },
    { role: 'ST', x: 0.57, y: 0.65 },
  ],
  '3-4-3': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.25 },
    { role: 'CB', x: 0.12, y: 0.50 },
    { role: 'CB', x: 0.14, y: 0.75 },
    { role: 'WB', x: 0.26, y: 0.08 },
    { role: 'WB', x: 0.26, y: 0.92 },
    { role: 'CM', x: 0.37, y: 0.35 },
    { role: 'CM', x: 0.37, y: 0.65 },
    { role: 'LW', x: 0.55, y: 0.08 },
    { role: 'ST', x: 0.60, y: 0.50 },
    { role: 'RW', x: 0.55, y: 0.92 },
  ],
  '4-5-1': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'LB', x: 0.20, y: 0.12 },
    { role: 'CB', x: 0.15, y: 0.38 },
    { role: 'CB', x: 0.15, y: 0.62 },
    { role: 'RB', x: 0.20, y: 0.88 },
    { role: 'LM', x: 0.38, y: 0.08 },
    { role: 'CM', x: 0.36, y: 0.30 },
    { role: 'CM', x: 0.36, y: 0.50 },
    { role: 'CM', x: 0.36, y: 0.70 },
    { role: 'RM', x: 0.38, y: 0.92 },
    { role: 'ST', x: 0.60, y: 0.50 },
  ],
  '4-1-4-1': [
    { role: 'GK', x: 0.06, y: 0.50 },
    { role: 'LB', x: 0.20, y: 0.12 },
    { role: 'CB', x: 0.15, y: 0.38 },
    { role: 'CB', x: 0.15, y: 0.62 },
    { role: 'RB', x: 0.20, y: 0.88 },
    { role: 'DM', x: 0.28, y: 0.50 },
    { role: 'LM', x: 0.40, y: 0.08 },
    { role: 'CM', x: 0.38, y: 0.35 },
    { role: 'CM', x: 0.38, y: 0.65 },
    { role: 'RM', x: 0.40, y: 0.92 },
    { role: 'ST', x: 0.60, y: 0.50 },
  ],
};

function _fmtToKey(f) {
  const n = f.replace(/\s/g, '');
  return FORMATION_POSITIONS[n] ? n : '4-3-3';
}

function _mirrorPos(pos) {
  return { x: 1 - pos.x, y: pos.y };
}

function _roleMatch(posLabel, slotRole) {
  const p = posLabel.toUpperCase();
  const s = slotRole;
  if (p === 'GK' && s === 'GK') return true;
  if (p.includes('CB') || p === 'DF') return s === 'CB';
  if (p.includes('DM') || p === 'CDM') return s === 'DM' || s === 'CM';
  if (p.includes('CM') || p === 'MF') return s === 'CM' || s === 'DM' || s === 'AM';
  if (p.includes('AM') || p === 'CAM') return s === 'AM' || s === 'CM' || s === 'ST';
  if (p.includes('LM') || p.includes('LW')) return s === 'LM' || s === 'LW' || s === 'WB' || s === 'CM';
  if (p.includes('RM') || p.includes('RW')) return s === 'RM' || s === 'RW' || s === 'WB' || s === 'CM';
  if (p.includes('LB') || p.includes('LWB')) return s === 'LB' || s === 'WB' || s === 'CB';
  if (p.includes('RB') || p.includes('RWB')) return s === 'RB' || s === 'WB' || s === 'CB';
  if (p.includes('CF') || p.includes('ST') || p.includes('FW') || p.includes('SS')) return s === 'ST' || s === 'AM';
  if (p === 'WB') return s === 'WB' || s === 'CM' || s === 'CB';
  return false;
}

function _assignFormationPositions(formationKey, players, isHome) {
  const template = FORMATION_POSITIONS[formationKey];
  if (!template || !players.length) return players.map(p => ({ ...p, _tx: p.x, _ty: p.y }));

  const sorted = [...players].sort((a, b) => {
    const order = { 'GK': 0, 'CB': 1, 'LB': 2, 'RB': 3, 'WB': 4, 'LM': 5, 'RM': 6, 'DM': 7, 'CM': 8, 'AM': 9, 'LW': 10, 'RW': 11, 'ST': 12, 'FW': 13 };
    return (order[a.pos] || 99) - (order[b.pos] || 99);
  });

  const slots = [...template];
  const assignments = [];

  sorted.forEach(p => {
    let bestIdx = -1;
    for (let i = 0; i < slots.length; i++) {
      if (slots[i] && _roleMatch(p.pos, slots[i].role)) {
        bestIdx = i;
        break;
      }
    }
    if (bestIdx === -1) {
      for (let i = 0; i < slots.length; i++) {
        if (slots[i]) { bestIdx = i; break; }
      }
    }
    if (bestIdx >= 0) {
      const slot = slots[bestIdx];
      slots[bestIdx] = null;
      const pos = isHome ? slot : _mirrorPos(slot);
      assignments.push({ ...p, _tx: pos.x, _ty: pos.y });
    } else {
      assignments.push({ ...p, _tx: p.x, _ty: p.y });
    }
  });

  return assignments;
}

// ── Standalone pitch background renderer (shared by main pitch & mini-pitch) ──

function drawPitchGround(ctx, W, H, p) {
  const pw = W - p * 2;
  const ph = H - p * 2;
  ctx.fillStyle = '#060D0A';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#1A4D20';
  ctx.fillRect(p - 2, p - 2, pw + 4, ph + 4);
  ctx.fillStyle = '#0F6B1F';
  ctx.fillRect(p, p, pw, ph);
  const stripeCount = 12;
  const stripeH = ph / stripeCount;
  for (let i = 0; i < stripeCount; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#147325' : '#0D5F1A';
    ctx.fillRect(p, p + i * stripeH, pw, stripeH + 1);
  }

  const cx = W / 2;
  const cy = H / 2;
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.65);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0)');
  grad.addColorStop(0.8, 'rgba(0,0,0,0.04)');
  grad.addColorStop(0.93, 'rgba(0,0,0,0.10)');
  grad.addColorStop(1, 'rgba(0,0,0,0.20)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  const grad2 = ctx.createRadialGradient(cx, cy, Math.min(pw, ph) * 0.35, cx, cy, Math.max(pw, ph) * 0.55);
  grad2.addColorStop(0, 'rgba(255,255,255,0)');
  grad2.addColorStop(0.7, 'rgba(255,255,255,0)');
  grad2.addColorStop(0.85, 'rgba(255,255,255,0.012)');
  grad2.addColorStop(1, 'rgba(255,255,255,0.025)');
  ctx.fillStyle = grad2;
  ctx.fillRect(p, p, pw, ph);
  ctx.restore();
}

function drawPitchOverlay(ctx, W, H, p) {
  const pw = W - p * 2;
  const ph = H - p * 2;
  const cx = W / 2;
  const cy = H / 2;

  const bW = pw * 0.16, bH = ph * 0.55;
  const sW = pw * 0.055, sH = ph * 0.27;
  const centerR = Math.min(pw, ph) * 0.12;
  const cornerR = Math.min(pw, ph) * 0.02;
  const lSpotX = p + bW * 0.67;
  const rSpotX = W - p - bW * 0.67;
  const arcR = bW * 0.55;
  const arcAngle = Math.acos(Math.min(0.999, (bW * 0.33) / arcR));
  const lineColor = 'rgba(255,255,255,0.75)';
  const lineWidth = 1.6;
  const spotR = 3;

  ctx.save();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(p, p); ctx.lineTo(W - p, p); ctx.lineTo(W - p, H - p); ctx.lineTo(p, H - p); ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, p); ctx.lineTo(cx, H - p);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, spotR, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(p, cy - bH / 2); ctx.lineTo(p + bW, cy - bH / 2); ctx.lineTo(p + bW, cy + bH / 2); ctx.lineTo(p, cy + bH / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - p, cy - bH / 2); ctx.lineTo(W - p - bW, cy - bH / 2); ctx.lineTo(W - p - bW, cy + bH / 2); ctx.lineTo(W - p, cy + bH / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(p, cy - sH / 2); ctx.lineTo(p + sW, cy - sH / 2); ctx.lineTo(p + sW, cy + sH / 2); ctx.lineTo(p, cy + sH / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - p, cy - sH / 2); ctx.lineTo(W - p - sW, cy - sH / 2); ctx.lineTo(W - p - sW, cy + sH / 2); ctx.lineTo(W - p, cy + sH / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath(); ctx.arc(lSpotX, cy, spotR, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rSpotX, cy, spotR, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(lSpotX, cy, arcR, -arcAngle, arcAngle); ctx.stroke();
  ctx.beginPath(); ctx.arc(rSpotX, cy, arcR, Math.PI - arcAngle, Math.PI + arcAngle); ctx.stroke();
  ctx.beginPath(); ctx.arc(p, p, cornerR, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(W - p, p, cornerR, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(W - p, H - p, cornerR, Math.PI, Math.PI * 1.5); ctx.stroke();
  ctx.beginPath(); ctx.arc(p, H - p, cornerR, Math.PI * 1.5, Math.PI * 2); ctx.stroke();
  ctx.restore();

  const goalW = Math.min(H * 0.06, (W - p * 2) * 0.04);
  const postThick = 2.5;
  const postDepth = goalW * 0.3;
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const hx = p + 1;
  ctx.lineWidth = postThick;
  ctx.beginPath(); ctx.moveTo(hx, cy - goalW / 2); ctx.lineTo(hx + postDepth, cy - goalW / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hx, cy + goalW / 2); ctx.lineTo(hx + postDepth, cy + goalW / 2); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(hx, cy - goalW / 2); ctx.lineTo(hx, cy + goalW / 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 0.5;
  const netLines = 4;
  for (let i = 1; i <= netLines; i++) {
    const frac = i / (netLines + 1);
    ctx.beginPath(); ctx.moveTo(hx + postDepth * frac, cy - goalW / 2 * 0.85); ctx.lineTo(hx + postDepth * frac, cy + goalW / 2 * 0.85); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx + 0.5, cy - goalW / 2 + goalW * frac * 0.85); ctx.lineTo(hx + postDepth - 0.5, cy - goalW / 2 + goalW * frac * 0.85); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  const ax = W - p - 1;
  ctx.lineWidth = postThick;
  ctx.beginPath(); ctx.moveTo(ax, cy - goalW / 2); ctx.lineTo(ax - postDepth, cy - goalW / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ax, cy + goalW / 2); ctx.lineTo(ax - postDepth, cy + goalW / 2); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ax, cy - goalW / 2); ctx.lineTo(ax, cy + goalW / 2); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 0.5;
  for (let i = 1; i <= netLines; i++) {
    const frac = i / (netLines + 1);
    ctx.beginPath(); ctx.moveTo(ax - postDepth * frac, cy - goalW / 2 * 0.85); ctx.lineTo(ax - postDepth * frac, cy + goalW / 2 * 0.85); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ax - 0.5, cy - goalW / 2 + goalW * frac * 0.85); ctx.lineTo(ax - postDepth + 0.5, cy - goalW / 2 + goalW * frac * 0.85); ctx.stroke();
  }
  ctx.restore();
}

function drawPitchBackground(ctx, W, H, p) {
  drawPitchGround(ctx, W, H, p);
  drawPitchOverlay(ctx, W, H, p);
}

// ── Shared attack zone calculation (single source of truth) ──
// If `players` is provided (e.g., formation-adjusted `homePlayers` from Pitch2D),
// it takes precedence over `scenario.home_players`.
function computeAttackZones(scenario, players) {
  const homePlayers = players || scenario.home_players || [];
  const events = scenario.replay_events || [];
  const hName = (scenario.home_team || '').toLowerCase();
  const hScore = scenario.scoreline?.home || 0;
  const aScore = scenario.scoreline?.away || 0;
  const trailing = hScore < aScore;

  const roleWeight = {
    GK: 0, CB: 0.15, DF: 0.15, LB: 0.35, RB: 0.35, WB: 0.45,
    DM: 0.3, CM: 0.5, LM: 0.7, RM: 0.7,
    AM: 0.8, LW: 0.9, RW: 0.9, ST: 1.0, CF: 1.0, FW: 1.0, SS: 0.85,
  };

  let lw = 0, cw = 0, rw = 0;
  homePlayers.forEach(p => {
    if (p.pos === 'GK') return;
    const w = roleWeight[p.pos] || 0.5;
    const x = p._tx !== undefined ? p._tx : p.x !== undefined ? p.x : 0.5;
    if (x < 0.33) lw += w;
    else if (x < 0.66) cw += w;
    else rw += w;
  });

  let evL = 0, evC = 0, evR = 0;
  events.forEach(e => {
    const desc = (e.description || '').toLowerCase();
    if (!desc.includes(hName)) return;
    if (/\b(left|left.?flank|left.?side)\b/.test(desc)) evL += 1;
    else if (/\b(right|right.?flank|right.?side)\b/.test(desc)) evR += 1;
    else if (/\b(through|central|middle)\b/.test(desc)) evC += 1;
    else if (/\bcross\b/.test(desc)) { evL += 0.5; evR += 0.5; }
    else if (e.type === 'goal' || e.type === 'shot') evC += 0.8;
    else evC += 0.4;
  });

  const posSum = lw + cw + rw || 1;
  const evSum = evL + evC + evR || 1;
  const hasEvents = events.length > 0;

  let bl = (lw / posSum) * (hasEvents ? 0.75 : 1) + (hasEvents ? (evL / evSum) * 0.25 : 0);
  let bc = (cw / posSum) * (hasEvents ? 0.75 : 1) + (hasEvents ? (evC / evSum) * 0.25 : 0);
  let br = (rw / posSum) * (hasEvents ? 0.75 : 1) + (hasEvents ? (evR / evSum) * 0.25 : 0);

  if (trailing && bc < 0.5) { bc *= 1.1; bl *= 0.95; br *= 0.95; }

  const total = bl + bc + br || 1;
  const lp = Math.round((bl / total) * 100);
  const cp = Math.round((bc / total) * 100);
  const rp = 100 - lp - cp;

  return { leftPct: lp, centerPct: cp, rightPct: rp, leftRaw: Math.round(lw), centerRaw: Math.round(cw), rightRaw: Math.round(rw) };
}

class Pitch2D {
  constructor(containerId, scenario) {
    this.container = document.getElementById(containerId);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.innerHTML = '';
    this.container.appendChild(this.canvas);

    this.scenario = scenario || {};
    this.homePlayers = [];
    this.awayPlayers = [];
    this.players = [];
    this.onPlayerHover = null;
    this.onPlayerLeave = null;
    this.overlayMode = 'shape';
    this.displayMode = 'shape';
    this.hovered = null;
    this.previewAction = null;
    this._targetPlayers = null;
    this._animT = 0;
    this._animating = false;
    this._dpr = Math.min(window.devicePixelRatio || 1, 3);

    // Render flags — control what this pitch instance draws
    this.renderFlags = {
      players: true,
      ball: true,
      labels: true,
      attackZones: false,
    };

    // Attack zone animation state (interpolated percentages)
    this._attackZoneData = computeAttackZones(this.scenario);
    this._attackZoneDisplay = { ...this._attackZoneData };
    this._attackZoneAnimId = null;

    // Highlighted zones (for AI Insight sync)
    this.highlightZones = [];
    this._highlightZonesFade = 0;
    this._highlightZonesAnimId = null;

    this._W = 0;
    this._H = 0;
    this._pad = 14;
    this._playerR = 16;

    this.ball = {
      pos: { x: 0.50, y: 0.45 },
      targetPos: null,
      lastPos: { x: 0.50, y: 0.45 },
      direction: { x: 0, y: 0 },
      possession: null,
      possessionTeam: null,
      animating: false,
      animFrom: null,
      animTo: null,
      animStart: 0,
      animDuration: 0,
      lastEvent: null,
    };

    this._formationAnim = null;
    this._subAnim = null;
    this._ballAnim = null;
    this._playerAlphas = {};
    this._selectionAnimating = false;
    this._selectionAnimId = null;

    this._overlayAnimId = null;
    this._overlayAnimStart = 0;
    this._overlayPrevMode = null;
    this._overlayPrevData = null;
    this._overlayTransStart = 0;
    this._overlayTransDuration = 250;
    this._inOverlayTrans = false;

    // Replay interpolation
    this._replayKeyframes = [];
    this._replayIndex = -1;
    this._replayPlaying = false;
    this._replaySpeed = 1;
    this._replayNextTime = 0;
    this._replayAnimId = null;

    // Idle player bob
    this._bobTime = 0;
    this._bobAnimId = null;

    this._selectedPlayer = null;
    this._passingDirty = true;
    this._passingGraph = null;
    this._passingPrevGraph = null;
    this._passingFadeStart = 0;
    this._passingHover = null;
    this._pressingDirty = true;
    this._pressingState = null;
    this._defensiveDirty = true;
    this._defensiveCache = null;
    this._pitchControlDirty = true;
    this._pitchControlHomeRatio = null;
    this._pitchControlDisplay = null;
    this._pitchControlTick = 0;
    this.onPlayerSelect = null;
    this.onPassingHover = null;

    this._eventHighlight = null;
    this._highlightAnimId = null;

    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._bindEvents();
  }

  _resize() {
    const dpr = this._dpr;
    const rect = this.container.getBoundingClientRect();
    this._W = rect.width;
    this._H = rect.height;
    this.canvas.width = this._W * dpr;
    this.canvas.height = this._H * dpr;
    this.canvas.style.width = this._W + 'px';
    this.canvas.style.height = this._H + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this._playerR = Math.max(14, Math.min(22, this._W / 38));
    this._draw();
  }

  _bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => this._onMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this._onMouseLeave());
    this.canvas.addEventListener('click', (e) => this._onClick(e));
  }

  _normToCoord(p) {
    const W = this._W - this._pad * 2;
    const H = this._H - this._pad * 2;
    let tx, ty;
    if (this.displayMode === 'live' && p._ox !== undefined) {
      tx = p._ox;
      ty = p._oy;
    } else {
      tx = p._tx !== undefined ? p._tx : p.x;
      ty = p._ty !== undefined ? p._ty : p.y;
    }
    return {
      x: this._pad + tx * W,
      y: this._pad + (1 - ty) * H,
    };
  }

  load(homePlayers, awayPlayers) {
    this._selectedPlayer = null;
    this._passingDirty = true;
    this._pressingDirty = true;
    this._defensiveDirty = true;
    this._pitchControlDirty = true;
    const homeFmt = _fmtToKey(this.scenario.home_formation || '4-3-3');
    const awayFmt = _fmtToKey(this.scenario.away_formation || '4-3-3');

    const rawHome = homePlayers.map(p => ({ ...p, team: 'home', _ox: p.x, _oy: p.y }));
    const rawAway = awayPlayers.map(p => ({ ...p, team: 'away', _ox: p.x, _oy: p.y }));

    this.homePlayers = _assignFormationPositions(homeFmt, rawHome, true);
    this.awayPlayers = _assignFormationPositions(awayFmt, rawAway, false);
    this.players = [...this.homePlayers, ...this.awayPlayers];
    this._computeMomentum();
    this._initBallFromScenario(this.scenario);
    this._draw();
    this._scheduleOverlayAnim();
  }

  setDisplayMode(mode) {
    this.displayMode = mode;
    this.clearPreview();
    this._draw();
  }

  setOverlay(mode) {
    this._stopOverlayAnim();
    const prevMode = this.overlayMode;
    if (prevMode === mode) return;
    this._overlayPrevMode = prevMode;
    this._overlayPrevData = this._captureOverlayState(prevMode);
    this.overlayMode = mode;
    if (mode === 'passing') this._passingDirty = true;
    if (mode === 'pressing') this._pressingDirty = true;
    if (mode === 'defensive') this._defensiveDirty = true;
    if (mode === 'pitch_control') this._pitchControlDirty = true;
    if (mode === 'attack') {
      this._attackZoneData = computeAttackZones(this.scenario, this.homePlayers);
      this.setAttackZoneData(this._attackZoneData);
    }
    this._inOverlayTrans = true;
    this._overlayTransStart = performance.now();
    this._draw();
    this._scheduleOverlayAnim();
  }

  _scheduleOverlayAnim() {
    if (this.overlayMode === 'passing' || this.overlayMode === 'pressing' || this.overlayMode === 'defensive' || this.overlayMode === 'pitch_control' || this._inOverlayTrans) {
      const tick = () => {
        if (!this._overlayAnimId) return;
        if (this.overlayMode === 'passing' || this.overlayMode === 'pressing' || this.overlayMode === 'defensive' || this.overlayMode === 'pitch_control' || this._inOverlayTrans) {
          if (this.overlayMode === 'defensive') this._defensiveDirty = true;
          this._draw();
          this._overlayAnimId = requestAnimationFrame(tick);
        }
      };
      this._overlayAnimId = requestAnimationFrame(tick);
    } else {
      this._ensureIdleAnim();
    }
  }

  _captureOverlayState(mode) {
    return { mode };
  }

  _stopOverlayAnim() {
    if (this._overlayAnimId) {
      cancelAnimationFrame(this._overlayAnimId);
      this._overlayAnimId = null;
    }
    if (this._idleAnimId) {
      cancelAnimationFrame(this._idleAnimId);
      this._idleAnimId = null;
    }
  }

  _ensureIdleAnim() {
    if (this._idleAnimId || this._overlayAnimId || this._replayAnimId) return;
    let lastTick = 0;
    const tick = (now) => {
      if (this._idleAnimId !== tick) return;
      if (this._overlayAnimId || this._replayAnimId || this._eventHighlight) {
        this._idleAnimId = null;
        return;
      }
      if (now - lastTick > 50) {
        lastTick = now;
        this._bobTime = now / 1000;
        this._draw();
      }
      if (!this._overlayAnimId && !this._replayAnimId && !this._eventHighlight) {
        this._idleAnimId = requestAnimationFrame(tick);
      }
    };
    this._idleAnimId = requestAnimationFrame(tick);
  }

  // ── Replay Interpolation Engine ──

  computeReplayKeyframes(events) {
    const keyframes = [];
    const homeName = (this.scenario.home_team || '').toLowerCase();
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      const desc = (e.description || '').toLowerCase();
      const isHomeEvent = desc.includes(homeName);
      const eType = (e.type || '').toLowerCase();

      let ballX = 0.5, ballY = 0.5;
      if (eType === 'goal' || eType === 'shot') {
        ballX = 0.82 + Math.random() * 0.08;
        ballY = 0.3 + Math.random() * 0.4;
      } else if (eType === 'corner') {
        ballX = 0.88; ballY = Math.random() > 0.5 ? 0.08 : 0.92;
      } else if (eType === 'foul') {
        ballX = 0.4 + Math.random() * 0.3;
        ballY = 0.2 + Math.random() * 0.6;
      } else if (eType === 'offside') {
        ballX = 0.72 + Math.random() * 0.1;
        ballY = 0.3 + Math.random() * 0.4;
      } else if (desc.includes('cross') || desc.includes('wing') || desc.includes('wide')) {
        ballX = 0.7 + Math.random() * 0.12;
        ballY = Math.random() > 0.5 ? 0.05 + Math.random() * 0.15 : 0.8 + Math.random() * 0.15;
      } else if (eType === 'substitution') {
        ballX = 0.5 + Math.random() * 0.1;
        ballY = 0.4 + Math.random() * 0.2;
      } else {
        ballX = 0.4 + Math.random() * 0.25;
        ballY = 0.3 + Math.random() * 0.4;
      }
      if (!isHomeEvent) ballX = 1 - ballX;

      keyframes.push({
        index: i,
        event: e,
        ballX, ballY,
      });
    }
    this._replayKeyframes = keyframes;
    return keyframes;
  }

  seekReplay(index) {
    if (!this._replayKeyframes.length) return;
    const kf = this._replayKeyframes[Math.min(index, this._replayKeyframes.length - 1)];
    if (!kf) return;
    this._replayIndex = index;

    if (!this.ball.animating) {
      this.ball.lastPos = { ...this.ball.pos };
    }
    this.ball.animFrom = { ...this.ball.pos };
    this.ball.animTo = { x: kf.ballX, y: kf.ballY };
    this.ball.animStart = 0;
    this.ball.animDuration = 350 / Math.max(0.5, this._replaySpeed);
    this.ball.animating = true;
    this._updateReplayUI();
  }

  playReplay() {
    if (this._replayPlaying) return;
    if (this._replayKeyframes.length === 0) return;
    this._replayPlaying = true;
    this._replayIndex = Math.max(0, this._replayIndex);
    this._replayNextTime = performance.now() + 200;
    this._tickReplay();
  }

  pauseReplay() {
    this._replayPlaying = false;
    if (this._replayAnimId) {
      cancelAnimationFrame(this._replayAnimId);
      this._replayAnimId = null;
    }
  }

  setReplaySpeed(speed) {
    this._replaySpeed = speed;
  }

  _tickReplay() {
    if (!this._replayPlaying) return;
    const now = performance.now();
    if (now >= this._replayNextTime && this._replayIndex < this._replayKeyframes.length - 1) {
      this._replayIndex++;
      this.seekReplay(this._replayIndex);
      const delay = 2200 / this._replaySpeed;
      this._replayNextTime = now + delay;
      this._updateReplayUI();
    }
    if (this._replayIndex >= this._replayKeyframes.length - 1) {
      this._replayPlaying = false;
      this._updateReplayUI();
      return;
    }
    // Redraw every frame for smooth ball animation
    this._bobTime = now / 1000;
    this._draw();
    this._replayAnimId = requestAnimationFrame(() => this._tickReplay());
  }

  _updateReplayUI() {
    const el = document.getElementById('replay-progress');
    if (el && this._replayKeyframes.length) {
      const pct = ((this._replayIndex + 1) / this._replayKeyframes.length) * 100;
      el.style.width = pct + '%';
    }
    // Update active event pin
    document.querySelectorAll('.event-pin').forEach((pin, i) => {
      pin.classList.toggle('active', i === this._replayIndex);
    });
    // Update minute display
    const kf = this._replayKeyframes[this._replayIndex];
    if (kf) {
      const minEl = document.getElementById('match-minute');
      if (minEl) minEl.textContent = (kf.event.minute || '?') + "'";
    }
  }

  highlightEvent(event) {
    this._stopOverlayAnim();
    if (this._highlightAnimId) {
      cancelAnimationFrame(this._highlightAnimId);
      this._highlightAnimId = null;
    }

    const player = [...this.homePlayers, ...this.awayPlayers].find(
      p => p.name && event.player && p.name.toLowerCase().includes(event.player.toLowerCase())
    );

    if (player) {
      this._setBallFromEvent(event, player);
      this._updatePossession(event, player);
      this._passingDirty = true;
    }

    // Store highlight for glow/arrow effects only (ball is drawn separately)
    if (player) {
      const coord = this._normToCoord(player);
      const isHome = player.team === 'home';
      let arrowTarget = null;
      if (event.type === 'goal' || event.type === 'shot') {
        arrowTarget = coord;
      }

      this._eventHighlight = {
        event,
        player,
        coord,
        isHome,
        startTime: performance.now(),
        arrowTarget,
      };
    } else {
      this._eventHighlight = null;
    }

    this._draw();

    const tick = () => {
      if (this._eventHighlight) {
        this._draw();
        this._highlightAnimId = requestAnimationFrame(tick);
      }
    };
    this._highlightAnimId = requestAnimationFrame(tick);
  }

  clearEventHighlight() {
    this._eventHighlight = null;
    if (this._highlightAnimId) {
      cancelAnimationFrame(this._highlightAnimId);
      this._highlightAnimId = null;
    }
    // Keep ball at its current position (already reflects last event)
    this._draw();
    this._scheduleOverlayAnim();
  }

  setPreviewAction(action) {
    if (this.displayMode === 'live') return;
    if (!action) { this.clearPreview(); return; }
    this.previewAction = action;
    this._computePreviewPositions(action);
    this._animatePreview();
  }

  clearPreview() {
    this.previewAction = null;
    this._targetPlayers = null;
    this._animT = 1;
    this._animating = false;
    this._draw();
  }

  _computeMomentum() {
    const s = this.scenario;
    const events = s.replay_events || [];
    const homeName = (s.home_team || '').toLowerCase();
    const awayName = (s.away_team || '').toLowerCase();
    const hScore = s.scoreline?.home || 0;
    const aScore = s.scoreline?.away || 0;

    const totalEvents = events.length;
    if (!totalEvents) {
      this.momentum = { home: 50, away: 50, label: 'Balanced' };
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
    const home = Math.min(85, Math.max(15, pct));
    const away = 100 - home;

    const diff = home - away;
    const label = diff > 15 ? 'Home Dominating' : diff < -15 ? 'Away Dominating' : diff > 5 ? 'Home Advantaged' : diff < -5 ? 'Away Advantaged' : 'Balanced';

    this.momentum = { home, away, homeName: s.home_team || 'Home', awayName: s.away_team || 'Away', label };
  }

  _computePreviewPositions(action) {
    const a = action.toLowerCase();
    const homeFmt = _fmtToKey(this.scenario.home_formation || '4-3-3');
    const awayFmt = _fmtToKey(this.scenario.away_formation || '4-3-3');

    let targetFmt = homeFmt;
    if (a.includes('back 3') || a.includes('back three') || a.includes('3-5')) targetFmt = '3-5-2';
    else if (a.includes('back 5') || a.includes('back five') || a.includes('5-4') || a.includes('5-3')) targetFmt = '5-4-1';
    else if (a.includes('second') && (a.includes('striker') || a.includes('forward'))) targetFmt = '4-4-2';
    else if (a.includes('hold') || a.includes('patient') || a.includes('system') || a.includes('trust')) targetFmt = '4-5-1';
    else if (a.includes('midfield') || a.includes('pivot')) targetFmt = '4-1-4-1';
    else if (a.includes('all-out') || a.includes('gamble') || a.includes('desperate')) targetFmt = '3-4-3';

    if (targetFmt === homeFmt) { this._targetPlayers = null; return; }

    this._targetPlayers = _assignFormationPositions(targetFmt, this.homePlayers.map(p => ({ ...p, team: 'home' })), true);
    this._animT = 0;
  }

  _animatePreview() {
    if (!this._targetPlayers) { this._draw(); return; }
    this._animating = true;
    const startTime = performance.now();
    const duration = 400;

    const step = (now) => {
      const elapsed = now - startTime;
      this._animT = Math.min(1, elapsed / duration);
      this._draw();
      if (this._animT < 1) {
        requestAnimationFrame(step);
      } else {
        this._animating = false;
      }
    };
    requestAnimationFrame(step);
  }

  _getPreviewPos(p, idx) {
    if (!this._targetPlayers || this._animT >= 1 || !this._targetPlayers[idx]) return { _tx: p._tx, _ty: p._ty };
    const t = this._easeInOut(this._animT);
    const src = p;
    const dst = this._targetPlayers[idx];
    if (src.team !== 'home' || !dst) return { _tx: p._tx, _ty: p._ty };
    return {
      _tx: src._tx + (dst._tx - src._tx) * t,
      _ty: src._ty + (dst._ty - src._ty) * t,
    };
  }

  _easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

  _easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  animateSelection(action) {
    this.clearPreview();
    if (this.displayMode === 'live') return;

    const a = action.toLowerCase();

    const isFormationChange =
      a.includes('shape') || a.includes('back 3') || a.includes('back five') ||
      a.includes('back three') || a.includes('back 5') || a.includes('formation') ||
      a.includes('switch') ||
      (a.includes('second') && (a.includes('striker') || a.includes('forward'))) ||
      a.includes('midfield') || a.includes('pivot') ||
      a.includes('all-out') || a.includes('all out') || a.includes('gamble') ||
      a.includes('desperate') || a.includes('hold') || a.includes('patient') ||
      a.includes('system') || a.includes('trust');

    const isSubstitution =
      a.includes('sub') || a.includes('fresh') || a.includes('legs') ||
      a.includes('double sub') || a.includes('inject');

    const isAttacking =
      a.includes('press') || a.includes('striker') || a.includes('forward') ||
      a.includes('gamble') || a.includes('all-out') || a.includes('all out') ||
      a.includes('wing') || a.includes('wider') || a.includes('cross') ||
      a.includes('wide') || a.includes('urgent');

    const isDefensive =
      a.includes('hold') || a.includes('deep') || a.includes('defend') ||
      a.includes('drop') || a.includes('patient') || a.includes('dm') ||
      a.includes('defensive');

    if (isFormationChange) this._startFormationAnim(action);

    if (isSubstitution) this._startSubstitutionAnim();

    this._startBallNudge(isAttacking, isDefensive);

    if (this._formationAnim || this._subAnim || this._ballAnim || this.ball.animating) {
      this._selectionAnimating = true;
      const step = (now) => {
        if (!this._selectionAnimating) return;
        this._updateSelectionAnim(now);
        this._draw();
        if (this._selectionAnimating) {
          this._selectionAnimId = requestAnimationFrame(step);
        }
      };
      this._selectionAnimId = requestAnimationFrame(step);
    } else {
      this._draw();
    }
  }

  _startFormationAnim(action) {
    const a = action.toLowerCase();
    const homeFmt = _fmtToKey(this.scenario.home_formation || '4-3-3');
    let targetFmt = homeFmt;

    if (a.includes('back 3') || a.includes('back three') || a.includes('3-5')) targetFmt = '3-5-2';
    else if (a.includes('back 5') || a.includes('back five') || a.includes('5-4') || a.includes('5-3')) targetFmt = '5-4-1';
    else if (a.includes('second') && (a.includes('striker') || a.includes('forward'))) targetFmt = '4-4-2';
    else if (a.includes('hold') || a.includes('patient') || a.includes('system') || a.includes('trust')) targetFmt = '4-5-1';
    else if (a.includes('midfield') || a.includes('pivot')) targetFmt = '4-1-4-1';
    else if (a.includes('all-out') || a.includes('gamble') || a.includes('desperate')) targetFmt = '3-4-3';

    if (targetFmt === homeFmt || !this.homePlayers.length) return;

    const dstPlayers = _assignFormationPositions(
      targetFmt,
      this.homePlayers.map(p => ({ ...p, team: 'home' })),
      true
    );

    const srcPositions = this.homePlayers.map(p => ({ _tx: p._tx, _ty: p._ty }));
    const dstPositions = dstPlayers.map(p => ({ _tx: p._tx, _ty: p._ty }));

    this._formationAnim = { srcPositions, dstPositions, startTime: 0, duration: 1800 };
  }

  _startSubstitutionAnim() {
    const candidates = this.homePlayers
      .map((p, idx) => ({ ...p, idx }))
      .filter(p => p.pos !== 'GK')
      .sort((a, b) => b.fatigue - a.fatigue);

    if (!candidates.length) return;

    const outPlayer = candidates[0];

    const subPlayer = {
      name: 'SUB',
      number: Math.floor(Math.random() * 29 + 12),
      pos: outPlayer.pos,
      team: 'home',
      fatigue: 25,
    };

    this._subAnim = {
      outIdx: outPlayer.idx,
      subData: subPlayer,
      phase: 'out',
      phaseStartTime: 0,
      outDuration: 500,
      holdDuration: 100,
      inDuration: 500,
    };

    this._playerAlphas[outPlayer.idx] = 1;
  }

  _startBallNudge(isAttacking, isDefensive) {
    const b = this.ball;
    let tx = b.pos.x;
    let ty = b.pos.y;

    if (isAttacking) {
      tx = Math.min(0.75, b.pos.x + 0.12);
      ty = b.pos.y + (Math.random() - 0.5) * 0.06;
    } else if (isDefensive) {
      tx = Math.max(0.25, b.pos.x - 0.08);
      ty = b.pos.y + (Math.random() - 0.5) * 0.04;
    } else {
      tx = b.pos.x + (Math.random() - 0.5) * 0.05;
      ty = b.pos.y + (Math.random() - 0.5) * 0.03;
    }

    this._animateBallTo(tx, ty, 1200);
    this._ballAnim = true; // keep flag for animateSelection check
  }

  _updateSelectionAnim(now) {
    let anyActive = false;

    if (this._formationAnim) {
      if (!this._formationAnim.startTime) this._formationAnim.startTime = now;
      const elapsed = now - this._formationAnim.startTime;
      const t = Math.min(1, elapsed / this._formationAnim.duration);
      const eased = this._easeOutCubic(t);

      const { srcPositions, dstPositions } = this._formationAnim;
      for (let i = 0; i < this.homePlayers.length; i++) {
        const src = srcPositions[i];
        const dst = dstPositions[i];
        if (src && dst) {
          this.homePlayers[i]._tx = src._tx + (dst._tx - src._tx) * eased;
          this.homePlayers[i]._ty = src._ty + (dst._ty - src._ty) * eased;
        }
      }

      if (t >= 1) {
        for (let i = 0; i < this.homePlayers.length; i++) {
          const dst = dstPositions[i];
          if (dst) {
            this.homePlayers[i]._tx = dst._tx;
            this.homePlayers[i]._ty = dst._ty;
          }
        }
        this._formationAnim = null;
      } else {
        anyActive = true;
      }
    }

    if (this._subAnim) {
      if (!this._subAnim.phaseStartTime) this._subAnim.phaseStartTime = now;
      const { outIdx, subData, outDuration, holdDuration, inDuration } = this._subAnim;

      if (this._subAnim.phase === 'out') {
        const elapsed = now - this._subAnim.phaseStartTime;
        const t = Math.min(1, elapsed / outDuration);
        this._playerAlphas[outIdx] = 1 - this._easeOutCubic(t);
        if (t >= 1) {
          this._playerAlphas[outIdx] = 0;
          this._subAnim.phase = 'hold';
          this._subAnim.phaseStartTime = now;
        }
        anyActive = true;
      } else if (this._subAnim.phase === 'hold') {
        const elapsed = now - this._subAnim.phaseStartTime;
        if (elapsed >= holdDuration) {
          const replaced = this.homePlayers[outIdx];
          this.homePlayers[outIdx] = {
            ...subData,
            _tx: replaced._tx,
            _ty: replaced._ty,
            x: replaced.x,
            y: replaced.y,
            _ox: replaced._ox,
            _oy: replaced._oy,
          };
          this.players = [...this.homePlayers, ...this.awayPlayers];
          this._subAnim.phase = 'in';
          this._subAnim.phaseStartTime = now;
          this._playerAlphas[outIdx] = 0;
        }
        anyActive = true;
      } else if (this._subAnim.phase === 'in') {
        const elapsed = now - this._subAnim.phaseStartTime;
        const t = Math.min(1, elapsed / inDuration);
        this._playerAlphas[outIdx] = this._easeOutCubic(t);
        if (t >= 1) {
          this._playerAlphas[outIdx] = 1;
          delete this._playerAlphas[outIdx];
          this._subAnim = null;
        }
        anyActive = true;
      }
    }

    this._selectionAnimating = anyActive;
  }

  _draw() {
    const ctx = this.ctx;
    const W = this._W;
    const H = this._H;
    if (!W || !H) return;

    // Overlay transition progress
    let transT = 1;
    let oldOverlayMode = null;
    if (this._inOverlayTrans) {
      const elapsed = performance.now() - this._overlayTransStart;
      transT = Math.min(1, elapsed / this._overlayTransDuration);
      if (transT >= 1) {
        this._inOverlayTrans = false;
        this._overlayPrevMode = null;
        this._overlayPrevData = null;
        transT = 1;
      } else {
        transT = this._easeOutCubic(transT);
        oldOverlayMode = this._overlayPrevMode;
      }
    }

    ctx.clearRect(0, 0, W, H);
    drawPitchBackground(this.ctx, W, H, this._pad);

    // Layer 2: Pitch Control (behind all tactical overlays) — transition-aware
    if (this.displayMode !== 'live' && this.overlayMode === 'pitch_control') {
      ctx.save();
      ctx.globalAlpha = this._inOverlayTrans ? transT : 1;
      this._drawPitchControlOverlay(W, H);
      ctx.restore();
    }
    if (oldOverlayMode === 'pitch_control') {
      ctx.save();
      ctx.globalAlpha = 1 - transT;
      this._drawPitchControlOverlay(W, H);
      ctx.restore();
    }

    // Layer 3-4: Defensive Block, Passing Lanes, Attack Zones, Compactness
    // (skipped during transitions — handled by the transition blocks below)
    if (!this._inOverlayTrans && this.displayMode !== 'live' && this.overlayMode !== 'shape' && this.overlayMode !== 'pressing' && this.overlayMode !== 'pitch_control') {
      this._drawOverlay(W, H);
    }

    // If transitioning, draw new overlay fading in, old fading out
    if (this._inOverlayTrans) {
      // New overlay (excluding pressing/pitch_control which have separate blocks)
      if (this.overlayMode !== 'shape' && this.overlayMode !== 'pressing' && this.overlayMode !== 'pitch_control') {
        ctx.save();
        ctx.globalAlpha = transT;
        this._drawOverlay(W, H);
        ctx.restore();
      }
      // Old overlay fading out
      if (oldOverlayMode && oldOverlayMode !== 'shape' && oldOverlayMode !== 'pressing' && oldOverlayMode !== 'pitch_control') {
        ctx.save();
        ctx.globalAlpha = 1 - transT;
        const savedMode = this.overlayMode;
        this.overlayMode = oldOverlayMode;
        this._drawOverlay(W, H);
        this.overlayMode = savedMode;
        ctx.restore();
      }
    }

    // Attack zones always render when flagged (mini-pitch companion)
    if (this.renderFlags.attackZones) {
      this._drawAttackOverlay(W, H);
    }
    this._updateBallAnimation();
    this._drawHighlights(W, H);

    // Update idle bob and draw players
    this._bobTime = performance.now() / 1000;
    if (this.renderFlags.players) this._drawPlayers(W, H);
    if (this.renderFlags.ball) this._drawBall(W, H);

    // Pressing overlay on top of players
    if (this.displayMode !== 'live' && this.overlayMode === 'pressing') {
      ctx.save();
      ctx.globalAlpha = this._inOverlayTrans ? transT : 1;
      this._drawPressingOverlay(W, H);
      ctx.restore();
    }

    if (oldOverlayMode === 'pressing') {
      ctx.save();
      ctx.globalAlpha = 1 - transT;
      const savedMode = this.overlayMode;
      this.overlayMode = 'pressing';
      this._drawPressingOverlay(W, H);
      this.overlayMode = savedMode;
      ctx.restore();
    }

    if (this.renderFlags.labels) this._drawEventHighlight(W, H);
  }

  _drawBall(W, H) {
    const ctx = this.ctx;
    const pad = this._pad;
    const b = this.ball;
    const bx = pad + b.pos.x * (W - pad * 2);
    const by = pad + (1 - b.pos.y) * (H - pad * 2);
    const r = 8;

    ctx.save();
    ctx.translate(bx, by);

    // Shadow
    ctx.beginPath();
    ctx.arc(2, 2, r + 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fill();

    // Outer glow for visibility against grass
    const glowSize = r * 4;
    const glow = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, glowSize);
    glow.addColorStop(0, 'rgba(255,255,255,0.2)');
    glow.addColorStop(0.4, 'rgba(255,255,255,0.08)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
    ctx.fill();

    // White contrast ring (ensures ball stands out no matter what's behind it)
    ctx.beginPath();
    ctx.arc(0, 0, r + 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Ball base (white)
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const ballGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
    ballGrad.addColorStop(0, '#FFFFFF');
    ballGrad.addColorStop(0.6, '#F0F0F0');
    ballGrad.addColorStop(1, '#C8C8C8');
    ctx.fillStyle = ballGrad;
    ctx.fill();

    // Panel seams (pentagon-style pattern)
    ctx.strokeStyle = 'rgba(40,40,50,0.45)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const px = Math.cos(angle) * r * 0.55;
      const py = Math.sin(angle) * r * 0.55;
      ctx.moveTo(0, 0);
      ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a1 = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((i + 1) / 5) * Math.PI * 2 - Math.PI / 2;
      const r1 = r * 0.55;
      const r2 = r * 1;
      ctx.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
      ctx.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2);
      ctx.lineTo(Math.cos(a2) * r1, Math.sin(a2) * r1);
    }
    ctx.stroke();

    // Highlight (top-left shine)
    ctx.beginPath();
    ctx.arc(-r * 0.25, -r * 0.25, r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();

    // Dark outline
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  }

  // ── Initialize ball position from scenario data ──
  _initBallFromScenario(scenario) {
    if (!scenario) return;
    const events = scenario.replay_events;
    if (events && events.length > 0) {
      // Use the most recent event before the match minute
      const cutoff = typeof getMatchMinute === 'function' ? getMatchMinute(scenario) : 60;
      const relevant = events.filter(e => (e.minute || 0) <= cutoff);
      const last = relevant.length > 0 ? relevant[relevant.length - 1] : events[0];
      this._setBallFromEvent(last, null);
    } else {
      // Fallback: ball near center circle
      this.ball.pos = { x: 0.50, y: 0.50 };
    }
    this.ball.lastPos = { ...this.ball.pos };
  }

  // ── Determine ball target position from an event ──
  _setBallFromEvent(event, player) {
    const b = this.ball;
    b.lastEvent = event;

    // Find player if not provided
    if (!player && event && event.player) {
      const found = [...this.homePlayers, ...this.awayPlayers].find(
        p => p.name && event.player && p.name.toLowerCase().includes(event.player.toLowerCase())
      );
      if (found) player = found;
    }

    // Default: use team centroid if no player found
    const getTeamCentroid = (isHome) => {
      const team = isHome ? this.homePlayers : this.awayPlayers;
      const outfield = team.filter(p => p.pos !== 'GK');
      if (!outfield.length) return { x: 0.5, y: 0.5 };
      return {
        x: outfield.reduce((s, p) => s + p._tx, 0) / outfield.length,
        y: outfield.reduce((s, p) => s + p._ty, 0) / outfield.length,
      };
    };

    let target = { x: 0.50, y: 0.50 };
    let duration = 800;
    let isHome = null;

    if (player) isHome = player.team === 'home';

    if (!event) {
      if (player) target = { x: player._tx, y: player._ty };
    } else if (event.type === 'goal') {
      // Ball ends at the goal
      const goalX = isHome ? 1.0 : 0.0;
      target = { x: goalX, y: 0.50 };
      duration = 1000;
    } else if (event.type === 'shot') {
      // Ball moves toward goal
      const goalX = isHome ? 1.0 : 0.0;
      target = { x: goalX, y: 0.50 };
      duration = 600;
    } else if (event.type === 'corner') {
      // Ball goes to the corner flag
      const cornerColors = { 'left': 0.0, 'right': 1.0 };
      const desc = (event.description || '').toLowerCase();
      const side = desc.includes('right') ? 0.08 : 0.92;
      const xEnd = isHome ? 1.0 : 0.0;
      target = { x: xEnd, y: side };
      duration = 900;
    } else if (event.type === 'foul') {
      // Ball at the spot of the foul
      if (player) target = { x: player._tx, y: player._ty };
      else target = { x: 0.5, y: 0.5 };
      duration = 400;
    } else if (event.type === 'offside') {
      if (player) target = { x: player._tx, y: player._ty };
      else target = { x: 0.5, y: 0.5 };
      duration = 400;
    } else if (event.type === 'substitution' || event.type === 'yellow_card' || event.type === 'red_card') {
      // Ball stays where it is
      target = { ...b.pos };
      duration = 100;
    } else {
      // Default: ball goes to the player involved
      if (player) target = { x: player._tx, y: player._ty };
      else {
        const centroids = [
          getTeamCentroid(true),
          getTeamCentroid(false),
        ];
        target = {
          x: (centroids[0].x + centroids[1].x) / 2,
          y: (centroids[0].y + centroids[1].y) / 2,
        };
      }
      duration = 500;
    }

    // For goal/shot, first animate to the player then to the goal
    if (player && (event.type === 'goal' || event.type === 'shot')) {
      // Start at player position first
      b.pos = { x: player._tx, y: player._ty };
      b.lastPos = { ...b.pos };
      this._animateBallTo(target.x, target.y, duration);
    } else {
      this._animateBallTo(target.x, target.y, duration);
    }
  }

  // ── Update possession from an event ──
  _updatePossession(event, player) {
    const b = this.ball;
    if (!event) {
      b.possession = null;
      b.possessionTeam = null;
      return;
    }

    if (event.type === 'substitution' || event.type === 'yellow_card' || event.type === 'red_card') {
      return; // no change
    }

    if (player) {
      b.possession = player;
      b.possessionTeam = player.team;
    } else {
      // Infer team from event description
      const desc = (event.description || '').toLowerCase();
      const homeName = (this.scenario.home_team || '').toLowerCase();
      const awayName = (this.scenario.away_team || '').toLowerCase();
      if (desc.includes(homeName)) b.possessionTeam = 'home';
      else if (desc.includes(awayName)) b.possessionTeam = 'away';
    }
  }

  // ── Start smooth ball animation toward target ──
  _animateBallTo(tx, ty, duration) {
    const b = this.ball;
    b.animFrom = { ...b.pos };
    b.animTo = { x: tx, y: ty };
    b.animStart = 0;
    b.animDuration = duration || 800;
    b.animating = true;

    // Update direction vector
    const dx = tx - b.pos.x;
    const dy = ty - b.pos.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    b.direction = { x: dx / len, y: dy / len };
  }

  // ── Step ball animation each frame ──
  _updateBallAnimation() {
    const b = this.ball;
    if (!b.animating || !b.animTo) return;

    const now = performance.now();
    if (!b.animStart) b.animStart = now;

    const elapsed = now - b.animStart;
    const t = Math.min(1, elapsed / b.animDuration);
    const eased = this._easeOutCubic(t);

    b.lastPos = { ...b.pos };
    b.pos.x = b.animFrom.x + (b.animTo.x - b.animFrom.x) * eased;
    b.pos.y = b.animFrom.y + (b.animTo.y - b.animFrom.y) * eased;

    if (t >= 1) {
      b.pos.x = b.animTo.x;
      b.pos.y = b.animTo.y;
      b.animating = false;
      b.animFrom = null;
      b.animTo = null;
    }
  }

  // ── Expose ball state for future overlays ──
  getBallState() {
    return { ...this.ball, pos: { ...this.ball.pos }, lastPos: { ...this.ball.lastPos } };
  }

  // -- Grass --
  // -- Overlays --
  _drawOverlay(W, H) {
    if (!this.overlayMode || this.overlayMode === 'shape') return;
    switch (this.overlayMode) {
      case 'attack': this._drawAttackOverlay(W, H); break;
      case 'passing': this._drawPassingOverlay(W, H); break;
      case 'defensive': this._drawDefensiveOverlay(W, H); break;
      case 'compactness': this._drawCompactnessOverlay(W, H); break;
    }
  }

  // ── PRESSING OVERLAY ──
  _computePressingState(W, H) {
    const pressingTeam = this.awayPlayers;
    const possessionTeam = this.homePlayers;
    const carrier = this._getBallCarrier(possessionTeam);
    if (!carrier) return null;
    const cIdx = this.players.indexOf(carrier);
    const ballPos = this._getPlayerDisplayPos(carrier, cIdx);
    const pw = W - this._pad * 2;
    const maxDist = pw * 0.3;

    const pressingPlayers = pressingTeam
      .filter(p => p.pos !== 'GK')
      .map(p => {
        const idx = this.players.indexOf(p);
        const pos = this._getPlayerDisplayPos(p, idx);
        const dx = ballPos.x - pos.x;
        const dy = ballPos.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pressure = Math.max(0, 100 - (dist / maxDist) * 100);
        const isActive = pressure > 15;
        const arrowLen = Math.min(dist * 0.35, (pressure / 100) * dist * 0.55);
        return {
          player: p, pos, pressure: Math.round(pressure), distance: Math.round(dist),
          isActive,
          arrowTarget: { x: pos.x + dx / (dist || 1) * arrowLen, y: pos.y + dy / (dist || 1) * arrowLen },
          angle: Math.atan2(dy, dx),
        };
      })
      .sort((a, b) => b.pressure - a.pressure);

    const active = pressingPlayers.filter(p => p.isActive);
    const avgPressure = pressingPlayers.reduce((s, p) => s + p.pressure, 0) / pressingPlayers.length || 0;

    // Trigger zone
    let tz = { x: ballPos.x, y: ballPos.y, radius: pw * 0.18, label: 'Mid Block' };
    if (active.length > 0) {
      const ax = active.reduce((s, p) => s + p.pos.x, 0) / active.length;
      const ay = active.reduce((s, p) => s + p.pos.y, 0) / active.length;
      const third = (ax - this._pad) / pw;
      tz = { x: ax, y: ay, radius: pw * 0.18, label: third > 0.6 ? 'High Press' : third > 0.3 ? 'Mid Block' : 'Low Block' };
    }

    // Pressing shape
    const frontActive = active.filter(p => ['ST','CF','LW','RW','SS','FW','CAM'].includes(p.player.pos));
    let shapeType = frontActive.length >= 3 ? 'front3' : frontActive.length >= 2 ? 'front2' : 'single';
    if (shapeType === 'single' && active.filter(p => ['CM','DM','MF','AM'].includes(p.player.pos)).length >= 2) {
      shapeType = 'midfieldTrap';
    }

    // Trap detection
    const trap = this._detectPressingTrap(active, ballPos, possessionTeam, W, H);

    const intensity = avgPressure > 55 ? 'Very High' : avgPressure > 38 ? 'High' : avgPressure > 22 ? 'Medium' : avgPressure > 10 ? 'Low' : 'Very Low';

    return {
      pressingTeam: 'away', ballCarrier: carrier, ballPos,
      intensity, intensityValue: Math.round(avgPressure),
      pressingPlayers, triggerZone: tz,
      shape: { type: shapeType },
      trap,
    };
  }

  _detectPressingTrap(activePressers, ballPos, possessionTeam, W, H) {
    const pw = W - this._pad * 2;
    const receivers = possessionTeam
      .filter(p => p.pos !== 'GK')
      .map(p => {
        const idx = this.players.indexOf(p);
        const pos = this._getPlayerDisplayPos(p, idx);
        const dx = pos.x - ballPos.x;
        const dy = pos.y - ballPos.y;
        return { player: p, pos, dist: Math.sqrt(dx * dx + dy * dy) };
      })
      .filter(r => r.dist < pw * 0.18);
    for (const receiver of receivers) {
      const nearby = activePressers.filter(p => {
        const dx = p.pos.x - receiver.pos.x;
        const dy = p.pos.y - receiver.pos.y;
        return Math.sqrt(dx * dx + dy * dy) < pw * 0.1 && p.pressure > 30;
      });
      if (nearby.length >= 2) {
        let trapType = 'central';
        const frac = (receiver.pos.x - this._pad) / pw;
        if (frac < 0.25 || frac > 0.75) trapType = 'wide';
        const touchlineDist = Math.min(receiver.pos.y - this._pad, this._pad + pw - receiver.pos.y);
        if (touchlineDist < pw * 0.15) trapType = 'sideline';
        return { detected: true, type: trapType, position: receiver.pos, annotation: 'Pressing Trap' };
      }
    }
    return null;
  }

  _drawPressingOverlay(W, H) {
    const ctx = this.ctx;
    const t = performance.now() / 1000;

    if (this._pressingDirty || this._selectionAnimating) {
      this._pressingState = this._computePressingState(W, H);
      this._pressingDirty = false;
    }

    const ps = this._pressingState;
    if (!ps || !ps.pressingPlayers.length) return;

    ctx.save();

    const active = ps.pressingPlayers.filter(p => p.isActive);
    const bcPos = ps.ballPos;

    // ── 1. Ball carrier highlight (who is getting pressed) ──
    if (bcPos) {
      const pulse = 0.7 + 0.3 * Math.sin(t * 3);
      const grad = ctx.createRadialGradient(bcPos.x, bcPos.y, 0, bcPos.x, bcPos.y, 50 * pulse);
      grad.addColorStop(0, `rgba(239,68,68,${0.35 * pulse})`);
      grad.addColorStop(0.5, `rgba(239,68,68,${0.18 * pulse})`);
      grad.addColorStop(1, 'rgba(239,68,68,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bcPos.x, bcPos.y, 50 * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(239,68,68,${0.6 * pulse})`;
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 5]);
      ctx.lineDashOffset = -t * 50;
      ctx.beginPath();
      ctx.arc(bcPos.x, bcPos.y, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ball carrier label
      const carrier = ps.ballCarrier;
      const label = carrier ? (carrier.name || '#' + carrier.number) : 'Ball carrier';
      ctx.fillStyle = `rgba(255,255,255,${0.6 + 0.2 * pulse})`;
      ctx.font = 'bold 10px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 6;
      ctx.fillText(label + '  ◉', bcPos.x, bcPos.y - 36);
      ctx.shadowBlur = 0;
    }

    // ── 2. Active pressers (who is pressing) ──
    active.forEach(p => {
      const int = p.pressure / 100;
      const radius = 14 + int * 30;
      const pulse = 0.85 + 0.15 * Math.sin(t * 2.5 + p.player.number * 0.3);
      const c = int > 0.7 ? '239,68,68' : int > 0.4 ? '251,146,60' : '251,191,36';

      // Solid outer ring for clear identification
      ctx.strokeStyle = `rgba(${c},${0.35 + int * 0.4})`;
      ctx.lineWidth = 1.5 + int * 1.5;
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, (radius + 4) * pulse, 0, Math.PI * 2);
      ctx.stroke();

      // Inner glow
      const alpha = 0.12 + int * 0.25;
      const grad = ctx.createRadialGradient(p.pos.x, p.pos.y, 0, p.pos.x, p.pos.y, radius * pulse);
      grad.addColorStop(0, `rgba(${c},${alpha * 1.5})`);
      grad.addColorStop(0.5, `rgba(${c},${alpha})`);
      grad.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    // ── 3. Pressing arrows (bolder, darker, solid animated dashes) ──
    const topP = active.slice(0, Math.min(5, Math.max(2, active.length)));
    topP.forEach(p => {
      const int = p.pressure / 100;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.strokeStyle = p.pressure > 70 ? '#DC2626' : p.pressure > 40 ? '#EA580C' : '#D97706';
      ctx.lineWidth = 2.5 + int * 2.5;
      ctx.globalAlpha = 0.65 + int * 0.35;
      ctx.setLineDash([6, 5]);
      ctx.lineDashOffset = -t * 100;
      const mx = (p.pos.x + p.arrowTarget.x) / 2;
      const my = (p.pos.y + p.arrowTarget.y) / 2;
      const ldx = p.arrowTarget.x - p.pos.x;
      const ldy = p.arrowTarget.y - p.pos.y;
      const len = Math.sqrt(ldx * ldx + ldy * ldy) || 1;
      const curve = Math.min(len * 0.08, 6);
      const nx = -ldy / len * curve;
      const ny = ldx / len * curve;
      ctx.beginPath();
      ctx.moveTo(p.pos.x, p.pos.y);
      ctx.quadraticCurveTo(mx + nx, my + ny, p.arrowTarget.x, p.arrowTarget.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.7 + int * 0.3;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      const aLen = 8 + int * 6;
      const aAng = Math.atan2(ldy, ldx);
      ctx.moveTo(p.arrowTarget.x, p.arrowTarget.y);
      ctx.lineTo(p.arrowTarget.x - aLen * Math.cos(aAng - 0.55), p.arrowTarget.y - aLen * Math.sin(aAng - 0.55));
      ctx.lineTo(p.arrowTarget.x - aLen * Math.cos(aAng + 0.55), p.arrowTarget.y - aLen * Math.sin(aAng + 0.55));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // ── 4. Intensity label ──
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = 'bold 8px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(
      ps.triggerZone.label + ' · ' + ps.shape.type.replace('front', 'Front ').replace('midfieldTrap', 'Midfield Trap'),
      W / 2, this._pad + 2
    );
    ctx.restore();

    // ── 5. Trap annotation ──
    if (ps.trap) {
      const pulse = 0.7 + 0.3 * Math.sin(t * 2);
      ctx.save();
      ctx.strokeStyle = `rgba(239,68,68,${0.4 * pulse})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -t * 40;
      ctx.beginPath();
      ctx.arc(ps.trap.position.x, ps.trap.position.y, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(239,68,68,${0.7 * pulse})`;
      ctx.font = 'bold 9px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('⚠ ' + ps.trap.annotation, ps.trap.position.x, ps.trap.position.y - 24);
      ctx.restore();
    }

    ctx.restore();
  }

  _drawAttackOverlay(W, H) {
    const ctx = this.ctx;
    const pad = this._pad;
    const thirdW = (W - pad * 2) / 3;
    const y = pad;
    const h = H - pad * 2;
    const t = performance.now() / 1000;

    const az = this._attackZoneDisplay;
    const leftPct = az.leftPct, centerPct = az.centerPct, rightPct = az.rightPct;
    const maxVal = Math.max(1, leftPct, centerPct, rightPct);
    const isDominantL = leftPct >= centerPct && leftPct >= rightPct;
    const isDominantC = centerPct >= leftPct && centerPct >= rightPct;
    const isDominantR = rightPct >= leftPct && rightPct >= centerPct;

    ctx.save();

    [
      { x: pad, w: thirdW, pct: leftPct, dominant: isDominantL },
      { x: pad + thirdW, w: thirdW, pct: centerPct, dominant: isDominantC },
      { x: pad + thirdW * 2, w: thirdW, pct: rightPct, dominant: isDominantR },
    ].forEach(z => {
      const intensity = Math.min(1, z.pct / maxVal);
      let alpha = 0.03 + intensity * 0.2;
      const baseColor = z.dominant ? '34,197,94' : '59,130,246';
      const grad = ctx.createLinearGradient(z.x, 0, z.x + z.w, 0);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.15, `rgba(${baseColor},${alpha * 0.4})`);
      grad.addColorStop(0.5, `rgba(${baseColor},${alpha})`);
      grad.addColorStop(0.85, `rgba(${baseColor},${alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(z.x, y, z.w, h);

      if (z.dominant && intensity > 0.5) {
        const glowA = 0.06 * (0.7 + 0.3 * Math.sin(t * 3));
        const glow = ctx.createRadialGradient(z.x + z.w / 2, y + h * 0.5, 0, z.x + z.w / 2, y + h * 0.5, h * 0.55);
        glow.addColorStop(0, `rgba(34,197,94,${glowA})`);
        glow.addColorStop(1, 'rgba(34,197,94,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(z.x - 4, y - 4, z.w + 8, h + 8);
      }
    });

    // Percentage labels (capped so they don't balloon on large pitches)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.max(10, Math.min(22, h * 0.14))}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 4;
    ctx.fillText(Math.round(leftPct) + '%', pad + thirdW / 2, y + h * 0.28);
    ctx.fillText(Math.round(centerPct) + '%', pad + thirdW * 1.5, y + h * 0.28);
    ctx.fillText(Math.round(rightPct) + '%', pad + thirdW * 2.5, y + h * 0.28);

    ctx.shadowBlur = 0;

    // Channel labels
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = `${Math.max(5, Math.min(11, h * 0.07))}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('L', pad + thirdW / 2, y + h - 2);
    ctx.fillText('C', pad + thirdW * 1.5, y + h - 2);
    ctx.fillText('R', pad + thirdW * 2.5, y + h - 2);

    // Team label
    if (this.scenario) {
      const home = this.scenario.home_team || 'Home';
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.font = `${Math.max(6, Math.min(13, h * 0.08))}px Inter, Arial, sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(home + ' ATTACK', pad + 2, pad + 2);
    }

    // Dominant channel label
    const pLabel = isDominantL ? 'L' : isDominantC ? 'C' : 'R';
    ctx.fillStyle = `rgba(34,197,94,0.35)`;
    ctx.font = `bold ${Math.max(6, Math.min(12, h * 0.08))}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('PRIMARY ' + pLabel, pad + 2, y + h - 2);

    ctx.restore();
  }

  setAttackZoneData(data) {
    const current = this._attackZoneDisplay;
    const target = {
      leftPct: data.leftPct, centerPct: data.centerPct, rightPct: data.rightPct,
    };
    if (this._attackZoneAnimId) {
      cancelAnimationFrame(this._attackZoneAnimId);
      this._attackZoneAnimId = null;
      current.leftPct = this._attackZoneAnimFrom.leftPct;
      current.centerPct = this._attackZoneAnimFrom.centerPct;
      current.rightPct = this._attackZoneAnimFrom.rightPct;
    }
    this._attackZoneAnimFrom = { ...current };
    this._attackZoneAnimTarget = target;
    this._attackZoneAnimStart = performance.now();
    this._attackZoneAnimDuration = 450;
    this._stepAttackZoneAnim();
  }

  _stepAttackZoneAnim() {
    const from = this._attackZoneAnimFrom;
    const to = this._attackZoneAnimTarget;
    const elapsed = performance.now() - this._attackZoneAnimStart;
    const raw = Math.min(1, elapsed / this._attackZoneAnimDuration);
    const eased = 1 - Math.pow(1 - raw, 3);

    this._attackZoneDisplay.leftPct = from.leftPct + (to.leftPct - from.leftPct) * eased;
    this._attackZoneDisplay.centerPct = from.centerPct + (to.centerPct - from.centerPct) * eased;
    this._attackZoneDisplay.rightPct = from.rightPct + (to.rightPct - from.rightPct) * eased;

    this._draw();

    if (raw < 1) {
      this._attackZoneAnimId = requestAnimationFrame(() => this._stepAttackZoneAnim());
    } else {
      this._attackZoneDisplay.leftPct = to.leftPct;
      this._attackZoneDisplay.centerPct = to.centerPct;
      this._attackZoneDisplay.rightPct = to.rightPct;
      this._attackZoneAnimId = null;
      this._draw();
    }
  }

  // ── Zone highlighting (for AI Insight sync) ──
  setHighlightedZones(zones) {
    this.highlightZones = zones || [];
    this._highlightZonesFade = 0;
    if (this._highlightZonesAnimId) {
      cancelAnimationFrame(this._highlightZonesAnimId);
      this._highlightZonesAnimId = null;
    }
    if (this.highlightZones.length === 0) { this._draw(); return; }
    this._stepHighlightFade();
  }

  clearHighlightedZones() {
    this.setHighlightedZones([]);
  }

  _stepHighlightFade() {
    this._highlightZonesFade = Math.min(1, this._highlightZonesFade + 0.04);
    this._draw();
    if (this._highlightZonesFade < 1) {
      this._highlightZonesAnimId = requestAnimationFrame(() => this._stepHighlightFade());
    } else {
      this._highlightZonesAnimId = null;
    }
  }

  _drawHighlights(W, H) {
    if (!this.highlightZones || this.highlightZones.length === 0) return;
    const ctx = this.ctx;
    const alpha = 0.08 * this._highlightZonesFade;
    const pulse = 0.7 + 0.3 * Math.sin(performance.now() / 1000 * 2);

    this.highlightZones.forEach(z => {
      const x = this._pad + z.x * (W - this._pad * 2);
      const y = this._pad + z.y * (H - this._pad * 2);
      const w = (z.w || 0.33) * (W - this._pad * 2);
      const h = (z.h || 1) * (H - this._pad * 2);

      ctx.save();
      ctx.fillStyle = `rgba(59,130,246,${alpha * pulse})`;
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = `rgba(59,130,246,${0.15 * this._highlightZonesFade})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);

      if (z.label) {
        ctx.fillStyle = `rgba(255,255,255,${0.5 * this._highlightZonesFade})`;
        ctx.font = '9px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(z.label, x + 4, y + h - 4);
      }

      ctx.restore();
    });
  }

  // ── PASSING LANES ──
  _getPlayerDisplayPos(p, idx) {
    if (this._targetPlayers && this._animT < 1 && p.team === 'home') {
      const preview = this._getPreviewPos(p, idx);
      return this._normToCoord({ ...p, _tx: preview._tx, _ty: preview._ty });
    }
    return this._normToCoord(p);
  }

  _getBallCarrier(teamPlayers) {
    if (this.ball.possession && teamPlayers.includes(this.ball.possession)) {
      return this.ball.possession;
    }
    if (this.ball.possessionTeam) {
      const team = this.ball.possessionTeam === 'home' ? this.homePlayers : this.awayPlayers;
      for (const p of team) {
        if (this.ball.possession && p.name === this.ball.possession.name) return p;
      }
    }
    const candidates = teamPlayers
      .filter(p => p.pos !== 'GK')
      .map(p => {
        const idx = this.players.indexOf(p);
        const pos = this._getPlayerDisplayPos(p, idx);
        const forwardScore = pos.x / (this._W || 1);
        const centralScore = 1 - Math.abs(pos.y - this._H / 2) / (this._H || 1);
        return { player: p, score: forwardScore * 0.5 + centralScore * 0.5 };
      })
      .sort((a, b) => b.score - a.score);
    return candidates.length ? candidates[0].player : null;
  }

  _distToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.sqrt((px - ax) ** 2 + (py - ay) ** 2);
    let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx, cy = ay + t * dy;
    return Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
  }

  _evaluatePass(passer, receiver, opponents, W, H, isHome) {
    const pIdx = this.players.indexOf(passer);
    const rIdx = this.players.indexOf(receiver);
    const passerPos = this._getPlayerDisplayPos(passer, pIdx);
    const receiverPos = this._getPlayerDisplayPos(receiver, rIdx);
    const dx = receiverPos.x - passerPos.x;
    const dy = receiverPos.y - passerPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pw = W - this._pad * 2;
    const ph = H - this._pad * 2;
    const pitchDiag = Math.sqrt(pw * pw + ph * ph);
    const normDist = dist / pitchDiag;

    if (dist < pw * 0.02) return null;

    const angle = Math.atan2(dy, dx);
    const forwardNorm = (isHome ? dx : -dx) / pw;
    const forwardScore = Math.max(0, Math.min(1, (forwardNorm + 0.3) / 0.6));

    const interceptR = pw * 0.045;
    let blocked = false;
    let closestDefDist = Infinity;
    let blockSeverity = 0;
    let defsBetween = 0;
    const defs = opponents.filter(p => p.pos !== 'GK');

    defs.forEach(def => {
      const dIdx = this.players.indexOf(def);
      const dPos = this._getPlayerDisplayPos(def, dIdx);
      const perpDist = this._distToSegment(dPos.x, dPos.y, passerPos.x, passerPos.y, receiverPos.x, receiverPos.y);
      const along = Math.max(0, Math.min(1, ((dPos.x - passerPos.x) * dx + (dPos.y - passerPos.y) * dy) / (dist * dist || 1)));

      if (perpDist < interceptR && along > 0.05 && along < 0.95) {
        blocked = true;
        blockSeverity += (1 - perpDist / interceptR) * (1 - Math.abs(along - 0.5) * 1.5);
        defsBetween++;
        closestDefDist = Math.min(closestDefDist, perpDist);
      }
    });

    const nearbyDefs = defs.filter(def => {
      const dIdx = this.players.indexOf(def);
      const dPos = this._getPlayerDisplayPos(def, dIdx);
      return Math.sqrt((dPos.x - receiverPos.x) ** 2 + (dPos.y - receiverPos.y) ** 2) < pw * 0.12;
    }).length;
    const spaceScore = Math.max(0, 1 - nearbyDefs / 4);

    const obstructionScore = blocked ? Math.max(0, 1 - Math.min(1, blockSeverity)) : 1;
    const distScore = Math.max(0, 1 - normDist / 0.6);
    const rawConfidence = forwardScore * 25 + distScore * 25 + obstructionScore * 30 + spaceScore * 20;
    const confidence = Math.round(Math.max(0, Math.min(100, rawConfidence)));

    let category = 'blocked';
    if (!blocked && confidence >= 60) category = 'safe';
    else if (!blocked && confidence >= 30) category = 'risky';

    return {
      passer, receiver, passerPos, receiverPos,
      dist, angle, forwardNorm, blocked, confidence, category,
      defsBetween, spaceScore,
      completionPct: blocked ? Math.round(15 + confidence * 0.3) : Math.round(60 + confidence * 0.35),
      pressure: confidence >= 65 ? 'Low' : confidence >= 40 ? 'Medium' : 'High',
    };
  }

  _computePassingGraph(W, H) {
    const pw = W - this._pad * 2;

    // Determine ball carrier and team
    let carrier = null;
    let isHomePossession = true;

    if (this._selectedPlayer) {
      carrier = this._selectedPlayer;
      isHomePossession = carrier.team === 'home';
    } else if (this.ball.possession) {
      carrier = this.ball.possession;
      isHomePossession = carrier.team === 'home';
    } else {
      const guessTeam = this.ball.possessionTeam || 'home';
      const team = guessTeam === 'home' ? this.homePlayers : this.awayPlayers;
      carrier = this._getBallCarrier(team);
      isHomePossession = guessTeam === 'home';
    }

    if (!carrier) return null;
    const cIdx = this.players.indexOf(carrier);

    const teammates = (isHomePossession ? this.homePlayers : this.awayPlayers)
      .filter(p => p !== carrier && p.pos !== 'GK');
    const opponents = (isHomePossession ? this.awayPlayers : this.homePlayers)
      .filter(p => p.pos !== 'GK');

    const carrierPos = this._getPlayerDisplayPos(carrier, cIdx);
    const maxRange = pw * 0.55;

    const edges = [];
    for (const rec of teammates) {
      const recIdx = this.players.indexOf(rec);
      const recPos = this._getPlayerDisplayPos(rec, recIdx);
      const dx = recPos.x - carrierPos.x;
      const dy = recPos.y - carrierPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > maxRange || dist < pw * 0.02) continue;

      const result = this._evaluatePass(carrier, rec, opponents, W, H, isHomePossession);
      if (result) edges.push(result);
    }

    edges.sort((a, b) => b.confidence - a.confidence);

    const blocked = edges.filter(e => e.blocked).slice(0, 2);
    const safeRisky = edges.filter(e => !e.blocked).slice(0, 5);
    const displayEdges = [...safeRisky, ...blocked];

    return { edges: displayEdges, carrier, carrierPos, isHome: isHomePossession };
  }

  _drawBallCarrierIndicator(p, ctx, t) {
    const idx = this.players.indexOf(p);
    const pos = this._getPlayerDisplayPos(p, idx);
    const pulse = 0.6 + 0.4 * Math.sin(t * 4);
    const isHome = p.team === 'home';
    const color = isHome ? '59,130,246' : '139,245,90';

    ctx.save();

    // Glow beneath player
    const grad = ctx.createRadialGradient(pos.x, pos.y, this._playerR * 0.3, pos.x, pos.y, this._playerR * 2.5);
    grad.addColorStop(0, `rgba(${color},${0.15 * pulse})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this._playerR * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Outer pulsing ring (bright)
    ctx.strokeStyle = `rgba(${color},${0.5 * pulse})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this._playerR + 5, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary ring
    ctx.strokeStyle = `rgba(255,255,255,${0.2 * pulse})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this._playerR + 10, 0, Math.PI * 2);
    ctx.stroke();

    // "BALL" label above
    ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.3 * pulse})`;
    ctx.font = 'bold 6px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('● BALL', pos.x, pos.y - this._playerR - 12);

    ctx.restore();
  }

  _drawPassOption(edge, ctx, t, W, H, fadeAlpha) {
    const alpha = fadeAlpha !== undefined ? fadeAlpha : 1;
    ctx.save();
    ctx.lineCap = 'round';

    const mx = (edge.passerPos.x + edge.receiverPos.x) / 2;
    const my = (edge.passerPos.y + edge.receiverPos.y) / 2;
    const dx = edge.receiverPos.x - edge.passerPos.x;
    const dy = edge.receiverPos.y - edge.passerPos.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const curve = Math.min(len * 0.08, 8);
    const nx = -dy / len * curve;
    const ny = dx / len * curve;

    let color, dashPattern, lineWidth, baseAlpha;
    if (edge.blocked) {
      color = '#EF4444'; dashPattern = [3, 5]; lineWidth = 0.8; baseAlpha = 0.35;
    } else if (edge.category === 'safe') {
      color = '#22C55E'; dashPattern = []; lineWidth = 1.2; baseAlpha = 0.65;
    } else {
      color = '#F59E0B'; dashPattern = [5, 4]; lineWidth = 0.8; baseAlpha = 0.5;
    }

    ctx.globalAlpha = baseAlpha * alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(dashPattern);
    ctx.lineDashOffset = -t * 35;

    ctx.beginPath();
    ctx.moveTo(edge.passerPos.x, edge.passerPos.y);
    ctx.quadraticCurveTo(mx + nx, my + ny, edge.receiverPos.x, edge.receiverPos.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Blocked indicator: X mark at midpoint
    if (edge.blocked) {
      ctx.globalAlpha = 0.6 * alpha;
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 1.0;
      const xSize = 5;
      ctx.beginPath();
      ctx.moveTo(mx - xSize, my - xSize);
      ctx.lineTo(mx + xSize, my + xSize);
      ctx.moveTo(mx + xSize, my - xSize);
      ctx.lineTo(mx - xSize, my + xSize);
      ctx.stroke();
    }

    // Confidence label on hover
    if (this._passingHover === edge) {
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(edge.passerPos.x, edge.passerPos.y);
      ctx.quadraticCurveTo(mx + nx, my + ny, edge.receiverPos.x, edge.receiverPos.y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      const label = `${edge.confidence}% · ${edge.pressure}`;
      ctx.font = 'bold 9px Inter, Arial, sans-serif';
      const tw = ctx.measureText(label).width;
      const lx = mx + nx * 1.5;
      const ly = my + ny * 1.5;
      ctx.fillRect(lx - tw / 2 - 4, ly - 8, tw + 8, 16);
      ctx.fillStyle = edge.category === 'safe' ? '#22C55E' : edge.category === 'risky' ? '#F59E0B' : '#EF4444';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, lx, ly);
    }

    ctx.restore();
  }

  _drawPassingOverlay(W, H) {
    const ctx = this.ctx;
    const t = performance.now() / 1000;

    // Handle fade transitions
    if (this._passingDirty) {
      if (this._passingGraph && this._passingGraph.edges.length) {
        this._passingPrevGraph = this._passingGraph;
        this._passingFadeStart = performance.now();
      }
      this._passingGraph = this._computePassingGraph(W, H);
      this._passingDirty = false;
    }

    const graph = this._passingGraph;
    if (!graph || !graph.edges.length) {
      if (!this._passingPrevGraph) return;
      this._passingPrevGraph = null;
      this._draw();
      return;
    }

    const fadeDur = 300;
    let fadeAlpha = 1;
    if (this._passingPrevGraph && this._passingFadeStart) {
      const elapsed = performance.now() - this._passingFadeStart;
      fadeAlpha = Math.max(0, 1 - elapsed / fadeDur);
      if (elapsed >= fadeDur) {
        this._passingPrevGraph = null;
        this._passingFadeStart = 0;
      }
    }

    ctx.save();

    // Draw previous graph fading out
    if (this._passingPrevGraph && fadeAlpha > 0.01) {
      ctx.globalAlpha = fadeAlpha;
      this._passingPrevGraph.edges.forEach(edge => {
        this._drawPassOption(edge, ctx, t, W, H, fadeAlpha);
      });
    }

    // Draw current graph
    ctx.globalAlpha = 1;
    graph.edges.forEach(edge => {
      this._drawPassOption(edge, ctx, t, W, H, 1);
    });

    // Ball carrier indicator
    if (graph.carrier) {
      this._drawBallCarrierIndicator(graph.carrier, ctx, t);
    }

    // Legend
    const legendY = this._pad + 2;
    const legendX = W - this._pad - 160;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = '6px Inter, Arial, sans-serif';

    const legendItems = [
      { label: 'Safe', color: '#22C55E', alpha: 0.65 },
      { label: 'Risky', color: '#F59E0B', alpha: 0.5 },
      { label: 'Blocked', color: '#EF4444', alpha: 0.2 },
    ];
    legendItems.forEach((item, i) => {
      const lx = legendX + i * 48;
      ctx.globalAlpha = item.alpha;
      ctx.fillStyle = item.color;
      ctx.fillRect(lx, legendY, 10, 3);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(item.label, lx + 13, legendY - 1);
    });

    ctx.restore();
  }

  // ── DEFENSIVE BLOCK (fully data-driven) ──
  _drawDefensiveOverlay(W, H) {
    const ctx = this.ctx;
    const state = this._computeDefensiveState(W, H);
    if (!state) return;

    ctx.save();

    // 1. Translucent convex hull of defending players
    this._drawDefBlockPolygon(ctx, state);

    // 2. Defensive line (vertical guideline at back-line depth)
    this._drawDefLine(ctx, state, W, H);

    // 3. Minimal label: block height + compact
    this._drawDefBlockLabel(ctx, state, W, H);

    ctx.restore();
  }

  _detectDefendingTeam() {
    if (this.ball.possessionTeam) {
      return this.ball.possessionTeam === 'home' ? 'away' : 'home';
    }
    const homeAvg = this.homePlayers.reduce((s, p) => s + p._tx, 0) / this.homePlayers.length;
    const awayAvg = this.awayPlayers.reduce((s, p) => s + (1 - p._tx), 0) / this.awayPlayers.length;
    return homeAvg < awayAvg ? 'home' : 'away';
  }

  _cross(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  }

  _convexHull(points) {
    if (points.length < 3) return points;
    const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
    const lower = [];
    for (const p of sorted) {
      while (lower.length >= 2 && this._cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
        lower.pop();
      lower.push(p);
    }
    const upper = [];
    for (let i = sorted.length - 1; i >= 0; i--) {
      const p = sorted[i];
      while (upper.length >= 2 && this._cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
        upper.pop();
      upper.push(p);
    }
    lower.pop();
    upper.pop();
    return lower.concat(upper);
  }

  _computeDefensiveState(W, H) {
    const defendingTeam = this._detectDefendingTeam();
    const players = defendingTeam === 'home' ? this.homePlayers : this.awayPlayers;
    const outfield = players.filter(p => p.pos !== 'GK');
    if (outfield.length < 2) return null;

    const pw = W - this._pad * 2;
    const ph = H - this._pad * 2;
    const isHome = defendingTeam === 'home';

    const pts = outfield.map(p => {
      const idx = this.players.indexOf(p);
      return this._getPlayerDisplayPos(p, idx);
    });

    // Convex hull of all outfield players
    const hull = this._convexHull(pts);

    // Defensive line: average x of the deepest 3-4 players
    const sortedByX = [...pts].sort((a, b) => isHome ? a.x - b.x : b.x - a.x);
    const backCount = Math.min(4, Math.max(2, Math.floor(outfield.length * 0.4)));
    const backPlayers = sortedByX.slice(0, backCount);
    const defLineX = backPlayers.reduce((s, p) => s + p.x, 0) / backCount;

    // Width: y-spread normalized to pitch height
    const yVals = pts.map(p => p.y);
    const yMin = Math.min(...yVals);
    const yMax = Math.max(...yVals);
    const widthNorm = (yMax - yMin) / ph;
    const widthLabel =
      widthNorm < 0.25 ? 'Very Narrow' :
      widthNorm < 0.35 ? 'Narrow' :
      widthNorm < 0.50 ? 'Balanced' :
      widthNorm < 0.65 ? 'Wide' :
      'Very Wide';

    // Depth: how far def line is from own goal (0 = on goal line)
    const normDefLineX = (defLineX - this._pad) / pw;
    const depthFromGoal = isHome ? normDefLineX : 1 - normDefLineX;
    const blockHeightLabel =
      depthFromGoal < 0.18 ? 'Low Block' :
      depthFromGoal < 0.35 ? 'Mid Block' :
      'High Block';

    // Compactness: average pairwise distance / pitch diagonal
    let totalDist = 0, count = 0;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        totalDist += Math.sqrt(dx * dx + dy * dy);
        count++;
      }
    }
    const avgDist = count > 0 ? totalDist / count : 0;
    const maxDist = Math.sqrt(pw * pw + ph * ph);
    const compactness = avgDist / maxDist;
    const compactLabel =
      compactness < 0.12 ? 'Very Compact' :
      compactness < 0.18 ? 'Compact' :
      compactness < 0.26 ? 'Balanced' :
      compactness < 0.35 ? 'Stretched' :
      'Very Stretched';

    return {
      team: defendingTeam, isHome, hull, defLineX,
      widthNorm, widthLabel,
      blockHeightLabel,
      compactLabel, compactness,
    };
  }

  _drawDefBlockPolygon(ctx, state) {
    const { hull } = state;
    if (!hull || hull.length < 3) return;

    const color = state.isHome ? '59,130,246' : '34,197,94';

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(hull[0].x, hull[0].y);
    for (let i = 1; i < hull.length; i++) {
      ctx.lineTo(hull[i].x, hull[i].y);
    }
    ctx.closePath();

    // Blurred inner glow for smooth tactical feel
    ctx.filter = 'blur(6px)';
    ctx.fillStyle = `rgba(${color},0.14)`;
    ctx.fill();
    ctx.filter = 'none';

    // Solid fill layer
    ctx.fillStyle = `rgba(${color},0.08)`;
    ctx.fill();

    ctx.strokeStyle = `rgba(${color},0.60)`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();
  }

  _drawDefLine(ctx, state, W, H) {
    const color = state.isHome ? '59,130,246' : '34,197,94';
    const pulse = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(performance.now() * 0.002));

    ctx.save();
    ctx.strokeStyle = `rgba(${color},${0.5 * pulse})`;
    ctx.lineWidth = 2.0;
    ctx.setLineDash([6, 4]);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(state.defLineX, this._pad);
    ctx.lineTo(state.defLineX, H - this._pad);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  _drawDefBlockLabel(ctx, state) {
    ctx.save();
    const labelX = state.defLineX + 8;
    const labelY = this._pad + 18;

    ctx.fillStyle = 'rgba(0,0,0,0.40)';
    ctx.beginPath();
    ctx.roundRect(labelX - 2, labelY - 2, 82, 24, 3);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 8px Inter, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(state.blockHeightLabel, labelX, labelY);

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '6px Inter, Arial, sans-serif';
    ctx.fillText(state.compactLabel + ' · ' + state.widthLabel, labelX, labelY + 11);

    ctx.restore();
  }

  // ── PITCH CONTROL (Voronoi-style territorial map) ──
  _drawPitchControlOverlay(W, H) {
    const ctx = this.ctx;
    const pw = W - this._pad * 2;
    const ph = H - this._pad * 2;
    const gridW = 100, gridH = 64;
    const cellW = pw / gridW, cellH = ph / gridH;

    if (!this._pitchControlHomeRatio) {
      this._pitchControlHomeRatio = new Float32Array(gridW * gridH);
      this._pitchControlDisplay = new Float32Array(gridW * gridH);
    }

    if (this._pitchControlDirty || (++this._pitchControlTick & 7) === 0) {
      this._computeControlGrid(gridW, gridH, cellW, cellH);
      this._pitchControlDirty = false;
    }

    const rate = 0.08;
    const display = this._pitchControlDisplay;
    const target = this._pitchControlHomeRatio;
    for (let i = 0; i < display.length; i++) {
      display[i] += (target[i] - display[i]) * rate;
    }

    this._renderControlTerritory(ctx, display, gridW, gridH, cellW, cellH);
  }

  _computeControlGrid(gridW, gridH, cellW, cellH) {
    const roleWeight = {
      GK: 0.3, CB: 1.0, DF: 1.0, LB: 0.85, RB: 0.85, WB: 0.8,
      DM: 1.0, CM: 0.9, LM: 0.8, RM: 0.8,
      AM: 0.8, LW: 0.7, RW: 0.7,
      ST: 0.6, CF: 0.7, FW: 0.6, SS: 0.7,
    };

    const homePts = this.homePlayers.map(p => {
      const idx = this.players.indexOf(p);
      return { pos: this._getPlayerDisplayPos(p, idx), w: roleWeight[p.pos] || 0.8 };
    });
    const awayPts = this.awayPlayers.map(p => {
      const idx = this.players.indexOf(p);
      return { pos: this._getPlayerDisplayPos(p, idx), w: roleWeight[p.pos] || 0.8 };
    });

    const pitchDiag = Math.sqrt((cellW * gridW) ** 2 + (cellH * gridH) ** 2);
    const sigma = pitchDiag * 0.14;

    for (let gy = 0; gy < gridH; gy++) {
      const cy = this._pad + (gy + 0.5) * cellH;
      for (let gx = 0; gx < gridW; gx++) {
        const cx = this._pad + (gx + 0.5) * cellW;
        let homeInf = 0, awayInf = 0;

        for (const { pos, w } of homePts) {
          const dx = cx - pos.x, dy = cy - pos.y;
          homeInf += w * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        }
        for (const { pos, w } of awayPts) {
          const dx = cx - pos.x, dy = cy - pos.y;
          awayInf += w * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        }

        const total = homeInf + awayInf;
        this._pitchControlHomeRatio[gy * gridW + gx] = total > 0.001 ? homeInf / total : 0.5;
      }
    }
  }

  _renderControlTerritory(ctx, display, gridW, gridH, cellW, cellH) {
    const off = document.createElement('canvas');
    off.width = gridW;
    off.height = gridH;
    const offCtx = off.getContext('2d');
    const imgData = offCtx.createImageData(gridW, gridH);
    const d = imgData.data;

    // Smooth colors: home=blue(59,130,246), away=orange(249,115,22)
    const hR = 59, hG = 130, hB = 246;
    const aR = 249, aG = 115, aB = 22;

    for (let gy = 0; gy < gridH; gy++) {
      for (let gx = 0; gx < gridW; gx++) {
        const idx = (gy * gridW + gx) * 4;
        const ratio = display[gy * gridW + gx];

        // Blend color smoothly based on ratio
        const blend = Math.max(0, Math.min(1, (ratio - 0.5) * 2 + 0.5));
        d[idx] = Math.round(hR + (aR - hR) * (1 - blend));
        d[idx + 1] = Math.round(hG + (aG - hG) * (1 - blend));
        d[idx + 2] = Math.round(hB + (aB - hB) * (1 - blend));

        // Contested areas (40-60%): show as neutral/amber with higher alpha
        const isContested = ratio > 0.4 && ratio < 0.6;
        if (isContested) {
          const contestedStrength = 1 - Math.abs(ratio - 0.5) * 10;
          d[idx] = Math.round(d[idx] * (1 - contestedStrength * 0.4) + 200 * contestedStrength * 0.4);
          d[idx + 1] = Math.round(d[idx + 1] * (1 - contestedStrength * 0.4) + 170 * contestedStrength * 0.4);
          d[idx + 2] = Math.round(d[idx + 2] * (1 - contestedStrength * 0.4) + 50 * contestedStrength * 0.4);
        }

        const strength = Math.abs(ratio - 0.5) * 2;
        const alpha = 0.08 + strength * 0.28;
        d[idx + 3] = Math.round(Math.min(1, alpha + (isContested ? 0.06 : 0)) * 255);
      }
    }

    offCtx.putImageData(imgData, 0, 0);

    // Apply a gentle blur to remove geometric artifacts
    const blurCanvas = document.createElement('canvas');
    blurCanvas.width = gridW;
    blurCanvas.height = gridH;
    const blurCtx = blurCanvas.getContext('2d');
    blurCtx.filter = 'blur(1px)';
    blurCtx.drawImage(off, 0, 0);

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(blurCanvas, this._pad, this._pad, cellW * gridW, cellH * gridH);
    ctx.restore();
  }

  _drawCompactnessOverlay(W, H) {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineCap = 'round';

    const drawConns = (players, color) => {
      const outfield = players.filter(p => p.pos !== 'GK');
      if (outfield.length < 2) return;
      const pts = outfield.map(p => this._normToCoord(p));

      for (let i = 0; i < pts.length; i++) {
        const dists = pts.map((c, j) => ({
          idx: j,
          dist: Math.sqrt((pts[i].x - c.x) ** 2 + (pts[i].y - c.y) ** 2)
        }));
        dists.sort((a, b) => a.dist - b.dist);
        for (let k = 1; k <= Math.min(2, dists.length - 1); k++) {
          const j = dists[k].idx;
          if (j > i) {
            const maxDist = W * 0.25;
            const frac = Math.max(0, 1 - dists[k].dist / maxDist);
            const opacity = frac * 0.25;
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5 + frac * 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    };

    drawConns(this.homePlayers, '#3B82F6');
    drawConns(this.awayPlayers, '#8BF55A');

    ctx.restore();
  }

  _drawEventHighlight(W, H) {
    const eh = this._eventHighlight;
    if (!eh) return;
    const ctx = this.ctx;
    const elapsed = (performance.now() - eh.startTime) / 1000;
    const fadeIn = Math.min(1, elapsed / 0.25);
    const pulse = 0.7 + 0.3 * Math.sin(elapsed * 5);

    ctx.save();

    // 1. Zone highlight — radial gradient at player's position
    const zoneR = Math.min(W, H) * 0.12;
    const zColor = eh.isHome ? '59,130,246' : '139,245,90';
    const zGrad = ctx.createRadialGradient(eh.coord.x, eh.coord.y, 0, eh.coord.x, eh.coord.y, zoneR);
    zGrad.addColorStop(0, `rgba(${zColor},${0.12 * fadeIn})`);
    zGrad.addColorStop(0.5, `rgba(${zColor},${0.06 * fadeIn})`);
    zGrad.addColorStop(1, `rgba(${zColor},0)`);
    ctx.fillStyle = zGrad;
    ctx.beginPath();
    ctx.arc(eh.coord.x, eh.coord.y, zoneR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Player glow ring
    const glowR = this._playerR * 1.6;
    const gGrad = ctx.createRadialGradient(eh.coord.x, eh.coord.y, this._playerR * 0.5, eh.coord.x, eh.coord.y, glowR);
    gGrad.addColorStop(0, `rgba(${zColor},${0.35 * fadeIn * pulse})`);
    gGrad.addColorStop(0.5, `rgba(${zColor},${0.12 * fadeIn * pulse})`);
    gGrad.addColorStop(1, `rgba(${zColor},0)`);
    ctx.fillStyle = gGrad;
    ctx.beginPath();
    ctx.arc(eh.coord.x, eh.coord.y, glowR, 0, Math.PI * 2);
    ctx.fill();

    // 3. Arrow / passing lane indicator
    if (eh.arrowTarget && (eh.event.type === 'goal' || eh.event.type === 'shot' || eh.event.type === 'substitution')) {
      const arrowAlpha = 0.35 * fadeIn * (0.6 + 0.4 * Math.sin(elapsed * 3));
      ctx.strokeStyle = `rgba(255,255,255,${arrowAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      ctx.setLineDash([5, 6]);
      ctx.lineDashOffset = -elapsed * 35;
      ctx.beginPath();
      const dx = eh.arrowTarget.x - eh.coord.x;
      const dy = eh.arrowTarget.y - eh.coord.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > 5) {
        const nx = dx / len;
        const ny = dy / len;
        ctx.moveTo(eh.coord.x + nx * this._playerR, eh.coord.y + ny * this._playerR);
        ctx.lineTo(eh.coord.x + nx * Math.max(len * 0.6, 30), eh.coord.y + ny * Math.max(len * 0.6, 30));
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = `rgba(255,255,255,${0.45 * fadeIn * pulse})`;
        ctx.beginPath();
        ctx.moveTo(eh.coord.x + nx * Math.max(len * 0.6, 30), eh.coord.y + ny * Math.max(len * 0.6, 30));
        ctx.lineTo(eh.coord.x + nx * Math.max(len * 0.6, 30) - 6 * Math.cos(Math.atan2(ny, nx) - 0.45),
                   eh.coord.y + ny * Math.max(len * 0.6, 30) - 6 * Math.sin(Math.atan2(ny, nx) - 0.45));
        ctx.lineTo(eh.coord.x + nx * Math.max(len * 0.6, 30) - 6 * Math.cos(Math.atan2(ny, nx) + 0.45),
                   eh.coord.y + ny * Math.max(len * 0.6, 30) - 6 * Math.sin(Math.atan2(ny, nx) + 0.45));
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // -- Players --
  _drawPlayers(W, H) {
    const bobAmp = 1.2;
    const bt = this._bobTime;
    const overlaps = {};
    if (this.displayMode === 'live') {
      const positions = [];
      this.players.forEach((p, idx) => {
        const preview = this._getPreviewPos(p, idx);
        const drawP = { ...p, _tx: preview._tx, _ty: preview._ty };
        const pos = this._normToCoord(drawP);
        pos.x += Math.sin(bt * 1.7 + idx * 2.1) * bobAmp;
        pos.y += Math.cos(bt * 1.3 + idx * 1.7) * bobAmp * 0.7;
        positions.push({ idx, pos, drawP });
      });
      const threshold = this._playerR * 2.2;
      positions.forEach((a, i) => {
        let count = 0;
        positions.forEach((b, j) => {
          if (i === j) return;
          const dist = Math.sqrt((a.pos.x - b.pos.x) ** 2 + (a.pos.y - b.pos.y) ** 2);
          if (dist < threshold) count++;
        });
        overlaps[i] = Math.max(0.35, 1 - count * 0.15);
      });
      positions.forEach(({ idx, drawP }) => {
        const baseAlpha = overlaps[idx];
        const subAlpha = this._playerAlphas[idx] !== undefined ? this._playerAlphas[idx] : 1;
        this._drawPlayer(drawP, W, H, idx, baseAlpha * subAlpha);
      });
    } else {
      this.players.forEach((p, idx) => {
        const preview = this._getPreviewPos(p, idx);
        const drawP = { ...p, _tx: preview._tx, _ty: preview._ty };
        const subAlpha = this._playerAlphas[idx] !== undefined ? this._playerAlphas[idx] : 1;
        const bpx = Math.sin(bt * 1.7 + idx * 2.1) * bobAmp;
        const bpy = Math.cos(bt * 1.3 + idx * 1.7) * bobAmp * 0.7;
        if (subAlpha > 0.01) {
          this._drawPlayer(drawP, W, H, idx, subAlpha, bpx, bpy);
        }
      });
    }
    if (this.displayMode !== 'live') {
      this._drawWideLabels(W, H);
    }
    if (this.displayMode === 'live') {
      this._drawLiveLabel(W, H);
    }
  }

  _drawPlayer(p, W, H, idx, alpha, bpx, bpy) {
    const ctx = this.ctx;
    const pos = this._normToCoord(p);
    if (bpx !== undefined) { pos.x += bpx; pos.y += (bpy || 0); }
    const r = this._playerR;
    const isHome = p.team === 'home';
    const isGK = p.pos === 'GK';
    const isHovered = this.hovered === p;

    ctx.save();
    ctx.globalAlpha = alpha;

    if (isHovered) {
      ctx.shadowColor = isHome ? '#3B82F6' : '#8BF55A';
      ctx.shadowBlur = 20;
      if (this._playerAlphas[idx] === undefined) {
        ctx.globalAlpha = 1;
      }
    }

    const fatiguePct = (p.fatigue || 50) / 100;
    const fColor = fatiguePct > 0.6 ? '#EF4444' : fatiguePct > 0.35 ? '#F59E0B' : '#22C55E';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = isHovered ? (isHome ? '#3B82F6' : '#8BF55A') : fColor;
    ctx.lineWidth = isHovered ? 2.5 : 1.5;
    ctx.stroke();

    const fill = isHome ? '#3B82F6' : '#E8853A';
    const border = isHome ? '#60A5FA' : '#F59E0B';
    const gkFill = isHome ? '#1D4ED8' : '#C2410C';
    const gkBorder = isHome ? '#3B82F6' : '#EA580C';

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isGK ? gkFill : fill;
    ctx.fill();
    ctx.strokeStyle = isGK ? gkBorder : border;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${r * 0.9}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(p.number || ''), pos.x, pos.y + 1);

    ctx.restore();
  }

  _drawWideLabels(W, H) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.font = '7px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    const home = this.scenario.home_team || 'HOME';
    const away = this.scenario.away_team || 'AWAY';
    const homeFmt = this.scenario.home_formation || '';
    const awayFmt = this.scenario.away_formation || '';
    ctx.fillText(home + ' ' + homeFmt, this._pad + (W - this._pad * 2) * 0.23, this._pad + 12);
    ctx.fillText(away + ' ' + awayFmt, W - this._pad - (W - this._pad * 2) * 0.23, this._pad + 12);
    ctx.restore();
  }

  _drawLiveLabel(W, H) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '7px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE POSITIONS — raw event coordinates', W / 2, H - this._pad + 10);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.font = '6px Inter, Arial, sans-serif';
    ctx.fillText('Overlapping players shown with reduced opacity', W / 2, H - this._pad + 18);
    ctx.restore();
  }

  // -- Hit testing --
  _hitTest(mx, my) {
    for (let i = this.players.length - 1; i >= 0; i--) {
      const p = this.players[i];
      const preview = this._getPreviewPos(p, i);
      const drawP = { ...p, _tx: preview._tx, _ty: preview._ty };
      const pos = this._normToCoord(drawP);
      const dist = Math.sqrt((mx - pos.x) ** 2 + (my - pos.y) ** 2);
      if (dist <= this._playerR + 5) return p;
    }
    return null;
  }

  _onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const hit = this._hitTest(mx, my);
    if (hit !== this.hovered) {
      this.hovered = hit;
      this._draw();
      if (hit && this.onPlayerHover) {
        let pCtx = null;
        if (this.overlayMode === 'pressing' && this._pressingState) {
          pCtx = this._pressingState.pressingPlayers.find(p => p.player === hit) || null;
        }
        this.onPlayerHover(hit, e.clientX, e.clientY, pCtx);
      } else if (!hit && this.onPlayerLeave) this.onPlayerLeave();
    }

    // Passing lane hover detection
    if (this.overlayMode === 'passing' && this._passingGraph && this._passingGraph.edges.length) {
      const hoverThreshold = 8;
      let hoveredEdge = null;
      for (const edge of this._passingGraph.edges) {
        if (edge.blocked) continue;
        const d = this._distToSegment(mx, my, edge.passerPos.x, edge.passerPos.y,
          edge.receiverPos.x, edge.receiverPos.y);
        if (d < hoverThreshold) { hoveredEdge = edge; break; }
      }
      if (hoveredEdge !== this._passingHover) {
        this._passingHover = hoveredEdge;
        this._draw();
        if (hoveredEdge && this.onPassingHover) {
          this.onPassingHover(hoveredEdge, e.clientX, e.clientY);
        } else if (!hoveredEdge && this.onPassingHover) {
          this.onPassingHover(null, e.clientX, e.clientY);
        }
      }
    } else if (this._passingHover) {
      this._passingHover = null;
    }
  }

  _onMouseLeave() {
    if (this.hovered) {
      this.hovered = null;
      this._draw();
      if (this.onPlayerLeave) this.onPlayerLeave();
    }
    if (this._passingHover) {
      this._passingHover = null;
      this._draw();
      if (this.onPassingHover) this.onPassingHover(null, 0, 0);
    }
  }

  _onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const hit = this._hitTest(mx, my);
    if (hit) {
      if (this._selectedPlayer === hit) {
        this._selectedPlayer = null;
        this._stopSelectionAnim();
      } else {
        this._selectedPlayer = hit;
        this._startSelectionAnim();
      }
      this._passingDirty = true;
      if (this.overlayMode === 'passing') this._draw();
      if (this.onPlayerSelect) this.onPlayerSelect(this._selectedPlayer);
    } else {
      if (this._selectedPlayer) {
        this._selectedPlayer = null;
        this._stopSelectionAnim();
        this._passingDirty = true;
        if (this.overlayMode === 'passing') this._draw();
        if (this.onPlayerSelect) this.onPlayerSelect(null);
      }
    }
  }

  _startSelectionAnim() {
    if (this._selectionAnimId) return;
    const tick = () => {
      if (!this._selectedPlayer) { this._selectionAnimId = null; return; }
      if (this._selectionAnimating) { this._selectionAnimId = requestAnimationFrame(tick); return; }
      this._draw();
      this._selectionAnimId = requestAnimationFrame(tick);
    };
    this._selectionAnimId = requestAnimationFrame(tick);
  }

  _stopSelectionAnim() {
    if (this._selectionAnimId) {
      cancelAnimationFrame(this._selectionAnimId);
      this._selectionAnimId = null;
    }
  }

  destroy() {
    this._selectionAnimating = false;
    if (this._selectionAnimId) {
      cancelAnimationFrame(this._selectionAnimId);
      this._selectionAnimId = null;
    }
    if (this._attackZoneAnimId) {
      cancelAnimationFrame(this._attackZoneAnimId);
      this._attackZoneAnimId = null;
    }
    if (this._highlightZonesAnimId) {
      cancelAnimationFrame(this._highlightZonesAnimId);
      this._highlightZonesAnimId = null;
    }
    this.canvas.remove();
    this.players = [];
  }
}

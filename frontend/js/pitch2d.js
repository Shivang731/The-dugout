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
    this._dpr = Math.min(window.devicePixelRatio || 1, 2);

    this._W = 0;
    this._H = 0;
    this._pad = 14;
    this._playerR = 16;

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
    const homeFmt = _fmtToKey(this.scenario.home_formation || '4-3-3');
    const awayFmt = _fmtToKey(this.scenario.away_formation || '4-3-3');

    const rawHome = homePlayers.map(p => ({ ...p, team: 'home', _ox: p.x, _oy: p.y }));
    const rawAway = awayPlayers.map(p => ({ ...p, team: 'away', _ox: p.x, _oy: p.y }));

    this.homePlayers = _assignFormationPositions(homeFmt, rawHome, true);
    this.awayPlayers = _assignFormationPositions(awayFmt, rawAway, false);
    this.players = [...this.homePlayers, ...this.awayPlayers];
    this._computeMomentum();
    this._draw();
  }

  setDisplayMode(mode) {
    this.displayMode = mode;
    this.clearPreview();
    this._draw();
  }

  setOverlay(mode) {
    this.overlayMode = mode;
    this._draw();
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
    const events = this.scenario.replay_events || [];
    const home = this.scenario.home_team || 'Home';
    const away = this.scenario.away_team || 'Away';
    let homeEv = 0, awayEv = 0;
    events.forEach(e => {
      const d = (e.description || '').toLowerCase();
      if (d.includes(home.toLowerCase()) || (d.includes('scores') && !d.includes(away.toLowerCase()))) homeEv++;
      else awayEv++;
    });
    const hScore = this.scenario.scoreline?.home || 0;
    const aScore = this.scenario.scoreline?.away || 0;
    const scoreFactor = (hScore + aScore) > 0 ? Math.max(hScore, aScore) / (hScore + aScore) : 0.5;
    const evFactor = (homeEv + awayEv) > 0 ? homeEv / (homeEv + awayEv) : 0.5;
    const pct = Math.round((scoreFactor * 0.6 + evFactor * 0.4) * 100);
    this.momentum = {
      home: Math.min(85, Math.max(15, pct)),
      away: Math.min(85, Math.max(15, 100 - pct)),
      homeName: home, awayName: away,
    };
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

  _draw() {
    const ctx = this.ctx;
    const W = this._W;
    const H = this._H;
    if (!W || !H) return;
    ctx.clearRect(0, 0, W, H);
    this._drawGrass(W, H);
    this._drawPitch(W, H);
    this._drawGoalLabels(W, H);
    if (this.displayMode !== 'live') {
      this._drawOverlay(W, H);
    }
    this._drawPlayers(W, H);
  }

  // -- Grass --
  _drawGrass(W, H) {
    const ctx = this.ctx;
    ctx.fillStyle = '#0D1A0D';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#0F1F0F';
    for (let i = 0; i < 10; i += 2) {
      ctx.fillRect(i * (W / 10), 0, W / 10, H);
    }
  }

  // -- Pitch markings --
  _drawPitch(W, H) {
    const ctx = this.ctx;
    const p = this._pad;
    const pw = W - p * 2;
    const ph = H - p * 2;
    const cx = W / 2;
    const cy = H / 2;

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.strokeRect(p, p, pw, ph);

    ctx.beginPath();
    ctx.moveTo(cx, p);
    ctx.lineTo(cx, H - p);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(pw, ph) * 0.12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fill();

    const bW = pw * 0.28, bH = ph * 0.2;
    const sW = pw * 0.14, sH = ph * 0.08;
    ctx.strokeRect(p, cy - bH / 2, bW, bH);
    ctx.strokeRect(W - p - bW, cy - bH / 2, bW, bH);
    ctx.strokeRect(p, cy - sH / 2, sW, sH);
    ctx.strokeRect(W - p - sW, cy - sH / 2, sW, sH);

    [cy].forEach(y => {
      ctx.beginPath();
      ctx.arc(p + bH / 2 * 0.6, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(W - p - bH / 2 * 0.6, y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  _drawGoalLabels(W, H) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '8px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('← HOME GOAL', this._pad + 30, H - this._pad + 10);
    ctx.fillText('AWAY GOAL →', W - this._pad - 30, H - this._pad + 10);
    ctx.restore();
  }

  // -- Overlays --
  _drawOverlay(W, H) {
    if (!this.overlayMode || this.overlayMode === 'shape') return;
    switch (this.overlayMode) {
      case 'pressing': this._drawPressingOverlay(W, H); break;
      case 'attack': this._drawAttackOverlay(W, H); break;
      case 'passing': this._drawPassingOverlay(W, H); break;
      case 'defensive': this._drawDefensiveOverlay(W, H); break;
    }
  }

  _drawPressingOverlay(W, H) {
    const ctx = this.ctx;
    const homeAttackers = this.homePlayers.filter(p => p.pos === 'LW' || p.pos === 'RW' || p.pos === 'ST' || p.pos === 'FW' || p.pos === 'CF' || p.pos === 'SS');
    const awayDefenders = this.awayPlayers.filter(p => p.pos === 'CB' || p.pos === 'DF' || p.pos === 'LB' || p.pos === 'RB' || p.pos === 'WB' || p.pos === 'GK');
    if (!homeAttackers.length || !awayDefenders.length) return;

    ctx.save();
    ctx.strokeStyle = '#8BF55A';
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.6;
    ctx.setLineDash([3, 3]);

    homeAttackers.forEach(att => {
      const aPos = this._normToCoord(att);
      let closest = null, minDist = Infinity;
      awayDefenders.forEach(def => {
        const dPos = this._normToCoord(def);
        const dist = Math.sqrt((aPos.x - dPos.x) ** 2 + (aPos.y - dPos.y) ** 2);
        if (dist < minDist) { minDist = dist; closest = dPos; }
      });
      if (closest && minDist < W * 0.6) {
        ctx.beginPath();
        ctx.moveTo(aPos.x, aPos.y);
        ctx.lineTo(closest.x, closest.y);
        ctx.stroke();

        const angle = Math.atan2(closest.y - aPos.y, closest.x - aPos.x);
        const len = 8;
        ctx.beginPath();
        ctx.moveTo(closest.x, closest.y);
        ctx.lineTo(closest.x - len * Math.cos(angle - 0.4), closest.y - len * Math.sin(angle - 0.4));
        ctx.moveTo(closest.x, closest.y);
        ctx.lineTo(closest.x - len * Math.cos(angle + 0.4), closest.y - len * Math.sin(angle + 0.4));
        ctx.stroke();
      }
    });

    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#8BF55A';
    ctx.font = '7px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.5;
    ctx.fillText('PRESSING DIRECTION →', W / 2, this._pad - 2);
    ctx.restore();
  }

  _drawAttackOverlay(W, H) {
    const ctx = this.ctx;
    const thirdW = (W - this._pad * 2) / 3;
    const y = this._pad;
    const h = H - this._pad * 2;
    ctx.save();

    const zones = { left: 0, center: 0, right: 0 };
    const relevant = [...this.homePlayers.filter(p => p.pos !== 'GK'), ...this.awayPlayers.filter(p => p.pos !== 'GK')];
    relevant.forEach(p => {
      if (p._tx < 0.33) zones.left++;
      else if (p._tx < 0.66) zones.center++;
      else zones.right++;
    });
    const total = relevant.length || 1;
    zones.left = Math.round((zones.left / total) * 100);
    zones.center = Math.round((zones.center / total) * 100);
    zones.right = 100 - zones.left - zones.center;
    const maxVal = Math.max(1, zones.left, zones.center, zones.right);

    [
      { x: this._pad, w: thirdW, pct: zones.left },
      { x: this._pad + thirdW, w: thirdW, pct: zones.center },
      { x: this._pad + thirdW * 2, w: thirdW, pct: zones.right }
    ].forEach(z => {
      ctx.fillStyle = `rgba(59, 130, 246, ${0.05 + Math.min(1, z.pct / maxVal) * 0.18})`;
      ctx.fillRect(z.x, y, z.w, h);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '9px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.6;
      ctx.fillText(z.pct + '%', z.x + z.w / 2, y + 14);
    });

    ctx.restore();
  }

  _drawPassingOverlay(W, H) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 0.7;

    const drawConns = (players, color) => {
      const mids = players.filter(p => ['CM','DM','AM','MF'].includes(p.pos));
      if (mids.length < 2) return;
      for (let i = 0; i < mids.length; i++) {
        for (let j = i + 1; j < mids.length; j++) {
          const a = this._normToCoord(mids[i]);
          const b = this._normToCoord(mids[j]);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = color;
          ctx.stroke();
        }
      }
      const fwd = players.filter(p => ['LW','RW','ST','FW','CF'].includes(p.pos));
      mids.forEach(m => {
        fwd.forEach(f => {
          const a = this._normToCoord(m);
          const b = this._normToCoord(f);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.15;
          ctx.stroke();
          ctx.globalAlpha = 0.3;
        });
      });
    };

    drawConns(this.homePlayers, '#3B82F6');
    drawConns(this.awayPlayers, '#8BF55A');

    ctx.restore();
  }

  _drawDefensiveOverlay(W, H) {
    const ctx = this.ctx;
    const pad = this._pad;
    const pw = W - pad * 2;
    ctx.save();

    const homeDef = this.homePlayers.filter(p => ['CB','DF','LB','RB','WB'].includes(p.pos) || p.pos === 'DM');
    const awayDef = this.awayPlayers.filter(p => ['CB','DF','LB','RB','WB'].includes(p.pos) || p.pos === 'DM');

    const drawBlock = (players, color, label) => {
      if (players.length < 2) return;
      const coords = players.map(p => this._normToCoord(p));
      const avgX = coords.reduce((s, c) => s + c.x, 0) / coords.length;
      ctx.fillStyle = color;
      ctx.fillRect(Math.min(pw * 0.15, avgX - pw * 0.08), pad, pw * 0.25, H - pad * 2);
      ctx.strokeStyle = players[0]?.team === 'home' ? 'rgba(59,130,246,0.3)' : 'rgba(139,245,90,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(Math.min(pw * 0.15, avgX - pw * 0.08), pad, pw * 0.25, H - pad * 2);
      ctx.setLineDash([]);
      ctx.fillStyle = '#64748B';
      ctx.font = '7px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, avgX, pad + 10);
    };

    drawBlock(homeDef, 'rgba(59,130,246,0.06)', 'HOME BLOCK');
    drawBlock(awayDef, 'rgba(139,245,90,0.06)', 'AWAY BLOCK');

    ctx.restore();
  }

  // -- Players --
  _drawPlayers(W, H) {
    const overlaps = {};
    if (this.displayMode === 'live') {
      const positions = [];
      this.players.forEach((p, idx) => {
        const preview = this._getPreviewPos(p, idx);
        const drawP = { ...p, _tx: preview._tx, _ty: preview._ty };
        const pos = this._normToCoord(drawP);
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
        this._drawPlayer(drawP, W, H, idx, overlaps[idx]);
      });
    } else {
      this.players.forEach((p, idx) => {
        const preview = this._getPreviewPos(p, idx);
        const drawP = { ...p, _tx: preview._tx, _ty: preview._ty };
        this._drawPlayer(drawP, W, H, idx, 1);
      });
    }
    if (this.displayMode !== 'live') {
      this._drawWideLabels(W, H);
    }
    if (this.displayMode === 'live') {
      this._drawLiveLabel(W, H);
    }
  }

  _drawPlayer(p, W, H, idx, alpha) {
    const ctx = this.ctx;
    const pos = this._normToCoord(p);
    const r = this._playerR;
    const isHome = p.team === 'home';
    const isGK = p.pos === 'GK';
    const isHovered = this.hovered === p;

    ctx.save();
    ctx.globalAlpha = alpha;

    if (isHovered) {
      ctx.shadowColor = isHome ? '#3B82F6' : '#8BF55A';
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 1;
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
      if (hit && this.onPlayerHover) this.onPlayerHover(hit, e.clientX, e.clientY);
      else if (!hit && this.onPlayerLeave) this.onPlayerLeave();
    }
  }

  _onMouseLeave() {
    if (this.hovered) {
      this.hovered = null;
      this._draw();
      if (this.onPlayerLeave) this.onPlayerLeave();
    }
  }

  destroy() {
    this.canvas.remove();
    this.players = [];
  }
}

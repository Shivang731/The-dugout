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

    this.ballPos = { x: 0.50, y: 0.45 };

    this._formationAnim = null;
    this._subAnim = null;
    this._ballAnim = null;
    this._playerAlphas = {};
    this._selectionAnimating = false;
    this._selectionAnimId = null;

    this._overlayAnimId = null;
    this._overlayAnimStart = 0;

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
    this._stopOverlayAnim();
    this.overlayMode = mode;
    this._overlayAnimStart = performance.now();
    this._draw();
    this._scheduleOverlayAnim();
  }

  _scheduleOverlayAnim() {
    if (this.overlayMode === 'passing' || this.overlayMode === 'pressing') {
      const tick = () => {
        if (this.overlayMode === 'passing' || this.overlayMode === 'pressing') {
          this._draw();
          this._overlayAnimId = requestAnimationFrame(tick);
        }
      };
      this._overlayAnimId = requestAnimationFrame(tick);
    }
  }

  _stopOverlayAnim() {
    if (this._overlayAnimId) {
      cancelAnimationFrame(this._overlayAnimId);
      this._overlayAnimId = null;
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
    if (!player) { this._eventHighlight = null; return; }

    const coord = this._normToCoord(player);
    const isHome = player.team === 'home';

    let ballTarget = null;
    let arrowTarget = null;

    if (event.type === 'goal') {
      const goalX = isHome ? 1.0 : 0.0;
      ballTarget = { x: goalX, y: 0.5 };
      arrowTarget = coord;
    } else if (event.type === 'shot') {
      const goalX = isHome ? 1.0 : 0.0;
      ballTarget = { x: goalX, y: 0.5 };
      arrowTarget = coord;
    } else {
      ballTarget = { x: player._tx, y: player._ty };
      arrowTarget = coord;
    }

    this._eventHighlight = {
      event,
      player,
      coord,
      isHome,
      startTime: performance.now(),
      ballStartPos: { ...this.ballPos },
      ballTarget,
      arrowTarget,
    };

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

    if (this._formationAnim || this._subAnim || this._ballAnim) {
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
    let endX = this.ballPos.x;
    let endY = this.ballPos.y;

    if (isAttacking) {
      endX = Math.min(0.75, this.ballPos.x + 0.12);
      endY = this.ballPos.y + (Math.random() - 0.5) * 0.06;
    } else if (isDefensive) {
      endX = Math.max(0.25, this.ballPos.x - 0.08);
      endY = this.ballPos.y + (Math.random() - 0.5) * 0.04;
    } else {
      endX = this.ballPos.x + (Math.random() - 0.5) * 0.05;
      endY = this.ballPos.y + (Math.random() - 0.5) * 0.03;
    }

    this._ballAnim = {
      startX: this.ballPos.x,
      startY: this.ballPos.y,
      endX, endY,
      startTime: 0,
      duration: 1200,
    };
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

    if (this._ballAnim) {
      if (!this._ballAnim.startTime) this._ballAnim.startTime = now;
      const elapsed = now - this._ballAnim.startTime;
      const t = Math.min(1, elapsed / this._ballAnim.duration);
      const eased = this._easeOutCubic(t);

      this.ballPos.x = this._ballAnim.startX + (this._ballAnim.endX - this._ballAnim.startX) * eased;
      this.ballPos.y = this._ballAnim.startY + (this._ballAnim.endY - this._ballAnim.startY) * eased;

      if (t >= 1) {
        this.ballPos.x = this._ballAnim.endX;
        this.ballPos.y = this._ballAnim.endY;
        this._ballAnim = null;
      } else {
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
    ctx.clearRect(0, 0, W, H);
    this._drawGrass(W, H);
    this._drawPitchLighting(W, H);
    this._drawPitch(W, H);
    this._drawGoalLabels(W, H);
    if (this.displayMode !== 'live') {
      this._drawOverlay(W, H);
    }
    this._drawPlayers(W, H);
    if (!this._eventHighlight || !this._eventHighlight.ballTarget) {
      this._drawBall(W, H);
    }
    this._drawEventHighlight(W, H);
  }

  _drawBall(W, H) {
    const ctx = this.ctx;
    const pad = this._pad;
    const bx = pad + this.ballPos.x * (W - pad * 2);
    const by = pad + (1 - this.ballPos.y) * (H - pad * 2);

    ctx.save();
    ctx.beginPath();
    ctx.arc(bx + 1.5, by + 1.5, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bx, by, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  }

  // -- Grass --
  _drawGrass(W, H) {
    const ctx = this.ctx;
    const p = this._pad;
    const pw = W - p * 2;
    const ph = H - p * 2;

    // Stadium floor (beyond pitch boundary)
    ctx.fillStyle = '#0A150E';
    ctx.fillRect(0, 0, W, H);

    // Narrow artificial turf border around playing surface
    ctx.fillStyle = '#153D1C';
    ctx.fillRect(p - 2, p - 2, pw + 4, ph + 4);

    // Base pitch grass
    ctx.fillStyle = '#1C6E28';
    ctx.fillRect(p, p, pw, ph);

    // Mowing stripes — 12 alternating horizontal bands (touchline to touchline)
    const stripeCount = 12;
    const stripeH = ph / stripeCount;
    for (let i = 0; i < stripeCount; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#1F7A2E' : '#196624';
      ctx.fillRect(p, p + i * stripeH, pw, stripeH + 1);
    }

    // Subtle grass texture — sparse low-opacity diagonal hatch marks
    ctx.save();
    ctx.globalAlpha = 0.025;
    for (let i = 0; i < 60; i++) {
      const sx = p + (i * 17 + 3) % pw;
      const sy = p + (i * 29 + 7) % ph;
      ctx.strokeStyle = i % 2 === 0 ? '#2A9E38' : '#0D3010';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 4, sy + 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  _drawPitchLighting(W, H) {
    const ctx = this.ctx;
    const cx = W / 2;
    const cy = H / 2;

    ctx.save();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0)');
    grad.addColorStop(0.78, 'rgba(0,0,0,0.03)');
    grad.addColorStop(0.92, 'rgba(0,0,0,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0.16)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // -- Pitch markings --
  _drawPitch(W, H) {
    const ctx = this.ctx;
    const p = this._pad;
    const pw = W - p * 2;
    const ph = H - p * 2;
    const cx = W / 2;
    const cy = H / 2;

    const bW = pw * 0.28, bH = ph * 0.2;
    const sW = pw * 0.093, sH = ph * 0.091;
    const centerR = Math.min(pw, ph) * 0.12;
    const cornerR = Math.min(pw, ph) * 0.018;

    const lSpotX = p + (bH / 2) * 0.6;
    const rSpotX = W - p - (bH / 2) * 0.6;
    const arcR = bW * 0.55;
    const dx = bW - (bH / 2) * 0.6;
    const arcAngle = Math.acos(Math.min(0.999, dx / arcR));

    const lineColor = 'rgba(255,255,255,0.6)';
    const lineWidth = 1.4;
    const spotR = 3;

    ctx.save();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([]);

    // Outer touchlines & goal lines
    ctx.strokeRect(p, p, pw, ph);

    // Half-way line
    ctx.beginPath();
    ctx.moveTo(cx, p);
    ctx.lineTo(cx, H - p);
    ctx.stroke();

    // Centre circle
    ctx.beginPath();
    ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
    ctx.stroke();

    // Centre spot
    ctx.beginPath();
    ctx.arc(cx, cy, spotR, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();

    // Penalty boxes
    ctx.beginPath();
    ctx.moveTo(p, cy - bH / 2);
    ctx.lineTo(p + bW, cy - bH / 2);
    ctx.lineTo(p + bW, cy + bH / 2);
    ctx.lineTo(p, cy + bH / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(W - p, cy - bH / 2);
    ctx.lineTo(W - p - bW, cy - bH / 2);
    ctx.lineTo(W - p - bW, cy + bH / 2);
    ctx.lineTo(W - p, cy + bH / 2);
    ctx.closePath();
    ctx.stroke();

    // Six-yard boxes
    ctx.beginPath();
    ctx.moveTo(p, cy - sH / 2);
    ctx.lineTo(p + sW, cy - sH / 2);
    ctx.lineTo(p + sW, cy + sH / 2);
    ctx.lineTo(p, cy + sH / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(W - p, cy - sH / 2);
    ctx.lineTo(W - p - sW, cy - sH / 2);
    ctx.lineTo(W - p - sW, cy + sH / 2);
    ctx.lineTo(W - p, cy + sH / 2);
    ctx.closePath();
    ctx.stroke();

    // Penalty spots
    ctx.beginPath();
    ctx.arc(lSpotX, cy, spotR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rSpotX, cy, spotR, 0, Math.PI * 2);
    ctx.fill();

    // Penalty arcs (the "D")
    ctx.beginPath();
    ctx.arc(lSpotX, cy, arcR, -arcAngle, arcAngle);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rSpotX, cy, arcR, Math.PI - arcAngle, Math.PI + arcAngle);
    ctx.stroke();

    // Corner arcs
    ctx.beginPath();
    ctx.arc(p, p, cornerR, 0, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(W - p, p, cornerR, Math.PI / 2, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(W - p, H - p, cornerR, Math.PI, Math.PI * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p, H - p, cornerR, Math.PI * 1.5, Math.PI * 2);
    ctx.stroke();

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
      case 'compactness': this._drawCompactnessOverlay(W, H); break;
    }
  }

  _drawPressingOverlay(W, H) {
    const ctx = this.ctx;
    const homeAttackers = this.homePlayers.filter(p => ['LW','RW','ST','FW','CF','SS'].includes(p.pos));
    const awayDefenders = this.awayPlayers.filter(p => ['CB','DF','LB','RB','WB','GK'].includes(p.pos));
    if (!homeAttackers.length || !awayDefenders.length) return;

    const t = performance.now() / 1000;
    const dashOffset = -t * 45;
    const pulse = 0.5 + 0.5 * Math.sin(t * 3);

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = '#8BF55A';
    ctx.globalAlpha = 0.45;
    ctx.setLineDash([4, 6]);
    ctx.lineDashOffset = dashOffset;

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
        const len = 5;
        ctx.globalAlpha = 0.3 + 0.3 * pulse;
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(closest.x, closest.y);
        ctx.lineTo(closest.x - len * Math.cos(angle - 0.45), closest.y - len * Math.sin(angle - 0.45));
        ctx.moveTo(closest.x, closest.y);
        ctx.lineTo(closest.x - len * Math.cos(angle + 0.45), closest.y - len * Math.sin(angle + 0.45));
        ctx.stroke();

        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1.1;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = dashOffset;
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
    const pad = this._pad;
    const thirdW = (W - pad * 2) / 3;
    const y = pad;
    const h = H - pad * 2;
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
      { x: pad, w: thirdW, pct: zones.left },
      { x: pad + thirdW, w: thirdW, pct: zones.center },
      { x: pad + thirdW * 2, w: thirdW, pct: zones.right }
    ].forEach(z => {
      const alpha = 0.04 + Math.min(1, z.pct / maxVal) * 0.14;
      const grad = ctx.createLinearGradient(z.x, 0, z.x + z.w, 0);
      grad.addColorStop(0, `rgba(59,130,246,0)`);
      grad.addColorStop(0.15, `rgba(59,130,246,${alpha * 0.4})`);
      grad.addColorStop(0.5, `rgba(59,130,246,${alpha})`);
      grad.addColorStop(0.85, `rgba(59,130,246,${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(59,130,246,0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(z.x, y, z.w, h);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '8px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.5;
      ctx.fillText(z.pct + '%', z.x + z.w / 2, y + 12);
    });

    ctx.restore();
  }

  _drawPassingOverlay(W, H) {
    const ctx = this.ctx;
    const t = performance.now() / 1000;
    const dashOffset = -t * 35;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineWidth = 0.6;

    const drawConns = (players, color) => {
      const mids = players.filter(p => ['CM','DM','AM','MF'].includes(p.pos));
      if (mids.length < 2) return;

      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = color;
      ctx.setLineDash([5, 7]);
      ctx.lineDashOffset = dashOffset;

      for (let i = 0; i < mids.length; i++) {
        for (let j = i + 1; j < mids.length; j++) {
          const a = this._normToCoord(mids[i]);
          const b = this._normToCoord(mids[j]);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const curve = Math.min(len * 0.12, 14);
          const nx = -dy / len * curve;
          const ny = dx / len * curve;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(mx + nx, my + ny, b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 0.15;
      ctx.setLineDash([3, 10]);
      ctx.lineDashOffset = dashOffset;

      const fwd = players.filter(p => ['LW','RW','ST','FW','CF'].includes(p.pos));
      mids.forEach(m => {
        fwd.forEach(f => {
          const a = this._normToCoord(m);
          const b = this._normToCoord(f);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const curve = Math.min(len * 0.1, 10);
          const nx = -dy / len * curve;
          const ny = dx / len * curve;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(mx + nx, my + ny, b.x, b.y);
          ctx.stroke();
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
    ctx.save();

    const homeDef = this.homePlayers.filter(p => ['CB','DF','LB','RB','WB'].includes(p.pos) || p.pos === 'DM');
    const awayDef = this.awayPlayers.filter(p => ['CB','DF','LB','RB','WB'].includes(p.pos) || p.pos === 'DM');

    const drawBlock = (players, color, strokeColor, label) => {
      if (players.length < 2) return;
      const coords = players.map(p => this._normToCoord(p));
      const avgX = coords.reduce((s, c) => s + c.x, 0) / coords.length;
      const minY = Math.min(...coords.map(c => c.y));
      const maxY = Math.max(...coords.map(c => c.y));

      const blockW = W * 0.22;
      const blockH = Math.max(maxY - minY + 24, H * 0.18);
      const bx = Math.min(avgX - blockW * 0.25, avgX - blockW * 0.3) + blockW * 0.4;
      const by = (minY + maxY) / 2 - blockH / 2;
      const rr = 8;

      ctx.filter = 'blur(5px)';
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(bx, by, blockW, blockH, rr);
      ctx.fill();
      ctx.filter = 'none';

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.roundRect(bx, by, blockW, blockH, rr);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#64748B';
      ctx.font = '6px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = 0.6;
      ctx.fillText(label, bx + blockW / 2, minY - 6);
    };

    drawBlock(homeDef, 'rgba(59,130,246,0.06)', 'rgba(59,130,246,0.25)', 'HOME BLOCK');
    drawBlock(awayDef, 'rgba(139,245,90,0.06)', 'rgba(139,245,90,0.25)', 'AWAY BLOCK');

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

    // 4. Animated ball
    if (eh.ballTarget) {
      const t = Math.min(1, elapsed / 0.7);
      const ease = 1 - Math.pow(1 - t, 3);
      const bxNorm = eh.ballStartPos.x + (eh.ballTarget.x - eh.ballStartPos.x) * ease;
      const byNorm = eh.ballStartPos.y + (eh.ballTarget.y - eh.ballStartPos.y) * ease;
      const pad = this._pad;
      const pw = W - pad * 2;
      const ph = H - pad * 2;
      const bx = pad + bxNorm * pw;
      const by = pad + (1 - byNorm) * ph;

      ctx.beginPath();
      ctx.arc(bx + 1.5, by + 1.5, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.3 * fadeIn})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      const trailAlpha = 0.25 * ease * (1 - ease) * 4 * fadeIn;
      if (trailAlpha > 0.01) {
        ctx.strokeStyle = `rgba(255,255,255,${trailAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(pad + eh.ballStartPos.x * pw, pad + (1 - eh.ballStartPos.y) * ph);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }

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
        const baseAlpha = overlaps[idx];
        const subAlpha = this._playerAlphas[idx] !== undefined ? this._playerAlphas[idx] : 1;
        this._drawPlayer(drawP, W, H, idx, baseAlpha * subAlpha);
      });
    } else {
      this.players.forEach((p, idx) => {
        const preview = this._getPreviewPos(p, idx);
        const drawP = { ...p, _tx: preview._tx, _ty: preview._ty };
        const subAlpha = this._playerAlphas[idx] !== undefined ? this._playerAlphas[idx] : 1;
        this._drawPlayer(drawP, W, H, idx, subAlpha);
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
    this._selectionAnimating = false;
    if (this._selectionAnimId) {
      cancelAnimationFrame(this._selectionAnimId);
      this._selectionAnimId = null;
    }
    this.canvas.remove();
    this.players = [];
  }
}

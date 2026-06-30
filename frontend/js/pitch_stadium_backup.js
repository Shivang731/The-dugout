// 3D pitch — broadcast‑quality match experience
// Works with game.js which expects `new Pitch3D('pitch-container')'

// ===================================================================
// CONSTANTS
// ===================================================================
const PITCH_W = 68;
const PITCH_L = 105;
const HALF_W = PITCH_W / 2;
const HALF_L = PITCH_L / 2;
const GOAL_W = 7.32;
const GOAL_H = 2.44;
const GOAL_D = 2.5;
const PEN_AREA_W = 40.32;
const PEN_AREA_L = 16.5;
const SIX_YARD_W = 18.32;
const SIX_YARD_L = 5.5;
const CENTER_R = 9.15;
const PEN_SPOT_DIST = 11;
const CORNER_R = 1;
const PLAYER_HEIGHT = 2.2;
const PROFESSIONAL_BALL_RADIUS = 0.11;

// ===================================================================
// TEAM COLORS
// ===================================================================
const TEAM_COLORS = {
  'Argentina':         { shirt: 0x75aadb, shorts: 0x000000, socks: 0xffffff, gk: 0x22c55e, crowd: 0x75aadb },
  'Croatia':           { shirt: 0xed1c24, shorts: 0xffffff, socks: 0x0000ff, gk: 0x22c55e, crowd: 0xffffff },
  'Brazil':            { shirt: 0xf7d100, shorts: 0x003cff, socks: 0xf7d100, gk: 0x22c55e, crowd: 0xf7d100 },
  'Japan':             { shirt: 0x003cff, shorts: 0xffffff, socks: 0x003cff, gk: 0x22c55e, crowd: 0x003cff },
  'France':            { shirt: 0x002395, shorts: 0xffffff, socks: 0xed1c24, gk: 0x22c55e, crowd: 0x002395 },
  'Netherlands':       { shirt: 0xff6b00, shorts: 0xffffff, socks: 0xff6b00, gk: 0x22c55e, crowd: 0xff6b00 },
  'Senegal':           { shirt: 0x00853e, shorts: 0xf7d100, socks: 0xed1c24, gk: 0x22c55e, crowd: 0x00853e },
  'England':           { shirt: 0xffffff, shorts: 0x003cff, socks: 0xffffff, gk: 0x22c55e, crowd: 0xffffff },
  'USA':               { shirt: 0xffffff, shorts: 0x002868, socks: 0xffffff, gk: 0x22c55e, crowd: 0x002868 },
  'Wales':             { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Iran':              { shirt: 0xffffff, shorts: 0x239f40, socks: 0xffffff, gk: 0x22c55e, crowd: 0x239f40 },
  'Mexico':            { shirt: 0x006847, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0x006847 },
  'Poland':            { shirt: 0xffffff, shorts: 0xcf1020, socks: 0xffffff, gk: 0x22c55e, crowd: 0xffffff },
  'Saudi Arabia':      { shirt: 0xffffff, shorts: 0x006847, socks: 0xffffff, gk: 0x22c55e, crowd: 0x006847 },
  'Australia':         { shirt: 0xf7d100, shorts: 0x006847, socks: 0xf7d100, gk: 0x22c55e, crowd: 0xf7d100 },
  'Denmark':           { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Tunisia':           { shirt: 0xffffff, shorts: 0xcf1020, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xffffff },
  'Spain':             { shirt: 0xcf1020, shorts: 0xf7d100, socks: 0x002868, gk: 0x22c55e, crowd: 0xcf1020 },
  'Costa Rica':        { shirt: 0xcf1020, shorts: 0xffffff, socks: 0x003cff, gk: 0x22c55e, crowd: 0xcf1020 },
  'Germany':           { shirt: 0xffffff, shorts: 0x000000, socks: 0xffffff, gk: 0x22c55e, crowd: 0xffffff },
  'Belgium':           { shirt: 0xcf1020, shorts: 0x000000, socks: 0xf7d100, gk: 0x22c55e, crowd: 0xcf1020 },
  'Canada':            { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Morocco':           { shirt: 0xcf1020, shorts: 0x006847, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Portugal':          { shirt: 0xcf1020, shorts: 0x006847, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Ghana':             { shirt: 0xffffff, shorts: 0xf7d100, socks: 0x000000, gk: 0x22c55e, crowd: 0xffffff },
  'Uruguay':           { shirt: 0x75aadb, shorts: 0x000000, socks: 0x75aadb, gk: 0x22c55e, crowd: 0x75aadb },
  'Switzerland':       { shirt: 0xcf1020, shorts: 0xffffff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xcf1020 },
  'Cameroon':          { shirt: 0x006847, shorts: 0xcf1020, socks: 0xf7d100, gk: 0x22c55e, crowd: 0x006847 },
  'Serbia':            { shirt: 0xcf1020, shorts: 0x003cff, socks: 0xffffff, gk: 0x22c55e, crowd: 0xcf1020 },
  'South Korea':       { shirt: 0xcf1020, shorts: 0x003cff, socks: 0xffffff, gk: 0x22c55e, crowd: 0xcf1020 },
  'Qatar':             { shirt: 0xffffff, shorts: 0x800000, socks: 0xffffff, gk: 0x22c55e, crowd: 0x800000 },
  'Ecuador':           { shirt: 0xf7d100, shorts: 0x003cff, socks: 0xcf1020, gk: 0x22c55e, crowd: 0xf7d100 },
};
const DEFAULT_COLORS = { shirt: 0x3b82f6, shorts: 0x1e3a8a, socks: 0x3b82f6, gk: 0x2563eb, crowd: 0x3b82f6 };
const DEMO_KITS = {
  home: { shirt: 0xfff3b0, shorts: 0x123c69, socks: 0xfff3b0, gk: 0x00e5ff },
  away: { shirt: 0xe11d48, shorts: 0x111827, socks: 0xe11d48, gk: 0xb8ff2c },
};

function _getTeamColors(teamName) {
  return TEAM_COLORS[teamName] || DEFAULT_COLORS;
}

// ===================================================================
// ADVERTISING SPONSORS (cycle based on scenario hash)
// ===================================================================
const SPONSORS = [
  'THE DUGOUT', 'UNDERSTAND THE GAME', 'TACTICAL ANALYSIS',
  'IBM GRANITE', 'WORLD CUP',
];
function _selectSponsors(scenarioId) {
  const hash = (scenarioId || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const idx = hash % (SPONSORS.length - 3);
  return SPONSORS.slice(idx, idx + 4);
}

// ===================================================================
// HELPERS
// ===================================================================
function _pNormToWorld(p) {
  const x = (p.x - 0.5) * 68;
  const z = p.team === 'away'
    ? (p.y - 0.5) * 105
    : (0.5 - p.y) * 105;
  return { x, z };
}

function _fatigueHex(val) {
  if (val < 40) return 0x22c55e;
  if (val < 65) return 0xf59e0b;
  return 0xef4444;
}

function _mat(color, roughness = 0.55, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

var _sharedGeoCache = {};
function _sharedGeo(key, factory) {
  if (!_sharedGeoCache[key]) _sharedGeoCache[key] = factory();
  return _sharedGeoCache[key];
}

function _easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ===================================================================
// GRASS TEXTURE GENERATION — broadcast-quality mowing stripes
// ===================================================================
var _grassTexCache = null;
function _createGrassTexture() {
  if (_grassTexCache) return _grassTexCache;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  const stripeH = canvas.height / 12;

  // ── Base stripe colours (subtle 8–15% luminance difference) ──
  const darkGreen  = '#0D4F1B';
  const lightGreen = '#10591E';

  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = i % 2 === 0 ? darkGreen : lightGreen;
    ctx.fillRect(0, i * stripeH, canvas.width, stripeH);
  }

  // ── Subtle grain: dark specks ──
  ctx.fillStyle = 'rgba(0,0,0,0.018)';
  for (let i = 0; i < 12000; i++) {
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2.5 + 0.5,
      Math.random() * 1.5 + 0.5,
    );
  }

  // ── Natural colour variation patches ──
  const variationColours = ['#0D4F1B', '#10591E'];
  for (let i = 0; i < 10000; i++) {
    ctx.fillStyle = variationColours[Math.random() * 2 | 0] + '20';
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 6 + 2,
      Math.random() * 4 + 1,
    );
  }

  // ── Mowing streaks with alternating direction per stripe ──
  ctx.lineWidth = 1.0;
  for (let s = 0; s < 12; s++) {
    const yBase = s * stripeH;
    const dir = s % 2 === 0 ? 1 : -1;
    for (let row = 0; row < stripeH; row += 8) {
      ctx.beginPath();
      ctx.moveTo(dir > 0 ? 0 : canvas.width, yBase + row);
      const drift = (Math.random() - 0.5) * 5;
      const opacity = 0.015 + Math.random() * 0.015;
      ctx.strokeStyle = dir > 0
        ? `rgba(255,255,255,${opacity})`
        : `rgba(0,0,0,${opacity})`;
      ctx.lineTo(dir > 0 ? canvas.width : 0, yBase + row + drift);
      ctx.stroke();
    }
  }

  // ── Radial vignette — darker edges (matching 2D pitch) ──
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = Math.max(canvas.width, canvas.height) * 0.65;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0)');
  grad.addColorStop(0.80, 'rgba(0,0,0,0.04)');
  grad.addColorStop(0.93, 'rgba(0,0,0,0.10)');
  grad.addColorStop(1, 'rgba(0,0,0,0.20)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ── Centre spotlight — subtle brightening in the middle ──
  const spotR = Math.max(canvas.width, canvas.height) * 0.55;
  const spotGrad = ctx.createRadialGradient(cx, cy, spotR * 0.35, cx, cy, spotR * 0.55);
  spotGrad.addColorStop(0, 'rgba(255,255,255,0)');
  spotGrad.addColorStop(0.7, 'rgba(255,255,255,0)');
  spotGrad.addColorStop(0.85, 'rgba(255,255,255,0.012)');
  spotGrad.addColorStop(1, 'rgba(255,255,255,0.025)');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ── Faint directional sheen per stripe ──
  for (let s = 0; s < 12; s++) {
    const yBase = s * stripeH;
    const dir = s % 2 === 0 ? 1 : -1;
    const sheenGrad = ctx.createLinearGradient(
      dir > 0 ? 0 : canvas.width, 0,
      dir > 0 ? canvas.width : 0, 0,
    );
    sheenGrad.addColorStop(0, 'rgba(255,255,255,0.015)');
    sheenGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
    sheenGrad.addColorStop(1, 'rgba(0,0,0,0.010)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, yBase, canvas.width, stripeH);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.anisotropy = 16;
  _grassTexCache = tex;
  return tex;
}

// ===================================================================
// PITCH MARKINGS TEXTURE — single transparent overlay
// ===================================================================
var _markingsTexCache = null;
function _createMarkingsTexture() {
  if (_markingsTexCache) return _markingsTexCache;
  const W = 4096;
  const H = 6320;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const px = (x) => (x / PITCH_W + 0.5) * W;
  const pz = (z) => (-z / PITCH_L + 0.5) * H;

  const LINE_W = 7;
  const UNDERLAY_W = 10;
  const UNDERLAY_COLOR = 'rgba(0,18,0,0.30)';

  function markLine(x1, z1, x2, z2) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = UNDERLAY_W;
    ctx.strokeStyle = UNDERLAY_COLOR;
    ctx.beginPath();
    ctx.moveTo(px(x1), pz(z1));
    ctx.lineTo(px(x2), pz(z2));
    ctx.stroke();
    ctx.lineWidth = LINE_W;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(px(x1), pz(z1));
    ctx.lineTo(px(x2), pz(z2));
    ctx.stroke();
  }

  function markCircle(cx, cz, r) {
    const cr = (r / PITCH_W) * W;
    ctx.lineWidth = UNDERLAY_W;
    ctx.strokeStyle = UNDERLAY_COLOR;
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), cr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = LINE_W;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), cr, 0, Math.PI * 2);
    ctx.stroke();
  }

  function markArc(cx, cz, r, a1, a2) {
    const cr = (r / PITCH_W) * W;
    ctx.lineWidth = UNDERLAY_W;
    ctx.strokeStyle = UNDERLAY_COLOR;
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), cr, a1, a2);
    ctx.stroke();
    ctx.lineWidth = LINE_W;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), cr, a1, a2);
    ctx.stroke();
  }

  function markDot(cx, cz, rad) {
    const dR = rad * (W / PITCH_W);
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), dR + 2, 0, Math.PI * 2);
    ctx.fillStyle = UNDERLAY_COLOR;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px(cx), pz(cz), dR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  // Outer boundary
  markLine(-HALF_W, -HALF_L, HALF_W, -HALF_L);
  markLine(HALF_W, -HALF_L, HALF_W, HALF_L);
  markLine(HALF_W, HALF_L, -HALF_W, HALF_L);
  markLine(-HALF_W, HALF_L, -HALF_W, -HALF_L);

  // Halfway line
  markLine(-HALF_W, 0, HALF_W, 0);

  // Center circle
  markCircle(0, 0, CENTER_R);

  // Center spot
  markDot(0, 0, 0.3);

  // Penalty areas
  markLine(-PEN_AREA_W / 2, HALF_L, PEN_AREA_W / 2, HALF_L);
  markLine(PEN_AREA_W / 2, HALF_L, PEN_AREA_W / 2, HALF_L - PEN_AREA_L);
  markLine(PEN_AREA_W / 2, HALF_L - PEN_AREA_L, -PEN_AREA_W / 2, HALF_L - PEN_AREA_L);
  markLine(-PEN_AREA_W / 2, HALF_L - PEN_AREA_L, -PEN_AREA_W / 2, HALF_L);
  markLine(-PEN_AREA_W / 2, -HALF_L, PEN_AREA_W / 2, -HALF_L);
  markLine(PEN_AREA_W / 2, -HALF_L, PEN_AREA_W / 2, -HALF_L + PEN_AREA_L);
  markLine(PEN_AREA_W / 2, -HALF_L + PEN_AREA_L, -PEN_AREA_W / 2, -HALF_L + PEN_AREA_L);
  markLine(-PEN_AREA_W / 2, -HALF_L + PEN_AREA_L, -PEN_AREA_W / 2, -HALF_L);

  // Six-yard boxes
  markLine(-SIX_YARD_W / 2, HALF_L, SIX_YARD_W / 2, HALF_L);
  markLine(SIX_YARD_W / 2, HALF_L, SIX_YARD_W / 2, HALF_L - SIX_YARD_L);
  markLine(SIX_YARD_W / 2, HALF_L - SIX_YARD_L, -SIX_YARD_W / 2, HALF_L - SIX_YARD_L);
  markLine(-SIX_YARD_W / 2, HALF_L - SIX_YARD_L, -SIX_YARD_W / 2, HALF_L);
  markLine(-SIX_YARD_W / 2, -HALF_L, SIX_YARD_W / 2, -HALF_L);
  markLine(SIX_YARD_W / 2, -HALF_L, SIX_YARD_W / 2, -HALF_L + SIX_YARD_L);
  markLine(SIX_YARD_W / 2, -HALF_L + SIX_YARD_L, -SIX_YARD_W / 2, -HALF_L + SIX_YARD_L);
  markLine(-SIX_YARD_W / 2, -HALF_L + SIX_YARD_L, -SIX_YARD_W / 2, -HALF_L);

  // Penalty spots
  markDot(0, HALF_L - PEN_SPOT_DIST, 0.25);
  markDot(0, -HALF_L + PEN_SPOT_DIST, 0.25);

  // Penalty arcs
  const penArcR = CENTER_R;
  const nz = HALF_L - PEN_SPOT_DIST;
  markArc(0, nz, penArcR, -0.7, 0.7);
  markArc(0, -nz, penArcR, Math.PI - 0.7, Math.PI + 0.7);

  // Corner arcs
  const cr = CORNER_R;
  markArc(-HALF_W, -HALF_L, cr, 0, Math.PI / 2);
  markArc(HALF_W, -HALF_L, cr, Math.PI / 2, Math.PI);
  markArc(HALF_W, HALF_L, cr, Math.PI, 3 * Math.PI / 2);
  markArc(-HALF_W, HALF_L, cr, 3 * Math.PI / 2, 2 * Math.PI);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  _markingsTexCache = tex;
  return tex;
}

// ===================================================================
// PITCH MARKINGS GEOMETRY — 3D line segments as geometry
// ===================================================================
var _markingsGeoCache = null;
function _createMarkingsGeometry() {
  if (_markingsGeoCache) return _markingsGeoCache;
  const LW = 0.116;
  const pos = [];
  const idx = [];

  function addLine(x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 1e-6) return;
    const nx = -dz / len;
    const nz = dx / len;
    const hw = LW / 2;
    const ox = nx * hw;
    const oz = nz * hw;
    const i = pos.length / 3;
    pos.push(
      x1 - ox, 0.02, z1 - oz,
      x1 + ox, 0.02, z1 + oz,
      x2 + ox, 0.02, z2 + oz,
      x2 - ox, 0.02, z2 - oz,
    );
    idx.push(i, i + 2, i + 1, i, i + 3, i + 2);
  }

  function addArc(cx, cz, r, a1, a2) {
    const segs = Math.max(16, Math.ceil((a2 - a1) * 64 / (Math.PI * 2)));
    for (let i = 0; i < segs; i++) {
      const t1 = a1 + (a2 - a1) * i / segs;
      const t2 = a1 + (a2 - a1) * (i + 1) / segs;
      addLine(
        cx + r * Math.cos(t1),
        cz + r * Math.sin(t1),
        cx + r * Math.cos(t2),
        cz + r * Math.sin(t2),
      );
    }
  }

  function addCircle(cx, cz, r) {
    addArc(cx, cz, r, 0, Math.PI * 2);
  }

  function addDot(cx, cz, r) {
    const d = (r || 0.3) * 2;
    addLine(cx - d / 2, cz, cx + d / 2, cz);
    addLine(cx, cz - d / 2, cx, cz + d / 2);
  }

  addLine(-HALF_W, -HALF_L, HALF_W, -HALF_L);
  addLine(HALF_W, -HALF_L, HALF_W, HALF_L);
  addLine(HALF_W, HALF_L, -HALF_W, HALF_L);
  addLine(-HALF_W, HALF_L, -HALF_W, -HALF_L);

  addLine(-HALF_W, 0, HALF_W, 0);
  addCircle(0, 0, CENTER_R);
  addDot(0, 0, 0.3);

  addLine(-PEN_AREA_W / 2, HALF_L, PEN_AREA_W / 2, HALF_L);
  addLine(PEN_AREA_W / 2, HALF_L, PEN_AREA_W / 2, HALF_L - PEN_AREA_L);
  addLine(PEN_AREA_W / 2, HALF_L - PEN_AREA_L, -PEN_AREA_W / 2, HALF_L - PEN_AREA_L);
  addLine(-PEN_AREA_W / 2, HALF_L - PEN_AREA_L, -PEN_AREA_W / 2, HALF_L);
  addLine(-PEN_AREA_W / 2, -HALF_L, PEN_AREA_W / 2, -HALF_L);
  addLine(PEN_AREA_W / 2, -HALF_L, PEN_AREA_W / 2, -HALF_L + PEN_AREA_L);
  addLine(PEN_AREA_W / 2, -HALF_L + PEN_AREA_L, -PEN_AREA_W / 2, -HALF_L + PEN_AREA_L);
  addLine(-PEN_AREA_W / 2, -HALF_L + PEN_AREA_L, -PEN_AREA_W / 2, -HALF_L);

  addLine(-SIX_YARD_W / 2, HALF_L, SIX_YARD_W / 2, HALF_L);
  addLine(SIX_YARD_W / 2, HALF_L, SIX_YARD_W / 2, HALF_L - SIX_YARD_L);
  addLine(SIX_YARD_W / 2, HALF_L - SIX_YARD_L, -SIX_YARD_W / 2, HALF_L - SIX_YARD_L);
  addLine(-SIX_YARD_W / 2, HALF_L - SIX_YARD_L, -SIX_YARD_W / 2, HALF_L);
  addLine(-SIX_YARD_W / 2, -HALF_L, SIX_YARD_W / 2, -HALF_L);
  addLine(SIX_YARD_W / 2, -HALF_L, SIX_YARD_W / 2, -HALF_L + SIX_YARD_L);
  addLine(SIX_YARD_W / 2, -HALF_L + SIX_YARD_L, -SIX_YARD_W / 2, -HALF_L + SIX_YARD_L);
  addLine(-SIX_YARD_W / 2, -HALF_L + SIX_YARD_L, -SIX_YARD_W / 2, -HALF_L);

  addDot(0, HALF_L - PEN_SPOT_DIST, 0.25);
  addDot(0, -HALF_L + PEN_SPOT_DIST, 0.25);

  const nz = HALF_L - PEN_SPOT_DIST;
  addArc(0, nz, CENTER_R, -0.7, 0.7);
  addArc(0, -nz, CENTER_R, Math.PI - 0.7, Math.PI + 0.7);

  addArc(-HALF_W, -HALF_L, CORNER_R, 0, Math.PI / 2);
  addArc(HALF_W, -HALF_L, CORNER_R, Math.PI / 2, Math.PI);
  addArc(HALF_W, HALF_L, CORNER_R, Math.PI, 3 * Math.PI / 2);
  addArc(-HALF_W, HALF_L, CORNER_R, 3 * Math.PI / 2, 2 * Math.PI);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geom.setIndex(idx.length > 0 ? idx : undefined);
  geom.computeVertexNormals();
  _markingsGeoCache = geom;
  return geom;
}

function _createNetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  const cellSize = 26;
  const lineWidth = 2.8;
  const knotR = 3.5;

  // Draw square mesh grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  for (let x = 0; x <= 512; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Knots at every intersection
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let x = 0; x <= 512; x += cellSize) {
    for (let y = 0; y <= 512; y += cellSize) {
      ctx.beginPath();
      ctx.arc(x, y, knotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 2);
  tex.anisotropy = 8;
  return tex;
}

// Subdivided plane geometry with subtle parabolic sag for realistic net hang
function _makeNetPlane(w, h, segW, segH, sag) {
  const geo = new THREE.PlaneGeometry(w, h, segW, segH);
  const pos = geo.attributes.position;
  const hw = w / 2;
  const hh = h / 2;
  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i) / hw;
    const ny = pos.getY(i) / hh;
    const s = sag * (1 - nx * nx) * (1 - ny * ny);
    pos.setZ(i, pos.getZ(i) - s);
  }
  geo.computeVertexNormals();
  return geo;
}

function _createSponsorTexture(name) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // LED panel background
  ctx.fillStyle = '#08080f';
  ctx.fillRect(0, 0, 512, 128);

  // Subtle inner border
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 120);

  // Text glow
  ctx.font = '600 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255,255,255,0.15)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(name, 256, 64);

  // Sharp text overlay
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#f0f0f5';
  ctx.fillText(name, 256, 64);

  // Very subtle LED scanline effect
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  for (let y = 0; y < 128; y += 3) {
    ctx.fillRect(0, y, 512, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ===================================================================
// BUILD PITCH
// ===================================================================
function _buildPitch(scene, scenario) {
  const grassTex = _createGrassTexture();
  const grassMat = new THREE.MeshStandardMaterial({
    map: grassTex,
    roughness: 0.55,
    metalness: 0,
    color: 0xffffff,
    envMapIntensity: 0.3,
  });
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W, PITCH_L),
    grassMat,
  );
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.02;
  grass.receiveShadow = true;
  scene.add(grass);

  // pitch border run-off track — BELOW the grass so the stripe texture
  // is the visible surface on the playing area
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x1a4d20,
    roughness: 1,
    metalness: 0,
  });
  const track = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH_W + 8, PITCH_L + 8),
    trackMat,
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = -0.15;
  scene.add(track);

  // ===== PITCH MARKINGS — 3D geometry lines, no textures =====
  const markingsGeo = _createMarkingsGeometry();
  const markingsMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -2,
  });
  const markings = new THREE.Mesh(markingsGeo, markingsMat);
  markings.renderOrder = 1;
  markings.frustumCulled = false;
  scene.add(markings);

  // Pitch edge shadow gradients (keep these)
  const edgeMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.15,
  });
  [-1, 1].forEach(side => {
    const edge = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, PITCH_L + 4),
      edgeMat,
    );
    edge.rotation.x = -Math.PI / 2;
    edge.position.set(side * (HALF_W + 2.5), -0.12, 0);
    scene.add(edge);
  });
}

// ===================================================================
// BUILD GOALS
// ===================================================================
function _buildGoals(scene) {
  const netTex = _createNetTexture();
  const PR = 0.065;
  const SEGS = 24;
  const RSEGS = 12;

  // Shared bright white matte finish for all structural goal parts
  const postMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.6,
  });

  [-HALF_L, +HALF_L].forEach(z => {
    const sign = z < 0 ? 1 : -1;
    const rearZ = z + sign * GOAL_D;

    // --- Goalposts ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(PR, PR, GOAL_H, SEGS),
        postMat,
      );
      post.position.set(x, GOAL_H / 2, z);
      post.castShadow = true;
      scene.add(post);
    });

    // --- Crossbar ---
    const crossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(PR, PR, GOAL_W, SEGS),
      postMat,
    );
    crossbar.rotation.x = Math.PI / 2;
    crossbar.position.set(0, GOAL_H, z);
    crossbar.castShadow = true;
    scene.add(crossbar);

    // --- Corner fillets (smooth post-crossbar joints) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const fillet = new THREE.Mesh(
        new THREE.SphereGeometry(PR, SEGS, SEGS),
        postMat,
      );
      fillet.position.set(x, GOAL_H, z);
      fillet.castShadow = true;
      scene.add(fillet);
    });

    // --- Post base plates ---
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      metalness: 0,
      roughness: 0.7,
    });
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(PR + 0.025, PR + 0.035, 0.04, SEGS),
        baseMat,
      );
      base.position.set(x, 0.02, z);
      scene.add(base);
    });

    // --- Goal-line ground bar (connects the two posts at ground level) ---
    const groundBar = new THREE.Mesh(
      new THREE.CylinderGeometry(PR, PR, GOAL_W, SEGS),
      postMat,
    );
    groundBar.rotation.x = Math.PI / 2;
    groundBar.position.set(0, PR, z);
    groundBar.castShadow = true;
    scene.add(groundBar);

    // --- Rear vertical supports ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const support = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, GOAL_H, RSEGS),
        postMat,
      );
      support.position.set(x, GOAL_H / 2, rearZ);
      support.castShadow = true;
      scene.add(support);
    });

    // --- Top rear crossbar ---
    const rearCrossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, GOAL_W, RSEGS),
      postMat,
    );
    rearCrossbar.rotation.x = Math.PI / 2;
    rearCrossbar.position.set(0, GOAL_H, rearZ);
    rearCrossbar.castShadow = true;
    scene.add(rearCrossbar);

    // --- Bottom rear crossbar ---
    const bottomRearBar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, GOAL_W, RSEGS),
      postMat,
    );
    bottomRearBar.rotation.x = Math.PI / 2;
    bottomRearBar.position.set(0, 0.04, rearZ);
    bottomRearBar.castShadow = true;
    scene.add(bottomRearBar);

    // --- Side ground rails (front post to rear support at ground level) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const sideLen = GOAL_D;
      const sideRail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, sideLen, RSEGS),
        postMat,
      );
      sideRail.rotation.z = Math.PI / 2;
      sideRail.position.set(x, 0.03, z + sign * GOAL_D / 2);
      sideRail.castShadow = true;
      scene.add(sideRail);
    });

    // --- Top side rails (front post top to rear support top) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const topRail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, GOAL_D, RSEGS),
        postMat,
      );
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(x, GOAL_H, z + sign * GOAL_D / 2);
      topRail.castShadow = true;
      scene.add(topRail);
    });

    // --- Diagonal braces (front post at 65% height to rear support base) ---
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const braceHeight = GOAL_H * 0.65;
      const len = Math.sqrt(braceHeight * braceHeight + GOAL_D * GOAL_D);
      const brace = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, len, RSEGS),
        postMat,
      );
      brace.position.set(x, braceHeight / 2, z + sign * GOAL_D / 2);
      brace.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, braceHeight, sign * GOAL_D).normalize(),
      );
      brace.castShadow = true;
      scene.add(brace);
    });

    // --- Net (back) ---
    const netColor = 0xffffff;
    const netRoughness = 0.65;

    const backNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: netRoughness,
      metalness: 0,
      depthWrite: false,
    });
    const backNet = new THREE.Mesh(
      _makeNetPlane(GOAL_W, GOAL_H, 20, 14, 0.18),
      backNetMat,
    );
    const bp = backNet.geometry.attributes.position;
    for (let i = 0; i < bp.count; i++) bp.setZ(i, bp.getZ(i) * sign);
    backNet.geometry.computeVertexNormals();
    backNet.position.set(0, GOAL_H / 2, rearZ);
    backNet.receiveShadow = true;
    scene.add(backNet);

    // --- Net (top) ---
    const topNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: netRoughness,
      metalness: 0,
      depthWrite: false,
    });
    const topNet = new THREE.Mesh(
      _makeNetPlane(GOAL_W, GOAL_D, 20, 8, 0.08),
      topNetMat,
    );
    topNet.rotation.x = -Math.PI / 2;
    topNet.position.set(0, GOAL_H, z + sign * GOAL_D / 2);
    topNet.receiveShadow = true;
    scene.add(topNet);

    // --- Net (sides) ---
    const sideNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: netRoughness,
      metalness: 0,
      depthWrite: false,
    });
    [-GOAL_W / 2, GOAL_W / 2].forEach(x => {
      const sideNet = new THREE.Mesh(
        _makeNetPlane(GOAL_D, GOAL_H, 8, 14, 0.08),
        sideNetMat,
      );
      const sp = sideNet.geometry.attributes.position;
      for (let i = 0; i < sp.count; i++) sp.setZ(i, sp.getZ(i) * (x < 0 ? -1 : 1));
      sideNet.geometry.computeVertexNormals();
      sideNet.rotation.y = Math.PI / 2 * (x < 0 ? 1 : -1);
      sideNet.position.set(x, GOAL_H / 2, z + sign * GOAL_D / 2);
      sideNet.receiveShadow = true;
      scene.add(sideNet);
    });

    // --- Net (ground inside goal) ---
    const groundNetMat = new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      color: netColor,
      roughness: 0.8,
      metalness: 0,
      depthWrite: false,
    });
    const groundNet = new THREE.Mesh(
      new THREE.PlaneGeometry(GOAL_W, GOAL_D),
      groundNetMat,
    );
    groundNet.rotation.x = -Math.PI / 2;
    groundNet.position.set(0, 0.01, z + sign * GOAL_D / 2);
    scene.add(groundNet);

    // --- Goal shadow on ground ---
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.05,
    });
    const goalShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(GOAL_W + 0.5, GOAL_D + 0.3),
      shadowMat,
    );
    goalShadow.rotation.x = -Math.PI / 2;
    goalShadow.position.set(0, 0.005, z + sign * GOAL_D / 2);
    scene.add(goalShadow);
  });
}

// ===================================================================
// BUILD CORNER FLAGS
// ===================================================================
function _buildCornerFlags(scene) {
  const flagData = [];
  const positions = [
    [-HALF_W, -HALF_L],
    [+HALF_W, -HALF_L],
    [+HALF_W, +HALF_L],
    [-HALF_W, +HALF_L],
  ];

  positions.forEach(([x, z]) => {
    // Pole
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.5,
    });
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 1.5, 6),
      poleMat,
    );
    pole.position.set(x, 0.75, z);
    pole.castShadow = true;
    scene.add(pole);

    // Flag triangle
    const flagShape = new THREE.Shape();
    flagShape.moveTo(0, 0);
    flagShape.lineTo(0.5, 0.25);
    flagShape.lineTo(0, 0.5);
    flagShape.closePath();

    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
    const flagMat = new THREE.MeshStandardMaterial({
      color: color,
      side: THREE.DoubleSide,
      roughness: 0.7,
    });
    const flag = new THREE.Mesh(new THREE.ShapeGeometry(flagShape), flagMat);
    flag.position.set(x, 1.2, z);
    // Face diagonal inward
    const angle = Math.atan2(-z, -x);
    flag.rotation.y = angle;
    scene.add(flag);

    flagData.push({
      pole,
      flag,
      phase: Math.random() * Math.PI * 2,
      baseRot: angle,
      baseX: x,
      baseZ: z,
    });
  });

  return flagData;
}

// ===================================================================
// BUILD ADVERTISING BOARDS
// ===================================================================
function _buildAdvertisingBoards(scene, scenarioId) {
  const sponsors = _selectSponsors(scenarioId);
  const boards = [];

  const boardW = 3;
  const boardH = 1.05;
  const boardD = 0.08;
  const boardY = 0.525;
  const pitchGap = 2.5;
  const cornerGap = 2.5;

  // Cache materials per sponsor for reuse
  const matCache = {};
  function _getMat(name) {
    if (!matCache[name]) {
      const tex = _createSponsorTexture(name);
      matCache[name] = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0.05,
        emissive: 0x111122,
        emissiveIntensity: 0.25,
        emissiveMap: tex,
        side: THREE.DoubleSide,
      });
    }
    return matCache[name];
  }

  // Shared geometry
  const faceGeo = _sharedGeo('adFace', () => new THREE.PlaneGeometry(boardW, boardH));
  const caseGeo = _sharedGeo('adCase', () => new THREE.BoxGeometry(boardW, boardH, boardD));

  function addRow(xStart, zStart, xEnd, zEnd, spIdx) {
    const dx = xEnd - xStart;
    const dz = zEnd - zStart;
    const totalLen = Math.sqrt(dx * dx + dz * dz);
    const numBoards = Math.max(1, Math.floor(totalLen / boardW));

    // Inward-facing angle: rotate so +Z normal points toward pitch centre
    const cx = (xStart + xEnd) / 2;
    const cz = (zStart + zEnd) / 2;
    const angle = Math.atan2(-cx, -cz);

    for (let i = 0; i < numBoards; i++) {
      const t = (i + 0.5) / numBoards;
      const bx = xStart + t * dx;
      const bz = zStart + t * dz;
      const sp = sponsors[(spIdx + i) % sponsors.length];
      const mat = _getMat(sp);

      // Casing
      const casing = new THREE.Mesh(caseGeo, mat);
      casing.position.set(bx, boardY, bz);
      casing.rotation.y = angle;
      scene.add(casing);
      boards.push(casing);

      // LED face (slightly proud of casing)
      const face = new THREE.Mesh(faceGeo, mat);
      face.position.set(
        bx + Math.sin(angle) * (boardD / 2 + 0.005),
        boardY,
        bz + Math.cos(angle) * (boardD / 2 + 0.005),
      );
      face.rotation.y = angle;
      scene.add(face);
      boards.push(face);
    }
    return numBoards;
  }

  const limit = HALF_L - cornerGap;
  const wLimit = HALF_W - cornerGap;
  let spIdx = 0;

  // Touchline rows (full length, minus corner gaps)
  spIdx += addRow(-HALF_W - pitchGap, -limit, -HALF_W - pitchGap, limit, spIdx);
  spIdx += addRow(+HALF_W + pitchGap, -limit, +HALF_W + pitchGap, limit, spIdx);

  // Behind-goal rows
  spIdx += addRow(-wLimit, -HALF_L - pitchGap, wLimit, -HALF_L - pitchGap, spIdx);
  spIdx += addRow(-wLimit, +HALF_L + pitchGap, wLimit, +HALF_L + pitchGap, spIdx);

  return boards;
}

// ===================================================================
// BUILD STADIUM
// ===================================================================
function _buildStadium(scene) {
  // ===================================================================
  // MATERIALS
  // ===================================================================
  const concDark = new THREE.MeshStandardMaterial({ color: 0x12122a, roughness: 0.9, metalness: 0.02 });
  const concMid = new THREE.MeshStandardMaterial({ color: 0x181830, roughness: 0.85, metalness: 0.02 });
  const concLight = new THREE.MeshStandardMaterial({ color: 0x20203a, roughness: 0.8, metalness: 0.02 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x3a3a52, roughness: 0.35, metalness: 0.7 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x1a1a32, roughness: 0.55, metalness: 0.25 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xaaccee, transparent: true, opacity: 0.2,
    roughness: 0.05, metalness: 0.1, side: THREE.DoubleSide,
  });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x20204a, roughness: 0.85, metalness: 0.02 });

  // Seating row base geometry (width=1, scaled per row via transform)
  const rowGeo = new THREE.BoxGeometry(1, 0.12, 0.55);
  const rowInstances = [];

  function addRow(cx, cy, cz, w, ry) {
    rowInstances.push({ x: cx, y: cy, z: cz, w, ry: ry || 0 });
  }

  // ===================================================================
  // 1. SIDELINE GRANDSTANDS (East & West)
  // ===================================================================
  [-1, 1].forEach(side => {
    // Lower bowl structural mass
    const lowerBox = new THREE.Mesh(new THREE.BoxGeometry(11, 4, 96), concDark);
    lowerBox.position.set(side * 41.5, 2, 0);
    lowerBox.castShadow = true;
    lowerBox.receiveShadow = true;
    scene.add(lowerBox);

    // Upper bowl structural mass
    const upperBox = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 88), concMid);
    upperBox.position.set(side * 46, 6.5, 0);
    upperBox.castShadow = true;
    upperBox.receiveShadow = true;
    scene.add(upperBox);

    // Lower bowl facade (front edge)
    const lowerFace = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 96), concLight);
    lowerFace.position.set(side * 36, 2, 0);
    scene.add(lowerFace);

    // Upper bowl facade
    const upperFace = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 88), concLight);
    upperFace.position.set(side * 42, 6.5, 0);
    scene.add(upperFace);

    // Exterior rear wall
    const rearWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10.5, 98), concLight);
    rearWall.position.set(side * 50, 5.25, 0);
    scene.add(rearWall);

    // Lower bowl seating rows (12 rows, raked)
    for (let row = 0; row < 12; row++) {
      const xOff = 0.85;
      const yOff = 0.3;
      addRow(side * (37 + row * xOff), 2.0 + row * yOff, 0, 95 - row * 0.8, -Math.PI / 2);
    }

    // Upper bowl seating rows (8 rows, steeper rake)
    for (let row = 0; row < 8; row++) {
      const xOff = 0.9;
      const yOff = 0.45;
      addRow(side * (42 + row * xOff), 6.5 + row * yOff, 0, 87 - row * 0.8, -Math.PI / 2);
    }

    // Concourse slab between lower and upper bowls
    const concourse = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.15, 92), concLight);
    concourse.position.set(side * 40, 5.7, 0);
    scene.add(concourse);

    // Cantilever roof (thin profile, stays above upper bowl only)
    const roof = new THREE.Mesh(new THREE.BoxGeometry(8, 0.12, 90), roofMat);
    roof.position.set(side * 46, 11.8, 0);
    roof.castShadow = true;
    scene.add(roof);

    // Roof front edge beam
    const roofBeam = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 91), steelMat);
    roofBeam.position.set(side * 42, 12.0, 0);
    scene.add(roofBeam);

    // Roof rear beam
    const roofRear = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 91), steelMat);
    roofRear.position.set(side * 50, 12.0, 0);
    scene.add(roofRear);

    // Roof lateral ribs
    for (let z = -42; z <= 42; z += 6) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 0.1), steelMat);
      rib.position.set(side * 46, 11.9, z);
      scene.add(rib);
    }

    // Support columns at rear wall
    for (let z = -44; z <= 44; z += 10) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 10, 6), steelMat);
      col.position.set(side * 50, 5.25, z);
      scene.add(col);
    }
  });

  // ===================================================================
  // 2. END STANDS (North & South, behind goals)
  // ===================================================================
  [-1, 1].forEach(side => {
    // Lower bowl structural mass
    const lowerEnd = new THREE.Mesh(new THREE.BoxGeometry(64, 4, 7), concDark);
    lowerEnd.position.set(0, 2, side * 57.5);
    lowerEnd.castShadow = true;
    lowerEnd.receiveShadow = true;
    scene.add(lowerEnd);

    // Upper bowl structural mass
    const upperEnd = new THREE.Mesh(new THREE.BoxGeometry(58, 3.5, 5.5), concMid);
    upperEnd.position.set(0, 6, side * 59.5);
    upperEnd.castShadow = true;
    upperEnd.receiveShadow = true;
    scene.add(upperEnd);

    // Lower bowl facade
    const endFace = new THREE.Mesh(new THREE.BoxGeometry(64, 4.2, 0.3), concLight);
    endFace.position.set(0, 2, side * 54);
    scene.add(endFace);

    // Upper bowl facade
    const upperEndFace = new THREE.Mesh(new THREE.BoxGeometry(58, 3.7, 0.3), concLight);
    upperEndFace.position.set(0, 6, side * 57);
    scene.add(upperEndFace);

    // Exterior rear wall
    const endRear = new THREE.Mesh(new THREE.BoxGeometry(66, 7.5, 0.4), concLight);
    endRear.position.set(0, 3.75, side * 65);
    scene.add(endRear);

    // Lower bowl seating rows (8 rows)
    for (let row = 0; row < 8; row++) {
      const zOff = 0.75;
      const yOff = 0.4;
      addRow(0, 2.1 + row * yOff, side * (55 + row * zOff), 62 - row * 0.8);
    }

    // Upper bowl seating rows (6 rows)
    for (let row = 0; row < 6; row++) {
      const zOff = 0.8;
      const yOff = 0.45;
      addRow(0, 6.2 + row * yOff, side * (57.5 + row * zOff), 56 - row * 0.8);
    }

    // Concourse slab
    const endConc = new THREE.Mesh(new THREE.BoxGeometry(60, 0.15, 2), concLight);
    endConc.position.set(0, 5.2, side * 57);
    scene.add(endConc);

    // Thin roof
    const endRoof = new THREE.Mesh(new THREE.BoxGeometry(60, 0.1, 6), roofMat);
    endRoof.position.set(0, 8.5, side * 62);
    endRoof.castShadow = true;
    scene.add(endRoof);

    // Roof beams
    for (let x = -26; x <= 26; x += 6) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 6), steelMat);
      beam.position.set(x, 8.65, side * 62);
      scene.add(beam);
    }
  });

  // ===================================================================
  // 3. CORNER SECTIONS — continuous connection between stands
  // ===================================================================
  [-1, 1].forEach(sx => {
    [-1, 1].forEach(sz => {
      // Lower corner structural mass
      const cornerLow = new THREE.Mesh(new THREE.BoxGeometry(12, 4, 10), concDark);
      cornerLow.position.set(sx * 44, 2, sz * 59);
      cornerLow.castShadow = true;
      scene.add(cornerLow);

      // Upper corner structural mass
      const cornerUp = new THREE.Mesh(new THREE.BoxGeometry(10, 3.5, 8), concMid);
      cornerUp.position.set(sx * 45, 6, sz * 60);
      cornerUp.castShadow = true;
      scene.add(cornerUp);

      // Lower corner seating (6 rows, diagonal fan)
      for (let row = 0; row < 6; row++) {
        const f = row / 5;
        const cx = sx * (38 + f * 7);
        const cy = 2.3 + row * 0.28;
        const cz = sz * (56 + f * 6);
        addRow(cx, cy, cz, 6 + f * 6);
      }

      // Upper corner seating (4 rows)
      for (let row = 0; row < 4; row++) {
        const f = row / 3;
        const cx = sx * (39 + f * 5);
        const cy = 6.5 + row * 0.35;
        const cz = sz * (57.5 + f * 4);
        addRow(cx, cy, cz, 5 + f * 4);
      }
    });
  });

  // ===================================================================
  // 4. RENDER ALL SEATING ROWS AS INSTANCED MESH
  // ===================================================================
  if (rowInstances.length > 0) {
    const rowMesh = new THREE.InstancedMesh(rowGeo, seatMat, rowInstances.length);
    rowMesh.receiveShadow = true;
    const dummy = new THREE.Object3D();
    rowInstances.forEach((r, i) => {
      dummy.position.set(r.x, r.y, r.z);
      dummy.scale.set(r.w, 1, 1);
      dummy.rotation.set(0, r.ry, 0);
      dummy.updateMatrix();
      rowMesh.setMatrixAt(i, dummy.matrix);
    });
    rowMesh.instanceMatrix.needsUpdate = true;
    rowMesh.count = rowInstances.length;
    scene.add(rowMesh);
  }

  // ===================================================================
  // 5. PITCH-SIDE BARRIERS & WALKWAYS
  // ===================================================================
  const barrierMat = new THREE.MeshStandardMaterial({ color: 0x2a2a44, roughness: 0.7, metalness: 0.15 });

  [-1, 1].forEach(side => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 104), barrierMat);
    b.position.set(side * (HALF_W + 2), 0.25, 0);
    b.castShadow = true;
    scene.add(b);
  });
  [-1, 1].forEach(side => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(70, 0.5, 0.5), barrierMat);
    b.position.set(0, 0.25, side * (HALF_L + 2));
    scene.add(b);
  });

  const walkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a40, roughness: 0.9, metalness: 0.02 });
  [-1, 1].forEach(side => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 100), walkMat);
    w.position.set(side * (HALF_W + 4.25), 0.07, 0);
    scene.add(w);
  });

  // ===================================================================
  // 6. ENTRANCE TUNNEL (north end)
  // ===================================================================
  const tunnelMat = new THREE.MeshStandardMaterial({ color: 0x080816, roughness: 0.9, metalness: 0.02 });
  const tunnelBorder = new THREE.MeshStandardMaterial({ color: 0x2a2a46, roughness: 0.5, metalness: 0.4 });

  const tunnel = new THREE.Mesh(new THREE.BoxGeometry(5, 3.5, 10), tunnelMat);
  tunnel.position.set(0, 1.75, -(HALF_L + 54));
  scene.add(tunnel);

  const archFrame = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.15, 8, 14, Math.PI), tunnelBorder);
  archFrame.position.set(0, 3.5, -(HALF_L + 49));
  archFrame.rotation.x = Math.PI / 2;
  scene.add(archFrame);

  [-1, 1].forEach(s => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.5, 0.25), tunnelBorder);
    pillar.position.set(s * 2.5, 1.75, -(HALF_L + 49));
    scene.add(pillar);
  });

  const tunnelGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xffeecc, transparent: true, opacity: 0.12, side: THREE.DoubleSide }),
  );
  tunnelGlow.position.set(0, 3.3, -(HALF_L + 50));
  scene.add(tunnelGlow);

  const entrance = new THREE.Mesh(
    new THREE.PlaneGeometry(4.5, 3),
    new THREE.MeshBasicMaterial({ color: 0x000000 }),
  );
  entrance.position.set(0, 1.5, -(HALF_L + 48.5));
  scene.add(entrance);

  [-1, 1].forEach(s => {
    const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 8), concMid);
    sideWall.position.set(s * 3, 1.5, -(HALF_L + 46));
    scene.add(sideWall);
  });

  // ===================================================================
  // 7. HOME & AWAY DUGOUTS
  // ===================================================================
  [-1, 1].forEach(side => {
    const base = new THREE.Mesh(new THREE.BoxGeometry(7, 0.3, 2.5), concDark);
    base.position.set(side * (HALF_W + 3.2), 0.15, -6.5);
    base.receiveShadow = true;
    scene.add(base);

    const benchMat = _mat(0x333358, 0.6, 0.05);
    const bench = new THREE.Mesh(new THREE.BoxGeometry(6, 0.15, 0.5), benchMat);
    bench.position.set(side * (HALF_W + 3.2), 0.65, -6.5);
    scene.add(bench);

    [-2.5, 0, 2.5].forEach(xOff => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6), steelMat);
      leg.position.set(side * (HALF_W + 3.2) + xOff, 0.35, -6.5);
      scene.add(leg);
    });

    const roofGlass = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.05, 3), glassMat);
    roofGlass.position.set(side * (HALF_W + 3.2), 2, -6.5);
    scene.add(roofGlass);

    [-1.2, 1.2].forEach(zOff => {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.08, 0.08), steelMat);
      frame.position.set(side * (HALF_W + 3.2), 2, -6.5 + zOff);
      scene.add(frame);
    });
    [-3.2, 3.2].forEach(xOff => {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 3), steelMat);
      frame.position.set(side * (HALF_W + 3.2) + xOff, 2, -6.5);
      scene.add(frame);
    });

    [-2.5, 2.5].forEach(xOff => {
      [-1, 1].forEach(zOff => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.7, 6), steelMat);
        post.position.set(side * (HALF_W + 3.2) + xOff, 1.05, -6.5 + zOff * 1.2);
        scene.add(post);
      });
    });
  });

  // ===================================================================
  // 8. SAFETY RAILINGS
  // ===================================================================
  const railingMat = new THREE.MeshStandardMaterial({ color: 0x44445a, roughness: 0.4, metalness: 0.5 });

  [-1, 1].forEach(side => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 82), railingMat);
    rail.position.set(side * 42, 10.6, 0);
    scene.add(rail);
    for (let z = -38; z <= 38; z += 4) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 4), railingMat);
      post.position.set(side * 42, 10.3, z);
      scene.add(post);
    }
  });

  [-1, 1].forEach(side => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 56), railingMat);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(0, 6.5, side * 57);
    scene.add(rail);
    for (let x = -26; x <= 26; x += 4) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 4), railingMat);
      post.position.set(x, 6.2, side * 57);
      scene.add(post);
    }
  });
}

// ===================================================================
// BUILD CROWD — instanced, lightweight, full-stadium
// ===================================================================
function _isValidSeat(x, z) {
  if (Math.abs(x) < HALF_W + 1 && Math.abs(z) < HALF_L + 1) return false;
  const dg = HALF_W + 3.2;
  if (Math.abs(Math.abs(x) - dg) < 4.5 && Math.abs(z + 6.5) < 2.5) return false;
  if (Math.abs(x) < 6 && z < -HALF_L - 2) return false;
  return true;
}

function _buildCrowd(scene, homeTeam, awayTeam) {
  const homeColors = _getTeamColors(homeTeam);
  const awayColors = _getTeamColors(awayTeam);

  const palette = [
    homeColors.crowd, awayColors.crowd,
    0xffffff, 0xe0e0e0, 0xcccccc,
    0x888888, 0x666666, 0x444444,
    0x222222, 0x111111,
    0x1a1a2e, 0x16213e, 0x0f3460,
    0x2d1b4e, 0x333355,
    0x8b1a1a, 0xcc3333, 0xcc6633,
    0xccaa33, 0x226622, 0x1a4a6a,
  ];

  const bodyGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.5, 4);
  bodyGeo.translate(0, 0.25, 0);
  const headGeo = new THREE.SphereGeometry(0.12, 4, 4);
  headGeo.translate(0, 0.65, 0);

  const bodyMat = new THREE.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0,
  });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xd4b896,
    roughness: 0.85,
    metalness: 0,
  });

  const seats = [];
  const SP = 0.4;

  // ---- Sideline stands (East & West) ----
  // Lower bowl: seating rows at x ∈ [37, 46.35], y ∈ [2.0, 4.75]
  [-1, 1].forEach(side => {
    for (let row = 0; row < 12; row++) {
      const y = 2.0 + row * 0.25;
      const x = side * (37 + row * 0.85);
      for (let z = -47; z <= 47; z += SP) {
        seats.push({ x, y, z, sec: 'sideline' });
      }
    }
    // Upper bowl: seating rows at x ∈ [42, 48.3], y ∈ [6.5, 8.95]
    for (let row = 0; row < 8; row++) {
      const y = 6.5 + row * 0.35;
      const x = side * (42 + row * 0.9);
      for (let z = -43; z <= 43; z += SP) {
        seats.push({ x, y, z, sec: 'sideline' });
      }
    }
  });

  // ---- End stands (North & South, behind goals) ----
  // Lower bowl: seating rows at z ∈ [55, 60.25], y ∈ [2.1, 5.3]
  [-1, 1].forEach(side => {
    for (let row = 0; row < 8; row++) {
      const y = 2.1 + row * 0.35;
      const z = side * (55 + row * 0.75);
      for (let x = -30; x <= 30; x += SP) {
        seats.push({ x, y, z, sec: 'end' });
      }
    }
    // Upper bowl: seating rows at z ∈ [57.5, 61.5], y ∈ [6.2, 8.45]
    for (let row = 0; row < 6; row++) {
      const y = 6.2 + row * 0.4;
      const z = side * (57.5 + row * 0.8);
      for (let x = -27; x <= 27; x += SP) {
        seats.push({ x, y, z, sec: 'end' });
      }
    }
  });

  // ---- Corner sections ----
  // Lower corner: seating at cx ∈ [38, 45], cz ∈ [56, 62], y ∈ [2.3, 3.7]
  [-1, 1].forEach(sx => {
    [-1, 1].forEach(sz => {
      for (let row = 0; row < 6; row++) {
        const f = row / 5;
        const y = 2.3 + row * 0.28;
        const cx = sx * (38 + f * 7);
        const cz = sz * (56 + f * 6);
        for (let ox = -3; ox <= 3; ox += 0.6) {
          for (let oz = -3; oz <= 3; oz += 0.6) {
            seats.push({ x: cx + ox, y, z: cz + oz, sec: 'corner' });
          }
        }
      }
      // Upper corner: seating at cx ∈ [39, 44], cz ∈ [57.5, 61.5], y ∈ [6.5, 7.55]
      for (let row = 0; row < 4; row++) {
        const f = row / 3;
        const y = 6.5 + row * 0.35;
        const cx = sx * (39 + f * 5);
        const cz = sz * (57.5 + f * 4);
        for (let ox = -2.5; ox <= 2.5; ox += 0.6) {
          for (let oz = -2.5; oz <= 2.5; oz += 0.6) {
            seats.push({ x: cx + ox, y, z: cz + oz, sec: 'corner' });
          }
        }
      }
    });
  });

  const count = seats.length;

  const bodyMesh = new THREE.InstancedMesh(bodyGeo, bodyMat, count);
  const headMesh = new THREE.InstancedMesh(headGeo, headMat, count);
  bodyMesh.castShadow = true;
  headMesh.castShadow = true;

  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  let idx = 0;

  const skipEvery = 14;

  seats.forEach(s => {
    if (!_isValidSeat(s.x, s.z)) return;
    if (idx > 0 && idx % skipEvery === 0) {
      idx++;
      return;
    }

    const jx = (Math.random() - 0.5) * 0.12;
    const jz = (Math.random() - 0.5) * 0.12;
    const jy = (Math.random() - 0.5) * 0.08;
    const heightScale = 0.75 + Math.random() * 0.4;

    let facing;
    if (s.sec === 'sideline') {
      facing = s.x > 0 ? Math.PI : 0;
    } else if (s.sec === 'end') {
      facing = s.z > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      facing = Math.atan2(-s.z, -s.x);
    }

    dummy.position.set(s.x + jx, s.y + jy, s.z + jz);
    dummy.scale.set(1, heightScale, 1);
    dummy.rotation.y = facing + (Math.random() - 0.5) * 0.3;
    dummy.updateMatrix();
    bodyMesh.setMatrixAt(idx, dummy.matrix);

    dummy.position.y += 0.3;
    dummy.updateMatrix();
    headMesh.setMatrixAt(idx, dummy.matrix);

    const c = palette[Math.floor(Math.random() * palette.length)];
    col.setHex(c);
    bodyMesh.setColorAt(idx, col);

    idx++;
  });

  bodyMesh.count = idx;
  headMesh.count = idx;
  bodyMesh.instanceMatrix.needsUpdate = true;
  if (bodyMesh.instanceColor) bodyMesh.instanceColor.needsUpdate = true;
  headMesh.instanceMatrix.needsUpdate = true;

  const group = new THREE.Group();
  group.add(bodyMesh);
  group.add(headMesh);
  return group;
}

// ===================================================================
// BUILD FLOODLIGHTS
// ===================================================================
function _buildFloodlights(scene) {
  const towers = [];
  // Option A: 4 primary corner towers — one beyond each corner, illuminating diagonally
  const towerPositions = [
    [-HALF_W - 10, -HALF_L - 10],
    [+HALF_W + 10, -HALF_L - 10],
    [-HALF_W - 10, +HALF_L + 10],
    [+HALF_W + 10, +HALF_L + 10],
  ];

  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a50,
    roughness: 0.6,
    metalness: 0.3,
  });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    emissive: 0xfff4d6,
    emissiveIntensity: 0.3,
    roughness: 0.3,
    metalness: 0.4,
  });

  towerPositions.forEach(([x, z]) => {
    // Tapered main pole (base section) — 40 m total height
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.7, 12, 8),
      towerMat,
    );
    base.position.set(x, 6, z);
    base.castShadow = true;
    scene.add(base);

    // Upper pole (narrower)
    const upper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.4, 28, 8),
      towerMat,
    );
    upper.position.set(x, 26, z);
    upper.castShadow = true;
    scene.add(upper);

    // Cross arm array — longer to carry more floodlights
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.12, 0.15),
      towerMat,
    );
    arm.position.set(x, 38.5, z);
    scene.add(arm);

    // 7 light fixtures per tower, spaced evenly, all pointing at pitch centre
    [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].forEach(offset => {
      const housing = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.18, 0.45),
        headMat,
      );
      housing.position.set(x + offset, 38.9, z);
      scene.add(housing);
    });

    // Subtle glow sprite (smaller, lower opacity)
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 244, 214, 0.3)');
    grad.addColorStop(0.3, 'rgba(255, 244, 214, 0.08)');
    grad.addColorStop(1, 'rgba(255, 244, 214, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glowSpr = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    glowSpr.scale.set(10, 10, 1);
    glowSpr.position.set(x, 39, z);
    scene.add(glowSpr);

    towers.push({ base, upper, arm, x, z });
  });

  return towers;
}

// ===================================================================
// BUILD PLAYER FIGURE
// ===================================================================
function _buildPlayerFigure(p, scenario) {
  const isAway = p.team === 'away';
  const isGK = p.pos === 'GK';
  const kit = isAway ? DEMO_KITS.away : DEMO_KITS.home;

  const shirtColor = kit.shirt;
  const shortsColor = kit.shorts;
  const socksColor = kit.socks;
  const gkColor = kit.gk;

  const mainColor = isGK ? gkColor : shirtColor;

  const group = new THREE.Group();
  const H = PLAYER_HEIGHT;

  const skinMat = _mat(0xf0d5b8, 0.4, 0.02);

  // --- Ground shadow ---
  const shadow = new THREE.Mesh(
    _sharedGeo('shadow', () => new THREE.CircleGeometry(1.0, 16)),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  group.add(shadow);

  // --- Boots ---
  const bootMat = _mat(0x111111, 0.5, 0.1);
  [-0.1, 0.1].forEach(offset => {
    const boot = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.08, 0.22),
      bootMat,
    );
    boot.position.set(offset, 0.04, 0.04);
    boot.castShadow = true;
    group.add(boot);
  });

  // --- Lower legs (socks) ---
  const legMat = _mat(isGK ? gkColor : socksColor, 0.55, 0.05);
  const lowerLegH = 0.45;
  [-0.09, 0.09].forEach(offset => {
    const leg = new THREE.Mesh(
      _sharedGeo('lowerLeg', () => new THREE.CylinderGeometry(0.07, 0.06, lowerLegH, 8)),
      legMat,
    );
    leg.position.set(offset, 0.08 + lowerLegH / 2, 0);
    leg.castShadow = true;
    group.add(leg);
  });

  // --- Upper legs (thighs) ---
  const thighMat = _mat(isGK ? gkColor : shortsColor, 0.5, 0.05);
  const thighH = 0.35;
  [-0.09, 0.09].forEach(offset => {
    const thigh = new THREE.Mesh(
      _sharedGeo('thigh', () => new THREE.CylinderGeometry(0.09, 0.08, thighH, 8)),
      thighMat,
    );
    thigh.position.set(offset, 0.08 + lowerLegH + thighH / 2, 0);
    thigh.castShadow = true;
    group.add(thigh);
  });

  // --- Shorts ---
  const shortsH = 0.22;
  const shorts = new THREE.Mesh(
    _sharedGeo('shorts', () => new THREE.CylinderGeometry(0.24, 0.2, shortsH, 10)),
    _mat(isGK ? gkColor : shortsColor, 0.4, 0.05),
  );
  shorts.position.y = 0.08 + lowerLegH + thighH + shortsH / 2;
  shorts.castShadow = true;
  group.add(shorts);

  // --- Torso (shirt) ---
  const torsoH = 0.62;
  const torso = new THREE.Mesh(
    _sharedGeo('torso', () => new THREE.CylinderGeometry(0.32, 0.24, torsoH, 10)),
    _mat(mainColor, 0.35, 0.05),
  );
  torso.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH / 2;
  torso.castShadow = true;
  group.add(torso);

  // --- Short sleeves ---
  const sleeveH = 0.1;
  [-0.33, 0.33].forEach(offset => {
    const sleeve = new THREE.Mesh(
      _sharedGeo('sleeve', () => new THREE.CylinderGeometry(0.08, 0.06, sleeveH, 8)),
      _mat(mainColor, 0.35, 0.05),
    );
    sleeve.position.set(offset, 0.08 + lowerLegH + thighH + shortsH + torsoH - sleeveH / 2 - 0.04, 0);
    sleeve.rotation.z = offset < 0 ? 0.25 : -0.25;
    sleeve.castShadow = true;
    group.add(sleeve);
  });

  // --- Arms (skin) ---
  const armH = 0.26;
  [-0.33, 0.33].forEach(offset => {
    const arm = new THREE.Mesh(
      _sharedGeo('arm', () => new THREE.CylinderGeometry(0.04, 0.05, armH, 6)),
      skinMat,
    );
    const armY = 0.08 + lowerLegH + thighH + shortsH + torsoH * 0.55;
    arm.position.set(offset, armY, 0);
    arm.castShadow = true;
    group.add(arm);
  });

  // --- Hands (skin) or GK gloves ---
  if (isGK) {
    const gloveMat = _mat(gkColor, 0.4, 0.05);
    [-0.33, 0.33].forEach(offset => {
      const glove = new THREE.Mesh(
        _sharedGeo('glove', () => new THREE.SphereGeometry(0.075, 6, 6)),
        gloveMat,
      );
      glove.position.set(offset, 0.08 + lowerLegH + thighH + shortsH + torsoH * 0.55 - armH, 0.04);
      group.add(glove);
    });
  } else {
    [-0.33, 0.33].forEach(offset => {
      const hand = new THREE.Mesh(
        _sharedGeo('hand', () => new THREE.SphereGeometry(0.045, 6, 6)),
        skinMat,
      );
      hand.position.set(offset, 0.08 + lowerLegH + thighH + shortsH + torsoH * 0.55 - armH, 0.04);
      group.add(hand);
    });
  }

  // --- Neck ---
  const neck = new THREE.Mesh(
    _sharedGeo('neck', () => new THREE.CylinderGeometry(0.08, 0.1, 0.06, 8)),
    skinMat,
  );
  neck.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH + 0.03;
  group.add(neck);

  // --- Head ---
  const headMat = _mat(0xf0d5b8, 0.4, 0.02);
  const headR = isGK ? 0.19 : 0.17;
  const head = new THREE.Mesh(
    _sharedGeo('head', () => new THREE.SphereGeometry(headR, 10, 10)),
    headMat,
  );
  head.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH + 0.06 + headR;
  head.castShadow = true;
  group.add(head);

  // --- Hair ---
  const hairMat = _mat(0x2d1a0e, 0.7, 0.02);
  const hair = new THREE.Mesh(
    _sharedGeo('hair', () => new THREE.SphereGeometry(headR * 1.05, 8, 6)),
    hairMat,
  );
  hair.position.y = 0.08 + lowerLegH + thighH + shortsH + torsoH + 0.06 + headR * 1.15;
  hair.scale.set(1, 0.5, 1);
  group.add(hair);

  // --- Kit number sprite ---
  const numberSprite = _createShirtNumber(p.number, '#ffffff');
  numberSprite.position.set(0, H + 0.15, 0);
  numberSprite.scale.set(0.6, 0.6, 1);
  group.add(numberSprite);

  // --- Fatigue ring ---
  const fatigueRing = new THREE.Mesh(
    new THREE.RingGeometry(0.6, 0.75, 20),
    new THREE.MeshBasicMaterial({
      color: _fatigueHex(p.fatigue),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  fatigueRing.rotation.x = -Math.PI / 2;
  fatigueRing.position.y = 0.03;
  group.add(fatigueRing);

  // --- Glow ring (hover) ---
  const glow = new THREE.Mesh(
    new THREE.RingGeometry(0.7, 0.85, 20),
    new THREE.MeshBasicMaterial({
      color: 0x00b4ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.035;
  group.add(glow);

  // --- Possession marker ---
  const possessionMarker = new THREE.Mesh(
    new THREE.RingGeometry(0.88, 1.08, 32),
    new THREE.MeshBasicMaterial({
      color: isAway ? DEMO_KITS.away.shirt : DEMO_KITS.home.shirt,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  possessionMarker.rotation.x = -Math.PI / 2;
  possessionMarker.position.y = 0.045;
  possessionMarker.renderOrder = 4;
  group.add(possessionMarker);

  // --- Hit mesh (raycaster) ---
  const hitMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, H, 8),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  hitMesh.position.y = H / 2;
  hitMesh.userData = p;
  group.add(hitMesh);

  // Store animation data
  group.userData = {
    phase: Math.random() * Math.PI * 2,
    armPhase: Math.random() * Math.PI * 2,
    facing: isAway ? 0 : Math.PI,
  };

  // Face toward opponent goal
  group.rotation.y = isAway ? 0 : Math.PI;

  return { group, hitMesh, glow, possessionMarker, data: p };
}

function _createShirtNumber(number, color = '#ffffff') {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  // Dark circle background
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fill();

  ctx.font = '800 72px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 6;
  ctx.fillStyle = color;
  ctx.fillText(String(number), size / 2, size / 2 + 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const sprite = new THREE.Sprite(mat);
  return sprite;
}

// ===================================================================
// BUILD BALL
// ===================================================================
function _buildBallMesh() {
  const group = new THREE.Group();

  const W = 1536, H = 768;
  const diffuseCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  const roughCanvas = document.createElement('canvas');
  diffuseCanvas.width = bumpCanvas.width = roughCanvas.width = W;
  diffuseCanvas.height = bumpCanvas.height = roughCanvas.height = H;

  const ctx = diffuseCanvas.getContext('2d');
  const bctx = bumpCanvas.getContext('2d');
  const rctx = roughCanvas.getContext('2d');

  ctx.fillStyle = '#f2efe7';
  ctx.fillRect(0, 0, W, H);
  bctx.fillStyle = '#8f8f8f';
  bctx.fillRect(0, 0, W, H);
  rctx.fillStyle = '#d8d8d8';
  rctx.fillRect(0, 0, W, H);

  function pseudoNoise(i) {
    return Math.sin(i * 127.1 + 19.7) * 43758.5453 % 1;
  }

  function drawGrain() {
    const img = ctx.getImageData(0, 0, W, H);
    const bump = bctx.getImageData(0, 0, W, H);
    const d = img.data;
    const bd = bump.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (pseudoNoise(i) - 0.5) * 7;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
      const p = 136 + (pseudoNoise(i + 11) - 0.5) * 28;
      bd[i] = bd[i + 1] = bd[i + 2] = p;
    }
    ctx.putImageData(img, 0, 0);
    bctx.putImageData(bump, 0, 0);
  }

  function panelPath(c, cx, cy, rx, ry, rot, sides = 6) {
    c.beginPath();
    for (let i = 0; i < sides; i++) {
      const a = rot + (i / sides) * Math.PI * 2;
      const wobble = i % 2 ? 0.88 : 1.06;
      const px = cx + Math.cos(a) * rx * wobble;
      const py = cy + Math.sin(a) * ry * wobble;
      i === 0 ? c.moveTo(px, py) : c.quadraticCurveTo(cx, cy, px, py);
    }
    c.closePath();
  }

  function fillPanel(cx, cy, rx, ry, rot, fill, edge = 'rgba(21,24,32,0.82)', sides = 6) {
    panelPath(ctx, cx, cy, rx, ry, rot, sides);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = edge;
    ctx.stroke();

    panelPath(bctx, cx, cy, rx, ry, rot, sides);
    bctx.lineJoin = 'round';
    bctx.lineWidth = 9;
    bctx.strokeStyle = '#3b3b3b';
    bctx.stroke();
    bctx.lineWidth = 3;
    bctx.strokeStyle = '#f0f0f0';
    bctx.stroke();

    panelPath(rctx, cx, cy, rx, ry, rot, sides);
    rctx.fillStyle = '#c9c9c9';
    rctx.fill();
    rctx.lineWidth = 7;
    rctx.strokeStyle = '#f0f0f0';
    rctx.stroke();
  }

  function seamCurve(x1, y1, cx, cy, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(28,31,38,0.82)';
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.stroke();

    bctx.beginPath();
    bctx.moveTo(x1, y1);
    bctx.quadraticCurveTo(cx, cy, x2, y2);
    bctx.lineCap = 'round';
    bctx.lineWidth = 8;
    bctx.strokeStyle = '#3f3f3f';
    bctx.stroke();
  }

  drawGrain();

  const bands = [0.18, 0.38, 0.58, 0.78];
  bands.forEach((v, band) => {
    for (let i = 0; i < 8; i++) {
      const u = (i + (band % 2 ? 0.5 : 0)) / 8;
      const cx = u * W;
      const cy = v * H;
      const accent = (i + band) % 4 === 0 ? '#102033' : (i + band) % 4 === 1 ? '#f4f1ea' : '#e5e1d8';
      fillPanel(cx, cy, 76, 48, (i * 0.38) + band, accent, 'rgba(26,29,36,0.76)', 6);
      if (cx < 90) fillPanel(cx + W, cy, 76, 48, (i * 0.38) + band, accent, 'rgba(26,29,36,0.76)', 6);
      if (cx > W - 90) fillPanel(cx - W, cy, 76, 48, (i * 0.38) + band, accent, 'rgba(26,29,36,0.76)', 6);
    }
  });

  for (let i = 0; i < 10; i++) {
    const x = (i / 10) * W;
    seamCurve(x, H * 0.04, x + W * 0.045, H * 0.22, x + W * 0.01, H * 0.40);
    seamCurve(x + W * 0.03, H * 0.60, x - W * 0.035, H * 0.78, x + W * 0.02, H * 0.96);
  }

  ['#00a7d8', '#ef3340', '#111827'].forEach((color, i) => {
    for (let j = 0; j < 3; j++) {
      const cx = (0.16 + j * 0.31 + i * 0.035) * W;
      const cy = (0.28 + i * 0.16) * H;
      fillPanel(cx, cy, 54, 22, -0.55 + i * 0.32, color, 'rgba(15,20,28,0.7)', 5);
    }
  });

  const vignette = ctx.createRadialGradient(W / 2, H / 2, W * 0.1, W / 2, H / 2, W * 0.62);
  vignette.addColorStop(0, 'rgba(255,255,255,0.08)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.11)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  const ballTex = new THREE.CanvasTexture(diffuseCanvas);
  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  const roughTex = new THREE.CanvasTexture(roughCanvas);
  [ballTex, bumpTex, roughTex].forEach(tex => {
    tex.anisotropy = 8;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
  });
  if (THREE.SRGBColorSpace) ballTex.colorSpace = THREE.SRGBColorSpace;

  const ballMat = new THREE.MeshPhysicalMaterial({
    map: ballTex,
    bumpMap: bumpTex,
    bumpScale: 0.012,
    roughnessMap: roughTex,
    roughness: 0.72,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.82,
    sheen: 0.18,
    sheenRoughness: 0.9,
  });
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(PROFESSIONAL_BALL_RADIUS, 64, 48),
    ballMat,
  );
  ball.position.y = -PROFESSIONAL_BALL_RADIUS;
  ball.castShadow = true;
  ball.receiveShadow = true;
  group.add(ball);

  // Tiny broadcast glint around the white panels, kept subtle so it reads as leather.
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.035,
    depthWrite: false,
  });
  const glowMesh = new THREE.Mesh(
    new THREE.SphereGeometry(PROFESSIONAL_BALL_RADIUS * 1.65, 16, 12),
    glowMat,
  );
  glowMesh.position.y = -PROFESSIONAL_BALL_RADIUS;
  group.add(glowMesh);

  // Reusable rotation helpers
  const _rotAxis = new THREE.Vector3();
  const _rotQuat = new THREE.Quaternion();

  return { group, ball, glowMesh, _rotAxis, _rotQuat };
}

// ===================================================================
// PITCH3D CLASS
// ===================================================================
class Pitch3D {
  constructor(containerId, scenario) {
    if (typeof THREE === 'undefined')
      throw new Error('Three.js is required for Pitch3D');
    this.container = document.getElementById(containerId);
    if (!this.container)
      throw new Error(`Pitch container "${containerId}" not found`);

    this.scenario = scenario || null;
    this.players = [];
    this._ballData = null;
    this._crowdGroup = null;
    this._flagData = [];
    this._adBoards = [];
    this._floodlightTowers = [];
    this._highlightLines = [];
    this._arrowMeshes = [];
    this._labels = [];
    this._passingLines = [];
    this.onPlayerClick = null;
    this.onPlayerHover = null;
    this.onPlayerLeave = null;
    this._cameraMode = 'broadcast';
    this._previewTargets = null;
    this._previewT = 0;
    this._compactness = 0.5;
    this._running = true;
    this._targetCamPos = null;
    this._targetCamTarget = null;
    this._camAnimating = false;
    this._camAnimStart = 0;
    this._camAnimDur = 800;
    this._startCamPos = null;
    this._startCamTarget = null;
    this._animTime = 0;
    this._currentOverlay = 'shape';
    this._highlightCircles = [];
    this._passingGraphDirty = true;
    this._pressingMeshes = [];
    this._pressingCircleGeo = null;
    this._pressingGradientTexture = null;
    this._attackZoneMeshes = [];
    this._attackZoneGradientTex = null;
    this._attackZoneData = null;
    this._passingGraphCache = null;
    this._lastPassingPositions = null;
    this._replaying = false;
    this._replayCreatedPlayers = [];
    this._replayLabel = null;
    this._ballCarrier = null;
    this._ballAttachedToCarrier = false;

    this._setupScene();
    this._setupLights();
    _buildPitch(this.scene, scenario);
    _buildGoals(this.scene);
    this._flagData = _buildCornerFlags(this.scene);
    this._adBoards = _buildAdvertisingBoards(this.scene, scenario?.id || '');
    _buildStadium(this.scene);
    this._floodlightTowers = _buildFloodlights(this.scene);

    if (scenario) {
      const homeTeam = scenario.home_team || '';
      const awayTeam = scenario.away_team || '';
      this._crowdGroup = _buildCrowd(this.scene, homeTeam, awayTeam);
      this.scene.add(this._crowdGroup);
    }

    this._animate();

    if (scenario) {
      this.setMatchContext(scenario);
    }

    window.addEventListener('resize', () => this._onResize());
  }

  // ===== SCENE SETUP =====
  _setupScene() {
    const W = this.container.clientWidth;
    const H = this.container.clientHeight || Math.round(W * 0.55) || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060D0A);
    this.scene.fog = new THREE.FogExp2(0x060D0A, 0.003);

    this.camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 400);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.85;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.controls.target.set(0, 0, 0);
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.minDistance = 15;
    this.controls.maxDistance = 130;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this._setCameraBroadcast();
    this.controls.update();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const el = this.renderer.domElement;
    el.addEventListener('click', (e) => this._onClick(e));
    el.addEventListener('mousemove', (e) => this._onMouseMove(e));
    el.addEventListener('mouseleave', () => this._setHover(null));
  }

  _setupLights() {
    // Low ambient for night atmosphere
    this.scene.add(new THREE.AmbientLight(0x223355, 0.12));

    // Main key flood (warm, casts shadows for entire scene)
    const key = new THREE.DirectionalLight(0xfff4d6, 1.6);
    key.position.set(20, 55, 15);
    key.castShadow = true;
    key.shadow.mapSize.set(4096, 4096);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 150;
    key.shadow.camera.left = -80;
    key.shadow.camera.right = 80;
    key.shadow.camera.top = 80;
    key.shadow.camera.bottom = -80;
    key.shadow.bias = -0.0003;
    key.shadow.normalBias = 0.03;
    key.shadow.radius = 4;
    this.scene.add(key);

    // Secondary flood fill (warm, opposite side — no shadows)
    const key2 = new THREE.DirectionalLight(0xffeecc, 0.7);
    key2.position.set(-20, 50, -15);
    this.scene.add(key2);

    // Back rim (cool, separates players from background)
    const rim = new THREE.DirectionalLight(0x8899cc, 0.3);
    rim.position.set(0, 25, -60);
    this.scene.add(rim);

    // Stadium ground ambient glow
    const amb2 = new THREE.HemisphereLight(0x223366, 0x112211, 0.2);
    this.scene.add(amb2);
  }

  // ===== CAMERA SYSTEM =====
  setDisplayMode(mode, instant = false) {
    // map UI display-mode values to camera-mode values
    const cm = { broadcast: 'broadcast', tactical: 'tactical', free: 'free' };
    this.setCameraMode(cm[mode] || mode, instant);
  }

  setCameraMode(mode, instant = false) {
    this._cameraMode = mode;
    const dur = instant ? 0 : 800;
    if (mode === 'broadcast') this._animateCameraTo(35, 32, 38, 0, 0, 0, dur);
    else if (mode === 'tactical') this._animateCameraTo(0, 72, 0.1, 0, 0, 0, dur);
    else if (mode === 'free') this._animateCameraTo(50, 18, 50, 0, 0, 0, dur);
  }

  _setCameraBroadcast() {
    this.camera.position.set(35, 32, 38);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  _animateCameraTo(px, py, pz, tx, ty, tz, dur = 800) {
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const endPos = new THREE.Vector3(px, py, pz);
    const endTarget = new THREE.Vector3(tx, ty, tz);

    if (dur === 0) {
      this.camera.position.copy(endPos);
      this.controls.target.copy(endTarget);
      this.camera.lookAt(endTarget);
      this.controls.update();
      return;
    }

    this._camAnimating = true;
    this._camAnimStart = performance.now();
    this._camAnimDur = dur;
    this._startCamPos = startPos;
    this._startCamTarget = startTarget;
    this._targetCamPos = endPos;
    this._targetCamTarget = endTarget;
  }

  // ===== DATA-DRIVEN SCENE =====
  setMatchContext(scenario) {
    if (!scenario) return;
    this.scenario = scenario;
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const diff = Math.abs(hScore - aScore);
    const half = getMatchMinute ? getMatchMinute(scenario) : 67;
    this._compactness = Math.max(0.2, Math.min(0.8, 0.5 - diff * 0.08 + (half > 80 ? 0.1 : 0)));

    this._buildBall(scenario);
    this._setHighlight(scenario);
    this._buildAttackDirection(scenario);
    this._buildFormationLabels(scenario);
  }

  // ===== FORMATION LABELS =====
  _buildFormationLabels(scenario) {
    this._clearLabels();
    if (!scenario) return;
    const home = scenario.home_team || '';
    const away = scenario.away_team || '';
    const hFmt = scenario.home_formation || '';
    const aFmt = scenario.away_formation || '';
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;

    this._add3DLabel(`${home} ${hFmt}`, -30, 0.5, -58, 0x75aadb, 'left');
    this._add3DLabel(`${hScore}`, -34, 0.5, -55.5, 0xffffff, 'left', 1.0);
    this._add3DLabel(`${away} ${aFmt}`, 30, 0.5, -58, 0xed1c24, 'right');
    this._add3DLabel(`${aScore}`, 34, 0.5, -55.5, 0xffffff, 'right', 1.0);

    // Minute label
    const minute = getMatchMinute ? getMatchMinute(scenario) : 67;
    this._add3DLabel(`${minute}'`, 0, 0.5, -58, 0x00b4ff, 'center', 0.7);
  }

  _add3DLabel(text, x, y, z, color, align = 'center', scale = 0.6) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    ctx.clearRect(0, 0, 512, 128);
    ctx.font = '700 52px Arial, sans-serif';
    ctx.textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 16;
    const c = new THREE.Color(color);
    ctx.fillStyle = `rgb(${c.r*255|0},${c.g*255|0},${c.b*255|0})`;
    const tx = align === 'left' ? 10 : align === 'right' ? 502 : 256;
    ctx.fillText(text, tx, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const sprite = new THREE.Sprite(mat);
    const aspect = text.length * 0.12;
    sprite.scale.set(aspect * scale, scale, 1);
    sprite.position.set(x, y, z);
    this.scene.add(sprite);
    this._labels.push(sprite);
  }

  _clearLabels() {
    this._labels.forEach(l => {
      this.scene.remove(l);
      if (l.material.map) l.material.map.dispose();
      l.material.dispose();
    });
    this._labels = [];
  }

  // ===== BALL =====
  _buildBall(scenario) {
    if (this._ballData) {
      this.scene.remove(this._ballData.group);
      if (this._ballData.shadow) {
        this.scene.remove(this._ballData.shadow);
        if (this._ballData.shadow.material?.map) this._ballData.shadow.material.map.dispose();
        this._ballData.shadow.geometry.dispose();
        this._ballData.shadow.material.dispose();
      }
      this._ballData = null;
    }
    this._setBallCarrier(null, false);

    const events = scenario.replay_events || [];
    if (!events.length) return;

    const last = events[events.length - 1];
    let bx = 0.5;
    if (last.description) {
      const desc = last.description.toLowerCase();
      const home = (scenario.home_team || '').toLowerCase();
      if (desc.includes(home) || desc.includes('for')) bx = 0.65;
      else bx = 0.35;

      if (last.type === 'goal' || last.type === 'shot') bx = 0.75;
      if (last.type === 'substitution' || last.type === 'yellow_card') bx = 0.5;
    }

    const bz = 0.5;
    const w = { x: (bx - 0.5) * 68, z: (0.5 - bz) * 105 };

    const ballGroup = _buildBallMesh();
    ballGroup.group.position.set(w.x, 0.22, w.z);
    this.scene.add(ballGroup.group);

    // Ball shadow on ground
    // Soft shadow texture with radial gradient
    const sw = 64, sh = 64;
    const sc = document.createElement('canvas');
    sc.width = sw; sc.height = sh;
    const sctx = sc.getContext('2d');
    const sgrd = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sgrd.addColorStop(0, 'rgba(0,0,0,0.30)');
    sgrd.addColorStop(0.42, 'rgba(0,0,0,0.14)');
    sgrd.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = sgrd;
    sctx.fillRect(0, 0, sw, sh);
    const shadowTex = new THREE.CanvasTexture(sc);

    const ballShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.23, 24),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      }),
    );
    ballShadow.rotation.x = -Math.PI / 2;
    ballShadow.position.set(w.x, 0.01, w.z);
    this.scene.add(ballShadow);

    this._ballData = ballGroup;
    this._ballData.shadow = ballShadow;
    this._ballData.restPos = { x: w.x, z: w.z };
    this._ballData._prevPos = { x: w.x, z: w.z };

    const cutoff = typeof getMatchMinute === 'function' ? getMatchMinute(scenario) : 60;
    const relevant = events.filter(e => (e.minute || 0) <= cutoff && e.player);
    const possessionEvent = [...relevant].reverse().find(e =>
      e.type !== 'substitution' && e.type !== 'yellow_card' && e.type !== 'red_card'
    );
    if (possessionEvent) this._setBallCarrierFromEvent(possessionEvent);
  }

  // ===== TACTICAL HIGHLIGHTS =====
  _setHighlight(scenario) {
    this._clearHighlights();
    if (!scenario) return;

    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const trailing = hScore < aScore;
    const color = trailing ? 0x8bf55a : 0x3b82f6;

    const attMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });
    const zone = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 35),
      attMat,
    );
    zone.rotation.x = -Math.PI / 2;
    zone.position.set(0, 0.02, trailing ? 35 : -35);
    this.scene.add(zone);
    this._highlightLines.push(zone);

    // Half-space indicators
    const hsMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const sign = trailing ? 1 : -1;
    [-1, 1].forEach(side => {
      const hs = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 18),
        hsMat.clone(),
      );
      hs.rotation.x = -Math.PI / 2;
      hs.position.set(side * 16, 0.025, sign * 20);
      this.scene.add(hs);
      this._highlightLines.push(hs);
    });
  }

  _clearHighlights() {
    this._highlightLines.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._highlightLines = [];
  }

  _clearPassingLines() {
    this._passingLines.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._passingLines = [];
  }

  // ===== OVERLAY SYSTEM =====
  setOverlay(mode) {
    this._currentOverlay = mode;
    this._clearPassingLines();
    this._clearHighlightCircles();
    this._clearPressingOverlay();
    this._clearAttackOverlay();

    if (mode === 'pressing') {
      this._updatePressingOverlay();
    } else if (mode === 'attack') {
      this._updateAttackOverlay();
    } else if (mode === 'passing') {
      this._passingGraphDirty = true;
      this._drawPassingOverlay();
    } else if (mode === 'defensive') {
      this._drawDefensiveOverlay();
    }
  }

  markPassingDirty() {
    this._passingGraphDirty = true;
  }

  _clearPressingOverlay() {
    this._pressingMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.material) m.material.dispose();
    });
    this._pressingMeshes = [];
    if (this._pressingCircleGeo) {
      this._pressingCircleGeo.dispose();
      this._pressingCircleGeo = null;
    }
    if (this._pressingGradientTexture) {
      this._pressingGradientTexture.dispose();
      this._pressingGradientTexture = null;
    }
  }

  _createPressingGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.8)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.2)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    this._pressingGradientTexture = new THREE.CanvasTexture(canvas);
    return this._pressingGradientTexture;
  }

  _computePressingState3D() {
    const ballPos = this._ballData?.group.position;
    if (!ballPos || this.players.length < 4) return null;

    let carrier = null;
    let minDist = Infinity;
    this.players.forEach(p => {
      if (p.data.pos === 'GK') return;
      const d = Math.sqrt(
        (p.group.position.x - ballPos.x) ** 2 +
        (p.group.position.z - ballPos.z) ** 2,
      );
      if (d < minDist) { minDist = d; carrier = p; }
    });
    if (!carrier || minDist > PITCH_W * 0.15) return null;

    const pressingTeam = carrier.data.team === 'home' ? 'away' : 'home';
    const carrierPos = { x: carrier.group.position.x, z: carrier.group.position.z };
    const maxDist = PITCH_W * 0.3;

    const pressers = this.players
      .filter(p => p.data.team === pressingTeam && p.data.pos !== 'GK')
      .map(p => {
        const dx = carrierPos.x - p.group.position.x;
        const dz = carrierPos.z - p.group.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const pressure = Math.max(0, 100 - (dist / maxDist) * 100);
        return { player: p, pressure, isActive: pressure > 15, dist };
      });

    return { pressers, carrier, carrierPos };
  }

  _updatePressingOverlay() {
    const state = this._computePressingState3D();
    if (!state) {
      this._pressingMeshes.forEach(m => { m.visible = false; });
      return;
    }

    const active = state.pressers.filter(p => p.isActive);

    // Grow mesh pool as needed
    while (this._pressingMeshes.length < active.length) {
      const geo = this._pressingCircleGeo || (this._pressingCircleGeo = new THREE.CircleGeometry(1, 32));
      const tex = this._pressingGradientTexture || this._createPressingGradientTexture();
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        color: 0xc2410c,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.renderOrder = 1;
      this.scene.add(mesh);
      this._pressingMeshes.push(mesh);
    }

    active.forEach((p, i) => {
      const mesh = this._pressingMeshes[i];
      mesh.visible = true;
      const pos = p.player.group.position;
      const r = 1.0 + (p.pressure / 100) * 2.5;
      mesh.position.set(pos.x, 0.04, pos.z);
      mesh.scale.set(r, r, 1);
      mesh.renderOrder = 1;

      const int = p.pressure / 100;
      const hex = int > 0.7 ? 0xb91c1c : 0xc2410c;
      mesh.material.color.setHex(hex);
      mesh.material.opacity = 0.20 + int * 0.10;
      mesh.material.depthWrite = false;
    });

    for (let i = active.length; i < this._pressingMeshes.length; i++) {
      this._pressingMeshes[i].visible = false;
    }
  }

  _clearAttackOverlay() {
    this._attackZoneMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.material) m.material.dispose();
    });
    this._attackZoneMeshes = [];
    if (this._attackZoneGradientTex) {
      this._attackZoneGradientTex.dispose();
      this._attackZoneGradientTex = null;
    }
  }

  _createAttackZoneTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 256, 0);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.15, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.5, 'rgba(255,255,255,1)');
    grad.addColorStop(0.85, 'rgba(255,255,255,0.4)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 1);
    this._attackZoneGradientTex = new THREE.CanvasTexture(canvas);
    this._attackZoneGradientTex.wrapS = THREE.ClampToEdgeWrapping;
    return this._attackZoneGradientTex;
  }

  _updateAttackOverlay() {
    this._attackZoneData = computeAttackZones(this.scenario);
    const az = this._attackZoneData;
    if (!az) return;

    const leftPct = az.leftPct, centerPct = az.centerPct, rightPct = az.rightPct;
    const maxVal = Math.max(1, leftPct, centerPct, rightPct);
    const isDominantL = leftPct >= centerPct && leftPct >= rightPct;
    const isDominantC = centerPct >= leftPct && centerPct >= rightPct;
    const isDominantR = rightPct >= leftPct && rightPct >= centerPct;

    const thirdW = PITCH_W / 3;
    const zones = [
      { x: -HALF_W + thirdW / 2, w: thirdW, pct: leftPct, dominant: isDominantL },
      { x: 0, w: thirdW, pct: centerPct, dominant: isDominantC },
      { x: HALF_W - thirdW / 2, w: thirdW, pct: rightPct, dominant: isDominantR },
    ];

    while (this._attackZoneMeshes.length < 3) {
      const tex = this._attackZoneGradientTex || this._createAttackZoneTexture();
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, PITCH_L), mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0.04;
      mesh.renderOrder = 1;
      this.scene.add(mesh);
      this._attackZoneMeshes.push(mesh);
    }

    zones.forEach((z, i) => {
      const mesh = this._attackZoneMeshes[i];
      const intensity = Math.min(1, z.pct / maxVal);
      const alpha = 0.03 + intensity * 0.2;
      mesh.position.x = z.x;
      mesh.position.z = 0;
      mesh.scale.set(z.w, 1, 1);
      mesh.material.color.setHex(z.dominant ? 0x22c55e : 0x3b82f6);
      mesh.material.opacity = alpha;
      mesh.visible = true;
    });
  }

  // ── 3D PASSING LANES ──
  // Computes and renders passing lanes on the 3D pitch.
  // Mirrors the 2D tactical engine (pitch2d.js _computePassingGraph / _evaluatePass)
  // but uses 3D world coordinates from player meshes.
  // The 2D tactical engine remains the single source of truth;
  // this is a parallel evaluation in 3D coordinate space.

  _distToSegment3D(px, pz, ax, az, bx, bz) {
    const dx = bx - ax, dz = bz - az;
    const lenSq = dx * dx + dz * dz;
    if (lenSq === 0) return Math.sqrt((px - ax) ** 2 + (pz - az) ** 2);
    let t = ((px - ax) * dx + (pz - az) * dz) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx, cz = az + t * dz;
    return Math.sqrt((px - cx) ** 2 + (pz - cz) ** 2);
  }

  _evaluatePass3D(passerPos, receiverPos, opponents, isHome) {
    const dx = receiverPos.x - passerPos.x;
    const dz = receiverPos.z - passerPos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const pitchDiag = Math.sqrt(PITCH_W * PITCH_W + PITCH_L * PITCH_L);
    const normDist = dist / pitchDiag;

    const angle = Math.atan2(dz, dx);
    const forwardNorm = (isHome ? dx : -dx) / PITCH_W;
    const forwardScore = Math.max(0, Math.min(1, (forwardNorm + 0.3) / 0.6));

    const interceptR = PITCH_W * 0.045;
    let blocked = false;
    let blockSeverity = 0;
    let defsBetween = 0;

    opponents.forEach(def => {
      const dPos = def.group.position;
      const perpDist = this._distToSegment3D(
        dPos.x, dPos.z,
        passerPos.x, passerPos.z,
        receiverPos.x, receiverPos.z,
      );
      const along = Math.max(0, Math.min(1, (
        (dPos.x - passerPos.x) * dx +
        (dPos.z - passerPos.z) * dz
      ) / (dist * dist || 1)));

      if (perpDist < interceptR && along > 0.05 && along < 0.95) {
        blocked = true;
        blockSeverity += (1 - perpDist / interceptR) * (1 - Math.abs(along - 0.5) * 1.5);
        defsBetween++;
      }
    });

    const nearbyDefs = opponents.filter(def => {
      const dPos = def.group.position;
      return Math.sqrt(
        (dPos.x - receiverPos.x) ** 2 +
        (dPos.z - receiverPos.z) ** 2,
      ) < PITCH_W * 0.12;
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
      dist, angle, forwardNorm, blocked, confidence, category,
      defsBetween, spaceScore,
      completionPct: blocked
        ? Math.round(15 + confidence * 0.3)
        : Math.round(60 + confidence * 0.35),
      pressure: confidence >= 65 ? 'Low' : confidence >= 40 ? 'Medium' : 'High',
    };
  }

  _computePassingGraph3D() {
    if (this.players.length < 4) return null;

    // Determine ball carrier — priority: _ballCarrier (from events) → nearest-player heuristic
    let carrier = null;
    if (this._ballCarrier && this.players.includes(this._ballCarrier)) {
      carrier = this._ballCarrier;
    } else {
      const ballPos = this._ballData?.group.position;
      if (!ballPos) return null;
      let minDist = Infinity;
      this.players.forEach(p => {
        if (p.data.pos === 'GK') return;
        const d = Math.sqrt(
          (p.group.position.x - ballPos.x) ** 2 +
          (p.group.position.z - ballPos.z) ** 2,
        );
        if (d < minDist) { minDist = d; carrier = p; }
      });
    }
    if (!carrier) return null;

    const isHome = carrier.data.team === 'home';
    const carrierPos = { x: carrier.group.position.x, z: carrier.group.position.z };

    const teammates = this.players.filter(p =>
      p.data.team === carrier.data.team && p !== carrier && p.data.pos !== 'GK',
    );
    const opponents = this.players.filter(p =>
      p.data.team !== carrier.data.team && p.data.pos !== 'GK',
    );

    const maxRange = PITCH_W * 0.55;
    const edges = [];

    teammates.forEach(receiver => {
      const recvPos = { x: receiver.group.position.x, z: receiver.group.position.z };
      const dx = recvPos.x - carrierPos.x;
      const dz = recvPos.z - carrierPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > maxRange || dist < PITCH_W * 0.02) return;

      const result = this._evaluatePass3D(carrierPos, recvPos, opponents, isHome);
      if (result) {
        result.passer = carrier;
        result.receiver = receiver;
        edges.push(result);
      }
    });

    edges.sort((a, b) => b.confidence - a.confidence);
    const blocked = edges.filter(e => e.blocked).slice(0, 2);
    const safeRisky = edges.filter(e => !e.blocked).slice(0, 5);
    const displayEdges = [...safeRisky, ...blocked];

    return { edges: displayEdges, carrier, carrierPos, isHome };
  }

  _renderPassLane(edge) {
    const pPos = edge.passer.group.position;
    const rPos = edge.receiver.group.position;
    const dx = rPos.x - pPos.x;
    const dz = rPos.z - pPos.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.1) return;

    const midX = (pPos.x + rPos.x) / 2;
    const midZ = (pPos.z + rPos.z) / 2;
    const angle = Math.atan2(dx, dz);

    let color, opacity, width, emissiveColor;
    switch (edge.category) {
      case 'safe':
        color = 0x0ea5e9;   // dark saturated cyan
        opacity = 0.7;
        width = 0.14;
        emissiveColor = 0x0ea5e9;
        break;
      case 'risky':
        color = 0xd97706;   // dark amber
        opacity = 0.55;
        width = 0.1;
        emissiveColor = 0xd97706;
        break;
      case 'blocked':
        color = 0xdc2626;   // muted red
        opacity = 0.5;
        width = 0.1;
        emissiveColor = 0xdc2626;
        break;
    }

    // Ribbon body with additive blending for subtle emissive glow
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ribbon = new THREE.Mesh(
      new THREE.PlaneGeometry(width, len),
      mat,
    );
    ribbon.rotation.x = -Math.PI / 2;
    ribbon.rotation.z = angle;
    ribbon.position.set(midX, 0.05, midZ);
    ribbon.renderOrder = 1;
    this.scene.add(ribbon);
    this._passingLines.push(ribbon);

    // Slightly wider, fainter under-glow for depth
    const glowMat = mat.clone();
    glowMat.opacity = opacity * 0.25;
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 2.5, len),
      glowMat,
    );
    glow.rotation.x = -Math.PI / 2;
    glow.rotation.z = angle;
    glow.position.set(midX, 0.04, midZ);
    glow.renderOrder = 0;
    this.scene.add(glow);
    this._passingLines.push(glow);

    // Arrow head at receiver
    const headSize = 0.5;
    const headShape = new THREE.Shape();
    headShape.moveTo(0, 0);
    headShape.lineTo(-headSize * 0.4, -headSize);
    headShape.lineTo(headSize * 0.4, -headSize);
    headShape.closePath();
    const headMat = mat.clone();
    headMat.opacity = opacity * 0.9;
    const head = new THREE.Mesh(
      new THREE.ShapeGeometry(headShape),
      headMat,
    );
    head.rotation.x = -Math.PI / 2;
    head.position.set(rPos.x, 0.055, rPos.z);
    head.rotation.z = angle;
    head.renderOrder = 1;
    this.scene.add(head);
    this._passingLines.push(head);
  }

  _passingPositionsChanged() {
    if (!this._lastPassingPositions) return true;
    const ballPos = this._ballData?.group.position;
    if (!ballPos) return false;
    if (Math.abs(ballPos.x - this._lastPassingPositions.ball.x) > 0.01) return true;
    if (Math.abs(ballPos.z - this._lastPassingPositions.ball.z) > 0.01) return true;
    for (const p of this.players) {
      const prev = this._lastPassingPositions.players.get(p);
      if (!prev) return true;
      if (Math.abs(p.group.position.x - prev.x) > 0.01) return true;
      if (Math.abs(p.group.position.z - prev.z) > 0.01) return true;
    }
    return false;
  }

  _snapshotPassingPositions() {
    const map = new Map();
    for (const p of this.players) {
      map.set(p, { x: p.group.position.x, z: p.group.position.z });
    }
    this._lastPassingPositions = {
      ball: {
        x: this._ballData?.group.position.x || 0,
        z: this._ballData?.group.position.z || 0,
      },
      players: map,
    };
  }

  _drawPassingOverlay() {
    this._clearPassingLines();

    if (!this._ballData || this.players.length < 4) {
      this._passingGraphDirty = false;
      return;
    }

    const graph = this._computePassingGraph3D();
    if (!graph || !graph.edges.length) {
      this._passingGraphDirty = false;
      return;
    }

    this._passingGraphCache = graph;
    this._snapshotPassingPositions();
    this._passingGraphDirty = false;

    graph.edges.forEach(edge => this._renderPassLane(edge));
  }

  _drawDefensiveOverlay() {
    const homeDef = this.players.filter(p => {
      if (p.data.team !== 'home') return false;
      const pos = p.data.pos;
      return ['CB','DF','LB','RB','WB','DM','LCB','RCB','LWB','RWB'].includes(pos);
    });

    if (homeDef.length < 2) return;

    const avgX = homeDef.reduce((s, p) => s + p.group.position.x, 0) / homeDef.length;
    const avgZ = homeDef.reduce((s, p) => s + p.group.position.z, 0) / homeDef.length;

    const blockMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const block = new THREE.Mesh(
      new THREE.PlaneGeometry(25, 30),
      blockMat,
    );
    block.rotation.x = -Math.PI / 2;
    block.position.set(avgX, 0.04, avgZ);
    block.renderOrder = 1;
    this.scene.add(block);
    this._passingLines.push(block);

    // Outline
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    const outlineGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(25, 30));
    const outline = new THREE.LineSegments(outlineGeo, outlineMat);
    outline.rotation.x = -Math.PI / 2;
    outline.position.set(avgX, 0.045, avgZ);
    outline.renderOrder = 1;
    this.scene.add(outline);
    this._passingLines.push(outline);
  }

  _clearHighlightCircles() {
    this._highlightCircles.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._highlightCircles = [];
  }

  // ===== ATTACK DIRECTION =====
  _buildAttackDirection(scenario) {
    this._arrowMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._arrowMeshes = [];

    if (!scenario) return;
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const trailing = hScore < aScore;
    const color = trailing ? 0x8bf55a : 0x3b82f6;

    const arrowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    const dir = trailing ? 1 : -1;
    const shaft = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 20),
      arrowMat.clone(),
    );
    shaft.rotation.x = -Math.PI / 2;
    shaft.position.set(37, 0.03, dir * 5);
    this.scene.add(shaft);
    this._arrowMeshes.push(shaft);

    const headShape = new THREE.Shape();
    headShape.moveTo(0, dir * 4);
    headShape.lineTo(-1.5, dir * 0);
    headShape.lineTo(1.5, dir * 0);
    headShape.closePath();
    const headGeo = new THREE.ShapeGeometry(headShape);
    const head = new THREE.Mesh(headGeo, arrowMat.clone());
    head.rotation.x = -Math.PI / 2;
    head.position.set(37, 0.03, dir * 15);
    this.scene.add(head);
    this._arrowMeshes.push(head);
  }

  // ===== PLAYERS =====
  load(homePlayers, awayPlayers) {
    _clearPlayers(this.scene, this.players);
    this._ballCarrier = null;
    this._ballAttachedToCarrier = false;
    const all = [
      ...homePlayers.map((p) => ({ ...p, team: 'home' })),
      ...awayPlayers.map((p) => ({ ...p, team: 'away' })),
    ];
    this.players = all.map((p) => _createPlayer(this.scene, p, this.scenario));
  }

  // ===== TACTICAL OPTION PREVIEW =====
  setPreviewAction(action) {
    if (!action) { this._previewTargets = null; this._previewT = 0; return; }
    const a = action.toLowerCase();
    const players = this.players.filter(p => p.data.team === 'home');
    if (!players.length) return;

    this._previewTargets = players.map(p => {
      let dx = 0, dz = 0;
      if (a.includes('press') || a.includes('high line')) { dz = -8; }
      if (a.includes('drop') || a.includes('deep') || a.includes('defend')) { dz = 8; }
      if (a.includes('striker') || a.includes('forward')) {
        if (p.data.pos !== 'GK' && p.data.pos !== 'DF' && !p.data.pos?.includes('CB') && !p.data.pos?.includes('LB') && !p.data.pos?.includes('RB')) dz = -5;
      }
      if (a.includes('back 3') || a.includes('back five') || a.includes('back 5')) {
        if (p.data.pos?.includes('CB') || p.data.pos === 'DF') dz = 3;
      }
      return { idx: players.indexOf(p), dx, dz };
    });
    this._previewT = 0;
    this._animatePreview();
  }

  clearPreview() {
    this._previewTargets = null;
    this._previewT = 1;
    this._restorePlayerPositions();
  }

  _animatePreview() {
    if (!this._previewTargets || !this._previewTargets.length) return;
    const start = performance.now();
    const dur = 400;
    const step = (now) => {
      this._previewT = Math.min(1, (now - start) / dur);
      const t = _easeInOutCubic(this._previewT);
      this._previewTargets.forEach(pt => {
        const p = this.players[pt.idx];
        if (!p) return;
        const orig = p._origPos || { x: p.group.position.x, z: p.group.position.z };
        if (!p._origPos) p._origPos = { x: orig.x, z: orig.z };
        p.group.position.x = orig.x + pt.dx * t;
        p.group.position.z = orig.z + pt.dz * t;
      });
      if (this._previewT < 1) requestAnimationFrame(step);
      else this._restorePlayerPositions();
    };
    requestAnimationFrame(step);
  }

  _restorePlayerPositions() {
    this.players.forEach(p => {
      if (p._origPos) {
        p.group.position.x = p._origPos.x;
        p.group.position.z = p._origPos.z;
      }
    });
  }

  // ===== HISTORICAL REPLAY SYSTEM =====
  playReplayEvents(events, scenario) {
    if (!events || !events.length || !this._ballData) return;
    const cutOffMinute = typeof getMatchMinute === 'function' ? getMatchMinute(scenario) : 67;
    const filtered = events.filter(e => (e.minute || 0) > cutOffMinute);
    if (!filtered.length) return;
    this._replaying = true;

    const allPlayerData = [
      ...(scenario.home_players || []).map(p => ({ ...p, team: 'home' })),
      ...(scenario.away_players || []).map(p => ({ ...p, team: 'away' })),
    ];

    const finalHome = scenario.scoreline?.home || 0;
    const finalAway = scenario.scoreline?.away || 0;
    let postHome = 0, postAway = 0;
    filtered.forEach(e => {
      if (e.type === 'goal') {
        const t = this._getEventTeam(e.player, allPlayerData);
        if (t === 'home') postHome++; else postAway++;
      }
    });

    this._replayScore = { home: finalHome - postHome, away: finalAway - postAway };
    const homeEl = document.getElementById('home-score');
    const awayEl = document.getElementById('away-score');
    if (homeEl) homeEl.textContent = this._replayScore.home;
    if (awayEl) awayEl.textContent = this._replayScore.away;

    this._replayBallStartPos = {
      x: this._ballData.group.position.x,
      z: this._ballData.group.position.z,
    };

    this._runReplaySequence(filtered, allPlayerData);
  }

  _getEventTeam(playerName, allPlayerData) {
    if (!playerName) return 'home';
    const m = allPlayerData.find(p => p.name === playerName);
    return m ? m.team : 'home';
  }

  _findPlayerMesh(playerName) {
    if (!playerName) return null;
    const needle = playerName.toLowerCase();
    return this.players.find(p => {
      const name = p.data?.name;
      return name && (name === playerName || name.toLowerCase().includes(needle));
    }) || null;
  }

  _getBallCarrierPosition(player) {
    if (!player) return null;
    const dir = player.data.team === 'home' ? 1 : -1;
    return {
      x: player.group.position.x + 0.10,
      y: 0.22,
      z: player.group.position.z + dir * 0.46,
    };
  }

  _setBallWorldPosition(pos) {
    if (!this._ballData || !pos) return;
    this._ballData.group.position.set(pos.x, pos.y ?? 0.22, pos.z);
    if (this._ballData.shadow) {
      this._ballData.shadow.position.x = pos.x;
      this._ballData.shadow.position.z = pos.z;
    }
  }

  _setBallCarrier(player, attach = true) {
    this._ballCarrier = player || null;
    this._ballAttachedToCarrier = Boolean(player && attach);
    this.players.forEach(p => {
      if (!p.possessionMarker) return;
      p.possessionMarker.material.opacity = p === player ? 0.72 : 0;
    });
    if (this._ballAttachedToCarrier && player) {
      this._setBallWorldPosition(this._getBallCarrierPosition(player));
    }
    this.markPassingDirty();
  }

  _setBallCarrierFromEvent(event) {
    if (!event || !event.player) return null;
    const player = this._findPlayerMesh(event.player);
    if (!player) return null;
    if (event.type === 'substitution' || event.type === 'yellow_card' || event.type === 'red_card') {
      return player;
    }
    this._setBallCarrier(player, true);
    return player;
  }

  _syncBallToCarrier() {
    if (!this._ballAttachedToCarrier || !this._ballCarrier) return;
    this._setBallWorldPosition(this._getBallCarrierPosition(this._ballCarrier));
  }

  _animateBallToWorld(target, duration) {
    if (!this._ballData || !target) return Promise.resolve();
    this._ballAttachedToCarrier = false;
    const startX = this._ballData.group.position.x;
    const startY = this._ballData.group.position.y;
    const startZ = this._ballData.group.position.z;
    const dur = duration || 800;
    const startTime = performance.now();

    return new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - startTime) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        this._setBallWorldPosition({
          x: startX + (target.x - startX) * ease,
          y: startY + ((target.y ?? 0.22) - startY) * ease,
          z: startZ + (target.z - startZ) * ease,
        });
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  _delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async _runReplaySequence(events, allPlayerData) {
    for (const event of events) {
      if (!this._replaying || !this._running) break;
      const team = this._getEventTeam(event.player, allPlayerData);
      this._setBallCarrierFromEvent(event);
      switch (event.type) {
        case 'goal':
          await this._animateReplayGoal(event, team);
          break;
        case 'substitution':
          await this._animateReplaySub(event, team);
          break;
        case 'yellow_card':
          await this._animateReplayYellow(event, team);
          break;
        default:
          await this._delay(600);
          continue;
      }
      await this._delay(900);
    }
    this._showReplayComplete();
  }

  async _animateReplayGoal(event, team) {
    const isHome = team === 'home';
    const targetZ = isHome ? HALF_L - 1.5 : -HALF_L + 1.5;
    const targetX = 0;
    const dur = 1800;
    const player = this._setBallCarrierFromEvent(event);
    if (player) await this._delay(280);

    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide,
    });
    const flash = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), flashMat);
    flash.rotation.x = -Math.PI / 2;
    flash.position.set(targetX, 0.05, targetZ);
    this.scene.add(flash);

    let didIncrement = false;
    const scoreStart = performance.now();
    const scorePromise = new Promise(resolve => {
      const scoreStep = (now) => {
        const t = Math.min(1, (now - scoreStart) / dur);
        if (!didIncrement && t >= 0.7) {
          didIncrement = true;
          if (isHome) {
            this._replayScore.home++;
            const el = document.getElementById('home-score');
            if (el) el.textContent = this._replayScore.home;
          } else {
            this._replayScore.away++;
            const el = document.getElementById('away-score');
            if (el) el.textContent = this._replayScore.away;
          }
        }
        if (t < 1) requestAnimationFrame(scoreStep);
        else resolve();
      };
      requestAnimationFrame(scoreStep);
    });

    const flashPromise = new Promise(resolve => {
      const startTime = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - startTime) / dur);
        if (t > 0.6 && t < 0.85) {
          flash.material.opacity = ((t - 0.6) / 0.25) * 0.7;
        } else if (t >= 0.85) {
          flash.material.opacity = Math.max(0, (1 - (t - 0.85) / 0.15) * 0.7);
        }
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          this.scene.remove(flash);
          flash.geometry.dispose();
          flash.material.dispose();
          resolve();
        }
      };
      requestAnimationFrame(step);
    });

    await Promise.all([
      this._animateBallToWorld({ x: targetX, y: 0.22, z: targetZ }, dur),
      flashPromise,
      scorePromise,
    ]);
  }

  async _animateReplaySub(event, team) {
    const m = event.description.match(/replaces (.+?) \(/);
    if (!m) return;
    const outName = m[1].trim();
    const inName = event.player;
    if (!inName) return;
    const outPlayer = this._findPlayerMesh(outName);
    if (!outPlayer) return;

    const posX = outPlayer.group.position.x;
    const posZ = outPlayer.group.position.z;

    const origOpacity = [];
    outPlayer.group.traverse(child => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(mat => {
          origOpacity.push({ mesh: child, mat, opacity: mat.opacity });
          mat.transparent = true;
        });
      }
    });

    const fadeDur = 500;
    const fadeStart = performance.now();
    await new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - fadeStart) / fadeDur);
        origOpacity.forEach(({ mat }) => { mat.opacity = 1 - t; });
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });

    const subData = {
      name: inName, number: '?', pos: 'SUB',
      x: 0.5, y: 0.5, team, fatigue: 50,
    };
    const { group, hitMesh, glow, possessionMarker } = _buildPlayerFigure(subData, this.scenario);
    group.position.set(posX, 0, posZ);
    this.scene.add(group);
    const newPlayer = { group, data: subData, hitMesh, glow, possessionMarker };
    this.players.push(newPlayer);
    this._replayCreatedPlayers.push(newPlayer);

    group.traverse(child => {
      if (child.isMesh && child.material) {
        if (child === possessionMarker) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(mat => { mat.transparent = true; mat.opacity = 0; });
      }
    });
    if (possessionMarker) possessionMarker.material.opacity = 0;

    const fadeInStart = performance.now();
    await new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - fadeInStart) / fadeDur);
        group.traverse(child => {
          if (child.isMesh && child.material) {
            if (child === possessionMarker) return;
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(mat => { mat.transparent = true; mat.opacity = t; });
          }
        });
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  async _animateReplayYellow(event, team) {
    const player = this._findPlayerMesh(event.player);
    if (!player) return;
    const colored = [];
    player.group.traverse(child => {
      if (child.isMesh && child.material && child.material.color) {
        colored.push({ mesh: child, color: child.material.color.getHex() });
        child.material.color.setHex(0xffd700);
      }
    });
    await this._delay(200);
    const restoreStart = performance.now();
    const restoreDur = 400;
    return new Promise(resolve => {
      const step = (now) => {
        const t = Math.min(1, (now - restoreStart) / restoreDur);
        const gold = new THREE.Color(0xffd700);
        colored.forEach(({ mesh, color }) => {
          mesh.material.color.lerpColors(gold, new THREE.Color(color), t);
        });
        if (t < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  _showReplayComplete() {
    this._replaying = false;
    if (this._replayLabel) {
      this.scene.remove(this._replayLabel);
      if (this._replayLabel.material.map) this._replayLabel.material.map.dispose();
      this._replayLabel.material.dispose();
      this._replayLabel = null;
    }
    this.markPassingDirty();
  }

  // ===== INTERACTION =====
  _setHover(item) {
    this.hovered = item;
    this.renderer.domElement.style.cursor = item ? 'pointer' : 'default';
    this.players.forEach((p) => {
      p.glow.material.opacity = p === item ? 0.6 : 0;
      if (p === item) {
        p.glow.material.color.setHex(0x00b4ff);
      }
    });
  }

  _onMouseMove(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(
      this.players.map((p) => p.hitMesh),
    );
    const hit = hits.length
      ? this.players.find((p) => p.hitMesh === hits[0].object)
      : null;
    this._setHover(hit);
  }

  _onClick(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(
      this.players.map((p) => p.hitMesh),
    );

    if (hits.length && hits[0].object.userData && this.onPlayerClick) {
      const worldPos = new THREE.Vector3();
      hits[0].object.getWorldPosition(worldPos);
      worldPos.project(this.camera);
      const sx = (worldPos.x * 0.5 + 0.5) * rect.width + rect.left;
      const sy = (-worldPos.y * 0.5 + 0.5) * rect.height + rect.top;
      this.onPlayerClick(hits[0].object.userData, sx, sy);
    }
  }

  _onResize() {
    const W = this.container.clientWidth;
    const H = this.container.clientHeight || Math.round(W * 0.55) || 400;
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(W, H);
  }

  // ===== ANIMATION LOOP =====
  _animate() {
    if (!this._running) return;
    requestAnimationFrame(() => this._animate());

    const now = performance.now();
    this._animTime += 0.016;

    // Camera animation
    if (this._camAnimating) {
      const elapsed = now - this._camAnimStart;
      const t = Math.min(1, elapsed / this._camAnimDur);
      const ease = _easeInOutCubic(t);
      if (this._startCamPos && this._targetCamPos) {
        this.camera.position.lerpVectors(this._startCamPos, this._targetCamPos, ease);
      }
      if (this._startCamTarget && this._targetCamTarget) {
        this.controls.target.lerpVectors(this._startCamTarget, this._targetCamTarget, ease);
      }
      if (t >= 1) {
        this._camAnimating = false;
        this.camera.position.copy(this._targetCamPos);
        this.controls.target.copy(this._targetCamTarget);
      }
    }

    // Idle player animation
    this.players.forEach((p, i) => {
      const phase = p.group.userData.phase || 0;
      const armPhase = p.group.userData.armPhase || 0;
      const sway = Math.sin(this._animTime * 1.0 + phase) * 0.003;
      const breath = Math.sin(this._animTime * 0.8 + phase) * 0.002;
      p.group.position.y = sway;
      if (p.possessionMarker && p === this._ballCarrier) {
        p.possessionMarker.material.opacity = 0.58 + Math.sin(this._animTime * 5) * 0.14;
      }

      // Subtle arm swing
      const armChildren = p.group.children.filter(c =>
        c.geometry && c.geometry.type === 'CylinderGeometry' && Math.abs(c.position.y - (PLAYER_HEIGHT * 0.55)) < 0.3
      );
      armChildren.forEach((arm, ai) => {
        if (arm) {
          arm.rotation.z = (arm.position.x < 0 ? 0.2 : -0.2) + Math.sin(this._animTime * 1.5 + armPhase + ai) * 0.03;
        }
      });
    });

    // Corner flag animation
    this._flagData.forEach(fd => {
      const wave = Math.sin(this._animTime * 2.0 + fd.phase) * 0.1;
      fd.flag.rotation.y = fd.baseRot + wave;
      // Slight pole bend
      fd.pole.rotation.z = Math.sin(this._animTime * 1.8 + fd.phase) * 0.005;
    });

    // Ball gentle hover and natural rolling rotation
    if (this._ballData) {
      this._syncBallToCarrier();
      const ballPos = this._ballData.group.position;
      const ballMesh = this._ballData.ball;

      // Compute rotation from horizontal movement (rolling on pitch surface)
      if (this._ballData._prevPos && ballMesh) {
        const dx = ballPos.x - this._ballData._prevPos.x;
        const dz = ballPos.z - this._ballData._prevPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > 0.0001) {
          const axis = this._ballData._rotAxis;
          const q = this._ballData._rotQuat;
          axis.set(-dz, 0, dx).normalize();
          q.setFromAxisAngle(axis, dist / PROFESSIONAL_BALL_RADIUS);
          ballMesh.quaternion.premultiply(q);
        }
      }

      const hover = Math.sin(this._animTime * 1.5) * 0.02;
      this._ballData.group.position.y = 0.22 + hover;
      if (this._ballData.shadow) {
        this._ballData.shadow.position.x = ballPos.x;
        this._ballData.shadow.position.z = ballPos.z;
        this._ballData.shadow.material.opacity = 0.5 + Math.sin(this._animTime * 1.5) * 0.1;
      }
      if (this._ballData.glowMesh) {
        this._ballData.glowMesh.material.opacity = 0.03 + Math.sin(this._animTime * 2) * 0.02;
      }
      this._ballData._prevPos = { x: ballPos.x, z: ballPos.z };
    }

    // Auto-refresh passing lanes when positions change (skip during replay animations)
    if (this._currentOverlay === 'passing' && !this._replaying && this._ballData) {
      if (this._passingGraphDirty || this._passingPositionsChanged()) {
        this._drawPassingOverlay();
      }
    }

    // Live pressing overlay update
    if (this._currentOverlay === 'pressing') {
      this._updatePressingOverlay();
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  setCompactness(val) {
    this._compactness = Math.max(0.1, Math.min(0.9, val));
    this.scene.fog.density = 0.002 + (1 - this._compactness) * 0.004;
  }

  destroy() {
    this._running = false;
    this._replaying = false;
    this._clearHighlights();
    this._clearLabels();
    this._clearPassingLines();
    this._clearHighlightCircles();
    this._clearPressingOverlay();
    this._clearAttackOverlay();
    _clearPlayers(this.scene, this.players);
    this._ballCarrier = null;
    this._ballAttachedToCarrier = false;
    if (this._replayCreatedPlayers.length) {
      _clearPlayers(this.scene, this._replayCreatedPlayers);
      this._replayCreatedPlayers = [];
    }
    if (this._ballData) {
      this.scene.remove(this._ballData.group);
      if (this._ballData.shadow) {
        this.scene.remove(this._ballData.shadow);
        if (this._ballData.shadow.material?.map) this._ballData.shadow.material.map.dispose();
        this._ballData.shadow.geometry.dispose();
        this._ballData.shadow.material.dispose();
      }
      this._ballData = null;
    }
    if (this._crowdGroup) {
      this.scene.remove(this._crowdGroup);
    }
    if (this._replayLabel) {
      this.scene.remove(this._replayLabel);
      if (this._replayLabel.material.map) this._replayLabel.material.map.dispose();
      this._replayLabel.material.dispose();
      this._replayLabel = null;
    }
    this._arrowMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this._adBoards.forEach(b => {
      this.scene.remove(b);
    });
    this.renderer.dispose();
    this.container.innerHTML = '';
    this.players = [];
  }
}

// ===================================================================
// FACTORY HELPERS
// ===================================================================
function _createPlayer(scene, p, scenario) {
  const { group, hitMesh, glow, possessionMarker, data } = _buildPlayerFigure(p, scenario);
  const w = _pNormToWorld(p);
  group.position.set(w.x, 0, w.z);
  scene.add(group);
  return { group, data: p, hitMesh, glow, possessionMarker };
}

function _clearPlayers(scene, players) {
  players.forEach((item) => {
    scene.remove(item.group);
    item.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((m) => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      }
    });
  });
}

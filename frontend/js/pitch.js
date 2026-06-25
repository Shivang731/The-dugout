// 3D pitch — broadcast‑quality match experience
// Works with game.js which expects `new Pitch3D('pitch-container')`

function _pNormToWorld(p) {
  const x = (p.x - 0.5) * 68;
  const z = p.team === "away"
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

function _buildPlayerFigure(p, scenario) {
  const isAway = p.team === "away";
  const isGK = p.pos === "GK";

  const homeColor = scenario?.home_color || 0x3b82f6;
  const awayColor = scenario?.away_color || 0x8bf55a;
  const mainColor = isAway ? awayColor : homeColor;
  const gkColor = isAway ? 0x1d4ed8 : 0x2563eb;
  const color = isGK ? gkColor : mainColor;

  const shirtColor = new THREE.Color(color);
  const darkShirt = shirtColor.clone().multiplyScalar(0.7);
  const shortsColor = !isAway ? 0x1e3a8a : 0x2d6a1e;

  const group = new THREE.Group();

  // --- shadow ---
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.0, 28),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  group.add(shadow);

  // --- legs ---
  const legMat = _mat(0x1a1a2e, 0.6, 0.05);
  const legRadius = isGK ? 0.18 : 0.14;
  [-0.15, 0.15].forEach(offset => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(legRadius * 0.7, legRadius, 0.25, 8), legMat);
    leg.position.set(offset, 0.12, 0);
    leg.castShadow = true;
    group.add(leg);
    const foot = new THREE.Mesh(
      new THREE.SphereGeometry(legRadius * 0.6, 6, 6),
      _mat(0xffffff, 0.7, 0.05)
    );
    foot.position.set(offset, 0.04, 0.05);
    foot.scale.set(1, 0.4, 1.2);
    group.add(foot);
  });

  // --- torso (shirt) ---
  const torsoH = isGK ? 0.55 : 0.5;
  const torsoTopR = isGK ? 0.38 : 0.32;
  const torsoBotR = isGK ? 0.28 : 0.24;
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(torsoTopR, torsoBotR, torsoH, 12),
    _mat(color, 0.35, 0.05)
  );
  torso.position.y = 0.37;
  torso.castShadow = true;
  group.add(torso);

  // --- shorts ---
  const shorts = new THREE.Mesh(
    new THREE.CylinderGeometry(torsoBotR * 1.1, torsoBotR * 0.9, 0.12, 10),
    _mat(shortsColor, 0.45, 0.05)
  );
  shorts.position.y = 0.1;
  shorts.castShadow = true;
  group.add(shorts);

  // --- arms ---
  const armMat = _mat(color, 0.35, 0.05);
  [-0.32, 0.32].forEach(offset => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.3, 6), armMat);
    arm.position.set(offset, 0.42, 0);
    arm.rotation.z = offset < 0 ? 0.15 : -0.15;
    arm.castShadow = true;
    group.add(arm);
  });

  // --- hands (GK gloves) ---
  if (isGK) {
    const gloveMat = _mat(0xfacc15, 0.4, 0.05);
    [-0.32, 0.32].forEach(offset => {
      const glove = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), gloveMat);
      glove.position.set(offset, 0.28, 0.02);
      group.add(glove);
    });
  }

  // --- head ---
  const headMat = _mat(0xf5d6b8, 0.4, 0.02);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), headMat);
  head.position.y = 0.62;
  head.castShadow = true;
  group.add(head);

  // --- headband / hair ---
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 8, 6),
    _mat(0x2d1a0e, 0.7, 0.02)
  );
  hair.position.y = 0.64;
  hair.scale.set(1, 0.6, 1);
  group.add(hair);

  // --- number sprite above head (for quick readability) ---
  const number = _createShirtNumber(p.number, "#ffffff");
  number.position.set(0, 0.95, 0);
  group.add(number);

  // --- fatigue ring ---
  const fatigueRing = new THREE.Mesh(
    new THREE.RingGeometry(0.7, 0.9, 24),
    new THREE.MeshBasicMaterial({
      color: _fatigueHex(p.fatigue),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
  );
  fatigueRing.rotation.x = -Math.PI / 2;
  fatigueRing.position.y = 0.03;
  group.add(fatigueRing);

  // --- glow ring (hover) ---
  const glow = new THREE.Mesh(
    new THREE.RingGeometry(0.75, 0.95, 24),
    new THREE.MeshBasicMaterial({
      color: 0x00b4ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.035;
  group.add(glow);

  // --- hit mesh (raycaster) ---
  const hitMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.8, 8),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.y = 0.4;
  hitMesh.userData = p;
  group.add(hitMesh);

  // store for idle animation
  group.userData = { phase: Math.random() * Math.PI * 2 };

  return { group, hitMesh, glow };
}

function _createShirtNumber(number, color = "#ffffff") {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, size, size);

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.font = "900 140px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = color;
  ctx.fillText(String(number), size / 2, size / 2 + 6);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.2, 1.2, 1);
  return sprite;
}

function _buildPitch(scene) {
  const PW = 68, PL = 105;

  // --- grass base ---
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x1a7a1a,
    roughness: 0.95,
    metalness: 0,
  });
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(PW + 8, PL + 8),
    grassMat,
  );
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.15;
  grass.receiveShadow = true;
  scene.add(grass);

  // --- grass stripes ---
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0x0f5f0f,
    roughness: 0.95,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  });
  for (let i = -4; i <= 4; i += 2) {
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(4.5, PL), stripeMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(i * 4.8, -0.12, 0);
    scene.add(stripe);
  }

  // --- pitch border track ---
  const trackMat = new THREE.MeshStandardMaterial({
    color: 0x0d1a0d,
    roughness: 1,
    metalness: 0,
  });
  const track = new THREE.Mesh(
    new THREE.PlaneGeometry(PW + 6, PL + 6),
    trackMat,
  );
  track.rotation.x = -Math.PI / 2;
  track.position.y = -0.14;
  scene.add(track);

  // --- pitch markings (elevated slightly for realism) ---
  const lineMat = new THREE.MeshBasicMaterial({
    color: 0xf0f0f0,
    transparent: true,
    opacity: 0.35,
  });
  const addLineMesh = (pts, y = 0.025) => {
    const shape = new THREE.Shape();
    pts.forEach((p, i) => i === 0 ? shape.moveTo(p[0], p[1]) : shape.lineTo(p[0], p[1]));
    const geo = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geo, lineMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    scene.add(mesh);
    return mesh;
  };
  const addRectMesh = (x1, z1, x2, z2) =>
    addLineMesh([[x1, z1], [x2, z1], [x2, z2], [x1, z2], [x1, z1]]);

  const HW = PW / 2, HL = PL / 2;
  addRectMesh(-HW, -HL, HW, HL);
  addRectMesh(-20, -HL, 20, -HL + 16);
  addRectMesh(-20, HL - 16, 20, HL);
  addRectMesh(-9, -HL, 9, -HL + 6);
  addRectMesh(-9, HL - 6, 9, HL);

  // halfway line
  addLineMesh([[-HW, 0], [HW, 0]]);

  // center circle
  const circlePts = [];
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    circlePts.push([Math.cos(a) * 9.15, Math.sin(a) * 9.15]);
  }
  addLineMesh(circlePts);

  // center dot
  const dot = new THREE.Mesh(
    new THREE.CircleGeometry(0.4, 16),
    new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })
  );
  dot.rotation.x = -Math.PI / 2;
  dot.position.y = 0.025;
  scene.add(dot);

  // penalty spots
  [-HL + 11, HL - 11].forEach(z => {
    const ps = new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 16),
      new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })
    );
    ps.rotation.x = -Math.PI / 2;
    ps.position.set(0, 0.025, z);
    scene.add(ps);
  });

  // corner arcs
  const arcSegs = 12;
  const cornerR = 1;
  [
    [-HW, -HL, 0, Math.PI / 2],
    [HW, -HL, Math.PI / 2, Math.PI],
    [HW, HL, Math.PI, 3 * Math.PI / 2],
    [-HW, HL, 3 * Math.PI / 2, 2 * Math.PI],
  ].forEach(([cx, cz, startA, endA]) => {
    const pts = [];
    for (let i = 0; i <= arcSegs; i++) {
      const a = startA + (i / arcSegs) * (endA - startA);
      pts.push([cx + Math.cos(a) * cornerR, cz + Math.sin(a) * cornerR]);
    }
    addLineMesh(pts);
  });
}

function _buildGoals(scene) {
  const HL = 52.5, gW = 7.32, gH = 2.44, gD = 2.5;

  [-HL, HL].forEach((z) => {
    const sign = z < 0 ? 1 : -1;

    // posts
    const postMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.2,
    });
    [-gW / 2, gW / 2].forEach((x) => {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, gH, 10),
        postMat,
      );
      post.position.set(x, gH / 2, z);
      post.castShadow = true;
      scene.add(post);
    });

    // crossbar
    const bar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, gW, 10),
      postMat,
    );
    bar.rotation.x = Math.PI / 2;
    bar.position.set(0, gH, z);
    bar.castShadow = true;
    scene.add(bar);

    // net (back)
    const netMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      wireframe: false,
    });
    const net = new THREE.Mesh(new THREE.PlaneGeometry(gW, gH), netMat);
    net.position.set(0, gH / 2, z + sign * gD);
    scene.add(net);

    // net (top)
    const netTop = new THREE.Mesh(
      new THREE.PlaneGeometry(gW, gD),
      new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      })
    );
    netTop.rotation.x = -Math.PI / 2;
    netTop.position.set(0, gH, z + sign * gD / 2);
    scene.add(netTop);

    // net (sides)
    [-gW / 2, gW / 2].forEach(x => {
      const netSide = new THREE.Mesh(
        new THREE.PlaneGeometry(gD, gH),
        new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          transparent: true,
          opacity: 0.08,
          side: THREE.DoubleSide,
        })
      );
      netSide.rotation.y = Math.PI / 2 * (x < 0 ? 1 : -1);
      netSide.position.set(x, gH / 2, z + sign * gD / 2);
      scene.add(netSide);
    });

    // ground net
    const netGround = new THREE.Mesh(
      new THREE.PlaneGeometry(gW, gD),
      new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
      })
    );
    netGround.rotation.x = -Math.PI / 2;
    netGround.position.set(0, 0.01, z + sign * gD / 2);
    scene.add(netGround);
  });
}

function _buildStadium(scene) {
  const PW = 68, PL = 105;
  const HW = PW / 2, HL = PL / 2;

  // --- floodlight towers ---
  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a3e,
    roughness: 0.7,
    metalness: 0.2,
  });

  const addTower = (x, z) => {
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.8, 35, 8),
      towerMat,
    );
    base.position.set(x, 17.5, z);
    base.castShadow = true;
    scene.add(base);

    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.1, 0.1),
      towerMat,
    );
    arm.position.set(x, 34.5, z);
    scene.add(arm);

    const headMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      emissive: 0xffdd99,
      emissiveIntensity: 0.6,
    });
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.3, 0.4),
      headMat,
    );
    head.position.set(x, 35, z);
    scene.add(head);

    // light glow sprite
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gctx = glowCanvas.getContext("2d");
    const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 230, 180, 0.6)");
    grad.addColorStop(0.3, "rgba(255, 230, 180, 0.2)");
    grad.addColorStop(1, "rgba(255, 230, 180, 0)");
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glowSpr = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending })
    );
    glowSpr.scale.set(12, 12, 1);
    glowSpr.position.set(x, 35, z);
    scene.add(glowSpr);
  };
  addTower(-42, -32);
  addTower(42, -32);
  addTower(-42, 32);
  addTower(42, 32);

  // --- stadium stands (simple tiers) ---
  const standMat = new THREE.MeshStandardMaterial({
    color: 0x16162a,
    roughness: 0.9,
    metalness: 0.05,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a30,
    roughness: 0.8,
    metalness: 0.1,
  });

  // Main stands along the sides
  [-2, 2].forEach(side => {
    for (let tier = 0; tier < 3; tier++) {
      const yBase = tier * 3 + 1;
      const tierW = 44;
      const stand = new THREE.Mesh(
        new THREE.BoxGeometry(tierW, 2.5, 4),
        standMat,
      );
      stand.position.set(0, yBase + 1.25, side * (HL + 3 + tier * 2));
      scene.add(stand);
    }
    // roof
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(46, 0.3, 14),
      roofMat,
    );
    roof.position.set(0, 10, side * (HL + 8));
    scene.add(roof);
  });

  // Corner stands
  [-1, 1].forEach(sx => {
    [-1, 1].forEach(sz => {
      const corner = new THREE.Mesh(
        new THREE.BoxGeometry(8, 4, 8),
        standMat,
      );
      corner.position.set(sx * (HW + 5), 2, sz * (HL + 5));
      scene.add(corner);
    });
  });

  // --- dugouts ---
  const dugoutMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a30,
    roughness: 0.7,
    metalness: 0.1,
  });
  [-1, 1].forEach(side => {
    const dugout = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.8, 2.5),
      dugoutMat,
    );
    dugout.position.set(side * (HW + 3), 0.4, -8);
    scene.add(dugout);

    // bench seats
    const seatMat = _mat(0x333355, 0.6, 0.05);
    for (let i = -2; i <= 2; i += 1) {
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.3, 0.6),
        seatMat,
      );
      seat.position.set(side * (HW + 3) + i * 0.8, 0.7, -8);
      scene.add(seat);
    }
  });

  // --- tunnel ---
  const tunnelMat = _mat(0x0a0a14, 0.8, 0.1);
  const tunnel = new THREE.Mesh(
    new THREE.BoxGeometry(4, 3, 6),
    tunnelMat,
  );
  tunnel.position.set(0, 1.5, -(HL + 10));
  scene.add(tunnel);
  const tunnelArch = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.15, 6, 12, Math.PI),
    _mat(0x333355, 0.5, 0.2),
  );
  tunnelArch.position.set(0, 3, -(HL + 7));
  tunnelArch.rotation.x = Math.PI / 2;
  scene.add(tunnelArch);

  _buildCrowd.call(this);
}

function _buildCrowd() {
  const group = new THREE.Group();
  const homeColor = 0x3b82f6;
  const awayColor = 0x8bf55a;
  const neutralColors = [0x1a1a2e, 0x16213e, 0x0f3460, 0x533483];

  // Main stand crowds (along sidelines)
  const tiers = [
    { zStart: -59, zEnd: -57, y: 2 },
    { zStart: -60, zEnd: -58, y: 5 },
    { zStart: 57, zEnd: 59, y: 2 },
    { zStart: 56, zEnd: 58, y: 5 },
  ];

  tiers.forEach(tier => {
    const isHomeEnd = tier.zStart > 0;
    for (let i = -44; i <= 44; i += 0.7) {
      const isHomeSide = i < -8;
      const color = isHomeEnd
        ? (isHomeSide ? homeColor : neutralColors[Math.floor(Math.random() * neutralColors.length)])
        : (!isHomeSide ? awayColor : neutralColors[Math.floor(Math.random() * neutralColors.length)]);
      const c = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1.0, 0.5),
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.9,
          emissive: color,
          emissiveIntensity: 0.05,
        })
      );
      c.position.set(i + (Math.random() - 0.5) * 0.2, tier.y + Math.random() * 0.3, tier.zStart + Math.random() * (tier.zEnd - tier.zStart));
      group.add(c);
    }
  });

  // End stand crowds
  for (let i = -30; i <= 30; i += 0.8) {
    const c = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.8, 0.5),
      new THREE.MeshStandardMaterial({
        color: neutralColors[Math.floor(Math.random() * neutralColors.length)],
        roughness: 0.9,
      })
    );
    c.position.set(i + (Math.random() - 0.5) * 0.2, 1.2, -62 + Math.random() * 1.5);
    group.add(c);
  }
  for (let i = -30; i <= 30; i += 0.8) {
    const c = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.8, 0.5),
      new THREE.MeshStandardMaterial({
        color: neutralColors[Math.floor(Math.random() * neutralColors.length)],
        roughness: 0.9,
      })
    );
    c.position.set(i + (Math.random() - 0.5) * 0.2, 1.2, 62 - Math.random() * 1.5);
    group.add(c);
  }

  this._crowdGroup = group;
  this.scene.add(group);
}

class Pitch3D {
  constructor(containerId, scenario) {
    if (typeof THREE === "undefined")
      throw new Error("Three.js is required for Pitch3D");
    this.container = document.getElementById(containerId);
    if (!this.container)
      throw new Error(`Pitch container "${containerId}" not found`);

    this.scenario = scenario || null;
    this.players = [];
    this._ball = null;
    this._ballGlow = null;
    this._crowdGroup = null;
    this._highlightLines = [];
    this._arrowMeshes = [];
    this._labels = [];
    this._activeLabels = [];
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

    this._setupScene();
    this._setupLights();
    _buildPitch(this.scene);
    _buildGoals(this.scene);
    _buildStadium.call(this, this.scene);
    this._animate();

    if (scenario) {
      this.setMatchContext(scenario);
    }

    window.addEventListener("resize", () => this._onResize());
  }

  _setupScene() {
    const W = this.container.clientWidth;
    const H = this.container.clientHeight || Math.round(W * 0.55) || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060a12);
    this.scene.fog = new THREE.FogExp2(0x060a12, 0.0035);

    this.camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 300);
    this._setCameraBroadcast();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.innerHTML = "";
    this.container.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.controls.target.set(0, 0, 0);
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.minDistance = 20;
    this.controls.maxDistance = 120;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.update();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const el = this.renderer.domElement;
    el.addEventListener("click", (e) => this._onClick(e));
    el.addEventListener("mousemove", (e) => this._onMouseMove(e));
    el.addEventListener("mouseleave", () => this._setHover(null));
  }

  _setupLights() {
    // Ambient (moonlight fill)
    this.scene.add(new THREE.AmbientLight(0x334466, 0.35));

    // Main key light (floodlight feel)
    const main = new THREE.DirectionalLight(0xffeedd, 1.4);
    main.position.set(20, 50, 15);
    main.castShadow = true;
    main.shadow.mapSize.set(2048, 2048);
    main.shadow.camera.near = 0.5;
    main.shadow.camera.far = 120;
    main.shadow.camera.left = -60;
    main.shadow.camera.right = 60;
    main.shadow.camera.top = 60;
    main.shadow.camera.bottom = -60;
    main.shadow.bias = -0.001;
    this.scene.add(main);

    // Fill light (cool, from opposite side)
    const fill = new THREE.DirectionalLight(0x8899cc, 0.3);
    fill.position.set(-20, 30, -20);
    this.scene.add(fill);

    // Rim light
    const rim = new THREE.DirectionalLight(0xccddff, 0.15);
    rim.position.set(0, 10, -50);
    this.scene.add(rim);

    // Floodlight point lights
    [
      [-40, 32, -40],
      [40, 32, 40],
      [-40, 32, 40],
      [40, 32, -40],
    ].forEach(([x, y, z]) => {
      const l = new THREE.PointLight(0xffdd99, 0.4, 80);
      l.position.set(x, y, z);
      this.scene.add(l);
    });
  }

  // ===== CAMERA SYSTEM =====
  setCameraMode(mode, instant = false) {
    this._cameraMode = mode;
    if (mode === 'broadcast') this._animateCameraTo(42, 28, 42, 0, 0, 0, instant ? 0 : 800);
    else if (mode === 'tactical') this._animateCameraTo(0, 65, 0.1, 0, 0, 0, instant ? 0 : 800);
    else if (mode === 'free') this._animateCameraTo(55, 22, 45, 0, 0, 0, instant ? 0 : 800);
  }

  _setCameraBroadcast() {
    this.camera.position.set(42, 28, 42);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  _setCameraTactical() {
    this.camera.position.set(0, 65, 0.1);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  _setCameraFree() {
    this.camera.position.set(55, 22, 45);
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

  // ===== 3D FORMATION LABELS =====
  _buildFormationLabels(scenario) {
    this._clearLabels();
    if (!scenario) return;
    const home = scenario.home_team || '';
    const away = scenario.away_team || '';
    const hFmt = scenario.home_formation || '';
    const aFmt = scenario.away_formation || '';
    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;

    this._add3DLabel(`${home} ${hFmt}`, -30, 0.5, -57, 0x3b82f6, 'left');
    this._add3DLabel(`${hScore}`, -34, 0.5, -55, 0xffffff, 'left', 1.0);
    this._add3DLabel(`${away} ${aFmt}`, 30, 0.5, -57, 0x8bf55a, 'right');
    this._add3DLabel(`${aScore}`, 34, 0.5, -55, 0xffffff, 'right', 1.0);
  }

  _add3DLabel(text, x, y, z, color, align = 'center', scale = 0.6) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 128;
    ctx.clearRect(0, 0, 512, 128);
    ctx.font = "700 56px Inter, Arial, sans-serif";
    ctx.textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.9)";
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
    if (this._ball) { this.scene.remove(this._ball); this._ball = null; }
    if (this._ballGlow) { this.scene.remove(this._ballGlow); this._ballGlow = null; }
    const events = scenario.replay_events || [];
    if (!events.length) return;

    const last = events[events.length - 1];
    let bx = 0.5, bz = 0.5;
    if (last.description) {
      const desc = last.description.toLowerCase();
      const home = (scenario.home_team || '').toLowerCase();
      if (desc.includes(home) || desc.includes('for')) bx = 0.65;
      else bx = 0.35;

      if (last.type === 'goal' || last.type === 'shot') bx = 0.7;
      if (last.type === 'substitution' || last.type === 'yellow_card') bx = 0.5;
    }

    const w = { x: (bx - 0.5) * 68, z: (0.5 - bz) * 105 };

    const geo = new THREE.SphereGeometry(0.35, 18, 18);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.1,
    });
    this._ball = new THREE.Mesh(geo, mat);
    this._ball.position.set(w.x, 0.35, w.z);
    this._ball.castShadow = true;
    this._ball.receiveShadow = true;
    this.scene.add(this._ball);

    // Ball trail / glow effect
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.06,
    });
    this._ballGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 12, 12),
      glowMat,
    );
    this._ballGlow.position.copy(this._ball.position);
    this.scene.add(this._ballGlow);
  }

  // ===== TACTICAL HIGHLIGHTS =====
  _setHighlight(scenario) {
    this._clearHighlights();
    if (!scenario) return;

    const hScore = scenario.scoreline?.home || 0;
    const aScore = scenario.scoreline?.away || 0;
    const trailing = hScore < aScore;
    const color = trailing ? 0x8bf55a : 0x3b82f6;

    // Team-shaped highlight on attacking half
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

  _buildAttackDirection(scenario) {
    // Clean previous arrows
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

    // Arrow on sideline showing attack direction
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
    const all = [
      ...homePlayers.map((p) => ({ ...p, team: "home" })),
      ...awayPlayers.map((p) => ({ ...p, team: "away" })),
    ];
    this.players = all.map((p) => _createPlayer(this.scene, p, this.scenario));
  }

  // ===== TACTICAL OPTION PREVIEW IN 3D =====
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
      const t = this._previewT < 0.5 ? 2 * this._previewT * this._previewT : -1 + (4 - 2 * this._previewT) * this._previewT;
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

  _setHover(item) {
    this.hovered = item;
    this.renderer.domElement.style.cursor = item ? "pointer" : "default";
    this.players.forEach((p) => {
      p.glow.material.opacity = p === item ? 0.5 : 0;
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

  _animate() {
    if (!this._running) return;
    requestAnimationFrame(() => this._animate());

    // Camera animation
    if (this._camAnimating) {
      const elapsed = performance.now() - this._camAnimStart;
      const t = Math.min(1, elapsed / this._camAnimDur);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

    // Idle player animation (subtle sway)
    this._animTime += 0.016;
    this.players.forEach((p, i) => {
      const phase = p.group.userData.phase || 0;
      const sway = Math.sin(this._animTime * 1.2 + phase) * 0.003;
      p.group.position.y = sway;
    });

    // Ball gentle hover
    if (this._ball) {
      this._ball.position.y = 0.35 + Math.sin(this._animTime * 1.5) * 0.02;
      if (this._ballGlow) {
        this._ballGlow.position.copy(this._ball.position);
        this._ballGlow.material.opacity = 0.04 + Math.sin(this._animTime * 2) * 0.02;
      }
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
    this._clearHighlights();
    this._clearLabels();
    _clearPlayers(this.scene, this.players);
    if (this._ball) this.scene.remove(this._ball);
    if (this._ballGlow) this.scene.remove(this._ballGlow);
    if (this._crowdGroup) this.scene.remove(this._crowdGroup);
    this._arrowMeshes.forEach(m => {
      this.scene.remove(m);
      if (m.geometry) m.geometry.dispose();
      if (m.material) m.material.dispose();
    });
    this.renderer.dispose();
    this.container.innerHTML = '';
    this.players = [];
  }
}

function _createPlayer(scene, p, scenario) {
  const { group, hitMesh, glow } = _buildPlayerFigure(p, scenario);
  const w = _pNormToWorld(p);
  group.position.set(w.x, 0, w.z);
  scene.add(group);
  return { group, data: p, hitMesh, glow };
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

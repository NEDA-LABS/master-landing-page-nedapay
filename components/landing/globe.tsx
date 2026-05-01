'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';

// ╔════════════════════════════════════════════════════╗
// ║  Math helpers                                      ║
// ╚════════════════════════════════════════════════════╝
const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
interface Vec3 { x: number; y: number; z: number }

const ll2xyz = (lat: number, lon: number): Vec3 => {
  const phi = (90 - lat) * DEG;
  const theta = lon * DEG;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
};

const rotY = (v: Vec3, a: number): Vec3 => ({
  x: v.x * Math.cos(a) - v.z * Math.sin(a),
  y: v.y,
  z: v.x * Math.sin(a) + v.z * Math.cos(a),
});

const rotX = (v: Vec3, a: number): Vec3 => ({
  x: v.x,
  y: v.y * Math.cos(a) - v.z * Math.sin(a),
  z: v.y * Math.sin(a) + v.z * Math.cos(a),
});

const slerp = (a: Vec3, b: Vec3, t: number): Vec3 => {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const theta = Math.acos(dot);
  if (theta < 0.001) return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) };
  const s = Math.sin(theta);
  return {
    x: (Math.sin((1 - t) * theta) * a.x + Math.sin(t * theta) * b.x) / s,
    y: (Math.sin((1 - t) * theta) * a.y + Math.sin(t * theta) * b.y) / s,
    z: (Math.sin((1 - t) * theta) * a.z + Math.sin(t * theta) * b.z) / s,
  };
};

const elevate = (v: Vec3, t: number, lift: number): Vec3 => {
  const e = 1 + lift * Math.sin(Math.PI * t);
  return { x: v.x * e, y: v.y * e, z: v.z * e };
};

// Smooth ease for visibility transitions across hemisphere boundary
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

// ╔════════════════════════════════════════════════════╗
// ║  Data                                              ║
// ╚════════════════════════════════════════════════════╝
const CITIES = [
  { name: 'Tanzania',  flag: '🇹🇿', lat: -6.8,  lon: 39.3,  highlight: true  },
  { name: 'China',     flag: '🇨🇳', lat: 31.2,  lon: 121.5, highlight: true  },
  { name: 'New York',  flag: '🇺🇸', lat: 40.7,  lon: -74.0 },
  { name: 'London',    flag: '🇬🇧', lat: 51.5,  lon: -0.1  },
  { name: 'Dubai',     flag: '🇦🇪', lat: 25.2,  lon: 55.3  },
  { name: 'Lagos',     flag: '🇳🇬', lat: 6.5,   lon: 3.4   },
  { name: 'Singapore', flag: '🇸🇬', lat: 1.3,   lon: 103.8 },
  { name: 'Nairobi',   flag: '🇰🇪', lat: -1.3,  lon: 36.8  },
  { name: 'Mumbai',    flag: '🇮🇳', lat: 19.1,  lon: 72.9  },
  { name: 'Paris',     flag: '🇫🇷', lat: 48.9,  lon: 2.3   },
  { name: 'São Paulo', flag: '🇧🇷', lat: -23.5, lon: -46.6 },
];

const ROUTES = [
  { from: 0, to: 1,  hue: 'cyan', offsets: [0.0, 0.55] },
  { from: 1, to: 0,  hue: 'blue', offsets: [0.3, 0.8]  },
  { from: 2, to: 0,  hue: 'blue', offsets: [0.15]      },
  { from: 0, to: 3,  hue: 'cyan', offsets: [0.65]      },
  { from: 4, to: 0,  hue: 'blue', offsets: [0.45]      },
  { from: 5, to: 1,  hue: 'cyan', offsets: [0.25]      },
  { from: 1, to: 2,  hue: 'cyan', offsets: [0.4]       },
  { from: 6, to: 0,  hue: 'blue', offsets: [0.55]      },
  { from: 8, to: 4,  hue: 'cyan', offsets: [0.1]       },
  { from: 9, to: 0,  hue: 'blue', offsets: [0.85]      },
  { from: 10, to: 0, hue: 'blue', offsets: [0.5]       },
  { from: 0, to: 6,  hue: 'cyan', offsets: [0.95]      },
  { from: 7, to: 1,  hue: 'cyan', offsets: [0.05]      },
];

const STEPS = 90;
const PARTICLE_SPEED = 0.0007;

const buildArc = (a: Vec3, b: Vec3) =>
  Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    return elevate(slerp(a, b, t), t, 0.34);
  });

// ── Orbital ring (Saturn-style) ──────────────────────
const RING_TILT = 0.42;             // ~24°
const RING_RADIUS = 1.20;
const RING_LIGHTS = [
  { phase: 0.00, hue: 'cyan' as const, speed: 1.00 },
  { phase: 0.18, hue: 'blue' as const, speed: 1.00 },
  { phase: 0.40, hue: 'cyan' as const, speed: 1.00 },
  { phase: 0.60, hue: 'blue' as const, speed: 1.00 },
  { phase: 0.78, hue: 'cyan' as const, speed: 1.00 },
];

interface Sparkle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; max: number;
  hue: 'cyan' | 'blue';
  size: number;
}

interface Star { x: number; y: number; size: number; phase: number }

// ╔════════════════════════════════════════════════════╗
// ║  Component                                         ║
// ╚════════════════════════════════════════════════════╝
export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef(0.6);
  const timeRef   = useRef(0);
  const lastTsRef = useRef(0);
  const arcsRef   = useRef<Vec3[][]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const arrivedRef  = useRef<Set<string>>(new Set());
  const { resolvedTheme } = useTheme();

  // Pre-build arcs once
  useEffect(() => {
    arcsRef.current = ROUTES.map(r =>
      buildArc(ll2xyz(CITIES[r.from].lat, CITIES[r.from].lon),
               ll2xyz(CITIES[r.to].lat,   CITIES[r.to].lon))
    );
  }, []);

  // Stable star field
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    for (let i = 0; i < 70; i++) {
      const a = (i * 137.508) * DEG;
      const r = 0.55 + ((i * 31) % 100) / 100 * 0.55;
      arr.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        size: 0.4 + (i % 3) * 0.25,
        phase: i * 0.43,
      });
    }
    return arr;
  }, []);

  // ╭─ DRAW ───────────────────────────────────────────╮
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = resolvedTheme === 'dark';
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    if (W < 4 || H < 4) return;
    const cx = W / 2;
    const cy = H / 2;
    const R  = Math.min(W, H) * 0.40;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const rot = rotRef.current;
    const t   = timeRef.current;

    // ── 1. Star field (subtle, dark only) ───────────
    if (isDark) {
      stars.forEach(s => {
        const sx = cx + s.x * R * 1.7;
        const sy = cy + s.y * R * 1.7;
        if (sx < 0 || sx > W || sy < 0 || sy > H) return;
        const tw = (Math.sin(t * 0.0012 + s.phase) + 1) / 2;
        const a  = 0.18 + tw * 0.45;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, TAU);
        ctx.fillStyle = `rgba(186,230,253,${a})`;
        ctx.fill();
      });
    }

    // ── 2. Outer HUD rings + tick marks ─────────────
    ctx.lineWidth = 0.5;
    [1.30, 1.24].forEach((mult, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R * mult, 0, TAU);
      ctx.strokeStyle = isDark
        ? `rgba(96,165,250,${0.10 - i * 0.03})`
        : `rgba(59,130,246,${0.10 - i * 0.03})`;
      ctx.stroke();
    });
    [0, 90, 180, 270].forEach(deg => {
      const a = deg * DEG;
      const x1 = cx + Math.cos(a) * R * 1.24;
      const y1 = cy + Math.sin(a) * R * 1.24;
      const x2 = cx + Math.cos(a) * R * 1.30;
      const y2 = cy + Math.sin(a) * R * 1.30;
      ctx.beginPath();
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.45)' : 'rgba(59,130,246,0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ── 3. Atmosphere halo (smooth pulse) ───────────
    const atmoPulse = (Math.sin(t * 0.0014) + 1) / 2;
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.22);
    if (isDark) {
      atmo.addColorStop(0,   `rgba(34,211,238,${0.20 + atmoPulse * 0.10})`);
      atmo.addColorStop(0.5, `rgba(59,130,246,${0.08 + atmoPulse * 0.04})`);
      atmo.addColorStop(1,   'rgba(59,130,246,0)');
    } else {
      atmo.addColorStop(0,   `rgba(59,130,246,${0.12 + atmoPulse * 0.05})`);
      atmo.addColorStop(0.5, `rgba(59,130,246,${0.05 + atmoPulse * 0.02})`);
      atmo.addColorStop(1,   'rgba(59,130,246,0)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.22, 0, TAU);
    ctx.fillStyle = atmo;
    ctx.fill();

    // ── 4. Orbital ring — BACK half (z ≤ 0) ─────────
    const ringT = t * 0.00018;
    const ct = Math.cos(RING_TILT), st = Math.sin(RING_TILT);

    const ringPoint = (theta: number): Vec3 => {
      // Ring lies on XZ plane; rotate around X by tilt; rotate around Y by ringT
      let p: Vec3 = { x: Math.cos(theta), y: 0, z: Math.sin(theta) };
      p = { x: p.x, y: -p.z * st, z: p.z * ct };
      // Slow Y-spin (independent of globe rotation)
      const cs = Math.cos(ringT), ss = Math.sin(ringT);
      p = { x: p.x * cs - p.z * ss, y: p.y, z: p.x * ss + p.z * cs };
      return { x: p.x * RING_RADIUS, y: p.y * RING_RADIUS, z: p.z * RING_RADIUS };
    };

    // Faint ring outline (back portion)
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 220; i++) {
      const theta = (i / 220) * TAU;
      const p = ringPoint(theta);
      if (p.z >= 0) { started = false; continue; }
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.18)' : 'rgba(59,130,246,0.16)';
    ctx.stroke();

    // Back ring lights (passing behind the planet — subtle, dimmer)
    RING_LIGHTS.forEach((light) => {
      const theta = light.phase * TAU + ringT * 1.4 * light.speed;
      const p = ringPoint(theta);
      if (p.z >= 0) return;
      const sx = cx + p.x * R, sy = cy - p.y * R;
      const distSq = (sx - cx) ** 2 + (sy - cy) ** 2;
      // If within globe projection, hide (planet eclipses it)
      if (distSq < R * R * 0.98) return;
      const col = light.hue === 'cyan' ? '34,211,238' : '167,139,250';
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 7);
      g.addColorStop(0, `rgba(${col},0.4)`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(sx, sy, 7, 0, TAU);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // ── 5. Globe body — filled gradient (rich) ──────
    const bg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
    if (isDark) {
      bg.addColorStop(0,    'rgba(40,90,180,0.85)');
      bg.addColorStop(0.5,  'rgba(18,48,120,0.92)');
      bg.addColorStop(1,    'rgba(4,14,50,0.98)');
    } else {
      bg.addColorStop(0,    'rgba(225,240,255,0.92)');
      bg.addColorStop(0.5,  'rgba(195,220,255,0.78)');
      bg.addColorStop(1,    'rgba(170,200,250,0.55)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.fillStyle = bg;
    ctx.fill();

    // Subtle inner core glow (gentle pulse)
    const corePulse = (Math.sin(t * 0.0024) + 1) / 2;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (0.42 + corePulse * 0.08));
    core.addColorStop(0, isDark
      ? `rgba(34,211,238,${0.16 + corePulse * 0.10})`
      : `rgba(59,130,246,${0.06 + corePulse * 0.04})`);
    core.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.55, 0, TAU);
    ctx.fillStyle = core;
    ctx.fill();

    // Specular highlight
    const spec = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.38, 0, cx - R * 0.38, cy - R * 0.38, R * 0.7);
    spec.addColorStop(0, isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.40)');
    spec.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.fillStyle = spec;
    ctx.fill();

    // ── 6. Grid lines on globe surface ──────────────
    const gridStroke = isDark ? '120,180,255' : '59,130,246';
    ctx.lineWidth = 0.5;

    // Longitudes (every 30°)
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridStroke},0.18)`;
      ctx.stroke();
    }
    // Latitudes
    [-60, -30, 30, 60].forEach(lat => {
      ctx.beginPath();
      let first = true;
      for (let lon = 0; lon <= 360; lon += 3) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridStroke},0.16)`;
      ctx.stroke();
    });
    // Equator (brighter)
    ctx.beginPath();
    let firstEq = true;
    for (let lon = 0; lon <= 360; lon += 3) {
      const p = rotY(ll2xyz(0, lon), rot);
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (firstEq) { ctx.moveTo(sx, sy); firstEq = false; } else ctx.lineTo(sx, sy);
    }
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = isDark ? 'rgba(34,211,238,0.40)' : 'rgba(34,211,238,0.32)';
    ctx.stroke();

    // Globe rim
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.55)' : 'rgba(59,130,246,0.45)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // ── 7. Arcs ─────────────────────────────────────
    const cityActivation = new Array(CITIES.length).fill(0);

    ROUTES.forEach((route, ri) => {
      const arc = arcsRef.current[ri];
      if (!arc) return;

      // Dim base path
      ctx.lineWidth = 0.7;
      for (let i = 1; i <= STEPS; i++) {
        const rA = rotY(arc[i - 1], rot);
        const rB = rotY(arc[i], rot);
        if (rA.z < -0.15 && rB.z < -0.15) continue;
        const vis = smoothstep(-0.15, 0.15, (rA.z + rB.z) / 2);
        const alpha = vis * (isDark ? 0.16 : 0.11);
        ctx.beginPath();
        ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
        ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
        ctx.strokeStyle = route.hue === 'cyan'
          ? `rgba(34,211,238,${alpha})`
          : `rgba(167,139,250,${alpha})`;
        ctx.stroke();
      }

      route.offsets.forEach((offset, oi) => {
        const rawT = ((t * PARTICLE_SPEED + offset) % 1 + 1) % 1;

        // City activation (label fade-in)
        if (rawT > 0.5)  cityActivation[route.to]   = Math.max(cityActivation[route.to],   smoothstep(0.5, 0.95, rawT));
        if (rawT < 0.18) cityActivation[route.from] = Math.max(cityActivation[route.from], smoothstep(0.18, 0, rawT));

        // Arrival sparkle spawn (once per loop)
        const arrivalKey = `${ri}-${oi}`;
        if (rawT > 0.94 && rawT < 0.99 && !arrivedRef.current.has(arrivalKey)) {
          arrivedRef.current.add(arrivalKey);
          const dest = CITIES[route.to];
          const p = rotY(ll2xyz(dest.lat, dest.lon), rot);
          if (p.z > 0) {
            const sx = cx + p.x * R, sy = cy - p.y * R;
            for (let s = 0; s < 7; s++) {
              const ang = (s / 7) * TAU + Math.random() * 0.4;
              const speed = 0.5 + Math.random() * 1.0;
              sparklesRef.current.push({
                x: sx, y: sy,
                vx: Math.cos(ang) * speed,
                vy: Math.sin(ang) * speed - 0.3,
                life: 1, max: 50 + Math.random() * 20,
                hue: route.hue as 'cyan' | 'blue',
                size: 0.8 + Math.random() * 1.0,
              });
            }
          }
        }
        if (rawT < 0.05) arrivedRef.current.delete(arrivalKey);

        // Bright trail
        const trailLen = 0.22;
        const trailStart = Math.max(0, rawT - trailLen);
        ctx.lineWidth = 2.4;
        for (let i = 1; i <= STEPS; i++) {
          const ti = i / STEPS;
          if (ti < trailStart || ti > rawT) continue;
          const rA = rotY(arc[i - 1], rot);
          const rB = rotY(arc[i], rot);
          if (rA.z < -0.12 && rB.z < -0.12) continue;
          const fade = (ti - trailStart) / trailLen;
          const eased = fade * fade;
          const vis = smoothstep(-0.12, 0.2, (rA.z + rB.z) / 2);
          const alpha = eased * vis;
          const col = route.hue === 'cyan' ? '34,211,238' : '167,139,250';
          ctx.beginPath();
          ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
          ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
          ctx.strokeStyle = `rgba(${col},${alpha})`;
          ctx.stroke();
        }

        // Particle head
        const headIdx = Math.min(STEPS, Math.round(rawT * STEPS));
        if (headIdx < arc.length) {
          const rH = rotY(arc[headIdx], rot);
          if (rH.z > -0.12) {
            const hx = cx + rH.x * R, hy = cy - rH.y * R;
            const headVis = smoothstep(-0.12, 0.1, rH.z);
            const col = route.hue === 'cyan' ? '34,211,238' : '167,139,250';

            const g1 = ctx.createRadialGradient(hx, hy, 0, hx, hy, 13);
            g1.addColorStop(0,    `rgba(${col},${0.85 * headVis})`);
            g1.addColorStop(0.5,  `rgba(${col},${0.25 * headVis})`);
            g1.addColorStop(1,    `rgba(${col},0)`);
            ctx.beginPath();
            ctx.arc(hx, hy, 13, 0, TAU);
            ctx.fillStyle = g1;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(hx, hy, 2.4, 0, TAU);
            ctx.fillStyle = route.hue === 'cyan' ? '#a5f3fc' : '#ddd6fe';
            ctx.globalAlpha = headVis;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      });
    });

    // ── 8. Sparkles (arrival bursts) ────────────────
    sparklesRef.current = sparklesRef.current.filter(s => {
      s.life -= 1 / s.max;
      if (s.life <= 0) return false;
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.025;
      const a = s.life;
      const col = s.hue === 'cyan' ? '34,211,238' : '167,139,250';
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
      g.addColorStop(0, `rgba(${col},${0.85 * a})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 3, 0, TAU);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * a, 0, TAU);
      ctx.fillStyle = `rgba(${col},${a})`;
      ctx.fill();
      return true;
    });

    // ── 9. City markers + flags ─────────────────────
    CITIES.forEach((city, idx) => {
      const p = rotY(ll2xyz(city.lat, city.lon), rot);
      if (p.z < 0) return;
      const sx = cx + p.x * R;
      const sy = cy - p.y * R;
      const vis = smoothstep(0, 0.18, p.z);

      if (city.highlight) {
        // Triple expanding rings (offset phases)
        const baseT = t * 0.0035;
        for (let i = 0; i < 3; i++) {
          const phase = (baseT + i * 0.333) % 1;
          const ringR = 5 + phase * 18;
          const a = (1 - phase) * 0.65 * vis;
          ctx.beginPath();
          ctx.arc(sx, sy, ringR, 0, TAU);
          ctx.strokeStyle = isDark
            ? `rgba(34,211,238,${a})`
            : `rgba(37,99,235,${a * 0.85})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Halo behind dot
        const haloG = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
        haloG.addColorStop(0, isDark ? `rgba(34,211,238,${0.5 * vis})` : `rgba(37,99,235,${0.35 * vis})`);
        haloG.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, TAU);
        ctx.fillStyle = haloG;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 4.2, 0, TAU);
        ctx.fillStyle = isDark ? '#67e8f9' : '#1d4ed8';
        ctx.globalAlpha = vis;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Flag
        ctx.font = '15px "Apple Color Emoji","Segoe UI Emoji",serif';
        ctx.globalAlpha = vis;
        ctx.fillText(city.flag, sx + 8, sy - 6);
        ctx.globalAlpha = 1;

        // Label
        ctx.font = 'bold 11px ui-monospace, "SF Mono", monospace';
        const label = city.name.toUpperCase();
        const labelW = ctx.measureText(label).width;
        const lx = sx + 28;
        const ly = sy + 10;
        ctx.fillStyle = isDark
          ? `rgba(2,15,40,${0.7 * vis})`
          : `rgba(255,255,255,${0.85 * vis})`;
        ctx.fillRect(lx - 3, ly - 9, labelW + 6, 13);
        ctx.strokeStyle = isDark
          ? `rgba(34,211,238,${0.5 * vis})`
          : `rgba(37,99,235,${0.4 * vis})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(lx - 3, ly - 9, labelW + 6, 13);
        ctx.fillStyle = isDark
          ? `rgba(186,230,253,${0.95 * vis})`
          : `rgba(30,64,175,${0.95 * vis})`;
        ctx.fillText(label, lx, ly);

      } else {
        // Soft halo
        const cg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 7);
        cg.addColorStop(0, isDark ? `rgba(147,197,253,${0.45 * vis})` : `rgba(59,130,246,${0.30 * vis})`);
        cg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, TAU);
        ctx.fillStyle = cg;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 2.6, 0, TAU);
        ctx.fillStyle = isDark
          ? `rgba(147,197,253,${0.85 * vis})`
          : `rgba(59,130,246,${0.7 * vis})`;
        ctx.fill();

        // Flag (always show, smaller)
        ctx.font = '12px "Apple Color Emoji","Segoe UI Emoji",serif';
        ctx.globalAlpha = vis * 0.9;
        ctx.fillText(city.flag, sx + 5, sy - 4);
        ctx.globalAlpha = 1;

        // Activation-driven label (fades in when arc fires)
        const act = cityActivation[idx];
        if (act > 0.05) {
          const la = act * vis;
          ctx.font = '500 9px ui-monospace, "SF Mono", monospace';
          const labelW = ctx.measureText(city.name).width;
          const lx = sx + 22;
          const ly = sy + 6;
          ctx.fillStyle = isDark
            ? `rgba(2,15,40,${0.7 * la})`
            : `rgba(255,255,255,${0.85 * la})`;
          ctx.fillRect(lx - 2, ly - 8, labelW + 4, 11);
          ctx.fillStyle = isDark
            ? `rgba(186,230,253,${0.92 * la})`
            : `rgba(30,64,175,${0.9 * la})`;
          ctx.fillText(city.name, lx, ly);
        }
      }
    });

    // ── 10. Orbital ring — FRONT half (z > 0) ───────
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    started = false;
    for (let i = 0; i <= 220; i++) {
      const theta = (i / 220) * TAU;
      const p = ringPoint(theta);
      if (p.z <= 0) { started = false; continue; }
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.30)' : 'rgba(59,130,246,0.28)';
    ctx.stroke();

    // Front ring lights — bright
    RING_LIGHTS.forEach((light) => {
      const theta = light.phase * TAU + ringT * 1.4 * light.speed;
      const p = ringPoint(theta);
      if (p.z <= 0) return;
      const sx = cx + p.x * R, sy = cy - p.y * R;
      const col = light.hue === 'cyan' ? '34,211,238' : '167,139,250';
      const fade = smoothstep(0, 0.2, p.z);

      // Halo
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
      g.addColorStop(0, `rgba(${col},${0.9 * fade})`);
      g.addColorStop(0.5, `rgba(${col},${0.3 * fade})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(sx, sy, 10, 0, TAU);
      ctx.fillStyle = g;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8, 0, TAU);
      ctx.fillStyle = light.hue === 'cyan' ? '#a5f3fc' : '#dbeafe';
      ctx.globalAlpha = fade;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    ctx.restore();
  }, [resolvedTheme, stars]);

  // ╭─ Loop ───────────────────────────────────────────╮
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (ts: number) => {
      const dt = lastTsRef.current ? ts - lastTsRef.current : 16;
      lastTsRef.current = ts;
      // Clamp dt to avoid jumps after tab switch
      const clamped = Math.min(dt, 50);
      rotRef.current += clamped * 0.00022;
      timeRef.current = ts;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
        lastTsRef.current = 0;
      } else {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
}

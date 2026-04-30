'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';

const DEG = Math.PI / 180;
interface Vec3 { x: number; y: number; z: number }

function ll2xyz(lat: number, lon: number): Vec3 {
  const phi = (90 - lat) * DEG;
  const theta = lon * DEG;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotY(v: Vec3, a: number): Vec3 {
  return {
    x: v.x * Math.cos(a) - v.z * Math.sin(a),
    y: v.y,
    z: v.x * Math.sin(a) + v.z * Math.cos(a),
  };
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const theta = Math.acos(dot);
  if (theta < 0.001) return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) };
  const s = Math.sin(theta);
  return {
    x: (Math.sin((1 - t) * theta) * a.x + Math.sin(t * theta) * b.x) / s,
    y: (Math.sin((1 - t) * theta) * a.y + Math.sin(t * theta) * b.y) / s,
    z: (Math.sin((1 - t) * theta) * a.z + Math.sin(t * theta) * b.z) / s,
  };
}

function elevate(v: Vec3, t: number, lift: number): Vec3 {
  const e = 1 + lift * Math.sin(Math.PI * t);
  return { x: v.x * e, y: v.y * e, z: v.z * e };
}

const CITIES = [
  { name: 'Tanzania',  flag: '🇹🇿', lat: -6.8,  lon: 39.3,   highlight: true  },
  { name: 'China',     flag: '🇨🇳', lat: 31.2,  lon: 121.5,  highlight: true  },
  { name: 'New York',  flag: '🇺🇸', lat: 40.7,  lon: -74.0,  highlight: false },
  { name: 'London',    flag: '🇬🇧', lat: 51.5,  lon: -0.1,   highlight: false },
  { name: 'Dubai',     flag: '🇦🇪', lat: 25.2,  lon: 55.3,   highlight: false },
  { name: 'Lagos',     flag: '🇳🇬', lat: 6.5,   lon: 3.4,    highlight: false },
  { name: 'Singapore', flag: '🇸🇬', lat: 1.3,   lon: 103.8,  highlight: false },
  { name: 'Nairobi',   flag: '🇰🇪', lat: -1.3,  lon: 36.8,   highlight: false },
  { name: 'Mumbai',    flag: '🇮🇳', lat: 19.1,  lon: 72.9,   highlight: false },
  { name: 'Paris',     flag: '🇫🇷', lat: 48.9,  lon: 2.3,    highlight: false },
  { name: 'São Paulo', flag: '🇧🇷', lat: -23.5, lon: -46.6,  highlight: false },
];

const ROUTES = [
  { from: 0, to: 1,  hue: 'cyan', offsets: [0.0, 0.5]  },
  { from: 1, to: 0,  hue: 'blue', offsets: [0.25, 0.75] },
  { from: 2, to: 0,  hue: 'cyan', offsets: [0.1]        },
  { from: 0, to: 3,  hue: 'blue', offsets: [0.6]        },
  { from: 4, to: 0,  hue: 'cyan', offsets: [0.4]        },
  { from: 5, to: 1,  hue: 'blue', offsets: [0.2, 0.7]   },
  { from: 1, to: 2,  hue: 'cyan', offsets: [0.35]       },
  { from: 6, to: 0,  hue: 'blue', offsets: [0.55]       },
  { from: 8, to: 4,  hue: 'cyan', offsets: [0.15]       },
  { from: 9, to: 0,  hue: 'blue', offsets: [0.8]        },
  { from: 10, to: 0, hue: 'cyan', offsets: [0.45]       },
  { from: 0, to: 6,  hue: 'blue', offsets: [0.9]        },
  { from: 7, to: 1,  hue: 'cyan', offsets: [0.05, 0.6]  },
];

const STEPS = 90;

function buildArc(from: (typeof CITIES)[0], to: (typeof CITIES)[0]) {
  const a = ll2xyz(from.lat, from.lon);
  const b = ll2xyz(to.lat, to.lon);
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    return elevate(slerp(a, b, t), t, 0.32);
  });
}

interface Satellite {
  lat: number; lon: number; speed: number;
  radius: number; size: number; hue: 'cyan' | 'blue';
  phase: number;
}

interface Star {
  x: number; y: number; size: number; twinkle: number;
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef(0.4);
  const timeRef   = useRef(0);
  const arcsRef   = useRef<Vec3[][]>([]);
  const { resolvedTheme } = useTheme();

  // Pre-build arcs (heavy, do once)
  useEffect(() => {
    arcsRef.current = ROUTES.map(r => buildArc(CITIES[r.from], CITIES[r.to]));
  }, []);

  // Stable random satellites & stars
  const satellites = useMemo<Satellite[]>(() => {
    const seeds = [
      [12,45], [78,180], [-30,250], [55,90], [-15,310], [40,140],
      [-50,30], [20,200], [60,70], [-25,350], [10,120], [-40,280],
      [35,220], [-5,160], [70,50], [-60,100], [25,300], [50,330],
      [-35,40], [15,260], [45,75], [-20,140], [30,15], [-55,220],
    ];
    return seeds.map(([lat, lon], i) => ({
      lat,
      lon,
      speed:  0.05 + (i % 5) * 0.02,
      radius: 1.06 + (i % 4) * 0.025,
      size:   0.7 + (i % 3) * 0.5,
      hue:    (i % 2 === 0 ? 'cyan' : 'blue') as 'cyan' | 'blue',
      phase:  i * 0.4,
    }));
  }, []);

  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    // Deterministic field
    for (let i = 0; i < 60; i++) {
      const a = (i * 137.5) % 360 * DEG;
      const r = (i % 7) * 0.05 + 0.6;
      arr.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        size: (i % 3) * 0.4 + 0.4,
        twinkle: i * 0.7,
      });
    }
    return arr;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = resolvedTheme === 'dark';
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    if (W === 0 || H === 0) return;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const rot = rotRef.current;
    const t   = timeRef.current;

    // ── Background star field (twinkling) ────────────
    stars.forEach(s => {
      const sx = cx + s.x * R * 1.6;
      const sy = cy + s.y * R * 1.6;
      const tw = (Math.sin(t * 0.001 + s.twinkle) + 1) / 2;
      const a  = (0.25 + tw * 0.55) * (isDark ? 1 : 0.4);
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(186,230,253,${a})`
        : `rgba(59,130,246,${a})`;
      ctx.fill();
    });

    // ── Atmosphere outer glow (pulsing) ──────────────
    const atmoPulse = (Math.sin(t * 0.0015) + 1) / 2;
    const atmo = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * (1.3 + atmoPulse * 0.05));
    atmo.addColorStop(0, isDark
      ? `rgba(59,130,246,${0.15 + atmoPulse * 0.08})`
      : `rgba(59,130,246,${0.08 + atmoPulse * 0.04})`);
    atmo.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
    ctx.fillStyle = atmo;
    ctx.fill();

    // ── Radar sweep ──────────────────────────────────
    const sweepAngle = (t * 0.0006) % (Math.PI * 2);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(sweepAngle);
    const sweep = ctx.createLinearGradient(0, 0, R, 0);
    sweep.addColorStop(0, isDark ? 'rgba(34,211,238,0.16)' : 'rgba(59,130,246,0.10)');
    sweep.addColorStop(0.7, isDark ? 'rgba(34,211,238,0.04)' : 'rgba(59,130,246,0.025)');
    sweep.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, -0.35, 0.02);
    ctx.closePath();
    ctx.fillStyle = sweep;
    ctx.fill();
    ctx.restore();

    // ── Globe base ───────────────────────────────────
    const bg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
    if (isDark) {
      bg.addColorStop(0,    'rgba(28,68,140,0.7)');
      bg.addColorStop(0.55, 'rgba(10,28,80,0.82)');
      bg.addColorStop(1,    'rgba(3,10,38,0.95)');
    } else {
      bg.addColorStop(0, 'rgba(220,235,255,0.85)');
      bg.addColorStop(0.6, 'rgba(200,220,255,0.65)');
      bg.addColorStop(1, 'rgba(180,205,250,0.45)');
    }
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = bg;
    ctx.fill();

    // Pulsing energy core at center
    const corePulse = (Math.sin(t * 0.0028) + 1) / 2;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (0.35 + corePulse * 0.1));
    core.addColorStop(0, isDark
      ? `rgba(34,211,238,${0.18 + corePulse * 0.12})`
      : `rgba(34,211,238,${0.08 + corePulse * 0.06})`);
    core.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();

    // Specular sheen
    const spec = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.35, cy - R * 0.35, R * 0.7);
    spec.addColorStop(0, isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.3)');
    spec.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = spec;
    ctx.fill();

    // Outer rim
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(96,165,250,0.45)' : 'rgba(59,130,246,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner pulsing ring
    const ringPulse = (Math.sin(t * 0.002 + 1.2) + 1) / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R * (0.96 - ringPulse * 0.04), 0, Math.PI * 2);
    ctx.strokeStyle = isDark
      ? `rgba(34,211,238,${0.15 + ringPulse * 0.1})`
      : `rgba(59,130,246,${0.1 + ringPulse * 0.07})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // ── Grid lines ───────────────────────────────────
    const gridC = isDark ? '100,170,255' : '59,130,246';
    ctx.lineWidth = 0.5;

    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = 0; lon <= 360; lon += 3) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridC},0.16)`;
      ctx.stroke();
    }
    for (let lon = 0; lon < 360; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = rotY(ll2xyz(lat, lon), rot);
        const sx = cx + p.x * R, sy = cy - p.y * R;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = `rgba(${gridC},0.16)`;
      ctx.stroke();
    }

    // Bright equator
    ctx.beginPath();
    let firstEq = true;
    for (let lon = 0; lon <= 360; lon += 3) {
      const p = rotY(ll2xyz(0, lon), rot);
      const sx = cx + p.x * R, sy = cy - p.y * R;
      if (firstEq) { ctx.moveTo(sx, sy); firstEq = false; } else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = isDark ? 'rgba(34,211,238,0.32)' : 'rgba(34,211,238,0.25)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // ── Orbiting satellites (data nodes) ─────────────
    satellites.forEach(s => {
      const lon = (s.lon + t * s.speed * 0.06) % 360;
      const v = ll2xyz(s.lat, lon);
      const v2 = { x: v.x * s.radius, y: v.y * s.radius, z: v.z * s.radius };
      const r = rotY(v2, rot);
      if (r.z < -0.1) return;
      const sx = cx + r.x * R, sy = cy - r.y * R;
      const blink = (Math.sin(t * 0.004 + s.phase) + 1) / 2;
      const alpha = Math.max(0, Math.min(1, r.z + 0.2)) * (0.4 + blink * 0.5);
      const col = s.hue === 'cyan' ? '34,211,238' : '147,197,253';

      // Outer glow
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 4);
      g.addColorStop(0, `rgba(${col},${alpha * 0.7})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(sx, sy, s.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${alpha})`;
      ctx.fill();
    });

    // ── Arcs ─────────────────────────────────────────
    const speed = 0.0010;

    ROUTES.forEach((route, ri) => {
      const arc = arcsRef.current[ri];
      if (!arc) return;

      // Dim base path
      ctx.lineWidth = 0.7;
      for (let i = 1; i <= STEPS; i++) {
        const rA = rotY(arc[i - 1], rot);
        const rB = rotY(arc[i], rot);
        if (rA.z < -0.15 && rB.z < -0.15) continue;
        const vis = Math.max(0, ((rA.z + rB.z) / 2 + 0.15));
        const alpha = vis * (isDark ? 0.18 : 0.12);
        ctx.beginPath();
        ctx.moveTo(cx + rA.x * R, cy - rA.y * R);
        ctx.lineTo(cx + rB.x * R, cy - rB.y * R);
        ctx.strokeStyle = route.hue === 'cyan'
          ? `rgba(34,211,238,${alpha})` : `rgba(147,197,253,${alpha})`;
        ctx.stroke();
      }

      route.offsets.forEach((offset) => {
        const rawT = ((t * speed + offset) % 1 + 1) % 1;
        const trailLen = 0.2;
        const trailStart = Math.max(0, rawT - trailLen);

        // Trail
        ctx.lineWidth = 2.4;
        for (let i = 1; i <= STEPS; i++) {
          const ti = i / STEPS;
          if (ti < trailStart || ti > rawT) continue;
          const rA = rotY(arc[i - 1], rot);
          const rB = rotY(arc[i], rot);
          if (rA.z < -0.1 && rB.z < -0.1) continue;
          const fade = (ti - trailStart) / trailLen;
          const vis  = Math.max(0, ((rA.z + rB.z) / 2) + 0.3);
          const alpha = fade * vis * 0.95;
          const col = route.hue === 'cyan' ? '34,211,238' : '147,197,253';
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
          if (rH.z > -0.1) {
            const hx = cx + rH.x * R, hy = cy - rH.y * R;
            const col = route.hue === 'cyan' ? '34,211,238' : '147,197,253';

            const g1 = ctx.createRadialGradient(hx, hy, 0, hx, hy, 11);
            g1.addColorStop(0, `rgba(${col},0.85)`);
            g1.addColorStop(1, `rgba(${col},0)`);
            ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI * 2);
            ctx.fillStyle = g1; ctx.fill();

            ctx.beginPath(); ctx.arc(hx, hy, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = route.hue === 'cyan' ? '#a5f3fc' : '#dbeafe';
            ctx.fill();

            // Arrival burst
            if (rawT > 0.92) {
              const burst = (rawT - 0.92) / 0.08;
              const br = burst * 22;
              const g2 = ctx.createRadialGradient(hx, hy, 0, hx, hy, br);
              g2.addColorStop(0, `rgba(${col},${0.6 * (1 - burst)})`);
              g2.addColorStop(1, `rgba(${col},0)`);
              ctx.beginPath(); ctx.arc(hx, hy, br, 0, Math.PI * 2);
              ctx.fillStyle = g2; ctx.fill();
              // Burst ring
              ctx.beginPath();
              ctx.arc(hx, hy, br * 0.7, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(${col},${0.55 * (1 - burst)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      });
    });

    // ── City dots + flags ────────────────────────────
    CITIES.forEach((city) => {
      const p = rotY(ll2xyz(city.lat, city.lon), rot);
      if (p.z < 0.0) return;
      const sx = cx + p.x * R;
      const sy = cy - p.y * R;
      const vis = Math.min(1, (p.z + 0.1) * 4);

      if (city.highlight) {
        // 3 expanding rings
        const pulse1 = (Math.sin(t * 0.005) + 1) / 2;
        const pulse2 = (Math.sin(t * 0.005 + Math.PI * 0.66) + 1) / 2;
        const pulse3 = (Math.sin(t * 0.005 + Math.PI * 1.33) + 1) / 2;

        [pulse1, pulse2, pulse3].forEach((p, idx) => {
          ctx.beginPath();
          ctx.arc(sx, sy, 4 + p * (10 + idx * 3), 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(34,211,238,${(0.6 - p * 0.5) * vis})`
            : `rgba(37,99,235,${(0.45 - p * 0.4) * vis})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        });

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, 4.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#22d3ee' : '#2563eb';
        ctx.globalAlpha = vis;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Flag
        ctx.font = '15px serif';
        ctx.globalAlpha = vis;
        ctx.fillText(city.flag, sx - 20, sy - 9);
        ctx.globalAlpha = 1;

        // Label
        ctx.font = 'bold 11px ui-monospace, monospace';
        ctx.fillStyle = isDark
          ? `rgba(186,230,253,${0.95 * vis})`
          : `rgba(30,64,175,${0.9 * vis})`;
        ctx.fillText(city.name, sx + 8, sy + 4);

      } else {
        ctx.beginPath();
        ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(147,197,253,${0.78 * vis})`
          : `rgba(59,130,246,${0.68 * vis})`;
        ctx.fill();

        // Soft glow under city
        const cg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
        cg.addColorStop(0, isDark ? `rgba(147,197,253,${0.5 * vis})` : `rgba(59,130,246,${0.35 * vis})`);
        cg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();

        ctx.font = '12px serif';
        ctx.globalAlpha = vis * 0.9;
        ctx.fillText(city.flag, sx - 14, sy - 6);
        ctx.globalAlpha = 1;

        ctx.font = '9px ui-monospace, monospace';
        ctx.fillStyle = isDark
          ? `rgba(147,197,253,${0.65 * vis})`
          : `rgba(59,130,246,${0.55 * vis})`;
        ctx.fillText(city.name, sx + 5, sy + 3);
      }
    });

    ctx.restore();
  }, [resolvedTheme, satellites, stars]);

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

    let last = 0;
    const loop = (ts: number) => {
      const dt = ts - last;
      last = ts;
      rotRef.current += dt * 0.00028;
      timeRef.current = ts;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />;
}

'use client';

import { useEffect, useRef, useState } from 'react';

/* ══════════════════════════════════════════════════════════════
   Hero visual — a live cross-border settlement feed. Terminal
   panel where transactions stream in real time: origin → dest,
   amount sent → received, settle latency. On-brand, fast, and it
   literally shows "money at the speed of the internet".
   ══════════════════════════════════════════════════════════════ */

type Corridor = {
  from: { country: string; flag: string; cur: string; sym: string };
  to: { country: string; flag: string; cur: string; sym: string };
  rate: number; // 1 unit from-cur → to-cur
};

const CORRIDORS: Corridor[] = [
  { from: { country: 'Tanzania',     flag: '🇹🇿', cur: 'TZS', sym: 'TSh' }, to: { country: 'UK',        flag: '🇬🇧', cur: 'GBP', sym: '£' },   rate: 0.00029 },
  { from: { country: 'Nigeria',      flag: '🇳🇬', cur: 'NGN', sym: '₦' },   to: { country: 'UAE',       flag: '🇦🇪', cur: 'AED', sym: 'AED ' }, rate: 0.0024 },
  { from: { country: 'Kenya',        flag: '🇰🇪', cur: 'KES', sym: 'KSh' }, to: { country: 'China',     flag: '🇨🇳', cur: 'CNY', sym: '¥' },   rate: 0.055 },
  { from: { country: 'UK',           flag: '🇬🇧', cur: 'GBP', sym: '£' },   to: { country: 'Tanzania',  flag: '🇹🇿', cur: 'TZS', sym: 'TSh' }, rate: 3390 },
  { from: { country: 'USA',          flag: '🇺🇸', cur: 'USD', sym: '$' },   to: { country: 'India',     flag: '🇮🇳', cur: 'INR', sym: '₹' },   rate: 83.2 },
  { from: { country: 'Tanzania',     flag: '🇹🇿', cur: 'TZS', sym: 'TSh' }, to: { country: 'UAE',       flag: '🇦🇪', cur: 'AED', sym: 'AED ' }, rate: 0.0011 },
  { from: { country: 'South Africa', flag: '🇿🇦', cur: 'ZAR', sym: 'R' },   to: { country: 'Kenya',     flag: '🇰🇪', cur: 'KES', sym: 'KSh' }, rate: 7.05 },
  { from: { country: 'Turkey',       flag: '🇹🇷', cur: 'TRY', sym: '₺' },   to: { country: 'Nigeria',   flag: '🇳🇬', cur: 'NGN', sym: '₦' },   rate: 47.8 },
  { from: { country: 'Singapore',    flag: '🇸🇬', cur: 'SGD', sym: 'S$' },  to: { country: 'Tanzania',  flag: '🇹🇿', cur: 'TZS', sym: 'TSh' }, rate: 1980 },
  { from: { country: 'Canada',       flag: '🇨🇦', cur: 'CAD', sym: 'C$' },  to: { country: 'Kenya',     flag: '🇰🇪', cur: 'KES', sym: 'KSh' }, rate: 95.4 },
];

type Tx = {
  id: number;
  c: Corridor;
  sent: number;
  recv: number;
  latency: string;
};

const fmt = (n: number) =>
  n >= 1000 ? Math.round(n).toLocaleString('en-US') : n.toFixed(2);

// Deterministic seed for SSR/first paint (no Math.random) → no hydration drift
const SEED_AMOUNTS = [250000, 180000, 42000, 320, 1200, 890000, 15000, 60000];

function makeTx(id: number, seedIdx?: number): Tx {
  const c = CORRIDORS[(seedIdx ?? Math.floor(Math.random() * CORRIDORS.length)) % CORRIDORS.length];
  const base =
    seedIdx !== undefined
      ? SEED_AMOUNTS[seedIdx % SEED_AMOUNTS.length]
      : [50, 100, 250, 500, 1000, 5000][Math.floor(Math.random() * 6)] *
        (c.from.cur === 'TZS' || c.from.cur === 'NGN' ? 100 : 1) *
        (1 + Math.floor(Math.random() * 9));
  const latency =
    seedIdx !== undefined
      ? ['0.8', '1.1', '0.6', '1.4'][seedIdx % 4]
      : (0.4 + Math.random() * 1.5).toFixed(1);
  return { id, c, sent: base, recv: base * c.rate, latency };
}

const INITIAL: Tx[] = Array.from({ length: 6 }, (_, i) => makeTx(1000 - i, i));

export default function HeroVisual() {
  const [rows, setRows] = useState<Tx[]>(INITIAL);
  const [count, setCount] = useState(4218);   // transactions today
  const [volume, setVolume] = useState(1.0);  // $M today — starts at ~$1M, climbs slowly
  const idRef = useRef(2000);
  const barsRef = useRef<number[]>(
    [40, 62, 48, 74, 55, 83, 60, 70, 52, 88, 66, 45].map((v) => v)
  );
  const [bars, setBars] = useState<number[]>(barsRef.current);

  useEffect(() => {
    const feed = setInterval(() => {
      setRows((prev) => [makeTx(idRef.current++), ...prev].slice(0, 6));
      setCount((c) => c + 1 + Math.floor(Math.random() * 2));
      // climb slowly: ~+0.05–0.13M per settled batch → 1.0 → 1.2 → 1.4 over time
      setVolume((v) => +(v + 0.05 + Math.random() * 0.08).toFixed(1));
      setBars((prev) => {
        const next = [...prev.slice(1), 35 + Math.floor(Math.random() * 60)];
        return next;
      });
    }, 1900);

    const ticker = setInterval(() => setCount((c) => c + (Math.random() < 0.5 ? 1 : 0)), 900);
    return () => {
      clearInterval(feed);
      clearInterval(ticker);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* ambient glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-cyan-400/10 blur-3xl rounded-full pointer-events-none" />

      {/* ── Terminal panel ── */}
      <div className="relative bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden">
        {/* top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        {/* corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/40 dark:border-cyan-400/40" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/40 dark:border-cyan-400/40" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/40 dark:border-cyan-400/40" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/40 dark:border-cyan-400/40" />

        {/* header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-200/70 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase">
              Live Settlement
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-blue-600 dark:text-cyan-400">
            NET.GLOBAL
          </span>
        </div>

        {/* counters */}
        <div className="grid grid-cols-2 divide-x divide-slate-200/70 dark:divide-white/[0.06] border-b border-slate-200/70 dark:border-white/[0.06]">
          <div className="px-4 sm:px-5 py-3">
            <div className="text-[8px] font-mono tracking-[0.18em] text-slate-400 dark:text-slate-600 uppercase mb-1">
              Transactions
            </div>
            <div className="font-display text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums leading-none">
              {count.toLocaleString('en-US')}
            </div>
          </div>
          <div className="px-4 sm:px-5 py-3">
            <div className="text-[8px] font-mono tracking-[0.18em] text-slate-400 dark:text-slate-600 uppercase mb-1">
              Volume · Today
            </div>
            <div className="font-display text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 tabular-nums leading-none">
              ${volume}M
            </div>
          </div>
        </div>

        {/* feed */}
        <div className="px-3 sm:px-4 py-2">
          <div className="flex flex-col">
            {rows.map((tx, i) => (
              <div
                key={tx.id}
                className={`grid grid-cols-[1fr_auto] items-center gap-2 py-2 px-1.5 sm:px-2 border-b border-slate-100 dark:border-white/[0.04] last:border-0 ${
                  i === 0 ? 'animate-[txIn_0.5s_ease]' : ''
                }`}
                style={{ opacity: Math.max(0.35, 1 - i * 0.12) }}
              >
                {/* route */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-slate-700 dark:text-slate-200 truncate">
                    <span>{tx.c.from.flag}</span>
                    <span className="truncate">{tx.c.from.country}</span>
                    <svg className="w-3 h-3 shrink-0 text-blue-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>{tx.c.to.flag}</span>
                    <span className="truncate">{tx.c.to.country}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <span>{tx.c.from.sym}{fmt(tx.sent)}</span>
                    <span className="text-slate-300 dark:text-slate-700">→</span>
                    <span className="text-blue-600/80 dark:text-cyan-400/80">{tx.c.to.sym}{fmt(tx.recv)}</span>
                  </div>
                </div>

                {/* status */}
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Settled
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-600">{tx.latency}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* throughput sparkline footer */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-t border-slate-200/70 dark:border-white/[0.06]">
          <span className="text-[8px] font-mono tracking-[0.18em] text-slate-400 dark:text-slate-600 uppercase shrink-0">
            Throughput
          </span>
          <div className="flex items-end gap-[3px] h-6 flex-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/40 to-cyan-400/70 dark:from-blue-500/50 dark:to-cyan-400/80 transition-all duration-700"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-blue-600 dark:text-cyan-400 shrink-0">180+ ctry</span>
        </div>

        {/* scan line (dark) */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block overflow-hidden">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent animate-[scan_5s_linear_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes txIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan {
          0%   { top: -20%; }
          100% { top: 120%; }
        }
      `}</style>
    </div>
  );
}

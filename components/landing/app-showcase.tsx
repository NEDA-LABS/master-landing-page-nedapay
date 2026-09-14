'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ══════════════════════════════════════════════════════════════
   Interactive app showcase — real NEDApay screenshots in a phone
   frame. Tabs swap the screen; also auto-advances on a timer and
   pauses while the user is hovering / after a manual pick.
   ══════════════════════════════════════════════════════════════ */

type Tab = { key: string; label: string; blurb: string; img: string };

const TABS: Tab[] = [
  {
    key: 'spend',
    label: 'Spend & Send',
    blurb: 'Hold your balance in local currency and send money globally — right from the home screen, in seconds.',
    img: '/sc1.png',
  },
  {
    key: 'pay',
    label: 'Pay for Goods & Services',
    blurb: 'Lipa Namba, pay bills, top up airtime, TV, water, power and government fees — all in one place.',
    img: '/pay-for-goods.png',
  },
  {
    key: 'swap',
    label: 'Swap Currencies',
    blurb: 'Convert between USD, TZS and more at live market rates, instantly and on-chain.',
    img: '/swap.png',
  },
  {
    key: 'business',
    label: 'Your Business in One',
    blurb: 'Run your whole storefront with Biashara — collections, financing, analytics and orders in one place.',
    img: '/biashara-store.png',
  },
];

const INTERVAL = 4200;

export default function AppShowcase() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % TABS.length), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const active = TABS[idx];

  return (
    <section
      id="app"
      className="relative py-16 sm:py-24 bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden"
    >
      {/* grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blue-500/5 dark:bg-blue-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">One App · Every Money Move</span>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>

        {/* heading — display font */}
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-slate-900 dark:text-white mb-3 max-w-2xl">
          Your whole wallet,
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"> one tap away.</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-500 text-sm font-light max-w-lg mb-10 sm:mb-14">
          Spend, pay, swap, send across borders, and run your business — all inside NEDApay. Tap through to see the real app.
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── LEFT: tabs ── */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-2">
              {TABS.map((t, i) => {
                const on = i === idx;
                return (
                  <button
                    key={t.key}
                    onClick={() => setIdx(i)}
                    aria-pressed={on}
                    className={`group relative text-left overflow-hidden transition-all duration-300 px-4 sm:px-5 py-3 sm:py-4 ${
                      on ? 'bg-white dark:bg-white/[0.04]' : 'bg-transparent hover:bg-white/60 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* left accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ${on ? 'bg-gradient-to-b from-blue-500 to-cyan-400' : 'bg-transparent group-hover:bg-slate-200 dark:group-hover:bg-white/10'}`} />
                    {on && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />}
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono ${on ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-700'}`}>
                        0{i + 1}
                      </span>
                      <span className={`font-display text-xl sm:text-2xl transition-colors ${on ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                        {t.label}
                      </span>
                    </div>
                    {/* blurb only when active */}
                    <div className={`grid transition-all duration-300 ${on ? 'grid-rows-[1fr] opacity-100 mt-1.5' : 'grid-rows-[0fr] opacity-0'}`}>
                      <p className="overflow-hidden text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-500 pl-[26px] leading-relaxed">
                        {t.blurb}
                      </p>
                    </div>
                    {/* autoplay progress bar on active tab */}
                    {on && !paused && (
                      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 animate-[showcaseProgress_4.2s_linear]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* dots */}
            <div className="flex items-center gap-1.5 mt-5 pl-4 sm:pl-5">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setIdx(i)}
                  aria-label={`Show ${t.label}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-blue-500 dark:bg-blue-400' : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: phone ── */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* glow */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-cyan-400/10 blur-2xl rounded-full pointer-events-none" />

              {/* phone frame */}
              <div className="relative w-[260px] sm:w-[290px] aspect-[10/19.5] rounded-[2.5rem] bg-neutral-900 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                {/* notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-900 rounded-b-2xl z-20" />
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#efe9dd]">
                  {/* All three stay mounted & preloaded; only the active one is
                      displayed. `hidden` (display:none) can't be overridden by
                      next/image's own inline styles, so switching is reliable. */}
                  {TABS.map((t, i) => (
                    <div
                      key={t.key}
                      className={i === idx ? 'absolute inset-0 animate-[showcaseFade_0.45s_ease]' : 'hidden'}
                    >
                      <Image
                        src={t.img}
                        alt={`NEDApay — ${t.label}`}
                        fill
                        sizes="290px"
                        priority={i === 0}
                        loading={i === 0 ? undefined : 'eager'}
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* floating caption chip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-[9px] font-mono tracking-wider text-slate-600 dark:text-slate-400 uppercase">▸ {active.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes showcaseProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes showcaseFade {
          from { opacity: 0; transform: scale(0.99); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

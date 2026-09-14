'use client';

import Link from 'next/link';

const trustSignals = [
  { label: 'Licensed', detail: 'Bank of Tanzania', hue: 'cyan' },
  { label: 'On-chain', detail: 'Base L2 · Audited', hue: 'blue' },
  { label: 'Regulated', detail: 'Digital Currency', hue: 'cyan' },
  { label: 'Available', detail: 'Android + iOS', hue: 'blue' },
];

export default function TrustSection() {
  return (
    <section id="trust" className="relative py-16 sm:py-24 bg-white dark:bg-black overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
            Licensed · Regulated · Available
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── LEFT: Regulation block ── */}
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-[0.95] mb-4">
              Built on Trust.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                Backed by Regulation.
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed font-light mb-8 max-w-md">
              NEDApay operates under a license issued by the Bank of Tanzania — the country's central banking authority. Every transaction is on-chain, auditable, and backed by regulated digital currency infrastructure.
            </p>

            {/* BOT credential card */}
            <div className="group relative overflow-hidden bg-slate-50 dark:bg-white/[0.025] p-5 sm:p-6 mb-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400/70 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/20 group-hover:border-cyan-400/60 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/20 group-hover:border-cyan-400/60 transition-colors duration-300" />

              <div className="flex items-start gap-4">
                {/* Shield icon */}
                <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full">
                  <svg className="w-5 h-5 text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-cyan-600 dark:text-cyan-400 uppercase bg-cyan-50 dark:bg-cyan-500/10 px-2 py-0.5">
                      LICENSED
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Bank of Tanzania</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 font-mono mt-0.5">Digital Payments Service Provider · Tanzania</p>
                </div>
              </div>

              {/* Trust signal pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {trustSignals.map((s) => (
                  <div key={s.label} className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono tracking-wider uppercase ${
                    s.hue === 'cyan'
                      ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                      : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${s.hue === 'cyan' ? 'bg-cyan-400' : 'bg-blue-400'}`} />
                    {s.label} · {s.detail}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: App download cards ── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-2xl text-slate-900 dark:text-white mb-2">
              Get the App
            </h3>

            {/* Android */}
            <Link href="https://play.google.com/store/apps/details?id=com.nedapay.app"
              target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden bg-slate-50 dark:bg-white/[0.025] hover:bg-blue-50/40 dark:hover:bg-blue-500/[0.05] p-5 transition-all duration-300 flex items-center gap-4">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent group-hover:via-blue-400/65 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/15 group-hover:border-blue-400/55 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/15 group-hover:border-blue-400/55 transition-colors duration-300" />

              {/* Play Store icon */}
              <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-slate-100 dark:bg-white/[0.06] rounded-full">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.04-2.78-2.78-10.68 9.68zm-1.1-20.4C2 3.63 2 3.92 2 4.22v15.56c0 .3 0 .6.08.87l.05.05 8.71-8.71v-.2L2.13 3.3l-.05.06zM20.49 10.6L17.6 8.97l-3.1 3.1 3.1 3.09 2.91-1.64c.83-.47.83-1.23-.02-1.92zM4.17.14L16.64 7.2l-2.78 2.78L3.18.3c.3-.17.67-.2.99-.16z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-mono tracking-[0.18em] text-slate-400 dark:text-slate-600 uppercase mb-0.5">Available on</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Google Play</p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">Android · Free download</p>
              </div>
              <svg className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-blue-400 transition-colors ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* iOS */}
            <Link href="https://apps.apple.com/tz/app/nedapay-wallet/id6799928100"
              target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden bg-slate-50 dark:bg-white/[0.025] hover:bg-cyan-50/40 dark:hover:bg-cyan-500/[0.05] p-5 transition-all duration-300 flex items-center gap-4">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent group-hover:via-cyan-400/65 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/15 group-hover:border-cyan-400/55 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/15 group-hover:border-cyan-400/55 transition-colors duration-300" />

              {/* Apple icon */}
              <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-slate-100 dark:bg-white/[0.06] rounded-full">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-mono tracking-[0.18em] text-slate-400 dark:text-slate-600 uppercase mb-0.5">Download on the</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">App Store</p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">iPhone · Free download</p>
              </div>
              <svg className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-cyan-400 transition-colors ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Web app */}
            <Link href="https://app.nedapay.xyz"
              target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden bg-slate-50 dark:bg-white/[0.025] hover:bg-slate-100/60 dark:hover:bg-white/[0.04] p-5 transition-all duration-300 flex items-center gap-4">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/20 to-transparent group-hover:via-slate-400/40 transition-all duration-300" />
              <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-slate-100 dark:bg-white/[0.06] rounded-full">
                <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-mono tracking-[0.18em] text-slate-400 dark:text-slate-600 uppercase mb-0.5">Also available on</p>
                <p className="text-base font-semibold text-slate-900 dark:text-white">Web Browser</p>
                <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">app.nedapay.xyz · No install needed</p>
              </div>
              <svg className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-slate-400 transition-colors ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

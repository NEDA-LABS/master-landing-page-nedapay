'use client';

import Image from 'next/image';

const stablecoins = [
  { name: 'USDC', logo: '/usdc-logo.svg' },
  { name: 'USDT', logo: '/usdt-coin.svg' },
  { name: 'EURC', logo: '/eurc-coin.png' },
  { name: 'CADC', logo: '/cadc-coin.png' },
  { name: 'BRL', logo: '/brl-coin.png' },
  { name: 'CNGN', logo: '/cngn-icon.jpeg' },
  { name: 'ZARP', logo: '/zarp-coin.png' },
  { name: 'TRYB', logo: '/tryb-icon.png' },
];

const allCoins = [...stablecoins, ...stablecoins, ...stablecoins];

export default function PartnersSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/5 dark:bg-blue-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
            Liquidity Layer
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-blue-500/40 to-transparent" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
          Borderless Liquidity,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
            Local Precision
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-500 text-base max-w-2xl leading-relaxed font-light">
          Powered by a global network of stablecoins and regulated partners.
          We turn cross-border complexity into a single API call.
        </p>
      </div>

      {/* nTZS Feature Card */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative border border-slate-200 dark:border-white/8 overflow-hidden">
          {/* Perspective grid bg */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: 'perspective(600px) rotateX(55deg)',
              transformOrigin: 'center bottom',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/40 dark:border-blue-400/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/40 dark:border-blue-400/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/40 dark:border-blue-400/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/40 dark:border-blue-400/40" />

          <div className="relative z-10 p-4 sm:p-8 md:p-12 bg-slate-50/80 dark:bg-white/[0.02]">

            {/* Top intro grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
              {/* Image */}
              <div className="flex justify-center lg:justify-end order-last lg:order-first">
                <div className="group relative">
                  <Image
                    src="/NTZ STABLE 2.png"
                    alt="nTZS — Tanzania's Local Stablecoin"
                    width={380}
                    height={210}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-slate-900 dark:text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase border border-blue-500/20 dark:border-blue-400/20 px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10">
                    STABLECOIN · LIQUIDITY MARKET
                  </span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold leading-tight">
                  Why{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                    nTZS Stablecoin
                  </span>
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-light">
                  nTZS is the{' '}
                  <span className="text-blue-600 dark:text-blue-400 font-medium">first regulated stablecoin in Tanzania</span>
                  {' '}— and through{' '}
                  <span className="text-blue-600 dark:text-blue-400 font-medium">SimpleFX</span>, anyone can become a market maker.
                  Deposit nTZS, set your spread, and collect fees on every swap — automatically, around the clock. No trading desk. No effort.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                  <span className="text-sm font-mono text-blue-600 dark:text-blue-400 tracking-wider">
                    THE OPEN TZS LIQUIDITY MARKET
                  </span>
                </div>
              </div>
            </div>

            {/* SimpleFX divider */}
            <div className="flex items-center gap-3 mb-8 mt-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase whitespace-nowrap">
                ⚡ SimpleFX · How It Works
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { value: '1.5%', label: 'ASK SPREAD',  hue: 'cyan' },
                { value: '94%',  label: 'FILL RATE',   hue: 'blue' },
                { value: '1.2%', label: 'BID SPREAD',  hue: 'cyan' },
                { value: '87%',  label: 'POOL DEPTH',  hue: 'blue' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group relative border border-slate-200 dark:border-white/8 hover:border-blue-500/40 dark:hover:border-blue-400/30 bg-white/60 dark:bg-white/[0.02] hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.04] p-4 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/0 group-hover:border-blue-500/60 dark:group-hover:border-blue-400/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/0 group-hover:border-blue-500/60 dark:group-hover:border-blue-400/60 transition-colors" />
                  <div className={`text-2xl md:text-3xl font-bold mb-1 ${stat.hue === 'cyan' ? 'text-cyan-500 dark:text-cyan-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-slate-500 dark:text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Ask side / Bid side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* ASK SIDE */}
              <div className="relative border border-slate-200 dark:border-white/8 bg-white/40 dark:bg-white/[0.02] p-5 md:p-6 group hover:border-cyan-500/40 dark:hover:border-cyan-400/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-500 dark:text-cyan-400 uppercase">
                    ASK SIDE · 1.5% Spread
                  </span>
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Earn on every nTZS sold to traders
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Deposit nTZS as your ask inventory. Every time a trader swaps USDC for nTZS, your ask order fills and you pocket the spread — no manual trading required.
                </p>
              </div>

              {/* BID SIDE */}
              <div className="relative border border-slate-200 dark:border-white/8 bg-white/40 dark:bg-white/[0.02] p-5 md:p-6 group hover:border-blue-500/40 dark:hover:border-blue-400/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                    BID SIDE · 1.2% Spread
                  </span>
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Earn on every nTZS bought from traders
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Hold USDC as your bid reserve. When traders exit nTZS positions, your USDC absorbs the sell flow and you earn the bid spread on every fill, around the clock.
                </p>
              </div>
            </div>

            {/* Supported coins/networks */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/8 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">
                  Supports
                </span>
                <div className="flex items-center gap-1.5">
                  {['/ntzs-logo.webp','/usdc-logo.svg','/usdt-coin.svg','/eurc-coin.png','/cngn-icon.jpeg'].map((src, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-0.5 flex items-center justify-center overflow-hidden">
                      <Image src={src} alt="" width={20} height={20} className="object-contain rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">
                  On
                </span>
                <div className="flex items-center gap-1.5">
                  {['/chains/base.svg','/chains/polygon.svg','/chains/arbitrum.svg'].map((src, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-0.5 flex items-center justify-center overflow-hidden">
                      <Image src={src} alt="" width={20} height={20} className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.ntzs.co.tz/simplefx"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm tracking-widest border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-all duration-200"
              >
                <span className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                BECOME A MARKET MAKER
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://www.ntzs.co.tz/simplefx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-mono text-sm tracking-widest border border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:border-blue-500/50 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                READ THE DOCS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stablecoin infinite scroll */}
      <div className="relative z-10">
        {/* Section sub-label */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase px-3">
              Supported Stablecoins
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-l from-white to-transparent dark:from-black dark:to-transparent z-10" />

          <div className="flex animate-coins-scroll">
            {allCoins.map((coin, index) => (
              <div
                key={`${coin.name}-${index}`}
                className="flex-shrink-0 mx-2 sm:mx-4 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] border border-slate-200 dark:border-white/8 hover:border-blue-500/40 dark:hover:border-blue-400/30 bg-white dark:bg-white/[0.02] hover:bg-blue-50/50 dark:hover:bg-blue-500/[0.05] flex items-center justify-center transition-all duration-200 hover:scale-105 group"
              >
                <Image
                  src={coin.logo}
                  alt={coin.name}
                  width={64}
                  height={64}
                  className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes coins-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-108px * ${stablecoins.length})); }
        }
        .animate-coins-scroll {
          animation: coins-scroll 28s linear infinite;
        }
        .animate-coins-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

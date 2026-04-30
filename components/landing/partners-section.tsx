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

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 sm:p-8 md:p-12 bg-slate-50/80 dark:bg-white/[0.02]">
            {/* Left: Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="group relative">
                <Image
                  src="/NTZ STABLE 2.png"
                  alt="NTZ Stable — Tanzania's Local Stablecoin"
                  width={380}
                  height={210}
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-4 text-slate-900 dark:text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase border border-blue-500/20 dark:border-blue-400/20 px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10">
                  STABLECOIN
                </span>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold leading-tight">
                Why{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                  nTZS Stablecoin
                </span>
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-light">
                nTZS stands apart as the{' '}
                <span className="text-blue-600 dark:text-blue-400 font-medium">first regulated stablecoin in Tanzania</span>.
                As a fully compliant digital asset, nTZS offers unparalleled trust and
                transparency, ensuring security for all users, institutions, and businesses.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400 tracking-wider">
                  TANZANIA&apos;S LOCAL STABLECOIN
                </span>
              </div>
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

'use client';

import { Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const features = [
  {
    tag: '01',
    title: 'Farcaster Mini App',
    description: 'Seamless social payments directly within Farcaster. Send nTZS and USDC to friends without leaving your feed.',
    highlight: 'SOCIAL.PAYMENTS',
    image: '/farcaster.jpeg',
  },
  {
    tag: '02',
    title: 'Built on Base',
    description: 'Leveraging Base L2 for near-zero gas fees and instant confirmation. The perfect infrastructure for micro-payments.',
    highlight: 'L2.INFRA',
    image: '/chains/base.svg',
  },
  {
    tag: '03',
    title: 'Regulated nTZS',
    description: 'The first fully compliant stablecoin for Tanzania. 1:1 backed and audited, ensuring trust and stability.',
    highlight: 'STABLECOIN',
    image: '/ntzs-logo.webp',
  },
  {
    tag: '04',
    title: 'NEDApay+ APIs',
    description: 'Developer-first payment APIs for building the next generation of African fintech. Connect your app to the network.',
    highlight: 'DEV.TOOLS',
    image: '/nedapayplus_docs.png',
  },
];

const countries = ['Tanzania', 'Kenya', 'Uganda', 'Malawi', 'DR Congo', 'Nigeria', 'Ghana'];

export default function FeaturesSection() {
  const [showCountries, setShowCountries] = useState(false);

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
              Product Suite
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-blue-500/40 to-transparent" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
                One Protocol,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                  Infinite Connections
                </span>
              </h2>
              <p className="text-slate-500 dark:text-slate-500 text-base max-w-xl font-light">
                Whether you&apos;re a developer, a global business, or a social user — we built the right interface for you.
              </p>
            </div>
            {/* Countries badge */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowCountries(!showCountries)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/30 text-slate-700 dark:text-slate-400 text-sm font-mono tracking-wider transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span>7 AFRICAN COUNTRIES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCountries ? 'rotate-180' : ''}`} />
              </button>
              {showCountries && (
                <div className="absolute top-full mt-1 left-0 bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 p-4 shadow-xl z-20 min-w-[180px]">
                  <div className="space-y-2">
                    {countries.map((country, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-mono text-slate-600 dark:text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400" />
                        {country}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature cards — horizontal scroll */}
        <div className="relative w-full">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-r from-slate-50 to-transparent dark:from-[#0a0a0a] dark:to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-32 bg-gradient-to-l from-slate-50 to-transparent dark:from-[#0a0a0a] dark:to-transparent z-10 pointer-events-none" />

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex animate-features-scroll">
              {[...features, ...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="group flex-shrink-0 mx-3 relative border border-slate-200 dark:border-white/8 hover:border-blue-500/40 dark:hover:border-blue-400/30 bg-white dark:bg-white/[0.02] hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.04] transition-all duration-300"
                  style={{ width: '300px', maxWidth: '85vw' }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/0 group-hover:border-blue-500/60 dark:group-hover:border-blue-400/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/0 group-hover:border-blue-500/60 dark:group-hover:border-blue-400/60 transition-colors duration-300" />

                  <div className="p-6 md:p-8">
                    {/* Tag number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono text-slate-300 dark:text-slate-700 tracking-widest">
                        {feature.tag}
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.15em] text-blue-600 dark:text-blue-400 px-2 py-0.5 border border-blue-500/20 dark:border-blue-400/20 bg-blue-50 dark:bg-blue-500/10">
                        {feature.highlight}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="flex items-center justify-center h-14 mb-6">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={56}
                        height={56}
                        className="object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                      />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>

                    {/* Bottom decorative line */}
                    <div className="mt-6 h-px bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes features-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-312px * 4)); }
        }
        .animate-features-scroll {
          animation: features-scroll 40s linear infinite;
        }
        .animate-features-scroll:hover {
          animation-play-state: paused;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

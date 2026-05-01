'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ParticleBackground } from './particle-background';
import ChainsWidget from './chains-widget';

const Globe = dynamic(() => import('./globe'), { ssr: false });

const storeButtons = [
  { href: 'https://app.nedapay.xyz',                              icon: '/logo.png',            label: 'Open in',   title: 'Browser',   alt: 'Web App' },
  { href: 'https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay', icon: '/farcaster.jpeg',       label: 'Pay on',    title: 'Farcaster', alt: 'Farcaster MiniApp' },
  { href: 'https://www.ntzs.co.tz/',                              icon: '/ntzs-logo.webp',       label: 'Get',       title: 'nTZS',      alt: 'nTZS' },
  { href: 'https://nedapayplus.xyz/docs',                         icon: '/nedapayplus_docs.png', label: 'Build with', title: 'NEDApay+', alt: 'NEDApay APIs' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-16 bg-white dark:bg-black">
      <video autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.05] dark:opacity-[0.12] pointer-events-none">
        <source src="/BG.mp4" type="video/mp4" />
      </video>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      {/* Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/8 blur-3xl pointer-events-none" />

      <ParticleBackground />

      {/* Corner accents */}
      <div className="absolute top-24 md:top-16 left-0 w-8 h-8 lg:w-14 lg:h-14 border-t-2 border-l-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />
      <div className="absolute top-24 md:top-16 right-0 w-8 h-8 lg:w-14 lg:h-14 border-t-2 border-r-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-14 lg:h-14 border-b-2 border-l-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-14 lg:h-14 border-b-2 border-r-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />

      {/* Desktop technical labels */}
      <div className="absolute top-[4.5rem] left-0 right-0 z-10 pointer-events-none hidden lg:block">
        <div className="w-full px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>SYS.ACTIVE</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>GLOBAL.NETWORK</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-600">
            <span>180+ COUNTRIES</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>V2.0.0</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          LAYOUT
          Mobile:  stacked — headline (full-width, big, glowing)
                           → globe (centered, large)
                           → content (full-width)
          Desktop: 2-col  — [headline / content] | [globe spanning both rows]
      ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 lg:items-start" style={{ minHeight: 'calc(100vh - 9rem)' }}>

          {/* ── BLOCK 1: Label + Headline ── */}
          <div className="flex flex-col justify-center lg:col-start-1 lg:row-start-1 lg:pt-12">

            {/* Section label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                Send Money. Anywhere. Instantly.
              </span>
              <div className="h-px flex-1 sm:w-16 sm:flex-none bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>

            {/* ── Headline — glowing terminal style ── */}
            <h1 className="headline-glow text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] sm:leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                Move Money
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">
                At the Speed
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400">
                of the Internet
              </span>
            </h1>

            {/* Mobile: live status tag below headline */}
            <div className="flex lg:hidden items-center gap-2 mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">Live Transactions</span>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
            </div>

            {/* Desktop dither line */}
            <div className="hidden lg:block h-px w-full mt-8 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-transparent" />
          </div>

          {/* ── BLOCK 2: Globe ── */}
          {/* On mobile: renders between headline and content in normal flow */}
          {/* On desktop: spans right column across both rows */}
          <div className="flex items-center justify-center relative lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:py-10 mt-8 sm:mt-0">

            <div className="hidden sm:block absolute top-0 lg:top-12 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 dark:text-slate-600 tracking-widest uppercase whitespace-nowrap z-10">
              <span className="text-blue-600 dark:text-cyan-400">●</span>
              <span className="ml-1">REAL-TIME</span>
            </div>

            <div className="hidden sm:flex absolute bottom-0 lg:bottom-12 left-1/2 -translate-x-1/2 items-center gap-4 text-[9px] font-mono text-slate-400 dark:text-slate-600 whitespace-nowrap z-10">
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-cyan-400 inline-block" /> OUTBOUND</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-violet-400 inline-block" /> INBOUND</span>
            </div>

            {/* Globe container — big on mobile, fills column on desktop */}
            <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[540px] mx-auto">
              <Globe />
            </div>
          </div>

          {/* ── BLOCK 3: Description + CTAs ── */}
          <div className="flex flex-col lg:col-start-1 lg:row-start-2 lg:pb-12 mt-8 lg:mt-0">

            {/* Separator on mobile */}
            <div className="block lg:hidden h-px w-full mb-6 bg-gradient-to-r from-transparent via-slate-200 dark:via-white/8 to-transparent" />

            {/* Dot row — desktop only */}
            <div className="hidden lg:flex gap-[3px] mb-7 opacity-25 dark:opacity-20">
              {Array.from({ length: 52 }).map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-blue-500 dark:bg-blue-400" />
              ))}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-7 sm:mb-8 font-light">
              Send money anywhere in seconds. Pay in any currency, settle instantly,
              with fees so small you&apos;ll barely notice them.
            </p>

            {/* CTAs */}
            <div className="flex flex-row gap-3 mb-7 sm:mb-10">
              <Link href="https://app.nedapay.xyz"
                className="group relative inline-flex items-center justify-center flex-1 sm:flex-none px-5 sm:px-7 py-3 font-mono text-xs sm:text-sm tracking-widest border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-all duration-200">
                <span className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                LAUNCH APP
              </Link>
              <Link href="https://nedapayplus.xyz/docs"
                className="inline-flex items-center justify-center flex-1 sm:flex-none px-5 sm:px-7 py-3 font-mono text-xs sm:text-sm tracking-widest border border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:border-blue-500/50 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                FOR BUILDERS
              </Link>
            </div>

            {/* Chains */}
            <ChainsWidget />

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-6 sm:mt-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-slate-300 dark:bg-slate-700" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.15em] text-slate-400 dark:text-slate-600 uppercase">Community</span>
                <div className="w-4 h-px bg-slate-300 dark:bg-slate-700" />
              </div>
              <Link href="https://discord.gg/Ubd889wjSM" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                </svg>
                <span className="font-mono text-[11px]">Discord</span>
              </Link>
              <Link href="https://x.com/NedaPay_xyz" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="font-mono text-[11px]">X (Twitter)</span>
              </Link>
            </div>

            {/* Access points — 2×2 on mobile, 1×4 on lg */}
            <div className="mt-8 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-px bg-slate-200 dark:bg-slate-800" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">Start Here</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {storeButtons.map((button, index) => (
                  <Link key={index} href={button.href} className="group">
                    {/* Same panel treatment as feature cards — no full border, corner brackets + top accent */}
                    <div className="relative flex h-full items-center gap-2.5 bg-slate-50 dark:bg-white/[0.025] hover:bg-blue-50/50 dark:hover:bg-blue-500/[0.06] p-3 sm:p-3.5 transition-all duration-200 overflow-hidden">
                      {/* Top gradient accent */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-400/15 to-transparent group-hover:via-blue-500/55 dark:group-hover:via-cyan-400/50 transition-all duration-300" />
                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/15 dark:border-blue-400/12 group-hover:border-blue-500/60 dark:group-hover:border-cyan-400/55 transition-colors duration-300" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/15 dark:border-blue-400/12 group-hover:border-blue-500/60 dark:group-hover:border-cyan-400/55 transition-colors duration-300" />

                      <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white dark:bg-white/8 rounded-full p-1 overflow-hidden">
                        <Image src={button.icon} alt={button.alt} width={40} height={40} className="w-full h-full object-contain rounded-full" />
                      </div>
                      <div className="flex flex-col items-start text-left leading-tight min-w-0">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-mono text-slate-400 dark:text-slate-600 mb-0.5 whitespace-nowrap">{button.label}</span>
                        <span className="text-[11px] sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">{button.title}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-slate-100 dark:border-white/5 bg-white/90 dark:bg-black/80 backdrop-blur-sm pointer-events-none">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-1.5 sm:py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-700">
            <span>NEDAPAY.SYS</span>
            <div className="hidden sm:flex items-end gap-[2px]">
              {[6, 10, 8, 14, 7, 11, 9].map((h, i) => (
                <div key={i} className="w-[2px] bg-blue-500/40 dark:bg-blue-400/30" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>ONLINE</span>
          </div>
          <div className="flex items-center gap-3 text-[8px] sm:text-[9px] font-mono text-slate-400 dark:text-slate-700">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-blue-500/70 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-sky-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-1 h-1 bg-cyan-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <span className="hidden sm:inline">180+ COUNTRIES</span>
            <span>EST.2024</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Terminal glow on headline ── */
        @keyframes headline-glow {
          0%, 100% {
            filter:
              drop-shadow(0 0 6px rgba(34, 211, 238, 0.45))
              drop-shadow(0 0 18px rgba(59, 130, 246, 0.25))
              drop-shadow(0 0 40px rgba(34, 211, 238, 0.10));
          }
          50% {
            filter:
              drop-shadow(0 0 10px rgba(34, 211, 238, 0.75))
              drop-shadow(0 0 28px rgba(59, 130, 246, 0.45))
              drop-shadow(0 0 55px rgba(34, 211, 238, 0.20));
          }
        }
        .headline-glow {
          animation: headline-glow 3.5s ease-in-out infinite;
        }

        /* ── Dither stripe for desktop divider ── */
        .hero-dither {
          background-image: repeating-linear-gradient(
            0deg, transparent 0px, transparent 2px,
            rgb(59 130 246) 2px, rgb(59 130 246) 3px
          );
        }
      `}</style>
    </section>
  );
}

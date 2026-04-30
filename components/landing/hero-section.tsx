'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ParticleBackground } from './particle-background';
import ChainsWidget from './chains-widget';

const storeButtons = [
  {
    href: 'https://app.nedapay.xyz',
    icon: '/logo.png',
    label: 'Access via',
    title: 'Web App',
    alt: 'Web App',
  },
  {
    href: 'https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay',
    icon: '/farcaster.jpeg',
    label: 'Mini-app on',
    title: 'Farcaster',
    alt: 'Farcaster MiniApp',
  },
  {
    href: 'https://www.ntzs.co.tz/',
    icon: '/ntzs-logo.webp',
    label: 'Mint & Burn',
    title: 'nTZS',
    alt: 'nTZS Stablecoin',
  },
  {
    href: 'https://nedapayplus.xyz/docs',
    icon: '/nedapayplus_docs.png',
    label: 'Connect via',
    title: 'NEDApay+',
    alt: 'NEDApay APIs',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-white dark:bg-black">
      {/* Background video — very subtle texture */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] dark:opacity-[0.15] pointer-events-none"
      >
        <source src="/BG.mp4" type="video/mp4" />
      </video>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial glow — center-left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl pointer-events-none" />

      <ParticleBackground />

      {/* Corner frame accents */}
      <div className="absolute top-16 left-0 w-10 h-10 lg:w-14 lg:h-14 border-t-2 border-l-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />
      <div className="absolute top-16 right-0 w-10 h-10 lg:w-14 lg:h-14 border-t-2 border-r-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-10 h-10 lg:w-14 lg:h-14 border-b-2 border-l-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-10 h-10 lg:w-14 lg:h-14 border-b-2 border-r-2 border-blue-500/20 dark:border-blue-400/20 z-20 pointer-events-none" />

      {/* Technical header labels */}
      <div className="absolute top-[4.5rem] left-0 right-0 z-10 pointer-events-none hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-600">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>SYS.ACTIVE</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>BLOCKCHAIN.READY</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-600">
            <span>NETWORK: BASE_L2</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>V2.0.0</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12">
        <div className="max-w-3xl">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
              Payment Infrastructure · Africa
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-blue-500/50 to-transparent" />
          </div>

          {/* Main headline */}
          <div className="relative mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                Seamless
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">
                Payments Across
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400">
                Africa
              </span>
            </h1>
            {/* Dither side accent */}
            <div className="hidden lg:block absolute -right-6 top-4 bottom-4 w-px hero-dither opacity-20 dark:opacity-30" />
          </div>

          {/* Decorative dot row */}
          <div className="hidden lg:flex gap-[3px] mb-7 opacity-25 dark:opacity-20">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-blue-500 dark:bg-blue-400" />
            ))}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8 font-light">
            Send and accept stablecoins, swap instantly, cash out easily.
            The infrastructure for the next generation of African finance.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="https://app.nedapay.xyz"
              className="group relative inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-widest border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-all duration-200"
            >
              <span className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              LAUNCH APP
            </Link>
            <Link
              href="https://nedapayplus.xyz/docs"
              className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-widest border border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:border-blue-500/50 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              EXPLORE APIs
            </Link>
          </div>

          {/* Chains */}
          <ChainsWidget />

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-5 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-slate-300 dark:bg-slate-700" />
              <span className="text-[10px] font-mono tracking-[0.15em] text-slate-400 dark:text-slate-600 uppercase">Community</span>
              <div className="w-4 h-px bg-slate-300 dark:bg-slate-700" />
            </div>
            <Link
              href="https://discord.gg/Ubd889wjSM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189z" />
              </svg>
              <span className="font-mono text-[11px]">Discord</span>
            </Link>
            <Link
              href="https://x.com/NedaPay_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-mono text-[11px]">X (Twitter)</span>
            </Link>
          </div>

          {/* Access point buttons */}
          <div className="mt-10 w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">Access Points</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {storeButtons.map((button, index) => (
                <Link key={index} href={button.href} className="group">
                  <div className="flex h-full items-center gap-2 border border-slate-200 dark:border-white/8 hover:border-blue-500/40 dark:hover:border-blue-400/30 p-3 transition-all duration-200 hover:bg-blue-50/40 dark:hover:bg-blue-500/5">
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 p-1 overflow-hidden">
                      <Image
                        src={button.icon}
                        alt={button.alt}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div className="flex flex-col items-start text-left leading-tight min-w-0">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-slate-400 dark:text-slate-600 mb-0.5">
                        {button.label}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {button.title}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-slate-100 dark:border-white/5 bg-white/90 dark:bg-black/80 backdrop-blur-sm pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[9px] font-mono text-slate-400 dark:text-slate-700">
            <span>NEDAPAY.SYS</span>
            <div className="hidden sm:flex items-end gap-[2px]">
              {[6, 10, 8, 14, 7, 11, 9].map((h, i) => (
                <div key={i} className="w-[2px] bg-blue-500/40 dark:bg-blue-400/30" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>ONLINE</span>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 dark:text-slate-700">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-blue-500/70 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-sky-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-1 h-1 bg-cyan-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <span className="hidden sm:inline">CHAIN: BASE_L2</span>
            <span>EST.2024</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-dither {
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 2px,
              rgb(59 130 246) 2px,
              rgb(59 130 246) 3px
            );
        }
      `}</style>
    </section>
  );
}

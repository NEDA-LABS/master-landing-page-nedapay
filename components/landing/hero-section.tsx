'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Shield } from 'lucide-react';
import { ParticleBackground } from './particle-background';
import { FloatingInfographics } from './floating-infographics';
import ChainsWidget from './chains-widget';

const storeButtons = [
  {
    href: 'https://app.nedapay.xyz',
    icon: '/logo.png',
    label: 'Access via',
    title: 'Web App',
    alt: 'Web App'
  },
  {
    href: 'https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay',
    icon: '/farcaster.jpeg',
    label: 'Mini-app on',
    title: 'Farcaster',
    alt: 'Farcaster MiniApp'
  },
  {
    href: 'https://www.ntzs.co.tz/',
    icon: '/ntzs-logo.webp',
    label: 'Mint & Burn',
    title: 'nTZS',
    alt: 'nTZS Stablecoin'
  },
  {
    href: "https://nedapayplus.xyz/docs",
    icon: '/nedapayplus_docs.png',
    label: 'Connect',
    title: 'NEDApay+',
    alt: 'NEDApay APIs'
  }
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/BG.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/30 via-white/80 to-cyan-200/30 dark:bg-gradient-to-b dark:from-black/80 dark:via-black/50 dark:to-black/80" />

      {/* Particles and Infographics */}
      <ParticleBackground />
      <FloatingInfographics />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content - Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="max-w-3xl">
          {/* Logo */}
          {/* <div className="mb-4 md:mb-12 mt-4">
            <div className="inline-flex items-center backdrop-blur-xl bg-slate-900/10 dark:bg-white/10 rounded-xl gap-2 px-4 py-2 border border-slate-300 dark:border-white/20 shadow-lg">
              <h1 className="text-xl md:text-2xl font-bold text-slate-100 dark:text-white">
                NEDApay
              </h1>
            </div>
          </div> */}

          {/* Main Content with Glassmorphism Background */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-black/20 rounded-3xl p-8 md:p-10 border border-white/50 dark:border-white/10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)] dark:shadow-2xl mb-8 relative z-20">
            {/* Main Tagline */}
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                Unlock Seamless
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">
                Payments Globally
              </span>
            </h2>

            {/* Description */}
            <p className="text-base md:text-xl text-slate-800 dark:text-slate-100 max-w-2xl leading-relaxed drop-shadow-md font-medium">
              Send and Accept Stablecoins, Swap instantly, Cash Out Easily.
            </p>
            {/* Supported Chains Widget */}
            <div className="mt-12">
              <ChainsWidget />
            </div>
            {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 mt-8 opacity-90 transition-opacity">
            <span className="text-sm font-bold tracking-widest text-black dark:text-white uppercase drop-shadow-sm">
              Join Community
            </span>
            <div className="h-4 w-px bg-black dark:bg-white opacity-40"></div>
            <Link
              href="https://discord.gg/Ubd889wjSM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black dark:text-white hover:opacity-75 transition-opacity"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189z" />
              </svg>
              <span className="font-bold text-base">Discord</span>
            </Link>

            <Link
              href="https://x.com/NedaPay_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black dark:text-white hover:opacity-75 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="font-bold text-base">(Twitter)</span>
            </Link>
          </div>
          </div>

          {/* Store-style Buttons */}
          <div className="w-full max-w-4xl mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {storeButtons.map((button, index) => (
                <Link key={index} href={button.href} className="group w-full">
                  <button className="flex h-full w-full items-center gap-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:bg-black/20 dark:hover:bg-white/10 border border-white/10 hover:border-blue-500/50 dark:hover:border-blue-400/50 text-slate-800 dark:text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
                    <div className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-slate-200/50 rounded-full p-1 border border-slate-800/60">
                      {button.icon === 'globe' ? (
                        <Globe className="w-full h-full text-blue-500" />
                      ) : (
                        <Image src={button.icon} alt={button.alt} width={40} height={40} className="w-full h-full object-contain rounded-full" />
                      )}
                    </div>
                    <div className="flex flex-col items-start text-left leading-tight min-w-0">
                      <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-0.5">{button.label}</span>
                      <span className="text-sm sm:text-base font-bold truncate w-full">{button.title}</span>
                    </div>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

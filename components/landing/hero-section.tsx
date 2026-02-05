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

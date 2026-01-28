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
    label: 'Mint',
    title: 'nTZS',
    alt: 'nTZS Stablecoin'
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
          <div className="flex flex-col items-start gap-4 mb-12">
            <div className="flex flex-row flex-wrap gap-2 sm:gap-4">
              {storeButtons.map((button, index) => (
                <Link key={index} href={button.href} className="flex">
                  <button className="flex h-full w-full items-center gap-1 md:gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500/80 dark:hover:bg-white/10 text-white px-2 md:px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 md:min-w-[180px] border border-transparent hover:border-blue-400 dark:hover:border-white/40">
                    {button.icon === 'globe' ? (
                      <Globe className="w-6 h-6 md:w-8 md:h-8" />
                    ) : (
                      <Image src={button.icon} alt={button.alt} width={30} height={30} className="rounded-full" />
                    )}
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[8px] md:text-[10px] uppercase font-medium opacity-90 mb-1">{button.label}</span>
                      <span className="text-xs md:text-lg font-bold">{button.title}</span>
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

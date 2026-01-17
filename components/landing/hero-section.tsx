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
    href: 'https://app.ntzs.co.tz/',
    icon: '/ntzs-logo.webp',
    label: 'Mint & Burn',
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      
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
          <div className="mb-4 md:mb-12 mt-4">
            <div className="inline-flex items-center backdrop-blur-xl bg-white/10 rounded-xl gap-2 px-2 py-2 border border-white/20 shadow-lg">
              <Image 
                src="/logo.png" 
                alt="NEDAplus Logo" 
                width={22} 
                height={22}
                // className="w-2 h-2"
              />
              <h1 className="text-xl md:text-2xl font-bold text-white">
                NEDApay
              </h1>
            </div>
          </div>

          {/* Main Content with Glassmorphism Background */}
          <div className="backdrop-blur-xl bg-black/20 rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl mb-8">
            {/* Main Tagline */}
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400">
                Unlock Seamless
              </span>
              <br />
              <span className="text-white">
                Payments Globally
              </span>
            </h2>

            {/* Description */}
            <p className="text-base md:text-xl text-slate-100 max-w-2xl leading-relaxed drop-shadow-md font-medium">
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
                <Link key={index} href={button.href}>
                  <button className="flex items-center gap-3 bg-blue-500/80 hover:bg-white/10 text-white px-2 md:px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 md:min-w-[180px] hover:border-white/40">
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

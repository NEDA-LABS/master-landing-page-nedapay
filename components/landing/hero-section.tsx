'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Shield } from 'lucide-react';
import { ParticleBackground } from './particle-background';
import { FloatingInfographics } from './floating-infographics';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
          <div className="mb-12">
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
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400">
                Unlock Seamless
              </span>
              <br />
              <span className="text-white">
                Payments Globally
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed drop-shadow-md font-medium">
              Send and Accept Stablecoins, Swap instantly, Cash Out Easily.
            </p>
          </div>

          {/* Store-style Buttons */}
          <div className="flex flex-col items-start gap-4 mb-12">
            {/* <h3 className="text-xl font-semibold text-white tracking-wide">
              Explore NEDAPay!
            </h3> */}
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {/* Web App */}
              <Link href="https://nedapayplus.xyz/auth/login">
                <button className="flex items-center gap-3 bg-transparent hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 min-w-[180px] hover:border-white/40">
                  <Globe className="w-8 h-8" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-medium opacity-90 mb-1">Access via</span>
                    <span className="text-lg font-bold">Web App</span>
                  </div>
                </button>
              </Link>

              {/* Farcaster MiniApp */}
              <Link href="https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay">
                <button className="flex items-center gap-3 bg-transparent hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 min-w-[180px] hover:border-white/40">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg">
                    <span className="font-bold text-lg">F</span>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-medium opacity-90 mb-1">Launch on</span>
                    <span className="text-lg font-bold">Farcaster</span>
                  </div>
                </button>
              </Link>

              {/* nTZS Stablecoin */}
              <Link href="https://app.ntzs.co.tz/">
                <button className="flex items-center gap-3 bg-transparent hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 min-w-[180px] hover:border-white/40">
                  <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 rounded-full text-black font-bold border-2 border-white/20">
                    n
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-medium opacity-90 mb-1">Mint & Burn</span>
                    <span className="text-lg font-bold">nTZS Coin</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          {/* <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bank of Tanzania Regulated</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <span>Audited & Secure</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}

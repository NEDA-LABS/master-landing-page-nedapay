'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Shield } from 'lucide-react';

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* Primary CTA */}
            <Link href="https://nedapayplus.xyz/auth/login">
              <button className="group relative backdrop-blur-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-0.5">
                <span className="flex items-center gap-2 text-lg">
                  Start with Email or Wallet
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            {/* Secondary CTA - Mini App */}
            <Link href="https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay">
              <button className="group relative backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl border border-white/20 shadow-lg transition-all duration-300">
                <span className="flex items-center gap-2 text-lg">
                  <span>Launch Mini App</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                  FARCASTER
                </div>
              </button>
            </Link>
          </div>

          {/* Mini App Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 backdrop-blur-md bg-white/5 rounded-2xl p-4 border border-white/10 max-w-2xl">
             <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-400/20 border border-green-400/30 text-green-400">
                  <ArrowRight className="-rotate-45 w-5 h-5" />
                </div>
                <div className="text-sm text-gray-200">
                  <span className="block font-semibold text-white">All Business Tools you Need for Digital Payments in one Place</span>
                  Digital payments infrastructure for the future
                </div>
             </div>
             <div className="hidden sm:block w-px h-8 bg-white/10" />
             <div className="text-sm text-gray-300">
                Also available as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 font-bold">Mini App</span> in Farcaster
             </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

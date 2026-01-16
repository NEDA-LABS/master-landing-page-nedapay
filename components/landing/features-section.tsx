'use client';

import { Shield, Zap, Globe, LayoutDashboard, Smartphone, Coins, ArrowUpRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const features = [
  // {
  //   title: 'NedaPlus Web App',
  //   description: 'Comprehensive dashboard for cross-border settlements. Manage liquidity, track transactions, and handle payouts to 130+ countries.',
  //   highlight: 'CORE PLATFORM',
  //   image: '/partner logos/NEDApay lOGO.jpg',
  // },
  {
    title: 'Farcaster Mini App',
    description: 'Seamless social payments directly within Farcaster. Send nTZS and USDC to friends without leaving your feed.',
    highlight: 'SOCIAL PAYMENTS',
    image: '/farcaster.jpeg',
  },
  {
    title: 'Built on Base',
    description: 'Leveraging Base L2 for near-zero gas fees and instant confirmation. The perfect infrastructure for micro-payments.',
    highlight: 'L2 INFRASTRUCTURE',
    image: '/chains/base.svg',
  },
  {
    title: 'Regulated nTZS',
    description: 'The first fully compliant stablecoin for Tanzania. 1:1 backed and audited, ensuring trust and stability for digital finance.',
    highlight: 'STABLECOIN',
    image: '/ntzs-logo.webp',
  },
];

export default function FeaturesSection() {
  const [showCountries, setShowCountries] = useState(false);
  const countries = ['Tanzania', 'Kenya', 'Uganda', 'Malawi', 'DR Congo', 'Nigeria', 'Ghana'];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(96, 165, 250) 2px, transparent 0)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-white">
          <h2 className="text-4xl md:text-5xl font-medium mb-3">
            One Ecosystem,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400"> Multiple Gateways</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Whether you're a developer, a business, or a social user, we have an interface for you.
          </p>
        </div>

        {/* Animated Features - Horizontal Scroll */}
        <div className="relative w-full">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-slate-50 via-slate-100/95 via-slate-100/60 to-transparent dark:from-black dark:via-gray-900/95 dark:via-gray-900/60 z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-slate-50 via-slate-100/95 via-slate-100/60 to-transparent dark:from-black dark:via-gray-900/95 dark:via-gray-900/60 z-10 pointer-events-none" />
          
          <div className="overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex animate-scroll-loop">
            {[...features, ...features, ...features].map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 group relative backdrop-blur-2xl bg-gradient-to-br from-white to-slate-100 hover:from-white hover:to-slate-50 dark:from-white/10 dark:to-white/5 dark:hover:from-white/15 dark:hover:to-white/10 rounded-3xl p-8 border border-slate-200 dark:border-white/20 hover:border-blue-400/40 transition-all duration-300 shadow-2xl"
                style={{ width: '420px' }}
              >
                {/* Image or Icon at top */}
                <div className="mb-6 flex items-center justify-center h-24">
                  <div className="relative w-full h-full flex items-center justify-center gap-4">
                    {/* @ts-ignore */}
                    {feature.images ? (
                      // Multiple images
                       /* @ts-ignore */
                      feature.images.map((img, imgIndex) => (
                        <Image
                          key={imgIndex}
                          src={img}
                          alt={`${feature.title} ${imgIndex + 1}`}
                          width={80}
                          height={50}
                          className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                        />
                      ))
                    ) : feature.image ? (
                      // Single image
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={120}
                        height={60}
                        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                      />
                    ) : null}
                  </div>
                </div>

                {/* Content with lighter typography */}
                <div className="space-y-3">
                  {/* Small highlight badge */}
                  <div className="inline-block">
                    <span className="text-blue-400 text-xs font-medium tracking-wider uppercase px-3 py-1 bg-blue-500/10 rounded-full border border-blue-400/20">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  {/* Title - Medium weight, not bold */}
                  <h3 className="text-2xl font-medium text-slate-900 dark:text-white leading-snug">
                    {feature.title}
                  </h3>
                  
                  {/* Description - Smaller and lighter */}
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Glossy overlay effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
          {/* Regulation Badge */}
          {/* <div className="backdrop-blur-xl bg-black/5 dark:bg-white/10 rounded-xl px-6 py-3 border border-slate-200 dark:border-white/20">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm text-slate-800 dark:text-gray-200">BoT Regulated</span>
            </div>
          </div> */}

          {/* API Badge */}
          {/* <div className="backdrop-blur-xl bg-black/5 dark:bg-white/10 rounded-xl px-6 py-3 border border-slate-200 dark:border-white/20">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="text-sm text-slate-800 dark:text-gray-200">BaaS API Platform</span>
            </div>
          </div> */}

          {/* Coverage Badge */}
          <div className="relative">
            <button
              onClick={() => setShowCountries(!showCountries)}
              className="backdrop-blur-xl bg-black/5 dark:bg-white/10 rounded-xl px-6 py-3 border border-slate-200 dark:border-white/20 hover:border-blue-400/40 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="text-sm text-slate-800 dark:text-gray-200">7 African countries</span>
                <ChevronDown className={`w-4 h-4 text-slate-600 dark:text-gray-400 transition-transform duration-200 ${showCountries ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {showCountries && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-xl p-4 border border-slate-200 dark:border-white/20 shadow-xl z-20 min-w-[200px]">
                <div className="space-y-2">
                  {countries.map((country, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* CSS Animations for scrolling */}
      <style jsx>{`
        @keyframes scroll-loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-452px * 4));
          }
        }

        .animate-scroll-loop {
          animation: scroll-loop 20s linear infinite;
        }

        .animate-scroll-loop:hover {
          animation-play-state: paused;
        }

        /* Hide scrollbar but keep functionality */
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

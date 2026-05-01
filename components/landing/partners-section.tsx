'use client';

import Image from 'next/image';
import ChainsWidget from './chains-widget';
import { useState } from 'react';

const stablecoins = [
  { name: 'USDC', logo: '/usdc-logo.svg' },
  { name: 'USDT', logo: '/usdt-coin.svg' },
  { name: 'EURC', logo: '/eurc-coin.png' },
  { name: 'CADC', logo: '/cadc-coin.png' },
  { name: 'BRL', logo: '/brl-coin.png' },
  { name: 'CNGN', logo: '/cngn-icon.jpeg' },
  { name: 'ZARP', logo: '/zarp-coin.png' },
  { name: 'TRYB', logo: '/tryb-icon.png' },
];

const allCoins = [...stablecoins, ...stablecoins, ...stablecoins];

const faqs = [
  {
    q: 'What is NEDApay?',
    a: 'NEDApay is a borderless payments platform built on Base. It lets you send money to anyone in the world in seconds — no bank account required, no wire delays, no inflated exchange rates.',
  },
  {
    q: 'Which countries can use NEDApay?',
    a: 'NEDApay works in 100+ countries across Africa, Asia, Europe, the Americas, and the Middle East. If you have an internet connection, you can send and receive money.',
  },
  {
    q: 'What is nTZS?',
    a: 'nTZS is Tanzania\'s licensed digital currency, pegged 1:1 to the Tanzanian Shilling (TZS). It lets you hold, spend, and send Tanzanian value on-chain — fully regulated and backed.',
  },
  {
    q: 'What are the fees?',
    a: 'NEDApay keeps fees low and straightforward. Because transactions run on Base, you pay a small network fee that is significantly cheaper than a traditional wire or remittance service — no hidden charges, no surprise deductions on arrival.',
  },
  {
    q: 'What is SimpleFX and how do I earn?',
    a: 'SimpleFX is NEDApay\'s liquidity layer. You deposit supported currencies (USDC, nTZS, EURC, and more) into a pool, and automatically earn a spread fee every time someone exchanges through it. No trading skills needed.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
        <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
          FAQ
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
        {/* Left column label */}
        <div className="lg:col-span-2 mb-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
            Common Questions
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">, Answered.</span>
          </h3>
        </div>

        <div className="lg:col-span-2 space-y-0 mt-6">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="group relative">
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-blue-500/60 via-cyan-500/40 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent group-hover:via-blue-500/25 dark:group-hover:via-blue-400/20'}`} />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-4 sm:px-6 py-5 text-left transition-colors duration-200 hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.04]"
                  aria-expanded={isOpen}
                >
                  {/* Index + question */}
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <span className="shrink-0 text-[9px] font-mono text-slate-300 dark:text-slate-700 mt-0.5 tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-sm sm:text-base font-medium leading-snug transition-colors duration-200 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                      {faq.q}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <div className={`shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center transition-all duration-300 ${isOpen ? 'text-blue-500 dark:text-cyan-400 rotate-45' : 'text-slate-400 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`}>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" d="M8 2v12M2 8h12" />
                    </svg>
                  </div>
                </button>

                {/* Answer panel */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 sm:px-6 pb-5 pl-[calc(1rem+1.75rem)] sm:pl-[calc(1.5rem+2rem)]">
                    {/* Left accent bar */}
                    <div className="relative pl-4 border-l border-blue-500/20 dark:border-blue-400/15">
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom divider — always on last item too */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/5 dark:bg-blue-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
            Earn While You Hold
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-blue-500/40 to-transparent" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 leading-tight">
          Your Money,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
            Working Globally.
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-500 text-base max-w-2xl leading-relaxed font-light">
          Send, receive, and grow your funds across borders — no banks, no wires, no waiting.
          Backed by a global network of licensed currencies and regulated partners.
        </p>
      </div>

      {/* nTZS Feature Card */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="relative border border-slate-100 dark:border-white/[0.05] overflow-hidden">
          {/* Perspective grid bg */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: 'perspective(600px) rotateX(55deg)',
              transformOrigin: 'center bottom',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/40 dark:border-blue-400/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/40 dark:border-blue-400/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/40 dark:border-blue-400/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/40 dark:border-blue-400/40" />

          <div className="relative z-10 p-5 sm:p-8 md:p-12 bg-slate-50/80 dark:bg-white/[0.02]">

            {/* Top intro: on mobile, text-only (image hidden); on lg, side-by-side with image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-8 sm:mb-10">
              {/* Image — hidden on mobile, shown on lg */}
              <div className="hidden lg:flex justify-center lg:justify-end order-last lg:order-first">
                <div className="group relative">
                  <Image
                    src="/NTZ STABLE 2.png"
                    alt="nTZS Stablecoin"
                    width={380}
                    height={210}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-slate-900 dark:text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10">
                    YOUR MONEY · WORKS FOR YOU
                  </span>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold leading-tight">
                  Put Your Money to Work with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                    SimpleFX
                  </span>
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-light">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">SimpleFX</span> lets you earn on the money you already hold.
                  Deposit USDC, nTZS, or any supported currency — and automatically collect a fee every time someone exchanges through your pool.
                  No trading skills needed.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                  <span className="text-sm font-mono text-blue-600 dark:text-blue-400 tracking-wider">
                    EARN AUTOMATICALLY · 24/7
                  </span>
                </div>

                {/* Mobile: compact image strip (hidden on lg where the full image shows) */}
                <div className="lg:hidden pt-4">
                  <Image
                    src="/NTZ STABLE 2.png"
                    alt="nTZS Stablecoin"
                    width={380}
                    height={210}
                    className="w-full max-w-xs mx-auto object-contain opacity-90"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* SimpleFX divider */}
            <div className="flex items-center gap-3 mb-8 mt-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase whitespace-nowrap">
                ⚡ SimpleFX · How It Works
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7 sm:mb-10">
              {[
                { value: '1.5%', label: 'ASK SPREAD',  hue: 'cyan' },
                { value: '94%',  label: 'FILL RATE',   hue: 'blue' },
                { value: '1.2%', label: 'BID SPREAD',  hue: 'cyan' },
                { value: '87%',  label: 'POOL DEPTH',  hue: 'blue' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden bg-white/50 dark:bg-white/[0.025] hover:bg-blue-50/40 dark:hover:bg-blue-500/[0.06] p-4 transition-all duration-300"
                >
                  {/* Top accent line — colored per hue, brightens on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-300 ${
                    stat.hue === 'cyan'
                      ? 'bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent group-hover:via-cyan-400/80'
                      : 'bg-gradient-to-r from-transparent via-blue-500/35 to-transparent group-hover:via-blue-400/80'
                  }`} />
                  {/* Subtle bottom fade */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-slate-100/60 dark:bg-white/4" />

                  <div className={`text-2xl md:text-3xl font-bold mb-1 ${stat.hue === 'cyan' ? 'text-cyan-500 dark:text-cyan-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-slate-500 dark:text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Ask side / Bid side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-7 sm:mb-8">
              {/* ASK SIDE */}
              <div className="relative overflow-hidden bg-white/30 dark:bg-white/[0.02] hover:bg-cyan-50/30 dark:hover:bg-cyan-500/[0.04] p-5 sm:p-6 group transition-all duration-300">
                {/* Left accent stripe — cyan */}
                <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent group-hover:via-cyan-400/90 transition-all duration-300" />
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent group-hover:from-cyan-400/70 transition-all duration-300" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-500 dark:text-cyan-400 uppercase">
                    ASK SIDE · 1.5% Spread
                  </span>
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Earn every time someone buys
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Deposit your digital dollars into the pool. Each time someone buys through your listing, you automatically pocket a fee. No effort, no screen-watching.
                </p>
              </div>

              {/* BID SIDE */}
              <div className="relative overflow-hidden bg-white/30 dark:bg-white/[0.02] hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.04] p-5 sm:p-6 group transition-all duration-300">
                {/* Left accent stripe — blue/violet */}
                <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent group-hover:via-blue-400/90 transition-all duration-300" />
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-blue-500/10 to-transparent group-hover:from-blue-400/70 transition-all duration-300" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                    BID SIDE · 1.2% Spread
                  </span>
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Earn every time someone sells
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Keep a reserve of USDC, EURC, or cNGN ready. When people cash out, your reserve fills the order and you collect the fee. Around the clock, automatically.
                </p>
              </div>
            </div>

            {/* Supported coins/networks */}
            <div className="pt-6 border-t border-slate-100 dark:border-white/[0.05] mb-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase w-16 shrink-0">
                  ASSETS
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { src: '/ntzs-logo.webp',   label: 'nTZS' },
                    { src: '/usdc-logo.svg',     label: 'USDC' },
                    { src: '/usdt-coin.svg',     label: 'USDT' },
                    { src: '/eurc-coin.png',     label: 'EURC' },
                    { src: '/cngn-icon.jpeg',    label: 'cNGN' },
                  ].map(({ src, label }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-slate-100/70 dark:bg-white/[0.04] px-2 py-1">
                      <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/8 flex items-center justify-center overflow-hidden shrink-0">
                        <Image src={src} alt={label} width={14} height={14} className="object-contain rounded-full" />
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
                    </div>
                  ))}
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600">+ more</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase w-16 shrink-0">
                  CHAINS
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { src: '/chains/base.svg',     label: 'Base' },
                    { src: '/chains/polygon.svg',  label: 'Polygon' },
                    { src: '/chains/arbitrum.svg', label: 'Arbitrum' },
                  ].map(({ src, label }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-slate-100/70 dark:bg-white/[0.04] px-2 py-1">
                      <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/8 flex items-center justify-center overflow-hidden shrink-0">
                        <Image src={src} alt={label} width={14} height={14} className="object-contain" />
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-row flex-wrap gap-3">
              <a
                href="https://www.ntzs.co.tz/simplefx"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 font-mono text-xs sm:text-sm tracking-widest border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-all duration-200"
              >
                <span className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-blue-600 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                BECOME A MARKET MAKER
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://www.ntzs.co.tz/simplefx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 font-mono text-xs sm:text-sm tracking-widest border border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:border-blue-500/50 dark:hover:border-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                READ THE DOCS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stablecoin infinite scroll */}
      <div className="relative z-10">
        {/* Section sub-label */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase px-3">
              Supported Stablecoins
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-r from-white to-transparent dark:from-black dark:to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-l from-white to-transparent dark:from-black dark:to-transparent z-10" />

          <div className="flex animate-coins-scroll">
            {allCoins.map((coin, index) => (
              <div
                key={`${coin.name}-${index}`}
                className="flex-shrink-0 mx-2 sm:mx-4 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-white/60 dark:bg-white/[0.025] hover:bg-blue-50/60 dark:hover:bg-blue-500/[0.07] flex items-center justify-center transition-all duration-200 hover:scale-105 group relative overflow-hidden"
              >
                <Image
                  src={coin.logo}
                  alt={coin.name}
                  width={64}
                  height={64}
                  className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chains widget — below stablecoins */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase px-3">
            Supported Networks
          </span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
        </div>
        <ChainsWidget />
      </div>

      {/* FAQ */}
      <FAQ />

      <style jsx>{`
        @keyframes coins-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-108px * ${stablecoins.length})); }
        }
        .animate-coins-scroll {
          animation: coins-scroll 28s linear infinite;
        }
        .animate-coins-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

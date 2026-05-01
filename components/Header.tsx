'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './theme-switcher';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/[0.05]">
      {/* Technical top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-500 dark:via-sky-500 dark:to-cyan-500" />

      {/* ── Main bar ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-13 sm:h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="relative w-6 h-6 md:w-7 md:h-7">
              <Image
                src="/logo-black.png"
                alt="NEDApay Logo"
                fill
                className="object-contain dark:hidden"
              />
              <Image
                src="/logo.png"
                alt="NEDApay Logo"
                fill
                className="object-contain hidden dark:block"
              />
            </div>
            <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              NEDApay
            </span>
            {/* Version badge — desktop only */}
            <span className="hidden lg:inline text-[9px] font-mono text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-white/10 px-1.5 py-0.5 tracking-wider">
              V2.0
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-5">
              <Link
                href="/privacy-policy"
                className="text-xs font-mono tracking-wider text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs font-mono tracking-wider text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase"
              >
                Terms
              </Link>
              <Link
                href="https://app.nedapay.xyz"
                className="text-xs font-mono tracking-wider px-4 py-1.5 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-all duration-200 uppercase"
              >
                Launch App
              </Link>
            </nav>

            <ThemeSwitcher />

            {/* Mobile: compact launch button */}
            <Link
              href="https://app.nedapay.xyz"
              className="md:hidden text-[10px] font-mono tracking-widest px-3 py-1.5 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-black transition-all duration-200 uppercase"
            >
              App
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile sub-nav strip (replaces hamburger dropdown) ── */}
      <div className="md:hidden border-t border-slate-100 dark:border-white/5">
        <div className="flex items-stretch divide-x divide-slate-100 dark:divide-white/5">
          <Link
            href="/privacy-policy"
            className="flex-1 flex items-center justify-center py-2.5 text-[9px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors uppercase"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="flex-1 flex items-center justify-center py-2.5 text-[9px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors uppercase"
          >
            Terms
          </Link>
          <Link
            href="https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-2.5 text-[9px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors uppercase"
          >
            Farcaster
          </Link>
          <Link
            href="https://www.ntzs.co.tz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-2.5 text-[9px] font-mono tracking-[0.18em] text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-500/5 transition-colors uppercase"
          >
            nTZS
          </Link>
        </div>
      </div>
    </header>
  );
}

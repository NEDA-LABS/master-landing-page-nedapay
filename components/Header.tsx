'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './theme-switcher';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/8">
      {/* Technical top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-500 dark:via-sky-500 dark:to-cyan-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
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
            {/* Version badge */}
            <span className="hidden lg:inline text-[9px] font-mono text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-white/10 px-1.5 py-0.5 tracking-wider">
              V2.0
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 md:gap-5">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-5">
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
            </div>

            <ThemeSwitcher />

            {/* Mobile menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-slate-200 dark:border-white/10"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/privacy-policy" className="w-full cursor-pointer font-mono text-xs text-slate-700 dark:text-slate-300">
                      Privacy Policy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/terms-of-service" className="w-full cursor-pointer font-mono text-xs text-slate-700 dark:text-slate-300">
                      Terms of Service
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="https://app.nedapay.xyz" className="w-full cursor-pointer font-mono text-xs text-blue-600 dark:text-blue-400">
                      Launch App →
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './theme-switcher';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-slate-200 dark:border-white/10">
      <div className="max-w-7xl md:max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="NEDApay Logo" 
              width={24} 
              height={24}
            />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              NEDApay
            </span>
          </Link> */}

          {/* Navigation */}
          <nav className="flex items-center justify-end gap-6">
            <Link 
              href="/privacy-policy" 
              className="text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}

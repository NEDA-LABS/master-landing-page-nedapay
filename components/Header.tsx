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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-50/60 via-white/60 to-cyan-50/60 dark:from-black/80 dark:via-black/80 dark:to-black/80 border-b border-purple-100 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl md:max-w-[100%] mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity pl-4 md:pl-8">
            <div className="relative w-6 h-6 md:w-8 md:h-8">
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
            <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              NEDApay
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center justify-end gap-2 md:gap-6 pr-4 md:pr-8">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/privacy-policy" 
                className="text-sm font-medium text-slate-800 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-sm font-medium text-slate-800 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>

            <ThemeSwitcher />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-5 w-5 text-slate-900 dark:text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-purple-100 dark:border-white/10">
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/privacy-policy" 
                      className="w-full cursor-pointer text-slate-800 dark:text-gray-200"
                    >
                      Privacy Policy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/terms-of-service" 
                      className="w-full cursor-pointer text-slate-800 dark:text-gray-200"
                    >
                      Terms of Service
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

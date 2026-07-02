'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-black text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-white/8">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-blue-500/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">NEDApay</h3>
            <div className="flex flex-col gap-2.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-mono text-xs">Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a
                  href="mailto:support@nedapay.xyz"
                  className="font-mono text-xs hover:text-blue-400 transition-colors"
                >
                  support@nedapay.xyz
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-mono text-xs">+255 744 277 496</span>
              </div>
            </div>
          </div>

          {/* Ecosystem links */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-3 bg-blue-400/40" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase">Ecosystem</span>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {[
                { label: 'NEDApay Web App', href: 'https://app.nedapay.xyz' },
                { label: 'nTZS Stablecoin', href: 'https://app.ntzs.co.tz/' },
                { label: 'Farcaster MiniApp', href: 'https://farcaster.xyz/miniapps/nhIkqfY9DK47/nedapay' },
                { label: 'Base Integration', href: '#' },
                { label: 'Team', href: '/#team' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-white/8 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-400/60 animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-sky-400/40 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-1 h-1 rounded-full bg-cyan-400/30 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <p className="text-[11px] font-mono text-slate-600">
              © 2026 NEDApay. All rights reserved. Licensed by Bank of Tanzania.
            </p>
          </div>
          <div className="flex gap-6 text-[11px] font-mono text-slate-600">
            <a href="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

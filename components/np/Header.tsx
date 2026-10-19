'use client';

import {useEffect, useState} from 'react';

export const NAV = [
  {href: '/#spend', label: 'Spend'},
  {href: '/#send', label: 'Send'},
  {href: '/#swap', label: 'Swap'},
  {href: '/#ntzs', label: 'nTZS'},
  {href: '/#builders', label: 'Builders'},
  {href: '/#faq', label: 'FAQ'},
];

export const APP_URL = 'https://app.nedapay.xyz';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        open ? 'bg-np-bone' : scrolled ? 'bg-np-bone/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="np-wrap flex h-[72px] items-center justify-between gap-6">
        <a href="/" className="np-focus shrink-0" aria-label="NEDApay home">
          {/* supplied lockup artwork: never re-typed */}
          <img src="/brand/nedapay-lockup-h-blue.svg" alt="NEDApay" className="h-7 w-auto sm:h-8" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="np-focus text-[15px] font-semibold text-np-ink/70 transition-colors hover:text-np-ink">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="/#app" className="np-focus np-label rounded-full border border-np-ink/80 px-4 py-2.5 text-np-ink transition-colors hover:bg-np-ink hover:text-np-bone">
            Get the app
          </a>
          <a href={APP_URL} className="np-focus rounded-full bg-np-blue px-5 py-2.5 text-[15px] font-bold text-np-ink transition-transform duration-300 hover:-translate-y-0.5">
            Launch app
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={APP_URL} className="np-focus rounded-full bg-np-blue px-4 py-2.5 text-sm font-bold text-np-ink">
            Launch app
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="np-menu"
            onClick={() => setOpen(v => !v)}
            className="np-focus flex h-11 w-11 items-center justify-center rounded-full border border-np-ink"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
              <path d={open ? 'M2 1l14 10M2 11L16 1' : 'M0 1h18M0 11h18'} stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </header>

      {/* mobile menu: full screen, same type scale as the page. It lives outside
          the header on purpose: the header's backdrop blur would otherwise become
          the menu's containing block and collapse it to zero height. */}
      <div
        id="np-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-np-bone lg:hidden"
      >
        <nav aria-label="Mobile" className="np-wrap flex flex-col pt-6">
          {NAV.map(n => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="np-focus border-b border-np-rule py-4 text-4xl font-medium tracking-tight"
            >
              {n.label}
            </a>
          ))}
          <a href="/#app" onClick={() => setOpen(false)} className="np-focus np-label mt-8 self-start rounded-full border border-np-ink px-5 py-3">
            Get the app
          </a>
        </nav>
      </div>
    </>
  );
}

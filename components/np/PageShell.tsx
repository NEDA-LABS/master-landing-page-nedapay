import type {ReactNode} from 'react';

import {Footer} from './Closing';
import Header from './Header';

/** Brand-pack page frame shared by every page: header, main, footer. */
export default function PageShell({children}: {children: ReactNode}) {
  return (
    <div className="np min-h-screen">
      <a href="#main" className="np-focus np-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-np-ink focus:px-4 focus:py-3 focus:text-np-bone">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

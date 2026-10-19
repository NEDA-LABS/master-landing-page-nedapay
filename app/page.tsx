import Header from '@/components/np/Header';
import Hero from '@/components/np/Hero';
import ProductStage from '@/components/np/ProductStage';
import {FaqSection, HoldSection, MoreSection} from '@/components/np/Sections';
import {AppSection, ArticlesSection, Footer} from '@/components/np/Closing';

// Homepage in the NEDApay brand pack v1.0: nTZS-led story
// (spend it, send it, swap it, hold it), NEDApay as the way in.
export default function Home() {
  return (
    <div className="np min-h-screen">
      <a href="#main" className="np-focus np-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-np-ink focus:px-4 focus:py-3 focus:text-np-bone">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ProductStage />
        <HoldSection />
        <MoreSection />
        <FaqSection />
        <AppSection />
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
}

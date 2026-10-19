import Hero from '@/components/np/Hero';
import PageShell from '@/components/np/PageShell';
import ProductStage from '@/components/np/ProductStage';
import {FaqSection, HoldSection, MoreSection} from '@/components/np/Sections';
import {AppSection, ArticlesSection} from '@/components/np/Closing';

// Homepage in the NEDApay brand pack v1.0: nTZS-led story
// (spend it, send it, swap it, hold it), NEDApay as the way in.
export default function Home() {
  return (
    <PageShell>
      <Hero />
      <ProductStage />
      <HoldSection />
      <MoreSection />
      <FaqSection />
      <AppSection />
      <ArticlesSection />
    </PageShell>
  );
}

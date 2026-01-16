import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import PartnersSection from '@/components/landing/partners-section';
import Footer from '@/components/landing/footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}

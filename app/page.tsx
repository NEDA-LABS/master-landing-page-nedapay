import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import PartnersSection from '@/components/landing/partners-section';
import TeamSection from '@/components/landing/team-section';
import Footer from '@/components/landing/footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PartnersSection />
      <TeamSection />
      <Footer />
    </main>
  );
}

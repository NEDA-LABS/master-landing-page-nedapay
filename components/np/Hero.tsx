import {APP_URL} from './Header';
import {Reveal, WaveText} from './motion';

export default function Hero() {
  return (
    <section id="top" className="np-wrap pb-16 pt-10 sm:pt-16 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <WaveText as="h1" text="Spend locally. Send globally." className="np-display max-w-[15ch]" />
        </div>
        <Reveal className="lg:col-span-4" delay={250}>
          <p className="np-body text-np-ink/80">
            One app to pay at home, send money across borders and swap between stablecoins like USDC, USDT and nTZS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={APP_URL} className="np-focus rounded-full bg-np-blue px-7 py-4 text-base font-bold text-np-ink transition-transform duration-300 hover:-translate-y-0.5">
              Launch app
            </a>
            <a href="#app" className="np-focus rounded-full border border-np-ink px-7 py-4 text-base font-bold transition-colors hover:bg-np-ink hover:text-np-bone">
              Get the app
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12 sm:mt-16" delay={150}>
        <div className="relative overflow-hidden rounded-[clamp(16px,2vw,32px)] bg-np-bone ring-1 ring-black/10">
          {/* the film: muted, inline, looping; poster keeps first paint light */}
          <video
            className="block aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.jpg"
            aria-label="Film: spend here, send anywhere, swap between stablecoins, all in the NEDApay app"
          >
            <source src="/media/hero-film.webm" type="video/webm" />
            <source src="/media/hero-film.mp4" type="video/mp4" />
          </video>
        </div>
      </Reveal>
    </section>
  );
}

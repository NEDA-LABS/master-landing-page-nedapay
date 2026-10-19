import {APP_URL} from './Header';
import {Reveal, WaveText} from './motion';

const CODES = ['TZ', 'CN', 'GB', 'AE', 'KE', 'NG', 'US', 'IN', 'ZA', 'BR'];

export default function Hero() {
  return (
    <section id="top" className="np-wrap pb-16 pt-10 sm:pt-16 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="np-label text-np-label">nTZS · the Tanzanian shilling, on-chain</p>
          </Reveal>
          <WaveText as="h1" text="Spend locally. Send globally." className="np-display mt-6 max-w-[15ch]" />
        </div>
        <Reveal className="lg:col-span-4" delay={250}>
          <p className="np-body text-np-ink/80">
            nTZS is a digital Tanzanian shilling: 1&nbsp;nTZS&nbsp;=&nbsp;1&nbsp;TZS. NEDApay is where you hold it, spend it,
            send it and swap it.
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
            aria-label="Film: the nTZS coin is spent, sent across the world and swapped, then dropped into the NEDApay app"
          >
            <source src="/media/hero-film.webm" type="video/webm" />
            <source src="/media/hero-film.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="np-label text-np-label">{CODES.join(' · ')} · 100+ countries</p>
          <p className="np-label text-np-label">Spend · Send · Swap · Hold</p>
        </div>
      </Reveal>
    </section>
  );
}

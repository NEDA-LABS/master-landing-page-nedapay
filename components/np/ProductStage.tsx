'use client';

import {useEffect, useRef, useState} from 'react';

type Block = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  link?: {href: string; label: string};
  media: 'spend' | 'send' | 'swap' | 'build';
};

const BLOCKS: Block[] = [
  {
    id: 'spend',
    eyebrow: '01 · Spend it',
    title: 'Pay for anything, in shillings.',
    body: 'Lipa Namba, bills, airtime, TV, water and power, straight from your nTZS balance. Scan, tap, done.',
    items: ['Lipa Namba', 'LUKU, DAWASA, TUKUZA', 'DSTV, AzamTV, StarTimes', 'QR payments', 'Split with friends'],
    media: 'spend',
  },
  {
    id: 'send',
    eyebrow: '02 · Send it',
    title: 'Across the world, in seconds.',
    body: 'Send to family, suppliers and customers in 100+ countries. No bank delays, no wire confirmations to chase.',
    items: ['Dar es Salaam → Guangzhou', 'London → Mwanza', 'Arusha → Dubai', 'Nairobi, Lagos, Mumbai and more'],
    media: 'send',
  },
  {
    id: 'swap',
    eyebrow: '03 · Swap it',
    title: 'One coin. Every stablecoin.',
    body: 'Move between nTZS and USDC, USDT, EURC or cNGN at live rates, without leaving the app.',
    items: ['nTZS ⇄ USDC', 'nTZS ⇄ USDT', 'nTZS ⇄ EURC', 'nTZS ⇄ cNGN'],
    link: {href: 'https://www.ntzs.co.tz/simplefx', label: 'Provide liquidity with SimpleFX'},
    media: 'swap',
  },
  {
    id: 'builders',
    eyebrow: '04 · Build with it',
    title: 'NEDApay+ for builders.',
    body: 'Plug nTZS payments and payouts into your product. Our APIs handle settlement so you can ship.',
    items: ['Payments API', 'Stablecoin payouts', 'Cross-border settlement', 'Docs and sandbox'],
    link: {href: 'https://nedapayplus.xyz/docs', label: 'Read the docs'},
    media: 'build',
  },
];

const TERMINAL = [
  '$ nedapay+ payment create',
  '→ corridor ··········· TZ → CN',
  '→ asset ·············· nTZS → CNY',
  '→ status ············· pending',
  '→ status ············· settled',
  '✓ webhook delivered',
];

function Terminal({active}: {active: boolean}) {
  return (
    <div className="flex h-full w-full flex-col bg-np-ink p-[clamp(20px,3vw,48px)] font-np-mono text-[clamp(13px,1.2vw,18px)] leading-[2] text-np-bone">
      <div className="np-label mb-6 flex justify-between text-np-bone/60">
        <span>NEDApay+ · sandbox</span>
        <span className="text-np-blue">● online</span>
      </div>
      {TERMINAL.map((line, i) => (
        <div
          key={i}
          data-term-line
          className="transition-all duration-500"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'none' : 'translateY(8px)',
            transitionDelay: active ? `${200 + i * 380}ms` : '0ms',
          }}
        >
          {line.includes('settled') ? (
            <>
              → status ············· <span className="rounded bg-np-blue px-2 py-0.5 text-np-ink">settled</span>
            </>
          ) : (
            <span className={i === 0 || line.startsWith('✓') ? '' : 'text-np-bone/60'}>{line}</span>
          )}
        </div>
      ))}
      <p className="np-label mt-auto text-np-bone/40">Illustrative · see the docs for the live API</p>
    </div>
  );
}

function Media({kind, active}: {kind: Block['media']; active: boolean}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, [active]);
  if (kind === 'build') return <Terminal active={active} />;
  return (
    <video ref={ref} className="h-full w-full object-cover" muted loop playsInline preload="metadata" poster={`/media/stage-${kind}.jpg`} aria-hidden>
      <source src={`/media/stage-${kind}.webm`} type="video/webm" />
      <source src={`/media/stage-${kind}.mp4`} type="video/mp4" />
    </video>
  );
}

export default function ProductStage() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // active = the last block whose top has crossed 55% of the viewport
    const onScroll = () => {
      const line = window.innerHeight * 0.55;
      let a = 0;
      blocks.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) a = i;
      });
      setActive(a);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="product" aria-label="What you can do with nTZS" className="np-wrap pb-24 pt-8 lg:pb-40">
      <div className="grid gap-x-[clamp(24px,4vw,72px)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          {BLOCKS.map((b, i) => (
            <article
              key={b.id}
              id={b.id}
              data-stage-block
              ref={el => {
                blocks.current[i] = el;
              }}
              className="flex scroll-mt-24 flex-col justify-center gap-6 py-16 lg:min-h-[86vh] lg:py-0"
            >
              {/* mobile: media sits with its text */}
              <div data-stage-inline className="aspect-video overflow-hidden rounded-2xl bg-np-bone ring-1 ring-black/10 lg:hidden">
                <Media kind={b.media} active />
              </div>
              <p className="np-label text-np-blue">{b.eyebrow}</p>
              <h2 className="np-h2">{b.title}</h2>
              <p className="np-body max-w-[46ch] text-np-ink/80">{b.body}</p>
              <ul className="mt-2 border-t border-np-ink">
                {b.items.map(it => (
                  <li key={it} className="border-b border-np-rule py-3 text-[clamp(15px,1.15vw,18px)] font-semibold">
                    {it}
                  </li>
                ))}
              </ul>
              {b.link && (
                <a href={b.link.href} className="np-focus self-start text-lg font-bold text-np-blue underline-offset-4 hover:underline">
                  {b.link.label} →
                </a>
              )}
            </article>
          ))}
        </div>

        {/* desktop: one sticky stage that changes scene as you scroll */}
        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-[calc(50vh-min(20vw,300px))]">
            <div className="relative aspect-video overflow-hidden rounded-[clamp(16px,1.6vw,28px)] bg-np-bone ring-1 ring-black/10">
              {BLOCKS.map((b, i) => (
                <div
                  key={b.id}
                  data-stage-scene
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[opacity,transform] duration-700"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${i === active ? 0 : i < active ? -24 : 24}px)`,
                    transitionTimingFunction: 'var(--np-ease)',
                  }}
                >
                  <Media kind={b.media} active={i === active} />
                </div>
              ))}
              <div data-stage-bar className="absolute bottom-0 left-0 h-1 bg-np-blue transition-[width] duration-700" style={{width: `${((active + 1) / BLOCKS.length) * 100}%`, transitionTimingFunction: 'var(--np-ease)'}} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p data-stage-label className="np-label text-np-label">
                0{active + 1} / 0{BLOCKS.length} · {BLOCKS[active].eyebrow.split('· ')[1]}
              </p>
              <div role="group" aria-label="Jump to" className="flex gap-1">
                {BLOCKS.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    data-stage-tab
                    aria-pressed={i === active}
                    aria-label={`Show ${b.eyebrow.split('· ')[1]}`}
                    onClick={() => blocks.current[i]?.scrollIntoView({behavior: 'smooth', block: 'start'})}
                    className={`np-focus np-label h-11 min-w-11 rounded-full px-3 transition-colors ${i === active ? 'bg-np-ink text-np-bone' : 'text-np-label hover:text-np-ink'}`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

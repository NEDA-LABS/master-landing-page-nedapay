import {Reveal, WaveText} from './motion';

const COINS = [
  {src: '/usdc-logo.svg', name: 'USDC'},
  {src: '/usdt-coin.svg', name: 'USDT'},
  {src: '/eurc-coin.png', name: 'EURC'},
  {src: '/cngn-icon.jpeg', name: 'cNGN'},
];

/** 05 · Hold it: nTZS on black. Regulatory wording stays out until approved. */
export function HoldSection() {
  return (
    <section id="ntzs" className="bg-np-ink text-np-bone">
      <div className="np-wrap grid items-center gap-12 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="np-label text-np-blue">05 · Hold it</p>
          </Reveal>
          <WaveText as="h2" text="Your shilling. Everywhere." className="np-h2 mt-6" />
          <Reveal delay={200}>
            <p className="mt-8 font-np-mono text-[clamp(28px,3.4vw,56px)] font-medium tracking-tight">1 nTZS = 1 TZS</p>
            <p className="np-body mt-6 max-w-[48ch] text-np-bone/75">
              nTZS is the Tanzanian shilling as a digital token. Hold it in NEDApay, spend it at home, send it abroad, and swap
              it for the stablecoins the rest of the world uses.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Swaps with">
              {COINS.map(c => (
                <li key={c.name} className="flex items-center gap-2.5 rounded-full border border-np-bone/25 py-2 pl-2 pr-4">
                  <img src={c.src} alt="" className="h-7 w-7 rounded-full bg-np-paper object-contain" />
                  <span className="np-label">{c.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="https://app.ntzs.co.tz/" className="np-focus rounded-full bg-np-blue px-7 py-4 font-bold text-np-ink transition-transform duration-300 hover:-translate-y-0.5">
                Get nTZS
              </a>
              <a href="https://www.ntzs.co.tz/" className="np-focus rounded-full border border-np-bone/60 px-7 py-4 font-bold transition-colors hover:bg-np-bone hover:text-np-ink">
                About nTZS
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6" delay={150}>
          <img
            src="/media/ntzs-coin-fan.jpg"
            alt="The nTZS coin in front of USDC, USDT, EURC and cNGN"
            className="mx-auto w-full max-w-[640px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

const MORE = [
  {
    eyebrow: 'Liquidity',
    title: 'SimpleFX',
    body: 'Provide liquidity to currency pools and collect a fee on the swaps that route through them.',
    href: 'https://www.ntzs.co.tz/simplefx',
    cta: 'Explore SimpleFX',
  },
  {
    eyebrow: 'Business',
    title: 'Biashara',
    body: 'Run your store from NEDApay: collections, orders, financing and analytics in one place.',
    href: 'https://app.nedapay.xyz',
    cta: 'Open Biashara',
  },
  {
    eyebrow: 'Developers',
    title: 'NEDApay+',
    body: 'Payments and payouts APIs for apps that move money in stablecoins, nTZS included.',
    href: 'https://www.ntzs.co.tz/developers',
    cta: 'Read the docs',
  },
];

export function MoreSection() {
  return (
    <section className="bg-np-paper">
      <div className="np-wrap py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <WaveText as="h2" text="More from NEDApay." className="np-h2" />
          <Reveal>
            <p className="np-label text-np-label">One platform · every stablecoin</p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MORE.map((m, i) => (
            <Reveal key={m.title} delay={i * 120}>
              <a
                href={m.href}
                className="np-focus group flex h-full flex-col gap-4 border-t-2 border-np-ink pt-6 transition-colors"
              >
                <span className="np-label text-np-label">{m.eyebrow}</span>
                <span className="text-[clamp(28px,2.6vw,44px)] font-medium tracking-tight">{m.title}</span>
                <span className="np-body text-np-ink/75">{m.body}</span>
                <span className="mt-auto pt-4 font-bold text-np-blue group-hover:underline">{m.cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: 'What is NEDApay?',
    a: 'One app to pay bills and merchants at home, send money across borders, and swap between stablecoins like USDC, USDT and nTZS.',
  },
  {
    q: 'What is nTZS?',
    a: 'A digital Tanzanian shilling and one of the stablecoins you can hold in NEDApay. 1 nTZS is worth 1 TZS.',
  },
  {
    q: 'Which countries can I send to?',
    a: 'More than 100, across Africa, Asia, Europe, the Americas and the Middle East. If they have an internet connection, they can receive.',
  },
  {
    q: 'What does it cost?',
    a: 'Low and upfront. Transfers settle on-chain, so you pay a small network fee instead of wire and remittance charges. No hidden charges.',
  },
  {
    q: 'What is SimpleFX?',
    a: "NEDApay's liquidity layer. You deposit supported currencies into a pool and collect a fee each time someone swaps through it.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="np-wrap scroll-mt-24 py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="np-label text-np-label">FAQ</p>
          </Reveal>
          <WaveText as="h2" text="Questions, answered." className="np-h2 mt-6" />
        </div>
        <Reveal className="lg:col-span-8" delay={150}>
          <div className="border-t border-np-ink">
            {FAQ.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-np-rule">
                <summary className="np-focus grid cursor-pointer list-none grid-cols-[56px_1fr_32px] items-baseline gap-2 py-6 text-[clamp(20px,2vw,32px)] font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                  <span className="np-label text-np-label">0{i + 1}</span>
                  <span>{f.q}</span>
                  <span aria-hidden className="text-3xl font-medium transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="np-body max-w-[60ch] pb-8 pl-[64px] text-np-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from 'next/link';
import Image from 'next/image';

import {formatDate, getPublishedArticles} from '@/lib/articles';
import {APP_URL} from './Header';
import {Reveal, WaveText} from './motion';

const STORES = [
  {label: 'Google Play', meta: 'Android', href: 'https://play.google.com/store/apps/details?id=com.nedapay.app'},
  {label: 'App Store', meta: 'iPhone', href: 'https://apps.apple.com/tz/app/nedapay-wallet/id6799928100'},
  {label: 'app.nedapay.xyz', meta: 'Web · no install', href: APP_URL},
];

/** Bone on blue: the brand's signature surface. */
export function AppSection() {
  return (
    <section id="app" className="scroll-mt-16 bg-np-blue text-np-bone">
      <div className="np-wrap grid gap-14 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-6">
          <WaveText as="h2" text="Get nTZS on NEDApay." className="np-h2 text-np-bone" />
          {/* secondary lockup: mark + script tagline, tagline never larger than the mark */}
          <Reveal className="mt-12 flex items-center gap-5" delay={200}>
            <img src="/brand/nedapay-mark-bone.svg" alt="" className="h-16 w-auto" />
            <span className="font-np-script text-[clamp(30px,3vw,44px)] leading-none">Pay anywhere, settle everywhere</span>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6" delay={150}>
          <ul className="border-t border-np-bone">
            {STORES.map(s => (
              <li key={s.label}>
                <a href={s.href} className="np-focus group flex items-center justify-between gap-4 border-b border-np-bone/40 py-6">
                  <span className="text-[clamp(22px,2.2vw,36px)] font-extrabold tracking-tight">{s.label}</span>
                  <span className="np-label flex items-center gap-3">
                    {s.meta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Latest articles from the CMS; renders nothing when there are none. */
export async function ArticlesSection() {
  const articles = await getPublishedArticles(3);
  if (articles.length === 0) return null;
  return (
    <section id="articles" className="np-wrap py-24 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <WaveText as="h2" text="Latest articles." className="np-h2" />
        <Link href="/articles" className="np-focus np-label rounded-full border border-np-ink px-5 py-3 hover:bg-np-ink hover:text-np-bone">
          View all
        </Link>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.id} delay={i * 120}>
            <Link href={`/articles/${a.slug}`} className="np-focus group flex flex-col gap-4 border-t-2 border-np-ink pt-6">
              {a.cover_image && (
                <div className="relative aspect-video overflow-hidden rounded-xl bg-np-paper">
                  <Image src={a.cover_image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
              <span className="np-label text-np-label">
                {a.tags?.[0] ? `${a.tags[0]} · ` : ''}
                {formatDate(a.published_at || a.created_at)}
              </span>
              <span className="text-[clamp(22px,1.8vw,30px)] font-extrabold leading-tight tracking-tight group-hover:text-np-blue">{a.title}</span>
              {a.excerpt && <span className="np-body line-clamp-2 text-np-ink/75">{a.excerpt}</span>}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const COLS = [
  {
    title: 'Ecosystem',
    links: [
      {label: 'NEDApay web app', href: APP_URL},
      {label: 'nTZS', href: 'https://www.ntzs.co.tz/'},
      {label: 'SimpleFX', href: 'https://www.ntzs.co.tz/simplefx'},
      {label: 'NEDApay+ docs', href: 'https://nedapayplus.xyz/docs'},
      {label: 'Articles', href: '/articles'},
    ],
  },
  {
    title: 'Get the app',
    links: [
      {label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.nedapay.app'},
      {label: 'App Store', href: 'https://apps.apple.com/tz/app/nedapay-wallet/id6799928100'},
      {label: 'Open in browser', href: APP_URL},
    ],
  },
  {
    title: 'Community',
    links: [
      {label: 'Discord', href: 'https://discord.gg/Ubd889wjSM'},
      {label: 'X (Twitter)', href: 'https://x.com/NedaPay_xyz'},
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-np-ink text-np-bone">
      <div className="np-wrap pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <img src="/brand/nedapay-lockup-h-white.svg" alt="NEDApay" className="h-9 w-auto" />
            <p className="np-label mt-8 text-np-bone/60">Contact</p>
            <a href="mailto:support@nedapay.xyz" className="np-focus mt-3 block font-semibold hover:text-np-blue">support@nedapay.xyz</a>
            <p className="mt-3 text-np-bone/70">NEDA Labs Limited · Dar es Salaam, Tanzania</p>
          </div>
          {COLS.map(c => (
            <div key={c.title} className="md:col-span-2 md:col-start-auto">
              <p className="np-label text-np-bone/60">{c.title}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="np-focus font-semibold transition-colors hover:text-np-blue">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="np-label mt-20 flex flex-wrap justify-between gap-4 border-t border-np-bone/20 pt-6 text-np-bone/60">
          <span>© {new Date().getFullYear()} NEDA Labs Limited</span>
          <span className="flex gap-6">
            <Link href="/privacy-policy" className="np-focus hover:text-np-bone">Privacy</Link>
            <Link href="/terms-of-service" className="np-focus hover:text-np-bone">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

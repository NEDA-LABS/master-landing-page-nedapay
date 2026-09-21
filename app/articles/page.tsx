import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/landing/footer';
import { getPublishedArticles, formatDate } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles · NEDApay',
  description: 'News, product updates, and insights from NEDApay.',
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
      <Header />

      <section className="relative pt-28 sm:pt-32 pb-20 bg-white dark:bg-black overflow-hidden">
        {/* grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
              Newsroom
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-slate-900 dark:text-white leading-[0.9] mb-10">
            Articles &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
              Updates.
            </span>
          </h1>

          {articles.length === 0 ? (
            <div className="border border-dashed border-slate-200 dark:border-white/10 py-20 text-center">
              <p className="font-mono text-sm text-slate-400 dark:text-slate-600">
                No articles published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group relative flex flex-col overflow-hidden bg-slate-50 dark:bg-white/[0.025] hover:bg-blue-50/40 dark:hover:bg-blue-500/[0.05] transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent group-hover:via-blue-400/70 transition-all duration-300 z-10" />
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-white/[0.04] overflow-hidden">
                    {a.cover_image ? (
                      <Image src={a.cover_image} alt={a.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl opacity-30">📰</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    {a.tags?.[0] && (
                      <span className="text-[9px] font-mono tracking-[0.15em] text-blue-600 dark:text-blue-400 uppercase mb-2">
                        {a.tags[0]}
                      </span>
                    )}
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {a.title}
                    </h2>
                    {a.excerpt && (
                      <p className="text-[13px] text-slate-500 dark:text-slate-500 font-light leading-relaxed line-clamp-3 flex-1">
                        {a.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-slate-600">
                      {a.author && <span>{a.author}</span>}
                      {a.author && <span>·</span>}
                      <span>{formatDate(a.published_at || a.created_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

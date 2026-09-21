import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/landing/footer';
import ArticleBody from '@/components/article-body';
import { getArticleBySlug, getPublishedArticles, formatDate, readingTime } from '@/lib/articles';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article · NEDApay' };

  const description = article.excerpt || `${article.title} — NEDApay Newsroom.`;
  // Use the cover image when present, otherwise fall back to the NEDApay
  // logo so shared links always show branding instead of a bare card.
  const images = article.cover_image
    ? [{ url: article.cover_image, width: 1200, height: 630, alt: article.title }]
    : [{ url: '/logo.png', alt: 'NEDApay' }];
  const twitterImage = article.cover_image || '/logo.png';

  return {
    title: `${article.title} · NEDApay`,
    description,
    openGraph: {
      title: article.title,
      description,
      url: `/articles/${article.slug}`,
      siteName: 'NEDApay',
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      authors: article.author ? [article.author] : undefined,
      images,
    },
    twitter: {
      card: article.cover_image ? 'summary_large_image' : 'summary',
      title: article.title,
      description,
      images: [twitterImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const more = (await getPublishedArticles(4)).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
      <Header />

      <article className="relative pt-28 sm:pt-32 pb-20 bg-white dark:bg-black">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/articles" className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-slate-400 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase mb-8">
            <span>←</span> All Articles
          </Link>

          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((t) => (
                <span key={t} className="text-[9px] font-mono tracking-[0.15em] text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-[0.95] mb-5">
            {article.title}
          </h1>

          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[11px] font-mono text-slate-400 dark:text-slate-600 mb-8">
            {article.author && <span className="text-slate-600 dark:text-slate-400">By {article.author}</span>}
            {article.author && <span>·</span>}
            <span>{formatDate(article.published_at || article.created_at)}</span>
            <span>·</span>
            <span>{readingTime(article.body)} min read</span>
          </div>

          {article.cover_image && (
            <div className="w-full overflow-hidden mb-10 bg-slate-100 dark:bg-white/[0.04] rounded-sm">
              {/* Show the full cover at its natural aspect ratio — never cropped. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.cover_image} alt={article.title} className="w-full h-auto block" loading="eager" />
            </div>
          )}

          <ArticleBody markdown={article.body} />
        </div>

        {/* more */}
        {more.length > 0 && (
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-10 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">More Reading</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/8" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {more.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group">
                  <div className="relative aspect-[16/9] bg-slate-100 dark:bg-white/[0.04] overflow-hidden mb-3">
                    {a.cover_image ? (
                      <Image src={a.cover_image} alt={a.title} fill sizes="33vw" className="object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">📰</div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {a.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/np/PageShell';
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
    <PageShell>
      <article className="np-wrap pb-24 pt-10 sm:pt-16">
        <div className="mx-auto max-w-[72ch]">
          <Link href="/articles" className="np-focus np-label inline-flex items-center gap-2 text-np-label transition-colors hover:text-np-ink">
            <span aria-hidden>←</span> All articles
          </Link>

          {article.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <span key={t} className="np-label rounded-full border border-np-ink px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h1 className="np-h2 mt-6">{article.title}</h1>

          <p className="np-label mt-6 flex flex-wrap gap-x-2 gap-y-1 text-np-label">
            {article.author && <span className="text-np-ink">By {article.author}</span>}
            {article.author && <span>·</span>}
            <span>{formatDate(article.published_at || article.created_at)}</span>
            <span>·</span>
            <span>{readingTime(article.body)} min read</span>
          </p>

          {article.cover_image && (
            <div className="mt-10 overflow-hidden rounded-[clamp(16px,2vw,28px)] bg-np-paper ring-1 ring-black/10">
              {/* Show the full cover at its natural aspect ratio — never cropped. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.cover_image} alt={article.title} className="block h-auto w-full" loading="eager" />
            </div>
          )}

          <div className="mt-12">
            <ArticleBody markdown={article.body} />
          </div>
        </div>

        {more.length > 0 && (
          <div className="mt-24 border-t-2 border-np-ink pt-10">
            <p className="np-label text-np-label">More reading</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {more.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="np-focus group flex flex-col gap-4">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-np-paper">
                    {a.cover_image ? (
                      <Image src={a.cover_image} alt="" fill sizes="33vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <img src="/brand/nedapay-mark-blue.svg" alt="" className="h-10 w-auto opacity-40" />
                      </div>
                    )}
                  </div>
                  <span className="text-xl font-medium leading-tight tracking-tight group-hover:text-np-blue">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageShell>
  );
}

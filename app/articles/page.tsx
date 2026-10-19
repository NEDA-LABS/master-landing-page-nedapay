import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageShell from '@/components/np/PageShell';
import { getPublishedArticles, formatDate } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles · NEDApay',
  description: 'News, product updates, and insights from NEDApay.',
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <PageShell>
      <section className="np-wrap pb-24 pt-10 sm:pt-16 lg:pb-32">
        <p className="np-label text-np-blue">Newsroom</p>
        <h1 className="np-display mt-6 max-w-[14ch]">Articles and updates.</h1>

        {articles.length === 0 ? (
          <div className="mt-16 border-t-2 border-np-ink py-20">
            <p className="np-label text-np-label">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="np-focus group flex flex-col gap-4 border-t-2 border-np-ink pt-6">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-np-paper">
                  {a.cover_image ? (
                    <Image src={a.cover_image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-contain transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <img src="/brand/nedapay-mark-blue.svg" alt="" className="h-12 w-auto opacity-40" />
                    </div>
                  )}
                </div>
                <span className="np-label text-np-label">
                  {a.tags?.[0] ? `${a.tags[0]} · ` : ''}
                  {formatDate(a.published_at || a.created_at)}
                </span>
                <span className="text-[clamp(22px,1.8vw,30px)] font-medium leading-tight tracking-tight group-hover:text-np-blue">{a.title}</span>
                {a.excerpt && <span className="np-body line-clamp-3 text-np-ink/75">{a.excerpt}</span>}
                {a.author && <span className="np-label mt-auto text-np-label">By {a.author}</span>}
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

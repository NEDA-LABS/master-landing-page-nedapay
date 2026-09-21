import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleEditor from '@/components/admin/article-editor';
import { getArticleById } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          ← Articles
        </Link>
        {article.published && (
          <Link href={`/articles/${article.slug}`} target="_blank" className="text-[11px] font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 hover:underline">
            View live ↗
          </Link>
        )}
      </div>
      <h1 className="font-display text-3xl text-slate-900 dark:text-white mt-3 mb-6">Edit Article</h1>
      <ArticleEditor article={article} />
    </div>
  );
}

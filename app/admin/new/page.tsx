import Link from 'next/link';
import ArticleEditor from '@/components/admin/article-editor';

export default function NewArticlePage() {
  return (
    <div>
      <Link href="/admin" className="text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        ← Articles
      </Link>
      <h1 className="font-display text-3xl text-slate-900 dark:text-white mt-3 mb-6">New Article</h1>
      <ArticleEditor />
    </div>
  );
}

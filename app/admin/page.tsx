import Link from 'next/link';
import { supabaseConfigured } from '@/lib/supabase/server';
import { getAllArticlesForAdmin, formatDate } from '@/lib/articles';
import { deleteArticle } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  if (!supabaseConfigured()) {
    return (
      <div className="border border-dashed border-slate-300 dark:border-white/15 p-6 font-mono text-sm text-slate-600 dark:text-slate-400">
        <p className="font-semibold mb-2">Supabase not configured</p>
        <p className="text-[13px] leading-relaxed">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{' '}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>, run{' '}
          <code>supabase/schema.sql</code>, then create a user in the Supabase dashboard.
        </p>
      </div>
    );
  }

  const articles = await getAllArticlesForAdmin();

  return (
    <div>
      <h1 className="font-display text-3xl text-slate-900 dark:text-white mb-6">Articles</h1>

      {articles.length === 0 ? (
        <div className="border border-dashed border-slate-300 dark:border-white/15 py-16 text-center">
          <p className="font-mono text-sm text-slate-400 dark:text-slate-600 mb-4">No articles yet.</p>
          <Link href="/admin/new" className="inline-block px-4 py-2 text-[11px] font-mono tracking-wider uppercase bg-slate-900 dark:bg-white text-white dark:text-black">
            Write your first article
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
          {articles.map((a) => (
            <div key={a.id} className="flex items-center gap-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/admin/${a.id}/edit`} className="font-semibold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {a.title}
                  </Link>
                  <span className={`shrink-0 text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 ${a.published ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'}`}>
                    {a.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 dark:text-slate-600 mt-0.5 truncate">
                  /{a.slug} · {formatDate(a.updated_at)}
                </div>
              </div>
              <Link href={`/admin/${a.id}/edit`} className="shrink-0 text-[11px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                Edit
              </Link>
              <form action={deleteArticle.bind(null, a.id)} className="shrink-0">
                <button type="submit" className="text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-600 hover:text-red-500 transition-colors">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

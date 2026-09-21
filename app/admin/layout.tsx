import Link from 'next/link';
import { createClient, supabaseConfigured } from '@/lib/supabase/server';
import { signOut } from './actions';

export const metadata = { title: 'Newsroom Admin · NEDApay' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let email: string | null = null;
  if (supabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  }

  // Not signed in (e.g. the login page) → render bare.
  if (!email) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#f4eede] dark:bg-black text-slate-900 dark:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-white/10 bg-[#f4eede]/90 dark:bg-black/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display text-xl text-slate-900 dark:text-white">
              NEDApay
            </Link>
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase hidden sm:inline">
              Newsroom
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/new" className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors">
              + New
            </Link>
            <span className="hidden sm:inline text-[11px] font-mono text-slate-400 dark:text-slate-600">{email}</span>
            <form action={signOut}>
              <button type="submit" className="text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-600 hover:text-red-500 transition-colors">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

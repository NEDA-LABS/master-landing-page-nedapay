import type { Metadata } from 'next';
import LoginForm from '@/components/admin/login-form';

export const metadata: Metadata = { title: 'Admin · Sign in' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4eede] dark:bg-black px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-slate-900 dark:text-white">NEDApay</h1>
          <p className="text-[11px] font-mono tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase mt-1">
            Newsroom Admin
          </p>
        </div>
        <LoginForm next={next ?? '/admin'} />
      </div>
    </main>
  );
}

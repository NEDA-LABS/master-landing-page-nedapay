'use client';

import { useActionState } from 'react';
import { signIn } from '@/app/admin/actions';

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <form action={action} className="relative bg-white dark:bg-white/[0.03] p-6 sm:p-7">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <input type="hidden" name="next" value={next} />

      <label className="block mb-4">
        <span className="block text-[10px] font-mono tracking-[0.15em] text-slate-500 dark:text-slate-500 uppercase mb-1.5">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 px-3 py-2.5 font-mono text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500/60"
        />
      </label>

      <label className="block mb-5">
        <span className="block text-[10px] font-mono tracking-[0.15em] text-slate-500 dark:text-slate-500 uppercase mb-1.5">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 px-3 py-2.5 font-mono text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500/60"
        />
      </label>

      {state?.error && (
        <p className="text-[12px] font-mono text-red-600 dark:text-red-400 mb-4">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 font-mono text-sm tracking-widest uppercase bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors disabled:opacity-50"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

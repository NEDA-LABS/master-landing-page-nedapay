// app/(legal)/privacy/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Data Protection Policy | NEDApay",
  description:
    "NEDA Labs Ltd Data Protection Policy — how we collect, use, share, and protect personal data under Tanzania's Personal Data Protection Act, 2022.",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-200">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 pt-24">{children}</main>
    </div>
  );
}

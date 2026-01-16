// app/(legal)/privacy/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Privacy Policy | NedaPay",
  description:
    "Learn how NedaPay collects, uses, and protects your personal data.",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-200">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 pt-24">{children}</main>
    </div>
  );
}

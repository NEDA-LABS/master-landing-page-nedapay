// app/(legal)/privacy/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import PageShell from "@/components/np/PageShell";


export const metadata: Metadata = {
  title: "Data Protection Policy | NEDApay",
  description:
    "NEDA Labs Ltd Data Protection Policy — how we collect, use, share, and protect personal data under Tanzania's Personal Data Protection Act, 2022.",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <div className="np-wrap pb-24 pt-8">{children}</div>
    </PageShell>
  );
}

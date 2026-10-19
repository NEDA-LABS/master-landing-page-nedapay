// app/(legal)/terms-of-service/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import PageShell from "@/components/np/PageShell";


export const metadata: Metadata = {
  title: "Terms of Service | NEDApay",
  description:
    "Read NEDApay's Terms of Service to understand your rights and obligations when using our digital payment platform.",
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <div className="np-wrap pb-24 pt-8">{children}</div>
    </PageShell>
  );
}

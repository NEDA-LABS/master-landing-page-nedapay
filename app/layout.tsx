import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono-body",
  display: "swap",
});

const defaultUrl = "https://nedapay.xyz"

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "NedaPay - Cross-Border Payment Infrastructure",
  description: "Seamless onramp and offramp payment solutions for global transactions",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: 'icon',
      url: '/logo.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased`} style={{ fontFamily: 'var(--font-mono-body), "JetBrains Mono", ui-monospace, "Cascadia Code", "Fira Code", monospace' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

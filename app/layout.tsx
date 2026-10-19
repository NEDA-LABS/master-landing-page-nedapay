import type { Metadata } from "next";
import { JetBrains_Mono, Anton, Montserrat, DM_Mono, Ms_Madi } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono-body",
  display: "swap",
});

// Heavy condensed display face for big headlines — "money should work anywhere" look
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

// NEDApay brand pack v1.0: Montserrat for voice, DM Mono for numbers and labels,
// script for the tagline lockup only (Ms Madi is the pack's named fallback).
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-np-sans",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-np-mono",
  display: "swap",
});
const msMadi = Ms_Madi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-np-script",
  display: "swap",
});

const defaultUrl = "https://nedapay.xyz"

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "NEDApay: the shilling, unlocked",
  description: "nTZS is a digital Tanzanian shilling, 1 nTZS = 1 TZS. NEDApay is where you hold it, spend it, send it and swap it.",
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
      <body className={`${jetbrainsMono.variable} ${anton.variable} ${montserrat.variable} ${dmMono.variable} ${msMadi.variable} antialiased`} style={{ fontFamily: 'var(--font-mono-body), "JetBrains Mono", ui-monospace, "Cascadia Code", "Fira Code", monospace' }}>
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

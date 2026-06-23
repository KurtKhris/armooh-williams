import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { getSettings } from "@/lib/settings";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Armooh-Williams, PLLC | Strategic Legal Counsel for a Global World",
    template: "%s | Armooh-Williams, PLLC",
  },
  description:
    "Strategic Legal Counsel for a Global World. Armooh-Williams, PLLC advises businesses, executives, investors, and private clients on global mobility & immigration, white collar defense & sanctions, and trust & corporate services.",
  keywords: [
    "law firm",
    "global mobility",
    "immigration law",
    "white collar defense",
    "sanctions",
    "trust and corporate services",
    "international law",
    "PLLC",
    "Washington DC attorney",
    "cross-border legal counsel",
    "Joyce Williams attorney",
  ],
  authors: [{ name: "Armooh-Williams, PLLC" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Armooh-Williams, PLLC",
    title: "Armooh-Williams, PLLC | Strategic Legal Counsel for a Global World",
    description:
      "Global Reach. Strategic Protection. Trusted Counsel. Corporate immigration, white collar defense, and trust & corporate services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Armooh-Williams, PLLC",
    description: "Global Reach. Strategic Protection. Trusted Counsel.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-body bg-white text-brand-dark antialiased">
        {/* Fallback: make all content visible when JS is disabled or fails to load */}
        <noscript dangerouslySetInnerHTML={{ __html: `<style>*{opacity:1!important;transform:none!important;visibility:visible!important}</style>` }} />
        <Providers settings={settings}>{children}</Providers>
      </body>
    </html>
  );
}
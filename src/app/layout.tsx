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
    default: "Armooh-Williams, PLLC | Welcome to Your Law Firm",
    template: "%s | Armooh-Williams, PLLC",
  },
  description:
    "Corporate Immigration & White-Collar Defense for Global Businesses, Executives, and Cross-Border Professionals",
  keywords: [
    "law firm",
    "corporate law",
    "litigation",
    "immigration law",
    "family law",
    "real estate law",
    "international law",
    "PLLC",
    "attorney",
    "legal counsel",
  ],
  authors: [{ name: "Armooh-Williams, PLLC" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Armooh-Williams, PLLC",
    title: "Armooh-Williams, PLLC | Welcome to Your Law Firm",
    description:
      "Strategic legal excellence for modern clients. Corporate law, litigation, immigration, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Armooh-Williams, PLLC",
    description: "Strategic legal excellence for modern clients.",
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
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-body bg-white text-brand-dark antialiased">
        <Providers settings={settings}>{children}</Providers>
      </body>
    </html>
  );
}
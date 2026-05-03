import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "CleanPro - химчистка мебели в Минске", template: "%s | CleanPro" },
  description:
    "Химчистка дивана и мягкой мебели в Минске: цена и стоимость с прозрачным прайсом. Чистка штор, матрасов, ковров. Выезд в день обращения, гарантия качества.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "CleanPro - химчистка мебели в Минске",
    description:
      "Химчистка дивана в Минске (цена от 50 BYN), чистка штор и мягкой мебели. Безопасная химия, фиксированная стоимость до выезда.",
    url: getSiteUrl(),
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanPro - химчистка мебели в Минске",
    description: "Профессиональная химчистка диванов, матрасов, ковров и кресел с выездом по Минску.",
  },
  other: {
    "geo.region": "BY-HM",
    "geo.placename": "Минск",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} flex min-h-screen flex-col bg-white text-slate-900`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

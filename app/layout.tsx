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
  title: {
    default: "Выездная химчистка на дому в Минске и Минской области | CleanPro",
    template: "%s | CleanPro",
  },
  description:
    "Выездная химчистка мебели и ковров в Минске и Минской области: химчистка на дому мягкой мебели, диванов, матрасов и ковровых покрытий. Цены с прозрачным прайсом, выезд в день обращения.",
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
    title: "Выездная химчистка на дому — Минск и Минская область | CleanPro",
    description:
      "Выездная химчистка мебели и ковров на дому в Минске и области: мягкая мебель, диваны, шторы. Фиксированная цена до выезда, безопасная химия.",
    url: getSiteUrl(),
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Выездная химчистка на дому — Минск и Минская область",
    description:
      "Химчистка на дому: диваны, матрасы, ковры и шторы. Выездная химчистка по Минску и Минской области с фиксированной ценой.",
  },
  other: {
    "geo.region": "BY-HM",
    "geo.placename": "Минск, Минская область",
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

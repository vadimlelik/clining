import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "CleanPro - химчистка мебели в Минске", template: "%s | CleanPro" },
  description: "Профессиональная химчистка диванов, матрасов, ковров и кресел в Минске. Выезд в день обращения, фиксированные цены и гарантия качества.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CleanPro - клининговая компания",
    description: "Химчистка мягкой мебели и ковров в Минске с безопасной химией и гарантией результата.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
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

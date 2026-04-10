import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "CleanPro - клининговая компания в Москве", template: "%s | CleanPro" },
  description: "Профессиональная уборка квартир и офисов в Москве. Быстрый выезд, фиксированные цены, гарантированный результат.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CleanPro - клининговая компания",
    description: "Клининг для дома и бизнеса с официальным договором и гарантией качества.",
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
      </body>
    </html>
  );
}

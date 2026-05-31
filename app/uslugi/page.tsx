import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { getCanonical, services } from "@/lib/site";
import { siteImages } from "@/lib/site-images";

export function generateMetadata(): Metadata {
  return {
    title: "Услуги выездной химчистки на дому",
    description:
      "Услуги химчистки на дому в Минске и Минской области: диваны, матрасы, ковры, кресла, шторы и кожаная мебель. Выездная химчистка с фиксированными ценами.",
    keywords: [
      "выездная химчистка",
      "выездная химчистка мебели",
      "выездная химчистка ковров",
      "выездная химчистка мягкой мебели",
      "химчистка на дому",
      "выездная химчистка минск",
      "услуги химчистки минск",
      "химчистка диванов",
      "химчистка мебели минская область",
    ],
    alternates: { canonical: getCanonical("/uslugi") },
    openGraph: { title: "Услуги CleanPro", description: "Подберите нужную услугу химчистки с фиксированными ценами.", url: getCanonical("/uslugi") },
    robots: { index: true, follow: true },
  };
}

export default function ServicesPage() {
  return (
    <div className="page-container py-8 md:py-10">
      <PageHero
        badge="Услуги на дому"
        title="Выездная химчистка мебели и ковров"
        description="Выберите услугу — у каждой позиции отдельная страница с составом работ, сроками и ценой."
        image={{ src: siteImages.services.sofa, alt: "Химчистка мягкой мебели на дому" }}
      />

      <div className="section-gap grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <section className="section-gap card-surface bg-brand-50/40 p-6">
        <h2 className="text-xl font-bold text-slate-900">Смотрите также</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/ceny" className="text-brand-700 hover:text-brand-800">
            Таблица цен →
          </Link>
          <Link href="/#calculator" className="text-brand-700 hover:text-brand-800">
            Калькулятор →
          </Link>
          <Link href="/otzivi" className="text-brand-700 hover:text-brand-800">
            Отзывы →
          </Link>
        </div>
      </section>
    </div>
  );
}

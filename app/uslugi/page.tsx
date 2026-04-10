import type { Metadata } from "next";
import Link from "next/link";
import { getCanonical, services } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Услуги химчистки",
    description: "Все услуги CleanPro по химчистке мебели в Минске: диваны, матрасы, ковры, кресла, шторы и кожаная мебель.",
    keywords: ["услуги химчистки минск", "химчистка диванов", "химчистка мебели"],
    alternates: { canonical: getCanonical("/uslugi") },
    openGraph: { title: "Услуги CleanPro", description: "Подберите нужную услугу химчистки с фиксированными ценами.", url: getCanonical("/uslugi") },
  };
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Услуги</h1>
      <p className="mt-3 max-w-3xl text-slate-600">Выберите услугу химчистки мебели. Для каждой услуги есть отдельная страница с составом работ и ценой.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="mt-2 text-slate-600">{service.shortDescription}</p>
            <p className="mt-3 text-sm font-semibold text-emerald-700">{service.priceFrom}</p>
            <Link href={`/uslugi/${service.slug}`} className="mt-4 inline-block text-sm font-semibold text-sky-700">Перейти на страницу услуги →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

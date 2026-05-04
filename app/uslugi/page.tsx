import type { Metadata } from "next";
import Link from "next/link";
import { getCanonical, services } from "@/lib/site";

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
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Услуги выездной химчистки на дому</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Выберите услугу: химчистка на дому в Минске и Минской области. У каждой позиции — отдельная страница с составом работ и ценой.
      </p>
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
      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Смотрите также</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/ceny" className="text-sky-700 hover:text-sky-800">
            Таблица цен
          </Link>
          <Link href="/otzivi" className="text-sky-700 hover:text-sky-800">
            Отзывы клиентов
          </Link>
          <Link href="/blog" className="text-sky-700 hover:text-sky-800">
            Советы в блоге
          </Link>
        </div>
      </section>
    </div>
  );
}

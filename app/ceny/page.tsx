import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getCanonical, services } from "@/lib/site";
import { siteImages } from "@/lib/site-images";

export function generateMetadata(): Metadata {
  return {
    title: "Выездная химчистка цены — прайс в Минске и области",
    description:
      "Цены на выездную химчистку мебели, ковров и мягкой мебели в Минске: диваны, матрасы, шторы, ковровые покрытия. Прайс без скрытых доплат, стоимость фиксируем до выезда.",
    keywords: [
      "выездная химчистка цены",
      "химчистка дивана минск цена",
      "химчистка мягкой мебели цены",
      "выездная химчистка мебели",
      "чистка штор минск",
      "цены на химчистку минск",
      "химчистка дивана стоимость",
    ],
    alternates: { canonical: getCanonical("/ceny") },
    openGraph: {
      title: "Выездная химчистка — цены и прайс | CleanPro",
      description: "Прайс на химчистку на дому: мебель, ковры, матрасы. Фиксированный прайс без скрытых доплат.",
      url: getCanonical("/ceny"),
    },
    robots: { index: true, follow: true },
  };
}

export default function PricesPage() {
  return (
    <div className="page-container py-8 md:py-10">
      <PageHero
        badge="Прозрачный прайс"
        title="Цены на выездную химчистку в Минске"
        description="Базовые тарифы на химчистку на дому. Итог зависит от ткани и загрязнений — фиксируем до выезда."
        image={{ src: siteImages.services.carpet, alt: "Прайс на химчистку ковров и мебели" }}
      />

      <div className="section-gap overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <table className="w-full border-collapse text-left text-sm md:text-base">
          <thead className="bg-brand-50 text-brand-900">
            <tr>
              <th className="p-4 font-bold">Услуга</th>
              <th className="p-4 font-bold">Цена</th>
              <th className="hidden p-4 font-bold sm:table-cell">Срок</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.slug} className="border-t border-slate-100 transition hover:bg-brand-50/30">
                <td className="p-4">
                  <Link href={`/uslugi/${service.slug}`} className="font-medium text-slate-900 hover:text-brand-700">
                    {service.title}
                  </Link>
                </td>
                <td className="p-4 font-bold text-brand-700">{service.priceFrom}</td>
                <td className="hidden p-4 text-slate-600 sm:table-cell">{service.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="section-gap card-surface bg-brand-50/30 p-6">
        <h2 className="text-xl font-bold text-slate-900">Куда перейти дальше</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/#calculator" className="btn-primary">
            Калькулятор
          </Link>
          <Link href="/uslugi" className="btn-secondary">
            Услуги
          </Link>
          <Link href="/voprosy" className="text-brand-700 hover:text-brand-800">
            FAQ →
          </Link>
        </div>
      </section>
    </div>
  );
}

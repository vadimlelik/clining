import type { Metadata } from "next";
import Link from "next/link";
import { getCanonical, services } from "@/lib/site";

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
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Цены на выездную химчистку в Минске</h1>
      <p className="mt-3 text-slate-600">
        Прайс на химчистку мебели, ковров и матрасов на дому. Финальная стоимость зависит от материала, размера и сложности загрязнений. Базовые тарифы:
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full border-collapse bg-white text-left">
          <thead className="bg-slate-50"><tr><th className="p-4">Услуга</th><th className="p-4">Цена</th><th className="p-4">Срок</th></tr></thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.slug} className="border-t border-slate-200"><td className="p-4">{service.title}</td><td className="p-4 font-semibold text-emerald-700">{service.priceFrom}</td><td className="p-4">{service.duration}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Куда перейти дальше</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/uslugi" className="text-sky-700 hover:text-sky-800">
            Подробное описание услуг
          </Link>
          <Link href="/voprosy" className="text-sky-700 hover:text-sky-800">
            Частые вопросы
          </Link>
          <Link href="/kontakty" className="text-sky-700 hover:text-sky-800">
            Оставить заявку
          </Link>
        </div>
      </section>
    </div>
  );
}

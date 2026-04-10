import type { Metadata } from "next";
import { getCanonical, services } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Цены",
    description: "Прозрачные цены на клининговые услуги: стоимость уборки квартиры, офиса, генеральной уборки и уборки после ремонта.",
    keywords: ["цены на клининг", "стоимость уборки", "уборка цена Москва"],
    alternates: { canonical: getCanonical("/ceny") },
    openGraph: { title: "Цены на клининг - CleanPro", description: "Фиксированный прайс без скрытых доплат.", url: getCanonical("/ceny") },
  };
}

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Цены</h1>
      <p className="mt-3 text-slate-600">Финальная стоимость зависит от площади и дополнительных задач. Базовые тарифы:</p>
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
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getCanonical, minskDistricts } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Районы Минска",
    description: "Химчистка мебели по районам Минска: выберите ваш район и узнайте условия выезда, цены и сроки.",
    keywords: ["химчистка мебели по районам минска", "химчистка дивана район минск", "выездная химчистка минск"],
    alternates: { canonical: getCanonical("/rayony") },
    openGraph: {
      title: "Химчистка мебели по районам Минска",
      description: "Отдельные страницы по районам Минска для быстрого заказа выезда.",
      url: getCanonical("/rayony"),
    },
  };
}

export default function DistrictsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Химчистка мебели по районам Минска</h1>
      <p className="mt-3 max-w-3xl text-slate-600">Выберите район, чтобы быстро перейти на локальную страницу с условиями выезда и релевантными услугами.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {minskDistricts.map((district) => (
          <article key={district.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{district.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{district.summary}</p>
            <Link href={`/rayony/${district.slug}`} className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
              Открыть страницу района →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

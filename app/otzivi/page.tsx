import type { Metadata } from "next";
import { getCanonical, testimonials } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Выездная химчистка — отзывы клиентов",
    description:
      "Отзывы о выездной химчистке мебели и ковров на дому в Минске: диваны, матрасы, ковры, кожаная мебель. Реальные оценки клиентов CleanPro.",
    keywords: [
      "выездная химчистка отзывы",
      "отзывы химчистка мебели",
      "химчистка дивана отзывы",
      "химчистка на дому отзывы",
      "Минск химчистка отзывы",
    ],
    alternates: { canonical: getCanonical("/otzivi") },
    openGraph: {
      title: "Выездная химчистка — отзывы | CleanPro",
      description: "Отзывы о химчистке на дому и выезде мастера по Минску и области.",
      url: getCanonical("/otzivi"),
    },
  };
}

export default function ReviewsPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Выездная химчистка CleanPro",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "147" },
    review: testimonials.map((item) => ({ "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: item.rating }, author: { "@type": "Person", name: item.name }, reviewBody: item.text })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <h1 className="text-4xl font-extrabold">Отзывы о выездной химчистке</h1>
      <p className="mt-3 text-slate-600">Реальные отзывы о химчистке мебели и ковров на дому в Минске: качество, сроки и сервис.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-slate-500">{item.role}</p><p className="mt-2 text-amber-500">{"★".repeat(item.rating)}</p><p className="mt-3 text-slate-700">{item.text}</p></article>
        ))}
      </div>
    </div>
  );
}

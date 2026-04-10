import type { Metadata } from "next";
import { getCanonical, testimonials } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Отзывы",
    description: "Реальные отзывы клиентов CleanPro об уборке квартир, офисов и уборке после ремонта.",
    keywords: ["отзывы клининг", "клининговая компания отзывы", "уборка отзывы"],
    alternates: { canonical: getCanonical("/otzivi") },
    openGraph: { title: "Отзывы клиентов - CleanPro", description: "Оценки и кейсы наших клиентов.", url: getCanonical("/otzivi") },
  };
}

export default function ReviewsPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Клининговые услуги CleanPro",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "147" },
    review: testimonials.map((item) => ({ "@type": "Review", reviewRating: { "@type": "Rating", ratingValue: item.rating }, author: { "@type": "Person", name: item.name }, reviewBody: item.text })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <h1 className="text-4xl font-extrabold">Отзывы</h1>
      <p className="mt-3 text-slate-600">Публикуем реальные мнения клиентов о качестве нашей работы.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-slate-500">{item.role}</p><p className="mt-2 text-amber-500">{"★".repeat(item.rating)}</p><p className="mt-3 text-slate-700">{item.text}</p></article>
        ))}
      </div>
    </div>
  );
}

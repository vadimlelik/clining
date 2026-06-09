import type { Metadata } from "next";
import { getCanonical, siteConfig, testimonials } from "@/lib/site";
import { getReviewsPageSchema, getTestimonialsAggregateRating } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return {
    title: "Выездная химчистка — отзывы клиентов",
    description:
      "Отзывы о выездной химчистке мебели и ковров на дому в Минске: диваны, матрасы, ковры, кожаная мебель. Оценки клиентов CleanPro (chistkaminsk.ru).",
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
  const aggregateRating = getTestimonialsAggregateRating();
  const reviewSchema = getReviewsPageSchema();

  return (
    <div className="page-container py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <h1 className="text-4xl font-extrabold">Отзывы о выездной химчистке</h1>
      <p className="mt-3 text-slate-600">
        Отзывы клиентов {siteConfig.name} ({siteConfig.domainLabel}) о химчистке мебели и ковров на дому в Минске.
        {aggregateRating ? (
          <>
            {" "}
            Средняя оценка по отзывам на сайте: {aggregateRating.ratingValue} из 5 ({aggregateRating.reviewCount}{" "}
            {Number(aggregateRating.reviewCount) === 1 ? "отзыв" : "отзыва"}).
          </>
        ) : null}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="card-surface-hover p-6">
            <p className="font-semibold">{item.name}</p>
            <p className="mt-1 text-sm text-slate-500">{item.role}</p>
            <p className="mt-2 text-amber-500">{"★".repeat(item.rating)}</p>
            <p className="mt-3 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

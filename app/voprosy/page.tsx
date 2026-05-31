import type { Metadata } from "next";
import { faqItems, getCanonical } from "@/lib/site";
import { getFaqSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return {
    title: "Вопросы и ответы",
    description: "Ответы на частые вопросы о клининге: сроки, цены, инвентарь, оформление заказов.",
    keywords: ["частые вопросы химчистка", "faq химчистка мебели", "вопросы химчистка минск"],
    alternates: { canonical: getCanonical("/voprosy") },
    openGraph: { title: "FAQ - CleanPro", description: "Частые вопросы клиентов о клининговых услугах.", url: getCanonical("/voprosy") },
  };
}

export default function FaqPage() {
  const faqSchema = getFaqSchema(faqItems);

  return (
    <div className="page-container max-w-4xl py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-4xl font-extrabold">Вопросы и ответы</h1>
      <div className="mt-8 grid gap-3">
        {faqItems.map((faq) => (
          <details key={faq.question} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-2 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

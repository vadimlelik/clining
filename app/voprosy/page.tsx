import type { Metadata } from "next";
import { faqItems, getCanonical } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Вопросы и ответы",
    description: "Ответы на частые вопросы о клининге: сроки, цены, инвентарь, оформление заказов.",
    keywords: ["частые вопросы клининг", "faq уборка", "вопросы клининговая компания"],
    alternates: { canonical: getCanonical("/voprosy") },
    openGraph: { title: "FAQ - CleanPro", description: "Частые вопросы клиентов о клининговых услугах.", url: getCanonical("/voprosy") },
  };
}

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-4xl font-extrabold">Вопросы и ответы</h1>
      <div className="mt-8 grid gap-3">
        {faqItems.map((faq) => (
          <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-2 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

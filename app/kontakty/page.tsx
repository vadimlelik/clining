import type { Metadata } from "next";
import { faqItems, getCanonical, siteConfig } from "@/lib/site";
import { getFaqSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return {
    title: "Контакты",
    description: "Контакты клининговой компании CleanPro: телефон, email, адрес и режим работы.",
    keywords: ["контакты химчистка минск", "химчистка мебели минск контакты"],
    alternates: { canonical: getCanonical("/kontakty") },
    openGraph: { title: "Контакты - CleanPro", description: "Свяжитесь с нами для расчета стоимости и заказа химчистки.", url: getCanonical("/kontakty") },
  };
}

export default function ContactsPage() {
  const contactFaq = faqItems.filter((item) => item.question.includes("выезд") || item.question.includes("стоит"));
  const faqSchema = contactFaq.length > 0 ? getFaqSchema(contactFaq) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      <h1 className="text-4xl font-extrabold">Контакты</h1>
      <p className="mt-2 text-slate-600">
        {siteConfig.name} · {siteConfig.domainLabel} — выездная химчистка в Минске и области.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Свяжитесь с нами</h2>
          <p className="mt-3 text-slate-700">
            Телефон:{" "}
            <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="text-sky-700 hover:underline">
              {siteConfig.phone}
            </a>
          </p>
          <p className="text-slate-700">
            E-mail:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-sky-700 hover:underline">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-2 text-slate-700">Адрес: {siteConfig.address}</p>
          <p className="text-slate-700">График: ежедневно 08:00-22:00</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-sky-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Зона обслуживания</h2>
          <p className="mt-3 text-slate-700">Минск и Минская область.</p>
          <p className="mt-2 text-sm text-slate-600">Для корпоративных клиентов возможен индивидуальный SLA и выделенный менеджер.</p>
        </article>
      </div>
    </div>
  );
}

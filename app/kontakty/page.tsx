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
    <div className="page-container py-8 md:py-10">
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      <section className="rounded-3xl border border-brand-100/80 bg-hero-mesh bg-white p-8 shadow-card md:p-10">
        <p className="badge-soft w-fit">Связь с нами</p>
        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">Контакты</h1>
        <p className="mt-2 text-slate-600">
          {siteConfig.name} · {siteConfig.domainLabel} — выездная химчистка в Минске и области.
        </p>
      </section>
      <div className="section-gap grid gap-4 md:grid-cols-2">
        <article className="card-surface p-6">
          <h2 className="text-xl font-semibold">Свяжитесь с нами</h2>
          <p className="mt-3 text-slate-700">
            Телефон:{" "}
            <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="text-brand-700 hover:underline">
              {siteConfig.phone}
            </a>
          </p>
          <p className="text-slate-700">
            E-mail:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand-700 hover:underline">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-2 text-slate-700">Адрес: {siteConfig.address}</p>
          <p className="text-slate-700">График: ежедневно 08:00-22:00</p>
        </article>
        <article className="card-surface border-brand-100 bg-brand-50/50 p-6">
          <h2 className="text-xl font-semibold">Зона обслуживания</h2>
          <p className="mt-3 text-slate-700">Минск и Минская область.</p>
          <p className="mt-2 text-sm text-slate-600">Для корпоративных клиентов возможен индивидуальный SLA и выделенный менеджер.</p>
        </article>
      </div>
    </div>
  );
}

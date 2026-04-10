import type { Metadata } from "next";
import Link from "next/link";
import { CostCalculator } from "@/components/cost-calculator";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { LeadForm } from "@/components/lead-form";
import { faqItems, getCanonical, services, siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Химчистка мебели в Минске",
    description: "CleanPro - химчистка диванов, матрасов, ковров и кресел в Минске. Оставьте заявку и получите расчет стоимости за 30 секунд.",
    keywords: ["химчистка мебели минск", "химчистка дивана минск", "химчистка матраса минск", "чистка ковров минск", "удаление запаха дивана"],
    alternates: { canonical: getCanonical("/") },
    openGraph: { title: "CleanPro - клининг в Москве", description: "Современный клининг с гарантией качества и фиксированной ценой.", url: getCanonical("/") },
  };
}

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    name: siteConfig.name,
    description: "Профессиональная химчистка мебели в Минске",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: siteConfig.region, addressCountry: "BY" },
    openingHours: "Mo-Su 08:00-22:00",
    priceRange: "от 5 BYN",
    url: siteConfig.url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="rounded-3xl bg-gradient-to-r from-sky-50 to-emerald-50 p-8 md:p-12">
        <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700">Химчистка мебели в Минске и области</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">Удаляем пятна и запахи с диванов, матрасов и ковров. Быстро, безопасно, с гарантией.</h1>
        <p className="mt-4 max-w-2xl text-slate-700">Выезд в день обращения, фиксированная цена до начала работ и профессиональное оборудование.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#calculator" className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">Рассчитать стоимость</Link>
          <Link href="/uslugi" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-sky-300">Смотреть услуги</Link>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[{ value: "4 800+", label: "клиентов" }, { value: "9 лет", label: "на рынке" }, { value: "16 000+", label: "выполненных заказов" }].map((item) => (
          <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"><p className="text-3xl font-extrabold text-sky-700">{item.value}</p><p className="mt-1 text-sm text-slate-600">{item.label}</p></article>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold">Популярные услуги</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-slate-600">{service.shortDescription}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-700">{service.priceFrom}</p>
              <Link href={`/uslugi/${service.slug}`} className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">Подробнее →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold">Как мы работаем</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {["Оставляете заявку на сайте", "Присылаете фото мебели в мессенджер", "Подтверждаем цену и время выезда", "Проводим химчистку и сдаем результат по чек-листу"].map((step, index) => (
            <article key={step} className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-bold text-sky-700">Шаг {index + 1}</p><p className="mt-2 text-slate-700">{step}</p></article>
          ))}
        </div>
      </section>

      <section className="mt-14"><CostCalculator /></section>
      <section className="mt-14"><ReviewsCarousel /></section>

      <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold">Почему нам доверяют</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-slate-50 p-5"><p className="font-semibold">Профессиональное оборудование</p><p className="mt-2 text-sm text-slate-600">Используем экстракторные машины и профсредства для глубокой чистки мебели.</p></article>
          <article className="rounded-2xl bg-slate-50 p-5"><p className="font-semibold">Безопасно для детей и животных</p><p className="mt-2 text-sm text-slate-600">Применяем сертифицированную химию и подбираем состав под тип ткани.</p></article>
          <article className="rounded-2xl bg-slate-50 p-5"><p className="font-semibold">Честная фиксированная цена</p><p className="mt-2 text-sm text-slate-600">Согласовываем стоимость заранее, без скрытых доплат после выполнения работ.</p></article>
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold">Частые вопросы</h2>
        <div className="mt-6 grid gap-3">
          {faqItems.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-2 text-slate-600">{faq.answer}</p></details>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl bg-sky-700 p-8 text-white"><h2 className="text-3xl font-bold">Готовы заказать химчистку?</h2><p className="mt-3 text-sky-100">Подберем удобное время, зафиксируем стоимость и выполним работу за один выезд.</p><p className="mt-5 text-sm">Телефон: {siteConfig.phone}</p><p className="text-sm">E-mail: {siteConfig.email}</p></article>
        <LeadForm />
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfterSection } from "@/components/before-after-section";
import { CostCalculator } from "@/components/cost-calculator";
import { HomeHero } from "@/components/home-hero";
import { LeadForm } from "@/components/lead-form";
import { ProcessSteps } from "@/components/process-steps";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServiceCard } from "@/components/service-card";
import { TrustFeature } from "@/components/trust-feature";
import { VisualStrip } from "@/components/visual-strip";
import { IconDroplet, IconShield, IconSparkles, IconTruck } from "@/components/icons";
import { faqItems, getCanonical, minskDistricts, services, siteConfig } from "@/lib/site";
import { getFaqSchema, getServiceCatalogSchema } from "@/lib/schema";

const POPULAR_SERVICE_SLUGS = [
  "divan-dvukhmestnyy",
  "uglovoy-divan",
  "kover",
  "matras",
  "shtory",
  "kozhanyy-divan",
];

export function generateMetadata(): Metadata {
  return {
    title: "Выездная химчистка Минск и Минская область — химчистка на дому",
    description:
      "Выездная химчистка мебели, ковров и мягкой мебели в Минске и Минской области. Химчистка на дому диванов, матрасов, ковровых покрытий и штор. Цены и отзывы на сайте; стоимость фиксируем до выезда.",
    keywords: [
      "выездная химчистка",
      "выездная химчистка мебели",
      "выездная химчистка ковров",
      "выездная химчистка мягкой мебели",
      "выездная химчистка минск",
      "выездная химчистка на дом",
      "выездная химчистка мебели на дому",
      "выездная химчистка мебели минск",
      "выездная химчистка диванов",
      "химчистка мебели на дому в минск выездной",
      "химчистка ковров и мебели выездная химчистка",
      "выездная химчистка цены",
      "выездная химчистка отзывы",
      "выездная химчистка матраса",
      "выездная химчистка ковровых покрытий",
      "химчистка на дому",
      "выездная химчистка минская обл",
      "химчистка дивана минск цена",
      "химчистка мягкой мебели цены",
    ],
    alternates: { canonical: getCanonical("/") },
    openGraph: {
      title: "Выездная химчистка на дому — Минск и Минская область | CleanPro",
      description:
        "Выездная химчистка мебели и ковров на дому в Минске и области: диваны, мягкая мебель, шторы, матрасы. Цены фиксируем заранее; отзывы — в разделе «Отзывы».",
      url: getCanonical("/"),
      images: [
        {
          url: "/api/og?title=CleanPro&subtitle=Выездная%20химчистка%20на%20дому%20%E2%80%94%20Минск%20и%20область",
          width: 1200,
          height: 630,
          alt: "CleanPro — выездная химчистка на дому в Минске и Минской области",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Выездная химчистка Минск и Минская область | CleanPro",
      description:
        "Выездная химчистка мебели и ковров: мягкая мебель, диваны, шторы. Цены до выезда, выезд в день обращения по Минску и области.",
      images: [
        "/api/og?title=CleanPro&subtitle=Выездная%20химчистка%20на%20дому%20%E2%80%94%20Минск%20и%20область",
      ],
    },
  };
}

export default function HomePage() {
  const faqSchema = getFaqSchema(faqItems);
  const serviceCatalogSchema = getServiceCatalogSchema();
  const popularServices = POPULAR_SERVICE_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);

  return (
    <div className="page-container py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }} />

      <HomeHero />

      <VisualStrip />

      <section className="section-gap card-surface p-6 md:p-8">
        <h2 className="section-title">Выездная химчистка Минск и Минская область</h2>
        <p className="section-lead">
          Мы специализируемся на{" "}
          <strong className="font-semibold text-slate-800">химчистке на дому</strong> и{" "}
          <strong className="font-semibold text-slate-800">выездной химчистке мебели</strong>: диваны, кресла, матрасы — на месте, без везения в цех. Отдельно делаем{" "}
          <strong className="font-semibold text-slate-800">выездную химчистку ковров</strong> и ковровых покрытий. Удобный сценарий —{" "}
          <strong className="font-semibold text-slate-800">химчистка ковров и мебели</strong> выездной бригадой в один визит. Актуальные{" "}
          <Link href="/ceny" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-800">
            цены
          </Link>{" "}
          и{" "}
          <Link href="/otzivi" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-2 hover:text-brand-800">
            отзывы
          </Link>{" "}
          — на сайте.
        </p>
      </section>

      <section className="section-gap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Популярные услуги</h2>
            <p className="mt-2 text-slate-600">Химчистка с выездом мастера и фиксированной стоимостью</p>
          </div>
          <Link href="/uslugi" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Все услуги →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service) => (
            <ServiceCard key={service!.slug} service={service!} compact />
          ))}
        </div>
      </section>

      <section className="section-gap card-surface p-6 md:p-8">
        <h2 className="section-title">Цены: диваны, ковры и мягкая мебель</h2>
        <p className="section-lead">
          Ориентиры по стоимости. Подробный прайс — на странице{" "}
          <Link href="/ceny" className="font-semibold text-brand-700 hover:text-brand-800">
            «Цены»
          </Link>
          .
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          <li className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
            <p className="font-semibold text-slate-900">Химчистка дивана</p>
            <p className="mt-1 text-sm text-slate-600">от 50–70 BYN в зависимости от размера</p>
            <Link href="/uslugi/divan-dvukhmestnyy" className="mt-3 inline-block text-sm font-semibold text-brand-700">
              Подробнее →
            </Link>
          </li>
          <li className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
            <p className="font-semibold text-slate-900">Чистка штор</p>
            <p className="mt-1 text-sm text-slate-600">от 15 BYN/м² на дому</p>
            <Link href="/uslugi/shtory" className="mt-3 inline-block text-sm font-semibold text-brand-700">
              Подробнее →
            </Link>
          </li>
        </ul>
      </section>

      <section className="section-gap">
        <h2 className="section-title">Как мы работаем</h2>
        <p className="section-lead">От заявки до чистой мебели — обычно один визит</p>
        <div className="mt-6">
          <ProcessSteps />
        </div>
      </section>

      <BeforeAfterSection />

      <section className="section-gap scroll-mt-24" id="calculator">
        <CostCalculator />
      </section>

      <section className="section-gap">
        <ReviewsCarousel />
      </section>

      <section className="section-gap card-surface p-6 md:p-8">
        <h2 className="section-title">Районы Минска</h2>
        <p className="section-lead">Выезд по всем районам — выберите свой для локальной информации</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {minskDistricts.map((district) => (
            <Link
              key={district.slug}
              href={`/rayony/${district.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
            >
              {district.name}
            </Link>
          ))}
        </div>
        <Link href="/rayony" className="mt-5 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
          Все районы →
        </Link>
      </section>

      <section className="section-gap">
        <h2 className="section-title">Почему нам доверяют</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <TrustFeature
            icon={<IconSparkles className="h-6 w-6" />}
            title="Профессиональное оборудование"
            description="Экстракторные машины и профсредства для глубокой чистки обивки."
          />
          <TrustFeature
            icon={<IconShield className="h-6 w-6" />}
            title="Безопасно для семьи"
            description="Сертифицированная химия, подбор состава под тип ткани и кожи."
          />
          <TrustFeature
            icon={<IconTruck className="h-6 w-6" />}
            title="Честная цена"
            description="Согласовываем стоимость до выезда — без скрытых доплат."
          />
        </div>
      </section>

      <section className="section-gap card-surface p-6 md:p-8">
        <h2 className="section-title">Частые вопросы</h2>
        <div className="mt-6 grid gap-3">
          {faqItems.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-100 bg-slate-50/80 p-4 open:bg-white open:shadow-sm">
              <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2">
                  {faq.question}
                  <span className="text-brand-500 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
        <Link href="/voprosy" className="mt-5 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
          Все вопросы →
        </Link>
      </section>

      <section className="section-gap grid gap-6 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-glow">
          <IconDroplet className="absolute -right-4 -top-4 h-32 w-32 text-white/10" />
          <h2 className="relative text-2xl font-extrabold md:text-3xl">Готовы заказать химчистку?</h2>
          <p className="relative mt-3 text-brand-100">Подберём время, зафиксируем стоимость и приедем в удобный день.</p>
          <p className="relative mt-6 text-sm text-brand-50">Телефон: {siteConfig.phone}</p>
          <p className="relative text-sm text-brand-50">{siteConfig.email}</p>
          <Link href="#calculator" className="relative btn-secondary mt-6 border-white/30 bg-white text-brand-900 hover:bg-brand-50">
            Рассчитать и оставить заявку
          </Link>
        </article>
        <LeadForm />
      </section>
    </div>
  );
}

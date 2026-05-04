import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfterSection } from "@/components/before-after-section";
import { CostCalculator } from "@/components/cost-calculator";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { LeadForm } from "@/components/lead-form";
import { faqItems, getCanonical, getPriceFromNumber, getSiteUrl, minskDistricts, services, siteConfig } from "@/lib/site";

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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    name: siteConfig.name,
    description:
      "Выездная химчистка мебели и ковров на дому в Минске и Минской области: диваны, матрасы, ковровые покрытия, шторы и мягкая мебель. Химчистка с выездом мастера, фиксированная стоимость до начала работ.",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: [
      { "@type": "City", name: "Минск" },
      { "@type": "AdministrativeArea", name: "Минская область" },
    ],
    address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: siteConfig.region, addressCountry: siteConfig.country },
    openingHours: siteConfig.openingHours,
    priceRange: "от 5 BYN",
    url: getSiteUrl(),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        areaServed: ["Минск", "Минская область"],
        provider: { "@type": "LocalBusiness", name: siteConfig.name },
        offers: {
          "@type": "Offer",
          priceCurrency: "BYN",
          ...(getPriceFromNumber(service.priceFrom) ? { price: getPriceFromNumber(service.priceFrom) } : {}),
          url: `${getSiteUrl()}/uslugi/${service.slug}`,
        },
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }} />

      <section className="rounded-3xl bg-gradient-to-r from-sky-50 to-emerald-50 p-8 md:p-12">
        <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700">
          Выездная химчистка · Минск и Минская область
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
          Удаляем пятна и запахи с диванов, матрасов и ковров. Быстро, безопасно, с гарантией.
        </h1>
        <p className="mt-3 max-w-2xl text-lg font-medium text-slate-800">
          Химчистка на дому: мастер приезжает с оборудованием — без самовывоза и ожидания в цеху.
        </p>
        <p className="mt-4 max-w-2xl text-slate-700">
          Выездная химчистка мебели, в том числе диванов и мягкой мебели в Минске и Минской области, с прозрачной{" "}
          <Link href="/ceny" className="font-semibold text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">
            ценой
          </Link>
          : чистка штор, кресел и матрасов. Выезд в день обращения, стоимость фиксируем до начала работ, профессиональное оборудование.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#calculator" className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">Рассчитать стоимость</Link>
          <Link href="/uslugi" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-sky-300">Смотреть услуги</Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Выездная химчистка Минск и Минская область</h2>
        <p className="mt-3 text-slate-600">
          Мы специализируемся на{" "}
          <strong className="font-semibold text-slate-800">химчистке на дому</strong> и{" "}
          <strong className="font-semibold text-slate-800">выездной химчистке мебели</strong>: диваны, кресла, матрасы — на месте, без везения в цех. Отдельно делаем{" "}
          <strong className="font-semibold text-slate-800">выездную химчистку ковров</strong> и ковровых покрытий (паласы, крупные ковры). Удобный сценарий —{" "}
          <strong className="font-semibold text-slate-800">химчистка ковров и мебели</strong> выездной бригадой в один визит. Работаем по Минску и{" "}
          <strong className="font-semibold text-slate-800">Минской области</strong>; время и стоимость согласуем заранее. Актуальные{" "}
          <Link href="/ceny" className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-2 hover:text-sky-800">
            цены на выездную химчистку
          </Link>{" "}
          и{" "}
          <Link href="/otzivi" className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-2 hover:text-sky-800">
            отзывы
          </Link>{" "}
          — на сайте; по коврам и матрасам —{" "}
          <Link href="/uslugi/kover" className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-2 hover:text-sky-800">
            ковры
          </Link>
          ,{" "}
          <Link href="/uslugi/matras" className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-2 hover:text-sky-800">
            матрасы
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[{ value: "4 800+", label: "клиентов" }, { value: "9 лет", label: "на рынке" }, { value: "16 000+", label: "выполненных заказов" }].map((item) => (
          <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"><p className="text-3xl font-extrabold text-sky-700">{item.value}</p><p className="mt-1 text-sm text-slate-600">{item.label}</p></article>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Цены: выездная химчистка в Минске — диваны, ковры и мягкая мебель
        </h2>
        <p className="mt-3 text-slate-600">
          Ниже — ориентиры по стоимости и ссылки на карточки услуг. Подробный прайс — на странице{" "}
          <Link href="/ceny" className="font-semibold text-sky-700 hover:text-sky-800">
            «Цены»
          </Link>
          ; разбор факторов цены — в статье{" "}
          <Link href="/blog/skolko-stoit-himchistka-divana-v-minske" className="font-semibold text-sky-700 hover:text-sky-800">
            «Сколько стоит химчистка дивана в Минске»
          </Link>
          .
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          <li className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Химчистка дивана (Минск) — цена</p>
            <p className="mt-1 text-sm text-slate-600">от 50 BYN (2-местный), от 60 BYN (3-местный), от 70 BYN (угловой)</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
              <Link href="/uslugi/divan-dvukhmestnyy" className="text-sky-700 hover:text-sky-800">
                Двухместный
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/uslugi/divan-trekhmestnyy" className="text-sky-700 hover:text-sky-800">
                Трёхместный
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/uslugi/uglovoy-divan" className="text-sky-700 hover:text-sky-800">
                Угловой
              </Link>
            </div>
          </li>
          <li className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Чистка штор в Минске</p>
            <p className="mt-1 text-sm text-slate-600">от 15 BYN/м², выезд и бережная обработка ткани</p>
            <Link href="/uslugi/shtory" className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
              Химчистка штор — подробнее →
            </Link>
          </li>
          <li className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
            <p className="font-semibold text-slate-900">Химчистка мягкой мебели — стоимость</p>
            <p className="mt-1 text-sm text-slate-600">Кресла, стулья, подушки и кожаные модели — смотрите полный список услуг и рассчитайте сумму в калькуляторе ниже.</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href="/uslugi" className="text-sky-700 hover:text-sky-800">
                Все услуги
              </Link>
              <Link href="#calculator" className="text-emerald-700 hover:text-emerald-800">
                Калькулятор стоимости
              </Link>
            </div>
          </li>
        </ul>
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

      <BeforeAfterSection />

      <section className="mt-14"><CostCalculator /></section>
      <section className="mt-14"><ReviewsCarousel /></section>

      <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold">Работаем по всем районам Минска</h2>
        <p className="mt-3 text-slate-600">Выберите район и перейдите на локальную страницу услуги для более точной информации по выезду.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {minskDistricts.map((district) => (
            <Link key={district.slug} href={`/rayony/${district.slug}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-sky-300 hover:text-sky-700">
              {district.name}
            </Link>
          ))}
        </div>
        <Link href="/rayony" className="mt-5 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
          Смотреть все локальные страницы →
        </Link>
      </section>

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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCanonical,
  getPriceFromNumber,
  getRelatedPostsForService,
  getServiceFaqItems,
  getServicePageSeo,
  getServiceSeoContent,
  getSiteUrl,
  siteConfig,
  services,
} from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Услуга не найдена" };
  const canonical = getCanonical(`/uslugi/${service.slug}`);
  const ogImage = `/api/og?title=${encodeURIComponent(service.title)}&subtitle=${encodeURIComponent("Химчистка мебели в Минске")}`;
  const seo = getServicePageSeo(service);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const relatedPosts = getRelatedPostsForService(service.slug);
  const serviceUrl = getCanonical(`/uslugi/${service.slug}`);
  const serviceFaqItems = getServiceFaqItems(service);
  const serviceSeoContent = getServiceSeoContent(service);
  const servicePrice = getPriceFromNumber(service.priceFrom);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: getSiteUrl() },
      { "@type": "ListItem", position: 2, name: "Услуги", item: getCanonical("/uslugi") },
      { "@type": "ListItem", position: 3, name: service.title, item: serviceUrl },
    ],
  };
  const serviceFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription,
    areaServed: { "@type": "City", name: siteConfig.region },
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: getSiteUrl() },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BYN",
      ...(servicePrice ? { price: servicePrice } : {}),
      url: serviceUrl,
      category: "Химчистка мебели",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <nav aria-label="breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-700">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/uslugi" className="hover:text-sky-700">
          Услуги
        </Link>{" "}
        / <span className="text-slate-700">{service.title}</span>
      </nav>
      <h1 className="text-4xl font-extrabold">{service.title}</h1>
      <p className="mt-3 text-slate-600">{service.fullDescription}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-sky-50 p-5"><p className="text-sm text-slate-600">Стоимость</p><p className="text-2xl font-bold text-sky-700">{service.priceFrom}</p></article>
        <article className="rounded-2xl bg-emerald-50 p-5"><p className="text-sm text-slate-600">Время выполнения</p><p className="text-2xl font-bold text-emerald-700">{service.duration}</p></article>
      </div>
      <h2 className="mt-8 text-2xl font-bold">Что входит</h2>
      <ul className="mt-4 grid gap-3">
        {service.includes.map((item) => (<li key={item} className="rounded-xl border border-slate-200 p-4 text-slate-700">{item}</li>))}
      </ul>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">{serviceSeoContent.title}</h2>
        <div className="mt-4 space-y-4 text-slate-700">
          {serviceSeoContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {serviceSeoContent.highlights.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-900">Частые вопросы по услуге</h2>
        <div className="mt-4 grid gap-3">
          {serviceFaqItems.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 p-4">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-2 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      {relatedPosts.length > 0 ? (
        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold">Полезные статьи по теме</h2>
          <ul className="mt-4 grid gap-2">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-sky-700 hover:text-sky-800">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

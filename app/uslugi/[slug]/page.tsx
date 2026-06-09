import type { Metadata } from "next";
import Link from "next/link";
import { SiteImage } from "@/components/site-image";
import { notFound } from "next/navigation";
import { getServiceImage } from "@/lib/site-images";
import {
  getCanonical,
  getPriceFromNumber,
  getRelatedPostsForService,
  getServiceFaqItems,
  getServicePageSeo,
  getServiceSeoContent,
  services,
} from "@/lib/site";
import { getBreadcrumbSchema, getFaqSchema, getLocalBusinessProviderRef } from "@/lib/schema";

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
  const cover = getServiceImage(service.slug);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Главная", item: getCanonical("/") },
    { name: "Услуги", item: getCanonical("/uslugi") },
    { name: service.title, item: serviceUrl },
  ]);
  const serviceFaqSchema = getFaqSchema(serviceFaqItems);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription,
    areaServed: { "@type": "City", name: "Минск" },
    provider: getLocalBusinessProviderRef(),
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
    <div className="page-container max-w-4xl py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <nav aria-label="breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/uslugi" className="hover:text-brand-700">
          Услуги
        </Link>{" "}
        / <span className="text-slate-700">{service.title}</span>
      </nav>
      <div className="relative mt-6 aspect-[21/9] min-h-[180px] overflow-hidden rounded-2xl shadow-card ring-1 ring-brand-100">
        <SiteImage src={cover.src} alt={cover.alt} fill className="object-cover" priority sizes="(max-width: 896px) 100vw, 896px" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/25 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">{service.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-white/90 md:text-base">{service.shortDescription}</p>
        </div>
      </div>
      <h1 className="sr-only">{service.title}</h1>
      <p className="mt-3 text-slate-600">{service.fullDescription}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100"><p className="text-sm text-slate-600">Стоимость</p><p className="text-2xl font-bold text-brand-700">{service.priceFrom}</p></article>
        <article className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100"><p className="text-sm text-slate-600">Время выполнения</p><p className="text-2xl font-bold text-emerald-700">{service.duration}</p></article>
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
                <Link href={`/blog/${post.slug}`} className="font-semibold text-brand-700 hover:text-brand-800">
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

import { getPriceFromNumber, getSiteUrl, services, siteConfig, testimonials, type FaqItem } from "@/lib/site";

export const LOCAL_BUSINESS_ID = "#localbusiness";

export function getDefaultOgImageUrl(): string {
  const base = getSiteUrl();
  const subtitle = encodeURIComponent("Выездная химчистка на дому — Минск и область");
  return `${base}/api/og?title=${encodeURIComponent(siteConfig.name)}&subtitle=${subtitle}`;
}

export function getLocalBusinessId(): string {
  return `${getSiteUrl()}${LOCAL_BUSINESS_ID}`;
}

export function getLocalBusinessSchema() {
  const url = getSiteUrl();
  const sameAs = siteConfig.sameAs.filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": getLocalBusinessId(),
    name: siteConfig.name,
    alternateName: [siteConfig.alternateName, siteConfig.domainLabel],
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: getDefaultOgImageUrl(),
    areaServed: [
      { "@type": "City", name: "Минск" },
      { "@type": "AdministrativeArea", name: "Минская область" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.region,
      addressRegion: "Минская область",
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHours: siteConfig.openingHours,
    priceRange: siteConfig.priceRange,
    url,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function getWebSiteSchema() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    name: siteConfig.name,
    alternateName: siteConfig.domainLabel,
    url,
    inLanguage: "ru-BY",
    publisher: { "@id": getLocalBusinessId() },
  };
}

export function getLocalBusinessProviderRef() {
  return { "@id": getLocalBusinessId() };
}

export function getFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function getTestimonialsAggregateRating() {
  if (testimonials.length === 0) return null;
  const total = testimonials.reduce((sum, item) => sum + item.rating, 0);
  const average = total / testimonials.length;
  return {
    "@type": "AggregateRating" as const,
    ratingValue: average.toFixed(1),
    reviewCount: String(testimonials.length),
    bestRating: "5",
    worstRating: "1",
  };
}

export function getReviewsPageSchema() {
  const aggregateRating = getTestimonialsAggregateRating();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${getSiteUrl()}/otzivi#service-reviews`,
    name: "Выездная химчистка мебели и ковров",
    provider: getLocalBusinessProviderRef(),
    areaServed: { "@type": "City", name: siteConfig.region },
    ...(aggregateRating ? { aggregateRating } : {}),
    review: testimonials.map((item) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: String(item.rating), bestRating: "5", worstRating: "1" },
      author: { "@type": "Person", name: item.name },
      reviewBody: item.text,
    })),
  };
}

export function getServiceCatalogSchema() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => {
      const price = getPriceFromNumber(service.priceFrom);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
          areaServed: ["Минск", "Минская область"],
          provider: getLocalBusinessProviderRef(),
          url: `${base}/uslugi/${service.slug}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "BYN",
            ...(price ? { price } : {}),
            url: `${base}/uslugi/${service.slug}`,
          },
        },
      };
    }),
  };
}

export function getArticleSchema(input: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    inLanguage: "ru-BY",
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    author: { "@type": "Organization", name: siteConfig.name, url: getSiteUrl() },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
      logo: { "@type": "ImageObject", url: getDefaultOgImageUrl() },
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

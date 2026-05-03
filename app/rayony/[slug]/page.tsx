import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCanonical, getPriceFromNumber, getSiteUrl, minskDistricts, services, siteConfig } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return minskDistricts.map((district) => ({ slug: district.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const district = minskDistricts.find((item) => item.slug === params.slug);
  if (!district) return { title: "Район не найден" };
  const canonical = getCanonical(`/rayony/${district.slug}`);
  const ogImage = `/api/og?title=${encodeURIComponent(`Химчистка мебели в ${district.name}`)}&subtitle=${encodeURIComponent("Выезд в день обращения")}`;

  return {
    title: `Химчистка мебели в ${district.name} Минска`,
    description: `Профессиональная химчистка мебели в ${district.name}. Выезд по району, фиксированная стоимость и безопасная химия.`,
    keywords: [`химчистка мебели ${district.name.toLowerCase()}`, "химчистка дивана минск", "чистка мебели на дому"],
    alternates: { canonical },
    openGraph: {
      title: `Химчистка мебели в ${district.name}`,
      description: "Выезд в день обращения, согласование цены до начала работ.",
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: district.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Химчистка мебели в ${district.name}`,
      description: "Услуги по району Минска с прозрачным прайсом.",
      images: [ogImage],
    },
  };
}

export default function DistrictDetailPage({ params }: Props) {
  const district = minskDistricts.find((item) => item.slug === params.slug);
  if (!district) notFound();

  const districtUrl = getCanonical(`/rayony/${district.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: getSiteUrl() },
      { "@type": "ListItem", position: 2, name: "Районы", item: getCanonical("/rayony") },
      { "@type": "ListItem", position: 3, name: district.name, item: districtUrl },
    ],
  };
  const districtItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Услуги химчистки в ${district.name}`,
    itemListElement: services.slice(0, 8).map((service, index) => {
      const price = getPriceFromNumber(service.priceFrom);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: `${service.title} (${district.name})`,
          description: service.shortDescription,
          areaServed: { "@type": "AdministrativeArea", name: district.name },
          provider: { "@type": "LocalBusiness", name: siteConfig.name, url: getSiteUrl() },
          offers: {
            "@type": "Offer",
            priceCurrency: "BYN",
            ...(price ? { price } : {}),
            url: getCanonical(`/uslugi/${service.slug}`),
            availability: "https://schema.org/InStock",
          },
        },
      };
    }),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(districtItemListSchema) }} />
      <nav aria-label="breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-700">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/rayony" className="hover:text-sky-700">
          Районы
        </Link>{" "}
        / <span className="text-slate-700">{district.name}</span>
      </nav>

      <h1 className="mt-2 text-4xl font-extrabold">Химчистка мебели в {district.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-700">
        Выполняем выездную химчистку диванов, кресел, матрасов и ковров в {district.name.toLowerCase()} Минска. Согласовываем стоимость до начала работ, используем профессиональную
        безопасную химию и даем понятные рекомендации по сушке мебели.
      </p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold">Популярные услуги в районе</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {services.slice(0, 8).map((service) => (
            <article key={service.slug} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.shortDescription}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-700">{service.priceFrom}</p>
              <Link href={`/uslugi/${service.slug}`} className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800">
                Подробнее об услуге →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

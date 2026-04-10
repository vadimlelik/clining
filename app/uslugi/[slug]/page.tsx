import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCanonical, services } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Услуга не найдена" };

  return {
    title: service.title,
    description: service.shortDescription,
    keywords: [service.title, "клининг", "уборка Москва"],
    alternates: { canonical: getCanonical(`/uslugi/${service.slug}`) },
    openGraph: { title: `${service.title} - CleanPro`, description: service.shortDescription, url: getCanonical(`/uslugi/${service.slug}`) },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
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
    </div>
  );
}

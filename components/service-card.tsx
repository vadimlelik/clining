import Link from "next/link";
import { SiteImage } from "@/components/site-image";
import type { ServiceItem } from "@/lib/site";
import { getServiceImage } from "@/lib/site-images";

type Props = { service: ServiceItem; compact?: boolean };

export function ServiceCard({ service, compact }: Props) {
  const image = getServiceImage(service.slug);

  return (
    <article className="group card-surface-hover flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
        <SiteImage
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
        <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur">
          {service.priceFrom}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-800">{service.title}</h3>
        <p className={`mt-2 flex-1 text-slate-600 ${compact ? "text-sm line-clamp-2" : "text-sm"}`}>{service.shortDescription}</p>
        {!compact ? <p className="mt-3 text-xs text-slate-500">⏱ {service.duration}</p> : null}
        <Link
          href={`/uslugi/${service.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2"
        >
          Подробнее
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

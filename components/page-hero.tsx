import type { ReactNode } from "react";
import { SiteImage } from "@/components/site-image";

type Props = {
  badge?: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
};

export function PageHero({ badge, title, description, image, children }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-brand-100/80 bg-hero-mesh bg-white shadow-card">
      <div className={`grid gap-8 p-6 md:p-10 ${image ? "lg:grid-cols-[1fr,min(42%,420px)] lg:items-center" : ""}`}>
        <div>
          {badge ? <p className="badge-soft w-fit">{badge}</p> : null}
          <h1 className={`max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl ${badge ? "mt-4" : ""}`}>
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 md:text-lg">{description}</p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
        {image ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-soft ring-1 ring-brand-100 lg:aspect-[4/3]">
            <SiteImage src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" priority />
          </div>
        ) : null}
      </div>
    </section>
  );
}

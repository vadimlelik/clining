import { SiteImage } from "@/components/site-image";
import { siteImages } from "@/lib/site-images";

export function VisualStrip() {
  return (
    <section className="section-gap" aria-label="Примеры работ и процесса">
      <div className="grid gap-4 md:grid-cols-3">
        {siteImages.strip.map((item) => (
          <figure key={item.caption} className="group relative overflow-hidden rounded-2xl shadow-card">
            <div className="relative aspect-[4/3]">
              <SiteImage
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

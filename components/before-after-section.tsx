"use client";

import { useEffect, useState } from "react";
import type { BeforeAfterItem } from "@/lib/before-after-types";

export function BeforeAfterSection() {
  const [items, setItems] = useState<BeforeAfterItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/before-after");
        if (!res.ok) return;
        const data = (await res.json()) as { items?: BeforeAfterItem[] };
        if (!cancelled) setItems(data.items ?? []);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (items === null) {
    return (
      <section className="section-gap card-surface border-dashed p-10 text-center text-slate-500" id="do-posle">
        Загрузка галереи…
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="section-gap scroll-mt-24 card-surface p-6 md:p-10" id="do-posle">
      <h2 className="section-title">До и после</h2>
      <p className="section-lead">Реальные результаты химчистки мебели и текстиля</p>
      <div className="mt-8 grid gap-10">
        {items.map((item) => (
          <figure key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">До</p>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.beforeUrl} alt="До химчистки" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-700">После</p>
                <div className="overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm ring-1 ring-brand-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.afterUrl} alt="После химчистки" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
            {item.caption ? (
              <figcaption className="mt-4 text-center text-sm text-slate-600 md:text-left">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

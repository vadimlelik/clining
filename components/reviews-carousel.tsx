"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/site";

export function ReviewsCarousel() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  return (
    <div className="card-surface p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-extrabold text-slate-900">Отзывы клиентов</h3>
        <p className="text-amber-500" aria-label={`Оценка ${item.rating} из 5`}>
          {"★".repeat(item.rating)}
          <span className="text-slate-300">{"★".repeat(5 - item.rating)}</span>
        </p>
      </div>
      <blockquote className="mt-6 text-lg leading-relaxed text-slate-700">&ldquo;{item.text}&rdquo;</blockquote>
      <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
        <Image src={item.avatar} alt="" width={52} height={52} className="rounded-full bg-brand-50 ring-2 ring-brand-100" />
        <div>
          <p className="font-bold text-slate-900">{item.name}</p>
          <p className="text-sm text-slate-500">{item.role}</p>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Показать отзыв ${index + 1}`}
            aria-current={active === index}
            className={`h-2 flex-1 rounded-full transition ${active === index ? "bg-brand-600" : "bg-slate-200 hover:bg-brand-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

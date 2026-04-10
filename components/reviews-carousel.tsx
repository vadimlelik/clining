"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/site";

export function ReviewsCarousel() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">Отзывы клиентов</h3>
      <div className="mt-4 flex items-center gap-4">
        <Image src={item.avatar} alt={item.name} width={56} height={56} className="rounded-full bg-slate-100" />
        <div><p className="font-semibold text-slate-900">{item.name}</p><p className="text-sm text-slate-500">{item.role}</p></div>
      </div>
      <p className="mt-4 text-slate-700">{item.text}</p>
      <p className="mt-2 text-amber-500">{"★".repeat(item.rating)}</p>
      <div className="mt-5 flex gap-2">
        {testimonials.map((_, index) => (
          <button key={index} type="button" onClick={() => setActive(index)} aria-label={`Показать отзыв ${index + 1}`} className={`h-2.5 w-8 rounded-full ${active === index ? "bg-sky-600" : "bg-slate-300"}`} />
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClose, IconMenu, IconPhone } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/ceny", label: "Цены" },
  { href: "/otzivi", label: "Отзывы" },
  { href: "/blog", label: "Блог" },
  { href: "/voprosy", label: "Вопросы" },
  { href: "/kontakty", label: "Контакты" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm"
        aria-label="Открыть меню"
      >
        <IconMenu />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <span className="text-lg font-extrabold text-brand-800">{siteConfig.name}</span>
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-600" aria-label="Закрыть меню">
              <IconClose />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-brand-50 hover:text-brand-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 border-t border-slate-100 p-4">
            <a href={phoneHref} className="btn-secondary w-full gap-2">
              <IconPhone />
              {siteConfig.phone}
            </a>
            <Link href="/#calculator" onClick={() => setOpen(false)} className="btn-primary w-full">
              Рассчитать стоимость
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

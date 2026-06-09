import Link from "next/link";
import { IconDroplet } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/ceny", label: "Цены" },
  { href: "/rayony", label: "Районы" },
  { href: "/blog", label: "Блог" },
  { href: "/voprosy", label: "FAQ" },
  { href: "/kontakty", label: "Контакты" },
];

export function Footer() {
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="mt-auto border-t border-brand-100/80 bg-gradient-to-b from-white to-brand-50/50">
      <div className="page-container grid gap-10 py-12 md:grid-cols-12 md:py-14">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <IconDroplet className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold text-brand-900">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
            Выездная химчистка мягкой мебели и ковров на дому в Минске и Минской области. Фиксируем цену до выезда.
          </p>
          <p className="mt-2 text-xs text-slate-500">{siteConfig.domainLabel}</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-bold text-slate-900">Разделы</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-600 transition hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-sm font-bold text-slate-900">Контакты</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <a href={phoneHref} className="font-semibold text-brand-800 hover:underline">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-700 hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
            <li>Ежедневно 08:00–22:00</li>
          </ul>
          <Link href="/#calculator" className="btn-primary mt-6 w-full sm:w-auto">
            Оставить заявку
          </Link>
        </div>
      </div>
      <div className="border-t border-brand-100/60 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. Выездная химчистка в Минске и области.
      </div>
    </footer>
  );
}

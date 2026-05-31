import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { IconDroplet, IconPhone, IconSparkles } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/ceny", label: "Цены" },
  { href: "/otzivi", label: "Отзывы" },
  { href: "/voprosy", label: "Вопросы" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="page-container flex items-center justify-between gap-3 py-3 md:py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
            <IconDroplet className="h-5 w-5" />
            <IconSparkles className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-brand-100" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-brand-900">{siteConfig.name}</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:block">
              химчистка на дому
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={phoneHref}
            className="hidden items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-100 lg:inline-flex"
          >
            <IconPhone className="h-4 w-4" />
            <span className="max-w-[9rem] truncate">{siteConfig.phone}</span>
          </a>
          <Link href="/#calculator" className="btn-primary hidden sm:inline-flex">
            Рассчитать
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

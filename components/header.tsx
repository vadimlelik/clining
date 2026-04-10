import Link from "next/link";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/ceny", label: "Цены" },
  { href: "/otzivi", label: "Отзывы" },
  { href: "/blog", label: "Блог" },
  { href: "/voprosy", label: "Вопросы" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-extrabold text-sky-700">
          CleanPro
        </Link>
        <nav className="hidden gap-5 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-emerald-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/#calculator" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
          Рассчитать стоимость
        </Link>
      </div>
    </header>
  );
}

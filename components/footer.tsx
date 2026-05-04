import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-lg font-bold text-sky-700">{siteConfig.name}</h3>
          <p className="mt-2 text-sm text-slate-600">
            Выездная химчистка на дому: мягкая мебель и ковры в Минске и Минской области.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Контакты</p>
          <p className="mt-2 text-sm text-slate-600">{siteConfig.phone}</p>
          <p className="text-sm text-slate-600">{siteConfig.email}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Адрес</p>
          <p className="mt-2 text-sm text-slate-600">{siteConfig.address}</p>
          <p className="text-sm text-slate-600">Ежедневно: 08:00-22:00</p>
        </div>
      </div>
    </footer>
  );
}

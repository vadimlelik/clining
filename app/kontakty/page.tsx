import type { Metadata } from "next";
import { getCanonical, siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Контакты",
    description: "Контакты клининговой компании CleanPro: телефон, email, адрес и режим работы.",
    keywords: ["контакты клининг", "клининг Москва контакты"],
    alternates: { canonical: getCanonical("/kontakty") },
    openGraph: { title: "Контакты - CleanPro", description: "Свяжитесь с нами для расчета стоимости и заказа уборки.", url: getCanonical("/kontakty") },
  };
}

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Контакты</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Свяжитесь с нами</h2>
          <p className="mt-3 text-slate-700">Телефон: {siteConfig.phone}</p>
          <p className="text-slate-700">E-mail: {siteConfig.email}</p>
          <p className="mt-2 text-slate-700">Адрес: {siteConfig.address}</p>
          <p className="text-slate-700">График: ежедневно 08:00-22:00</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-sky-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Зона обслуживания</h2>
          <p className="mt-3 text-slate-700">Москва и ближайшее Подмосковье.</p>
          <p className="mt-2 text-sm text-slate-600">Для корпоративных клиентов возможен индивидуальный SLA и выделенный менеджер.</p>
        </article>
      </div>
    </div>
  );
}

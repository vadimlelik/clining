import type { Metadata } from "next";
import Link from "next/link";
import { getCanonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Запрошенная страница не найдена. Перейдите в основные разделы сайта CleanPro.",
  alternates: { canonical: getCanonical("/404") },
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Ошибка 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Страница не найдена</h1>
      <p className="mx-auto mt-4 max-w-2xl text-slate-600">
        Возможно, ссылка устарела или адрес введен с ошибкой. Используйте разделы ниже, чтобы быстро перейти к нужной информации.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
          На главную
        </Link>
        <Link href="/uslugi" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-sky-300">
          Услуги
        </Link>
        <Link href="/blog" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:border-sky-300">
          Блог
        </Link>
      </div>
    </div>
  );
}

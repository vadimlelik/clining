import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getCanonical } from "@/lib/site";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return {
    title: "Блог",
    description: "Полезные статьи о клининге: советы, чек-листы, подбор услуг и расчет стоимости.",
    keywords: ["блог клининг", "советы по уборке", "клининг статьи"],
    alternates: { canonical: getCanonical("/blog") },
    openGraph: { title: "Блог CleanPro", description: "Практические материалы по клинингу для дома и бизнеса.", url: getCanonical("/blog") },
    robots: { index: true, follow: true },
  };
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-extrabold">Блог</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs text-slate-500">{post.date}</p>
            <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-slate-600">{post.description}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-sky-700">Читать статью →</Link>
          </article>
        ))}
      </div>
      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Полезные разделы</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/uslugi" className="text-sky-700 hover:text-sky-800">
            Все услуги химчистки
          </Link>
          <Link href="/ceny" className="text-sky-700 hover:text-sky-800">
            Актуальные цены
          </Link>
          <Link href="/kontakty" className="text-sky-700 hover:text-sky-800">
            Контакты и заказ
          </Link>
        </div>
      </section>
    </div>
  );
}

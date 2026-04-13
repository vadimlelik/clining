import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getCanonical, getServicesBySlugs, getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Статья не найдена" };

  return {
    title: post.title,
    description: post.description,
    keywords: ["клининг", "советы по уборке", post.title],
    alternates: { canonical: getCanonical(`/blog/${post.slug}`) },
    openGraph: { title: post.title, description: post.description, url: getCanonical(`/blog/${post.slug}`), type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const relatedServices = getServicesBySlugs(post.relatedServiceSlugs);
  const postUrl = getCanonical(`/blog/${post.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: getSiteUrl() },
      { "@type": "ListItem", position: 2, name: "Блог", item: getCanonical("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav aria-label="breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-700">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-sky-700">
          Блог
        </Link>{" "}
        / <span className="text-slate-700">{post.title}</span>
      </nav>
      <p className="text-sm text-slate-500">{post.date}</p>
      <h1 className="mt-2 text-4xl font-extrabold">{post.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{post.description}</p>
      <div className="mt-8 space-y-4 text-slate-700">
        {post.content.map((paragraph, idx) => (<p key={idx}>{paragraph}</p>))}
      </div>
      {relatedServices.length > 0 ? (
        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">Релевантные услуги</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
            {relatedServices.map((service) => (
              <Link key={service.slug} href={`/uslugi/${service.slug}`} className="text-sky-700 hover:text-sky-800">
                {service.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

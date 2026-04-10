import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getCanonical } from "@/lib/site";

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <p className="text-sm text-slate-500">{post.date}</p>
      <h1 className="mt-2 text-4xl font-extrabold">{post.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{post.description}</p>
      <div className="mt-8 space-y-4 text-slate-700">
        {post.content.map((paragraph, idx) => (<p key={idx}>{paragraph}</p>))}
      </div>
    </article>
  );
}

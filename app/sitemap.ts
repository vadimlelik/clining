import type { MetadataRoute } from "next";
import { blogPosts, getSiteUrl, services } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticRoutes = ["", "/uslugi", "/ceny", "/otzivi", "/blog", "/kontakty", "/voprosy"];
  const staticItems = staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 }));
  const serviceItems = services.map((service) => ({ url: `${base}/uslugi/${service.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 }));
  const blogItems = blogPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...staticItems, ...serviceItems, ...blogItems];
}

import type { MetadataRoute } from "next";
import { blogPosts, services, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/uslugi", "/ceny", "/otzivi", "/blog", "/kontakty", "/voprosy"];
  const staticItems = staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 }));
  const serviceItems = services.map((service) => ({ url: `${siteConfig.url}/uslugi/${service.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 }));
  const blogItems = blogPosts.map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...staticItems, ...serviceItems, ...blogItems];
}

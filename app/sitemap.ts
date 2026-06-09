import type { MetadataRoute } from "next";
import { blogPosts, getSiteUrl, minskDistricts, services } from "@/lib/site";
import { getSitemapUrls } from "@/lib/sitemap-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const blogDates = new Map(blogPosts.map((post) => [`${base}/blog/${post.slug}`, new Date(post.date)]));
  const serviceSlugs = new Set(services.map((s) => `${base}/uslugi/${s.slug}`));
  const districtSlugs = new Set(minskDistricts.map((d) => `${base}/rayony/${d.slug}`));

  return getSitemapUrls().map((url) => {
    const isHome = url === base || url === `${base}/`;
    const isBlog = blogDates.has(url);
    const isService = serviceSlugs.has(url);
    const isDistrict = districtSlugs.has(url);

    return {
      url,
      lastModified: blogDates.get(url) ?? new Date(),
      changeFrequency: isBlog ? ("monthly" as const) : ("weekly" as const),
      priority: isHome ? 1 : isService ? 0.85 : isDistrict ? 0.82 : isBlog ? 0.7 : 0.8,
    };
  });
}

import { blogPosts, getSiteUrl, minskDistricts, services } from "@/lib/site";

/** Все публичные URL сайта для sitemap и IndexNow. */
export function getSitemapUrls(): string[] {
  const base = getSiteUrl();
  const staticRoutes = ["", "/uslugi", "/ceny", "/otzivi", "/blog", "/kontakty", "/voprosy", "/rayony"];
  const staticItems = staticRoutes.map((route) => `${base}${route}`);
  const serviceItems = services.map((service) => `${base}/uslugi/${service.slug}`);
  const districtItems = minskDistricts.map((district) => `${base}/rayony/${district.slug}`);
  const blogItems = blogPosts.map((post) => `${base}/blog/${post.slug}`);
  return [...staticItems, ...serviceItems, ...districtItems, ...blogItems];
}

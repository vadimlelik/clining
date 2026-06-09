import { getLocalBusinessSchema, getWebSiteSchema } from "@/lib/schema";

export function SiteJsonLd() {
  const schemas = [getWebSiteSchema(), getLocalBusinessSchema()];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={String(schema["@id"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

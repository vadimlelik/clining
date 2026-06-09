/**
 * Декоративные фото (Unsplash). ID проверены на доступность.
 * Свои фото: положите в `public/images/` и укажите путь `/images/...`.
 */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Запасное изображение, если основное недоступно */
export const FALLBACK_IMAGE = u("photo-1555041469-a586c61ea9bc", 1200);

export const siteImages = {
  hero: {
    main: u("photo-1555041469-a586c61ea9bc", 1400),
    accent: u("photo-1628177142898-93e36e4e3a50", 600),
    cleanRoom: u("photo-1493663284031-b7e3aefcae8e", 600),
  },
  strip: [
    {
      src: u("photo-1628177142898-93e36e4e3a50", 800),
      alt: "Профессиональная химчистка мебели",
      caption: "Профессиональная обработка",
    },
    {
      src: u("photo-1615529328331-f8917597711f", 800),
      alt: "Чистый диван в гостиной",
      caption: "Свежая обивка",
    },
    {
      src: u("photo-1600210492486-724fe5c67fb0", 800),
      alt: "Ковёр в интерьере",
      caption: "Ковры и текстиль",
    },
  ],
  services: {
    default: u("photo-1555041469-a586c61ea9bc", 800),
    sofa: u("photo-1615529328331-f8917597711f", 800),
    carpet: u("photo-1600210492486-724fe5c67fb0", 800),
    mattress: u("photo-1631049307264-da0ec9d70304", 800),
    curtains: u("photo-1616486338812-3dadae4b4ace", 800),
    leather: u("photo-1551292831-023188e78222", 800),
    chair: u("photo-1586023492125-27b2c045efd7", 800),
  },
} as const;

export function getServiceImage(slug: string): { src: string; alt: string } {
  const { services } = siteImages;
  if (slug.includes("divan") || slug.includes("uglovoy")) {
    return { src: services.sofa, alt: "Химчистка дивана на дому" };
  }
  if (slug === "kover") return { src: services.carpet, alt: "Химчистка ковра" };
  if (slug === "matras") return { src: services.mattress, alt: "Химчистка матраса" };
  if (slug === "shtory") return { src: services.curtains, alt: "Чистка штор" };
  if (slug.includes("kozhan")) return { src: services.leather, alt: "Химчистка кожаной мебели" };
  if (slug === "kreslo" || slug === "stulya" || slug === "podushki") {
    return { src: services.chair, alt: "Химчистка мягкой мебели" };
  }
  return { src: services.default, alt: "Выездная химчистка мебели" };
}

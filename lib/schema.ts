import { restaurant } from "@/data/restaurant";
import type { Restaurant } from "@/lib/types";

/*
 * Schema.org JSON-LD para el restaurante.
 * Información pública verificada (nombre, dirección, teléfono, Instagram, horario).
 */
export function restaurantSchema(r: Restaurant = restaurant) {
  const toSpec = (days: string[], h: { open: string; close: string }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens: h.open,
    closes: h.close,
  });

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    url: r.website ?? undefined,
    telephone: r.phone,
    priceRange: r.priceRange,
    servesCuisine: r.cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.address.street,
      addressLocality: r.address.city,
      addressRegion: r.address.region,
      addressCountry: r.address.country,
      postalCode: r.address.postalCode ?? undefined,
    },
    sameAs: r.instagram
      ? [`https://instagram.com/${r.instagram}`]
      : [],
    openingHoursSpecification: [
      toSpec(r.days.weekday, r.hours.weekday),
      toSpec(r.days.weekend, r.hours.weekend),
    ],
  };
}

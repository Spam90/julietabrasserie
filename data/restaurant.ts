import { phoneHref } from "@/lib/utils";
import type { Restaurant } from "@/lib/types";

/*
 * Datos públicos confirmados de Julieta Brasserie.
 * Dirección, teléfono e Instagram son información verificada.
 * Campos marcados como demo (precio, horario detallado) se mantienen neutros.
 */
export const restaurant: Restaurant = {
  name: "Julieta Brasserie",
  tagline: "Brasserie de día y noche en Piantini",
  description:
    "Julieta Brasserie es un espacio de día y noche en el corazón de Piantini, Santo Domingo. " +
    "Desayunos y brunch pensados con ingredientes cuidados, un menú de almuerzo y cena de cocina " +
    "de autor, y un café junto a un bar de cócteles que convierten cada visita en un momento apartado.",
  address: {
    street: "Av. Gustavo A. Mejía Ricart #122",
    city: "Santo Domingo",
    region: "Distrito Nacional",
    country: "República Dominicana",
    full: "Av. Gustavo A. Mejía Ricart #122, Santo Domingo, República Dominicana.",
    mapQuery:
      "Av. Gustavo A. Mejía Ricart, Piantini, Santo Domingo, República Dominicana",
  },
  phone: "+1 809-475-1007",
  phoneHref: phoneHref("+1 809-475-1007"),
  instagram: "julietabrasserie",
  website: null,
  email: null,
  priceRange: "$$",
  cuisine: ["Brasserie", "Internacional", "Desayuno", "Brunch", "Mar"],
  hours: {
    weekday: { open: "07:30", close: "23:00" },
    weekend: { open: "08:00", close: "01:00" },
  },
  days: {
    weekday: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    weekend: ["Sábado", "Domingo"],
  },
};

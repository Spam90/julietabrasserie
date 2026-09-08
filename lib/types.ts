/*
 * Tipos del dominio para Julieta Brasserie.
 * Mantener los datos de negocio separados de los componentes.
 */

export type ImageRef = string | null;

export type DishTag =
  | "vegetariano"
  | "picante"
  | "sin gluten"
  | "premium"
  | "market";

export interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    region?: string;
    country: string;
    full: string;
    mapQuery: string;
    postalCode?: string;
  };
  phone: string;
  phoneHref: string;
  instagram: string;
  website: string | null;
  email: string | null;
  priceRange: string;
  cuisine: string[];
  hours: {
    weekday: { open: string; close: string };
    weekend: { open: string; close: string };
  };
  days: {
    weekday: string[];
    weekend: string[];
  };
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number | null; // null => "Consultar" (precio no confirmado)
  image?: ImageRef; // /images/uploads/... o ausente (plato sin foto)
  tags?: DishTag[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: "landscape" | "portrait" | "square";
  caption?: string;
}

export interface ReservationFormData {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  occasion: string;
}

export type ReservationField = keyof ReservationFormData;

export type ReservationStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export interface ReservedTable {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  token: string;
}

export interface ImageAsset {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  bucket: string;
}

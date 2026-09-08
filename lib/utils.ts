/* Mezcla condicional de clases (sin dependencias externas). */
export type ClassValue = string | number | null | undefined | false;

export function cn(...inputs: ClassValue[]) {
  return inputs
    .filter((c): c is string => typeof c === "string" && c.length > 0)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export const phoneHref = (phone: string) =>
  `tel:${phone.replace(/[^0-9+]/g, "")}`;

/* Convierte "13:00" => "1:00 PM". */
export function fmtTime(t: string) {
  if (!t || !t.includes(":")) return t;
  const [h, m] = t.split(":").map(Number);
  const hour = h % 24;
  const period = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${String(m).padStart(2, "0")} ${period}`;
}

/* "2024-12-25" => "mié., 25 de diciembre" (es). */
export function fmtDate(iso: string, locale = "es") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(d);
}

export function fmtDateLong(iso: string, locale = "es") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

/* Clamp simple para uso interno. */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

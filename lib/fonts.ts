import { Cormorant_Garamond, Lato } from "next/font/google";

/*
 * Tipografía editorial premium:
 *  - Cormorant Garamond: serif elegante para encabezados y copy distintivo.
 *  - Lato: sans-serif limpia y legible para UI, cuerpo y navegación.
 * Ambas se auto-hospedan (next/font) para performance y sin FOIT.
 */
export const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const bodyFont = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

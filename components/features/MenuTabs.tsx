"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface Props {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

/*
 * Navegación de categorías con underline animado.
 * Desktop: fila horizontal scrollable. Mobile: scrollable horizontal
 * con scroll-snap — cómoda y nativa sin librerías.
 */
export function MenuTabs({ categories, active, onChange }: Props) {
  return (
    <nav
      aria-label="Categorías del menú"
      className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
    >
      <ul className="flex items-center gap-2 px-1 py-2 sm:justify-center">
        {categories.map((c) => {
          const isActive = active === c.id;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onChange(c.id)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-ink"
                    : "text-smoke-mid hover:text-ink",
                )}
              >
                {c.name}
                {c.description && (
                  <span className="sr-only">{c.description}</span>
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 inset-x-0 mx-auto h-0.5 w-5 origin-center rounded-full bg-gold transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

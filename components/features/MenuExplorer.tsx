"use client";

import { useState } from "react";
import { MenuTabs } from "@/components/features/MenuTabs";
import { MenuItemCard } from "@/components/features/MenuItemCard";
import type { Category, Dish } from "@/lib/types";

interface Props {
  categories: Category[];
  menu: Record<string, Dish[]>;
}

/*
 * Explorador del menú: estado de categoría activa + render editorial
 * de los platos. Componente cliente (interactividad de tabs).
 */
export function MenuExplorer({ categories, menu }: Props) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const dishes: Dish[] = menu[active] ?? [];
  const activeName = categories.find((c) => c.id === active)?.name ?? active;

  return (
    <div>
      <MenuTabs categories={categories} active={active} onChange={setActive} />

      <div className="mt-10">
        <h2 className="mb-8 font-display text-2xl text-ink">{activeName}</h2>
        {dishes.length === 0 ? (
          <p className="text-sm text-smoke-mid">
            Próximamente platos en esta categoría.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {dishes.map((dish) => (
              <li key={dish.id}>
                <MenuItemCard dish={dish} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";
import { Badge } from "@/components/ui/Badge";
import type { Dish } from "@/lib/types";
import { tagLabel } from "@/lib/tags";

interface Props {
  dish: Dish;
  featured?: boolean;
}

/*
 * Tarjeta de plato: fotografía + nombre + descripción + precio.
 * Layout editorial: cuando featured (sin foto), el texto toma protagonismo.
 */
export function MenuItemCard({ dish, featured = false }: Props) {
  const hasImage = Boolean(dish.image);

  return (
    <div
      className={cn(
        "group flex gap-4",
        featured ? "flex-col" : "items-start",
      )}
    >
      {hasImage && (
        <div
          className={cn(
            "shrink-0 overflow-hidden",
            featured ? "w-full" : "h-16 w-16 rounded-lg",
          )}
        >
                    <Photo
            src={dish.image!}
            alt={`Plato ${dish.name}`}
            width={800}
            height={600}
            rounded={featured ? "lg" : "sm"}
            cover
            className={cn(
              "transition-transform duration-500",
              !featured && "h-16 w-16",
            )}
          />
        </div>
      )}

      <div className={cn("min-w-0", featured && "w-full")}>
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg text-ink">{dish.name}</h3>
          <span className="text-right text-base font-medium text-ink">
            {dish.price != null ? `RD$${dish.price}` : "Consultar"}
          </span>
        </div>

        {dish.description && (
          <p className="text-sm text-smoke-mid">{dish.description}</p>
        )}

        {dish.tags && dish.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {dish.tags.map((t) => (
              <Badge key={t} variant="soft">
                {tagLabel[t]}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { restaurant } from "@/data/restaurant";
import { MapPin } from "lucide-react";

interface Props {
  interactive?: boolean;
  className?: string;
}

/*
 * Placeholder elegante preparado para Google Maps.
 * Cuando interactive=true, inyecta el embed real; si no, muestra un
 * estado estático (no rompe el layout ni la performance).
 */
export function MapEmbed({ interactive = false, className }: Props) {
  const q = encodeURIComponent(restaurant.address.mapQuery);

  if (interactive) {
    return (
      <div
        className={cn(
          "relative h-80 w-full overflow-hidden rounded-xl border border-line",
          className,
        )}
      >
        <iframe
          title={`Mapa de ${restaurant.name}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-60 w-full items-center justify-center rounded-xl border border-line bg-cream",
        className,
      )}
    >
      <div className="text-center">
        <MapPin className="mx-auto h-6 w-6 text-gold" />
        <p className="mt-1 text-sm text-smoke-mid">
          Mapa interactivo de {restaurant.name}
        </p>
        <span className="text-xs text-smoke">
          Coordenadas: {restaurant.address.city}, {restaurant.address.region}
        </span>
      </div>
    </div>
  );
}

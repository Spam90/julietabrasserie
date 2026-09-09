import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { fmtTime } from "@/lib/utils";
import { restaurant } from "@/data/restaurant";

const links = [
  { label: "Menú", href: "/menu" },
  { label: "Reservas", href: "/reservas" },
  { label: "Galería", href: "/galeria" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Ubicación", href: "/ubicacion" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { hours, days, phone, phoneHref, instagram } = restaurant;

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <span className="block font-display text-xl tracking-tight">
              Julieta Brasserie
            </span>
            <p className="text-sm text-smoke">
              Brasserie de día y noche en Piantini. Desayunos, brunch y una
              carta de cena pensada para compartir.
            </p>
            <div className="h-px w-8 bg-gold/50" />
          </div>

          <div className="space-y-3">
            <span className="font-body text-xs uppercase tracking-widest text-smoke">
              Enlaces
            </span>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-smoke-mid transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-body text-xs uppercase tracking-widest text-smoke">
              Contacto
            </span>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a
                  href={phoneHref}
                  className="text-smoke-mid transition-colors hover:text-paper"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-gold" />
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke-mid transition-colors hover:text-paper"
                >
                  @{instagram}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-smoke-mid">{restaurant.address.street}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-body text-xs uppercase tracking-widest text-smoke">
              Horario
            </span>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-2">
                <span className="text-smoke-mid">
                  {days.weekday.map((d) => d.slice(0, 3)).join("–")}
                </span>
                <span className="text-smoke-mid">
                  {fmtTime(hours.weekday.open)} – {fmtTime(hours.weekday.close)}
                </span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-smoke-mid">
                  {days.weekend.map((d) => d.slice(0, 3)).join("–")}
                </span>
                <span className="text-smoke-mid">
                  {fmtTime(hours.weekend.open)} – {fmtTime(hours.weekend.close)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line/20 pt-6 text-xs text-smoke">
          <span className="font-display text-gold">◆</span>{" "}
          {year} Julieta Brasserie. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

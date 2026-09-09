import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapEmbed } from "@/components/features/MapEmbed";
import { restaurant } from "@/data/restaurant";
import { fmtTime } from "@/lib/utils";

export default function UbicacionPage() {
  const a = restaurant.address;
  const h = restaurant.hours;
  const instagram = restaurant.instagram;

  return (
    <>
      <Section className="pt-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="outline">Ubicación</Badge>
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              {restaurant.name}
            </h1>
            <p className="text-smoke-mid">{a.full}</p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <span className="block font-medium text-ink">Dirección</span>
                  <span className="text-smoke-mid">{a.street}</span>
                  <span className="block text-smoke-mid">{a.city}, {a.region}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <span className="block font-medium text-ink">Teléfono</span>
                  <a href={restaurant.phoneHref} className="text-smoke-mid hover:text-ink">{restaurant.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <span className="block font-medium text-ink">Horario</span>
                  <span className="block text-smoke-mid">Lun–Vie: {fmtTime(h.weekday.open)} – {fmtTime(h.weekday.close)}</span>
                  <span className="block text-smoke-mid">Sáb–Dom: {fmtTime(h.weekend.open)} – {fmtTime(h.weekend.close)}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <span className="block font-medium text-ink">Instagram</span>
                  <a href={"https://instagram.com/" + instagram} target="_blank" rel="noopener noreferrer" className="text-smoke-mid hover:text-ink">@{instagram}</a>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button href="/reservas" variant="primary">
                Reservar mesa
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <MapEmbed interactive />
            <div className="space-y-3 text-sm text-smoke-mid">
              <p>
                <strong className="text-ink">Cómo llegar:</strong> Ubíquese en
                Av. Gustavo A. Mejía Ricart, Piantini. El local se encuentra
                frente al parque lineal, entre las cuadras 120 y 124.
              </p>
              <p>Estacionamiento: valet parking disponible junto al local.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

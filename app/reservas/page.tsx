import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ReservationForm } from "@/components/features/ReservationForm";
import { MapEmbed } from "@/components/features/MapEmbed";
import { restaurant } from "@/data/restaurant";
import { fmtTime } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";

export const metadata = {
  title: "Reservas",
  description:
    "Reserve su mesa en Julieta Brasserie: desayunos, brunch, almuerzo y cena en Piantini, Santo Domingo. Complete el formulario y le contactamos para confirmar.",
  alternates: { canonical: "/reservas" },
};

/*
 * Página de reservas: formulario + contexto del restaurante.
 * Arquitectura preparada para conectar un backend real vía /api/reserva.
 */
export default function ReservasPage() {
  const days = restaurant.days;
  const h = restaurant.hours;

  return (
    <>
      <Section className="pt-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="outline">Reservas</Badge>
            <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Reserve su mesa
            </h1>
            <p className="max-w-md text-smoke-mid">
              En {restaurant.name} preparamos cada espacio para que su
              experiencia sea inolvidable. Complete el formulario y nos
              pondremos en contacto para confirmar disponibilidad.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="font-medium text-ink">{restaurant.address.full}</p>
                  <p className="text-sm text-smoke-mid">Piantini, Santo Domingo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <p className="font-medium text-ink">Horario</p>
                  <p className="text-sm text-smoke-mid">
                    {days.weekday.join(", ")}: {fmtTime(h.weekday.open)} –{" "}
                    {fmtTime(h.weekday.close)}
                  </p>
                  <p className="text-sm text-smoke-mid">
                    {days.weekend.join(", ")}: {fmtTime(h.weekend.open)} –{" "}
                    {fmtTime(h.weekend.close)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line/30 bg-paper p-6 shadow-xs">
            <ReservationForm />
          </div>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <MapEmbed interactive />
        </Container>
      </Section>
    </>
  );
}
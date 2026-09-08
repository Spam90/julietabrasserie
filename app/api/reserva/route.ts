import { NextRequest, NextResponse } from "next/server";
import type { ReservationFormData } from "@/lib/types";
import { restaurant } from "@/data/restaurant";

/*
 * Simulación de un backend de reservas real.
 * La arquitectura está preparada para conectar un sistema externo
 * (Resy / OpenTable / SMS) reemplazando el cuerpo de este handler.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<ReservationFormData>;

  const required: (keyof ReservationFormData)[] = [
    "date",
    "time",
    "guests",
    "name",
    "email",
    "phone",
  ];
  for (const f of required) {
    if (body[f] === undefined || body[f] === "" || body[f] === null) {
      return NextResponse.json(
        { ok: false, error: `Falta el campo: ${f}` },
        { status: 400 },
      );
    }
  }

  const guests = Number(body.guests);
  if (!Number.isFinite(guests) || guests < 1) {
    return NextResponse.json(
      { ok: false, error: "Debe reservar para al menos 1 persona." },
      { status: 400 },
    );
  }
  if (guests > 12) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Para grupos superiores a 12 personas, por favor contáctenos al teléfono.",
      },
      { status: 422 },
    );
  }

  const email = String(body.email ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Formato de email inválido." },
      { status: 400 },
    );
  }

  const phone = String(body.phone ?? "");
  if (!/[\d]{7,}/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Formato de teléfono inválido." },
      { status: 400 },
    );
  }

  const pick = new Date(String(body.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (pick < today) {
    return NextResponse.json(
      { ok: false, error: "No se pueden reservar fechas pasadas." },
      { status: 400 },
    );
  }

  // Simula la latencia de un backend real.
  await new Promise((r) => setTimeout(r, 700));

  const initials = String(body.name ?? "")
    .replace(/\s/g, "")
    .slice(0, 3)
    .toUpperCase();
  const token = `${initials}-${guests}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const reservation = {
    id: `JUL-${Math.floor(Math.random() * 9000 + 1000)}`,
    token,
    date: body.date,
    time: body.time,
    guests,
    name: body.name,
    email: body.email,
    phone: body.phone,
    occasion: body.occasion ?? "",
    restaurant: restaurant.name,
    phoneHref: restaurant.phoneHref,
    status: "confirmada",
  };

  return NextResponse.json({ ok: true, reservation }, { status: 200 });
}

import { NextRequest, NextResponse } from "next/server";
import type { ReservationFormData } from "@/lib/types";
import { restaurant } from "@/data/restaurant";

/*
 * DEMO: simulación de un backend de reservas real — SIN persistencia.
 * La arquitectura está preparada para conectar un sistema externo
 * (Resy / OpenTable / SMS) reemplazando el cuerpo de este handler.
 */

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/* Valida que YYYY-MM-DD sea una fecha real de calendario (rechaza 2026-02-31). */
function isValidCalendarDate(iso: string): boolean {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req
      .json()
      .catch(() => null)) as Partial<ReservationFormData> | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Cuerpo de la solicitud inválido." },
        { status: 400 },
      );
    }

    const required: (keyof ReservationFormData)[] = [
      "date",
      "time",
      "guests",
      "name",
      "email",
      "phone",
    ];
    for (const f of required) {
      const v = body[f];
      if (v === undefined || v === null || v === "") {
        return NextResponse.json(
          { ok: false, error: `Falta el campo: ${f}` },
          { status: 400 },
        );
      }
    }

    // Fecha: formato estricto + calendario real + no pasada.
    const date = String(body.date);
    if (!DATE_RE.test(date) || !isValidCalendarDate(date)) {
      return NextResponse.json(
        { ok: false, error: "Fecha inválida. Use el formato AAAA-MM-DD." },
        { status: 400 },
      );
    }
    const [y, m, d] = date.split("-").map(Number);
    const pick = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pick < today) {
      return NextResponse.json(
        { ok: false, error: "No se pueden reservar fechas pasadas." },
        { status: 400 },
      );
    }

    // Hora: formato HH:MM (24h).
    const time = String(body.time);
    if (!TIME_RE.test(time)) {
      return NextResponse.json(
        { ok: false, error: "Hora inválida. Use el formato HH:MM." },
        { status: 400 },
      );
    }

    // Personas: entero entre 1 y 12.
    const guests = Number(body.guests);
    if (!Number.isInteger(guests) || guests < 1) {
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

    // Nombre: texto razonable (2-80 caracteres tras trim).
    const name = String(body.name).trim();
    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { ok: false, error: "Nombre inválido." },
        { status: 400 },
      );
    }

    const email = String(body.email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Formato de email inválido." },
        { status: 400 },
      );
    }

    const phone = String(body.phone);
    if (!/[\d]{7,}/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Formato de teléfono inválido." },
        { status: 400 },
      );
    }

    // Simula la latencia de un backend real.
    await new Promise((r) => setTimeout(r, 700));

    const initials = name.replace(/\s/g, "").slice(0, 3).toUpperCase();
    const token = `${initials}-${guests}-${Math.floor(Math.random() * 9000 + 1000)}`;

    // DEMO: sin persistencia. "solicitud-recibida", no "confirmada":
    // la UI comunica que un miembro del equipo contactará para confirmar.
    const reservation = {
      id: `JUL-${Math.floor(Math.random() * 9000 + 1000)}`,
      token,
      date,
      time,
      guests,
      name,
      email,
      phone,
      occasion: typeof body.occasion === "string" ? body.occasion : "",
      restaurant: restaurant.name,
      phoneHref: restaurant.phoneHref,
      status: "solicitud-recibida",
    };

    return NextResponse.json({ ok: true, reservation }, { status: 200 });
  } catch {
    // Nunca exponer detalles internos (stack traces) al cliente.
    return NextResponse.json(
      { ok: false, error: "Error interno. Intente nuevamente." },
      { status: 500 },
    );
  }
}

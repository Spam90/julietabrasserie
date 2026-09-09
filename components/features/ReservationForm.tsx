"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";
import type { ReservationConfirmation, ReservationFormData, ReservationStatus } from "@/lib/types";

type Field = keyof ReservationFormData;

const timeOptions = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00",
];
const guestOptions = [1, 2, 3, 4, 5, 6, 8, 10, 12];
const occasionOptions: { value: string; label: string }[] = [
  { value: "", label: "Sin ocasión especial" },
  { value: "aniversario", label: "Aniversario" },
  { value: "cumple", label: "Cumpleaños" },
  { value: "negocios", label: "Negocios" },
  { value: "grupo", label: "Grupo grande" },
];
const initial: ReservationFormData = {
  date: "", time: "", guests: 2, name: "",
  phone: "", email: "", occasion: "",
};
const todayISO = () => new Date().toISOString().slice(0, 10);

function validate(f: ReservationFormData) {
  const e: Record<Field, string> = {
    date: "", time: "", guests: "", name: "", phone: "", email: "", occasion: "",
  };
  if (!f.date) e.date = "Seleccione una fecha";
  if (!f.time) e.time = "Seleccione una hora";
  if (!Number.isFinite(f.guests) || f.guests < 1) e.guests = "Seleccione";
  if (!f.name.trim()) e.name = "Ingrese su nombre";
  if (!f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Email inválido";
  if (!f.phone || !/[\d]{7,}/.test(f.phone)) e.phone = "Teléfono inválido";
  return e;
}

function inputCn(invalid: boolean) {
  return cn(
    "mt-1 w-full rounded-md border bg-paper px-4 py-2.5 text-sm text-ink",
    "transition-colors placeholder-smoke/40 focus:outline-none",
    invalid
      ? "border-amber-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50"
      : "border-line focus:border-gold focus:ring-2 focus:ring-gold/20",
  );
}
function selectCn(invalid: boolean) {
  return cn(inputCn(invalid), "appearance-none");
}

function SuccessView({ reservation }: { reservation: ReservationConfirmation }) {
  return (
    <div className="rounded-xl border border-line/30 bg-cream p-6">
      <div className="mb-4 flex items-center gap-3 text-emerald-800">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-5 w-5" />
        </div>
        <span className="font-medium">Solicitud recibida</span>
      </div>

      <p className="mb-3 text-sm text-smoke-mid">
        Su reserva está en proceso de confirmación. Un miembro de{" "}
        <strong>{restaurant.name}</strong> se pondrá en contacto al teléfono{" "}
        <strong>{restaurant.phone}</strong> para confirmar.
      </p>

      <div className="space-y-2 text-sm">
        <Row label="Fecha y hora" value={`${reservation.date} · ${reservation.time}`} />
        <Row label="Personas" value={`${reservation.guests} ${reservation.guests === 1 ? "persona" : "personas"}`} />
        <Row label="Nombre" value={reservation.name} />
        <Row label="Email" value={reservation.email} />
        <Row label="Teléfono" value={reservation.phone} />
        <Row label="Token de reserva" value={reservation.token} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-smoke-mid">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function FieldWrap({
  label,
  touched,
  error,
  children,
}: {
  label: string;
  touched: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-widest text-smoke-mid">
        {label}
      </span>
      {children}
      {touched && error && (
        <p className="-mt-0.5 text-xs text-amber-700">{error}</p>
      )}
    </label>
  );
}



export function ReservationForm() {
  const [form, setForm] = useState<ReservationFormData>(initial);
  const [status, setStatus] = useState<ReservationStatus>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReservationConfirmation | null>(null);
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    date: false, time: false, guests: false, name: false,
    phone: false, email: false, occasion: false,
  });

  const errors = validate(form);
  const hasErrors = Object.values(errors).some(Boolean);

  function set<K extends Field>(k: K, v: ReservationFormData[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setTouched((t) => ({ ...t, [k]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hasErrors) return;
    setStatus("submitting");
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        // Se mantiene status "error" para que el mensaje sea visible;
        // el formulario sigue editable (disabled solo en "submitting").
        setError(json?.error || "No se pudo procesar la solicitud. Intente más tarde.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setResult(json.reservation);
    } catch {
      setError("Error de conexión. Intente nuevamente.");
      setStatus("error");
    }
  }

  if (status === "success" && result) {
    return (
      <motion.div
        className="mx-auto max-w-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SuccessView reservation={result} />
        <button
          type="button"
          className="mt-6 text-center text-sm text-smoke-mid hover:text-ink"
          onClick={() => {
            setStatus("idle");
            setForm(initial);
            setTouched({
              date: false, time: false, guests: false, name: false,
              phone: false, email: false, occasion: false,
            });
            setResult(null);
          }}
        >
          Nueva reserva
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto grid w-full max-w-2xl gap-x-4 gap-y-4"
    >
      <fieldset className="contents">
        <div className="col-span-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <FieldWrap label="Fecha" touched={touched.date} error={errors.date}>
            <input
              type="date"
              min={todayISO()}
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              disabled={status === "submitting"}
              className={inputCn(!!errors.date)}
            />
          </FieldWrap>

          <FieldWrap label="Hora" touched={touched.time} error={errors.time}>
            <select
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              disabled={status === "submitting"}
              className={selectCn(!!errors.time)}
            >
              <option value="">Elegir hora</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label="Personas" touched={touched.guests} error={errors.guests}>
            <select
              value={form.guests || ""}
              onChange={(e) => set("guests", Number(e.target.value))}
              disabled={status === "submitting"}
              className={selectCn(!!errors.guests)}
            >
              <option value="">Elegir</option>
              {guestOptions.map((g) => (
                <option key={g} value={g}>
                  {g} {g === 1 ? "persona" : "personas"}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label="Nombre" touched={touched.name} error={errors.name}>
            <input
              type="text"
              placeholder="Escriba un nombre"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              disabled={status === "submitting"}
              className={inputCn(!!errors.name)}
              maxLength={80}
            />
          </FieldWrap>

          <FieldWrap label="Email" touched={touched.email} error={errors.email}>
            <input
              type="email"
              placeholder="nombre@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              disabled={status === "submitting"}
              className={inputCn(!!errors.email)}
            />
          </FieldWrap>

          <FieldWrap label="Teléfono" touched={touched.phone} error={errors.phone}>
            <input
              type="tel"
              placeholder="+1 809-555-0100"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              disabled={status === "submitting"}
              className={inputCn(!!errors.phone)}
            />
          </FieldWrap>

          <div className="sm:col-span-2">
            <FieldWrap label="Ocasión" touched={touched.occasion} error={errors.occasion}>
              <select
                value={form.occasion}
                onChange={(e) => set("occasion", e.target.value)}
                disabled={status === "submitting"}
                className={selectCn(!!errors.occasion)}
              >
                {occasionOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FieldWrap>
          </div>
        </div>

        <div className="col-span-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={hasErrors || status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Enviando reserva...
              </>
            ) : (
              "Solicitar reserva"
            )}
          </Button>
        </div>
      </fieldset>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 text-sm text-amber-700"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}



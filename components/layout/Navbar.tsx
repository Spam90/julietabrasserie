"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { restaurant } from "@/data/restaurant";

const nav = [
  { label: "Inicio", href: "/" },
  { label: "Menú", href: "/menu" },
  { label: "Reservas", href: "/reservas" },
  { label: "Galería", href: "/galeria" },
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Ubicación", href: "/ubicacion" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueo de scroll corporativo cuando el drawer móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) =>
    pathname === href.split("#")[0] || (href.startsWith("/#") && pathname === "/");

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-line/40 bg-paper/90 backdrop-blur"
          : "border-transparent bg-paper/80",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[76rem] items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
        <Link href="/" onClick={close} className="flex flex-col leading-tight">
          <span className="font-display text-xl tracking-tight text-ink">
            Julieta
          </span>
          <span className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-smoke">
            Brasserie
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "relative px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive(n.href)
                  ? "text-ink"
                  : "text-smoke-mid hover:text-ink",
              )}
            >
              {n.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[2px] origin-center bg-gold transition-transform duration-300",
                  isActive(n.href) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/reservas"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            Reservar mesa
          </Button>
          <IconButton
            variant="ghost"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      {/* Drawer móvil premium: panel deslizante y backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 z-50 h-screen w-[min(320px,85vw)] border-l border-line/30 bg-paper"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span className="font-display text-xl text-ink">Julieta</span>
                <IconButton
                  variant="ghost"
                  aria-label="Cerrar menú"
                  onClick={close}
                >
                  <X className="h-5 w-5" />
                </IconButton>
              </div>
              <nav className="flex flex-col gap-0.5 px-4 pt-4">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={close}
                    className={cn(
                      "block px-3 py-3.5 text-lg font-medium transition-colors",
                      isActive(n.href)
                        ? "text-gold"
                        : "text-smoke-mid hover:text-ink",
                    )}
                  >
                    {n.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-line/30 pt-4">
                  <Button href="/reservas" onClick={close} className="w-full">
                    Reservar mesa
                  </Button>
                  <a
                    href={restaurant.phoneHref}
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-smoke-mid"
                  >
                    <Phone className="h-4 w-4" />
                    {restaurant.phone}
                  </a>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

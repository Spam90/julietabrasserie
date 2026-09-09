import "@/app/globals.css";
import type { Metadata } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import { restaurantSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Julieta Brasserie — Brasserie en Piantini, Santo Domingo",
    template: "%s | Julieta Brasserie",
  },
  description:
    "Desayunos, brunch, almuerzo y cena en Piantini. Cocina cuidada, ambiente cálido y cócteles artesanales. Reserva tu mesa en Julieta Brasserie, Santo Domingo.",
  openGraph: {
    type: "website",
    locale: "es_DO",
    title: "Julieta Brasserie — Brasserie en Piantini",
    description:
      "Desayunos, brunch, almuerzo y cena en Piantini. Cocina cuidada, ambiente cálido y cócteles artesanales en Santo Domingo.",
    images: [
      {
        url: "/images/uploads/hero_cover.jpg",
        width: 1280,
        height: 853,
        alt: "Comedor principal de Julieta Brasserie con luz natural",
      },
    ],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
  twitter: {
    card: "summary_large_image",
    site: "@julietabrasserie",
    title: "Julieta Brasserie — Brasserie en Piantini, Santo Domingo",
    description: "Desayunos, brunch, almuerzo y cena en Piantini. Cocina cuidada, ambiente cálido y cócteles artesanales. Reserva tu mesa en Julieta Brasserie, Santo Domingo.",
    images: [
      {
        url: "/images/uploads/hero_cover.jpg",
        width: 1200,
        height: 630,
        alt: "Julieta Brasserie — Comedor principal",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema(), null, 2),
          }}
        />
      </head>
      <body className="relative min-h-screen bg-paper text-ink antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imágenes locales /public: servidor directo (evita 400 del image-optimizer
  // y reduce overhead de dev). Reemplazar con remotePatterns cuando se usen fotos CDN.
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96],
  },
  // La lint se ejecuta bajo demanda (`next lint`); no debe bloquear builds del demo.
};

export default nextConfig;

"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  cover?: boolean;
}

const radius: Record<NonNullable<PhotoProps["rounded"]>, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/*
 * Imagen con: reserva de espacio por aspect-ratio, object-cover,
 * y un reveal de fade sutil al cargar (microinteracción premium).
 */
export function Photo({
  src,
  alt,
  width,
  height,
  className,
  priority,
  sizes,
  rounded = "md",
  cover = true,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-smoke/5",
        radius[rounded],
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority || undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          cover ? "object-cover" : "object-contain",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

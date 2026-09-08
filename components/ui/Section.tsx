import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
  narrow?: boolean;
  tight?: boolean;
  bg?: "paper" | "cream" | "ink";
}

/* Pads visuales consistentes (ritmo vertical) + anclaje para scroll. */
export function Section({
  children,
  className,
  narrow = false,
  tight = false,
  bg = "paper",
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      className={cn(
        "mx-auto w-full",
        "py-16 sm:py-20 md:py-24",
        tight && "py-12 sm:py-16",
        bg === "cream" && "bg-cream",
        bg === "ink" && "bg-ink text-paper",
        bg === "paper" && "bg-paper",
        narrow
          ? "max-w-[52rem] px-5 sm:px-6 lg:px-8"
          : "max-w-[76rem] px-5 sm:px-6 lg:px-8 xl:px-10",
        className,
      )}
    >
      {children}
    </section>
  );
}

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "soft" | "outline" | "solid";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  soft: "bg-cream text-umber border border-line",
  outline: "border border-smoke text-smoke",
  solid: "bg-umber text-paper",
};

export function Badge({
  children,
  className,
  variant = "soft",
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

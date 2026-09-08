import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "soft";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  ghost: "text-ink hover:bg-cream",
  soft: "bg-cream text-umber hover:bg-line",
};

export function IconButton({
  children,
  className,
  variant = "ghost",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-sm",
        "transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        styles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

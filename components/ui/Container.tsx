import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/* Ancho máximo deliberado: ~1240px para ritmo editorial sin saturar. */
export function Container({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={cn(
        "mx-auto w-full max-w-[76rem] px-5 sm:px-6 lg:px-8 xl:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}

const base = cn(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
  "transition-all duration-200 ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
  "disabled:pointer-events-none disabled:opacity-60",
);

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink shadow-xs hover:bg-gold-deep hover:shadow-sm active:scale-[0.98]",
  secondary:
    "border border-umber/30 text-ink hover:bg-umber/10 active:scale-[0.98]",
  ghost: "text-ink hover:bg-cream",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

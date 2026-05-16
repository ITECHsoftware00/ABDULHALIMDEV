import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "accent";

export function Pill({
  children,
  variant = "outline",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    default: "bg-[rgb(var(--fg))] text-[rgb(var(--bg))]",
    outline: "border border-[rgb(var(--line))] text-[rgb(var(--fg))]",
    accent: "bg-[rgb(var(--accent))] text-[rgb(var(--fg))]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

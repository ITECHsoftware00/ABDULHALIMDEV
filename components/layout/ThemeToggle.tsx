"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = (mounted ? resolvedTheme ?? theme : "light") ?? "light";
  const next = current === "dark" ? "light" : "dark";
  const label = current === "dark" ? "LIGHT" : "DARK";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest",
        "border-[rgb(var(--line))] text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors",
        className
      )}
    >
      <span className="inline-block size-3 rounded-full bg-[rgb(var(--fg))]" aria-hidden />
      {label}
    </button>
  );
}

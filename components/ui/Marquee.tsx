"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-[rgb(var(--line))] py-4",
        className
      )}
    >
      <div
        className="flex whitespace-nowrap gap-12"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <div className="flex shrink-0 gap-12">{children}</div>
        <div className="flex shrink-0 gap-12" aria-hidden>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}

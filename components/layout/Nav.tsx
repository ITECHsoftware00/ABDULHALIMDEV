"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

const items = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 md:px-6 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto mx-auto max-w-fit flex items-center justify-between gap-8 md:gap-16 px-4 md:px-6 py-3 rounded-full transition-all duration-500",
          scrolled
            ? "bg-[rgb(var(--bg))]/20 backdrop-blur-2xl border border-[rgb(var(--line))]/20 shadow-[0_8px_30px_rgb(0_0_0_/0.1)]"
            : "bg-[rgb(var(--bg))]/5 backdrop-blur-xl border border-[rgb(var(--line))]/20 shadow-[0_4px_20px_rgb(0_0_0_/0.05)]"
        )}
      >
        <Link
          href="#top"
          className="font-display font-extrabold text-sm md:text-base tracking-[0.05em] uppercase px-2 md:px-3"
          data-cursor="link"
        >
          {content.identity.name.split(" ")[0].toUpperCase()}
        </Link>

        <ul className="hidden md:flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em]">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="px-3 py-1.5 rounded-full hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors"
                data-cursor="link"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle className="text-[10px] py-1.5 px-3" />
      </nav>
    </header>
  );
}

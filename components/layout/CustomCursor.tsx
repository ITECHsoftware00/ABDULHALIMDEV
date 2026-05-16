"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("Guest 👋");
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const cursorAttr = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (cursorAttr === "link") setLabel("VIEW →");
      else if (cursorAttr === "email") setLabel("Say hi! 👋");
      else setLabel("Guest 👋");
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgb(var(--fg))] text-[rgb(var(--bg))] font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">
        <span className="inline-block size-1.5 rounded-full bg-[rgb(var(--accent))]" />
        {label}
      </span>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";

export function ArchiveList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-mono text-xs uppercase tracking-widest border border-[rgb(var(--line))] px-5 py-3 hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors"
      >
        {open
          ? `Hide archive (${projects.length}) ↑`
          : `Browse archive (${projects.length} more) ↓`}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden divide-y divide-[rgb(var(--line))] border-t border-b border-[rgb(var(--line))] mt-6"
          >
            {projects.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-12 items-baseline gap-4 py-4 font-mono text-xs uppercase tracking-widest"
              >
                <span className="col-span-5 font-display font-extrabold text-base normal-case tracking-tight">
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[rgb(var(--accent))]"
                      data-cursor="link"
                    >
                      {p.title} ↗
                    </a>
                  ) : (
                    p.title
                  )}
                </span>
                <span className="col-span-4 opacity-60">{p.category}</span>
                <span className="col-span-3 opacity-50">{p.tech.slice(0, 2).join(" · ")}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

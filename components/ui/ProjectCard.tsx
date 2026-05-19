"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

const statusStyles: Record<NonNullable<Project["status"]>, string> = {
  Live: "border-[rgb(var(--accent))]/40 text-[rgb(var(--accent))]",
  "Case study": "border-[rgb(var(--line))]/40 opacity-80",
  "Work in progress": "border-[rgb(var(--accent))]/60 text-[rgb(var(--accent))]",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduce ? false : { y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl border border-[rgb(var(--line))]/15 bg-[rgb(var(--fg))]/[0.015] hover:bg-[rgb(var(--fg))]/[0.04] transition-colors duration-500"
      data-cursor={project.liveUrl ? "link" : undefined}
    >
      {/* LEFT — meta + copy */}
      <div className="md:col-span-5 flex flex-col p-6 md:p-10 lg:p-12">
        {/* Top: number + status pill */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
            {num}
          </span>
          {project.status && (
            <span
              className={cn(
                "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest border rounded-full px-3 py-1",
                statusStyles[project.status]
              )}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {project.status}
            </span>
          )}
        </div>

        {/* Subtitle: category / year */}
        <p className="text-sm md:text-base opacity-60 mb-5">
          {project.category}
          {project.year && (
            <>
              {" "}
              <span className="opacity-50">/</span> {project.year}
            </>
          )}
        </p>

        <h3 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight leading-[1] mb-6 break-words">
          {project.title}
        </h3>

        <p className="text-base leading-[1.6] opacity-75 max-w-[44ch] mb-6">
          {project.description}
        </p>

        {/* Highlights as outlined pills */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center font-mono text-[9px] uppercase tracking-wider border border-[rgb(var(--line))]/30 rounded-full px-2 py-0.5 opacity-80"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="mt-auto">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest pb-1 border-b border-[rgb(var(--accent))] w-fit hover:text-[rgb(var(--accent))] transition-colors"
              data-cursor="link"
            >
              View live <span aria-hidden>↗</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest pb-1 border-b border-[rgb(var(--line))]/30 w-fit opacity-60">
              Case study on request
            </span>
          )}
        </div>
      </div>

      {/* RIGHT — image or coming soon */}
      <a
        href={project.liveUrl ?? undefined}
        target={project.liveUrl ? "_blank" : undefined}
        rel={project.liveUrl ? "noreferrer" : undefined}
        className="md:col-span-7 block relative bg-[rgb(var(--muted))] overflow-hidden"
        data-cursor={project.liveUrl ? "link" : undefined}
      >
        <div className="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[480px] overflow-hidden relative">
          {project.images && project.images.length > 0 ? (
            <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {project.images.map((img, idx) => (
                <div key={idx} className="flex-none w-full h-full snap-center relative overflow-hidden">
                  <motion.img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    loading="lazy"
                    className="size-full object-cover"
                    whileHover={reduce ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              ))}
              {/* Pagination Dots Indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                {project.images.map((_, idx) => (
                  <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-sm" />
                ))}
              </div>
            </div>
          ) : project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="size-full object-cover"
              whileHover={reduce ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="size-full flex flex-col items-center justify-center gap-4 bg-[rgb(var(--fg))]/[0.03] border-l border-[rgb(var(--line))]/10">
              <span className="block w-8 h-px bg-[rgb(var(--accent))]" />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-40">
                Preview coming soon
              </p>
              <span className="block w-8 h-px bg-[rgb(var(--accent))]" />
            </div>
          )}
        </div>
      </a>
    </motion.article>
  );
}

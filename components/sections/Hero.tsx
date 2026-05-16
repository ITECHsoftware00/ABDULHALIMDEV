"use client";

import { content } from "@/lib/content";
import { RevealText } from "@/components/ui/RevealText";

export function Hero() {
  const [first, ...rest] = content.identity.name.split(" ");
  const last = rest.join(" ");

  return (
    <section
      id="top"
      className="relative min-h-[80svh] overflow-hidden px-6 md:px-10 pt-20 md:pt-24 pb-16 flex flex-col"
    >
      {/* Eyebrow — tiny mono role line, top-left */}
      <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] opacity-60">
        {content.identity.role}
      </p>

      {/* Massive name — sized to fit each word on one line */}
      <h1 className="mt-auto pt-16 md:pt-20 font-display font-extrabold uppercase leading-[0.86] tracking-tight text-[clamp(36px,7vw,118px)]">
        <RevealText as="span" splitBy="char" className="block whitespace-nowrap">
          {first}
        </RevealText>
        <RevealText as="span" splitBy="char" className="block whitespace-nowrap" delay={0.15}>
          {last}
        </RevealText>
      </h1>

      {/* Bottom info row — bio left, pills stacked right (matches dvdrod) */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
        <p className="md:col-span-6 lg:col-span-5 text-base md:text-lg leading-[1.55] opacity-80 max-w-[44ch]">
          {content.identity.yearsExperience}+ years shipping production-grade APIs, real-time apps,
          and blockchain platforms for clients across UAE, Nigeria, and Europe. Backend-first,
          full-stack capable, security-aware.
        </p>

        <div className="md:col-span-3 md:col-start-10 flex flex-col items-start md:items-end gap-2 font-mono text-[10px] uppercase tracking-widest">
          <span className="inline-flex items-center gap-2 border border-[rgb(var(--line))]/25 rounded-full px-3 py-1.5 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-[rgb(var(--accent))] animate-pulse" />
            {content.identity.available ? "Available for work" : "Booked"}
          </span>
          <span className="inline-flex items-center gap-2 border border-[rgb(var(--line))]/20 rounded-full px-3 py-1.5 whitespace-nowrap">
            <span className="opacity-50">Based</span>
            <span>{content.identity.location}</span>
          </span>
          <span className="inline-flex items-center gap-2 border border-[rgb(var(--line))]/20 rounded-full px-3 py-1.5 whitespace-nowrap">
            <span className="opacity-50">Tenure</span>
            <span>{content.identity.yearsExperience}+ yrs · 15+ projects</span>
          </span>
        </div>
      </div>

      {/* Vertical scroll indicator on the right edge — with animated accent line */}
      <div
        className="hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]"
        aria-hidden
      >
        <span className="relative block w-px h-24 bg-[rgb(var(--fg))]/15 overflow-hidden">
          <span
            className="absolute inset-x-0 top-0 h-1/3 bg-[rgb(var(--accent))]"
            style={{ animation: "scrollLine 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite" }}
          />
        </span>
        <span className="opacity-60" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <style>{`
          @keyframes scrollLine {
            0%   { transform: translateY(-100%); }
            55%  { transform: translateY(300%); }
            100% { transform: translateY(300%); }
          }
        `}</style>
      </div>
    </section>
  );
}

"use client";

import { content } from "@/lib/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArchiveList } from "@/components/ui/ArchiveList";
import { Marquee } from "@/components/ui/Marquee";
import { RevealText } from "@/components/ui/RevealText";

const expertiseLine = [
  "Backend-first",
  "Smart contracts",
  "Real-time systems",
  "JWT · RBAC",
  "Stripe · Crypto",
  "Web3.js",
  "REST APIs",
  "Production scale",
];

export function Work() {
  return (
    <section
      id="work"
      className="px-0 py-20 md:py-24 border-t border-[rgb(var(--line))]"
    >
      {/* Top expertise marquee */}
      <div className="mb-24 md:mb-32">
        <Marquee speed={45}>
          {expertiseLine.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] opacity-80"
            >
              {tag} <span className="text-[rgb(var(--accent))] mx-4">+</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Heading: tiny eyebrow + massive single word */}
          <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-6">
            [03] Selected Projects
          </p>
          <RevealText
            as="h2"
            className="block font-display font-extrabold tracking-tight leading-[0.85] text-[clamp(72px,12vw,180px)] mb-8 md:mb-12"
          >
            Work.
          </RevealText>
        </div>
      </div>

      <div className="w-full border-t border-[rgb(var(--line))] mb-12 md:mb-16" />

      <div className="px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Bordered case-study cards */}
          <div className="flex flex-col gap-10 md:gap-16">
            {content.featuredProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>

          <ArchiveList projects={content.archiveProjects} />
        </div>
      </div>
    </section>
  );
}

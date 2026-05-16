"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { RevealText } from "@/components/ui/RevealText";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="py-20 md:py-24 border-t border-[rgb(var(--line))]"
    >
      <div className="max-w-[1600px] mx-auto">
        <p className="px-6 md:px-10 font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-6">
          [02] My Story
        </p>
        <RevealText
          as="h2"
          className="px-6 md:px-10 block font-display font-extrabold tracking-tight leading-[0.85] text-[clamp(72px,13vw,200px)] mb-6 md:mb-10"
        >
          About.
        </RevealText>
      </div>

      <div className="w-full border-t border-[rgb(var(--line))] mb-12 md:mb-16" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* LEFT: Bio */}
          <div className="md:col-span-7 flex flex-col gap-8 md:gap-10">
            <motion.p
              initial={reduce ? false : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-[26px] leading-[1.6] text-[rgb(var(--fg))]/50 max-w-[50ch] font-medium"
            >
              Four years in <span className="text-[rgb(var(--fg))]">full-stack development</span>, working with clients across UAE, Nigeria, and Europe. I've engineered for luxury hospitality, fitness platforms, travel e-commerce, and Web3 platforms.
            </motion.p>

            <motion.p
              initial={reduce ? false : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-[26px] leading-[1.6] text-[rgb(var(--fg))]/50 max-w-[50ch] font-medium"
            >
              My process is <span className="text-[rgb(var(--fg))]">architecture-first.</span> I want to understand the business constraints and user needs before I write a single line of code.
            </motion.p>

            <motion.p
              initial={reduce ? false : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-[26px] leading-[1.6] text-[rgb(var(--fg))]/50 max-w-[50ch] font-medium"
            >
              I own the <span className="text-[rgb(var(--fg))]">full design and development scope,</span> from early research to shipped components. I like working in teams where technical decisions get debated properly, not just handed down.
            </motion.p>

            <motion.p
              initial={reduce ? false : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-[26px] leading-[1.6] text-[rgb(var(--fg))]/50 max-w-[50ch] font-medium"
            >
              Since 2019, I've focused on <span className="text-[rgb(var(--fg))]">building systems that last,</span> which keeps me honest about security, scale, and craft quality across the industry.
            </motion.p>

            <div className="mt-4 flex flex-wrap items-center gap-6">
              <MagneticLink
                href={content.identity.cvUrl}
                external
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest border border-[rgb(var(--line))]/30 rounded-full px-5 py-3 hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors"
              >
                View CV ↗
              </MagneticLink>
            </div>
          </div>

          {/* RIGHT: Experience + Stack */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-12">
            {/* Experience / Engagements block — company name BIG, category small, year right */}
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6 pb-3 border-b border-[rgb(var(--line))]/20">
                Experience
              </h3>
              <ul className="flex flex-col">
                {content.featuredProjects.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={reduce ? false : { x: 16, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5 border-b border-[rgb(var(--line))]/10"
                  >
                    <div>
                      <div className="font-display text-xl md:text-2xl uppercase tracking-tight leading-none">
                        {p.title}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-2">
                        {p.category}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 whitespace-nowrap">
                      {p.year ?? "—"}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-50">
                + {content.archiveProjects.length} archived engagements
              </div>
            </div>

            {/* Stack block */}
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6 pb-3 border-b border-[rgb(var(--line))]/20">
                Stack
              </h3>
              <ul className="flex flex-col">
                {content.stackGroups.map((g, i) => (
                  <motion.li
                    key={g.title}
                    initial={reduce ? false : { x: 16, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.4, delay: 0.02 * i }}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-4 py-2.5 border-b border-[rgb(var(--line))]/10"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
                      {g.title}
                    </span>
                    <span className="font-mono text-[11px] opacity-75 leading-relaxed">
                      {g.items.join(" · ")}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

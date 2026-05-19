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
        <div className="flex flex-col gap-24">
          
          {/* TOP: Image & Bio */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-start">
            
            {/* Image Box */}
            <motion.div 
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 lg:col-span-4 relative group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[rgb(var(--muted))]/10">
                {/* Darkening Overlay (as requested: a little darker, perfectly visible) */}
                <div className="absolute inset-0 bg-black/25 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-10" />
                
                <img 
                  src="/profile.jpeg" 
                  alt="Abdulhalim - Senior Full-Stack Developer" 
                  className="absolute inset-0 w-full h-full object-cover object-center grayscale-[15%] contrast-125 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Bio Text */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 md:gap-8 pt-4">
              <motion.h3
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.15] text-[rgb(var(--fg))]"
              >
                Engineering <span className="text-[rgb(var(--accent))]">resilient</span> digital experiences.
              </motion.h3>

              <motion.p
                initial={reduce ? false : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-[18px] leading-[1.65] text-[rgb(var(--fg))]/60 max-w-[60ch] font-medium"
              >
                Hi, I'm Abdulhalim. Over the past four years, I've engineered robust full-stack solutions for clients across the UAE, Nigeria, and Europe, focusing on luxury e-commerce, fitness platforms, and Web3 architectures.
              </motion.p>

              <motion.p
                initial={reduce ? false : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-[18px] leading-[1.65] text-[rgb(var(--fg))]/60 max-w-[60ch] font-medium"
              >
                My approach is strictly <span className="text-[rgb(var(--fg))]">architecture-first.</span> I believe in deeply understanding business constraints and user psychology before writing a single line of code.
              </motion.p>

              <motion.p
                initial={reduce ? false : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-[18px] leading-[1.65] text-[rgb(var(--fg))]/60 max-w-[60ch] font-medium"
              >
                I take ownership of the <span className="text-[rgb(var(--fg))]">entire product lifecycle</span>—from early system design to shipping flawless UI components. I thrive in environments where technical decisions are debated and crafted with precision.
              </motion.p>

              <div className="mt-4 flex flex-wrap items-center gap-6">
                <MagneticLink
                  href={content.identity.cvUrl}
                  external
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest border border-[rgb(var(--line))]/30 rounded-full px-6 py-4 hover:bg-[rgb(var(--fg))] hover:text-[rgb(var(--bg))] transition-colors"
                >
                  Download CV ↗
                </MagneticLink>
              </div>
            </div>
          </div>

          {/* BOTTOM: Experience + Stack (Side by side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pt-12 border-t border-[rgb(var(--line))]/10">
            
            {/* Experience block */}
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-8 pb-3 border-b border-[rgb(var(--line))]/20">
                Experience & Engagements
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
              <div className="mt-6 font-mono text-[10px] uppercase tracking-widest opacity-50">
                + {content.archiveProjects.length} archived engagements
              </div>
            </div>

            {/* Stack block */}
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-8 pb-3 border-b border-[rgb(var(--line))]/20">
                Technical Stack
              </h3>
              <ul className="flex flex-col">
                {content.stackGroups.map((g, i) => (
                  <motion.li
                    key={g.title}
                    initial={reduce ? false : { x: 16, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.4, delay: 0.02 * i }}
                    className="grid grid-cols-[120px_1fr] items-baseline gap-4 py-4 border-b border-[rgb(var(--line))]/10"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))] font-bold">
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

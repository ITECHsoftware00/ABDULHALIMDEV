"use client";

import { content } from "@/lib/content";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { RevealText } from "@/components/ui/RevealText";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[rgb(var(--line))] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-12 md:mb-16">
          [04] Get in touch
        </p>

        <RevealText
          as="h2"
          className="block font-display font-extrabold tracking-tight leading-[0.88] text-[clamp(40px,7vw,108px)]"
        >
          Say hi!
        </RevealText>

        <div className="mt-2 md:mt-4 flex items-start w-full">
          <MagneticLink
            href={`mailto:${content.identity.email}`}
            strength={0.25}
            className="block w-full font-display font-extrabold tracking-tight leading-[0.88] text-[clamp(40px,7vw,108px)] text-[rgb(var(--fg))]"
          >
            <span
              data-cursor="email"
              className="block w-full pb-[0.04em]"
            >
              Let&apos;s talk ↗
            </span>
          </MagneticLink>
        </div>

      </div>
    </section>
  );
}

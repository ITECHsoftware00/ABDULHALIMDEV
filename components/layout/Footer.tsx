"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/content";

function useLocalTime() {
  const [time, setTime] = useState<string>("—");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return mounted ? time : "—";
}

export function Footer() {
  const time = useLocalTime();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--line))]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs uppercase tracking-widest">
        <div>
          <div className="opacity-50 mb-2">Local time</div>
          <div>{time}</div>
        </div>
        <div>
          <div className="opacity-50 mb-2">Email</div>
          <a
            href={`mailto:${content.identity.email}`}
            className="hover:text-[rgb(var(--accent))] transition-colors"
            data-cursor="email"
          >
            {content.identity.email}
          </a>
        </div>
        <div>
          <div className="opacity-50 mb-2">Social</div>
          <div className="flex flex-col gap-1">
            <a
              href={content.identity.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[rgb(var(--accent))]"
              data-cursor="link"
            >
              LinkedIn ↗
            </a>
            <a
              href={content.identity.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[rgb(var(--accent))]"
              data-cursor="link"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div>
          <div className="opacity-50 mb-2">Built with</div>
          <div>Next.js · Framer Motion · Lenis</div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-6 font-mono text-[10px] uppercase tracking-widest opacity-40">
        © {year} {content.identity.name}
      </div>
    </footer>
  );
}

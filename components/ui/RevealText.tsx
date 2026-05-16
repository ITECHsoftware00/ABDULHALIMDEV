"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  splitBy?: "char" | "word";
};

export function RevealText({
  children,
  className,
  as = "span",
  delay = 0,
  splitBy = "word",
}: Props) {
  const reduce = useReducedMotion();
  const tokens = splitBy === "char" ? Array.from(children) : children.split(/(\s+)/);
  const stagger = splitBy === "char" ? 0.018 : 0.04;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.span;

  return (
    <MotionTag className={cn("inline-block", className)} aria-label={children}>
      {tokens.map((tok, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "120%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          className="inline-block"
        >
          {tok === " " ? " " : tok}
        </motion.span>
      ))}
    </MotionTag>
  );
}

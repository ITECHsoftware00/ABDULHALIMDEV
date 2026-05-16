"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("@/components/motion/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
    </>
  );
}

import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const dynamic = "force-static";
export const alt = `${content.identity.name} — ${content.identity.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f5f1e8",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          <span>● {content.identity.name.split(" ")[0].toLowerCase()}</span>
          <span>2026 / Available</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
          <span
            style={{
              fontSize: 168,
              fontWeight: 900,
              letterSpacing: -6,
              textTransform: "uppercase",
            }}
          >
            Abdulhalim
          </span>
          <span
            style={{
              fontSize: 168,
              fontWeight: 900,
              letterSpacing: -6,
              textTransform: "uppercase",
              color: "#ff3b14",
            }}
          >
            Oladimeji.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{content.identity.role}</span>
          <span style={{ opacity: 0.6 }}>4+ yrs · 15+ projects</span>
        </div>
      </div>
    ),
    size
  );
}

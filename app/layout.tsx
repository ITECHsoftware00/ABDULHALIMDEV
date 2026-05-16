import type { Metadata } from "next";
import "./globals.css";
import { syne, jetbrainsMono, inter, troisMille, beatriceDisplay, beatrice } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { content } from "@/lib/content";

const SITE_URL = "https://abdulhalim.dev"; // TODO: replace with deployed domain
const TITLE = `${content.identity.name} — ${content.identity.role}`;
const DESCRIPTION = `${content.identity.role}. ${content.identity.tagline} ${content.identity.yearsExperience}+ years shipping production APIs, real-time apps, and blockchain platforms.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${content.identity.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Backend Developer",
    "Full-Stack Developer",
    "Blockchain Developer",
    "Smart Contracts",
    "Web3",
    "Node.js",
    "Solidity",
    "Flutter",
    "React",
    "Next.js",
    "API Integration",
    "Real-Time Systems",
    "Abdulhalim Oladimeji",
  ],
  authors: [{ name: content.identity.name, url: content.identity.socials.linkedin }],
  creator: content.identity.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: content.identity.name,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: content.identity.name,
  jobTitle: content.identity.role,
  email: `mailto:${content.identity.email}`,
  url: SITE_URL,
  sameAs: [content.identity.socials.linkedin, content.identity.socials.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${troisMille.variable} ${beatriceDisplay.variable} ${beatrice.variable} ${syne.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

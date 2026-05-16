import { Syne, JetBrains_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

// Brand Fonts (Local)
// Note: Ensure the corresponding .woff2 files are placed in public/fonts/
export const troisMille = localFont({
  src: "../public/fonts/TroisMille-Regular.woff2",
  variable: "--font-trois-mille",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const beatriceDisplay = localFont({
  src: "../public/fonts/BeatriceDisplay-Medium.woff2",
  variable: "--font-beatrice-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const beatrice = localFont({
  src: "../public/fonts/Beatrice-Regular.woff2",
  variable: "--font-beatrice",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Fallback Google Fonts
export const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

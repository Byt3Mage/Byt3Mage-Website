import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Byt3Mage — Systems Programmer & Game Developer",
  description:
    "Ireoluwa Alayaki (Byt3Mage) — Systems programmer, game engine developer, and tools/framework engineer. Building high-performance systems, engines, and developer tools.",
  keywords: [
    "systems programmer",
    "game developer",
    "Rust",
    "game engine",
    "ECS",
    "Ireoluwa Alayaki",
    "Byt3Mage",
  ],
  authors: [{ name: "Ireoluwa Alayaki", url: "https://github.com/Byt3Mage" }],
  openGraph: {
    title: "Byt3Mage — Systems Programmer & Game Developer",
    description:
      "Building high-performance systems, engines, and developer tools.",
    url: "https://byt3mage.dev",
    siteName: "Byt3Mage",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byt3Mage — Systems Programmer & Game Developer",
    description:
      "Building high-performance systems, engines, and developer tools.",
    creator: "@i_alayaki",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
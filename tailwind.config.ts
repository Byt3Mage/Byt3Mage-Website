import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#dfff00",
        bg: {
          DEFAULT: "#080808",
          surface: "#0f0f0f",
          card: "#111111",
          "card-hover": "#161616",
        },
        border: {
          DEFAULT: "#1e1e1e",
          accent: "rgba(223,255,0,0.3)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        display: ["var(--font-display)", "Syne", "sans-serif"],
      },
      boxShadow: {
        accent: "0 0 20px rgba(223,255,0,0.15), 0 0 40px rgba(223,255,0,0.05)",
        "accent-sm": "0 0 16px rgba(223,255,0,0.08)",
        glow: "0 0 30px rgba(223,255,0,0.08), 0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "480px" } },
    extend: {
      colors: {
        // BRAND-DNA tokens (light default)
        bg: { DEFAULT: "hsl(var(--bg))", subtle: "hsl(var(--bg-subtle))" },
        border: "hsl(var(--border))",
        text: { DEFAULT: "hsl(var(--text))", subtle: "hsl(var(--text-subtle))" },
        accent: "hsl(var(--accent))",
        warn: "hsl(var(--warn))",
        wrong: "hsl(var(--wrong))",
      },
      fontSize: {
        display: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        h1: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.4", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      transitionDuration: { DEFAULT: "150ms", long: "250ms" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

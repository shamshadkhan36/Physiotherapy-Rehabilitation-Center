import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a2540",
          navyDark: "#06182c",
          navyLight: "#163a63",
          teal: "#0d9488",
          tealHover: "#0f766e",
          tealLight: "#ccfbf1",
          teal50: "#f0fdfa",
          gold: "#d97706",
          goldLight: "#fef3c7",
          goldDark: "#b45309",
          amber: "#f59e0b",
          ice: "#f0f9ff",
          slate: "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        hindi: ["var(--font-hindi)", "Noto Sans Devanagari", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        card: "0 10px 30px -4px rgba(15, 23, 42, 0.08)",
        elevated: "0 20px 40px -6px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

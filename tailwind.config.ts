import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          navy: {
            DEFAULT: "#142B49",
            light: "#1e3a63",
            dark: "#0d1b2e",
            muted: "#334b6b",
          },
          teal: {
            DEFAULT: "#16A085",
            light: "#1abc9c",
            dark: "#117a65",
            hover: "#138d75",
          },
          slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
          },
          accent: {
            amber: "#F39C12",
            rose: "#E74C3C",
            emerald: "#2ECC71",
            indigo: "#4A90E2",
          }
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(20, 43, 73, 0.08), 0 1px 4px -1px rgba(20, 43, 73, 0.04)",
        cardHover: "0 10px 25px -5px rgba(20, 43, 73, 0.12), 0 8px 10px -6px rgba(20, 43, 73, 0.08)",
        nav: "0 1px 3px 0 rgba(20, 43, 73, 0.06), 0 1px 2px -1px rgba(20, 43, 73, 0.04)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        card: "0.75rem",
      }
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

// Design tokens - Module Location de Véhicules AKWABA AFRICA
// Palette "route de nuit" : asphalte profond + ambre phare + turquoise disponibilité
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        asphalt: {
          950: "#0D1016",
          900: "#12151C",
          800: "#1B2029",
          700: "#252B37",
          600: "#333B4A",
        },
        amber: {
          400: "#F0B75B",
          500: "#E8A33D",
          600: "#C97F1F",
        },
        route: {
          400: "#6EE7DB",
          500: "#4FD1C5",
          600: "#31A79C",
        },
        sand: {
          50: "#F5F3EE",
          200: "#DAD5C8",
          400: "#B4AD9C",
        },
        danger: "#E5574B",
      },
      fontFamily: {
        display: ["'Poppins'", "'Space Grotesk'", "sans-serif"],
        body: ["'Poppins'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "route-line":
          "repeating-linear-gradient(90deg, var(--tw-gradient-stops) 0 24px, transparent 24px 40px)",
      },
    },
  },
  plugins: [],
} satisfies Config;

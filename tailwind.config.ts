import type { Config } from "tailwindcss";

// Design tokens AKWABA AFRICA
// Hébergements (maquette) : navy + orange brand ; legacy véhicules : asphalt / amber / route
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#07111F",
          900: "#0D1B3D",
          800: "#123056",
          700: "#1A3F6D",
        },
        brand: {
          400: "#FF7A33",
          500: "#FF5C00",
          600: "#E55200",
        },
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
        body: ["'Poppins'", "'Be Vietnam Pro'", "'Inter'", "sans-serif"],
        vietnam: ["'Be Vietnam Pro'", "sans-serif"],
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

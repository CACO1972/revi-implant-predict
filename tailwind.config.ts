
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: "#0A1828",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#178582",
          dark: "#126E6B",
          light: "#1C9C98",
          foreground: "#FFFFFF"
        },
        gold: {
          DEFAULT: "#BFA181",
          dark: "#A68A6B",
          light: "#D4B797",
        },
        button: {
          dark: "#1A202C",
        },
      },
      fontFamily: {
        'formula': ['Formula1', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(23, 133, 130, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;


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
        background: "#0A1828", // Azul oscuro clínico principal
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#178582", // Turquesa IA
          dark: "#126E6B",
          light: "#1C9C98",
          foreground: "#FFFFFF"
        },
        gold: {
          DEFAULT: "#BFA181", // Dorado refinado
          50: "#F8F5F0",
          100: "#F1EAE2",
          200: "#E7DBC9",
          300: "#DBCAAD",
          400: "#CAB595",
          500: "#BFA181", // Our main gold color
          600: "#A68A6B",
          700: "#8C7357",
          800: "#725C44",
          900: "#594831",
        },
        starry: {
          DEFAULT: "#0A1828", // Azul oscuro principal
          darker: "#071320",
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.12)",
        glow: "0 0 15px rgba(23, 133, 130, 0.2)",
        'gold-glow': "0 0 15px rgba(191, 161, 129, 0.25)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "star-glow": "star-glow 3s ease-in-out infinite alternate",
        "star-float": "star-float 15s ease-in-out infinite",
        "background-pan": "background-pan 45s linear infinite",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 15s linear infinite",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "star-glow": {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.8" },
        },
        "star-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "background-pan": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(0.98)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "stars": "url('/lovable-uploads/19481b4c-abe4-45b5-849c-180b7603e111.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

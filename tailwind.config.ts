import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          red: "#ff2742",
          blue: "#00d4ff",
          purple: "#b026ff",
        },
        dark: {
          bg: "#0a0a0f",
          panel: "rgba(15, 15, 25, 0.8)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "glitch": "glitch 0.3s ease-in-out",
        "flicker": "flicker 0.15s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "chromatic": "chromatic 0.2s ease-in-out",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 39, 66, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 39, 66, 0.8)" },
        },
        chromatic: {
          "0%, 100%": { filter: "drop-shadow(0 0 0 rgba(255, 0, 0, 0))" },
          "50%": { filter: "drop-shadow(-2px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(2px 0 0 rgba(0, 0, 255, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


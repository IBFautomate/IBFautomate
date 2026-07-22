/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#050807",
          surface: "#0A0F0D",
        },
        day: {
          DEFAULT: "#F7FAF8",
          text: "#0A0F0D",
        },
        brand: {
          DEFAULT: "#00E676",
          emerald: "#10B981",
          dark: "#064E3B",
          deep: "#047857",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #00E676, #059669, #064E3B)",
      },
      boxShadow: {
        "glow-brand": "0 0 24px rgba(0, 230, 118, 0.35)",
        "glow-brand-sm": "0 0 12px rgba(0, 230, 118, 0.25)",
      },
      borderRadius: {
        island: "22px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.25)", opacity: "0.15" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-28px) scale(1.05)" },
        },
        "float-alt": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(20px, 24px) scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-in-out infinite",
        float: "float 14s ease-in-out infinite",
        "float-alt": "float-alt 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

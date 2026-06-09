import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        foam: "#f8fafc",
        ink: "#0f172a",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(15, 118, 110, 0.12)",
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px -8px rgba(15, 118, 110, 0.1)",
        glow: "0 0 0 1px rgba(45, 212, 191, 0.2), 0 12px 40px -12px rgba(13, 148, 136, 0.25)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(45, 212, 191, 0.2), transparent 50%), radial-gradient(ellipse 70% 50% at 90% 10%, rgba(56, 189, 248, 0.14), transparent 45%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(16, 185, 129, 0.08), transparent 50%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,253,250,0.6) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

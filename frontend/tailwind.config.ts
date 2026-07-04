import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#C43C88",
        accentDim: "#8f2c63",
        darkBg: "#3a1228",
        darkPanel: "#2a0c1d",
        lightBg: "#F8EAF2",
        ok: "#4fb787",
        warn: "#e0a63c",
        danger: "#e5486f",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

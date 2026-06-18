import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        panel: "var(--panel)",
        "panel-soft": "var(--panel-soft)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        danger: "var(--danger)"
      },
      boxShadow: {
        panel: "0 16px 40px rgba(31, 35, 30, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

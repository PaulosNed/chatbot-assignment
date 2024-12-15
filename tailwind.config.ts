import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        surface: "var(--surface)",
        primaryContainer: "var(--primary-container)",
        secondaryContainer: "var(--secondary-container)",
        onPrimaryContainer: "var(--on-primary-container)",
        surfaceContainerHigh: "var(--surface-container-high)",
        surfaceContainerLow: "var(--surface-container-low)",
        onSurfaceVariant: "var(--on-surface-variant)",
      },
    },
  },
  plugins: [],
} satisfies Config;

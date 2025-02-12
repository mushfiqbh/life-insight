import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deepcolor: "var(--color-deep)",
        redcolor: "var(--color-red)",
        silvercolor: "var(--color-silver)",
      },
    },
  },
  plugins: [],
} satisfies Config;

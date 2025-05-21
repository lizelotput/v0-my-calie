import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        indosuez: {
          DEFAULT: "#cfb07b",
          light: "#dac59a",
          dark: "#b99b5a",
          50: "#f9f5ea",
          100: "#f0e8d0",
          200: "#e6d9b5",
          300: "#dbc99a",
          400: "#d3bc85",
          500: "#cfb07b",
          600: "#c0a16c",
          700: "#b09159",
          800: "#a08247",
          900: "#806735",
        },
        gold: {
          DEFAULT: "#cfb07b",
          light: "#dac59a",
          dark: "#b99b5a",
        },
        navy: {
          DEFAULT: "#1A1F2E",
          light: "#2A3040",
          dark: "#0A0F1E",
        },
        publication: {
          monthly: "#007bff",
          outlook: "#265C85",
          perspectives: "#033059",
          "market-news": "#cfb07b",
        },
        beige: "#f1eeec",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideInDown: {
          from: { transform: "translateY(-100%)", visibility: "visible" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideInDown: "slideInDown 0.5s",
      },
      letterSpacing: {
        widest: "0.25em",
      },
      fontVariantCaps: {
        "small-caps": "small-caps",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".font-variant-small-caps": {
          fontVariant: "small-caps",
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config

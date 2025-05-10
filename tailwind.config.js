import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
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
        // Custom KAS colors
        "kas-green": "hsl(var(--kas-green))",
        "kas-red": "hsl(var(--kas-red))",
        "kas-black": "hsl(var(--kas-black))",
        // Unauthorized page specific
        "unauthorized-bg": "hsl(var(--unauthorized-bg))",
        "unauthorized-text": "hsl(var(--unauthorized-text))",
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
        "unauthorized-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "fadeIn": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slideInFromLeft": {
          "0%": { transform: "translateX(-10%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        "slideInFromRight": {
          "0%": { transform: "translateX(10%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        "pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "dialog-overlay-show": {
          "from": { opacity: "0" },
          "to": { opacity: "1" }
        },
        "dialog-content-show": {
          "from": { 
            opacity: "0", 
            transform: "translate(-50%, -48%) scale(0.96)" 
          },
          "to": { 
            opacity: "1", 
            transform: "translate(-50%, -50%) scale(1)" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "unauthorized-pulse": "unauthorized-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fadeIn": "fadeIn 0.8s ease-out forwards",
        "slideInFromLeft": "slideInFromLeft 0.8s ease-out forwards",
        "slideInFromRight": "slideInFromRight 0.8s ease-out forwards",
        "pulse": "pulse 2s infinite ease-in-out",
        "float": "float 3s infinite ease-in-out",
        "shimmer": "shimmer 3s infinite linear",
        "dialog-overlay": "dialog-overlay-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-content": "dialog-content-show 150ms cubic-bezier(0.16, 1, 0.3, 1)"
      },
      backgroundSize: {
        "200%": "200%"
      },
      transitionProperty: {
        "height": "height",
        "width": "width",
        "size": "width, height",
        "dialog": "opacity, transform"
      },
      zIndex: {
        "dialog": "50",
        "dropdown": "40",
        "tooltip": "30"
      }
    },
  },
  plugins: [
    tailwindAnimate,
    require("@tailwindcss/container-queries"),
    require("tailwindcss-logical")
  ],
};

export default config;
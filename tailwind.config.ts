import typography from "@tailwindcss/typography"
import animations from "tailwindcss-animate"
import { fontFamily } from "tailwindcss/defaultTheme"

import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.tsx", "mdx-components.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [animations, typography()]
} satisfies Config

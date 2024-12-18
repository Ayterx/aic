import type { NextConfig } from "next"

import "./src/env.js"

import createMDX from "@next/mdx"

const config: NextConfig = {
  experimental: {
    reactOwnerStack: true,
    mdxRs: true
  },
  pageExtensions: ["md", "mdx", "ts", "tsx"]
}

const withMDX = createMDX({})

export default withMDX(config)

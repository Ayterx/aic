import { GridLayout, GridPlus } from "~/components/gridStyle"

import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    hr: () => (
      <div className="absolute left-0 h-px w-full">
        <GridPlus position="top-left" />
        <GridPlus position="top-right" />
        <GridLayout style="b" />
      </div>
    )
  }
}

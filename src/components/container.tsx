import clsx from "clsx"

import { GridLayout } from "./gridStyle"

import type { ElementType, ReactNode } from "react"

export const Container = ({
  as,
  children,
  className
}: {
  as?: ElementType
  children: ReactNode
  className?: string
}) => {
  const Element = as ?? "div"

  return (
    <Element className={clsx("relative mx-auto max-w-4xl pt-12", className)}>
      <GridLayout style="x" />
      {children}
    </Element>
  )
}

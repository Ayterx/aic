import Link from "next/link"
import clsx from "clsx"
import { div as MotionDiv } from "framer-motion/client"

import { AnimatePresence } from "~/components/animatePresence"
import { GridLayout, GridPlus } from "~/components/gridStyle"
import { CustomTest } from "./_tests/custom"
import { ProgrammingTest } from "./_tests/programing"

const tests = ["programing", "custom"] as const

type TestType = (typeof tests)[number]

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ type: TestType | undefined }>
}) {
  let { type } = await searchParams

  if (!type || !tests.includes(type)) type = "programing"

  return (
    <section className="relative">
      <ul className="relative flex gap-4 p-4">
        <GridPlus position="bottom-left" />
        <GridPlus position="bottom-right" />
        <GridLayout style="b" />

        {tests.map((test) => (
          <Link
            key={test}
            href={`/?type=${test}`}
            className={clsx("relative px-4 py-1 font-medium capitalize transition-colors", {
              "text-neutral-400 hover:text-neutral-100 focus:text-neutral-100": type !== test
            })}
          >
            {test === type && (
              <MotionDiv
                className="absolute inset-0 -z-50 rounded bg-blue-500"
                layoutId="type-indicator"
              />
            )}
            {test}
          </Link>
        ))}
      </ul>

      <AnimatePresence>
        {type === "programing" ? <ProgrammingTest /> : <CustomTest />}
      </AnimatePresence>
    </section>
  )
}

import clsx from "clsx"

import { GridLayout, GridPlus } from "~/components/gridStyle"
import { skeletonClasses } from "~/components/skeleton"

export default function Loading() {
  return (
    <section>
      <h1 className="px-4 pb-1.5 text-4xl font-bold">Tests</h1>

      <ol className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <GridLayout style="lt" />
        <GridPlus position="top-left" />
        <GridPlus position="bottom-left" />
        <GridPlus position="top-right" />
        <GridPlus position="bottom-right" />

        {Array(44)
          .fill("tests loader")
          .map((_, index) => (
            <li
              key={`test loader ${index}`}
              className="relative flex items-center justify-between px-4 py-2 transition-colors hover:bg-neutral-800 focus:bg-neutral-800"
            >
              <GridLayout style="b" />
              <GridLayout style="l" />

              <div>
                <div className="flex text-lg font-medium leading-tight text-neutral-500">
                  # <div className={clsx("h-5 w-6 rounded", skeletonClasses)} />
                </div>
                <div className="flex gap-1 text-xs leading-tight text-neutral-400">
                  <div className={clsx("h-[15px] w-4 rounded", skeletonClasses)} />
                  Students
                </div>
              </div>
              <div className={clsx("h-4 w-16 rounded", skeletonClasses)} />
            </li>
          ))}
      </ol>
    </section>
  )
}

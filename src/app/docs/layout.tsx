import { GridLayout, GridPlus } from "~/components/gridStyle"
import { PathIndicator } from "./_components/pathIndicator"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative p-4">
        <GridPlus position="bottom-left" />
        <GridPlus position="bottom-right" />
        <GridLayout style="b" />
        <PathIndicator />
      </div>
      <div className="prose prose-neutral prose-invert w-full max-w-none px-4 pt-4 prose-a:text-blue-500">
        {children}
      </div>
    </>
  )
}

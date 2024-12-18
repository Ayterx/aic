import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { database } from "~/server/database"
import { testTable } from "~/server/database/schema"
import { GridLayout, GridPlus } from "../gridStyle"
import { Links } from "./links"

const TestsCount = async () => {
  const count = await database.$count(testTable)

  return count
}

export const Navbar = () => (
  <header className="relative mx-auto grid h-16 max-w-4xl grid-cols-2 items-center px-4 md:grid-cols-3">
    <GridLayout style="x-b" />
    <GridPlus position="bottom-left" />
    <GridPlus position="bottom-right" />

    <nav className="flex gap-4">
      <Links />
    </nav>

    <div className="relative -z-50 flex items-center justify-center max-md:hidden">
      <Image
        src="/logo.png"
        alt="Logo"
        width={48}
        height={48}
        className="pointer-events-none z-20 select-none"
      />
      <div className="absolute -top-24 h-40 w-40 rotate-45 border border-neutral-800 bg-neutral-900" />
      <div className="absolute -top-16 h-20 w-20 rotate-45 border border-neutral-800" />
      <div className="absolute -top-16 h-20 w-20 rotate-45 bg-blue-500/30 blur-3xl" />
    </div>

    <div className="justify-self-end">
      <Link
        href="/tests"
        className="flex items-center gap-1 rounded border border-blue-500/20 bg-blue-500/20 px-6 py-1.5 font-bold transition-colors hover:bg-blue-500/40 focus:bg-blue-500/40"
      >
        Tests{" "}
        <span className="text-sm text-neutral-400">
          <Suspense fallback={"0"}>
            <TestsCount />
          </Suspense>
        </span>
      </Link>
    </div>
  </header>
)

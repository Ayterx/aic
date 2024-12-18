"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { div as MotionDiv } from "framer-motion/client"

const links = [
  {
    title: "General",
    href: "/docs"
  },
  {
    title: "Deployment",
    href: "/docs/deployment"
  },
  {
    title: "Upload Answers",
    href: "/docs/upload-answers"
  }
]

export const PathIndicator = () => {
  const pathname = usePathname()

  return (
    <ul className="flex w-full flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "relative px-4 py-1 font-medium transition-colors max-sm:w-full max-sm:text-center",
            {
              "text-neutral-400 hover:text-neutral-100 focus:text-neutral-100":
                pathname !== link.href
            }
          )}
        >
          {link.title}

          {pathname === link.href && (
            <MotionDiv
              layoutId="docs-path-indicator"
              className="absolute inset-0 -z-50 rounded bg-blue-500"
            />
          )}
        </Link>
      ))}
    </ul>
  )
}

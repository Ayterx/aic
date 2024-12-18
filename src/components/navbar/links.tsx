"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export const links = [
  {
    href: "/",
    label: "New test"
  },
  {
    href: "/docs",
    label: "Docs"
  }
]

export const Links = () => {
  const pathname = usePathname()

  return links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={clsx(
        "group relative flex items-center justify-center whitespace-nowrap rounded px-3.5 py-1 font-medium transition-colors duration-300",
        {
          "text-neutral-500 hover:text-neutral-100 focus:text-neutral-100": pathname !== link.href
        }
      )}
    >
      {link.label}
    </Link>
  ))
}

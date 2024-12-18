"use client"

import { AnimatePresence as AP } from "framer-motion"

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => (
  <AP mode="wait">{children}</AP>
)

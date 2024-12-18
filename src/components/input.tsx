import { useRef } from "react"
import clsx from "clsx"

import type { ComponentProps } from "react"

export const inputStyle = clsx(
  "rounded border w-full border-neutral-800 bg-transparent px-3.5 py-2 outline-none transition-colors text-neutral-400 hover:text-neutral-100 focus:text-neutral-100 placeholder:text-neutral-400 focus:border-blue-500/60 focus:bg-blue-500/10 hover:border-blue-500/60 hover:bg-blue-500/10"
)

export const Input = ({ className, type, ...props }: ComponentProps<"input">) => (
  <input type={type} className={clsx(inputStyle, className)} {...props} />
)

export const Textarea = ({ className, ...props }: ComponentProps<"textarea">) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  return (
    <textarea
      ref={ref}
      onInput={() => {
        const textarea = ref.current

        if (textarea) {
          textarea.style.height = "auto"
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      }}
      className={clsx(inputStyle, className)}
      {...props}
    />
  )
}

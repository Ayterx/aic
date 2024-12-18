import clsx from "clsx"

export const GridLayout = ({
  style
}: {
  style: "x" | "y" | "x-y" | "x-b" | "b" | "lt" | "l" | "r"
}) => (
  <>
    {(style === "x" ||
      style === "x-y" ||
      style === "x-b" ||
      style === "lt" ||
      style === "l" ||
      style === "r") && (
      <div
        className={clsx("absolute inset-0 -z-50", {
          "before:absolute before:left-0 before:h-full before:w-px before:bg-neutral-800":
            style === "x" || style === "x-y" || style === "x-b" || style === "lt" || style === "l",
          "after:absolute after:right-0 after:h-full after:w-px after:bg-neutral-800":
            style === "x" || style === "x-y" || style === "x-b" || style === "r"
        })}
      />
    )}
    {(style === "y" || style === "b" || style === "x-y" || style === "x-b" || style === "lt") && (
      <div
        className={clsx("absolute inset-0 -z-50", {
          "before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-neutral-800":
            style === "y" || style === "x-y" || style === "lt",
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-neutral-800":
            style === "y" || style === "x-y" || style === "x-b" || style === "b"
        })}
      />
    )}
  </>
)

export const GridPlus = ({
  position
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) => (
  <>
    <div
      className={clsx("absolute z-20 h-4 w-px bg-neutral-700", {
        "-top-2": position === "top-left" || position === "top-right",
        "-bottom-2": position === "bottom-left" || position === "bottom-right",
        "left-0": position === "top-left" || position === "bottom-left",
        "right-0": position === "top-right" || position === "bottom-right"
      })}
    />
    <div
      className={clsx("absolute z-20 h-px w-4 bg-neutral-700", {
        "-left-2": position === "top-left" || position === "bottom-left",
        "-right-2": position === "top-right" || position === "bottom-right",
        "top-0": position === "top-left" || position === "top-right",
        "bottom-0": position === "bottom-left" || position === "bottom-right"
      })}
    />
  </>
)

"use client"

import { forwardRef } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import {
  Close,
  Content,
  Description,
  Root as DialogRoot,
  Overlay,
  Portal,
  Title,
  Trigger
} from "@radix-ui/react-dialog"
import clsx from "clsx"

import type { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react"

export const Dialog = DialogRoot
export const DialogClose = Close
export const DialogPortal = Portal
export const DialogTrigger = Trigger

export const DialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={clsx(
      "fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:items-center",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = Overlay.displayName

export const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay>
      <Content
        ref={ref}
        className={clsx(
          "relative z-50 grid w-full max-w-lg gap-4 border border-neutral-800 bg-neutral-900 p-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <Close className="absolute right-2 top-2 rounded-sm bg-red-500/10 text-red-500 opacity-70 ring-offset-red-500 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:pointer-events-none">
          <XMarkIcon className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </DialogOverlay>
  </DialogPortal>
))
DialogContent.displayName = Content.displayName

export const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

export const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

export const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={clsx("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = Title.displayName

export const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={clsx("text-sm text-neutral-500", className)} {...props} />
))
DialogDescription.displayName = Description.displayName

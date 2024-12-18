"use client"

import { forwardRef } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion"
import clsx from "clsx"

import type { ComponentPropsWithoutRef, ElementRef } from "react"

export const Accordion = Root

export const AccordionItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item ref={ref} className={clsx("border-b border-neutral-800", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Header className="flex">
    <Trigger
      ref={ref}
      className={clsx(
        "flex flex-1 items-center justify-between rounded px-4 py-2 font-medium text-neutral-400 transition-all hover:underline data-[state=open]:bg-neutral-800 data-[state=open]:text-neutral-100 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Trigger>
  </Header>
))
AccordionTrigger.displayName = Trigger.displayName

export const AccordionContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={clsx("p-2 pb-0", className)}>{children}</div>
  </Content>
))

AccordionContent.displayName = Content.displayName

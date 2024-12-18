"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { form as MotionForm } from "framer-motion/client"

import { inputStyle, Textarea } from "~/components/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/components/interface/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/interface/select"
import { Switch } from "~/components/interface/switch"
import { programmingCorrectorAction } from "~/server/actions/programmingCorrectorAction"
import { programmingLanguages } from "~/utils/programmingLanguages"

export const ProgrammingTest = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<number | null>(null)

  // Advanced Features
  const [referenceCode, setReferenceCode] = useState(false)

  const [isLoading, setIsLoading] = useTransition()
  const [state, setState] = useState<Awaited<ReturnType<typeof programmingCorrectorAction>> | null>(
    null
  )

  useEffect(() => {
    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement

      if (input.files && input.files.length > 0) setFiles(input.files.length)
    }

    const inputElement = fileRef.current

    if (inputElement) inputElement.addEventListener("change", handleFileChange)

    return () => {
      if (inputElement) inputElement.removeEventListener("change", handleFileChange)
    }
  }, [])

  return (
    <MotionForm
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 16, opacity: 0 }}
      onSubmit={async (event) => {
        event.preventDefault()

        const form = new FormData(event.currentTarget)

        setIsLoading(async () => {
          const state = await programmingCorrectorAction(form)

          setState(state)
        })
      }}
      className="w-full p-4"
    >
      {state?.status === "error" && (
        <div className="mb-2 flex gap-4 rounded border border-red-500/20 bg-red-500/10 p-4 text-red-500">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <div>
            <span className="block font-mono font-bold capitalize leading-none">{state.type}</span>
            <span className="text-sm">{state.message}</span>
          </div>
        </div>
      )}
      <input type="file" name="file" accept=".txt" className="hidden" multiple ref={fileRef} />

      <Textarea placeholder="Question" name="question" rows={1} className="min-h-[42px]" />
      <div className="grid grid-cols-2 gap-2">
        <Select name="language">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {programmingLanguages.map((language) => (
              <SelectItem key={language.label} value={language.name}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={clsx(inputStyle, "flex items-center justify-between gap-4")}
        >
          <div className="flex items-center gap-2">
            {files ? (
              <>
                <DocumentIcon className="h-5 w-5" />
                {files} {files > 1 ? "Files" : "File"}
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="h-5 w-5" />
                Upload
              </>
            )}
          </div>

          <Link
            href="/docs/upload-answers"
            target="_blank"
            className="text-neutral-400 hover:text-neutral-100 focus:text-neutral-100"
          >
            <InformationCircleIcon className="h-5 w-5" />
          </Link>
        </button>
        {referenceCode && (
          <Textarea
            placeholder="Reference Code"
            name="referenceCode"
            rows={1}
            className="col-span-2 min-h-[42px] font-mono"
          />
        )}
      </div>
      <Accordion type="single" collapsible className="mt-2 w-full">
        <AccordionItem value="af" className="rounded border-none">
          <AccordionTrigger className="bg-neutral-800/60 text-sm">
            Advanced features
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-between rounded bg-neutral-800 px-4 py-2">
              <div>
                <span className="font-semibold">Reference Code</span>
                <p className="text-sm text-neutral-400">
                  Compare a student&apos;s code to your predefined reference code and get feedback
                  on how closely it matches.
                </p>
              </div>
              <Switch onCheckedChange={(checked) => setReferenceCode(checked)} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-500 px-6 py-1.5 font-bold disabled:opacity-60"
        >
          {isLoading ? "Submiting..." : "Submit"}
        </button>
      </div>
    </MotionForm>
  )
}

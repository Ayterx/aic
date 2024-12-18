"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { ArrowUpTrayIcon, DocumentIcon, InformationCircleIcon } from "@heroicons/react/20/solid"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { form as MotionForm } from "framer-motion/client"

import { inputStyle, Textarea } from "~/components/input"
import { customCorrectorAction } from "~/server/actions/customCorrectorAction"

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <label className={clsx("mb-1 block font-medium text-neutral-300", className)}>{children}</label>
  )
}

export const CustomTest = () => {
  const [system, setSystem] = useState("")
  const [prompt, setPrompt] = useState("")

  const fileRef = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<number | null>(null)

  const [isLoading, setIsLoading] = useTransition()
  const [state, setState] = useState<Awaited<ReturnType<typeof customCorrectorAction>> | null>(null)

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
          const state = await customCorrectorAction(form)

          setState(state)
        })
      }}
      className="p-4"
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

      <Label className="flex items-center gap-1">
        AI Instructions
        <Link
          href="https://platform.openai.com/docs/guides/text-generation#system-messages"
          target="_blank"
          className="text-neutral-500 transition-colors hover:text-neutral-100 focus:text-neutral-100"
        >
          <InformationCircleIcon className="h-5 w-5" />
        </Link>
      </Label>
      <Textarea
        onChange={(event) => setSystem(event.target.value)}
        name="system"
        placeholder="You are a programming instructor. Your task is to check if the student's programming ans..."
      />

      <Label className="mt-2">
        Prompt{" "}
        <span className="text-sm text-neutral-500">Use ${`{file}`} for student answer file</span>
      </Label>
      <Textarea
        onChange={(event) => setPrompt(event.target.value)}
        name="prompt"
        placeholder="Check this file content ${file} and make sure..."
      />

      <div className="mt-2 grid grid-cols-2 gap-4">
        <div />
        <div>
          <Label className="flex items-center gap-1">
            Files
            <Link
              href="/docs/upload-answers"
              target="_blank"
              className="text-neutral-500 transition-colors hover:text-neutral-100 focus:text-neutral-100"
            >
              <InformationCircleIcon className="h-5 w-5" />
            </Link>
          </Label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={clsx(inputStyle, "flex h-[42px] items-center gap-4 self-end")}
          >
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
          </button>
        </div>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-500 px-6 py-1.5 font-bold disabled:opacity-60"
        >
          {isLoading ? "Submiting..." : "Submit"}
        </button>
      </div>

      <Label className="mt-8">Request</Label>
      <pre
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              system: system,
              prompt: prompt,
              files: files
            },
            null,
            2
          )
            .replace(/\\n/g, "\n")
            .replace(/(".*?")(?=:)/g, '<span class="text-[#ffb63b]">$&</span>')
            .replace(/: ("[^"]*"|\d+)/g, ': <span class="text-[#42dd76]">$1</span>')
            .replace(/\$\{file\}/g, '<span class="text-[#d16969]">$&</span>')
        }}
        className="whitespace-pre-wrap rounded-md bg-neutral-950 p-4 text-neutral-500"
      />
    </MotionForm>
  )
}

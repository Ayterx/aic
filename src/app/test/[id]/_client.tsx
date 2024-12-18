"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import useSWR from "swr"

import { GridLayout, GridPlus } from "~/components/gridStyle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/interface/dialog"
import { sortTypes } from "./_utils"

import type { getTest } from "~/app/api/test/getTest"

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json())

export const Client = ({
  children,
  fallbackData,
  test,
  sortType
}: {
  children: React.ReactNode
  fallbackData: Awaited<ReturnType<typeof getTest>>
  test: {
    id: number
    status: string
    hasReferenceCode: boolean
  }
  sortType: (typeof sortTypes)[number]
}) => {
  const [shouldRefresh, setShouldRefresh] = useState(test.status !== "completed")
  const { data } = useSWR<Awaited<ReturnType<typeof getTest>>>(
    `/api/test?id=${test.id}&sort=${sortType}`,
    fetcher,
    {
      fallbackData: fallbackData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
      ...(shouldRefresh && { refreshInterval: 1500 }),
      onSuccess: (data) => {
        if (data?.status === "completed") setShouldRefresh(false)
      }
    }
  )

  if (!data) return null

  return (
    <>
      <section className="relative">
        <div className="flex justify-between">
          <h1 className="px-4 pb-1 text-7xl font-bold leading-none">
            <span
              className={clsx("text-neutral-600", {
                "text-yellow-300": data.status === "pending" || data.status !== "completed",
                "text-neutral-600": data.status === "completed"
              })}
            >
              #
            </span>
            {test.id}
          </h1>

          <div
            className={clsx(
              "relative flex min-w-20 justify-center gap-2 self-end px-4 py-2 text-sm font-medium capitalize leading-none",
              {
                "bg-yellow-300/5 text-yellow-300":
                  data.status === "pending" || data.status !== "completed",
                "bg-green-400/5 text-green-400": data.status === "completed"
              }
            )}
          >
            <GridLayout style="lt" />
            <GridPlus position="top-left" />
            {data.status}
          </div>
        </div>

        {children}
      </section>

      <section>
        {data.testAnswers.length > 0 && (
          <ul className="relative mt-16 grid grid-cols-4">
            <GridPlus position="top-right" />
            <GridPlus position="bottom-left" />
            <GridLayout style="b" />

            <li
              className={clsx("bjustify-between flex items-center gap-4", {
                "col-span-2": test.hasReferenceCode,
                "col-span-3": !test.hasReferenceCode
              })}
            >
              <h2 className="ps-4 text-2xl font-bold">Students</h2>
              <div className="flex items-center gap-2 rounded border border-neutral-700/60 bg-neutral-800/60 px-2 py-0.5 text-sm text-neutral-100">
                {sortTypes.map((sort) => (
                  <Link
                    key={`sort ${sort}`}
                    href={`/test/${test.id}/?sort=${sort}`}
                    prefetch={false}
                    className={clsx("capitalize transition-colors", {
                      "text-neutral-500 hover:text-neutral-200 focus:text-neutral-200":
                        sort !== sortType
                    })}
                  >
                    {sort}
                  </Link>
                ))}
              </div>
            </li>

            <li className="relative px-4 py-2 text-neutral-400">
              <GridPlus position="top-left" />
              <GridPlus position="bottom-left" />
              <GridLayout style="lt" />
              <GridLayout style="b" />
              Status
            </li>
            {test.hasReferenceCode && (
              <li className="relative px-4 py-2 text-neutral-400">
                <GridLayout style="lt" />
                <GridLayout style="b" />
                Reference Code Rate
              </li>
            )}
          </ul>
        )}
        <ul className="relative">
          <GridPlus position="bottom-left" />
          <GridPlus position="bottom-right" />

          {data.testAnswers.map((std) => (
            <li key={`answers ${std.id}`} className="relative grid grid-cols-4">
              <GridLayout style="b" />

              <div
                className={clsx("flex justify-between px-4 py-2", {
                  "col-span-2": test.hasReferenceCode,
                  "col-span-3": !test.hasReferenceCode
                })}
              >
                <span className="text-neutral-200">{std.name}</span>
                <Dialog>
                  <DialogTrigger className="text-neutral-600 transition-colors hover:text-neutral-100 focus:text-neutral-100">
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{std.name}</DialogTitle>
                      <DialogDescription>This is {std.name}&nbsp;s code.</DialogDescription>
                    </DialogHeader>
                    <pre className="overflow-x-auto rounded border border-neutral-700 bg-neutral-800 px-4 py-2 font-mono">
                      {std.answer}
                    </pre>
                  </DialogContent>
                </Dialog>
              </div>

              <span
                className={clsx("relative px-4 py-2 capitalize", {
                  "bg-green-400/5 text-green-400": std.response.isCorrect,
                  "bg-red-400/5 text-red-400": !std.response.isCorrect
                })}
              >
                <GridLayout style="l" />
                {std.response.isCorrect ? "Correct" : "Incorrect"}
              </span>

              {test.hasReferenceCode && (
                <span
                  className={clsx("relative px-4 py-2 capitalize", {
                    "bg-green-400/5 text-green-400": std.response.referenceRate >= 50,
                    "bg-red-400/5 text-red-400": std.response.referenceRate < 50
                  })}
                >
                  <GridLayout style="l" />
                  {std.response.referenceRate}%
                </span>
              )}
            </li>
          ))}
        </ul>

        {data.status === "completed" && (
          <ul className="relative grid grid-cols-4">
            <GridPlus position="bottom-right" />
            <GridPlus position="bottom-left" />
            <GridLayout style="b" />

            <li
              className={clsx("px-4 py-2 text-neutral-400", {
                "col-span-2": test.hasReferenceCode,
                "col-span-3": !test.hasReferenceCode
              })}
            >
              Failure Rate
            </li>

            <li
              className={clsx("relative px-4 py-2 text-neutral-400", {
                "col-span-2 text-center": test.hasReferenceCode,
                "col-span-1": !test.hasReferenceCode
              })}
            >
              <GridLayout style="x" />
              {data.percentageOfFailure.toFixed(2)}%
            </li>
          </ul>
        )}
      </section>
    </>
  )
}

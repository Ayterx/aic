import { notFound } from "next/navigation"
import clsx from "clsx"

import { getTest } from "~/app/api/test/getTest"
import { GridLayout, GridPlus } from "~/components/gridStyle"
import { database } from "~/server/database"
import { programmingLanguages } from "~/utils/programmingLanguages"
import { Client } from "./_client"

import type { sortTypes } from "./_utils"

export async function generateMetadata(context: { params: Promise<{ id: number }> }) {
  const params = await context.params

  return {
    title: `Test #${params.id}`
  }
}

export default async function Page(context: {
  params: Promise<{ id: number }>
  searchParams: Promise<{ sort: (typeof sortTypes)[number] }>
}) {
  const params = await context.params
  const searchParams = await context.searchParams

  const test = await database.query.testTable.findFirst({
    where: (table, { eq }) => eq(table.id, params.id),
    columns: {
      createdAt: true,
      payload: true,
      status: true
    }
  })

  if (!test) notFound()

  const sort = searchParams.sort ?? "a-z"

  const fallbackData = await getTest(params.id, sort)

  return (
    <Client
      fallbackData={fallbackData}
      test={{
        id: params.id,
        status: test.status,
        hasReferenceCode: test.payload.type === "programming" && !!test.payload.referenceCode
      }}
      sortType={sort}
    >
      <div className="relative">
        <GridPlus position="top-right" />
        <GridPlus position="top-left" />
        <GridPlus position="bottom-right" />
        <GridPlus position="bottom-left" />
        <GridLayout style="y" />

        <ul>
          <div className="grid grid-cols-4 border-b border-neutral-800">
            <li
              className={clsx("p-4", {
                "col-span-3": test.payload.type === "programming",
                "col-span-4": test.payload.type === "custom"
              })}
            >
              <span className="mb-1 text-lg font-medium">
                {test.payload.type === "programming" ? "Question" : "System instruction"}
              </span>
              <pre className="whitespace-pre-wrap text-sm leading-none text-neutral-400">
                {test.payload.type === "programming" ? test.payload.question : test.payload.system}
              </pre>
            </li>
            {test.payload.type === "programming" && (
              <li className="border-s border-neutral-800 p-4">
                <span className="mb-1 text-lg font-medium">Language</span>
                <p className="truncate whitespace-nowrap text-sm leading-none text-neutral-400">
                  {/* @ts-expect-error ... */}
                  {programmingLanguages.find((lang) => lang.name === test.payload.language)?.label}
                </p>
              </li>
            )}
          </div>
          <div className="grid grid-cols-4">
            <li className="border-e border-neutral-800 p-4">
              <span className="mb-1 text-lg font-medium">At</span>
              <p className="truncate whitespace-nowrap text-sm leading-none text-neutral-400">
                {new Intl.DateTimeFormat("en-sa", {
                  dateStyle: "short",
                  timeStyle: "short"
                }).format(new Date(test.createdAt))}
              </p>
            </li>
            {test.payload.type === "programming" ? (
              test.payload.referenceCode && (
                <li className="col-span-3 p-4">
                  <span className="mb-1 text-lg font-medium">Reference Code</span>
                  <pre className="font-mono text-sm leading-none text-neutral-400">
                    {test.payload.referenceCode}
                  </pre>
                </li>
              )
            ) : (
              <li className="col-span-3 p-4">
                <span className="mb-1 text-lg font-medium">Prompt</span>
                <pre className="whitespace-pre-wrap text-sm leading-none text-neutral-400">
                  {test.payload.prompt}
                </pre>
              </li>
            )}
          </div>
        </ul>
      </div>
    </Client>
  )
}

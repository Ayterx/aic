import Link from "next/link"
import { desc, eq, sql } from "drizzle-orm"

import { GridLayout, GridPlus } from "~/components/gridStyle"
import { database } from "~/server/database"
import { testAnswersTable, testTable } from "~/server/database/schema"

const dateFormat = (now: Date, date: Date) => {
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

  let result
  if (diffInDays > 0) {
    result = rtf.format(-diffInDays, "day")
  } else if (diffInHours > 0) {
    result = rtf.format(-diffInHours, "hour")
  } else {
    result = rtf.format(-diffInMinutes, "minute")
  }

  return result
}

export const dynamic = "force-dynamic"

export default async function Page() {
  const tests = await database
    .select({
      id: testTable.id,
      createdAt: testTable.createdAt,
      answersCount: sql`COUNT(${testAnswersTable.id})`.mapWith(Number).as("answersCount"),
      payload: testTable.payload
    })
    .from(testTable)
    .leftJoin(testAnswersTable, eq(testTable.id, testAnswersTable.testId))
    .orderBy(desc(testTable.id))
    .groupBy(testTable.id, testTable.createdAt)

  const now = new Date()

  return (
    <section>
      <h1 className="px-4 pb-1.5 text-4xl font-bold">Tests</h1>

      {tests.length < 1 ? (
        <p className="relative py-4 text-center font-bold">
          <GridPlus position="top-left" />
          <GridPlus position="bottom-left" />
          <GridPlus position="top-right" />
          <GridPlus position="bottom-right" />
          <GridLayout style="y" />
          No Test found
        </p>
      ) : (
        <ol className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          <GridLayout style="lt" />
          <GridPlus position="top-left" />
          <GridPlus position="bottom-left" />
          <GridPlus position="top-right" />
          <GridPlus position="bottom-right" />

          {tests.map((test) => (
            <Link
              key={`test ${test.id}`}
              href={`/test/${test.id}`}
              className="relative flex items-center justify-between px-4 py-2 transition-colors hover:bg-neutral-800 focus:bg-neutral-800"
            >
              <GridLayout style="b" />
              <GridLayout style="r" />

              <div>
                <span className="block text-lg font-medium leading-tight">
                  <span className="text-neutral-500">#</span>
                  {test.id}
                </span>
                <span className="block text-xs leading-tight text-neutral-400">
                  {test.answersCount} Students
                </span>
              </div>
              <div className="flex flex-col items-end text-xs text-neutral-600">
                <span className="block">{dateFormat(now, test.createdAt)}</span>
                <span className="capitalize">{test.payload.type}</span>
              </div>
            </Link>
          ))}
        </ol>
      )}
    </section>
  )
}

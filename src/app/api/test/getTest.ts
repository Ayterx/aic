import { database } from "~/server/database"

import type { sortTypes } from "~/app/test/[id]/_utils"

export const getTest = async (id: number, sort: (typeof sortTypes)[number]) => {
  const test = await database.query.testTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    columns: {
      id: true,
      status: true
    }
  })

  if (!test) return null

  const answers = await database.query.testAnswersTable.findMany({
    where: (table, { eq }) => eq(table.testId, id),
    orderBy: (table, { asc, desc }) =>
      test.status === "pending" || test.status !== "completed"
        ? desc(table.id)
        : sort === "a-z"
          ? asc(table.name)
          : asc(table.status),
    columns: {
      answer: true,
      id: true,
      name: true,
      response: true,
      status: true
    }
  })

  const summaryIncorrect = answers.reduce((acc, answer) => {
    if (!answer.response.isCorrect) acc++
    return acc
  }, 0)

  const percentageOfFailure = (summaryIncorrect / answers.length) * 100

  return {
    status: test.status,
    testAnswers: answers,
    percentageOfFailure
  }
}

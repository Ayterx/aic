"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { createAction } from "rsfh/server"
import { z } from "zod"

import { generateObject } from "~/utils/ai"
import { fileSchema } from "~/utils/fileSchema"
import { database } from "../database"
import { testAnswersTable, testTable } from "../database/schema"

const handleAnswers = async ({
  files,
  test
}: {
  test: Pick<typeof testTable.$inferSelect, "id"> & {
    system: string
    prompt: string
  }
  files: File[]
}) => {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    const fileContent = await file!.text()

    const { object } = await generateObject({
      system: test.system,
      prompt: test.prompt.replace("${file}", fileContent),
      schema: z.object({
        isCorrect: z.boolean()
      })
    })

    await Promise.all([
      database.insert(testAnswersTable).values({
        answer: fileContent,
        name: file!.name.split(".")[0]!,
        response: {
          isCorrect: object.isCorrect,
          referenceRate: 0
        },
        status: object.isCorrect ? "correct" : "incorrect",
        testId: test.id
      }),
      database
        .update(testTable)
        .set({ status: `${i + 1}/${files.length}` })
        .where(eq(testTable.id, test.id))
    ])
  }

  await database.update(testTable).set({ status: "completed" }).where(eq(testTable.id, test.id))
}

export const customCorrectorAction = createAction({
  inputs: {
    system: z.string().min(3, "AI Instructions must contain at least 3 characters"),
    prompt: z
      .string()
      .min(3, "Prompt must contain at least 3 characters")
      .refine(async (py) => py.includes("${file}"), { message: "Prompt must contain ${file}" }),
    file: z.array(fileSchema).or(fileSchema)
  },
  action: async ({ inputs }) => {
    if (inputs.file instanceof File) inputs.file = [inputs.file]

    const test = await database
      .insert(testTable)
      .values({
        payload: {
          type: "custom",
          system: inputs.system,
          prompt: inputs.prompt
        },
        status: "pending"
      })
      .returning({ id: testTable.id })

    void handleAnswers({
      files: inputs.file,
      test: {
        id: test[0]!.id,
        system: inputs.system,
        prompt: inputs.prompt
      }
    })

    redirect(`/test/${test[0]?.id}`)
  }
})

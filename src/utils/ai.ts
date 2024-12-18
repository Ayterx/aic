import { createOpenAI } from "@ai-sdk/openai"
import { generateObject as aiGenerateObject } from "ai"

import { env } from "~/env"

import type { z } from "zod"

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY
})

export const generateObject = async <T>(props: {
  system: string
  prompt: string
  schema: z.ZodSchema<T>
}) => {
  return await aiGenerateObject({
    model: openai("gpt-4o-mini"),
    system: props.system,
    schema: props.schema,
    mode: "json",
    prompt: props.prompt,
    temperature: 0
  })
}

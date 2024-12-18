import { z } from "zod"

export const fileSchema = z
  .instanceof(File)
  .refine((file) => ["text/plain"].includes(file.type), "Only text/plain file type is support.")
  .refine((file) => file.size <= 5 * 1024 * 1024, "File size should not exceed 5MB")

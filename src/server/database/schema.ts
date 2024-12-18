import { relations } from "drizzle-orm"
import { index, pgEnum, pgTable } from "drizzle-orm/pg-core"

type TestsType =
  | {
      type: "programming"
      question: string
      language: string
      referenceCode: string | null
    }
  | {
      type: "custom"
      system: string
      prompt: string
    }

export const testTable = pgTable(
  "test",
  (t) => ({
    id: t.serial().primaryKey(),

    payload: t.json("payload").notNull().$type<TestsType>(),
    status: t.text("status").notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
  }),
  (table) => [index("t_id_idx").on(table.id)]
)

export const statusEnum = pgEnum("ts_status", ["pending", "correct", "incorrect", "failed"])

export const testAnswersTable = pgTable(
  "test_answers",
  (t) => ({
    id: t.serial().primaryKey(),

    testId: t
      .integer()
      .references(() => testTable.id)
      .notNull(),

    name: t.text().notNull(),
    answer: t.text().notNull(),
    status: statusEnum().default("pending").notNull(),
    response: t.json().default({}).notNull().$type<{ isCorrect: boolean; referenceRate: number }>(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
  }),
  (table) => [index("ta_id_idx").on(table.id)]
)

export const testRelations = relations(testTable, ({ many }) => ({
  testAnswers: many(testAnswersTable)
}))

export const testAnswersRelations = relations(testAnswersTable, ({ one }) => ({
  test: one(testTable, {
    fields: [testAnswersTable.testId],
    references: [testTable.id]
  })
}))

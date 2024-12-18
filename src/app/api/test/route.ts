import { NextResponse } from "next/server"

import { getTest } from "./getTest"

import type { NextRequest } from "next/server"
import type { sortTypes } from "~/app/test/[id]/_utils"

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id")
  const sort = (request.nextUrl.searchParams.get("sort") ?? "a-z") as (typeof sortTypes)[number]

  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

  const data = await getTest(parseInt(id), sort)

  if (!data) return NextResponse.json({ error: "test not found" }, { status: 404 })

  return NextResponse.json(data)
}

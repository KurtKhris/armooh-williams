import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const areas = await db
      .select()
      .from(practiceAreas)
      .where(eq(practiceAreas.published, true))
      .orderBy(asc(practiceAreas.sortOrder), asc(practiceAreas.createdAt));
    return NextResponse.json(areas);
  } catch {
    return NextResponse.json({ error: "Failed to fetch practice areas" }, { status: 500 });
  }
}

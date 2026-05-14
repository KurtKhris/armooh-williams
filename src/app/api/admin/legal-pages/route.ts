import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { legalPages } from "@/lib/schema";

export async function GET() {
  try {
    const pages = await db.select().from(legalPages);
    return NextResponse.json(pages);
  } catch {
    return NextResponse.json({ error: "Failed to fetch legal pages" }, { status: 500 });
  }
}

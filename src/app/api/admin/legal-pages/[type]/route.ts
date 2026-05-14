import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { legalPages } from "@/lib/schema";
import { eq } from "drizzle-orm";

const VALID_TYPES = ["privacy", "terms", "disclaimer"];

export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!VALID_TYPES.includes(type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  try {
    const [page] = await db.select().from(legalPages).where(eq(legalPages.type, type));
    return NextResponse.json(page ?? { type, title: "", content: "" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!VALID_TYPES.includes(type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  try {
    const { title, content } = await req.json();
    if (!title || !content) return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    await db
      .insert(legalPages)
      .values({ type, title, content, updatedAt: new Date() })
      .onConflictDoUpdate({ target: legalPages.type, set: { title, content, updatedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

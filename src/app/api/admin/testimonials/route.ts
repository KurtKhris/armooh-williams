import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, content, rating, imageUrl, sortOrder, published } = body;
    if (!name || !content) return NextResponse.json({ error: "Name and content are required." }, { status: 400 });
    const [created] = await db
      .insert(testimonials)
      .values({ name, role: role ?? "", content, rating: rating ?? 5, imageUrl: imageUrl || null, sortOrder: sortOrder ?? 0, published: published ?? true })
      .returning();
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

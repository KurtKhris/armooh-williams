import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { name, role, content, rating, imageUrl, sortOrder, published } = await req.json();
    if (!name || !content) return NextResponse.json({ error: "Name and content are required." }, { status: 400 });
    const [updated] = await db
      .update(testimonials)
      .set({ name, role: role ?? "", content, rating: rating ?? 5, imageUrl: imageUrl || null, sortOrder: sortOrder ?? 0, published: published ?? true })
      .where(eq(testimonials.id, id))
      .returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

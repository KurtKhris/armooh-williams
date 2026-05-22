import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { getSessionAdminId } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { slugify } from "@/lib/utils";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();
    const { title, description, longDescription, icon, imageUrl, sortOrder, published } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const [updated] = await db
      .update(practiceAreas)
      .set({
        title: title.trim(),
        slug: slugify(title),
        description: description ?? "",
        longDescription: longDescription ?? "",
        icon: icon ?? "scale",
        imageUrl: imageUrl ?? null,
        sortOrder: sortOrder ?? 0,
        published: published ?? true,
        updatedAt: new Date(),
      })
      .where(eq(practiceAreas.id, id))
      .returning();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update practice area" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await db.delete(practiceAreas).where(eq(practiceAreas.id, id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete practice area" }, { status: 500 });
  }
}

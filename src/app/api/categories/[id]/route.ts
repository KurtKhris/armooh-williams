import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { postCategories } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSessionAdminId } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if category exists
    const existing = await db
      .select()
      .from(postCategories)
      .where(eq(postCategories.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await db.delete(postCategories).where(eq(postCategories.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/categories/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const trimmedName = name.trim();

    // Check if category exists
    const existing = await db
      .select()
      .from(postCategories)
      .where(eq(postCategories.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Update the category
    const [updatedCategory] = await db
      .update(postCategories)
      .set({ name: trimmedName })
      .where(eq(postCategories.id, id))
      .returning();

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/categories/[id] error:", error);
    if (error.code === '23505') {
       return NextResponse.json({ error: "Category name already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

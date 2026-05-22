import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { postCategories } from "@/lib/schema";
import { asc, eq, max } from "drizzle-orm";
import { getSessionAdminId } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await db
      .select()
      .from(postCategories)
      .orderBy(asc(postCategories.sortOrder), asc(postCategories.createdAt));
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, imageUrl } = await req.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(postCategories)
      .where(eq(postCategories.name, name.trim()));

    if (existing.length > 0) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const [{ maxOrder }] = await db
      .select({ maxOrder: max(postCategories.sortOrder) })
      .from(postCategories);

    const sortOrder = (maxOrder ?? -1) + 1;

    const [category] = await db
      .insert(postCategories)
      .values({ name: name.trim(), description: description ?? null, imageUrl: imageUrl ?? null, sortOrder })
      .returning();

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    if (error.code === '23505') {
       return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

// Bulk reorder: body = { order: string[] } (array of ids in desired order)
export async function PATCH(req: NextRequest) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { order } = await req.json() as { order: string[] };
    if (!Array.isArray(order)) {
      return NextResponse.json({ error: "order must be an array of ids" }, { status: 400 });
    }

    await Promise.all(
      order.map((id, index) =>
        db.update(postCategories).set({ sortOrder: index }).where(eq(postCategories.id, id))
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/categories error:", error);
    return NextResponse.json({ error: "Failed to reorder categories" }, { status: 500 });
  }
}

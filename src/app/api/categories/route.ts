import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { postCategories } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { getSessionAdminId } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await db
      .select()
      .from(postCategories)
      .orderBy(desc(postCategories.createdAt));
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

    const { name } = await req.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    // Check if category already exists (case-insensitive search would be better, but we'll rely on unique constraint or simple select)
    const existing = await db
      .select()
      .from(postCategories)
      .where(eq(postCategories.name, name.trim()));

    if (existing.length > 0) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const [category] = await db
      .insert(postCategories)
      .values({ name: name.trim() })
      .returning();

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    // Handle unique constraint violation gracefully
    if (error.code === '23505') {
       return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

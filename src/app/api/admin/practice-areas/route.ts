import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { practiceAreas } from "@/lib/schema";
import { getSessionAdminId } from "@/lib/auth";
import { asc } from "drizzle-orm";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const areas = await db
      .select()
      .from(practiceAreas)
      .orderBy(asc(practiceAreas.sortOrder), asc(practiceAreas.createdAt));
    return NextResponse.json(areas);
  } catch {
    return NextResponse.json({ error: "Failed to fetch practice areas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, longDescription, icon, imageUrl, sortOrder, published } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = slugify(title);

    const [area] = await db
      .insert(practiceAreas)
      .values({
        title: title.trim(),
        slug,
        description: description ?? "",
        longDescription: longDescription ?? "",
        icon: icon ?? "scale",
        imageUrl: imageUrl ?? null,
        sortOrder: sortOrder ?? 0,
        published: published ?? true,
      })
      .returning();

    return NextResponse.json(area, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unique")) {
      return NextResponse.json({ error: "A practice area with that title already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create practice area" }, { status: 500 });
  }
}

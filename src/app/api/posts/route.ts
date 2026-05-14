import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedParam = searchParams.get("published");

    const query = db.select().from(posts).orderBy(desc(posts.createdAt));

    if (publishedParam === "true") {
      const result = await db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt));
      return NextResponse.json(result);
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, imageUrl, published, authorName } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
    }

    const [post] = await db
      .insert(posts)
      .values({
        title,
        slug,
        excerpt: excerpt ?? "",
        content,
        category: category ?? "General",
        imageUrl: imageUrl || null,
        published: published ?? false,
        authorName: authorName ?? "Armooh-Williams, PLLC",
      })
      .returning();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

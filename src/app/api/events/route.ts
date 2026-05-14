import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedParam = searchParams.get("published");

    if (publishedParam === "true") {
      const result = await db.select().from(events).where(eq(events.published, true)).orderBy(desc(events.createdAt));
      return NextResponse.json(result);
    }

    const result = await db.select().from(events).orderBy(desc(events.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, description, eventDate, eventTime, location, imageUrl, published } = body;

    if (!title || !slug || !description || !eventDate) {
      return NextResponse.json({ error: "title, slug, description, and eventDate are required" }, { status: 400 });
    }

    const [event] = await db
      .insert(events)
      .values({
        title,
        slug,
        description,
        eventDate,
        eventTime: eventTime || null,
        location: location || null,
        imageUrl: imageUrl || null,
        published: published ?? false,
      })
      .returning();

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

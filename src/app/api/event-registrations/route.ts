import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistrations, events } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, firstName, lastName, email, phone, message } = body;

    if (!eventId || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "eventId, firstName, lastName, and email are required" },
        { status: 400 }
      );
    }

    // Verify the event exists and is published
    const [event] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
    if (!event || !event.published) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const [registration] = await db
      .insert(eventRegistrations)
      .values({ eventId, firstName, lastName, email, phone: phone || null, message: message || null })
      .returning();

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("POST /api/event-registrations error:", error);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}

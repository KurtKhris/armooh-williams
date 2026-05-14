import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistrations, events } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/email/mailer";
import { rsvpAdminEmail } from "@/lib/email/templates/rsvp-admin";
import { rsvpUserEmail } from "@/lib/email/templates/rsvp-user";

function formatEventDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

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

    // Fire emails (non-blocking)
    const firmEmail = process.env.FIRM_EMAIL ?? "info@armooh-williams.com";
    const formattedDate = event.eventDate ? formatEventDate(event.eventDate) : undefined;

    Promise.allSettled([
      sendEmail({
        to: firmEmail,
        subject: `New RSVP — ${event.title} (${firstName} ${lastName})`,
        html: rsvpAdminEmail({
          firstName,
          lastName,
          email,
          phone,
          message,
          eventTitle: event.title,
          eventDate: formattedDate,
          eventLocation: event.location ?? undefined,
        }),
      }),
      sendEmail({
        to: email,
        subject: `You're registered for "${event.title}" — Armooh-Williams, PLLC`,
        html: rsvpUserEmail({
          firstName,
          eventTitle: event.title,
          eventDate: formattedDate,
          eventTime: event.eventTime ?? undefined,
          eventLocation: event.location ?? undefined,
        }),
      }),
    ]).catch(console.error);

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("POST /api/event-registrations error:", error);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}

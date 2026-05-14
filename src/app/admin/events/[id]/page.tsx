import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EventEditor from "@/components/admin/EventEditor";
import type { Event } from "@/types";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getEvent(id: string) {
  if (!UUID_RE.test(id)) return null;
  const [event] = await db.select().from(events).where(eq(events.id, id));
  return event ?? null;
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();

  const serialized: Event = {
    ...event,
    eventTime: event.eventTime ?? null,
    location: event.location ?? null,
    imageUrl: event.imageUrl ?? null,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  };

  return <EventEditor mode="edit" event={serialized} />;
}

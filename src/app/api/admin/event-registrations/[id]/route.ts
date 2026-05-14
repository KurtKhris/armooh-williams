import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventRegistrations } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSessionAdminId } from "@/lib/auth";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    await db.delete(eventRegistrations).where(eq(eventRegistrations.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

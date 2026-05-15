import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";
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

    // Check if submission exists
    const existing = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: "Contact submission not found" }, { status: 404 });
    }

    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/contact/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete contact submission" }, { status: 500 });
  }
}

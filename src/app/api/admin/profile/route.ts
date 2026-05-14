import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getSessionAdminId, verifyPassword, hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [user] = await db
      .select({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name, createdAt: adminUsers.createdAt })
      .from(adminUsers)
      .where(eq(adminUsers.id, adminId as string));

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, email, currentPassword, newPassword } = await req.json();

    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, adminId as string));
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updates: { name?: string; email?: string; passwordHash?: string } = {};

    if (name) updates.name = name;

    if (email && email !== user.email) {
      updates.email = email;
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 });
      }
      const valid = await verifyPassword(currentPassword, user.passwordHash);
      if (!valid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
      }
      updates.passwordHash = await hashPassword(newPassword);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No changes provided" }, { status: 400 });
    }

    const [updated] = await db
      .update(adminUsers)
      .set(updates)
      .where(eq(adminUsers.id, adminId as string))
      .returning({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

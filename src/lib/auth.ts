import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAdminFromDB(email: string) {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
  return user ?? null;
}

export async function getSessionAdminId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("aw_admin_session")?.value;
    if (!session) return null;

    const colonIdx = session.lastIndexOf(":");
    if (colonIdx === -1) return null;

    const userId = session.slice(0, colonIdx);
    const token = session.slice(colonIdx + 1);
    const secret = process.env.NEXTAUTH_SECRET ?? "dev-secret";
    if (token !== secret) return null;

    return userId || null;
  } catch {
    return null;
  }
}

export async function getSessionAdmin() {
  const id = await getSessionAdminId();
  if (!id) return null;
  const [user] = await db
    .select({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name })
    .from(adminUsers)
    .where(eq(adminUsers.id, id));
  return user ?? null;
}

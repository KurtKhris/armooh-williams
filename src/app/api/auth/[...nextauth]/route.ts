import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple credential-based admin auth (no NextAuth dependency)
// Use a proper NextAuth or auth solution in production

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@armooh-williams.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme";
const SESSION_COOKIE = "aw_admin_session";
const SESSION_TOKEN = process.env.NEXTAUTH_SECRET ?? "dev-secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Auth error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}

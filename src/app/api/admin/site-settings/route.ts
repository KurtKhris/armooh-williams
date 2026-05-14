import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/schema";
import { getSessionAdminId } from "@/lib/auth";
import { SETTING_KEYS } from "@/lib/settings-config";

export async function GET() {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rows = await db.select().from(siteSettings);
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminId = await getSessionAdminId();
    if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    for (const key of SETTING_KEYS) {
      if (key in body) {
        await db
          .insert(siteSettings)
          .values({ key, value: body[key] ?? "", updatedAt: new Date() })
          .onConflictDoUpdate({ target: siteSettings.key, set: { value: body[key] ?? "", updatedAt: new Date() } });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

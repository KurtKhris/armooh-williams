import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// TEMPORARY diagnostic endpoint — delete after debugging email delivery.
// Visit /api/health/email?key=YOUR_KEY on the live site.
export async function GET(req: NextRequest) {
  // Simple gate so this isn't fully public. Pass ?key=<NEXTAUTH_SECRET>
  const key = req.nextUrl.searchParams.get("key");
  if (!process.env.NEXTAUTH_SECRET || key !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1) Report which env vars are present (values masked).
  const present = {
    SMTP_HOST: process.env.SMTP_HOST ?? null,
    SMTP_PORT: process.env.SMTP_PORT ?? null,
    SMTP_USER: process.env.SMTP_USER ?? null,
    SMTP_PASS: process.env.SMTP_PASS ? `set (${process.env.SMTP_PASS.length} chars)` : null,
    SMTP_FROM: process.env.SMTP_FROM ?? null,
    FIRM_EMAIL: process.env.FIRM_EMAIL ?? null,
  };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  // 2) Verify connection/auth.
  let verify: { ok: boolean; error?: string };
  try {
    await transporter.verify();
    verify = { ok: true };
  } catch (e) {
    verify = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  // 3) Try an actual send to the firm address.
  let send: { ok: boolean; accepted?: unknown; error?: string } = { ok: false };
  if (verify.ok) {
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM ?? `"Armooh-Williams, PLLC" <${process.env.SMTP_USER}>`,
        to: process.env.FIRM_EMAIL,
        subject: "Email health check — Armooh-Williams",
        html: "<p>If you received this, production SMTP is working.</p>",
      });
      send = { ok: true, accepted: info.accepted };
    } catch (e) {
      send = { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  return NextResponse.json({ present, verify, send });
}

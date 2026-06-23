import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";
import { sendEmail } from "@/lib/email/mailer";
import { contactAdminEmail } from "@/lib/email/templates/contact-admin";
import { contactUserEmail } from "@/lib/email/templates/contact-user";

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY ?? "1x0000000000000000000000000000000AA";
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, practiceArea, message, preferredDate, website, turnstileToken } = body;

    // Honeypot check — bots fill this, humans don't
    if (website) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Turnstile verification
    const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for");
    const turnstileOk = await verifyTurnstile(turnstileToken ?? "", ip);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        practiceArea: practiceArea || null,
        message: message.trim(),
        preferredDate: preferredDate || null,
      })
      .returning();

    // Fire emails (non-blocking — don't fail the response if email fails)
    const firmEmail = process.env.FIRM_EMAIL ?? "info@armooh-williams.com";

    Promise.allSettled([
      sendEmail({
        to: firmEmail,
        subject: `New Contact Inquiry — ${firstName} ${lastName}`,
        html: contactAdminEmail({ firstName, lastName, email, phone, practiceArea, message }),
      }),
      sendEmail({
        to: email,
        subject: "We've received your message — Armooh-Williams, PLLC",
        html: contactUserEmail({ firstName, practiceArea }),
      }),
    ]).catch(console.error);

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(contactSubmissions.createdAt);
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

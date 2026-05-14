import { emailWrapper } from "./base";

interface RsvpAdminEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  eventTitle: string;
  eventDate?: string;
  eventLocation?: string;
}

export function rsvpAdminEmail(data: RsvpAdminEmailProps): string {
  const { firstName, lastName, email, phone, message, eventTitle, eventDate, eventLocation } = data;

  const content = `
    <!-- Alert badge -->
    <div style="display:inline-block;padding:6px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:100px;margin-bottom:24px;">
      <span style="color:#16a34a;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">✅ New RSVP</span>
    </div>

    <h1 style="color:#071a1f;font-size:24px;font-weight:700;margin:0 0 8px;line-height:1.3;">
      New Event Registration
    </h1>
    <p style="color:#6b7c85;font-size:14px;margin:0 0 28px;line-height:1.6;">
      Someone has registered for one of your upcoming events.
    </p>

    <!-- Event banner -->
    <div style="background:linear-gradient(135deg,#ef4b43,#c93b33);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:rgba(255,255,255,0.7);font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 6px;">Event</p>
      <p style="color:#ffffff;font-size:18px;font-weight:700;margin:0 0 10px;">${eventTitle}</p>
      <table cellpadding="0" cellspacing="0" border="0">
        ${eventDate ? `<tr><td style="color:rgba(255,255,255,0.8);font-size:12px;padding-right:20px;">📅 ${eventDate}</td>` : "<tr><td></td>"}
        ${eventLocation ? `<td style="color:rgba(255,255,255,0.8);font-size:12px;">📍 ${eventLocation}</td></tr>` : "</tr>"}
      </table>
    </div>

    <!-- Attendee card -->
    <div style="background:linear-gradient(135deg,#071a1f,#0d3845);border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 14px;">Attendee Information</p>
      <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 4px;">${firstName} ${lastName}</p>
      <a href="mailto:${email}" style="color:#ef4b43;font-size:14px;text-decoration:none;">${email}</a>
      ${phone ? `<p style="color:rgba(255,255,255,0.6);font-size:13px;margin:6px 0 0;">📞 ${phone}</p>` : ""}
    </div>

    ${message ? `
    <!-- Message -->
    <div style="background:#f8fafc;border:1px solid #e4eaed;border-left:4px solid #ef4b43;border-radius:0 10px 10px 0;padding:18px 20px;margin-bottom:32px;">
      <p style="color:#9aafb8;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 10px;">Their Message</p>
      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0;white-space:pre-line;">${message}</p>
    </div>` : `<div style="margin-bottom:32px;"></div>`}

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="mailto:${email}?subject=Your Registration for ${encodeURIComponent(eventTitle)}" style="display:inline-block;background:linear-gradient(135deg,#ef4b43,#d93b33);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;letter-spacing:0.03em;">
        Contact ${firstName} →
      </a>
    </div>
  `;

  return emailWrapper(content);
}

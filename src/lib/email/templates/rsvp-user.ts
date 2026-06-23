import { emailWrapper } from "./base";

interface RsvpUserEmailProps {
  firstName: string;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  firmEmail: string;
  firmPhone: string;
}

export function rsvpUserEmail(data: RsvpUserEmailProps): string {
  const { firstName, eventTitle, eventDate, eventTime, eventLocation, firmEmail, firmPhone } = data;
  const phoneHref = firmPhone.replace(/[^\d+]/g, "");

  const content = `
    <!-- Heading -->
    <h1 style="color:#071a1f;font-size:26px;font-weight:700;margin:0 0 8px;line-height:1.3;">
      You're registered, ${firstName}!
    </h1>
    <p style="color:#6b7c85;font-size:15px;margin:0 0 28px;line-height:1.7;">
      Your registration has been confirmed. We look forward to seeing you at the event.
    </p>

    <!-- Event card -->
    <div style="background:linear-gradient(135deg,#071a1f 0%,#0d3845 60%,#134e5e 100%);border-radius:16px;padding:28px;margin-bottom:28px;">
      <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 12px;">Your Event</p>
      <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 20px;line-height:1.3;">${eventTitle}</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${eventDate ? `
        <tr>
          <td style="padding-bottom:12px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="32" valign="middle">
                  <div style="width:28px;height:28px;background:rgba(239,75,67,0.2);border-radius:8px;text-align:center;line-height:28px;font-size:14px;">📅</div>
                </td>
                <td style="padding-left:12px;">
                  <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 2px;">Date</p>
                  <p style="color:#ffffff;font-size:14px;font-weight:600;margin:0;">${eventDate}${eventTime ? ` at ${eventTime}` : ""}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : ""}
        ${eventLocation ? `
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="32" valign="middle">
                  <div style="width:28px;height:28px;background:rgba(239,75,67,0.2);border-radius:8px;text-align:center;line-height:28px;font-size:14px;">📍</div>
                </td>
                <td style="padding-left:12px;">
                  <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 2px;">Location</p>
                  <p style="color:#ffffff;font-size:14px;font-weight:600;margin:0;">${eventLocation}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : ""}
      </table>
    </div>

    <!-- Important note -->
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
      <p style="color:#92400e;font-size:13px;font-weight:600;margin:0 0 4px;">📌 Save the Date</p>
      <p style="color:#78350f;font-size:12px;margin:0;line-height:1.6;">
        Please add this event to your calendar. We will send a reminder closer to the event date.
      </p>
    </div>

    <!-- Confidentiality notice -->
    <div style="background:#f8fafc;border:1px solid #e4eaed;border-radius:10px;padding:16px 20px;margin-bottom:32px;">
      <p style="color:#6b7c85;font-size:12px;margin:0;line-height:1.7;">
        If you need to cancel or modify your registration, or have any questions, please don't hesitate to reach out to us at
        <a href="mailto:${firmEmail}" style="color:#ef4b43;font-weight:600;text-decoration:none;">${firmEmail}</a>
        or call <a href="tel:${phoneHref}" style="color:#0d3845;font-weight:600;text-decoration:none;">${firmPhone}</a>.
      </p>
    </div>

    <!-- Divider -->
    <div style="border-top:1px solid #e4eaed;padding-top:24px;text-align:center;">
      <p style="color:#9aafb8;font-size:12px;margin:0 0 4px;">Armooh-Williams, PLLC</p>
      <p style="color:#c4d0d5;font-size:11px;margin:0;">Washington, DC &nbsp;·&nbsp; Corporate Immigration &amp; White-Collar Defense</p>
    </div>
  `;

  return emailWrapper(content);
}

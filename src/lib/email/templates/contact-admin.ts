import { emailWrapper } from "./base";

interface ContactAdminEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  practiceArea?: string;
  message: string;
}

export function contactAdminEmail(data: ContactAdminEmailProps): string {
  const { firstName, lastName, email, phone, practiceArea, message } = data;

  const content = `
    <!-- Alert badge -->
    <div style="display:inline-block;padding:6px 14px;background:#fff5f5;border:1px solid #fecaca;border-radius:100px;margin-bottom:24px;">
      <span style="color:#ef4b43;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">⚡ New Inquiry</span>
    </div>

    <h1 style="color:#071a1f;font-size:24px;font-weight:700;margin:0 0 8px;line-height:1.3;">
      New Contact Inquiry
    </h1>
    <p style="color:#6b7c85;font-size:14px;margin:0 0 32px;line-height:1.6;">
      A new message has been submitted through the website contact form.
    </p>

    <!-- Caller card -->
    <div style="background:linear-gradient(135deg,#071a1f,#0d3845);border-radius:12px;padding:24px;margin-bottom:28px;">
      <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 14px;">Client Information</p>
      <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 4px;">${firstName} ${lastName}</p>
      <a href="mailto:${email}" style="color:#ef4b43;font-size:14px;text-decoration:none;">${email}</a>
      ${phone ? `<p style="color:rgba(255,255,255,0.6);font-size:13px;margin:6px 0 0;">📞 ${phone}</p>` : ""}
    </div>

    <!-- Detail rows -->
    ${practiceArea ? `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
      <tr>
        <td style="background:#f8fafc;border:1px solid #e4eaed;border-radius:10px;padding:14px 18px;">
          <p style="color:#9aafb8;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 4px;">Practice Area</p>
          <p style="color:#071a1f;font-size:14px;font-weight:600;margin:0;">${practiceArea}</p>
        </td>
      </tr>
    </table>` : ""}

    <!-- Message -->
    <div style="background:#f8fafc;border:1px solid #e4eaed;border-left:4px solid #ef4b43;border-radius:0 10px 10px 0;padding:18px 20px;margin-bottom:32px;">
      <p style="color:#9aafb8;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 10px;">Message</p>
      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0;white-space:pre-line;">${message}</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;">
      <a href="mailto:${email}?subject=Re: Your Inquiry to Armooh-Williams, PLLC" style="display:inline-block;background:linear-gradient(135deg,#ef4b43,#d93b33);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;letter-spacing:0.03em;">
        Reply to ${firstName} →
      </a>
    </div>
  `;

  return emailWrapper(content);
}

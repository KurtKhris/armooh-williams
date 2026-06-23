import { emailWrapper } from "./base";

interface ContactUserEmailProps {
  firstName: string;
  practiceArea?: string;
  firmEmail: string;
  firmPhone: string;
}

export function contactUserEmail(data: ContactUserEmailProps): string {
  const { firstName, practiceArea, firmEmail, firmPhone } = data;
  const phoneHref = firmPhone.replace(/[^\d+]/g, "");

  const content = `
    <!-- Greeting -->
    <h1 style="color:#071a1f;font-size:26px;font-weight:700;margin:0 0 8px;line-height:1.3;">
      Thank you, ${firstName}.
    </h1>
    <p style="color:#6b7c85;font-size:15px;margin:0 0 32px;line-height:1.7;">
      We have received your message and a member of our team will be in touch with you within <strong style="color:#071a1f;">24 business hours</strong>. We appreciate your confidence in reaching out to Armooh-Williams, PLLC.
    </p>

    <!-- What to expect card -->
    <div style="background:linear-gradient(135deg,#071a1f,#0d3845);border-radius:12px;padding:28px;margin-bottom:28px;">
      <p style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 20px;">What Happens Next</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="36" valign="top">
            <div style="width:28px;height:28px;background:rgba(239,75,67,0.2);border-radius:8px;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ef4b43;">1</div>
          </td>
          <td style="padding-left:12px;padding-bottom:16px;">
            <p style="color:#ffffff;font-size:13px;font-weight:600;margin:0 0 2px;">Review of Your Inquiry</p>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">Our team reviews your matter and identifies the right attorney for your needs.</p>
          </td>
        </tr>
        <tr>
          <td width="36" valign="top">
            <div style="width:28px;height:28px;background:rgba(239,75,67,0.2);border-radius:8px;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ef4b43;">2</div>
          </td>
          <td style="padding-left:12px;padding-bottom:16px;">
            <p style="color:#ffffff;font-size:13px;font-weight:600;margin:0 0 2px;">Initial Contact</p>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">We will reach out via email or phone to discuss your matter in more detail.</p>
          </td>
        </tr>
        <tr>
          <td width="36" valign="top">
            <div style="width:28px;height:28px;background:rgba(239,75,67,0.2);border-radius:8px;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ef4b43;">3</div>
          </td>
          <td style="padding-left:12px;">
            <p style="color:#ffffff;font-size:13px;font-weight:600;margin:0 0 2px;">Confidential Consultation</p>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">We schedule a formal consultation under full attorney-client privilege.</p>
          </td>
        </tr>
      </table>
    </div>

    ${practiceArea ? `
    <div style="background:#f8fafc;border:1px solid #e4eaed;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
      <p style="color:#9aafb8;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 4px;">Your Selected Practice Area</p>
      <p style="color:#071a1f;font-size:14px;font-weight:600;margin:0;">${practiceArea}</p>
    </div>` : ""}

    <!-- Confidentiality notice -->
    <div style="background:#fff8f8;border:1px solid #fecaca;border-radius:10px;padding:14px 18px;margin-bottom:32px;text-align:center;">
      <p style="color:#dc2626;font-size:12px;font-weight:600;margin:0;">
        🔒 Attorney-Client Privilege &nbsp;·&nbsp; All communications are strictly confidential
      </p>
    </div>

    <!-- Contact info -->
    <div style="border-top:1px solid #e4eaed;padding-top:24px;text-align:center;">
      <p style="color:#9aafb8;font-size:12px;margin:0 0 8px;">Need immediate assistance? Contact us directly.</p>
      <a href="tel:${phoneHref}" style="color:#0d3845;font-size:14px;font-weight:700;text-decoration:none;">${firmPhone}</a>
      <span style="color:#d1d5db;margin:0 8px;">·</span>
      <a href="mailto:${firmEmail}" style="color:#ef4b43;font-size:14px;font-weight:700;text-decoration:none;">${firmEmail}</a>
    </div>
  `;

  return emailWrapper(content);
}

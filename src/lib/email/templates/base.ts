// Shared HTML wrapper for all Armooh-Williams emails
export function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Armooh-Williams, PLLC</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#071a1f 0%,#0d3845 60%,#134e5e 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <div style="display:inline-block;padding:6px 16px;background:rgba(239,75,67,0.15);border:1px solid rgba(239,75,67,0.3);border-radius:100px;margin-bottom:20px;">
                <span style="color:#ef4b43;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Armooh-Williams, PLLC</span>
              </div>
              <div style="width:48px;height:3px;background:linear-gradient(90deg,#ef4b43,#ff7a73);border-radius:2px;margin:0 auto;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-left:1px solid #e4eaed;border-right:1px solid #e4eaed;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:linear-gradient(135deg,#071a1f 0%,#0d3845 100%);border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 6px;">
                Armooh-Williams, PLLC &nbsp;·&nbsp; Washington, DC
              </p>
              <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0 0 12px;">
                2611 South Clark Street, Suite 600, Arlington, Virginia 22202
              </p>
              <p style="color:rgba(255,255,255,0.25);font-size:10px;margin:0;">
                This communication may contain privileged and confidential information. If you are not the intended recipient, please notify the sender and delete this message.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

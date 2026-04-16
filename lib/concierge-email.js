/**
 * Luxury transactional email for concierge form (table layout for client compatibility).
 */

const GOLD = '#C5A880';
const GOLD_SOFT = '#DCC39E';
const BG = '#050708';
const CARD = '#0a0f0e';
const MUTED = 'rgba(245,245,245,0.58)';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildConciergeEmailContent({ name, email, phone, message, submittedAtIso }) {
  const telDigits = String(phone).replace(/\D/g, '');
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    message: escapeHtml(message).replace(/\n/g, '<br/>'),
  };

  const received = escapeHtml(String(submittedAtIso));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>New enquiry — The Plot Sale</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BG};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${CARD};border-radius:20px;overflow:hidden;border:1px solid rgba(197,168,128,0.22);box-shadow:0 24px 64px rgba(0,0,0,0.45);">
          <tr>
            <td style="padding:32px 36px 24px;background:radial-gradient(ellipse 120% 80% at 50% -20%, rgba(197,168,128,0.14) 0%, transparent 55%), linear-gradient(180deg, rgba(197,168,128,0.08) 0%, transparent 100%);border-bottom:1px solid rgba(197,168,128,0.18);">
              <p style="margin:0 0 10px;font-size:10px;letter-spacing:0.42em;text-transform:uppercase;color:${GOLD};font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:500;">Private client desk</p>
              <h1 style="margin:0;font-size:28px;font-weight:400;color:#f7f7f5;line-height:1.15;letter-spacing:-0.02em;">New enquiry received</h1>
              <p style="margin:14px 0 0;font-size:15px;color:${MUTED};line-height:1.55;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:300;">Someone has requested a concierge touchpoint through <span style="color:${GOLD_SOFT};font-style:italic;">The Plot Sale</span> website. Details below for your immediate follow-up.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:22px;">
                <tr>
                  <td style="width:48px;height:2px;background:linear-gradient(90deg, ${GOLD}, transparent);"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 36px 10px;">
              <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${GOLD};font-family:system-ui,-apple-system,sans-serif;">Contact snapshot</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(245,245,245,0.42);width:108px;vertical-align:top;">Name</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#f2f2f0;font-weight:500;">${safe.name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(245,245,245,0.42);vertical-align:top;">Email</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);"><a href="mailto:${safe.email}" style="color:${GOLD};text-decoration:none;border-bottom:1px solid rgba(197,168,128,0.35);">${safe.email}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(245,245,245,0.42);vertical-align:top;">Phone</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#f2f2f0;"><a href="tel:${telDigits || '0'}" style="color:${GOLD};text-decoration:none;">${safe.phone}</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 32px;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${GOLD};font-family:system-ui,-apple-system,sans-serif;">Their message</p>
              <div style="padding:20px 22px;background:rgba(0,0,0,0.42);border-radius:14px;border:1px solid rgba(197,168,128,0.12);color:rgba(245,245,245,0.9);font-size:15px;line-height:1.65;font-family:Georgia,'Times New Roman',serif;font-style:italic;">${safe.message}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px;">
              <p style="margin:0;font-size:11px;color:rgba(245,245,245,0.38);font-family:system-ui,-apple-system,sans-serif;letter-spacing:0.06em;">Received · ${received}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 36px;background:rgba(0,0,0,0.35);border-top:1px solid rgba(197,168,128,0.1);">
              <p style="margin:0;font-size:12px;color:rgba(245,245,245,0.45);line-height:1.6;font-family:system-ui,-apple-system,sans-serif;text-align:center;">Reply using the lead’s email above. This notification was sent from the executive concierge channel at <span style="color:${GOLD};">The Plot Sale</span>.</p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;max-width:600px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(245,245,245,0.28);text-align:center;font-family:system-ui,-apple-system,sans-serif;">London · Lahore · Advisory</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    'New enquiry — The Plot Sale (Private client desk)',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    'Message:',
    message,
    '',
    `Received: ${submittedAtIso}`,
    '',
    'Reply directly to the lead using the email address above.',
  ].join('\n');

  return { html, text };
}

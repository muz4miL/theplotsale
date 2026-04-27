# Kimi Prompt - Contact Form Email Configuration

## Context

We have a Next.js 15 luxury real estate website (theplotsale.com) with TWO contact forms already built:
1. Home page form at `/#concierge` (`components/home/HomeContact.jsx`)
2. Dedicated contact page at `/contact` (`app/contact/page.jsx`)

Both forms are fully functional and styled with our luxury design system (dark theme, gold accents #C5A880, glassmorphism).

The API endpoint (`app/api/contact/route.js`) is ready and uses Resend for email delivery.

## Current Status

✅ Forms built and working
✅ API endpoint configured
✅ Email template created (`lib/concierge-email.js`)
✅ Resend package installed
⏳ Need to configure environment variables

## Task

**NO CODE CHANGES NEEDED**. Just need to document the setup process.

The user needs to:
1. Get Resend API key from https://resend.com
2. Add 3 environment variables to Vercel:
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `CONTACT_TO_EMAIL`
3. Redeploy the site
4. Test both contact forms

## Files to Reference

Read these files to understand the current implementation:
- `components/home/HomeContact.jsx` - Home page contact form
- `app/contact/page.jsx` - Dedicated contact page
- `app/api/contact/route.js` - API endpoint with Resend
- `lib/concierge-email.js` - Luxury email template
- `.env.example` - Environment variables documentation

## What's Already Working

### Home Page Form
- Location: `https://theplotsale.com/#concierge`
- Fields: Name, Email, Phone, Message
- Design: Luxury glassmorphism card with parallax image
- Validation: Client-side with error messages
- Success state: "Request received" message
- Honeypot: Anti-spam `website` field

### Contact Page Form
- Location: `https://theplotsale.com/contact`
- Fields: Name, Email, Phone, Topic, Message
- Design: Full-page luxury layout with hero, office locations, maps
- Validation: Client-side with error messages
- Success state: Green success message
- Additional features: Office locations with Google Maps integration

### API Endpoint
- Endpoint: `/api/contact`
- Method: POST
- Validation:
  - Name: min 2 chars, max 120 chars
  - Email: valid email format, max 254 chars
  - Phone: min 5 chars, max 40 chars
  - Message: min 10 chars, max 5000 chars
- Honeypot check: Rejects if `website` or `_gotcha` fields present
- Email service: Resend API
- Error handling: Comprehensive error messages

### Email Template
- Design: Luxury dark theme (#050708 background, #C5A880 gold accents)
- Content:
  - "Private client desk" header
  - Contact snapshot table (Name, Email, Phone)
  - Message in styled box
  - Timestamp
- Format: Both HTML and plain text
- Reply-to: Set to sender's email for easy replies

## Environment Variables Needed

```env
# Resend API key (get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Sender email address
# Use "onboarding@resend.dev" initially (works immediately)
# Or verify domain and use "no-reply@theplotsale.com"
RESEND_FROM="ThePlotSale <onboarding@resend.dev>"

# Recipient email address (where form submissions go)
CONTACT_TO_EMAIL=contact@theplotsale.com
```

## Current Default Behavior

If `CONTACT_TO_EMAIL` is not set, emails go to: `HamzaSiddique2000@gmail.com` (hardcoded in `app/api/contact/route.js` line 6)

## Setup Steps

### 1. Create Resend Account
- Go to https://resend.com
- Sign up (free tier: 100 emails/day, 3,000/month)
- Verify email

### 2. Get API Key
- Dashboard → API Keys → Create API Key
- Name: "ThePlotSale Production"
- Copy key (starts with `re_`)

### 3. Add to Vercel
- Vercel dashboard → Project → Settings → Environment Variables
- Add 3 variables (Production, Preview, Development)
- Save

### 4. Redeploy
- Deployments tab → Latest deployment → "..." → Redeploy
- Wait 1-2 minutes

### 5. Test
- Visit `/contact` page
- Submit test form
- Check email at `CONTACT_TO_EMAIL`

## Optional: Domain Verification

To send from `no-reply@theplotsale.com` instead of `onboarding@resend.dev`:

1. Resend dashboard → Domains → Add Domain → `theplotsale.com`
2. Add DNS records to Hostinger:
   - SPF (TXT): @ → (value from Resend)
   - DKIM (TXT): resend._domainkey → (value from Resend)
   - DMARC (TXT): _dmarc → (value from Resend) [optional]
3. Wait 5-10 minutes for verification
4. Update `RESEND_FROM` in Vercel to `"ThePlotSale <no-reply@theplotsale.com>"`
5. Redeploy

## Testing Checklist

### Valid Submission
- Fill all fields correctly
- Click submit
- Should see success message
- Should receive email at `CONTACT_TO_EMAIL`

### Validation Errors
- Empty name → "Please enter your full name"
- Invalid email → "Please enter a valid email address"
- Short phone → "Please enter a valid phone number"
- Short message → "Please share a few more details"

### Both Forms
- Test home page form (`/#concierge`)
- Test contact page form (`/contact`)
- Both should send emails

### Email Content
- Subject: "Concierge request · [Name]"
- From: ThePlotSale <sender-address>
- Reply-To: [Sender's email]
- Content: Luxury branded template with contact details

## Troubleshooting

### "Email is not configured yet"
- Missing `RESEND_API_KEY` or `RESEND_FROM`
- Add environment variables and redeploy

### "Failed to send message"
- Invalid API key
- Check API key in Vercel matches Resend dashboard

### Email not arriving
- Check spam folder
- Check Resend dashboard → Logs
- Check Vercel logs for errors

### Form validation errors
- Check browser console (F12)
- Verify field requirements met

## Files Reference

### Contact Forms
- `components/home/HomeContact.jsx` - Home page form (lines 1-300)
- `app/contact/page.jsx` - Contact page (lines 1-350)
- `app/contact/layout.jsx` - Contact page metadata

### Backend
- `app/api/contact/route.js` - API endpoint (lines 1-120)
- `lib/concierge-email.js` - Email template builder (lines 1-150)

### Configuration
- `.env.example` - Environment variables (lines 15-17)
- `package.json` - Has `resend` package (line 20)

## No Changes Needed

The system is production-ready. Only need to:
1. ✅ Get Resend API key
2. ✅ Add environment variables
3. ✅ Redeploy
4. ✅ Test

Everything else is already built and working!

## Additional Notes

- Free tier (100 emails/day) is sufficient for contact forms
- Email template matches luxury brand aesthetic
- Both forms have spam protection (honeypot)
- Mobile responsive and accessible
- SEO optimized with proper metadata
- Error handling is comprehensive
- Success states are user-friendly

## Summary

**Current Status**: Forms built, API ready, email template created
**What's Needed**: Resend API key + environment variables
**Time to Complete**: 5 minutes
**Code Changes**: None required
**Result**: Fully functional contact forms sending luxury branded emails

---

## If User Wants to Make Changes

### Change Email Recipient
Update `CONTACT_TO_EMAIL` in Vercel environment variables.

### Add Multiple Recipients
Edit `app/api/contact/route.js` line 57:
```javascript
to: ['contact@theplotsale.com', 'sales@theplotsale.com'],
```

### Change Email Template
Edit `lib/concierge-email.js` to modify colors, layout, content.

### Add More Form Fields
Edit `components/home/HomeContact.jsx` or `app/contact/page.jsx` to add fields.
Update `app/api/contact/route.js` to handle new fields.

### Add Auto-Reply
In `app/api/contact/route.js`, after sending main email, add:
```javascript
await resend.emails.send({
  from: RESEND_FROM,
  to: email,
  subject: 'Thank you for contacting The Plot Sale',
  html: '<p>We received your message...</p>',
});
```

But for now, **no changes are needed**. The system is ready to use!

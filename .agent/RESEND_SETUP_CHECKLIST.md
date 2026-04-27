# Resend Email Setup - Quick Checklist

## ✅ What You Already Have

- ✅ Contact forms built and working (home page + /contact page)
- ✅ API route configured (`/api/contact`)
- ✅ Luxury email template ready
- ✅ Resend package installed
- ✅ Environment variables documented

## 🚀 Setup Steps (5 Minutes)

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Click "Sign Up" (free account)
3. Verify your email

### Step 2: Get API Key
1. In Resend dashboard, click "API Keys" in sidebar
2. Click "Create API Key"
3. Name it: "ThePlotSale Production"
4. Copy the key (starts with `re_`)
5. **Save it somewhere safe** (you can't see it again!)

### Step 3: Add to Vercel
1. Go to https://vercel.com/dashboard
2. Click your "theplotsale" project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

```
Name: RESEND_API_KEY
Value: re_your_actual_key_here
Environment: Production, Preview, Development
```

```
Name: RESEND_FROM
Value: "ThePlotSale <onboarding@resend.dev>"
Environment: Production, Preview, Development
```

```
Name: CONTACT_TO_EMAIL
Value: contact@theplotsale.com
Environment: Production, Preview, Development
```

**Note**: Using `onboarding@resend.dev` for now (works immediately). You can verify your domain later for `no-reply@theplotsale.com`.

### Step 4: Redeploy
1. Go to **Deployments** tab in Vercel
2. Click the "..." menu on latest deployment
3. Click "Redeploy"
4. Wait 1-2 minutes for deployment

### Step 5: Test
1. Visit `https://theplotsale.com/contact`
2. Fill out the form with real info
3. Click "Send request"
4. Check your email at `contact@theplotsale.com`

## ✅ Done!

Your contact forms are now sending emails! 🎉

---

## Optional: Verify Your Domain (Better Sender Address)

If you want emails to come from `no-reply@theplotsale.com` instead of `onboarding@resend.dev`:

### Step 1: Add Domain in Resend
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter: `theplotsale.com`
4. Click "Add"

### Step 2: Add DNS Records in Hostinger
Resend will show you 3 DNS records to add. Go to Hostinger DNS management and add:

**Record 1 (SPF)**:
- Type: TXT
- Name: @
- Value: (copy from Resend)

**Record 2 (DKIM)**:
- Type: TXT
- Name: resend._domainkey
- Value: (copy from Resend)

**Record 3 (DMARC)** - Optional:
- Type: TXT
- Name: _dmarc
- Value: (copy from Resend)

### Step 3: Wait for Verification
- Usually takes 5-10 minutes
- Resend will show "Verified" when ready

### Step 4: Update Environment Variable
In Vercel, change:
```
RESEND_FROM = "ThePlotSale <no-reply@theplotsale.com>"
```

### Step 5: Redeploy
Trigger a new deployment in Vercel.

---

## Troubleshooting

### "Email is not configured yet"
- Missing environment variables in Vercel
- Solution: Add all 3 variables and redeploy

### "Failed to send message"
- Invalid API key
- Solution: Double-check the API key in Vercel

### Email not arriving
- Check spam folder
- Check Resend dashboard → Logs
- Check Vercel logs for errors

### Form shows error but no details
- Check browser console (F12)
- Check Vercel logs

---

## Support

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: support@resend.com
- **Your API Dashboard**: https://resend.com/api-keys

---

## Current Email Recipient

Emails are sent to: `contact@theplotsale.com`

To change recipient, update `CONTACT_TO_EMAIL` in Vercel environment variables.

To add multiple recipients, you can modify `app/api/contact/route.js` line 57:
```javascript
to: ['contact@theplotsale.com', 'sales@theplotsale.com'],
```

---

## Free Tier Limits

- **100 emails per day**
- **3,000 emails per month**
- More than enough for contact forms!

If you need more, upgrade to paid plan ($20/month for 50,000 emails).

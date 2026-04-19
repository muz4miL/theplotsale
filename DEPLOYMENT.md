# ThePlotSale — Deployment Guide

This site is a **Next.js 16 (App Router)** app with a MongoDB database, Cloudinary media, and transactional email via Resend. It is **not** deployable on a Hostinger shared plan — shared PHP/Apache hosting cannot run a Node.js server with server-rendered routes and dynamic API endpoints.

> **TL;DR:** Deploy the app itself on **Vercel** (built by the creators of Next.js), use **MongoDB Atlas** for the database, **Cloudinary** for media, and **Resend** for email. Keep **Hostinger only for the domain** (point DNS at Vercel). For a production client site you can realistically run on the **free tiers of every service** for months — paid tiers become necessary only at scale. A safe budget is **£0–£30 / month** to start.

---

## 1. Recommended Stack (why each one)

| Layer | Service | Free tier (use this first) | Paid upgrade if needed |
| --- | --- | --- | --- |
| **Hosting + CDN** | [Vercel](https://vercel.com) | Hobby — unlimited static, 100 GB bandwidth, serverless functions, automatic HTTPS, preview deploys | Pro — $20 / user / month (needed only for commercial traffic > ~1M reqs/mo or >100GB bandwidth) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | M0 Free — 512 MB shared cluster | M10 dedicated — $57 / month |
| **Media (images / videos)** | [Cloudinary](https://cloudinary.com) | Free — 25 GB storage + 25 GB bandwidth / month | Plus — $99 / month |
| **Transactional email** | [Resend](https://resend.com) | Free — 3,000 emails / month, 100 / day | Pro — $20 / month (50k emails) |
| **Domain** | Hostinger (keep) | Already paid | — |

**Client cost at launch:** typically **£0/month** on free tiers. The domain renewal is the only guaranteed line item.

> ⚠️ Tell the client: shared hosting (Hostinger / cPanel / GoDaddy basic) **cannot** run this site. If they insist on Hostinger, the only option is [Hostinger VPS](https://www.hostinger.com/vps-hosting) (~$5–$10/mo) — but Vercel is cheaper at this scale, faster (global edge CDN), and removes all server admin from the client.

---

## 2. One-time setup (30 minutes, do this in order)

### 2.1 MongoDB Atlas

1. Create a free account → **Create a Cluster** → choose **M0 Free**, pick a region close to Pakistan/UK (London / Mumbai).
2. **Database Access** → create a user `theplotsale_prod` with a strong password.
3. **Network Access** → add `0.0.0.0/0` (allow from anywhere — required for Vercel's rotating IPs).
4. Click **Connect → Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://theplotsale_prod:<password>@cluster0.xxxxx.mongodb.net/theplotsale?retryWrites=true&w=majority
   ```
   **Replace `<password>` with the real password and put `theplotsale` as the database name.**

### 2.2 Cloudinary

1. Create a free account → copy **Cloud name** from dashboard.
2. **Settings → Upload → Upload presets → Add upload preset**, set **Signing Mode = Unsigned**, name it `theplotsale_unsigned`. This lets the admin CMS upload from the browser safely.
3. Save both values for the env step below.

### 2.3 Resend

1. Create account → **Add Domain** → follow the DNS steps on Hostinger to add the SPF + DKIM TXT records.
2. Once verified, create an **API key** (starts with `re_`).
3. Choose the `from` address, e.g. `no-reply@theplotsale.com`.

### 2.4 Vercel

1. Push the repo to GitHub (private is fine).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repo.
3. Framework is auto-detected as **Next.js**. Root directory = repo root. No build command changes needed.
4. Add the environment variables below **before** the first build.

---

## 3. Environment variables

Paste each of these into **Vercel → Project → Settings → Environment Variables** (scope: Production **and** Preview). These are the values the app actually reads (`rg process.env.` in the repo):

| Variable | Purpose | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for SEO, OG cards, sitemap, JSON-LD | `https://theplotsale.com` |
| `MONGODB_URI` | Atlas connection string | `mongodb+srv://...` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `theplotsale` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Unsigned preset created above | `theplotsale_unsigned` |
| `RESEND_API_KEY` | Resend API key (server-only) | `re_...` |
| `RESEND_FROM` | Verified `from` address | `ThePlotSale <no-reply@theplotsale.com>` |
| `CONTACT_TO_EMAIL` | Who receives contact-form submissions | `contact@theplotsale.com` |
| `ADMIN_PASSWORD` | Password for `/admin` login | *(strong random string)* |
| `NEXT_PUBLIC_FEATURED_PROJECT_SLUG` *(optional)* | Pins a specific project to the home spotlight | `etihad-town-lahore` |
| `NEXT_PUBLIC_GBP_TO_PKR_RATE` *(optional)* | Manual FX override for the GBP↔PKR toggle | `370` |

For local development, create `.env.local` at the repo root with the same keys.

---

## 4. Custom domain (using the existing Hostinger registrar)

1. In **Vercel → Project → Settings → Domains** → add `theplotsale.com` and `www.theplotsale.com`.
2. Vercel shows two DNS records to add. Log in to **Hostinger → hPanel → DNS Zone** for the domain and add them:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
3. Remove any existing conflicting `A` / `CNAME` records that point to the old shared hosting.
4. Wait 5–30 minutes for DNS to propagate. Vercel issues a free SSL certificate automatically.
5. Once live, update `NEXT_PUBLIC_SITE_URL` in Vercel to the real domain and redeploy.

---

## 5. Post-launch SEO checklist (do this day-1)

This site already ships with:

- Canonical URLs, OG cards and Twitter cards on every route (`lib/seo.js`).
- `sitemap.xml` at `/sitemap.xml` (auto-includes every CMS project & property).
- `robots.txt` at `/robots.txt` (admin + API blocked).
- JSON-LD graph on every page — `Organization`, `RealEstateAgent`, both `LocalBusiness` offices (London + Lahore with coordinates), `WebSite` with `SearchAction`, `BreadcrumbList`, `Product`/`Residence` for properties, `Place`/`ApartmentComplex` for projects.

You still need to plug the site into Google's tools:

1. **Google Search Console** → Add `https://theplotsale.com` as a property → verify via DNS TXT record (via Hostinger) or HTML meta tag (drop into `verification.google` inside `lib/seo.js`).
2. **Submit the sitemap**: `https://theplotsale.com/sitemap.xml`.
3. **Google Business Profile** for both offices (London + Lahore) — critical for competing on "real estate Lahore" / "property consultant Hounslow" local searches.
4. **Bing Webmaster Tools** → import from Search Console in one click. Cheap traffic source most agencies ignore.
5. Verify OG cards render with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator).

### How we beat generic portals like zameen.com

Zameen.com wins on **head terms** (e.g. "property in Pakistan") because of domain age + backlinks — you won't out-rank them there in year one. We win on **intent terms** where we have unique content:

- **Brand queries** — "theplotsale", "the plot sale reviews", "theplotsale Lahore".
- **Long-tail project queries** — "Etihad Town Lahore plots price 2026", "DHA plot acquisition consultant".
- **Cross-border investor queries** — "buy London property from Pakistan", "overseas Pakistani real estate agent UK".
- **Local pack** — each office has full `LocalBusiness` schema + coordinates, so "real estate near Hounslow" or "real estate Etihad Town" picks us up in the Google Maps 3-pack.

Each CMS listing gets its own indexed page with rich snippet eligibility (price, beds, baths, location). Keep adding listings — this is what compounds.

---

## 6. Deploy commands

### Local dev
```bash
npm install
cp .env.example .env.local  # then fill in values
npm run dev                 # http://localhost:3000
```

### Production build (runs automatically on Vercel)
```bash
npm run build
npm run start
```

### Seed demo data (optional, one-time)
```bash
npm run seed
```

---

## 7. Ongoing client responsibilities

- **Domain renewal** on Hostinger once a year (keep the reminder on).
- **Admin password** rotation — change `ADMIN_PASSWORD` in Vercel env if a team member leaves; redeploy.
- **Cloudinary / Atlas / Resend dashboards** — no action needed until usage warnings appear. Free tier thresholds are generous; you will get an email weeks before limits are hit.

---

**Who to ask about payment:** At launch the client owes **nothing except the domain renewal**. If usage grows past free tiers, the first likely upgrade is MongoDB Atlas M10 (~$57/mo) and only if listings > ~1000 or traffic > ~50k MAU. Vercel Hobby is technically "non-commercial" in Vercel's ToS — for a commercial client site you should move to **Vercel Pro at $20/mo** once the site is live, to stay compliant.

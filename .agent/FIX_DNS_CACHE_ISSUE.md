# Fix DNS Cache Issue - Disable IPv6

## Problem
Your router is caching the old IPv6 (AAAA) record even though you deleted it from Hostinger DNS. Your computer queries the router first and gets the old cached IPv6 address.

## Current Status
- ✅ Hostinger DNS correctly configured (A record: 216.198.79.1)
- ✅ AAAA record deleted from Hostinger
- ✅ Global DNS propagation complete
- ❌ Your router still serving old IPv6 address from cache
- ❌ Your computer using router DNS first: `fe80::88a9:b7ff:fee3:9664`

## Solution: Disable IPv6 on Your Computer

### Step 1: Open Network Connections
1. Press `Windows + R`
2. Type: `ncpa.cpl`
3. Press Enter

### Step 2: Disable IPv6 on Wi-Fi Adapter
1. Find your **Wi-Fi** adapter (Intel(R) Wi-Fi 6 AX201 160MHz)
2. **Right-click** on it
3. Select **Properties**
4. **Uncheck** the box next to: `Internet Protocol Version 6 (TCP/IPv6)`
5. Click **OK**

### Step 3: Flush DNS Cache Again
Open Command Prompt as Administrator and run:
```bash
ipconfig /flushdns
ipconfig /release
ipconfig /renew
```

### Step 4: Test DNS Resolution
```bash
nslookup theplotsale.com
```

**Expected result after disabling IPv6:**
- Should only show IPv4 address: `216.198.79.1`
- Should NOT show IPv6 address anymore

### Step 5: Test in Browser
1. Open a new incognito/private window
2. Visit: `http://theplotsale.com`
3. You should see your Next.js app (not the old WordPress site)

## Why This Works
- Your router is caching the old IPv6 (AAAA) record
- Router DNS cache can take 24-48 hours to expire
- By disabling IPv6, your computer will only use IPv4
- IPv4 resolution goes through Google DNS (8.8.8.8) which has the correct IP
- This bypasses the router's cached IPv6 record

## Alternative (If You Don't Want to Disable IPv6)
Wait 24-48 hours for your router's DNS cache to expire naturally. The DNS records are correct globally, it's just your local router that needs to catch up.

## After Site Loads Correctly
Once you can see your Next.js app at theplotsale.com:
1. Go to Vercel dashboard
2. Check if domain verification turned green
3. SSL certificate will auto-provision
4. Test `https://theplotsale.com` (with HTTPS)

## Router DNS Cache Info
Your router (`fe80::88a9:b7ff:fee3:9664`) is serving as a DNS server and has its own cache separate from your computer's DNS cache. That's why flushing your computer's DNS cache didn't help - the router is still giving you the old cached answer.

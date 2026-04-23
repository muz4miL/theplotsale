# 🤖 Gemini + Bulk Import Workflow Guide

## 📋 Complete Plan for You & Gemini

This guide shows you how to use Gemini to help format Zoopla property data for bulk import into your system.

---

## 🎯 The Goal

**Import 10-20 UK properties from Zoopla into your website quickly and efficiently.**

---

## 📝 Step-by-Step Workflow

### Step 1: Gather Zoopla Property URLs
```
1. Open Zoopla search results
2. Copy URLs of properties you want to add
3. Keep them in a list (10-20 properties)
```

**Example URLs:**
```
https://www.zoopla.co.uk/for-sale/details/12345678
https://www.zoopla.co.uk/for-sale/details/87654321
https://www.zoopla.co.uk/for-sale/details/11223344
```

---

### Step 2: Share with Gemini

**Copy this prompt to Gemini:**

```
Hi Gemini! I need help formatting UK property data for bulk import.

Here's the format I need (pipe-separated):
Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs

Rules:
- Price: Number only (no £ symbol)
- Receptions: Number or leave empty if not listed
- SqFt: Number only
- MainImageURL: Right-click main image → Copy image address
- GalleryURLs: Comma-separated image URLs (no spaces)
- Description: Keep under 200 characters

Here are the Zoopla property URLs I want to import:
[PASTE YOUR URLS HERE]

Can you help me extract and format the data from these properties?
```

---

### Step 3: Gemini Extracts Data

Gemini will visit each URL and extract:
- Title
- Location
- Price
- Beds/Baths/Receptions
- Square footage
- Description
- Image URLs

**Gemini will format it like:**
```
2 Bed Flat for sale | Selbourne Avenue, Hounslow TW3 | 198250 | 2 | 1 | 1 | 556 | https://lid.zoocdn.com/645/430/image1.jpg | Beautiful flat in prime location | https://lid.zoocdn.com/645/430/img1.jpg,https://lid.zoocdn.com/645/430/img2.jpg
```

---

### Step 4: Copy Gemini's Output

Gemini will give you formatted lines like:
```
Property 1: [formatted data]
Property 2: [formatted data]
Property 3: [formatted data]
...
```

**Copy all the formatted lines**

---

### Step 5: Paste into Bulk Import

```
1. Go to: https://theplotsale.vercel.app/admin/uk-bulk-import
2. Paste all the formatted lines into the text area
3. Click "Import Properties"
4. Wait for success messages
5. Done! ✅
```

---

## 🎯 Example Conversation with Gemini

### You Say:
```
Hi Gemini! I need help formatting UK property data for bulk import.

Format needed: Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs

Here are 3 Zoopla properties:
1. https://www.zoopla.co.uk/for-sale/details/12345678
2. https://www.zoopla.co.uk/for-sale/details/87654321
3. https://www.zoopla.co.uk/for-sale/details/11223344

Can you extract and format the data?
```

### Gemini Responds:
```
Sure! Here's the formatted data:

2 Bed Flat for sale | Selbourne Avenue, Hounslow TW3 | 198250 | 2 | 1 | 1 | 556 | https://lid.zoocdn.com/645/430/img1.jpg | Beautiful flat in prime location with modern finishes | https://lid.zoocdn.com/645/430/img1.jpg,https://lid.zoocdn.com/645/430/img2.jpg,https://lid.zoocdn.com/645/430/img3.jpg

4 Bed House for sale | Inwood Road, Hounslow TW3 | 500000 | 4 | 2 | 2 | 1200 | https://lid.zoocdn.com/645/430/img4.jpg | Spacious family home with garden | https://lid.zoocdn.com/645/430/img4.jpg,https://lid.zoocdn.com/645/430/img5.jpg

1 Bed Flat for sale | High Street Quarter, Hounslow TW3 | 325000 | 1 | 1 |  | 400 | https://lid.zoocdn.com/645/430/img6.jpg | Modern apartment in prime location | https://lid.zoocdn.com/645/430/img6.jpg,https://lid.zoocdn.com/645/430/img7.jpg
```

### You Do:
```
1. Copy all 3 lines
2. Go to /admin/uk-bulk-import
3. Paste into text area
4. Click "Import Properties"
5. Success! ✅
```

---

## 💡 Pro Tips for Working with Gemini

### Tip 1: Batch Processing
```
Don't do all 20 at once!
- Start with 3-5 properties
- Test the import
- If successful, do the rest in batches of 5-10
```

### Tip 2: Verify Data
```
Before importing, check:
✓ Price is a number (no £)
✓ Image URLs start with https://
✓ No extra spaces around pipes |
✓ Description is reasonable length
```

### Tip 3: Handle Missing Data
```
If property doesn't have:
- Receptions: Leave empty (| |)
- SqFt: Leave empty (| |)
- Gallery: Just use main image URL
```

### Tip 4: Image URLs
```
Ask Gemini to:
"Please include the main image URL and at least 3 gallery image URLs for each property"
```

---

## 🔒 Data Safety - YOUR DATA IS SAFE!

### ✅ Your Data Will NOT Be Deleted When You Deploy!

**Why your data is safe:**

1. **Database is separate from code**
   - Your properties are in MongoDB
   - Code changes don't affect database
   - Deploying = updating code only

2. **What happens when you deploy:**
   ```
   git push origin main
   → Vercel rebuilds the app
   → New code is deployed
   → Database stays untouched ✅
   → All your properties remain ✅
   ```

3. **Only these things delete data:**
   - You manually delete from admin
   - You drop the database (you won't do this!)
   - You click the delete button on a property

4. **Deploying does NOT:**
   - ❌ Delete properties
   - ❌ Clear database
   - ❌ Remove images
   - ❌ Reset anything

### 🎯 Safe Deployment Process:

```
Today:
1. Add all UK properties via bulk import
2. Test on Vercel (already deployed)
3. Properties are saved in MongoDB ✅

Tomorrow:
1. Make code changes (add features, fix bugs)
2. git push origin main
3. Vercel redeploys
4. All your properties are still there! ✅
5. New features work with existing data ✅
```

### 💾 Where Your Data Lives:

```
Code (GitHub):
- React components
- API routes
- Styling
→ Changes when you deploy

Database (MongoDB):
- All your properties
- All your projects
- All your data
→ NEVER changes when you deploy ✅
```

---

## 📊 Complete Example Workflow

### Scenario: Import 10 Zoopla Properties

**Step 1: Collect URLs (2 minutes)**
```
Open Zoopla
Copy 10 property URLs
```

**Step 2: Ask Gemini (1 minute)**
```
Paste this to Gemini:

"Hi! Format these 10 Zoopla properties for bulk import.

Format: Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs

URLs:
[paste your 10 URLs]

Please extract all data and format each property on one line."
```

**Step 3: Wait for Gemini (2-3 minutes)**
```
Gemini visits each URL
Extracts data
Formats it perfectly
Returns 10 formatted lines
```

**Step 4: Import (1 minute)**
```
Copy Gemini's output
Go to /admin/uk-bulk-import
Paste
Click "Import Properties"
Wait for success messages
```

**Total Time: ~7 minutes for 10 properties!** ⚡

---

## 🎯 Format Reference

### Required Format:
```
Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs
```

### Field Details:

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| Title | Text | `2 Bed Flat for sale` | From Zoopla heading |
| Location | Text | `Selbourne Avenue, Hounslow TW3` | Full address |
| Price | Number | `198250` | No £ symbol, no commas |
| Beds | Number | `2` | Number of bedrooms |
| Baths | Number | `1` | Number of bathrooms |
| Receptions | Number | `1` | Optional, can be empty |
| SqFt | Number | `556` | Square footage, optional |
| MainImageURL | URL | `https://lid.zoocdn.com/...` | Main property image |
| Description | Text | `Beautiful flat...` | Under 200 chars |
| GalleryURLs | URLs | `https://...,https://...` | Comma-separated, no spaces |

---

## ⚠️ Common Mistakes to Avoid

### ❌ Wrong:
```
2 Bed Flat | Hounslow | £198,250 | 2 | 1 | 1 | 556 sq ft | image.jpg | Description | img1.jpg, img2.jpg
```

**Problems:**
- Price has £ symbol and comma
- SqFt has "sq ft" text
- Image URLs are incomplete
- Gallery URLs have spaces after commas

### ✅ Right:
```
2 Bed Flat for sale | Selbourne Avenue, Hounslow TW3 | 198250 | 2 | 1 | 1 | 556 | https://lid.zoocdn.com/645/430/image.jpg | Beautiful flat in prime location | https://lid.zoocdn.com/645/430/img1.jpg,https://lid.zoocdn.com/645/430/img2.jpg
```

---

## 🚀 Quick Start Checklist

Before you start:
- [ ] Have Zoopla property URLs ready
- [ ] Have Gemini open
- [ ] Have bulk import page open
- [ ] Understand the format

During import:
- [ ] Ask Gemini to format data
- [ ] Verify Gemini's output looks correct
- [ ] Copy formatted lines
- [ ] Paste into bulk import
- [ ] Click "Import Properties"
- [ ] Wait for success messages

After import:
- [ ] Check /uk-properties page
- [ ] Verify properties appear
- [ ] Click on a property to see details
- [ ] Confirm images load

---

## 💬 Sample Prompts for Gemini

### Prompt 1: Basic Request
```
Hi Gemini! I need to import UK properties from Zoopla.

Format needed (pipe-separated):
Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs

Here are 5 property URLs:
[paste URLs]

Please extract and format the data for bulk import.
```

### Prompt 2: With Specific Instructions
```
Hi Gemini! Extract data from these Zoopla properties:

[paste URLs]

Format each property as:
Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs

Important:
- Price: number only (no £)
- Image URLs: full https:// URLs
- Gallery: comma-separated, no spaces
- Description: under 200 characters

Please format all properties for bulk import.
```

### Prompt 3: If Gemini Needs Clarification
```
The format is pipe-separated (|) with these fields in order:

1. Title (e.g., "2 Bed Flat for sale")
2. Location (e.g., "Selbourne Avenue, Hounslow TW3")
3. Price (number only, e.g., 198250)
4. Beds (number, e.g., 2)
5. Baths (number, e.g., 1)
6. Receptions (number or empty, e.g., 1)
7. SqFt (number or empty, e.g., 556)
8. MainImageURL (full URL)
9. Description (under 200 chars)
10. GalleryURLs (comma-separated, no spaces)

Each property should be on one line.
```

---

## 🎉 You're Ready!

**Your workflow:**
1. Collect Zoopla URLs
2. Ask Gemini to format them
3. Copy Gemini's output
4. Paste into bulk import
5. Click import
6. Done! ✅

**Your data is safe:**
- Deploying code doesn't delete data ✅
- Database is separate from code ✅
- Properties stay forever until you delete them ✅

**Time to import:**
- 10 properties = ~7 minutes ⚡
- 20 properties = ~12 minutes ⚡

**Now go import those properties!** 🚀

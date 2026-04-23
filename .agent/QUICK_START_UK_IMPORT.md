# 🚀 Quick Start: Import UK Properties in 3 Ways

## ⚡ Method 1: FASTEST - Auto Scraper (Recommended!)

**Time: ~30 seconds per property**

1. Open Zoopla property page
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Copy and paste the script from `.agent/ZOOPLA_SCRAPER.js`
5. Press Enter
6. **Data is automatically copied to clipboard!**
7. Go to `/admin/uk-bulk-import`
8. Paste and click Import

**Batch Mode:**
- Open 10 Zoopla tabs
- Run script in each (F12 → Console → Paste → Enter)
- All data auto-copies
- Paste all into bulk import
- **Import 10 properties in 5 minutes!**

---

## 🎯 Method 2: Manual Bulk Import

**Time: ~2 minutes per property**

1. Go to `/admin/uk-bulk-import`
2. For each Zoopla property, copy this format:

```
Title | Location | Price | Beds | Baths | SqFt | MainImageURL | Description | GalleryURLs
```

**Example:**
```
2 Bed Flat for sale | Selbourne Avenue, Hounslow TW3 | 198250 | 2 | 1 | 556 | https://lid.zoocdn.com/645/430/image.jpg | Beautiful flat in prime location | https://lid.zoocdn.com/645/430/img1.jpg,https://lid.zoocdn.com/645/430/img2.jpg
```

**Getting Image URLs:**
- Right-click image → "Copy image address"
- Or: Inspect element → Copy `src` attribute

3. Paste multiple properties (one per line)
4. Click "Import Properties"

---

## 🖱️ Method 3: Individual Entry (Most Control)

**Time: ~3-4 minutes per property**

1. Go to `/admin/uk-inventory`
2. Click "Add New"
3. Fill in form:
   - Title, Location, Price, Beds, Baths, SqFt
   - **Main Image URL**: Right-click Zoopla image → Copy image address → Paste
   - **Gallery**: Use MediaUploadManager or paste URLs
   - Description
4. Click "Create Listing"

**Advantages:**
- Full control over each field
- Can upload logos
- Can reorder gallery
- Preview before saving

---

## 📊 Comparison

| Method | Speed | Ease | Best For |
|--------|-------|------|----------|
| Auto Scraper | ⚡⚡⚡ | ⭐⭐⭐ | Bulk imports (10+ properties) |
| Bulk Import | ⚡⚡ | ⭐⭐ | Medium batches (5-10 properties) |
| Individual | ⚡ | ⭐⭐⭐ | Single properties, full control |

---

## 🎓 Pro Tips

### Fastest Workflow:
1. **Morning**: Open 20 Zoopla tabs of properties you want
2. **Run scraper** in each tab (takes 30 seconds total)
3. **Paste all** into bulk import
4. **Done!** 20 properties imported in 5 minutes

### Image Quality:
- Zoopla images are already CDN-hosted and optimized
- No need to re-upload unless you want custom branding
- URLs are permanent and fast

### Batch Processing:
- Use Excel/Google Sheets to organize data first
- Format with formulas, then copy to bulk import
- Easier to review and edit before importing

### Error Prevention:
- Always check price is number only (no £ symbol)
- Verify image URLs work (paste in browser)
- Keep descriptions under 500 characters for best display

---

## 🆘 Troubleshooting

**Scraper not working?**
- Make sure you're on a Zoopla property page (not search results)
- Refresh page and try again
- Check console for error messages

**Images not showing?**
- Verify URL is accessible (paste in browser)
- Ensure URL starts with `https://`
- Try copying image address again

**Import failed?**
- Check pipe separator format: `|` with spaces
- Ensure required fields (Title, Location) are filled
- Verify price is a number

**Duplicate properties?**
- System prevents duplicates based on slug
- Edit existing property instead of creating new

---

## 📞 Need Help?

Check the detailed guide: `.agent/UK_BULK_IMPORT_GUIDE.md`

Or use the individual entry method for full control!

# UK Property Bulk Import Guide

## 🚀 Quickest Method - Direct URL Paste

Your admin already supports pasting image URLs directly! No need to download images.

### Method 1: Individual Properties (Current System)
1. Go to `/admin/uk-inventory`
2. Click "Add New"
3. **Right-click property images on Zoopla** → "Copy image address"
4. **Paste URLs directly** into:
   - Main Image URL field
   - Gallery Media section
5. Fill in property details
6. Save

### Method 2: Bulk Import (NEW!)
1. Go to `/admin/uk-bulk-import`
2. Format your data as pipe-separated values:
   ```
   Title | Location | Price | Beds | Baths | SqFt | MainImageURL | Description | GalleryURLs
   ```

3. **Example:**
   ```
   2 Bed Flat for sale | Selbourne Avenue, Hounslow TW3 | 198250 | 2 | 1 | 556 | https://lid.zoocdn.com/645/430/image.jpg | Beautiful flat in prime location | https://lid.zoocdn.com/645/430/img1.jpg,https://lid.zoocdn.com/645/430/img2.jpg
   ```

4. Paste multiple properties (one per line)
5. Click "Import Properties"
6. Done! ✅

## 📋 Quick Copy Template for Zoopla Properties

For each property on Zoopla:
1. **Title**: Copy from listing headline
2. **Location**: Copy full address
3. **Price**: Copy number only (e.g., 198250)
4. **Beds/Baths/SqFt**: From property details
5. **Main Image**: Right-click main image → Copy image address
6. **Description**: Copy property description
7. **Gallery**: Right-click each gallery image → Copy image address, separate with commas

## 🎯 Pro Tips

### Getting Image URLs from Zoopla:
- **Desktop**: Right-click image → "Copy image address"
- **Chrome DevTools**: Inspect image → Copy `src` attribute
- Images are usually hosted on `lid.zoocdn.com`

### Batch Processing:
1. Open 5-10 Zoopla listings in tabs
2. Copy data from each into a spreadsheet
3. Format as pipe-separated
4. Paste into bulk import
5. Import all at once

### Image Quality:
- Zoopla images are already optimized
- URLs are permanent and CDN-hosted
- No need to re-upload to Cloudinary unless you want to

## 🔥 Even Faster: Excel/Google Sheets Method

1. Create spreadsheet with columns:
   - Title | Location | Price | Beds | Baths | SqFt | MainImage | Description | Gallery

2. Fill in data from Zoopla

3. Use formula to combine into pipe format:
   ```
   =A2&" | "&B2&" | "&C2&" | "&D2&" | "&E2&" | "&F2&" | "&G2&" | "&H2&" | "&I2
   ```

4. Copy formatted column

5. Paste into bulk import

## ⚡ Super Quick Method (10 properties in 5 minutes):

1. Open bulk import page
2. For each Zoopla property:
   - Copy title, location, price, specs
   - Right-click main image → Copy image address
   - Paste as: `Title | Location | Price | Beds | Baths | SqFt | ImageURL | Description`
3. Import all at once

## 🎨 Optional: Upload to Cloudinary

If you want images hosted on your Cloudinary:
1. Use the MediaUploadManager in the individual property form
2. Or use Cloudinary's fetch feature to auto-import from URLs
3. But Zoopla URLs work perfectly fine as-is!

## 📝 Notes

- All UK properties automatically get `region: UK` and `currency: GBP`
- Slugs are auto-generated from titles
- Gallery URLs should be comma-separated (no spaces)
- Empty fields are okay - just leave them blank in the pipe format
- The system prevents duplicates based on slug

## 🆘 Troubleshooting

**Images not showing?**
- Check if URL is accessible (paste in browser)
- Ensure URL starts with `https://`
- Zoopla images should work directly

**Import failed?**
- Check pipe separator format
- Ensure price is a number (no £ symbol)
- Verify all required fields (Title, Location) are filled

**Want to update existing property?**
- Use the individual edit form in UK Inventory
- Bulk import only creates new properties

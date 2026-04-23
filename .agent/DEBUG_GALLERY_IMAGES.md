# 🐛 Gallery Images Showing Same Image - Debug Guide

## 🔍 The Problem

You see 4 thumbnails but they're all the same image (the skyscraper).

## 🎯 Possible Causes

### Cause 1: Duplicate URLs in Database
The `galleryMedia` array has the same URL 4 times:
```javascript
galleryMedia: [
  "https://lid.zoocdn.com/.../image1.jpg",
  "https://lid.zoocdn.com/.../image1.jpg",  // duplicate!
  "https://lid.zoocdn.com/.../image1.jpg",  // duplicate!
  "https://lid.zoocdn.com/.../image1.jpg"   // duplicate!
]
```

### Cause 2: Gallery URLs Not Properly Separated
When you did bulk import, the gallery URLs might not have been separated correctly.

**Wrong format:**
```
... | https://url1.jpg https://url2.jpg https://url3.jpg
(spaces instead of commas)
```

**Correct format:**
```
... | https://url1.jpg,https://url2.jpg,https://url3.jpg
(commas, NO spaces)
```

## ✅ How to Fix

### Option 1: Edit the Property in Admin
1. Go to `/admin/uk-inventory`
2. Click edit on the "1 bed flat for sale" property
3. Scroll to "Gallery Media"
4. You should see 4 URLs listed
5. **Check if they're all the same or different**
6. If they're the same, delete 3 of them
7. Add the correct different URLs using the "Or paste image/video URLs" field
8. Click "Update Listing"

### Option 2: Re-import with Correct Format
1. Delete the property
2. Get the correct gallery URLs from Zoopla:
   - Right-click image 1 → Copy image address
   - Right-click image 2 → Copy image address
   - Right-click image 3 → Copy image address
   - Right-click image 4 → Copy image address
3. Format correctly:
   ```
   Title | Location | Price | ... | https://img1.jpg,https://img2.jpg,https://img3.jpg,https://img4.jpg
   ```
   **Important:** Commas between URLs, NO spaces!
4. Re-import

## 🧪 Test the Fix

After fixing:
1. Go to the property page
2. Refresh (Ctrl+F5)
3. Check the thumbnails at the bottom
4. They should now show 4 DIFFERENT images
5. Click each thumbnail to verify

## 📝 For Future Bulk Imports

**Correct gallery URL format:**
```
https://url1.jpg,https://url2.jpg,https://url3.jpg
```

**Wrong formats:**
```
❌ https://url1.jpg https://url2.jpg (spaces)
❌ https://url1.jpg, https://url2.jpg (space after comma)
❌ https://url1.jpg | https://url2.jpg (pipes)
```

## 🔧 Quick Fix Command

If you want to check what's in the database, open browser console on the property page and run:
```javascript
console.log('Gallery Media:', property.galleryMedia);
console.log('Gallery Images:', property.galleryImages);
```

This will show you exactly what URLs are stored.

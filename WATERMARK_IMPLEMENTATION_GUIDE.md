# 🎨 WATERMARK IMPLEMENTATION GUIDE

## Overview
This guide explains how to add The Plot Sale logo watermark to all images across the website for brand protection.

---

## 🚀 QUICK START (3 Options)

### **Option 1: CSS Overlay Watermark** (Immediate, Easy)
Replace `<Image>` components with `<WatermarkedImage>`

**Before:**
```jsx
<Image
  src={property.mainImage}
  alt={property.title}
  fill
  className="object-cover"
/>
```

**After:**
```jsx
<WatermarkedImage
  src={property.mainImage}
  alt={property.title}
  fill
  className="object-cover"
  watermarkPosition="bottom-right"
  watermarkSize="medium"
  preventRightClick={true}
/>
```

---

### **Option 2: Cloudinary Permanent Watermark** (Professional)
Use Cloudinary transformations to burn watermark into images

**Step 1:** Upload logo to Cloudinary as `newLogo2`

**Step 2:** Use the helper function:
```jsx
import { addWatermarkToCloudinaryUrl, WATERMARK_PRESETS } from '@/lib/watermark-cloudinary';

const watermarkedUrl = addWatermarkToCloudinaryUrl(
  property.mainImage,
  WATERMARK_PRESETS.standard
);
```

---

### **Option 3: Hybrid Approach** (Best of Both)
- Use Cloudinary for main images (permanent)
- Use CSS overlay for external URLs (Zoopla, etc.)

---

## 📋 IMPLEMENTATION STEPS

### Step 1: Update Property Listing Cards

**File:** `components/properties/PropertyListingCard.jsx`

```jsx
import WatermarkedImage from '@/components/shared/WatermarkedImage';

// Replace Image with WatermarkedImage
<WatermarkedImage
  src={property.mainImage}
  alt={property.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  watermarkPosition="bottom-right"
  watermarkSize="medium"
/>
```

---

### Step 2: Update Project Listing Cards

**File:** `components/projects/ProjectListingCard.jsx`

```jsx
import WatermarkedImage from '@/components/shared/WatermarkedImage';

<WatermarkedImage
  src={project.mainImage}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 50vw"
  watermarkPosition="bottom-right"
  watermarkSize="medium"
/>
```

---

### Step 3: Update Detail Page Showcases

**File:** `components/projects/ProjectLuxuryShowcase.jsx`

```jsx
import WatermarkedImage from '@/components/shared/WatermarkedImage';

// Main hero image
<WatermarkedImage
  src={project.mainImage}
  alt={project.title}
  fill
  className="object-cover"
  priority
  watermarkPosition="bottom-right"
  watermarkSize="large"
/>

// Gallery images
{galleryImages.map((url, index) => (
  <WatermarkedImage
    key={url}
    src={url}
    alt={`${project.title} - Image ${index + 1}`}
    fill
    className="object-cover"
    watermarkPosition="bottom-right"
    watermarkSize="medium"
  />
))}
```

---

## 🎨 WATERMARK CUSTOMIZATION

### Position Options:
- `bottom-right` (default) - Professional, non-intrusive
- `bottom-left` - Alternative corner
- `center` - For hero images, more prominent
- `top-right` - Less common
- `top-left` - Least common

### Size Options:
- `small` - 16-20px (subtle, for thumbnails)
- `medium` - 20-28px (standard, for listings)
- `large` - 24-40px (prominent, for hero images)

### Example Configurations:

**Subtle (Property Thumbnails):**
```jsx
<WatermarkedImage
  watermarkPosition="bottom-right"
  watermarkSize="small"
  preventRightClick={false}
/>
```

**Standard (Listing Cards):**
```jsx
<WatermarkedImage
  watermarkPosition="bottom-right"
  watermarkSize="medium"
  preventRightClick={true}
/>
```

**Prominent (Hero Images):**
```jsx
<WatermarkedImage
  watermarkPosition="center"
  watermarkSize="large"
  preventRightClick={true}
/>
```

---

## 🔒 PROTECTION FEATURES

### 1. **Right-Click Prevention**
```jsx
<WatermarkedImage preventRightClick={true} />
```
- Disables right-click context menu
- Prevents "Save Image As..."
- Can be bypassed by tech-savvy users

### 2. **Drag Prevention**
- Automatically prevents image dragging
- Stops drag-and-drop saves

### 3. **Anti-Screenshot Pattern**
- Subtle repeating pattern overlay
- Makes automated scraping harder
- Invisible to human eye

### 4. **User-Select Disabled**
- Prevents text/image selection
- Makes copying harder

---

## ☁️ CLOUDINARY SETUP (Permanent Watermark)

### Step 1: Upload Logo to Cloudinary

1. Go to Cloudinary dashboard
2. Upload `/public/newLogo2.png`
3. Set public ID as `newLogo2`
4. Note: Must be in root folder, not in subfolders

### Step 2: Update Image URLs

**Option A: At Upload Time (Best)**

Update `lib/cloudinary-upload.js`:

```javascript
export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  
  // Add watermark transformation
  formData.append('transformation', JSON.stringify({
    overlay: 'newLogo2',
    width: 120,
    opacity: 70,
    gravity: 'south_east',
    x: 20,
    y: 20,
    flags: 'layer_apply'
  }));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  return response.json();
}
```

**Option B: On Display (Flexible)**

```jsx
import { addWatermarkToCloudinaryUrl, WATERMARK_PRESETS } from '@/lib/watermark-cloudinary';

const watermarkedUrl = addWatermarkToCloudinaryUrl(
  property.mainImage,
  WATERMARK_PRESETS.standard
);

<Image src={watermarkedUrl} alt={property.title} fill />
```

---

## 📊 COMPARISON: CSS vs Cloudinary

| Feature | CSS Overlay | Cloudinary Permanent |
|---------|-------------|---------------------|
| **Implementation** | Easy, immediate | Requires setup |
| **Performance** | Slight overhead | No overhead |
| **Removable** | Yes (inspect element) | No (burned in) |
| **External URLs** | ✅ Works | ❌ Cloudinary only |
| **Flexibility** | ✅ Easy to change | ⚠️ Need re-upload |
| **Professional** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 RECOMMENDED APPROACH

### **Hybrid Strategy:**

1. **Cloudinary Images** (Your uploads) → Permanent watermark
2. **External URLs** (Zoopla, etc.) → CSS overlay
3. **Videos** → CSS overlay (Cloudinary video watermark is complex)

### Implementation:

```jsx
import WatermarkedImage from '@/components/shared/WatermarkedImage';
import { addWatermarkToCloudinaryUrl, isCloudinaryImage, WATERMARK_PRESETS } from '@/lib/watermark-cloudinary';

function PropertyImage({ src, alt }) {
  // Use Cloudinary permanent watermark if it's a Cloudinary image
  const imageSrc = isCloudinaryImage(src)
    ? addWatermarkToCloudinaryUrl(src, WATERMARK_PRESETS.standard)
    : src;

  // CSS overlay as fallback for external URLs
  return (
    <WatermarkedImage
      src={imageSrc}
      alt={alt}
      fill
      watermarkPosition="bottom-right"
      watermarkSize="medium"
      preventRightClick={true}
    />
  );
}
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Upload `newLogo2.png` to Cloudinary
- [ ] Update all `<Image>` components to `<WatermarkedImage>`
- [ ] Test on property listings
- [ ] Test on project listings
- [ ] Test on detail pages
- [ ] Test on mobile devices
- [ ] Verify watermark visibility
- [ ] Check performance impact
- [ ] Test right-click prevention
- [ ] Deploy to production

---

## 📱 MOBILE CONSIDERATIONS

- Watermark automatically scales on mobile
- Smaller size on small screens
- Position adjusts for safe-area-inset
- Touch-and-hold prevention included

---

## ⚠️ IMPORTANT NOTES

1. **Logo must be uploaded to Cloudinary** as `newLogo2` for permanent watermarking
2. **External URLs** (Zoopla) can only use CSS overlay
3. **Videos** use CSS overlay (Cloudinary video watermark is complex)
4. **Right-click prevention** can be bypassed - it's a deterrent, not foolproof
5. **Screenshots** cannot be prevented - watermark ensures branding stays

---

## 🎨 CUSTOMIZATION EXAMPLES

### Subtle Watermark (Thumbnails):
```jsx
<WatermarkedImage
  watermarkSize="small"
  watermarkPosition="bottom-right"
  preventRightClick={false}
/>
```

### Standard Watermark (Listings):
```jsx
<WatermarkedImage
  watermarkSize="medium"
  watermarkPosition="bottom-right"
  preventRightClick={true}
/>
```

### Prominent Watermark (Hero):
```jsx
<WatermarkedImage
  watermarkSize="large"
  watermarkPosition="center"
  preventRightClick={true}
/>
```

---

## 🔧 TROUBLESHOOTING

### Watermark not showing?
- Check if `/public/newLogo2.png` exists
- Verify image loaded successfully
- Check browser console for errors

### Watermark too big/small?
- Adjust `watermarkSize` prop
- Use `small`, `medium`, or `large`

### Watermark in wrong position?
- Change `watermarkPosition` prop
- Options: `bottom-right`, `bottom-left`, `center`, etc.

### Cloudinary watermark not working?
- Verify logo uploaded to Cloudinary as `newLogo2`
- Check Cloudinary cloud name in env variables
- Test URL manually in browser

---

## 📞 SUPPORT

For issues or questions, check:
1. Browser console for errors
2. Network tab for failed image loads
3. Cloudinary dashboard for logo upload
4. This guide for configuration options

---

**Ready to implement? Start with Option 1 (CSS Overlay) for immediate results, then migrate to Cloudinary permanent watermarking for professional solution!**

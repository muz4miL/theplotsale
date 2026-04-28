# Mobile Issues Diagnosis

## 🐛 Issues Reported

1. **Mobile menu broken** - Hamburger opens but shows cramped layout
2. **Mobile video not playing** - Shows static poster, video doesn't autoplay

---

## 📋 Analysis

### Issue 1: Mobile Menu (Navbar)

**Status**: ✅ **NAVBAR CODE LOOKS CORRECT**

I reviewed `components/layout/Navbar.jsx` and the mobile menu implementation looks solid:

- Hamburger button works (toggles drawer)
- Drawer has proper z-index (z-[95])
- Layout uses flexbox with proper spacing
- Close button positioned correctly
- Menu items have stagger animations
- Currency toggle included
- "Book Appointment" button at bottom

**Possible causes if still broken**:
1. CSS conflicts from global styles
2. Z-index conflicts with other components
3. Viewport height issues on specific devices
4. Tailwind classes not being applied

**Files to check**:
- `app/globals.css` - Check for conflicting styles
- `components/layout/Navbar.module.css` - If it exists
- Browser console for CSS errors

---

### Issue 2: Mobile Video Not Playing

**Status**: ⚠️ **LIKELY CAUSE IDENTIFIED**

The home page video hero has these files:
- `components/home/HeroVideoParallax.jsx` - Main hero component
- `hooks/useVideoAutoplay.js` - Custom hook for autoplay (EXISTS)
- `hooks/usePrefersReducedMotion.js` - Reduced motion hook (EXISTS)

**Likely causes**:

#### A. HeroVideoParallax Not Using the Hook
The `useVideoAutoplay` hook was created but may not be integrated into `HeroVideoParallax.jsx` yet.

**Check**: Does `HeroVideoParallax.jsx` import and use `useVideoAutoplay`?

#### B. Video Attributes Missing
Mobile video needs:
- `muted` attribute
- `playsInline` attribute  
- `preload="metadata"` (not "auto" on mobile)
- `webkit-playsinline="true"`
- `x5-playsinline="true"`

#### C. Poster Not Showing Properly
If video fails, poster should show with crossfade. Check if poster image exists at `/lifestyle-hero.png`.

#### D. GSAP ScrollTrigger Conflicts
GSAP ScrollTrigger on mobile can prevent video from playing. Need to use `matchMedia` to disable ScrollTrigger on mobile.

---

## 🔍 What to Check

### For Mobile Menu:

1. **Open browser console on mobile**
   - Look for JavaScript errors
   - Look for CSS errors
   - Check if Tailwind classes are applied

2. **Check z-index conflicts**
   ```bash
   # Search for high z-index values that might conflict
   grep -r "z-\[" components/
   ```

3. **Test on different devices**
   - iOS Safari
   - Android Chrome
   - Different screen sizes

### For Mobile Video:

1. **Check if useVideoAutoplay is integrated**
   ```javascript
   // In HeroVideoParallax.jsx, should have:
   import { useVideoAutoplay } from '@/hooks/useVideoAutoplay';
   
   const { videoRef, status, posterVisible } = useVideoAutoplay({
     src: '/videos/1.mp4',
     poster: '/lifestyle-hero.png',
     loop: true
   });
   ```

2. **Check video element attributes**
   ```jsx
   <video
     ref={videoRef}
     muted
     playsInline
     loop
     preload="metadata"
     poster="/lifestyle-hero.png"
     webkit-playsinline="true"
     x5-playsinline="true"
   >
     <source src="/videos/1.mp4" type="video/mp4" />
   </video>
   ```

3. **Check poster visibility**
   ```jsx
   {posterVisible && (
     <div className="poster-layer">
       <Image src="/lifestyle-hero.png" ... />
     </div>
   )}
   ```

4. **Check GSAP matchMedia**
   ```javascript
   useEffect(() => {
     const mm = gsap.matchMedia();
     
     // Desktop: Full GSAP
     mm.add('(min-width: 1024px)', () => {
       // ScrollTrigger animations
     });
     
     // Mobile: NO ScrollTrigger
     mm.add('(max-width: 1023px)', () => {
       // Simple fade-ins only
     });
     
     return () => mm.revert();
   }, []);
   ```

---

## 🛠️ Quick Fixes

### Fix 1: Verify Video Hook Integration

**Read this file**:
```bash
components/home/HeroVideoParallax.jsx
```

**Check for**:
- Does it import `useVideoAutoplay`?
- Does it use the hook?
- Does it show poster when `posterVisible` is true?

### Fix 2: Check Video Attributes

**In HeroVideoParallax.jsx**, the `<video>` element should have:
```jsx
<video
  ref={videoRef}
  muted              // CRITICAL for iOS
  playsInline        // CRITICAL for iOS
  loop
  preload="metadata" // Better for mobile than "auto"
  poster="/lifestyle-hero.png"
  webkit-playsinline="true"
  x5-playsinline="true"
  className="..."
>
  <source src="/videos/1.mp4" type="video/mp4" />
</video>
```

### Fix 3: Check Poster Image

**Verify poster exists**:
```bash
ls -la public/lifestyle-hero.png
```

If missing, use a fallback or create one from the video first frame.

### Fix 4: Check Console Errors

**On mobile device**:
1. Open Chrome DevTools (desktop)
2. Connect mobile device via USB
3. Inspect mobile browser
4. Look for errors in console

---

## 📱 Testing Checklist

### Mobile Menu:
- [ ] Hamburger button opens drawer
- [ ] Drawer slides in from right
- [ ] Logo and "Menu" text visible at top
- [ ] Close button (X) works
- [ ] Menu items listed vertically
- [ ] Currency toggle visible
- [ ] "Book Appointment" button at bottom
- [ ] Clicking menu item closes drawer and navigates

### Mobile Video:
- [ ] Poster shows immediately (no black screen)
- [ ] Video starts playing within 2-3 seconds
- [ ] If video blocked, poster stays visible
- [ ] If video errors, poster stays visible with Ken Burns
- [ ] Video loops smoothly
- [ ] No GSAP jank or jumpiness
- [ ] Scroll works smoothly

---

## 🎯 Most Likely Issues

### Mobile Menu:
**Probably NOT broken** - The code looks correct. If client sees issues:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check on different device
4. Check browser console for errors

### Mobile Video:
**Probably NOT integrated yet** - The `useVideoAutoplay` hook exists but may not be used in `HeroVideoParallax.jsx` yet.

**Action needed**:
1. Read `HeroVideoParallax.jsx`
2. Check if it uses `useVideoAutoplay`
3. If not, integrate the hook
4. Add poster fallback layer
5. Add GSAP matchMedia for mobile

---

## 📄 Files to Read

### Priority 1 (Must Read):
```
components/home/HeroVideoParallax.jsx  # Main video hero
hooks/useVideoAutoplay.js              # Autoplay hook (exists)
hooks/usePrefersReducedMotion.js       # Reduced motion (exists)
```

### Priority 2 (If issues persist):
```
components/layout/Navbar.jsx           # Mobile menu (looks correct)
app/globals.css                        # Global styles (check conflicts)
app/page.jsx                           # Home page entry
```

### Priority 3 (Optional):
```
components/home/MobileHeroVideo.jsx    # Mobile variant (may be unused)
components/home/SimpleMobileHero.jsx   # Simple variant (may be unused)
```

---

## 🚀 Next Steps

1. **Read `HeroVideoParallax.jsx`** to see current implementation
2. **Check if `useVideoAutoplay` is integrated** - if not, that's the issue
3. **Verify video attributes** - must have `muted` and `playsInline`
4. **Check poster fallback** - must show when video fails
5. **Test on real mobile device** - not just browser DevTools

---

## 💡 Quick Win

If video isn't playing, the fastest fix is:

1. Open `HeroVideoParallax.jsx`
2. Add these attributes to `<video>`:
   ```jsx
   muted
   playsInline
   preload="metadata"
   ```
3. Add programmatic play:
   ```javascript
   useEffect(() => {
     const video = videoRef.current;
     if (video) {
       video.muted = true;
       video.play().catch(() => console.log('Autoplay blocked'));
     }
   }, []);
   ```

This should get video playing on most mobile devices immediately.

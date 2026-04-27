# Home Page Video Hero - All Related Files

## 🎯 Main Files to Fix

### 1. **Main Page Entry Point**
- **File**: `app/page.jsx`
- **Purpose**: Home page that imports and renders HeroVideoParallax
- **Contains**: ReactDOM.preload() calls for video and poster
- **Video preloaded**: `/videos/1.mp4`
- **Poster preloaded**: `/lifestyle-hero.png`

### 2. **Primary Hero Component (MAIN VIDEO COMPONENT)**
- **File**: `components/home/HeroVideoParallax.jsx`
- **Purpose**: Main cinematic video hero with GSAP ScrollTrigger parallax
- **This is the MAIN component that needs mobile video fixes**
- **Backup exists**: `components/home/HeroVideoParallax.jsx.backup`

### 3. **Mobile Hero Alternatives (May be broken/unused)**
- **File**: `components/home/MobileHeroVideo.jsx`
- **Purpose**: Simplified mobile video hero (may be broken)
- **File**: `components/home/SimpleMobileHero.jsx`
- **Purpose**: Another mobile hero variant (may be broken)

### 4. **Legacy Hero (Probably unused)**
- **File**: `components/home/Hero.jsx`
- **CSS**: `components/home/Hero.module.css`
- **Purpose**: Old hero component (probably replaced by HeroVideoParallax)

---

## 📁 Complete File List

### Core Video Components
```
app/page.jsx                                    # Main entry, preloads video
components/home/HeroVideoParallax.jsx           # MAIN VIDEO HERO ⭐
components/home/HeroVideoParallax.jsx.backup    # Backup of main hero
components/home/MobileHeroVideo.jsx             # Mobile variant (may be broken)
components/home/SimpleMobileHero.jsx            # Simple mobile variant
components/home/Hero.jsx                        # Legacy hero (unused?)
components/home/Hero.module.css                 # Legacy hero styles
```

### Supporting Components (Not video-related but on home page)
```
components/home/Intro.jsx                       # Section after hero
components/home/Intro.module.css                # Intro styles
components/home/LuxuryLogoMarquee.jsx           # Logo marquee section
components/home/Properties.jsx                  # Properties showcase
components/home/BentoGrid.jsx                   # Bento grid section
components/home/BentoGrid.module.css            # Bento grid styles
components/home/LavitaLifestyle.jsx             # Lifestyle section
components/home/Testimonials.jsx                # Testimonials section
components/home/CoreCapabilitiesCarousel.jsx    # Capabilities carousel
components/home/HomeContact.jsx                 # Contact form section
components/home/OfficeLocations.jsx             # Office locations section
components/home/DisciplineMonograms.jsx         # Discipline monograms
```

---

## 🎬 Video Assets

### Video Files (in `/public/videos/`)
- `/videos/1.mp4` - Main hero video (preloaded in app/page.jsx)
- Possibly more numbered videos (2.mp4, 3.mp4, etc.) for parallax sequence

### Poster Images (in `/public/`)
- `/lifestyle-hero.png` - Main poster image (preloaded in app/page.jsx)

---

## 🔧 What Needs to Be Fixed

### Primary Target: `components/home/HeroVideoParallax.jsx`

This is the MAIN component that needs:
1. ✅ Mobile autoplay fixes (muted, playsInline, programmatic play)
2. ✅ Poster fallback with crossfade
3. ✅ Network-aware loading
4. ✅ Loading states (never show black screen)
5. ✅ Mobile GSAP strategy (no ScrollTrigger pin on mobile)
6. ✅ Error handling with Ken Burns fallback
7. ✅ Reduced motion support
8. ✅ Touch-native experience on mobile

### Secondary: Mobile Variants (if used)
- `components/home/MobileHeroVideo.jsx` - May need fixes or removal
- `components/home/SimpleMobileHero.jsx` - May need fixes or removal

---

## 📋 Files to Read First

To understand the current implementation, read these in order:

1. **`app/page.jsx`** - See how hero is imported and what's preloaded
2. **`components/home/HeroVideoParallax.jsx`** - Main video hero component
3. **`components/home/MobileHeroVideo.jsx`** - Check if this is used
4. **`components/home/SimpleMobileHero.jsx`** - Check if this is used

---

## 🎯 Implementation Strategy

### Step 1: Read Current Implementation
```bash
# Read these files to understand current setup
app/page.jsx
components/home/HeroVideoParallax.jsx
components/home/MobileHeroVideo.jsx
components/home/SimpleMobileHero.jsx
```

### Step 2: Identify Issues
- Is GSAP ScrollTrigger causing mobile jank?
- Is video autoplay failing on iOS Safari?
- Is there a poster fallback?
- Are there loading states?
- Is there network-aware loading?

### Step 3: Implement Fixes
Focus on `HeroVideoParallax.jsx`:
- Add mobile autoplay logic
- Add poster crossfade
- Add loading states
- Add GSAP matchMedia for mobile
- Add error handling
- Add reduced motion support

### Step 4: Test
- iPhone Safari
- Android Chrome
- Desktop (ensure no regressions)
- Slow 3G
- Reduced motion

---

## 🚨 Critical Notes

1. **Desktop GSAP must not break** - The desktop ScrollTrigger experience is perfect
2. **Mobile needs separate strategy** - Use GSAP matchMedia to serve different animations
3. **Never show black screen** - Always show poster while video loads
4. **Autoplay is critical** - Must work on iOS Safari (muted + playsInline)
5. **Network-aware** - Detect slow connections and show poster with Ken Burns

---

## 📦 Hooks Needed (Create if missing)

```
hooks/usePrefersReducedMotion.js    # Detect reduced motion preference
hooks/useVideoAutoplay.js           # Handle programmatic video play
hooks/useNetworkStatus.js           # Detect connection speed (optional)
```

---

## 🎨 Design Requirements

- Full viewport height: `h-[100dvh]` (use dvh for mobile)
- Video covers entire area: `object-cover`
- Dark gradient overlay for text readability
- Centered headline in Playfair Display
- Bottom badges centered (as already fixed)
- Navbar safe zone: `pt-28` minimum
- Touch-friendly controls: min 44x44px

---

## ✅ Success Criteria

- [ ] Video autoplays on iPhone Safari
- [ ] Video autoplays on Android Chrome
- [ ] No black screen ever shown
- [ ] Poster shows instantly while video loads
- [ ] Desktop GSAP ScrollTrigger unchanged
- [ ] Mobile has smooth, simple animations
- [ ] Reduced motion users see static poster
- [ ] Slow 3G shows poster with Ken Burns
- [ ] No console errors on any device
- [ ] Lighthouse Performance 90+ on mobile

---

## 📝 Commit Message Template

```bash
git commit -m "Fix mobile video autoplay on home hero — add poster fallback, network-aware loading, and touch-native GSAP strategy"
```

---

## 🔗 Related Files (Not video, but on home page)

These are other sections on the home page that come AFTER the hero:
- Intro section
- Logo marquee
- Properties showcase
- Bento grid
- Lifestyle section
- Testimonials
- Capabilities carousel
- Contact form
- Office locations

**Do not modify these** - only focus on the video hero components.

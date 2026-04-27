# Home Page Video Hero - Files for Kimi to Fix

## 🎯 MAIN FILE TO FIX

**`components/home/HeroVideoParallax.jsx`** - This is the PRIMARY video hero component

## 📁 All Related Files

### Must Read & Fix:
1. `app/page.jsx` - Entry point, has video preload
2. `components/home/HeroVideoParallax.jsx` - **MAIN VIDEO HERO** ⭐
3. `components/home/MobileHeroVideo.jsx` - Mobile variant (check if used)
4. `components/home/SimpleMobileHero.jsx` - Simple mobile variant (check if used)

### Legacy (Probably unused):
5. `components/home/Hero.jsx` - Old hero component
6. `components/home/Hero.module.css` - Old hero styles

### Backup:
7. `components/home/HeroVideoParallax.jsx.backup` - Backup of main hero

## 🎬 Video Assets

- **Video**: `/videos/1.mp4` (preloaded in app/page.jsx)
- **Poster**: `/lifestyle-hero.png` (preloaded in app/page.jsx)

## 🐛 Problems to Fix

1. ❌ Video doesn't autoplay on mobile (iOS Safari, Android Chrome)
2. ❌ Black screen shows while video loads
3. ❌ No poster fallback
4. ❌ GSAP ScrollTrigger causes jank on mobile
5. ❌ No loading states
6. ❌ No network-aware loading
7. ❌ No reduced motion support

## ✅ What Needs to Be Implemented

### In `HeroVideoParallax.jsx`:

1. **Mobile Autoplay Logic**
   - Add `muted` attribute
   - Add `playsInline` attribute
   - Add `preload="metadata"` for mobile
   - Add programmatic `play()` fallback
   - Handle `loadedmetadata` and `canplay` events

2. **Poster Fallback**
   - Show poster instantly
   - Crossfade to video when ready (800ms transition)
   - Never show black screen

3. **Loading States**
   - `loading` → show poster with pulse
   - `playing` → show video
   - `error` → show poster with Ken Burns zoom

4. **GSAP Mobile Strategy**
   - Use `gsap.matchMedia()`
   - Desktop: Keep existing ScrollTrigger (perfect, don't change)
   - Mobile: Simple fade-ins, NO ScrollTrigger pin
   - Tablet: Simplified animations

5. **Error Handling**
   - Catch video load errors
   - Fall back to poster with Ken Burns animation
   - Never crash the page

6. **Reduced Motion**
   - Detect `prefers-reduced-motion`
   - Show static poster, no video, no animations

7. **Network-Aware**
   - Detect slow connections (3G)
   - Show poster instead of loading video
   - Ken Burns animation on poster

## 📋 Implementation Checklist

- [ ] Read `app/page.jsx` to understand preload
- [ ] Read `HeroVideoParallax.jsx` to understand current implementation
- [ ] Add mobile autoplay logic (muted, playsInline, programmatic play)
- [ ] Add poster fallback with crossfade
- [ ] Add loading states (loading/playing/error)
- [ ] Add GSAP matchMedia for mobile strategy
- [ ] Add error handling with Ken Burns fallback
- [ ] Add reduced motion support
- [ ] Add network-aware loading
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test on desktop (ensure no regressions)
- [ ] Test on slow 3G
- [ ] Test with reduced motion enabled

## 🎨 Design Requirements

- Full viewport: `h-[100dvh]` (use dvh for mobile)
- Video: `object-cover`
- Dark gradient overlay for text readability
- Centered headline: Playfair Display, `text-[clamp(3rem,10vw,7.5rem)]`
- Bottom badges: centered (already fixed)
- Navbar safe zone: `pt-28` minimum
- Touch controls: min 44x44px

## 🚨 Critical Rules

1. **DO NOT break desktop GSAP** - It's perfect, preserve it exactly
2. **DO use GSAP matchMedia** - Different strategies for desktop/tablet/mobile
3. **DO show poster instantly** - Never show black screen
4. **DO handle all errors** - Video load failures must fall back gracefully
5. **DO respect reduced motion** - Static poster for accessibility
6. **DO NOT modify other home sections** - Only fix the hero video

## 📝 Commit Message

```bash
git commit -m "Fix mobile video autoplay on home hero — add poster fallback, network-aware loading, and touch-native GSAP strategy"
```

## 🔗 Full Documentation

See `.agent/HOME_PAGE_VIDEO_FILES.md` for complete file list and detailed implementation guide.

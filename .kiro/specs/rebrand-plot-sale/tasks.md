# Tasks: Rebrand to The Plot Sale

## Overview

This document defines the implementation tasks for rebranding the Lavita mountain resort website to "The Plot Sale" high-end real estate consultancy.

---

## Phase 1: CSS Foundation Updates

### Task 1.1: Update CSS Custom Properties
- [ ] Update `:root` CSS custom properties in `app/globals.css`
  - Replace `--midnight-pine: #0B1C19` with `--luxury-charcoal: #111111`
  - Replace `--brushed-copper: #C89B7B` with `--premium-gold: #C5A880`
  - Replace `--deep-emerald: #050F0D` with `--deep-black: #1A1A1A`
  - Replace `--bg-dark-flow: #0D1512` with `--bg-dark-flow: #0A0A0A`

### Task 1.2: Update Tailwind Theme Configuration
- [ ] Update `@theme inline` block in `app/globals.css`
  - Replace `--color-midnight-pine` with `--color-luxury-charcoal`
  - Replace `--color-brushed-copper` with `--color-premium-gold`
  - Replace `--color-deep-emerald` with `--color-deep-black`

### Task 1.3: Update Glassmorphism Class
- [ ] Update `.glass-morphism` class in `app/globals.css`
  - Change `background: rgba(15, 37, 34, 0.7)` to `rgba(17, 17, 17, 0.7)`
  - Change `border: 1px solid rgba(200, 155, 123, 0.1)` to `rgba(197, 168, 128, 0.1)`

### Task 1.4: Update Scrollbar Styles
- [ ] Update scrollbar styles in `app/globals.css`
  - Change `background: var(--midnight-pine)` to `var(--luxury-charcoal)`
  - Change `background: var(--brushed-copper)` to `var(--premium-gold)`
  - Update hover color from `#d4a98a` to `#D4AF37`

### Task 1.5: Update Selection Color
- [ ] Update `::selection` pseudo-element in `app/globals.css`
  - Change `background: var(--brushed-copper)` to `var(--premium-gold)`
  - Change `color: var(--midnight-pine)` to `var(--luxury-charcoal)`

### Task 1.6: Update Text Effects
- [ ] Update `.text-glow` class in `app/globals.css`
  - Change `text-shadow: 0 0 30px rgba(200, 155, 123, 0.3)` to `rgba(197, 168, 128, 0.3)`

- [ ] Update `.text-gold-gradient` class in `app/globals.css`
  - Change gradient from `#C89B7B, #E6C7A8` to `#C5A880, #D4AF37`

### Task 1.7: Update Video Container Styling
- [ ] Update `.video-container-luxury` class in `app/globals.css`
  - Change `box-shadow` inset color from `rgba(200, 155, 123, 0.15)` to `rgba(197, 168, 128, 0.15)`

### Task 1.8: Update Focus Styles
- [ ] Update `:focus-visible` pseudo-element in `app/globals.css`
  - Change `outline: 2px solid var(--brushed-copper)` to `var(--premium-gold)`

---

## Phase 2: Component Updates

### Task 2.1: Update Hero.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `rgba(200, 155, 123, X)` with `rgba(197, 168, 128, X)`
- [ ] Verify loading spinner border color uses new gold

### Task 2.2: Update Intro.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `#0D1512` with `#0A0A0A` (background)
- [ ] Update floating badge colors
- [ ] Update feature icon border colors

### Task 2.3: Update BentoGrid.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `#0D1512` with `#0A0A0A` (background)
- [ ] Update section header gradient line
- [ ] Update card border hover colors
- [ ] Update scroll progress indicator color

### Task 2.4: Update LavitaLifestyle.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `#0D1512` with `#0A0A0A` (background)
- [ ] Update eyebrow gradient line
- [ ] Update CTA button border colors
- [ ] Update diamond overlay glass effects

### Task 2.5: Update Testimonials.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `#0D1512` with `#0A0A0A` (background)
- [ ] Update avatar placeholder colors
- [ ] Update card hover border colors

### Task 2.6: Update HomeContact.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `#0D1512` with `#0A0A0A` (background)
- [ ] Update seamless flow gradient
- [ ] Update form input focus border colors
- [ ] Update submit button colors

### Task 2.7: Update Preloader.jsx
- [ ] Replace all `#C89B7B` with `#C5A880` (accent color)
- [ ] Replace all `#0F2522` with `#111111` (curtain background)
- [ ] Update SVG octagon stroke colors
- [ ] Update shimmer effect color

---

## Phase 3: Layout and Metadata Updates

### Task 3.1: Update Layout Metadata
- [ ] Update `app/layout.jsx` metadata
  - Change title from "Lavita Services Club" to "The Plot Sale"
  - Update description to reflect real estate consultancy

---

## Phase 4: Verification

### Task 4.1: Build Verification
- [ ] Run `npm run build` and verify no errors
- [ ] Run `npm run lint` and verify no new errors

### Task 4.2: Color Consistency Verification
- [ ] Search codebase for old color values
  - Verify no `#C89B7B` remains
  - Verify no `#0B1C19` remains
  - Verify no `#0D1512` remains (except in comments)
  - Verify no `#050F0D` remains
  - Verify no `#0F2522` remains

### Task 4.3: Animation Verification
- [ ] Verify Preloader animation works
- [ ] Verify Hero video carousel works
- [ ] Verify Intro scroll animations work
- [ ] Verify BentoGrid horizontal scroll works
- [ ] Verify Testimonials infinite scroll works
- [ ] Verify HomeContact star field works

### Task 4.4: Visual Verification
- [ ] Verify glassmorphism effects render correctly
- [ ] Verify all accent colors display as gold/tan
- [ ] Verify all backgrounds display as charcoal/black
- [ ] Verify text contrast is readable

---

## Task Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: CSS Foundation | 8 tasks | Not Started |
| Phase 2: Components | 7 tasks | Not Started |
| Phase 3: Layout | 1 task | Not Started |
| Phase 4: Verification | 4 tasks | Not Started |
| **Total** | **20 tasks** | **Not Started** |

---

## Color Reference

| Old Value | New Value | Usage |
|-----------|-----------|-------|
| `#0B1C19` | `#111111` | Primary background |
| `#0D1512` | `#0A0A0A` | Dark flow background |
| `#050F0D` | `#1A1A1A` | Deep black |
| `#0F2522` | `#111111` | Preloader curtain |
| `#C89B7B` | `#C5A880` | Primary accent (gold) |
| `#d4a98a` | `#D4AF37` | Hover accent |
| `rgba(200, 155, 123, X)` | `rgba(197, 168, 128, X)` | Semi-transparent gold |
| `rgba(15, 37, 34, X)` | `rgba(17, 17, 17, X)` | Semi-transparent charcoal |
| `rgba(13, 21, 18, X)` | `rgba(10, 10, 10, X)` | Semi-transparent dark |
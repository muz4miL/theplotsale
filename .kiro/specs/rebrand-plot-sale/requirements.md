# Requirements Document: Rebrand to The Plot Sale

## Overview

This document specifies the requirements for rebranding the Lavita mountain resort website to "The Plot Sale" high-end real estate consultancy. Requirements are derived from the design document and organized by acceptance criteria.

---

## Acceptance Criteria

### 1. CSS Custom Properties Update

**AC1.1**: The `:root` CSS custom properties in `app/globals.css` must be updated with new brand colors.

**Given** the globals.css file contains Lavita brand colors
**When** the rebranding is complete
**Then** the following CSS custom properties must be updated:
- `--midnight-pine: #0B1C19` becomes `--luxury-charcoal: #111111`
- `--brushed-copper: #C89B7B` becomes `--premium-gold: #C5A880`
- `--deep-emerald: #050F0D` becomes `--deep-black: #1A1A1A`
- `--bg-dark-flow: #0D1512` becomes `--bg-dark-flow: #0A0A0A`

**AC1.2**: The `@theme inline` Tailwind configuration must reflect the new variable names.

**Given** the @theme inline block maps CSS variables to Tailwind colors
**When** the rebranding is complete
**Then** the following Tailwind color mappings must be updated:
- `--color-midnight-pine` becomes `--color-luxury-charcoal`
- `--color-brushed-copper` becomes `--color-premium-gold`
- `--color-deep-emerald` becomes `--color-deep-black`

---

### 2. Glassmorphism Effects Preservation

**AC2.1**: The `.glass-morphism` class must use the new brand colors.

**Given** the glass-morphism class provides backdrop blur effects
**When** the rebranding is complete
**Then** the class must use:
- `background: rgba(17, 17, 17, 0.7)` (was `rgba(15, 37, 34, 0.7)`)
- `border: 1px solid rgba(197, 168, 128, 0.1)` (was `rgba(200, 155, 123, 0.1)`)

**AC2.2**: All glassmorphism effects must maintain their visual appearance.

**Given** glassmorphism is used in Hero, Intro, and other components
**When** the rebranding is complete
**Then** the blur effect, transparency, and border styling must remain functional

---

### 3. Component Color Updates

**AC3.1**: All inline hex color references in components must be updated.

**Given** components use inline hex colors (e.g., `bg-[#C89B7B]`)
**When** the rebranding is complete
**Then** all instances of:
- `#C89B7B` must become `#C5A880`
- `#0B1C19` must become `#111111`
- `#0D1512` must become `#0A0A0A`
- `#d4a98a` must become `#D4AF37`

**AC3.2**: All rgba() color references must be updated.

**Given** components use rgba() for semi-transparent colors
**When** the rebranding is complete
**Then** all instances of:
- `rgba(200, 155, 123, X)` must become `rgba(197, 168, 128, X)`
- `rgba(15, 37, 34, X)` must become `rgba(17, 17, 17, X)`
- `rgba(13, 21, 18, X)` must become `rgba(10, 10, 10, X)`

---

### 4. Animation Preservation

**AC4.1**: All framer-motion animations must remain functional.

**Given** components use framer-motion for scroll and entrance animations
**When** the rebranding is complete
**Then** all animation variants, transitions, and triggers must work identically

**AC4.2**: All GSAP ScrollTrigger animations must remain functional.

**Given** the BentoGrid uses GSAP for horizontal scroll animation
**When** the rebranding is complete
**Then** the horizontal scroll effect must work identically

**AC4.3**: All Lenis smooth scrolling must remain functional.

**Given** the application uses Lenis for smooth scroll behavior
**When** the rebranding is complete
**Then** smooth scrolling must work identically

---

### 5. Kinetic Scrolling Effects

**AC5.1**: The horizontal scroll carousel in BentoGrid must be preserved.

**Given** BentoGrid implements a scroll-driven horizontal carousel
**When** the rebranding is complete
**Then** the horizontal scroll animation must function identically

**AC5.2**: The parallax effects must be preserved.

**Given** components use parallax scrolling effects
**When** the rebranding is complete
**Then** all parallax effects must function identically

---

### 6. Metadata Updates

**AC6.1**: The page title must be updated.

**Given** the layout.jsx defines page metadata
**When** the rebranding is complete
**Then** the title must change from "Lavita Services Club" to "The Plot Sale"

**AC6.2**: The page description must be updated.

**Given** the layout.jsx defines page description
**When** the rebranding is complete
**Then** the description must reflect the real estate consultancy business

---

### 7. Build Verification

**AC7.1**: The application must build successfully.

**Given** all color transformations are complete
**When** `npm run build` is executed
**Then** the build must complete without errors

**AC7.2**: No TypeScript/JavaScript errors must be introduced.

**Given** the rebranding involves only CSS and JSX changes
**When** the build completes
**Then** there must be no new type errors or lint errors

---

### 8. Visual Consistency

**AC8.1**: No old brand colors must remain in the codebase.

**Given** the rebranding is complete
**When** searching for old color values
**Then** no instances of `#C89B7B`, `#0B1C19`, `#0D1512`, or `#050F0D` must be found

**AC8.2**: The new color palette must be applied consistently.

**Given** the rebranding is complete
**When** viewing any page
**Then** all colors must use the new charcoal/gold palette

---

## Requirements Summary

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | Update CSS custom properties in globals.css | High | Pending |
| R2 | Update @theme inline Tailwind configuration | High | Pending |
| R3 | Update glassmorphism class colors | High | Pending |
| R4 | Update inline hex colors in Hero.jsx | High | Pending |
| R5 | Update inline hex colors in Intro.jsx | High | Pending |
| R6 | Update inline hex colors in BentoGrid.jsx | High | Pending |
| R7 | Update inline hex colors in LavitaLifestyle.jsx | High | Pending |
| R8 | Update inline hex colors in Testimonials.jsx | High | Pending |
| R9 | Update inline hex colors in HomeContact.jsx | High | Pending |
| R10 | Update inline hex colors in Preloader.jsx | High | Pending |
| R11 | Update rgba() references in all components | High | Pending |
| R12 | Update metadata in layout.jsx | Medium | Pending |
| R13 | Verify build succeeds | High | Pending |
| R14 | Verify animations preserved | High | Pending |
| R15 | Verify no old colors remain | High | Pending |

---

## Out of Scope

The following items are explicitly out of scope for this rebranding:

1. **Content Changes**: Updating text content beyond metadata (e.g., testimonials, descriptions)
2. **Image Replacement**: Replacing images with real estate imagery
3. **Logo Replacement**: Replacing the Lavita logo with The Plot Sale logo
4. **Structural Changes**: Modifying component structure or adding new features
5. **API Changes**: Modifying any backend or API integrations
6. **Route Changes**: Changing URL structure or page routes
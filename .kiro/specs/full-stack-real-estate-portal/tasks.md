# Implementation Plan: Full-Stack Real Estate Portal

## Overview

This implementation plan transforms "The Plot Sale" from a static Next.js frontend into a full-stack real estate portal with MongoDB integration, dynamic routing, and API endpoints. The implementation uses pure JavaScript (.js and .jsx) to maintain maximum development speed and compatibility with the existing luxury UI components.

**Key Implementation Notes**:
- Use pure JavaScript (.js and .jsx) for ALL new files - no TypeScript
- Maintain existing luxury dark-mode glassmorphic design aesthetic
- Preserve all existing animations and styling patterns
- Focus on incremental integration without refactoring existing components

## Tasks

- [ ] 1. Set up MongoDB infrastructure and connection utilities
  - Create lib/mongodb.js with cached connection management for serverless optimization
  - Add mongoose dependency to package.json
  - Create .env.example documenting required environment variables (MONGODB_URI, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
  - Configure connection pooling and error handling for Vercel serverless environment
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 11.1, 11.4_

- [ ]* 1.1 Write unit tests for MongoDB connection utility
  - Test connection caching behavior
  - Test error handling for missing MONGODB_URI
  - Test connection reuse across multiple calls
  - _Requirements: 2.2, 2.3_

- [ ] 2. Create Mongoose data models with validation
  - [ ] 2.1 Implement Property model (models/Property.js)
    - Define schema with all required fields: title, slug, region, currency, price, location, beds, baths, areaSqFt, description, mainImage, galleryImages
    - Add unique constraint on slug field
    - Configure automatic timestamps (createdAt, updatedAt)
    - Add enum validation for region ('UK' | 'Pakistan') and currency ('GBP' | 'PKR')
    - _Requirements: 1.1, 1.3, 1.5, 1.6_
  
  - [ ] 2.2 Implement Project model (models/Project.js)
    - Define schema with all required fields: title, slug, status, location, totalArea, description, paymentPlan, mainImage, progressUpdates
    - Add unique constraint on slug field
    - Configure automatic timestamps (createdAt, updatedAt)
    - Add enum validation for status ('Completed' | 'Current' | 'Upcoming')
    - Define progressUpdates subdocument schema with date, title, mediaUrls fields
    - _Requirements: 1.2, 1.4, 1.5, 1.6_

- [ ]* 2.3 Write unit tests for data models
  - Test schema validation for required fields
  - Test unique slug constraint enforcement
  - Test enum validation for region, currency, and status fields
  - Test automatic timestamp generation
  - _Requirements: 1.1, 1.2, 1.5, 1.6_

- [ ] 3. Implement Property API endpoints
  - Create app/api/properties/route.js with GET and POST handlers
  - Implement GET handler to fetch all properties with optional region filtering via query parameter
  - Implement POST handler to create new properties with validation
  - Add database connection establishment before all operations
  - Implement error handling with appropriate HTTP status codes (200, 201, 400, 500)
  - Return JSON responses with proper error messages
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ]* 3.1 Write integration tests for Property API
  - Test GET /api/properties returns all properties
  - Test GET /api/properties?region=UK filters correctly
  - Test POST /api/properties creates new property
  - Test POST validation error handling
  - Test database error handling
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 4. Implement Project API endpoints
  - Create app/api/projects/route.js with GET and POST handlers
  - Implement GET handler to fetch all projects with optional status filtering via query parameter
  - Implement POST handler to create new projects with validation
  - Add database connection establishment before all operations
  - Implement error handling with appropriate HTTP status codes (200, 201, 400, 500)
  - Return JSON responses with proper error messages
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ]* 4.1 Write integration tests for Project API
  - Test GET /api/projects returns all projects
  - Test GET /api/projects?status=Current filters correctly
  - Test POST /api/projects creates new project
  - Test POST validation error handling
  - Test database error handling
  - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5. Checkpoint - Verify API infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Configure Next.js for external image domains
  - Update next.config.mjs to add remotePatterns for images.unsplash.com and res.cloudinary.com
  - Maintain existing reactCompiler configuration
  - Test image loading from both domains
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 7. Create database seeding utility
  - Create scripts/seed.js with sample data population logic
  - Add at least 4 sample UK Properties (region='UK', currency='GBP') with realistic data
  - Add at least 5 sample Pakistan Projects with varied status values ('Completed', 'Current', 'Upcoming')
  - Include sample progressUpdates arrays for at least 2 Projects with dates, titles, and mediaUrls
  - Implement data clearing before insertion to ensure clean state
  - Add success logging indicating document counts created
  - Add npm script "seed" to package.json for easy execution
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

- [ ]* 7.1 Test seeding script execution
  - Run seed script and verify data appears in MongoDB
  - Verify existing data is cleared before new insertion
  - Verify correct document counts are logged
  - _Requirements: 14.5, 14.6_

- [ ] 8. Create UK Properties listing page
  - [ ] 8.1 Implement app/uk-properties/page.jsx
    - Fetch Properties with region='UK' from /api/properties endpoint
    - Implement responsive grid layout (1 column mobile, 2 tablet, 3-4 desktop)
    - Display mainImage, title, location, price (formatted as GBP), beds, baths, areaSqFt for each property
    - Use Next.js Image component with priority loading for above-fold images
    - Maintain dark-mode glassmorphic styling with gold (#C5A880) accents
    - Implement Framer Motion stagger animations on scroll
    - Add empty state message when no properties found
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 18.2, 18.3_
  
  - [ ] 8.2 Create loading.jsx for UK Properties page
    - Implement skeleton loader matching glassmorphic luxury design
    - Add subtle pulse animation effects
    - Match grid layout of main page
    - _Requirements: 16.1, 16.3, 16.4_
  
  - [ ] 8.3 Create error.jsx for UK Properties page
    - Implement error boundary with luxury design aesthetic
    - Add "Try Again" button that resets error boundary
    - Log errors to console for debugging
    - _Requirements: 15.1, 15.3, 15.4, 15.5_

- [ ] 9. Create Pakistan Projects hub page with tabbed interface
  - [ ] 9.1 Implement app/pakistan-projects/page.jsx
    - Fetch all Projects from /api/projects endpoint
    - Create 3-tab interface with "Completed", "Current", "Upcoming" tabs
    - Implement tab click filtering to display Projects matching selected status
    - Animate tab transitions using Framer Motion with smooth opacity and position changes
    - Display mainImage, title, location, status badge, description excerpt for each project
    - Use Next.js Image component with lazy loading for project images
    - Maintain luxury design aesthetic with dark backgrounds and gold accents
    - Add empty state message when no projects match selected status
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 18.2, 18.3_
  
  - [ ] 9.2 Create loading.jsx for Pakistan Projects page
    - Implement skeleton loader matching glassmorphic luxury design
    - Add subtle pulse animation effects
    - Include skeleton for tab interface
    - _Requirements: 16.2, 16.3, 16.4_
  
  - [ ] 9.3 Create error.jsx for Pakistan Projects page
    - Implement error boundary with luxury design aesthetic
    - Add "Try Again" button that resets error boundary
    - Log errors to console for debugging
    - _Requirements: 15.2, 15.3, 15.4, 15.5_

- [ ] 10. Checkpoint - Verify listing pages
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Create Property detail dynamic route
  - [ ] 11.1 Implement app/uk-properties/[slug]/page.jsx
    - Fetch Property document matching slug parameter from /api/properties endpoint
    - Display title, location, price, beds, baths, areaSqFt, full description, mainImage
    - Implement responsive gallery layout for galleryImages with lightbox functionality
    - Use Next.js Image component for mainImage and all galleryImages
    - Implement generateMetadata function using Property title and description for SEO
    - Add Open Graph tags with mainImage as og:image
    - Include canonical URL in metadata
    - Return 404 page when slug doesn't match any Property
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 17.1, 17.3, 17.4, 17.5_
  
  - [ ]* 11.2 Write unit tests for Property detail page
    - Test data fetching with valid slug
    - Test 404 handling for invalid slug
    - Test metadata generation
    - _Requirements: 7.2, 7.6, 17.1_

- [ ] 12. Create Project detail dynamic route
  - [ ] 12.1 Implement app/pakistan-projects/[slug]/page.jsx
    - Fetch Project document matching slug parameter from /api/projects endpoint
    - Display title, location, status, totalArea, description, paymentPlan, mainImage
    - Implement generateMetadata function using Project title and description for SEO
    - Add Open Graph tags with mainImage as og:image
    - Include canonical URL in metadata
    - Return 404 page when slug doesn't match any Project
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 17.2, 17.3, 17.4, 17.5_
  
  - [ ]* 12.2 Write unit tests for Project detail page
    - Test data fetching with valid slug
    - Test 404 handling for invalid slug
    - Test metadata generation
    - _Requirements: 8.2, 8.5, 17.2_

- [ ] 13. Implement Development Progress Timeline component
  - Create components/projects/ProgressTimeline.jsx component
  - Accept progressUpdates array as prop
  - Render updates in chronological order (most recent first)
  - Display date, title, and media from mediaUrls for each update
  - Use Next.js Image component with lazy loading for all progress media
  - Implement timeline or masonry grid layout
  - Add Framer Motion scroll animations
  - Show "Updates coming soon" message when progressUpdates array is empty
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [ ] 14. Integrate ProgressTimeline into Project detail page
  - Import and render ProgressTimeline component in app/pakistan-projects/[slug]/page.jsx
  - Pass progressUpdates array from Project document as prop
  - Add "Development Progress" section heading
  - Conditionally render section only if progressUpdates array is not empty
  - _Requirements: 9.1, 9.7_

- [ ]* 14.1 Write unit tests for ProgressTimeline component
  - Test rendering with multiple progress updates
  - Test chronological ordering (most recent first)
  - Test empty state message
  - Test lazy loading of images
  - _Requirements: 9.2, 9.3, 9.7_

- [ ] 15. Checkpoint - Verify detail pages and progress timeline
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Integrate dynamic data into homepage
  - Modify components/home/Properties.jsx to fetch from /api/properties endpoint
  - Display first 4 Properties from database instead of hardcoded data
  - Maintain existing animation and styling patterns
  - Implement skeleton loaders matching luxury design for loading states
  - Add fallback message for API errors without breaking page layout
  - Ensure smooth transition from loading to loaded state
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ]* 16.1 Write integration tests for homepage Properties section
  - Test data fetching from API
  - Test loading state rendering
  - Test error state handling
  - Test display of first 4 properties
  - _Requirements: 12.1, 12.2, 12.4, 12.5_

- [ ] 17. Implement responsive design verification
  - Test all new pages at breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop), 2560px (wide)
  - Verify grid layouts: 1 column mobile, 2 columns tablet, 3-4 columns desktop
  - Ensure touch targets are minimum 44x44px on mobile
  - Test smooth scroll behavior and animations on mobile devices
  - Verify glassmorphic effects render correctly across all viewports
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [ ] 18. Implement accessibility compliance
  - Add descriptive alt text to all images (properties, projects, progress updates)
  - Verify proper heading hierarchy (h1, h2, h3) on all new pages
  - Ensure all interactive elements (buttons, tabs, cards) are keyboard navigable
  - Add ARIA labels to icon-only buttons and interactive elements
  - Test color contrast ratios for text on dark backgrounds (minimum 4.5:1)
  - Test with keyboard navigation (Tab, Enter, Escape keys)
  - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

- [ ] 19. Implement performance optimizations
  - Configure Next.js Image component with priority loading for above-fold images
  - Implement lazy loading for gallery images and progress update media
  - Add ISR (Incremental Static Regeneration) with 60-second revalidation to property/project detail pages
  - Verify JavaScript bundle size and implement code-splitting for large components
  - Run Lighthouse audit and optimize to achieve score >90 desktop, >80 mobile
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [ ]* 19.1 Run performance benchmarks
  - Run Lighthouse audit on all new pages
  - Measure Time to First Byte (TTFB) for API routes
  - Measure Largest Contentful Paint (LCP) for listing pages
  - Document performance metrics
  - _Requirements: 19.5_

- [ ] 20. Final integration and testing
  - Run full application locally with seeded database
  - Test complete user flows: homepage → UK properties → property detail
  - Test complete user flows: homepage → Pakistan projects → project detail → progress timeline
  - Verify all API endpoints return correct data
  - Verify all images load from Cloudinary
  - Test error boundaries by simulating API failures
  - Verify loading states appear correctly
  - Test responsive behavior on multiple devices
  - _Requirements: All requirements_

- [ ] 21. Final checkpoint - Production readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- All new code uses pure JavaScript (.js and .jsx) - no TypeScript
- Existing luxury UI components and styling patterns are preserved
- Checkpoints ensure incremental validation and user feedback opportunities
- Focus on minimal, incremental changes to maintain development velocity
- Database seeding script should be run before testing listing and detail pages

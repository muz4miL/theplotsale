# Design Document: Full-Stack Real Estate Portal

## Overview

This design document specifies the technical architecture for transforming "The Plot Sale" from a static Next.js frontend into a full-stack, enterprise-grade real estate portal. The system will integrate MongoDB for data persistence, implement RESTful API routes, create dynamic routing for properties and projects, and maintain the existing luxury dark-mode glassmorphic design aesthetic.

### System Goals

1. **Data Persistence**: Store Property and Project data in MongoDB with validated schemas
2. **Dynamic Content**: Replace hardcoded data with database-driven content
3. **Scalable Architecture**: Implement serverless-optimized database connections and API routes
4. **Performance**: Leverage ISR (Incremental Static Regeneration) for optimal load times
5. **Design Continuity**: Preserve the luxury aesthetic with dark backgrounds, glassmorphic effects, and gold (#C5A880) accents
6. **Type Safety**: Implement comprehensive TypeScript types across the stack

### Target Audience

High-net-worth overseas investors seeking:
- UK residential properties (houses, flats, bungalows)
- Pakistan society development projects with progress tracking
- Premium user experience with smooth animations and luxury design

### Technology Stack

- **Frontend**: Next.js 14+ (App Router), React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes, Mongoose ODM
- **Database**: MongoDB (cloud-hosted)
- **Media**: Cloudinary for image hosting and optimization
- **Type Safety**: TypeScript for all new code
- **Deployment**: Vercel (serverless environment)

## Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Browser]
        NextImage[Next.js Image Component]
    end
    
    subgraph "Next.js App Router"
        HomePage[Home Page]
        UKPropsPage[UK Properties Page]
        PakProjectsPage[Pakistan Projects Page]
        PropDetail[Property Detail /uk-properties/[slug]]
        ProjDetail[Project Detail /pakistan-projects/[slug]]
    end
    
    subgraph "API Layer"
        PropsAPI[/api/properties]
        ProjAPI[/api/projects]
    end
    
    subgraph "Data Layer"
        DBUtil[lib/mongodb.js - Connection Cache]
        PropModel[models/Property.js]
        ProjModel[models/Project.js]
    end
    
    subgraph "External Services"
        MongoDB[(MongoDB Atlas)]
        Cloudinary[Cloudinary CDN]
    end
    
    Browser --> HomePage
    Browser --> UKPropsPage
    Browser --> PakProjectsPage
    Browser --> PropDetail
    Browser --> ProjDetail
    
    HomePage --> PropsAPI
    UKPropsPage --> PropsAPI
    PakProjectsPage --> ProjAPI
    PropDetail --> PropsAPI
    ProjDetail --> ProjAPI
    
    PropsAPI --> DBUtil
    ProjAPI --> DBUtil
    
    DBUtil --> PropModel
    DBUtil --> ProjModel
    
    PropModel --> MongoDB
    ProjModel --> MongoDB
    
    NextImage --> Cloudinary
```

### Architecture Principles

1. **Server-First Rendering**: All pages use Server Components by default for optimal performance
2. **API Route Pattern**: RESTful endpoints handle all database operations
3. **Connection Caching**: Single MongoDB connection reused across serverless invocations
4. **ISR Strategy**: Static generation with 60-second revalidation for property/project pages
5. **Image Optimization**: Next.js Image component with Cloudinary as the source
6. **Type Safety**: TypeScript interfaces mirror Mongoose schemas

### Serverless Optimization

The application is optimized for Vercel's serverless environment:

- **Connection Pooling**: MongoDB connection cached in global scope to prevent exhaustion
- **Cold Start Mitigation**: Minimal dependencies in API routes
- **Edge-Ready**: API routes designed for potential edge runtime migration
- **Stateless Design**: No server-side session state

## Components and Interfaces


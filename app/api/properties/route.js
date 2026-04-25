import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

/**
 * GET /api/properties
 * Fetches all properties or filters by region query parameter
 */
export async function GET(request) {
  // Set up timeout for database query (increased to 25s to account for connection time)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Database query timeout')), 25000);
  });

  try {
    // Race between database connection + query and timeout
    const result = await Promise.race([
      (async () => {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const region = searchParams.get('region');

        let query = {};
        if (region) {
          query.region = region;
        }

        return await Property.find(query).sort({ createdAt: -1 });
      })(),
      timeoutPromise
    ]);

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching properties:', error);
    
    // Handle timeout specifically
    if (error.message === 'Database query timeout') {
      return NextResponse.json({
        success: false,
        error: 'Database timeout',
        message: 'The database query took too long to respond',
      }, { status: 504 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch properties',
      message: error.message,
    }, { status: 500 });
  }
}

/**
 * POST /api/properties
 * Creates a new property
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'slug', 'region', 'location'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      }, { status: 400 });
    }

    // Validate enum values
    if (!['UK', 'Pakistan'].includes(body.region)) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'Region must be either UK or Pakistan',
      }, { status: 400 });
    }

    if (body.currency && !['GBP', 'PKR'].includes(body.currency)) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'Currency must be either GBP or PKR',
      }, { status: 400 });
    }

    const property = await Property.create({
      ...body,
      price: body.price ? Number(body.price) : undefined,
      beds: body.beds ? Number(body.beds) : undefined,
      baths: body.baths ? Number(body.baths) : undefined,
      areaSqFt: body.areaSqFt ? Number(body.areaSqFt) : undefined,
      currency: body.currency || (body.region === 'Pakistan' ? 'PKR' : 'GBP'),
      description: body.description || '',
      mainImage: body.mainImage || undefined,
      primaryLogo: body.primaryLogo || '',
      floatingLogos: Array.isArray(body.floatingLogos) ? body.floatingLogos : [],
      galleryImages: Array.isArray(body.galleryImages) ? body.galleryImages : [],
      galleryMedia: Array.isArray(body.galleryMedia) ? body.galleryMedia : [],
    });

    return NextResponse.json({
      success: true,
      data: property,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating property:', error);

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'A property with this slug already exists',
      }, { status: 400 });
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: messages.join(', '),
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create property',
      message: error.message,
    }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

/**
 * GET /api/projects
 * Fetches all projects or filters by status query parameter
 */
export async function GET(request) {
  // Set up timeout for database query (increased to 40s to account for reconnection time)
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Database query timeout')), 40000); // Increased to 40s for reconnection time
  });

  try {
    // Race between database connection + query and timeout
    const result = await Promise.race([
      (async () => {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let query = {};
        if (status) {
          query.status = status;
        }

        return await Project.find(query).sort({ createdAt: -1 });
      })(),
      timeoutPromise
    ]);

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching projects:', error);

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
      error: 'Failed to fetch projects',
      message: error.message,
    }, { status: 500 });
  }
}

/**
 * POST /api/projects
 * Creates a new project
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'slug', 'status', 'location'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      }, { status: 400 });
    }

    // Validate enum values
    if (!['Completed', 'Current', 'Upcoming'].includes(body.status)) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'Status must be either Completed, Current, or Upcoming',
      }, { status: 400 });
    }

    const project = await Project.create({
      ...body,
      galleryMedia: Array.isArray(body.galleryMedia) ? body.galleryMedia : [],
      primaryLogo: body.primaryLogo || '',
      floatingLogos: Array.isArray(body.floatingLogos) ? body.floatingLogos : [],
      mainImage: body.mainImage || undefined,
      description: body.description || '',
    });

    return NextResponse.json({
      success: true,
      data: project,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'A project with this slug already exists',
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
      error: 'Failed to create project',
      message: error.message,
    }, { status: 500 });
  }
}
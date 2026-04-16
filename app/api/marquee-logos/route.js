import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MarqueeLogo from '@/models/MarqueeLogo';

export async function GET() {
  try {
    await connectDB();
    const logos = await MarqueeLogo.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: logos.length,
        data: logos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch marquee logos.',
      },
      { status: 500 }
    );
  }
}

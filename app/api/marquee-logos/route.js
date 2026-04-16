import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MarqueeLogo from '@/models/MarqueeLogo';
import { MARQUEE_DEFAULT_BRANDS } from '@/lib/marquee-defaults';

export async function GET() {
  try {
    await connectDB();
    const logos = await MarqueeLogo.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    const usingDefaults = logos.length === 0;
    const payload = usingDefaults
      ? MARQUEE_DEFAULT_BRANDS.map((item, index) => ({
          _id: `default-${index}`,
          name: item.name,
          detail: item.detail,
          logoUrl: item.logoUrl,
          sortOrder: index,
          isActive: true,
        }))
      : logos;

    return NextResponse.json(
      {
        success: true,
        count: payload.length,
        usingDefaults,
        data: payload,
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

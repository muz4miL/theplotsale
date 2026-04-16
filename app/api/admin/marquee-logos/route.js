import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MarqueeLogo from '@/models/MarqueeLogo';
import { ensureAdminRequest } from '@/lib/admin-auth';

export async function GET(request) {
  const unauthorizedResponse = ensureAdminRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await connectDB();
    const logos = await MarqueeLogo.find({})
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

export async function POST(request) {
  const unauthorizedResponse = ensureAdminRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.logoUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and logo URL are required.',
        },
        { status: 400 }
      );
    }

    const created = await MarqueeLogo.create({
      name: body.name.trim(),
      detail: body.detail?.trim() || '',
      logoUrl: body.logoUrl.trim(),
      sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
      isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to create marquee logo.',
      },
      { status: 500 }
    );
  }
}

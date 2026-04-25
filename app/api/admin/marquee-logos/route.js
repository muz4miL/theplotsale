import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MarqueeLogo from '@/models/MarqueeLogo';
import { ensureAdminRequest } from '@/lib/admin-auth';
import { MARQUEE_DEFAULT_BRANDS } from '@/lib/marquee-defaults';

export async function GET(request) {
  const unauthorizedResponse = ensureAdminRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await connectDB();
    const logos = await MarqueeLogo.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    const usingDefaults = logos.length === 0;
    const displayRows = usingDefaults
      ? MARQUEE_DEFAULT_BRANDS.map((item, index) => ({
          _id: `default-${index}`,
          name: item.name,
          detail: item.detail,
          logoUrl: item.logoUrl,
          sortOrder: index,
          isActive: true,
          isBuiltInDefault: true,
        }))
      : logos;

    return NextResponse.json(
      {
        success: true,
        count: logos.length,
        displayCount: displayRows.length,
        usingDefaults,
        data: displayRows,
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
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

    if (!body.name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Brand name is required.',
        },
        { status: 400 }
      );
    }

    const created = await MarqueeLogo.create({
      name: body.name.trim(),
      detail: body.detail?.trim() || '',
      logoUrl: typeof body.logoUrl === 'string' ? body.logoUrl.trim() : '',
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

/**
 * Seed marquee with built-in default brands (only inserts names that do not already exist).
 */
export async function PUT(request) {
  const unauthorizedResponse = ensureAdminRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await connectDB();
    const existing = await MarqueeLogo.find({}).select('name').lean();
    const existingNames = new Set(existing.map((doc) => doc.name.trim().toLowerCase()));

    const toInsert = MARQUEE_DEFAULT_BRANDS.filter(
      (item) => !existingNames.has(item.name.trim().toLowerCase())
    ).map((item, index) => ({
      name: item.name.trim(),
      detail: item.detail?.trim() || '',
      logoUrl: item.logoUrl || '',
      sortOrder: index,
      isActive: true,
    }));

    if (toInsert.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Default marquee brands already exist in the database.',
          inserted: 0,
        },
        { status: 200 }
      );
    }

    const created = await MarqueeLogo.insertMany(toInsert);

    return NextResponse.json(
      {
        success: true,
        message: `Seeded ${created.length} default marquee brand(s).`,
        inserted: created.length,
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to seed marquee defaults.',
      },
      { status: 500 }
    );
  }
}

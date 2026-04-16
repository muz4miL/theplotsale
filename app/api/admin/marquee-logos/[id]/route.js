import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MarqueeLogo from '@/models/MarqueeLogo';
import { ensureAdminRequest } from '@/lib/admin-auth';

export async function PATCH(request, { params }) {
  const unauthorizedResponse = ensureAdminRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await MarqueeLogo.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name?.trim(),
          detail: body.detail?.trim() || '',
          logoUrl: body.logoUrl?.trim(),
          sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
          isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: 'Marquee logo not found.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update marquee logo.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const unauthorizedResponse = ensureAdminRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await connectDB();
    const { id } = await params;
    const deleted = await MarqueeLogo.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: 'Marquee logo not found.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Marquee logo deleted.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to delete marquee logo.',
      },
      { status: 500 }
    );
  }
}

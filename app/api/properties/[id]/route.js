import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await Property.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title,
          slug: body.slug,
          region: body.region || 'UK',
          currency: body.currency || 'GBP',
          price: body.price ? Number(body.price) : undefined,
          location: body.location,
          beds: body.beds ? Number(body.beds) : undefined,
          baths: body.baths ? Number(body.baths) : undefined,
          areaSqFt: body.areaSqFt ? Number(body.areaSqFt) : undefined,
          description: body.description || '',
          mainImage: body.mainImage || undefined,
          primaryLogo: body.primaryLogo || '',
          floatingLogos: Array.isArray(body.floatingLogos) ? body.floatingLogos : [],
          galleryImages: Array.isArray(body.galleryImages) ? body.galleryImages : [],
          galleryMedia: Array.isArray(body.galleryMedia) ? body.galleryMedia : [],
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Property not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update property.' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Property not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Property deleted.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete property.' },
      { status: 500 }
    );
  }
}

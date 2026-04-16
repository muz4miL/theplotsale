import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title,
          slug: body.slug,
          status: body.status,
          location: body.location,
          description: body.description,
          mainImage: body.mainImage || undefined,
          primaryLogo: body.primaryLogo || '',
          floatingLogos: Array.isArray(body.floatingLogos) ? body.floatingLogos : [],
          totalArea: body.totalArea || '',
          paymentPlan: body.paymentPlan || '',
          galleryMedia: Array.isArray(body.galleryMedia) ? body.galleryMedia : [],
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Project not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update project.' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Project not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Project deleted.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete project.' },
      { status: 500 }
    );
  }
}

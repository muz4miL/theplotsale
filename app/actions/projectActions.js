'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function addProgressUpdate(projectId, updateData) {
  try {
    if (!projectId) {
      throw new Error('Project ID is required.');
    }

    if (!updateData?.date || !updateData?.title) {
      throw new Error('Date and title are required for progress updates.');
    }

    await connectDB();

    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found.');
    }

    project.progressUpdates.push({
      date: new Date(updateData.date),
      title: updateData.title.trim(),
      mediaUrls: Array.isArray(updateData.mediaUrls) ? updateData.mediaUrls : [],
    });

    await project.save();

    revalidatePath('/admin');
    revalidatePath('/admin/pk-projects');
    revalidatePath('/admin/weekly-updates');
    revalidatePath('/pakistan-projects');
    revalidatePath(`/pakistan-projects/${project.slug}`);

    return { success: true, message: 'Progress update saved successfully.' };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to save progress update.',
    };
  }
}

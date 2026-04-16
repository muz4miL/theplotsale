const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1';

export async function uploadToCloudinary(file, options = {}) {
  const cloudName = options.cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset =
    options.uploadPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const resourceType = options.resourceType || 'auto';

  if (!file) {
    throw new Error('No file provided for Cloudinary upload.');
  }

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Missing Cloudinary config. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const uploadResponse = await fetch(
    `${CLOUDINARY_UPLOAD_URL}/${cloudName}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    const errorPayload = await uploadResponse.json().catch(() => ({}));
    const message = errorPayload?.error?.message || 'Cloudinary upload failed.';
    throw new Error(message);
  }

  return uploadResponse.json();
}

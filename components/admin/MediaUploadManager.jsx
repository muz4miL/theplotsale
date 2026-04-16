'use client';

import { ArrowDown, ArrowUp, Trash2, UploadCloud } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';

function moveItem(items, fromIndex, toIndex) {
  if (toIndex < 0 || toIndex >= items.length) return items;
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function MediaUploadManager({
  media,
  setMedia,
  setError,
  setStatus,
  setProgressLabel,
  onSetMainImage,
}) {
  const uploadMedia = async (files, mode = 'gallery') => {
    if (!files?.length) return;
    setError('');
    setStatus('');
    setProgressLabel('Preparing uploads...');

    try {
      const acceptedFiles = Array.from(files).filter(
        (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
      );

      const uploadedUrls = [];
      for (let index = 0; index < acceptedFiles.length; index += 1) {
        const file = acceptedFiles[index];
        setProgressLabel(`Uploading ${index + 1}/${acceptedFiles.length}: ${file.name}`);
        const result = await uploadToCloudinary(file);
        if (result?.secure_url) uploadedUrls.push(result.secure_url);
      }

      if (!uploadedUrls.length) throw new Error('No media uploaded.');

      if (mode === 'main' && typeof onSetMainImage === 'function') {
        onSetMainImage(uploadedUrls[0]);
      } else {
        setMedia([...(media || []), ...uploadedUrls]);
      }

      setStatus(`Uploaded ${uploadedUrls.length} media file(s).`);
      setProgressLabel('');
    } catch (uploadError) {
      setProgressLabel('');
      setError(uploadError.message || 'Media upload failed.');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#C5A880]/50 bg-[#C5A880]/15 px-3 py-2 text-xs text-[#E4D3B4]">
          <UploadCloud className="h-3.5 w-3.5" />
          Upload Main Image
          <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadMedia(e.target.files, 'main')} />
        </label>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-neutral-300">
          <UploadCloud className="h-3.5 w-3.5" />
          Upload Gallery Media
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => uploadMedia(e.target.files, 'gallery')}
          />
        </label>
      </div>

      {!!media?.length && (
        <div className="grid gap-2 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-neutral-300">
          {media.map((url, index) => (
            <div key={url} className="flex items-center justify-between gap-2">
              <p className="truncate">{url}</p>
              <div className="flex items-center gap-1">
                <button type="button" className="rounded p-1 hover:bg-white/10" onClick={() => setMedia(moveItem(media, index, index - 1))}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" className="rounded p-1 hover:bg-white/10" onClick={() => setMedia(moveItem(media, index, index + 1))}>
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button type="button" className="rounded p-1 text-red-300 hover:bg-red-400/10" onClick={() => setMedia(media.filter((item) => item !== url))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

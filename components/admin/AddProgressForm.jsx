'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, ImagePlus, UploadCloud, Video } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import { addProgressUpdate } from '@/app/actions/projectActions';

const defaultDate = new Date().toISOString().slice(0, 10);

export default function AddProgressForm({ onSuccess }) {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectId, setProjectId] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fileCountLabel = useMemo(() => {
    if (!files.length) return 'No files selected yet';
    return `${files.length} media file${files.length > 1 ? 's' : ''} selected`;
  }, [files]);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        setProjectsLoading(true);
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const payload = await response.json();

        if (!response.ok || !payload?.success) {
          throw new Error(payload?.message || 'Unable to load projects.');
        }

        const fetchedProjects = Array.isArray(payload.data) ? payload.data : [];
        if (!isMounted) return;

        setProjects(fetchedProjects);
        if (fetchedProjects.length > 0) {
          setProjectId(fetchedProjects[0]._id);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'Failed to fetch projects.');
        }
      } finally {
        if (isMounted) {
          setProjectsLoading(false);
        }
      }
    }

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFiles = (incomingFiles) => {
    setErrorMessage('');
    setSuccessMessage('');
    const validFiles = Array.from(incomingFiles || []).filter((file) => {
      return file.type.startsWith('image/') || file.type.startsWith('video/');
    });
    setFiles(validFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const resetForm = () => {
    setDate(defaultDate);
    setTitle('');
    setFiles([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setStatusMessage('');

    if (!projectId) {
      setErrorMessage('Please select a project.');
      return;
    }

    if (!date) {
      setErrorMessage('Please select a valid date.');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('Please add a title for this progress update.');
      return;
    }

    setIsSubmitting(true);

    try {
      setStatusMessage('Uploading assets to Cloudinary...');
      const mediaUrls = [];

      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        setStatusMessage(`Uploading asset ${index + 1} of ${files.length}...`);
        const uploadResult = await uploadToCloudinary(file);
        if (!uploadResult?.secure_url) {
          throw new Error(`Cloudinary did not return a secure URL for ${file.name}.`);
        }
        mediaUrls.push(uploadResult.secure_url);
      }

      setStatusMessage('Saving update to database...');
      const actionResult = await addProgressUpdate(projectId, {
        date,
        title: title.trim(),
        mediaUrls,
      });

      if (!actionResult?.success) {
        throw new Error(actionResult?.message || 'Unable to save progress update.');
      }

      setStatusMessage('');
      setSuccessMessage('Progress update published successfully.');
      resetForm();
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      setStatusMessage('');
      setErrorMessage(error.message || 'Failed to submit progress update. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white">Add Progress Update</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Prepare bi-weekly construction highlights with premium media for project stakeholders.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#C5A880]">
              Date
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <CalendarDays className="h-4 w-4 text-neutral-400" />
              <input
                type="date"
                className="w-full bg-transparent text-sm text-white outline-none"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#C5A880]">
              Project
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <ChevronDown className="h-4 w-4 text-neutral-400" />
              <select
                className="w-full appearance-none bg-transparent text-sm text-white outline-none"
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                disabled={projectsLoading || isSubmitting || !projects.length}
              >
                {projectsLoading ? (
                  <option value="" className="bg-neutral-900 text-white">
                    Loading projects...
                  </option>
                ) : null}
                {!projectsLoading && !projects.length ? (
                  <option value="" className="bg-neutral-900 text-white">
                    No projects available
                  </option>
                ) : null}
                {projects.map((project) => (
                  <option key={project._id} value={project._id} className="bg-neutral-900 text-white">
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#C5A880]">Title</span>
          <input
            type="text"
            placeholder="e.g. Tower Structure - 18th Floor Completed"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-[#C5A880]/70"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={isSubmitting}
          />
        </label>

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-2xl border border-dashed p-6 text-center transition-all ${
            isDragging
              ? 'border-[#C5A880] bg-[#C5A880]/10'
              : 'border-white/20 bg-black/20 hover:border-[#C5A880]/50'
          }`}
        >
          <UploadCloud className="mx-auto h-7 w-7 text-[#C5A880]" />
          <p className="mt-3 text-sm font-medium text-white">Drag and drop photos/videos here</p>
          <p className="mt-1 text-xs text-neutral-400">
            PNG, JPG, WEBP, MP4, MOV supported for progress media uploads
          </p>

          <div className="mt-4">
            <input
              id="media-upload"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(event) => handleFiles(event.target.files)}
              disabled={isSubmitting}
            />
            <label
              htmlFor="media-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#C5A880]/60 bg-[#C5A880]/15 px-4 py-2 text-sm font-medium text-[#C5A880] transition-colors hover:bg-[#C5A880]/25"
            >
              <ImagePlus className="h-4 w-4" />
              Select Media Files
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-neutral-300">{fileCountLabel}</p>
            <span className="inline-flex items-center gap-2 text-xs text-neutral-400">
              <Video className="h-4 w-4" />
              Images + Video Ready
            </span>
          </div>
          {!!files.length && (
            <div className="mt-3 grid gap-2 text-xs text-neutral-400 md:grid-cols-2">
              {files.map((file) => (
                <p key={`${file.name}-${file.size}`} className="truncate">
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>

        {statusMessage ? (
          <p className="rounded-lg border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-2 text-sm text-[#E4D3B4]">
            {statusMessage}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
            {successMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || projectsLoading || !projects.length}
          className="rounded-xl border border-[#C5A880]/70 bg-[#C5A880]/15 px-5 py-3 text-sm font-semibold text-[#C5A880] transition-colors hover:bg-[#C5A880]/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Uploading Assets...' : 'Publish Progress Update'}
        </button>
      </form>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2, UploadCloud, X } from 'lucide-react';
import LuxuryModal from '@/components/admin/LuxuryModal';
import MediaUploadManager from '@/components/admin/MediaUploadManager';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';

const statusClassMap = {
  Current: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200',
  Upcoming: 'border-amber-300/40 bg-amber-300/10 text-amber-100',
  Completed: 'border-sky-300/40 bg-sky-300/10 text-sky-100',
};

const initialForm = {
  title: '',
  status: 'Current',
  location: '',
  description: '',
  mainImage: '',
  totalArea: '',
  paymentPlan: '',
  galleryMedia: [],
  primaryLogo: '',
  floatingLogos: [],
};

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function PkProjectsPage() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('create');
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [progressLabel, setProgressLabel] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const rowCountLabel = useMemo(() => `${rows.length} managed PK projects`, [rows.length]);

  async function fetchRows() {
    try {
      setIsLoading(true);
      const res = await fetch('/api/projects', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch projects.');
      setRows(data.data || []);
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to fetch projects.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRows();
  }, []);

  const openCreateModal = () => {
    setMode('create');
    setEditingId('');
    setForm(initialForm);
    setError('');
    setStatus('');
    setProgressLabel('');
    setIsModalOpen(true);
  };

  const openEditModal = (row) => {
    setMode('edit');
    setEditingId(row._id);
    setForm({
      title: row.title || '',
      status: row.status || 'Current',
      location: row.location || '',
      description: row.description || '',
      mainImage: row.mainImage || '',
      totalArea: row.totalArea || '',
      paymentPlan: row.paymentPlan || '',
      galleryMedia: row.galleryMedia || [],
      primaryLogo: row.primaryLogo || '',
      floatingLogos: row.floatingLogos || [],
    });
    setError('');
    setStatus('');
    setProgressLabel('');
    setIsModalOpen(true);
  };

  async function handleDelete(id) {
    setError('');
    setStatus('');
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Delete failed.');
      setStatus('Project deleted successfully.');
      await fetchRows();
    } catch (deleteError) {
      setError(deleteError.message || 'Delete failed.');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setStatus('');
    setIsSaving(true);
    try {
      const payload = {
        ...form,
        slug: slugify(form.title),
        galleryMedia: form.galleryMedia || [],
        primaryLogo: form.primaryLogo || '',
        floatingLogos: form.floatingLogos || [],
      };
      const url = mode === 'create' ? '/api/projects' : `/api/projects/${editingId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Save failed.');
      setStatus(mode === 'create' ? 'Project added.' : 'Project updated.');
      setIsModalOpen(false);
      await fetchRows();
    } catch (saveError) {
      setError(saveError.message || 'Save failed.');
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadLogoFiles(files, target = 'floating') {
    if (!files?.length) return;
    setError('');
    setStatus('');
    setProgressLabel('Preparing logo uploads...');
    try {
      const acceptedFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
      const uploadedUrls = [];
      for (let index = 0; index < acceptedFiles.length; index += 1) {
        const file = acceptedFiles[index];
        setProgressLabel(`Uploading logo ${index + 1}/${acceptedFiles.length}: ${file.name}`);
        const result = await uploadToCloudinary(file);
        if (result?.secure_url) uploadedUrls.push(result.secure_url);
      }
      if (!uploadedUrls.length) throw new Error('No logos uploaded.');
      if (target === 'primary') {
        setForm((prev) => ({ ...prev, primaryLogo: uploadedUrls[0] }));
      } else {
        setForm((prev) => ({ ...prev, floatingLogos: [...(prev.floatingLogos || []), ...uploadedUrls] }));
      }
      setStatus(`Uploaded ${uploadedUrls.length} logo file(s).`);
      setProgressLabel('');
    } catch (uploadError) {
      setProgressLabel('');
      setError(uploadError.message || 'Logo upload failed.');
    }
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">Portfolio</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">PK Projects</h1>
            <p className="mt-2 text-sm text-neutral-400">Oversee Pakistan project lifecycle and tab visibility.</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#C5A880]">{rowCountLabel}</p>
          </div>
          <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-xl border border-[#C5A880]/70 bg-[#C5A880]/15 px-4 py-2 text-sm font-semibold text-[#C5A880] transition-colors hover:bg-[#C5A880]/25">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/20 backdrop-blur-md shadow-[0_22px_46px_rgba(0,0,0,0.35)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="sticky top-0 z-10 bg-black/50 backdrop-blur-md">
              <tr className="text-left text-xs uppercase tracking-[0.2em] text-neutral-400">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-neutral-400">Loading PK projects...</td></tr> : null}
              {!isLoading && rows.length === 0 ? <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-neutral-400">No PK projects found.</td></tr> : null}
              {rows.map((row) => (
                <tr key={row._id} className="text-sm text-neutral-200 transition-all hover:bg-white/[0.04]">
                  <td className="px-6 py-4"><img src={row.mainImage} alt={row.title} className="h-14 w-20 rounded-lg border border-white/10 object-cover" /></td>
                  <td className="px-6 py-4 font-medium text-white">{row.title}</td>
                  <td className="px-6 py-4 text-neutral-300">{row.location}</td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusClassMap[row.status]}`}>{row.status}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => openEditModal(row)} className="rounded-lg border border-white/15 bg-black/30 p-2 text-neutral-300 transition-colors hover:border-[#C5A880]/70 hover:text-[#C5A880]"><Pencil className="h-4 w-4" /></button>
                      <button type="button" onClick={() => setDeleteTarget(row)} className="rounded-lg border border-white/15 bg-black/30 p-2 text-neutral-300 transition-colors hover:border-red-400/70 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {error ? <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
      {status ? <p className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{status}</p> : null}

      <LuxuryModal
        isOpen={isModalOpen}
        title={mode === 'create' ? 'Add Pakistan Project' : 'Edit Pakistan Project'}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Title" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <div className="rounded-xl border border-white/10 bg-black/30 p-1">
              <div className="grid grid-cols-3 gap-1">
                {['Current', 'Upcoming', 'Completed'].map((tabStatus) => (
                  <button
                    key={tabStatus}
                    type="button"
                    onClick={() => setForm({ ...form, status: tabStatus })}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      form.status === tabStatus
                        ? 'border border-[#C5A880]/50 bg-[#C5A880]/25 text-[#E4D3B4]'
                        : 'text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {tabStatus}
                  </button>
                ))}
              </div>
            </div>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required placeholder="Location" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <input value={form.totalArea} onChange={(e) => setForm({ ...form, totalArea: e.target.value })} placeholder="Total area (optional)" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
          </div>

          <input value={form.mainImage} onChange={(e) => setForm({ ...form, mainImage: e.target.value })} placeholder="Main image URL (optional if uploaded)" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />

          <div className="grid gap-3 md:grid-cols-2">
            <input value={form.primaryLogo} onChange={(e) => setForm({ ...form, primaryLogo: e.target.value })} placeholder="Primary logo URL (transparent PNG/WebP recommended)" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C5A880]/50 bg-[#C5A880]/10 px-4 py-3 text-xs text-[#E4D3B4]">
              <UploadCloud className="h-4 w-4" />
              Upload Primary Logo
              <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadLogoFiles(e.target.files, 'primary')} />
            </label>
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-300">Floating Logos</p>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs text-neutral-300">
                <UploadCloud className="h-3.5 w-3.5" />
                Upload Floating Logos
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => uploadLogoFiles(e.target.files, 'floating')} />
              </label>
            </div>
            <input
              placeholder="Paste floating logo URL and press Enter"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  const value = event.currentTarget.value.trim();
                  if (!value) return;
                  setForm((prev) => ({ ...prev, floatingLogos: [...(prev.floatingLogos || []), value] }));
                  event.currentTarget.value = '';
                }
              }}
            />
            {!!form.floatingLogos?.length && (
              <div className="grid gap-2 text-xs text-neutral-300">
                {form.floatingLogos.map((url) => (
                  <div key={url} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <p className="truncate">{url}</p>
                    <button type="button" onClick={() => setForm((prev) => ({ ...prev, floatingLogos: prev.floatingLogos.filter((item) => item !== url) }))} className="rounded p-1 text-red-300 hover:bg-red-500/10">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <MediaUploadManager
            media={form.galleryMedia}
            setMedia={(media) => setForm((prev) => ({ ...prev, galleryMedia: media }))}
            setError={setError}
            setStatus={setStatus}
            setProgressLabel={setProgressLabel}
            onSetMainImage={(url) => setForm((prev) => ({ ...prev, mainImage: url }))}
            currentMainImage={form.mainImage}
          />

          {progressLabel ? (
            <p className="rounded-lg border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-2 text-xs text-[#E4D3B4]">
              {progressLabel}
            </p>
          ) : null}

          <input value={form.paymentPlan} onChange={(e) => setForm({ ...form, paymentPlan: e.target.value })} placeholder="Payment plan (optional)" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Description (optional)" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
          <button disabled={isSaving || !!progressLabel} className="rounded-xl border border-[#C5A880]/70 bg-[#C5A880]/15 px-5 py-3 text-sm font-semibold text-[#C5A880] disabled:opacity-60">
            {isSaving ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
          </button>
        </form>
      </LuxuryModal>

      <LuxuryModal isOpen={!!deleteTarget} title="Delete Project" onClose={() => setDeleteTarget(null)} maxWidth="max-w-md">
        {deleteTarget ? (
          <>
            <p className="mt-2 text-sm text-neutral-400">
              Remove <span className="text-white">{deleteTarget.title}</span>? This will also remove it from public tabs.
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setDeleteTarget(null)} className="rounded-lg border border-white/20 px-4 py-2 text-sm text-neutral-300">Cancel</button>
              <button
                type="button"
                onClick={async () => {
                  const id = deleteTarget._id;
                  setDeleteTarget(null);
                  await handleDelete(id);
                }}
                className="rounded-lg border border-red-400/50 bg-red-500/15 px-4 py-2 text-sm text-red-200"
              >
                Yes, Delete
              </button>
            </div>
          </>
        ) : null}
      </LuxuryModal>
    </div>
  );
}

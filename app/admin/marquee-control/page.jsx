/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2, UploadCloud } from 'lucide-react';
import LuxuryModal from '@/components/admin/LuxuryModal';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';

const LOGO_RULES = {
  maxBytes: 4 * 1024 * 1024,
  minWidth: 400,
  minHeight: 400,
};

const initialForm = {
  name: '',
  detail: '',
  logoUrl: '',
  sortOrder: 0,
  isActive: true,
};

export default function MarqueeControlPage() {
  const [rows, setRows] = useState([]);
  const [usingDefaults, setUsingDefaults] = useState(false);
  const [dbCount, setDbCount] = useState(0);
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
  const [isSeeding, setIsSeeding] = useState(false);

  const rowCountLabel = useMemo(() => {
    if (usingDefaults) {
      return `${dbCount} in database · ${rows.length} shown on homepage (built-in placeholders until you add or seed)`;
    }
    return `${dbCount} marquee logo${dbCount === 1 ? '' : 's'} in database`;
  }, [dbCount, rows.length, usingDefaults]);

  function formatFileSize(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      const objectUrl = URL.createObjectURL(file);
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
        URL.revokeObjectURL(objectUrl);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Unable to read logo dimensions.'));
      };
      image.src = objectUrl;
    });
  }

  async function fetchRows() {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/marquee-logos', { credentials: 'include', cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed to fetch marquee logos.');
      setUsingDefaults(!!data.usingDefaults);
      setDbCount(typeof data.count === 'number' ? data.count : (data.data || []).filter((r) => !r.isBuiltInDefault).length);
      setRows(data.data || []);
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to fetch marquee logos.');
    } finally {
      setIsLoading(false);
    }
  }

  async function seedDefaults() {
    setError('');
    setStatus('');
    setIsSeeding(true);
    try {
      const res = await fetch('/api/admin/marquee-logos', {
        method: 'PUT',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Seed failed.');
      setStatus(data.message || 'Defaults seeded.');
      await fetchRows();
    } catch (seedError) {
      setError(seedError.message || 'Seed failed.');
    } finally {
      setIsSeeding(false);
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
      name: row.name || '',
      detail: row.detail || '',
      logoUrl: row.logoUrl || '',
      sortOrder: Number.isFinite(Number(row.sortOrder)) ? Number(row.sortOrder) : 0,
      isActive: row.isActive !== false,
    });
    setError('');
    setStatus('');
    setProgressLabel('');
    setIsModalOpen(true);
  };

  async function uploadLogo(file) {
    if (!file) return;
    setError('');
    setStatus('');
    setProgressLabel(`Uploading logo: ${file.name}`);
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed for marquee logos.');
      }
      if (file.size > LOGO_RULES.maxBytes) {
        throw new Error(`Logo exceeds ${formatFileSize(LOGO_RULES.maxBytes)} limit.`);
      }
      const { width, height } = await getImageDimensions(file);
      if (width < LOGO_RULES.minWidth || height < LOGO_RULES.minHeight) {
        throw new Error(`Logo must be at least ${LOGO_RULES.minWidth}x${LOGO_RULES.minHeight}px.`);
      }
      const result = await uploadToCloudinary(file);
      if (!result?.secure_url) throw new Error('Logo upload failed.');
      setForm((prev) => ({ ...prev, logoUrl: result.secure_url }));
      setProgressLabel('');
      setStatus('Logo uploaded successfully.');
    } catch (uploadError) {
      setProgressLabel('');
      setError(uploadError.message || 'Logo upload failed.');
    }
  }

  async function handleDelete(id) {
    setError('');
    setStatus('');
    try {
      const res = await fetch(`/api/admin/marquee-logos/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Delete failed.');
      setStatus('Marquee logo deleted successfully.');
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
        name: form.name.trim(),
        detail: form.detail.trim(),
        logoUrl: form.logoUrl.trim(),
        sortOrder: Number.isFinite(Number(form.sortOrder)) ? Number(form.sortOrder) : 0,
        isActive: !!form.isActive,
      };
      const url = mode === 'create' ? '/api/admin/marquee-logos' : `/api/admin/marquee-logos/${editingId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Save failed.');
      setStatus(mode === 'create' ? 'Marquee logo added.' : 'Marquee logo updated.');
      setIsModalOpen(false);
      await fetchRows();
    } catch (saveError) {
      setError(saveError.message || 'Save failed.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">Homepage Experience</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Marquee Control</h1>
            <p className="mt-2 text-sm text-neutral-400">Manage floating premium logos shown on the home marquee.</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#C5A880]">{rowCountLabel}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {usingDefaults ? (
              <button
                type="button"
                onClick={seedDefaults}
                disabled={isSeeding}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-400/20 disabled:opacity-60"
              >
                {isSeeding ? 'Seeding…' : 'Copy defaults to database'}
              </button>
            ) : null}
            <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-xl border border-[#C5A880]/70 bg-[#C5A880]/15 px-4 py-2 text-sm font-semibold text-[#C5A880] transition-colors hover:bg-[#C5A880]/25">
              <Plus className="h-4 w-4" />
              Add Logo
            </button>
          </div>
        </div>
      </header>

      {usingDefaults ? (
        <div className="rounded-2xl border border-amber-400/35 bg-amber-400/10 px-4 py-3 text-sm text-amber-100/95">
          <p className="font-medium text-amber-50">Homepage is using built-in placeholder brands</p>
          <p className="mt-1 text-amber-100/80">
            The moving marquee you see on the live site matches the rows below, but they are not stored in MongoDB yet. Use &quot;Copy defaults to database&quot; to turn them into real records you can edit and delete, or add your own logos with &quot;Add Logo&quot;.
          </p>
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/20 backdrop-blur-md shadow-[0_22px_46px_rgba(0,0,0,0.35)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="sticky top-0 z-10 bg-black/50 backdrop-blur-md">
              <tr className="text-left text-xs uppercase tracking-[0.2em] text-neutral-400">
                <th className="px-6 py-4">Logo</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Detail</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-neutral-400">Loading marquee logos...</td></tr> : null}
              {!isLoading && rows.length === 0 ? <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-neutral-400">No marquee logos in the database.</td></tr> : null}
              {rows.map((row) => (
                <tr key={row._id} className="text-sm text-neutral-200 transition-all hover:bg-white/[0.04]">
                  <td className="px-6 py-4"><img src={row.logoUrl || '/newLogo2.png'} alt={row.name} className="h-14 w-14 rounded-lg border border-white/10 bg-black/30 object-contain p-1" /></td>
                  <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                  <td className="px-6 py-4 text-neutral-300">{row.detail || '-'}</td>
                  <td className="px-6 py-4 text-neutral-300">{row.sortOrder ?? 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs ${row.isActive ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200' : 'border-neutral-500/40 bg-neutral-500/10 text-neutral-300'}`}>
                        {row.isActive ? 'Active' : 'Hidden'}
                      </span>
                      {row.isBuiltInDefault ? (
                        <span className="inline-flex w-fit rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-amber-100">
                          Built-in · not in DB
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={row.isBuiltInDefault}
                        title={row.isBuiltInDefault ? 'Seed defaults to database first to edit this row' : 'Edit'}
                        onClick={() => openEditModal(row)}
                        className="rounded-lg border border-white/15 bg-black/30 p-2 text-neutral-300 transition-colors hover:border-[#C5A880]/70 hover:text-[#C5A880] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={row.isBuiltInDefault}
                        title={row.isBuiltInDefault ? 'Not stored in database' : 'Delete'}
                        onClick={() => setDeleteTarget(row)}
                        className="rounded-lg border border-white/15 bg-black/30 p-2 text-neutral-300 transition-colors hover:border-red-400/70 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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

      <LuxuryModal isOpen={isModalOpen} title={mode === 'create' ? 'Add Marquee Logo' : 'Edit Marquee Logo'} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Brand name" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <input value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="Detail/subtitle" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} placeholder="Sort order (0,1,2...)" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-neutral-300">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Show on home marquee
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="Transparent logo URL (optional — initials used if empty)" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none" />
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C5A880]/50 bg-[#C5A880]/10 px-4 py-3 text-xs text-[#E4D3B4]">
              <UploadCloud className="h-4 w-4" />
              Upload High-Quality Logo
              <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadLogo(e.target.files?.[0])} />
            </label>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs text-neutral-300">
            <p className="font-semibold text-[#DCC39E]">Quality Guard</p>
            <p className="mt-1">Use transparent background logos (PNG/WebP/SVG), minimum {LOGO_RULES.minWidth}x{LOGO_RULES.minHeight}px, max {formatFileSize(LOGO_RULES.maxBytes)}.</p>
          </div>

          {form.logoUrl ? (
            <div className="rounded-xl border border-white/10 bg-black/25 p-3">
              <p className="mb-2 text-xs text-neutral-400">Preview</p>
              <img src={form.logoUrl} alt={form.name || 'Logo preview'} className="h-14 w-14 rounded-lg border border-white/10 bg-black/40 object-contain p-1" />
            </div>
          ) : null}

          {progressLabel ? <p className="rounded-lg border border-[#C5A880]/30 bg-[#C5A880]/10 px-3 py-2 text-xs text-[#E4D3B4]">{progressLabel}</p> : null}

          <button disabled={isSaving || !!progressLabel} className="rounded-xl border border-[#C5A880]/70 bg-[#C5A880]/15 px-5 py-3 text-sm font-semibold text-[#C5A880] disabled:opacity-60">
            {isSaving ? 'Saving...' : mode === 'create' ? 'Create Logo Item' : 'Update Logo Item'}
          </button>
        </form>
      </LuxuryModal>

      <LuxuryModal isOpen={!!deleteTarget} title="Delete Marquee Logo" onClose={() => setDeleteTarget(null)} maxWidth="max-w-md">
        {deleteTarget ? (
          <>
            <p className="mt-2 text-sm text-neutral-400">
              Remove <span className="text-white">{deleteTarget.name}</span> from home marquee?
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

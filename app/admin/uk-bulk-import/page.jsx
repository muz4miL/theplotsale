/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function UkBulkImportPage() {
  const [bulkData, setBulkData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleBulkImport = async () => {
    setError('');
    setResults([]);
    setIsProcessing(true);

    try {
      // Parse the bulk data (expecting JSON array or CSV-like format)
      const lines = bulkData.trim().split('\n').filter(line => line.trim());
      const properties = [];

      for (const line of lines) {
        try {
          // Try parsing as JSON first
          const parsed = JSON.parse(line);
          properties.push(parsed);
        } catch {
          // If not JSON, try CSV format: title|location|price|beds|baths|sqft|mainImage|description
          const parts = line.split('|').map(p => p.trim());
          if (parts.length >= 4) {
            properties.push({
              title: parts[0],
              location: parts[1],
              price: parts[2],
              beds: parts[3] || '',
              baths: parts[4] || '',
              receptions: parts[5] || '',
              areaSqFt: parts[6] || '',
              mainImage: parts[7] || '',
              description: parts[8] || '',
              galleryMedia: parts[9] ? parts[9].split(',').map(url => url.trim()) : [],
            });
          }
        }
      }

      if (properties.length === 0) {
        throw new Error('No valid properties found. Check your format.');
      }

      // Import each property
      const importResults = [];
      for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];
        try {
          const payload = {
            title: prop.title,
            location: prop.location,
            price: prop.price ? Number(prop.price) : undefined,
            beds: prop.beds ? Number(prop.beds) : undefined,
            baths: prop.baths ? Number(prop.baths) : undefined,
            receptions: prop.receptions ? Number(prop.receptions) : undefined,
            areaSqFt: prop.areaSqFt ? Number(prop.areaSqFt) : undefined,
            description: prop.description || '',
            mainImage: prop.mainImage || '',
            galleryMedia: prop.galleryMedia || [],
            galleryImages: (prop.galleryMedia || []).filter(url => !url.includes('/video/upload/')),
            primaryLogo: prop.primaryLogo || '',
            floatingLogos: prop.floatingLogos || [],
            slug: `${prop.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`,
            region: 'UK',
            currency: 'GBP',
          };

          const res = await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const data = await res.json();
          
          if (res.ok && data.success) {
            importResults.push({ success: true, title: prop.title, message: 'Imported successfully' });
          } else {
            importResults.push({ success: false, title: prop.title, message: data.message || 'Failed to import' });
          }
        } catch (propError) {
          importResults.push({ success: false, title: prop.title, message: propError.message });
        }
      }

      setResults(importResults);
    } catch (bulkError) {
      setError(bulkError.message || 'Bulk import failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-md">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">Quick Import</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">UK Bulk Import</h1>
          <p className="mt-2 text-sm text-neutral-400">Import multiple UK properties at once using pipe-separated format</p>
        </div>
      </header>

      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/20 p-6 backdrop-blur-md">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Bulk Property Data
            </label>
            <p className="mb-3 text-xs text-neutral-400">
              Format: <code className="rounded bg-black/40 px-2 py-1 text-[#C5A880]">Title | Location | Price | Beds | Baths | Receptions | SqFt | MainImageURL | Description | GalleryURLs</code>
            </p>
            <p className="mb-3 text-xs text-neutral-500">
              Example:<br />
              <code className="block rounded bg-black/40 p-2 text-[10px] text-neutral-300">
                2 Bed Flat for sale | Selbourne Avenue, Hounslow TW3 | 198250 | 2 | 1 | 1 | 556 | https://example.com/image.jpg | Beautiful flat in prime location | https://example.com/img1.jpg,https://example.com/img2.jpg
              </code>
            </p>
            <textarea
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              rows={12}
              placeholder="Paste your property data here (one property per line)..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs text-white outline-none"
            />
          </div>

          <button
            onClick={handleBulkImport}
            disabled={isProcessing || !bulkData.trim()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#C5A880]/70 bg-[#C5A880]/15 px-6 py-3 text-sm font-semibold text-[#C5A880] transition-colors hover:bg-[#C5A880]/25 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Import Properties
              </>
            )}
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/20 p-6 backdrop-blur-md">
          <h2 className="mb-4 text-lg font-semibold text-white">Import Results</h2>
          <div className="space-y-2">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
                  result.success
                    ? 'border-emerald-400/40 bg-emerald-400/10'
                    : 'border-red-400/40 bg-red-400/10'
                }`}
              >
                {result.success ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${result.success ? 'text-emerald-200' : 'text-red-200'}`}>
                    {result.title}
                  </p>
                  <p className={`text-xs ${result.success ? 'text-emerald-300/70' : 'text-red-300/70'}`}>
                    {result.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

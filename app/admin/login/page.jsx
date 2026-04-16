'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message || 'Access denied.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || 'Login request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[520px] w-[980px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/35 via-amber-900/15 to-black blur-2xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.08]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/10" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent" />

      <div className="relative w-full max-w-[380px] rounded-2xl border border-amber-500/25 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
        <div className="mb-8 text-center">
          <img
            src="/newLogo.png"
            alt="The Plot Sale logo"
            className="mx-auto mb-4 h-16 w-16 object-contain drop-shadow-[0_8px_20px_rgba(245,158,11,0.25)]"
          />
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300/95">The Plot Sale</p>
          <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-[1.05] text-amber-200">
            Admin Console
          </h1>
          <p className="mt-3 font-[family-name:var(--font-playfair)] text-lg italic text-amber-100/70">
            Authorized Personnel Only
          </p>
          <p className="mt-2 text-xs text-neutral-400">Protected by enterprise-grade access controls</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-amber-300/90">
              Master Password
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-[#171717]/85 px-4 py-3 transition-colors focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/20">
              <LockKeyhole className="h-4 w-4 text-amber-300/70" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                required
              />
            </div>
          </label>

          {error ? (
            <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 py-3 text-sm font-bold text-black shadow-[0_10px_35px_rgba(217,119,6,0.45)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShieldCheck className="h-4 w-4" />
            {isSubmitting ? 'Authenticating...' : 'Enter Console'}
          </button>

          <p className="pt-1 text-center font-[family-name:var(--font-playfair)] text-xs italic text-amber-100/55">
            Restricted access for internal administration only
          </p>
        </form>
      </div>
    </div>
  );
}

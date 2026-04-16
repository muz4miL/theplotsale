'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BarChart3, Building2, Home, LogOut, Newspaper, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/uk-inventory', label: 'UK Inventory', icon: Home },
  { href: '/admin/pk-projects', label: 'PK Projects', icon: Building2 },
  { href: '/admin/marquee-control', label: 'Marquee Control', icon: Sparkles },
  { href: '/admin/weekly-updates', label: 'Weekly Updates', icon: Newspaper },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const isLoginPage = pathname === '/admin/login';

  async function handleSignOut() {
    if (isSigningOut) return;
    setIsSigningOut(true);
    setSignOutError('');
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setSignOutError(data.message || 'Could not sign out. Try again.');
        return;
      }
      router.push('/admin/login');
      router.refresh();
    } catch {
      setSignOutError('Network error. Check your connection and try again.');
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(197,168,128,0.12),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(197,168,128,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.08]" />

      <aside className="fixed left-0 top-0 z-30 h-screen w-72 border-r border-white/10 bg-black/40 p-6 backdrop-blur-xl">
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <Image
              src="/newLogo.png"
              alt="The Plot Sale"
              width={44}
              height={44}
              className="rounded-full border border-[#C5A880]/30 bg-black/35 p-1 object-contain"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#C5A880]">The Plot Sale</p>
              <h1 className="mt-1 text-xl font-semibold text-white">Admin Console</h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-neutral-400">Luxury Portfolio Control</p>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-[#C5A880]/60 bg-[#C5A880]/15 text-[#E4D3B4] shadow-[0_8px_30px_rgba(197,168,128,0.16)]'
                    : 'border-white/10 bg-black/30 text-neutral-300 hover:border-[#C5A880]/60 hover:text-[#C5A880]'
                }`}
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-white/10 pt-6 space-y-2">
          {signOutError ? (
            <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-200">{signOutError}</p>
          ) : null}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-[#C5A880]/60 hover:text-[#C5A880] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            {isSigningOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </aside>

      <main className="relative z-10 ml-72 min-h-screen p-8 md:p-10">{children}</main>
    </div>
  );
}

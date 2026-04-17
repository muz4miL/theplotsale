'use client';

/**
 * Admin Console layout.
 *
 * Responsive strategy (mobile is a first-class citizen):
 *  - On ≥ lg (1024px) the sidebar is a persistent 288px rail, content has ml-72.
 *  - On < lg the sidebar becomes a slide-in drawer controlled by a top hamburger
 *    bar. Content has no margin, reduced padding, and the top bar is sticky so
 *    the drawer is always one tap away while scrolling long inventory tables.
 *  - Body scroll lock while drawer is open, Esc to close, click-outside to close.
 *  - All CMS pages inside `<main>` now receive sensible default padding that
 *    scales from 16px on phone → 24px on tablet → 40px on desktop.
 */

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart3, Building2, Home, LogOut, Menu, Newspaper, Sparkles, X } from 'lucide-react';
import CurrencyToggle from '@/components/layout/CurrencyToggle';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/uk-inventory', label: 'UK Inventory', icon: Home },
  { href: '/admin/pk-projects', label: 'PK Projects', icon: Building2 },
  { href: '/admin/marquee-control', label: 'Marquee Control', icon: Sparkles },
  { href: '/admin/weekly-updates', label: 'Weekly Updates', icon: Newspaper },
];

function NavList({ pathname, onNavigate }) {
  return (
    <nav className="space-y-2.5">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
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
  );
}

function SidebarContent({ pathname, onSignOut, isSigningOut, signOutError, onNavigate }) {
  return (
    <>
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4 lg:mb-12">
        <div className="flex items-center gap-3">
          <Image
            src="/newLogo.png"
            alt="The Plot Sale"
            width={44}
            height={44}
            className="rounded-full border border-[#C5A880]/30 bg-black/35 object-contain p-1"
          />
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#C5A880]">The Plot Sale</p>
            <h1 className="mt-1 text-xl font-semibold text-white">Admin Console</h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-neutral-400">Luxury Portfolio Control</p>
      </div>

      <NavList pathname={pathname} onNavigate={onNavigate} />

      <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-4">
        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Display prices</p>
        <p className="mt-1 text-xs text-neutral-400">Same toggle as the public site (saved in this browser).</p>
        <div className="mt-3 flex justify-center">
          <CurrencyToggle />
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-neutral-500">
          Indicative GBP ↔ PKR. UK inventory is still stored in GBP.
        </p>
      </div>

      <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
        {signOutError ? (
          <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-200">
            {signOutError}
          </p>
        ) : null}
        <button
          type="button"
          onClick={onSignOut}
          disabled={isSigningOut}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-[#C5A880]/60 hover:text-[#C5A880] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          {isSigningOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  // Close the drawer on route change so nav feels instant.
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll + Esc to close while drawer is open.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isDrawerOpen]);

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
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(197,168,128,0.12),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(197,168,128,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.08]" />

      {/* Mobile top bar — sticky so the drawer is always reachable while scrolling */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl lg:hidden"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open admin menu"
          aria-expanded={isDrawerOpen}
          aria-controls="admin-drawer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-neutral-300 transition-colors hover:border-[#C5A880]/60 hover:text-[#C5A880]"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-2.5">
          <Image
            src="/newLogo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-full border border-[#C5A880]/30 bg-black/35 object-contain p-0.5"
          />
          <div className="leading-none">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#C5A880]">The Plot Sale</p>
            <p className="mt-0.5 text-[12px] font-semibold text-white">Admin Console</p>
          </div>
        </div>
        <div className="h-10 w-10" aria-hidden />
      </div>

      {/* Desktop persistent sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 overflow-y-auto border-r border-white/10 bg-black/40 p-6 backdrop-blur-xl lg:block">
        <SidebarContent
          pathname={pathname}
          onSignOut={handleSignOut}
          isSigningOut={isSigningOut}
          signOutError={signOutError}
        />
      </aside>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? 'pointer-events-auto opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden={!isDrawerOpen}
      />

      {/* Mobile drawer sidebar */}
      <aside
        id="admin-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        aria-hidden={!isDrawerOpen}
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[min(320px,88vw)] flex-col overflow-y-auto border-r border-white/10 bg-[#050807]/95 p-5 backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))',
        }}
      >
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Close admin menu"
          className="mb-2 ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-[#C5A880]/60 hover:text-[#C5A880]"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <SidebarContent
          pathname={pathname}
          onSignOut={handleSignOut}
          isSigningOut={isSigningOut}
          signOutError={signOutError}
          onNavigate={() => setIsDrawerOpen(false)}
        />
      </aside>

      <main className="relative z-10 min-h-screen px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:ml-72 lg:p-10">
        {children}
      </main>
    </div>
  );
}

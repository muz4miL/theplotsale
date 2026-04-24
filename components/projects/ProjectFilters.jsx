'use client';

/**
 * ProjectFilters — Awwwards-grade instant filtering system for Pakistan Projects
 *
 * Adapted from PropertyFilters with project-specific fields:
 *   • Status tabs (All, Current, Upcoming, Completed) — always visible
 *   • Location dropdown
 *   • Area range (Min/Max with smart unit parsing)
 *   • Sort (Newest, Alphabetical, Largest Area)
 *
 * All luxury effects preserved: aurora borders, cursor glow, stagger, animated counter
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';

/**
 * Parses area strings like "500 kanals", "2.5M sq. ft.", "1000 sq. ft."
 * into comparable numeric values.
 */
function parseAreaToNumber(areaStr) {
  if (!areaStr || typeof areaStr !== 'string') return 0;
  const lower = areaStr.toLowerCase().replace(/,/g, '');
  let multiplier = 1;

  // Detect million suffix (2.5M, 2.5 Million)
  if (/\d[\s.]*(?:m|million)\b/i.test(lower) && !/marla/i.test(lower)) {
    multiplier = 1000000;
  }
  // Detect thousand suffix (1.5K) — but not "Kanal"
  else if (/\d[\s.]*k\b/i.test(lower) && !/kanal/i.test(lower)) {
    multiplier = 1000;
  }

  const match = lower.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) * multiplier : 0;
}

export default function ProjectFilters({ projects, onFilteredChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [staggerReady, setStaggerReady] = useState(false);
  const [displayCount, setDisplayCount] = useState(projects.length);
  const [showGlow, setShowGlow] = useState(false);

  const prevCountRef = useRef(projects.length);
  const animFrameRef = useRef(null);
  const staggerTimerRef = useRef(null);
  const glowRef = useRef(null);

  const [filters, setFilters] = useState({
    status: '',
    location: '',
    areaMin: '',
    areaMax: '',
    sortBy: 'newest',
  });

  /* ─── Derived data ─── */

  const locations = useMemo(() => {
    const locs = projects.map((p) => p.location).filter(Boolean);
    return [...new Set(locs)].sort();
  }, [projects]);

  const statusCounts = useMemo(() => {
    const counts = { '': projects.length };
    projects.forEach((p) => {
      if (p.status) counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, [projects]);

  /* ─── Filter + sort logic ─── */

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Status filter
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    // Location filter
    if (filters.location) {
      result = result.filter((p) => p.location === filters.location);
    }

    // Area filter (numeric comparison against parsed totalArea)
    if (filters.areaMin) {
      const min = parseFloat(filters.areaMin);
      if (!isNaN(min)) {
        result = result.filter((p) => parseAreaToNumber(p.totalArea) >= min);
      }
    }
    if (filters.areaMax) {
      const max = parseFloat(filters.areaMax);
      if (!isNaN(max)) {
        result = result.filter((p) => {
          const area = parseAreaToNumber(p.totalArea);
          return area > 0 && area <= max;
        });
      }
    }

    // Sorting
    switch (filters.sortBy) {
      case 'alpha':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'area-largest':
        result.sort((a, b) =>
          parseAreaToNumber(b.totalArea) - parseAreaToNumber(a.totalArea)
        );
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [projects, filters]);

  /* ─── Side-effects ─── */

  useEffect(() => {
    onFilteredChange(filteredProjects);
  }, [filteredProjects, onFilteredChange]);

  // Animated counter (ease-out quart)
  useEffect(() => {
    const start = prevCountRef.current;
    const end = filteredProjects.length;
    if (start === end) {
      setDisplayCount(end);
      return;
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const duration = 500;
    const t0 = performance.now();

    const tick = (now) => {
      const t = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setDisplayCount(Math.round(start + (end - start) * ease));
      if (t < 1) animFrameRef.current = requestAnimationFrame(tick);
      else prevCountRef.current = end;
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [filteredProjects.length]);

  // Stagger entrance
  useEffect(() => {
    if (staggerTimerRef.current) clearTimeout(staggerTimerRef.current);
    if (isOpen) {
      staggerTimerRef.current = setTimeout(() => setStaggerReady(true), 120);
    } else {
      setStaggerReady(false);
    }
    return () => {
      if (staggerTimerRef.current) clearTimeout(staggerTimerRef.current);
    };
  }, [isOpen]);

  /* ─── Cursor glow (ref-based, zero re-renders) ─── */

  const handleMouseMove = useCallback((e) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.left = `${e.clientX - rect.left}px`;
    glowRef.current.style.top = `${e.clientY - rect.top}px`;
    glowRef.current.style.opacity = '1';
  }, []);

  const handleMouseEnter = useCallback(() => setShowGlow(true), []);
  const handleMouseLeave = useCallback(() => {
    setShowGlow(false);
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  /* ─── Helpers ─── */

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.status) c++;
    if (filters.location) c++;
    if (filters.areaMin) c++;
    if (filters.areaMax) c++;
    return c;
  }, [filters]);

  const noResults = filteredProjects.length === 0 && activeFilterCount > 0;

  const clearAll = () => {
    setFilters({ status: '', location: '', areaMin: '', areaMax: '', sortBy: 'newest' });
  };

  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: '' }));
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const stagger = (i) => ({
    opacity: staggerReady ? 1 : 0,
    transform: staggerReady ? 'translateY(0)' : 'translateY(18px)',
    transition: staggerReady
      ? `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${i * 75 + 60}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 75 + 60}ms`
      : 'opacity 200ms ease 0ms, transform 200ms ease 0ms',
  });

  /* ─── Common classes ─── */

  const inputBase = [
    'w-full rounded-xl border bg-white/[0.02] font-[family-name:var(--font-manrope)] text-white',
    'transition-all duration-300',
    'focus:border-[#C5A880]/40 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/15',
    'hover:border-white/[0.14]',
    'border-white/[0.07]',
    'text-xs sm:text-sm placeholder-white/20',
    'py-2.5 sm:py-3 px-4',
    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  ].join(' ');

  const selectBase = [
    'w-full appearance-none rounded-xl border bg-white/[0.02] px-4 pr-10',
    'font-[family-name:var(--font-manrope)] text-white',
    'transition-all duration-300',
    'focus:border-[#C5A880]/40 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/15',
    'hover:border-white/[0.14]',
    'border-white/[0.07]',
    'text-xs sm:text-sm',
    'py-2.5 sm:py-3',
  ].join(' ');

  const statusOptions = [
    { value: '', label: 'All Projects' },
    { value: 'Current', label: 'Current' },
    { value: 'Upcoming', label: 'Upcoming' },
    { value: 'Completed', label: 'Completed' },
  ];

  /* ─── Render ─── */

  return (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      {/* ── Status tabs (always visible, primary quick-filter) ── */}
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {statusOptions.map((opt) => {
            const isActive = filters.status === opt.value;
            const count = statusCounts[opt.value] || 0;
            return (
              <button
                key={opt.value}
                onClick={() => updateFilter('status', opt.value)}
                className={[
                  'relative flex-shrink-0 rounded-full px-4 sm:px-5 py-2 sm:py-2.5',
                  'font-[family-name:var(--font-manrope)] text-[11px] sm:text-xs font-medium tracking-[0.08em]',
                  'border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'active:scale-[0.96] select-none min-h-[40px] sm:min-h-[44px]',
                  isActive
                    ? 'border-[#C5A880]/70 bg-[#C5A880] text-[#0a0f0d] shadow-[0_4px_20px_rgba(197,168,128,0.2)]'
                    : 'border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-[#C5A880]/25 hover:bg-white/[0.04] hover:text-white/70',
                ].join(' ')}
              >
                {opt.label}
                <span
                  className={[
                    'ml-1.5 tabular-nums text-[10px]',
                    isActive ? 'text-[#0a0f0d]/50' : 'text-white/20',
                  ].join(' ')}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Header row (filter toggle + count) ── */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="project-filter-panel"
          className={[
            'group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full',
            'border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'font-[family-name:var(--font-manrope)] text-xs sm:text-sm font-medium tracking-wide',
            'active:scale-[0.97] select-none',
            isOpen
              ? 'border-[#C5A880]/70 bg-[#C5A880]/[0.1] text-[#f0e6d4] shadow-[0_8px_32px_rgba(197,168,128,0.12)]'
              : 'border-white/[0.1] bg-white/[0.03] text-white/50 hover:border-[#C5A880]/40 hover:bg-[#C5A880]/[0.05] hover:text-white/80',
            activeFilterCount > 0 && !isOpen
              ? 'border-[#C5A880]/25 shadow-[0_0_24px_rgba(197,168,128,0.08)]'
              : '',
          ].join(' ')}
        >
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          <SlidersHorizontal className="relative h-[14px] w-[14px] sm:h-4 sm:w-4" strokeWidth={1.5} />
          <span className="relative">Refine</span>
          {activeFilterCount > 0 && (
            <span className="relative flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#C5A880] text-[10px] font-bold text-[#0a0f0d] shadow-[0_2px_10px_rgba(197,168,128,0.45)]">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={[
              'relative h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
              isOpen ? 'rotate-180' : '',
            ].join(' ')}
            strokeWidth={1.5}
          />
        </button>

        {/* Results count */}
        <div className="font-[family-name:var(--font-manrope)] text-[11px] sm:text-sm text-white/40 flex items-center gap-1.5">
          <span className="hidden sm:inline">Showing</span>
          <span
            className={[
              'font-semibold tabular-nums transition-colors duration-300',
              noResults ? 'text-red-400/70' : 'text-[#C5A880]',
            ].join(' ')}
          >
            {displayCount}
          </span>
          <span className="hidden sm:inline text-white/20">of</span>
          <span className="hidden sm:inline text-white/45">{projects.length}</span>
          <span className="hidden sm:inline text-white/20">projects</span>
          <span className="sm:hidden text-white/20">/</span>
          <span className="sm:hidden text-white/45">{projects.length}</span>
        </div>
      </div>

      {/* ── Shimmer line (active filters indicator) ── */}
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          height: activeFilterCount > 0 ? '1px' : '0px',
          marginBottom: activeFilterCount > 0 ? '20px' : '0px',
        }}
      >
        <div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #C5A880 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Filter panel — CSS grid smooth height ── */}
      <div
        id="project-filter-panel"
        role="region"
        aria-hidden={!isOpen}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div className="pb-1">
            {/* Aurora border wrapper */}
            <div className="relative rounded-2xl p-[1px] overflow-hidden group/panel">
              <div
                className="absolute inset-0 opacity-25 group-hover/panel:opacity-45 transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(135deg, #C5A880, #E8D5B5, #8B7355, #C5A880, #E8D5B5)',
                  backgroundSize: '300% 300%',
                  animation: 'aurora 8s ease-in-out infinite',
                }}
              />

              {/* Panel body */}
              <div
                className="relative rounded-2xl bg-[#080c0a]/[0.97] backdrop-blur-2xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/20 to-transparent pointer-events-none rounded-t-2xl" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-3 left-3 w-4 h-px bg-[#C5A880]/15" />
                  <div className="absolute top-3 left-3 w-px h-4 bg-[#C5A880]/15" />
                </div>
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-3 right-3 w-4 h-px bg-[#C5A880]/15" />
                  <div className="absolute top-3 right-3 w-px h-4 bg-[#C5A880]/15" />
                </div>
                <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
                  <div className="absolute bottom-3 left-3 w-4 h-px bg-[#C5A880]/10" />
                  <div className="absolute bottom-3 left-3 w-px h-4 bg-[#C5A880]/10" />
                </div>
                <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute bottom-3 right-3 w-4 h-px bg-[#C5A880]/10" />
                  <div className="absolute bottom-3 right-3 w-px h-4 bg-[#C5A880]/10" />
                </div>

                {/* Cursor-following glow */}
                <div
                  ref={glowRef}
                  className="pointer-events-none absolute z-0 transition-opacity duration-300"
                  style={{
                    width: 350,
                    height: 350,
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle, rgba(197,168,128,0.07) 0%, transparent 70%)',
                    borderRadius: '50%',
                    opacity: showGlow ? 1 : 0,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                  {/* Active filter pills */}
                  {activeFilterCount > 0 && (
                    <div
                      className="mb-5 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2"
                      style={stagger(0)}
                    >
                      <span className="font-[family-name:var(--font-manrope)] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880]/45">
                        Active
                      </span>
                      <span className="text-[#C5A880]/15 text-[10px] mx-0.5">·</span>
                      {filters.status && (
                        <FilterPill label={filters.status} onRemove={() => removeFilter('status')} />
                      )}
                      {filters.location && (
                        <FilterPill label={filters.location} onRemove={() => removeFilter('location')} />
                      )}
                      {filters.areaMin && (
                        <FilterPill label={`Min ${filters.areaMin}`} onRemove={() => removeFilter('areaMin')} />
                      )}
                      {filters.areaMax && (
                        <FilterPill label={`Max ${filters.areaMax}`} onRemove={() => removeFilter('areaMax')} />
                      )}
                      <button
                        onClick={clearAll}
                        className="ml-1 font-[family-name:var(--font-manrope)] text-[10px] sm:text-xs font-medium text-white/20 transition-all duration-300 hover:text-[#C5A880] underline-offset-4 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                  )}

                  {/* ── Filter grid ── */}
                  <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Location */}
                    <div style={stagger(1)}>
                      <FilterLabel>Location</FilterLabel>
                      <div className="relative group/select">
                        <select
                          value={filters.location}
                          onChange={(e) => updateFilter('location', e.target.value)}
                          className={selectBase}
                        >
                          <option value="" className="bg-[#080c0a] text-white/50">
                            All Locations
                          </option>
                          {locations.map((loc) => (
                            <option key={loc} value={loc} className="bg-[#080c0a]">
                              {loc}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20 transition-all duration-300 group-focus-within/select:rotate-180 group-focus-within/select:text-[#C5A880]/60"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Area Range */}
                    <div style={stagger(2)}>
                      <FilterLabel>Area Range</FilterLabel>
                      <div className="flex gap-2 sm:gap-3 items-center">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.areaMin}
                          onChange={(e) => updateFilter('areaMin', e.target.value)}
                          className={inputBase}
                        />
                        <span className="text-white/[0.08] text-[10px]">—</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.areaMax}
                          onChange={(e) => updateFilter('areaMax', e.target.value)}
                          className={inputBase}
                        />
                      </div>
                      <p className="mt-2 font-[family-name:var(--font-manrope)] text-[9px] text-white/15 tracking-wide">
                        Numeric value · matches project area unit
                      </p>
                    </div>

                    {/* Sort */}
                    <div style={stagger(3)}>
                      <FilterLabel>Sort By</FilterLabel>
                      <div className="relative group/select">
                        <select
                          value={filters.sortBy}
                          onChange={(e) => updateFilter('sortBy', e.target.value)}
                          className={selectBase}
                        >
                          <option value="newest" className="bg-[#080c0a]">
                            Newest First
                          </option>
                          <option value="alpha" className="bg-[#080c0a]">
                            Alphabetical (A → Z)
                          </option>
                          <option value="area-largest" className="bg-[#080c0a]">
                            Largest Area
                          </option>
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20 transition-all duration-300 group-focus-within/select:rotate-180 group-focus-within/select:text-[#C5A880]/60"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* No results */}
                  {noResults && (
                    <div className="mt-5 sm:mt-6 flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06]">
                        <X className="h-3.5 w-3.5 text-white/25" strokeWidth={2} />
                      </div>
                      <p className="font-[family-name:var(--font-manrope)] text-xs sm:text-sm text-white/30 leading-relaxed">
                        No projects match your current filters.
                        <span className="hidden sm:inline"> Try adjusting your criteria.</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Global keyframes ── */}
      <style jsx global>{`
        @keyframes aurora {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @keyframes pillIn {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(-2px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Sub-components ─── */

function FilterLabel({ children }) {
  return (
    <label className="mb-2 sm:mb-2.5 block font-[family-name:var(--font-manrope)] text-[9px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A880]/55">
      {children}
    </label>
  );
}

function FilterPill({ label, onRemove }) {
  return (
    <button
      onClick={onRemove}
      className="group inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#C5A880]/18 bg-[#C5A880]/[0.05] px-2 sm:px-2.5 py-0.5 sm:py-1 font-[family-name:var(--font-manrope)] text-[10px] sm:text-xs font-medium text-[#C5A880]/70 transition-all duration-300 hover:border-[#C5A880]/40 hover:bg-[#C5A880]/[0.1] hover:text-[#C5A880]"
      style={{ animation: 'pillIn 300ms cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <span>{label}</span>
      <X
        className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-all duration-300 group-hover:rotate-90 group-hover:text-white"
        strokeWidth={2.5}
      />
    </button>
  );
}

'use client';

/**
 * PropertyFilters — Awwwards-grade instant filtering system
 *
 * Elevations:
 * • Aurora animated gradient border
 * • Cursor-following radial glow inside panel
 * • CSS grid smooth height (no max-hack)
 * • Staggered section entrance animations
 * • Animated number counter (ease-out quart)
 * • Shimmer indicator line when filters active
 * • Price range visual bar
 * • Decorative corner accents + top highlight
 * • Select chevron rotates on focus
 * • No-results inline state
 * • Touch-optimized targets (min 44px)
 * • Spin-button-free number inputs
 * • Active:scale micro-feedback on all buttons
 * • Fully responsive at every breakpoint
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function PropertyFilters({ properties, onFilteredChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [staggerReady, setStaggerReady] = useState(false);
  const [displayCount, setDisplayCount] = useState(properties.length);
  const [showGlow, setShowGlow] = useState(false);

  const prevCountRef = useRef(properties.length);
  const animFrameRef = useRef(null);
  const staggerTimerRef = useRef(null);
  const glowRef = useRef(null);

  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: null,
    bathrooms: null,
    location: '',
    sortBy: 'newest',
  });

  /* ─── Derived data ─── */

  const locations = useMemo(() => {
    const locs = properties.map(p => p.location).filter(Boolean);
    return [...new Set(locs)].sort();
  }, [properties]);

  const priceRange = useMemo(() => {
    if (!properties.length) return { min: 0, max: 1000000 };
    const prices = properties.map(p => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [properties]);

  /* ─── Filter + sort logic ─── */

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filters.priceMin) {
      const min = parseFloat(filters.priceMin);
      if (!isNaN(min)) result = result.filter(p => p.price >= min);
    }
    if (filters.priceMax) {
      const max = parseFloat(filters.priceMax);
      if (!isNaN(max)) result = result.filter(p => p.price <= max);
    }
    if (filters.bedrooms !== null) {
      result =
        filters.bedrooms === '4+'
          ? result.filter(p => p.beds >= 4)
          : result.filter(p => p.beds === parseInt(filters.bedrooms));
    }
    if (filters.bathrooms !== null) {
      result =
        filters.bathrooms === '3+'
          ? result.filter(p => p.baths >= 3)
          : result.filter(p => p.baths === parseInt(filters.bathrooms));
    }
    if (filters.location) {
      result = result.filter(p => p.location === filters.location);
    }

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms':
        result.sort((a, b) => b.beds - a.beds);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [properties, filters]);

  /* ─── Side-effects ─── */

  useEffect(() => {
    onFilteredChange(filteredProperties);
  }, [filteredProperties, onFilteredChange]);

  // Animated counter
  useEffect(() => {
    const start = prevCountRef.current;
    const end = filteredProperties.length;
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
  }, [filteredProperties.length]);

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

  /* ─── Cursor glow (ref-based, no re-renders) ─── */

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
    if (filters.priceMin) c++;
    if (filters.priceMax) c++;
    if (filters.bedrooms !== null) c++;
    if (filters.bathrooms !== null) c++;
    if (filters.location) c++;
    return c;
  }, [filters]);

  const noResults = filteredProperties.length === 0 && activeFilterCount > 0;

  const clearAll = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      bedrooms: null,
      bathrooms: null,
      location: '',
      sortBy: 'newest',
    });
  };

  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === 'bedrooms' || key === 'bathrooms' ? null : '',
    }));
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

  // Price bar visual
  const priceBarStyle = useMemo(() => {
    if (!filters.priceMin && !filters.priceMax) return null;
    const range = priceRange.max - priceRange.min || 1;
    const left = filters.priceMin
      ? ((parseFloat(filters.priceMin) - priceRange.min) / range) * 100
      : 0;
    const right = filters.priceMax
      ? 100 - ((parseFloat(filters.priceMax) - priceRange.min) / range) * 100
      : 0;
    return {
      left: `${Math.max(0, Math.min(100, left))}%`,
      right: `${Math.max(0, Math.min(100, right))}%`,
    };
  }, [filters.priceMin, filters.priceMax, priceRange]);

  /* ─── Common input classes ─── */

  const inputBase = [
    'w-full rounded-xl border bg-white/[0.02] font-[family-name:var(--font-manrope)] text-white',
    'transition-all duration-300',
    'focus:border-[#C5A880]/40 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-[#C5A880]/15',
    'hover:border-white/[0.14]',
    'border-white/[0.07]',
    'text-xs sm:text-sm placeholder-white/20',
    'py-2.5 sm:py-3',
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

  /* ─── Render ─── */

  return (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
        {/* Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="filter-panel"
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
          {/* Hover shimmer */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

          <SlidersHorizontal className="relative h-[14px] w-[14px] sm:h-4 sm:w-4" strokeWidth={1.5} />
          <span className="relative">Filters</span>

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
          <span className="hidden sm:inline text-white/45">{properties.length}</span>
          <span className="hidden sm:inline text-white/20">properties</span>
          <span className="sm:hidden text-white/20">/</span>
          <span className="sm:hidden text-white/45">{properties.length}</span>
        </div>
      </div>

      {/* ── Shimmer line (active filters) ── */}
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
        id="filter-panel"
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
              {/* Animated gradient border */}
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
                      {filters.priceMin && (
                        <FilterPill
                          label={`Min £${parseInt(filters.priceMin).toLocaleString()}`}
                          onRemove={() => removeFilter('priceMin')}
                        />
                      )}
                      {filters.priceMax && (
                        <FilterPill
                          label={`Max £${parseInt(filters.priceMax).toLocaleString()}`}
                          onRemove={() => removeFilter('priceMax')}
                        />
                      )}
                      {filters.bedrooms !== null && (
                        <FilterPill
                          label={`${filters.bedrooms} Bed`}
                          onRemove={() => removeFilter('bedrooms')}
                        />
                      )}
                      {filters.bathrooms !== null && (
                        <FilterPill
                          label={`${filters.bathrooms} Bath`}
                          onRemove={() => removeFilter('bathrooms')}
                        />
                      )}
                      {filters.location && (
                        <FilterPill
                          label={filters.location}
                          onRemove={() => removeFilter('location')}
                        />
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
                    {/* Price Range */}
                    <div
                      className="sm:col-span-2 lg:col-span-1"
                      style={stagger(1)}
                    >
                      <FilterLabel>Price Range</FilterLabel>
                      <div className="flex gap-2 sm:gap-3 items-center">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-[10px] sm:text-xs font-[family-name:var(--font-manrope)] pointer-events-none">
                            £
                          </span>
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.priceMin}
                            onChange={(e) =>
                              updateFilter('priceMin', e.target.value)
                            }
                            className={`${inputBase} pl-6 sm:pl-7 pr-3`}
                          />
                        </div>
                        <span className="text-white/8 text-[10px]">—</span>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-[10px] sm:text-xs font-[family-name:var(--font-manrope)] pointer-events-none">
                            £
                          </span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.priceMax}
                            onChange={(e) =>
                              updateFilter('priceMax', e.target.value)
                            }
                            className={`${inputBase} pl-6 sm:pl-7 pr-3`}
                          />
                        </div>
                      </div>
                      {/* Price range visual bar */}
                      {priceBarStyle && (
                        <div className="mt-3 relative h-[3px] rounded-full bg-white/[0.04] overflow-hidden">
                          <div
                            className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#C5A880]/50 to-[#C5A880] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={priceBarStyle}
                          />
                          {/* Endpoint dots */}
                          {filters.priceMin && (
                            <div
                              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A880] shadow-[0_0_6px_rgba(197,168,128,0.5)] transition-all duration-500"
                              style={{ left: priceBarStyle.left }}
                            />
                          )}
                          {filters.priceMax && (
                            <div
                              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A880] shadow-[0_0_6px_rgba(197,168,128,0.5)] transition-all duration-500"
                              style={{ right: priceBarStyle.right }}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bedrooms */}
                    <div style={stagger(2)}>
                      <FilterLabel>Bedrooms</FilterLabel>
                      <div className="flex gap-1.5 sm:gap-2">
                        {['1', '2', '3', '4+'].map((num) => (
                          <FilterButton
                            key={num}
                            active={filters.bedrooms === num}
                            onClick={() =>
                              updateFilter(
                                'bedrooms',
                                filters.bedrooms === num ? null : num
                              )
                            }
                          >
                            {num}
                          </FilterButton>
                        ))}
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div style={stagger(3)}>
                      <FilterLabel>Bathrooms</FilterLabel>
                      <div className="flex gap-1.5 sm:gap-2">
                        {['1', '2', '3+'].map((num) => (
                          <FilterButton
                            key={num}
                            active={filters.bathrooms === num}
                            onClick={() =>
                              updateFilter(
                                'bathrooms',
                                filters.bathrooms === num ? null : num
                              )
                            }
                          >
                            {num}
                          </FilterButton>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div style={stagger(4)}>
                      <FilterLabel>Location</FilterLabel>
                      <div className="relative group/select">
                        <select
                          value={filters.location}
                          onChange={(e) =>
                            updateFilter('location', e.target.value)
                          }
                          className={selectBase}
                        >
                          <option value="" className="bg-[#080c0a] text-white/50">
                            All Locations
                          </option>
                          {locations.map((loc) => (
                            <option
                              key={loc}
                              value={loc}
                              className="bg-[#080c0a]"
                            >
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

                    {/* Sort */}
                    <div style={stagger(5)}>
                      <FilterLabel>Sort By</FilterLabel>
                      <div className="relative group/select">
                        <select
                          value={filters.sortBy}
                          onChange={(e) =>
                            updateFilter('sortBy', e.target.value)
                          }
                          className={selectBase}
                        >
                          <option value="newest" className="bg-[#080c0a]">
                            Newest First
                          </option>
                          <option value="price-low" className="bg-[#080c0a]">
                            Price: Low → High
                          </option>
                          <option value="price-high" className="bg-[#080c0a]">
                            Price: High → Low
                          </option>
                          <option value="bedrooms" className="bg-[#080c0a]">
                            Most Bedrooms
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
                        <X
                          className="h-3.5 w-3.5 text-white/25"
                          strokeWidth={2}
                        />
                      </div>
                      <p className="font-[family-name:var(--font-manrope)] text-xs sm:text-sm text-white/30 leading-relaxed">
                        No properties match your current filters.
                        <span className="hidden sm:inline">
                          {' '}
                          Try adjusting your criteria.
                        </span>
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

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex-1 rounded-xl border font-[family-name:var(--font-manrope)] text-xs sm:text-sm font-medium',
        'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'active:scale-[0.92] select-none min-h-[40px] sm:min-h-[44px]',
        active
          ? 'border-[#C5A880]/70 bg-[#C5A880] text-[#0a0f0d] shadow-[0_4px_24px_rgba(197,168,128,0.2)] scale-[1.02]'
          : 'border-white/[0.06] bg-white/[0.015] text-white/40 hover:border-[#C5A880]/30 hover:bg-white/[0.04] hover:text-white/70 hover:scale-[1.02]',
      ].join(' ')}
    >
      {children}
    </button>
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
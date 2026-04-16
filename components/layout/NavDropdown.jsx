'use client';

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Fragment } from 'react';

/**
 * NavDropdown - Premium Navigation Dropdown Component
 * 
 * A reusable, luxury dropdown component for the Lavita Malam Jabba navigation.
 * Features smooth animations and elegant hover interactions.
 * 
 * @param {string} title - The dropdown trigger text (e.g., "The Resort", "Experiences")
 * @param {Array} items - Array of link objects with { label: string, href: string }
 * @param {string} className - Optional additional CSS classes
 */
export default function NavDropdown({ title, items, className = '' }) {
    return (
        <Popover className={`relative ${className}`}>
            {({ open }) => (
                <>
                    <Popover.Button
                        className="lux-nav-link group inline-flex items-center gap-[0.35rem] bg-transparent border-none cursor-pointer p-0 font-[family-name:var(--font-manrope)] text-[0.78rem] tracking-[0.18em] uppercase text-[rgba(245,245,245,0.85)] no-underline transition-colors duration-300 hover:text-[#c89b7b] focus:outline-none focus:text-[#c89b7b] data-[open]:is-active data-[open]:text-[#c89b7b]"
                    >
                        <span className="transition-colors duration-300">
                            {title}
                        </span>
                        <ChevronDownIcon
                            className={`h-[14px] w-[14px] transition-all duration-300 ease-out ${open ? 'rotate-180 text-[#c89b7b]' : 'rotate-0'
                                }`}
                            aria-hidden="true"
                        />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                        enterFrom="opacity-0 translate-y-2 scale-[0.98]"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition duration-220 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-1 scale-[0.99]"
                    >
                        <Popover.Panel className="absolute left-1/2 -translate-x-1/2 z-50 min-w-[220px] mt-4">
                            <div className="rounded-xl bg-[rgba(8,14,13,0.94)] backdrop-blur-xl shadow-2xl shadow-black/45 border border-[rgba(197,168,128,0.2)] overflow-hidden">
                                <div className="relative py-2">
                                    {items.map((item) => (
                                        <Popover.Button
                                            key={item.label}
                                            as={Link}
                                            href={item.href}
                                            className="group relative flex items-center px-4 py-2.5 text-[rgba(245,245,245,0.86)] transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)] hover:text-[#C5A880] focus:outline-none focus:bg-[rgba(255,255,255,0.06)] focus:text-[#C5A880]"
                                        >
                                            <p className="font-[family-name:var(--font-manrope)] text-sm font-medium tracking-[0.08em] uppercase m-0 transition-all duration-300 group-hover:translate-x-1">
                                                {item.label}
                                            </p>
                                        </Popover.Button>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}

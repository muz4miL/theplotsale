'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function LuxuryModal({ isOpen, title, onClose, children, maxWidth = 'max-w-2xl' }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`w-full ${maxWidth} rounded-2xl border border-white/10 bg-neutral-900/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)]`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/15 p-2 text-neutral-300 transition-colors hover:border-[#C5A880]/50 hover:text-[#C5A880]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

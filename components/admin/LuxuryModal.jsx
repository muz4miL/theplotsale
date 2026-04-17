'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function LuxuryModal({ isOpen, title, onClose, children, maxWidth = 'max-w-2xl' }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <motion.div
            className={`w-full ${maxWidth} max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:max-h-[90vh] sm:p-6`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="sticky -top-5 z-[1] -mx-5 mb-4 flex items-center justify-between border-b border-white/10 bg-neutral-900/95 px-5 pb-3 pt-5 backdrop-blur-md sm:-top-6 sm:-mx-6 sm:mb-5 sm:px-6 sm:pt-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
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

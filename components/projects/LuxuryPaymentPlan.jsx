'use client';

import { FileText, Sparkles } from 'lucide-react';

/**
 * Luxury Payment Plan Component
 * Displays payment structure with extraordinary elegance
 * Supports multiple plot sizes with detailed payment breakdown
 */
export default function LuxuryPaymentPlan({ paymentPlan }) {
  if (!paymentPlan || !paymentPlan.categories || paymentPlan.categories.length === 0) {
    return null;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-xl transition-all duration-700 hover:border-[#C5A880]/30 sm:p-8 lg:p-10">
      {/* Aurora Border Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(197,168,128,0.1), transparent)',
          animation: 'aurora 8s ease-in-out infinite',
        }}
      />

      {/* Header */}
      <div className="relative mb-8 border-b border-white/[0.08] pb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C5A880]/20 to-[#C5A880]/5 backdrop-blur-sm">
            <FileText className="h-6 w-6 text-[#C5A880]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-px w-6 bg-gradient-to-r from-[#C5A880] to-transparent" />
              <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]/90">
                Investment
              </p>
            </div>
            <h2 className="font-playfair text-3xl font-light text-white sm:text-4xl">
              Payment <span className="italic text-[#e8dcc4]">Structure</span>
            </h2>
          </div>
        </div>
        {paymentPlan.description && (
          <p className="font-[family-name:var(--font-manrope)] text-sm font-light text-white/50 sm:text-base">
            {paymentPlan.description}
          </p>
        )}
      </div>

      {/* Payment Table */}
      <div className="relative overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="mb-4 grid grid-cols-7 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              Category
            </div>
            <div className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              Down Payment
            </div>
            <div className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              8 Quarterly
            </div>
            <div className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              Yearly
            </div>
            <div className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              On Possession
            </div>
            <div className="font-[family-name:var(--font-manrope)] text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              Total Amount
            </div>
            <div className="flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-[#C5A880]" />
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {paymentPlan.categories.map((category, index) => (
              <div
                key={index}
                className="group/row grid grid-cols-7 gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#C5A880]/20 hover:bg-white/[0.05]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Category Name */}
                <div className="flex items-center">
                  <span className="font-playfair text-base font-medium text-white">
                    {category.name}
                  </span>
                </div>

                {/* Down Payment */}
                <div className="flex items-center">
                  <span className="font-[family-name:var(--font-manrope)] text-sm text-white/80">
                    {formatCurrency(category.downPayment)}
                  </span>
                </div>

                {/* 8 Quarterly Installments */}
                <div className="flex items-center">
                  <span className="font-[family-name:var(--font-manrope)] text-sm text-white/80">
                    {formatCurrency(category.quarterlyInstallment)}
                  </span>
                </div>

                {/* Yearly Installment */}
                <div className="flex items-center">
                  <span className="font-[family-name:var(--font-manrope)] text-sm text-white/80">
                    {formatCurrency(category.yearlyInstallment)}
                  </span>
                </div>

                {/* On Possession */}
                <div className="flex items-center">
                  <span className="font-[family-name:var(--font-manrope)] text-sm text-white/80">
                    {formatCurrency(category.onPossession)}
                  </span>
                </div>

                {/* Total Amount */}
                <div className="flex items-center">
                  <span className="font-playfair text-base font-semibold text-[#C5A880]">
                    {formatCurrency(category.totalAmount)}
                  </span>
                </div>

                {/* Glow Effect */}
                <div className="flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#C5A880]/50 opacity-0 transition-opacity duration-500 group-hover/row:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Hint for Mobile */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40 lg:hidden">
          <span>Scroll horizontally to view all columns</span>
          <svg
            className="h-4 w-4 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Footer Note */}
      {paymentPlan.note && (
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
          <p className="font-[family-name:var(--font-manrope)] text-xs text-white/50">
            <span className="font-semibold text-[#C5A880]">Note:</span> {paymentPlan.note}
          </p>
        </div>
      )}
    </div>
  );
}

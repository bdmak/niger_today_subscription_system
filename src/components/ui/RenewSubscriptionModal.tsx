'use client';

import { useState } from 'react';

interface RenewSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
  currentExpiry?: string;
  badgeText?: string;
  onConfirm: (duration: string, newExpiry: string) => void;
}

export default function RenewSubscriptionModal({
  isOpen,
  onClose,
  customerName = 'John Smith',
  currentExpiry = 'Oct 8, 2026',
  badgeText = '3 days left',
  onConfirm,
}: RenewSubscriptionModalProps) {
  const [selectedDuration, setSelectedDuration] = useState('3 months');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Auto calculate calculated date string based on selected duration
  const getCalculatedExpiry = (duration: string) => {
    if (duration === '6 months') return 'Apr 8, 2027';
    if (duration === '12 months') return 'Oct 8, 2027';
    return 'Jan 8, 2027'; // Default for 3 months
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    const newExpiry = getCalculatedExpiry(selectedDuration);

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(selectedDuration, newExpiry);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card Box */}
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 relative animate-scaleUp">
        
        {/* Header & Close Icon */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            {/* Refresh Circle Icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#EEF2FF] text-[#5245E5] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Renew subscription
              </h3>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                {customerName}
              </p>
            </div>
          </div>

          {/* Close Icon */}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Current Expiry Banner */}
        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Current expiry</p>
            <p className="text-xs font-bold text-slate-800">{currentExpiry}</p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            {badgeText}
          </span>
        </div>

        {/* Renewal Duration Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Renewal duration
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: '3 months' },
              { label: '6 months' },
              { label: '12 months' },
            ].map((plan) => {
              const isSelected = selectedDuration === plan.label;
              return (
                <button
                  type="button"
                  key={plan.label}
                  onClick={() => setSelectedDuration(plan.label)}
                  className={`py-3 px-2 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-[#EEF2FF] border-[#5245E5] ring-1 ring-[#5245E5]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-[#5245E5]' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#5245E5]" />}
                  </span>
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                    {plan.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* New Expiration Date Box */}
        <div className="bg-[#EEF2FF]/60 p-4 rounded-2xl border border-indigo-100/60 space-y-1">
          <p className="text-[11px] text-[#5245E5] font-semibold">New expiration date</p>
          <p className="text-xl font-extrabold text-[#5245E5]">
            {getCalculatedExpiry(selectedDuration)}
          </p>
        </div>

        {/* Disclaimer Subtext */}
        <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
          Payment happens outside this app. Confirming only updates the customer record.
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <span>✓</span>
            <span>{isSubmitting ? 'Confirming...' : 'Confirm renewal'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
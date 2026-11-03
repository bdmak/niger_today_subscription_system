'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
}

export default function DeleteCustomerModal({
  isOpen,
  onClose,
  customerName = 'John Smith',
}: DeleteCustomerModalProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      onClose();
      router.push('/customers');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 relative animate-scaleUp">
        
        {/* Header & Close Icon */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Red Trash Icon Circle */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Delete {customerName}?
            </h3>
          </div>

          {/* Close Button */}
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

        {/* Warning Text */}
        <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
          This permanently removes the customer and their subscription records. This cannot be undone.
        </p>

        {/* Footer Action Buttons */}
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
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            <span>{isDeleting ? 'Deleting...' : 'Delete customer'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
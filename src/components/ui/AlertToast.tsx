'use client';

import { useEffect } from 'react';

export type ToastVariant = 'success' | 'error';

interface AlertToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: ToastVariant;
  autoHideDuration?: number;
}

export default function AlertToast({
  isOpen,
  onClose,
  title,
  message,
  variant = 'success',
  autoHideDuration = 4000,
}: AlertToastProps) {
  useEffect(() => {
    if (isOpen && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoHideDuration, onClose]);

  if (!isOpen) return null;

  const isSuccess = variant === 'success';

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-fadeIn">
      <div
        className={`bg-white rounded-2xl p-3.5 shadow-xl border flex items-center justify-between gap-3 transition-all ${
          isSuccess
            ? 'border-emerald-400/80 shadow-emerald-500/5'
            : 'border-red-400/80 shadow-red-500/5'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Icon Circle */}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
              isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
            }`}
          >
            {isSuccess ? (
              /* Success Check Icon */
              <svg
                className="w-4 h-4 stroke-[2.5]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              /* Error Warning Icon */
              <svg
                className="w-4 h-4 stroke-[2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            )}
          </div>

          {/* Title and Description */}
          <div>
            <p className="text-xs font-bold text-slate-900 leading-snug">{title}</p>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
              {message}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
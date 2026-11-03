'use client';

import { useState } from 'react';

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
  customerPhone?: string;
  customerExpiry?: string;
  onReminderSent: (message: string) => void;
}

export default function SendReminderModal({
  isOpen,
  onClose,
  customerName = 'John Smith',
  customerPhone = '+1 555 012 3456',
  customerExpiry = 'Oct 8, 2026 (3 days left)',
  onReminderSent,
}: SendReminderModalProps) {
  const [activeTemplate, setActiveTemplate] = useState('3 days left');
  const [message, setMessage] = useState(
    `Hi ${customerName}, your TV subscription expires on ${customerExpiry}. Please renew to keep your service running. Thank you!`
  );
  const [isCopying, setIsCopying] = useState(false);

  if (!isOpen) return null;

  const handleTemplateSelect = (template: string) => {
    setActiveTemplate(template);
    if (template === '7 days left') {
      setMessage(`Hi ${customerName}, your TV subscription is expiring in 7 days. Please renew soon to avoid any interruption.`);
    } else if (template === '3 days left') {
      setMessage(`Hi ${customerName}, your TV subscription expires on ${customerExpiry}. Please renew to keep your service running. Thank you!`);
    } else if (template === '1 day left') {
      setMessage(`Hi ${customerName}, reminder that your TV subscription expires tomorrow! Please renew today.`);
    } else if (template === 'Expired') {
      setMessage(`Hi ${customerName}, your TV subscription has expired. Renew now to reconnect your service.`);
    }
  };

  const handleCopyMessage = () => {
    setIsCopying(true);
    // Fallback copy method compatible with iFrames & browsers
    const textArea = document.createElement('textarea');
    textArea.value = message;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text', err);
    }
    document.body.removeChild(textArea);

    setTimeout(() => {
      setIsCopying(false);
      onReminderSent(customerName);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-6 relative animate-scaleUp">
        
        {/* Header & Close Button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            {/* Message Icon Circle */}
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#5245E5] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Send reminder</h3>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                {customerName} · {customerPhone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Template Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Quick template
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {['7 days left', '3 days left', '1 day left', 'Expired'].map((tpl) => {
              const isSelected = activeTemplate === tpl;
              return (
                <button
                  key={tpl}
                  type="button"
                  onClick={() => handleTemplateSelect(tpl)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#5245E5] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tpl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Textarea Box */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5245E5] transition-all leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
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
            onClick={handleCopyMessage}
            disabled={isCopying}
            className="px-5 py-2.5 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{isCopying ? 'Copying...' : 'Copy message'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
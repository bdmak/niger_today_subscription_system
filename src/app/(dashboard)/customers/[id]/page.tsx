'use client';

import { useState } from 'react';
import Link from 'next/link';
import DeleteCustomerModal from '@/src/components/ui/DeleteCustomerModal';
import RenewSubscriptionModal from '@/src/components/ui/RenewSubscriptionModal';
import AlertToast, { ToastVariant } from '@/src/components/ui/AlertToast';

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  
  // Reusable Alert Toast State
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    variant: ToastVariant;
  }>({
    isOpen: false,
    title: '',
    message: '',
    variant: 'success',
  });

  // Sample Customer Data
  const customer = {
    name: 'John Smith',
    initials: 'JS',
    status: 'Expiring',
    badgeText: '3 days left',
    timeRemaining: '3 days left',
    customerSince: 'Apr 8, 2026',
    startDate: 'Jul 8, 2026',
    duration: '3 months',
    expiresDate: 'Oct 8, 2026',
    phone: '+1 555 012 3456',
    email: 'john@email.com',
  };

  const handleRenewConfirm = (duration: string, newExpiry: string) => {
    // Show top-right success toast alert matching Image 1
    setToastState({
      isOpen: true,
      title: 'Subscription renewed',
      message: `${customer.name} · new expiry ${newExpiry}`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 max-w-6xl mx-auto relative">
      
      {/* Reusable Toast Alert Component */}
      <AlertToast
        isOpen={toastState.isOpen}
        onClose={() => setToastState((prev) => ({ ...prev, isOpen: false }))}
        title={toastState.title}
        message={toastState.message}
        variant={toastState.variant}
      />

      {/* Back Link */}
      <div>
        <Link 
          href="/customers" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5245E5] hover:underline mb-3"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Customers</span>
        </Link>

        {/* Desktop Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E0E7FF] text-[#5245E5] font-extrabold text-sm flex items-center justify-center">
              {customer.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {customer.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706]">
                  • {customer.badgeText}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Customer since {customer.customerSince}
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-3.5 py-2 bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Edit</span>
            </button>

            <button className="px-3.5 py-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5245E5] text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Send Reminder</span>
            </button>

            <button
              onClick={() => setIsRenewModalOpen(true)}
              className="px-4 py-2 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Renew Subscription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Subscription & Renewal History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Subscription Progress Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Subscription</p>
                <p className="text-[11px] text-slate-400">Current plan details</p>
              </div>
              <p className="text-xs text-slate-400 font-medium">Expires {customer.expiresDate}</p>
            </div>

            {/* Time Remaining & Orange Progress Bar */}
            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-black text-[#D97706]">
                {customer.timeRemaining}
              </p>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-[#D97706] h-full rounded-full w-[88%]" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-0.5">
                <span>{customer.startDate}</span>
                <span>{customer.expiresDate}</span>
              </div>
            </div>

            <hr className="border-slate-100 hidden sm:block" />

            {/* Details Table List (Start Date, Duration, Expires) */}
            <div className="divide-y divide-slate-100 text-xs hidden sm:block">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Start date</span>
                <span className="font-bold text-slate-800">{customer.startDate}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Duration</span>
                <span className="font-bold text-slate-800">{customer.duration}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Expiration date</span>
                <span className="font-bold text-slate-800">{customer.expiresDate}</span>
              </div>
            </div>
          </div>

          {/* Mobile Info Table View */}
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 text-xs sm:hidden overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Start date</span>
              <span className="font-bold text-slate-800">{customer.startDate}</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Duration</span>
              <span className="font-bold text-slate-800">{customer.duration}</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Expires</span>
              <span className="font-bold text-slate-800">{customer.expiresDate}</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Phone</span>
              <span className="font-bold text-slate-800">{customer.phone}</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Email</span>
              <span className="font-bold text-slate-800">{customer.email}</span>
            </div>
          </div>

          {/* Renewal History (Desktop View) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 hidden sm:block">
            <div>
              <h3 className="text-base font-bold text-slate-900">Renewal history</h3>
              <p className="text-xs text-slate-400">Every time this subscription was renewed</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs space-y-1">
              <div className="py-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-800">Renewed for 3 months</p>
                  <p className="text-[11px] text-slate-400">Jul 8, 2026 → Oct 8, 2026</p>
                </div>
              </div>

              <div className="py-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-800">First subscription · 3 months</p>
                  <p className="text-[11px] text-slate-400">Apr 8, 2026 → Jul 8, 2026</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact & Danger Zone (Desktop View) */}
        <div className="space-y-6">
          
          {/* Contact Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 hidden sm:block">
            <h3 className="text-base font-bold text-slate-900">Contact</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-[10px] text-slate-400">Phone</p>
                  <p className="font-bold text-slate-800">{customer.phone}</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-[10px] text-slate-400">Email</p>
                  <p className="font-bold text-slate-800">{customer.email}</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Delete Customer Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-3 hidden sm:block">
            <h3 className="text-base font-bold text-slate-900">Delete customer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Removes this customer and their subscription records. This cannot be undone.
            </p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-white hover:bg-red-50 border border-slate-200 text-red-600 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <span>Delete customer</span>
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Stacked Action Buttons */}
      <div className="space-y-2.5 sm:hidden pt-2">
        <button
          onClick={() => setIsRenewModalOpen(true)}
          className="w-full py-3 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Renew Subscription</span>
        </button>

        <button className="w-full py-3 bg-[#EEF2FF] text-[#5245E5] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Send Reminder</span>
        </button>

        <button className="w-full py-3 bg-white border border-slate-200/80 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 1-2 2v14a2 2 0 0 1 2 2h14a2 2 0 0 1 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Edit customer</span>
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full py-3 bg-white border border-red-200 text-red-600 text-xs font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 mt-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          <span>Delete customer</span>
        </button>
      </div>

      {/* Delete Customer Modal Component */}
      <DeleteCustomerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        customerName={customer.name}
      />

      {/* Renew Subscription Modal Component */}
      <RenewSubscriptionModal
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
        customerName={customer.name}
        currentExpiry={customer.expiresDate}
        badgeText={customer.badgeText}
        onConfirm={handleRenewConfirm}
      />
    </div>
  );
}
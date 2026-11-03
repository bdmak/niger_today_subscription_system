'use client';

import { useState } from 'react';
import Link from 'next/link';
import SendReminderModal from '@/src/components/ui/SendReminderModal';
import AlertToast, { ToastVariant } from '@/src/components/ui/AlertToast';

export default function ExpiringSoonPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [selectedCustomer, setSelectedCustomer] = useState<{
    name: string;
    phone: string;
    expiry: string;
  } | null>(null);

  // Toast State
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

  // Sample data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Smith',
      initials: 'JS',
      email: 'john@email.com',
      phone: '+1 555 012 3456',
      expires: 'Oct 8',
      remainingDays: 3,
      remainingText: '3 days left',
      remainingColor: 'bg-[#FEF3C7] text-[#D97706]',
      group: '1-3 days',
    },
    {
      id: 2,
      name: 'Michael Brown',
      initials: 'MB',
      email: 'michael@email.com',
      phone: '+1 555 013 7788',
      expires: 'Oct 12',
      remainingDays: 7,
      remainingText: '7 days left',
      remainingColor: 'bg-[#FEF3C7] text-[#D97706]',
      group: '4-7 days',
    },
    {
      id: 3,
      name: 'David Lee',
      initials: 'DL',
      email: 'david@email.com',
      phone: '+1 555 014 6621',
      expires: 'Oct 15',
      remainingDays: 10,
      remainingText: '10 days left',
      remainingColor: 'bg-[#FEF3C7] text-[#D97706]',
      group: '8-10 days',
    },
    {
      id: 4,
      name: 'Priya Das',
      initials: 'PD',
      email: 'priya@email.com',
      phone: '+1 555 016 8802',
      expires: 'Oct 15',
      remainingDays: 10,
      remainingText: '10 days left',
      remainingColor: 'bg-[#FEF3C7] text-[#D97706]',
      group: '8-10 days',
    },
  ]);

  // Filter logic
  const filteredCustomers = customers.filter((c) => {
    const matchesTab = activeTab === 'All' ? true : c.group === activeTab;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  const handleReminderSent = (customerName: string) => {
    setToastState({
      isOpen: true,
      title: 'Reminder message copied',
      message: `Reminder for ${customerName} copied to clipboard successfully!`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 relative">
      
      {/* Toast Notification Alert */}
      <AlertToast
        isOpen={toastState.isOpen}
        onClose={() => setToastState((prev) => ({ ...prev, isOpen: false }))}
        title={toastState.title}
        message={toastState.message}
        variant={toastState.variant}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Expiring Soon
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            {customers.length > 0 ? `${customers.length} subscriptions expire within the next 10 days` : 'Nothing expiring in the next 10 days'}
          </p>
        </div>

        {/* PC Search input */}
        <div className="hidden md:block relative w-64 lg:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search name, phone or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5245E5]"
          />
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-3">
        <div className="md:hidden relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search name, phone or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5245E5]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: 'All', count: customers.length },
            { label: '1–3 days', value: '1-3 days', count: customers.filter(c => c.group === '1-3 days').length },
            { label: '4–7 days', value: '4-7 days', count: customers.filter(c => c.group === '4-7 days').length },
            { label: '8–10 days', value: '8-10 days', count: customers.filter(c => c.group === '8-10 days').length },
            { label: '15–20 days', value: '15–20 days', count: customers.filter(c => c.group === '15–20 days').length }
          ].map((tab) => {
            const tabValue = tab.value || tab.label;
            const isSelected = activeTab === tabValue;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tabValue)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#5245E5] text-white shadow-sm'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] opacity-80 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================
        CONDITIONAL RENDERING: DATA TABLE VS EMPTY STATE (Image 2)
        ========================================================
      */}
      {filteredCustomers.length > 0 ? (
        <>
          {/* PC Table View */}
          <div className="hidden sm:block bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Phone</th>
                    <th className="py-3.5 px-6">Expires</th>
                    <th className="py-3.5 px-6">Remaining</th>
                    <th className="py-3.5 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6">
                        <Link href={`/customers/${c.id}`} className="flex items-center gap-3 group">
                          <div className="w-9 h-9 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                            {c.initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-[#5245E5] transition-colors">{c.name}</p>
                            <p className="text-[11px] text-slate-400 font-normal">{c.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">{c.phone}</td>
                      <td className="py-3.5 px-6 text-slate-600">{c.expires}</td>
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${c.remainingColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                          {c.remainingText}
                        </span>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCustomer({ name: c.name, phone: c.phone, expiry: `${c.expires}, 2026 (${c.remainingText})` })}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5245E5] rounded-xl text-xs font-semibold transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span>Send Reminder</span>
                          </button>

                          <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                            Renew
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="space-y-3 sm:hidden">
            {filteredCustomers.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <Link href={`/customers/${c.id}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-400 font-normal">Expires {c.expires}</p>
                    </div>
                  </Link>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.remainingColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                    {c.remainingText}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedCustomer({ name: c.name, phone: c.phone, expiry: `${c.expires}, 2026 (${c.remainingText})` })}
                    className="flex-1 py-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5245E5] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Send Reminder</span>
                  </button>

                  <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                    Renew
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* 
          ========================================================
          EMPTY STATE (Exact match to Image 2: "You are all caught up")
          ========================================================
        */
        <div className="bg-white rounded-3xl border border-slate-200/70 p-12 sm:p-20 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center text-xl font-bold shadow-inner">
            ✓
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">You are all caught up</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-sm mx-auto leading-relaxed">
              No subscriptions expire in the next 10 days. Check back soon.
            </p>
          </div>
        </div>
      )}

      {/* Send Reminder Modal Component */}
      <SendReminderModal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customerName={selectedCustomer?.name}
        customerPhone={selectedCustomer?.phone}
        customerExpiry={selectedCustomer?.expiry}
        onReminderSent={handleReminderSent}
      />
    </div>
  );
}
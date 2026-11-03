'use client';

import { useState } from 'react';
import Link from 'next/link';
import SendReminderModal from '@/src/components/ui/SendReminderModal';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: 'John Smith',
    phone: '+1 555 012 3456',
    expiry: 'Oct 8, 2026 (3 days left)',
  });

  const handleOpenReminder = (name: string, phone: string, expiry: string) => {
    setSelectedCustomer({ name, phone, expiry });
    setIsModalOpen(true);
  };

  // Sample data with phone numbers
  const expiringSoon = [
    { id: 1, name: 'John Smith', phone: '+1 555 012 3456', initials: 'JS', expires: 'Oct 8', remaining: '3 days left', remainingColor: 'bg-[#FEF3C7] text-[#D97706]' },
    { id: 2, name: 'Michael Brown', phone: '+1 555 012 3457', initials: 'MB', expires: 'Oct 12', remaining: '7 days left', remainingColor: 'bg-[#FEF3C7] text-[#D97706]' },
    { id: 3, name: 'David Lee', phone: '+1 555 012 3458', initials: 'DL', expires: 'Oct 15', remaining: '10 days left', remainingColor: 'bg-[#FEF3C7] text-[#D97706]' },
    { id: 4, name: 'Priya Das', phone: '+1 555 012 3459', initials: 'PD', expires: 'Oct 15', remaining: '10 days left', remainingColor: 'bg-[#FEF3C7] text-[#D97706]' },
  ];

  const recentlyExpired = [
    { id: 1, name: 'Robert Hall', phone: '+1 555 012 3460', initials: 'RH', status: 'Expired 2 days ago' },
    { id: 2, name: 'James Cole', phone: '+1 555 012 3461', initials: 'JC', status: 'Expired 5 days ago' },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* 
        ========================================================
        1. TOP HEADER (Title, Date, Search Bar & Add Customer Button)
        ========================================================
      */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Subtitle */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium md:hidden">Mon, Oct 5</span>
            {/* Mobile Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center md:hidden">
              AO
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5 hidden md:block">
            Monday, October 5, 2026 · Here is who needs your attention today
          </p>
        </div>

        {/* Search & Add Button */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative w-64 lg:w-80">
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

          <Link 
            href="/customers/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs font-semibold rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            <span className="text-base font-medium leading-none">+</span>
            <span>Add Customer</span>
          </Link>
          
        </div>
      </div>

      {/* 
        ========================================================
        2. WARNING / ATTENTION ALERT BANNER
        ========================================================
      */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#92400E]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex-shrink-0 text-[#D97706]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <span className="font-semibold md:hidden">6 customers need your attention</span>
            <span className="font-medium hidden md:inline">
              6 customers need your attention — 4 expire within 10 days and 2 have already expired.
            </span>
          </div>
        </div>

        <button className="hidden md:block px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-sm">
          Review now
        </button>
      </div>

      {/* 
        ========================================================
        3. METRIC CARDS (Desktop Grid vs Mobile Layout)
        ========================================================
      */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span>Total customers</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">30</p>
          <p className="text-[11px] text-slate-400">All saved customers</p>
        </div>

        {/* Active */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Active</span>
          </div>
          <p className="text-3xl font-extrabold text-[#10B981]">24</p>
          <p className="text-[11px] text-slate-400">More than 10 days left</p>
        </div>

        {/* Expiring Soon */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span>Expiring soon</span>
          </div>
          <p className="text-3xl font-extrabold text-[#F59E0B]">4</p>
          <p className="text-[11px] text-slate-400">Within the next 10 days</p>
        </div>

        {/* Expired */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <span>Expired</span>
          </div>
          <p className="text-3xl font-extrabold text-[#EF4444]">2</p>
          <p className="text-[11px] text-slate-400">Follow up to renew</p>
        </div>
      </div>

      {/* Mobile Phone View Metric Cards */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        <div className="bg-[#FEE2E2]/60 p-4 rounded-2xl text-center space-y-1 border border-red-100">
          <p className="text-2xl font-extrabold text-[#DC2626]">2</p>
          <p className="text-xs font-medium text-[#991B1B]">Expired</p>
        </div>
        <div className="bg-[#FEF3C7]/60 p-4 rounded-2xl text-center space-y-1 border border-amber-100">
          <p className="text-2xl font-extrabold text-[#D97706]">4</p>
          <p className="text-xs font-medium text-[#92400E]">Expiring</p>
        </div>
        <div className="bg-[#D1FAE5]/60 p-4 rounded-2xl text-center space-y-1 border border-emerald-100">
          <p className="text-2xl font-extrabold text-[#059669]">24</p>
          <p className="text-xs font-medium text-[#065F46]">Active</p>
        </div>
      </div>

      {/* 
        ========================================================
        4. TABLES & LISTS SECTION
        ========================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Table: Expiring Soon */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden hidden md:block">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Expiring Soon</h3>
            <p className="text-xs text-slate-400">Sorted by days left</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Expires</th>
                  <th className="py-3 px-6">Remaining</th>
                  <th className="py-3 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {expiringSoon.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                        {item.initials}
                      </div>
                      <span className="font-bold text-slate-800">{item.name}</span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500">{item.expires}</td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${item.remainingColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        {item.remaining}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => handleOpenReminder(item.name, item.phone, `${item.expires} (${item.remaining})`)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5245E5] rounded-xl text-xs font-semibold transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>Send Reminder</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Recently Expired */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 space-y-4 hidden md:flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recently Expired</h3>
              <p className="text-xs text-slate-400">Renew or follow up</p>
            </div>

            <div className="divide-y divide-slate-100">
              {recentlyExpired.map((person) => (
                <div key={person.id} className="py-3.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                      {person.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{person.name}</p>
                      <p className="text-[11px] font-medium text-red-500">{person.status}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenReminder(person.name, person.phone, person.status)}
                    className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-sm"
                  >
                    Message
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link href="/expired" className="text-xs font-bold text-[#5245E5] hover:underline flex items-center gap-1 pt-2">
            <span>View all expired</span>
            <span>→</span>
          </Link>
        </div>

        {/* Mobile View List */}
        <div className="space-y-3 md:hidden">
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-base font-extrabold text-slate-900">Needs your attention</h3>
            <Link href="/expiring" className="text-xs font-semibold text-[#5245E5]">
              See all
            </Link>
          </div>

          {recentlyExpired.map((person) => (
            <div key={person.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                  {person.initials}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">{person.name}</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEE2E2] text-[#DC2626]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                    {person.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleOpenReminder(person.name, person.phone, person.status)}
                className="p-2.5 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          ))}

          {expiringSoon.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                  {item.initials}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${item.remainingColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                    {item.remaining}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleOpenReminder(item.name, item.phone, `${item.expires} (${item.remaining})`)}
                className="p-2.5 bg-[#EEF2FF] rounded-xl text-[#5245E5] hover:bg-[#E0E7FF]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          ))}

        </div>

      </div>

      {/* SendReminderModal Integration */}
      <SendReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerName={selectedCustomer.name}
        customerPhone={selectedCustomer.phone}
        customerExpiry={selectedCustomer.expiry}
        onReminderSent={(msg) => {
          console.log('Reminder sent to:', msg);
        }}
      />

    </div>
  );
}
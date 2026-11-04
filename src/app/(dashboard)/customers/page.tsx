'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmptyTest, setIsEmptyTest] = useState(false); // Testing toggle state

  // Sample data from screenshot
  const sampleCustomers = [
    { id: 1, name: 'John Smith', initials: 'JS', email: 'john@email.com', phone: '+1 555 012 3456', startDate: 'Jul 8, 2026', duration: '3 mo', expires: 'Oct 8', status: 'Expiring soon', badge: '3 days left', badgeColor: 'bg-[#FEF3C7] text-[#D97706]' },
    { id: 2, name: 'Michael Brown', initials: 'MB', email: 'michael@email.com', phone: '+1 555 013 7788', startDate: 'Jul 12, 2026', duration: '3 mo', expires: 'Oct 12', status: 'Expiring soon', badge: '7 days left', badgeColor: 'bg-[#FEF3C7] text-[#D97706]' },
    { id: 3, name: 'Sarah Khan', initials: 'SK', email: 'sarah@email.com', phone: '+1 555 019 2210', startDate: 'Oct 5, 2026', duration: '3 mo', expires: 'Jan 5, 2027', status: 'Active', badge: 'Active', badgeColor: 'bg-[#D1FAE5] text-[#059669]' },
    { id: 4, name: 'David Lee', initials: 'DL', email: 'david@email.com', phone: '+1 555 014 6621', startDate: 'Apr 15, 2026', duration: '6 mo', expires: 'Oct 15', status: 'Expiring soon', badge: '10 days left', badgeColor: 'bg-[#FEF3C7] text-[#D97706]' },
    { id: 5, name: 'Emma Wilson', initials: 'EW', email: 'emma@email.com', phone: '+1 555 011 9034', startDate: 'Jun 1, 2026', duration: '12 mo', expires: 'Jun 1, 2027', status: 'Active', badge: 'Active', badgeColor: 'bg-[#D1FAE5] text-[#059669]' },
    { id: 6, name: 'Robert Hall', initials: 'RH', email: 'robert@email.com', phone: '+1 555 017 4410', startDate: 'Apr 3, 2026', duration: '6 mo', expires: 'Oct 3', status: 'Expired', badge: '2 days ago', badgeColor: 'bg-[#FEE2E2] text-[#DC2626]' },
    { id: 7, name: 'James Cole', initials: 'JC', email: 'james@email.com', phone: '+1 555 018 2965', startDate: 'Jan 30, 2026', duration: '6 mo', expires: 'Sep 30', status: 'Expired', badge: '5 days ago', badgeColor: 'bg-[#FEE2E2] text-[#DC2626]' },
  ];


  const customers = isEmptyTest ? [] : sampleCustomers;

  // Filtering logic
  const filteredCustomers = customers.filter(c => {
    const matchesTab = 
      activeTab === 'All' ? true :
      activeTab === 'Active' ? c.status === 'Active' :
      activeTab === 'Expiring soon' || activeTab === 'Expiring' ? c.status === 'Expiring soon' :
      activeTab === 'Expired' ? c.status === 'Expired' : true;

    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Customers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            {customers.length} customers · Manage subscriptions and renewals
          </p>
        </div>

        {/* Action Buttons & Test Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Test Button to toggle empty state */}
          {/* <button
            onClick={() => setIsEmptyTest(!isEmptyTest)}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all"
          >
            {isEmptyTest ? 'Show Sample Data' : 'Test Empty State'}
          </button> */}

                    <div className="hidden sm:block relative w-64 lg:w-80">
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
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <span className="text-base font-medium leading-none">+</span>
            <span>Add Customer</span>
          </Link>

          <Link 
            href="/customers/new"
            className="sm:hidden w-10 h-10 bg-[#5245E5] text-white flex items-center justify-center rounded-xl shadow-md text-xl font-bold ml-auto"
          >
            +
          </Link>
        </div>
      </div>

      {/* 
        ========================================================
        SEARCH BAR & TABS FILTER
        ========================================================
      */}
      <div className="space-y-4">
        <div className="sm:hidden relative">
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { label: 'All', count: customers.length },
              { label: 'Active', count: customers.filter(c => c.status === 'Active').length },
              { label: 'Expiring soon', count: customers.filter(c => c.status === 'Expiring soon').length, mobileLabel: 'Expiring' },
              { label: 'Expired', count: customers.filter(c => c.status === 'Expired').length },
            ].map((tab) => {
              const isSelected = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#5245E5] text-white shadow-sm'
                      : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.mobileLabel || tab.label}</span>
                  <span className={`text-[10px] opacity-80 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 
        ========================================================
        CONDITIONAL RENDERING: EMPTY STATE VS DATA TABLES
        ========================================================
      */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#EEF2FF] text-[#5245E5] flex items-center justify-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No customers yet</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              Add your first customer to start tracking subscriptions and expiry dates.
            </p>
          </div>
          <Link
            href="/customers/new"
            className="px-5 py-2.5 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 mt-2"
          >
            <span className="text-base font-medium leading-none">+</span>
            <span>Add Customer</span>
          </Link>
        </div>
      ) : (
        <>
          {/* PC DATA TABLE */}
          <div className="hidden sm:block bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Phone</th>
                    <th className="py-3.5 px-6">Start Date</th>
                    <th className="py-3.5 px-6">Duration</th>
                    <th className="py-3.5 px-6">Expires</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
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
                      <td className="py-3.5 px-6 text-slate-600">{c.startDate}</td>
                      <td className="py-3.5 px-6 text-slate-600">{c.duration}</td>
                      <td className="py-3.5 px-6 text-slate-600">{c.expires}</td>
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${c.badgeColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full fill-current" />
                          {c.badge}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right space-x-2">
                        {c.status === 'Expired' ? (
                          <>
                            <button className="px-3 py-1.5 bg-[#5245E5] hover:bg-[#4335D6] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
                              Renew
                            </button>
                            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                              Message
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5245E5] rounded-xl text-xs font-semibold transition-colors">
                              Message
                            </button>
                            <button className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                              Renew
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE CUSTOMER CARDS LIST */}
          <div className="space-y-3 sm:hidden">
            {filteredCustomers.map((c) => (
              <Link
                key={c.id}
                href={`/customers/${c.id}`}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between block active:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                    {c.initials}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400 font-normal">
                      {c.status === 'Expired' ? `Expired ${c.expires}` : `Expires ${c.expires}`}
                    </p>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.badgeColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full fill-current" />
                  {c.badge}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExpiredPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data (can be empty array [] to test the exact screenshot empty state)
  const [expiredCustomers, setExpiredCustomers] = useState([
    {
      id: 1,
      name: 'Robert Hall',
      initials: 'RH',
      email: 'robert@email.com',
      phone: '+1 555 017 4410',
      expiredOn: 'Oct 3',
      statusText: '2 days ago',
      badgeColor: 'bg-[#FEE2E2] text-[#DC2626]',
    },
    {
      id: 2,
      name: 'James Cole',
      initials: 'JC',
      email: 'james@email.com',
      phone: '+1 555 018 2965',
      expiredOn: 'Sep 30',
      statusText: '5 days ago',
      badgeColor: 'bg-[#FEE2E2] text-[#DC2626]',
    },
  ]);

  // Filter logic for search
  const filteredCustomers = expiredCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* 
        ========================================================
        1. HEADER (Title, Subtitle & Search Bar)
        ========================================================
      */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Expired
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            {expiredCustomers.length > 0 
              ? `${expiredCustomers.length} subscriptions have expired · Renew them or follow up` 
              : 'No expired subscriptions'}
          </p>
        </div>

        {/* Search input (PC View) */}
        <div className="hidden md:block relative w-64 lg:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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

      {/* 
        ========================================================
        2. MOBILE SEARCH INPUT
        ========================================================
      */}
      <div className="md:hidden relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
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

      {/* 
        ========================================================
        3. CONDITIONAL RENDERING: DATA TABLE VS EMPTY STATE
        ========================================================
      */}
      {filteredCustomers.length > 0 ? (
        <>
          {/* PC / Desktop Data Table */}
          <div className="hidden sm:block bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">Phone</th>
                    <th className="py-3.5 px-6">Expired On</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-6">
                        <Link
                          href={`/customers/${c.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-9 h-9 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                            {c.initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-[#5245E5] transition-colors">
                              {c.name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-normal">
                              {c.email}
                            </p>
                          </div>
                        </Link>
                      </td>

                      <td className="py-3.5 px-6 text-slate-600">{c.phone}</td>
                      <td className="py-3.5 px-6 text-slate-600">{c.expiredOn}</td>

                      <td className="py-3.5 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${c.badgeColor}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                          {c.statusText}
                        </span>
                      </td>

                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5245E5] hover:bg-[#4335D6] text-white rounded-xl text-xs font-semibold shadow-sm transition-all">
                            <svg
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                            </svg>
                            <span>Renew</span>
                          </button>

                          <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                            Message
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Phone View Cards */}
          <div className="space-y-3 sm:hidden">
            {filteredCustomers.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`/customers/${c.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold text-xs flex items-center justify-center">
                      {c.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-400 font-normal">
                        Expired {c.expiredOn}
                      </p>
                    </div>
                  </Link>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.badgeColor}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                    {c.statusText}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <button className="flex-1 py-2 bg-[#5245E5] hover:bg-[#4335D6] text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                    <span>Renew</span>
                  </button>

                  <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* 
          ========================================================
          EMPTY STATE (Exact match to screenshot image)
          ========================================================
        */
        <div className="bg-white rounded-3xl border border-slate-200/70 p-12 sm:p-20 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center text-xl font-bold shadow-inner">
            ✓
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No expired subscriptions</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-sm mx-auto leading-relaxed">
              Every customer subscription is still active.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
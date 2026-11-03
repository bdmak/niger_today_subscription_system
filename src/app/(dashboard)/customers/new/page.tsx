'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddCustomerPage() {
  const router = useRouter();
  
  const [fullName, setFullName] = useState('Sarah Khan');
  const [phone, setPhone] = useState('+1 555 019 2210');
  const [email, setEmail] = useState('sarah@email.com');
  const [startDate, setStartDate] = useState('2026-10-05');
  const [duration, setDuration] = useState('3 months');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/customers');
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 max-w-5xl mx-auto">
      
      {/* Back Link Header */}
      <div>
        <Link 
          href="/customers" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5245E5] hover:underline mb-2"
        >
          <span>←</span>
          <span>Customers</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Add Customer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5 hidden sm:block">
          Save a customer and their subscription. The expiry date is worked out for you.
        </p>
      </div>

      {/* Main Grid: Form Left, Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Form Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Customer Information */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900">Customer information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600">Full name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#5245E5]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600">Phone number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#5245E5]"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-medium text-slate-600">Email</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#5245E5]"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Subscription Section */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 hidden sm:block">Subscription</h2>
              
              {/* Subscription Start Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600">Subscription start date</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#5245E5]"
                  />
                </div>
              </div>

              {/* Subscription Duration Radio Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">Subscription duration</label>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '3 months', mobileLabel: '3 mo', ends: 'Ends Jan 5, 2027' },
                    { label: '6 months', mobileLabel: '6 mo', ends: 'Ends Apr 5, 2027' },
                    { label: '12 months', mobileLabel: '12 mo', ends: 'Ends Oct 5, 2027' },
                  ].map((plan) => {
                    const isSelected = duration === plan.label;
                    return (
                      <button
                        type="button"
                        key={plan.label}
                        onClick={() => setDuration(plan.label)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-[#EEF2FF] border-[#5245E5] ring-1 ring-[#5245E5]'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#5245E5]' : 'border-slate-300'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#5245E5]" />}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">
                            <span className="hidden sm:inline">{plan.label}</span>
                            <span className="sm:hidden">{plan.mobileLabel}</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-normal hidden sm:block pl-5">
                          {plan.ends}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile View Expiration Summary Card */}
            <div className="sm:hidden bg-[#EEF2FF]/70 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#5245E5] font-semibold">Expiration date</p>
                <p className="text-base font-extrabold text-[#5245E5]">Jan 5, 2027</p>
              </div>
              <span className="text-[10px] text-slate-400">Auto-calculated</span>
            </div>

            {/* Submit / Cancel Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Link
                href="/customers"
                className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors hidden sm:block"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>✓</span>
                <span>Add Customer</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Panel: Subscription Summary (Desktop Only - Screenshot 3) */}
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900">Subscription summary</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Start date</span>
              <span className="font-semibold text-slate-800">Oct 5, 2026</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Duration</span>
              <span className="font-semibold text-slate-800">3 months</span>
            </div>
          </div>

          <div className="bg-[#EEF2FF] p-4 rounded-xl space-y-1">
            <p className="text-[11px] text-[#5245E5] font-semibold">Expiration date</p>
            <p className="text-xl font-extrabold text-[#5245E5]">Jan 5, 2027</p>
            <p className="text-[10px] text-slate-400">Calculated automatically</p>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500">Status after saving</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#D1FAE5] text-[#059669]">
              • Active - 92 days left
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
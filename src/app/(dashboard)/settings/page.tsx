'use client';

import { useState } from 'react';
import ChangePasswordModal from '@/src/components/ui/ChangePasswordModal';

export default function SettingsPage() {
  const [name, setName] = useState('Alex Owner');
  const [email, setEmail] = useState('owner@email.com');
  const [isSaved, setIsSaved] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Toggle switch states for reminder settings
  const [remind7Days, setRemind7Days] = useState(true);
  const [remind3Days, setRemind3Days] = useState(true);
  const [remind1Day, setRemind1Day] = useState(true);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 max-w-4xl">
      {/* 
        ========================================================
        1. HEADER (Title & Subtitle)
        ========================================================
      */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
          Manage your account and password.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold">
          Account information saved successfully!
        </div>
      )}

      {/* 
        ========================================================
        2. ACCOUNT CARD
        ========================================================
      */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-7 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">Account</h2>

        <form onSubmit={handleSaveAccount} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5245E5] transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5245E5] transition-all"
              />
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#5245E5] hover:bg-[#4335D6] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>

      {/* 
        ========================================================
        3. PASSWORD CARD
        ========================================================
      */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Password</h2>
          <p className="text-xs text-slate-400 font-normal mt-0.5">
            Use a strong password that only you know.
          </p>
        </div>

        <button 
          onClick={() => setIsPasswordModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Change password</span>
        </button>
      </div>

      {/* 
        ========================================================
        4. REMINDER SETTINGS CARD
        ========================================================
      */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Reminder settings</h2>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Choose when a customer shows up as &ldquo;Expiring soon&rdquo;.
            </p>
          </div>

          <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Optional
          </span>
        </div>

        <div className="space-y-4 pt-1">
          {/* Option 1: 7 days */}
          <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
            <span className="text-xs font-medium text-slate-700">
              Remind me 7 days before expiry
            </span>

            <button
              type="button"
              onClick={() => setRemind7Days(!remind7Days)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                remind7Days ? 'bg-[#5245E5]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  remind7Days ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Option 2: 3 days */}
          <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
            <span className="text-xs font-medium text-slate-700">
              Remind me 3 days before expiry
            </span>

            <button
              type="button"
              onClick={() => setRemind3Days(!remind3Days)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                remind3Days ? 'bg-[#5245E5]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  remind3Days ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Option 3: 1 day */}
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-medium text-slate-700">
              Remind me 1 day before expiry
            </span>

            <button
              type="button"
              onClick={() => setRemind1Day(!remind1Day)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                remind1Day ? 'bg-[#5245E5]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  remind1Day ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal Component */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
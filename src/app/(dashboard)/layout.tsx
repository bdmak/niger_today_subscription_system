'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, Suspense } from 'react';


// Sidebar Menu Configuration
const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    badge: null,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ) 
  },
  { 
    name: 'Customers', 
    href: '/customers', 
    badge: null,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ) 
  },
  { 
    name: 'Expiring', 
    href: '/expiring', 
    badge: { count: 4, color: 'bg-[#F59E0B]' }, // Orange badge from screenshot
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ) 
  },
  { 
    name: 'Expired', 
    href: '/expired', 
    badge: { count: 2, color: 'bg-[#EF4444]' }, // Red badge from screenshot
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ) 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    badge: null,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ) 
  },
];

// Inner component to safely use usePathname inside Suspense boundary
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showMoreMobileMenu, setShowMoreMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FF] flex font-sans antialiased text-slate-800">
      
      {/* 
        ========================================================
        1. PC / DESKTOP SIDEBAR (Visible on lg screens)
        ========================================================
      */}
      <aside className="hidden lg:flex w-64 bg-[#EEF2FF] flex-col justify-between p-6 min-h-screen border-r border-slate-200/60 fixed left-0 top-0 bottom-0 z-30">
        
        <div className="space-y-8">
          {/* Logo Section */}
          <div className="px-2 pt-2">
            <div className="relative w-44 h-16">
              <Image
                src="/logo.png"
                alt="NigerToday TV"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#5245E5] text-white shadow-md shadow-[#5245E5]/25'
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>

                  {/* Badge count */}
                  {item.badge && (
                    <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-full ${item.badge.color}`}>
                      {item.badge.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#5245E5] font-bold flex items-center justify-center text-sm">
              AO
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">Alex Owner</p>
              <p className="text-[10px] font-medium text-slate-400">Business owner</p>
            </div>
          </div>

          <Link href="/login" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>
      </aside>

      {/* 
        ========================================================
        2. MAIN CONTENT AREA
        ========================================================
      */}
      <main className="flex-1 lg:pl-64 pb-24 lg:pb-8 w-full min-h-screen">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* 
        ========================================================
        3. PHONE / MOBILE BOTTOM NAVIGATION
        ========================================================
      */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 px-4 py-2 z-40 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
              pathname === '/dashboard' ? 'text-[#5245E5]' : 'text-slate-400'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/customers"
            className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
              pathname === '/customers' ? 'text-[#5245E5]' : 'text-slate-400'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span>Customers</span>
          </Link>

          <Link
            href="/expiring"
            className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
              pathname === '/expiring' ? 'text-[#5245E5]' : 'text-slate-400'
            }`}
          >
            <div className="relative">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-[#F59E0B] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                4
              </span>
            </div>
            <span>Expiring</span>
          </Link>

          <button
            onClick={() => setShowMoreMobileMenu(!showMoreMobileMenu)}
            className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
              showMoreMobileMenu || pathname === '/expired' || pathname === '/settings' 
                ? 'text-[#5245E5]' 
                : 'text-slate-400'
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span>More</span>
          </button>
        </div>

        {showMoreMobileMenu && (
          <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 w-48 space-y-2 z-50">
            <Link
              href="/expired"
              onClick={() => setShowMoreMobileMenu(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span>Expired</span>
              <span className="bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setShowMoreMobileMenu(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span>Settings</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setShowMoreMobileMenu(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50"
            >
              <span>Logout</span>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}

// Root Dashboard Layout wrapped with Suspense to resolve CLIENT_HOOK_DYNAMIC error
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FF]" />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
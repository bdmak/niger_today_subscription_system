'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FFFFFF] font-sans antialiased">
      <div className="hidden lg:flex lg:w-[50%] relative bg-slate-900 flex-col justify-between p-10 xl:p-14 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/login_bg.jpg"
            alt="TV Dashboard Background"
            fill
            priority
            className="object-cover object-center brightness-75"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>

        <div className="relative z-10">
          <div className="relative w-44 h-16 sm:w-52 sm:h-20">
            <Image
              src="/logo.png"
              alt="NigerToday TV"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        {/* Middle Hero Info & Stats Cards */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto py-8">
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Know who to call today.
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-md font-normal opacity-90">
            Track every customer subscription, see who is expiring, and send renewal reminders in one place.
          </p>

          {/* Stats Cards (Same as screenshot: Green, Orange, Red numbers) */}
          <div className="space-y-3 pt-2">
            {/* Active Customers */}
            <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/60 w-fit min-w-[250px]">
              <span className="text-2xl font-bold text-[#10B981] w-8 text-center">24</span>
              <span className="text-xs font-semibold text-slate-700 tracking-wide">customers active</span>
            </div>

            {/* Expiring This Month */}
            <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/60 w-fit min-w-[250px]">
              <span className="text-2xl font-bold text-[#F59E0B] w-8 text-center">4</span>
              <span className="text-xs font-semibold text-slate-700 tracking-wide">expiring this month</span>
            </div>

            {/* Expired Follow Up */}
            <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/60 w-fit min-w-[250px]">
              <span className="text-2xl font-bold text-[#EF4444] w-8 text-center">2</span>
              <span className="text-xs font-semibold text-slate-700 tracking-wide">expired — follow up</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div className="relative z-10 text-[11px] text-slate-300/80 font-normal">
          Private owner dashboard - Works on phone and computer
        </div>
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-white min-h-screen">
        <div className="w-full max-w-[360px] space-y-7">
          
          <div className="lg:hidden mb-6 flex justify-start">
            <div className="relative w-40 h-16">
              <Image
                src="/logo.png"
                alt="NigerToday TV"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              Log in to manage your customers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-1">
            
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Email or username
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-0.5">
              <a href="#" className="text-xs font-medium text-[#5245E5] hover:underline transition-all">
                Forgot password?
              </a>
            </div>

            {/* Log In Button (Exact purple color from screenshot) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#5245E5] hover:bg-[#4335D6] active:bg-[#3627C4] text-white font-medium rounded-xl transition-all shadow-md text-xs sm:text-sm disabled:opacity-60 flex items-center justify-center mt-3"
            >
              {isLoading ? 'Log in...' : 'Log in'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
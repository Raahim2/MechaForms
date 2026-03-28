"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Plus, ChevronRight, Loader2, Cpu } from 'lucide-react';
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- SECURITY CHECK ---
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('mecha_user');
      
      if (!user) {
        // No user found, kick them to auth
        router.push('/auth');
      } else {
        // User exists, allow them in
        setIsAuthorized(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Nicely format the breadcrumb text
  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return "Overview";
    return parts[parts.length - 1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // --- SHOW LOADER WHILE CHECKING AUTH ---
  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#030303] flex flex-col items-center justify-center gap-4">
        <div className="relative">
            <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative bg-zinc-900 border border-white/5 p-4 rounded-2xl shadow-2xl">
                <Cpu size={32} className="text-violet-500 animate-spin" />
            </div>
        </div>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] animate-pulse">Initializing Mecha OS</p>
      </div>
    );
  }

  // --- IF NOT LOGGED IN, RETURN NOTHING (Middleware will handle redirect) ---
  if (!isAuthorized) return null;

  return (
    <div className="flex min-h-screen bg-[#030303] overflow-hidden text-zinc-400">
      {/* Background Dots & Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full z-0" />

      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
        
        {/* --- UNIVERSAL HEADER --- */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] animate-in fade-in slide-in-from-left-2 duration-500">
             <span className="text-zinc-600">System</span> 
             <ChevronRight size={12} className="text-zinc-800" /> 
             <span className="text-zinc-500">Dashboard</span>
             {pathname !== '/dashboard' && (
               <>
                 <ChevronRight size={12} className="text-zinc-800" /> 
                 <span className="text-white tracking-widest">{getPageTitle()}</span>
               </>
             )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Node Live</span>
            </div>
            
            <Link href="/dashboard/vault">
              <button className="bg-white/5 border border-white/10 text-white p-2 rounded-xl hover:bg-white/10 transition-all active:scale-95">
                <Plus size={18} />
              </button>
            </Link>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-zinc-800 border border-white/10 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              RM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #27272a; }
      `}</style>
    </div>
  );
}
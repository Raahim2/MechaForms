"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Plus, 
  Globe, 
  Fingerprint,
  Cpu,
  ShieldCheck,
  Database,
  ArrowRight,
  Activity,
  Server,
  Layers,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';

import StatCard from '@/components/StatCard';

export default function MechaDashboard() {
  const [user, setUser] = useState({ username: 'Engineer', email: '' });
  const [shortcuts, setShortcuts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userStr = localStorage.getItem('mecha_user');
      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        setUser(parsedUser);

        try {
          const response = await fetch(`https://mechaforms-api.vercel.app/vault/list/${parsedUser.email}`);
          const data = await response.json();
          setShortcuts(data);
        } catch (err) {
          console.error("Dashboard sync error:", err);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#030303]">
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Mecha Dashboard
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Manage your keyboard shortcuts and AI configurations.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Extension Synced</span>
            </div>
            <Link href="/dashboard/vault">
              <button className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg">
                <Plus size={18} className="inline mr-1" /> New Shortcut
              </button>
            </Link>
          </div>
        </div>

        {/* --- CORE STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Active Shortcuts" 
            value={isLoading ? "..." : shortcuts.length} 
            change="Registry" 
            icon={<Layers className="text-violet-400" size={16}/>} 
          />
          <StatCard 
            label="AI Model" 
            value="Gemini 1.5" 
            change="Connected" 
            icon={<Cpu className="text-blue-400" size={16}/>} 
          />
          <StatCard 
            label="Data Security" 
            value="Encrypted" 
            change="Local-First" 
            icon={<ShieldCheck className="text-emerald-400" size={16}/>} 
          />
        </div>

        <div className="grid gap-8">
          
          {/* --- SHORTCUTS PREVIEW --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   Your Shortcuts
                </h2>
                <Link href="/dashboard/vault" className="text-[10px] font-bold text-violet-500 hover:text-violet-400 uppercase tracking-widest transition-colors">
                    Manage All &rarr;
                </Link>
            </div>

            <div className="bg-zinc-900/20 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-md">
                {shortcuts.length > 0 ? (
                    <div className="divide-y divide-white/5">
                        {shortcuts.slice(0, 5).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-violet-400 transition-colors">
                                        <Fingerprint size={18} />
                                    </div>
                                    <div>
                                        <p className="text-violet-400 font-mono text-sm font-bold">@{item.key}</p>
                                        <p className="text-[10px] text-zinc-600 font-medium">{item.cat || 'General'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                    <CheckCircle2 size={12} className="text-emerald-500/50" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Verified</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-24 text-center space-y-4">
                        <Database size={32} className="mx-auto text-zinc-800" />
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest font-mono">No data in registry</p>
                    </div>
                )}
            </div>
          </div>

         
        </div>

        {/* --- MARKETPLACE PROMO --- */}
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.1),transparent_50%)]" />
            <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-violet-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                    <Zap size={14} fill="currentColor" /> Community
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Expand your Shortcut Library.</h3>
                <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
                    Install specialized packs for developers, designers, and recruiters. Get pre-configured triggers for your favorite platforms.
                </p>
            </div>
            <Link href="/dashboard/extensions" className="relative z-10">
                <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-3">
                    View Marketplace <ArrowRight size={18} />
                </button>
            </Link>
        </div>

      </main>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #18181b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #27272a; }
      `}</style>
    </div>
  );
}

function StatusNode({ icon, label, status }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-black border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <span className="text-sm font-bold text-zinc-300 tracking-tight">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{status}</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
            </div>
        </div>
    );
}
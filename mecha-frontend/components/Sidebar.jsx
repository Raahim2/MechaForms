"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Layers, Zap, Shield, Settings, 
  Globe, Smartphone, Cpu, Database, Activity, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Helper to check if link is active
  const isActive = (path) => pathname === path;

  return (
    <aside 
      className={`relative z-20 hidden lg:flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* --- COLLAPSE TOGGLE BUTTON --- */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/50 transition-all z-50 shadow-xl"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* --- LOGO SECTION --- */}
      <div className={`p-6 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="bg-linear-to-br from-violet-500 to-fuchsia-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0">
          <Cpu size={18} className="text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-white font-bold tracking-tighter text-lg uppercase animate-in fade-in duration-500">
            Mecha
          </span>
        )}
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <SidebarLink 
          href="/dashboard" 
          icon={<LayoutDashboard size={18}/>} 
          label="Overview" 
          active={isActive('/dashboard')} 
          collapsed={isCollapsed} 
        />
        <SidebarLink 
          href="/dashboard/vault" 
          icon={<Database size={18}/>} 
          label="Identity Vault" 
          active={isActive('/dashboard/vault')} 
          collapsed={isCollapsed} 
        />
       <SidebarLink 
          href="/dashboard/extensions" 
          icon={<Layers size={18}/>} 
          label="Extensions" 
          active={isActive('/dashboard/extensions')} 
          collapsed={isCollapsed} 
        />
        <SidebarLink 
          href="/dashboard/agent" 
          icon={<Smartphone size={18}/>} 
          label="Agent" 
          active={isActive('/dashboard/agent')} 
          collapsed={isCollapsed} 
        />

        {/* System Header */}
        {!isCollapsed ? (
          <div className="pt-6 pb-2 px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] animate-in fade-in duration-500">
            System
          </div>
        ) : (
          <div className="h-px bg-white/5 my-4 mx-2" />
        )}

        <SidebarLink 
          href="/dashboard/analytics" 
          icon={<Activity size={18}/>} 
          label="Analytics" 
          active={isActive('/dashboard/analytics')} 
          collapsed={isCollapsed} 
        />
        <SidebarLink 
          href="/dashboard/security" 
          icon={<Shield size={18}/>} 
          label="Security" 
          active={isActive('/dashboard/security')} 
          collapsed={isCollapsed} 
        />
        <SidebarLink 
          href="/dashboard/settings" 
          icon={<Settings size={18}/>} 
          label="Settings" 
          active={isActive('/dashboard/settings')} 
          collapsed={isCollapsed} 
        />
      </nav>

      {/* --- USAGE CARD --- */}
      <div className="p-4 mt-auto border-t border-white/5 bg-white/2">
        <div className={`bg-zinc-900/50 rounded-xl border border-white/5 transition-all ${isCollapsed ? 'p-2 flex flex-col items-center' : 'p-4'}`}>
          {!isCollapsed ? (
            <div className="animate-in fade-in duration-500">
              <p className="text-[10px] text-zinc-500 mb-2 uppercase font-bold tracking-wider">Usage Plan</p>
              <div className="h-1.5 bg-zinc-800 rounded-full mb-2 overflow-hidden">
                <div className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 w-[65%]" />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-zinc-400 font-medium">6,521 fills</p>
                <p className="text-[10px] text-white font-bold">Pro</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-square flex items-center justify-center">
               {/* Minimal icon/progress for collapsed view */}
               <Zap size={14} className="text-violet-400" />
               <div className="absolute inset-0 border-2 border-violet-500/20 rounded-lg" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// Internal SidebarLink Component for cleaner code
function SidebarLink({ href, icon, label, active, collapsed }) {
  return (
    <Link href={href} className="block group">
      <div className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
        ${active 
          ? 'bg-violet-500/10 text-white shadow-[inset_0_0_10px_rgba(139,92,246,0.05)] border border-violet-500/20' 
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent'}
        ${collapsed ? 'justify-center' : ''}
      `}>
        <span className={`${active ? 'text-violet-400' : 'group-hover:text-zinc-300'} transition-colors shrink-0`}>
          {icon}
        </span>
        
        {!collapsed && (
          <span className="text-sm font-bold tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
            {label}
          </span>
        )}

        {active && !collapsed && (
          <div className="ml-auto w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        )}
      </div>
    </Link>
  );
}
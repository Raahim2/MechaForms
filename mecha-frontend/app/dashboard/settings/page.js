"use client";
import React, { useState } from 'react';
import { Cpu, User, Key, Globe, LogOut, Bell, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full space-y-12 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tighter italic">System<span className="text-violet-500">.</span>Settings</h1>
        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">Configure your engine and account preferences</p>
      </div>

      {/* API Configuration */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-violet-400">
          <Cpu size={18} />
          <h2 className="text-sm font-bold uppercase tracking-widest">Engine Configuration</h2>
        </div>
        <div className="bg-zinc-900/20 border border-white/5 rounded-[32px] p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Gemini AI Key</label>
            <input 
              type="password" 
              defaultValue="AIzaSyAd4bosZRpKUvJ-8_..." 
              className="w-full bg-black border border-white/10 rounded-2xl py-4 px-5 text-white font-mono text-sm focus:border-violet-500 outline-none transition-all"
            />
            <p className="text-[9px] text-zinc-600 ml-1 italic">Used for @ai and @fix protocols.</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-zinc-500" />
              <span className="text-sm font-medium text-zinc-300">Enable Extension Sync</span>
            </div>
            <div className="w-10 h-5 bg-violet-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="pt-10 border-t border-white/5">
        <div className="flex items-center gap-2 text-red-500/50 mb-6">
          <ShieldAlert size={18} />
          <h2 className="text-sm font-bold uppercase tracking-widest">Danger Zone</h2>
        </div>
        <div className="bg-red-500/5 border border-red-500/10 rounded-[32px] p-8 flex justify-between items-center">
          <div>
            <h4 className="text-white font-bold text-sm">Purge Account</h4>
            <p className="text-zinc-500 text-xs mt-1">Permanently delete your vault and all history.</p>
          </div>
          <button className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
            Delete Data
          </button>
        </div>
      </section>
      
      <button className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mx-auto">
        <LogOut size={14} /> Sign Out Session
      </button>
    </div>
  );
}
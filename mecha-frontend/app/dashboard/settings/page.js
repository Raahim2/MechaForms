"use client";
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Zap, 
  Cpu, 
  Lock, 
  Bell, 
  Globe, 
  Database, 
  Smartphone, 
  LogOut, 
  Trash2, 
  RefreshCw,
  Eye,
  Key,
  Keyboard,
  MousePointer2
} from 'lucide-react';

export default function MechaSettings() {
  const [stealthMode, setStealthMode] = useState(true);
  const [aiSpeed, setAiSpeed] = useState(80);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* --- HEADER --- */}
      <div className="space-y-1 border-b border-white/5 pb-8">
        <h1 className="text-4xl font-bold text-white tracking-tighter italic">
          System<span className="text-violet-500">.</span>Preferences
        </h1>
        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
          Configure Engine Behavior & Security Protocols
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* --- LEFT COLUMN: NAVIGATION --- */}
        <div className="space-y-1">
          <SettingsTab icon={<User size={16}/>} label="Account Profile" active />
          <SettingsTab icon={<Cpu size={16}/>} label="AI Engine" />
          <SettingsTab icon={<Keyboard size={16}/>} label="Extension Logic" />
          <SettingsTab icon={<Shield size={16}/>} label="Security & Privacy" />
          <SettingsTab icon={<Zap size={16}/>} label="Subscription" />
          <div className="pt-10">
            <button className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all w-full text-sm font-bold uppercase tracking-widest">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* --- CENTER & RIGHT: SETTINGS FORM --- */}
        <div className="md:col-span-2 space-y-12">
          
          {/* Section: AI Intelligence */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
                <Cpu className="text-violet-500" size={18} />
                <h2 className="text-white font-bold tracking-tight">AI Engine Configuration</h2>
            </div>
            
            <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Preferred Model</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-violet-600 text-white p-3 rounded-xl text-xs font-bold shadow-lg shadow-violet-600/20">Gemini Flash 1.5</button>
                        <button className="bg-white/5 text-zinc-500 p-3 rounded-xl text-xs font-bold border border-white/5 hover:border-white/10">GPT-4o Mini</button>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h4 className="text-white text-sm font-bold">Stealth Injection</h4>
                            <p className="text-zinc-500 text-xs">Simulate human-like typing patterns to avoid detection.</p>
                        </div>
                        <ToggleButton enabled={stealthMode} onClick={() => setStealthMode(!stealthMode)} />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Injection Velocity</label>
                        <span className="text-[10px] font-mono text-violet-400">{aiSpeed}ms / char</span>
                    </div>
                    <input 
                        type="range" 
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                        value={aiSpeed}
                        onChange={(e) => setAiSpeed(e.target.value)}
                    />
                </div>
            </div>
          </section>

          {/* Section: Extension Synchronization */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
                <Globe className="text-blue-400" size={18} />
                <h2 className="text-white font-bold tracking-tight">Extension Handshake</h2>
            </div>
            
            <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 space-y-6">
                <div className="flex items-center gap-6 p-4 bg-violet-500/5 border border-violet-500/10 rounded-2xl">
                    <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                        <Key className="text-white" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm">Active Pairing Key</p>
                        <p className="text-[10px] text-zinc-500 font-mono truncate">mch_pair_9920_x12_secure_88</p>
                    </div>
                    <button className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-all">
                        <RefreshCw size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center">
                        <span className="text-xs text-zinc-400">Trigger Character</span>
                        <code className="bg-violet-500/20 text-violet-400 px-2 py-1 rounded text-xs">@</code>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center">
                        <span className="text-xs text-zinc-400">Auto-Detect Forms</span>
                        <ToggleButton enabled={true} />
                    </div>
                </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-10 space-y-4">
             <div className="flex items-center gap-2 text-red-500/50 uppercase tracking-[0.2em] font-black text-[10px]">
                <Shield size={14} /> Danger Zone
             </div>
             <div className="bg-red-500/5 border border-red-500/10 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                    <h4 className="text-white font-bold">Purge Identity Vault</h4>
                    <p className="text-zinc-500 text-xs">Instantly delete all shortcuts and encrypted data.</p>
                </div>
                <button className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3 rounded-xl text-xs font-bold transition-all border border-red-500/20">
                    Purge All Data
                </button>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SettingsTab({ icon, label, active = false }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
        ? 'bg-violet-600/10 text-white border border-violet-500/20 shadow-lg shadow-violet-900/10' 
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
    }`}>
      <span className={active ? 'text-violet-400' : ''}>{icon}</span>
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function ToggleButton({ enabled, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`w-10 h-5 rounded-full relative transition-all duration-300 ${enabled ? 'bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.4)]' : 'bg-zinc-800'}`}
        >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${enabled ? 'left-6' : 'left-1'}`} />
        </button>
    );
}
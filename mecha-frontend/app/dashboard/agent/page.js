"use client";
import React, { useState } from 'react';
import { 
  Bot, 
  Rocket, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Terminal, 
  Search, 
  ChevronRight, 
  Cpu, 
  Activity, 
  Plus,
  Settings2,
  ExternalLink,
  Loader2,
  Boxes
} from 'lucide-react';

const OFFICIAL_AGENTS = [
  {
    id: 'gh-agent',
    name: 'Greenhouse Core',
    protocol: 'GH-DOM v2.4',
    reliability: '99.9%',
    status: 'Operational',
    description: 'Autonomous engine for Greenhouse boards. Handles multi-step questions and file synchronization.',
    icon: <Cpu className="text-emerald-400" />,
    color: 'from-emerald-500/20'
  },
  {
    id: 'ashby-agent',
    name: 'Ashby Direct',
    protocol: 'ASB-REST v1.2',
    reliability: '98.4%',
    status: 'Syncing',
    description: 'Direct bridge for Ashby systems. Optimized for high-speed recruitment data injection.',
    icon: <Bot className="text-violet-400" />,
    color: 'from-violet-500/20'
  },
  {
    id: 'lever-agent',
    name: 'Leverage Engine',
    protocol: 'LVR-Static v0.9',
    reliability: '92.1%',
    status: 'Operational',
    description: 'Specialized scraper for Lever job postings. Bypasses standard bot detection headers.',
    icon: <Boxes className="text-orange-400" />,
    color: 'from-orange-500/20'
  },
  {
    id: 'workday-agent',
    name: 'Workday Pro',
    protocol: 'WD-Legacy v4.1',
    reliability: '88.0%',
    status: 'Experimental',
    description: 'Heavy-duty agent designed for complex Workday nested iFrames and secure portals.',
    icon: <ShieldCheck className="text-blue-400" />,
    color: 'from-blue-500/20'
  }
];

export default function AgentHangar() {
  const [activeTab, setActiveTab] = useState('hangar'); // 'hangar' or 'active'
  const [url, setUrl] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => setIsLaunching(false), 3000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-10 animate-in fade-in duration-700">
      
      {/* --- AGENT MISSION CONTROL (TOP DOCK) --- */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-zinc-900 border border-white/10 rounded-[40px] p-10 overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5"><Rocket size={150} /></div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest">
                        <Activity size={12} className="animate-pulse" /> Mission Control Ready
                    </div>
                    <h1 className="text-5xl font-bold text-white tracking-tighter italic">
                        Deploy<span className="text-violet-500">.</span>Agent
                    </h1>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                        Paste a destination URL. Mecha will intelligently select the optimized agent to execute the autofill mission.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="relative group/input">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-violet-400 transition-colors" size={20} />
                        <input 
                            type="text" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://job-boards.greenhouse.io/mission-id..."
                            className="w-full bg-black border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-white focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm shadow-2xl"
                        />
                    </div>
                    <button 
                        onClick={handleLaunch}
                        disabled={isLaunching || !url}
                        className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50"
                    >
                        {isLaunching ? (
                            <><Loader2 className="animate-spin" size={18} /> Initializing Engine</>
                        ) : (
                            <><Rocket size={18} /> Launch Autofill Mission</>
                        )}
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* --- AGENT REGISTRY --- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                <Terminal size={20} className="text-violet-500" />
                Neural Agent Registry
            </h2>
            <div className="flex gap-2">
                <div className="bg-zinc-900 border border-white/5 p-1 rounded-xl flex gap-1">
                    <button className="px-4 py-1.5 text-[10px] font-bold bg-white/10 text-white rounded-lg shadow-lg">Official</button>
                    <button className="px-4 py-1.5 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors">Custom</button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {OFFICIAL_AGENTS.map((agent) => (
                <div key={agent.id} className="group relative bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 hover:border-violet-500/30 transition-all overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-8">
                        <div className="w-16 h-16 bg-black rounded-[20px] border border-white/10 flex items-center justify-center shadow-2xl shrink-0 group-hover:scale-110 transition-transform duration-500">
                            {agent.icon}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{agent.name}</h3>
                                    <p className="text-violet-400 font-mono text-[10px] font-bold mt-0.5">{agent.protocol}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                                    agent.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' : 
                                    agent.status === 'Syncing' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
                                }`}>
                                    <div className={`w-1 h-1 rounded-full ${
                                        agent.status === 'Operational' ? 'bg-emerald-500' : 
                                        agent.status === 'Syncing' ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'
                                    }`} />
                                    {agent.status}
                                </div>
                            </div>

                            <p className="text-zinc-500 text-xs leading-relaxed">
                                {agent.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Reliability</span>
                                    <p className="text-white font-bold text-sm">{agent.reliability}</p>
                                </div>
                                <div className="flex justify-end items-end gap-2">
                                    <button className="p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all">
                                        <Settings2 size={16} />
                                    </button>
                                    <button className="px-4 py-2 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2">
                                        Configure <ChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- SYSTEM LOGS FOOTER --- */}
      <div className="bg-black border border-white/5 rounded-[32px] p-6 flex items-center justify-between group overflow-hidden relative">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
                  <Activity size={14} className="text-emerald-500" />
                  Global Agent Pulse
              </div>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="font-mono text-[10px] text-zinc-600 flex gap-4 animate-in slide-in-from-right duration-1000">
                  <span>[SYSTEM] gh-agent: DOM_MAP_SUCCESS in 142ms</span>
                  <span className="hidden md:inline">[NETWORK] asb-bridge: Handshake verified 0x92...F2</span>
                  <span className="hidden lg:inline text-violet-500">[AI] gemini-flash: Latency optimal</span>
              </div>
          </div>
          <button className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-zinc-500 hover:text-white transition-colors">
              <ExternalLink size={14} />
          </button>
      </div>

    </div>
  );
}

function StepIndicator({ num, label, active }) {
  return (
    <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-20'}`}>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm border ${
        active 
        ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
        : 'bg-zinc-900 border-white/10 text-zinc-500'
      }`}>
        {num}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap text-zinc-400">{label}</span>
    </div>
  );
}
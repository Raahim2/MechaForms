"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, ShieldCheck, Trash2, 
  Copy, Eye, EyeOff, X, Database, 
  PlusCircle, CheckCircle2, Loader2, 
  Sparkles, Terminal, Cpu, Zap, Fingerprint,
  Monitor
} from 'lucide-react';

export default function IdentityVault() {
  const [activeTab, setActiveTab] = useState("User"); // "User" or "System"
  const [searchQuery, setSearchQuery] = useState("");
  const [showValues, setShowValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vaultItems, setVaultItems] = useState([]);

  const [newShortcut, setNewShortcut] = useState({ key: '', val: '' });

  const systemShortcuts = [
    { key: 'ai', name: 'Generative AI', desc: 'Triggers content generation via period (.) command.' },
    { key: 'fix', name: 'Grammar Correction', desc: 'Auto-corrects spelling and syntax errors.' }
  ];

  useEffect(() => {
    const fetchVault = async () => {
      const userStr = localStorage.getItem('mecha_user');
      if (!userStr) return;
      const user = JSON.parse(userStr);

      try {
        const response = await fetch(`https://mechaforms-api.vercel.app/vault/list/${user.email}`);
        const data = await response.json();
        setVaultItems(data);
      } catch (err) {
        console.error("Connection error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVault();
  }, []);

  const handleAddShortcut = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('mecha_user'));
    setIsSyncing(true);

    try {
      const response = await fetch('https://mechaforms-api.vercel.app/vault/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          key: newShortcut.key,
          val: newShortcut.val,
          cat: "Personal"
        })
      });

      const data = await response.json();
      if (response.ok) {
        setVaultItems([{ id: data.id, ...newShortcut }, ...vaultItems]);
        setNewShortcut({ key: '', val: '' });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://mechaforms-api.vercel.app/vault/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) setVaultItems(vaultItems.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = vaultItems.filter(item => 
    item.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-violet-500" size={24} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Identity Vault</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your shortcuts and core engine protocols.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-95"
        >
          <Plus size={18} /> New Shortcut
        </button>
      </div>

      {/* NAVIGATION & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/5 pb-6">
        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab("User")}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "User" ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            User Created
          </button>
          <button
            onClick={() => setActiveTab("System")}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "System" ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            System Defaults
          </button>
        </div>

        {activeTab === "User" && (
          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <input 
              type="text" 
              placeholder="Search keys..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        )}
      </div>

      {/* --- CONTENT AREA: USER SHORTCUTS --- */}
      {activeTab === "User" && (
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="group bg-zinc-900/20 border border-white/5 rounded-2xl p-5 hover:bg-zinc-900/40 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-48">
                      <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest block mb-1">Shortcut Key</span>
                      <span className="text-violet-400 font-mono text-sm font-bold">@{item.key}</span>
                    </div>
                    <div className="h-8 w-px bg-white/5" />
                    <div>
                      <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest block mb-1">Value</span>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-300 font-mono text-sm">
                          {showValues[item.id] ? item.val : '••••••••••••••••'}
                        </span>
                        <button onClick={() => setShowValues(p => ({...p, [item.id]: !p[item.id]}))} className="text-zinc-600 hover:text-white transition-colors">
                          {showValues[item.id] ? <EyeOff size={14}/> : <Eye size={14}/>}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigator.clipboard.writeText(item.val)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                      <Copy size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[32px]">
              <Database size={32} className="mx-auto text-zinc-800 mb-4" />
              <p className="text-zinc-500 text-sm font-medium">No user-created shortcuts found.</p>
              <button onClick={() => setIsModalOpen(true)} className="text-violet-500 text-xs font-bold uppercase mt-2 hover:underline">Add First Item</button>
            </div>
          )}
        </div>
      )}

      {/* --- CONTENT AREA: SYSTEM DEFAULTS --- */}
      {activeTab === "System" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemShortcuts.map((item) => (
            <div key={item.key} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div className="bg-violet-500/10 text-violet-400 font-mono text-sm font-bold px-3 py-1 rounded-lg border border-violet-500/20">
                  @{item.key}
                </div>
                <div className="bg-zinc-800 px-2 py-1 rounded text-[9px] font-black text-zinc-500 uppercase tracking-tighter">Core Engine</div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                <p className="text-zinc-500 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40">
          <div className="bg-[#0c0c0c] border border-white/10 w-full max-w-lg rounded-[32px] p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold text-white">Create Shortcut</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={20}/></button>
            </div>

            <form onSubmit={handleAddShortcut} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Trigger Key</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500 font-bold">@</span>
                  <input required value={newShortcut.key} onChange={(e) => setNewShortcut({...newShortcut, key: e.target.value.toLowerCase().replace(/\s/g, '_')})}
                    placeholder="shortcut_name" className="w-full bg-black border border-white/5 rounded-xl py-4 pl-8 pr-4 text-white focus:outline-none focus:border-violet-500/50 transition-all font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Content Value</label>
                <textarea required value={newShortcut.val} onChange={(e) => setNewShortcut({...newShortcut, val: e.target.value})}
                  placeholder="The data to be expanded..." className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-violet-500/50 transition-all min-h-[120px]" />
              </div>

              <button disabled={isSyncing} className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                {isSyncing ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                Save Node
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
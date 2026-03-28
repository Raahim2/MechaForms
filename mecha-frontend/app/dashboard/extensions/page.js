"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// Import all icons as a single object to map backend strings
import * as Icons from 'lucide-react';
import { 
  Search, Users, Star, ArrowRight,
  SlidersHorizontal, Loader2, Cpu
} from 'lucide-react';

const CATEGORIES = ["All", "Development", "Sales", "Medical", "Productivity"];

export default function ExtensionMarketplace() {
  const [activeTab, setActiveTab] = useState("All");
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // --- FETCH FROM RAILWAY ---
  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const res = await fetch('https://fastapi-production-7b28f.up.railway.app/extensions/list');
        if (!res.ok) throw new Error("Failed to fetch extensions");
        const data = await res.json();
        setExtensions(data);
      } catch (err) {
        console.error("Marketplace Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExtensions();
  }, []);

  // --- DYNAMIC ICON RESOLVER ---
  // This takes the string "Code2" from your DB and returns the Lucide Component
  const getIcon = (iconName) => {
    const LucideIcon = Icons[iconName];
    return LucideIcon ? <LucideIcon size={22} /> : <Icons.Blocks size={22} />;
  };

  const filteredExtensions = extensions.filter(e => {
    const matchesTab = activeTab === "All" || e.category === activeTab;
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen text-zinc-400 font-sans selection:bg-violet-500/30">
      <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-12">
        
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
              Extensions
            </h1>
            <p className="text-zinc-500 max-w-md text-balance">
              Enhance your Mecha workspace with specialized tools and community-built protocols.
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search extensions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all w-full md:w-72"
            />
          </div>
        </header>

        {/* --- FILTER BAR --- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === cat 
                    ? "bg-zinc-800 text-zinc-100 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-zinc-800 mx-2" />
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
            <SlidersHorizontal size={14} />
            Advanced
          </button>
        </div>

        {/* --- GRID LAYOUT --- */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
             <Loader2 className="animate-spin text-violet-500" size={32} />
             <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 font-mono">Syncing_Marketplace_Registry</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode='popLayout'>
              {filteredExtensions.map((ext) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={ext.id}
                >
                  <Link href={`/dashboard/extensions/${ext.id}`} className="group block h-full">
                    <div className="relative h-full bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col">
                      
                      {/* Icon & Category */}
                      <div className="flex justify-between items-start mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 bg-violet-500/10 text-violet-500"
                        >
                          {getIcon(ext.icon)}
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                          {ext.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-zinc-100 group-hover:text-white transition-colors">
                                {ext.name}
                            </h3>
                            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter italic">by {ext.author}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-500 line-clamp-2 italic">
                          {ext.tagline}
                        </p>
                      </div>

                      {/* Footer / Stats */}
                      <div className="mt-8 pt-5 border-t border-zinc-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
                            <Users size={14} className="text-zinc-600" />
                            {ext.installs}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
                            <Star size={14} className="text-amber-500/80 fill-amber-500/20" />
                            4.9
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs font-semibold text-violet-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          Inspect <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>
        )}

        {/* --- BOTTOM CTA --- */}
        <section className="mt-20 p-8 rounded-[2rem] bg-gradient-to-b from-zinc-900/50 to-transparent border border-zinc-800/50 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-medium text-zinc-200 italic">Open Source Contribution</h2>
            <p className="text-sm text-zinc-500">
              Mecha is built on community protocols. Share your specialized keyboard shortcuts with the world.
            </p>
            <button className="mt-4 px-6 py-2 bg-zinc-100 text-zinc-900 text-sm font-semibold rounded-full hover:bg-white transition-colors">
              Submit Protocol
            </button>
          </div>
        </section>
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
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap text-zinc-400">{label}</span>
      </div>
    );
}
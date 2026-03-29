"use client";
import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ExtensionCard from '@/components/Extentions/ExtentionCard'; // Import your new component

const CATEGORIES = ["All", "Development", "Sales", "Medical", "Productivity"];

export default function ExtensionMarketplace() {
  const [activeTab, setActiveTab] = useState("All");
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const res = await fetch('https://mechaforms-api.vercel.app/extensions/list');
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
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">Extensions</h1>
            <p className="text-zinc-500 max-w-md">Enhance your Mecha workspace with specialized tools and community protocols.</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search extensions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full md:w-72"
            />
          </div>
        </header>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === cat ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"
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

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
             <Loader2 className="animate-spin text-violet-500" size={32} />
             <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 font-mono">Syncing_Registry</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode='popLayout'>
              {filteredExtensions.map((ext) => (
                <ExtensionCard 
                  key={ext.id} 
                  ext={ext} 
                  icon={getIcon(ext.icon)} 
                />
              ))}
            </AnimatePresence>
          </section>
        )}

        <section className="mt-20 p-8 rounded-[2rem] bg-gradient-to-b from-zinc-900/50 to-transparent border border-zinc-800/50 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-medium text-zinc-200 italic">Open Source Contribution</h2>
            <p className="text-sm text-zinc-500">Mecha is built on community protocols. Share your specialized keyboard shortcuts.</p>
            <button className="mt-4 px-6 py-2 bg-zinc-100 text-zinc-900 text-sm font-semibold rounded-full hover:bg-white transition-colors">
              Submit Protocol
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Clock, Layers,  ArrowRight,
  PieChart as  Globe
} from 'lucide-react';

import DailyGraph from "@/components/Dashboard/DailyGraph";
import StatCard from '@/components/Dashboard/StatCard';
import Shortcuts from '@/components/Dashboard/Shortcuts';
import PieChart from '@/components/Dashboard/PieChart';

export default function MechaDashboard() {

  return (
    <div className="flex-1 flex flex-col min-h-screen  text-zinc-400">
      <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-700">
        
        {/* --- TOP STAT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Total Injections" 
            value="12,482" 
            trend="+2.1h" 
            icon={<Zap size={18} className="text-violet-500" />} 
          />
          <StatCard 
            label="Human Hours Saved" 
            value="17.4h" 
            icon={<Clock size={18} className="text-blue-400" />} 
          />
          <StatCard 
            label="Shortcuts Made" 
            value="7" 
            icon={<Layers size={18} className="text-emerald-400" />} 
          />
        </div>

        {/* --- USAGE GRAPH (FULL WIDTH) --- */}
        <DailyGraph />

        {/* --- LOWER SECTION: PIE CHART & SHORTCUT REGISTRY --- */}
        <div className="grid lg:grid-cols-3 gap-6">
            
            <PieChart />

            <Shortcuts />
        </div>

        {/* --- EXPLORE MARKETPLACE (CLEAN) --- */}
        <div className="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex items-center justify-between group hover:border-violet-500/20 transition-all cursor-pointer">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white">Explore Marketplace</h4>
                    <p className="text-zinc-500 text-sm">Download specialized shortcut cartridges for your workflow.</p>
                </div>
            </div>
            <ArrowRight size={24} className="text-zinc-700 group-hover:text-white transition-colors" />
        </div>

      </main>
    </div>
  );
}


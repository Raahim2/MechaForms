"use client";
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[13px] font-medium mb-8 animate-fade-in">
               <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
               V2.0 Engine is now in production
             </div>
             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
               Forms filled <br />
               <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">automatically.</span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 mb-10 leading-relaxed">
               Mecha is the invisible layer for your platform and mobile apps. 
               Identify, map, and inject data into any web form with military precision.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(124,58,237,0.25)] transition-all flex items-center justify-center gap-2">
                 Start Building <ArrowRight size={20} />
               </button>
               <button className="w-full sm:w-auto border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
                 Read Documentation
               </button>
             </div>
           </section>
  );
}
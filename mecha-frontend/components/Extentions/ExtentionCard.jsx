"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Star, ArrowRight } from 'lucide-react';

export default function ExtensionCard({ ext, icon }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/dashboard/extensions/${ext.id}`} className="group block h-full">
        <div className="relative h-full bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col">
          
          {/* Icon & Category */}
          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 bg-violet-500/10 text-violet-500"
            >
              {icon}
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
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter italic">
                by {ext.author}
              </span>
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
             
            </div>
            
            <div className="flex items-center gap-1 text-xs font-semibold text-violet-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              Inspect <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
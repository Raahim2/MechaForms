"use client";
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
} from 'lucide-react';


export default function DailyGraph() {
 
  return (
    <div className="lg:col-span-2 bg-zinc-900/20 border border-white/5 rounded-[32px] p-8 space-y-6 backdrop-blur-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-violet-500" />
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">Expansion Velocity</h2>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Last 7 Days</span>
            </div>
            
            {/* Simple CSS-based Sparkline Graph */}
            <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
                {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                    <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="flex-1 bg-gradient-to-t from-violet-600/40 to-violet-400/80 rounded-t-lg relative group"
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {height * 12}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between px-1 text-[9px] font-black text-zinc-600 uppercase">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
  );
}

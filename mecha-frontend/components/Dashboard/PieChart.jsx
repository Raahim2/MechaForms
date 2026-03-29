"use client";


export default function PieChart() {

  return (
          <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] w-full text-left">Distribution</h3>
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="110" className="text-violet-500" />
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="300" className="text-blue-500" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">82%</span>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">Efficiency</span>
                    </div>
                </div>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet-500"/> Personal</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/> Work</span>
                </div>
            </div>
  );
}


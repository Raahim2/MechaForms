"use client";

export default function StatCard({ label, value, trend, icon }) {
  return (
    <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-2xl shadow-sm hover:border-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-black border border-white/5 rounded-xl group-hover:bg-violet-500/5 transition-colors">
          {icon}
        </div>
        {trend && (
          <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-bold text-white tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
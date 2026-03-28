export default function StatCard({ label, value, change, icon }) {
  return (
    <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-violet-500/20 transition-all group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-zinc-800/50 rounded-xl group-hover:scale-110 group-hover:bg-violet-500/10 transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/10">{change}</span>
      </div>
      <div>
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-bold text-white mt-1 tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
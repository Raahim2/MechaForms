import {
  Globe, 
  Smartphone,
  Layers,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function TableRow({ site, url, platform, fields, status, time }) {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm group-hover:text-violet-400 transition-colors">{site}</span>
          <span className="text-[10px] text-zinc-600 font-mono tracking-tight">{url}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {platform.includes('Web') ? <Globe size={14} className="text-zinc-500"/> : <Smartphone size={14} className="text-zinc-500"/>}
          <span className="text-xs font-semibold text-zinc-400">{platform}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 border border-white/5 text-[11px] font-bold text-zinc-300">
          <Layers size={10} /> {fields} fields
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {status === 'Success' ? (
            <CheckCircle2 size={14} className="text-emerald-500" />
          ) : (
            <AlertCircle size={14} className="text-red-500" />
          )}
          <span className={`text-xs font-bold ${status === 'Success' ? 'text-zinc-300' : 'text-red-400'}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <span className="text-[11px] font-medium text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-tighter">{time}</span>
      </td>
    </tr>
  );
}
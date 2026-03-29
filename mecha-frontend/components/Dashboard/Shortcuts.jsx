"use client";
import Link from 'next/link';
import { 
  ChevronRight, 
   ShieldCheck, 
} from 'lucide-react';


export default function Shortcuts() {

  // Realistic Shortcut Registry Data
  const shortcuts = [
    { key: 'proj1', cat: 'Personal', usage: '5,201' },
    { key: 'email', cat: 'Contact', usage: '4,440' },
    { key: 'phone', cat: 'Personal', usage: '2,010' },
    { key: 'addr', cat: 'Personal', usage: '831' }
  ];

  return (
     <div className="lg:col-span-2 bg-[#0c0c0e] border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-8 pb-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white tracking-tight">Our Shortcuts</h3>
                    <Link href="/dashboard/vault" className="text-[10px] font-bold text-violet-500 hover:text-violet-400 uppercase tracking-widest transition-colors flex items-center gap-1">
                        Manage All <ChevronRight size={14} />
                    </Link>
                </div>
                <div className="flex-1 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/[0.02] text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] border-y border-white/5">
                            <tr>
                                <th className="px-8 py-4">Trigger</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Usage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {shortcuts.map((s, i) => (
                                <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-violet-500 shadow-inner font-mono font-bold text-xs">
                                                @{s.key[0]}
                                            </div>
                                            <span className="text-zinc-200 font-bold font-mono text-sm">@{s.key}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-medium text-zinc-500">{s.cat}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/80 uppercase">
                                            <ShieldCheck size={14} /> Verified
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right font-mono text-xs text-zinc-400">{s.usage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
  );
}


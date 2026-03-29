"use client";
import React from 'react';
import { ShieldCheck, Lock, EyeOff, Key, Fingerprint, History } from 'lucide-react';

export default function SecurityPage() {
  const logs = [
    { event: "Vault Access", site: "linkedin.com", data: "@name", status: "Encrypted" },
    { event: "Engine Handshake", site: "Extension", data: "Auth Token", status: "Secure" },
    { event: "Shortcut Expansion", site: "github.com", data: "@psvm", status: "Local-Only" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-10 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tighter italic flex items-center gap-3">
          Security<span className="text-emerald-500">.</span>Audit
        </h1>
        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">End-to-end encryption & access transparency</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[32px] p-8 space-y-4">
          <ShieldCheck className="text-emerald-500" size={32} />
          <h3 className="text-white font-bold">Identity Sovereignty</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">Your shortcut values are encrypted with AES-256 before being synced. Mecha employees cannot read your vault data.</p>
        </div>
        <div className="bg-violet-500/5 border border-violet-500/10 rounded-[32px] p-8 space-y-4">
          <Lock className="text-violet-500" size={32} />
          <h3 className="text-white font-bold">Local-First Engine</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">Text expansion happens locally in your browser. No keystrokes are sent to our servers except for @ai commands.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 px-2">
          <History size={14} /> Security Event Log
        </h3>
        <div className="bg-zinc-900/20 border border-white/5 rounded-3xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] text-zinc-600 font-bold uppercase border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Origin</th>
                <th className="px-8 py-4 text-right">Protection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log, i) => (
                <tr key={i} className="text-zinc-400">
                  <td className="px-6 py-4 font-bold text-zinc-200">{log.event}</td>
                  <td className="px-6 py-4 font-mono">{log.site}</td>
                  <td className="px-8 py-4 text-right">
                    <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md font-bold uppercase text-[9px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
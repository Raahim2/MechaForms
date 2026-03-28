"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, Download, 
  Check, Star, Users, 
  Copy, Share2, Info, ExternalLink,
  Code2, Clock, Globe, Loader2
} from 'lucide-react';

// Sub-component for the sidebar rows to keep code clean
const InfoRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-zinc-500">{label}</span>
    <span className="text-zinc-200 font-medium flex items-center gap-2">
      {icon && icon}
      {value}
    </span>
  </div>
);

export default function ExtensionDetail() {
  const params = useParams();
  const router = useRouter();
  const [isInstalled, setIsInstalled] = useState(false);
  const [extension, setExtension] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      const userStr = localStorage.getItem('mecha_user');
      const user = userStr ? JSON.parse(userStr) : null;

      try {
        // 1. Fetch Extension Details from server
        const response = await fetch(`https://mechaforms-api.vercel.app/extensions/details/${params.id}`);
        const data = await response.json();
        
        if (data.error) throw new Error("Not found");

        setExtension({
          ...data,
          shortcuts: data.manifest || []
        });

        // 2. Check if this protocol is already active in the user's profile
        if (user) {
          const activeRes = await fetch(`https://mechaforms-api.vercel.app/vault/active-extensions/${user.email}`);
          const activeList = await activeRes.json();
          if (activeList.includes(params.id)) {
            setIsInstalled(true);
          }
        }

      } catch (err) {
        console.error("Error initializing page:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) initPage();
  }, [params.id]);

  const handleActivate = async () => {
    const userStr = localStorage.getItem('mecha_user');
    if (!userStr) {
      router.push('/auth');
      return;
    }
    
    const user = JSON.parse(userStr);
    setIsActivating(true);

    try {
      const response = await fetch('https://mechaforms-api.vercel.app/vault/activate-extension', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          extension_slug: params.id
        })
      });

      if (response.ok) {
        setIsInstalled(true);
      } else {
        alert("Failed to synchronize protocol.");
      }
    } catch (err) {
      alert("Network error. Could not reach Mecha Engine.");
    } finally {
      setIsActivating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <Loader2 className="animate-spin text-zinc-500" size={32} />
      </div>
    );
  }

  if (!extension) {
    return <div className="p-20 text-center text-zinc-500 font-mono">ERROR_404: PROTOCOL_NOT_FOUND</div>;
  }

  return (
    <div className="min-h-screen text-zinc-300 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        
        {/* --- NAVIGATION --- */}
        <nav>
          <Link href="/dashboard/extensions" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group text-sm font-medium">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Marketplace
          </Link>
        </nav>

        {/* --- HERO SECTION --- */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-zinc-800 pb-12">
          <div className="flex gap-6 items-center">
            {/* Logo Container */}
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner">
              <Code2 size={40} />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-zinc-100 tracking-tight">
                {extension.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5"><Users size={14} /> {extension.installs || "0"} installs</span>
                <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-500/80 fill-amber-500/10" /> {extension.rating || "5.0"}</span>
                <span className="text-zinc-800">|</span>
                <span className="text-zinc-400 font-medium">v{extension.version}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleActivate}
              disabled={isInstalled || isActivating}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isInstalled 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default' 
                : 'bg-zinc-100 text-zinc-900 hover:bg-white shadow-lg disabled:opacity-50'
              }`}
            >
              {isActivating ? (
                <Loader2 className="animate-spin" size={18} />
              ) : isInstalled ? (
                <><Check size={18} /> Protocol Synced</>
              ) : (
                <><Download size={18} /> Add to Hive</>
              )}
            </button>
            <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-400">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <div className="grid gap-12">
          
          {/* --- LEFT: MAIN CONTENT --- */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About Section */}
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {extension.description}
              </p>
            </section>

            {/* Shortcut Manifest Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800/50 pb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Available Shortcuts</h2>
                <span className="text-[10px] font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">
                    {extension.shortcuts.length} definitions
                </span>
              </div>

              <div className="grid gap-4">
                {extension.shortcuts.map((item, idx) => (
                  <div key={idx} className="group bg-zinc-900/20 border border-zinc-800/60 rounded-xl p-5 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-orange-500/80 uppercase tracking-wider">{item.label || "Shortcut"}</span>
                        <div className="flex items-center gap-2">
                           <code className="text-zinc-100 font-mono text-base font-bold bg-zinc-800/50 px-2 py-0.5 rounded">
                            {item.trigger}
                           </code>
                           <span className="text-zinc-600 text-xs font-medium">then Press Tab</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(item.trigger)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-zinc-200 transition-all" 
                        title="Copy trigger"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <div className="relative">
                      <pre className="bg-[#050505] p-4 rounded-lg border border-zinc-800/50 font-mono text-[13px] text-zinc-400 overflow-x-auto leading-relaxed">
                        {item.output}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
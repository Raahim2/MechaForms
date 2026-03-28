"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(""); // Clear error when typing
  };

  // --- AUTH LOGIC ---
  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`https://fastapi-production-7b28f.up.railway.app${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

    console.log("API Response Status:", response.status); // Debugging line

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      // SUCCESS HANDLING
      if (isLogin) {
        // Save user session
        localStorage.setItem('mecha_user', JSON.stringify(data.user));
        // Force redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // After signup, switch to login mode automatically
        setIsLogin(true);
        setErrorMsg("Identity initialized. Please access console.");
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-400 font-sans flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Dotted Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Magic Purple Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full z-0" />

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[380px] bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 backdrop-blur-xl shadow-2xl"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <Cpu size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">
            Mecha<span className="text-violet-500">.</span>Identity
          </h2>
        </div>

        {/* ERROR MESSAGE DISPLAY */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-2 p-3 rounded-xl mb-4 text-xs font-bold uppercase tracking-widest border ${
                errorMsg.includes("initialized") 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {errorMsg.includes("initialized") ? <CheckCircle2 size={14}/> : <AlertCircle size={14} />}
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleAuth} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="username"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative group"
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input 
                  required
                  name="username"
                  type="text" 
                  placeholder="Username" 
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors" size={18} />
            <input 
              required
              name="email"
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-400 transition-colors" size={18} />
            <input 
              required
              name="password"
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/50 transition-all text-sm"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                {isLogin ? 'Access Console' : 'Initialize'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* State Toggle */}
        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
            }}
            className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 hover:text-violet-400 transition-colors"
          >
            {isLogin ? 'Create new identity' : 'Back to login'}
          </button>
        </div>
      </motion.div>
    </div >
  );
}

// Internal Helper for the success icon
function CheckCircle2({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
    )
}
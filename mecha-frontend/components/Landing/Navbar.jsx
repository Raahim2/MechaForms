"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for a more "active" glass look
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Engine', href: '#engine' },
    { name: 'Extension', href: '#extension' },
    { name: 'Security', href: '#security' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      isScrolled 
      ? 'border-b border-white/10 bg-black/60 backdrop-blur-xl py-3' 
      : 'border-b border-transparent bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 p-1.5 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform duration-300">
            <Cpu size={20} className="text-white" />
          </div>
          <span className="text-white font-black tracking-tighter text-xl italic group-hover:text-violet-400 transition-colors">
            MECHA
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-zinc-400 hover:text-violet-400 transition-colors duration-300 uppercase text-[11px] font-bold tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* AUTH ACTIONS */}
        <div className="flex items-center gap-6">
          <Link 
            href="/auth" 
            className="hidden sm:block text-sm font-bold text-zinc-400 hover:text-white transition-colors tracking-tight"
          >
            Sign In
          </Link>
          
          <Link 
            href="/auth" 
            className="relative group overflow-hidden bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-black tracking-widest transition-all hover:pr-9 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">GET STARTED</span>
            <ArrowRight 
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" 
              size={14} 
            />
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0b0b0b] border-b border-white/5 p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-400 text-sm font-bold tracking-widest uppercase hover:text-violet-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
            <Link href="/auth" className="text-zinc-400 font-bold uppercase text-xs tracking-widest">Sign In</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
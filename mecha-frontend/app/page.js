"use client";
import React from 'react';
import { Cpu } from 'lucide-react';
import Navbar from '../components/Landing/Navbar';  
import HeroSection from '../components/Landing/Hero';
import AutoFormSection from '../components/Landing/AutoFormSection';
import SectionHeader from '../components/Landing/SectionHeader';
import AiCodeSection from '../components/Landing/AiCodeSection';

export default function MechaForms() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-400 selection:bg-violet-500/30 selection:text-white font-sans">
      {/* Background stays fixed */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar/>

      
      <main className="relative z-10">
        
        {/* HERO: Centered with padding */}
        <div className="max-w-7xl mx-auto px-6">
          <HeroSection />
        </div>

<SectionHeader 
index='01'
  title="Autonomous Resolution" 
  description="Experience a form system that interprets shortcuts and resolves global data objects instantly."
/>
        

        {/* AUTO-FORM: Full width container for the sticky scroll logic */}
        <AutoFormSection />

<SectionHeader 
index='02'
  title="Intelligent Commands" 
  description="Generate complex logic and structural components using the inline @ai protocol."
/>

        <AiCodeSection />


        {/* FOOTER: Centered with padding */}
        <div className="max-w-7xl mx-auto px-6">
          <footer className="py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 grayscale">
              <Cpu size={18} />
              <span className="text-white font-bold tracking-tighter">MECHA</span>
            </div>
            <p className="text-sm text-zinc-600 font-medium">Built for developers. &copy; 2024</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">GitHub</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
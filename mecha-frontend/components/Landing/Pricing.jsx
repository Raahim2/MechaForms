"use client";
import React, { useState } from 'react';
import { Check, Zap, Cpu, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  return (
    <section className="py-32 relative overflow-hidden" id="pricing">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles size={14} />
            Scalable Infrastructure
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
          >
            PRECISION <span className="italic text-zinc-500">PRICING.</span>
          </motion.h2>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-bold tracking-widest uppercase ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-600'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-7 bg-zinc-900 border border-white/10 rounded-full relative p-1 transition-all"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                className="w-5 h-5 bg-violet-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              />
            </button>
            <span className={`text-sm font-bold tracking-widest uppercase ${billingCycle === 'yearly' ? 'text-white' : 'text-zinc-600'}`}>
              Yearly <span className="text-[10px] text-emerald-400 ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1: Personal */}
          <PricingCard 
            tier="Personal"
            price={billingCycle === 'monthly' ? '0' : '0'}
            description="Perfect for individuals automating their personal web workflows."
            features={[
              "Up to 500 fills / month",
              "Standard DOM analysis",
              "Chrome Extension access",
              "Community Support"
            ]}
            cta="Get Started"
          />

          {/* Tier 2: Pro (The Highlighted One) */}
          <PricingCard 
            tier="Pro Engine"
            price={billingCycle === 'monthly' ? '29' : '22'}
            description="The full power of Mecha for heavy users and developers."
            features={[
              "Unlimited fills",
              "Neural Field Mapping v2",
              "Mobile WebView SDK",
              "Custom JS Logic Hooks",
              "Priority Detection"
            ]}
            cta="Upgrade to Pro"
            highlighted={true}
          />

          {/* Tier 3: Enterprise */}
          <PricingCard 
            tier="Enterprise"
            price="Custom"
            description="Bespoke injection solutions for platforms and enterprise apps."
            features={[
              "White-label Extension",
              "Dedicated API cluster",
              "Custom DOM Adapters",
              "24/7 Military-grade Support",
              "SLA Guarantees"
            ]}
            cta="Contact Sales"
          />

        </div>
      </div>
    </section>
  );
}

/* --- Sub-component for Pricing Card --- */

function PricingCard({ tier, price, description, features, cta, highlighted = false }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative group p-8 rounded-[32px] border transition-all duration-500 flex flex-col h-full ${
        highlighted 
        ? 'bg-gradient-to-b from-zinc-900 to-black border-violet-500/50 shadow-[0_30px_60px_rgba(139,92,246,0.15)]' 
        : 'bg-zinc-900/20 border-white/5 hover:border-white/10'
      }`}
    >
      {/* Popular Badge */}
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-xl">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-xl font-black uppercase tracking-tighter italic mb-2 ${highlighted ? 'text-violet-400' : 'text-white'}`}>
          {tier}
        </h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-black text-white">{price === 'Custom' ? '' : '$'}</span>
          <span className="text-6xl font-black text-white tracking-tighter">
            {price}
          </span>
          {price !== 'Custom' && <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">/mo</span>}
        </div>
        <p className="text-zinc-500 text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`p-1 rounded-full ${highlighted ? 'bg-violet-500/20 text-violet-400' : 'bg-zinc-800 text-zinc-500'}`}>
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="text-sm font-bold text-zinc-400 tracking-tight">{feature}</span>
          </div>
        ))}
      </div>

      <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn ${
        highlighted 
        ? 'bg-white text-black hover:bg-violet-500 hover:text-white' 
        : 'bg-zinc-800 text-white hover:bg-zinc-700'
      }`}>
        {cta}
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>

      {/* Subtle Glow Overlay for Pro card */}
      {highlighted && (
        <div className="absolute inset-0 bg-violet-600/5 blur-3xl -z-10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  );
}
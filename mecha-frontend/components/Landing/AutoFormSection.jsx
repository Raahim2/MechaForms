"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

const AutoFormSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Professional Data Set
  const sequence = [
    { label: "Identity", shortcut: "@name", final: "Alexander Thorne", range: [0.1, 0.35] },
    { label: "Communication", shortcut: "@email", final: "a.thorne@mecha.systems", range: [0.4, 0.65] },
    { label: "Deployment_Note", shortcut: "@msg", final: "Headless architecture synchronized with production edge nodes.", range: [0.7, 0.95] }
  ];

  const [displayText, setDisplayText] = useState({ f0: "", f1: "", f2: "" });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const handleTyping = (val, range, shortcut, final) => {
      if (val < range[0]) return "";
      if (val > range[1]) return final;

      const p = (val - range[0]) / (range[1] - range[0]);
      
      // Phase 1: Typing shorthand (@name) - first 30% of scroll range
      if (p < 0.3) {
        const charCount = Math.floor((p / 0.3) * shortcut.length);
        return shortcut.slice(0, charCount);
      } 
      // Phase 2: Instant resolution to professional value
      else {
        const charCount = Math.floor(((p - 0.3) / 0.7) * final.length);
        return final.slice(0, charCount);
      }
    };

    setDisplayText({
      f0: handleTyping(latest, sequence[0].range, sequence[0].shortcut, sequence[0].final),
      f1: handleTyping(latest, sequence[1].range, sequence[1].shortcut, sequence[1].final),
      f2: handleTyping(latest, sequence[2].range, sequence[2].shortcut, sequence[2].final)
    });
  });

  return (
    <section ref={containerRef} className="h-[300vh] relative w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-6">
        
        {/* BROWSER MOCKUP */}
        <div className="w-full max-w-4xl aspect-[16/9] bg-[#050505] rounded-xl border border-white/10 shadow-2xl flex flex-col relative overflow-hidden">
          
          {/* Minimal Chrome Header */}
          <div className="h-10 bg-zinc-900/30 border-b border-white/5 flex items-center px-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
            </div>
            {/* Centered URL */}
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-0.5 bg-black/40 rounded border border-white/5 text-[9px] font-mono text-zinc-600 tracking-tight">
                mechaforms.sh/sandbox/resolve
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center bg-[#080808]">
            <div className="w-full max-w-lg space-y-12">
              
              {sequence.map((item, i) => {
                const scrollPos = smoothProgress.get();
                const isActive = scrollPos >= item.range[0] && scrollPos <= item.range[1];
                const isResolved = displayText[`f${i}`].length > 0 && !displayText[`f${i}`].startsWith('@');

                return (
                  <div key={i} className="space-y-3 px-6">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
                        {item.label}
                      </label>
                      {isActive && (
                        <span className="text-[9px] font-mono text-violet-500 animate-pulse">
                          RESOLVING_KEY...
                        </span>
                      )}
                    </div>

                    <div className={`
                      h-12 w-full border-b transition-all duration-500 flex items-center px-1 font-mono text-base tracking-tight
                      ${isActive ? 'border-violet-500/50' : 'border-white/10'}
                      ${isResolved ? 'text-white' : 'text-violet-500/80'}
                    `}>
                      {displayText[`f${i}`]}
                      {isActive && (
                        <span className="w-1.5 h-5 bg-violet-500 ml-1 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Minimal Footer Info */}
          <div className="h-8 border-t border-white/5 bg-black/20 flex items-center px-6 justify-between">
            <div className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">
              System_State: {smoothProgress.get() > 0.9 ? "Operational" : "Processing"}
            </div>
            <div className="flex gap-3">
               <div className="w-1 h-1 rounded-full bg-violet-500/40" />
               <div className="w-1 h-1 rounded-full bg-violet-500/40" />
            </div>
          </div>

        </div>

        {/* Vertical Progress Line (Clean) */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-white/5">
          <motion.div 
            style={{ height: "100%", scaleY: smoothProgress, originY: 0 }}
            className="w-full bg-violet-500"
          />
        </div>
      </div>
    </section>
  );
};

export default AutoFormSection;
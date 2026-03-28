"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

const SectionHeader = ({ title, description, index = "01" }) => {
  const containerRef = useRef(null);
  
  // High-precision scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Changed to start-start to lock immediately
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const [typedTitle, setTypedTitle] = useState("");
  const [typedDesc, setTypedDesc] = useState("");

  // UI State Transformations
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.1], [0.97, 1]);
  const lineScale = useTransform(smoothProgress, [0.2, 0.5], [0, 1]);
  const scanLineY = useTransform(smoothProgress, [0, 1], ["-100%", "250%"]);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&*";
  
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const sliceText = (val, start, end, fullText) => {
      if (val < start) return "";
      if (val > end) return fullText;
      const progress = (val - start) / (end - start);
      const charCount = Math.floor(progress * fullText.length);
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      return fullText.slice(0, charCount) + (charCount < fullText.length ? randomChar : "");
    };

    setTypedTitle(sliceText(latest, 0.1, 0.45, title));
    setTypedDesc(sliceText(latest, 0.5, 0.9, description));
  });

  return (
    /* h-[300vh] creates the scroll depth. Relative is required for sticky child. */
    <section ref={containerRef} className="h-[300vh] relative w-full bg-transparent">
      
      {/* 
          The Sticky Wrapper: 
          This is what "locks" the screen. 
      */}
      <motion.div 
        style={{ opacity, scale }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        
        {/* --- BACKGROUND HUD LAYER --- */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf603_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf603_1px,transparent_1px)] bg-[size:50px_50px]" />
          <motion.div 
            style={{ y: scanLineY }}
            className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent"
          />
        </div>

        {/* --- HUD: LEFT INFO --- */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-zinc-600">INDEX_ID</span>
            <span className="text-violet-500 font-bold">{index}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-600">LOCAL_POS</span>
            <span>{Math.floor(smoothProgress.get() * 100)}%</span>
          </div>
          <div className="w-16 h-px bg-zinc-900 mt-2" />
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 text-center space-y-10 max-w-5xl px-6">
          
          <motion.div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[9px] font-mono text-zinc-500 uppercase tracking-[0.5em]">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_#8b5cf6] animate-pulse" />
            Nav_Sequence_Active
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none min-h-[1.1em] drop-shadow-2xl">
            {typedTitle}
          </h2>

          {/* Glowing HUD Separator */}
          <div className="relative flex items-center justify-center w-full py-2">
             <div className="absolute w-full h-[1px] bg-white/[0.03]" />
             <motion.div 
                style={{ scaleX: lineScale }}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"
             />
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="w-3 h-3 border border-violet-500/50 bg-[#030303] z-10 rotate-45"
             />
          </div>

          <div className="min-h-[80px] flex items-center justify-center">
             <p className="text-zinc-500 font-mono text-sm md:text-lg leading-relaxed tracking-tight max-w-2xl italic">
              {typedDesc}
            </p>
          </div>
        </div>

        {/* --- HUD: RIGHT INFO --- */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-4 font-mono text-[10px] text-zinc-800">
           <div className="text-right">
              <div className="text-zinc-600 mb-2 tracking-widest uppercase">Buffer_State</div>
              <div className="w-32 h-[2px] bg-zinc-900 overflow-hidden">
                <motion.div 
                  style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                  className="h-full bg-violet-600 shadow-[0_0_10px_#8b5cf6]"
                />
              </div>
           </div>
           <div className="space-y-1 text-right">
              <div>MEM_ALLOC: OK</div>
              <div>CORE_TEMP: 32°C</div>
           </div>
        </div>

        {/* --- BOTTOM PROGRESS --- */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
           <div className="text-3xl font-mono text-white/5 tracking-tighter">
              {Math.floor(smoothProgress.get() * 100)}
           </div>
           <div className="h-10 w-px bg-gradient-to-b from-violet-500 to-transparent" />
        </div>

      </motion.div>
    </section>
  );
};

export default SectionHeader;
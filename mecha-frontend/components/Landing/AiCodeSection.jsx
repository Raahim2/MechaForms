"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

const AiCodeSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 1. DATA DEFINITIONS
  const promptText = "@ai implement two sum using a hashmap for O(n) complexity.";
  
  // The generated code split by logical chunks for smooth typing
  const generatedCode = [
    "        Map<Integer, Integer> map = new HashMap<>();",
    "        for (int i = 0; i < nums.length; i++) {",
    "            int complement = target - nums[i];",
    "            if (map.containsKey(complement)) {",
    "                return new int[] { map.get(complement), i };",
    "            }",
    "            map.put(nums[i], i);",
    "        }",
    "        throw new IllegalArgumentException(\"No solution\");"
  ];

  const [aiState, setAiState] = useState({ 
    prompt: "", 
    isGenerating: false, 
    codeLines: [] 
  });

  // 2. SCROLL LOGIC
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Range 0.1 - 0.3: Typing the prompt
    if (latest >= 0.1 && latest < 0.3) {
      const p = (latest - 0.1) / 0.2;
      const charCount = Math.floor(p * promptText.length);
      setAiState({ 
        prompt: promptText.slice(0, charCount), 
        isGenerating: false, 
        codeLines: [] 
      });
    } 
    // Range 0.3 - 0.45: The "Generating" Phase
    else if (latest >= 0.3 && latest < 0.45) {
      setAiState(prev => ({ ...prev, prompt: promptText, isGenerating: true }));
    }
    // Range 0.45 - 0.95: Typing the code lines
    else if (latest >= 0.45 && latest < 0.95) {
      const p = (latest - 0.45) / 0.5;
      const totalChars = generatedCode.join("\n").length;
      const currentCharCount = Math.floor(p * totalChars);
      
      // Calculate which lines to show based on character count
      let currentString = generatedCode.join("\n").slice(0, currentCharCount);
      setAiState({ 
        prompt: "", 
        isGenerating: false, 
        codeLines: currentString.split("\n") 
      });
    }
    // Final State
    else if (latest >= 0.95) {
      setAiState({ prompt: "", isGenerating: false, codeLines: generatedCode });
    }
    else {
      setAiState({ prompt: "", isGenerating: false, codeLines: [] });
    }
  });

  // 3. MANUAL SYNTAX HIGHLIGHTER
  const highlightJava = (line) => {
    const parts = line.split(/(\s+|=|\(|\)|\[|\]|\{|\}|;|\.|"|@ai)/);
    return parts.map((part, i) => {
      if (['public', 'class', 'int', 'new', 'for', 'if', 'return', 'throw'].includes(part)) {
        return <span key={i} className="text-violet-500 font-bold">{part}</span>;
      }
      if (['Solution', 'Map', 'Integer', 'HashMap', 'IllegalArgumentException'].includes(part)) {
        return <span key={i} className="text-cyan-400">{part}</span>;
      }
      if (part.startsWith('"') || part.endsWith('"')) {
        return <span key={i} className="text-amber-200/80">{part}</span>;
      }
      if (part === '@ai') {
        return <span key={i} className="text-fuchsia-500 font-black">{part}</span>;
      }
      if (!isNaN(part)) {
        return <span key={i} className="text-orange-400">{part}</span>;
      }
      return <span key={i} className="text-zinc-300">{part}</span>;
    });
  };

  return (
    <section ref={containerRef} className="h-[400vh] relative w-full bg-[#030303]">
      <div className="sticky top-10 h-screen w-full flex items-center justify-center p-6">
        
        {/* EDITOR MOCKUP */}
        <div className="w-full max-w-4xl bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col aspect-[16/10]">
          
          {/* Editor Header */}
          <div className="h-10 bg-zinc-900/50 border-b border-white/5 flex items-center px-4 justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
            </div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              Solution.java — Mecha_Editor
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Editor Body */}
          <div className="flex-1 p-8 font-mono text-sm overflow-hidden bg-[#080808]">
            <div className="space-y-1">
              {/* Initial Boilerplate */}
              <div>{highlightJava("public class Solution {")}</div>
              <div className="pl-4">{highlightJava("public int[] twoSum(int[] nums, int target) {")}</div>

              {/* AI INTERACTION AREA */}
              <div className="pl-8 py-2 min-h-[1.5rem] relative">
                {aiState.prompt && (
                  <div className="text-fuchsia-400 flex items-center">
                    <span className="mr-2 text-fuchsia-500 font-bold">@ai</span>
                    {aiState.prompt.replace('@ai ', '')}
                    <span className="w-2 h-4 bg-fuchsia-500 ml-1 animate-pulse" />
                  </div>
                )}

                {aiState.isGenerating && (
                  <div className="flex items-center gap-3 text-fuchsia-500/80 italic text-xs tracking-widest">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-3 h-3 border-2 border-t-transparent border-fuchsia-500 rounded-full"
                    />
                    GENERATING SOLUTION...
                  </div>
                )}

                {/* The Generated Code Lines */}
                <div className="space-y-1">
                  {aiState.codeLines.map((line, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -5 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      key={idx} 
                      className="whitespace-pre"
                    >
                      {highlightJava(line)}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Closing Boilerplate */}
              <div className="pl-4">{highlightJava("    }")}</div>
              <div>{highlightJava("}")}</div>
            </div>
          </div>

          {/* Editor Footer / Status Bar */}
          <div className="h-6 bg-violet-600/10 border-t border-white/5 flex items-center px-4 justify-between">
            <div className="flex gap-4 text-[9px] font-mono text-violet-400/60 uppercase tracking-tighter">
              <span>Ln 12, Col 42</span>
              <span>UTF-8</span>
              <span>Java</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-mono text-fuchsia-400 uppercase tracking-widest">Mecha_AI v2.4</span>
               <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
            </div>
          </div>

        </div>

        {/* Progress HUD Overlay (Optional - Clean) */}
        <div className="absolute right-12 bottom-12 flex flex-col items-end gap-2">
            <div className="h-[1px] w-24 bg-white/10 relative">
               <motion.div 
                style={{ scaleX: smoothProgress, originX: 1 }} 
                className="absolute inset-0 bg-fuchsia-500 shadow-[0_0_10px_#d946ef]" 
               />
            </div>
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Stream_Buffer</span>
        </div>

      </div>
    </section>
  );
};

export default AiCodeSection;
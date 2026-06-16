"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface RecommendedPlan {
  id: string;
  name: string;
  speed: string;
  price: string;
  description: string;
}

const PLAN_40_MBPS: RecommendedPlan = {
  id: "plan-40",
  name: "Starter Plan",
  speed: "40 Mbps",
  price: "Rs. 2799",
  description: "Perfect for basic browsing, emails, social media, and single-screen HD streaming."
};

const PLAN_100_MBPS: RecommendedPlan = {
  id: "plan-100",
  name: "Entertainment Plan",
  speed: "100 Mbps",
  price: "Rs. 4248",
  description: "Best for multiple devices, gaming, buffer-free UHD streaming, and seamless WFH."
};

// Airtel observed logic:
// Starts at 40 Mbps by default.
// If any option except "General Browsing" is selected from Card 2, it upgrades to 100 Mbps.
function getMatchedPlan(usages: string[]): RecommendedPlan {
  const hasGaming = usages.includes("Gaming");
  const hasStreaming = usages.includes("Netflix, Hotstar etc.");
  const hasWFH = usages.includes("Work from home");
  
  const hasHeavyUsage = hasGaming || hasStreaming || hasWFH;

  if (hasHeavyUsage) {
    return PLAN_100_MBPS;
  }
  return PLAN_40_MBPS;
}

const DEVICE_OPTIONS = ["1-5", "6-10", "10+"];

const USAGE_OPTIONS = [
  "General Browsing",
  "Gaming",
  "Netflix, Hotstar etc.",
  "Work from home",
];

export default function PlanFinder() {
  // Airtel default: first options on both cards are pre-selected
  const [selectedDevices, setSelectedDevices] = useState<string>("1-5");
  const [selectedUsages, setSelectedUsages] = useState<string[]>(["General Browsing"]);

  const handleUsageToggle = (usage: string) => {
    setSelectedUsages((prev) => {
      // Toggle logic
      if (prev.includes(usage)) {
        // Don't allow empty selection to keep recommendation active
        if (prev.length === 1) return prev;
        return prev.filter((u) => u !== usage);
      } else {
        return [...prev, usage];
      }
    });
  };

  const matchedPlan = getMatchedPlan(selectedUsages);

  return (
    <section className="bg-[var(--surface-container-lowest)] border-t border-[var(--border-cyan)] py-12 md:py-16 w-full relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--primary)]/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Headline */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Find the best Wi-Fi plan for you
          </h2>
        </div>

        {/* 3 Cards Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch max-w-[1080px] mx-auto">
          
          {/* CARD 1 — Device Connection Count */}
          <div className="bg-[var(--surface-container-low)] border border-[var(--border-cyan)] rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--primary)]/40 transition-colors duration-300">
            <div>
              <p className="text-[9px] font-bold tracking-[0.15em] text-[var(--primary)] uppercase mb-3 text-center">
                Step 1 of 2
              </p>
              <h3 className="font-heading text-base font-bold text-[var(--text-primary)] text-center mb-1 leading-snug">
                How many devices are you looking to connect to your wi-fi?
              </h3>
              <p className="text-[10px] text-[var(--text-muted)] text-center mb-6">
                laptops, TVs, mobiles
              </p>
              
              <div className="flex flex-col gap-2.5">
                {DEVICE_OPTIONS.map((option) => {
                  const isSelected = selectedDevices === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setSelectedDevices(option)}
                      className={`w-full py-3 px-4 rounded-xl text-center text-xs font-semibold transition-all duration-200 border ${
                        isSelected
                          ? "bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] shadow-md font-bold"
                          : "bg-transparent text-[var(--text-primary)] border-[var(--border-cyan)] hover:bg-[var(--surface-variant)] hover:border-[var(--primary)]/50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CARD 2 — Usage Purposes */}
          <div className="bg-[var(--surface-container-low)] border border-[var(--border-cyan)] rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--primary)]/40 transition-colors duration-300">
            <div>
              <p className="text-[9px] font-bold tracking-[0.15em] text-[var(--primary)] uppercase mb-3 text-center">
                Step 2 of 2
              </p>
              <h3 className="font-heading text-base font-bold text-[var(--text-primary)] text-center mb-1 leading-snug">
                What do you plan to use the connection for?
              </h3>
              <p className="text-[10px] text-[var(--text-muted)] text-center mb-6">
                select all that apply
              </p>

              <div className="flex flex-col gap-2.5">
                {USAGE_OPTIONS.map((option) => {
                  const isSelected = selectedUsages.includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleUsageToggle(option)}
                      className={`w-full py-3 px-4 rounded-xl text-center text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 border ${
                        isSelected
                          ? "bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] font-bold shadow-md"
                          : "bg-transparent text-[var(--text-primary)] border-[var(--border-cyan)] hover:bg-[var(--surface-variant)] hover:border-[var(--primary)]/50"
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-[14px] leading-none hover:opacity-80 transition-opacity">
                          close
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CARD 3 — Result Card */}
          <div className="flex flex-col justify-center">
            <div className="h-full bg-white text-slate-900 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden border border-slate-200/60 dark:border-white/10 hover:scale-[1.02] transition-transform duration-300">
              
              {/* Decorative top strip */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--primary-container)] to-[var(--secondary)]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={matchedPlan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-between pt-2"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Wi-Fi Icon */}
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[26px] font-bold">wifi</span>
                    </div>
                    
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                      The best plan for you is
                    </p>
                    
                    {/* Speed Display */}
                    <h4 className="font-outfit text-4xl font-black text-slate-900 mb-0.5 tracking-tight">
                      {matchedPlan.speed}
                    </h4>

                    <p className="font-outfit text-xs font-semibold text-slate-500 mb-4">
                      {matchedPlan.price} for 6 months
                    </p>

                    <div className="border-t border-slate-100 pt-4 w-full">
                      <p className="text-[11px] text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                        {matchedPlan.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link
                      href={`/new-connection?plan=${matchedPlan.id}`}
                      className="w-full py-3 bg-slate-950 text-white rounded-xl text-center text-xs font-bold block hover:bg-slate-800 transition-colors uppercase tracking-wide"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/plans"
                      className="w-full py-1.5 text-center text-[10px] font-bold text-slate-500 hover:text-slate-800 transition-colors block uppercase tracking-wide"
                    >
                      View Other Plans
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

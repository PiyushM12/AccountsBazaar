import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, Zap, Sparkles, TrendingUp, Star, ArrowRight } from "lucide-react";

const Hero = () => {
  const [input, setInput] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let url = `/marketplace?search=${encodeURIComponent(input)}`;
    if (selectedPlatform !== "all") {
      url += `&platform=${selectedPlatform}`;
    }
    navigate(url);
  };

  const platformChips = [
    { id: "all", label: "All Platforms" },
    { id: "instagram", label: "Instagram" },
    { id: "youtube", label: "YouTube" },
    { id: "twitter", label: "X (Twitter)" },
    { id: "tiktok", label: "TikTok" },
    { id: "telegram", label: "Telegram" },
    { id: "discord", label: "Discord" }
  ];

  return (
    <div className="relative overflow-hidden py-14 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24">
      
      {/* Subtle Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium shadow-sm mb-6">
          <Sparkles className="size-4 text-indigo-400" />
          <span>The #1 Escrow Marketplace for Verified Social Accounts</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-5">
          Buy & Sell Verified <br className="hidden sm:inline" />
          <span className="text-indigo-400">Social Media Accounts</span> Safely
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed mb-8">
          The premier escrow-backed marketplace to acquire or sell high-reach Instagram, YouTube, X, TikTok, and Telegram channels with guaranteed ownership transfer.
        </p>

        {/* Search Box & Quick Chips */}
        <div className="w-full max-w-2xl glass-panel p-2.5 sm:p-3 rounded-2xl border border-white/10 shadow-2xl mb-8">
          
          {/* Quick Platform Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-2 px-1 text-xs">
            {platformChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedPlatform(chip.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                  selectedPlatform === chip.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search profiles, e.g. 100k tech channel, gaming..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 text-white placeholder-slate-400 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 transition-all text-xs sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm whitespace-nowrap"
            >
              <span>Explore Market</span>
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>

        {/* Social Proof & Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-4xl pt-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-sm sm:text-base">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>100% Escrow</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Guaranteed Safe Transfer</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-sm sm:text-base">
              <Zap className="size-4 text-amber-400" />
              <span>&lt; 1 Hour</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Avg Credential Delivery</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-sm sm:text-base">
              <TrendingUp className="size-4 text-indigo-400" />
              <span>$2.5M+</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Total Account Volume</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-sm sm:text-base">
              <Star className="size-4 text-amber-400 fill-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">15,000+ Verified Buyers</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;

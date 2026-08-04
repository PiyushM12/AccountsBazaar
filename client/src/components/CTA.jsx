import React from 'react';
import { PlusCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/react';

const CTA = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-slate-900 p-8 sm:p-14 border border-indigo-500/30 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>Ready to Monetize Your Reach?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Turn Your Social Media Accounts into Cash Today
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              List your Instagram, YouTube, X, or TikTok page in under 2 minutes. Receive verified buyer offers backed by guaranteed escrow protection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => user ? navigate('/create-listing') : openSignIn()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105"
            >
              <PlusCircle className="size-5 text-indigo-600" />
              <span>Create Free Listing</span>
            </button>

            <button
              onClick={() => navigate('/marketplace')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

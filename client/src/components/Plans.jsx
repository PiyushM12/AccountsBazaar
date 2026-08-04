import React from 'react';
import { PricingTable } from '@clerk/react';
import { ShieldCheck, Zap, Lock, Headphones, RefreshCw } from 'lucide-react';

const Plans = () => {
  const valueProps = [
    {
      icon: <ShieldCheck className="size-6 text-emerald-400" />,
      title: "Full Escrow Guarantee",
      description: "Funds are securely locked until you verify and take 100% control of the account credentials."
    },
    {
      icon: <Zap className="size-6 text-amber-400" />,
      title: "Automated Credential Verification",
      description: "Our admin team inspects analytics, email bindings, and subscriber authenticity before release."
    },
    {
      icon: <Lock className="size-6 text-indigo-400" />,
      title: "Bank-Grade Encryption",
      description: "All sensitive account passwords and recovery keys are encrypted at rest."
    },
    {
      icon: <Headphones className="size-6 text-purple-400" />,
      title: "24/7 Dedicated Escrow Support",
      description: "Direct live chat assistance throughout the entire transfer and sign-over process."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
          <RefreshCw className="size-3.5" />
          <span>Secure transactions and seller tools</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Why sellers and buyers choose <span className="gradient-text">AccountsBazaar</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3">
          Every transaction is supported by escrow, verification, and clear seller tools so the process stays simple.
        </p>
      </div>

      {/* Value Propositions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {valueProps.map((item, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-start hover:border-indigo-500/40">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing Table Section */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">Select Seller Tier & Subscription</h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Unlock featured listing slots, zero commission fees, and priority support.</p>
        </div>
        <div className="clerk-pricing-container flex justify-center">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};

export default Plans;

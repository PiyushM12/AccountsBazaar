import React from 'react';
import logo from "../assets/accountsbazaarlogo.png";
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Heart, ArrowUp, Send } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950/90 border-t border-white/10 pt-16 pb-12 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <img src={logo} alt="AccountsBazaar" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              AccountsBazaar is the premier escrow-protected platform for buying and selling verified YouTube channels, Instagram pages, TikTok profiles, X accounts, and Telegram groups safely.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                <ShieldCheck className="size-3.5" /> 100% Escrow Protected
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium">
                <Lock className="size-3.5" /> Encrypted Credentials
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Marketplace</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/marketplace?platform=youtube" onClick={scrollToTop} className="hover:text-indigo-400 transition">YouTube Channels</Link></li>
              <li><Link to="/marketplace?platform=instagram" onClick={scrollToTop} className="hover:text-indigo-400 transition">Instagram Accounts</Link></li>
              <li><Link to="/marketplace?platform=tiktok" onClick={scrollToTop} className="hover:text-indigo-400 transition">TikTok Accounts</Link></li>
              <li><Link to="/marketplace?platform=twitter" onClick={scrollToTop} className="hover:text-indigo-400 transition">X / Twitter Accounts</Link></li>
              <li><Link to="/marketplace?platform=telegram" onClick={scrollToTop} className="hover:text-indigo-400 transition">Telegram Channels</Link></li>
              <li><Link to="/marketplace?platform=discord" onClick={scrollToTop} className="hover:text-indigo-400 transition">Discord Servers</Link></li>
            </ul>
          </div>

          {/* Platform & Account */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link to="/marketplace" onClick={scrollToTop} className="hover:text-indigo-400 transition">All Listings</Link></li>
              <li><Link to="/create-listing" onClick={scrollToTop} className="hover:text-indigo-400 transition">Sell Your Account</Link></li>
              <li><Link to="/messages" onClick={scrollToTop} className="hover:text-indigo-400 transition">Buyer/Seller Chat</Link></li>
              <li><Link to="/my-orders" onClick={scrollToTop} className="hover:text-indigo-400 transition">My Orders</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Stay Informed</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified of newly listed high-revenue channels before anyone else.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-white placeholder-slate-500 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Scroll Back */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} AccountsBazaar. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for social creators & buyers</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import { ArrowRight, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestListings = () => {
  const { listings } = useSelector((state) => state.listing);
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="size-3.5 fill-orange-400" />
            <span>Fresh Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Latest Verified <span className="gradient-text">Listings</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Explore newly listed, high-engagement channels and accounts ready for instant acquisition.
          </p>
        </div>

        <button
          onClick={() => { navigate('/marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 text-sm font-semibold transition-all cursor-pointer group shrink-0"
        >
          <span>View All Listings</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Listings Grid */}
      {listings && listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id || listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-panel rounded-2xl border border-white/5">
          <p className="text-slate-400 text-sm">No listings available at the moment.</p>
          <button
            onClick={() => navigate('/create-listing')}
            className="mt-4 px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-md shadow-indigo-600/30"
          >
            Be the First to Sell
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestListings;

import { ArrowLeftIcon, FilterIcon, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import FilterSidebar from '../components/FilterSidebar';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const platformParam = searchParams.get("platform");
  const navigate = useNavigate();
  const [showFilterPhone, setShowFilterPhone] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const [filters, setFilters] = useState({
    platform: platformParam ? [platformParam] : null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monetized: false,
  });

  // Sync platformParam from URL if changed
  useEffect(() => {
    if (platformParam) {
      setFilters(prev => ({ ...prev, platform: [platformParam] }));
    }
  }, [platformParam]);

  const listingState = useSelector((state) => state.listing || {});
  const listings = Array.isArray(listingState.listings) ? listingState.listings : [];

  const filteredListings = listings.filter((listing) => {
    const safeListing = listing || {};
    const platform = String(safeListing.platform || "").toLowerCase();
    const price = Number(safeListing.price) || 0;
    const followers = Number(safeListing.followers_count) || 0;
    const niche = String(safeListing.niche || "").toLowerCase();
    const title = String(safeListing.title || "").toLowerCase();
    const username = String(safeListing.username || "").toLowerCase();
    const description = String(safeListing.description || "").toLowerCase();

    if (filters.platform && filters.platform.length > 0) {
      if (!filters.platform.includes(platform)) return false;
    }
    if (filters.maxPrice) {
      if (price > filters.maxPrice) return false;
    }
    if (filters.minFollowers) {
      if (followers < filters.minFollowers) return false;
    }
    if (filters.niche) {
      if (niche !== filters.niche.toLowerCase()) return false;
    }

    if (filters.verified && !safeListing.verified) return false;
    if (filters.monetized && !safeListing.monetized) return false;

    if (search) {
      const trimmed = search.trim().toLowerCase();
      const matchTitle = title.includes(trimmed);
      const matchUsername = username.includes(trimmed);
      const matchDesc = description.includes(trimmed);
      const matchPlatform = platform.includes(trimmed);
      const matchNiche = niche.includes(trimmed);

      if (!matchTitle && !matchUsername && !matchDesc && !matchPlatform && !matchNiche) {
        return false;
      }
    }

    return true;
  });

  // Sorting logic
  const sortedListings = [...filteredListings].sort((a, b) => {
    const first = a || {};
    const second = b || {};
    const firstPrice = Number(first.price) || 0;
    const secondPrice = Number(second.price) || 0;
    const firstFollowers = Number(first.followers_count) || 0;
    const secondFollowers = Number(second.followers_count) || 0;

    if (sortBy === "price_asc") return firstPrice - secondPrice;
    if (sortBy === "price_desc") return secondPrice - firstPrice;
    if (sortBy === "followers") return secondFollowers - firstFollowers;
    return first.featured ? -1 : second.featured ? 1 : 0;
  });

  const activeFiltersCount = 
    (filters.platform ? filters.platform.length : 0) +
    (filters.niche ? 1 : 0) +
    (filters.minFollowers > 0 ? 1 : 0) +
    (filters.verified ? 1 : 0) +
    (filters.monetized ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className='py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto'>
      
      {/* Top Header & Breadcrumbs */}
      <div className='flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6'>
        <div>
          <button 
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className='inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-2 transition'
          >
            <ArrowLeftIcon className="size-3.5" />
            <span>Back to Home</span>
          </button>
          <h1 className='text-3xl font-extrabold text-white tracking-tight flex items-center gap-3'>
            <span>Marketplace</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
              {sortedListings.length} Available
            </span>
          </h1>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilterPhone(true)}
            className='sm:hidden flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 text-slate-200 text-xs font-semibold rounded-xl'
          >
            <FilterIcon className='size-4 text-indigo-400' />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <SlidersHorizontal className="size-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-white">Featured First</option>
              <option value="price_asc" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price_desc" className="bg-slate-900 text-white">Price: High to Low</option>
              <option value="followers" className="bg-slate-900 text-white">Followers: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='flex items-start gap-8'>
        {/* Sticky Filter Sidebar */}
        <FilterSidebar
          setFilters={setFilters}
          filters={filters}
          setShowFilterPhone={setShowFilterPhone}
          showFilterPhone={showFilterPhone}
        />

        {/* Product Cards Container */}
        <div className='flex-1 min-w-0'>
          
          {/* Active Filter Chips Summary */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <span className="text-xs font-bold text-slate-400 mr-1">Active Filters:</span>
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs">
                  Search: "{search}"
                </span>
              )}
              {filters.platform?.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs capitalize">
                  {p}
                </span>
              ))}
              {filters.niche && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs capitalize">
                  Niche: {filters.niche}
                </span>
              )}
              {filters.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                  Verified Only
                </span>
              )}
              <button
                onClick={() => {
                  setFilters({
                    platform: null,
                    maxPrice: 100000,
                    minFollowers: 0,
                    niche: null,
                    verified: false,
                    monetized: false,
                  });
                  if (search) navigate('/marketplace');
                }}
                className="text-xs text-slate-400 hover:text-white underline ml-auto font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {sortedListings.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'>
              {sortedListings.map((listing) => (
                <ListingCard listing={listing} key={listing.id || listing._id} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20 glass-panel rounded-3xl border border-white/10 p-8'>
              <div className="size-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-indigo-400">
                <Sparkles className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No listings available right now</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                There are no matching account listings at the moment. Try widening your filters or check back soon for fresh inventory.
              </p>
              <button
                onClick={() => {
                  setFilters({
                    platform: null,
                    maxPrice: 100000,
                    minFollowers: 0,
                    niche: null,
                    verified: false,
                    monetized: false,
                  });
                  if (search) navigate('/marketplace');
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

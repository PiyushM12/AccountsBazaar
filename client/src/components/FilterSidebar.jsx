import { ChevronDown, Filter, X, Search, RotateCcw, ShieldCheck, DollarSign } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({
  showFilterPhone,
  setShowFilterPhone,
  filters,
  setFilters,
}) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const onSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val) {
            setSearchParams({ search: val });
        } else {
            navigate(`/marketplace`);
        }
    };

    const [expandedSections, setExpandedSections] = useState({
        platform: true,
        price: true,
        followers: true,
        niche: true,
        status: true,
    });

    const niches = [
      { value: "lifestyle", label: "Lifestyle" },
      { value: "fitness", label: "Fitness" },
      { value: "food", label: "Food" },
      { value: "travel", label: "Travel" },
      { value: "tech", label: "Technology" },
      { value: "gaming", label: "Gaming" },
      { value: "fashion", label: "Fashion" },
      { value: "beauty", label: "Beauty" },
      { value: "business", label: "Business" },
      { value: "education", label: "Education" },
      { value: "entertainment", label: "Entertainment" },
      { value: "music", label: "Music" },
      { value: "art", label: "Art" },
      { value: "sports", label: "Sports" },
      { value: "health", label: "Health" },
      { value: "finance", label: "Finance" },
    ];

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const onFiltersChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const onClearFilters = () => {
        if (search) {
            navigate("/marketplace");
            setSearch("");
        }
        setFilters({
            platform: null,
            maxPrice: 100000,
            minFollowers: 0,
            niche: null,
            verified: false,
            monetized: false,
        });
    };

    const platforms = [
        { value: "youtube", label: "YouTube" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "twitter", label: "Twitter / X" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitch", label: "Twitch" },
        { value: "discord", label: "Discord" }
    ];

  return (
    <aside
      className={` ${showFilterPhone ? "fixed inset-0 z-[200] overflow-y-auto bg-[#0b0f19]/95 backdrop-blur-2xl p-4" : "hidden sm:block"} glass-panel rounded-2xl border border-white/10 sticky top-24 md:w-72 lg:w-80 shrink-0 h-fit text-slate-200 transition-all`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-indigo-400" />
          <h3 className="font-bold text-base text-white">Filter Market</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 p-1.5 hover:bg-slate-800 rounded-lg transition"
            title="Reset Filters"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset</span>
          </button>
          {showFilterPhone && (
            <button
              onClick={() => setShowFilterPhone(false)}
              className="sm:hidden p-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
            >
              Done
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto no-scrollbar">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search keyword..."
            onChange={onSearchChange}
            value={search}
            className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Platform filter */}
        <div className="border-b border-white/5 pb-4">
          <button onClick={() => toggleSection("platform")} className="flex items-center justify-between w-full mb-3 group">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-indigo-400 transition">Platform</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform ${expandedSections.platform ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.platform && (
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => {
                const isSelected = filters.platform?.includes(platform.value);
                return (
                  <button
                    key={platform.value}
                    type="button"
                    onClick={() => {
                      const current = filters.platform || [];
                      const updated = isSelected ? current.filter((p) => p !== platform.value) : [...current, platform.value];
                      onFiltersChange({
                        ...filters,
                        platform: updated.length > 0 ? updated : null
                      });
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-indigo-600/30 border border-indigo-500/60 text-white"
                        : "bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <span>{platform.label}</span>
                    {isSelected && <span className="size-1.5 rounded-full bg-indigo-400"></span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Price range filter */}
        <div className="border-b border-white/5 pb-4">
          <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full mb-3 group">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-indigo-400 transition">Max Price</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100000"
                step="250"
                value={filters.maxPrice || 100000}
                onChange={(e) => onFiltersChange({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>{currency}0</span>
                <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
                  Up to {currency}{(filters.maxPrice || 100000).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Followers RANGE */}
        <div className="border-b border-white/5 pb-4">
          <button onClick={() => toggleSection("followers")} className="flex items-center justify-between w-full mb-3 group">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-indigo-400 transition">Min Followers</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform ${expandedSections.followers ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.followers && (
            <select
              value={filters.minFollowers?.toString() || "0"}
              onChange={(e) => onFiltersChange({ ...filters, minFollowers: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="0">Any Follower Count</option>
              <option value="1000">1,000+ Followers</option>
              <option value="10000">10,000+ Followers</option>
              <option value="50000">50,000+ Followers</option>
              <option value="100000">100,000+ Followers</option>
              <option value="500000">500,000+ Followers</option>
              <option value="1000000">1,000,000+ Followers</option>
            </select>
          )}
        </div>

        {/* Niche Filter */}
        <div className="border-b border-white/5 pb-4">
          <button onClick={() => toggleSection("niche")} className="flex items-center justify-between w-full mb-3 group">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-indigo-400 transition">Niche / Category</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform ${expandedSections.niche ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.niche && (
            <select
              value={filters.niche || ""}
              onChange={(e) => onFiltersChange({ ...filters, niche: e.target.value || null })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white capitalize focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Niches</option>
              {niches.map((niche) => (
                <option key={niche.value} value={niche.value}>
                  {niche.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Verification Status */}
        <div>
          <button onClick={() => toggleSection("status")} className="flex items-center justify-between w-full mb-3 group">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-indigo-400 transition">Verifications</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform ${expandedSections.status ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.status && (
            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition">
                <input
                  type="checkbox"
                  checked={filters.verified || false}
                  onChange={(e) => onFiltersChange({ ...filters, verified: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  Verified Accounts Only
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition">
                <input
                  type="checkbox"
                  checked={filters.monetized || false}
                  onChange={(e) => onFiltersChange({ ...filters, monetized: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="size-3.5 text-emerald-400" />
                  Monetized Accounts Only
                </span>
              </label>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
};

export default FilterSidebar;

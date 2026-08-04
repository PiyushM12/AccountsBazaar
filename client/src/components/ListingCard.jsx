import React from 'react';
import { platformIcons } from '../assets/assets';
import { BadgeCheck, LineChart, MapPin, Users, ArrowUpRight, DollarSign, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();

    return (
        <div className='group relative glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10'>
            {/* Top Featured Ribbon */}
            {listing.featured && (
                <div className='absolute top-3 right-3 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-lg shadow-purple-500/30'>
                    <span>Featured</span>
                </div>
            )}

            <div className='p-5 sm:p-6'>
                {/* Header: Icon + Title + Username */}
                <div className='flex items-start gap-3.5 mb-4'>
                    <div className='shrink-0 transition-transform duration-300 group-hover:scale-110'>
                        {platformIcons[listing.platform] || (
                            <div className="size-10 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-400 font-bold capitalize">
                                {listing.platform?.[0] || 'P'}
                            </div>
                        )}
                    </div>

                    <div className='flex-1 min-w-0'>
                        <div className="flex items-center gap-1.5">
                            <h2 className='text-base font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors'>
                                {listing.title}
                            </h2>
                            {listing.verified && (
                                <BadgeCheck className='size-4 text-emerald-400 shrink-0' title="Verified Ownership" />
                            )}
                        </div>
                        <p className='text-xs text-slate-400 truncate mt-0.5'>
                            <span className="font-semibold text-slate-300">@{listing.username}</span> • <span className='capitalize text-indigo-400/90 font-medium'>{listing.platform}</span>
                        </p>
                    </div>
                </div>

                {/* Key Metrics Chips */}
                <div className='grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-slate-900/60 border border-white/5'>
                    <div className='flex items-center gap-2'>
                        <Users className='size-4 text-indigo-400 shrink-0' />
                        <div className="flex flex-col">
                            <span className='text-xs text-slate-400'>Followers</span>
                            <span className='text-sm font-bold text-slate-100'>
                                {listing.followers_count?.toLocaleString() || 'N/A'}
                            </span>
                        </div>
                    </div>

                    {listing.engagement_rate !== undefined && listing.engagement_rate !== null && (
                        <div className='flex items-center gap-2'>
                            <LineChart className='size-4 text-emerald-400 shrink-0' />
                            <div className="flex flex-col">
                                <span className='text-xs text-slate-400'>Engagement</span>
                                <span className='text-sm font-bold text-slate-100'>
                                    {listing.engagement_rate}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tags, Monetized badge & Location */}
                <div className='flex flex-wrap items-center gap-2 mb-4'>
                    <span className='text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full capitalize'>
                        {listing.niche || 'General'}
                    </span>
                    {listing.monetized && (
                        <span className='text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1'>
                            <DollarSign className="size-3" /> Monetized
                        </span>
                    )}
                    {listing.country && (
                        <span className='text-[11px] text-slate-400 flex items-center gap-1 ml-auto'>
                            <MapPin className='size-3 text-slate-500' />
                            {listing.country}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className='text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4'>
                    {listing.description || 'Verified social media account ready for ownership transfer.'}
                </p>
            </div>

            {/* Footer: Price & Action */}
            <div className='px-5 sm:px-6 py-4 bg-slate-900/80 border-t border-white/5 flex items-center justify-between mt-auto'>
                <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Buy Price</span>
                    <span className='text-xl sm:text-2xl font-extrabold text-white tracking-tight'>
                        <span className="text-indigo-400 font-medium mr-0.5">{currency}</span>
                        {listing.price?.toLocaleString()}
                    </span>
                </div>

                <button 
                    onClick={() => { navigate(`/listing/${listing.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className='px-4 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center gap-1.5 transition-all cursor-pointer group/btn'
                >
                    <span>View Deal</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
            </div>
        </div>
    );
};

export default ListingCard;

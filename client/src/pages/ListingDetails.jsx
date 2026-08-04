import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfileLink, platformIcons } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  ExternalLink,
  Calendar,
  BadgeCheck,
  ChevronLeftIcon,
  ChevronRightIcon,
  DollarSign,
  Eye,
  LineChart,
  Loader2Icon,
  MapPin,
  MessageSquareMoreIcon,
  ShoppingBagIcon,
  Users,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock
} from "lucide-react";
import { setChat } from "../app/features/chatSlice";
import { useAuth, useClerk, useUser } from "@clerk/react";
import toast from "react-hot-toast";
import api from "../configs/axios";

const ListingDetails = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [listing, setListing] = useState(null);
  const profileLink = listing && getProfileLink(listing.platform, listing.username);

  const { listingId } = useParams();
  const { listings } = useSelector((state) => state.listing);

  const [current, setCurrent] = useState(0);
  const images = listing?.images || [];

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const purchaseAccount = async () => {
    try {
      if (!user) {
        return openSignIn();
      }
      toast.loading('Initializing Escrow Payment Link...');
      const token = await getToken();
      const { data } = await api.get(`/api/listing/purchase-account/${listing.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.dismissAll();
      window.location.href = data.paymentLink;
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  const loadChatbox = () => {
    if (!isLoaded || !user) return toast("Please login to chat with seller");
    if (user.id === listing.ownerId) return toast("You cannot chat with your own listing");
    dispatch(setChat({ listing: listing }));
  };

  useEffect(() => {
    const foundListing = listings.find((item) => item.id === listingId || item._id === listingId);
    if (foundListing) {
      setListing(foundListing);
    }
  }, [listingId, listings]);

  return listing ? (
    <div className="py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto min-h-screen text-slate-100">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-6 transition"
      >
        <ArrowLeftIcon className="size-4" />
        <span>Back to Market</span>
      </button>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Main Left Details */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Header Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 shrink-0">
                  {platformIcons[listing.platform] || (
                    <div className="size-10 font-bold text-indigo-400 flex items-center justify-center">
                      {listing.platform?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                      {listing.title}
                    </h1>
                    {profileLink && (
                      <a 
                        href={profileLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20"
                      >
                        <span>Visit Profile</span>
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    <span className="font-semibold text-slate-200">@{listing.username}</span> • <span className="capitalize text-indigo-400 font-medium">{listing.platform}</span>
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {listing.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        <BadgeCheck className="size-3.5" />
                        Verified Account
                      </span>
                    )}
                    {listing.monetized && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                        <DollarSign className="size-3.5" />
                        Monetization Active
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-white/10">
                <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Buyout Price</span>
                <span className="text-3xl font-black text-white">
                  <span className="text-indigo-400 font-medium">{currency}</span>
                  {listing.price?.toLocaleString()}
                </span>
              </div>

            </div>
          </div>

          {/* Proof Screenshot Slider */}
          {images?.length > 0 && (
            <div className="glass-panel rounded-3xl border border-white/10 mb-6 overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Eye className="size-4 text-indigo-400" />
                  <span>Screenshots & Ownership Proof ({images.length})</span>
                </h3>
              </div>

              <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={images[current]}
                  alt="Listing proof"
                  className="w-full h-full object-contain"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 shadow-lg transition"
                    >
                      <ChevronLeftIcon className="size-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 shadow-lg transition"
                    >
                      <ChevronRightIcon className="size-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrent(idx)}
                          className={`size-2.5 rounded-full transition-all ${current === idx ? "bg-indigo-500 w-5" : "bg-slate-600"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Account Metrics Grid */}
          <div className="glass-panel rounded-3xl border border-white/10 mb-6 p-6">
            <h3 className="font-bold text-white text-base mb-4 border-b border-white/10 pb-3">
              Performance & Reach Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <Users className="mx-auto text-indigo-400 size-6 mb-1.5" />
                <p className="font-extrabold text-white text-lg">
                  {listing.followers_count?.toLocaleString() || 'N/A'}
                </p>
                <p className="text-xs text-slate-400">Total Followers</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <LineChart className="mx-auto text-emerald-400 size-6 mb-1.5" />
                <p className="font-extrabold text-white text-lg">
                  {listing.engagement_rate ? `${listing.engagement_rate}%` : 'N/A'}
                </p>
                <p className="text-xs text-slate-400">Engagement Rate</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <Eye className="mx-auto text-amber-400 size-6 mb-1.5" />
                <p className="font-extrabold text-white text-lg">
                  {listing.monthly_views?.toLocaleString() || 'N/A'}
                </p>
                <p className="text-xs text-slate-400">Monthly Impressions</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <Calendar className="mx-auto text-purple-400 size-6 mb-1.5" />
                <p className="font-extrabold text-white text-lg">
                  {new Date(listing.createdAt || Date.now()).toLocaleDateString()}
                </p>
                <p className="text-xs text-slate-400">Date Listed</p>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="glass-panel rounded-3xl border border-white/10 mb-6 p-6">
            <h3 className="font-bold text-white text-base mb-3 border-b border-white/10 pb-3">
              Account Overview & History
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Additional Meta Table */}
          <div className="glass-panel rounded-3xl border border-white/10 p-6">
            <h3 className="font-bold text-white text-base mb-4 border-b border-white/10 pb-3">
              Specifications & Attributes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <p className="text-slate-400 mb-1">Niche Category</p>
                <p className="font-bold text-white capitalize">{listing.niche || 'General'}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Target Region</p>
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="size-3.5 text-indigo-400" />
                  {listing.country || 'Global'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Audience Demographics</p>
                <p className="font-bold text-white">{listing.age_range || '18 - 34'}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Platform Assured</p>
                <p className="font-bold text-emerald-400">{listing.platformAssured ? "Verified Authentic" : "Standard Listing"}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Monetization Status</p>
                <p className="font-bold text-white">{listing.monetized ? "Enabled & Active" : "Disabled"}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Listing Status</p>
                <p className="font-bold text-indigo-400 capitalize">{listing.status || 'Active'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar: Seller Profile & Purchase Box */}
        <div className="w-full lg:w-96 shrink-0 space-y-6">
          
          {/* Purchase & Seller Box */}
          <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-2xl sticky top-24">
            
            <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-5">
              <div className="size-12 rounded-full overflow-hidden border-2 border-indigo-500/50">
                <img 
                  src={listing.owner?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'} 
                  alt="Seller Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-white text-base truncate">{listing.owner?.name || 'Verified Seller'}</h4>
                <p className="text-xs text-slate-400 truncate">{listing.owner?.email || 'Seller'}</p>
              </div>
            </div>

            {/* Escrow Guarantee Checklist */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 mb-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Escrow Protected Transaction</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your payment remains held securely in Escrow until you inspect credentials and take 100% control of the account.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={loadChatbox}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-white/10 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageSquareMoreIcon className="size-4 text-indigo-400" />
                <span>Chat with Seller</span>
              </button>

              {listing.isCredentialChanged ? (
                <button
                  onClick={purchaseAccount}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.02]"
                >
                  <ShoppingBagIcon className="size-4" />
                  <span>Buy Now ({currency}{listing.price?.toLocaleString()})</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs text-center flex items-center justify-center gap-1.5 font-medium">
                  <Clock className="size-3.5" />
                  <span>Credentials Under Verification</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <Loader2Icon className="size-8 animate-spin text-indigo-500" />
    </div>
  );
};

export default ListingDetails;

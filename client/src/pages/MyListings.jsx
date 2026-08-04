import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '@clerk/react';
import { getAllPublicListing, getAllUserListing } from '../app/features/listingSlice';
import { platformIcons } from '../assets/assets';
import {
  ArrowDownCircleIcon,
  BanIcon,
  CheckCircle,
  Clock,
  CoinsIcon,
  DollarSign,
  Edit,
  Eye,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  Plus,
  StarIcon,
  TrashIcon,
  TrendingUp,
  Users,
  WalletIcon,
  XCircle,
  PlusCircle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import CredentialSubmission from '../components/CredentialSubmission';
import WithdrawModal from '../components/WithdrawModal';
import toast from 'react-hot-toast';
import api from '../configs/axios';

const MyListings = () => {
  const listingState = useSelector((state) => state.listing || {});
  const userListings = Array.isArray(listingState.userListings) ? listingState.userListings : [];
  const balance = listingState.balance || { earned: 0, withdrawn: 0, available: 0 };
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();
  const [showCredentialSubmission, setShowCredentialSubmission] = useState(null);
  const [showWithdrawl, setShowWithdrawl] = useState(null);

  const totalValue = userListings.reduce((sum, listing) => sum + (Number(listing?.price) || 0), 0);
  const activeListing = userListings.filter((listing) => listing?.status === 'active').length;
  const soldListing = userListings.filter((listing) => listing?.status === 'sold').length;

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString() || "0";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <CheckCircle className='size-3.5' />;
      case "ban": return <BanIcon className='size-3.5' />;
      case "sold": return <DollarSign className='size-3.5' />;
      case "inactive": return <XCircle className='size-3.5' />;
      default: return <Clock className='size-3.5' />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "ban": return "text-red-400 bg-red-500/10 border-red-500/20";
      case "sold": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      case "inactive": return "text-slate-400 bg-slate-500/10 border-slate-500/20";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  const toggleStatus = async (listingId) => {
    try {
      toast.loading('Updating listing status...');
      const token = await getToken();
      const { data } = await api.put(`/api/listing/${listingId}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(getAllUserListing({ getToken }));
      dispatch(getAllPublicListing());
      toast.dismissAll();
      toast.success(data.message);
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteListing = async (listingId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this listing?\nIf credentials are changed, original credentials will be emailed back.');
      if (!confirm) return;

      toast.loading('Deleting listing...');
      const token = await getToken();
      const { data } = await api.delete(`/api/listing/${listingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(getAllUserListing({ getToken }));
      dispatch(getAllPublicListing());
      toast.dismissAll();
      toast.success(data.message);
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const markAsFeatured = async (listingId) => {
    try {
      toast.loading('Updating featured status...');
      const token = await getToken();
      const { data } = await api.put(`/api/listing/featured/${listingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(getAllUserListing({ getToken }));
      dispatch(getAllPublicListing());
      toast.dismissAll();
      toast.success(data.message);
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className='py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto min-h-screen text-slate-100'>
      
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/10 pb-6'>
        <div>
          <h1 className='text-3xl font-extrabold text-white tracking-tight'>
            My Account Listings
          </h1>
          <p className='text-slate-400 text-xs sm:text-sm mt-1'>Manage listings, credentials, and escrow payouts.</p>
        </div>

        <button
          onClick={() => navigate('/create-listing')}
          className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition cursor-pointer'
        >
          <PlusCircle className='size-4' />
          <span>New Account Listing</span>
        </button>
      </div>

      {/* Stats Widgets */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard title='Total Listings' value={userListings.length} icon={<Eye className='size-5 text-indigo-400' />} color='indigo' />
        <StatCard title='Active Listings' value={activeListing} icon={<CheckCircle className='size-5 text-emerald-400' />} color='green' />
        <StatCard title='Accounts Sold' value={soldListing} icon={<TrendingUp className='size-5 text-purple-400' />} color='purple' />
        <StatCard title='Portfolio Value' value={`${currency}${totalValue.toLocaleString()}`} icon={<DollarSign className='size-5 text-amber-400' />} color='yellow' />
      </div>

      {/* Wallet Balance Widget */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 mb-10 glass-panel rounded-3xl border border-white/10 shadow-xl'>
        {[
          { label: 'Total Earned', value: balance.earned, icon: WalletIcon, color: 'text-indigo-400' },
          { label: 'Withdrawn', value: balance.withdrawn, icon: ArrowDownCircleIcon, color: 'text-slate-400' },
          { label: 'Available Balance', value: balance.available, icon: CoinsIcon, color: 'text-emerald-400', isAction: true },
        ].map((item, index) => (
          <div
            onClick={() => item.isAction && setShowWithdrawl(true)}
            key={index}
            className={`p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between transition-all ${item.isAction ? 'cursor-pointer hover:border-emerald-500/40 hover:bg-slate-900/90' : ''}`}
          >
            <div className='flex items-center gap-3'>
              <item.icon className={`size-5 ${item.color}`} />
              <div>
                <p className='text-xs text-slate-400 font-medium'>{item.label}</p>
                <p className='text-xl font-bold text-white tracking-tight mt-0.5'>
                  {currency}{item.value.toFixed(2)}
                </p>
              </div>
            </div>
            {item.isAction && (
              <span className="text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Withdraw
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Listings Grid */}
      {userListings.length === 0 ? (
        <div className='glass-panel rounded-3xl border border-white/10 p-16 text-center max-w-xl mx-auto'>
          <div className='size-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-indigo-400'>
            <Plus className='size-8' />
          </div>
          <h3 className='text-xl font-bold text-white mb-2'>No active listings found</h3>
          <p className='text-slate-400 text-sm mb-6'>Create your first account listing to start receiving buyer offers.</p>
          <button
            onClick={() => navigate("/create-listing")}
            className='px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition'
          >
            Create First Listing
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {userListings.map((listing) => (
            <div key={listing.id || listing._id} className='glass-card rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all'>
              <div>
                {/* Header */}
                <div className='flex items-start gap-3.5 mb-4'>
                  <div className='shrink-0'>
                    {platformIcons[listing.platform] || (
                      <div className="size-10 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-400 font-bold capitalize">
                        {listing.platform?.[0] || 'P'}
                      </div>
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-start gap-2'>
                      <h3 className='text-base font-bold text-white tracking-tight truncate'>
                        {listing.title}
                      </h3>

                      <div className='flex items-center gap-1.5 shrink-0'>
                        {/* Credentials Status Popover */}
                        <div className='relative group'>
                          <LockIcon className='size-4 text-slate-400 hover:text-indigo-400 cursor-pointer' />
                          <div className='invisible group-hover:visible absolute right-0 top-6 z-20 w-48 bg-slate-900 border border-white/10 rounded-xl p-3 shadow-2xl text-xs space-y-2'>
                            {!listing.isCredentialsSubmitted && (
                              <button
                                onClick={() => setShowCredentialSubmission(listing)}
                                className='w-full text-left font-semibold text-indigo-400 hover:underline'
                              >
                                + Submit Credentials
                              </button>
                            )}
                            <div className='text-slate-400'>
                              Status:{" "}
                              <span className={`font-semibold ${
                                listing.isCredentialSubmitted
                                  ? listing.isCredentialVerified
                                    ? listing.isCredentialChanged
                                      ? "text-emerald-400"
                                      : "text-indigo-400"
                                    : "text-amber-400"
                                  : "text-slate-400"
                              }`}>
                                {listing.isCredentialSubmitted
                                  ? listing.isCredentialVerified
                                    ? listing.isCredentialChanged
                                      ? "Changed"
                                      : "Verified"
                                    : "Submitted"
                                  : "Not Submitted"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {listing.status === 'active' && (
                          <StarIcon
                            onClick={() => markAsFeatured(listing.id || listing._id)}
                            className={`size-4 text-amber-400 cursor-pointer ${listing.featured ? "fill-amber-400" : ""}`}
                            title="Toggle Featured"
                          />
                        )}
                      </div>
                    </div>

                    <p className='text-xs text-slate-400 truncate mt-0.5'>
                      @{listing.username}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className='grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs'>
                  <div className='flex items-center gap-1.5 text-slate-300'>
                    <Users className='size-3.5 text-indigo-400' />
                    <span>{formatNumber(listing.followers_count)} followers</span>
                  </div>

                  <div className={`inline-flex items-center justify-end gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getStatusColor(listing.status)}`}>
                    {getStatusIcon(listing.status)}
                    <span className="capitalize">{listing.status}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className='flex items-center justify-between pt-4 border-t border-white/10 mt-2'>
                <span className='text-xl font-black text-white'>
                  <span className="text-indigo-400 font-medium">{currency}</span>
                  {listing.price?.toLocaleString()}
                </span>

                <div className='flex items-center gap-2'>
                  {listing.status !== "sold" && (
                    <button
                      onClick={() => deleteListing(listing.id || listing._id)}
                      className='p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/5 transition'
                      title="Delete Listing"
                    >
                      <TrashIcon className='size-4' />
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/edit-listing/${listing.id || listing._id}`)}
                    className='p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 border border-white/5 transition'
                    title="Edit Listing"
                  >
                    <Edit className='size-4' />
                  </button>

                  <button
                    onClick={() => toggleStatus(listing.id || listing._id)}
                    className='p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-purple-400 border border-white/5 transition'
                    title="Toggle Active/Inactive"
                  >
                    {listing.status === "active" ? <EyeOffIcon className='size-4' /> : <EyeIcon className='size-4' />}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {showCredentialSubmission && (
        <CredentialSubmission listing={showCredentialSubmission} onClose={() => setShowCredentialSubmission(null)} />
      )}

      {showWithdrawl && (
        <WithdrawModal onClose={() => setShowWithdrawl(null)} />
      )}
    </div>
  );
};

export default MyListings;

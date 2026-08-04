import React, { useEffect, useState } from "react";
import { platformIcons } from "../assets/assets";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Loader2Icon,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  Lock
} from "lucide-react";
import { format } from "date-fns";
import { useAuth, useUser } from "@clerk/react";
import api from "../configs/axios";

const MyOrders = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await api.get('/api/listing/user-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data.orders || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } fontFinally: {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isLoaded) {
      fetchOrders();
    }
  }, [isLoaded, user]);

  const mask = (val, type) => {
    if (!val && val !== 0) return "-";
    return type.toLowerCase() === "password" ? "●".repeat(8) : String(val);
  };

  const copy = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      toast.success("Credential copied to clipboard!");
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2Icon className="size-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-24 max-w-4xl mx-auto min-h-screen text-slate-100">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">My Orders</h1>
        <div className="glass-panel rounded-3xl border border-white/10 p-12 text-center">
          <div className="size-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-indigo-400">
            <ShoppingBag className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Orders Placed Yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            When you purchase social accounts through Escrow, your order history and credentials will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-6xl mx-auto min-h-screen text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Orders & Escrow Accounts</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Access purchased account credentials, passwords, and order receipts.</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
          <ShieldCheck className="size-4" />
          Escrow Released ({orders.length})
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const id = order.id || order._id;
          const listing = order.listing || {};
          const credential = order.credential || {};
          const isExpanded = expandedId === id;

          return (
            <div
              key={id}
              className="glass-card rounded-3xl border border-white/10 p-6 flex flex-col transition-all hover:border-indigo-500/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 shrink-0">
                    {platformIcons[listing.platform] || (
                      <div className="size-8 font-bold text-indigo-400 flex items-center justify-center">
                        {listing.platform?.[0]?.toUpperCase() || 'A'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{listing.title || 'Social Account'}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-200">@{listing.username}</span> • <span className="capitalize text-indigo-400">{listing.platform}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="size-3" /> Paid & Escrow Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                  <span className="text-xs text-slate-400">Total Price</span>
                  <span className="text-2xl font-black text-white">
                    <span className="text-indigo-400 font-medium">{currency}</span>
                    {Number(order.amount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Expand Toggle & Date */}
              <div className="flex items-center justify-between pt-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="size-3.5" />
                  <span>Purchased on {format(new Date(order.createdAt || Date.now()), "MMM d, yyyy")}</span>
                </div>

                <button
                  onClick={() => setExpandedId((p) => (p === id ? null : id))}
                  className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-semibold text-xs border border-indigo-500/30 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="size-3.5" />
                  <span>{isExpanded ? "Hide Credentials" : "View Verified Credentials"}</span>
                  {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>

              {/* Credentials Section */}
              {isExpanded && credential?.updatedCredential && (
                <div className="mt-4 pt-4 border-t border-white/10 bg-slate-900/80 p-4 rounded-2xl border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <ShieldCheck className="size-4" />
                    Encrypted Credentials & Login Access
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {credential.updatedCredential.map((cred, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-white/5"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{cred.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase">{cred.type}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono bg-slate-900 px-2.5 py-1 rounded border border-white/10 text-indigo-300">
                            {mask(cred.value, cred.type)}
                          </code>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copy(cred.value);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-white/10"
                            title="Copy Value"
                          >
                            <Copy className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;

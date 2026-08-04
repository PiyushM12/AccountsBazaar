import React, { useEffect, useState, useMemo } from "react";
import { MessageCircle, Search, Sparkles } from "lucide-react";
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { useDispatch } from "react-redux";
import { setChat } from "../app/features/chatSlice";
import { useAuth, useUser } from "@clerk/react";
import api from "../configs/axios";
import toast from "react-hot-toast";

const Messages = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    if (isToday(date)) {
      return 'Today ' + format(date, "HH:mm");
    }
    if (isYesterday(date)) {
      return 'Yesterday ' + format(date, "HH:mm");
    }
    return format(date, "MMM d");
  };

  const handleOpenChat = (chat) => {
    dispatch(setChat({ listing: chat.listing, chatId: chat.id }));
  };

  const filteredChats = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return chats.filter((chat) => {
      const chatUser = chat.chatUserId === user?.id ? chat?.ownerUser : chat?.chatUser;
      return chat.listing?.title?.toLowerCase().includes(query) || chatUser?.name?.toLowerCase().includes(query);
    });
  }, [chats, searchQuery, user?.id]);

  const fetchUserchats = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/chat/user", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChats(data.chats || []);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isLoaded) {
      fetchUserchats();
      const interval = setInterval(() => {
        fetchUserchats();
      }, 10 * 1000);
      return () => clearInterval(interval);
    }
  }, [user, isLoaded]);

  return (
    <div className="py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-5xl mx-auto min-h-screen text-slate-100">
      <div className="border-b border-white/10 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Messages & Conversations</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Real-time direct chat between buyers, sellers, and escrow moderators.</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
        <input
          type="text"
          placeholder="Search by title or user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs transition"
        />
      </div>

      {/* Chat List */}
      {loading ? (
        <div className="text-center text-slate-400 py-20">
          Loading Conversations...
        </div>
      ) : filteredChats.length === 0 ? (
        <div className="glass-panel rounded-3xl border border-white/10 p-12 text-center">
          <div className="size-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-indigo-400">
            <MessageCircle className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {searchQuery ? "No matching chats found" : "No Active Messages"}
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {searchQuery
              ? "Try searching with a different username or listing title."
              : 'Browse the marketplace, click on any listing, and select "Chat with Seller" to initiate a conversation.'}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/10 divide-y divide-white/5 overflow-hidden">
          {filteredChats.map((chat) => {
            const chatUser = chat.chatUserId === user?.id ? chat.ownerUser : chat.chatUser;
            const isUnread = !chat.isLastMessageRead && chat.lastMessageSenderId !== user?.id;

            return (
              <button
                onClick={() => handleOpenChat(chat)}
                key={chat.id || chat._id}
                className="w-full p-4 sm:p-5 hover:bg-slate-900/60 transition text-left flex items-start gap-4 group cursor-pointer"
              >
                <div className="relative shrink-0">
                  <img
                    src={chatUser?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'}
                    alt={chatUser?.name || 'User'}
                    className="size-12 rounded-2xl object-cover border border-white/10 group-hover:border-indigo-500/50 transition"
                  />
                  {isUnread && (
                    <span className="absolute -top-1 -right-1 size-3 bg-indigo-500 rounded-full border-2 border-[#0b0f19]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-white text-sm truncate group-hover:text-indigo-300 transition">
                      {chat.listing?.title || 'Account Inquiry'}
                    </h3>
                    <span className="text-[11px] text-slate-400 shrink-0">{formatTime(chat.updatedAt)}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium truncate mb-1">
                    {chatUser?.name || 'Seller'}
                  </p>
                  <p className={`text-xs truncate ${isUnread ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}>
                    {chat.lastMessage || 'No messages yet'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;

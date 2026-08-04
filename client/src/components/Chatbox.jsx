import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2Icon, Send, X, ShieldCheck } from 'lucide-react';
import { clearChat } from '../app/features/chatSlice';
import { format } from 'date-fns';
import { useAuth, useUser } from '@clerk/react';
import api from '../configs/axios';
import toast from 'react-hot-toast';

const Chatbox = () => {
    const { listing, isOpen, chatId } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const { getToken } = useAuth();
    const { user } = useUser();
    
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const fetchChat = async () => {
       try {
        const token = await getToken();
        const { data } = await api.post('/api/chat', { listingId: listing.id || listing._id, chatId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChat(data?.chat);
        setMessages(data?.chat?.messages || []);
        setIsLoading(false);
       } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        console.log(error);
       }
    };

    useEffect(() => {
        if (listing) {
            fetchChat();
            const interval = setInterval(() => {
                fetchChat();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [listing]);

    useEffect(() => {
        if (!isOpen) {
            setChat(null);
            setMessages([]);
            setIsLoading(true);
            setNewMessage("");
            setIsSending(false);
        }
    }, [isOpen]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;
        
        try {
            setIsSending(true);
            const token = await getToken();
            const { data } = await api.post('/api/chat/send-message', {
              chatId: chat.id || chat._id,
              message: newMessage
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setMessages([...messages, data.newMessage]);
            setNewMessage("");
            setIsSending(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
            console.log(error);
            setIsSending(false);
        }
    };

    if (!isOpen || !listing) return null;

  return (
    <div className='fixed inset-0 bg-[#0b0f19]/80 backdrop-blur-md z-[200] flex justify-center items-center p-2 sm:p-4'>
        <div className='bg-[#0f172a] sm:rounded-3xl border border-white/10 shadow-2xl w-full max-w-2xl h-full sm:h-[620px] flex flex-col overflow-hidden text-slate-100'>
            
            {/* Header */}
            <div className='p-4 sm:p-5 bg-slate-900 border-b border-white/10 flex items-center justify-between'>
                <div className='flex-1 min-w-0 pr-3'>
                    <div className="flex items-center gap-2">
                        <h3 className='font-bold text-base text-white truncate'>{listing?.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold shrink-0 flex items-center gap-1">
                            <ShieldCheck className="size-3" /> Escrow Chat
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                        {user.id === listing?.ownerId 
                            ? `Chatting with buyer (${chat?.chatUser?.name || 'Loading...'})`
                            : `Chatting with seller (${chat?.ownerUser?.name || 'Loading...'})`}
                    </p>
                </div>

                <button
                    onClick={() => dispatch(clearChat())}
                    className='p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer'
                >
                    <X className="size-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/60 no-scrollbar'>
                {isLoading ? (
                    <div className='flex items-center justify-center h-full'>
                        <Loader2Icon className='size-8 animate-spin text-indigo-500' />
                    </div>
                ) : messages.length === 0 ? (
                    <div className='flex items-center justify-center h-full text-center'>
                        <div>
                            <p className='text-slate-400 font-semibold text-sm mb-1'>No messages in this chat yet</p>
                            <p className='text-xs text-slate-500'>Send a message to clarify account analytics, transfer process, or price.</p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isMe = message.sender_id === user.id;
                        return (
                            <div key={message.id || message._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] rounded-2xl p-3.5 ${
                                    isMe 
                                        ? "bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20" 
                                        : "bg-slate-900 border border-white/10 text-slate-100 rounded-bl-none"
                                }`}>
                                    <p className='text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap'>
                                        {message.message}
                                    </p>
                                    <p className={`text-[9px] mt-1.5 text-right font-medium ${isMe ? "text-indigo-200" : "text-slate-500"}`}>
                                        {format(new Date(message.createdAt || Date.now()), "MMM dd 'at' h:mm a")}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {chat?.listing?.status === "active" ? (
                <form onSubmit={handleSendMessage} className='p-3 sm:p-4 bg-slate-900 border-t border-white/10'>
                    <div className='flex items-center gap-2'>
                        <textarea 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            placeholder='Type your message (Enter to send)...'
                            className='flex-1 resize-none bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 max-h-28'
                            rows={1}
                        />
                        <button
                            disabled={!newMessage.trim() || isSending}
                            type='submit'
                            className='p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white disabled:opacity-40 transition cursor-pointer shadow-md'
                        >
                            {isSending ? <Loader2Icon className='size-4 animate-spin' /> : <Send className='size-4' />}
                        </button>
                    </div>
                </form>
            ) : (
                <div className='p-4 bg-slate-900 border-t border-white/10 text-center'>
                    <p className='text-xs text-slate-400 font-medium'>
                        {chat ? `Listing is ${chat?.listing?.status}` : "Loading conversation..."}
                    </p>
                </div>
            )}

        </div>
    </div>
  );
};

export default Chatbox;

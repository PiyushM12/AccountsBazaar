import React, { useState } from 'react'
import logo from "../assets/accountsbazaarlogo.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { XIcon, MenuIcon, GripIcon, MessageCircleMoreIcon, ListIcon, BoxIcon, PlusCircle, Sparkles } from "lucide-react";
import { useClerk, useUser, UserButton } from '@clerk/react';

const Navbar = () => {
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className='h-20'>
            <div className='fixed left-0 top-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-3.5 bg-[#0b0f19]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all'>
                
                {/* Brand Logo & Name */}
                <div 
                    onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <img src={logo} alt="AccountsBazaar Logo" className="h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                </div>

                {/* Desktop Nav Links */}
                <nav className='hidden md:flex items-center gap-1 lg:gap-2 bg-slate-900/60 p-1.5 rounded-full border border-white/10 text-sm font-medium text-slate-300'>
                    <Link 
                        to='/' 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className={`px-4 py-1.5 rounded-full transition-all ${isActive('/') ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-sm' : 'hover:text-white hover:bg-white/5'}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to='/marketplace' 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className={`px-4 py-1.5 rounded-full transition-all ${isActive('/marketplace') ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-sm' : 'hover:text-white hover:bg-white/5'}`}
                    >
                        Marketplace
                    </Link>
                    <Link 
                        to={user ? '/messages' : '#'} 
                        onClick={() => user ? window.scrollTo({ top: 0, behavior: 'smooth' }) : openSignIn()}
                        className={`px-4 py-1.5 rounded-full transition-all ${isActive('/messages') ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-sm' : 'hover:text-white hover:bg-white/5'}`}
                    >
                        Messages
                    </Link>
                    <Link 
                        to={user ? '/my-listings' : '#'} 
                        onClick={() => user ? window.scrollTo({ top: 0, behavior: 'smooth' }) : openSignIn()}
                        className={`px-4 py-1.5 rounded-full transition-all ${isActive('/my-listings') ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-sm' : 'hover:text-white hover:bg-white/5'}`}
                    >
                        My Listings
                    </Link>
                </nav>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* Sell Account Button */}
                    <button
                        onClick={() => user ? navigate('/create-listing') : openSignIn()}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <PlusCircle className="size-4" />
                        <span>Sell Account</span>
                    </button>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={openSignIn} 
                                className='px-5 py-2 text-xs md:text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-full transition-all cursor-pointer'
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={() => setMenuOpen(!menuOpen)} 
                                className='md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/60 border border-white/10'
                            >
                                {menuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-9 h-9 border-2 border-indigo-500/60 shadow-md shadow-indigo-500/20"
                                    }
                                }}
                            >
                                <UserButton.MenuItems>
                                    <UserButton.Action label='Marketplace' labelIcon={<GripIcon size={16} className="text-indigo-400" />} onClick={() => navigate('/marketplace')} />
                                    <UserButton.Action label='Messages' labelIcon={<MessageCircleMoreIcon size={16} className="text-indigo-400" />} onClick={() => navigate('/messages')} />
                                    <UserButton.Action label='My Listings' labelIcon={<ListIcon size={16} className="text-indigo-400" />} onClick={() => navigate('/my-listings')} />
                                    <UserButton.Action label='My Orders' labelIcon={<BoxIcon size={16} className="text-indigo-400" />} onClick={() => navigate('/my-orders')} />
                                </UserButton.MenuItems>
                            </UserButton>
                            
                            <button 
                                onClick={() => setMenuOpen(!menuOpen)} 
                                className='md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/60 border border-white/10'
                            >
                                {menuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0b0f19]/95 backdrop-blur-2xl border-t border-white/10 z-[90] transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className='flex flex-col h-full justify-between p-6 overflow-y-auto'>
                    <div className='flex flex-col gap-3 font-medium text-slate-200'>
                        <Link 
                            to='/' 
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30"
                        >
                            <span>Home</span>
                            <Sparkles className="size-4 text-indigo-400" />
                        </Link>
                        <Link 
                            to='/marketplace' 
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30"
                        >
                            <span>Marketplace</span>
                            <GripIcon className="size-4 text-indigo-400" />
                        </Link>
                        <button 
                            onClick={() => { setMenuOpen(false); user ? navigate('/messages') : openSignIn(); }}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 text-left"
                        >
                            <span>Messages</span>
                            <MessageCircleMoreIcon className="size-4 text-indigo-400" />
                        </button>
                        <button 
                            onClick={() => { setMenuOpen(false); user ? navigate('/my-listings') : openSignIn(); }}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 text-left"
                        >
                            <span>My Listings</span>
                            <ListIcon className="size-4 text-indigo-400" />
                        </button>
                        <button 
                            onClick={() => { setMenuOpen(false); user ? navigate('/my-orders') : openSignIn(); }}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 text-left"
                        >
                            <span>My Orders</span>
                            <BoxIcon className="size-4 text-indigo-400" />
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                        <button
                            onClick={() => { setMenuOpen(false); user ? navigate('/create-listing') : openSignIn(); }}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30"
                        >
                            <PlusCircle className="size-5" />
                            <span>List Account for Sale</span>
                        </button>

                        {!user && (
                            <button
                                onClick={() => { setMenuOpen(false); openSignIn(); }}
                                className="w-full py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                            >
                                Sign In / Register
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

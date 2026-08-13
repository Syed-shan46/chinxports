import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const LuxuryHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { setIsDrawerOpen, cart, setIsPartnerModalOpen } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchSubmit = (q) => {
        if (!q || !q.trim()) return;
        setSearchOpen(false);
        navigate(`/store?search=${encodeURIComponent(q.trim())}`);
        setSearchQuery('');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Disable body scroll when search is open
    useEffect(() => {
        if (searchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [searchOpen]);

    const isLightPage = location.pathname === '/' || 
                       location.pathname.includes('/product') || 
                       location.pathname.includes('/cart') || 
                       location.pathname.includes('/store'); 
    const textColorClass = (isScrolled) ? 'text-matte-black' : (isLightPage ? 'text-matte-black' : 'text-soft-white');
    const logoColorClass = (isScrolled) ? 'text-matte-black' : (isLightPage ? 'text-matte-black' : 'text-soft-white');

    const navLinks = [
        { name: 'Collections', path: '/store' },
        { name: 'Wholesale', path: '/wholesale' },
        { name: 'Manufacturing', path: '/services' },
        { name: 'Shipping', path: '/shipping' },
        { name: 'About', path: '/about' },
    ];

    const trendingSearches = [
        "18K Gold Bangles", "Bulk Watches", "Diamond Cut Necklaces", "Wholesale Rings", "Anti-Tarnish Series"
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
                    isScrolled 
                    ? 'bg-white border-b border-black/[0.05] py-2.5 shadow-sm' 
                    : 'bg-transparent py-5'
                }`}
            >
                <div className="px-6 lg:px-16 flex items-center justify-between">
                    {/* Left: Logo */}
                    <Link to="/" className="relative group flex flex-col items-start">
                        <span className={`font-display text-base lg:text-[17px] tracking-[0.45em] uppercase font-extrabold transition-all duration-500 ${
                            isScrolled || isLightPage ? 'text-matte-black' : 'text-soft-white'
                        }`}>
                            CHINAXPORTS
                        </span>
                        <div className="flex items-center gap-1.5 -mt-0.5">
                            <div className="w-4 h-[0.5px] bg-primary-gold/40"></div>
                            <span className="text-[7px] tracking-[0.5em] uppercase font-bold text-primary-gold/80">
                                Global Wholesale
                            </span>
                        </div>
                    </Link>

                    {/* Center: Menu */}
                    <nav className="hidden xl:flex items-center gap-10">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path.split('?')[0];
                            let linkClass = isActive 
                                ? 'text-primary-gold' 
                                : isScrolled 
                                    ? 'text-matte-black/70 hover:text-matte-black'
                                    : isLightPage 
                                        ? 'text-matte-black/70 hover:text-matte-black'
                                        : 'text-soft-white/70 hover:text-soft-white';

                            return (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    className={`relative text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 group ${linkClass}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary-gold transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5 lg:gap-7">
                        <div className="flex items-center gap-4 lg:gap-5">
                            <button 
                                onClick={() => setSearchOpen(true)}
                                className={`hover:text-primary-gold transition-all duration-300 ${
                                    isScrolled || isLightPage ? 'text-matte-black/70' : 'text-soft-white/70'
                                }`} 
                                aria-label="Search"
                            >
                                <Search size={20} strokeWidth={1.2} />
                            </button>
                            <button 
                                className={`hidden sm:block hover:text-primary-gold transition-all duration-300 ${
                                    isScrolled || isLightPage ? 'text-matte-black/70' : 'text-soft-white/70'
                                }`} 
                                aria-label="Wishlist"
                            >
                                <Heart size={20} strokeWidth={1.2} />
                            </button>
                            <button 
                                onClick={() => setIsDrawerOpen(true)}
                                className={`hover:text-primary-gold transition-all duration-300 relative ${
                                    isScrolled || isLightPage ? 'text-matte-black/70' : 'text-soft-white/70'
                                }`}
                                aria-label="Shopping Bag"
                            >
                                <ShoppingBag size={20} strokeWidth={1.2} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-matte-black text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setIsPartnerModalOpen(true)}
                            className="hidden md:flex items-center gap-2 group px-5 py-2 rounded-full border border-black/10 text-matte-black text-[9px] font-bold tracking-widest uppercase hover:bg-matte-black hover:text-white transition-all duration-500"
                        >
                            <span>Distributor</span>
                            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                        </button>

                        <button 
                            className={`lg:hidden transition-colors ${
                                isScrolled || isLightPage ? 'text-matte-black' : 'text-soft-white'
                            }`}
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open Menu"
                        >
                            <Menu size={22} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Premium Full-Screen Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] bg-white flex flex-col"
                    >
                        <div className="px-6 lg:px-16 py-6 flex items-center justify-between border-b border-black/5">
                            <span className="font-display text-lg tracking-[0.2em] uppercase font-bold text-matte-black">
                                SEARCH COLLECTIONS
                            </span>
                            <button 
                                onClick={() => setSearchOpen(false)} 
                                className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-charcoal/40 hover:text-matte-black transition-colors"
                            >
                                <span>Close</span>
                                <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-start pt-20 px-6">
                            <div className="w-full max-w-4xl">
                                <div className="relative group">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-primary-gold/40 group-focus-within:text-primary-gold transition-colors" size={32} strokeWidth={1} />
                                    <input 
                                        autoFocus
                                        type="text"
                                        placeholder="Discover premium jewelry..."
                                        className="w-full bg-transparent border-b-[0.5px] border-black/10 focus:border-primary-gold py-8 pl-14 pr-4 text-3xl md:text-5xl font-display italic outline-none text-matte-black placeholder:text-black/5 transition-all duration-700"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSearchSubmit(searchQuery);
                                        }}
                                    />
                                </div>

                                <div className="mt-16">
                                    <div className="flex items-center gap-3 mb-8">
                                        <TrendingUp size={16} className="text-primary-gold" />
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-charcoal/30">Trending Now</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {trendingSearches.map((tag) => (
                                            <button 
                                                key={tag}
                                                className="px-6 py-3 rounded-full border border-black/5 hover:border-primary-gold hover:text-primary-gold text-[11px] font-medium tracking-wide transition-all duration-300 bg-off-white hover:bg-white"
                                                onClick={() => handleSearchSubmit(tag)}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Results Preview Area (Optional) */}
                        <div className="h-24 bg-[#fafafa] border-t border-black/5 flex items-center justify-center">
                            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-charcoal/20">Enter a keyword to explore the vault</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-white flex flex-col"
                    >
                        <div className="px-6 py-6 flex items-center justify-between border-b border-black/5">
                            <Link to="/" className="flex flex-col" onClick={() => setMobileMenuOpen(false)}>
                                <span className="font-display text-lg tracking-[0.3em] uppercase font-bold text-matte-black">
                                    CHINAXPORTS
                                </span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-matte-black p-2 border border-black/5 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex-1 px-8 py-12 flex flex-col gap-10">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link 
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-4xl font-display text-matte-black hover:text-primary-gold transition-colors block italic"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-auto pb-12"
                            >
                                <Link 
                                    to="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full h-14 bg-matte-black text-white rounded-full flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase hover:bg-primary-gold hover:text-matte-black transition-all shadow-2xl"
                                >
                                    <span>Become a Distributor</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LuxuryHeader;

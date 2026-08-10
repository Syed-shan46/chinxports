import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useCart } from "../../context/CartContext";
import { getSafeImageUrl } from "../../utils/imageUtils";

export default function Header() {
  const { cart } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const toggleCategory = (id) => {
    setOpenCategoryId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const res = await fetch(`${BASE_URL}/api/categories/get-maincategories`, { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        const allowedIds = ['69c3a9a610f636c152943709', '6926fcfd1d552abbe3a6c307', '69c36d19eab4f288c1d04248'];
        const cats = (data.categories || [])
          .filter(c => allowedIds.includes(c._id))
          .map(c => {
             let formattedName = c.name;
             if (c._id === '69c3a9a610f636c152943709') formattedName = "18k Gold Plated";
             else if (c._id === '6926fcfd1d552abbe3a6c307') formattedName = "316L Stainless Steel";
             else if (c._id === '69c36d19eab4f288c1d04248') formattedName = "Premium 18k Gold";
             return {
               ...c,
               name: formattedName,
               subCategories: (c.subCategories || []).map(s => ({
                 ...s,
                 name: s.name.charAt(0).toUpperCase() + s.name.slice(1)
               }))
             };
          });
        setCategories(cats);
        if (cats.length > 0) setOpenCategoryId(cats[0]._id);
      } catch (err) {
        if (err.name !== "AbortError") console.warn("Fetch error:", err);
      }
    }
    loadCategories();
    return () => controller.abort();
  }, []);

  // Handle Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const resp = await fetch(`${BASE_URL}/api/categories/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await resp.json();
        setSearchResults(data || { products: [], subCategories: [] });
      } catch (err) {
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Handle auto-opening the first category when menu opens
  useEffect(() => {
    if (isMenuOpen && categories.length > 0 && !openCategoryId) {
      setOpenCategoryId(categories[0]._id);
    }
  }, [isMenuOpen, categories]);

  return (
    <>
      {/* Header Container */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? "bg-white/90 backdrop-blur-xl py-3 border-black/[0.03] shadow-sm" : "bg-white/50 backdrop-blur-sm py-5 border-transparent"
          }`}
      >
        <div className="container mx-auto px-3 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-1">
              <span className="font-display text-base lg:text-lg font-semibold tracking-[0.2em] text-deep-black uppercase transition-all duration-700">
                China<span className="text-primary-gold group-hover:text-deep-black transition-colors">X</span>ports
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              <NavLink to="/" className={({ isActive }) => `relative font-body text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary-gold ${isActive ? "text-primary-gold" : "text-charcoal"}`}>Home</NavLink>

              {categories.map((cat) => (
                <div key={cat._id} className="relative group">
                  <NavLink 
                    to={`/store?category=${cat._id}`} 
                    className={({ isActive }) => `flex items-center gap-1 font-body text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary-gold ${location.search.includes(cat._id) ? "text-primary-gold" : "text-charcoal"}`}
                  >
                    {cat.name}
                    <i className="bi bi-chevron-down text-[8px] opacity-40 group-hover:rotate-180 transition-transform"></i>
                  </NavLink>
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-black/[0.03] shadow-2xl rounded-sm py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {cat.subCategories?.map(sub => (
                      <Link 
                        key={sub._id} 
                        to={`/store?category=${cat._id}&sub=${sub._id}`}
                        className="block px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-charcoal hover:text-primary-gold hover:bg-off-white transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <NavLink to="/store?category=69c36d19eab4f288c1d04248" end className={({ isActive }) => `relative font-body text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary-gold ${location.pathname === '/store' ? "text-primary-gold" : "text-charcoal"}`}>Store</NavLink>
              <NavLink to="/about" className={({ isActive }) => `relative font-body text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary-gold ${isActive ? "text-primary-gold" : "text-charcoal"}`}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `relative font-body text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary-gold ${isActive ? "text-primary-gold" : "text-charcoal"}`}>Contact</NavLink>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-3 lg:gap-6">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-charcoal hover:text-primary-gold transition-all"
              >
                <i className={`bi ${isSearchOpen ? "bi-x-lg" : "bi-search"} text-lg`}></i>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="w-10 h-10 flex items-center justify-center relative rounded-full hover:bg-black/5 text-charcoal hover:text-primary-gold transition-all"
              >
                <i className="bi bi-handbag text-xl"></i>
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-deep-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg border border-white">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-deep-black hover:text-primary-gold transition-all duration-500"
              >
                <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Overlay */}
        <div
          className={`absolute top-full left-0 w-full bg-white border-t border-black/5 shadow-2xl transition-all duration-500 origin-top overflow-hidden ${isSearchOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
            }`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search premium products..."
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-off-white border-none focus:ring-2 focus:ring-primary-gold/20 rounded-sm py-4 px-6 font-body text-sm placeholder:italic"
              />
              <i className="bi bi-search absolute right-6 top-1/2 -translate-y-1/2 text-warm-gray"></i>
            </div>

            {/* Enhanced Live Results Container */}
            {(searchResults.products?.length > 0 || searchResults.subCategories?.length > 0) && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[450px] p-2 custom-scrollbar pr-4">
                {/* Product Matches Section */}
                {searchResults.products?.length > 0 && (
                  <div className="lg:col-span-2">
                    <h5 className="text-[10px] font-bold tracking-[0.3em] text-primary-gold uppercase mb-4 border-b border-black/5 pb-2">Matching Products</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.products.map((p) => (
                        <Link
                          key={p._id}
                          to={`/products/product-details/${p._id}`}
                          className="flex items-center gap-4 p-4 hover:bg-off-white/80 rounded-sm transition-all group border border-transparent hover:border-black/[0.03]"
                        >
                          <div className="w-16 h-16 rounded-sm overflow-hidden bg-off-white border border-black/5 flex-shrink-0">
                            <img
                              src={getSafeImageUrl(p.imageUrl[0] || p.imageUrl)}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              alt={p.productName}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[12px] font-bold text-charcoal group-hover:text-primary-gold transition-colors leading-snug line-clamp-1 italic font-display uppercase tracking-widest">
                              {p.productName}
                            </h4>
                            <p className="text-[10px] text-warm-gray mt-1 opacity-60">Signature Collection</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Discovery Section */}
                {searchResults.subCategories?.length > 0 && (
                  <div className="lg:col-span-1">
                    <h5 className="text-[10px] font-bold tracking-[0.3em] text-primary-gold uppercase mb-4 border-b border-black/5 pb-2">Explore Categories</h5>
                    <div className="flex flex-col gap-2">
                      {searchResults.subCategories.map((sub) => (
                        <Link
                          key={sub._id}
                          to={`/store?category=${sub.mainCategory}&sub=${sub._id}`}
                          className="flex items-center justify-between p-3 hover:bg-primary-gold/5 rounded-sm transition-all group border-l-2 border-transparent hover:border-primary-gold"
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal group-hover:text-primary-gold transition-all">{sub.name}</span>
                          <i className="bi bi-arrow-right text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty Context State */}
            {searchQuery.trim() && searchResults.products?.length === 0 && searchResults.subCategories?.length === 0 && (
              <div className="mt-8 text-center py-20 border-t border-black/5">
                <p className="text-warm-gray text-sm italic font-display">No elite pieces found for "{searchQuery}"</p>
                <Link to="/store" className="inline-block mt-4 text-[10px] font-bold tracking-[0.2em] text-primary-gold uppercase border-b border-primary-gold/30 hover:border-primary-gold transition-all">Browse all collections</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 flex ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100 shadow-2xl" : "opacity-0"
            }`}
        />

        {/* Drawer Content */}
        <aside
          className={`relative w-4/5 max-w-[320px] h-full bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="h-full flex flex-col p-8 pt-10">
            {/* Header */}
            <div className="mb-12 flex items-center justify-between">
              <span className="font-heading text-xl font-bold tracking-tight text-deep-black">
                ChinaXports
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-warm-gray hover:text-primary-gold transition-colors"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-6 mb-12">
              <NavLink to="/" className={({ isActive }) => `text-lg font-display transition-all duration-300 flex items-center justify-between ${isActive ? "text-primary-gold italic pl-2 border-l-2 border-primary-gold" : "text-charcoal pl-0 border-l-0 border-transparent"}`}>
                Home
                <i className="bi bi-arrow-right text-xs opacity-30"></i>
              </NavLink>

              {categories.map((cat) => (
                <div key={cat._id} className="space-y-4">
                  <button
                    onClick={() => toggleCategory(cat._id)}
                    className={`w-full text-lg font-display transition-all duration-300 flex items-center justify-between ${location.search.includes(cat._id) ? "text-primary-gold italic pl-2 border-l-2 border-primary-gold" : "text-charcoal"}`}
                  >
                    {cat.name}
                    <i className={`bi bi-chevron-right text-xs transition-transform duration-300 ${openCategoryId === cat._id ? "rotate-90 text-primary-gold" : "opacity-30"}`}></i>
                  </button>
                  {openCategoryId === cat._id && (
                    <div className="pl-4 space-y-3 animate-fade-in">
                      {cat.subCategories?.map(sub => (
                        <Link
                          key={sub._id}
                          to={`/store?category=${cat._id}&sub=${sub._id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-[13px] text-warm-gray hover:text-primary-gold transition-colors font-body uppercase tracking-[0.1em]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {["Store", "About", "Contact", "Account"].map((item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-lg font-display transition-all duration-300 flex items-center justify-between ${isActive && (item !== 'Store' || !location.search) ? "text-primary-gold italic pl-2 border-l-2 border-primary-gold" : "text-charcoal pl-0 border-l-0 border-transparent"
                    }`
                  }
                >
                  {item}
                  <i className="bi bi-arrow-right text-xs opacity-30"></i>
                </NavLink>
              ))}
            </nav>

            {/* Quick CTAs */}
            <div className="mt-auto space-y-4 pt-6 border-t border-black/5">
              <a
                href="https://wa.me/919747758555"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-sm font-bold text-sm tracking-wide shadow-lg shadow-green-500/10 active:scale-95 transition-transform"
              >
                <i className="bi bi-whatsapp text-lg"></i>
                Wholesale Inquiry
              </a>
              <p className="text-center text-[10px] text-warm-gray opacity-60">
                © 2026 ChinaXports. All Rights Reserved.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

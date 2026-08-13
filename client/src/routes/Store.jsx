// pages/Store.jsx
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ShopifyProductCard from "../components/product/ShopifyProductCard";
import StoreProductsSkeleton from "../components/common/StoreProductsSkeleton";
import { BASE_URL } from "../config";
import FilterBottomSheet from "../components/common/FilterBottomSheet";
import SortBottomSheet from "../components/common/SortBottomSheet";

export default function Store() {
  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMainCat, setSelectedMainCat] = useState(searchParams.get("category") || "");
  const [selectedSubCat, setSelectedSubCat] = useState(searchParams.get("sub") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const loadingRef = useRef(false);

  const API_BASE_URL = `${BASE_URL}/api`;

  // New mobile UI state
  const [isMobile, setIsMobile] = useState(false);
  const [bottomHidden, setBottomHidden] = useState(false);
  const lastScroll = useRef(window.scrollY || 0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState(searchParams.get("sort") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filterValues, setFilterValues] = useState({
    category: searchParams.get("category") || "",
    sub: searchParams.get("sub") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    moq: searchParams.get("moq") || "",
    trending: searchParams.get("trending") || "",
    special: searchParams.get("special") || ""
  });

  // Grid columns toggle 
  const [gridColumns, setGridColumns] = useState(4);

  // detect mobile viewport
  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setGridColumns(2);
      else setGridColumns(4);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // fetch main categories
  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories/get-maincategories`)
      .then((res) => {
        const allowedIds = ['69c3a9a610f636c152943709', '6926fcfd1d552abbe3a6c307', '69c36d19eab4f288c1d04248'];
        const cats = (res.data?.categories ?? [])
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
        setMainCats(cats);
      })
      .catch(() => console.log("Failed to fetch main categories"));
  }, []);

  // update state when URL changes
  useEffect(() => {
    setSelectedMainCat(searchParams.get("category") || "");
    setSelectedSubCat(searchParams.get("sub") || "");
    setSortValue(searchParams.get("sort") || "");
    setSearchQuery(searchParams.get("search") || "");
    setFilterValues({
      category: searchParams.get("category") || "",
      sub: searchParams.get("sub") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
      moq: searchParams.get("moq") || "",
      trending: searchParams.get("trending") || "",
      special: searchParams.get("special") || ""
    });
    setCurrentPage(1);
    setProducts([]);
    setHasMore(true);
  }, [searchParams]);

  // Fetch Subcategories
  useEffect(() => {
    if (!selectedMainCat) {
      setSubCats([]);
      return;
    }
    const selectedCat = mainCats.find(cat => cat._id === selectedMainCat);
    setSubCats(selectedCat?.subCategories || []);
  }, [selectedMainCat, mainCats]);

  const handleSortApply = (value) => {
    const params = Object.fromEntries([...searchParams]);
    params.sort = value;
    params.page = 1;
    setSortValue(value);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchProducts = async (page) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", 24);
    if (selectedMainCat) params.set("mainCategory", selectedMainCat);
    if (selectedSubCat) params.set("subCategory", selectedSubCat);
    if (sortValue) params.set("sort", sortValue);
    if (searchQuery) params.set("search", searchQuery);
    if (filterValues.priceMin) params.set("priceMin", filterValues.priceMin);
    if (filterValues.priceMax) params.set("priceMax", filterValues.priceMax);
    if (filterValues.moq) params.set("moq", filterValues.moq);
    if (filterValues.trending) params.set("trending", filterValues.trending);
    if (filterValues.special) params.set("special", filterValues.special);

    try {
      const res = await axios.get(`${API_BASE_URL}/store?${params.toString()}`);
      const allProducts = res.data.products || [];
      const newProducts = allProducts.filter(p => {
        const catName = p.mainCategory?.name || (typeof p.mainCategory === 'object' ? p.mainCategory?.name : '');
        return !catName || catName.toLowerCase() !== 'xuping';
      });
      const totalCount = res.data.totalCount || 0;

      if (page === 1) {
        setProducts(newProducts);
        setTotal(totalCount);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      setHasMore(allProducts.length >= 24);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    setInitialLoading(true);
    fetchProducts(1);
  }, [selectedMainCat, selectedSubCat, sortValue, searchQuery, filterValues.priceMin, filterValues.priceMax, filterValues.moq, filterValues.trending, filterValues.special]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore && !initialLoading) {
          fetchProducts(currentPage + 1);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);
    return () => sentinel && observer.unobserve(sentinel);
  }, [currentPage, hasMore, initialLoading]);

  const applyFiltersToURL = (filters) => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.sub) params.sub = filters.sub;
    if (filters.priceMin) params.priceMin = filters.priceMin;
    if (filters.priceMax) params.priceMax = filters.priceMax;
    if (filters.moq) params.moq = filters.moq;
    if (filters.trending) params.trending = filters.trending;
    if (filters.special) params.special = filters.special;
    if (sortValue) params.sort = sortValue;
    if (searchQuery) params.search = searchQuery;
    params.page = 1;
    setSearchParams(params);
  };

  const applyFilterCallback = (filters) => {
    applyFiltersToURL(filters);
    setSelectedMainCat(filters.category || "");
    setSelectedSubCat(filters.sub || "");
    setFilterValues(filters);
    setFilterOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 1, 0.5, 1] 
      } 
    }
  };

  return (
    <main className="bg-white min-h-screen pb-20 pt-24 lg:pt-32">
      <div className="container mx-auto px-3 lg:px-8">

        {/* Breadcrumbs - Cohesive UI */}
        <nav className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar py-2">
            <Link to="/" className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em] hover:text-primary-gold transition-colors whitespace-nowrap">Home</Link>
            <span className="text-charcoal/10 text-[10px] italic">/</span>
            <Link to="/store" className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${!selectedMainCat ? 'text-matte-black' : 'text-charcoal/30 hover:text-primary-gold'}`}>Collections</Link>
            
            {selectedMainCat && (
                <>
                    <span className="text-charcoal/10 text-[10px] italic">/</span>
                    <button 
                        onClick={() => setSearchParams({ category: selectedMainCat })}
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${!selectedSubCat ? 'text-matte-black' : 'text-charcoal/30 hover:text-primary-gold'}`}
                    >
                        {mainCats.find(c => c._id === selectedMainCat)?.name || "Category"}
                    </button>
                </>
            )}

            {selectedSubCat && (
                <>
                    <span className="text-charcoal/10 text-[10px] italic">/</span>
                    <span className="text-[10px] font-bold text-matte-black uppercase tracking-[0.2em] whitespace-nowrap">
                        {subCats.find(c => c._id === selectedSubCat)?.name || "Subcategory"}
                    </span>
                </>
            )}
        </nav>

        {/* Header Section */}
        <header className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">Curated Catalog</span>
              <h1 className="font-display text-4xl lg:text-5xl text-deep-black leading-tight">
                Global <span className="italic font-normal">Wholesale</span>
              </h1>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-3 px-6 py-3 bg-off-white border border-black/5 rounded-sm text-[11px] font-bold tracking-widest uppercase hover:bg-deep-black hover:text-white transition-all duration-500"
              >
                <i className="bi bi-funnel text-sm"></i>
                <span>Filter</span>
              </button>

              <button
                onClick={() => setSortOpen(true)}
                className="flex items-center gap-3 px-6 py-3 bg-off-white border border-black/5 rounded-sm text-[11px] font-bold tracking-widest uppercase hover:bg-deep-black hover:text-white transition-all duration-500"
              >
                <i className="bi bi-arrow-down-up text-sm"></i>
                <span>Sort</span>
              </button>

              <div className="hidden lg:flex items-center border border-black/5 rounded-sm p-1 ml-2 bg-off-white">
                <button
                  onClick={() => setGridColumns(3)}
                  className={`p-2 rounded-sm transition-all ${gridColumns === 3 ? 'bg-white shadow-sm text-primary-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
                >
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={`p-2 rounded-sm transition-all ${gridColumns === 4 ? 'bg-white shadow-sm text-primary-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
                >
                  <i className="bi bi-grid-fill"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Active Category Display & Stats */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-black/5 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest italic">Collection Scope:</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-off-white text-charcoal text-[10px] font-bold uppercase rounded-full border border-black/5">
                  Showing <span className="text-primary-gold">{total}</span> High-End Units
                </span>
                {selectedMainCat && (
                  <span className="px-3 py-1 bg-primary-gold/10 text-primary-gold text-[10px] font-bold uppercase rounded-full border border-primary-gold/10">
                    {mainCats.find(c => c._id === selectedMainCat)?.name}
                  </span>
                )}
                {selectedSubCat && (
                  <span className="flex items-center justify-center h-6 px-4 bg-deep-black text-white text-[9px] font-bold uppercase rounded-full shadow-sm">
                    {subCats.find(c => c._id === selectedSubCat)?.name || "Subcategory"}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-matte-black text-white text-[10px] font-bold uppercase rounded-full flex items-center gap-2 border border-black/5">
                    <span>Search:</span> <span className="text-[#C6A769] font-medium">"{searchQuery}"</span>
                  </span>
                )}
              </div>
            </div>

            {(selectedMainCat || selectedSubCat || searchQuery || filterValues.priceMin || filterValues.priceMax) && (
              <button
                onClick={() => setSearchParams({})}
                className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
              >
                Clear All Filter Logic
              </button>
            )}
          </div>
        </header>

        {/* Product Grid */}
        <section className="relative">
          {initialLoading ? (
            <StoreProductsSkeleton count={12} />
          ) : products.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={`grid gap-6 lg:gap-8 ${gridColumns === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}
            >
              {products.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ShopifyProductCard
                    product={product}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-24 text-center space-y-6">
              <div className="w-20 h-20 bg-off-white rounded-full flex items-center justify-center mx-auto scale-110">
                <i className="bi bi-search text-3xl text-charcoal/20"></i>
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl text-deep-black">No Products Found</h2>
                <p className="text-charcoal/40 text-sm italic">Refine your filters and try again</p>
              </div>
              <button
                onClick={() => setSearchParams({})}
                className="btn-gold-outline mx-auto"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          <div id="scroll-sentinel" className="h-24 w-full flex items-center justify-center mt-12">
            {loading && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-primary-gold border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-bold tracking-widest text-primary-gold uppercase">Loading More</span>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-[1px] bg-black/5"></div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-charcoal/30 uppercase italic">
                  End of Curated Selection
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Sheets */}
      <FilterBottomSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        mainCats={mainCats}
        initialFilters={filterValues}
        onApply={applyFilterCallback}
      />

      <SortBottomSheet
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        initialSort={sortValue}
        onApply={handleSortApply}
      />
    </main>
  );
}

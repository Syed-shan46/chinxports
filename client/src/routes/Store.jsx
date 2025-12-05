// pages/Store.jsx  (update your existing file)
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import StoreProductsSkeleton from "../components/common/StoreProductsSkeleton";
import { BASE_URL } from "../config";
import "../../src/styles/Store.css";
import FilterBottomSheet from "../components/common/FilterBottomSheet";
import SortBottomSheet from "../components/common/SortBottomSheet";
import "../components/common/BottomSheets.css"; // ensure this is included
// ... other imports

export default function Store() {


  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMainCat, setSelectedMainCat] = useState(searchParams.get("category") || "");
  const [selectedSubCat, setSelectedSubCat] = useState(searchParams.get("sub") || "");
  const [currentPage, setCurrentPage] = useState(1);
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
  const [filterValues, setFilterValues] = useState({
    category: searchParams.get("category") || "",
    sub: searchParams.get("sub") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    moq: searchParams.get("moq") || "",
    trending: searchParams.get("trending") || "",
    special: searchParams.get("special") || ""
  });

  // detect mobile viewport
  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth <= 768);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // fetch main categories (same as your code)
  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories/get-maincategories`)
      .then((res) => {
        setMainCats(res.data?.categories ?? []);
      })
      .catch(() => console.log("Failed to fetch main categories"));
  }, []);

  // update state when URL changes - reset for new filters
  useEffect(() => {
    setSelectedMainCat(searchParams.get("category") || "");
    setSelectedSubCat(searchParams.get("sub") || "");
    setSortValue(searchParams.get("sort") || "");
    setFilterValues({
      category: searchParams.get("category") || "",
      sub: searchParams.get("sub") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
      moq: searchParams.get("moq") || "",
      trending: searchParams.get("trending") || "",
      special: searchParams.get("special") || ""
    });
    // Reset pagination and products when filters change
    setCurrentPage(1);
    setProducts([]);
    setHasMore(true);
  }, [searchParams]);

  // Fetch Subcategories When Main Category Selected
  useEffect(() => {
    if (!selectedMainCat) {
      setSubCats([]);
      return;
    }
    const selectedCat = mainCats.find(cat => cat._id === selectedMainCat);
    setSubCats(selectedCat?.subCategories || []);
  }, [selectedMainCat, mainCats]);

  const handleSortApply = (value) => {
    const params = {};

    if (selectedMainCat) params.category = selectedMainCat;
    if (selectedSubCat) params.sub = selectedSubCat;

    params.sort = value;

    setSortValue(value);
    setSearchParams(params);
    
    // Scroll to top when sort is applied
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Fetch Products with pagination
  const fetchProducts = async (page) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", 12);
    if (selectedMainCat) params.set("mainCategory", selectedMainCat);
    if (selectedSubCat) params.set("subCategory", selectedSubCat);
    if (sortValue) params.set("sort", sortValue);
    if (filterValues.priceMin) params.set("priceMin", filterValues.priceMin);
    if (filterValues.priceMax) params.set("priceMax", filterValues.priceMax);
    if (filterValues.moq) params.set("moq", filterValues.moq);
    if (filterValues.trending) params.set("trending", filterValues.trending);
    if (filterValues.special) params.set("special", filterValues.special);

    try {
      const res = await axios.get(`${API_BASE_URL}/store?${params.toString()}`);
      const newProducts = res.data.products || [];
      
      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(newProducts.length >= 12);
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

  // Initial fetch when filters change
  useEffect(() => {
    setInitialLoading(true);
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [selectedMainCat, selectedSubCat, sortValue, filterValues.priceMin, filterValues.priceMax, filterValues.moq, filterValues.trending, filterValues.special]);

  // Infinite scroll observer
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
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [currentPage, hasMore, initialLoading]);

  // Bottom bar show/hide on scroll (mobile)
  useEffect(() => {
    if (!isMobile) return;

    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const currentY = window.scrollY;
      const diff = currentY - lastY;

      // 🔥 More sensitive threshold for slight scroll
      const threshold = 3;

      if (diff > threshold) {
        // scrolling down → hide bar
        setBottomHidden(true);
      } else if (diff < -threshold) {
        // scrolling up → show bar
        setBottomHidden(false);
      }

      lastY = currentY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);


  // update search params nicely
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
    params.page = 1;
    setSearchParams(params);
  };

  const applySortToURL = (sortVal) => {
    setSortValue(sortVal);
    const params = Object.fromEntries([...searchParams]);
    if (sortVal) params.sort = sortVal; else delete params.sort;
    params.page = 1;
    setSearchParams(params);
  };

  const applyFilterCallback = (filters) => {
  // 1. Update URL
  applyFiltersToURL(filters);

  // 2. Sync store states instantly (no refresh required)
  setSelectedMainCat(filters.category || "");
  setSelectedSubCat(filters.sub || "");

  // 3. Update internal filterValues state
  setFilterValues(filters);

  // 4. Close sheet
  setFilterOpen(false);
  
  // 5. Scroll to top when filters are applied
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



  const openFilter = () => setFilterOpen(true);
  const openSort = () => setSortOpen(true);

  return (
    <main className="main">
      <div className="container mt-5">
        <div className="row">

          {/* Sidebar - only show on non-mobile */}
          {!isMobile && (
            <div className="col-lg-4 sidebar mt-4">
              <div className="category-box">
                <h3 className="category-heading">Categories</h3>
                <ul className="category-list">
                  {mainCats.map((cat) => {
                    const isOpen = selectedMainCat === cat._id;
                    return (
                      <li key={cat._id} className="main-cat-item">
                        <button
                          className={`cat-btn d-flex justify-content-between ${isOpen ? "active" : ""}`}
                          onClick={() => {
                            if (selectedMainCat === cat._id) {
                              setSearchParams({});
                            } else {
                              setSearchParams({ category: cat._id });
                            }
                          }}
                        >
                          <span><i className="bi bi-folder2-open me-2"></i>{cat.name}</span>
                          <i className={`bi ${isOpen ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
                        </button>

                        <ul className={`subcat-list ${isOpen ? "open" : ""}`}>
                          {(cat.subCategories || []).map((sub) => (
                            <li key={sub._id}>
                              <button
                                className={`subcat-btn ${selectedSubCat === sub._id ? "active" : ""}`}
                                onClick={() =>
                                  setSearchParams({ category: cat._id, sub: sub._id })
                                }
                              >
                                <i className="bi bi-caret-right ms-3"></i> {sub.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* Products Area */}
          <div className={isMobile ? "col-12" : "col-lg-8"}>
            <section className="category-product-list section">
              <div className="row g-4">

                {initialLoading && (
                  <StoreProductsSkeleton count={12} colLg={3} />
                )}
                
                {!initialLoading && products.length > 0 &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} cartBtnPdg="5px 18px" colLg={3} />
                  ))}

                {!initialLoading && products.length === 0 && (
                  <div className="col-12 text-center py-5">
                    <h4>No Products Found</h4>
                    <p className="text-muted">Try another filter.</p>
                  </div>
                )}

              </div>

              {/* Infinite scroll sentinel */}
              {hasMore && products.length > 0 && (
                <div id="scroll-sentinel" style={{ height: '20px', margin: '40px 0' }}>
                  {loading && (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border col-pink" role="status">
                        <span className="visually-hidden">Loading more...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!hasMore && products.length > 0 && (
                <div className="text-center py-4 text-muted">
                  <p>You've reached the end</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {isMobile && (
        <div className={`bottom-fixed-bar ${bottomHidden ? "hidden" : ""}`}>
          <div className="bar-btn" onClick={openFilter}>
            <i className="bi bi-funnel-fill"></i> Filter
          </div>
          <div className="bar-btn" onClick={openSort}>
            <i className="bi bi-filter-circle"></i> Sort
          </div>
        </div>
      )}

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

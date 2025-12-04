// pages/Store.jsx  (update your existing file)
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import { BASE_URL } from "../config";
import "../../src/styles/Store.css";
import FilterBottomSheet from  "../components/common/FilterBottomSheet";
import SortBottomSheet from "../components/common/SortBottomSheet";
import "../components/common/BottomSheets.css"; // ensure this is included
// ... other imports

export default function Store() {

  
  // keep your existing state and logic
  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMainCat, setSelectedMainCat] = useState(searchParams.get("category") || "");
  const [selectedSubCat, setSelectedSubCat] = useState(searchParams.get("sub") || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

  // update state when URL changes
  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
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
    setCurrentPage(1);
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
  params.page = 1;

  setSortValue(value);
  setSearchParams(params);
};


  // Fetch Products
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", currentPage);
    if (selectedMainCat) params.set("mainCategory", selectedMainCat);
    if (selectedSubCat) params.set("subCategory", selectedSubCat);
    if (sortValue) params.set("sort", sortValue);
    if (filterValues.priceMin) params.set("priceMin", filterValues.priceMin);
    if (filterValues.priceMax) params.set("priceMax", filterValues.priceMax);
    if (filterValues.moq) params.set("moq", filterValues.moq);
    if (filterValues.trending) params.set("trending", filterValues.trending);
    if (filterValues.special) params.set("special", filterValues.special);

    axios.get(`${API_BASE_URL}/store?${params.toString()}`)
      .then((res) => {
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [currentPage, selectedMainCat, selectedSubCat, sortValue, filterValues]);

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
    setFilterValues(filters);
    applyFiltersToURL(filters);
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

                {loading && (
                  <div className="loading-container">
                    <div className="spinner-border col-pink" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {!loading && products.length > 0 &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} cartBtnPdg="5px 18px" />
                  ))}

                {!loading && products.length === 0 && (
                  <div className="col-12 text-center py-5">
                    <h4>No Products Found</h4>
                    <p className="text-muted">Try another filter.</p>
                  </div>
                )}

              </div>
            </section>

            {/* Pagination - same as before */}
            {!loading && totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                  {currentPage > 1 && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>&laquo;</button>
                    </li>
                  )}

                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{i + 1}</button>
                    </li>
                  ))}

                  {currentPage < totalPages && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>&raquo;</button>
                    </li>
                  )}
                </ul>
              </nav>
            )}

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

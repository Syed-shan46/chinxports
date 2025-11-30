import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import { BASE_URL } from "../config";

export default function Store() {
  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMainCat, setSelectedMainCat] = useState(searchParams.get("category") || "");
  const [selectedSubCat, setSelectedSubCat] = useState(searchParams.get("sub") || "");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = `${BASE_URL}/api`;

  // Fetch Main Categories
  useEffect(() => {
  axios
    .get(`${API_BASE_URL}/categories/get-maincategories`)
    .then((res) => {
      setMainCats(res.data?.categories ?? []);
    })
    .catch(() => console.log("Failed to fetch main categories"));
}, []);


  useEffect(() => {
    // Update state whenever the URL changes
    setSelectedMainCat(searchParams.get("category") || "");
    setSelectedSubCat(searchParams.get("sub") || "");
    setCurrentPage(1); // reset pagination when URL changes
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


  // Fetch Products
  useEffect(() => {
    setLoading(true);
    console.log("Fetching products:", {
      page: currentPage,
      mainCategory: selectedMainCat,
      subCategory: selectedSubCat
    });

    axios.get(
      `${API_BASE_URL}/store?page=${currentPage}&mainCategory=${selectedMainCat}&subCategory=${selectedSubCat}`
    )
      .then((res) => {
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [currentPage, selectedMainCat, selectedSubCat]);





  return (
    <main className="main">
      <div className="container mt-5">
        <div className="row">

          {/* Sidebar */}
          {/* Sidebar */}
          <div className="col-lg-4 sidebar">
            <div className="widgets-container">
              <div className="product-categories-widget widget-item">
                <h3 className="widget-title">Categories</h3>

                <ul className="category-tree list-unstyled mb-0">

                  {/* All Products */}
                  <li className="category-item mb-2">
                    <button
                      className={`category-link w-100 text-start ${!selectedMainCat ? "active" : ""}`}
                      onClick={() => {
                        setSearchParams({});
                      }}
                    >
                      <i className="bi bi-grid me-2"></i>
                      All Products
                    </button>
                  </li>

                  {/* MAIN CATEGORIES */}
                  {mainCats.map((cat) => {
                    const isOpen = selectedMainCat === cat._id;
                    return (
                      <li key={cat._id} className="category-item mb-1">

                        {/* Main Category Button */}
                        <button
                          className={`category-link w-100 d-flex justify-content-between align-items-center text-start ${isOpen ? "active" : ""}`}
                          onClick={() => {
                            setSearchParams({ category: cat._id });
                          }}
                        >
                          <span>
                            <i className="bi bi-folder2-open me-2"></i>
                            {cat.name}
                          </span>

                          <i className={`bi ms-2 ${isOpen ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
                        </button>

                        {/* SUBCATEGORIES */}
                        {isOpen && subCats.length > 0 && (
                          <ul className="ps-4 mt-2">
                            {subCats.map((sub) => (
                              <li key={sub._id} className="py-1">
                                <button
                                  className={`category-link w-100 text-start ${selectedSubCat === sub._id ? "active" : ""}`}
                                  onClick={() => {
                                    setSearchParams({ category: cat._id, sub: sub._id });
                                  }}
                                >
                                  <i className="bi bi-chevron-right me-2 small"></i>
                                  {sub.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>

              </div>
            </div>
          </div>


          {/* Products Area */}
          <div className="col-lg-8">
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

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">

                  {currentPage > 1 && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                        &laquo;
                      </button>
                    </li>
                  )}

                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  {currentPage < totalPages && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                        &raquo;
                      </button>
                    </li>
                  )}

                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

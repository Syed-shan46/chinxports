import { useEffect, useRef, useState } from "react";
import "../../styles/theme.css"; // Add this import
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useCart } from "../../context/CartContext";


export default function Header() {
  const { cart } = useCart();

  // Refs for Live Search
  const desktopInputRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const mobileInputRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const [openCategoryId, setOpenCategoryId] = useState(null);



  const toggleCategory = (id) => {
    console.log("Toggling category", id);
    setOpenCategoryId(prev => (prev === id ? null : id));
  };


  const [categories, setCategories] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Initialize theme on mount / react to changes
  useEffect(() => {
    const root = document.documentElement;
    const earlyStyle = document.getElementById("early-theme-style");

    if (theme === "dark") {
      root.setAttribute("data-bs-theme", "dark");
      document.body.classList.add("dark-theme");

      // keep the early inline style in sync so NO flash / leftover dark background remains
      if (earlyStyle) {
        earlyStyle.textContent =
          "html,body{background:#1a1a1a !important; color:#e9ecef !important;}";
      }
    } else {
      root.removeAttribute("data-bs-theme");
      document.body.classList.remove("dark-theme");

      // update early style so it doesn't force dark after toggling to light
      if (earlyStyle) {
        earlyStyle.textContent =
          "html,body{background:#ffffff !important; color:#212529 !important;}";
      }
    }

    localStorage.setItem("theme", theme);

    // Optional: remove the early-style after first paint to avoid !important interfering later
    // setTimeout(() => earlyStyle?.parentNode?.removeChild(earlyStyle), 1000);

  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const controller = new AbortController();
    const url = `${BASE_URL}/api/categories/get-maincategories`;

    async function loadCategories() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          console.warn("Failed to load categories:", res.status);
          return;
        }
        const data = await res.json();
        setCategories(data.categories || []);
        console.log("Categories from API:", data.categories); // <-- debug
      } catch (err) {
        if (err.name === "AbortError") return;
        console.warn("Could not fetch categories:", err);
      }
    }

    loadCategories();
    return () => controller.abort();
  }, []);



  useEffect(() => {
    // -------------------------------
    // 1️⃣ BOOTSTRAP MOBILE SIDEBAR
    // ------------------------------
    const sidebarEl = document.getElementById("mobileSidebar");

    if (sidebarEl && window.bootstrap) {
      const sidebar = new window.bootstrap.Offcanvas(sidebarEl);
      const btn = document.getElementById("mobileHamburgerBtn");

      if (btn) btn.addEventListener("click", () => sidebar.show());
    }

    // -------------------------------
    // 2️⃣ HEADER SCROLL EFFECTS
    // -------------------------------
    const header = document.getElementById("header");
    let lastScrollTop = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = window.scrollY;

          if (header) {
            if (current > 20) header.classList.add("header-scrolled");
            else header.classList.remove("header-scrolled");


          }

          lastScrollTop = current <= 0 ? 0 : current;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // -------------------------------
  // 3️⃣ LIVE SEARCH FUNCTION
  // -------------------------------
  useEffect(() => {
    function setupLiveSearch(inputRef, dropdownRef) {
      if (!inputRef.current || !dropdownRef.current) return;

      let debounceTimer;

      inputRef.current.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        const query = inputRef.current.value.trim();

        if (!query) {
          dropdownRef.current.classList.remove("show");
          dropdownRef.current.innerHTML = "";
          return;
        }

        debounceTimer = setTimeout(async () => {
          try {
            const resp = await fetch(`${BASE_URL}/api/categories/search?q=${encodeURIComponent(query)}`);
            const data = await resp.json();

            let html = "";

            if (data.products?.length) {
              html += `<div class="fw-bold text-muted small mb-1 px-2">Products</div>`;
              data.products.forEach((prod) => {
                const imgSrc = prod.imageUrl?.[0] ?? "/images/no-image.png";
                html += `
                  <a href="/products/product-details/${prod._id}"
                    class="dropdown-item d-flex align-items-center gap-2">
                    <img src="${imgSrc}" style="height:32px;width:32px;object-fit:cover;" class="rounded"/>
                    <span>${prod.productName}</span>
                  </a>`;
              });
            }

            if (data.subCategories?.length) {
              html += `<div class="fw-bold text-muted small mt-2 mb-1 px-2">Subcategories</div>`;

              data.subCategories.forEach((sub) => {
                html += `
      <a href="/store?sub=${sub._id}" 
         class="dropdown-item d-flex align-items-center">
         <i class="bi bi-tag-fill  col-pink me-2"></i>
         ${sub.name}
      </a>`;
              });
            }


            if (!html) {
              html = `<span class="dropdown-item text-muted">No results found</span>`;
            }

            dropdownRef.current.innerHTML = html;
            dropdownRef.current.classList.add("show");
          } catch {
            dropdownRef.current.innerHTML = `<span class="dropdown-item text-danger">Server error</span>`;
            dropdownRef.current.classList.add("show");
          }
        }, 300);
      });

      // Close on outside click
      document.addEventListener("click", function (e) {
        if (
          !dropdownRef.current.contains(e.target) &&
          e.target !== inputRef.current
        ) {
          dropdownRef.current.classList.remove("show");
        }
      });
    }

    // Initialize desktop & mobile
    setupLiveSearch(desktopInputRef, desktopDropdownRef);
    setupLiveSearch(mobileInputRef, mobileDropdownRef);
  }, []);

  return (
    <>
      <header id="header" className="header fixed-top">
        <div className="main-header">
          <div className="container-fluid container-xl">
            <div className="d-flex py-3 align-items-center justify-content-between">

              {/* Mobile Hamburger */}
              <button
                id="mobileHamburgerBtn"
                className="btn  d-xl-none me-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebar"
              >
                <i className="bi bi-list fs-3"></i>
              </button>

              {/* Logo */}
              <Link to="/cart" className="logo d-flex" style={{ textDecoration: 'none' }}>
                <h1 className="sitename text-dark">ChinaXports</h1>
              </Link>

              {/* Desktop Search */}
              <form className="search-form desktop-search-form position-relative" autoComplete="off">
                <div className="input-group">
                  <input
                    ref={desktopInputRef}
                    type="text"
                    id="navbarSearchInput"
                    className="form-control"
                    placeholder="Search for products or categories"
                  />
                  <button className="btn" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>

                <div
                  ref={desktopDropdownRef}
                  id="navbarSearchDropdown"
                  className="dropdown-menu p-2"
                ></div>
              </form>

              {/* Actions */}
              <div className="header-actions d-flex align-items-center justify-content-end gap-2">
                


                {/* Theme Toggle */}
                <button
                  className="header-action-btn theme-toggle-btn me-3"
                  onClick={toggleTheme}
                  title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? (
                    <i className="bi bi-moon-stars"></i>
                  ) : (
                    <i className="bi bi-sun-fill "></i>
                  )}
                </button>

                <Link to="/cart" className="header-action-btn bag-indicator position-relative">
                  <i className="bi bi-bag fs-5"></i>

                  {cart.length > 0 && (
                    <span className="cart-count-badge">
                      {cart.length}
                    </span>
                  )}
                </Link>

                {/* <button
                  className="header-action-btn mobile-search-toggle d-xl-none"
                  data-bs-toggle="collapse"
                  data-bs-target="#mobileSearch"
                >
                  <i className="bi bi-search"></i>
                </button> */}


              </div>
            </div>
          </div>
        </div>



        {/* Mobile Search */}
        <div className="collapse" id="mobileSearch">
          <div className="container">
            <form className="search-form position-relative" autoComplete="off">
              <div className="input-group">
                <input
                  ref={mobileInputRef}
                  type="text"
                  id="mobileSearchInput"
                  className="form-control"
                  placeholder="Search for products or categories"
                />
                <button className="btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>


              </div>

              <div
                ref={mobileDropdownRef}
                id="mobileSearchDropdown"
                className="dropdown-menu p-2 w-100"
              ></div>
            </form>
          </div>
        </div>
      </header>



      {/* SIDEBAR */}
      <div style={{ border: 'none' }} className="offcanvas offcanvas-start mobile-sidebar" id="mobileSidebar">

        <div className="offcanvas-header">
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body px-0">
          <ul className="nav nav-tabs nav-fill trendy-tabs" id="mobileSidebarTabs">
            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#home-tab-pane">
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#categories-tab-pane">
                Categories
              </button>
            </li>
          </ul>

          <div className="tab-content trendy-tab-content p-3">
            <div className="tab-pane fade show active" id="home-tab-pane">
              <ul className="list-unstyled">
                <li><NavLink to="/" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>Home</NavLink></li>
                <li><NavLink to="/store" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>Store</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>About</NavLink></li>
                <li><NavLink to="/services" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>Service</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")} >Contact</NavLink></li>

              </ul>
            </div>

            {/* Categories Tab */}
            <div className="tab-pane fade" id="categories-tab-pane" role="tabpanel">
              <ul className="list-unstyled">
                {categories.map((cat) => {
                  const isOpen = openCategoryId === cat._id;

                  // Debug: log subcategories when this category is open
                  if (isOpen) {
                    console.log(`Subcategories for ${cat.name}:`, cat.subcategories);
                  }

                  return (
                    <li key={cat._id} className="mb-1">
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat._id)}
                        className="menu-item text-decoration-none d-flex justify-content-between align-items-center w-100 border-0 bg-transparent"
                      >
                        <span>
                          <i className="bi bi-tag me-2"></i> {cat.name}
                        </span>
                        <i className={`bi ms-2 ${isOpen ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
                      </button>

                      {isOpen && cat.subCategories && cat.subCategories.length > 0 && (
                        <ul className="list-unstyled ps-4 mt-2">
                          {cat.subCategories.map((sub) => (
                            <li key={sub._id}>
                              <Link
                                to={`/store?category=${cat._id}&sub=${sub._id}`}
                                className="menu-item text-decoration-none d-flex justify-content-between align-items-center w-100"
                              >
                                <span>
                                  {sub.name}

                                </span>
                                <span>{sub.productCount}</span>
                              </Link>
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
      </div>
    </>
  );
}

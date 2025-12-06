import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./MobileBottomNav.css";

export default function MobileBottomNav() {
  const location = useLocation();
  const { cart } = useCart();

  // Hide bottom nav on product details page
  if (location.pathname.startsWith("/products/product-details/")) {
    return null;
  }

  const navItems = [
    {
      path: "/",
      icon: "bi-house-fill",
      label: "Home"
    },
    {
      path: "/store",
      icon: "bi-basket-fill",
      label: "Shop"
    },
    {
      path: "/cart",
      icon: "bi-bag-fill",
      label: "Cart",
      badge: cart.length
    },
    {
      path: "/account",
      icon: "bi-person-fill",
      label: "Account"
    }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive ? "active" : ""}`}
          >
            <div className="nav-icon-wrapper">
              <i className={`bi ${item.icon}`}></i>
              {item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </div>
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

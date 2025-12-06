import { Link } from "react-router-dom";
import "../styles/Account.css";

export default function Account() {
  return (
    <div className="container account-container">
      <div className="account-header">
        <div className="account-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <h3>My Account</h3>
        <p className="text-muted">Manage your profile and orders</p>
      </div>

      <div className="account-sections">
        <Link to="/orders" className="account-card">
          <div className="account-card-icon">
            <i className="bi bi-box-seam"></i>
          </div>
          <div className="account-card-content">
            <h5>My Orders</h5>
            <p>Track and manage your orders</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </Link>

        <Link to="/cart" className="account-card">
          <div className="account-card-icon">
            <i className="bi bi-bag"></i>
          </div>
          <div className="account-card-content">
            <h5>Shopping Cart</h5>
            <p>View items in your cart</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </Link>

        <Link to="/contact" className="account-card">
          <div className="account-card-icon">
            <i className="bi bi-envelope"></i>
          </div>
          <div className="account-card-content">
            <h5>Contact Us</h5>
            <p>Get in touch with support</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </Link>

        <Link to="/about" className="account-card">
          <div className="account-card-icon">
            <i className="bi bi-info-circle"></i>
          </div>
          <div className="account-card-content">
            <h5>About</h5>
            <p>Learn more about us</p>
          </div>
          <i className="bi bi-chevron-right"></i>
        </Link>
      </div>
    </div>
  );
}

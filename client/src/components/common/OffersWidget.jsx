import { Link } from "react-router-dom";
import "./OffersWidget.css";

export default function OffersWidget() {
  return (
    <Link to="/store?special=true" className="offers-widget">
      <div className="offers-content">
        <span className="offers-icon">🎁</span>
        <span className="offers-text">Offers</span>
      </div>
    </Link>
  );
}

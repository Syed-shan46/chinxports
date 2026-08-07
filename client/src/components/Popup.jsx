import React from "react";
import "./Popup.css";

const Popup = ({ handleClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={handleClose}>
          &times;
        </button> 
        <h2>Special <span style={{ color: '#5b4836' }}>10%</span> Offer!</h2>
        <p>Enjoy Up To 10% Off When You Shop Over ₹50,000</p>
        <button className="btn btn-pink rounded-3 py-1" onClick={handleClose}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Popup;

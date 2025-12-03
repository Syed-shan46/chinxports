import { Link } from "react-router-dom";
import { useCart, } from "../../context/CartContext";
import { convertToINR } from "../../utils/priceUtils";
import useRMBRate from "../../hooks/useRMBRate";


export default function ProductCard({ product, col = 4, cartBtnPdg = "10px 15px", specialBadge = false }) {
  const { add, cart, removeItem } = useCart();

  const rmbRate = useRMBRate();  // 🔥 LIVE RMB RATE HERE


  const isInCart = cart.some(item => item.productId === product._id);

  // Convert price here
  const priceINR = convertToINR(product.price, rmbRate);

  return (
    <div className={`col-lg-2 col-${col} col-md-6`}>

      <div className="product-item" data-aos="fade-up" data-aos-delay="100">
        <Link to={`/products/product-details/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <div className="product-image" style={{ borderRadius: "15px" }}>

            {/* ⭐ Special Badge */}
            {specialBadge && <div className="special-badge">★ Special</div>}

            {product.featured && <div className="product-badge">Limited</div>}

            <img
              src={product.imageUrl?.[0] || "/placeholder.jpg"}
              alt={product.productName}
              className="img-fluid"
              loading="eager"
            />
          </div>
        </Link>

        <div className="product-info">
          <div className="product-category" style={{ fontWeight: "600" }}>
            {product.subCategory?.name || ""}
          </div>

          <p className="text-dark fw-semibold mb-0">
            ₹{priceINR.toLocaleString()}/-
          </p>
          <p className="cart-moq mb-0">MOQ: <span className="cart-moq-value">6</span></p>


          {/* Add to Cart Button */}
          <button
            className={`add-cart-btn mt-2 ${isInCart ? "added" : ""}`}
            style={{ padding: cartBtnPdg }}
            onClick={() => {
              if (isInCart) {
                removeItem(product._id);     // toggle remove
              } else {
                add(product._id, product.minQty || 6, priceINR.toLocaleString());
              }
            }}
          >
            <i className={`fa-solid ${isInCart ? "fa-circle-xmark" : "fa-bag-shopping"}`}></i>
            {isInCart ? " Remove" : " Pick"}
          </button>


        </div>
      </div>
    </div>
  );
}

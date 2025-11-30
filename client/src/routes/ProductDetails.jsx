import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Product.css";
import { BASE_URL } from "../config";

/* ==========================================================
   PRICE CONVERSION (always keep these at TOP)
   ========================================================== */
const RMB_RATE = 13.15;       // convert RMB → INR
const MULTIPLIER = 1.25;     // multiply china price by this (profit/margin)

const convertToINR = (chinaPrice) => {
  const cp = parseFloat(chinaPrice);
  if (!isFinite(cp)) return 0;
  const finalRMB = cp * MULTIPLIER; // multiply (not add)
  return Math.round(finalRMB * RMB_RATE);
};

/* ==========================================================
   WHATSAPP MESSAGE GENERATOR (uses converted INR price)
   ========================================================== */
const generateWhatsAppLink = (product, quantity, url) => {
  const phone = "919747304599";

  const name = product?.productName || product?.name || "Product";
  const unitPrice = product?.priceINR ?? convertToINR(product?.price);
  const total = unitPrice * quantity;

  const message = `
Hello, I would like to order:

🛍 *Product:* ${name}
🔗 *Product Link:* ${url}

🔢 *Quantity:* ${quantity}
💵 *Price (each):* ₹${unitPrice}
💰 *Total:* ₹${total}

Please proceed with checkout.
  `;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};


function ProductDetails() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  /* ======================
     PAGE INITIAL SCROLL
     ====================== */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  /* ======================
     FETCH PRODUCT DETAILS
     ====================== */
  useEffect(() => {
    if (!productId) return;

    axios
      .get(`${BASE_URL}/api/products/${productId}`)
      .then((res) => {
        const { product: productData } = res.data;

        const fullProduct = {
          ...productData,
          priceINR: convertToINR(productData?.price),
        };

        setProduct(fullProduct);
        setActiveImage(productData?.imageUrl?.[0] || "");
        setImageIndex(0);
        setQuantity(productData?.minQty || 1);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  /* ======================
     IMAGE CONTROLS
     ====================== */
  const handleNextImage = () => {
    if (!product?.imageUrl) return;
    const next = (imageIndex + 1) % product.imageUrl.length;
    setImageIndex(next);
    setActiveImage(product.imageUrl[next]);
  };

  const handlePrevImage = () => {
    if (!product?.imageUrl) return;
    const prev = (imageIndex - 1 + product.imageUrl.length) % product.imageUrl.length;
    setImageIndex(prev);
    setActiveImage(product.imageUrl[prev]);
  };

  /* ======================
     QUANTITY CONTROLS
     ====================== */
  const incrementQuantity = () => setQuantity((prev) => prev + 6);
  const decrementQuantity = () => {
    const minQty = product?.minQty || 1;
    setQuantity((prev) => (prev - 6 >= minQty ? prev - 6 : minQty));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= (product?.minQty || 1)) setQuantity(value);
  };

  /* ======================
     LOADING STATE
     ====================== */
  if (!product)
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  /* ======================
     SAFE PRICE VARIABLE
     ====================== */
  const unitPrice = product?.priceINR ?? convertToINR(product?.price);

  return (
    <section className="product-details-premium section mt-lg-5 pt-lg-5 mt-3">
      {/* MOBILE IMAGE VIEW */}
      <div className="product-gallery-premium d-md-none">
        <div className="image-showcase-wrapper">
          <div className="image-zoom-container premium">
            <img src={activeImage} className="main-product-image premium" alt="" />
            <div className="image-badge">{imageIndex + 1} / {product.imageUrl?.length || 1}</div>
          </div>

          {product.imageUrl?.length > 1 && (
            <>
              <button className="image-nav-btn prev" onClick={handlePrevImage}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="image-nav-btn next" onClick={handleNextImage}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container">
        <div className="row gx-5 gy-4 align-items-start">
          {/* LEFT SIDE IMAGES */}
          <div className="col-lg-6 d-none d-md-block">
            <div className="product-gallery-premium">
              <div className="image-showcase-wrapper">
                <div className="image-zoom-container premium">
                  <img src={activeImage} className="main-product-image premium" alt="" />
                  <div className="image-badge">{imageIndex + 1} / {product.imageUrl?.length || 1}</div>
                </div>

                {product.imageUrl?.length > 1 && (
                  <>
                    <button className="image-nav-btn prev" onClick={handlePrevImage}>
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="image-nav-btn next" onClick={handleNextImage}>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PRODUCT INFO */}
          <div className="col-lg-6 mt-3">
            <div className="product-info-premium">
              <h1 className="mb-3 fs-sm fw-bold">{product.productName}</h1>

              {/* PRICE & MOQ */}
              <div className="pricing-moq-premium mt-md-5">
                <div className="row g-4">
                  <div className="col-6">
                    <div className="price-card">
                      <span className="price-label">Price Per Unit</span>
                      <div className="price-display-premium d-flex align-items-baseline gap-2">
                        <span className="sale-price">₹{unitPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="moq-card">
                      <span className="moq-label">Minimum Order</span>
                      <div className="moq-display">
                        <span className="moq-value">{product.minQty}</span>
                        <span className="moq-unit">Units</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="quantity-section mb-4 mt-md-4 desktop-quantity">
                <div className="quantity-controller">
                  <button className="qty-btn decrement" onClick={decrementQuantity}>
                    <i className="bi bi-dash-lg"></i>
                  </button>

                  <input type="number" className="qty-input" value={quantity} onChange={handleQuantityChange} />

                  <button className="qty-btn increment" onClick={incrementQuantity}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>

                <p className="total-price">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">₹{(unitPrice * quantity).toLocaleString()}</span>
                </p>
              </div>

              {/* WHATSAPP BUTTON */}
              <div className="action-buttons-premium d-flex flex-column gap-3">
                <a
                  href={generateWhatsAppLink(product, quantity, window.location.href)}

                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-light btn-lg w-100"
                >
                  <i className="bi bi-whatsapp me-2"></i>
                  Checkout Via WhatsApp
                </a>
              </div>

              {/* TRUST BADGES */}
              <div className="trust-badges mt-3">
                <div className="badge-item"><i className="bi bi-shield-check"></i><span>Verified Seller</span></div>
                <div className="badge-item"><i className="bi bi-truck"></i><span>Free Shipping</span></div>
                <div className="badge-item"><i className="bi bi-arrow-repeat"></i><span>Easy Returns</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {product.description && (
          <div className="row pt-5 border-top">
            <div className="col-lg-12">
              <h3 className="mb-4">Product Description</h3>
              <p className="description-text">{product.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="mobile-sticky-quantity">
        <div className="sticky-quantity-wrapper">
          <div className="sticky-price-info">
            <span className="sticky-total-label">Total</span>
            <span className="sticky-total-amount">₹{(unitPrice * quantity).toLocaleString()}</span>
          </div>

          <div className="sticky-quantity-controller">
            <button className="sticky-qty-btn decrement" onClick={decrementQuantity}>
              <i className="bi bi-dash-lg"></i>
            </button>

            <input type="number" className="sticky-qty-input" value={quantity} onChange={handleQuantityChange} />

            <button className="sticky-qty-btn increment" onClick={incrementQuantity}>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

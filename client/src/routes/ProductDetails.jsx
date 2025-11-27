import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Product.css";
import { BASE_URL } from "../config";

function ProductDetails() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!productId) return;

    axios
      .get(`${BASE_URL}/api/products/${productId}`)
      .then((res) => {
        const {
          product: productData,
          whatsappLink,
          processedKeywords,
          recommendations,
        } = res.data;

        const fullProduct = {
          ...productData,
          whatsappLink,
          processedKeywords,
          recommendations,
        };

        setProduct(fullProduct);
        setImageIndex(0);
        setActiveImage(productData.imageUrl?.[0] || "");
        setQuantity(productData.minQty || 1);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);


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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 6);
  };

  const decrementQuantity = () => {
    const minQty = product?.minQty || 1;
    setQuantity(prev => (prev - 6 >= minQty ? prev - 6 : minQty));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= (product?.minQty || 1)) {
      setQuantity(value);
    }
  };

  if (!product) return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="product-details-premium section mt-lg-5 pt-lg-5 mt-3">
      <div className="product-gallery-premium d-md-none">
        {/* Main Image with Zoom */}
        <div className="image-showcase-wrapper">
          <div className="image-zoom-container premium">
            <img
              src={activeImage}
              alt={product.productName}
              className="main-product-image premium"
            />
            {/* Image Badge */}
            <div className="image-badge">
              {imageIndex + 1} / {product.imageUrl?.length || 1}
            </div>
          </div>

          {/* Image Navigation */}
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

        {/* Thumbnail Gallery */}
        {/* {product.imageUrl?.length > 1 && (
                <div className="thumbnail-gallery mt-4">
                  {product.imageUrl.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail-item ${img === activeImage ? "active" : ""}`}
                      onClick={() => {
                        setActiveImage(img);
                        setImageIndex(index);
                      }}
                    >
                      <img src={img} alt={`View ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )} */}
      </div>
      <div className="container">
        <div className="row gx-5 gy-4 align-items-start">

          {/* Product Gallery - Premium */}
          <div className="col-lg-6">
            <div className="product-gallery-premium d-none d-md-block">
              {/* Main Image with Zoom */}
              <div className="image-showcase-wrapper">
                <div className="image-zoom-container premium">
                  <img
                    src={activeImage}
                    alt={product.productName}
                    className="main-product-image premium"
                  />
                  {/* Image Badge */}
                  <div className="image-badge">
                    {imageIndex + 1} / {product.imageUrl?.length || 1}
                  </div>
                </div>

                {/* Image Navigation */}
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

              {/* Thumbnail Gallery */}
              {/* {product.imageUrl?.length > 1 && (
                <div className="thumbnail-gallery mt-4">
                  {product.imageUrl.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail-item ${img === activeImage ? "active" : ""}`}
                      onClick={() => {
                        setActiveImage(img);
                        setImageIndex(index);
                      }}
                    >
                      <img src={img} alt={`View ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          {/* Product Info - Premium */}
          <div className="col-lg-6 mt-3">
            <div className="product-info-premium">
              {/* Category Badge */}
              {/* <div className="category-badge mb-3">
                <span className="badge bg-primary-soft text-primary">
                  {product.category?.name || "Product"}
                </span>
              </div> */}

              {/* Product Name */}
              <h1 className="mb-3 fs-sm fw-bold">
                {product.productName}
              </h1>

              {/* Pricing & MOQ Section - Beautiful Layout */}
              <div className="pricing-moq-premium mt-md-5">
                <div className="row g-4">
                  {/* Price */}
                  <div className="col-6">
                    <div className="price-card">
                      <span className="price-label">Price Per Unit</span>
                      <div className="price-display-premium d-flex align-items-baseline gap-2">
                        <span className="sale-price">₹{product.price}</span>
                        {product.oldPrice && (
                          <span className="old-price">₹{product.oldPrice}</span>
                        )}
                      </div>
                      {product.oldPrice && (
                        <span className="discount-badge">
                          Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* MOQ */}
                  <div className="col-6">
                    <div className="moq-card">
                      <span className="moq-label">Minimum Order</span>
                      <div className="moq-display">
                        <span className="moq-value">{product.minQty || 100}</span>
                        <span className="moq-unit">Units</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Controller - Desktop Version */}
              <div className="quantity-section mb-5 mt-md-4 desktop-quantity">
                <p className="total-price">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">₹{(product.price * quantity).toLocaleString()}</span>
                </p>

                <div className="quantity-controller">
                  <button
                    className="qty-btn decrement"
                    onClick={decrementQuantity}
                    disabled={quantity <= (product?.minQty || 1)}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>

                  <input
                    type="number"
                    className="qty-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={product?.minQty || 1}
                  />

                  <button
                    className="qty-btn increment"
                    onClick={incrementQuantity}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>

              {/* Features/Highlights */}


              {/* Action Buttons - Premium */}
              <div className="action-buttons-premium d-flex flex-column gap-3">
                <a
                  href={product.whatsappLink}

                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-light btn-lg w-100 "
                >
                  <i className="bi bi-whatsapp me-2 "></i>
                  Checkout Via WhatsApp
                </a>

                {/* <button
                  className="btn btn-secondary btn-lg w-100"
                  onClick={() => alert("Share feature coming soon!")}
                >
                  <i className="bi bi-share me-2"></i>
                  Share Product
                </button> */}
              </div>

              {/* <div className="highlights-section">
                <h5 className="section-title">Why Choose Us</h5>
                <ul className="highlights-list">
                  <li><i className="bi bi-check-circle-fill"></i> High Quality Products</li>
                  <li><i className="bi bi-check-circle-fill"></i> Fast Delivery</li>
                  <li><i className="bi bi-check-circle-fill"></i> Best Prices Guaranteed</li>
                  <li><i className="bi bi-check-circle-fill"></i> 24/7 Customer Support</li>
                </ul>
              </div> */}

              {/* Trust Badges */}
              <div className="trust-badges mt-3">
                <div className="badge-item">
                  <i className="bi bi-shield-check"></i>
                  <span>Verified Seller</span>
                </div>
                <div className="badge-item">
                  <i className="bi bi-truck"></i>
                  <span>Free Shipping</span>
                </div>
                <div className="badge-item">
                  <i className="bi bi-arrow-repeat"></i>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {product.description && (
          <div className="row pt-5 border-top">
            <div className="col-lg-12">
              <h3 className="mb-4">Product Description</h3>
              <p className="description-text">{product.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Quantity Bar */}
      <div className="mobile-sticky-quantity">
        <div className="sticky-quantity-wrapper">
          {/* Total Price */}
          <div className="sticky-price-info">
            <span className="sticky-total-label">Total</span>
            <span className="sticky-total-amount">₹{(product.price * quantity).toLocaleString()}</span>
          </div>

          {/* Quantity Controller */}
          <div className="sticky-quantity-controller">
            <button
              className="sticky-qty-btn decrement"
              onClick={decrementQuantity}
              disabled={quantity <= (product?.minQty || 1)}
            >
              <i className="bi bi-dash-lg"></i>
            </button>

            <input
              type="number"
              className="sticky-qty-input"
              value={quantity}
              onChange={handleQuantityChange}
              min={product?.minQty || 1}
            />

            <button
              className="sticky-qty-btn increment"
              onClick={incrementQuantity}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>

          {/* Quick WhatsApp Button */}
          {/* <a
            href={product.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-whatsapp-btn"
          >
            <i className="bi bi-whatsapp"></i>
          </a> */}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

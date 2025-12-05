export default function ProductDetailsSkeleton() {
  return (
    <section className="product-details-premium section mt-lg-5 pt-lg-5 mt-3">
      {/* MOBILE IMAGE VIEW */}
      <div className="product-gallery-premium d-md-none">
        <div className="image-showcase-wrapper">
          <div className="image-zoom-container premium">
            <div className="skeleton-shimmer skeleton-main-image" />
            <div className="image-badge skeleton-shimmer skeleton-badge">1 / 1</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gx-5 gy-4 align-items-start">
          {/* LEFT SIDE IMAGES SKELETON */}
          <div className="col-lg-6 d-none d-md-block">
            <div className="product-gallery-premium">
              <div className="image-showcase-wrapper">
                <div className="image-zoom-container premium">
                  <div className="skeleton-shimmer skeleton-main-image" />
                  <div className="image-badge skeleton-shimmer skeleton-badge">1 / 1</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PRODUCT INFO SKELETON */}
          <div className="col-lg-6">
            <div className="product-info-premium mt-3">
              {/* Category badges skeleton */}
              <div className="d-flex gap-2 mb-3">
                <div className="skeleton-shimmer skeleton-detail-badge"></div>
                <div className="skeleton-shimmer skeleton-detail-badge"></div>
              </div>

              {/* Product name skeleton */}
              <div className="skeleton-shimmer skeleton-detail-title mb-3"></div>

              {/* PRICE & MOQ SKELETON */}
              <div className="pricing-moq-premium mt-md-5 mt-3">
                <div className="row g-4">
                  <div className="col-6">
                    <div className="price-card">
                      <span className="price-label skeleton-shimmer skeleton-detail-label"></span>
                      <div className="price-display-premium d-flex align-items-baseline gap-2 mt-2">
                        <span className="skeleton-shimmer skeleton-detail-price"></span>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="moq-card">
                      <span className="moq-label skeleton-shimmer skeleton-detail-label"></span>
                      <div className="moq-display mt-2">
                        <span className="skeleton-shimmer skeleton-detail-moq-value"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer cards skeleton */}
              <div className="offer-card d-flex align-items-center mt-4">
                <div className="offer-icon-wrapper d-flex align-items-center justify-content-center">
                  <div className="skeleton-shimmer skeleton-detail-icon"></div>
                </div>
                <div className="offer-content flex-grow-1">
                  <div className="skeleton-shimmer skeleton-detail-offer-text"></div>
                </div>
              </div>

              <div className="offer-card d-flex align-items-center mt-4">
                <div className="offer-icon-wrapper d-flex align-items-center justify-content-center">
                  <div className="skeleton-shimmer skeleton-detail-icon"></div>
                </div>
                <div className="offer-content flex-grow-1">
                  <div className="skeleton-shimmer skeleton-detail-offer-text"></div>
                </div>
              </div>

              <div className="offer-card d-flex align-items-center mt-4">
                <div className="offer-icon-wrapper d-flex align-items-center justify-content-center">
                  <div className="skeleton-shimmer skeleton-detail-icon"></div>
                </div>
                <div className="offer-content flex-grow-1">
                  <div className="skeleton-shimmer skeleton-detail-offer-text"></div>
                </div>
              </div>

              {/* QUANTITY SKELETON */}
              <div className="quantity-section mb-4 mt-md-4 desktop-quantity">
                <div className="quantity-controller">
                  <div className="skeleton-shimmer skeleton-detail-qty-btn"></div>
                  <div className="skeleton-shimmer skeleton-detail-qty-input"></div>
                  <div className="skeleton-shimmer skeleton-detail-qty-btn"></div>
                </div>

                <p className="total-price">
                  <span className="skeleton-shimmer skeleton-detail-total-label"></span>
                  <span className="skeleton-shimmer skeleton-detail-total-amount"></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS SKELETON */}
        <div className="scroller-title mt-5">
          <div className="slider-title-wrapper">
            <div className="skeleton-shimmer skeleton-detail-section-title"></div>
          </div>
        </div>

        {/* DESCRIPTION SKELETON */}
        <div className="row pt-5 border-top">
          <div className="col-lg-12">
            <div className="skeleton-shimmer skeleton-detail-section-title mb-4"></div>
            <div className="skeleton-shimmer skeleton-detail-description-line"></div>
            <div className="skeleton-shimmer skeleton-detail-description-line mt-2"></div>
            <div className="skeleton-shimmer skeleton-detail-description-line mt-2" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR SKELETON */}
      <div className="mobile-sticky-quantity">
        <div className="sticky-quantity-wrapper">
          <div className="sticky-price-info">
            <span className="skeleton-shimmer skeleton-detail-sticky-label"></span>
            <span className="skeleton-shimmer skeleton-detail-sticky-amount"></span>
          </div>
          <div className="skeleton-shimmer skeleton-detail-sticky-btn"></div>
        </div>
      </div>
    </section>
  );
}

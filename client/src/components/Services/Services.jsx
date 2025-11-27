import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section id="services" className="services section">

      {/* Section Title */}
      <div className="container section-title">
        <span className="description-title">Services</span>
        <h2>Services</h2>
        <p>Your trusted partner in sourcing, importing, and delivering quality products worldwide.</p>
      </div>

      <div className="container">

        <div className="row align-items-center">

          {/* Left Side Content */}
          <div className="col-lg-6">
            <div className="intro-content">
              <div className="section-badge mb-3">
                <i className="bi bi-star-fill"></i>
                <span>WHAT WE DO</span>
              </div>

              <h2 className="section-heading mb-4">Connecting Markets with Quality Imports</h2>

              <p className="section-description mb-4">
                We facilitate smooth trade flows by ensuring competitive
                pricing, reliable shipping, and end-to-end support for your import needs.
              </p>

              <a href="/contact-us" className="cta-button">
                Contact Our Experts
              </a>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="hero-visual">
              <img
                src="/images/web/transport-logistics-img.jpg"
                alt="Global Import Services"
                className="img-fluid"
              />
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid mt-5">
            <div className="row g-4">

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="card-number"><span>01</span></div>
                  <div className="card-content">
                    <h5 className="service-title"><a href="#">Product Sourcing</a></h5>
                    <p className="service-description">
                      Sourcing high-quality products directly from trusted manufacturers and suppliers in China and beyond.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="card-number"><span>02</span></div>
                  <div className="card-content">
                    <h5 className="service-title"><a href="#">Quality Inspection</a></h5>
                    <p className="service-description">
                      Thorough inspections to ensure products meet industry standards and your specifications before shipment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="card-number"><span>03</span></div>
                  <div className="card-content">
                    <h5 className="service-title"><a href="#">Logistics & Shipping</a></h5>
                    <p className="service-description">
                      Reliable freight forwarding, customs clearance, and door-to-door delivery tailored to your timeline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="card-number"><span>04</span></div>
                  <div className="card-content">
                    <h5 className="service-title"><a href="#">Supply Chain Management</a></h5>
                    <p className="service-description">
                      Optimizing your entire supply chain to reduce costs, improve efficiency, and ensure consistent product availability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="card-number"><span>05</span></div>
                  <div className="card-content">
                    <h5 className="service-title"><a href="#">Customs Documentation</a></h5>
                    <p className="service-description">
                      Handling all import paperwork and compliance to streamline customs procedures and avoid delays.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="card-number"><span>06</span></div>
                  <div className="card-content">
                    <h5 className="service-title"><a href="#">After-Sales Support</a></h5>
                    <p className="service-description">
                      Dedicated support to address post-delivery issues, warranties, or reorders, ensuring customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

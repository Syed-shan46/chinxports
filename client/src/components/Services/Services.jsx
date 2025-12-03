import { Link } from "react-router-dom";
import StepsSection from "./StepsSection";

export default function Services() {
  return (
    <section id="services" className="services section mb-5 mt-4">

      {/* Section Title */}
      <div className="container section-title">
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


              <p className="section-description mb-4">
                We facilitate smooth trade flows by ensuring competitive
                pricing, reliable shipping, and end-to-end support for your import needs.
              </p>

              <Link to="/contact" className="cta-button">
                Contact
              </Link>
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

          <StepsSection />

        </div>
      </div>

    </section>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer" className="footer border-outline">
      <div className="footer-main">
        <div className="container">
          <div className="row gy-4 justify-content-center">

            {/* About Section */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget footer-about">
                <Link to={'/'} href="/" className="logo" style={{textDecoration: "none"}}>
                  <span className="sitename text-dark">ChinaXports</span>
                </Link>

                <p className="text-dark">
                  ChinaXports is a trusted global importer, delivering high-quality products 
                  from China at competitive prices for wholesalers worldwide. We simplify 
                  importing so your business can grow with confidence.
                </p>

                <div className="social-links mt-4">
                  <h5 className="text-dark">Connect With Us</h5>
                  <div className="social-icons">

                    <a 
                      href="https://wa.me/8615669528151" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Whatsapp"
                    >
                      <i className="bi bi-whatsapp text-dark"></i>
                    </a>

                    <a 
                      id="wechat-btn" 
                      href="/wechat-qr" 
                      aria-label="Wechat"
                    >
                      <i className="bi bi-wechat text-dark"></i>
                    </a>

                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h4>Contact Information</h4>

                <div className="footer-contact">

                  <div className="contact-info">
                    <i className="bi bi-telephone text-white"></i>
                    <span>+86 15669528151</span>
                  </div>

                  <div className="contact-info mt-3">
                    <i className="bi bi-clock text-white"></i>
                    <span>
                      <strong>24/7 Support</strong> – We’re available anytime, anywhere!
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Inline Styles (can be moved to CSS file) */}
      <style>{`
        .contact-info {
          font-size: 15px;
        }
        .contact-info i {
          font-size: 18px;
        }
      `}</style>
    </footer>
  );
}

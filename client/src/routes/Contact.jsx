import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="connect-section py-5 mt-5">
      <div className="container text-center" data-aos="fade-up">
        <h2 className="mb-3">Connect With Us</h2>
        <p className="text-muted mb-4">Stay in touch through your favorite platform</p>

        <div className="d-flex justify-content-center gap-4 flex-wrap">
          
          {/* WeChat */}
          <div className="connect-card text-center">
            <i className="bi bi-wechat fs-1 text-success"></i>
            <h5 className="mt-2">WeChat</h5>
            <Link to="/wechat-qr" className="btn btn-wechat btn-sm mt-2">
              Scan QR
            </Link>
          </div>

          {/* WhatsApp */}
          <div className="connect-card text-center">
            <i className="bi bi-whatsapp fs-1 text-success"></i>
            <h5 className="mt-2">WhatsApp</h5>
            <a
              href="https://wa.me/8615669528151"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm mt-2"
            >
              Chat Now
            </a>
          </div>

          {/* Phone */}
          <div className="connect-card text-center">
            <i className="bi bi-telephone fs-1 text-dark"></i>
            <h5 className="mt-2">Call Us</h5>
            <a href="tel:+8615669528151" className="btn btn-phone btn-sm mt-2">
              Call Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

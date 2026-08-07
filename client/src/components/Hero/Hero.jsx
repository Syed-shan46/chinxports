import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const banners = [
    {
      img: "/images/banners/banner6.webp",
    },
    {
      img: "/images/banners/banner7.webp",
    },
    {
      img: "/images/banners/banner8.webp",
    },
    {
      img: "/images/banners/banner9.webp",
      link: '/store'
    },
    {
      img: "/images/banners/banner10.webp",
      link: '/store'
    },



  ];


  const [index, setIndex] = useState(0);

  // SWIPE HANDLERS
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      // Swipe Left → Next slide
      setIndex((prev) => (prev + 1) % banners.length);
    }

    if (distance < -50) {
      // Swipe Right → Previous slide
      setIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  // Auto Slide (3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-wrapper pt-20">

      {/* MOBILE SLIDER (< 768px) */}
      <div
        className="hero-slider d-md-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((b, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
          >
            <img src={b.img} alt="" className="hero-img" />
          </div>
        ))}

        {/* DOTS */}
        <div className="hero-dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>

      {/* DESKTOP GRID LAYOUT (>= 768px) */}
      <div className="d-none d-md-block container-fluid px-4 py-4">
        <div className="row g-4">
          {banners.slice(3, 6).map((b, i) => (
            <div className={`col-md-6 col-lg-4 ${i === 2 ? "d-none d-lg-block" : ""}`} key={i}>
              <Link to={b.link || '/store'} className="text-decoration-none">
                <div className="desktop-hero-card">
                  <div className="img-wrapper">
                    <img src={b.img} alt="Collection" className="img-fluid" />
                    <div className="overlay"></div>
                  </div>
                  <div className="card-content d-flex flex-column align-items-center justify-content-center text-center h-100">
                    <span className="btn btn-outline-light rounded-pill px-4 fw-bold hero-card-btn">
                      Shop Now <i className="bi bi-arrow-right ms-2"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

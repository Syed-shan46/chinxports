// BannerSlider.jsx
import { useEffect, useRef, useState } from "react";
import "./BannerSlider.css";

export default function BannerSlider() {
  const banners = [
    "/images/banners/banner6.png",
    "/images/banners/banner7.png",
    "/images/banners/banner8.png",
  ];

  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto scroll every 3.5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="banner-slider-container">
      <div
        className="banner-slider"
        style={{ transform: `translateX(-${index * 100}%)` }}
        ref={sliderRef}
      >
        {banners.map((img, i) => (
          <div className="banner-slide" key={i}>
            <img src={img} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>

      <button className="arrow left" onClick={prevSlide} aria-label="Previous slide">
        <i className="bi bi-chevron-left"></i>
      </button>
      <button className="arrow right" onClick={nextSlide} aria-label="Next slide">
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Indicator updated to use buttons */}
      <div className="banner-dots">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`dot-btn ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}

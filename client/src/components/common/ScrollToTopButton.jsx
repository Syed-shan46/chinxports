import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-[88px] right-6 md:bottom-28 md:right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-deep-black text-white shadow-2xl transition-all duration-500 transform hover:bg-primary-gold hover:-translate-y-2 group ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-primary-gold/20 animate-ping group-hover:block hidden"></span>
      <i className="bi bi-arrow-up text-xl relative z-10"></i>

      {/* Progress Ring (Visual Flair) */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
        <circle
          cx="28" cy="28" r="26"
          className="stroke-white/10 fill-none"
          strokeWidth="1"
        />
      </svg>
    </button>
  );
}

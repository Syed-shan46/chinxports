import React, { useEffect, useRef } from 'react';

const CategoryCarousel = () => {
  const scrollRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        // Scroll the container by a fixed amount to the right
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000); // Auto scroll every 3 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center">
        {/* Left arrow button */}
        <button className="btn btn-light" onClick={scrollLeft}>
          &#60;
        </button>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="d-flex overflow-auto"
          style={{ scrollBehavior: 'smooth', gap: '20px' }}
        >
          {/* Product Card 1 */}
          <div className="card" style={{ width: '200px' }}>
            <img src="https://via.placeholder.com/200" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Fusce fermentum</h5>
              <p className="card-text">4 Products</p>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="card" style={{ width: '200px' }}>
            <img src="https://via.placeholder.com/200" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Vestibulum ante</h5>
              <p className="card-text">4 Products</p>
            </div>
          </div>



          {/* Add more product cards as needed */}
        </div>

        {/* Right arrow button */}
        <button className="btn btn-light" onClick={scrollRight}>
          &#62;
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;

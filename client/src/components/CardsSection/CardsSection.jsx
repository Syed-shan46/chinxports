import { useEffect, useState } from "react";
import CategoryColumn from "./CategoryColumn";
import { BASE_URL } from "../../config";

export default function CardsSection() {

  const [specialProducts, setSpecialProducts] = useState([]);
  const [specialLoading, setSpecialLoading] = useState(true);
  const [specialError, setSpecialError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/special`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setSpecialProducts(data))
      .catch((err) => {
        console.error("Error fetching special products:", err);
        setSpecialError(err.message);
      })
      .finally(() => setSpecialLoading(false));
  }, []);


  return (
    <section id="cards" className="cards section">
      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6">
            <CategoryColumn
              title="Special"
              icon="bi-star"
              products={specialProducts}
            />
          </div>

          <div className="col-lg-4 col-md-6">
            <CategoryColumn
              title="Trending Now"
              icon="bi-fire"
              products={specialProducts}
            />
          </div>

          <div className="col-lg-4 col-md-6">
            <CategoryColumn
              title="Random Picks"
              icon="bi-dice-5"
              products={specialProducts}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

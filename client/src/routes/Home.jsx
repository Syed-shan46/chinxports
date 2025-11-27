import Hero from "../components/Hero/Hero";
import BestDeals from "../components/BestDeals/BestDeals";
import CardsSection from "../components/CardsSection/CardsSection";
import Services from "../components/Services/Services";
import Stats from "../components/Stats/Stats";
import CategoryTabs from "../components/CardsSection/CateogryTabs";


export default function Home() {
  return (
    <>
      <Hero />

      <CategoryTabs/>

      <BestDeals />

      <div className="container d-flex justify-content-center mt-4">
        <a href="/store" className="btn btn-outline px-4 py-2 rounded-3">
          <i className="bi bi-box-seam me-2"></i> View All Products
        </a>
      </div>

      

      <CardsSection />

      <Services />
      {/* <Stats /> */}
    </>
  );
}

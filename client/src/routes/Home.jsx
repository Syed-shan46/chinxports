import Hero from "../components/Hero/Hero";
import BestDeals from "../components/BestDeals/BestDeals";
import CardsSection from "../components/CardsSection/CardsSection";
import Services from "../components/Services/Services";
import Stats from "../components/Stats/Stats";
import CategoryTabs from "../components/CardsSection/CateogryTabs";
import CategoryCarousel from "../components/CategoryCarousel/CategoryCarousel";


export default function Home() {
  return (
    <>
      <Hero />

      <CategoryTabs/>

      <BestDeals />
      
      {/* <CardsSection /> */}
      
      <Services />
    </>
  );
}

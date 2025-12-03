
import BestDeals from "../components/BestDeals/BestDeals";
import Services from "../components/Services/Services";
import CategoryTabs from "../components/CardsSection/CateogryTabs";
import Hero from "../components/Hero/Hero";
import PromoCards from "../components/PromoCards/PromoCards";
import HorizontalProductSlider from "../components/HorizontalProductSlider/HorizontalProductSlider";
import BannerSlider from "../components/Hero/BannerSlider";
import CategoryScroller from "../components/Hero/CategroyScroller";


export default function Home() {
  return (
    <>

      <Hero />

      {/* <BannerSlider/> */}

      <CategoryScroller/>
      

      <HorizontalProductSlider/>

      <PromoCards />



      <CategoryTabs />

      <BestDeals />


      


      {/* <CardsSection /> */}

      <Services />

    </>
  );
}

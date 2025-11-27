import Footer from "../components/footer/Footer";
import Header from "../components/Header/Header";


export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer/>
    </>
  );
}

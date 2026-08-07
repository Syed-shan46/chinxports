import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/common/Preloader";
// import './App.css'
// import './styles/theme.css';
import Home from './routes/Home';
import MainLayout from './layouts/MainLayout';
import Store from './routes/Store';
import ProductDetails from './routes/ProductDetails';
import About from './routes/About';
import Wholesale from './routes/Wholesale';
import Contact from './routes/Contact';
import BulkUpload from './routes/BulkUpload';
import ProductUpload from './routes/UploadProduct';
import AdminLogin from './routes/AdminLogin';
import { AdminProvider } from './context/AdminContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Popup from './components/Popup';
import Cart from "./routes/Cart";
import ScrollToTop from "./components/common/scrollToTop";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import OffersWidget from "./components/common/OffersWidget";
import WeChat from "./components/WeChat/WeChat";
import CreateSubCategory from "./routes/CreateSubCategory";
import Services from "./components/Services/Services";
import Account from "./routes/Account";
import MobileBottomNav from "./components/common/MobileBottomNav";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLoading]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AdminProvider>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>

            <BrowserRouter>
                <MainLayout>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/wholesale" element={<Wholesale />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/products/product-details/:id" element={<ProductDetails />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/bulk-upload" element={
                            <PrivateRoute>
                                <BulkUpload />
                            </PrivateRoute>
                        } />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route
                            path="/upload-product"
                            element={
                                <PrivateRoute>
                                    <ProductUpload />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/wechat" element={<WeChat />} />
                        <Route path="/services" element={<Services />} />
                    </Routes>
                    <ScrollToTopButton />
                    {/* <OffersWidget /> */}
                </MainLayout>
            </BrowserRouter>
        </AdminProvider>
    );
}

export default App;

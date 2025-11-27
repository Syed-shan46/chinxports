import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css'
import './styles/theme.css';
import Home from './routes/Home';
import MainLayout from './layouts/MainLayout';
import Store from './routes/Store';
import ProductDetails from './routes/ProductDetails';
import About from './routes/About';
import Contact from './routes/Contact';
import BulkUpload from './routes/BulkUpload';
import ProductUpload from './routes/UploadProduct';
import AdminLogin from './routes/AdminLogin';
import { AdminProvider } from './context/AdminContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <AdminProvider>

      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products/product-details/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/upload-product" element={<ProductUpload />} />
            {/* <Route
              path="/upload-product"
              element={
                <PrivateRoute>
                  <ProductUpload />
                </PrivateRoute>
              }
            /> */}

          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;

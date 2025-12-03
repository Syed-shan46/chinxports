import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'   // <-- Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // <-- Bootstrap JS (optional)

import { CartProvider } from './context/CartContext.jsx'


createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>,
)

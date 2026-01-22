import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartFunction.jsx'
import ScrollToTop from "./Components/ScrollToTop.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <ScrollToTop />
      <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
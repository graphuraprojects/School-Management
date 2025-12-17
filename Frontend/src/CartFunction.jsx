// src/CartFunction.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        setCart(response.data.cart || []);
      } catch (error) {
        console.log("fetchCart error:", error.response?.data || error.message);
      }
    };

    fetchCart();
  }, []);

  // ADD ITEM (quantity default 1)
  const addToCart = async (product) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.warn("Please log in to add items to your cart.");
    return;
  }

  // Ensure productId exists
  const productId = product._id || product.id;
  if (!productId) {
    console.error("Product object does not have _id or id:", product);
    toast.warn("Cannot add this product to cart.");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/add-to-cart`, 
      { productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCart(response.data.cart);
    toast.success(
    <div className="flex items-start gap-3">
      <CheckCircle size={22} className="text-green-600 mt-1" />

      <div className="flex-1">
        <p className="font-semibold text-gray-800">
          Item added to cart!
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-2 text-sm text-blue-600 font-semibold hover:underline"
        >
          View Cart →
        </button>
      </div>
    </div>,
    {
      className:
        "rounded-xl shadow-lg border border-green-200 bg-green-50",
      bodyClassName: "p-3",
      progressClassName: "bg-green-500",
      autoClose: 3000,
    }
  );
  } catch (error) {
    console.error("Add to cart failed:", error.response?.data || error.message);
    toast.error("Failed to add item to cart.");
  }
};


  // REMOVE 1 qty
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/remove-from-cart`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.cart || []);
    } catch (error) {
      console.log(
        "removeFromCart error:",
        error.response?.data || error.message
      );
    }
  };

  // CLEAR ENTIRE ITEM
  const clearItem = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/clear-from-cart`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.cart || []);
    } catch (error) {
      console.log("clearItem error:", error.response?.data || error.message);
    }
  };

  return (
    <>
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearItem, setCart }}
    >
      {children}
    </CartContext.Provider>
    <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

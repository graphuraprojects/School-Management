import React, { useContext } from "react";
import { CartContext } from "../CartFunction";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../Components/Checkout";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearItem } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => {
    if (!item.productId) return total;
    return total + (item.productId.price || 0) * Number(item.quantity || 0);
  }, 0);

  return (
    <div className="bg-[#f6f7f8] min-h-screen flex flex-col items-center px-3 sm:px-5">
      {/* HEADING */}
      <h1 className="py-10 font-extrabold text-3xl md:text-4xl text-center w-full">
        🛒 My Shopping Cart
      </h1>

      {/* MAIN LAYOUT */}
      <section
        className="w-full flex flex-col md:flex-row justify-between items-start 
        max-w-[1200px] gap-6 md:gap-10"
      >
        {/* LEFT SIDE — CART ITEMS */}
        <div className="w-full md:flex-1 max-w-[650px] mx-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-8xl">🛒</div>
              <span className="p-4 font-bold text-2xl">
                Your Cart is Empty!
              </span>

              <button
                onClick={() => navigate("/store")}
                className="bg-blue-500 py-2 px-10 mt-3 rounded-xl text-white cursor-pointer font-semibold shadow-md hover:bg-blue-600 transition"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId?._id || item._id}
                className="p-4 mb-4 bg-white flex gap-4 shadow-lg rounded-xl w-full 
                max-w-[600px] mx-auto hover:shadow-2xl transition"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-lg">
                  {item.productId?.image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item.productId.image}
                      alt={item.productId?.title || "cart-item"}
                    />
                  ) : null}
                </div>

                <div className="flex flex-col justify-between w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg max-w-[220px] line-clamp-2">
                      {item.productId?.title || "Untitled"}
                    </h3>

                    <i
                      onClick={() => clearItem(item.productId?._id)}
                      className="fa-solid fa-trash text-red-500 cursor-pointer text-xl hover:scale-110 transition"
                    ></i>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => removeFromCart(item.productId?._id)}
                        className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>

                      <span className="font-semibold text-lg">
                        {Number(item.quantity)}
                      </span>

                      <button
                        onClick={() => addToCart(item.productId)}
                        className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>

                    <span className="font-bold text-lg">
                      ₹
                      {(item.productId?.price || 0) *
                        Number(item.quantity || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          <button
            className="text-blue-600 font-semibold mt-3 hover:underline ml-5"
            onClick={() => navigate("/store")}
          >
            <i className="fa-solid fa-arrow-left pr-2"></i>Continue Shopping
          </button>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        {cart.length > 0 && (
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-[350px] 
            mx-auto md:mx-0 md:top-20"
          >
            <h4 className="font-bold text-2xl pb-4">Order Summary</h4>

            <div className="flex justify-between font-semibold text-lg pb-2">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pb-2">
              <span className="text-gray-500">Delivery</span>
              <span>{totalAmount > 399 ? "Free" : "₹29"}</span>
            </div>

            <p className="text-blue-500 text-sm font-semibold pb-3">
              {totalAmount < 400 ? (
                "Delivery free on orders above ₹399"
              ) : (
                <strike>Delivery free on order above ₹399</strike>
              )}
            </p>

            <div className="flex justify-between font-bold text-xl border-t pt-3">
              <span>Total</span>
              <span>₹{totalAmount + (totalAmount > 399 ? 0 : 29)}</span>
            </div>

            <div className="mt-5">
              <CheckoutButton orderAmount={totalAmount} cartItems={cart}/>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;

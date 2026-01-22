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

  const deliveryFee = totalAmount > 399 ? 0 : 29;
  const finalTotal = totalAmount + deliveryFee;

  return (
    <div className="bg-white flex flex-col items-center pb-8">
      {/* HEADING SECTION WITH GRADIENT */}
      <div 
        className="w-full py-8 pt-30 mb-8 shadow-lg"
        style={{
          background: "linear-gradient(180deg, #0c3031 0%, #0f3730 50%, #1a472d 100%)"
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 animate-fade-up">
          <h1 className="font-extrabold text-3xl md:text-4xl text-center text-white mb-2">
            <i className="fa-solid fa-cart-shopping text-[#6fd513] mr-3"></i>
            My Shopping Cart
          </h1>
          {cart.length > 0 && (
            <p className="text-center text-gray-300 text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-box text-[#6fd513]"></i>
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <section className="w-full flex flex-col lg:flex-row justify-between items-start max-w-[1200px] gap-6 lg:gap-8 px-3 lg:px-5">
        {/* LEFT SIDE — CART ITEMS */}
        <div className="w-full lg:flex-1 max-w-[700px] mx-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-200">
              <div className="relative mb-6">
                <i className="fa-solid fa-cart-shopping text-8xl text-gray-300"></i>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#6fd513] rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-xmark text-white text-xs"></i>
                </div>
              </div>
              <span className="p-4 font-bold text-2xl text-gray-800 mb-2">
                Your Cart is Empty!
              </span>
              <p className="text-gray-500 text-center mb-6 max-w-md">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>

              <button
                onClick={() => navigate("/store")}
                className="bg-[#6fd513] py-3 px-10 rounded-xl text-white cursor-pointer font-semibold shadow-lg hover:bg-[#53a110] transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                <i className="fa-solid fa-store"></i>
                Shop Now
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={item.productId?._id || item._id}
                  className="group p-5 mb-4 bg-white border-2 border-gray-100 rounded-2xl w-full hover:border-[#6fd513] hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-xl border-2 border-gray-100 group-hover:border-[#6fd513] transition-all duration-300 flex-shrink-0 relative">
                      {item.productId?.image ? (
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          src={item.productId.image}
                          alt={item.productId?.title || "cart-item"}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <i className="fa-solid fa-image text-gray-400 text-2xl"></i>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-[#6fd513] text-white text-xs font-bold px-2 py-1 rounded-full">
                        <i className="fa-solid fa-tag mr-1"></i>
                        {item.quantity}x
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between w-full min-w-0">
                      {/* Title and Delete */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg sm:text-xl text-gray-800 line-clamp-2 mb-1">
                            {item.productId?.title || "Untitled"}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <i className="fa-solid fa-indian-rupee-sign text-xs"></i>
                            <span className="font-semibold">{item.productId?.price || 0}</span>
                            <span className="text-gray-400">per item</span>
                          </p>
                        </div>
                        <button
                          onClick={() => clearItem(item.productId?._id)}
                          className="text-red-500 hover:text-red-600 cursor-pointer text-xl hover:scale-110 transition-all duration-200 flex-shrink-0 p-2 hover:bg-red-50 rounded-lg"
                          title="Remove item"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200">
                          <button
                            onClick={() => removeFromCart(item.productId?._id)}
                            className="bg-[#6fd513] text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#53a110] transition-all duration-200 hover:scale-110 shadow-md"
                            title="Decrease quantity"
                          >
                            <i className="fa-solid fa-minus text-xs"></i>
                          </button>

                          <span className="font-bold text-base sm:text-lg text-gray-800 min-w-[2.5rem] text-center">
                            {Number(item.quantity)}
                          </span>

                          <button
                            onClick={() => addToCart(item.productId)}
                            className="bg-[#6fd513] text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#53a110] transition-all duration-200 hover:scale-110 shadow-md"
                            title="Increase quantity"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-bold text-xl sm:text-2xl text-[#6fd513] flex items-center gap-1">
                            <i className="fa-solid fa-indian-rupee-sign text-lg"></i>
                            {(item.productId?.price || 0) * Number(item.quantity || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Button */}
              <button
                className="mt-6 text-[#6fd513] font-semibold hover:text-[#53a110] transition-all duration-200 inline-flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-green-50"
                onClick={() => navigate("/store")}
              >
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                Continue Shopping
              </button>
            </>
          )}
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        {cart.length > 0 && (
          <div className="w-full lg:w-auto lg:max-w-[380px] mx-auto lg:mx-0 lg:sticky lg:top-8">
            <div 
              className="p-6 sm:p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #0c3031 0%, #0f3730 50%, #1a472d 100%)"
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6fd513]/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6fd513]/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <h4 className="font-bold text-2xl sm:text-3xl pb-6 mb-6 border-b border-white/20 flex items-center gap-2">
                  <i className="fa-solid fa-receipt text-[#6fd513]"></i>
                  Order Summary
                </h4>

                <div className="space-y-4 mb-6">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <i className="fa-solid fa-list text-sm"></i>
                      Subtotal
                    </span>
                    <span className="text-white font-semibold text-lg flex items-center gap-1">
                      <i className="fa-solid fa-indian-rupee-sign text-sm"></i>
                      {totalAmount}
                    </span>
                  </div>

                  {/* Delivery */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <i className="fa-solid fa-truck text-sm"></i>
                      Delivery
                    </span>
                    <span className={`font-semibold text-lg flex items-center gap-1 ${deliveryFee === 0 ? 'text-[#6fd513]' : 'text-white'}`}>
                      {deliveryFee === 0 ? (
                        <>
                          <i className="fa-solid fa-check-circle"></i>
                          <span>Free</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-indian-rupee-sign text-sm"></i>
                          {deliveryFee}
                        </>
                      )}
                    </span>
                  </div>

                  {/* Delivery Message */}
                  {totalAmount < 400 ? (
                    <div className="bg-[#6fd513]/20 border border-[#6fd513]/40 rounded-lg p-3 mt-4">
                      <p className="text-[#6fd513] text-sm font-semibold flex items-center gap-2">
                        <i className="fa-solid fa-info-circle"></i>
                        Add ₹{Math.ceil(400 - totalAmount)} more for free delivery!
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#6fd513]/20 border border-[#6fd513]/40 rounded-lg p-3 mt-4">
                      <p className="text-[#6fd513] text-sm font-semibold flex items-center gap-2">
                        <i className="fa-solid fa-check-circle"></i>
                        You qualify for free delivery!
                      </p>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t-2 border-white/20 mb-6">
                  <span className="text-white font-bold text-xl">Total</span>
                  <span className="text-[#6fd513] font-bold text-2xl sm:text-3xl flex items-center gap-1">
                    <i className="fa-solid fa-indian-rupee-sign text-xl"></i>
                    {finalTotal}
                  </span>
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                  <CheckoutButton orderAmount={totalAmount} cartItems={cart} />
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-gray-300 text-xs">
                  <i className="fa-solid fa-lock"></i>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;

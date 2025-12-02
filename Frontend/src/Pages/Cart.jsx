import React, { useContext } from "react";
import { CartContext } from "../CartFunction";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);

  return (
    <div className="bg-[#f6f7f8] min-h-screen flex flex-col items-center">
      <h1 className="p-4 font-extrabold text-2xl w-full md:text-3xl lg:text-4xl">My Shopping Cart</h1>
      <section className="w-full flex flex-col items-center lg:flex-row justify-between lg:p-5 lg:items-start max-w-[1100px]">
        <div>
          {cart.length === 0 ? (
            <div className="empty-cart-box flex flex-col items-center justify-center h-screen">
              <div className="text-9xl">🛒</div>
              <span className="p-4 font-bold text-xl">Cart is Empty!</span>
              <span
                onClick={() => {
                  navigate("/merchandise");
                }}
                className="bg-blue-500 py-2 px-10 mt-2 rounded-xl text-white cursor-pointer font-semibold"
              >
                Shop now
              </span>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="m-4 bg-white flex gap-4 shadow-xl rounded-xl max-w-[500px] lg:max-w-[600px] w-full xl:px-5"
              >
                <div className="flex">
                  <div className="w-25 h-25 m-3 overflow-hidden rounded-lg shadow-lg">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt="cart-item"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between p-2 lg:flex-row lg:justify-between w-full lg:gap:10">
                  <h3 className="font-bold text-lg max-w-[220px]">{item.title}</h3>
                  <div className="flex gap-5 items-center">
                    <div>
                      <i
                        onClick={() => removeFromCart(item._id)}
                        className="fa-solid fa-minus bg-blue-500 text-white px-2 py-[7px] rounded-full cursor-pointer"
                      ></i>{" "}
                      <span className="mx-2 font-semibold">
                        {item.quantity}
                      </span>{" "}
                      <i
                        onClick={() => addToCart(item)}
                        className="fa-solid fa-plus bg-blue-500 text-white px-2 py-[7px] rounded-full cursor-pointer"
                      ></i>
                    </div>
                    <span className="font-semibold">
                      ₹{item.price * item.quantity}.00
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <span className="text-blue-500 mx-5 font-semibold cursor-pointer" onClick={()=>navigate('/merchandise')}><i className="fa-solid fa-arrow-left pr-3"></i>Continue Shopping</span>
        </div>
        {
            cart.length > 0 && (
                <div className="m-4 bg-white p-4 rounded-xl shadow-xl max-w-[350px] w-full lg:mt-10">
                    <h4 className="font-bold text-xl pb-4">Order Summary</h4>
                    <div className="flex justify-between font-semibold text-lg">
                        <span className="text-gray-400">Subtotal</span>
                        <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-1 text-lg">
                        <span className="text-gray-400">Delivery</span>
                        <span>{totalAmount > 399 ? "Free" : "₹29"}</span>
                    </div>
                    <span className="text-blue-400 text-sm font-semibold">{totalAmount < 399 ? "Delivery free on order above Rs.399" : <strike>Delivery free on order above Rs.399</strike>}</span>
                    <div className="flex justify-between font-bold text-xl pt-2 border-t border-gray-400 mt-4">
                        <span>Total</span>
                        <span>₹{totalAmount + (totalAmount > 399 ? 0 : 29)}</span>
                    </div>
                    <button className="w-full cursor-pointer bg-blue-500 p-2 shadow-xl rounded-lg mt-2 text-white font-semibold hover:shadow-2xl hover:bg-blue-900 hover:scale-105 transition-transform duration-300 active:bg-blue-900">Place Order</button>
                </div>
            )
        }
      </section>
    </div>
  );
};

export default Cart;

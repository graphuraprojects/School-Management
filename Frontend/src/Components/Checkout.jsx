import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CartContext } from "../CartFunction";

const CheckoutButton = ({ orderAmount, cartItems }) => {
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext)
  const placeFinalOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const fixedItems = cartItems.map((item) => ({
        productId: item?.productId?._id || item?.productId || item?._id,
        quantity: item.quantity,
      }));

      // ⬇️ Correct backend route + correct field name totalPrice
      await axios.post(`${import.meta.env.VITE_API_URL}/orders/create`, {
        userId: user._id || user.id,
        items: fixedItems,
        totalPrice: orderAmount <= 399 ? orderAmount + 29 : orderAmount,
      });

      // Clear user cart
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/clear-cart/${user._id || user.id}`
      );
      setCart([]);
      toast.success("Order placed successfully! Cart cleared.");
      navigate("/track-order");
    } catch (e) {
      console.error("Order placement failed:", e?.response?.data || e);
      toast.error("Error placing order!");
    }
  };

  //  Open Razorpay window
  const openRazorpay = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/create-order`,
        { amount: orderAmount <= 399 ? orderAmount + 29 : orderAmount }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Graphura School Store",
        description: "Order Payment",
        order_id: data.id,
        prefill: {
          contact: "",
        },
        handler: function (response) {
          console.log("Payment successful:", response);
          toast.success("Payment Successful! Updating stock...");

          // After payment success >>>  deduct stock
          placeFinalOrder();
        },
        theme: { color: "#6fd513" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("Payment failed!");
    }
  };

  // Validation for login
  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      toast.warn("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/get-address/${user.id}`
      );

      const addresses = res.data.addresses;

      if (!addresses || addresses.length === 0) {
        toast.warn("No address found! Please update your address first.");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
        return;
      }

      const defaultAddress =
        addresses.find((a) => a.isDefault === true) || addresses[0];

      openRazorpay();
    } catch (error) {
      toast.error("Could not fetch address")
    }
  };

  return (
    <>
    <button
      className="w-full cursor-pointer bg-[#6fd513] p-3 sm:p-4 shadow-xl rounded-xl text-white font-bold text-lg hover:bg-[#53a110] hover:shadow-2xl hover:shadow-[#6fd513]/50 hover:scale-[1.02] transition-all duration-300 active:bg-[#53a110] flex items-center justify-center gap-2"
      onClick={handlePlaceOrder}
    >
      <i className="fa-solid fa-lock"></i>
      Place Order
      <i className="fa-solid fa-arrow-right"></i>
    </button>
    <ToastContainer />
    </>
  );
};

export default CheckoutButton;

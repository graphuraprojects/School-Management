import React, { useState } from "react";
import axios from "axios";
import "../Styles/TrackOrder.css";
import { ToastContainer, toast } from "react-toastify";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim()) return;

    try {
      setError("");
      setOrderData(null);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`
      );

      setOrderData(res.data);
    } catch (err) {
      toast.error("❌ Order not found. Please check your Order ID.",err);
    }
  };

  const getDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getExpectedDelivery = (date, days = 5) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="track-container">
      <div className="max-w-3xl mx-auto px-4 py-6 mt-20 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <i className="fa-solid fa-truck-fast text-[#6fd513]"></i>
          Track Your Order
        </h1>
        <p className="text-gray-600 font-semibold mb-6">
          Enter your Order ID to see the current delivery status.
        </p>

        {/* INPUT */}
        <div className="input-card">
          <label className="block font-semibold mb-3 text-gray-700 flex items-center gap-2">
            <i className="fa-solid fa-hashtag text-[#6fd513]"></i>
            Order ID
          </label>
          <div className="input-row">
            <input
              type="text"
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleTrack()}
            />
            <button onClick={handleTrack} className="flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass"></i>
              Track Order
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* SHOW ONLY IF ORDER EXISTS */}
        {orderData && (
          <div className="status-card">
            <div className="status-header">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-receipt text-[#6fd513]"></i>
                Order #{orderData._id?.slice(-8).toUpperCase() || orderData._id}
              </h3>
              <span className={`badge badge-${orderData.status?.toLowerCase().replace(/_/g, "-") || "order-placed"}`}>
                {orderData.status?.replace(/_/g, " ") || "Order Placed"}
              </span>
            </div>

            <div className="order-info">
              <p className="placed-date flex items-center gap-2">
                <i className="fa-solid fa-calendar text-[#6fd513]"></i>
                <span>Order Placed: <strong>{getDate(orderData.createdAt)}</strong></span>
              </p>

              <p className="placed-date flex items-center gap-2">
                <i className="fa-solid fa-clock text-[#6fd513]"></i>
                <span>
                  Delivery Expected by:{" "}
                  <strong>{getExpectedDelivery(orderData.createdAt, 7)}</strong>
                </span>
              </p>
            </div>

            {/* STEPS */}
            <div className="steps">
              <div className={`step ${orderData.status ? "active" : ""}`}>
                <div className="icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>Order Placed</p>
              </div>

              <div
                className={`step ${
                  ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
                    orderData.status
                  )
                    ? "active"
                    : ""
                }`}
              >
                <div className="icon">
                  <i className="fa-solid fa-box"></i>
                </div>
                <p>Shipped</p>
              </div>

              <div
                className={`step ${
                  ["OUT_FOR_DELIVERY", "DELIVERED"].includes(orderData.status)
                    ? "active"
                    : ""
                }`}
              >
                <div className="icon">
                  <i className="fa-solid fa-truck"></i>
                </div>
                <p>Out for Delivery</p>
              </div>

              <div
                className={`step ${
                  orderData.status === "DELIVERED" ? "active" : ""
                }`}
              >
                <div className="icon">
                  <i className="fa-solid fa-house"></i>
                </div>
                <p>Delivered</p>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default TrackOrder;

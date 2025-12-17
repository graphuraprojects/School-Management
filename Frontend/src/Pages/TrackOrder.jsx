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
      toast.error("❌ Order not found. Please check your Order ID.");
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
      <h1>Track Your Order</h1>
      <p className="subtitle">
        Enter your Order ID to see the current delivery status.
      </p>

      {/* INPUT */}
      <div className="input-card">
        <label>Order ID</label>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button onClick={handleTrack}>Track Order</button>
        </div>
      </div>

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* SHOW ONLY IF ORDER EXISTS */}
      {orderData && (
        <div className="status-card">
          <div className="status-header">
            <h3>Order #{orderData._id}</h3>
            <span className="badge">{orderData.status}</span>
          </div>

          <p className="placed-date">
            Order Placed: {getDate(orderData.createdAt)}
          </p>

          <p className="placed-date">
            Delivery Expected by:{" "}
            <strong>{getExpectedDelivery(orderData.createdAt, 7)}</strong>
          </p>

          {/* STEPS */}
          <div className="steps">
            <div className={`step active`}>
              <div className="icon">✔</div>
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
              <div className="icon">📦</div>
              <p>Shipped</p>
            </div>

            <div
              className={`step ${
                ["OUT_FOR_DELIVERY", "DELIVERED"].includes(orderData.status)
                  ? "active"
                  : ""
              }`}
            >
              <div className="icon">🚚</div>
              <p>Out for Delivery</p>
            </div>

            <div
              className={`step ${
                orderData.status === "DELIVERED" ? "active" : ""
              }`}
            >
              <div className="icon">🏠</div>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TrackOrder;

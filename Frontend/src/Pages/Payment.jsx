import React, { useState, useContext } from "react";
import "../Styles/Payment.css";
import { CartContext } from "../CartFunction";

export default function Payment() {
  const [method, setMethod] = useState("card");

  // 🔹 Get cart data from context
  const { cart } = useContext(CartContext);

  // 🔹 Calculate total quantity
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 🔹 Calculate total price
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="payment-wrapper">
      {/* Breadcrumb */}
      <div className="breadcrumbs">
        Shipping <span>/</span> <b>Payment</b> <span>/</span> Confirmation
      </div>

      <h1 className="page-title">Checkout & Payment</h1>

      <div className="payment-container">
        {/* LEFT : Payment Methods */}
        <div className="payment-options">
          {/* CARD OPTION */}
          <div className={`payment-box ${method === "card" ? "active" : ""}`}>
            <div className="payment-header" onClick={() => setMethod("card")}>
              <input
                type="radio"
                checked={method === "card"}
                onChange={() => setMethod("card")}
              />
              <div>
                <h3>Credit or Debit Card</h3>
                <p>Pay with Visa, MasterCard</p>
              </div>
            </div>

            {method === "card" && (
              <div className="payment-form">
                <label>Card Number</label>
                <input placeholder="0000 0000 0000 0000" />

                <label>Name on Card</label>
                <input placeholder="John Doe" />

                <div className="row">
                  <div>
                    <label>Expiration Date</label>
                    <input placeholder="MM / YY" />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* UPI OPTION */}
          <div className={`payment-box ${method === "upi" ? "active" : ""}`}>
            <div className="payment-header" onClick={() => setMethod("upi")}>
              <input
                type="radio"
                checked={method === "upi"}
                onChange={() => setMethod("upi")}
              />
              <div>
                <h3>UPI</h3>
                <p>Pay via any UPI app</p>
              </div>
            </div>

            {method === "upi" && (
              <div className="payment-form">
                <label>UPI ID</label>
                <input placeholder="example@upi" />
              </div>
            )}
          </div>

          {/* COD OPTION */}
          <div className={`payment-box ${method === "cod" ? "active" : ""}`}>
            <div className="payment-header" onClick={() => setMethod("cod")}>
              <input
                type="radio"
                checked={method === "cod"}
                onChange={() => setMethod("cod")}
              />
              <div>
                <h3>Cash on Delivery (COD)</h3>
                <p>Pay with cash upon delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT : ORDER SUMMARY (Dynamic Now!) */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Number of items</span>
            <b>{itemCount}</b>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <b>₹{totalAmount}</b>
          </div>

          <button
            className="pay-btn"
            disabled={itemCount === 0}
            style={{
              opacity: itemCount === 0 ? 0.6 : 1,
              cursor: itemCount === 0 ? "not-allowed" : "pointer",
            }}
          >
            {itemCount === 0 ? "No Items in Cart" : "Confirm Order"}
          </button>

          <p className="secure-text">🔒 Secure SSL Encrypted Payment</p>
        </div>
      </div>
    </div>
  );
}

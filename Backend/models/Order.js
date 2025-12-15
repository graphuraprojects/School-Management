const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Merchandise" },
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: {
    type: String,
    enum: ["ORDER_PLACED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"],
    default: "ORDER_PLACED"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", Order);

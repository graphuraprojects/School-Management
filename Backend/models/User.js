const mongoose = require("mongoose");
const User = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { type: String, default: "user" },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Merchandise" },
      quantity: { type: Number, default:1},
    },
  ],
  addresses: [
  {
    fullName: String,
    mobile: String,
    pincode: String,
    addressLine: String,
    landmark: String,
    city: String,
    state: String,
    isDefault: { type: Boolean, default: false }
  }
]
});
module.exports = mongoose.model("User", User);

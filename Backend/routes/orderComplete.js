const express = require("express");
const router = express.Router();
const Merchandise = require("../models/Merchandise");
const Order = require("../models/Order");
const transporter = require("../email")
const User = require("../models/User")

// PLACE ORDER → Update stock only
router.post("/place-order", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    //  Check stock availability
    for (let item of items) {
      const product = await Merchandise.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `${product.title} has only ${product.quantity} left`,
        });
      }
    }

    // 2️⃣ Deduct stock after validation
    for (let item of items) {
      const product = await Merchandise.findById(item.productId);
      product.quantity -= item.quantity;
      await product.save();
    }

    res.status(200).json({ message: "Order placed successfully & stock updated" });

  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


//order tracking
//create a order
router.post("/create", async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    // Decrease stock for each product
    for (let item of items) {
      await Merchandise.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity }
      });
    }

    const order = await Order.create({
      userId,
      items,
      totalPrice,
    });

     const user = await User.findById(userId);

    // Send email
    if (user && user.email) {
      await transporter.sendMail({
        from: `"Graphura School" <${process.env.MAIL_USER}>`,
        to: user.email,
        subject: "Order Placed Successfully 🎉",
        html: `
          <h2>Thank you for your order, ${user.username}!</h2>
          <p>Your order has been placed successfully.</p>

          <p><strong>Order ID:</strong> ${order._id}</p>

          <p>You can track your order using this Order ID.</p>

          <br/>
          <p>Regards,<br/>School Store Team</p>
        `,
      });
    }

    res.status(201).json({
      message: "Order placed successfully!",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

//get your ordeer by id
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("items.productId", "title price image");

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error });
  }
});


//get all orders list
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "_id username email")
      .populate("items.productId", "title price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

//status changing
router.put("/status/:orderId", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      message: "Status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
});

module.exports = router;

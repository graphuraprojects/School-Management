const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const transporter = require("../email");
const sendOtpEmail = require("../email");
const verifyToken = require("../middleware/verifyToken");
const Merchandise = require("../models/Merchandise");


// register
router.post("/register", async (req, res) => {
  const { username, email, password, mobile, role, admin_secret } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Validate admin secret if role is admin
    if (role === "admin") {
      if (!admin_secret || admin_secret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ error: "Invalid admin secret key" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobile,
      role: role === "admin" ? "admin" : "user",
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//get user by id
router.get("/get-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("cart.productId"); // if you want cart populated

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        addresses: user.addresses,
        cart: user.cart,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//update-username and number
router.put("/update-user", verifyToken, async (req, res) => {
  const { username, mobile } = req.body;
  const userId = req.user.id;

  if (!username && !mobile) {
    return res.status(400).json({ message: "Username or phone is required" });
  }

  try {
    const updateData = {};
    if (username) updateData.username = username;
    if (mobile) updateData.mobile = mobile;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: {
        username: updatedUser.username,
        mobile: updatedUser.mobile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// OTP authentication
const otpStore = {}; // use same name everywhere

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // 2. Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Store OTP temporarily (in-memory store)
    otpStore[email] = {
      otp: generatedOtp,
      expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes expiry
    };

    // 4. Send OTP via email
    await sendOtpEmail(email, generatedOtp);

    // 5. Success response
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const savedData = otpStore[email];

  if (!savedData) {
    return res.status(400).json({ message: "OTP expired or not requested" });
  }

  // Check expiration
  if (Date.now() > savedData.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (savedData.otp.toString() === otp.toString()) {
    delete otpStore[email];
    return res.json({ message: "OTP verified successfully" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
});

// ADD TO CART
router.post("/add-to-cart", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Merchandise.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find existing item safely
    const existingItem = user.cart.find((item) => {
      if (!item.productId) return false; // skip bad entries
      const pid =
        typeof item.productId === "string"
          ? item.productId
          : item.productId._id
          ? item.productId._id.toString()
          : item.productId.toString();
      return pid === productId.toString();
    });

    if (existingItem) {
      existingItem.quantity += quantity ? parseInt(quantity, 10) : 1;
    } else {
      user.cart.push({
        productId,
        quantity: quantity ? parseInt(quantity, 10) : 1,
      });
    }

    await user.save();

    const freshCart = await User.findById(userId).populate("cart.productId");

    res
      .status(200)
      .json({ message: "Added to cart successfully", cart: freshCart.cart });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET CART DATA
router.get("/cart", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: "cart.productId",
      model: "Merchandise",
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

// REMOVE 1 qty FROM CART
router.post("/remove-from-cart", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const user = await User.findById(userId).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.find((c) => {
      const pid = c.productId?._id
        ? c.productId._id.toString()
        : String(c.productId);
      return pid === String(productId);
    });

    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      user.cart = user.cart.filter((c) => {
        const pid = c.productId?._id
          ? c.productId._id.toString()
          : String(c.productId);
        return pid !== String(productId);
      });
    }

    await user.save();

    const fresh = await User.findById(userId).populate("cart.productId");
    res.status(200).json({ message: "Item updated", cart: fresh.cart });
  } catch (error) {
    console.error("REMOVE FROM CART ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// CLEAR ENTIRE ITEM FROM CART
// CLEAR ENTIRE ITEM FROM CART
router.post("/clear-from-cart", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }

    // Fetch user and populate cart products
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => {
      if (!item.productId) return true;

      const pid =
        typeof item.productId === "string"
          ? item.productId
          : item.productId._id
          ? item.productId._id.toString()
          : item.productId.toString();

      return pid !== productId.toString();
    });

    // Save updated cart
    await user.save();

    // Return fresh cart with populated product details
    const freshCart = await User.findById(userId).populate("cart.productId");

    res.status(200).json({ message: "Item removed", cart: freshCart.cart });
  } catch (error) {
    console.error("CLEAR FROM CART ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});
//delete cart data
router.delete("/clear-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Clearing cart for user:", userId);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Cart cleared successfully", cart: user.cart });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//addresses
//add address
router.post("/add-address", async (req, res) => {
  try {
    const { userId, address } = req.body;

    if (!userId || !address) {
      return res.status(400).json({ message: "User ID & address required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (address.isDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
    }

    user.addresses.push(address);
    await user.save();

    res.json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get address
router.get("/get-address/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ addresses: user.addresses });
  } catch (error) {
    console.error("Get Address Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//edit / update address
router.put("/update-address", async (req, res) => {
  try {
    const { userId, addressId, address } = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "User ID and Address ID required" });
    }

    if (!address || typeof address !== "object") {
      return res.status(400).json({ message: "Address object required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const selectedAddress = user.addresses.id(addressId);
    if (!selectedAddress)
      return res.status(404).json({ message: "Address not found" });

    // Update all provided address fields
    Object.keys(address).forEach((key) => {
      selectedAddress[key] = address[key];
    });

    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

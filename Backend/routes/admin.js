const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../middleware/verifyToken");   
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/**
 * CREATE ADMIN (Admin only)
 */
router.post("/create-admin", auth, adminAuth, async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    // Basic validation
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      username,
      email,
      password: hashedPassword,
      mobile,
      role: "admin", 
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

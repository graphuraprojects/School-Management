const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const transporter = require("../email")

// register
router.post("/register", async (req, res) => {
    const {username, email, password, mobile, role} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return  res.status(400).json({error: "User already exists"});
        }
        //hash password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword, mobile, role: role || "user"});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({error: "Server error"});
    }
});

//login
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json("User not found");
        }
        const passwordMatch = await bycrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).json({message: "Login successful", token,
            user: { id: user._id, username: user.username, email: user.email, mobile: user.mobile, role: user.role}
        });
    } catch (error) {
        res.status(500).json({error: "Server error"});
}
});

// OTP authentication
const otpStore = {};  // use same name everywhere

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp: generatedOtp,
      expiresAt: Date.now() + 2 * 60 * 1000   // 2 minutes expiry
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${generatedOtp}. It is valid for 2 minutes.`
    });

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


module.exports = router;
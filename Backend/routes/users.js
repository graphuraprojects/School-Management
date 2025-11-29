const express = require("express");
const router = express.Router();
const User = require("../models/User");

// register
router.post("/", async (req, res) => {
    try {
        const {username, email, password, mobile} = req.body;
        const newUser = new User({username, email, password, mobile});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({error: "Server error"});
    }
});

//login
router.post("login", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username, password});
        if(!user){
            return res.status(400).json({error: "Invalid credentials"});
        }
    } catch (error) {
        res.status(500).json({error: "Server error"});
}
});


module.exports = router;
const mongoose = require('mongoose');
const User = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: false, unique: true },
        password: { type: String, required: true },
        mobile: { type: Number, required: true, unique: true },
    }
)
module.exports = mongoose.model("User", User);
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const adminAuth = require("../middleware/adminAuth");

router.post("/create-event", verifyToken, adminAuth, async (req, res) => {
  res.json({ message: "Admin allowed here, event can be created" });
});

module.exports = router;

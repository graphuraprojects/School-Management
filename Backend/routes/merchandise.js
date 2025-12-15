const express = require('express');
const router = express.Router();
const Merchandise = require('../models/Merchandise');
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });
// creating new item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, quantity, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newMerchandise = new Merchandise({
      title,
      description,
      image: req.file.path,     
      price,
      quantity,
      category
    });

    await newMerchandise.save();
    res.status(201).json(newMerchandise);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// get all items
router.get("/", async (req, res) => {
    try {
        const items = await Merchandise.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})

// UPDATE ONLY STOCK QUANTITY
router.patch("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updatedProduct = await Merchandise.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: quantity } }, 
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
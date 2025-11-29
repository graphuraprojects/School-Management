const express = require('express');
const router = express.Router();
const Merchandise = require('../models/Merchandise');

// creating new item
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            image,
            price,
            quantity,
            category
        } = req.body;

        const newMerchandise = new Merchandise({
            title,
            description,
            image,
            price,
            quantity,
            category
        });
        await newMerchandise.save();
        res.status(201).json(newMerchandise);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})

// get all items
router.get("/", async (req, res) => {
    try {
        const items = await Merchandise.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
})


module.exports = router;
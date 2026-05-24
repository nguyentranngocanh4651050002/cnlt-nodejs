// ===============================
// src/routes/donThueRoutes.js
// ===============================

const express = require("express");

const router = express.Router();

const DonThue = require("../models/DonThue");

// CREATE
router.post("/", async (req, res) => {
    try {
        const donThue = await DonThue.create(req.body);

        res.status(201).json(donThue);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ
router.get("/", async (req, res) => {
    try {
        const danhSachDon = await DonThue.find();

        res.json(danhSachDon);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const donThue = await DonThue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(donThue);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await DonThue.findByIdAndDelete(req.params.id);

        res.json({
            message: "Xóa đơn thuê thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
// ===============================
// src/routes/xeRoutes.js
// ===============================

const express = require("express");

const router = express.Router();

const Xe = require("../models/Xe");

// CREATE
router.post("/", async (req, res) => {
    try {
        const xe = await Xe.create(req.body);

        res.status(201).json(xe);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ
router.get("/", async (req, res) => {
    try {
        const danhSachXe = await Xe.find();

        res.json(danhSachXe);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const xe = await Xe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(xe);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Xe.findByIdAndDelete(req.params.id);

        res.json({
            message: "Xóa xe thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
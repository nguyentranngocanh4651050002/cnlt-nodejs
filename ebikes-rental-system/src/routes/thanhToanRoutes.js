// ===============================
// src/routes/thanhToanRoutes.js
// ===============================

const express = require("express");

const router = express.Router();

const ThanhToan = require("../models/ThanhToan");

// CREATE
router.post("/", async (req, res) => {
    try {
        const thanhToan = await ThanhToan.create(req.body);

        res.status(201).json(thanhToan);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ
router.get("/", async (req, res) => {
    try {
        const danhSachThanhToan = await ThanhToan.find();

        res.json(danhSachThanhToan);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const thanhToan = await ThanhToan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(thanhToan);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await ThanhToan.findByIdAndDelete(req.params.id);

        res.json({
            message: "Xóa thanh toán thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
// ===============================
// src/routes/danhGiaRoutes.js
// ===============================

const express = require("express");

const router = express.Router();

const DanhGia = require("../models/DanhGia");

// CREATE
router.post("/", async (req, res) => {
    try {
        const danhGia = await DanhGia.create(req.body);

        res.status(201).json(danhGia);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ
router.get("/", async (req, res) => {
    try {
        const danhSachDanhGia = await DanhGia.find();

        res.json(danhSachDanhGia);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const danhGia = await DanhGia.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(danhGia);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await DanhGia.findByIdAndDelete(req.params.id);

        res.json({
            message: "Xóa đánh giá thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
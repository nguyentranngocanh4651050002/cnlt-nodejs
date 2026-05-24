// ===============================
// src/routes/tinTucRoutes.js
// ===============================

const express = require("express");

const router = express.Router();

const TinTuc = require("../models/TinTuc");

// CREATE
router.post("/", async (req, res) => {
    try {
        const tinTuc = await TinTuc.create(req.body);

        res.status(201).json(tinTuc);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ
router.get("/", async (req, res) => {
    try {
        const danhSachTinTuc = await TinTuc.find();

        res.json(danhSachTinTuc);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const tinTuc = await TinTuc.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(tinTuc);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await TinTuc.findByIdAndDelete(req.params.id);

        res.json({
            message: "Xóa tin tức thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
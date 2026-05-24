// ===============================
// src/controllers/xeController.js
// ===============================

const Xe = require("../models/Xe");

// CREATE XE
const createXe = async (req, res) => {
    try {
        const xe = await Xe.create(req.body);

        res.status(201).json(xe);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL XE
const getXe = async (req, res) => {
    try {
        const danhSachXe = await Xe.find();

        res.json(danhSachXe);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE XE
const updateXe = async (req, res) => {
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
};

// DELETE XE
const deleteXe = async (req, res) => {
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
};

module.exports = {
    createXe,
    getXe,
    updateXe,
    deleteXe
};
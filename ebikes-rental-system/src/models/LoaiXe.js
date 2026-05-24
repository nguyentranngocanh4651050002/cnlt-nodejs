// ===============================
// src/models/LoaiXe.js
// ===============================

const mongoose = require("mongoose");

const loaiXeSchema = new mongoose.Schema(
{
    tenLoai: {
        type: String,
        required: true
    },

    moTa: {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("LoaiXe", loaiXeSchema);
// ===============================
// src/models/DanhGia.js
// ===============================

const mongoose = require("mongoose");

const danhGiaSchema = new mongoose.Schema(
{
    maNguoiDung: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NguoiDung"
    },

    maXe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Xe"
    },

    soSao: {
        type: Number,
        required: true
    },

    binhLuan: {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("DanhGia", danhGiaSchema);
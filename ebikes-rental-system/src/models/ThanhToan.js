// ===============================
// src/models/ThanhToan.js
// ===============================

const mongoose = require("mongoose");

const thanhToanSchema = new mongoose.Schema(
{
    maDonThue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonThue"
    },

    soTien: {
        type: Number,
        required: true
    },

    phuongThuc: {
        type: String,
        default: "Tiền mặt"
    },

    trangThai: {
        type: String,
        default: "Đã thanh toán"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("ThanhToan", thanhToanSchema);
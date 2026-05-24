// ===============================
// src/models/NguoiDung.js
// ===============================

const mongoose = require("mongoose");

const nguoiDungSchema = new mongoose.Schema(
{
    hoTen: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    matKhau: {
        type: String,
        required: true
    },

    vaiTro: {
        type: String,
        default: "KhachHang"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("NguoiDung", nguoiDungSchema);
// ===============================
// src/models/DonThue.js
// ===============================

const mongoose = require("mongoose");

const donThueSchema = new mongoose.Schema(
{
    maNguoiDung: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NguoiDung"
    },

    maXe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Xe"
    },

    ngayThue: {
        type: Date,
        default: Date.now
    },

    ngayTra: {
        type: Date
    },

    tongTien: {
        type: Number,
        required: true
    },

    trangThai: {
        type: String,
        default: "Đang thuê"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("DonThue", donThueSchema);